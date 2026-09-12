// 10 · Monolith — mono, hover-alive.
// Black and white only; green exists solely to mean "live". Huge names in a
// list, a preview that follows the cursor, a single inverted block that holds
// the whole CV, and an email address as the closing statement.
// Type: Familjen Grotesk for everything upright, Instrument Serif for the
// italic lines that talk.

const css = `
:root{color-scheme:light dark;
--bg:light-dark(#ffffff,#0c0c0c);--ink:light-dark(#0c0c0c,#ffffff);--ink-2:light-dark(#4a4a4a,#b5b5b5);--ink-3:light-dark(#6f6f6f,#8a8a8a);--line:light-dark(#e6e6e6,#262626);--line-2:light-dark(#0c0c0c,#ffffff);--block-bg:light-dark(#0c0c0c,#ffffff);--block-ink:light-dark(#ffffff,#0c0c0c);--block-2:light-dark(#b5b5b5,#4a4a4a);--block-line:light-dark(#2a2a2a,#dcdcdc);--live:light-dark(#16a34a,#37ff8b);--block-live:light-dark(#37ff8b,#15803d);--focus:var(--ink);
--mark-bg:light-dark(#0c0c0c,#ffffff);--mark-fg:light-dark(#ffffff,#0c0c0c);--mark-pulse:var(--ink-3);--mark-dot:var(--live);
--sans:"Familjen Grotesk",system-ui,sans-serif;--serif:"Instrument Serif",Georgia,serif;--ease:cubic-bezier(.16,1,.3,1)}
:root[data-theme="light"]{color-scheme:light}:root[data-theme="dark"]{color-scheme:dark}
html{scroll-behavior:smooth}
body{background:var(--bg);color:var(--ink);font:16px/1.5 var(--sans);padding-inline:clamp(16px,4vw,56px)}
.wrap{max-width:1360px;margin:0 auto}
.skip{position:absolute;left:16px;top:-48px;padding:10px 14px;background:var(--ink);color:var(--bg);z-index:50}.skip:focus{top:12px}
.small{font:500 12px/1 var(--sans);letter-spacing:.08em;text-transform:uppercase;color:var(--ink-3)}
.it{font-family:var(--serif);font-style:italic;font-weight:400;letter-spacing:0}
h1,h2,h3{font-weight:600;letter-spacing:-.03em;text-wrap:balance}
.dot{width:8px;height:8px;border-radius:50%;background:var(--live);flex:none;display:inline-block}
[data-state="down"]>.dot{background:#ef4444}
/* top */
.top{display:flex;align-items:center;justify-content:space-between;gap:16px;padding-block:22px}
.top .mk{font:700 22px/1 var(--sans);letter-spacing:-.05em}
.top nav{display:flex;gap:22px}
.top nav a{font:500 13px/1 var(--sans);letter-spacing:.06em;text-transform:uppercase;color:var(--ink-2);padding-block:4px;border-bottom:1px solid transparent}
.top nav a:hover{color:var(--ink);border-color:var(--ink)}
.top .status{display:inline-flex;align-items:center;gap:8px;font:500 12px/1 var(--sans);letter-spacing:.08em;text-transform:uppercase;color:var(--ink-2)}
@media (max-width:700px){.top nav{display:none}}
/* hero */
.hero{padding-block:clamp(40px,8vw,120px) clamp(32px,6vw,80px)}
.hero h1{font-size:clamp(44px,8.4vw,128px);line-height:.92;letter-spacing:-.045em}
.hero h1 .w{display:inline-block;overflow:hidden;vertical-align:bottom;padding-bottom:.06em;margin-bottom:-.06em}
.hero h1 .w>span{display:inline-block}
html.js .hero h1 .w>span{transform:translateY(110%);animation:up 1s var(--ease) forwards;animation-delay:calc(var(--i) * 45ms + 80ms)}
@keyframes up{to{transform:none}}
.hero h1 .it{font-size:1.02em;color:var(--ink-2)}
.hero .row{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:16px 32px;margin-top:clamp(24px,4vw,48px);padding-top:18px;border-top:1px solid var(--line-2)}
.hero .row p{color:var(--ink-2);max-width:60ch}
html.js .hero .row{opacity:0;animation:rise .9s var(--ease) forwards .7s}
@keyframes rise{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
.btn{display:inline-flex;align-items:center;gap:10px;padding:14px 22px;border-radius:999px;background:var(--ink);color:var(--bg);font:600 14px/1 var(--sans);letter-spacing:.02em;will-change:transform;transition:background .2s}
.btn:hover{background:var(--ink-2)}
.btn svg{width:16px;height:16px}
.btn.ghost{background:transparent;color:var(--ink);border:1px solid var(--line-2)}
.btn.ghost:hover{background:var(--ink);color:var(--bg)}
/* list */
.sec{padding-block:clamp(40px,6vw,80px)}
.sec-head{display:flex;justify-content:space-between;align-items:baseline;gap:16px;flex-wrap:wrap;margin-bottom:8px}
.sec-head h2{font-size:clamp(22px,2.4vw,32px)}
.sec-head p{color:var(--ink-3);font-size:14px}
.list{border-top:1px solid var(--line-2);position:relative}
.row-w{border-bottom:1px solid var(--line)}
.row{width:100%;display:grid;grid-template-columns:56px minmax(0,1fr) auto;gap:12px 20px;align-items:baseline;padding:clamp(14px,2vw,22px) 0;text-align:left;position:relative}
.row .n{font:500 13px/1 var(--sans);color:var(--ink-3);font-variant-numeric:tabular-nums;letter-spacing:.06em}
.row .name{font:600 clamp(28px,4.4vw,64px)/1 var(--sans);letter-spacing:-.04em;transition:transform .6s var(--ease),color .3s}
.row .meta{display:flex;gap:16px;align-items:center;font:500 12px/1 var(--sans);letter-spacing:.08em;text-transform:uppercase;color:var(--ink-3);white-space:nowrap}
.row .meta .st{display:inline-flex;align-items:center;gap:6px}
.row-w:hover .row .name,.row-w.is-open .row .name{transform:translateX(10px)}
.row-w:hover .row .name{color:var(--ink-2)}
.row:focus-visible{outline:none}.row:focus-visible .name{text-decoration:underline;text-underline-offset:8px;text-decoration-thickness:2px}
.det{display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);gap:20px 32px;padding:0 0 26px 76px}
.det[hidden]{display:none}
.det .shot{border:1px solid var(--line);overflow:hidden;aspect-ratio:1440/900;background:var(--bg)}
.det .shot img{width:100%;height:100%;object-fit:cover;object-position:top}
.det .txt{display:grid;gap:14px;align-content:start}
.det p{color:var(--ink-2);max-width:56ch}
.det .stack{font:500 12px/1.6 var(--sans);letter-spacing:.06em;text-transform:uppercase;color:var(--ink-3)}
.det .creds{display:grid;gap:4px;font:400 13px/1.6 ui-monospace,Menlo,Consolas,monospace;color:var(--ink-2)}
.det .creds b{font-family:var(--sans);font-weight:600;color:var(--ink);margin-right:6px}
.det .creds button{display:inline-flex;align-items:center;gap:4px;margin-left:6px;padding:1px 6px;border:1px solid var(--line);border-radius:4px;font:600 10.5px/1.4 var(--sans);color:var(--ink-3)}
.det .creds button:hover{color:var(--ink);border-color:var(--ink)}.det .creds button.copied{color:var(--live);border-color:var(--live)}
.det .acts{display:flex;flex-wrap:wrap;gap:8px}
.det .acts .btn{padding:11px 16px;font-size:13px}
.det .note{font-size:13px;color:var(--ink-3)}
@media (max-width:900px){.det{grid-template-columns:1fr;padding-left:0}.row{grid-template-columns:44px minmax(0,1fr)}.row .meta{grid-column:2;white-space:normal;flex-wrap:wrap;gap:8px 14px}}
.float{position:fixed;left:0;top:0;width:min(34vw,420px);aspect-ratio:1440/900;pointer-events:none;z-index:30;opacity:0;transform:translate(-50%,-50%) scale(.96);transition:opacity .35s var(--ease),transform .35s var(--ease);border:1px solid var(--line-2);background:var(--bg);overflow:hidden;box-shadow:0 30px 60px -30px rgba(0,0,0,.4)}
.float.is-on{opacity:1;transform:translate(-50%,-50%) scale(1)}
.float img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:top;opacity:0;transition:opacity .3s}
.float img.is-on{opacity:1}
.float .lbl{position:absolute;left:10px;bottom:10px;padding:5px 8px;background:var(--ink);color:var(--bg);font:600 11px/1 var(--sans);letter-spacing:.08em;text-transform:uppercase}
@media (hover:none),(max-width:900px){.float{display:none}}
/* monolith block */
.block{background:var(--block-bg);color:var(--block-ink);margin-inline:calc(-1 * clamp(16px,4vw,56px));padding-inline:clamp(16px,4vw,56px);padding-block:clamp(48px,7vw,96px)}
.block .in{max-width:1360px;margin:0 auto;display:grid;gap:clamp(32px,5vw,64px)}
.block .big{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:24px}
.block .big div{border-top:1px solid var(--block-line);padding-top:14px}
.block .big b{display:block;font:600 clamp(36px,5vw,80px)/1 var(--sans);letter-spacing:-.05em;font-variant-numeric:tabular-nums}
.block .big b i{font-family:var(--serif);font-style:italic;font-weight:400;letter-spacing:0;font-size:.55em;margin-left:.12em;color:var(--block-2)}
.block .big span{display:block;margin-top:8px;font:500 12px/1.4 var(--sans);letter-spacing:.08em;text-transform:uppercase;color:var(--block-2)}
.block .big .live b i{color:var(--block-live)}
@media (max-width:900px){.block .big{grid-template-columns:repeat(2,minmax(0,1fr))}}
.block .grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:clamp(24px,4vw,64px)}
.block h2{font:400 clamp(28px,3.4vw,48px)/1.1 var(--serif);font-style:italic;letter-spacing:0;margin-bottom:18px}
.block .xp article{display:grid;gap:6px;padding:16px 0;border-top:1px solid var(--block-line)}
.block .xp .when{font:500 12px/1 var(--sans);letter-spacing:.08em;text-transform:uppercase;color:var(--block-2)}
.block .xp .when b{color:var(--block-live);font-weight:600}
.block .xp h3{font-size:20px}
.block .xp .org{color:var(--block-2);font-size:14px}
.block .xp p{color:var(--block-2);font-size:14.5px;max-width:60ch}
.block .xp ul{display:grid;gap:4px;color:var(--block-2);font-size:14px;max-width:60ch}
.block .xp li{padding-left:14px;position:relative}.block .xp li::before{content:"–";position:absolute;left:0}
.block dl div{display:grid;grid-template-columns:96px 1fr;gap:12px;padding:12px 0;border-top:1px solid var(--block-line);font-size:14.5px}
.block dt{font:500 12px/1.7 var(--sans);letter-spacing:.08em;text-transform:uppercase;color:var(--block-2)}
.block dd{color:var(--block-ink)}
.block .more{margin-top:16px;display:inline-flex;align-items:center;gap:8px;font:600 13px/1 var(--sans);letter-spacing:.04em;border-bottom:1px solid var(--block-ink);padding-bottom:4px}
.block .more:hover{color:var(--block-2);border-color:var(--block-2)}
@media (max-width:900px){.block .grid{grid-template-columns:1fr}}
/* skills */
.sk{display:grid;gap:16px;border-top:1px solid var(--line-2);padding-top:22px}
.sk div{display:flex;flex-wrap:wrap;gap:6px 18px;align-items:baseline}
.sk .g{font:400 22px/1 var(--serif);font-style:italic;color:var(--ink-2);min-width:140px}
.sk span{font:500 clamp(17px,1.6vw,22px)/1.4 var(--sans);letter-spacing:-.02em}
.sk span sup{font:500 11px/1 var(--sans);color:var(--ink-3);margin-left:2px}
.sk span sup[title]{cursor:help}
.sk .fn{font-size:13px;color:var(--ink-3);margin-top:6px}
/* notes */
.nt{border-top:1px solid var(--line-2)}
.nt a{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:8px 24px;align-items:baseline;padding:16px 0;border-bottom:1px solid var(--line)}
.nt h3{font-size:clamp(18px,1.8vw,24px);font-weight:600}
.nt a:hover h3{color:var(--ink-2)}
.nt p{grid-column:1;color:var(--ink-2);font-size:14.5px;max-width:64ch}
.nt time{font:500 12px/1 var(--sans);letter-spacing:.08em;text-transform:uppercase;color:var(--ink-3)}
/* contact */
.contact{padding-block:clamp(48px,8vw,120px) clamp(32px,4vw,48px)}
.contact .lead{font:400 clamp(22px,2.4vw,32px)/1.3 var(--serif);font-style:italic;color:var(--ink-2);max-width:40ch}
.contact .mail{display:block;margin-top:14px;font:600 clamp(24px,5.6vw,88px)/1 var(--sans);letter-spacing:-.05em;overflow-wrap:anywhere;border-bottom:3px solid var(--line-2);padding-bottom:.1em;transition:color .3s}
.contact .mail:hover{color:var(--ink-2)}
.contact .links{display:flex;flex-wrap:wrap;gap:8px;margin-top:22px}
form{margin-top:36px;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px 24px;max-width:760px}
.field{display:grid;gap:6px}
.field.full{grid-column:1 / -1}
.field label{font:500 12px/1 var(--sans);letter-spacing:.08em;text-transform:uppercase;color:var(--ink-3)}
.field input,.field textarea{width:100%;padding:12px 0;border-bottom:1px solid var(--line-2);background:transparent;color:var(--ink);transition:border-color .2s}
.field input:focus,.field textarea:focus{outline:none;border-bottom-width:2px}
.field textarea{min-height:100px;resize:vertical}
form .btn{justify-self:start}
.fn{font-size:12.5px;color:var(--ink-3);grid-column:1 / -1}
.sent{grid-column:1 / -1;padding:12px 0;border-block:1px solid var(--live);font-size:14px}
@media (max-width:640px){form{grid-template-columns:1fr}}
footer{display:flex;flex-wrap:wrap;justify-content:space-between;gap:10px 24px;padding-block:22px 40px;border-top:1px solid var(--line);font:500 12px/1.6 var(--sans);letter-spacing:.06em;text-transform:uppercase;color:var(--ink-3)}
footer a:hover{color:var(--ink)}
html.js [data-reveal]{opacity:0;transform:translateY(12px);transition:opacity .9s var(--ease),transform .9s var(--ease);transition-delay:calc(var(--i,0) * 50ms)}
html.js [data-reveal].is-in{opacity:1;transform:none}
`;

export default {
  id: '10',
  slug: 'monolith',
  name: 'Monolith',
  concept: 'mono · hover-alive',
  file: '10-monolith.html',
  fonts: ['Familjen Grotesk:wght@400;500;600;700', 'Instrument Serif:ital@0;1'],
  axes: {
    layout: 'Huge names in a list with a preview that follows the cursor (rows expand on tap); one inverted block holds the whole CV; the email address closes the page',
    canvas: 'Black and white only; green means "live" and nothing else',
    type: 'Familjen Grotesk + Instrument Serif italic',
    motion: 'Words rise on load, magnetic button, cursor-following preview, names slide on hover',
  },
  says: 'Confident, minimal, a little cool. The kind of site a senior engineer at a design-literate company would have. Least colourful; the type has to carry it, and it does.',
  render(c, h) {
    const t = h.tenure(c.experience.startDate);
    let wi = 0;
    const seg = (s, cls = '') => s.split(' ').map((w) => `<span class="w" style="--i:${wi++}"><span class="${cls}">${h.esc(w)}</span></span>`).join(' ');
    const rows = c.demos
      .map((d, i) => `<li class="row-w" data-slug="${d.slug}">
  <button class="row" type="button" aria-expanded="false" aria-controls="d-${d.slug}" id="r-${d.slug}">
    <span class="n">${String(i + 1).padStart(2, '0')}</span>
    <span class="name">${h.esc(d.name)}</span>
    <span class="meta"><span>${h.esc(d.kind)}</span><span>${d.period}</span><span class="st">${h.statusDot(d.slug)}live</span></span>
  </button>
  <div class="det" id="d-${d.slug}" role="region" aria-labelledby="r-${d.slug}" hidden>
    <div class="shot">${h.shot(d)}</div>
    <div class="txt">
      <p>${h.esc(d.problem)}</p>
      <div class="stack">${h.esc(d.stack.join(' · '))} · ${h.esc(d.langs)}</div>
      ${d.credentials.length ? `<div class="creds">${d.credentials.map((cr) => `<div><b>${h.esc(cr.label)}</b>${h.esc(cr.user)}<button type="button" data-copy="${h.esc(cr.user)}" aria-label="Copy">${h.icon('copy')}</button> ${h.esc(cr.pass)}<button type="button" data-copy="${h.esc(cr.pass)}" aria-label="Copy">${h.icon('copy')}</button></div>`).join('')}</div>` : ''}
      <div class="acts"><a class="btn" href="${d.demoUrl ?? d.url}" target="_blank" rel="noopener">${d.demoUrl ? 'Open signed in' : 'Open the app'} ${h.icon('arrow-up-right')}</a><a class="btn ghost" href="/work/${d.slug}/">Case study</a>${d.repo ? `<a class="btn ghost" href="${d.repo}" target="_blank" rel="noopener">Source</a>` : ''}</div>
      <p class="note">${h.esc(d.note)}</p>
    </div>
  </div>
</li>`)
      .join('');

    return `${h.head({ title: 'Muhammed Kado — Monolith', description: c.profile.headline, fonts: this.fonts, light: '#ffffff', dark: '#0c0c0c', css })}
<body>
<a class="skip" href="#main">Skip to content</a>
<div class="wrap">
<header class="top">
  <a class="mk" href="#top" aria-label="Muhammed Kado">MK</a>
  <nav aria-label="Sections"><a href="#work">Work</a><a href="#facts">Facts</a><a href="#skills">Skills</a><a href="#notes">Notes</a><a href="#contact">Contact</a></nav>
  ${h.statusPill('status', 'All systems live')}
</header>
<main id="main">
<section class="hero" id="top">
  <h1>${seg('Muhammed Kado')}<br>${seg('builds the web side of RFID systems that run in thirty countries.', 'it')}</h1>
  <div class="row">
    <p>${h.esc(c.profile.role)} in İstanbul. PHP and Laravel at USTEK RFID since 2023; React and Next.js on his own time. Seven applications below, deployed and open.</p>
    <a class="btn" data-magnet href="#work">Start with the work ${h.icon('arrow-down')}</a>
  </div>
</section>

<section class="sec" id="work">
  <div class="sec-head" data-reveal><h2>Seven live applications</h2><p>Hover to preview, click to open the details. Demo data resets nightly.</p></div>
  <ol class="list" data-reveal>${rows}</ol>
  <div class="float" aria-hidden="true">${c.demos.map((d, i) => h.shot(d, `data-for="${d.slug}"${i === 0 ? ' class="is-on"' : ''}`)).join('')}<span class="lbl" data-float-lbl>${h.esc(c.demos[0].name)}</span></div>
</section>

<section class="block" id="facts">
  <div class="in">
    <div class="big" data-reveal>
      <div><b>${t.years}<i>yrs</i> ${t.months}<i>mo</i></b><span>at USTEK RFID, counting</span></div>
      <div class="live"><b>7<i>live</i></b><span>applications, all up</span></div>
      <div><b>30<i>+</i></b><span>countries running USTEK’s platform</span></div>
      <div><b>4</b><span>languages: KU · AR · TR · EN</span></div>
    </div>
    <div class="grid">
      <div data-reveal>
        <h2>Where the years went</h2>
        <div class="xp">${c.timeline.map((e) => `<article><span class="when">${e.from} – ${e.to}${e.live ? ` · <b>${t.short}</b>` : ''}</span><h3>${h.esc(e.title)}</h3><span class="org">${h.esc(e.org)} · ${h.esc(e.where)}</span><p>${h.esc(e.summary)}</p>${e.bullets.length ? `<ul>${e.bullets.map((b) => `<li>${h.esc(b)}</li>`).join('')}</ul>` : ''}</article>`).join('')}</div>
      </div>
      <div data-reveal id="how">
        <h2>How seven apps run on one free machine</h2>
        <dl>${c.proof.facts.map((f) => `<div><dt>${h.esc(f.k)}</dt><dd>${h.esc(f.v)}</dd></div>`).join('')}</dl>
        <a class="more" href="${c.proof.link}">${h.esc(c.proof.linkLabel)} ${h.icon('arrow-right')}</a>
      </div>
    </div>
  </div>
</section>

<section class="sec" id="skills">
  <div class="sec-head" data-reveal><h2>Skills</h2><p>The small number is how many projects on this page ship it.</p></div>
  <div class="sk" data-reveal>
    ${c.skills.map((g) => `<div><span class="g">${h.esc(g.group)}</span>${g.items.map((s) => `<span>${h.esc(s.name)}${s.projects.length ? `<sup title="${h.esc(s.projects.join(', '))}">${s.projects.length}</sup>` : ''}</span>`).join('')}</div>`).join('')}
    <p class="fn">Kurdish, Arabic, Turkish natively; English professionally. Five of the seven apps are right-to-left.</p>
  </div>
</section>

<section class="sec" id="notes">
  <div class="sec-head" data-reveal><h2>Notes</h2><p>What broke, and the fix.</p></div>
  <div class="nt" data-reveal>${c.notes.map((n) => `<a href="/notes/${n.slug}/"><h3>${h.esc(n.title)}</h3><time datetime="${n.date}">${h.fmtDate(n.date)}</time><p>${h.esc(n.description)}</p></a>`).join('')}</div>
</section>

<section class="contact" id="contact">
  <p class="lead" data-reveal>Hiring a full-stack engineer? ${h.esc(c.profile.availability)} Write to</p>
  <a class="mail" href="mailto:${c.profile.email}" data-reveal>${c.profile.email}</a>
  <div class="links" data-reveal><a class="btn ghost" href="${c.profile.whatsapp}" target="_blank" rel="noopener">WhatsApp</a><a class="btn ghost" href="${c.profile.linkedin}" target="_blank" rel="noopener">LinkedIn</a><a class="btn ghost" href="${c.profile.github}" target="_blank" rel="noopener">GitHub</a><a class="btn ghost" href="${c.profile.cv}">CV, PDF</a></div>
  <form action="/api/contact" method="post" data-reveal novalidate>
    <div class="field"><label for="cf-name">Name</label><input id="cf-name" name="name" type="text" autocomplete="name" required></div>
    <div class="field"><label for="cf-email">Email</label><input id="cf-email" name="email" type="email" autocomplete="email" required></div>
    <div class="field full"><label for="cf-msg">Message</label><textarea id="cf-msg" name="message" required></textarea></div>
    <button class="btn" type="submit">Send ${h.icon('arrow-right')}</button>
    <p class="fn">Turnstile-protected. Stored first, forwarded second.</p>
  </form>
</section>
</main>
<footer><span>© 2026 ${h.esc(c.profile.name)}</span><span><a href="/about-this-site">About this site</a> · <a href="/notes/">Notes</a> · <a href="/rss.xml">RSS</a> · <a href="https://github.com/muhammedkado/mkado.dev" target="_blank" rel="noopener">Source</a></span></footer>
</div>
${h.candidateBar(h.id, h.total)}
${h.revealScript}
${h.copyScript}
<script>
(function(){
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches,hover=matchMedia('(hover: hover) and (min-width: 901px)').matches;
  var rows=[].slice.call(document.querySelectorAll('.row-w')),fl=document.querySelector('.float'),imgs=[].slice.call(fl.querySelectorAll('img')),lbl=document.querySelector('[data-float-lbl]');
  var names=${JSON.stringify(Object.fromEntries(c.demos.map((d) => [d.slug, d.name])))};
  rows.forEach(function(rw){var btn=rw.querySelector('.row'),det=rw.querySelector('.det');
    btn.addEventListener('click',function(){var open=btn.getAttribute('aria-expanded')==='true';rows.forEach(function(r){r.classList.remove('is-open');r.querySelector('.row').setAttribute('aria-expanded','false');r.querySelector('.det').hidden=true});if(!open){rw.classList.add('is-open');btn.setAttribute('aria-expanded','true');det.hidden=false;fl.classList.remove('is-on')}});
    rw.addEventListener('mouseenter',function(){if(!hover||rw.classList.contains('is-open'))return;imgs.forEach(function(im){im.classList.toggle('is-on',im.dataset.for===rw.dataset.slug)});lbl.textContent=names[rw.dataset.slug];fl.classList.add('is-on')});
    rw.addEventListener('mouseleave',function(){fl.classList.remove('is-on')})});
  if(hover&&!reduce){var tx=0,ty=0,cx=0,cy=0,run=false;document.addEventListener('mousemove',function(e){tx=e.clientX;ty=e.clientY;if(!run){run=true;requestAnimationFrame(loop)}});
    function loop(){cx+=(tx-cx)*.14;cy+=(ty-cy)*.14;fl.style.transform='translate('+(cx-fl.offsetWidth/2)+'px,'+(cy-fl.offsetHeight/2)+'px) scale('+(fl.classList.contains('is-on')?1:.96)+')';fl.style.left='0';fl.style.top='0';if(Math.abs(tx-cx)>.2||Math.abs(ty-cy)>.2)requestAnimationFrame(loop);else run=false}
    var mag=document.querySelector('[data-magnet]');if(mag){mag.addEventListener('mousemove',function(e){var r=mag.getBoundingClientRect();var dx=(e.clientX-(r.left+r.width/2))/r.width,dy=(e.clientY-(r.top+r.height/2))/r.height;mag.style.transform='translate('+(dx*14)+'px,'+(dy*10)+'px)'});mag.addEventListener('mouseleave',function(){mag.style.transform=''})}}
  var f=document.querySelector('form');f&&f.addEventListener('submit',function(e){e.preventDefault();var m=document.createElement('p');m.className='sent';m.textContent='Design mockup: on the built site this posts to /api/contact.';f.replaceChildren(m)});
})();
</script>
</body>
</html>`;
  },
};
