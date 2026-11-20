/*
 * Experience, education and expertise (from CV).
 * Items render top-to-bottom in the order listed. `current: true` adds a live indicator.
 * Optional: `logo` { src, alt } shows a badge; `links` [{ label, icon, url }] adds buttons.
 */
window.SITE = window.SITE || {};

window.SITE.experience = [
  {
    role: 'Founder',
    org: 'BizMax Solutions',
    period: '', // add dates, e.g. '2023 — Present' (and `current: true` if ongoing)
    logo: { src: 'assets/img/brands/bizmax/bizmax-logo-badge.webp', alt: 'BizMax Solutions logo' },
    points: [
      'Founded BizMax Solutions, a digital growth partner helping Sri Lankan businesses go digital with confidence.',
      'Offers brand development, website design and digital content creation, delivered through a Deep Dive → Strategy → Launch process.',
      'Designed and built the company website, and lead its digital media operations.',
    ],
    tags: ['Brand Development', 'Website Design', 'Digital Content', 'Entrepreneurship'],
    links: [
      { label: 'Website', icon: 'fa-solid fa-arrow-up-right-from-square', url: 'https://shavindur.github.io/BizMax/' },
      { label: 'Facebook', icon: 'fab fa-facebook-f', url: 'https://www.facebook.com/share/1Fo4taBaAg/' },
      { label: 'Instagram', icon: 'fab fa-instagram', url: 'https://www.instagram.com/bizmax.solutions/' },
    ],
  },
  {
    role: 'ICT & Digital Media Intern / Executive',
    org: 'Peak Moments',
    orgDetail: 'PM · PMR · ILM',
    period: 'Dec 2025 — Present',
    current: true,
    points: [
      'Managed social media strategy and designed and developed the three official photography brand websites.',
      'Freelance event photography and videography with advanced post-production — editing and colour grading — for boutique weddings and corporate events.',
      'Hands-on with high-end studio gear and professional post-production software.',
    ],
    tags: [
      'Sony Alpha A7 III', 'Canon EOS R6', 'DJI Air 3S', 'DJI Ronin',
      'DaVinci Resolve', 'Lightroom Classic', 'Premiere Pro', 'Photoshop',
    ],
  },
  {
    role: 'Social Media Designer & Freelance Graphic Designer',
    org: 'Freelance',
    period: '2021 — Present',
    current: true,
    points: [
      'Designed brand-aligned logos, digital assets and complete content strategies for a range of clients.',
    ],
    tags: ['Brand Identity', 'Social Media Design', 'Content Strategy'],
  },
  {
    role: 'Trainee Banker',
    org: 'People’s Bank',
    orgDetail: 'Pallebedda',
    period: '2020 — 2021',
    points: [
      'Supported daily banking operations and improved workflow efficiency using digital tools.',
    ],
    tags: ['Operations', 'Customer Service'],
  },
];

window.SITE.education = [
  {
    degree: 'Bachelor of Information and Communication Technology (Hons)',
    short: 'BICT (Hons)',
    school: 'University of Sri Jayewardenepura',
    period: '2022 — Present',
  },
];

window.SITE.expertise = [
  {
    title: 'Full-stack Engineering',
    icon: 'fa-solid fa-layer-group',
    summary: 'Production web apps on the MERN stack, including real-time features.',
    items: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Socket.IO', 'Tailwind CSS'],
  },
  {
    title: 'Mobile & Cloud',
    icon: 'fa-solid fa-cloud',
    summary: 'Cross-platform apps, plus deployment and storage in the cloud.',
    items: ['React Native', 'Expo', 'Vercel', 'Render', 'Cloudflare R2'],
  },
  {
    title: 'Digital Media & Brand',
    icon: 'fa-solid fa-bullhorn',
    summary: 'Strategy, identity and content that make brands look and perform their best.',
    items: ['Digital Media Strategy', 'Social Media Management', 'UI/UX Design', 'Brand Identity'],
  },
  {
    title: 'Visual Production & 3D',
    icon: 'fa-solid fa-camera-retro',
    summary: 'Photography, film and motion, from the shoot through to the final grade.',
    items: ['Event Photography', 'Videography', 'Colour Grading', 'Autodesk Maya', 'Procedural Animation'],
  },
];
