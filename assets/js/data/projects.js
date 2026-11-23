/*
 * Web builds — rendered in the order listed here, in the compact
 * "Web builds" section near the bottom of the home page. Social media and
 * content work lives in case-studies.js instead.
 *
 * Fields
 *   slug         URL id → project.html?slug=<slug>
 *   group        'client' (highlighted real-world work) | 'core' (technical builds)
 *   categories   tags (client, fullstack, ecommerce, realtime, mobile)
 *   links        { live, github } — omit or leave null to hide a button
 *   image        screenshot (assets/img/projects/…), shown inside a browser frame.
 *                While null, an elegant CSS wireframe is drawn instead.
 *   placeholder  { layout, hue, monogram }
 *                layout: 'site' | 'gallery' | 'shop' | 'auction' | 'game' | 'app' | 'mobile'
 *                hue:    0–360, tints the card's ambient glow
 */
window.SITE = window.SITE || {};

window.SITE.projects = [
  /* ------------------------------------------------ Highlighted client work */
  {
    slug: 'peak-moments',
    title: 'Peak Moments',
    kicker: 'PM · Official Website',
    group: 'client',
    categories: ['client'],
    role: 'Design & Development',
    summary:
      'A responsive portfolio website showcasing professional photography services — built to turn visitors into booked clients.',
    description:
      'The official home of Peak Moments. I designed and developed a responsive portfolio experience that puts the photography first, presenting services with clarity and guiding visitors toward enquiries — improving client acquisition for the studio.',
    highlights: [
      'Responsive, image-led layouts that let the photography carry the brand',
      'Clear service presentation and enquiry paths to improve client acquisition',
      'Part of a three-brand web ecosystem built for the Peak Moments group',
    ],
    stack: ['Web Design', 'Responsive UI', 'SEO'],
    links: { live: 'https://peakmomentslifestyle.com' },
    image: 'assets/img/projects/peak-moments.webp',
    placeholder: { layout: 'gallery', hue: 38, monogram: 'PM' },
  },
  {
    slug: 'peak-moments-by-rumesh',
    title: 'Peak Moments by Rumesh',
    kicker: 'PMR · Brand Platform',
    group: 'client',
    categories: ['client'],
    role: 'UI/UX & Development',
    summary:
      'A targeted web platform for a personal photography brand, with a UI/UX flow designed to streamline customer bookings.',
    description:
      'A dedicated platform for the personal photography brand of Rumesh. The focus was UI/UX: a calm, editorial presentation of the work paired with a booking journey that removes friction for prospective clients.',
    highlights: [
      'Personal-brand storytelling through an editorial, portfolio-first layout',
      'Booking-focused user journey designed to streamline customer enquiries',
      'Optimised image presentation for fast, immersive browsing',
    ],
    stack: ['UI/UX', 'Web Design', 'Responsive UI'],
    links: { live: 'https://www.peakmomentsbyrumesh.com' },
    image: 'assets/img/projects/peak-moments-by-rumesh.webp',
    placeholder: { layout: 'site', hue: 24, monogram: 'PMR' },
  },
  {
    slug: 'i-like-media',
    title: 'I Like Media',
    kicker: 'ILM · Digital Platform',
    group: 'client',
    categories: ['client'],
    role: 'Design & Development',
    summary:
      'A dynamic website presenting commercial media and corporate photography services with a strong, credible brand voice.',
    description:
      'The digital platform for I Like Media, the commercial arm of the group. The site communicates corporate media and photography services with credibility, structured service content and a polished visual identity.',
    highlights: [
      'Corporate-grade presentation focused on brand credibility',
      'Structured service pages for commercial media and corporate photography',
      'Consistent design language shared across the Peak Moments brands',
    ],
    stack: ['Web Design', 'Corporate UI', 'SEO'],
    links: { live: 'https://ilikemediacorporate.com' },
    image: 'assets/img/projects/i-like-media.webp',
    placeholder: { layout: 'site', hue: 210, monogram: 'ILM' },
  },

  {
    slug: 'tranquil-rest',
    title: 'Tranquil Rest',
    kicker: 'TR · Booking Website',
    group: 'client',
    categories: ['client'],
    role: 'Design & Development',
    summary:
      'The booking website for a riverside guest house in Kosnathota, with direct WhatsApp booking and a 100/100 Lighthouse SEO score.',
    description:
      'The official website for Tranquil Rest, a riverside guest house in Kosnathota, built as part of a full digital rebrand (see the case study for the social media and brand side). Guests browse the rooms and book directly over WhatsApp, with no third-party booking fees, and the site is tuned for search with a perfect Lighthouse SEO score.',
    highlights: [
      'Direct WhatsApp booking flow, so guests skip third-party booking fees',
      '100/100 Lighthouse SEO score',
      'Fast React + Vite build on Vercel, in the guest house’s new brand identity',
    ],
    stack: ['React (Vite)', 'Tailwind CSS', 'SEO', 'Vercel'],
    links: { live: 'https://tranquil-rest.vercel.app/' },
    image: 'assets/img/projects/tranquil-rest.webp',
    placeholder: { layout: 'site', hue: 150, monogram: 'TR' },
  },

  /* ------------------------------------------------ Core technical projects */
  {
    slug: 'customt',
    title: 'CustomT',
    kicker: 'Marketplace · B2B Reverse Auction',
    group: 'core',
    feature: true,
    categories: ['fullstack', 'ecommerce', 'realtime'],
    role: 'Full-stack Engineering',
    summary:
      'A centralised e-commerce marketplace and B2B reverse-auction platform with a visual garment configurator and real-time bidding.',
    description:
      'CustomT brings custom apparel buyers and manufacturers into one marketplace. Buyers design garments in an interactive visual configurator, then suppliers compete in a live reverse auction. Supplier onboarding is protected by a KYB verification flow with documents stored on Cloudflare R2.',
    highlights: [
      'Interactive visual garment configurator',
      'Real-time reverse-auction bidding engine over WebSockets (Socket.IO)',
      'KYB (Know Your Business) verification with document storage on Cloudflare R2',
      'API on Render, front-end on Vercel',
    ],
    stack: ['MongoDB', 'Express.js', 'React', 'Node.js', 'Socket.IO', 'Cloudflare R2', 'Render', 'Vercel'],
    links: { live: 'https://customt.vercel.app/', github: 'https://github.com/ShavinduR/customt' },
    image: 'assets/img/projects/customt.webp',
    placeholder: { layout: 'auction', hue: 262, monogram: 'CT' },
  },
  {
    slug: 'money-manager',
    title: 'Money Manager',
    kicker: 'Personal Finance PWA · Local-first',
    group: 'core',
    categories: ['mobile'],
    role: 'Personal project · Design & Development',
    summary:
      'An offline-first personal finance planner that logs money in and out, carries balances forward, simulates debt payoff and understands Singlish and Sinhala quick-add.',
    description:
      'Money Manager (Mindset Finance Planner) turns a printed four-year financial planner into an installable app that does the arithmetic for you. You log income, savings, debt payments and bills each month; it carries the balance forward, ranks your spending, tracks debts with a payoff simulator and rolls everything up into a yearly summary. It works offline and keeps every byte on your device.',
    highlights: [
      'Quick-add bar that understands English, Singlish and Sinhala ("ada lunch 850") with a confirmation step before saving',
      'Debt payoff simulator: extra-payment slider, interest saved and the payment needed to hit a goal date',
      'Yearly summary with charts, a monthly matrix and category breakdowns in LKR and other currencies',
      'Installable offline PWA: data stays on the device in IndexedDB, with JSON export and import',
    ],
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Recharts', 'Zustand', 'IndexedDB', 'PWA', 'Vitest'],
    links: { live: 'https://money-manager-expences-tracker.vercel.app/', github: 'https://github.com/ShavinduR/MoneyManager-ExpencesTracker' },
    image: 'assets/img/projects/money-manager.webp',
    placeholder: { layout: 'app', hue: 140, monogram: 'MM' },
  },
  {
    slug: 'kidsla',
    title: 'KIDSLA',
    kicker: 'Premium Kidswear · E-commerce',
    group: 'core',
    categories: ['fullstack', 'ecommerce'],
    role: 'Full-stack Engineering',
    summary:
      'A premium children’s clothing store with WhatsApp checkout routing, database-backed inventory and a secure admin dashboard.',
    description:
      'KIDSLA is a premium children’s clothing e-commerce web app. Orders are routed straight into WhatsApp for a familiar, high-conversion checkout, while a secure admin dashboard manages a MongoDB-backed inventory.',
    highlights: [
      'WhatsApp checkout routing for a frictionless local buying experience',
      'MongoDB-backed product and inventory management',
      'Secure admin dashboard for catalogue and stock control',
    ],
    stack: ['React (Vite)', 'Tailwind CSS', 'MongoDB', 'Vercel'],
    links: { live: 'https://kidsla.vercel.app/' },
    image: 'assets/img/projects/kidsla.webp',
    placeholder: { layout: 'shop', hue: 330, monogram: 'KL' },
  },
  {
    slug: 'sri-lankan-dam',
    title: 'Sri Lankan Dam Multiplayer',
    kicker: 'Real-time Board Game',
    group: 'core',
    categories: ['fullstack', 'realtime'],
    role: 'Full-stack Engineering',
    summary:
      'A real-time, browser-based multiplayer Dam board game built for Sri Lankan players, with custom Sinhala UI reactions.',
    description:
      'A web-based take on the traditional Dam board game, built for Sri Lankan players. Matches are played live over Socket.IO, and players express themselves with custom Sinhala reactions in the UI.',
    highlights: [
      'Real-time multiplayer networking with Socket.IO',
      'Custom Sinhala UI reactions tailored to local players',
      'Runs in the browser — no install required',
    ],
    stack: ['React', 'Node.js', 'Socket.IO', 'Vercel'],
    links: { live: 'https://srilankan-dam-game-sandy.vercel.app/' },
    image: 'assets/img/projects/sri-lankan-dam.webp',
    placeholder: { layout: 'game', hue: 14, monogram: 'දා' },
  },
  {
    slug: 'facet',
    title: 'FACET Fine Jewelry',
    kicker: 'Experimental · Luxury E-commerce',
    group: 'core',
    categories: ['ecommerce'],
    role: 'Personal project · Design & Development',
    summary:
      'A dark, luxury storefront for natural Ceylon sapphires and fine jewellery from Ratnapura, with an interactive 3D ring viewer and WhatsApp-first buying.',
    description:
      'An experimental project: FACET (formerly Gem City) is a concept storefront for hand-selected natural sapphires and fine jewellery from Sri Lanka’s City of Gems, aimed at buyers worldwide. I built the site as a premium, data-driven catalogue: every stone is one line of data that feeds the grid, search, product dialog, pre-filled WhatsApp message and SEO schema, while trust features such as live video viewing, lab reports and insured delivery answer an overseas buyer’s concerns up front.',
    highlights: [
      'Data-driven catalogue of ~80 gems and jewellery pieces with filters, search and shareable links',
      'Interactive WebGL 3D ring viewer (three.js), loaded only when it scrolls into view',
      'Multi-currency pricing (LKR, USD, GBP, EUR, AUD) and WhatsApp-first inquiry flow',
      'Dark luxury design system with WCAG AA contrast, self-hosted fonts and a journal of SEO articles',
    ],
    stack: ['HTML', 'CSS', 'JavaScript (ES modules)', 'three.js', 'WebP pipeline', 'Vercel'],
    links: { live: 'https://facet-seven-xi.vercel.app/', github: 'https://github.com/ShavinduR/GEM-CITY' },
    image: 'assets/img/projects/facet.webp',
    placeholder: { layout: 'shop', hue: 44, monogram: 'FA' },
  },
];
