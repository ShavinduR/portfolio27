/*
 * Home page sections — mounts in index.html:
 *   [data-render="clients"]  [data-render="work"]  [data-render="expertise"]
 *   [data-render="experience"] [data-render="education"]
 *   [data-render="projects"]  [data-render="testimonials"]
 * Markup comes from render.js — baked into index.html by `npm run build`,
 * re-rendered here only if the data has changed since. This file adds the
 * behaviour: optional sections and the card spotlight.
 * Load after render.js and BEFORE layout.js (reveal observer).
 */
(function () {
  const R = window.RENDER;
  const mount = (name) => document.querySelector(`[data-render="${name}"]`);

  ['clients', 'work', 'expertise', 'projects', 'experience', 'education', 'testimonials'].forEach((name) =>
    R.hydrate(mount(name), R[name]())
  );

  // Optional sections (e.g. testimonials) stay hidden until they have content.
  document.querySelectorAll('[data-if]').forEach((section) => {
    section.hidden = !(window.SITE[section.dataset.if] || []).length;
  });

  // Cursor-following spotlight on cards (subtle; skipped for touch & reduced motion)
  if (window.matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches) {
    ['projects', 'work'].map(mount).filter(Boolean).forEach((grid) =>
      grid.addEventListener('pointermove', (e) => {
        const card = e.target.closest('.project-card, .case-card');
        if (!card) return;
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - r.left}px`);
        card.style.setProperty('--my', `${e.clientY - r.top}px`);
      })
    );
  }
})();
