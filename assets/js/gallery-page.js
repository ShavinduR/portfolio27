/*
 * Creative gallery pages — logo.html, branding.html, social.html, merch.html,
 * wildlife.html, portrait.html. Each page sets <body data-gallery="<id>">.
 * Markup comes from RENDER.gallery() (render.js) — baked into the HTML by
 * `npm run build`, re-rendered here only if the data has changed since.
 * This file adds the behaviour: the lightbox.
 */
(function () {
  const { galleries = {}, profile } = window.SITE;
  const UI = window.UI;
  const id = document.body.dataset.gallery;
  const g = galleries[id];
  const root = document.querySelector('[data-render="gallery"]');
  if (!root || !g) return;

  // Prerendered at build time; re-render only if the data changed since then.
  window.RENDER.hydrate(root, window.RENDER.gallery(id));

  // Lightbox items come straight from the rendered DOM.
  const lbItems = [...root.querySelectorAll('[data-lb]')].map((b) => {
    const im = b.querySelector('img');
    return { src: im.getAttribute('src'), alt: im.alt, title: b.dataset.title };
  });

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
