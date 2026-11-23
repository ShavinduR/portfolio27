# Shavindu Rashmika — Portfolio

Portfolio of **W.S.R. Rathnayaka (Shavindu Rashmika)**, Social Media Strategist & Visual Creator.

It's a static site: plain HTML, CSS and JavaScript with no framework. Everything the site needs is committed to the repo, including the built CSS and prerendered HTML, so **any static host works with no build step** (Vercel, Netlify, GitHub Pages, Cloudflare Pages).

## Quick start

```bash
npm install        # once, only needed to edit styles, images or data
npm run serve      # http://localhost:8000
```

## Project structure

```
index.html                 Home: hero, expertise, projects, experience, creative, contact
case-study.html            Social/content case study → case-study.html?slug=tranquil-rest
project.html               Web build page → project.html?slug=customt
logo.html … portrait.html  Creative galleries (thin shells, content comes from data)
404.html                   Not-found page

assets/
  js/data/
    profile.js             Name, contact, socials, nav links
    case-studies.js        Featured case studies (Problem → Action → Result), testimonials
    projects.js            Web builds, in display order
    experience.js          Experience, education, expertise
    galleries.js           Creative gallery pages and client work
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

### Fill in case-study numbers

Metrics live in `assets/js/data/case-studies.js` under `results`. A placeholder looks like:

```js
{ value: '', label: 'Follower growth', todo: true },
```

Placeholders are hidden on the live site, and `npm run build` lists every one that's
still open. To publish a number, set `value` (e.g. `'+240%'`) and delete `todo: true`,
then run `npm run build`. Add a client quote with `quote: { text, name, role }` on a
case study, or to `window.SITE.testimonials` to show the "Kind words" section.

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
Icons come from Font Awesome Free, subset to only the icons in use. To use a new one, add its class anywhere (for example `<i class="fa-solid fa-phone"></i>`), then run:

```bash
npm run icons
```

This needs Python's `fonttools` package once: `pip install fonttools brotli`.

### Add client work images (Tranquil Rest, Space Billiards)
These folders are already wired into the Branding and Logo pages:

```
assets/img/branding/tranquil-rest/
assets/img/branding/space-billiards/
```

Each folder has a `README.md` listing the exact file names to use. Drop the images in (`.jpg`, `.png` or `.webp`), then run `npm run images`. Until a file exists, its slot shows an elegant "coming soon" tile instead of a broken image.

## Deployment (GitHub Pages)

Live at **https://shavindur.github.io/portfolio27/**. The site URL lives in `assets/js/data/profile.js` (`url`). It's used for canonical links, share tags and `sitemap.xml`, which `npm run build` regenerates. `.nojekyll` makes GitHub Pages serve files as-is.

`404.html` uses `<base href="/portfolio27/">` so it works at any missing URL. **If the site moves** (for example to a custom domain), update that line, `url` in `profile.js`, and the absolute URLs in the page `<head>`s.

## Credits

Fonts: Poppins and Montserrat (SIL Open Font License). Icons: Font Awesome Free (CC BY 4.0 / SIL OFL).
