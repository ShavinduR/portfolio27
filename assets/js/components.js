/*
 * UI components — pure functions that return HTML strings.
 * Shared by the home page (sections.js) and the case-study page (project-page.js).
 */
window.UI = (function () {
  const esc = (s = '') =>
    String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const domain = (url) => {
    try { return new URL(url).hostname.replace(/^www\./, ''); } catch (e) { return ''; }
  };

  const pad = (n) => String(n).padStart(2, '0');

  /**
   * Responsive <img> attributes from the generated manifest (data/images.js):
   * width/height (prevents layout shift) + srcset with the -800 variant.
   */
  function imgAttrs(src, sizes = '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw') {
    const dims = (window.SITE.images || {})[src];
    if (!dims) return `src="${esc(src)}"`;
    const [w, h] = dims;
    const small = src.replace(/\.webp$/, '-800.webp');
    const srcset = w > 800 ? ` srcset="${esc(small)} 800w, ${esc(src)} ${w}w" sizes="${sizes}"` : '';
    return `src="${esc(src)}"${srcset} width="${w}" height="${h}"`;
  }

  /* ------------------------------------------------ Wireframe placeholders */
  const L = (w, extra = '') => `<i class="ph-line ${extra}" style="width:${w}%"></i>`;
  const B = (cls = '') => `<i class="ph-block ${cls}"></i>`;

  const layouts = {
    site: () => `
      <div class="ph-nav">${L(14, 'ph-strong')}<span class="ph-nav-r">${L(8)}${L(8)}${L(8)}</span></div>
      <div class="ph-hero">
        <div class="ph-stack">${L(70, 'ph-xl')}${L(52, 'ph-xl')}${L(80)}${L(64)}<i class="ph-pill"></i></div>
        ${B('ph-tall ph-glow')}
      </div>
      <div class="ph-grid-3">${B()}${B()}${B()}</div>`,
    gallery: () => `
      <div class="ph-nav">${L(14, 'ph-strong')}<span class="ph-nav-r">${L(8)}${L(8)}${L(8)}</span></div>
      <div class="ph-center">${L(46, 'ph-xl')}${L(30)}</div>
      <div class="ph-masonry">${B('ph-glow')}${B()}${B()}${B()}${B('ph-glow')}${B()}</div>`,
    shop: () => `
      <div class="ph-nav">${L(14, 'ph-strong')}<span class="ph-nav-r">${L(8)}${L(8)}<i class="ph-dot"></i></span></div>
      <div class="ph-banner ph-glow">${L(40, 'ph-xl ph-on')}${L(26, 'ph-on')}</div>
      <div class="ph-grid-4">
        ${[0, 1, 2, 3].map(() => `<div class="ph-product">${B()}${L(80)}${L(40, 'ph-strong')}</div>`).join('')}
      </div>`,
    auction: () => `
      <div class="ph-nav">${L(14, 'ph-strong')}<span class="ph-nav-r">${L(8)}${L(8)}<i class="ph-pill ph-sm"></i></span></div>
      <div class="ph-split">
        <div class="ph-config ph-glow"><i class="ph-shirt"></i><span class="ph-swatches"><i></i><i></i><i></i><i></i></span></div>
        <div class="ph-bids">
          ${L(60, 'ph-strong')}
          ${[92, 78, 64, 50].map((w, i) => `<div class="ph-bid ${i === 0 ? 'is-top' : ''}"><i class="ph-dot"></i>${L(w)}</div>`).join('')}
          <i class="ph-pill ph-wide"></i>
        </div>
      </div>`,
    game: () => `
      <div class="ph-nav">${L(14, 'ph-strong')}<span class="ph-nav-r"><i class="ph-dot"></i><i class="ph-dot"></i></span></div>
      <div class="ph-split ph-game">
        <div class="ph-board">${Array.from({ length: 36 }, (_, i) => {
          const r = Math.floor(i / 6), c = i % 6, dark = (r + c) % 2;
          const piece = dark && r < 2 ? 'a' : dark && r > 3 ? 'b' : '';
          return `<i class="${dark ? 'd' : ''}">${piece ? `<b class="p-${piece}"></b>` : ''}</i>`;
        }).join('')}</div>
        <div class="ph-chat">${L(70)}${L(50)}<span class="ph-react">ආ</span>${L(60)}<span class="ph-react">නියමයි</span></div>
      </div>`,
    app: () => `
      <div class="ph-split">${B('ph-side')}<div class="ph-stack">${L(40, 'ph-xl')}<div class="ph-grid-3">${B('ph-glow')}${B()}${B()}</div>${B('ph-tall')}</div></div>`,
    mobile: () => `
      <div class="ph-phones">
        <div class="ph-phone"><div class="ph-stack">${L(50, 'ph-strong')}${B('ph-glow ph-card')}${L(80)}${L(66)}<div class="ph-grid-2">${B()}${B()}</div></div></div>
        <div class="ph-phone ph-phone-b"><div class="ph-stack">${L(40, 'ph-strong')}<div class="ph-bubble">${L(80)}${L(60)}</div><div class="ph-bubble is-me">${L(70)}</div><div class="ph-bubble">${L(85)}${L(40)}</div></div></div>
      </div>`,
  };

  /** Screenshot when available, otherwise an elegant CSS wireframe. */
  function thumb(p, { size = 'md' } = {}) {
    const ph = p.placeholder || {};
    const url = domain(p.links && p.links.live) || `${p.slug}.app`;
    // Real screenshot: shown inside the same browser frame, on the tinted backdrop.
    if (p.image) {
      return `<div class="ph ph-${size} ph-has-shot" style="--h:${ph.hue ?? 40}">
        <div class="ph-frame">
          <div class="ph-bar"><span></span><span></span><span></span><em>${esc(url)}</em></div>
          <div class="ph-shot"><img ${imgAttrs(p.image, '(min-width: 1024px) 50vw, 100vw')} alt="${esc(p.title)} — screenshot of the live site" loading="lazy" decoding="async"></div>
        </div>
      </div>`;
    }
    const layout = layouts[ph.layout] || layouts.site;
    const isMobile = ph.layout === 'mobile';
    return `
      <div class="ph ph-${size}" style="--h:${ph.hue ?? 40}" role="img" aria-label="${esc(p.title)} — preview placeholder">
        <span class="ph-mono" aria-hidden="true">${esc(ph.monogram || p.title[0])}</span>
        ${isMobile
          ? `<div class="ph-frame ph-frame-bare">${layout()}</div>`
          : `<div class="ph-frame">
               <div class="ph-bar"><span></span><span></span><span></span><em>${esc(url)}</em></div>
               <div class="ph-body">${layout()}</div>
             </div>`}
      </div>`;
  }

  /* --------------------------------------------------------- Project card */
  const linkBtns = (p, cls = '') => {
    const out = [];
    if (p.links && p.links.live)
      out.push(`<a href="${esc(p.links.live)}" target="_blank" rel="noopener noreferrer" class="icon-btn ${cls}" aria-label="Open ${esc(p.title)} live site" title="Live site"><i class="fa-solid fa-arrow-up-right-from-square text-xs" aria-hidden="true"></i></a>`);
    if (p.links && p.links.github)
      out.push(`<a href="${esc(p.links.github)}" target="_blank" rel="noopener noreferrer" class="icon-btn ${cls}" aria-label="${esc(p.title)} source on GitHub" title="Source code"><i class="fa-brands fa-github" aria-hidden="true"></i></a>`);
    return out.join('');
  };

  function projectCard(p, index, { compact = false } = {}) {
    const isClient = p.group === 'client';
    const variant = (isClient ? 'is-client' : p.feature && !compact ? 'is-feature' : 'is-core') + (compact ? ' is-compact' : '');
    const stack = p.stack.slice(0, compact ? 3 : p.feature ? 8 : 4);
    return `
      <article class="project-card ${variant} reveal" data-categories="${p.categories.join(' ')}" data-group="${p.group}">
        <div class="project-thumb">${thumb(p, { size: p.feature && !compact ? 'lg' : 'md' })}</div>
        <div class="project-body">
          <div class="flex items-center justify-between gap-4">
            <span class="project-index">${pad(index + 1)}</span>
            ${isClient && !compact ? `<span class="badge-gold"><i class="fa-solid fa-star text-[9px]" aria-hidden="true"></i> Client work</span>` : ''}
          </div>
          <p class="project-kicker">${esc(p.kicker)}</p>
          <h3 class="project-title">
            <a href="project.html?slug=${encodeURIComponent(p.slug)}" class="stretched">${esc(p.title)}</a>
          </h3>
          <p class="project-summary">${esc(p.summary)}</p>
          <ul class="project-stack" aria-label="Tech and focus">${stack.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>
          <div class="project-actions">
            <span class="project-cta">${compact ? 'View project' : 'View case study'} <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></span>
            <span class="flex gap-2 relative z-[2]">${linkBtns(p)}</span>
          </div>
        </div>
      </article>`;
  }

  /* ------------------------------------------------------- Timeline item */
  function timelineItem(x) {
    return `
      <li class="tl-item reveal">
        <span class="tl-node ${x.current ? 'is-current' : ''}" aria-hidden="true"></span>
        <div class="tl-card">
          <div class="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
            ${x.period || x.current ? `<p class="tl-period">${esc(x.period || '')}${x.current ? ' <span class="tl-live">Current</span>' : ''}</p>` : ''}
          </div>
          <div class="flex items-center gap-4 ${x.period || x.current ? 'mt-3' : ''}">
            ${x.logo && (window.SITE.images || {})[x.logo.src] ? `<span class="tl-logo"><img ${imgAttrs(x.logo.src, '64px')} alt="${esc(x.logo.alt)}" loading="lazy" decoding="async"></span>` : ''}
            <div>
              <h3 class="tl-role !mt-0">${esc(x.role)}</h3>
              <p class="tl-org">${esc(x.org)}${x.orgDetail ? ` <span class="text-muted font-normal">· ${esc(x.orgDetail)}</span>` : ''}</p>
            </div>
          </div>
          <ul class="tl-points">${x.points.map((pt) => `<li>${esc(pt)}</li>`).join('')}</ul>
          ${x.tags && x.tags.length ? `<ul class="flex flex-wrap gap-2 mt-5">${x.tags.map((t) => `<li class="chip">${esc(t)}</li>`).join('')}</ul>` : ''}
          ${x.links && x.links.length ? `<ul class="flex flex-wrap gap-2 mt-5">${x.links.map((l) => l.internal ? `
            <li><a href="${esc(l.url)}" class="btn btn-ghost !py-2.5 !px-4 text-xs">
              ${esc(l.label)} <i class="${esc(l.icon)} text-accent" aria-hidden="true"></i>
            </a></li>` : `
            <li><a href="${esc(l.url)}" target="_blank" rel="noopener noreferrer" class="btn btn-ghost !py-2.5 !px-4 text-xs">
              <i class="${esc(l.icon)}" aria-hidden="true"></i> ${esc(l.label)}<span class="sr-only"> — ${esc(x.org)} (opens in a new tab)</span>
            </a></li>`).join('')}</ul>` : ''}
        </div>
      </li>`;
  }

  function educationCard(e) {
    return `
      <div class="edu-card reveal">
        <div class="flex items-start gap-4">
          <span class="edu-icon"><i class="fa-solid fa-graduation-cap" aria-hidden="true"></i></span>
          <div>
            <p class="tl-period">${esc(e.period)}</p>
            <h3 class="font-heading font-bold text-lg leading-snug mt-1">${esc(e.degree)}</h3>
            <p class="text-muted text-sm mt-1">${esc(e.school)}</p>
          </div>
        </div>
      </div>`;
  }

  /* ------------------------------------------------------- Case studies */
  /** Metrics with a real value. `todo` placeholders never reach the page. */
  const publishedResults = (cs) => (cs.results || []).filter((r) => !r.todo && String(r.value || '').trim());

  function resultTiles(results, cls = '') {
    if (!results.length) return '';
    return `<dl class="cs-results ${cls}" style="--n:${results.length}">${results.map((r) => `
        <div class="cs-result">
          <dt>${esc(r.label)}</dt>
          <dd>${esc(r.value)}</dd>
          ${r.note ? `<p class="cs-result-note">${esc(r.note)}</p>` : ''}
        </div>`).join('')}</dl>`;
  }

  function caseLogo(cs) {
    const l = cs.logo;
    if (!l || !(window.SITE.images || {})[l.src]) return `<span class="case-mono">${esc(cs.title)}</span>`;
    return `<span class="case-logo${l.knockout ? ' is-knockout' : ''}"><img ${imgAttrs(l.src, '240px')} alt="${esc(cs.title)} logo" loading="lazy" decoding="async"></span>`;
  }

  function caseCard(cs, i, total) {
    const results = publishedResults(cs);
    return `
      <article class="case-card reveal" style="--h:${cs.hue ?? 80}">
        <div class="case-visual" aria-hidden="true">${caseLogo(cs)}</div>
        <div class="case-body">
          <span class="project-index">${pad(i + 1)} / ${pad(total)}</span>
          <p class="project-kicker !text-accent">${esc(cs.kicker)}</p>
          <h3 class="project-title">
            <a href="case-study.html?slug=${encodeURIComponent(cs.slug)}" class="stretched">${esc(cs.title)}</a>
          </h3>
          <p class="project-summary">${esc(cs.summary)}</p>
          ${results.length ? `<ul class="case-stats">${results.slice(0, 2).map((r) => `<li><strong>${esc(r.value)}</strong> ${esc(r.label)}</li>`).join('')}</ul>` : ''}
          <div class="project-actions">
            <span class="project-cta">Read the case study <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></span>
          </div>
        </div>
      </article>`;
  }

  function testimonialCard(t) {
    return `
      <figure class="quote-card reveal">
        <i class="fa-solid fa-quote-left text-accent text-2xl" aria-hidden="true"></i>
        <blockquote class="mt-6 font-heading font-semibold text-xl md:text-2xl leading-snug">${esc(t.text)}</blockquote>
        <figcaption class="mt-6 text-sm"><span class="font-semibold">${esc(t.name)}</span>${t.role ? ` <span class="text-muted">· ${esc(t.role)}</span>` : ''}</figcaption>
      </figure>`;
  }

  /* ------------------------------------------------------ Expertise card */
  function expertiseCard(x, i) {
    return `
      <article class="expertise-card reveal">
        <div class="flex items-center justify-between">
          <span class="expertise-icon"><i class="${x.icon}" aria-hidden="true"></i></span>
          <span class="project-index">${pad(i + 1)}</span>
        </div>
        <h3 class="font-heading font-bold text-xl mt-8">${esc(x.title)}</h3>
        <p class="text-muted text-sm leading-relaxed mt-3">${esc(x.summary)}</p>
        <ul class="flex flex-wrap gap-2 mt-6">${x.items.map((s) => `<li class="chip">${esc(s)}</li>`).join('')}</ul>
      </article>`;
  }

  return {
    esc, domain, pad, imgAttrs, thumb, projectCard, linkBtns, timelineItem, educationCard, expertiseCard,
    publishedResults, resultTiles, caseCard, testimonialCard,
  };
})();
