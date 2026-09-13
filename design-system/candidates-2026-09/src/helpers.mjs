// Data-shaped helpers shared by every candidate. Nothing here decides layout:
// escaping, the <head>, the theme contract, icons, the logo mark, status
// attributes, screenshots and a generic reveal observer. Each design brings
// its own CSS, section order and scripts.
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import content from './content.mjs';
import { assets as briefAssets } from './media-brief.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const repo = join(here, '..', '..', '..');
const candidates = join(here, '..');

export const esc = (s) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

export const fontsUrl = (fonts) =>
  'https://fonts.googleapis.com/css2?' + fonts.map((f) => 'family=' + f.replace(/ /g, '+')).join('&') + '&display=swap';

/** Same storage key and values as the live site (Base.astro), plus ?theme= and ?bare= for the screenshot pass. */
export const themeScript = `<script>
(function(){var h=document.documentElement;h.classList.add('js');
try{var q=new URLSearchParams(location.search);var t=q.get('theme')||localStorage.getItem('theme');
if(t==='dark'||t==='light')h.setAttribute('data-theme',t);if(q.get('bare'))h.classList.add('bare');}catch(e){}})();
</script>`;

/** A small preflight-like reset so the mockups behave like the Tailwind-preflighted Astro site. */
export const reset = `*,*::before,*::after{box-sizing:border-box;border:0 solid}html{-webkit-text-size-adjust:100%;tab-size:4;line-height:1.5}body{margin:0;line-height:inherit;min-height:100vh}h1,h2,h3,h4,p,figure,blockquote,dl,dd{margin:0}ol,ul{list-style:none;margin:0;padding:0}img,svg,video{display:block;max-width:100%;height:auto}button,input,select,textarea{font:inherit;color:inherit;margin:0;padding:0;background:transparent}button{cursor:pointer}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,pre{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:1em}table{border-collapse:collapse;text-indent:0;border-color:inherit}:focus-visible{outline:2px solid var(--focus,currentColor);outline-offset:3px}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}@media (prefers-reduced-motion:reduce){html{scroll-behavior:auto}*,*::before,*::after{animation-duration:.001ms!important;animation-iteration-count:1!important;transition-duration:.001ms!important;scroll-behavior:auto!important}}`;

/** The candidate bar: NN/10, back to the index, theme toggle. Hidden with ?bare=1. */
const candidateCss = `.mkc{position:fixed;right:12px;bottom:12px;z-index:1000;display:flex;align-items:center;gap:2px;padding:4px;border-radius:999px;background:rgba(20,22,26,.86);color:#f4f5f7;font:600 12px/1 system-ui,sans-serif;box-shadow:0 6px 24px rgba(0,0,0,.28);backdrop-filter:blur(8px)}.mkc a,.mkc button{display:inline-flex;align-items:center;gap:6px;padding:8px 10px;border-radius:999px;color:inherit;white-space:nowrap}.mkc a:hover,.mkc button:hover{background:rgba(255,255,255,.14)}.mkc .n{opacity:.7;font-variant-numeric:tabular-nums}.mkc svg{width:14px;height:14px}.mkc button:focus-visible,.mkc a:focus-visible{outline:2px solid #fff;outline-offset:2px}.bare .mkc{display:none}@media print{.mkc{display:none}}`;

export function candidateBar(id, total = 10) {
  return `<nav class="mkc" aria-label="Candidate designs">
<a href="index.html">${icon('grid')}<span>All designs</span></a>
<span class="n" style="padding:0 6px">${id} / ${String(total).padStart(2, '0')}</span>
<button type="button" data-mkc-toggle aria-label="Switch between dark and light">${icon('contrast')}</button>
</nav>
<script>(function(){var h=document.documentElement,b=document.querySelector('[data-mkc-toggle]');if(!b)return;
b.addEventListener('click',function(){var cur=h.dataset.theme||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');var n=cur==='dark'?'light':'dark';h.dataset.theme=n;try{localStorage.setItem('theme',n)}catch(e){}})})();</script>`;
}

/** Generic reveal: [data-reveal] gets .is-in when it enters the viewport; --i staggers siblings. */
export const revealScript = `<script>(function(){if(!('IntersectionObserver' in window)||matchMedia('(prefers-reduced-motion: reduce)').matches){document.querySelectorAll('[data-reveal]').forEach(function(e){e.classList.add('is-in')});return}
var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){en.target.classList.add('is-in');io.unobserve(en.target)}})},{rootMargin:'0px 0px -8% 0px',threshold:.08});
document.querySelectorAll('[data-reveal]').forEach(function(e,i){var k=e.parentElement?Array.prototype.indexOf.call(e.parentElement.children,e):i;e.style.setProperty('--i',k);io.observe(e)})})();</script>`;

/** The approved brand mark from the Higgsfield brandkit flow (media/logo-mark.svg, paints mapped to var(--mark-*) by media.mjs --logo). */
const logoMarkPath = join(candidates, 'media', 'logo-mark.svg');
const logoMark = existsSync(logoMarkPath) ? readFileSync(logoMarkPath, 'utf8').trim() : null;

/** Inner artwork of the mark: the brand SVG nested in the 64-unit tile, or the original RFID pulse. */
function markArt(font) {
  if (logoMark) return logoMark.replace(/<svg\b/i, '<svg x="8" y="8" width="48" height="48"');
  return `<path d="M40 14a10 10 0 0 1 10 10" fill="none" stroke="var(--mark-pulse,#6FD0FF)" stroke-width="2.4" stroke-linecap="round" opacity=".55"/><path d="M40 8a16 16 0 0 1 16 16" fill="none" stroke="var(--mark-pulse,#6FD0FF)" stroke-width="2.4" stroke-linecap="round" opacity=".3"/><circle cx="40" cy="24" r="3" fill="var(--mark-dot,#6D93FF)"/><text x="12" y="49" font-family="${esc(font)}" font-weight="700" font-size="30" letter-spacing="-1.5" fill="var(--mark-fg,#F1F4F9)">mk</text>`;
}

const favicon = (() => {
  const fixed = markArt('system-ui,sans-serif')
    .replace(/var\(--mark-fg(?:,[^)]*)?\)/g, '#F1F4F9').replace(/var\(--mark-pulse(?:,[^)]*)?\)/g, '#6FD0FF').replace(/var\(--mark-dot(?:,[^)]*)?\)/g, '#6D93FF');
  return `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#101828"/>${fixed}</svg>`)}`;
})();

/** Shared tokens every design gets: one accent per demo (--a-<slug>) and the brand palette (--brand-*). */
function tokensCss() {
  const acc = content.demos.map((d) => `--a-${d.slug}:light-dark(${d.accent.light},${d.accent.dark})`).join(';');
  const b = content.brand?.palette;
  const brand = b ? `;--brand:${b.accent};--brand-ink:${b.ink};--brand-paper:${b.paper};--brand-soft:${b.support};--brand-up:${b.up}` : '';
  return `:root{${acc}${brand}}`;
}

/** Atmosphere plates: one generated image per design, blended into the canvas and adapted to the other theme without a second generation.
 *  .has-plate isolates the blend and paints its own background; the plate's `ground` says which theme it was made for.
 *  The container rules sit in :where() so a design's own position, background and z-index always win.
 *  Per design: --plate-o / --plate-o-dark (opacity), --plate-mask (edge fade), --plate-pos, --plate-inset, --plate-under. */
// closest-side reaches full transparency at every edge of the container, so a plate never shows a box; move the
// image with --plate-pos rather than moving the mask.
const plateMask = 'radial-gradient(closest-side,#000 45%,transparent 100%)';
const plateCss = `picture{display:contents}
:where(.has-plate){position:relative;isolation:isolate;background-color:var(--plate-under,var(--bg))}
:where(.has-plate>*:not(.plate)){position:relative;z-index:1}
.plate{position:absolute;inset:var(--plate-inset,0);z-index:0;overflow:hidden;pointer-events:none;-webkit-mask-image:var(--plate-mask,${plateMask});mask-image:var(--plate-mask,${plateMask})}
.plate img{width:100%;height:100%;max-width:none;object-fit:cover;object-position:var(--plate-pos,center);opacity:var(--plate-o,.5)}
.plate--light{mix-blend-mode:multiply}
.plate--dark{mix-blend-mode:multiply}.plate--dark img{filter:invert(1) hue-rotate(180deg)}
:root[data-theme=dark] .plate img{opacity:var(--plate-o-dark,.3)}
:root[data-theme=dark] .plate--light{mix-blend-mode:screen}:root[data-theme=dark] .plate--light img{filter:invert(1) hue-rotate(180deg)}
:root[data-theme=dark] .plate--dark{mix-blend-mode:screen}:root[data-theme=dark] .plate--dark img{filter:none}
@media (prefers-color-scheme:dark){
:root:not([data-theme=light]) .plate img{opacity:var(--plate-o-dark,.3)}
:root:not([data-theme=light]) .plate--light{mix-blend-mode:screen}:root:not([data-theme=light]) .plate--light img{filter:invert(1) hue-rotate(180deg)}
:root:not([data-theme=light]) .plate--dark{mix-blend-mode:screen}:root:not([data-theme=light]) .plate--dark img{filter:none}
}
@media print{.plate{display:none}}`;

/** Doctype through </head>. The design closes <html> itself. */
export function head({ title, description, fonts = [], light = '#f7f7f5', dark = '#0b0f17', css = '' }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="robots" content="noindex">
<meta name="color-scheme" content="light dark">
<meta name="theme-color" content="${light}" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="${dark}" media="(prefers-color-scheme: dark)">
<link rel="icon" href="${favicon}">
${fonts.length ? `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${fontsUrl(fonts)}">` : ''}
${themeScript}
<style>${reset}${candidateCss}${tokensCss()}${plateCss}
${css}</style>
</head>`;
}

/** The logo mark, colours through --mark-bg / --mark-fg / --mark-pulse / --mark-dot so each design can tint it. */
export function mark({ size = 40, font = 'inherit', cls = '' } = {}) {
  return `<svg class="${cls}" width="${size}" height="${size}" viewBox="0 0 64 64" aria-hidden="true" focusable="false"><rect width="64" height="64" rx="14" fill="var(--mark-bg,#101828)"/>${markArt(font)}</svg>`;
}

/** Screenshot of a demo, from the copied shots/ folder. */
export function shot(demo, attrs = '') {
  return `<img src="shots/${demo.slug}.png" alt="${esc(demo.name)}, screenshot" width="1440" height="900" loading="lazy" decoding="async" ${attrs}>`;
}

/** Generated media, described by media/manifest.json (written by media.mjs). A missing asset renders nothing
 *  (or the screenshot, for key visuals) and is reported by mediaMissing(), so the build stays green before credits are spent. */
const manifestPath = join(candidates, 'media', 'manifest.json');
const manifest = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, 'utf8')) : { assets: {} };
const missing = new Set();
function asset(id) {
  const a = manifest.assets?.[id];
  if (a && a.src && a.outputs?.length) return a;
  missing.add(id);
  return null;
}
export const mediaMissing = () => [...missing].sort();
export const hasMedia = (id) => !!manifest.assets?.[id]?.outputs?.length;

/** <picture> with AVIF and WebP at 800 and 1600 wide; class and attrs go on the <img>, like shot(). */
export function picture(id, { alt = '', sizes = '(min-width: 1024px) 50vw, 100vw', attrs = '', loading = 'lazy', priority = false } = {}) {
  const a = asset(id);
  if (!a) return '';
  const set = (ext) => `media/${id}-800.${ext} 800w, media/${id}-1600.${ext} 1600w`;
  return `<picture><source type="image/avif" srcset="${set('avif')}" sizes="${sizes}"><source type="image/webp" srcset="${set('webp')}" sizes="${sizes}"><img src="media/${id}-1600.webp" width="${a.outWidth ?? 1600}" height="${a.outHeight ?? 900}" alt="${esc(alt)}" loading="${loading}" decoding="async"${priority ? ' fetchpriority="high"' : ''} ${attrs}></picture>`;
}

/** An atmosphere plate behind a `.has-plate` container. ground: the theme the image was made for (defaults to the brief). */
export function plate(id, { ground, cls = '', pos } = {}) {
  if (!asset(id)) return '';
  const g = ground ?? briefAssets.find((a) => a.id === id)?.ground ?? 'light';
  return `<div class="plate plate--${g}${cls ? ' ' + cls : ''}" aria-hidden="true"${pos ? ` style="--plate-pos:${pos}"` : ''}>${picture(id, { sizes: '100vw', loading: 'eager', priority: true })}</div>`;
}

/** ' has-plate' when the plate exists, so a container only changes once there is something to put behind it. */
export const plateClass = (id) => (hasMedia(id) ? ' has-plate' : '');

/** True once a brand mark has been approved and processed (media/logo-mark.svg). Designs that show no mark today add one only then. */
export const hasLogo = !!logoMark;

/** The demo's generated key visual; falls back to the screenshot unless fallback:false (overlay use). */
export function keyVisual(demo, attrs = '', { fallback = true } = {}) {
  const id = demo.visual ?? `kv-${demo.slug}`;
  if (asset(id)) return picture(id, { alt: `${demo.name}, key visual`, attrs });
  return fallback ? shot(demo, attrs) : '';
}

/** The status contract Phase B keeps: src/scripts/status.ts patches these attributes. */
export const statusDot = (slug, cls = 'dot') => `<span class="${cls}" data-status-dot="${slug}" data-state="up" title="${slug}: up" aria-hidden="true"></span>`;
export const statusPill = (cls = 'pill', text = 'All systems up · checked 2 min ago') =>
  `<span class="${cls}" data-status-pill data-state="up"><span class="dot" aria-hidden="true"></span><span data-status-text>${esc(text)}</span></span>`;

/** One of the diagrams from src/assets/diagrams, inlined (classes dg-*; the design styles them). */
export function diagram(slug) {
  return readFileSync(join(repo, 'src', 'assets', 'diagrams', `${slug}.svg`), 'utf8').replace(/<\?xml[^>]*>\s*/, '');
}

/** Live tenure at build time. The Astro site recounts it client-side. */
export function tenure(start = '2023-05-15', now = new Date()) {
  const s = new Date(start);
  let months = (now.getFullYear() - s.getFullYear()) * 12 + (now.getMonth() - s.getMonth());
  if (now.getDate() < s.getDate()) months--;
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const short = `${years} yr${years === 1 ? '' : 's'} ${rest} mo`;
  const long = `${years} year${years === 1 ? '' : 's'}${rest ? ` and ${rest} month${rest === 1 ? '' : 's'}` : ''}`;
  return { years, months: rest, total: months, short, long, decimal: (months / 12).toFixed(1) };
}

export const fmtDate = (iso) => new Date(iso + 'T00:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });

const icons = {
  'arrow-right': '<path d="M5 12h14M13 6l6 6-6 6"/>',
  'arrow-up-right': '<path d="M7 17 17 7M8 7h9v9"/>',
  'arrow-left': '<path d="M19 12H5M11 6l-6 6 6 6"/>',
  'arrow-down': '<path d="M12 5v14M6 13l6 6 6-6"/>',
  'chevron-left': '<path d="m15 6-6 6 6 6"/>',
  'chevron-right': '<path d="m9 6 6 6-6 6"/>',
  copy: '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 0 1 2-2h9"/>',
  check: '<path d="m5 12 5 5L20 7"/>',
  github: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9a3.4 3.4 0 0 0-.9-2.6c3.1-.3 6.4-1.5 6.4-7A5.4 5.4 0 0 0 20 4.8 5 5 0 0 0 19.9 1s-1.2-.3-3.9 1.5a13.4 13.4 0 0 0-7 0C6.3.7 5.1 1 5.1 1A5 5 0 0 0 5 4.8a5.4 5.4 0 0 0-1.5 3.7c0 5.5 3.3 6.7 6.4 7a3.4 3.4 0 0 0-.9 2.6V22"/>',
  linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  whatsapp: '<path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.6-4A8 8 0 1 1 20 11.5z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 1a4 4 0 0 1-2-2l1-1-1-2z"/>',
  phone: '<path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z"/>',
  download: '<path d="M12 3v12M6 9l6 6 6-6M4 21h16"/>',
  external: '<path d="M14 4h6v6M20 4l-9 9M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"/>',
  key: '<circle cx="8" cy="15" r="4"/><path d="M10.9 12.1 20 3M15 8l2 2M18 5l2 2"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  moon: '<path d="M21 13A9 9 0 1 1 11 3a7 7 0 0 0 10 10z"/>',
  contrast: '<circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" stroke="none"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  play: '<path d="M7 4v16l13-8z"/>',
  pulse: '<path d="M3 12h4l3-8 4 16 3-8h4"/>',
  rfid: '<path d="M8.5 8.5a5 5 0 0 1 7 0M6 6a8.5 8.5 0 0 1 12 0M11 11a1.5 1.5 0 1 1 2 0"/><path d="M12 12v8"/>',
  pin: '<path d="M12 21s-6-5.5-6-11a6 6 0 0 1 12 0c0 5.5-6 11-6 11z"/><circle cx="12" cy="10" r="2"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5M3 17l9 5 9-5"/>',
  server: '<rect x="3" y="4" width="18" height="6" rx="1.5"/><rect x="3" y="14" width="18" height="6" rx="1.5"/><path d="M7 7h.01M7 17h.01"/>',
  shield: '<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/><path d="m9 12 2 2 4-4"/>',
  refresh: '<path d="M21 12a9 9 0 1 1-2.6-6.4M21 3v6h-6"/>',
  file: '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
};
export function icon(name, cls = '') {
  const d = icons[name];
  if (!d) throw new Error(`unknown icon ${name}`);
  return `<svg class="${cls}" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${d}</svg>`;
}

/** Copy-to-clipboard for [data-copy] buttons (clipboard may be denied inside the artifact iframe). */
export const copyScript = `<script>(function(){document.addEventListener('click',function(e){var b=e.target.closest('button[data-copy]');if(!b)return;var t=b.getAttribute('data-copy');function done(ok){b.classList.add(ok?'copied':'copy-failed');b.setAttribute('aria-label',ok?'Copied':'Copy failed, select it instead');setTimeout(function(){b.classList.remove('copied','copy-failed');b.setAttribute('aria-label','Copy')},1400)}
try{navigator.clipboard.writeText(t).then(function(){done(true)},function(){done(false)})}catch(err){done(false)}})})();</script>`;

export default { esc, fontsUrl, themeScript, reset, candidateBar, revealScript, head, mark, hasLogo, shot, picture, plate, plateClass, keyVisual, hasMedia, mediaMissing, statusDot, statusPill, diagram, tenure, fmtDate, icon, copyScript };
