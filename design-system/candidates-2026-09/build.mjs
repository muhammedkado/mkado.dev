// Renders every candidate in src/designs/ to ./NN-name.html, the gallery to
// ./index.html (full document) and ./artifact.html (body only, for the
// claude.ai artifact wrapper), and copies the demo screenshots into ./shots.
//
//   node design-system/candidates-2026-09/build.mjs        all
//   node design-system/candidates-2026-09/build.mjs 03 07  some
import { copyFileSync, existsSync, mkdirSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const only = process.argv.slice(2);
const content = (await import('./src/content.mjs')).default;
const h = (await import('./src/helpers.mjs')).default;
const gallery = await import('./src/gallery.mjs');

mkdirSync(join(root, 'shots'), { recursive: true });
for (const d of content.demos) {
  const src = resolve(root, '../../src/assets/shots', `${d.slug}.png`);
  if (!existsSync(src)) throw new Error(`missing screenshot ${src}`);
  copyFileSync(src, join(root, 'shots', `${d.slug}.png`));
}

const designsDir = join(root, 'src', 'designs');
const files = readdirSync(designsDir).filter((f) => /^\d\d-.+\.mjs$/.test(f)).sort();
const designs = [];
for (const f of files) designs.push((await import(pathToFileURL(join(designsDir, f)).href)).default);

let wrote = 0;
for (const d of designs) {
  if (only.length && !only.includes(d.id)) continue;
  const html = d.render(content, { ...h, id: d.id, total: designs.length });
  writeFileSync(join(root, d.file), html);
  console.log(`wrote ${d.file.padEnd(26)} ${(Buffer.byteLength(html) / 1024).toFixed(0).padStart(4)} KB`);
  wrote++;
}
writeFileSync(join(root, 'index.html'), gallery.render(designs, content, h, { full: true }));
writeFileSync(join(root, 'artifact.html'), gallery.render(designs, content, h, { full: false }));
console.log(`gallery: index.html + artifact.html (${designs.length} designs, ${wrote} rebuilt)`);
// Generated media is optional: pages fall back to screenshots or no plate until media.mjs has produced it.
const missing = h.mediaMissing();
if (missing.length) console.log(`media not generated yet (${missing.length}): ${missing.join(', ')}`);
