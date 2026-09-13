// 02 · Control Room — telemetry, calm, dark-first.
// The status probe and the tenure counter become the identity: readouts in a
// mono face, a pulse ring for the RFID read, and a split layout where the
// project info stays pinned while the screenshots stream past.
// Type: Sora for statements, Martian Mono for every readout and label.

const css = `
:root{color-scheme:light dark;
--bg:light-dark(#f3f5f8,#0b0f17);--surface:light-dark(#ffffff,#111827);--surface-2:light-dark(#e9edf3,#172033);--ink:light-dark(#0f172a,#e6eaf2);--ink-2:light-dark(#475569,#a3adbf);--ink-3:light-dark(#5b6577,#7b8597);--line:light-dark(#dce1e8,#1f2733);--line-2:light-dark(#c5ccd6,#2c3646);--accent:light-dark(#1f4fd8,#6d93ff);--accent-ink:light-dark(#ffffff,#0b0f17);--accent-soft:light-dark(#e3e9fb,#182247);--up:light-dark(#15803d,#34d399);--up-soft:light-dark(#dcfce7,#0f2a22);--focus:var(--accent);
--mark-bg:light-dark(#0f172a,#e6eaf2);--mark-fg:light-dark(#f3f5f8,#0b0f17);--mark-pulse:var(--accent);--mark-dot:var(--up);
--display:"Sora",system-ui,sans-serif;--mono:"Martian Mono",ui-monospace,Menlo,Consolas,monospace;
--ease:cubic-bezier(.22,1,.36,1);--r:10px;--wrap:1240px}
:root[data-theme="light"]{color-scheme:light}:root[data-theme="dark"]{color-scheme:dark}
html{scroll-behavior:smooth}
body{background:var(--bg);color:var(--ink);font:15.5px/1.6 var(--display);padding-inline:clamp(16px,3.5vw,48px);background-image:radial-gradient(ellipse 60% 40% at 80% -10%,color-mix(in srgb,var(--accent) 14%,transparent),transparent 70%);background-repeat:no-repeat}
.wrap{max-width:var(--wrap);margin:0 auto}
.skip{position:absolute;left:16px;top:-48px;padding:10px 14px;background:var(--ink);color:var(--bg);border-radius:6px;z-index:50}.skip:focus{top:12px}
.mono{font-family:var(--mono);font-size:12px;letter-spacing:.02em;font-variant-numeric:tabular-nums}
.label{font:500 11px/1 var(--mono);letter-spacing:.14em;text-transform:uppercase;color:var(--ink-3)}
h1,h2,h3{letter-spacing:-.02em;text-wrap:balance}
/* top */
.top{display:flex;align-items:center;justify-content:space-between;gap:16px;padding-block:16px;border-bottom:1px solid var(--line)}
.brand{display:flex;align-items:center;gap:12px;font-weight:600}
.brand small{display:block;font:400 11px/1.4 var(--mono);color:var(--ink-3);letter-spacing:.04em}
.nav{display:flex;gap:2px}
.nav a{padding:8px 11px;border-radius:8px;font-size:13.5px;color:var(--ink-2);font-weight:500}
.nav a:hover{color:var(--ink);background:var(--surface-2)}
.readouts{display:flex;align-items:center;gap:10px}
.pill{display:inline-flex;align-items:center;gap:8px;padding:7px 11px;border:1px solid var(--line);border-radius:6px;background:var(--surface);font:500 11.5px/1 var(--mono);color:var(--ink-2);white-space:nowrap}
.dot{width:8px;height:8px;border-radius:50%;background:var(--up);position:relative;flex:none}
.dot::after{content:"";position:absolute;inset:-4px;border-radius:50%;border:1px solid var(--up);opacity:0;animation:ring 2.2s var(--ease) infinite}
[data-state="down"]>.dot,.dot[data-state="down"]{background:#ef4444}[data-state="down"]>.dot::after{animation:none}
@keyframes ring{0%{transform:scale(.4);opacity:.9}100%{transform:scale(1.6);opacity:0}}
@media (max-width:960px){.nav{display:none}.pill span:last-child{display:none}}
/* hero */
.hero{display:grid;grid-template-columns:minmax(0,7fr) minmax(0,5fr);gap:clamp(24px,5vw,72px);align-items:center;padding-block:clamp(48px,8vw,104px) clamp(40px,6vw,72px)}
.hero h1{font-size:clamp(36px,5.4vw,72px);line-height:1.02;font-weight:700;margin-top:18px}
.hero h1 span{color:var(--accent)}
.hero .lede{margin-top:22px;font-size:17px;color:var(--ink-2);max-width:56ch}
.cta{display:flex;flex-wrap:wrap;gap:10px;margin-top:28px}
.btn{display:inline-flex;align-items:center;gap:9px;padding:12px 18px;border-radius:8px;font-weight:600;font-size:14.5px;border:1px solid var(--line-2);color:var(--ink);background:var(--surface);transition:transform .3s var(--ease),border-color .2s,background .2s,color .2s}
.btn:hover{transform:translateY(-2px);border-color:var(--ink-3)}
.btn.primary{background:var(--accent);color:var(--accent-ink);border-color:transparent}
.btn.primary:hover{filter:brightness(1.08)}
.btn svg{width:16px;height:16px}
html.js .hero>*{opacity:0;animation:rise .9s var(--ease) forwards}
html.js .hero>*:nth-child(2){animation-delay:.25s}
@keyframes rise{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
.console{position:relative;border:1px solid var(--line);border-radius:var(--r);background:var(--surface);padding:22px;box-shadow:0 30px 80px -40px rgba(0,0,0,.5)}
.console::before{content:"";position:absolute;inset:0;border-radius:inherit;background:linear-gradient(180deg,color-mix(in srgb,var(--accent) 6%,transparent),transparent 40%);pointer-events:none}
.console .head{display:flex;justify-content:space-between;align-items:center;gap:12px;padding-bottom:14px;border-bottom:1px dashed var(--line-2)}
.console .head .label{color:var(--ink-2)}
.metrics{display:grid;grid-template-columns:1fr 1fr;gap:0 18px}
.metric{padding:14px 0;border-bottom:1px solid var(--line)}
.metric:nth-last-child(-n+2){border-bottom:0}
.metric .label{margin-bottom:8px}
.metric .v{font:600 clamp(26px,2.6vw,34px)/1 var(--display);letter-spacing:-.03em;font-variant-numeric:tabular-nums}
.metric .v small{font:500 11px/1 var(--mono);color:var(--ink-3);letter-spacing:.06em;margin-left:5px}
.metric .sub{font:400 11.5px/1.5 var(--mono);color:var(--ink-3);margin-top:6px}
.pulse{position:absolute;right:18px;top:14px;width:64px;height:64px}
.pulse circle{fill:none;stroke:var(--accent);stroke-width:1.2;transform-origin:center;opacity:0;animation:pulse 3s var(--ease) infinite}
.pulse circle:nth-child(2){animation-delay:1s}.pulse circle:nth-child(3){animation-delay:2s}
.pulse .core{fill:var(--up);stroke:none;opacity:1;animation:none}
@keyframes pulse{0%{transform:scale(.2);opacity:.9}100%{transform:scale(1);opacity:0}}
@media (max-width:900px){.hero{grid-template-columns:1fr}}
/* sections */
.sec{padding-block:clamp(48px,7vw,88px);border-top:1px solid var(--line)}
.sec-head{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:end;gap:12px 32px;margin-bottom:clamp(24px,4vw,44px)}
.sec-head h2{font-size:clamp(26px,3.2vw,40px);line-height:1.1;font-weight:700}
.sec-head p{color:var(--ink-2);max-width:56ch}
/* split work */
.split{display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);gap:clamp(24px,4vw,56px);align-items:start}
.panel{position:sticky;top:20px;border:1px solid var(--line);border-radius:var(--r);background:var(--surface);overflow:hidden}
.panel .bar{display:flex;justify-content:space-between;align-items:center;padding:12px 18px;border-bottom:1px solid var(--line);background:var(--surface-2)}
.panel .bar .label{color:var(--ink-2)}
.layers{position:relative;display:grid}
.layer{grid-area:1/1;padding:22px 20px 20px;opacity:0;visibility:hidden;transform:translateY(8px);transition:opacity .45s var(--ease),transform .45s var(--ease),visibility 0s .45s}
.layer.is-on{opacity:1;visibility:visible;transform:none;transition-delay:0s}
.layer .idx{font:500 12px/1 var(--mono);color:var(--accent);letter-spacing:.1em}
.layer h3{font-size:clamp(22px,2.2vw,28px);line-height:1.15;font-weight:700;margin-top:10px}
.layer .kind{font:400 12px/1.5 var(--mono);color:var(--ink-3);margin-top:4px}
.layer p{margin-top:12px;color:var(--ink-2);font-size:14.5px}
.stack{display:flex;flex-wrap:wrap;gap:6px;margin-top:14px}
.stack span{font:500 11px/1 var(--mono);padding:6px 8px;border-radius:5px;background:var(--surface-2);color:var(--ink-2);letter-spacing:.02em}
.creds{margin-top:16px;border:1px dashed var(--line-2);border-radius:6px;padding:10px 12px;display:grid;gap:8px;font:400 12px/1.6 var(--mono)}
.cred{display:flex;flex-wrap:wrap;gap:6px 10px;align-items:center;color:var(--ink-2)}
.cred b{font-weight:600;color:var(--ink);min-width:96px;font-family:var(--display);font-size:12.5px}
.cred code{color:var(--ink);font-family:inherit;font-size:inherit}
.copy{display:inline-flex;align-items:center;gap:4px;padding:3px 7px;border-radius:5px;font:600 10.5px/1 var(--mono);border:1px solid var(--line-2);color:var(--ink-2)}
.copy:hover{color:var(--ink);border-color:var(--ink-3)}.copy.copied{color:var(--up);border-color:var(--up)}
.acts{display:flex;flex-wrap:wrap;gap:8px;margin-top:16px}
.acts .btn{padding:10px 14px;font-size:13.5px}
.layer .note{margin-top:12px;font:400 11.5px/1.6 var(--mono);color:var(--ink-3)}
.stream{display:grid;gap:clamp(20px,3vw,40px)}
.proj{scroll-margin-top:20px}
.proj .media{position:relative;border:1px solid var(--line);border-radius:var(--r);overflow:hidden;background:var(--surface);aspect-ratio:1440/900;box-shadow:0 40px 80px -50px rgba(0,0,0,.6);transition:transform .6s var(--ease),border-color .3s}
.proj.is-on .media{border-color:var(--accent)}
.proj .media img{width:100%;height:100%;object-fit:cover;object-position:top}
.proj .media .tag{position:absolute;left:12px;top:12px;display:inline-flex;align-items:center;gap:8px;padding:6px 9px;border-radius:6px;background:color-mix(in srgb,var(--bg) 85%,transparent);backdrop-filter:blur(8px);font:500 11px/1 var(--mono);color:var(--ink);letter-spacing:.06em}
.proj .info{display:none}
/* generated media: a telemetry plate inside the console; key visuals cover the stream, the project in view shows its screenshot */
.console.has-plate{--plate-o:.3;--plate-o-dark:.5;--plate-mask:linear-gradient(180deg,#000 10%,transparent 75%);overflow:hidden}
.proj .media img.kv{position:absolute;inset:0;object-position:center;transition:opacity .6s var(--ease)}
.proj.is-on .media img.kv,.proj .media:hover img.kv,.proj .media:focus-visible img.kv{opacity:0}
@media (max-width:1023px){.proj .media img.kv{display:none}}
@media (max-width:1023px){.split{grid-template-columns:1fr}.panel{display:none}.proj .info{display:block;padding:14px 2px 6px}.proj .info h3{font-size:22px;font-weight:700}.proj .info .kind{font:400 12px/1.5 var(--mono);color:var(--ink-3)}.proj .info p{margin-top:8px;color:var(--ink-2);font-size:14.5px}}
/* how it runs: a status table */
.ops{display:grid;grid-template-columns:minmax(0,4fr) minmax(0,8fr);gap:clamp(24px,4vw,56px)}
.ops h2{font-size:clamp(26px,3.2vw,40px);line-height:1.1;font-weight:700}
.ops .lead{margin-top:14px;color:var(--ink-2)}
.ops .more{margin-top:20px}
.facts{border:1px solid var(--line);border-radius:var(--r);overflow:hidden;background:var(--surface)}
.facts div{display:grid;grid-template-columns:110px 1fr;gap:14px;padding:14px 16px;border-bottom:1px solid var(--line);font-size:14.5px}
.facts div:last-child{border-bottom:0}
.facts dt{font:500 11px/1.8 var(--mono);letter-spacing:.12em;text-transform:uppercase;color:var(--accent)}
.facts dd{color:var(--ink-2)}
@media (max-width:800px){.ops{grid-template-columns:1fr}}
/* experience rail */
.rail{position:relative;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px;padding-top:28px}
.rail::before{content:"";position:absolute;left:0;right:0;top:8px;height:1px;background:var(--line-2)}
.rail article{position:relative;padding-top:6px}
.rail article::before{content:"";position:absolute;left:0;top:-24px;width:9px;height:9px;border-radius:50%;background:var(--bg);border:2px solid var(--ink-3)}
.rail article.live::before{background:var(--up);border-color:var(--up);box-shadow:0 0 0 4px var(--up-soft)}
.rail .when{font:500 12px/1 var(--mono);color:var(--ink-3);letter-spacing:.06em}
.rail .when b{color:var(--up);font-weight:600}
.rail h3{font-size:20px;font-weight:700;margin-top:12px}
.rail .org{color:var(--ink-2);font-size:14px;margin-top:2px}
.rail p{margin-top:10px;color:var(--ink-2);font-size:14.5px}
.rail ul{margin-top:10px;display:grid;gap:6px;font-size:14px;color:var(--ink-2)}
.rail li{padding-left:14px;position:relative}.rail li::before{content:"›";position:absolute;left:0;color:var(--accent)}
@media (max-width:800px){.rail{grid-template-columns:1fr;gap:32px}.rail::before{display:none}.rail article::before{display:none}}
/* skills matrix */
.matrix{display:grid;gap:1px;background:var(--line);border:1px solid var(--line);border-radius:var(--r);overflow:hidden}
.matrix .g{display:grid;grid-template-columns:140px 1fr;gap:12px;background:var(--surface);padding:14px 16px}
.matrix .g h3{font:500 11px/1.8 var(--mono);letter-spacing:.12em;text-transform:uppercase;color:var(--ink-3)}
.matrix ul{display:flex;flex-wrap:wrap;gap:6px}
.matrix li{display:inline-flex;align-items:center;gap:7px;padding:6px 9px;border:1px solid var(--line);border-radius:6px;font-size:13.5px;background:var(--bg)}
.matrix li b{font:600 11px/1 var(--mono);color:var(--accent)}
.matrix li b[title]{cursor:help}
@media (max-width:640px){.matrix .g{grid-template-columns:1fr;gap:8px}}
/* notes */
.notes{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr));gap:14px}
.notes a{display:grid;gap:10px;padding:18px;border:1px solid var(--line);border-radius:var(--r);background:var(--surface);transition:border-color .25s,transform .35s var(--ease)}
.notes a:hover{border-color:var(--accent);transform:translateY(-3px)}
.notes time{font:500 11px/1 var(--mono);color:var(--ink-3);letter-spacing:.08em}
.notes h3{font-size:17px;line-height:1.3;font-weight:600}
.notes p{font-size:14px;color:var(--ink-2)}
.notes .tags{display:flex;flex-wrap:wrap;gap:6px;font:400 11px/1 var(--mono);color:var(--accent)}
/* contact */
.contact{display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);gap:clamp(24px,4vw,56px)}
.contact h2{font-size:clamp(28px,3.6vw,44px);line-height:1.05;font-weight:700}
.contact .lead{margin-top:14px;color:var(--ink-2)}
.links{margin-top:22px;display:grid;gap:8px}
.links a{display:grid;grid-template-columns:20px 1fr auto;gap:12px;align-items:center;padding:11px 12px;border:1px solid var(--line);border-radius:8px;background:var(--surface);font-size:14px}
.links a:hover{border-color:var(--accent)}
.links a svg{width:18px;height:18px;color:var(--accent)}
.links a span:last-child{font:500 11px/1 var(--mono);color:var(--ink-3);letter-spacing:.08em;text-transform:uppercase}
form{display:grid;gap:14px;padding:22px;border:1px solid var(--line);border-radius:var(--r);background:var(--surface)}
.field{display:grid;gap:6px}
.field label{font:500 11px/1 var(--mono);letter-spacing:.12em;text-transform:uppercase;color:var(--ink-3)}
.field input,.field textarea{width:100%;padding:11px 12px;border:1px solid var(--line-2);border-radius:7px;background:var(--bg);color:var(--ink);transition:border-color .2s,box-shadow .2s}
.field input:focus,.field textarea:focus{outline:none;border-color:var(--accent);box-shadow:0 0 0 3px var(--accent-soft)}
.field textarea{min-height:130px;resize:vertical}
form .btn{justify-self:start}
.form-note{font:400 11.5px/1.6 var(--mono);color:var(--ink-3)}
.sent{padding:12px 14px;border:1px solid var(--up);border-radius:7px;font-size:14px}
@media (max-width:800px){.contact{grid-template-columns:1fr}}
footer{display:flex;flex-wrap:wrap;justify-content:space-between;gap:10px 24px;padding-block:24px 36px;border-top:1px solid var(--line);font:400 11.5px/1.6 var(--mono);color:var(--ink-3)}
footer a:hover{color:var(--ink)}
html.js [data-reveal]{opacity:0;transform:translateY(14px);transition:opacity .8s var(--ease),transform .8s var(--ease);transition-delay:calc(var(--i,0) * 60ms)}
html.js [data-reveal].is-in{opacity:1;transform:none}
`;

export default {
  id: '02',
  slug: 'control-room',
  name: 'Control Room',
  concept: 'telemetry · calm · dark-first',
  file: '02-control-room.html',
  fonts: ['Sora:wght@400;500;600;700', 'Martian Mono:wght@400;500;600'],
  axes: {
    layout: 'Split work section: project info pinned on the left while the seven screenshots stream past on the right',
    canvas: 'Graphite / cool white; green is reserved for "up"',
    type: 'Sora + Martian Mono readouts',
    motion: 'Pulse ring, live clock, pinned panel crossfades in sync with the scrolling media',
  },
  says: 'You run production systems and you are comfortable with the ops side. Reads as a backend engineer who ships and monitors, not a designer who codes.',
  render(c, h) {
    const t = h.tenure(c.experience.startDate);
    const layers = c.demos
      .map((d, i) => `<div class="layer${i === 0 ? ' is-on' : ''}" data-layer="${d.slug}">
  <div class="idx">${String(i + 1).padStart(2, '0')} / ${String(c.demos.length).padStart(2, '0')}</div>
  <h3>${h.esc(d.name)}</h3>
  <div class="kind">${h.esc(d.kind)} · ${d.period} · ${h.esc(d.langs)}</div>
  <p>${h.esc(d.problem)}</p>
  <div class="stack">${d.stack.map((s) => `<span>${h.esc(s)}</span>`).join('')}</div>
  ${d.credentials.length ? `<div class="creds">${d.credentials.map((cr) => `<div class="cred"><b>${h.esc(cr.label)}</b><code>${h.esc(cr.user)}</code><button class="copy" type="button" data-copy="${h.esc(cr.user)}" aria-label="Copy">${h.icon('copy')}</button><code>${h.esc(cr.pass)}</code><button class="copy" type="button" data-copy="${h.esc(cr.pass)}" aria-label="Copy">${h.icon('copy')}</button></div>`).join('')}</div>` : ''}
  <div class="acts">
    <a class="btn primary" href="${d.demoUrl ?? d.url}" target="_blank" rel="noopener">${d.demoUrl ? 'Open signed in' : 'Open the app'} ${h.icon('arrow-up-right')}</a>
    <a class="btn" href="/work/${d.slug}/">Case study</a>
    ${d.repo ? `<a class="btn" href="${d.repo}" target="_blank" rel="noopener">${h.icon('github')} Source</a>` : ''}
  </div>
  <p class="note">${h.esc(d.note)}</p>
</div>`)
      .join('');

    const stream = c.demos
      .map((d, i) => `<article class="proj${i === 0 ? ' is-on' : ''}" data-slug="${d.slug}" id="w-${d.slug}">
  <a class="media" href="${d.demoUrl ?? d.url}" target="_blank" rel="noopener" aria-label="Open ${h.esc(d.name)}">${h.shot(d)}${h.keyVisual(d, 'class="kv"', { fallback: false })}<span class="tag">${h.statusDot(d.slug)}${String(i + 1).padStart(2, '0')} · ${h.esc(d.short.toUpperCase())}</span></a>
  <div class="info"><h3>${h.esc(d.name)}</h3><div class="kind">${h.esc(d.kind)} · ${d.period} · ${h.esc(d.stack.slice(0, 3).join(' · '))}</div><p>${h.esc(d.problem)}</p>
    <div class="acts"><a class="btn primary" href="${d.demoUrl ?? d.url}" target="_blank" rel="noopener">${d.demoUrl ? 'Open signed in' : 'Open the app'} ${h.icon('arrow-up-right')}</a><a class="btn" href="/work/${d.slug}/">Case study</a></div>
    ${d.credentials.length ? `<div class="creds">${d.credentials.map((cr) => `<div class="cred"><b>${h.esc(cr.label)}</b><code>${h.esc(cr.user)}</code><code>${h.esc(cr.pass)}</code></div>`).join('')}</div>` : ''}
  </div>
</article>`)
      .join('');

    return `${h.head({ title: 'Muhammed Kado — Control Room', description: c.profile.headline, fonts: this.fonts, light: '#f3f5f8', dark: '#0b0f17', css })}
<body>
<a class="skip" href="#main">Skip to content</a>
<div class="wrap">
<header class="top">
  <a class="brand" href="#top">${h.mark({ size: 34, font: 'Sora, system-ui, sans-serif' })}<span>${h.esc(c.profile.name)}<small>full-stack · istanbul · <span data-clock>--:--</span> UTC+3</small></span></a>
  <nav class="nav" aria-label="Sections">${c.nav.map((n) => `<a href="${n.href}">${n.label}</a>`).join('')}</nav>
  <div class="readouts">${h.statusPill('pill', 'ALL SYSTEMS UP · 2 MIN AGO')}</div>
</header>

<main id="main">
<section class="hero" id="top">
  <div>
    <p class="label">${h.esc(c.profile.title)} · ${h.esc(c.profile.role)}</p>
    <h1>The web side of <span>RFID systems</span>, running in 30+ countries.</h1>
    <p class="lede">${h.esc(c.profile.plain)} At USTEK that is a laundry-management platform for commercial laundries, hotels and hospitals. The seven applications below are deployed, monitored, and yours to try.</p>
    <div class="cta">
      <a class="btn primary" href="#work">Open the work ${h.icon('arrow-down')}</a>
      <a class="btn" href="${c.profile.cv}">${h.icon('download')} CV</a>
      <a class="btn" href="${c.profile.github}" target="_blank" rel="noopener">${h.icon('github')} GitHub</a>
    </div>
  </div>
  <div class="console${h.plateClass('plate-control-room')}" aria-label="Live readouts">
    <svg class="pulse" viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="28"/><circle cx="32" cy="32" r="28"/><circle cx="32" cy="32" r="28"/><circle class="core" cx="32" cy="32" r="3"/></svg>
    <div class="head"><span class="label">Readouts</span><span class="mono" style="color:var(--ink-3)">rfid://mkado.dev</span></div>
    <div class="metrics">
      <div class="metric"><div class="label">Tenure at USTEK</div><div class="v"><span data-count="${t.total}">${t.total}</span><small>MONTHS</small></div><div class="sub">since ${c.experience.startDate}, counting</div></div>
      <div class="metric"><div class="label">Apps live</div><div class="v">7<small>/ 7</small></div><div class="sub">probed every 5 min</div></div>
      <div class="metric"><div class="label">Deployed in</div><div class="v">30<small>+ COUNTRIES</small></div><div class="sub">USTEK RFID platform</div></div>
      <div class="metric"><div class="label">Languages</div><div class="v">4<small>SPOKEN</small></div><div class="sub">KU · AR · TR · EN</div></div>
    </div>
    ${h.plate('plate-control-room')}
  </div>
</section>

<section class="sec" id="work">
  <div class="sec-head" data-reveal><h2>Seven applications, all up</h2><p>Scroll the screenshots; the panel follows. Every app has a demo account or needs none. Data resets nightly.</p></div>
  <div class="split">
    <aside class="panel" aria-live="polite">
      <div class="bar"><span class="label">Selected</span><span class="mono" style="color:var(--ink-2)">${h.statusDot('pos', 'dot')} <span data-panel-slug>pos</span>.mkado.dev</span></div>
      <div class="layers">${layers}</div>
    </aside>
    <div class="stream">${stream}</div>
  </div>
</section>

<section class="sec" id="how">
  <div class="ops">
    <div data-reveal>
      <p class="label">How it runs</p>
      <h2>${h.esc(c.proof.title)}</h2>
      <p class="lead">${h.esc(c.proof.lead)}</p>
      <p class="more"><a class="btn" href="${c.proof.link}">${h.esc(c.proof.linkLabel)} ${h.icon('arrow-right')}</a></p>
    </div>
    <dl class="facts" data-reveal>${c.proof.facts.map((f) => `<div><dt>${h.esc(f.k)}</dt><dd>${h.esc(f.v)}</dd></div>`).join('')}</dl>
  </div>
</section>

<section class="sec" id="experience">
  <div class="sec-head" data-reveal><h2>Experience</h2><p>Degree, then production. The first entry is still running.</p></div>
  <div class="rail">
    ${[...c.timeline].reverse().map((e) => `<article class="${e.live ? 'live' : ''}" data-reveal>
      <div class="when">${e.from} → ${e.to.toUpperCase()}${e.live ? ` · <b>${t.short.toUpperCase()}</b>` : ''}</div>
      <h3>${h.esc(e.title)}</h3><div class="org">${h.esc(e.org)} · ${h.esc(e.where)}</div>
      <p>${h.esc(e.summary)}</p>${e.bullets.length ? `<ul>${e.bullets.map((b) => `<li>${h.esc(b)}</li>`).join('')}</ul>` : ''}
    </article>`).join('')}
  </div>
</section>

<section class="sec" id="skills">
  <div class="sec-head" data-reveal><h2>Skills, counted</h2><p>The number is how many projects on this page ship the skill. Hover for the list.</p></div>
  <div class="matrix" data-reveal>
    ${c.skills.map((g) => `<div class="g"><h3>${h.esc(g.group)}</h3><ul>${g.items.map((s) => `<li>${h.esc(s.name)}${s.projects.length ? `<b title="${h.esc(s.projects.join(', '))}">×${s.projects.length}</b>` : ''}</li>`).join('')}</ul></div>`).join('')}
  </div>
</section>

<section class="sec" id="notes">
  <div class="sec-head" data-reveal><h2>Notes</h2><p>Incident-shaped write-ups: what broke, what fixed it.</p></div>
  <div class="notes">
    ${c.notes.map((n) => `<a href="/notes/${n.slug}/" data-reveal><time datetime="${n.date}">${n.date}</time><h3>${h.esc(n.title)}</h3><p>${h.esc(n.description)}</p><div class="tags">${n.tags.map((tg) => `<span>#${tg}</span>`).join('')}</div></a>`).join('')}
  </div>
</section>

<section class="sec" id="contact">
  <div class="contact">
    <div data-reveal>
      <p class="label">Contact</p>
      <h2>Hiring a full-stack engineer?</h2>
      <p class="lead">${h.esc(c.profile.availability)} Messages are stored first and forwarded second, so nothing is lost.</p>
      <div class="links">
        <a href="mailto:${c.profile.email}">${h.icon('mail')}<span>${c.profile.email}</span><span>email</span></a>
        <a href="${c.profile.whatsapp}" target="_blank" rel="noopener">${h.icon('whatsapp')}<span>${c.profile.phone}</span><span>whatsapp</span></a>
        <a href="${c.profile.linkedin}" target="_blank" rel="noopener">${h.icon('linkedin')}<span>muhammed-kado</span><span>linkedin</span></a>
      </div>
    </div>
    <form action="/api/contact" method="post" data-reveal novalidate>
      <div class="field"><label for="cf-name">Name</label><input id="cf-name" name="name" type="text" autocomplete="name" required></div>
      <div class="field"><label for="cf-email">Email</label><input id="cf-email" name="email" type="email" autocomplete="email" required></div>
      <div class="field"><label for="cf-msg">Message</label><textarea id="cf-msg" name="message" required placeholder="Role, stack, timeline."></textarea></div>
      <button class="btn primary" type="submit">Send ${h.icon('arrow-right')}</button>
      <p class="form-note">// turnstile · stored to sqlite · forwarded by mail</p>
    </form>
  </div>
</section>
</main>
<footer>
  <span>© 2026 ${h.esc(c.profile.name)} · build ${new Date().toISOString().slice(0, 10)}</span>
  <span><a href="/about-this-site">about this site</a> · <a href="/notes/">notes</a> · <a href="/rss.xml">rss</a> · <a href="https://github.com/muhammedkado/mkado.dev" target="_blank" rel="noopener">source</a></span>
</footer>
</div>
${h.candidateBar(h.id, h.total)}
${h.revealScript}
${h.copyScript}
<script>
(function(){
  var clock=document.querySelector('[data-clock]');function tick(){var d=new Date();var u=new Date(d.getTime()+(d.getTimezoneOffset()+180)*60000);clock.textContent=String(u.getHours()).padStart(2,'0')+':'+String(u.getMinutes()).padStart(2,'0')}if(clock){tick();setInterval(tick,30000)}
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var cnt=document.querySelector('[data-count]');if(cnt&&!reduce){var end=+cnt.dataset.count,t0=null;function step(ts){if(!t0)t0=ts;var p=Math.min(1,(ts-t0)/1400);p=1-Math.pow(1-p,3);cnt.textContent=Math.round(end*p);if(p<1)requestAnimationFrame(step)}requestAnimationFrame(step)}
  var projs=[].slice.call(document.querySelectorAll('.proj')),layers=[].slice.call(document.querySelectorAll('.layer')),slugOut=document.querySelector('[data-panel-slug]'),dot=document.querySelector('.panel .bar .dot');
  function activate(slug){projs.forEach(function(p){p.classList.toggle('is-on',p.dataset.slug===slug)});layers.forEach(function(l){l.classList.toggle('is-on',l.dataset.layer===slug)});if(slugOut)slugOut.textContent=slug;if(dot)dot.setAttribute('data-status-dot',slug)}
  if('IntersectionObserver' in window&&matchMedia('(min-width:1024px)').matches){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)activate(e.target.dataset.slug)})},{rootMargin:'-45% 0px -45% 0px',threshold:0});projs.forEach(function(p){io.observe(p)})}
  var f=document.querySelector('form');f&&f.addEventListener('submit',function(e){e.preventDefault();var m=document.createElement('p');m.className='sent';m.textContent='Design mockup: on the built site this posts to /api/contact.';f.replaceChildren(m)});
})();
</script>
</body>
</html>`;
  },
};
