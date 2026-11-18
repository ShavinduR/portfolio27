/*
 * Home page sections — renders into mount points in index.html:
 *   [data-render="expertise"]  [data-render="projects"]
 *   [data-render="experience"] [data-render="education"]
 * Load after the data files + components.js and BEFORE layout.js
 * (layout.js attaches the reveal-on-scroll observer to rendered nodes).
 */
(function () {
  const { projects = [], projectFilters = [], experience = [], education = [], expertise = [] } = window.SITE;
  const UI = window.UI;
  const mount = (name) => document.querySelector(`[data-render="${name}"]`);

  /* ------------------------------------------------------------ Expertise */
  const ex = mount('expertise');
  if (ex) ex.innerHTML = expertise.map(UI.expertiseCard).join('');

  /* ------------------------------------------------------------- Projects */
  const pr = mount('projects');
  if (pr) {
    const counts = Object.fromEntries(
      projectFilters.map((f) => [f.id, f.id === 'all' ? projects.length : projects.filter((p) => p.categories.includes(f.id)).length])
    );
    pr.innerHTML = `
      <div class="filter-bar" role="toolbar" aria-label="Filter projects">
        ${projectFilters
          .filter((f) => counts[f.id] > 0)
          .map((f, i) => `<button type="button" class="filter-btn" data-filter="${f.id}" aria-pressed="${i === 0}">
              ${f.label}<span>${counts[f.id]}</span></button>`)
          .join('')}
      </div>
      <div class="project-grid" data-grid>
        ${projects
          .map((p, i) => {
            const prev = projects[i - 1];
            const label = !prev || prev.group !== p.group
              ? `<p class="group-label">${p.group === 'client' ? 'Highlighted · Client work' : 'Technical builds'}</p>`
              : '';
            return label + UI.projectCard(p, i);
          })
          .join('')}
      </div>
      <p class="sr-only" aria-live="polite" data-filter-status></p>`;

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
  }

  /* ----------------------------------------------- Experience & education */
  const xp = mount('experience');
  if (xp) xp.innerHTML = `<ol class="timeline">${experience.map(UI.timelineItem).join('')}</ol>`;

  const ed = mount('education');
  if (ed) ed.innerHTML = education.map(UI.educationCard).join('');
})();
