#!/usr/bin/env node
/**
 * Prerender — run with `npm run build` (or `npm run prerender`).
 *
 * Runs the same renderers the browser uses (assets/js/render.js) in Node and
 * writes their output into each page's mount elements:
 *
 *   <div data-render="projects" data-build="abc123"><!--render-->…<!--/render--></div>
 *
 * `data-build` is a hash of the rendered HTML. In the browser, RENDER.hydrate()
 * renders again and compares hashes — if the data changed after the last build,
 * the page re-renders itself, so content is never stale. Re-run this after
 * editing anything in assets/js/data/ to keep the fast path.
 */
import { readFile, writeFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import vm from 'node:vm';

const ROOT = new URL('..', import.meta.url).pathname;
const SCRIPTS = [
  'assets/js/data/profile.js',
  'assets/js/data/projects.js',
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

const pages = (await readdir(ROOT)).filter((f) => f.endsWith('.html'));
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
    if (typeof fn !== 'function') return whole; // e.g. case-study: rendered per request
    const out = fn();
    if (!out) return whole;
    const attrs = `${before} data-render="${name}"${after}`.replace(/\sdata-build="[^"]*"/g, '');
    count++;
    return `<${tag}${attrs} data-build="${R.hash(out)}"><!--render-->${out}<!--/render-->`;
  });

  if (count) {
    await writeFile(file, html);
    console.log(`  ${page}: ${count} section(s)`);
    total += count;
  }
}
console.log(`Prerendered ${total} section(s) across ${pages.length} pages.`);
