// Review board for generated media: the seven key visuals as one series, and every plate
// with its alternate side by side (A = primary, B = alternate). Thumbnails are written with
// sharp so the board stays light; originals are untouched. Output: brandkit/reviews/media.html
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const outDir = join(here, 'reviews');
const thumbs = join(outDir, 'thumbs');
mkdirSync(thumbs, { recursive: true });
const manifest = JSON.parse(readFileSync(join(root, 'media', 'manifest.json'), 'utf8'));
const { assets } = await import('../src/media-brief.mjs');

async function thumb(src, name) {
  if (!src || !existsSync(join(root, src))) return null;
  const file = `${name}.jpg`;
  await sharp(join(root, src)).resize({ width: 640 }).jpeg({ quality: 82 }).toFile(join(thumbs, file));
  return `thumbs/${file}`;
}
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

const kvCells = [];
for (const a of assets.filter((x) => x.kind === 'key')) {
  const m = manifest.assets[a.id];
  const t = await thumb(m?.src, a.id);
  kvCells.push(`<figure>${t ? `<img src="${t}" alt="">` : '<div class="miss">not generated</div>'}<figcaption>${esc(a.id.replace('kv-', ''))}</figcaption></figure>`);
}
const plateRows = [];
for (const a of assets.filter((x) => x.kind === 'plate')) {
  const m = manifest.assets[a.id];
  const tA = await thumb(m?.src, `${a.id}-A`);
  const tB = await thumb(m?.alts?.[0]?.src, `${a.id}-B`);
  const cell = (t, label) => `<figure>${t ? `<img src="${t}" alt="">` : '<div class="miss">not generated</div>'}<figcaption>${label}</figcaption></figure>`;
  plateRows.push(`<section class="plate"><h3>${esc(a.id.replace('plate-', ''))} <small>${esc(m?.model ?? a.model ?? '')} · ${esc(a.ground ?? 'figure')} ground</small></h3><div class="pair">${cell(tA, 'A')}${cell(tB, 'B')}</div></section>`);
}

const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Generated media review</title>
<style>
body{margin:0;padding:28px;background:#ecebe7;font:14px/1.45 system-ui,sans-serif;color:#101828}
h1{margin:0 0 4px;font-size:22px}h2{margin:28px 0 10px;font-size:16px}p{margin:0;color:#4a5263}
.kv{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}
figure{margin:0;background:#fff;border-radius:8px;overflow:hidden}
figure img{display:block;width:100%;aspect-ratio:16/9;object-fit:cover}
figcaption{padding:6px 10px;font-weight:600}
.plates{display:grid;grid-template-columns:repeat(2,1fr);gap:14px}
.plate h3{margin:0 0 6px;font-size:14px}.plate small{font-weight:400;color:#4a5263}
.pair{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.miss{aspect-ratio:16/9;display:grid;place-items:center;color:#b42318;background:#fff}
</style></head><body>
<h1>Generated media</h1><p>Key visuals: one series, ${esc([...new Set(assets.filter((x) => x.kind === 'key').map((x) => manifest.assets[x.id]?.model).filter(Boolean))].join(', ') || 'not generated')}. Plates: A is the primary, B the alternate; pick one per design.</p>
<h2>Key visuals</h2><div class="kv">${kvCells.join('')}</div>
<h2>Plates</h2><div class="plates">${plateRows.join('')}</div>
</body></html>`;
writeFileSync(join(outDir, 'media.html'), html);
console.log('wrote brandkit/reviews/media.html');
