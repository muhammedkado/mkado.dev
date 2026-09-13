// Review board for the logo candidates: each untouched Recraft SVG on the approved paper,
// on ink, and small at header size. Writes brandkit/reviews/logos.html; screenshot it with
// headless Chrome for the review. The SVGs are embedded as <img> so they stay unaltered.
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const { assets } = await import('../src/media-brief.mjs');
const lock = JSON.parse(readFileSync(join(here, 'logo-colors.json'), 'utf8'));
const names = { 'logo-1': 'mk ribbon monogram', 'logo-2': 'Signal arcs', 'logo-3': 'RFID inlay coil' };

const cards = assets
  .filter((a) => a.kind === 'logo')
  .map((a, i) => {
    const src = join(root, 'media-src', `${a.id}.svg`);
    if (!existsSync(src)) return `<section class="card"><h2>${i + 1} · ${names[a.id]}</h2><p class="miss">not generated</p></section>`;
    const data = `data:image/svg+xml;base64,${readFileSync(src).toString('base64')}`;
    return `<section class="card">
  <h2>Candidate ${i + 1} · ${names[a.id]}</h2>
  <div class="row">
    <div class="tile paper"><img src="${data}" alt=""></div>
    <div class="tile ink"><img src="${data}" alt=""></div>
    <div class="small"><span class="chip paper"><img src="${data}" alt="">Muhammed Kado</span><span class="chip ink"><img src="${data}" alt="">Muhammed Kado</span></div>
  </div>
</section>`;
  })
  .join('\n');

const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Logo candidates</title>
<style>
body{margin:0;padding:32px;background:#e9e8e4;font:15px/1.5 system-ui,sans-serif;color:#101828}
h1{margin:0 0 4px;font-size:22px}p.sub{margin:0 0 24px;color:#4a5263}
.card{background:#fff;border-radius:12px;padding:18px 20px;margin-bottom:18px}
.card h2{margin:0 0 12px;font-size:15px}
.row{display:grid;grid-template-columns:260px 260px 1fr;gap:14px;align-items:center}
.tile{height:260px;border-radius:10px;display:grid;place-items:center;overflow:hidden}
.tile img{width:100%;height:100%;object-fit:contain}
.paper{background:${lock.background}}.ink{background:${lock.colors[0]};color:#f7f7f5}
.small{display:grid;gap:10px;justify-items:start}
.chip{display:inline-flex;align-items:center;gap:10px;padding:10px 14px;border-radius:8px;font-weight:600}
.chip img{width:34px;height:34px;border-radius:6px}
.miss{color:#b42318}
</style></head><body>
<h1>Logo candidates</h1>
<p class="sub">Recraft V4.1 vector, identical parameters, palette Ink ${lock.colors[0]} + Signal ${lock.colors[1]} on Paper ${lock.background}. Shown unaltered; on the ink tile the SVG keeps its own paper background.</p>
${cards}
</body></html>`;
writeFileSync(join(here, 'reviews', 'logos.html'), html);
console.log('wrote brandkit/reviews/logos.html');
