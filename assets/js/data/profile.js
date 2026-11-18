/*
 * Profile data — single source of truth for identity, contact and navigation.
 * Plain global (not an ES module) so pages also work when opened via file://.
 */
window.SITE = window.SITE || {};

window.SITE.profile = {
  legalName: 'W.S.R. Rathnayaka',
  name: 'Shavindu Rashmika',
  shortName: 'shavindu',
  location: 'Sri Lanka',
  headline: 'Creative Technologist',
  roles: ['Social Media Manager', 'Web Developer'],
  tagline: 'Building Premium Digital Experiences',
  summary:
    'I design and engineer full-stack products on the MERN stack, run digital media strategy for brands, and bring ideas to life through photography, video and 3D.',
  cv: 'MYCV.pdf',
  portrait: 'assets/img/home/shavindu-portrait.webp',
  contact: {
    email: 'shavindu.rashmika928@gmail.com',
    phones: ['+94 74 23 27 807', '+94 71 10 98 429'],
    whatsapp: 'https://wa.me/94711098429',
  },
  socials: [
    { label: 'GitHub', icon: 'fab fa-github', url: 'https://github.com/ShavinduR' },
    { label: 'LinkedIn', icon: 'fab fa-linkedin-in', url: 'https://www.linkedin.com/in/shavindu-rashmika-rathnayake' },
    { label: 'Facebook', icon: 'fab fa-facebook-f', url: 'https://www.facebook.com/share/1DWMwvZ1x4/?mibextid=wwXIfr' },
    { label: 'Discord', icon: 'fab fa-discord', url: 'https://discord.com/users/1043745550467616788' },
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
 * Primary navigation. `id` is the section anchor on index.html.
 * Add an entry here once its section exists — layout.js builds the
 * desktop nav, mobile menu, and footer links from this list.
 */
window.SITE.nav = [
  { id: 'home', label: 'Home' },
  { id: 'skills', label: 'Expertise' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'design', label: 'Creative' },
  { id: 'contact', label: 'Contact' },
];
