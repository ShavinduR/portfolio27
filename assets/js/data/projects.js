/*
 * Projects — rendered in the order listed here.
 *
 * Fields
 *   slug         URL id → project.html?slug=<slug>
 *   location     optional, e.g. 'Polgasowita, Sri Lanka' (shown on the case study)
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
    kicker: 'PM · Lifestyle Photography Studio',
    location: 'Polgasowita, Piliyandala',
    group: 'client',
    categories: ['client'],
    role: 'Website Design & Development',
    summary:
      'Portfolio website for a lifestyle photography studio in Polgasowita, Piliyandala, specialising in maternity, family, celebrations and personal branding, with a WhatsApp booking form.',
    description:
      'Peak Moments is a lifestyle photography studio in Polgasowita, Piliyandala, specialising in maternity, family, celebration and personal-branding shoots. I designed, built and launched its portfolio website, with a photo gallery that lets the work lead and a WhatsApp booking form that turns visitors into enquiries.',
    highlights: [
      'Portfolio website with a photo gallery for maternity, family, celebration and branding work',
      'WhatsApp booking form that sends enquiries straight to the studio',
      'Technical SEO and WebP image optimisation for fast, search-friendly pages',
      'Hosted and launched the site',
    ],
    stack: ['Portfolio Website', 'Photo Gallery', 'WhatsApp Booking Form', 'Technical SEO', 'WebP Optimization', 'Hosting & Launch'],
    links: { live: 'https://peakmomentslifestyle.com' },
    image: 'assets/img/projects/peak-moments.webp',
    placeholder: { layout: 'gallery', hue: 38, monogram: 'PM' },
  },
  {
    slug: 'peak-moments-by-rumesh',
    title: 'Peak Moments by Rumesh',
    kicker: 'PMR · Luxury Wedding Photography',
    location: 'Polgasowita, Piliyandala',
    group: 'client',
    categories: ['client'],
    role: 'Website Design & Development',
    summary:
      'Portfolio website for a luxury wedding and fine art photography studio in Polgasowita, Piliyandala, with a gallery-led layout and an enquiry form for couples.',
    description:
      'Peak Moments by Rumesh is a luxury wedding and fine art photography studio based in Polgasowita, Piliyandala. I designed, built and launched its portfolio website: an elegant, gallery-led experience for cultural and destination weddings, with an enquiry form that makes it easy for couples to get in touch.',
    highlights: [
      'Portfolio website with wedding photo galleries',
      'Enquiry form that makes it easy for couples to book',
      'Technical SEO and WebP image optimisation for fast, search-friendly pages',
      'Hosted and launched the site',
    ],
    stack: ['Portfolio Website', 'Photo Gallery', 'Enquiry Form', 'Technical SEO', 'WebP Optimization', 'Hosting & Launch'],
    links: { live: 'https://www.peakmomentsbyrumesh.com' },
    image: 'assets/img/projects/peak-moments-by-rumesh.webp',
    placeholder: { layout: 'site', hue: 24, monogram: 'PMR' },
  },
  {
    slug: 'i-like-media',
    title: 'I Like Media',
    kicker: 'ILM · Corporate & Event Photography',
    location: 'Colombo, Sri Lanka',
    group: 'client',
    categories: ['client'],
    role: 'Website Design & Development',
    summary:
      'Corporate portfolio website for a Colombo agency covering corporate, fashion and luxury events, with categorised event galleries and a quote request form.',
    description:
      'I Like Media is a corporate, fashion and luxury event photography agency positioned for Colombo’s corporate events, operated by the same Polgasowita studio as Peak Moments. I designed, built and launched its corporate portfolio website, with event galleries organised by category and a quote / enquiry form for corporate clients.',
    highlights: [
      'Corporate portfolio website with categorised event galleries',
      'Quote / enquiry form for corporate and event clients',
      'Technical SEO for fast, search-friendly pages',
      'Hosted and launched the site',
    ],
    stack: ['Corporate Portfolio Website', 'Categorized Event Galleries', 'Quote / Enquiry Form', 'Technical SEO', 'Hosting & Launch'],
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
  {
    slug: 'bizmax',
    title: 'BizMax Solutions',
    kicker: 'My Company · Business Website',
    group: 'core',
    feature: true, // wide card: ends the grid on a full row
    categories: [],
    role: 'Founder · Design & Development',
    summary:
      'The website for my own digital agency, BizMax Solutions: a bold, conversion-focused site that presents our services and pricing and turns visitors into WhatsApp enquiries.',
    description:
      'BizMax Solutions is the digital growth agency I founded to help Sri Lankan businesses go digital with confidence. I designed and built its website to explain what we offer (brand development, website design and digital creation), show how we work (Deep Dive → Strategy → Launch), and make starting a project as simple as a WhatsApp message.',
    highlights: [
      'Home, Services and Pricing pages with a bold orange-and-black brand system',
      '“Start Project” enquiry form with a service selector, plus a floating WhatsApp button',
      'Clear three-step process section that explains how projects run',
      'Fast static build, hosted on GitHub Pages',
    ],
    stack: ['HTML', 'CSS', 'JavaScript', 'GitHub Pages'],
    links: { live: 'https://shavindur.github.io/BizMax/', github: 'https://github.com/ShavinduR/BizMax' },
    image: 'assets/img/projects/bizmax.webp',
    placeholder: { layout: 'site', hue: 24, monogram: 'BM' },
  },
];
