/*
 * Profile data — single source of truth for identity, contact and navigation.
 * Plain global (not an ES module) so pages also work when opened via file://.
 */
window.SITE = window.SITE || {};

window.SITE.profile = {
  legalName: 'W.S.R. Rathnayaka',
  name: 'Shavindu Rashmika',
  shortName: 'shavindu',
  url: 'https://shavindur.github.io/portfolio27/', // live site — used for share tags, canonical URLs and sitemap.xml
  location: 'Sri Lanka',
  headline: 'Social Media Strategist & Visual Creator',
  tagline: 'I plan the strategy, shoot the content and build the page it lands on.',
  summary:
    'I plan social media strategy, then shoot, edit and design the content myself, and build the website when a brand needs one.',
  cv: 'MYCV.pdf',
  portrait: 'assets/img/home/shavindu-portrait.webp',
  contact: {
    email: 'shavindu.rashmika928@gmail.com',
    phones: ['+94 71 109 8429'],
    whatsapp: 'https://wa.me/94711098429',
  },
  socials: [
    { label: 'LinkedIn', icon: 'fab fa-linkedin-in', url: 'https://www.linkedin.com/in/shavindu-rashmika-rathnayake' },
    { label: 'Instagram', icon: 'fab fa-instagram', url: 'https://www.instagram.com/_shavi.boy_/' },
    { label: 'GitHub', icon: 'fab fa-github', url: 'https://github.com/ShavinduR' },
  ],
  stack: {
    core: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Socket.IO'],
    mobile: ['React Native', 'Expo'],
    cloud: ['Render', 'Vercel', 'Cloudflare R2'],
    creative: [
      'Digital Media Strategy',
      'UI/UX Design',
      'Event Photography & Videography',
      '3D Modeling & Procedural Animation (Autodesk Maya)',
    ],
  },
};

/*
 * Client logo strip ("Worked with") under the hero. Shown as one-colour marks
 * that blend into the page; `href` links to the related project or case study.
 * `tall: true` gives square/tall logos more height so all marks look balanced.
 * `knockout: true` = a transparent logo (lettering cut out of a shape), tinted instead of inverted.
 * `boost: true` = a fine-lined logo that reads faint next to the others; drawn larger and brighter.
 */
window.SITE.clients = [
  { name: 'Peak Moments', logo: 'assets/img/clients/peak-moments-logo-knockout.webp', href: 'case-study.html?slug=peak-moments-group', knockout: true },
  { name: 'Peak Moments by Rumesh', logo: 'assets/img/clients/peak-moments-by-rumesh-logo-strip.webp', href: 'case-study.html?slug=peak-moments-group', tall: true, boost: true },
  { name: 'I Like Media', logo: 'assets/img/clients/i-like-media-logo-strip.webp', href: 'case-study.html?slug=peak-moments-group' },
  { name: 'Tranquil Rest Kosnathota', logo: 'assets/img/clients/tranquil-rest-logo-strip.webp', href: 'case-study.html?slug=tranquil-rest', tall: true, boost: true },
  { name: 'Space Billiards', logo: 'assets/img/clients/space-billiards-logo-strip.webp', href: 'case-study.html?slug=space-billiards' },
];

/*
 * Primary navigation. `id` is the section anchor on index.html.
 * Add an entry here once its section exists — layout.js builds the
 * desktop nav, mobile menu, and footer links from this list.
 */
window.SITE.nav = [
  { id: 'work', label: 'Work' },
  { id: 'skills', label: 'Skills' },
  { id: 'design', label: 'Creative' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];
