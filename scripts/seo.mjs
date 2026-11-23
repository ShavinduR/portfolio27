/**
 * SEO — one place for every page's <head> metadata.
 *
 * scripts/prerender.mjs calls buildHead() for each page and writes the result
 * between <!--seo--> and <!--/seo--> in its <head>: title, description,
 * robots, canonical, Open Graph, Twitter Card and JSON-LD. Edit titles and
 * descriptions here (or in the data files for case studies and projects),
 * never by hand in the HTML; the next `npm run build` would overwrite them.
 *
 * Length targets (warned about at build time):
 *   title        ≤ 60 characters, name + role first
 *   description  120–160 characters (home page: 145–155)
 */

/* ------------------------------------------------------------ Static pages */
// Keyed by file name. `type` drives the JSON-LD (see pageGraph).
export const PAGES = {
  'index.html': {
    title: 'Shavindu Rashmika | Social Media Strategist & Visual Creator',
    description:
      'Shavindu Rashmika (W.S.R. Rathnayaka) is a Social Media Strategist & Visual Creator in Sri Lanka: strategy, content, photography, video and design.',
    type: 'home',
  },
  'logo.html': {
    title: 'Logo Design Portfolio | Shavindu Rashmika, Sri Lanka',
    description:
      'Logo and brand mark design by Shavindu Rashmika, a visual creator in Sri Lanka, for hospitality, retail, tech and leisure brands such as Tranquil Rest and APEX.',
    type: 'gallery', name: 'Logo Design',
  },
  'branding.html': {
    title: 'Brand Identity Design | Shavindu Rashmika, Sri Lanka',
    description:
      'Brand identity projects by Shavindu Rashmika in Sri Lanka: logos, visiting cards and complete visual systems for Tranquil Rest, APEX, Herba, Salon Roo and more.',
    type: 'gallery', name: 'Brand Identity Design',
  },
  'social.html': {
    title: 'Social Media Post Design | Shavindu Rashmika, Sri Lanka',
    description:
      'Social media post designs by Shavindu Rashmika, a social media strategist in Sri Lanka: product launches, promotions and campaign creatives made to sell.',
    type: 'gallery', name: 'Social Media Design',
  },
  'merch.html': {
    title: 'Merch & Apparel Design | Shavindu Rashmika',
    description:
      'Merchandise and apparel design by Shavindu Rashmika, a visual creator in Sri Lanka: T-shirts, hoodies, caps and branded apparel for clients, teams and events.',
    type: 'gallery', name: 'Merch & Apparel Design',
  },
  'wildlife.html': {
    title: 'Wildlife Photography Sri Lanka | Shavindu Rashmika',
    description:
      'Wildlife photography from across Sri Lanka by Shavindu Rashmika: Udawalawe elephants, peacocks, egrets, monitor lizards and garden wildlife, up close.',
    type: 'gallery', name: 'Wildlife Photography',
  },
  'portrait.html': {
    title: 'Lifestyle Photography Sri Lanka | Shavindu Rashmika',
    description:
      'Lifestyle and landscape photography in Sri Lanka by Shavindu Rashmika, from Ella’s Nine Arch Bridge to the tea estates of Kalawana. Book a shoot on WhatsApp.',
    type: 'gallery', name: 'Lifestyle & Landscape Photography',
  },
  '404.html': {
    title: 'Page not found | Shavindu Rashmika',
    description: 'This page doesn’t exist. Head back to the portfolio of Shavindu Rashmika, Social Media Strategist & Visual Creator in Sri Lanka.',
    type: 'utility', robots: 'noindex, follow', canonical: false,
  },
  // Old query-string URLs, kept only to redirect to the static pages.
  'case-study.html': { title: 'Case study | Shavindu Rashmika', description: 'Redirecting to the case study.', type: 'utility', robots: 'noindex, follow', canonical: false },
  'project.html': { title: 'Web build | Shavindu Rashmika', description: 'Redirecting to the web build.', type: 'utility', robots: 'noindex, follow', canonical: false },
};

/* ---------------------------------------------------------------- Helpers */
const esc = (s = '') =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/** Shorten to `max` characters at a word boundary (for descriptions from data). */
export function clip(text, max = 160) {
  const t = String(text || '').replace(/\s+/g, ' ').trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  return cut.slice(0, cut.lastIndexOf(' ')).replace(/[,:;–—-]+$/, '') + '…';
}

/** Warnings for titles/descriptions outside the target lengths. */
export function lint(file, { title, description, type }) {
  const out = [];
  if (title.length > 60) out.push(`${file}: title is ${title.length} chars (max 60)`);
  if (type === 'utility') return out;
  const [min, max] = type === 'home' ? [145, 155] : [110, 160];
  if (description.length < min || description.length > max) out.push(`${file}: description is ${description.length} chars (target ${min}–${max})`);
  return out;
}

/* --------------------------------------------------------------- JSON-LD */
export function personNode(SITE) {
  const p = SITE.profile;
  const base = p.url;
  const seo = p.seo || {};
  return {
    '@type': 'Person',
    '@id': `${base}#person`,
    name: p.name,
    alternateName: seo.alternateNames || [p.legalName],
    givenName: seo.givenName,
    familyName: seo.familyName,
    jobTitle: p.headline,
    description: p.summary,
    url: base,
    image: { '@type': 'ImageObject', url: base + p.portrait, width: 1200, height: 1600 },
    email: `mailto:${p.contact.email}`,
    telephone: (p.contact.phones || [])[0],
    address: { '@type': 'PostalAddress', addressCountry: 'LK' },
    nationality: { '@type': 'Country', name: 'Sri Lanka' },
    alumniOf: (SITE.education || []).map((e) => ({ '@type': 'CollegeOrUniversity', name: e.school })),
    knowsAbout: seo.knowsAbout,
    sameAs: (p.socials || []).map((s) => s.url),
  };
}

const websiteNode = (SITE) => {
  const p = SITE.profile;
  return {
    '@type': 'WebSite',
    '@id': `${p.url}#website`,
    url: p.url,
    name: p.name,
    alternateName: (p.seo && p.seo.alternateNames) || [p.legalName],
    description: PAGES['index.html'].description,
    inLanguage: 'en',
    publisher: { '@id': `${p.url}#person` },
  };
};

const breadcrumb = (SITE, url, trail) => ({
  '@type': 'BreadcrumbList',
  '@id': `${url}#breadcrumb`,
  itemListElement: [{ name: 'Home', url: SITE.profile.url }, ...trail].map((c, i) => ({
    '@type': 'ListItem', position: i + 1, name: c.name, item: c.url,
  })),
});

/**
 * The page's JSON-LD graph. Person and WebSite are defined once (home page)
 * and referenced by @id everywhere else.
 */
export function pageGraph(SITE, page) {
  const base = SITE.profile.url;
  const person = { '@id': `${base}#person` };
  const website = { '@id': `${base}#website` };
  const webpage = { '@id': `${page.url}#webpage`, url: page.url, name: page.title, description: page.description, inLanguage: 'en', isPartOf: website };
  switch (page.type) {
    case 'home':
      return [
        personNode(SITE),
        websiteNode(SITE),
        { '@type': 'ProfilePage', ...webpage, mainEntity: person, about: person, dateModified: page.lastmod,
          primaryImageOfPage: { '@type': 'ImageObject', url: page.image } },
      ];
    case 'gallery':
      return [
        { '@type': 'CollectionPage', ...webpage, about: person, author: person, breadcrumb: { '@id': `${page.url}#breadcrumb` } },
        breadcrumb(SITE, page.url, [{ name: page.name, url: page.url }]),
      ];
    case 'case-study':
    case 'project':
      return [
        { '@type': 'WebPage', ...webpage, mainEntity: { '@id': `${page.url}#work` }, breadcrumb: { '@id': `${page.url}#breadcrumb` } },
        { '@type': 'CreativeWork', '@id': `${page.url}#work`, name: page.name, headline: page.name, description: page.description,
          url: page.url, image: page.image, author: person, creator: person, inLanguage: 'en', dateModified: page.lastmod,
          ...(page.about ? { about: page.about } : {}), ...(page.keywords ? { keywords: page.keywords.join(', ') } : {}),
          ...(page.sameAs ? { sameAs: page.sameAs } : {}) },
        breadcrumb(SITE, page.url, [page.section, { name: page.name, url: page.url }]),
      ];
    default:
      return null;
  }
}

/* ------------------------------------------------------------ <head> block */
/**
 * @param page { url, title, description, type, image, imageWidth, imageHeight,
 *               imageAlt, robots?, canonical? (false = omit), ogType? }
 */
export function buildHead(SITE, page) {
  const p = SITE.profile;
  const seo = p.seo || {};
  const robots = page.robots || 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
  const graph = page.graph === undefined ? pageGraph(SITE, page) : page.graph;
  const lines = [
    `<title>${esc(page.title)}</title>`,
    `<meta name="description" content="${esc(page.description)}">`,
    `<meta name="robots" content="${robots}">`,
    `<meta name="author" content="${esc(p.name)}">`,
    page.canonical === false ? '' : `<link rel="canonical" href="${esc(page.url)}">`,
    seo.googleSiteVerification ? `<meta name="google-site-verification" content="${esc(seo.googleSiteVerification)}">` : '',
    seo.bingSiteVerification ? `<meta name="msvalidate.01" content="${esc(seo.bingSiteVerification)}">` : '',
    '',
    `<meta property="og:type" content="${page.ogType || (page.type === 'home' ? 'profile' : 'website')}">`,
    `<meta property="og:site_name" content="${esc(p.name)}">`,
    `<meta property="og:locale" content="en_US">`,
    `<meta property="og:url" content="${esc(page.url)}">`,
    `<meta property="og:title" content="${esc(page.title)}">`,
    `<meta property="og:description" content="${esc(page.description)}">`,
    `<meta property="og:image" content="${esc(page.image)}">`,
    page.imageWidth ? `<meta property="og:image:width" content="${page.imageWidth}">` : '',
    page.imageHeight ? `<meta property="og:image:height" content="${page.imageHeight}">` : '',
    `<meta property="og:image:alt" content="${esc(page.imageAlt)}">`,
    page.type === 'home' ? `<meta property="profile:first_name" content="${esc(seo.givenName || '')}">` : '',
    page.type === 'home' ? `<meta property="profile:last_name" content="${esc(seo.familyName || '')}">` : '',
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${esc(page.title)}">`,
    `<meta name="twitter:description" content="${esc(page.description)}">`,
    `<meta name="twitter:image" content="${esc(page.image)}">`,
    `<meta name="twitter:image:alt" content="${esc(page.imageAlt)}">`,
    graph
      ? `<script type="application/ld+json">\n${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }, null, 2).replace(/</g, '\\u003c')}\n    </script>`
      : '',
  ].filter((l, i, a) => l !== '' || (a[i - 1] && a[i - 1] !== ''));
  return `<!--seo-->\n    ${lines.join('\n    ').replace(/\n    \n/g, '\n\n')}\n    <!--/seo-->`;
}
