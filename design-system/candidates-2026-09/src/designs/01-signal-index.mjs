// 01 · Signal Index — editorial, precise, warm.
// A numbered index of the seven applications, like the contents page of a
// technical journal. Screenshots stay out of the way until a row is hovered
// (a sticky preview on wide screens) or tapped (the row expands).
// Type: Fraunces (soft serif, optical sizes) for statements, Schibsted Grotesk
// for everything that is a label, a credit or a paragraph.

const css = `
:root{color-scheme:light dark;
--bg:light-dark(#f5f1ea,#0e1116);--surface:light-dark(#fbf9f4,#151920);--ink:light-dark(#1a1814,#f1ece2);--ink-2:light-dark(#5b5750,#b8b1a5);--ink-3:light-dark(#6b665e,#8e877b);--line:light-dark(#ded8cc,#262b33);--line-2:light-dark(#cbc4b6,#343a44);--accent:light-dark(#1f3fd8,#7c9bff);--accent-ink:light-dark(#ffffff,#0b0f17);--accent-soft:light-dark(#e6ebfb,#1a2340);--up:light-dark(#15803d,#4ade80);--focus:var(--accent);
--mark-bg:light-dark(#1a1814,#f1ece2);--mark-fg:light-dark(#f5f1ea,#0e1116);--mark-pulse:var(--accent);--mark-dot:var(--accent);
--display:"Fraunces",Georgia,"Times New Roman",serif;--body:"Schibsted Grotesk","Helvetica Neue",Arial,sans-serif;
--ease:cubic-bezier(.16,1,.3,1);--unit:8px;--wrap:1180px}
:root[data-theme="light"]{color-scheme:light}:root[data-theme="dark"]{color-scheme:dark}
html{scroll-behavior:smooth}
body{background:var(--bg);color:var(--ink);font:16px/1.6 var(--body);padding-inline:clamp(16px,4vw,56px);font-feature-settings:"ss01"}
.wrap{max-width:var(--wrap);margin:0 auto}
.skip{position:absolute;left:16px;top:-48px;padding:10px 14px;background:var(--ink);color:var(--bg);border-radius:6px;z-index:50}.skip:focus{top:12px}
.label{font:600 11.5px/1 var(--body);letter-spacing:.14em;text-transform:uppercase;color:var(--ink-3)}
.serif{font-family:var(--display);font-variation-settings:"SOFT" 40,"WONK" 0}
h1,h2,h3{font-family:var(--display);font-weight:400;letter-spacing:-.01em;text-wrap:balance}
em{font-style:italic;font-variation-settings:"SOFT" 100,"WONK" 1}
a{transition:color .25s var(--ease)}
/* header */
.top{display:flex;align-items:center;justify-content:space-between;gap:16px;padding-block:20px;border-bottom:1px solid var(--line)}
.brand{display:flex;align-items:center;gap:12px;font-weight:600;letter-spacing:-.01em}
.brand small{display:block;font-weight:400;color:var(--ink-3);font-size:12.5px;letter-spacing:.02em}
.nav{display:flex;gap:4px}
.nav a{padding:8px 12px;border-radius:999px;font-size:14px;color:var(--ink-2)}
.nav a:hover{color:var(--ink);background:var(--surface)}
.pill{display:inline-flex;align-items:center;gap:8px;padding:7px 12px 7px 9px;border:1px solid var(--line);border-radius:999px;font-size:12.5px;color:var(--ink-2);background:var(--surface);white-space:nowrap}
.pill .dot,.dot{width:8px;height:8px;border-radius:50%;background:var(--up);box-shadow:0 0 0 0 color-mix(in srgb,var(--up) 45%,transparent);animation:ping 2.4s var(--ease) infinite}
[data-state="down"] .dot,.dot[data-state="down"]{background:#dc2626;animation:none}
@keyframes ping{0%{box-shadow:0 0 0 0 color-mix(in srgb,var(--up) 45%,transparent)}70%{box-shadow:0 0 0 7px transparent}100%{box-shadow:0 0 0 0 transparent}}
@media (max-width:900px){.nav{display:none}.pill span:last-child{display:none}.pill{padding:8px}}
/* hero */
.hero{display:grid;grid-template-columns:minmax(0,7fr) minmax(0,4fr);gap:clamp(24px,5vw,80px);align-items:end;padding-block:clamp(56px,9vw,120px) clamp(40px,6vw,80px)}
.hero h1{font-size:clamp(40px,6.4vw,88px);line-height:.98;font-variation-settings:"opsz" 144,"SOFT" 40;margin-top:20px}
.hero h1 .w{display:inline-block;overflow:hidden;vertical-align:bottom;padding-bottom:.08em;margin-bottom:-.08em}
.hero h1 .w>span{display:inline-block}
html.js .hero h1 .w>span{transform:translateY(105%);animation:up 1.1s var(--ease) forwards;animation-delay:calc(var(--i) * 55ms + 120ms)}
@keyframes up{to{transform:none}}
.hero .lede{margin-top:28px;font-size:clamp(17px,1.5vw,20px);line-height:1.5;color:var(--ink-2);max-width:56ch}
.hero .lede,.hero .cta,.masthead{opacity:0;transform:translateY(12px)}
html.js .hero .lede,html.js .hero .cta,html.js .masthead{animation:rise .9s var(--ease) forwards}
html:not(.js) .hero .lede,html:not(.js) .hero .cta,html:not(.js) .masthead{opacity:1;transform:none}
html.js .hero .lede{animation-delay:.55s}html.js .hero .cta{animation-delay:.7s}html.js .masthead{animation-delay:.8s}
@keyframes rise{to{opacity:1;transform:none}}
.cta{display:flex;flex-wrap:wrap;gap:12px;margin-top:32px}
.btn{display:inline-flex;align-items:center;gap:10px;padding:13px 20px;border-radius:999px;font-weight:600;font-size:15px;border:1px solid var(--line-2);color:var(--ink);transition:transform .35s var(--ease),background .25s,border-color .25s,color .25s}
.btn:hover{transform:translateY(-2px);border-color:var(--ink)}
.btn:active{transform:translateY(0)}
.btn.primary{background:var(--ink);color:var(--bg);border-color:var(--ink)}
.btn.primary:hover{background:var(--accent);border-color:var(--accent);color:var(--accent-ink)}
.btn svg{width:16px;height:16px;transition:transform .35s var(--ease)}
.btn:hover svg{transform:translate(2px,-2px)}
.btn.down:hover svg{transform:translateY(3px)}
.masthead{border-top:1px solid var(--ink);padding-top:16px;display:grid;gap:0}
.masthead div{display:grid;grid-template-columns:110px 1fr;gap:12px;padding:11px 0;border-bottom:1px solid var(--line);font-size:14.5px;align-items:baseline}
.masthead b{font-weight:600;font-variant-numeric:tabular-nums}
.masthead .big{font:400 30px/1 var(--display);font-variation-settings:"opsz" 48}
.masthead .big small{font:500 12px/1 var(--body);color:var(--ink-3);margin-left:6px;letter-spacing:.04em}
@media (max-width:900px){.hero{grid-template-columns:1fr}.masthead{max-width:520px}}
/* section head */
.sec{padding-block:clamp(48px,7vw,96px);border-top:1px solid var(--line)}
.sec-head{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,2fr);gap:24px;align-items:end;margin-bottom:clamp(28px,4vw,48px)}
.sec-head h2{font-size:clamp(28px,3.6vw,46px);line-height:1.05;font-variation-settings:"opsz" 96,"SOFT" 40}
.sec-head p{color:var(--ink-2);max-width:60ch}
@media (max-width:760px){.sec-head{grid-template-columns:1fr}}
/* index */
.index{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,42%);gap:clamp(24px,4vw,64px);align-items:start}
.rows{border-top:1px solid var(--ink)}
.row{border-bottom:1px solid var(--line)}
.row-btn{width:100%;display:grid;grid-template-columns:44px minmax(0,1fr) auto;grid-template-areas:"num name meta";align-items:baseline;gap:6px 16px;padding:18px 0;text-align:left;position:relative;transition:color .2s}
.row-btn .num{font:500 13px/1 var(--body);color:var(--ink-3);font-variant-numeric:tabular-nums;letter-spacing:.06em}
.row-btn .name{font:400 clamp(22px,2.4vw,30px)/1.1 var(--display);font-variation-settings:"opsz" 48,"SOFT" 40;grid-area:name;transition:transform .5s var(--ease)}
.row-btn .meta{grid-area:meta;display:flex;gap:14px;align-items:center;font-size:13px;color:var(--ink-3);white-space:nowrap}
.row-btn .meta .kind{color:var(--ink-2)}
.row-btn .meta .st{display:inline-flex;align-items:center;gap:6px}
.row-btn .chev{width:18px;height:18px;transition:transform .4s var(--ease)}
.row-btn[aria-expanded="true"] .chev{transform:rotate(180deg)}
.row-btn::after{content:"";position:absolute;left:0;bottom:-1px;height:1px;width:100%;background:var(--ink);transform:scaleX(0);transform-origin:left;transition:transform .55s var(--ease)}
.row:hover .row-btn::after,.row.is-on .row-btn::after,.row-btn:focus-visible::after{transform:scaleX(1)}
.row:hover .row-btn .name,.row.is-on .row-btn .name{transform:translateX(6px)}
.row-btn:focus-visible{outline:none}.row-btn:focus-visible .name{text-decoration:underline;text-decoration-thickness:1px;text-underline-offset:6px}
.panel{display:grid;grid-template-columns:minmax(0,1fr);gap:18px;padding:4px 0 26px 60px}
.panel[hidden]{display:none}
.panel .shotwrap{display:none}
.panel p{color:var(--ink-2);max-width:62ch}
.panel .stack{display:flex;flex-wrap:wrap;gap:6px}
.panel .stack span{font-size:12.5px;padding:4px 9px;border:1px solid var(--line-2);border-radius:999px;color:var(--ink-2)}
.creds{display:grid;gap:6px;font-size:13.5px}
.cred{display:flex;flex-wrap:wrap;align-items:center;gap:8px 14px;color:var(--ink-2)}
.cred b{color:var(--ink);font-weight:600;min-width:110px}
.cred code{font-size:12.5px;padding:2px 6px;border-radius:4px;background:var(--surface);border:1px solid var(--line);color:var(--ink)}
.copy{display:inline-flex;align-items:center;gap:6px;padding:4px 8px;border-radius:6px;font-size:12px;font-weight:600;color:var(--ink-2);border:1px solid var(--line-2)}
.copy:hover{color:var(--ink);border-color:var(--ink)}.copy.copied{color:var(--up);border-color:var(--up)}
.panel .acts{display:flex;flex-wrap:wrap;gap:10px}
.panel .acts .btn{padding:10px 16px;font-size:14px}
.panel .note{font-size:13px;color:var(--ink-3)}
@media (max-width:1023px){.index{grid-template-columns:1fr}.preview{display:none}.panel{padding-left:0}.panel .shotwrap{display:block;border:1px solid var(--line);border-radius:8px;overflow:hidden;background:var(--surface)}.row-btn{grid-template-columns:44px minmax(0,1fr);grid-template-areas:"num name" "num meta"}.row-btn .meta{white-space:normal;flex-wrap:wrap;gap:8px 12px}}
.preview{position:sticky;top:24px}
.preview .frame{position:relative;aspect-ratio:1440/900;border:1px solid var(--line);border-radius:10px;overflow:hidden;background:var(--surface);box-shadow:0 30px 60px -30px rgba(20,16,8,.35)}
.preview img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:top;clip-path:inset(0 0 100% 0);transition:clip-path .8s var(--ease);will-change:clip-path}
.preview img.is-on{clip-path:inset(0 0 0 0);z-index:1}
.preview .cap{display:grid;grid-template-columns:auto 1fr;gap:12px;align-items:baseline;padding-top:14px;font-size:14px;color:var(--ink-2)}
.preview .cap b{font:500 13px/1 var(--body);color:var(--ink-3);letter-spacing:.06em;font-variant-numeric:tabular-nums}
.preview .cap span{transition:opacity .4s var(--ease)}
/* generated media: a paper plate behind the hero; key visuals in the preview, the screenshot once a row is opened */
.hero.has-plate{--plate-o:.45;--plate-o-dark:.35}
.preview.has-kv img.kv{object-position:center}
.preview.has-kv img.shot{clip-path:inset(0 0 100% 0);z-index:0}
.preview.has-kv.show-shot img.shot.is-on{clip-path:inset(0 0 0 0);z-index:2}
.preview.has-kv.show-shot img.kv{clip-path:inset(0 0 100% 0)}
.preview .hint{display:none}.preview.has-kv .hint{display:block;margin-top:6px;font-size:12.5px;color:var(--ink-3)}
/* how it runs */
.how{display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);gap:clamp(24px,5vw,80px)}
.how h2{font-size:clamp(28px,3.6vw,46px);line-height:1.05;font-variation-settings:"opsz" 96}
.how .lead{margin-top:18px;color:var(--ink-2);font-size:17px}
.facts{border-top:1px solid var(--ink)}
.facts div{display:grid;grid-template-columns:100px 1fr;gap:16px;padding:14px 0;border-bottom:1px solid var(--line);font-size:15px}
.facts dt{color:var(--ink-3);font-weight:600;font-size:12px;letter-spacing:.1em;text-transform:uppercase;padding-top:4px}
.facts dd{color:var(--ink-2)}
.how .more{margin-top:22px}
@media (max-width:760px){.how{grid-template-columns:1fr}}
/* experience */
.tl{border-top:1px solid var(--ink)}
.tl article{display:grid;grid-template-columns:150px minmax(0,1fr);gap:16px 24px;padding:26px 0;border-bottom:1px solid var(--line)}
.tl .when{font:500 13px/1.6 var(--body);color:var(--ink-3);letter-spacing:.06em;font-variant-numeric:tabular-nums}
.tl .when b{display:block;font:400 26px/1 var(--display);color:var(--ink);letter-spacing:0;margin-top:6px;font-variation-settings:"opsz" 48}
.tl .when small{display:block;font-size:11px;letter-spacing:.12em;text-transform:uppercase;margin-top:6px;color:var(--accent)}
.tl h3{font-size:clamp(21px,2.2vw,26px);line-height:1.15;font-variation-settings:"opsz" 48,"SOFT" 40}
.tl .org{color:var(--ink-2);margin-top:4px;font-size:15px}
.tl .org a{text-decoration:underline;text-underline-offset:4px;text-decoration-color:var(--line-2)}.tl .org a:hover{text-decoration-color:var(--ink)}
.tl p{margin-top:12px;color:var(--ink-2);max-width:66ch}
.tl ul{margin-top:12px;display:grid;gap:8px;max-width:66ch;color:var(--ink-2);font-size:15px}
.tl li{padding-left:18px;position:relative}.tl li::before{content:"";position:absolute;left:0;top:.7em;width:8px;height:1px;background:var(--ink-3)}
@media (max-width:640px){.tl article{grid-template-columns:1fr}}
/* skills */
.skills{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr));gap:28px 32px}
.skills h3{font:600 12px/1 var(--body);letter-spacing:.14em;text-transform:uppercase;color:var(--ink-3);padding-bottom:10px;border-bottom:1px solid var(--line);margin-bottom:12px}
.skills li{display:flex;justify-content:space-between;gap:12px;padding:7px 0;font-size:15.5px;border-bottom:1px dotted var(--line)}
.skills li b{font:400 13px/1.4 var(--display);color:var(--accent);font-variant-numeric:tabular-nums;font-variation-settings:"opsz" 14}
.skills li b[title]{cursor:help;border-bottom:1px dotted var(--accent)}
.skills .hint{margin-top:22px;color:var(--ink-3);font-size:13.5px;max-width:60ch}
/* notes */
.notes{border-top:1px solid var(--ink)}
.notes a{display:grid;grid-template-columns:120px minmax(0,1fr) 24px;gap:16px 24px;padding:22px 0;border-bottom:1px solid var(--line);align-items:baseline}
.notes time{font:500 13px/1.6 var(--body);color:var(--ink-3);letter-spacing:.04em;font-variant-numeric:tabular-nums}
.notes h3{font-size:clamp(20px,2vw,24px);line-height:1.2;font-variation-settings:"opsz" 48,"SOFT" 40;transition:color .25s}
.notes a:hover h3{color:var(--accent)}
.notes p{margin-top:6px;color:var(--ink-2);font-size:15px;max-width:66ch}
.notes .tags{margin-top:8px;display:flex;gap:6px;flex-wrap:wrap}.notes .tags span{font-size:12px;color:var(--ink-3)}
.notes svg{width:18px;height:18px;color:var(--ink-3);transition:transform .35s var(--ease)}.notes a:hover svg{transform:translate(3px,-3px);color:var(--accent)}
@media (max-width:640px){.notes a{grid-template-columns:1fr}.notes svg{display:none}}
/* contact */
.contact{display:grid;grid-template-columns:minmax(0,5fr) minmax(0,6fr);gap:clamp(24px,5vw,80px)}
.contact h2{font-size:clamp(34px,4.6vw,64px);line-height:1;font-variation-settings:"opsz" 144,"SOFT" 40}
.contact .lead{margin-top:18px;color:var(--ink-2);font-size:17px;max-width:46ch}
.links{margin-top:28px;display:grid;gap:2px}
.links a{display:flex;align-items:center;gap:12px;padding:12px 0;border-bottom:1px solid var(--line);font-size:15px}
.links a svg{width:18px;height:18px;color:var(--ink-3)}.links a:hover{color:var(--accent)}
.links a span:last-child{margin-left:auto;color:var(--ink-3);font-size:13px}
form{display:grid;gap:16px}
.field{display:grid;gap:6px}
.field label{font:600 12px/1 var(--body);letter-spacing:.1em;text-transform:uppercase;color:var(--ink-3)}
.field input,.field textarea{width:100%;padding:12px 14px;border:1px solid var(--line-2);border-radius:8px;background:var(--surface);color:var(--ink);transition:border-color .25s,box-shadow .25s}
.field input:focus,.field textarea:focus{outline:none;border-color:var(--accent);box-shadow:0 0 0 3px var(--accent-soft)}
.field textarea{min-height:140px;resize:vertical}
form .btn{justify-self:start}
.form-note{font-size:13px;color:var(--ink-3)}
.sent{padding:14px 16px;border:1px solid var(--up);border-radius:8px;color:var(--ink);font-size:14.5px}
@media (max-width:760px){.contact{grid-template-columns:1fr}}
/* footer */
footer{display:flex;flex-wrap:wrap;justify-content:space-between;gap:12px 24px;padding-block:28px 40px;border-top:1px solid var(--line);font-size:13.5px;color:var(--ink-3)}
footer a:hover{color:var(--ink)}
/* reveals */
html.js [data-reveal]{opacity:0;transform:translateY(16px);transition:opacity .9s var(--ease),transform .9s var(--ease);transition-delay:calc(var(--i,0) * 70ms)}
html.js [data-reveal].is-in{opacity:1;transform:none}
`;

export default {
  id: '01',
  slug: 'signal-index',
  name: 'Signal Index',
  concept: 'editorial · precise · warm',
  file: '01-signal-index.html',
  fonts: ['Fraunces:ital,opsz,wght,SOFT,WONK@0,9..144,300..700,0..100,0..1;1,9..144,300..700,0..100,0..1', 'Schibsted Grotesk:wght@400;500;600;700'],
  axes: {
    layout: 'Numbered index of the seven apps; hover previews in a sticky panel on wide screens, rows expand on tap',
    canvas: 'Warm paper / ink night, cobalt as the only colour',
    type: 'Fraunces (soft serif, optical sizes) + Schibsted Grotesk',
    motion: 'Headline words rise in sequence, row rules draw on hover, clip-reveal previews',
  },
  says: 'You read like a considered engineer who writes things down: calm, precise, no gimmicks. The most résumé-like of the ten while still having a voice.',
  render(c, h) {
    const t = h.tenure(c.experience.startDate);
    let wi = 0;
    const seg = (s, italic) => s.split(' ').map((w) => `<span class="w" style="--i:${wi++}"><span>${italic ? `<em>${h.esc(w)}</em>` : h.esc(w)}</span></span>`).join(' ');
    const headline = `${seg('I build the web side of')} ${seg('RFID systems', true)} ${seg('that run in 30+ countries.')}`;

    const rows = c.demos
      .map((d, i) => {
        const n = String(i + 1).padStart(2, '0');
        return `<li class="row${i === 0 ? ' is-on' : ''}" data-slug="${d.slug}">
  <button class="row-btn" type="button" aria-expanded="false" aria-controls="p-${d.slug}" id="r-${d.slug}">
    <span class="num">${n}</span>
    <span class="name">${h.esc(d.name)}</span>
    <span class="meta"><span class="kind">${h.esc(d.kind)}</span><span>${d.period}</span><span class="st">${h.statusDot(d.slug)}<span class="sr-only">up</span></span>${h.icon('arrow-down', 'chev')}</span>
  </button>
  <div class="panel" id="p-${d.slug}" role="region" aria-labelledby="r-${d.slug}" hidden>
    <div class="shotwrap">${h.shot(d)}</div>
    <p>${h.esc(d.summary)}</p>
    <div class="stack">${d.stack.map((s) => `<span>${h.esc(s)}</span>`).join('')}</div>
    ${d.credentials.length ? `<div class="creds">${d.credentials.map((cr) => `<div class="cred"><b>${h.esc(cr.label)}</b><code>${h.esc(cr.user)}</code><button class="copy" type="button" data-copy="${h.esc(cr.user)}" aria-label="Copy">${h.icon('copy')}user</button><code>${h.esc(cr.pass)}</code><button class="copy" type="button" data-copy="${h.esc(cr.pass)}" aria-label="Copy">${h.icon('copy')}pass</button></div>`).join('')}</div>` : ''}
    <div class="acts">
      <a class="btn primary" href="${d.demoUrl ?? d.url}" target="_blank" rel="noopener">${d.demoUrl ? 'Open signed in' : 'Open the app'} ${h.icon('arrow-up-right')}</a>
      <a class="btn" href="/work/${d.slug}/">Case study ${h.icon('arrow-right')}</a>
      ${d.repo ? `<a class="btn" href="${d.repo}" target="_blank" rel="noopener">Source ${h.icon('github')}</a>` : ''}
    </div>
    <p class="note">${h.esc(d.note)}</p>
  </div>
</li>`;
      })
      .join('\n');

    return `${h.head({ title: 'Muhammed Kado — Signal Index', description: c.profile.headline, fonts: this.fonts, light: '#f5f1ea', dark: '#0e1116', css })}
<body>
<a class="skip" href="#main">Skip to content</a>
<div class="wrap">
<header class="top">
  <a class="brand" href="#top">${h.mark({ size: 34, font: 'Schibsted Grotesk, system-ui, sans-serif' })}<span>${h.esc(c.profile.name)}<small>${h.esc(c.profile.role)} · ${h.esc(c.profile.location)}</small></span></a>
  <nav class="nav" aria-label="Sections">${c.nav.map((n) => `<a href="${n.href}">${n.label}</a>`).join('')}</nav>
  ${h.statusPill('pill')}
</header>

<main id="main">
<section class="hero${h.plateClass('plate-signal-index')}" id="top">
  <div>
    <p class="label">${h.esc(c.profile.title)} · ${h.esc(c.profile.role)} · ${h.esc(c.profile.tz)}</p>
    <h1>${headline}</h1>
    <p class="lede">${h.esc(c.profile.plain)} Since 2023 that has meant a laundry-management platform for commercial laundries, hotels and hospitals. The seven applications below are deployed and yours to try.</p>
    <div class="cta">
      <a class="btn primary down" href="#work">See the live work ${h.icon('arrow-down')}</a>
      <a class="btn" href="${c.profile.cv}">Download CV ${h.icon('download')}</a>
      <a class="btn" href="${c.profile.github}" target="_blank" rel="noopener">GitHub ${h.icon('arrow-up-right')}</a>
    </div>
  </div>
  <dl class="masthead" aria-label="At a glance">
    <div><dt class="label">At USTEK</dt><dd class="big"><b>${t.years}</b><small>yrs</small> <b>${t.months}</b><small>mo</small></dd></div>
    <div><dt class="label">Live apps</dt><dd><b>7</b> · all systems up</dd></div>
    <div><dt class="label">Ships in</dt><dd>30+ countries via USTEK RFID</dd></div>
    <div><dt class="label">Languages</dt><dd>Kurdish · Arabic · Turkish · English</dd></div>
    <div><dt class="label">Open to</dt><dd>Full-time, remote or İstanbul · freelance</dd></div>
  </dl>
  ${h.plate('plate-signal-index')}
</section>

<section class="sec" id="work">
  <div class="sec-head" data-reveal>
    <h2>Index of live work</h2>
    <p>Seven applications you can open right now. Each row has a signed-in demo, its credentials as a fallback, and a case study of the problem it solves. Data resets every night.</p>
  </div>
  <div class="index">
    <ol class="rows" data-reveal>${rows}</ol>
    <aside class="preview${c.demos.every((d) => h.hasMedia(d.visual)) ? ' has-kv' : ''}" aria-hidden="true">
      <div class="frame">${c.demos.map((d, i) => h.keyVisual(d, `class="kv${i === 0 ? ' is-on' : ''}" data-for="${d.slug}"`, { fallback: false }) + h.shot(d, `class="shot${i === 0 ? ' is-on' : ''}" data-for="${d.slug}"`)).join('')}</div>
      <div class="cap"><b data-cap-num>01</b><span data-cap-text>${h.esc(c.demos[0].problem)}</span></div>
      <p class="hint">Open a row to see the live screenshot.</p>
    </aside>
  </div>
</section>

<section class="sec" id="how">
  <div class="how">
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
  <div class="sec-head" data-reveal><h2>Experience</h2><p>From a computer-engineering degree to production systems used in more than thirty countries.</p></div>
  <div class="tl">
    ${c.timeline.map((e) => `<article data-reveal>
      <div class="when">${e.from} — ${e.to}${e.live ? `<b>${t.short}</b><small>and counting</small>` : ''}</div>
      <div><h3>${h.esc(e.title)}</h3><p class="org">${e.org === c.experience.company ? `<a href="${c.experience.url}" target="_blank" rel="noopener">${h.esc(e.org)}</a>` : h.esc(e.org)} · ${h.esc(e.where)}</p><p>${h.esc(e.summary)}</p>${e.bullets.length ? `<ul>${e.bullets.map((b) => `<li>${h.esc(b)}</li>`).join('')}</ul>` : ''}</div>
    </article>`).join('')}
  </div>
</section>

<section class="sec" id="skills">
  <div class="sec-head" data-reveal><h2>Skills, with evidence</h2><p>The number next to a skill is how many of the projects on this page ship it. Hover it to see which.</p></div>
  <div class="skills">
    ${c.skills.map((g) => `<div data-reveal><h3>${h.esc(g.group)}</h3><ul>${g.items.map((s) => `<li><span>${h.esc(s.name)}</span>${s.projects.length ? `<b title="${h.esc(s.projects.join(', '))}">${s.projects.length}</b>` : ''}</li>`).join('')}</ul></div>`).join('')}
  </div>
  <p class="hint">Native Kurdish, Arabic and Turkish; professional English. Every app above ships in at least two languages, five of them right-to-left.</p>
</section>

<section class="sec" id="notes">
  <div class="sec-head" data-reveal><h2>Notes</h2><p>Short write-ups of things that broke, and what fixed them.</p></div>
  <div class="notes" data-reveal>
    ${c.notes.map((n) => `<a href="/notes/${n.slug}/"><time datetime="${n.date}">${h.fmtDate(n.date)}</time><div><h3>${h.esc(n.title)}</h3><p>${h.esc(n.description)}</p><div class="tags">${n.tags.map((tg) => `<span>#${tg}</span>`).join('')}</div></div>${h.icon('arrow-up-right')}</a>`).join('')}
  </div>
</section>

<section class="sec" id="contact">
  <div class="contact">
    <div data-reveal>
      <p class="label">Contact</p>
      <h2>Hiring a full-stack engineer?</h2>
      <p class="lead">${h.esc(c.profile.availability)} A message here reaches me directly; I reply within a day.</p>
      <div class="links">
        <a href="mailto:${c.profile.email}">${h.icon('mail')}<span>${c.profile.email}</span><span>Email</span></a>
        <a href="${c.profile.whatsapp}" target="_blank" rel="noopener">${h.icon('whatsapp')}<span>${c.profile.phone}</span><span>WhatsApp</span></a>
        <a href="${c.profile.linkedin}" target="_blank" rel="noopener">${h.icon('linkedin')}<span>linkedin.com/in/muhammed-kado</span><span>LinkedIn</span></a>
        <a href="${c.profile.cv}">${h.icon('file')}<span>Curriculum vitae, PDF</span><span>Download</span></a>
      </div>
    </div>
    <form action="/api/contact" method="post" data-reveal novalidate>
      <div class="field"><label for="cf-name">Your name</label><input id="cf-name" name="name" type="text" autocomplete="name" required></div>
      <div class="field"><label for="cf-email">Email</label><input id="cf-email" name="email" type="email" autocomplete="email" required></div>
      <div class="field"><label for="cf-msg">Message</label><textarea id="cf-msg" name="message" required placeholder="What are you building, and where would I fit?"></textarea></div>
      <button class="btn primary" type="submit">Send message ${h.icon('arrow-right')}</button>
      <p class="form-note">Protected by Cloudflare Turnstile. Stored first, then forwarded, so nothing gets lost.</p>
    </form>
  </div>
</section>
</main>

<footer>
  <span>© 2026 ${h.esc(c.profile.name)} · İstanbul</span>
  <span><a href="/about-this-site">About this site</a> · <a href="/notes/">Notes</a> · <a href="/rss.xml">RSS</a> · <a href="https://github.com/muhammedkado/mkado.dev" target="_blank" rel="noopener">Source</a></span>
</footer>
</div>
${h.candidateBar(h.id, h.total)}
${h.revealScript}
${h.copyScript}
<script>
(function(){
  var rows=[].slice.call(document.querySelectorAll('.row'));var imgs=[].slice.call(document.querySelectorAll('.preview img'));
  var capN=document.querySelector('[data-cap-num]'),capT=document.querySelector('[data-cap-text]'),pv=document.querySelector('.preview');
  var problems=${JSON.stringify(Object.fromEntries(c.demos.map((d) => [d.slug, d.problem])))};
  function show(row){var s=row.dataset.slug;rows.forEach(function(r){r.classList.toggle('is-on',r===row)});imgs.forEach(function(im){im.classList.toggle('is-on',im.dataset.for===s)});
    if(capN){capN.textContent=String(rows.indexOf(row)+1).padStart(2,'0')}if(capT){capT.style.opacity=0;setTimeout(function(){capT.textContent=problems[s];capT.style.opacity=1},160)}}
  rows.forEach(function(row){var btn=row.querySelector('.row-btn'),panel=row.querySelector('.panel');
    row.addEventListener('mouseenter',function(){show(row)});btn.addEventListener('focus',function(){show(row)});
    btn.addEventListener('click',function(){var open=btn.getAttribute('aria-expanded')==='true';
      rows.forEach(function(r){r.querySelector('.row-btn').setAttribute('aria-expanded','false');r.querySelector('.panel').hidden=true});
      if(!open){btn.setAttribute('aria-expanded','true');panel.hidden=false;show(row)}if(pv)pv.classList.toggle('show-shot',!open)})});
  var f=document.querySelector('form');f&&f.addEventListener('submit',function(e){e.preventDefault();var m=document.createElement('p');m.className='sent';m.textContent='Design mockup: on the built site this posts to /api/contact, stores the message and notifies me.';f.replaceChildren(m)});
})();
</script>
</body>
</html>`;
  },
};
