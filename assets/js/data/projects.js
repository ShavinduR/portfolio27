/*
 * Projects — rendered in the order listed here.
 *
 * Fields
 *   slug         URL id → project.html?slug=<slug>
 *   group        'client' (highlighted real-world work) | 'core' (technical builds)
 *   categories   used by the filter bar on the home page
 *   links        { live, github } — omit or leave null to hide a button
 *   image        screenshot (assets/img/projects/…), shown inside a browser frame.
 *                While null, an elegant CSS wireframe is drawn instead.
 *   placeholder  { layout, hue, monogram }
 *                layout: 'site' | 'gallery' | 'shop' | 'auction' | 'game' | 'app' | 'mobile'
 *                hue:    0–360, tints the card's ambient glow
 */
window.SITE = window.SITE || {};

window.SITE.projectFilters = [
  { id: 'all', label: 'All work' },
  { id: 'client', label: 'Client work' },
  { id: 'fullstack', label: 'Full-stack' },
  { id: 'ecommerce', label: 'E-commerce' },
  { id: 'realtime', label: 'Real-time' },
  { id: 'mobile', label: 'Mobile' },
];

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
    slug: 'tranquil-rest',
    title: 'Tranquil Rest Kosnathota',
    kicker: 'Boutique Guest House',
    group: 'core',
    categories: ['client'],
    role: 'Design & Development',
    summary:
      'The official web platform for a boutique guest house, with direct WhatsApp booking and a 100 Lighthouse SEO score.',
    description:
      'The official website for Tranquil Rest, a boutique guest house in Kosnathota. Guests can browse rooms and book directly over WhatsApp, and the build is tuned for search with a perfect Lighthouse SEO score.',
    highlights: [
      'Direct WhatsApp booking flow — no third-party booking fees',
      '100 / 100 Lighthouse SEO score',
      'Fast React + Vite build deployed on Vercel',
    ],
    stack: ['React (Vite)', 'Tailwind CSS', 'SEO', 'Vercel'],
    links: { live: 'https://tranquil-rest.vercel.app/' },
    image: 'assets/img/projects/tranquil-rest.webp',
    placeholder: { layout: 'site', hue: 158, monogram: 'TR' },
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
    slug: 'medilink-eacydine',
    title: 'MediLink & EacyDine',
    kicker: 'Mobile Health · Restaurant Management',
    group: 'core',
    categories: ['fullstack', 'mobile'],
    role: 'Full-stack & Mobile Engineering',
    summary:
      'A full-stack MERN restaurant management system (EacyDine) and a bilingual mobile health assistant app (MediLink).',
    description:
      'Two complementary builds. EacyDine is a full-stack restaurant management system on the MERN stack. MediLink is a bilingual mobile health assistant built with React Native and Expo.',
    highlights: [
      'EacyDine — end-to-end restaurant management on the MERN stack',
      'MediLink — bilingual mobile health assistant',
      'Cross-platform mobile delivery with React Native and Expo',
    ],
    stack: ['MongoDB', 'Express.js', 'React', 'Node.js', 'React Native', 'Expo'],
    links: {},
    image: null,
    placeholder: { layout: 'mobile', hue: 188, monogram: 'ML' },
  },
];
