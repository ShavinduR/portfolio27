#!/usr/bin/env node
/**
 * Package the site for hosting — run with `npm run build:vercel`.
 *
 * The site is plain static files at the repo root, so there's nothing to
 * compile; this copies only what visitors need into dist/ (the folder Vercel
 * publishes, see vercel.json). Build tooling, package files and notes stay out.
 */
import { cp, readdir, rm, mkdir } from 'node:fs/promises';
import { join, extname } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const OUT = join(ROOT, 'dist');

// Root-level files that are part of the website.
const PUBLIC_EXT = new Set(['.html', '.xml', '.txt', '.webmanifest', '.pdf', '.png', '.jpg', '.svg', '.ico']);
// Never published, even if they live under a public folder.
const PRIVATE_EXT = new Set(['.md']);

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT);

let files = 0;
for (const entry of await readdir(ROOT, { withFileTypes: true })) {
  if (entry.isFile() && PUBLIC_EXT.has(extname(entry.name))) {
    await cp(join(ROOT, entry.name), join(OUT, entry.name));
    files++;
  }
}

// Generated detail pages (case studies, web builds).
for (const dir of ['case-studies', 'projects']) await cp(join(ROOT, dir), join(OUT, dir), { recursive: true });

await cp(join(ROOT, 'assets'), join(OUT, 'assets'), {
  recursive: true,
  filter: (src) => !PRIVATE_EXT.has(extname(src)),
});

console.log(`dist/: ${files} root files + assets/`);
