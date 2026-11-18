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
            src: 'Logo/d2d.jpg',
            alt: 'Day To Day Deals logo',
            title: 'Day To Day Deals',
            kicker: 'Online Retail Brand Identity',
            text: 'Day To Day Deals is a dynamic online retail store on Facebook, specializing in small electronics and home accessories. The goal was to create a versatile and approachable visual identity that stands out in a social media feed. The design focuses on simplicity and trust, ensuring high visibility across digital platforms.',
          },
          {
            src: 'Logo/apex.jpg',
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
          { src: 'Logo/apex.jpg', alt: 'APEX Computers logo', title: 'APEX Computers' },
          { src: 'Logo/d2d.jpg', alt: 'Day To Day Deals logo', title: 'Day To Day Deals' },
          { src: 'Logo/coffee.jpg', alt: 'Coffee brand logo', title: 'Coffee brand' },
          { src: 'Logo/herba.jpg', alt: 'Herba logo', title: 'Herba' },
          { src: 'Logo/e hub.jpg', alt: 'E Hub logo', title: 'E Hub' },
          { src: 'Logo/mount hill.jpg', alt: 'Mount Hill logo', title: 'Mount Hill' },
          {
            src: 'Logo/d2dh.png',
            alt: 'Day To Day Deals (alternate) logo',
            title: 'Day To Day Deals (alternate)',
          },
          { src: 'Logo/S1.png', alt: 'Logo concept logo', title: 'Logo concept' },
          { src: 'Logo/D2D.png', alt: 'Day To Day Deals (mark) logo', title: 'Day To Day Deals (mark)' },
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
            hero: { src: 'Brand/apex/3.png', alt: 'APEX brand identity — key visual' },
            images: [
              { src: 'Brand/apex/2.jfif', alt: 'APEX brand identity — application 1' },
              { src: 'Brand/apex/7.png', alt: 'APEX brand identity — application 2' },
              { src: 'Brand/apex/6.png', alt: 'APEX brand identity — application 3' },
              { src: 'Brand/apex/5.png', alt: 'APEX brand identity — application 4' },
            ],
            palette: ['#1A1A1A', '#D4AF37', '#F5F5F5'],
          },
          {
            name: 'Herba',
            kicker: 'Wellness Beverage Branding',
            text: "Herba is a revitalizing herbal beverage brand rooted in traditional wellness. The design strategy focused on communicating vitality and natural health. We chose fresh green hues and organic shapes to highlight the drink's restorative ingredients, positioning it as a refreshing choice for a balanced lifestyle.",
            hero: { src: 'Brand/herba/1.jfif', alt: 'Herba brand identity — key visual' },
            images: [
              { src: 'Brand/herba/5.jfif', alt: 'Herba brand identity — application 1' },
              { src: 'Brand/herba/8.jfif', alt: 'Herba brand identity — application 2' },
              { src: 'Brand/herba/3.jfif', alt: 'Herba brand identity — application 3' },
              { src: 'Brand/herba/2.jfif', alt: 'Herba brand identity — application 4' },
            ],
          },
          {
            name: 'Nature Glow',
            kicker: 'Organic Skincare Identity',
            text: "Nature Glow represents the essence of organic beauty. This branding project for a herbal skincare line emphasizes purity and earthiness. We utilized a soft, natural color palette and elegant typography to communicate the product's organic origin and gentle healing properties, appealing to health-conscious consumers.",
            hero: { src: 'Brand/nature glow/3.jfif', alt: 'Nature Glow brand identity — key visual' },
            images: [
              { src: 'Brand/nature glow/1.jfif', alt: 'Nature Glow brand identity — application 1' },
              { src: 'Brand/nature glow/2.jfif', alt: 'Nature Glow brand identity — application 2' },
              { src: 'Brand/nature glow/4.jfif', alt: 'Nature Glow brand identity — application 3' },
            ],
          },
          {
            name: 'Salon Roo',
            kicker: 'Unisex Salon & Grooming',
            text: "Salon Roo is a modern unisex salon dedicated to style and personal care. The branding aims for a sleek, gender-neutral appeal that feels inclusive and professional. The visual system uses sharp typography and a sophisticated color scheme to reflect the salon's commitment to high-quality grooming and transformation.",
            hero: { src: 'Brand/salon roo/4.jfif', alt: 'Salon Roo brand identity — key visual' },
            images: [
              { src: 'Brand/salon roo/1.jfif', alt: 'Salon Roo brand identity — application 1' },
              { src: 'Brand/salon roo/2.jfif', alt: 'Salon Roo brand identity — application 2' },
              { src: 'Brand/salon roo/3.jfif', alt: 'Salon Roo brand identity — application 3' },
              { src: 'Brand/salon roo/5.jfif', alt: 'Salon Roo brand identity — application 4' },
            ],
            palette: ['#3B82F6', '#1E293B', '#FFFFFF'],
          },
          {
            name: 'SS Cafe',
            kicker: 'Modern Coffee House Branding',
            text: 'SS Cafe captures the warm and inviting atmosphere of a modern coffee house. The visual identity blends rustic charm with contemporary aesthetics. Using rich brown tones and clean lines, the branding evokes the aroma of freshly brewed coffee, creating a welcoming space for conversation and relaxation.',
            hero: { src: 'Brand/ssccafe/8.jfif', alt: 'SS Cafe brand identity — key visual' },
            images: [
              { src: 'Brand/ssccafe/1.jfif', alt: 'SS Cafe brand identity — application 1' },
              { src: 'Brand/ssccafe/2.jfif', alt: 'SS Cafe brand identity — application 2' },
              { src: 'Brand/ssccafe/3.jfif', alt: 'SS Cafe brand identity — application 3' },
              { src: 'Brand/ssccafe/5.jfif', alt: 'SS Cafe brand identity — application 4' },
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
            src: 'social media post/dart board.png',
            alt: 'dart board — product social media post',
            title: 'dart board',
          },
          {
            src: 'social media post/පැය ගාණක් වුනත් සැපට වාඩි වෙලා ඉන්න!.png',
            alt: 'Motivational social media post with Sinhala text encouraging relaxation and comfort despite long hours, featuring warm and inviting aesthetic tones',
          },
          {
            src: 'social media post/100 Pcs Paper Cup Cake.png',
            alt: '100 Pcs Paper Cup Cake — product social media post',
            title: '100 Pcs Paper Cup Cake',
          },
          {
            src: 'social media post/KTS-1655 radio.png',
            alt: 'KTS-1655 radio — product social media post',
            title: 'KTS-1655 radio',
          },
          {
            src: 'social media post/Pen Laser Pointer.png',
            alt: 'Pen Laser Pointer — product social media post',
            title: 'Pen Laser Pointer',
          },
          {
            src: 'social media post/Portable Folding Stool.png',
            alt: 'Portable Folding Stool — product social media post',
            title: 'Portable Folding Stool',
          },
          {
            src: 'social media post/Paint Roller.png',
            alt: 'Paint Roller — product social media post',
            title: 'Paint Roller',
          },
          {
            src: 'social media post/Video Making Kit.png',
            alt: 'Video Making Kit — product social media post',
            title: 'Video Making Kit',
          },
          {
            src: 'social media post/WiFi Smart Camera.png',
            alt: 'WiFi Smart Camera — product social media post',
            title: 'WiFi Smart Camera',
          },
          { src: 'social media post/1.jpg', alt: 'Social media post design' },
          { src: 'social media post/3.jpg', alt: 'Social media post design' },
          { src: 'social media post/4.jpg', alt: 'Social media post design' },
          { src: 'social media post/5.jpg', alt: 'Social media post design' },
          { src: 'social media post/7.jpg', alt: 'Social media post design' },
          { src: 'social media post/8.jpg', alt: 'Social media post design' },
          { src: 'social media post/9.jpg', alt: 'Social media post design' },
          { src: 'social media post/15.jpg', alt: 'Social media post design' },
          { src: 'social media post/17.jpg', alt: 'Social media post design' },
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
            src: 'merch/1.jfif',
            alt: 'Black streetwear t-shirt with bold typography',
            title: 'Urban Streetwear',
            text: 'Bold typography design',
            tag: 'Graphic Tees',
          },
          {
            src: 'merch/2.jfif',
            alt: 'Grey pullover hoodie mockup',
            title: 'Winter Essentials',
            text: 'Heavyweight cotton blend',
            tag: 'Premium Hoodies',
          },
          {
            src: 'merch/3.jfif',
            alt: 'Navy blue snapback cap with embroidery',
            title: 'Signature Snapback',
            text: '3D Embroidered logo',
            tag: 'Headwear',
          },
          {
            src: 'merch/4.jfif',
            alt: 'White t-shirt with abstract colorful illustration',
            title: 'Abstract Vision',
            text: 'Vibrant screen print',
            tag: 'Art Series',
          },
          {
            src: 'merch/5.jfif',
            alt: 'Oversized beige t-shirt mockup',
            title: 'Relaxed Collection',
            text: 'Drop shoulder cut',
            tag: 'Oversized Fit',
          },
          {
            src: 'merch/6.jfif',
            alt: 'Vintage wash black t-shirt',
            title: 'Retro Wash',
            text: 'Distressed finish',
            tag: 'Vintage Style',
          },
          {
            src: 'merch/7.jfif',
            alt: 'Long sleeve t-shirt with sleeve print',
            title: 'Layering Piece',
            text: 'Sleeve detail print',
            tag: 'Long Sleeve',
          },
          {
            src: 'merch/8.jfif',
            alt: 'Minimalist olive green pocket tee',
            title: 'Pocket Tee',
            text: 'Subtle branding',
            tag: 'Basics',
          },
          {
            src: 'merch/9.jfif',
            alt: 'Sporty performance fabric t-shirt',
            title: 'Performance Pro',
            text: 'Breathable fabric',
            tag: 'Active Wear',
          },
          {
            src: 'merch/10.jfif',
            alt: 'Tie-dye pattern t-shirt design',
            title: 'Tie-Dye Custom',
            text: 'Hand-dyed effect',
            tag: 'Summer Vibe',
          },
          {
            src: 'merch/11.jfif',
            alt: 'Black zip-up hoodie',
            title: 'Zip-Up Hoodie',
            text: 'Versatile daily wear',
            tag: 'Outerwear',
          },
          {
            src: 'merch/12.jfif',
            alt: 'Bucket hat with logo patch',
            title: 'Festival Bucket',
            text: 'Woven logo patch',
            tag: 'Accessories',
          },
          {
            src: 'merch/13.jfif',
            alt: 'Striped casual t-shirt',
            title: 'Classic Stripes',
            text: 'Timeless design',
            tag: 'Patterns',
          },
          {
            src: 'merch/14.jfif',
            alt: 'Polo shirt with embroidered chest logo',
            title: 'Elite Polo',
            text: 'Refined embroidery',
            tag: 'Smart Casual',
          },
          {
            src: 'merch/15.jfif',
            alt: 'T-shirt with large back print design',
            title: 'Back Print Tee',
            text: 'High-impact graphics',
            tag: 'Statement Piece',
          },
          {
            src: 'merch/16.jfif',
            alt: 'Pastel colored crewneck sweatshirt',
            title: 'Soft Crewneck',
            text: 'Premium fleece lining',
            tag: 'Fleece',
          },
          {
            src: 'merch/17.jfif',
            alt: 'Ringer t-shirt with contrasting trims',
            title: 'Ringer Tee',
            text: 'Contrast trim details',
            tag: 'Retro Fit',
          },
          {
            src: 'merch/18.jfif',
            alt: 'Winter beanie hat',
            title: 'Knit Beanie',
            text: 'Warm wool blend',
            tag: 'Winter Gear',
          },
          {
            src: 'merch/19.jfif',
            alt: 'Charcoal V-neck t-shirt',
            title: 'Sharp V-Neck',
            text: 'Fitted silhouette',
            tag: 'Modern Cut',
          },
          {
            src: 'merch/20.jfif',
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
            src: 'images/wildlife/Cow & friend.jpg',
            alt: 'Cow & Friend — wildlife photograph',
            title: 'Cow & Friend',
          },
          { src: 'images/wildlife/Deer.jpg', alt: 'Wild Deer — wildlife photograph', title: 'Wild Deer' },
          {
            src: 'images/wildlife/Elephant udawalawa.jpg',
            alt: 'Udawalawe Tusker — wildlife photograph',
            title: 'Udawalawe Tusker',
          },
          {
            src: 'images/wildlife/Hubaha 1.jpg',
            alt: 'Termite Mound 1 — wildlife photograph',
            title: 'Termite Mound 1',
          },
          {
            src: 'images/wildlife/Hubaha 2.jpg',
            alt: 'Termite Mound 2 — wildlife photograph',
            title: 'Termite Mound 2',
          },
          {
            src: 'images/wildlife/Hummigbird.jpg',
            alt: 'Little Sunbird — wildlife photograph',
            title: 'Little Sunbird',
          },
          {
            src: 'images/wildlife/King coconut .jpg',
            alt: 'King Coconut — wildlife photograph',
            title: 'King Coconut',
          },
          { src: 'images/wildlife/koka.jpg', alt: 'White Crane — wildlife photograph', title: 'White Crane' },
          {
            src: 'images/wildlife/Lizard.jpg',
            alt: 'Garden Lizard — wildlife photograph',
            title: 'Garden Lizard',
          },
          {
            src: 'images/wildlife/Monitor 1.jpg',
            alt: 'Monitor Lizard 1 — wildlife photograph',
            title: 'Monitor Lizard 1',
          },
          {
            src: 'images/wildlife/Monitor 2.jpg',
            alt: 'Monitor Lizard 2 — wildlife photograph',
            title: 'Monitor Lizard 2',
          },
          {
            src: 'images/wildlife/Peacock 1.jpg',
            alt: 'Peacock Portrait — wildlife photograph',
            title: 'Peacock Portrait',
          },
          {
            src: 'images/wildlife/Peacock 2.jpg',
            alt: 'Dancing Colors — wildlife photograph',
            title: 'Dancing Colors',
          },
          {
            src: 'images/wildlife/Ranwala.jpg',
            alt: 'Ranwala Scenery — wildlife photograph',
            title: 'Ranwala Scenery',
          },
          {
            src: 'images/wildlife/Squirrel 1.jpg',
            alt: 'Squirrel Pose 1 — wildlife photograph',
            title: 'Squirrel Pose 1',
          },
          {
            src: 'images/wildlife/Squirrel 2.jpg',
            alt: 'Squirrel Pose 2 — wildlife photograph',
            title: 'Squirrel Pose 2',
          },
          {
            src: 'images/wildlife/Squirrel 3.jpg',
            alt: 'Squirrel Pose 3 — wildlife photograph',
            title: 'Squirrel Pose 3',
          },
          {
            src: 'images/wildlife/udawalawa elephants.jpg',
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
            src: 'images/portrait/Balangoda.jpg',
            alt: 'Portrait photograph — Balangoda',
            title: 'Balangoda',
          },
          { src: 'images/portrait/Ella .jpg', alt: 'Portrait photograph — Ella', title: 'Ella' },
          { src: 'images/portrait/Hanthana.jpg', alt: 'Portrait photograph — Hanthana', title: 'Hanthana' },
          {
            src: 'images/portrait/Hortanplace.jpg',
            alt: 'Portrait photograph — Hortanplace',
            title: 'Hortanplace',
          },
          {
            src: 'images/portrait/Kalawana 1.jpg',
            alt: 'Portrait photograph — Kalawana 1',
            title: 'Kalawana 1',
          },
          {
            src: 'images/portrait/Kalawana 2.jpg',
            alt: 'Portrait photograph — Kalawana 2',
            title: 'Kalawana 2',
          },
          {
            src: 'images/portrait/King coconut.jpg',
            alt: 'Portrait photograph — King coconut',
            title: 'King coconut',
          },
          {
            src: 'images/portrait/Wewelwaththa.jpg',
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
