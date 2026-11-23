/*
 * Shared layout: renders the site header + footer into
 *   <header data-layout="nav"></header>
 *   <footer data-layout="footer"></footer>
 * and wires up theme toggle, mobile menu, scroll-spy and reveal animations.
 *
 * Requires assets/js/data/profile.js to be loaded first.
 * Set <body data-page="home"> on index.html; any other value marks a sub-page
 * (nav links then point back to index.html#section).
 */
(function () {
  const { profile, nav } = window.SITE;
  const isHome = document.body.dataset.page === 'home';
  const href = (id) => (isHome ? `#${id}` : `index.html#${id}`);
  const year = new Date().getFullYear();

  const logo = `
    <a href="${href('home')}" class="font-heading font-extrabold text-lg tracking-tight text-fg" aria-label="${profile.name} — home">
      ${profile.shortName}<span class="text-accent">.</span>
    </a>`;

  const themeBtn = (cls = '') => `
    <button type="button" data-theme-toggle class="icon-btn ${cls}" aria-label="Toggle colour theme">
      <i class="fas fa-sun hidden dark:inline" aria-hidden="true"></i>
      <i class="fas fa-moon dark:hidden" aria-hidden="true"></i>
    </button>`;

  const navLinks = nav
    .map((l) => `<a href="${href(l.id)}" data-nav="${l.id}" class="nav-link">${l.label}</a>`)
    .join('');

  const mobileLinks = nav
    .map((l) => `<a href="${href(l.id)}" data-nav="${l.id}" class="nav-link block py-3 text-lg">${l.label}</a>`)
    .join('');

  const socials = profile.socials
    .map(
      (s) => `<a href="${s.url}" target="_blank" rel="noopener noreferrer" class="icon-btn" aria-label="${s.label}" title="${s.label}">
                <i class="${s.icon}" aria-hidden="true"></i></a>`
    )
    .join('');

  /* ---------------------------------------------------------------- Header */
  const header = document.querySelector('[data-layout="nav"]');
  if (header) {
    header.innerHTML = `
      <nav class="site-nav fixed inset-x-0 top-0 z-50 border-b border-transparent backdrop-blur-xl transition-colors duration-300" aria-label="Primary">
        <div class="container-x h-full flex items-center justify-between">
          ${logo}
          <div class="hidden lg:flex items-center gap-8 text-sm font-medium">${navLinks}</div>
          <div class="flex items-center gap-2">
            <a href="${profile.cv}" download="Shavindu-Rashmika-CV.pdf" class="hidden sm:inline-flex btn btn-ghost !py-2.5 !px-4 text-xs">
              CV <i class="fas fa-arrow-down text-accent" aria-hidden="true"></i>
            </a>
            ${themeBtn()}
            <button type="button" data-menu-toggle class="icon-btn lg:hidden" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu">
              <i class="fas fa-bars" aria-hidden="true"></i>
            </button>
          </div>
        </div>
        <div id="mobile-menu" class="hidden lg:hidden border-t border-line bg-bg">
          <div class="container-x py-4">${mobileLinks}</div>
        </div>
      </nav>`;
  }

  /* ---------------------------------------------------------------- Footer */
  const footer = document.querySelector('[data-layout="footer"]');
  if (footer) {
    footer.id = footer.id || 'contact';
    footer.className = 'mt-auto border-t border-line bg-surface';
    footer.innerHTML = `
      <div class="container-x section !pb-10">
        <div class="grid gap-12 md:grid-cols-[1.4fr_1fr]">
          <div>
            <span class="eyebrow">Contact</span>
            <h2 class="section-title mt-5">Let's make<br>your brand<br><span class="text-accent">worth following.</span></h2>
            <p class="mt-6 max-w-lg text-muted leading-relaxed">${profile.summary}</p>
            <div class="mt-8 flex flex-wrap gap-3">
              <a href="mailto:${profile.contact.email}" class="btn btn-primary">
                <i class="fas fa-envelope" aria-hidden="true"></i> Email me
              </a>
              <a href="${profile.contact.whatsapp}" target="_blank" rel="noopener noreferrer" class="btn btn-ghost">
                <i class="fab fa-whatsapp text-whatsapp" aria-hidden="true"></i> WhatsApp
              </a>
            </div>
          </div>
          <div class="md:justify-self-end space-y-6 text-sm">
            <div>
              <p class="text-muted mb-1">Email</p>
              <a href="mailto:${profile.contact.email}" class="font-medium hover:text-accent transition">${profile.contact.email}</a>
            </div>
            <div>
              <p class="text-muted mb-1">Phone</p>
              ${profile.contact.phones.map((p) => `<a href="tel:${p.replace(/\s/g, '')}" class="block py-1 font-medium hover:text-accent transition">${p}</a>`).join('')}
            </div>
            <div>
              <p class="text-muted mb-1">Based in</p>
              <p class="font-medium">${profile.location}</p>
            </div>
            <div class="flex gap-2 pt-2">${socials}</div>
          </div>
        </div>
        <div class="mt-16 pt-6 border-t border-line flex flex-col sm:flex-row gap-3 justify-between text-xs text-muted">
          <p>© ${year} ${profile.legalName} (${profile.name}). All rights reserved.</p>
          <a href="${href('home')}" class="hover:text-fg transition">Back to top <i class="fas fa-arrow-up ml-1" aria-hidden="true"></i></a>
        </div>
      </div>`;
  }

  /* ----------------------------------------------------------- Theme toggle */
  document.querySelectorAll('[data-theme-toggle]').forEach((btn) =>
    btn.addEventListener('click', () => {
      const dark = document.documentElement.classList.toggle('dark');
      try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch (e) {}
    })
  );

  /* ------------------------------------------------------------ Mobile menu */
  const menuBtn = document.querySelector('[data-menu-toggle]');
  const menu = document.getElementById('mobile-menu');
  const setMenu = (open) => {
    if (!menu) return;
    menu.classList.toggle('hidden', !open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menuBtn.querySelector('i').className = open ? 'fas fa-xmark' : 'fas fa-bars';
  };
  if (menuBtn && menu) {
    menuBtn.addEventListener('click', () => setMenu(menu.classList.contains('hidden')));
    menu.addEventListener('click', (e) => e.target.closest('a') && setMenu(false));
    document.addEventListener('keydown', (e) => e.key === 'Escape' && setMenu(false));
    document.addEventListener('click', (e) => {
      if (!menu.contains(e.target) && !menuBtn.contains(e.target)) setMenu(false);
    });
  }

  /* ----------------------------------------------------- Nav scrolled state */
  const navEl = document.querySelector('.site-nav');
  const onScroll = () => navEl && navEl.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ------------------------------------------------------------ Scroll-spy */
  // Sub-pages mark their parent section: <body data-nav="design">
  const parent = document.body.dataset.nav;
  if (!isHome && parent) {
    document.querySelectorAll(`[data-nav="${parent}"]`).forEach((l) => l.setAttribute('aria-current', 'page'));
  }

  if (isHome && 'IntersectionObserver' in window) {
    const links = document.querySelectorAll('[data-nav]');
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          links.forEach((l) =>
            l.dataset.nav === entry.target.id ? l.setAttribute('aria-current', 'true') : l.removeAttribute('aria-current')
          );
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    nav.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) spy.observe(el);
    });
  }

  /* --------------------------------------------------------- Reveal on view */
  const reveals = document.querySelectorAll('.reveal');
  // Anything already on screen at load shows instantly — no fade, no LCP delay.
  reveals.forEach((el) => {
    if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('is-visible', 'no-anim');
  });
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12 }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'));
  }
})();
