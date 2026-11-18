/*
 * Creative gallery pages — logo.html, branding.html, social.html, merch.html,
 * wildlife.html, portrait.html. Each page sets <body data-gallery="<id>"> and
 * this script renders window.SITE.galleries[<id>] into [data-render="gallery"],
 * then wires up the lightbox.
 */
(function () {
  const { galleries = {}, creativeNav = [], profile } = window.SITE;
  const UI = window.UI;
  const esc = UI.esc;
  const id = document.body.dataset.gallery;
  const g = galleries[id];
  const root = document.querySelector('[data-render="gallery"]');
  if (!root || !g) return;

  /* --------------------------------------------------------- Image helper */
  let lbIndex = 0;
  const lbItems = [];
  // Every gallery image is a button that opens the lightbox.
  const pic = (it, imgClass = '', extra = '') => {
    const i = lbIndex++;
    lbItems.push(it);
    return `<button type="button" class="lb-trigger ${extra}" data-lb="${i}" aria-label="View larger: ${esc(it.title || it.alt)}">
        <img src="${esc(it.src)}" alt="${esc(it.alt)}" loading="lazy" decoding="async" class="${imgClass}">
      </button>`;
  };

  const blockTitle = (t) => (t ? `<p class="group-label mb-8">${esc(t)}</p>` : '');

  /* ------------------------------------------------------------- Blocks */
  const blocks = {
    features: (b) => `
      <div class="space-y-20 md:space-y-28">
        ${b.items.map((it, i) => `
          <article class="grid md:grid-cols-2 gap-10 md:gap-16 items-center reveal">
            <div class="${i % 2 ? 'md:order-2' : ''}">
              ${pic(it, 'w-full aspect-[4/3] object-contain p-8 md:p-12', 'g-frame g-frame-light')}
            </div>
            <div class="${i % 2 ? 'md:order-1' : ''}">
              <span class="project-index">${UI.pad(i + 1)}</span>
              <p class="project-kicker !text-accent">${esc(it.kicker)}</p>
              <h2 class="mt-3 font-heading font-bold text-3xl md:text-4xl tracking-tight">${esc(it.title)}</h2>
              <p class="mt-5 text-muted leading-relaxed">${esc(it.text)}</p>
            </div>
          </article>`).join('')}
      </div>`,

    cases: (b) => b.items.map((c, i) => `
      <article class="g-case reveal" id="${esc(c.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'))}">
        <header class="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <span class="project-index">${UI.pad(i + 1)} / ${UI.pad(b.items.length)}</span>
            <h2 class="mt-3 font-heading font-extrabold text-4xl md:text-5xl tracking-tight">${esc(c.name)}</h2>
          </div>
          <p class="project-kicker !mt-0 !text-accent">${esc(c.kicker)}</p>
        </header>
        ${pic(c.hero, 'w-full aspect-[16/9] md:aspect-[21/9] object-cover', 'g-frame')}
        <div class="grid lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-16 mt-10">
          <div>
            <p class="text-muted leading-relaxed text-lg">${esc(c.text)}</p>
            ${c.palette ? `
              <p class="group-label mt-10 mb-5">Colour palette</p>
              <ul class="flex flex-wrap gap-6">
                ${c.palette.map((hex) => `
                  <li class="text-center">
                    <span class="g-swatch" style="background:${esc(hex)}"></span>
                    <span class="block mt-2 text-[11px] font-medium tracking-wider text-muted">${esc(hex)}</span>
                  </li>`).join('')}
              </ul>` : ''}
          </div>
          <div class="grid grid-cols-2 gap-4">
            ${c.images.map((it) => pic(it, 'w-full aspect-square object-cover', 'g-frame')).join('')}
          </div>
        </div>
      </article>`).join(''),

    grid: (b) => {
      const cols = {
        square: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5',
        contain: 'grid-cols-2 md:grid-cols-3 gap-4 md:gap-5',
        product: 'sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12',
      }[b.variant] || 'grid-cols-2 md:grid-cols-3 gap-5';
      return `${blockTitle(b.title)}
        <div class="grid ${cols}">
          ${b.items.map((it) => {
            if (b.variant === 'product')
              return `<figure class="reveal">
                  ${pic(it, 'w-full aspect-[4/3] object-cover', 'g-frame')}
                  <figcaption class="mt-5">
                    ${it.tag ? `<p class="project-kicker !mt-0">${esc(it.tag)}</p>` : ''}
                    <p class="mt-2 font-heading font-bold text-lg">${esc(it.title)}</p>
                    ${it.text ? `<p class="text-sm text-muted mt-1">${esc(it.text)}</p>` : ''}
                  </figcaption>
                </figure>`;
            if (b.variant === 'contain')
              return `<div class="reveal">${pic(it, 'w-full aspect-[4/3] object-contain p-6', 'g-frame g-frame-light')}</div>`;
            return `<div class="reveal">${pic(it, 'w-full aspect-square object-cover', 'g-frame')}</div>`;
          }).join('')}
        </div>`;
    },

    masonry: (b) => `${blockTitle(b.title)}
      <div class="columns-1 sm:columns-2 lg:columns-3 gap-5">
        ${b.items.map((it) => `
          <figure class="g-tile mb-5 break-inside-avoid reveal">
            ${pic(it, 'w-full h-auto', 'g-frame')}
            ${it.title ? `<figcaption class="g-caption">${it.tag ? `<span>${esc(it.tag)}</span>` : ''}${esc(it.title)}</figcaption>` : ''}
          </figure>`).join('')}
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

  /* --------------------------------------------------------------- Page */
  const idx = creativeNav.findIndex((n) => n.id === id);
  const next = creativeNav[(idx + 1) % creativeNav.length];

  root.innerHTML = `
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
        ${creativeNav.map((n) => `<a href="${esc(n.href)}" ${n.id === id ? 'aria-current="page"' : ''}>${esc(n.label)}</a>`).join('')}
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

  /* ----------------------------------------------------------- Lightbox */
  const lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.hidden = true;
  lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-modal', 'true');
  lb.setAttribute('aria-label', `${g.title} image viewer`);
  lb.innerHTML = `
    <div class="lb-top">
      <span class="lb-count" aria-live="polite"></span>
      <button type="button" class="icon-btn lb-close" aria-label="Close viewer"><i class="fa-solid fa-xmark" aria-hidden="true"></i></button>
    </div>
    <button type="button" class="icon-btn lb-prev" aria-label="Previous image"><i class="fa-solid fa-arrow-left" aria-hidden="true"></i></button>
    <figure class="lb-stage"><img alt=""><figcaption class="lb-caption"></figcaption></figure>
    <button type="button" class="icon-btn lb-next" aria-label="Next image"><i class="fa-solid fa-arrow-right" aria-hidden="true"></i></button>`;
  document.body.appendChild(lb);

  const img = lb.querySelector('img');
  const cap = lb.querySelector('.lb-caption');
  const count = lb.querySelector('.lb-count');
  let cur = 0;
  let opener = null;

  const show = (i) => {
    cur = (i + lbItems.length) % lbItems.length;
    const it = lbItems[cur];
    img.src = it.src;
    img.alt = it.alt;
    cap.textContent = it.title || '';
    count.textContent = `${UI.pad(cur + 1)} / ${UI.pad(lbItems.length)}`;
    [cur - 1, cur + 1].forEach((n) => { new Image().src = lbItems[(n + lbItems.length) % lbItems.length].src; });
  };
  const open = (i, trigger) => {
    opener = trigger;
    show(i);
    lb.hidden = false;
    document.documentElement.style.overflow = 'hidden';
    requestAnimationFrame(() => lb.classList.add('is-open'));
    lb.querySelector('.lb-close').focus();
  };
  const close = () => {
    lb.classList.remove('is-open');
    lb.hidden = true;
    document.documentElement.style.overflow = '';
    if (opener) opener.focus();
  };

  root.addEventListener('click', (e) => {
    const t = e.target.closest('[data-lb]');
    if (t) open(Number(t.dataset.lb), t);
  });
  lb.querySelector('.lb-close').addEventListener('click', close);
  lb.querySelector('.lb-prev').addEventListener('click', () => show(cur - 1));
  lb.querySelector('.lb-next').addEventListener('click', () => show(cur + 1));
  lb.addEventListener('click', (e) => { if (e.target === lb || e.target.classList.contains('lb-stage')) close(); });
  document.addEventListener('keydown', (e) => {
    if (lb.hidden) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') show(cur - 1);
    else if (e.key === 'ArrowRight') show(cur + 1);
    else if (e.key === 'Tab') { // keep focus inside the viewer
      const f = [...lb.querySelectorAll('button')];
      const at = f.indexOf(document.activeElement);
      e.preventDefault();
      f[(at + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
    }
  });
  let x0 = null; // swipe
  lb.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', (e) => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 50) show(cur + (dx < 0 ? 1 : -1));
    x0 = null;
  });

  document.title = `${g.title} | ${profile.name}`;
})();
