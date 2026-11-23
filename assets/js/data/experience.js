/*
 * Experience, education and expertise (from CV).
 * Items render top-to-bottom in the order listed. `current: true` adds a live indicator.
 * Optional: `logo` { src, alt } shows a badge; `links` [{ label, icon, url }] adds buttons.
 */
window.SITE = window.SITE || {};

window.SITE.experience = [
  {
    role: 'Freelance Social Media Designer, Photographer & Visual Creator',
    org: 'Freelance',
    period: '2021 — Present',
    current: true,
    points: [
      'Plan and run social media for small businesses in hospitality, leisure and retail, from content calendars to campaigns and giveaways.',
      'Shoot, edit and colour-grade the photo and video content myself, including reels and event coverage.',
      'Design the brand identities, logos and social creatives that keep every channel consistent.',
    ],
    tags: ['Social Media Management', 'Content Strategy', 'Photography', 'Videography', 'Brand Identity', 'Graphic Design'],
  },
  {
    role: 'ICT & Digital Media Intern',
    org: 'Peak Moments',
    orgDetail: 'PM · PMR · ILM',
    period: 'Dec 2025 — Aug 2026',
    points: [
      'Managed social media strategy and content for three photography brands: Peak Moments, Peak Moments by Rumesh and I Like Media.',
      'Photographed and filmed boutique weddings and corporate events, through to editing and colour grading.',
      'Designed and built all three official brand websites, keeping one visual language across the group.',
    ],
    tags: [
      'Sony Alpha A7 III', 'Canon EOS R6', 'DJI Air 3S', 'DJI Ronin',
      'DaVinci Resolve', 'Lightroom Classic', 'Premiere Pro', 'Photoshop',
    ],
    links: [
      { label: 'Read the case study', icon: 'fa-solid fa-arrow-right', url: 'case-studies/peak-moments-group.html', internal: true },
    ],
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
    title: 'Social Media Strategy',
    icon: 'fa-solid fa-bullhorn',
    summary: 'Channel strategy, content planning and campaigns built around what the brand needs to grow.',
    items: ['Social Media Management', 'Content Strategy', 'Content Planning', 'Campaigns & Giveaways', 'Paid Ads'],
  },
  {
    title: 'Content Production',
    icon: 'fa-solid fa-camera-retro',
    summary: 'I shoot, film and edit the content myself, from the first frame to the final colour grade.',
    items: ['Photography', 'Videography', 'Reels & Short-form', 'Editing', 'Colour Grading'],
  },
  {
    title: 'Design & Brand Identity',
    icon: 'fa-solid fa-pen-nib',
    summary: 'Logos, brand systems and social creatives that make every post look like the same brand.',
    items: ['Brand Identity', 'Logo Design', 'Social Media Design', 'Print & Merch'],
  },
  {
    title: 'Web, as a bonus',
    icon: 'fa-solid fa-code',
    summary: 'When the campaign needs somewhere to land, I build it: websites, booking flows and simple business tools.',
    items: ['Website Design', 'Booking Websites', 'SEO', 'React'],
  },
];
