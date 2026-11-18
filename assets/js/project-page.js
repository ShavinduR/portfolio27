/*
 * Case-study page — project.html?slug=<slug>
 * Renders one project from window.SITE.projects into [data-render="case-study"].
 */
(function () {
  const { projects = [], profile } = window.SITE;
  const UI = window.UI;
  const root = document.querySelector('[data-render="case-study"]');
  if (!root) return;

  const slug = new URLSearchParams(location.search).get('slug');
  const i = projects.findIndex((p) => p.slug === slug);

  if (i === -1) {
    document.title = `Project not found | ${profile.name}`;
    root.innerHTML = `
      <section class="container-x min-h-[70vh] flex flex-col items-start justify-center pt-[var(--nav-h)]">
        <span class="eyebrow">404</span>
        <h1 class="section-title mt-5">Project not found.</h1>
        <p class="mt-4 text-muted">That case study doesn't exist or has moved.</p>
        <a href="index.html#projects" class="btn btn-primary mt-8"><i class="fa-solid fa-arrow-left text-xs" aria-hidden="true"></i> All projects</a>
      </section>`;
    return;
  }

  const p = projects[i];
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];
  const isClient = p.group === 'client';

  document.title = `${p.title} — Case Study | ${profile.name}`;
  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute('content', p.summary);

  const linkButtons = [
    p.links && p.links.live &&
      `<a href="${UI.esc(p.links.live)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Visit live site <i class="fa-solid fa-arrow-up-right-from-square text-xs" aria-hidden="true"></i></a>`,
    p.links && p.links.github &&
      `<a href="${UI.esc(p.links.github)}" target="_blank" rel="noopener noreferrer" class="btn btn-ghost"><i class="fa-brands fa-github" aria-hidden="true"></i> Source code</a>`,
  ].filter(Boolean).join('');

  root.innerHTML = `
    <section class="container-x pt-[calc(var(--nav-h)+3.5rem)]">
      <a href="index.html#projects" class="inline-flex items-center gap-2 text-sm text-muted hover:text-fg transition">
        <i class="fa-solid fa-arrow-left text-xs" aria-hidden="true"></i> All projects
      </a>
      <div class="mt-10 flex flex-wrap items-center gap-3">
        <span class="project-index">${UI.pad(i + 1)} / ${UI.pad(projects.length)}</span>
        ${isClient ? `<span class="badge-gold"><i class="fa-solid fa-star text-[9px]" aria-hidden="true"></i> Client work</span>` : ''}
      </div>
      <p class="project-kicker ${isClient ? '!text-gold' : ''}">${UI.esc(p.kicker)}</p>
      <h1 class="mt-4 font-heading font-extrabold tracking-tightest leading-[1] text-[clamp(2.5rem,7vw,5.5rem)]">${UI.esc(p.title)}<span class="text-accent">.</span></h1>
      <p class="mt-6 max-w-2xl text-lg text-muted leading-relaxed">${UI.esc(p.summary)}</p>
      ${linkButtons ? `<div class="mt-8 flex flex-wrap gap-3">${linkButtons}</div>` : ''}
    </section>

    <section class="container-x mt-14 cs-hero animate-fade-up">${UI.thumb(p, { size: 'lg' })}</section>

    <section class="container-x mt-14">
      <dl class="cs-meta py-8 border-y border-line">
        <div><dt>Role</dt><dd>${UI.esc(p.role)}</dd></div>
        <div><dt>Type</dt><dd>${isClient ? 'Client project' : 'Technical build'}</dd></div>
        <div><dt>Platform</dt><dd>${p.categories.includes('mobile') ? 'Web & Mobile' : 'Web'}</dd></div>
        <div><dt>Live</dt><dd>${p.links && p.links.live ? `<a class="hover:text-accent transition" href="${UI.esc(p.links.live)}" target="_blank" rel="noopener noreferrer">${UI.esc(UI.domain(p.links.live))}</a>` : 'Private build'}</dd></div>
      </dl>
    </section>

    <section class="container-x section !pt-16 grid lg:grid-cols-[1fr_1.3fr] gap-14">
      <div>
        <span class="eyebrow">Overview</span>
        <p class="mt-6 text-lg leading-relaxed">${UI.esc(p.description)}</p>
        <p class="mt-10 mb-4 group-label">Stack &amp; focus</p>
        <ul class="flex flex-wrap gap-2">${p.stack.map((s) => `<li class="chip">${UI.esc(s)}</li>`).join('')}</ul>
      </div>
      <div>
        <span class="eyebrow">Highlights</span>
        <ul class="cs-highlights mt-4">
          ${p.highlights.map((h) => `<li><i class="fa-solid fa-diamond" aria-hidden="true"></i><span>${UI.esc(h)}</span></li>`).join('')}
        </ul>
      </div>
    </section>

    <nav class="container-x pb-24 grid sm:grid-cols-2 gap-4 cs-nav" aria-label="More projects">
      <a href="project.html?slug=${encodeURIComponent(prev.slug)}">
        <span class="project-index"><i class="fa-solid fa-arrow-left mr-2" aria-hidden="true"></i>Previous</span>
        <span class="block mt-3 font-heading font-bold text-xl">${UI.esc(prev.title)}</span>
      </a>
      <a href="project.html?slug=${encodeURIComponent(next.slug)}" class="sm:text-right">
        <span class="project-index">Next<i class="fa-solid fa-arrow-right ml-2" aria-hidden="true"></i></span>
        <span class="block mt-3 font-heading font-bold text-xl">${UI.esc(next.title)}</span>
      </a>
    </nav>`;
})();
