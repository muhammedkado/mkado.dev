// 07 · Blueprint — engineering drawing.
// The site's own architecture diagrams (src/assets/diagrams/*.svg) become the
// hero of the work section, drawn line by line as each sheet comes into view.
// Title block, revision history, bill of materials: a drawing set, not a brochure.
// Type: Red Hat Display for titles, Red Hat Mono for every annotation.

const css = `
:root{color-scheme:light dark;
--bg:light-dark(#ffffff,#071a3f);--grid:light-dark(rgba(15,61,145,.10),rgba(230,238,255,.09));--surface:light-dark(#f3f6fc,#0c2454);--ink:light-dark(#0f3d91,#e6eeff);--ink-2:light-dark(#3c5a9c,#b9c8ea);--ink-3:light-dark(#56699a,#8da2cf);--line:light-dark(#b8c6e6,#2a4a8c);--line-2:light-dark(#0f3d91,#e6eeff);--hi:light-dark(#c2410c,#ffb454);--hi-ink:light-dark(#ffffff,#071a3f);--hi-soft:light-dark(#fdebe1,#3a2a12);--up:light-dark(#0f7a3a,#4ade80);--focus:var(--hi);
--mark-bg:light-dark(#0f3d91,#e6eeff);--mark-fg:light-dark(#ffffff,#071a3f);--mark-pulse:var(--hi);--mark-dot:var(--hi);
--display:"Red Hat Display",system-ui,sans-serif;--mono:"Red Hat Mono",ui-monospace,Menlo,Consolas,monospace;--ease:cubic-bezier(.2,.8,.2,1)}
:root[data-theme="light"]{color-scheme:light}:root[data-theme="dark"]{color-scheme:dark}
html{scroll-behavior:smooth}
body{background:var(--bg);color:var(--ink);font:15px/1.55 var(--display);padding-inline:clamp(12px,3vw,40px);background-image:linear-gradient(var(--grid) 1px,transparent 1px),linear-gradient(90deg,var(--grid) 1px,transparent 1px);background-size:32px 32px;background-attachment:fixed}
.sheet{max-width:1320px;margin:16px auto 24px;border:1.5px solid var(--line-2);background:color-mix(in srgb,var(--bg) 80%,transparent);position:relative}
.sheet::before{content:"";position:absolute;inset:6px;border:.5px solid var(--line);pointer-events:none}
.pad{padding-inline:clamp(16px,3vw,40px)}
.skip{position:absolute;left:16px;top:-48px;padding:10px 14px;background:var(--ink);color:var(--bg);z-index:50}.skip:focus{top:12px}
.mono{font-family:var(--mono);font-size:11.5px;letter-spacing:.06em;text-transform:uppercase;color:var(--ink-3)}
h1,h2,h3{font-weight:800;letter-spacing:-.02em;text-wrap:balance}
/* title block */
.tb{display:grid;grid-template-columns:repeat(6,minmax(0,auto));border:1px solid var(--line-2);font-family:var(--mono);font-size:11px;letter-spacing:.04em;text-transform:uppercase}
.tb div{padding:8px 12px;border-right:1px solid var(--line-2);display:grid;gap:3px;min-width:0}
.tb div:last-child{border-right:0}
.tb small{font-size:9px;color:var(--ink-3)}
.tb b{font-weight:600;color:var(--ink);white-space:nowrap}
.tb .status{display:flex;align-items:center;gap:6px}
.dot{width:8px;height:8px;border-radius:50%;background:var(--up);flex:none}
[data-state="down"]>.dot{background:#ef4444}
@media (max-width:900px){.tb{grid-template-columns:repeat(3,minmax(0,1fr))}.tb div{border-bottom:1px solid var(--line-2)}.tb div:nth-child(3n){border-right:0}}
/* top */
.top{display:flex;align-items:center;justify-content:space-between;gap:16px;padding-block:14px;border-bottom:1px solid var(--line-2)}
.brand{display:flex;align-items:center;gap:10px;font-weight:700}
.brand small{display:block;font:500 11px/1.4 var(--mono);letter-spacing:.06em;color:var(--ink-3);text-transform:uppercase}
.nav{display:flex;gap:2px}
.nav a{padding:7px 10px;font:500 11.5px/1 var(--mono);letter-spacing:.06em;text-transform:uppercase;color:var(--ink-2);border:1px solid transparent}
.nav a:hover{border-color:var(--line-2);color:var(--ink)}
@media (max-width:900px){.nav{display:none}}
/* hero */
.hero{display:grid;grid-template-columns:minmax(0,8fr) minmax(0,4fr);gap:clamp(24px,4vw,64px);padding-block:clamp(40px,6vw,88px) clamp(28px,4vw,56px);align-items:end}
.hero h1{font-size:clamp(40px,7vw,104px);line-height:.92;letter-spacing:-.045em;text-transform:uppercase}
.hero .claim{margin-top:20px;font-size:clamp(16px,1.5vw,19px);color:var(--ink-2);max-width:52ch}
.dim{margin-top:18px;max-width:640px;width:100%;height:auto;overflow:visible}
.dim line,.dim path{stroke:var(--hi);stroke-width:1.2;fill:none}
.dim text{font:600 11px var(--mono);fill:var(--hi);letter-spacing:.08em}
html.js .dim .d{stroke-dasharray:700;stroke-dashoffset:700;animation:draw 1.6s var(--ease) forwards .3s}
html.js .dim text{opacity:0;animation:fade .6s ease forwards 1.3s}
@keyframes draw{to{stroke-dashoffset:0}}@keyframes fade{to{opacity:1}}
.cta{display:flex;flex-wrap:wrap;gap:8px;margin-top:22px}
.btn{display:inline-flex;align-items:center;gap:8px;padding:10px 14px;border:1px solid var(--line-2);font:600 11.5px/1 var(--mono);letter-spacing:.06em;text-transform:uppercase;color:var(--ink);transition:background .2s,color .2s,transform .3s var(--ease)}
.btn:hover{background:var(--ink);color:var(--bg);transform:translateY(-2px)}
.btn.hi{background:var(--hi);border-color:var(--hi);color:var(--hi-ink)}
.btn.hi:hover{background:var(--ink);border-color:var(--ink);color:var(--bg)}
.btn svg{width:14px;height:14px}
.hero .tbwrap{display:grid;gap:10px}
.hero .tbwrap .tb{grid-template-columns:1fr 1fr}
.hero .tbwrap .tb div:nth-child(2n){border-right:0}.hero .tbwrap .tb div{border-bottom:1px solid var(--line-2)}.hero .tbwrap .tb div:nth-last-child(-n+2){border-bottom:0}
html.js .hero>*{opacity:0;animation:rise .8s var(--ease) forwards}html.js .hero>*:nth-child(2){animation-delay:.2s}
@keyframes rise{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
@media (max-width:900px){.hero{grid-template-columns:1fr}}
/* sections */
.sec{padding-block:clamp(36px,5vw,72px);border-top:1px solid var(--line-2)}
.sec-head{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:end;gap:8px 24px;margin-bottom:clamp(20px,3vw,36px)}
.sec-head h2{font-size:clamp(24px,3vw,40px);line-height:1;text-transform:uppercase;letter-spacing:-.03em}
.sec-head h2 small{display:block;font:500 11px/2 var(--mono);letter-spacing:.12em;color:var(--hi)}
.sec-head p{color:var(--ink-2);max-width:52ch;font-size:14.5px}
/* work: sticky drawing + specs */
.work{display:grid;grid-template-columns:minmax(0,7fr) minmax(0,5fr);gap:clamp(20px,3vw,48px);align-items:start}
.drawing{position:sticky;top:16px;border:1px solid var(--line-2);background:var(--surface);padding:14px;display:grid}
.drawing .dg-wrap{grid-area:1/1;opacity:0;visibility:hidden;transition:opacity .4s,visibility 0s .4s}
.drawing .dg-wrap.is-on{opacity:1;visibility:visible;transition-delay:0s}
.drawing .cap{display:flex;justify-content:space-between;gap:12px;padding-top:10px;border-top:1px solid var(--line);margin-top:8px}
.dg{width:100%;height:auto}
.dg-zone{fill:color-mix(in srgb,var(--ink) 3%,transparent);stroke:var(--line);stroke-width:1;stroke-dasharray:4 4}
.dg-zone-label{fill:var(--ink-3);font-family:var(--mono);font-size:9px;letter-spacing:.12em;text-transform:uppercase}
.dg-mask{fill:var(--surface)}
.dg-node{fill:var(--surface);stroke:var(--ink);stroke-width:1}
.dg-node.store{fill:color-mix(in srgb,var(--ink) 6%,var(--surface));stroke:var(--ink-2)}
.dg-node.external{fill:color-mix(in srgb,var(--ink) 3%,var(--surface));stroke:var(--ink-3)}
.dg-node.input{fill:color-mix(in srgb,var(--ink-2) 10%,var(--surface));stroke:var(--ink-3)}
.dg-node.async{fill:var(--surface);stroke:var(--ink-3);stroke-dasharray:4 3}
.dg-node.focal{fill:var(--hi-soft);stroke:var(--hi);stroke-width:1.2}
.dg-name{fill:var(--ink);font-size:12px;font-weight:600;font-family:var(--display)}
.dg-sub{fill:var(--ink-2);font-family:var(--mono);font-size:9px}
.dg-tag{fill:none;stroke:var(--ink-3);stroke-width:.8}
.dg-tag-text{fill:var(--ink-2);font-family:var(--mono);font-size:7px;letter-spacing:.08em}
.dg-arrow{fill:none;stroke:var(--ink-3);stroke-width:1.2}
.dg-arrow.link{stroke:var(--hi)}.dg-arrow.dashed{stroke-dasharray:5 4}
.dg-marker{fill:var(--ink-3)}.dg-marker.link{fill:var(--hi)}
.dg-label{fill:var(--ink-3);font-family:var(--mono);font-size:8px;letter-spacing:.06em}
html.js .draw .dg-arrow{stroke-dasharray:900;stroke-dashoffset:900;animation:draw 1.8s var(--ease) forwards .2s}
html.js .draw .dg-node{stroke-dasharray:900;stroke-dashoffset:900;animation:draw 1.4s var(--ease) forwards}
html.js .draw text,html.js .draw .dg-marker,html.js .draw .dg-tag{opacity:0;animation:fade .5s ease forwards .9s}
.specs{display:grid;gap:clamp(14px,2vw,22px)}
.spec{border:1px solid var(--line-2);background:color-mix(in srgb,var(--surface) 70%,transparent);scroll-margin-top:16px}
.spec .bar{display:flex;justify-content:space-between;align-items:center;gap:10px;padding:8px 14px;border-bottom:1px solid var(--line-2);font:600 11px/1 var(--mono);letter-spacing:.1em;text-transform:uppercase}
.spec .bar .st{display:inline-flex;align-items:center;gap:6px;color:var(--ink-3)}
.spec.is-on .bar{background:var(--hi);color:var(--hi-ink)}.spec.is-on .bar .st{color:var(--hi-ink)}
.spec .in{padding:14px;display:grid;gap:12px}
.spec h3{font-size:22px;line-height:1.1}
.spec p{color:var(--ink-2);font-size:14px}
.spec .fig{display:grid;grid-template-columns:120px 1fr;gap:12px;align-items:start}
.spec .fig img{border:1px solid var(--line-2)}
.spec .fig .mono{align-self:end}
.spec .inline-dg{display:none;border:1px solid var(--line);background:var(--surface);padding:8px}
.spec dl{display:grid;grid-template-columns:auto 1fr;gap:4px 12px;font-size:13px}
.spec dt{font:500 10.5px/1.8 var(--mono);letter-spacing:.1em;text-transform:uppercase;color:var(--ink-3)}
.spec dd code{font-family:var(--mono);font-size:12px}
.spec dd button{display:inline-flex;align-items:center;gap:4px;margin-left:6px;padding:1px 6px;border:1px solid var(--line);font:600 10px/1.4 var(--mono);color:var(--ink-3)}
.spec dd button:hover{color:var(--ink);border-color:var(--ink)}.spec dd button.copied{color:var(--up);border-color:var(--up)}
.spec .acts{display:flex;flex-wrap:wrap;gap:6px}
@media (max-width:1000px){.work{grid-template-columns:1fr}.drawing{display:none}.spec .inline-dg{display:block}}
/* deployment */
.deploy{display:grid;grid-template-columns:minmax(0,8fr) minmax(0,4fr);gap:clamp(20px,3vw,48px);align-items:start}
.deploy .dgbox{border:1px solid var(--line-2);background:var(--surface);padding:14px}
.callouts{display:grid;gap:0;counter-reset:co}
.callouts div{display:grid;grid-template-columns:28px 1fr;gap:10px;padding:12px 0;border-bottom:1px solid var(--line);font-size:14px}
.callouts div::before{counter-increment:co;content:counter(co);width:22px;height:22px;border-radius:50%;border:1.2px solid var(--hi);color:var(--hi);font:600 10.5px/20px var(--mono);text-align:center}
.callouts dt{font-weight:700;margin-bottom:2px}.callouts dd{color:var(--ink-2)}
@media (max-width:900px){.deploy{grid-template-columns:1fr}}
/* tables */
.tw{overflow-x:auto;border:1px solid var(--line-2)}
table{width:100%;min-width:640px;font-size:13.5px}
th{text-align:left;font:600 10.5px/1 var(--mono);letter-spacing:.12em;text-transform:uppercase;color:var(--ink-3);padding:10px 12px;border-bottom:1px solid var(--line-2);background:var(--surface)}
td{padding:11px 12px;border-bottom:1px solid var(--line);vertical-align:top}
tr:last-child td{border-bottom:0}
td.k{font-family:var(--mono);font-size:12px;white-space:nowrap;color:var(--hi);font-weight:600}
td b{font-weight:700}
td small{display:block;color:var(--ink-2);margin-top:3px}
td ul{display:grid;gap:3px;color:var(--ink-2)}
.bom td.q{font-family:var(--mono);font-weight:600;text-align:center;width:60px}
.bom td.u{color:var(--ink-2);font-size:12.5px}
/* notes + contact */
.nt{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
.nt a{border:1px solid var(--line-2);padding:14px;display:grid;gap:8px;transition:background .2s}
.nt a:hover{background:var(--surface)}
.nt .mono{color:var(--hi)}
.nt h3{font-size:17px;line-height:1.25}
.nt p{font-size:13.5px;color:var(--ink-2)}
@media (max-width:900px){.nt{grid-template-columns:1fr}}
.ct{display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);gap:clamp(20px,3vw,48px)}
.ct h2{font-size:clamp(26px,3vw,40px);line-height:1;text-transform:uppercase;letter-spacing:-.03em}
.ct p{margin-top:12px;color:var(--ink-2);max-width:44ch}
.ct .links{margin-top:18px;display:grid;gap:6px}
.ct .links a{display:grid;grid-template-columns:110px 1fr;gap:12px;font-size:14px;padding:8px 0;border-bottom:1px solid var(--line)}
.ct .links a span:first-child{font:500 10.5px/1.8 var(--mono);letter-spacing:.1em;text-transform:uppercase;color:var(--ink-3)}
.ct .links a:hover span:last-child{color:var(--hi)}
form{display:grid;gap:12px;border:1px solid var(--line-2);padding:16px;background:var(--surface)}
.field{display:grid;gap:5px}
.field label{font:500 10.5px/1 var(--mono);letter-spacing:.12em;text-transform:uppercase;color:var(--ink-3)}
.field input,.field textarea{width:100%;padding:10px 12px;border:1px solid var(--line-2);background:var(--bg);color:var(--ink);font-family:var(--display);transition:box-shadow .2s}
.field input:focus,.field textarea:focus{outline:none;box-shadow:0 0 0 3px var(--hi-soft);border-color:var(--hi)}
.field textarea{min-height:120px;resize:vertical}
form .btn{justify-self:start}
.fn{font:400 11px/1.6 var(--mono);color:var(--ink-3)}
.sent{padding:12px;border:1px solid var(--up);font-size:14px}
@media (max-width:800px){.ct{grid-template-columns:1fr}}
footer{padding-block:20px 20px;border-top:1px solid var(--line-2)}
footer .tb{margin-top:12px}
footer .links{display:flex;flex-wrap:wrap;gap:6px 18px;font:500 11px/1 var(--mono);letter-spacing:.06em;text-transform:uppercase;color:var(--ink-3)}
footer .links a:hover{color:var(--ink)}
html.js [data-reveal]{opacity:0;transform:translateY(10px);transition:opacity .7s var(--ease),transform .7s var(--ease);transition-delay:calc(var(--i,0) * 50ms)}
html.js [data-reveal].is-in{opacity:1;transform:none}
`;

export default {
  id: '07',
  slug: 'blueprint',
  name: 'Blueprint',
  concept: 'engineering drawing',
  file: '07-blueprint.html',
  fonts: ['Red Hat Display:wght@500;600;700;800', 'Red Hat Mono:wght@400;500;600'],
  axes: {
    layout: 'A drawing sheet: title block, the real architecture diagrams pinned beside the spec of each app, revision history and a bill of materials',
    canvas: 'White paper with blue ink / blueprint blue with pale lines',
    type: 'Red Hat Display + Red Hat Mono',
    motion: 'Dimension lines and diagrams draw themselves in, sheets highlight as they pass',
  },
  says: 'You think in systems and you already drew the diagrams. The most "engineer" of the ten, unmistakably yours because it uses your own drawings. A little dense on a phone.',
  render(c, h) {
    const t = h.tenure(c.experience.startDate);
    const dg = (slug, suffix) =>
      h.diagram(slug)
        .replace(/id="([^"]+)"/g, `id="$1-${suffix}"`)
        .replace(/aria-labelledby="([^"]+)"/, (m, v) => `aria-labelledby="${v.split(' ').map((x) => `${x}-${suffix}`).join(' ')}"`);
    const tb = (extra = '') => `<div class="tb" aria-label="Title block">
  <div><small>Drawing</small><b>mkado.dev</b></div>
  <div><small>Drawn by</small><b>M. Kado, computer engineer</b></div>
  <div><small>Rev</small><b>2026-09</b></div>
  <div><small>Scale</small><b>1 : 1, live</b></div>
  <div><small>Sheets</small><b>7 apps · 8 diagrams</b></div>
  <div><small>Status</small><b class="status" data-status-pill data-state="up"><span class="dot"></span><span data-status-text>All systems up</span></b></div>${extra}
</div>`;
    const specs = c.demos
      .map((d, i) => `<article class="spec${i === 0 ? ' is-on' : ''}" data-slug="${d.slug}" id="s-${d.slug}">
  <div class="bar"><span>Sheet ${String(i + 1).padStart(2, '0')} · ${h.esc(d.short)}</span><span class="st">${h.statusDot(d.slug)}up · ${d.period}</span></div>
  <div class="in">
    <h3>${h.esc(d.name)}</h3>
    <p>${h.esc(d.problem)}</p>
    <div class="inline-dg">${dg(d.slug, 'inl')}</div>
    <div class="fig">${h.shot(d)}<span class="mono">Fig. ${i + 1} · ${h.esc(d.kind)} · ${h.esc(d.langs)}</span></div>
    <dl>
      <dt>Materials</dt><dd>${h.esc(d.stack.join(' · '))}</dd>
      ${d.credentials.map((cr) => `<dt>${h.esc(cr.label)}</dt><dd><code>${h.esc(cr.user)}</code><button type="button" data-copy="${h.esc(cr.user)}" aria-label="Copy">${h.icon('copy')}</button> <code>${h.esc(cr.pass)}</code><button type="button" data-copy="${h.esc(cr.pass)}" aria-label="Copy">${h.icon('copy')}</button></dd>`).join('')}
      <dt>Note</dt><dd>${h.esc(d.note)}</dd>
    </dl>
    <div class="acts"><a class="btn hi" href="${d.demoUrl ?? d.url}" target="_blank" rel="noopener">${d.demoUrl ? 'Open signed in' : 'Open'} ${h.icon('arrow-up-right')}</a><a class="btn" href="/work/${d.slug}/">Case study</a>${d.repo ? `<a class="btn" href="${d.repo}" target="_blank" rel="noopener">Source</a>` : ''}</div>
  </div>
</article>`)
      .join('');

    return `${h.head({ title: 'Muhammed Kado — Blueprint', description: c.profile.headline, fonts: this.fonts, light: '#ffffff', dark: '#071a3f', css })}
<body>
<a class="skip" href="#main">Skip to content</a>
<div class="sheet">
<header class="top pad">
  <a class="brand" href="#top">${h.mark({ size: 32, font: 'Red Hat Display, system-ui, sans-serif' })}<span>${h.esc(c.profile.name)}<small>${h.esc(c.profile.role)} · İstanbul · UTC+3</small></span></a>
  <nav class="nav" aria-label="Sections">${c.nav.map((n) => `<a href="${n.href}">${n.label}</a>`).join('')}</nav>
</header>
<main id="main">
<section class="hero pad" id="top">
  <div>
    <p class="mono">Sheet 1 · General arrangement</p>
    <h1>Muhammed<br>Kado</h1>
    <p class="claim">${h.esc(c.profile.headline)} ${h.esc(c.profile.plain)} At USTEK: a laundry-management platform for commercial laundries, hotels and hospitals, on top of UHF readers and terminals.</p>
    <svg class="dim" viewBox="0 0 640 74" aria-hidden="true">
      <path class="d" d="M2 12v40M2 32h300M302 12v40"/><path class="d" d="M2 32l8-4v8zM302 32l-8-4v8z"/>
      <text x="152" y="24" text-anchor="middle">30+ COUNTRIES · USTEK RFID PLATFORM</text>
      <path class="d" d="M330 12v40M330 32h308M638 12v40"/><path class="d" d="M330 32l8-4v8zM638 32l-8-4v8z"/>
      <text x="484" y="24" text-anchor="middle">${t.short.toUpperCase()} · MAY 2023 → NOW</text>
      <path class="d" d="M2 62h636"/><text x="320" y="72" text-anchor="middle">SEVEN LIVE APPLICATIONS · ALL DIMENSIONS VERIFIED EVERY 5 MIN</text>
    </svg>
    <div class="cta"><a class="btn hi" href="#work">Open sheets ${h.icon('arrow-down')}</a><a class="btn" href="${c.profile.cv}">CV, PDF</a><a class="btn" href="${c.profile.github}" target="_blank" rel="noopener">GitHub</a><a class="btn" href="${c.profile.linkedin}" target="_blank" rel="noopener">LinkedIn</a></div>
  </div>
  <div class="tbwrap">${tb()}</div>
</section>

<section class="sec pad" id="work">
  <div class="sec-head" data-reveal><h2><small>Sheets 2–8</small>Seven applications</h2><p>Each sheet is a live app: its architecture on the left, its spec and demo account on the right. Diagrams are the ones from the case studies.</p></div>
  <div class="work">
    <aside class="drawing" aria-hidden="true">
      ${c.demos.map((d, i) => `<div class="dg-wrap${i === 0 ? ' is-on draw' : ''}" data-dg="${d.slug}">${dg(d.slug, 'stk')}<div class="cap"><span class="mono">Sheet ${String(i + 1).padStart(2, '0')} · ${h.esc(d.name)}</span><span class="mono">Rev ${d.period}</span></div></div>`).join('')}
    </aside>
    <div class="specs">${specs}</div>
  </div>
</section>

<section class="sec pad" id="how">
  <div class="sec-head" data-reveal><h2><small>Sheet 9 · Deployment</small>${h.esc(c.proof.title)}</h2><p>${h.esc(c.proof.lead)}</p></div>
  <div class="deploy">
    <div class="dgbox draw" data-reveal>${dg('deployment', 'dep')}</div>
    <dl class="callouts" data-reveal>${c.proof.facts.map((f) => `<div><div><dt>${h.esc(f.k)}</dt><dd>${h.esc(f.v)}</dd></div></div>`).join('')}<div style="border:0;padding-top:16px"><div><a class="btn" href="${c.proof.link}">${h.esc(c.proof.linkLabel)} ${h.icon('arrow-right')}</a></div></div></dl>
  </div>
</section>

<section class="sec pad" id="experience">
  <div class="sec-head" data-reveal><h2><small>Revision history</small>Experience</h2><p>Newest revision first. The current one is still open.</p></div>
  <div class="tw" data-reveal><table><thead><tr><th>Rev</th><th>Period</th><th>Description</th><th>Where</th></tr></thead><tbody>
    ${c.timeline.map((e, i) => `<tr><td class="k">${String.fromCharCode(67 - i)}${e.live ? ' · open' : ''}</td><td style="white-space:nowrap">${e.from} – ${e.to}${e.live ? `<small>${t.short}, counting</small>` : ''}</td><td><b>${h.esc(e.title)}</b>, ${h.esc(e.org)}<small>${h.esc(e.summary)}</small>${e.bullets.length ? `<ul style="margin-top:6px">${e.bullets.map((b) => `<li>— ${h.esc(b)}</li>`).join('')}</ul>` : ''}</td><td>${h.esc(e.where)}</td></tr>`).join('')}
  </tbody></table></div>
</section>

<section class="sec pad" id="skills">
  <div class="sec-head" data-reveal><h2><small>Bill of materials</small>Skills</h2><p>Quantity is the number of projects on this sheet that use the item. Languages: Kurdish, Arabic, Turkish (native), English (professional).</p></div>
  <div class="tw bom" data-reveal><table><thead><tr><th>Group</th><th>Item</th><th style="text-align:center">Qty</th><th>Used in</th></tr></thead><tbody>
    ${c.skills.flatMap((g) => g.items.map((s, i) => `<tr>${i === 0 ? `<td class="k" rowspan="${g.items.length}">${h.esc(g.group)}</td>` : ''}<td><b>${h.esc(s.name)}</b></td><td class="q">${s.projects.length || '—'}</td><td class="u">${h.esc(s.projects.join(', ')) || '—'}</td></tr>`)).join('')}
  </tbody></table></div>
</section>

<section class="sec pad" id="notes">
  <div class="sec-head" data-reveal><h2><small>Detail sheets</small>Notes</h2><p>What broke in production, and the fix.</p></div>
  <div class="nt">${c.notes.map((n, i) => `<a href="/notes/${n.slug}/" data-reveal><span class="mono">Detail ${i + 1} · ${n.date}</span><h3>${h.esc(n.title)}</h3><p>${h.esc(n.description)}</p></a>`).join('')}</div>
</section>

<section class="sec pad" id="contact">
  <div class="ct">
    <div data-reveal>
      <p class="mono">Request for quotation</p>
      <h2>Hiring a full-stack engineer?</h2>
      <p>${h.esc(c.profile.availability)} I reply within a day.</p>
      <div class="links">
        <a href="mailto:${c.profile.email}"><span>Email</span><span>${c.profile.email}</span></a>
        <a href="${c.profile.whatsapp}" target="_blank" rel="noopener"><span>WhatsApp</span><span>${c.profile.phone}</span></a>
        <a href="${c.profile.linkedin}" target="_blank" rel="noopener"><span>LinkedIn</span><span>in/muhammed-kado</span></a>
        <a href="${c.profile.cv}"><span>CV</span><span>PDF</span></a>
      </div>
    </div>
    <form action="/api/contact" method="post" data-reveal novalidate>
      <div class="field"><label for="cf-name">Name</label><input id="cf-name" name="name" type="text" autocomplete="name" required></div>
      <div class="field"><label for="cf-email">Email</label><input id="cf-email" name="email" type="email" autocomplete="email" required></div>
      <div class="field"><label for="cf-msg">Message</label><textarea id="cf-msg" name="message" required></textarea></div>
      <button class="btn hi" type="submit">Send</button>
      <p class="fn">Turnstile · stored first · forwarded second</p>
    </form>
  </div>
</section>
</main>
<footer class="pad">
  <div class="links"><a href="/about-this-site">About this site</a><a href="/notes/">Notes</a><a href="/rss.xml">RSS</a><a href="https://github.com/muhammedkado/mkado.dev" target="_blank" rel="noopener">Source</a><span>© 2026 ${h.esc(c.profile.name)}</span></div>
  ${tb()}
</footer>
</div>
${h.candidateBar(h.id, h.total)}
${h.revealScript}
${h.copyScript}
<script>
(function(){
  var specs=[].slice.call(document.querySelectorAll('.spec')),wraps=[].slice.call(document.querySelectorAll('.drawing .dg-wrap'));
  function activate(slug){specs.forEach(function(s){s.classList.toggle('is-on',s.dataset.slug===slug)});wraps.forEach(function(w){var on=w.dataset.dg===slug;if(on&&!w.classList.contains('is-on')){w.classList.remove('draw');void w.offsetWidth;w.classList.add('draw')}w.classList.toggle('is-on',on)})}
  if('IntersectionObserver' in window&&matchMedia('(min-width:1001px)').matches){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)activate(e.target.dataset.slug)})},{rootMargin:'-40% 0px -50% 0px'});specs.forEach(function(s){io.observe(s)})}
  var f=document.querySelector('form');f&&f.addEventListener('submit',function(e){e.preventDefault();var m=document.createElement('p');m.className='sent';m.textContent='Design mockup: on the built site this posts to /api/contact.';f.replaceChildren(m)});
})();
</script>
</body>
</html>`;
  },
};
