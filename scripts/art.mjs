// Turns the Higgsfield originals (7 MB PNGs, kept outside the repo in
// ../../tools/mkado-art-src/) into the WebPs the site ships in src/assets/art/:
// hero at 1600 px, everything else at 1200 px. Astro's <Picture> makes the
// AVIF/WebP srcsets from these at build time.
//   node scripts/art.mjs                 all originals
//   node scripts/art.mjs hero spot-pos   some
//   ART_SRC=<dir> ART_REVIEW=<dir>       override the source dir / also write 640 px JPEGs for a look
import sharp from 'sharp';
import { existsSync, mkdirSync, readdirSync, readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = process.env.ART_SRC ?? resolve(root, '../../tools/mkado-art-src');
const OUT = join(root, 'src/assets/art');
const REVIEW = process.env.ART_REVIEW;
const only = process.argv.slice(2);

if (!existsSync(SRC)) throw new Error(`no originals at ${SRC}`);
mkdirSync(OUT, { recursive: true });
if (REVIEW) mkdirSync(REVIEW, { recursive: true });

const files = readdirSync(SRC).filter((f) => f.endsWith('.png') && (!only.length || only.includes(f.replace('.png', ''))));
const hashes = {};
for (const f of files) {
  const name = f.replace('.png', '');
  const buf = readFileSync(join(SRC, f));
  hashes[name] = createHash('sha1').update(buf).digest('hex').slice(0, 10);
  const meta = await sharp(buf).metadata();
  const width = name === 'hero' ? 1600 : 1200;
  const webp = await sharp(buf)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: name === 'hero' ? 88 : 86, effort: 6 })
    .toFile(join(OUT, `${name}.webp`));
  if (REVIEW) await sharp(buf).resize({ width: 640 }).jpeg({ quality: 80 }).toFile(join(REVIEW, `${name}.jpg`));
  console.log(`${name}: ${meta.width}x${meta.height} -> ${webp.width}x${webp.height} webp ${Math.round(webp.size / 1024)} KB  sha ${hashes[name]}`);
}
const dupes = Object.entries(hashes).filter(([, h], i, a) => a.findIndex(([, h2]) => h2 === h) !== i);
console.log(dupes.length ? 'DUPLICATES: ' + dupes.map(([n]) => n).join(', ') : 'no duplicate outputs');
