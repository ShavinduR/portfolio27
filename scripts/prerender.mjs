#!/usr/bin/env node
/**
 * Prerender — run with `npm run build` (or `npm run prerender`).
 *
 * 1. Runs the same renderers the browser uses (assets/js/render.js) in Node and
 *    writes their output into each page's mount elements:
 *      <div data-render="projects" data-build="abc123"><!--render-->…<!--/render--></div>
 *    `data-build` is a hash of the rendered HTML. In the browser,
 *    RENDER.hydrate() renders again and compares hashes, so content is never stale.
 * 2. Writes each page's SEO <head> block (scripts/seo.mjs) between <!--seo--> markers.
 * 3. Generates a static, crawlable page per case study (case-studies/<slug>.html)
 *    and per web build (projects/<slug>.html) from scripts/templates/detail.html.
 * 4. Writes sitemap.xml (with image entries) and robots.txt.
 * Re-run after editing anything in assets/js/data/.
 */
import { readFile, writeFile, readdir, mkdir, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import vm from 'node:vm';
import { PAGES, buildHead, clip, lint } from './seo.mjs';

const ROOT = new URL('..', import.meta.url).pathname;
const SCRIPTS = [
  'assets/js/data/profile.js',
  'assets/js/data/projects.js',
  'assets/js/data/case-studies.js',
  'assets/js/data/experience.js',
  'assets/js/data/galleries.js',
  'assets/js/data/images.js',
  'assets/js/components.js',
  'assets/js/render.js',
];

// A minimal browser-like global: the renderers only use `window`.
const ctx = { window: {}, URL, URLSearchParams };
vm.createContext(ctx);
for (const f of SCRIPTS) vm.runInContext(await readFile(join(ROOT, f), 'utf8'), ctx, { filename: f });
const R = ctx.window.RENDER;
const SITE = ctx.window.SITE;
const BASE = SITE.profile.url.replace(/\/?$/, '/');
const warnings = [];

/* ------------------------------------------------------------- Utilities */
const today = new Date().toISOString().slice(0, 10);
/** Last commit date of the files a page is built from; today if they have uncommitted edits. */
function lastmod(files) {
  try {
    if (execFileSync('git', ['status', '--porcelain', '--', ...files], { cwd: ROOT }).toString().trim()) return today;
    return execFileSync('git', ['log', '-1', '--format=%cs', '--', ...files], { cwd: ROOT }).toString().trim() || today;
  } catch (e) {
    return today;
  }
}
const imgDims = (src) => (SITE.images || {})[src] || null;
const abs = (path) => BASE + path.replace(/^\.?\//, '');
const DEFAULT_IMAGE = { src: 'og-image.jpg', w: 1200, h: 630, alt: `${SITE.profile.name}, ${SITE.profile.headline}` };
const ogImage = (src, alt) => {
  const d = src && imgDims(src);
  return d ? { image: abs(src), imageWidth: d[0], imageHeight: d[1], imageAlt: alt }
    : { image: abs(DEFAULT_IMAGE.src), imageWidth: DEFAULT_IMAGE.w, imageHeight: DEFAULT_IMAGE.h, imageAlt: DEFAULT_IMAGE.alt };
};

/** Every image a gallery shows (for og:image and the image sitemap). */
function galleryImages(id) {
  const g = (SITE.galleries || {})[id];
  if (!g) return [];
  const out = [];
  for (const b of g.blocks) {
    for (const it of b.items || []) {
      if (it.hero) out.push(it.hero);
      out.push(...(it.images || []), ...(it.src ? [it] : []));
    }
    if (b.logo) out.push(b.logo);
  }
  return out.filter((it) => it && imgDims(it.src));
}

// Legacy hand-written head tags, replaced by the managed <!--seo--> block.
const LEGACY_HEAD = [
  /\s*<title>[\s\S]*?<\/title>/g,
  /\s*<meta (?:name|property)="(?:description|keywords|author|robots|og:[^"]+|twitter:[^"]+|google-site-verification|msvalidate\.01)"[^>]*>/g,
  /\s*<link rel="canonical"[^>]*>/g,
  /\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/g,
];
function writeSeoBlock(html, head) {
  if (!html.includes('<!--seo-->')) {
    for (const re of LEGACY_HEAD) html = html.replace(re, '');
    html = html.replace(/(<meta name="viewport"[^>]*>)/, `$1\n    <!--seo--><!--/seo-->`);
  }
  return html.replace(/<!--seo-->[\s\S]*?<!--\/seo-->/, head);
}

/* ----------------------------------------------------- 1. Prerender mounts */
// Search-engine ownership files (e.g. google<token>.html) must be served byte-for-byte: never touch them.
const VERIFICATION_FILE = /^google[0-9a-f]+\.html$/;
const pages = (await readdir(ROOT)).filter((f) => f.endsWith('.html') && !VERIFICATION_FILE.test(f));
let total = 0;
for (const page of pages) {
  const file = join(ROOT, page);
  let html = await readFile(file, 'utf8');
  const galleryId = (html.match(/<body[^>]*\bdata-gallery="([^"]+)"/) || [])[1];
  let count = 0;

  // Opening tag of any mount, then either an existing <!--render-->…<!--/render-->
  // block or nothing (an empty mount straight from the template).
  const re = /<([a-z]+)([^>]*?)\sdata-render="([a-z-]+)"([^>]*)>(<!--render-->[\s\S]*?<!--\/render-->)?/g;
  html = html.replace(re, (whole, tag, before, name, after) => {
    const fn = name === 'gallery' ? () => R.gallery(galleryId) : R[name];
    if (typeof fn !== 'function') return whole;
    const out = fn();
    if (!out) return whole;
    const attrs = `${before} data-render="${name}"${after}`.replace(/\sdata-build="[^"]*"/g, '');
    count++;
    return `<${tag}${attrs} data-build="${R.hash(out)}"><!--render-->${out}<!--/render-->`;
  });

  // 2. SEO head
  const meta = PAGES[page];
  if (meta) {
    warnings.push(...lint(page, meta));
    const url = page === 'index.html' ? BASE : abs(page);
    const imgs = galleryId ? galleryImages(galleryId) : [];
    const lead = imgs[0];
    const img = meta.type === 'gallery' && lead ? ogImage(lead.src, lead.alt) : ogImage(null);
    html = writeSeoBlock(html, buildHead(SITE, {
      ...meta, url, ...img,
      lastmod: lastmod([page, 'assets/js/data']),
    }));
  } else {
    warnings.push(`${page}: no SEO entry in scripts/seo.mjs`);
  }

  await writeFile(file, html);
  if (count) total += count;
}
console.log(`Prerendered ${total} section(s) across ${pages.length} pages.`);

/* ------------------------------------------------- 3. Static detail pages */
const template = await readFile(join(ROOT, 'scripts/templates/detail.html'), 'utf8');
const fill = (tpl, vars) => tpl.replace(/\{\{(\w+)\}\}/g, (_, k) => vars[k] ?? '');
const detailUrls = [];

async function generate({ dir, items, render, mount, script, kind, section, meta }) {
  await rm(join(ROOT, dir), { recursive: true, force: true });
  await mkdir(join(ROOT, dir), { recursive: true });
  for (const item of items) {
    const content = render(item.slug);
    const self = `${dir}/${item.slug}.html`;
    const m = meta(item);
    warnings.push(...lint(self, { ...m, type: kind }));
    const head = buildHead(SITE, {
      type: kind, url: abs(self), name: item.title, section,
      lastmod: m.lastmod, ...m, ...ogImage(m.imageSrc, m.imageAlt),
    });
    const html = writeSeoBlock(fill(template, { page: kind, slug: item.slug, self, mount, hash: R.hash(content), content, script }), head);
    await writeFile(join(ROOT, self), html);
    detailUrls.push({ path: self, priority: kind === 'case-study' ? '0.9' : '0.6', lastmod: m.lastmod, images: m.images });
  }
  console.log(`${dir}/: ${items.length} page(s)`);
}

const csDate = lastmod(['assets/js/data/case-studies.js']);
await generate({
  dir: 'case-studies', kind: 'case-study', mount: 'case-study', script: 'case-study-page.js',
  items: SITE.caseStudies, render: R.caseStudy,
  section: { name: 'Selected work', url: `${BASE}#work` },
  meta: (cs) => {
    const shown = (cs.gallery || []).filter((g) => imgDims(g.src));
    const cover = cs.cover && imgDims(cs.cover.src) && cs.cover.fit !== 'contain' ? cs.cover : shown.find((g) => g.fit !== 'contain');
    return {
      title: `${cs.title} Case Study | ${SITE.profile.name}`,
      description: clip(cs.metaDescription || cs.summary, 160),
      imageSrc: cover && cover.src, imageAlt: cover ? cover.alt : DEFAULT_IMAGE.alt,
      about: { '@type': 'Organization', name: cs.client },
      keywords: cs.tools,
      sameAs: (cs.links || []).map((l) => l.url),
      lastmod: csDate,
      images: [cs.cover, ...shown].filter((x) => x && imgDims(x.src)).map((x) => x.src),
    };
  },
});

const prDate = lastmod(['assets/js/data/projects.js']);
await generate({
  dir: 'projects', kind: 'project', mount: 'project', script: 'project-page.js',
  items: SITE.projects, render: R.project,
  section: { name: 'Web builds', url: `${BASE}#projects` },
  meta: (p) => ({
    title: `${p.title} | Web Build by ${SITE.profile.name}`.length <= 60
      ? `${p.title} | Web Build by ${SITE.profile.name}` : `${p.title} | ${SITE.profile.name}`,
    description: clip(p.metaDescription || p.summary, 160),
    imageSrc: p.image, imageAlt: `${p.title}: screenshot of the live website`,
    keywords: p.stack,
    sameAs: [p.links && p.links.live, p.links && p.links.github].filter(Boolean),
    lastmod: prDate,
    images: p.image && imgDims(p.image) ? [p.image] : [],
  }),
});

/* ----------------------------------------------------- 4. Sitemap, robots */
const NOT_INDEXED = new Set(Object.entries(PAGES).filter(([, m]) => m.robots && m.robots.includes('noindex')).map(([f]) => f));
const urls = [
  { path: '', priority: '1.0', lastmod: lastmod(['index.html', 'assets/js/data']), images: [SITE.profile.portrait] },
  ...detailUrls.filter((u) => u.priority === '0.9'),
  ...pages
    .filter((p) => p !== 'index.html' && !NOT_INDEXED.has(p) && PAGES[p])
    .sort()
    .map((p) => {
      const id = p.replace(/\.html$/, '');
      return { path: p, priority: '0.7', lastmod: lastmod([p, 'assets/js/data/galleries.js']), images: galleryImages(id).map((i) => i.src) };
    }),
  ...detailUrls.filter((u) => u.priority !== '0.9'),
];
const xmlEsc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.map((u) => `  <url>
    <loc>${xmlEsc(BASE + u.path)}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <priority>${u.priority}</priority>${[...new Set(u.images || [])].map((src) => `
    <image:image><image:loc>${xmlEsc(abs(src))}</image:loc></image:image>`).join('')}
  </url>`).join('\n')}
</urlset>
`;
await writeFile(join(ROOT, 'sitemap.xml'), xml);
await writeFile(join(ROOT, 'robots.txt'), `# ${SITE.profile.name} — portfolio\nUser-agent: *\nAllow: /\n\nSitemap: ${BASE}sitemap.xml\n`);
console.log(`sitemap.xml: ${urls.length} URLs, ${urls.reduce((n, u) => n + new Set(u.images || []).size, 0)} images`);

/* ------------------------------------------------ Warnings & placeholders */
// Placeholder metrics (`todo: true`) are hidden on the live site. List them
// here on every build so none are forgotten.
const todos = [];
for (const c of SITE.caseStudies) {
  for (const r of c.results || []) if (r.todo || !String(r.value || '').trim()) todos.push(`${c.title} → ${r.label}`);
  if (!c.timeframe) todos.push(`${c.title} → timeframe (hidden until filled in)`);
}
if (todos.length) {
  console.warn(`\n⚠  ${todos.length} case-study placeholder(s) to fill in (assets/js/data/case-studies.js):`);
  todos.forEach((t) => console.warn(`   • ${t}`));
}
if (warnings.length) {
  console.warn(`\n⚠  ${warnings.length} SEO warning(s):`);
  warnings.forEach((w) => console.warn(`   • ${w}`));
}
