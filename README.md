# Shavindu Rashmika — Portfolio

Portfolio of **W.S.R. Rathnayaka (Shavindu Rashmika)**, Creative Technologist, Social Media Manager and Web Developer.

It's a static site: plain HTML, CSS and JavaScript with no framework. Everything the site needs is committed to the repo, including the built CSS and prerendered HTML, so **any static host works with no build step** (Vercel, Netlify, GitHub Pages, Cloudflare Pages).

## Quick start

```bash
npm install        # once, only needed to edit styles, images or data
npm run serve      # http://localhost:8000
```

## Project structure

```
index.html                 Home: hero, expertise, projects, experience, creative, contact
project.html               Case-study template → project.html?slug=customt
logo.html … portrait.html  Creative galleries (thin shells, content comes from data)
404.html                   Not-found page

assets/
  js/data/
    profile.js             Name, contact, socials, nav links
    projects.js            Projects, in display order
    experience.js          Experience, education, expertise
    galleries.js           Creative gallery pages
    images.js              AUTO-GENERATED image sizes (don't edit)
  js/
    components.js          UI building blocks (cards, placeholders, timeline)
    render.js              Section and page renderers (shared by browser and build)
    sections.js            Home page behaviour (filters, spotlight)
    gallery-page.js        Gallery behaviour (lightbox)
    project-page.js        Case-study page
    layout.js              Nav, footer, theme toggle, scroll effects
    theme.js               Dark-by-default theme bootstrap (loads in <head>)
  css/
    main.css               Design tokens (colours, type) and base components
    components.css         Projects, timeline, galleries, lightbox
    fonts.css, icons.css   Self-hosted fonts and the Font Awesome subset
    tailwind.src.css       CSS entry point (imports everything above)
    site.css               BUILT, the only stylesheet pages load
  fonts/                   Poppins, Montserrat, Font Awesome subset (woff2)
  img/                     All images as WebP, plus -800 versions for small screens

scripts/
  optimize-images.mjs      Converts new images to WebP and updates references
  prerender.mjs            Bakes rendered sections into the HTML
```

## Common tasks

### Edit text, projects or experience
Edit the file in `assets/js/data/`, then run:

```bash
npm run build
```

If you forget to rebuild, the site still shows the new content: the browser notices the change and re-renders. The build just keeps first paint fast and the content visible to search engines.

### Add a project screenshot
1. Save it as e.g. `assets/img/projects/customt.png` (any JPG or PNG).
2. In `projects.js`, set `image: 'assets/img/projects/customt.png'` on that project.
3. Run `npm run images`. It converts the file to WebP, updates the reference to `.webp`, records its size and rebuilds.

### Add gallery images
Put the file in the right `assets/img/<gallery>/` folder, add an entry to `galleries.js`, then run `npm run images`.

### Change colours or typography
Colours are CSS variables at the top of `assets/css/main.css` (dark and light themes). Fonts and spacing live in `tailwind.config.js`. Run `npm run build:css` afterwards, or `npm run watch:css` while working.

### Adding an icon
Icons come from a Font Awesome subset containing only the icons in use. To use a new one, add its class (e.g. `fa-solid fa-phone`). Then regenerate `assets/css/icons.css` and the subset fonts with `pyftsubset` from the full Font Awesome Free package: look up the icon's codepoint in Font Awesome's `all.css` and add it to the `--unicodes` list.

## Commands

| Command | What it does |
|---|---|
| `npm run build` | Prerender HTML and build CSS |
| `npm run images` | Optimise new images, then build |
| `npm run build:css` / `watch:css` | Build CSS only, or rebuild on every change |
| `npm run prerender` | Re-bake rendered sections into the HTML |
| `npm run serve` | Local preview on port 8000 |

## Before going live

- **Share previews:** `og:image` currently uses the relative path `og-image.jpg`. Facebook, LinkedIn and WhatsApp need an absolute URL, so once the domain is known, replace it with `https://your-domain/og-image.jpg` in each HTML file. Add a `sitemap.xml` and a `<link rel="canonical">` at the same time.

## Credits

Fonts: Poppins and Montserrat (SIL Open Font License). Icons: Font Awesome Free (CC BY 4.0 / SIL OFL).
