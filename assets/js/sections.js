/*
 * Home page sections — mounts in index.html:
 *   [data-render="expertise"]  [data-render="projects"]
 *   [data-render="experience"] [data-render="education"]
 * Markup comes from render.js — baked into index.html by `npm run build`,
 * re-rendered here only if the data has changed since. This file adds the
 * behaviour: project filters and the card spotlight.
 * Load after render.js and BEFORE layout.js (reveal observer).
 */
(function () {
  const R = window.RENDER;
  const mount = (name) => document.querySelector(`[data-render="${name}"]`);

  ['expertise', 'projects', 'experience', 'education'].forEach((name) => R.hydrate(mount(name), R[name]()));

  /* --------------------------------------------------------- Project filters */
  const pr = mount('projects');
  if (!pr) return;
  const grid = pr.querySelector('[data-grid]');
  const status = pr.querySelector('[data-filter-status]');
  pr.querySelectorAll('.filter-btn').forEach((btn) =>
    btn.addEventListener('click', () => {
      const id = btn.dataset.filter;
      pr.querySelectorAll('.filter-btn').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      grid.classList.toggle('is-filtered', id !== 'all');
      let shown = 0;
      grid.querySelectorAll('.project-card').forEach((card) => {
        const match = id === 'all' || card.dataset.categories.split(' ').includes(id);
        card.hidden = !match;
        if (match) { shown++; card.classList.add('is-visible'); }
      });
      status.textContent = `Showing ${shown} project${shown === 1 ? '' : 's'}`;
    })
  );

  // Cursor-following spotlight (subtle; skipped for touch & reduced motion)
  if (window.matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches) {
    grid.addEventListener('pointermove', (e) => {
      const card = e.target.closest('.project-card');
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  }
})();
