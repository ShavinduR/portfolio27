/*
 * Case studies — the featured social media & content work.
 * Shown as cards in the "Selected work" section of the home page, and in full
 * at case-study.html?slug=<slug>, in the order listed here.
 *
 * Each one follows Problem → What I did → Result.
 *
 * ---------------------------------------------------------------- Metrics
 * `results` holds the headline numbers. Until you have a real number, keep it
 * as a placeholder:
 *
 *     { value: '', label: 'Follower growth', todo: true },
 *
 * Placeholders are HIDDEN on the live site (no empty boxes, nothing that says
 * "pending"), and `npm run build` prints a warning for each one so none are
 * forgotten. To publish a number, fill in `value` and delete `todo: true`:
 *
 *     { value: '+240%', label: 'Follower growth', note: 'in 6 months' },
 *
 * If a case study has no published numbers yet, its results strip simply
 * doesn't appear. `note` is optional small print under the label.
 *
 * ------------------------------------------------------------------ Fields
 *   slug, title, kicker, summary   card + page header
 *   client, role, timeframe, channels   the facts row (empty ones are hidden)
 *   logo        { src, knockout? }  the client's mark on the home-page card
 *   cover       { src, alt, fit? }  the big image at the top of the page
 *                                   (fit: 'contain' = logo on a light tile)
 *   problem     string               THE PROBLEM
 *   actions     [string]             WHAT I DID
 *   results     [{ value, label, note?, todo? }]
 *   outcome     string               THE RESULT, in words (sits with the numbers)
 *   bonus       { title, text }      optional "beyond the brief" call-out
 *   quote       { text, name, role } optional client testimonial
 *   gallery     [{ src, alt, title, fit? }]  images not uploaded yet are skipped
 *   tools       [string]
 *   links       [{ label, url }]     live pages
 *
 * The wording below is a first draft from the CV and gallery notes: read it
 * through and correct anything that isn't exactly how it happened.
 */
window.SITE = window.SITE || {};

window.SITE.caseStudies = [
  {
    slug: 'peak-moments-group',
    title: 'Peak Moments Group',
    kicker: 'PM · PMR · ILM — Social media & content',
    summary:
      'Social media strategy and content production for a group of three photography brands, plus the three websites their content points to.',
    client: 'Peak Moments, Peak Moments by Rumesh & I Like Media',
    role: 'Social media strategy, content production & web',
    timeframe: 'Dec 2025 — Aug 2026',
    channels: 'Social media · 3 websites',
    hue: 38,
    logo: { src: 'assets/img/clients/peak-moments-logo-knockout.webp', knockout: true },
    cover: {
      src: 'assets/img/projects/peak-moments.webp',
      alt: 'The Peak Moments website home page',
    },
    problem:
      'Three photography brands under one roof, each with a different audience: lifestyle shoots, a personal wedding brand and corporate media. Each one needed its own voice on social media, without the group looking like three unrelated businesses or the workload tripling.',
    actions: [
      'Planned the social media strategy and content for all three brands, giving each its own audience, tone and content mix.',
      'Photographed and filmed boutique weddings and corporate events, then edited and colour-graded the work into posts and reels.',
      'Designed and built the three official websites, so social traffic lands on a page made to turn a visitor into a booking.',
      'Kept one visual language across the group, so every channel reads as the same studio.',
    ],
    results: [
      { value: '', label: 'Reach growth', todo: true },
      { value: '', label: 'Follower growth', todo: true },
      { value: '', label: 'Booking enquiries', todo: true },
    ],
    outcome:
      'All three brands now run an active social presence and a website of their own, with the strategy, the shoots, the edits and the sites handled by one person.',
    gallery: [
      { src: 'assets/img/projects/peak-moments.webp', alt: 'Peak Moments website', title: 'Peak Moments — website' },
      { src: 'assets/img/projects/peak-moments-by-rumesh.webp', alt: 'Peak Moments by Rumesh website', title: 'Peak Moments by Rumesh — website' },
      { src: 'assets/img/projects/i-like-media.webp', alt: 'I Like Media website', title: 'I Like Media — website' },
    ],
    tools: ['Sony Alpha A7 III', 'Canon EOS R6', 'DJI Air 3S', 'DJI Ronin', 'DaVinci Resolve', 'Lightroom Classic', 'Premiere Pro', 'Photoshop'],
    links: [
      { label: 'peakmomentslifestyle.com', url: 'https://peakmomentslifestyle.com' },
      { label: 'peakmomentsbyrumesh.com', url: 'https://www.peakmomentsbyrumesh.com' },
      { label: 'ilikemediacorporate.com', url: 'https://ilikemediacorporate.com' },
    ],
  },
  {
    slug: 'tranquil-rest',
    title: 'Tranquil Rest',
    kicker: 'Riverside guest house — Full digital presence',
    summary:
      'A complete digital rebuild for a riverside guest house in Kosnathota: a new brand, every social channel, a booking website and a custom room management and billing system.',
    client: 'Tranquil Rest, Kosnathota',
    role: 'Rebrand, social media, website & PMS',
    timeframe: '',
    channels: 'All social channels (except YouTube) · Website',
    hue: 150,
    logo: { src: 'assets/img/clients/tranquil-rest-logo-strip.webp' },
    cover: {
      src: 'assets/img/projects/tranquil-rest.webp',
      alt: 'The Tranquil Rest booking website',
    },
    problem:
      'A guest house in a beautiful riverside setting, but with no consistent brand and no direct way for guests to discover it online and book without going through a middleman.',
    actions: [
      'Rebranded the guest house: a river-inspired logo and mark, a green-and-yellow palette, and visiting cards with a dual Call / WhatsApp layout.',
      'Set up and ran its social media channels (everything except YouTube) with one consistent look and regular content.',
      'Designed and built a booking website with direct WhatsApp booking, so guests skip third-party booking fees.',
      'Optimised the site for search, reaching a perfect Lighthouse SEO score.',
    ],
    results: [
      { value: '100/100', label: 'Lighthouse SEO score' },
      { value: '', label: 'Direct bookings', todo: true },
      { value: '', label: 'Follower growth', todo: true },
    ],
    outcome:
      'The guest house now has one recognisable brand, from the visiting card to the booking page, and guests can go from a social post to a confirmed booking without a middleman.',
    bonus: {
      title: 'Beyond the brief: a room management & billing system',
      text: 'I also built a custom property management system (PMS) to handle rooms, bookings and billing. The same person who plans the posts can build the tools that run behind them.',
    },
    gallery: [
      { src: 'assets/img/branding/tranquil-rest/tranquil-rest-logo.webp', alt: 'Tranquil Rest logo', title: 'Logo', fit: 'contain' },
      { src: 'assets/img/branding/tranquil-rest/tranquil-rest-visiting-card-front.webp', alt: 'Tranquil Rest visiting card, front', title: 'Visiting card — front', fit: 'contain' },
      { src: 'assets/img/branding/tranquil-rest/tranquil-rest-visiting-card-back.webp', alt: 'Tranquil Rest visiting card, back', title: 'Visiting card — back', fit: 'contain' },
      { src: 'assets/img/branding/tranquil-rest/tranquil-rest-brand-mockup.webp', alt: 'Tranquil Rest brand applied to stationery', title: 'Brand in use' },
    ],
    tools: ['Brand Identity', 'Social Media Management', 'React', 'Tailwind CSS', 'SEO', 'Vercel'],
    links: [{ label: 'tranquil-rest.vercel.app', url: 'https://tranquil-rest.vercel.app/' }],
  },
  {
    slug: 'space-billiards',
    title: 'Space Billiards',
    kicker: 'Billiards venue — Social media, content & campaigns',
    summary:
      'Brand identity, social media content and campaigns for a billiards venue: promotional creatives, 9-ball match-highlight reels and giveaways.',
    client: 'Space Billiards',
    role: 'Brand, social media, content & campaigns',
    timeframe: '',
    channels: 'Social media',
    hue: 220,
    logo: { src: 'assets/img/clients/space-billiards-logo-strip.webp' },
    cover: {
      src: 'assets/img/branding/space-billiards/space-billiards-logo.webp',
      alt: 'Space Billiards logo: a player lining up a cue shot above the word SPACE',
      fit: 'contain',
    },
    problem:
      'A billiards venue that needed more than a page posting opening hours: a social presence that gave people a reason to follow, share and come in to play.',
    actions: [
      'Designed the player-silhouette logo and carried it through every creative, so the venue is recognisable at a glance.',
      'Produced promotional creatives and brand visuals for a regular posting schedule.',
      'Filmed and edited 9-ball match-highlight reels that show the venue in action.',
      'Ran interactive giveaways to grow the audience and bring new players through the door.',
    ],
    results: [
      { value: '', label: 'Follower growth', todo: true },
      { value: '', label: 'Reel views', todo: true },
      { value: '', label: 'Giveaway entries', todo: true },
    ],
    outcome:
      'The venue now posts with one consistent identity across promos, reels and giveaways, all of it planned, shot and designed by me.',
    gallery: [
      { src: 'assets/img/branding/space-billiards/space-billiards-logo.webp', alt: 'Space Billiards logo', title: 'Logo', fit: 'contain' },
      { src: 'assets/img/branding/space-billiards/space-billiards-promo-1.webp', alt: 'Space Billiards promotional creative', title: 'Promotional creative' },
      { src: 'assets/img/branding/space-billiards/space-billiards-promo-2.webp', alt: 'Space Billiards brand visual', title: 'Brand visual' },
      { src: 'assets/img/branding/space-billiards/space-billiards-reel-cover-1.webp', alt: 'Cover frame from a 9-ball match highlights reel', title: '9-ball match highlights' },
      { src: 'assets/img/branding/space-billiards/space-billiards-giveaway-1.webp', alt: 'Space Billiards giveaway post', title: 'Social media giveaway' },
    ],
    tools: ['Brand Identity', 'Social Media Design', 'Videography', 'Reels', 'Campaigns & Giveaways'],
    links: [],
  },
];

/*
 * Client testimonials. Leave the list empty and the section stays hidden.
 *   { text: '…', name: 'Rumesh …', role: 'Founder, Peak Moments by Rumesh' }
 */
window.SITE.testimonials = [];
