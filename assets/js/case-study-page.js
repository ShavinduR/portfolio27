/*
 * Case-study page — case-study.html?slug=<slug>
 * Renders one entry of window.SITE.caseStudies (data/case-studies.js) into
 * [data-render="case-study"] using RENDER.caseStudy (render.js).
 */
(function () {
  const { caseStudies = [], profile } = window.SITE;
  const root = document.querySelector('[data-render="case-study"]');
  if (!root) return;

  const slug = new URLSearchParams(location.search).get('slug');
  const cs = caseStudies.find((c) => c.slug === slug);

  if (!cs) {
    document.title = `Case study not found | ${profile.name}`;
    root.innerHTML = `
      <section class="container-x min-h-[70vh] flex flex-col items-start justify-center pt-[var(--nav-h)]">
        <span class="eyebrow">404</span>
        <h1 class="section-title mt-5">Case study not found.</h1>
        <p class="mt-4 text-muted">That case study doesn't exist or has moved.</p>
        <a href="index.html#work" class="btn btn-primary mt-8"><i class="fa-solid fa-arrow-left text-xs" aria-hidden="true"></i> Selected work</a>
      </section>`;
    return;
  }

  const title = `${cs.title} — Case Study | ${profile.name}`;
  document.title = title;
  const set = (sel, attr, val) => { const el = document.querySelector(sel); if (el) el.setAttribute(attr, val); };
  set('meta[name="description"]', 'content', cs.summary);
  set('meta[property="og:title"]', 'content', title);
  set('meta[property="og:description"]', 'content', cs.summary);

  root.innerHTML = window.RENDER.caseStudy(slug);
})();
