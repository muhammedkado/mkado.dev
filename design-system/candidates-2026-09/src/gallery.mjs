// The gallery: one card per candidate with its previews, concept and axes.
// `full: true` writes a complete document (index.html, for the folder);
// `full: false` writes body-only markup for the claude.ai artifact wrapper.

const css = `
:root{color-scheme:light dark;
--bg:light-dark(#f3f2ee,#101214);--card:light-dark(#fbfbf9,#181b1f);--ink:light-dark(#16181c,#eceef1);--ink-2:light-dark(#4f545c,#a4abb6);--ink-3:light-dark(#6a707a,#8b929c);--line:light-dark(#dcdcd6,#2a2f36);--accent:light-dark(#1f4fd8,#7c9bff);--accent-ink:light-dark(#fff,#0b0f17);--focus:var(--accent);
--font-display:"Host Grotesk",system-ui,sans-serif;--font-body:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}
:root[data-theme="light"]{color-scheme:light}:root[data-theme="dark"]{color-scheme:dark}
body{background:var(--bg);color:var(--ink);font:16px/1.55 var(--font-body);padding-inline:clamp(16px,4vw,48px);padding-block:32px 96px}
.wrap{max-width:1240px;margin:0 auto}
header{display:grid;gap:14px;max-width:760px;margin-bottom:40px}
.eyebrow{font:600 12px/1 var(--font-body);letter-spacing:.14em;text-transform:uppercase;color:var(--ink-3)}
h1{font:600 clamp(30px,4.6vw,54px)/1.02 var(--font-display);letter-spacing:-.025em;text-wrap:balance}
header p{color:var(--ink-2);max-width:62ch}
header ul{display:grid;gap:6px;color:var(--ink-2);padding-left:18px;list-style:disc}
.grid{display:grid;gap:22px;grid-template-columns:repeat(auto-fill,minmax(min(100%,560px),1fr))}
.card{display:grid;grid-template-rows:auto 1fr;background:var(--card);border:1px solid var(--line);border-radius:14px;overflow:hidden}
.shots{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:var(--line);border-bottom:1px solid var(--line)}
.shots a{display:block;position:relative;background:var(--card);aspect-ratio:16/10;overflow:hidden}
.shots img{width:100%;height:100%;object-fit:cover;object-position:top;transition:transform .5s cubic-bezier(.16,1,.3,1)}
.shots a:hover img{transform:scale(1.03)}
.shots small{position:absolute;left:8px;bottom:8px;padding:3px 7px;border-radius:6px;background:rgba(0,0,0,.6);color:#fff;font:600 10px/1 var(--font-body);letter-spacing:.08em;text-transform:uppercase}
.body{display:grid;gap:14px;padding:20px 22px 22px}
.title{display:flex;align-items:baseline;gap:12px;flex-wrap:wrap}
.num{font:600 12px/1 var(--font-body);letter-spacing:.1em;color:var(--ink-3);font-variant-numeric:tabular-nums}
h2{font:600 24px/1.1 var(--font-display);letter-spacing:-.02em}
.concept{color:var(--ink-2);font-style:italic}
dl{display:grid;grid-template-columns:auto 1fr;gap:6px 14px;font-size:14px;color:var(--ink-2)}
dt{color:var(--ink-3);font-weight:600;font-size:12px;letter-spacing:.06em;text-transform:uppercase;padding-top:2px}
.says{font-size:15px;color:var(--ink);border-left:3px solid var(--accent);padding-left:12px}
.actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:4px}
.btn{display:inline-flex;align-items:center;gap:8px;padding:10px 16px;border-radius:999px;font-weight:600;font-size:14px;border:1px solid var(--line);transition:transform .2s,background .2s}
.btn:hover{transform:translateY(-1px)}
.btn.primary{background:var(--accent);color:var(--accent-ink);border-color:transparent}
.btn.primary:hover{filter:brightness(1.08)}
.phones{display:flex;gap:8px}
.phones a{display:block;width:72px;aspect-ratio:390/700;overflow:hidden;border:1px solid var(--line);border-radius:8px;background:var(--bg)}
.phones img{width:100%;height:auto}
.foot{margin-top:56px;color:var(--ink-3);font-size:14px;max-width:70ch}
a:focus-visible,button:focus-visible{outline:2px solid var(--focus);outline-offset:3px}
@media (max-width:560px){.shots{grid-template-columns:1fr}.shots a:last-child{display:none}}
`;

export function render(designs, c, h, { full }) {
  const cards = designs
    .map((d) => {
      const stem = d.file.replace(/\.html$/, '');
      return `<article class="card" id="d${d.id}">
  <div class="shots">
    <a href="${d.file}?theme=light"><img src="previews/${stem}-light-1440.jpg" alt="${h.esc(d.name)}, light theme, desktop" width="720" height="450" loading="lazy"><small>Light</small></a>
    <a href="${d.file}?theme=dark"><img src="previews/${stem}-dark-1440.jpg" alt="${h.esc(d.name)}, dark theme, desktop" width="720" height="450" loading="lazy"><small>Dark</small></a>
  </div>
  <div class="body">
    <div class="title"><span class="num">${d.id}</span><h2>${h.esc(d.name)}</h2><span class="concept">${h.esc(d.concept)}</span></div>
    <dl>
      <dt>Layout</dt><dd>${h.esc(d.axes.layout)}</dd>
      <dt>Canvas</dt><dd>${h.esc(d.axes.canvas)}</dd>
      <dt>Type</dt><dd>${h.esc(d.axes.type)}</dd>
      <dt>Motion</dt><dd>${h.esc(d.axes.motion)}</dd>
    </dl>
    <p class="says">${h.esc(d.says)}</p>
    <div class="actions">
      <a class="btn primary" href="${d.file}">Open design ${h.icon('arrow-up-right')}</a>
      <a class="btn" href="${d.file}?theme=dark">Open in dark</a>
      <span class="phones" aria-label="Phone previews"><a href="previews/${stem}-light-390.jpg" title="Phone, light"><img src="previews/${stem}-light-390.jpg" alt="" loading="lazy"></a><a href="previews/${stem}-dark-390.jpg" title="Phone, dark"><img src="previews/${stem}-dark-390.jpg" alt="" loading="lazy"></a></span>
    </div>
  </div>
</article>`;
    })
    .join('\n');

  const body = `<title>Ten Directions for mkado.dev</title>
<style>${css}</style>
<div class="wrap">
<header>
  <p class="eyebrow">mkado.dev · portfolio redesign · ${designs.length} candidates</p>
  <h1>Ten directions for the same seven applications</h1>
  <p>Every page below shows the same facts: the claim, the seven live demos with their status dots and one-click sign-ins, how the site is run, the USTEK years, skills with evidence, the notes, and a contact form. What changes is the decision: layout, type, canvas and motion. Pick one and I build it across the whole site, in English and Turkish, with the live status probe and the contact form wired in.</p>
  <ul>
    <li>Open each design and use the pill in the bottom-right corner to switch dark and light.</li>
    <li>Resize the window, or open a page on your phone. The small previews are full-length phone captures.</li>
    <li>Screenshots are the real demos. Copy buttons, forms and status dots are live in the built site, static here.</li>
    <li>Hero plates and the seven project covers are generated with Higgsfield (Soul Location, Soul Cinema). On a desktop, hover a cover to see the live screenshot; phones show the screenshot.</li>
  </ul>
</header>
<div class="grid">
${cards}
</div>
<p class="foot">Built from <code>design-system/candidates-2026-09/</code> in the mkado.dev repository. Fonts load from Google Fonts in these mockups; the built site self-hosts the winner's fonts.</p>
</div>`;

  if (!full) return body;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<meta name="color-scheme" content="light dark">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${h.fontsUrl(['Host Grotesk:wght@400;600;700'])}">
${h.themeScript}
<style>${h.reset}</style>
</head>
<body>
${body}
${h.candidateBar('—', designs.length).replace('<a href="index.html">' + h.icon('grid') + '<span>All designs</span></a>', '')}
</body>
</html>`;
}
