/*
 * Experience, education and expertise (from CV).
 * Items render top-to-bottom in the order listed. `current: true` adds a live indicator.
 */
window.SITE = window.SITE || {};

window.SITE.experience = [
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
    orgDetail: 'Palledbadda',
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
