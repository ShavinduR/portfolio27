/*
 * Creative galleries — one entry per gallery page (logo.html, branding.html, …).
 * Each page is a thin shell; assets/js/gallery-page.js renders it from here.
 *
 * Block types
 *   features  alternating image/text rows          { items: [{ src, alt, title, kicker, text }] }
 *   cases     brand case studies                   { items: [{ name, kicker, text, hero, palette?, images }] }
 *   grid      image grid                           { title?, variant: 'square'|'contain'|'product', items }
 *   masonry   natural-ratio photo wall             { items: [{ src, alt, title?, tag? }] }
 *   cta       closing call to action               { title, text, label, href }
 * Every image opens in the lightbox.
 */
window.SITE = window.SITE || {};

/* Order of the tabs shown on every Creative page. */
window.SITE.creativeNav = [
  { id: 'logo', label: 'Logo Design', href: 'logo.html' },
  { id: 'branding', label: 'Branding', href: 'branding.html' },
  { id: 'social', label: 'Social Media', href: 'social.html' },
  { id: 'merch', label: 'Merch', href: 'merch.html' },
  { id: 'wildlife', label: 'Wildlife', href: 'wildlife.html' },
  { id: 'portrait', label: 'Portrait', href: 'portrait.html' },
];

window.SITE.galleries = {
  logo: {
    title: 'Logo Design',
    eyebrow: 'Identity',
    intro: 'Unique identities and visual stories, built to be recognised at a glance.',
    blocks: [
      {
        type: 'features',
        items: [
          {
            src: 'assets/img/logo/d2d.webp',
            alt: 'Day To Day Deals logo',
            title: 'Day To Day Deals',
            kicker: 'Online Retail Brand Identity',
            text: 'Day To Day Deals is a dynamic online retail store on Facebook, specializing in small electronics and home accessories. The goal was to create a versatile and approachable visual identity that stands out in a social media feed. The design focuses on simplicity and trust, ensuring high visibility across digital platforms.',
          },
          {
            src: 'assets/img/logo/apex.webp',
            alt: 'APEX Computers logo',
            title: 'APEX Computers',
            kicker: 'Tech & Hardware Branding',
            text: "Apex Computers is a dedicated provider of high-performance computers and accessories. The brand needed a visual identity that reflects modern technology, speed, and reliability. We designed a sharp, geometric logo that embodies the concept of 'Apex'—representing top-tier quality and cutting-edge hardware solutions.",
          },
        ],
      },
      {
        type: 'grid',
        title: 'More concepts',
        variant: 'contain',
        items: [
          { src: 'assets/img/logo/apex.webp', alt: 'APEX Computers logo', title: 'APEX Computers' },
          { src: 'assets/img/logo/d2d.webp', alt: 'Day To Day Deals logo', title: 'Day To Day Deals' },
          { src: 'assets/img/logo/coffee.webp', alt: 'Coffee brand logo', title: 'Coffee brand' },
          { src: 'assets/img/logo/herba.webp', alt: 'Herba logo', title: 'Herba' },
          { src: 'assets/img/logo/e-hub.webp', alt: 'E Hub logo', title: 'E Hub' },
          { src: 'assets/img/logo/mount-hill.webp', alt: 'Mount Hill logo', title: 'Mount Hill' },
          {
            src: 'assets/img/logo/d2dh.webp',
            alt: 'Day To Day Deals (alternate) logo',
            title: 'Day To Day Deals (alternate)',
          },
          { src: 'assets/img/logo/s1.webp', alt: 'Logo concept logo', title: 'Logo concept' },
          { src: 'assets/img/logo/d2d-mark.webp', alt: 'Day To Day Deals (mark) logo', title: 'Day To Day Deals (mark)' },
        ],
      },
    ],
  },
  branding: {
    title: 'Brand Case Studies',
    eyebrow: 'Visual identity',
    intro: 'Complete design systems that tell a story, from the logo to every place the brand shows up.',
    blocks: [
      {
        type: 'cases',
        items: [
          {
            name: 'APEX',
            kicker: 'Computer Store',
            text: 'A bold visual identity for a modern computer store. The branding focuses on speed, technology, and reliability, using a sharp geometric logo and a dark, premium color palette to appeal to tech enthusiasts and professionals.',
            hero: { src: 'assets/img/brand/apex/3.webp', alt: 'APEX brand identity — key visual' },
            images: [
              { src: 'assets/img/brand/apex/2.webp', alt: 'APEX brand identity — application 1' },
              { src: 'assets/img/brand/apex/7.webp', alt: 'APEX brand identity — application 2' },
              { src: 'assets/img/brand/apex/6.webp', alt: 'APEX brand identity — application 3' },
              { src: 'assets/img/brand/apex/5.webp', alt: 'APEX brand identity — application 4' },
            ],
            palette: ['#1A1A1A', '#D4AF37', '#F5F5F5'],
          },
          {
            name: 'Herba',
            kicker: 'Wellness Beverage Branding',
            text: "Herba is a revitalizing herbal beverage brand rooted in traditional wellness. The design strategy focused on communicating vitality and natural health. We chose fresh green hues and organic shapes to highlight the drink's restorative ingredients, positioning it as a refreshing choice for a balanced lifestyle.",
            hero: { src: 'assets/img/brand/herba/1.webp', alt: 'Herba brand identity — key visual' },
            images: [
              { src: 'assets/img/brand/herba/5.webp', alt: 'Herba brand identity — application 1' },
              { src: 'assets/img/brand/herba/8.webp', alt: 'Herba brand identity — application 2' },
              { src: 'assets/img/brand/herba/3.webp', alt: 'Herba brand identity — application 3' },
              { src: 'assets/img/brand/herba/2.webp', alt: 'Herba brand identity — application 4' },
            ],
          },
          {
            name: 'Nature Glow',
            kicker: 'Organic Skincare Identity',
            text: "Nature Glow represents the essence of organic beauty. This branding project for a herbal skincare line emphasizes purity and earthiness. We utilized a soft, natural color palette and elegant typography to communicate the product's organic origin and gentle healing properties, appealing to health-conscious consumers.",
            hero: { src: 'assets/img/brand/nature-glow/3.webp', alt: 'Nature Glow brand identity — key visual' },
            images: [
              { src: 'assets/img/brand/nature-glow/1.webp', alt: 'Nature Glow brand identity — application 1' },
              { src: 'assets/img/brand/nature-glow/2.webp', alt: 'Nature Glow brand identity — application 2' },
              { src: 'assets/img/brand/nature-glow/4.webp', alt: 'Nature Glow brand identity — application 3' },
            ],
          },
          {
            name: 'Salon Roo',
            kicker: 'Unisex Salon & Grooming',
            text: "Salon Roo is a modern unisex salon dedicated to style and personal care. The branding aims for a sleek, gender-neutral appeal that feels inclusive and professional. The visual system uses sharp typography and a sophisticated color scheme to reflect the salon's commitment to high-quality grooming and transformation.",
            hero: { src: 'assets/img/brand/salon-roo/4.webp', alt: 'Salon Roo brand identity — key visual' },
            images: [
              { src: 'assets/img/brand/salon-roo/1.webp', alt: 'Salon Roo brand identity — application 1' },
              { src: 'assets/img/brand/salon-roo/2.webp', alt: 'Salon Roo brand identity — application 2' },
              { src: 'assets/img/brand/salon-roo/3.webp', alt: 'Salon Roo brand identity — application 3' },
              { src: 'assets/img/brand/salon-roo/5.webp', alt: 'Salon Roo brand identity — application 4' },
            ],
            palette: ['#3B82F6', '#1E293B', '#FFFFFF'],
          },
          {
            name: 'SS Cafe',
            kicker: 'Modern Coffee House Branding',
            text: 'SS Cafe captures the warm and inviting atmosphere of a modern coffee house. The visual identity blends rustic charm with contemporary aesthetics. Using rich brown tones and clean lines, the branding evokes the aroma of freshly brewed coffee, creating a welcoming space for conversation and relaxation.',
            hero: { src: 'assets/img/brand/ssccafe/8.webp', alt: 'SS Cafe brand identity — key visual' },
            images: [
              { src: 'assets/img/brand/ssccafe/1.webp', alt: 'SS Cafe brand identity — application 1' },
              { src: 'assets/img/brand/ssccafe/2.webp', alt: 'SS Cafe brand identity — application 2' },
              { src: 'assets/img/brand/ssccafe/3.webp', alt: 'SS Cafe brand identity — application 3' },
              { src: 'assets/img/brand/ssccafe/5.webp', alt: 'SS Cafe brand identity — application 4' },
            ],
          },
        ],
      },
    ],
  },
  social: {
    title: 'Social Media Design',
    eyebrow: 'Content creation',
    intro: 'Scroll-stopping posts for retail and lifestyle brands, made to sell.',
    blocks: [
      {
        type: 'grid',
        title: 'Tech & gadgets',
        variant: 'square',
        items: [
          {
            src: 'assets/img/social/dart-board.webp',
            alt: 'dart board — product social media post',
            title: 'dart board',
          },
          {
            src: 'assets/img/social/sit-in-comfort-sinhala.webp',
            alt: 'Motivational social media post with Sinhala text encouraging relaxation and comfort despite long hours, featuring warm and inviting aesthetic tones',
          },
          {
            src: 'assets/img/social/100-pcs-paper-cup-cake.webp',
            alt: '100 Pcs Paper Cup Cake — product social media post',
            title: '100 Pcs Paper Cup Cake',
          },
          {
            src: 'assets/img/social/kts-1655-radio.webp',
            alt: 'KTS-1655 radio — product social media post',
            title: 'KTS-1655 radio',
          },
          {
            src: 'assets/img/social/pen-laser-pointer.webp',
            alt: 'Pen Laser Pointer — product social media post',
            title: 'Pen Laser Pointer',
          },
          {
            src: 'assets/img/social/portable-folding-stool.webp',
            alt: 'Portable Folding Stool — product social media post',
            title: 'Portable Folding Stool',
          },
          {
            src: 'assets/img/social/paint-roller.webp',
            alt: 'Paint Roller — product social media post',
            title: 'Paint Roller',
          },
          {
            src: 'assets/img/social/video-making-kit.webp',
            alt: 'Video Making Kit — product social media post',
            title: 'Video Making Kit',
          },
          {
            src: 'assets/img/social/wifi-smart-camera.webp',
            alt: 'WiFi Smart Camera — product social media post',
            title: 'WiFi Smart Camera',
          },
          { src: 'assets/img/social/post-1.webp', alt: 'Social media post design' },
          { src: 'assets/img/social/post-3.webp', alt: 'Social media post design' },
          { src: 'assets/img/social/post-4.webp', alt: 'Social media post design' },
          { src: 'assets/img/social/post-5.webp', alt: 'Social media post design' },
          { src: 'assets/img/social/post-7.webp', alt: 'Social media post design' },
          { src: 'assets/img/social/post-8.webp', alt: 'Social media post design' },
          { src: 'assets/img/social/post-9.webp', alt: 'Social media post design' },
          { src: 'assets/img/social/post-15.webp', alt: 'Social media post design' },
          { src: 'assets/img/social/post-17.webp', alt: 'Social media post design' },
        ],
      },
    ],
  },
  merch: {
    title: 'Merchandise & Apparel',
    eyebrow: 'Product design',
    intro: 'Turning brands into wearable art and lifestyle products.',
    blocks: [
      {
        type: 'grid',
        title: 'Apparel collection',
        variant: 'product',
        items: [
          {
            src: 'assets/img/merch/1.webp',
            alt: 'Black streetwear t-shirt with bold typography',
            title: 'Urban Streetwear',
            text: 'Bold typography design',
            tag: 'Graphic Tees',
          },
          {
            src: 'assets/img/merch/2.webp',
            alt: 'Grey pullover hoodie mockup',
            title: 'Winter Essentials',
            text: 'Heavyweight cotton blend',
            tag: 'Premium Hoodies',
          },
          {
            src: 'assets/img/merch/3.webp',
            alt: 'Navy blue snapback cap with embroidery',
            title: 'Signature Snapback',
            text: '3D Embroidered logo',
            tag: 'Headwear',
          },
          {
            src: 'assets/img/merch/4.webp',
            alt: 'White t-shirt with abstract colorful illustration',
            title: 'Abstract Vision',
            text: 'Vibrant screen print',
            tag: 'Art Series',
          },
          {
            src: 'assets/img/merch/5.webp',
            alt: 'Oversized beige t-shirt mockup',
            title: 'Relaxed Collection',
            text: 'Drop shoulder cut',
            tag: 'Oversized Fit',
          },
          {
            src: 'assets/img/merch/6.webp',
            alt: 'Vintage wash black t-shirt',
            title: 'Retro Wash',
            text: 'Distressed finish',
            tag: 'Vintage Style',
          },
          {
            src: 'assets/img/merch/7.webp',
            alt: 'Long sleeve t-shirt with sleeve print',
            title: 'Layering Piece',
            text: 'Sleeve detail print',
            tag: 'Long Sleeve',
          },
          {
            src: 'assets/img/merch/8.webp',
            alt: 'Minimalist olive green pocket tee',
            title: 'Pocket Tee',
            text: 'Subtle branding',
            tag: 'Basics',
          },
          {
            src: 'assets/img/merch/9.webp',
            alt: 'Sporty performance fabric t-shirt',
            title: 'Performance Pro',
            text: 'Breathable fabric',
            tag: 'Active Wear',
          },
          {
            src: 'assets/img/merch/10.webp',
            alt: 'Tie-dye pattern t-shirt design',
            title: 'Tie-Dye Custom',
            text: 'Hand-dyed effect',
            tag: 'Summer Vibe',
          },
          {
            src: 'assets/img/merch/11.webp',
            alt: 'Black zip-up hoodie',
            title: 'Zip-Up Hoodie',
            text: 'Versatile daily wear',
            tag: 'Outerwear',
          },
          {
            src: 'assets/img/merch/12.webp',
            alt: 'Bucket hat with logo patch',
            title: 'Festival Bucket',
            text: 'Woven logo patch',
            tag: 'Accessories',
          },
          {
            src: 'assets/img/merch/13.webp',
            alt: 'Striped casual t-shirt',
            title: 'Classic Stripes',
            text: 'Timeless design',
            tag: 'Patterns',
          },
          {
            src: 'assets/img/merch/14.webp',
            alt: 'Polo shirt with embroidered chest logo',
            title: 'Elite Polo',
            text: 'Refined embroidery',
            tag: 'Smart Casual',
          },
          {
            src: 'assets/img/merch/15.webp',
            alt: 'T-shirt with large back print design',
            title: 'Back Print Tee',
            text: 'High-impact graphics',
            tag: 'Statement Piece',
          },
          {
            src: 'assets/img/merch/16.webp',
            alt: 'Pastel colored crewneck sweatshirt',
            title: 'Soft Crewneck',
            text: 'Premium fleece lining',
            tag: 'Fleece',
          },
          {
            src: 'assets/img/merch/17.webp',
            alt: 'Ringer t-shirt with contrasting trims',
            title: 'Ringer Tee',
            text: 'Contrast trim details',
            tag: 'Retro Fit',
          },
          {
            src: 'assets/img/merch/18.webp',
            alt: 'Winter beanie hat',
            title: 'Knit Beanie',
            text: 'Warm wool blend',
            tag: 'Winter Gear',
          },
          {
            src: 'assets/img/merch/19.webp',
            alt: 'Charcoal V-neck t-shirt',
            title: 'Sharp V-Neck',
            text: 'Fitted silhouette',
            tag: 'Modern Cut',
          },
          {
            src: 'assets/img/merch/20.webp',
            alt: 'Summer tank top with logo',
            title: 'Logo Tank',
            text: 'Lightweight cotton',
            tag: 'Summer Essentials',
          },
        ],
      },
    ],
  },
  wildlife: {
    title: 'Wildlife Moments',
    eyebrow: 'Through the lens',
    intro: 'Capturing the beauty of Sri Lankan wildlife, from Udawalawe’s herds to the garden at dawn.',
    blocks: [
      {
        type: 'masonry',
        items: [
          {
            src: 'assets/img/wildlife/cow-friend.webp',
            alt: 'Cow & Friend — wildlife photograph',
            title: 'Cow & Friend',
          },
          { src: 'assets/img/wildlife/deer.webp', alt: 'Wild Deer — wildlife photograph', title: 'Wild Deer' },
          {
            src: 'assets/img/wildlife/elephant-udawalawa.webp',
            alt: 'Udawalawe Tusker — wildlife photograph',
            title: 'Udawalawe Tusker',
          },
          {
            src: 'assets/img/wildlife/hubaha-1.webp',
            alt: 'Termite Mound 1 — wildlife photograph',
            title: 'Termite Mound 1',
          },
          {
            src: 'assets/img/wildlife/hubaha-2.webp',
            alt: 'Termite Mound 2 — wildlife photograph',
            title: 'Termite Mound 2',
          },
          {
            src: 'assets/img/wildlife/hummigbird.webp',
            alt: 'Little Sunbird — wildlife photograph',
            title: 'Little Sunbird',
          },
          {
            src: 'assets/img/wildlife/king-coconut.webp',
            alt: 'King Coconut — wildlife photograph',
            title: 'King Coconut',
          },
          { src: 'assets/img/wildlife/koka.webp', alt: 'White Crane — wildlife photograph', title: 'White Crane' },
          {
            src: 'assets/img/wildlife/lizard.webp',
            alt: 'Garden Lizard — wildlife photograph',
            title: 'Garden Lizard',
          },
          {
            src: 'assets/img/wildlife/monitor-1.webp',
            alt: 'Monitor Lizard 1 — wildlife photograph',
            title: 'Monitor Lizard 1',
          },
          {
            src: 'assets/img/wildlife/monitor-2.webp',
            alt: 'Monitor Lizard 2 — wildlife photograph',
            title: 'Monitor Lizard 2',
          },
          {
            src: 'assets/img/wildlife/peacock-1.webp',
            alt: 'Peacock Portrait — wildlife photograph',
            title: 'Peacock Portrait',
          },
          {
            src: 'assets/img/wildlife/peacock-2.webp',
            alt: 'Dancing Colors — wildlife photograph',
            title: 'Dancing Colors',
          },
          {
            src: 'assets/img/wildlife/ranwala.webp',
            alt: 'Ranwala Scenery — wildlife photograph',
            title: 'Ranwala Scenery',
          },
          {
            src: 'assets/img/wildlife/squirrel-1.webp',
            alt: 'Squirrel Pose 1 — wildlife photograph',
            title: 'Squirrel Pose 1',
          },
          {
            src: 'assets/img/wildlife/squirrel-2.webp',
            alt: 'Squirrel Pose 2 — wildlife photograph',
            title: 'Squirrel Pose 2',
          },
          {
            src: 'assets/img/wildlife/squirrel-3.webp',
            alt: 'Squirrel Pose 3 — wildlife photograph',
            title: 'Squirrel Pose 3',
          },
          {
            src: 'assets/img/wildlife/udawalawa-elephants.webp',
            alt: 'Udawalawe Herd — wildlife photograph',
            title: 'Udawalawe Herd',
          },
        ],
      },
    ],
  },
  portrait: {
    title: 'Portrait & Lifestyle',
    eyebrow: 'On location',
    intro: 'People and places across Sri Lanka, from the tea country to the hills of Ella.',
    blocks: [
      {
        type: 'masonry',
        items: [
          {
            src: 'assets/img/portrait/balangoda.webp',
            alt: 'Portrait photograph — Balangoda',
            title: 'Balangoda',
          },
          { src: 'assets/img/portrait/ella.webp', alt: 'Portrait photograph — Ella', title: 'Ella' },
          { src: 'assets/img/portrait/hanthana.webp', alt: 'Portrait photograph — Hanthana', title: 'Hanthana' },
          {
            src: 'assets/img/portrait/hortanplace.webp',
            alt: 'Portrait photograph — Hortanplace',
            title: 'Hortanplace',
          },
          {
            src: 'assets/img/portrait/kalawana-1.webp',
            alt: 'Portrait photograph — Kalawana 1',
            title: 'Kalawana 1',
          },
          {
            src: 'assets/img/portrait/kalawana-2.webp',
            alt: 'Portrait photograph — Kalawana 2',
            title: 'Kalawana 2',
          },
          {
            src: 'assets/img/portrait/king-coconut.webp',
            alt: 'Portrait photograph — King coconut',
            title: 'King coconut',
          },
          {
            src: 'assets/img/portrait/wewelwaththa.webp',
            alt: 'Portrait photograph — Wewelwaththa',
            title: 'Wewelwaththa',
          },
        ],
      },
      {
        type: 'cta',
        title: 'Interested in booking a session?',
        text: 'Weddings, portraits and events. Message me on WhatsApp to check availability.',
        label: 'Book on WhatsApp',
        href: 'https://wa.me/94711098429',
      },
    ],
  },
};
