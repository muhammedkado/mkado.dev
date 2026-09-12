// 06 · Chapters — one project per screen.
// A cover with a contents list, then seven full-height chapters, each owning
// one accent colour, then a colophon with everything else. Scroll snapping is
// CSS-only (proximity), never JavaScript, so the page stays scrollable like
// any other. Type: Anybody (wide) for numbers and titles, Public Sans for text.

const css = `
:root{color-scheme:light dark;
--bg:light-dark(#f2f2f2,#141414);--surface:light-dark(#ffffff,#1c1c1c);--ink:light-dark(#161616,#f0f0f0);--ink-2:light-dark(#4b4b4b,#b9b9b9);--ink-3:light-dark(#6b6b6b,#8f8f8f);--line:light-dark(#d6d6d6,#2a2a2a);--line-2:light-dark(#161616,#f0f0f0);--up:light-dark(#15803d,#4ade80);--focus:var(--ink);
--a-pos:light-dark(#b45309,#f59e0b);--a-besttrend:light-dark(#0e7490,#22d3ee);--a-besttrend-api:light-dark(#0f766e,#2dd4bf);--a-invoice:light-dark(#7c3aed,#a78bfa);--a-findjob:light-dark(#be185d,#f472b6);--a-tireshop:light-dark(#b91c1c,#f87171);--a-timezone:light-dark(#1d4ed8,#60a5fa);
--mark-bg:light-dark(#161616,#f0f0f0);--mark-fg:light-dark(#f2f2f2,#141414);--mark-pulse:light-dark(#6b6b6b,#8f8f8f);--mark-dot:var(--up);
--display:"Anybody",system-ui,sans-serif;--body:"Public Sans",system-ui,sans-serif;--ease:cubic-bezier(.2,.8,.2,1)}
:root[data-theme="light"]{color-scheme:light}:root[data-theme="dark"]{color-scheme:dark}
html{scroll-snap-type:y proximity;scroll-behavior:smooth}
body{background:var(--bg);color:var(--ink);font:15.5px/1.55 var(--body);padding-inline:clamp(16px,4vw,64px)}
.skip{position:absolute;left:16px;top:-48px;padding:10px 14px;background:var(--ink);color:var(--bg);z-index:50}.skip:focus{top:12px}
.label{font:600 11.5px/1 var(--body);letter-spacing:.14em;text-transform:uppercase;color:var(--ink-3)}
h1,h2,h3{font-family:var(--display);font-weight:800;letter-spacing:-.02em;text-wrap:balance;font-variation-settings:"wdth" 125}
.wide{font-variation-settings:"wdth" 150}
/* side indicator */
.side{position:fixed;right:18px;top:50%;transform:translateY(-50%);display:grid;gap:10px;z-index:20}
.side a{display:flex;align-items:center;gap:8px;justify-content:flex-end;color:var(--ink-3);font:600 10.5px/1 var(--body);letter-spacing:.1em;text-transform:uppercase}
.side a i{width:8px;height:8px;border-radius:50%;border:1.5px solid currentColor;transition:transform .3s var(--ease),background .2s}
.side a span{opacity:0;transform:translateX(6px);transition:opacity .3s,transform .3s var(--ease)}
.side a:hover span,.side a[aria-current] span{opacity:1;transform:none}
.side a[aria-current]{color:var(--ch,var(--ink))}.side a[aria-current] i{background:currentColor;transform:scale(1.3)}
@media (max-width:1100px){.side{display:none}}
/* cover */
.cover{min-height:100svh;display:grid;grid-template-rows:auto 1fr auto;scroll-snap-align:start;padding-block:16px 20px}
.top{display:flex;align-items:center;justify-content:space-between;gap:16px}
.brand{display:flex;align-items:center;gap:10px;font:700 14px/1.2 var(--display)}
.pill{display:inline-flex;align-items:center;gap:8px;padding:7px 12px;border:1px solid var(--line);border-radius:999px;font-size:12.5px;font-weight:600;color:var(--ink-2)}
.dot{width:8px;height:8px;border-radius:50%;background:var(--up);flex:none}
[data-state="down"]>.dot{background:#ef4444}
.cover .mid{display:grid;grid-template-columns:minmax(0,7fr) minmax(0,5fr);gap:clamp(24px,4vw,64px);align-content:center;padding-block:clamp(24px,4vw,48px)}
.cover h1{font-size:clamp(46px,9vw,140px);line-height:.88;letter-spacing:-.05em;text-transform:uppercase}
.cover h1 .thin{font-weight:600;font-variation-settings:"wdth" 100;color:var(--ink-3)}
.cover .claim{margin-top:22px;font-size:clamp(17px,1.6vw,21px);max-width:44ch;color:var(--ink-2)}
.cover .cta{display:flex;flex-wrap:wrap;gap:8px;margin-top:22px}
.btn{display:inline-flex;align-items:center;gap:8px;padding:11px 16px;border:1px solid var(--line-2);font-weight:600;font-size:14px;transition:background .2s,color .2s,transform .3s var(--ease)}
.btn:hover{background:var(--ink);color:var(--bg);transform:translateY(-2px)}
.btn.fill{background:var(--ink);color:var(--bg)}
.btn.fill:hover{background:var(--ch,var(--ink));border-color:var(--ch,var(--ink));color:#fff}
.btn svg{width:15px;height:15px}
.toc{border-top:2px solid var(--line-2);align-self:end}
.toc .label{padding:12px 0 6px}
.toc a{display:grid;grid-template-columns:34px 1fr auto;gap:12px;align-items:baseline;padding:10px 0;border-bottom:1px solid var(--line);font:700 clamp(15px,1.3vw,18px)/1.2 var(--display);letter-spacing:-.01em;transition:padding-left .3s var(--ease)}
.toc a:hover{padding-left:6px;color:var(--ch)}
.toc a i{width:22px;height:8px;background:var(--ch);display:inline-block;justify-self:start;transform:translateY(-2px)}
.toc a small{font:500 12px/1.4 var(--body);color:var(--ink-3)}
.cover .foot{display:flex;flex-wrap:wrap;justify-content:space-between;gap:8px 24px;font-size:13px;color:var(--ink-3);padding-top:14px;border-top:1px solid var(--line)}
.cover .foot b{color:var(--ink)}
html.js .cover h1,html.js .cover .claim,html.js .cover .cta,html.js .toc{opacity:0;animation:rise .9s var(--ease) forwards}
html.js .cover .claim{animation-delay:.15s}html.js .cover .cta{animation-delay:.25s}html.js .toc{animation-delay:.35s}
@keyframes rise{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
@media (max-width:900px){.cover .mid{grid-template-columns:1fr}.cover{min-height:auto}}
/* chapters */
.ch{--ch:var(--ink);min-height:100svh;scroll-snap-align:start;display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);grid-template-areas:"head media" "body media";gap:clamp(16px,3vw,40px) clamp(20px,4vw,64px);align-content:center;padding-block:clamp(48px,6vw,80px);border-top:1px solid var(--line);position:relative}
.ch:nth-of-type(even){grid-template-columns:minmax(0,7fr) minmax(0,5fr);grid-template-areas:"media head" "media body"}
.ch .head{grid-area:head;align-self:end}
.ch .num{font:800 clamp(72px,11vw,168px)/.85 var(--display);letter-spacing:-.06em;color:var(--ch);font-variation-settings:"wdth" 150;display:block}
.ch .rule{height:6px;width:100%;background:var(--ch);margin:14px 0 18px;transform-origin:left}
.ch h2{font-size:clamp(28px,3.4vw,52px);line-height:.98;letter-spacing:-.03em;text-transform:uppercase}
.ch .kind{margin-top:8px;display:flex;flex-wrap:wrap;gap:8px 14px;font:600 12px/1.5 var(--body);letter-spacing:.1em;text-transform:uppercase;color:var(--ink-3)}
.ch .kind span{display:inline-flex;align-items:center;gap:6px}
.ch .body{grid-area:body;display:grid;gap:14px;align-self:start}
.ch .body p{color:var(--ink-2);max-width:52ch;font-size:16px}
.ch .stack{display:flex;flex-wrap:wrap;gap:6px}
.ch .stack span{font:600 12px/1 var(--body);padding:6px 9px;border:1px solid var(--line);color:var(--ink-2)}
.ch .creds{display:grid;gap:4px;font:500 13px/1.6 ui-monospace,Menlo,Consolas,monospace;color:var(--ink-2)}
.ch .creds b{color:var(--ink);font-family:var(--body);font-weight:600;margin-right:6px}
.ch .creds button{display:inline-flex;align-items:center;gap:4px;margin-left:6px;padding:1px 6px;border:1px solid var(--line);font:600 10.5px/1.4 var(--body);color:var(--ink-3)}
.ch .creds button:hover{color:var(--ink);border-color:var(--ink)}.ch .creds button.copied{color:var(--up);border-color:var(--up)}
.ch .acts{display:flex;flex-wrap:wrap;gap:8px;margin-top:4px}
.ch .note{font-size:13px;color:var(--ink-3)}
.ch .media{grid-area:media;align-self:center}
.ch .frame{position:relative;aspect-ratio:1440/900;overflow:hidden;background:var(--surface);border-top:6px solid var(--ch);box-shadow:0 40px 80px -50px rgba(0,0,0,.45)}
.ch .frame img{width:100%;height:100%;object-fit:cover;object-position:top}
.ch .frame a{position:absolute;inset:0}
.ch .frame a:focus-visible{outline:3px solid var(--ch);outline-offset:-3px}
html.js .ch .num,html.js .ch h2,html.js .ch .body,html.js .ch .media{opacity:0;transform:translateY(18px);transition:opacity .9s var(--ease),transform .9s var(--ease)}
html.js .ch .rule{transform:scaleX(0);transition:transform 1s var(--ease) .15s}
html.js .ch.is-in .num,html.js .ch.is-in h2,html.js .ch.is-in .body,html.js .ch.is-in .media{opacity:1;transform:none}
html.js .ch.is-in h2{transition-delay:.1s}html.js .ch.is-in .body{transition-delay:.2s}html.js .ch.is-in .media{transition-delay:.15s}
html.js .ch.is-in .rule{transform:scaleX(1)}
@media (max-width:900px){.ch,.ch:nth-of-type(even){grid-template-columns:1fr;grid-template-areas:"head" "media" "body";min-height:auto;align-content:start}.ch .num{font-size:clamp(64px,20vw,110px)}}
/* colophon */
.colophon{scroll-snap-align:start;border-top:2px solid var(--line-2);padding-block:clamp(48px,7vw,96px) 0}
.colophon .sec{display:grid;grid-template-columns:minmax(0,3fr) minmax(0,9fr);gap:clamp(16px,3vw,48px);padding-block:clamp(28px,4vw,48px);border-bottom:1px solid var(--line)}
.colophon .sec>h2{font-size:clamp(22px,2.4vw,32px);line-height:1;text-transform:uppercase;letter-spacing:-.02em}
.colophon .sec>h2 small{display:block;font:600 11.5px/1.8 var(--body);letter-spacing:.14em;color:var(--ink-3)}
@media (max-width:800px){.colophon .sec{grid-template-columns:1fr}}
.facts{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr));gap:20px}
.facts dt{font:700 13px/1.4 var(--display);letter-spacing:.04em;text-transform:uppercase;margin-bottom:6px}
.facts dd{font-size:14.5px;color:var(--ink-2)}
.facts .lead{grid-column:1 / -1;font-size:17px;color:var(--ink);max-width:70ch}
.xp{display:grid;gap:18px}
.xp article{display:grid;grid-template-columns:120px 1fr;gap:12px 20px}
.xp .when{font:700 13px/1.5 var(--display);color:var(--ink-3)}
.xp .when b{display:block;color:var(--ink);font-weight:800}
.xp h3{font-size:19px;line-height:1.2;font-variation-settings:"wdth" 110}
.xp .org{font-size:14px;color:var(--ink-2)}
.xp p{margin-top:6px;color:var(--ink-2);font-size:14.5px;max-width:64ch}
.xp ul{margin-top:6px;display:grid;gap:4px;font-size:14px;color:var(--ink-2);max-width:64ch}
.xp li{padding-left:14px;position:relative}.xp li::before{content:"–";position:absolute;left:0}
@media (max-width:560px){.xp article{grid-template-columns:1fr}}
.sk{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr));gap:18px}
.sk h3{font:700 12px/1 var(--body);letter-spacing:.12em;text-transform:uppercase;color:var(--ink-3);margin-bottom:8px}
.sk li{display:flex;justify-content:space-between;gap:10px;font-size:14.5px;padding:5px 0;border-bottom:1px solid var(--line)}
.sk li b{font-family:var(--display)}.sk li b[title]{cursor:help}
.nt{display:grid;gap:12px}
.nt a{display:grid;grid-template-columns:110px 1fr;gap:12px 20px;padding:12px 0;border-bottom:1px solid var(--line)}
.nt time{font:700 13px/1.5 var(--display);color:var(--ink-3)}
.nt h3{font-size:18px;line-height:1.2;font-variation-settings:"wdth" 110}
.nt a:hover h3{text-decoration:underline;text-underline-offset:4px}
.nt p{font-size:14px;color:var(--ink-2);margin-top:4px;max-width:64ch}
@media (max-width:560px){.nt a{grid-template-columns:1fr}}
.ct{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:clamp(20px,4vw,48px)}
.ct .say p{color:var(--ink-2);max-width:40ch}
.ct .links{margin-top:16px;display:flex;flex-wrap:wrap;gap:8px}
form{display:grid;gap:12px}
.field{display:grid;gap:5px}
.field label{font:600 12px/1 var(--body);letter-spacing:.1em;text-transform:uppercase;color:var(--ink-3)}
.field input,.field textarea{width:100%;padding:11px 13px;border:1px solid var(--line-2);background:var(--surface);color:var(--ink);transition:box-shadow .2s}
.field input:focus,.field textarea:focus{outline:none;box-shadow:0 0 0 3px color-mix(in srgb,var(--ink) 25%,transparent)}
.field textarea{min-height:120px;resize:vertical}
form .btn{justify-self:start}
.fn{font-size:12.5px;color:var(--ink-3)}
.sent{padding:12px;border:1px solid var(--up);font-size:14px}
@media (max-width:800px){.ct{grid-template-columns:1fr}}
footer{display:flex;flex-wrap:wrap;justify-content:space-between;gap:10px 24px;padding-block:22px 36px;font-size:13px;color:var(--ink-3)}
footer a:hover{color:var(--ink)}
`;

export default {
  id: '06',
  slug: 'chapters',
  name: 'Chapters',
  concept: 'one project per screen',
  file: '06-chapters.html',
  fonts: ['Anybody:wdth,wght@100..150,600..800', 'Public Sans:wght@400;500;600'],
  axes: {
    layout: 'A cover with a contents list, seven full-height chapters with CSS scroll-snap, then a colophon for everything else',
    canvas: 'Neutral grey; each app owns one accent colour',
    type: 'Anybody (wide) + Public Sans',
    motion: 'Chapter number and rule animate in as each chapter arrives, side indicator follows',
  },
  says: 'Each project gets a full stage and its own colour. Strong for storytelling; the reader has to scroll seven screens to reach the CV, so it favours patient readers.',
  render(c, h) {
    const t = h.tenure(c.experience.startDate);
    const chapters = c.demos
      .map((d, i) => `<section class="ch" id="ch-${d.slug}" style="--ch:var(--a-${d.slug})" aria-labelledby="h-${d.slug}">
  <div class="head"><span class="num" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span><div class="rule"></div><h2 id="h-${d.slug}">${h.esc(d.name)}</h2>
    <div class="kind"><span>${h.statusDot(d.slug)}up</span><span>${h.esc(d.kind)}</span><span>${d.period}</span><span>${h.esc(d.langs)}</span></div></div>
  <div class="media"><div class="frame">${h.shot(d)}<a href="${d.demoUrl ?? d.url}" target="_blank" rel="noopener" aria-label="Open ${h.esc(d.name)}"></a></div></div>
  <div class="body">
    <p>${h.esc(d.problem)}</p>
    <div class="stack">${d.stack.map((s) => `<span>${h.esc(s)}</span>`).join('')}</div>
    ${d.credentials.length ? `<div class="creds">${d.credentials.map((cr) => `<div><b>${h.esc(cr.label)}</b>${h.esc(cr.user)}<button type="button" data-copy="${h.esc(cr.user)}" aria-label="Copy">${h.icon('copy')}</button> · ${h.esc(cr.pass)}<button type="button" data-copy="${h.esc(cr.pass)}" aria-label="Copy">${h.icon('copy')}</button></div>`).join('')}</div>` : ''}
    <div class="acts"><a class="btn fill" href="${d.demoUrl ?? d.url}" target="_blank" rel="noopener">${d.demoUrl ? 'Open signed in' : 'Open the app'} ${h.icon('arrow-up-right')}</a><a class="btn" href="/work/${d.slug}/">Case study</a>${d.repo ? `<a class="btn" href="${d.repo}" target="_blank" rel="noopener">${h.icon('github')} Source</a>` : ''}</div>
    <p class="note">${h.esc(d.note)}</p>
  </div>
</section>`)
      .join('');

    return `${h.head({ title: 'Muhammed Kado — Chapters', description: c.profile.headline, fonts: this.fonts, light: '#f2f2f2', dark: '#141414', css })}
<body>
<a class="skip" href="#main">Skip to content</a>
<nav class="side" aria-label="Chapters">
  <a href="#cover" data-for="cover" aria-current="true"><span>Cover</span><i></i></a>
  ${c.demos.map((d, i) => `<a href="#ch-${d.slug}" data-for="ch-${d.slug}" style="--ch:var(--a-${d.slug})"><span>${String(i + 1).padStart(2, '0')} ${h.esc(d.short)}</span><i></i></a>`).join('')}
  <a href="#colophon" data-for="colophon"><span>Colophon</span><i></i></a>
</nav>
<main id="main">
<section class="cover" id="cover">
  <header class="top">
    <a class="brand" href="#cover">${h.mark({ size: 30, font: 'Anybody, system-ui, sans-serif' })}<span>${h.esc(c.profile.name)}</span></a>
    ${h.statusPill('pill')}
  </header>
  <div class="mid">
    <div>
      <h1>Seven<br><span class="thin">live</span><br>apps<span class="thin">.</span></h1>
      <p class="claim">${h.esc(c.profile.headline)} ${h.esc(c.profile.plain)} Each one below is deployed and yours to try.</p>
      <div class="cta"><a class="btn fill" href="#ch-pos">Start reading ${h.icon('arrow-down')}</a><a class="btn" href="${c.profile.cv}">CV</a><a class="btn" href="${c.profile.github}" target="_blank" rel="noopener">GitHub</a><a class="btn" href="#colophon">Skip to the CV</a></div>
    </div>
    <nav class="toc" aria-label="Contents">
      <p class="label">Contents</p>
      ${c.demos.map((d, i) => `<a href="#ch-${d.slug}" style="--ch:var(--a-${d.slug})"><span>${String(i + 1).padStart(2, '0')}</span><span>${h.esc(d.name)}<br><small>${h.esc(d.kind)} · ${d.period}</small></span><i aria-hidden="true"></i></a>`).join('')}
      <a href="#colophon" style="--ch:var(--ink-3)"><span>08</span><span>Colophon<br><small>How it runs · experience · skills · notes · contact</small></span><i aria-hidden="true"></i></a>
    </nav>
  </div>
  <div class="foot"><span><b>${t.short}</b> at USTEK RFID, counting</span><span>Deployed in <b>30+ countries</b></span><span>${h.esc(c.profile.location)} · ${c.profile.tz}</span></div>
</section>

${chapters}

<section class="colophon" id="colophon">
  <div class="sec" id="how">
    <h2><small>08 · Colophon</small>How it runs</h2>
    <dl class="facts"><p class="lead">${h.esc(c.proof.lead)} <a href="${c.proof.link}" style="text-decoration:underline;text-underline-offset:4px">${h.esc(c.proof.linkLabel)}</a></p>${c.proof.facts.map((f) => `<div><dt>${h.esc(f.k)}</dt><dd>${h.esc(f.v)}</dd></div>`).join('')}</dl>
  </div>
  <div class="sec" id="experience">
    <h2>Experience</h2>
    <div class="xp">${c.timeline.map((e) => `<article><div class="when">${e.from} – ${e.to}${e.live ? `<b>${t.short}</b>` : ''}</div><div><h3>${h.esc(e.title)}</h3><div class="org">${h.esc(e.org)} · ${h.esc(e.where)}</div><p>${h.esc(e.summary)}</p>${e.bullets.length ? `<ul>${e.bullets.map((b) => `<li>${h.esc(b)}</li>`).join('')}</ul>` : ''}</div></article>`).join('')}</div>
  </div>
  <div class="sec" id="skills">
    <h2>Skills<small style="margin-top:6px">the number is how many projects ship it</small></h2>
    <div class="sk">${c.skills.map((g) => `<div><h3>${h.esc(g.group)}</h3><ul>${g.items.map((s) => `<li><span>${h.esc(s.name)}</span>${s.projects.length ? `<b title="${h.esc(s.projects.join(', '))}">${s.projects.length}</b>` : ''}</li>`).join('')}</ul></div>`).join('')}</div>
  </div>
  <div class="sec" id="notes">
    <h2>Notes</h2>
    <div class="nt">${c.notes.map((n) => `<a href="/notes/${n.slug}/"><time datetime="${n.date}">${h.fmtDate(n.date)}</time><div><h3>${h.esc(n.title)}</h3><p>${h.esc(n.description)}</p></div></a>`).join('')}</div>
  </div>
  <div class="sec" id="contact">
    <h2>Contact</h2>
    <div class="ct">
      <div class="say"><h3 style="font-size:24px">Hiring a full-stack engineer?</h3><p style="margin-top:8px">${h.esc(c.profile.availability)} I reply within a day.</p>
        <div class="links"><a class="btn fill" href="mailto:${c.profile.email}">${h.icon('mail')} Email</a><a class="btn" href="${c.profile.whatsapp}" target="_blank" rel="noopener">WhatsApp</a><a class="btn" href="${c.profile.linkedin}" target="_blank" rel="noopener">LinkedIn</a><a class="btn" href="${c.profile.cv}">CV</a></div></div>
      <form action="/api/contact" method="post" novalidate>
        <div class="field"><label for="cf-name">Name</label><input id="cf-name" name="name" type="text" autocomplete="name" required></div>
        <div class="field"><label for="cf-email">Email</label><input id="cf-email" name="email" type="email" autocomplete="email" required></div>
        <div class="field"><label for="cf-msg">Message</label><textarea id="cf-msg" name="message" required></textarea></div>
        <button class="btn fill" type="submit">Send</button>
        <p class="fn">Turnstile-protected. Stored first, forwarded second.</p>
      </form>
    </div>
  </div>
  <footer><span>© 2026 ${h.esc(c.profile.name)}</span><span><a href="/about-this-site">About this site</a> · <a href="/notes/">Notes</a> · <a href="/rss.xml">RSS</a> · <a href="https://github.com/muhammedkado/mkado.dev" target="_blank" rel="noopener">Source</a></span></footer>
</section>
</main>
${h.candidateBar(h.id, h.total)}
${h.copyScript}
<script>
(function(){
  var secs=[].slice.call(document.querySelectorAll('.cover,.ch,.colophon')),links=[].slice.call(document.querySelectorAll('.side a'));
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!('IntersectionObserver' in window)||reduce){secs.forEach(function(s){s.classList.add('is-in')});return}
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('is-in');links.forEach(function(a){if(a.dataset.for===e.target.id)a.setAttribute('aria-current','true');else a.removeAttribute('aria-current')})}})},{rootMargin:'-35% 0px -35% 0px',threshold:0});
  secs.forEach(function(s){io.observe(s)});
  var io2=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('is-in');io2.unobserve(e.target)}})},{rootMargin:'0px 0px -10% 0px'});secs.forEach(function(s){io2.observe(s)});
  var f=document.querySelector('form');f&&f.addEventListener('submit',function(e){e.preventDefault();var m=document.createElement('p');m.className='sent';m.textContent='Design mockup: on the built site this posts to /api/contact.';f.replaceChildren(m)});
})();
</script>
</body>
</html>`;
  },
};
