/*
 * Pure HTML renderers — return strings, never touch the DOM.
 * Used in two places:
 *   1. scripts/prerender.mjs bakes their output into the .html files at build
 *      time (fast first paint, crawlable content, works without JavaScript).
 *   2. In the browser, RENDER.hydrate() re-renders a mount only if the data has
 *      changed since the last build — so editing a data file never shows stale
 *      content, even before you run `npm run build`.
 * Depends on window.SITE (data files) and window.UI (components.js).
 */
window.RENDER = (function () {
  const SITE = window.SITE;
  const UI = window.UI;
  const esc = UI.esc;

  /** Small, fast string hash (FNV-1a) used to detect stale prerendered HTML. */
  function hash(str) {
    let h = 0x811c9dc5;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 0x01000193);
    }
    return (h >>> 0).toString(36);
  }

  /** Browser-only: replace a mount's content unless it already matches. */
  function hydrate(el, html) {
    if (!el) return false;
    const h = hash(html);
    if (el.dataset.build === h) return false;
    el.innerHTML = html;
    el.dataset.build = h;
    return true;
  }

  /* ============================================================ Home page */
  const expertise = () => (SITE.expertise || []).map(UI.expertiseCard).join('');

  /** Featured case studies ("Selected work"). */
  const work = () => {
    const list = SITE.caseStudies || [];
    return list.map((cs, i) => UI.caseCard(cs, i, list.length)).join('');
  };

  /** Web builds: compact cards, client sites first, then personal builds. */
  function projects() {
    const list = SITE.projects || [];
    return list
      .map((p, i) => {
        const prev = list[i - 1];
        const label = !prev || prev.group !== p.group
          ? `<p class="group-label">${p.group === 'client' ? 'Client websites' : 'Personal builds'}</p>`
          : '';
        return label + UI.projectCard(p, i, { compact: true });
      })
      .join('');
  }

  /** Testimonials — empty string while there are none (section stays hidden). */
  const testimonials = () => (SITE.testimonials || []).map(UI.testimonialCard).join('');

  const clients = () => (SITE.clients || []).map((c) => `
      <li><a href="${esc(c.href)}" class="client-logo${c.knockout ? ' is-knockout' : ''}${c.tall ? ' is-tall' : ''}${c.boost ? ' is-boost' : ''}" title="${esc(c.name)}">
        <img ${UI.imgAttrs(c.logo, '160px')} alt="${esc(c.name)} logo" loading="lazy" decoding="async">
      </a></li>`).join('');

  const experience = () => `<ol class="timeline">${(SITE.experience || []).map(UI.timelineItem).join('')}</ol>`;
  const education = () => (SITE.education || []).map(UI.educationCard).join('');

  /* ===================================================== Case-study page */
  function caseStudy(slug) {
    const list = SITE.caseStudies || [];
    const i = list.findIndex((c) => c.slug === slug);
    if (i === -1) return '';
    const cs = list[i];
    const prev = list[(i - 1 + list.length) % list.length];
    const next = list[(i + 1) % list.length];
    const results = UI.publishedResults(cs);
    const has = (src) => Boolean((SITE.images || {})[src]);
    const gallery = (cs.gallery || []).filter((g) => has(g.src));
    const facts = [['Client', cs.client], ['Role', cs.role], ['Timeframe', cs.timeframe], ['Channels', cs.channels]]
      .filter(([, v]) => v);
    const figure = (g, sizes) => `
      <figure class="cs-figure${g.fit === 'contain' ? ' is-contain' : ''}">
        <img ${UI.imgAttrs(g.src, sizes)} alt="${esc(g.alt)}" loading="lazy" decoding="async">
        ${g.title ? `<figcaption>${esc(g.title)}</figcaption>` : ''}
      </figure>`;
    const step = (n, label, body) => `
      <div class="cs-step reveal">
        <p class="cs-step-label"><span>${UI.pad(n)}</span>${label}</p>
        <div>${body}</div>
      </div>`;

    return `
    <section class="container-x pt-[calc(var(--nav-h)+3.5rem)]">
      <a href="index.html#work" class="inline-flex items-center gap-2 text-sm text-muted hover:text-fg transition">
        <i class="fa-solid fa-arrow-left text-xs" aria-hidden="true"></i> Selected work
      </a>
      <p class="mt-10 project-index">Case study ${UI.pad(i + 1)} / ${UI.pad(list.length)}</p>
      <p class="project-kicker !text-accent">${esc(cs.kicker)}</p>
      <h1 class="mt-4 font-heading font-extrabold tracking-tightest leading-[1] text-[clamp(2.5rem,7vw,5.5rem)]">${esc(cs.title)}<span class="text-accent">.</span></h1>
      <p class="mt-6 max-w-2xl text-lg text-muted leading-relaxed">${esc(cs.summary)}</p>
      ${facts.length ? `<dl class="cs-meta mt-12 py-8 border-y border-line" style="--n:${facts.length}">${facts.map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>` : ''}
      ${UI.resultTiles(results, 'mt-10')}
    </section>

    ${cs.cover && has(cs.cover.src) ? `
    <section class="container-x mt-14 animate-fade-up">
      <div class="cs-cover${cs.cover.fit === 'contain' ? ' is-contain' : ''}" style="--h:${cs.hue ?? 80}">
        <img ${UI.imgAttrs(cs.cover.src, '(min-width: 1280px) 1200px, 100vw')} alt="${esc(cs.cover.alt)}" fetchpriority="high" decoding="async">
      </div>
    </section>` : ''}

    <section class="container-x section !pt-20 space-y-16 md:space-y-20">
      ${step(1, 'The problem', `<p class="cs-lead">${esc(cs.problem)}</p>`)}
      ${step(2, 'What I did', `<ol class="cs-actions">${(cs.actions || []).map((a) => `<li>${esc(a)}</li>`).join('')}</ol>
        ${cs.bonus ? `<aside class="cs-bonus"><p class="cs-bonus-title"><i class="fa-solid fa-plus" aria-hidden="true"></i> ${esc(cs.bonus.title)}</p><p class="mt-3 text-muted leading-relaxed">${esc(cs.bonus.text)}</p></aside>` : ''}`)}
      ${step(3, 'The result', `<p class="cs-lead">${esc(cs.outcome)}</p>
        ${cs.quote ? UI.testimonialCard(cs.quote).replace('reveal', 'mt-10') : ''}`)}
    </section>

    ${gallery.length ? `
    <section class="container-x pb-20">
      <p class="group-label mb-8">The work</p>
      <div class="cs-gallery" data-count="${gallery.length}">${gallery.map((g) => figure(g, '(min-width: 1024px) 50vw, 100vw')).join('')}</div>
    </section>` : ''}

    <section class="container-x pb-20 grid md:grid-cols-2 gap-10">
      ${(cs.tools || []).length ? `<div>
        <p class="group-label mb-5">Tools &amp; skills</p>
        <ul class="flex flex-wrap gap-2">${cs.tools.map((t) => `<li class="chip">${esc(t)}</li>`).join('')}</ul>
      </div>` : ''}
      ${(cs.links || []).length ? `<div>
        <p class="group-label mb-5">See it live</p>
        <ul class="flex flex-wrap gap-2">${cs.links.map((l) => `
          <li><a href="${esc(l.url)}" target="_blank" rel="noopener noreferrer" class="btn btn-ghost !py-2.5 !px-4 text-xs">
            ${esc(l.label)} <i class="fa-solid fa-arrow-up-right-from-square text-accent" aria-hidden="true"></i><span class="sr-only"> (opens in a new tab)</span>
          </a></li>`).join('')}</ul>
      </div>` : ''}
    </section>

    ${list.length > 1 ? `
    <nav class="container-x pb-24 grid sm:grid-cols-2 gap-4 cs-nav" aria-label="More case studies">
      <a href="case-study.html?slug=${encodeURIComponent(prev.slug)}">
        <span class="project-index"><i class="fa-solid fa-arrow-left mr-2" aria-hidden="true"></i>Previous</span>
        <span class="block mt-3 font-heading font-bold text-xl">${esc(prev.title)}</span>
      </a>
      <a href="case-study.html?slug=${encodeURIComponent(next.slug)}" class="sm:text-right">
        <span class="project-index">Next<i class="fa-solid fa-arrow-right ml-2" aria-hidden="true"></i></span>
        <span class="block mt-3 font-heading font-bold text-xl">${esc(next.title)}</span>
      </a>
    </nav>` : ''}`;
  }

  /* ======================================================= Gallery pages */
  // The first image is the LCP candidate (high priority); the rest of the first
  // row loads normally; everything below lazy-loads. Above-the-fold items skip
  // the reveal fade so they paint immediately.
  const EAGER = 4;
  const NO_REVEAL = 6;

  function gallery(id) {
    const g = (SITE.galleries || {})[id];
    const nav = SITE.creativeNav || [];
    if (!g) return '';

    let n = 0; // running image index → lightbox order
    const reveal = () => (n >= NO_REVEAL ? 'reveal' : '');
    const pic = (it, imgClass = '', extra = '', sizes) => {
      // Logos (fit: 'contain') are shown whole on a white tile instead of cropped.
      if (it.fit === 'contain') {
        imgClass = imgClass.replace(/\bobject-cover\b/, 'object-contain').replace(/\bp-\S+/g, '') + (it.tight ? ' p-3 md:p-4' : ' p-6 md:p-10');
        if (!extra.includes('g-frame-light')) extra += ' g-frame-light';
      }
      // Not uploaded yet → an elegant "coming soon" tile (not part of the lightbox).
      if (!(SITE.images || {})[it.src]) {
        const ratio = (imgClass.match(/aspect-\S+/g) || ['aspect-[4/3]']).join(' ');
        return `<div class="${extra} g-pending ${ratio}" role="img" aria-label="${esc(it.alt)} (image coming soon)">
          <span class="g-pending-label">${esc(it.title || 'Coming soon')}</span>
          <span class="g-pending-sub">Coming soon</span>
        </div>`;
      }
      const i = n++;
      return `<button type="button" class="lb-trigger ${extra}" data-lb="${i}" data-title="${esc(it.title || '')}" aria-label="View larger: ${esc(it.title || it.alt)}">
        <img ${UI.imgAttrs(it.src, sizes)} alt="${esc(it.alt)}" ${i === 0 ? 'fetchpriority="high"' : i < EAGER ? '' : 'loading="lazy"'} decoding="async" class="${imgClass}">
      </button>`;
    };
    const blockTitle = (t) => (t ? `<p class="group-label mb-8">${esc(t)}</p>` : '');

    const blocks = {
      features: (b) => `
        <div class="space-y-20 md:space-y-28">
          ${b.items.map((it, i) => {
            const cls = reveal();
            return `
            <article class="grid md:grid-cols-2 gap-10 md:gap-16 items-center ${cls}">
              <div class="${i % 2 ? 'md:order-2' : ''}">
                ${pic(it, 'w-full aspect-[4/3] object-contain p-8 md:p-12', 'g-frame g-frame-light', '(min-width: 768px) 50vw, 100vw')}
              </div>
              <div class="${i % 2 ? 'md:order-1' : ''}">
                <span class="project-index">${UI.pad(i + 1)}</span>
                <p class="project-kicker !text-accent">${esc(it.kicker)}</p>
                <h2 class="mt-3 font-heading font-bold text-3xl md:text-4xl tracking-tight">${esc(it.title)}</h2>
                <p class="mt-5 text-muted leading-relaxed">${esc(it.text)}</p>
              </div>
            </article>`;
          }).join('')}
        </div>`,

      cases: (b) => b.items.map((c, i) => {
        const cls = reveal();
        return `
        <article class="g-case ${cls}" id="${esc(c.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'))}">
          <header class="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <span class="project-index">${UI.pad(i + 1)} / ${UI.pad(b.items.length)}</span>
              <h2 class="mt-3 font-heading font-extrabold text-4xl md:text-5xl tracking-tight">${esc(c.name)}</h2>
            </div>
            <p class="project-kicker !mt-0 !text-accent">${esc(c.kicker)}</p>
          </header>
          ${pic(c.hero, 'w-full aspect-[16/9] md:aspect-[21/9] object-cover', 'g-frame', '(min-width: 1280px) 1200px, 100vw')}
          <div class="grid lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-16 mt-10">
            <div>
              <p class="text-muted leading-relaxed text-lg">${esc(c.text)}</p>
            </div>
            <div class="grid grid-cols-2 gap-4">
              ${c.images.map((it) => pic(it, 'w-full aspect-square object-cover', 'g-frame', '(min-width: 1024px) 25vw, 50vw')).join('')}
            </div>
          </div>
        </article>`;
      }).join(''),

      grid: (b) => {
        const cols = {
          square: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5',
          contain: 'grid-cols-2 md:grid-cols-3 gap-4 md:gap-5',
          product: 'sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12',
        }[b.variant] || 'grid-cols-2 md:grid-cols-3 gap-5';
        const sizes = b.variant === 'square'
          ? '(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw'
          : '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw';
        return `${blockTitle(b.title)}
          <div class="grid ${cols}">
            ${b.items.map((it) => {
              const cls = reveal();
              if (b.variant === 'product') {
                const no = UI.pad(b.items.indexOf(it) + 1);
                return `<figure class="${cls}">
                    ${pic(it, 'w-full aspect-[4/3] object-cover', 'g-frame', sizes)}
                    <figcaption class="mt-4 flex items-baseline gap-3">
                      <span class="project-index">No. ${no}</span>
                      <span class="font-heading font-semibold">${esc(it.title)}</span>
                    </figcaption>
                  </figure>`;
              }
              if (b.variant === 'contain')
                return `<div class="${cls}">${pic(it, 'w-full aspect-[4/3] object-contain p-6', 'g-frame g-frame-light', sizes)}</div>`;
              return `<div class="${cls}">${pic(it, 'w-full aspect-square object-cover', 'g-frame', sizes)}</div>`;
            }).join('')}
          </div>`;
      },

      client: (b) => {
        const cls = reveal();
        return `
        <article class="g-client ${cls}">
          <header class="flex flex-wrap items-end justify-between gap-4 mb-10">
            <div class="flex items-center gap-5">
              ${b.logo && (SITE.images || {})[b.logo.src] ? `
                <span class="g-client-logo"><img ${UI.imgAttrs(b.logo.src, '96px')} alt="${esc(b.logo.alt)}" loading="lazy" decoding="async"></span>` : ''}
              <div>
                <span class="badge-gold"><i class="fa-solid fa-star text-[9px]" aria-hidden="true"></i> Client work</span>
                <h2 class="mt-4 font-heading font-extrabold text-4xl md:text-5xl tracking-tight">${esc(b.name)}</h2>
              </div>
            </div>
            <p class="project-kicker !mt-0 !text-accent">${esc(b.kicker)}</p>
          </header>
          <div class="grid lg:grid-cols-[1fr_1.35fr] gap-10 lg:gap-16 items-start">
            <div>
              <p class="text-muted leading-relaxed text-lg">${esc(b.text)}</p>
              ${b.deliverables && b.deliverables.length ? `
                <p class="group-label mt-10 mb-4">Key deliverables</p>
                <ul class="cs-highlights">${b.deliverables.map((d) => `<li><i class="fa-solid fa-diamond" aria-hidden="true"></i><span>${esc(d)}</span></li>`).join('')}</ul>` : ''}
              ${b.services && b.services.length ? `
                <p class="group-label mt-10 mb-5">Skills</p>
                <ul class="flex flex-wrap gap-2">${b.services.map((x) => `<li class="chip">${esc(x)}</li>`).join('')}</ul>` : ''}
              ${(b.pages || []).some((x) => x.url) ? `
                <p class="group-label mt-10 mb-5">Live pages</p>
                <ul class="flex flex-wrap gap-2">${b.pages.filter((x) => x.url).map((x) => `
                  <li><a href="${esc(x.url)}" target="_blank" rel="noopener noreferrer" class="btn btn-ghost !py-2.5 !px-4 text-xs">
                    <i class="${esc(x.icon)}" aria-hidden="true"></i> ${esc(x.label)}<span class="sr-only"> — ${esc(b.name)} (opens in a new tab)</span>
                  </a></li>`).join('')}</ul>` : ''}
            </div>
            <div class="grid grid-cols-2 gap-4">
              ${b.items.map((it) => pic(it, 'w-full aspect-square object-cover', 'g-frame', '(min-width: 1024px) 28vw, 50vw')).join('')}
            </div>
          </div>
        </article>`;
      },

      masonry: (b) => `${blockTitle(b.title)}
        <div class="columns-1 sm:columns-2 lg:columns-3 gap-5">
          ${b.items.map((it) => {
            const cls = reveal();
            return `
            <figure class="g-tile mb-5 break-inside-avoid ${cls}">
              ${pic(it, 'w-full h-auto', 'g-frame')}
              ${it.title ? `<figcaption class="g-caption">${it.tag ? `<span>${esc(it.tag)}</span>` : ''}${esc(it.title)}</figcaption>` : ''}
            </figure>`;
          }).join('')}
        </div>`,

      cta: (b) => `
        <div class="g-cta reveal">
          <h2 class="font-heading font-bold text-3xl md:text-4xl tracking-tight">${esc(b.title)}</h2>
          <p class="mt-4 text-muted max-w-lg mx-auto">${esc(b.text)}</p>
          <a href="${esc(b.href)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary mt-8">
            <i class="fab fa-whatsapp" aria-hidden="true"></i> ${esc(b.label)}
          </a>
        </div>`,
    };

    const idx = nav.findIndex((x) => x.id === id);
    const next = nav[(idx + 1) % nav.length];

    return `
    <section class="container-x pt-[calc(var(--nav-h)+3.5rem)] pb-12">
      <a href="index.html#design" class="inline-flex items-center gap-2 text-sm text-muted hover:text-fg transition">
        <i class="fa-solid fa-arrow-left text-xs" aria-hidden="true"></i> Creative
      </a>
      <div class="mt-10 grid lg:grid-cols-[1.3fr_1fr] gap-8 items-end">
        <div>
          <span class="eyebrow">${esc(g.eyebrow)}</span>
          <h1 class="mt-5 font-heading font-extrabold tracking-tightest leading-[1] text-[clamp(2.5rem,6.5vw,5rem)]">${esc(g.title)}<span class="text-accent">.</span></h1>
        </div>
        <p class="text-muted leading-relaxed max-w-md lg:justify-self-end">${esc(g.intro)}</p>
      </div>
      <nav class="creative-tabs mt-12" aria-label="Creative galleries">
        ${nav.map((x) => `<a href="${esc(x.href)}" ${x.id === id ? 'aria-current="page"' : ''}>${esc(x.label)}</a>`).join('')}
      </nav>
    </section>

    ${g.blocks.map((b) => `<section class="container-x pb-24">${(blocks[b.type] || (() => ''))(b)}</section>`).join('')}

    <section class="container-x pb-24">
      <a href="${esc(next.href)}" class="g-next group">
        <span class="project-index">Next gallery</span>
        <span class="flex items-center justify-between gap-6 mt-3">
          <span class="font-heading font-extrabold text-3xl md:text-5xl tracking-tight">${esc(next.label)}</span>
          <span class="icon-btn !w-14 !h-14 shrink-0 transition group-hover:bg-accent group-hover:text-accent-fg group-hover:border-accent">
            <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
          </span>
        </span>
      </a>
    </section>`;
  }

  return { hash, hydrate, clients, expertise, work, projects, testimonials, experience, education, gallery, caseStudy };
})();
