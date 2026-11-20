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

  function projects() {
    const list = SITE.projects || [];
    const filters = SITE.projectFilters || [];
    const counts = Object.fromEntries(
      filters.map((f) => [f.id, f.id === 'all' ? list.length : list.filter((p) => p.categories.includes(f.id)).length])
    );
    return `
      <div class="filter-bar" role="toolbar" aria-label="Filter projects">
        ${filters
          .filter((f) => counts[f.id] > 0)
          .map((f, i) => `<button type="button" class="filter-btn" data-filter="${f.id}" aria-pressed="${i === 0}">
              ${f.label}<span>${counts[f.id]}</span></button>`)
          .join('')}
      </div>
      <div class="project-grid" data-grid>
        ${list
          .map((p, i) => {
            const prev = list[i - 1];
            const label = !prev || prev.group !== p.group
              ? `<p class="group-label">${p.group === 'client' ? 'Highlighted · Client work' : 'Technical builds'}</p>`
              : '';
            return label + UI.projectCard(p, i);
          })
          .join('')}
      </div>
      <p class="sr-only" aria-live="polite" data-filter-status></p>`;
  }

  const experience = () => `<ol class="timeline">${(SITE.experience || []).map(UI.timelineItem).join('')}</ol>`;
  const education = () => (SITE.education || []).map(UI.educationCard).join('');

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
            <div>
              <span class="badge-gold"><i class="fa-solid fa-star text-[9px]" aria-hidden="true"></i> Client work</span>
              <h2 class="mt-5 font-heading font-extrabold text-4xl md:text-5xl tracking-tight">${esc(b.name)}</h2>
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

  return { hash, hydrate, expertise, projects, experience, education, gallery };
})();
