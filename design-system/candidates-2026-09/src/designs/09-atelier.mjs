// 09 · Atelier — quiet luxury, slow.
// One project on the stage at a time, a lot of air around it, small refined
// type, slow crossfades. Nothing shouts; the restraint is the message.
// Type: Cormorant Garamond for statements, Onest for everything small.

const css = `
:root{color-scheme:light dark;
--bg:light-dark(#f7f3ec,#171311);--surface:light-dark(#fdfbf7,#1f1a17);--ink:light-dark(#171311,#f1ebe1);--ink-2:light-dark(#4e4741,#bfb6aa);--ink-3:light-dark(#6e6760,#948b7f);--line:light-dark(#e2dcd0,#2e2823);--line-2:light-dark(#c9c1b2,#463e37);--brass:light-dark(#6e5528,#c9a86a);--brass-fill:light-dark(#b08d57,#c9a86a);--up:light-dark(#3f7a4a,#7fc28f);--focus:var(--brass);
--mark-bg:light-dark(#171311,#f1ebe1);--mark-fg:light-dark(#f7f3ec,#171311);--mark-pulse:var(--brass-fill);--mark-dot:var(--brass-fill);
--serif:"Cormorant Garamond",Georgia,"Times New Roman",serif;--sans:"Onest",system-ui,sans-serif;--ease:cubic-bezier(.16,1,.3,1);--slow:.7s}
:root[data-theme="light"]{color-scheme:light}:root[data-theme="dark"]{color-scheme:dark}
html{scroll-behavior:smooth}
body{background:var(--bg);color:var(--ink);font:15px/1.65 var(--sans);padding-inline:clamp(20px,5vw,80px);letter-spacing:.005em}
.wrap{max-width:1200px;margin:0 auto}
.skip{position:absolute;left:16px;top:-48px;padding:10px 14px;background:var(--ink);color:var(--bg);z-index:50}.skip:focus{top:12px}
.sc{font:500 11px/1 var(--sans);letter-spacing:.2em;text-transform:uppercase;color:var(--ink-3)}
h1,h2,h3{font-family:var(--serif);font-weight:500;letter-spacing:-.005em;text-wrap:balance}
a{transition:color .35s var(--ease)}
.dot{width:6px;height:6px;border-radius:50%;background:var(--up);flex:none;display:inline-block}
[data-state="down"]>.dot{background:#b91c1c}
/* header */
.top{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:16px;padding-block:26px;border-bottom:1px solid var(--line)}
.top .status{display:inline-flex;align-items:center;gap:8px;font:500 11px/1 var(--sans);letter-spacing:.14em;text-transform:uppercase;color:var(--ink-3)}
.top .name{text-align:center;font:500 22px/1 var(--serif);letter-spacing:.04em}
.top nav{display:flex;justify-content:flex-end;gap:22px}
.top nav a{font:500 11px/1 var(--sans);letter-spacing:.16em;text-transform:uppercase;color:var(--ink-2);padding-block:4px;border-bottom:1px solid transparent}
.top nav a:hover{color:var(--ink);border-color:var(--brass)}
@media (max-width:900px){.top{grid-template-columns:1fr auto}.top nav{display:none}.top .name{text-align:left}}
/* hero */
.hero{text-align:center;padding-block:clamp(64px,12vw,160px) clamp(48px,8vw,112px);display:grid;justify-items:center;gap:22px}
.hero h1{font-size:clamp(34px,5.2vw,74px);line-height:1.08;max-width:22ch;font-weight:400}
.hero h1 em{font-style:italic;font-weight:400}
.hero .who{color:var(--ink-2);max-width:52ch;font-size:16px}
.hero .rule{width:44px;height:1px;background:var(--brass-fill)}
.hero .tenure{display:flex;gap:28px;flex-wrap:wrap;justify-content:center}
.hero .tenure div{display:grid;gap:6px;justify-items:center}
.hero .tenure b{font:500 30px/1 var(--serif);letter-spacing:-.01em}
.cta{display:flex;flex-wrap:wrap;gap:22px;justify-content:center}
.lnk{font:500 11.5px/1 var(--sans);letter-spacing:.16em;text-transform:uppercase;color:var(--ink);display:inline-flex;align-items:center;gap:8px;padding-block:6px;border-bottom:1px solid var(--line-2);transition:border-color .35s var(--ease),color .35s}
.lnk:hover{border-color:var(--brass);color:var(--brass)}
.lnk svg{width:13px;height:13px}
html.js .hero>*{opacity:0;animation:rise 1.4s var(--ease) forwards;animation-delay:calc(var(--i,0) * 160ms)}
@keyframes rise{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
/* stage */
.sec{padding-block:clamp(48px,8vw,112px);border-top:1px solid var(--line)}
.sec-head{text-align:center;display:grid;gap:12px;justify-items:center;margin-bottom:clamp(28px,5vw,56px)}
.sec-head h2{font-size:clamp(28px,3.6vw,48px);line-height:1.1;font-weight:400}
.sec-head p{color:var(--ink-2);max-width:56ch}
.stage{display:grid}
.slide{grid-area:1/1;display:grid;gap:26px;justify-items:center;opacity:0;visibility:hidden;transition:opacity var(--slow) var(--ease),visibility 0s var(--slow)}
.slide.is-on{opacity:1;visibility:visible;transition-delay:0s}
.slide .frame{width:min(100%,1040px);aspect-ratio:1440/900;overflow:hidden;background:var(--surface);box-shadow:0 60px 120px -60px rgba(23,19,17,.5);position:relative}
.slide .frame img{width:100%;height:100%;object-fit:cover;object-position:top;transform:translateY(var(--py,0)) scale(1.04);transition:transform .2s linear}
.slide .frame a{position:absolute;inset:0}
.slide .frame a:focus-visible{outline:2px solid var(--brass);outline-offset:-2px}
/* generated media: the stage opens on each key visual (the screenshot on hover or focus); a linen plate behind the hero */
.slide .frame img.kv{position:absolute;inset:0;object-position:center;transition:opacity var(--slow) var(--ease),transform .2s linear}
.slide .frame:hover img.kv,.slide .frame:focus-within img.kv{opacity:0}
@media (hover:none){.slide .frame img.kv{display:none}}
.hero.has-plate{--plate-o:.45;--plate-o-dark:.28}
.top .name svg{display:inline-block;vertical-align:-5px;margin-right:10px}
.slide .text{display:grid;gap:14px;justify-items:center;text-align:center;max-width:60ch}
.slide .text .n{font:500 11px/1 var(--sans);letter-spacing:.24em;color:var(--brass)}
.slide h3{font-size:clamp(30px,3.4vw,46px);line-height:1.05;font-weight:400}
.slide p{color:var(--ink-2);font-size:15.5px}
.slide .meta{display:flex;flex-wrap:wrap;justify-content:center;gap:8px 20px;font:500 11px/1.8 var(--sans);letter-spacing:.14em;text-transform:uppercase;color:var(--ink-3)}
.slide .creds{font:400 12.5px/1.8 var(--sans);color:var(--ink-2);letter-spacing:.02em}
.slide .creds button{display:inline-flex;align-items:center;gap:4px;margin-left:5px;padding:0 5px;border:1px solid var(--line-2);border-radius:3px;font:500 10px/1.6 var(--sans);letter-spacing:.06em;color:var(--ink-3);vertical-align:middle}
.slide .creds button:hover{color:var(--ink);border-color:var(--ink)}.slide .creds button.copied{color:var(--up);border-color:var(--up)}
.slide .links{display:flex;flex-wrap:wrap;gap:22px;justify-content:center}
.ctl{display:flex;justify-content:center;align-items:center;gap:28px;margin-top:32px}
.ctl button{display:inline-flex;align-items:center;gap:8px;font:500 11px/1 var(--sans);letter-spacing:.18em;text-transform:uppercase;color:var(--ink-2);padding:10px 0;border-bottom:1px solid transparent;transition:color .35s,border-color .35s}
.ctl button:hover{color:var(--ink);border-color:var(--brass)}
.ctl button svg{width:14px;height:14px}
.ctl .count{font:400 20px/1 var(--serif);letter-spacing:.06em;font-variant-numeric:tabular-nums}
.thumbs{display:flex;justify-content:center;gap:10px;margin-top:26px;flex-wrap:wrap}
.thumbs button{width:64px;aspect-ratio:1440/900;overflow:hidden;background:var(--surface);opacity:.45;border:1px solid var(--line);transition:opacity .35s,border-color .35s}
.thumbs button img{width:100%;height:100%;object-fit:cover;object-position:top}
.thumbs button:hover,.thumbs button[aria-current="true"]{opacity:1;border-color:var(--brass)}
/* practice */
.two{display:grid;grid-template-columns:minmax(0,4fr) minmax(0,8fr);gap:clamp(24px,5vw,80px)}
.two .side{display:grid;gap:14px;align-content:start}
.two .side h2{font-size:clamp(28px,3vw,40px);line-height:1.1;font-weight:400}
.two .side p{color:var(--ink-2)}
.essay{display:grid;gap:26px;max-width:66ch}
.essay article{display:grid;gap:8px;padding-bottom:26px;border-bottom:1px solid var(--line)}
.essay .when{font:500 11px/1.8 var(--sans);letter-spacing:.18em;text-transform:uppercase;color:var(--brass)}
.essay h3{font-size:clamp(22px,2.4vw,30px);line-height:1.15;font-weight:500}
.essay .org{color:var(--ink-3);font-size:14px}
.essay p{color:var(--ink-2);font-size:15.5px}
.essay ul{display:grid;gap:6px;color:var(--ink-2);font-size:15px}
.essay li{padding-left:16px;position:relative}.essay li::before{content:"";position:absolute;left:0;top:.75em;width:6px;height:1px;background:var(--brass-fill)}
@media (max-width:900px){.two{grid-template-columns:1fr}}
/* method */
.method{max-width:760px;margin:0 auto;display:grid;gap:0}
.method .lead{font:400 clamp(20px,2.2vw,28px)/1.35 var(--serif);text-align:center;margin-bottom:26px;color:var(--ink)}
.method dl div{display:grid;grid-template-columns:130px 1fr;gap:16px;padding:14px 0;border-top:1px solid var(--line)}
.method dt{font:500 11px/1.9 var(--sans);letter-spacing:.18em;text-transform:uppercase;color:var(--brass)}
.method dd{color:var(--ink-2)}
.method .more{text-align:center;margin-top:26px}
@media (max-width:560px){.method dl div{grid-template-columns:1fr;gap:4px}}
/* vocabulary */
.vocab{max-width:760px;margin:0 auto;display:grid;gap:18px}
.vocab p{font:400 clamp(17px,1.6vw,20px)/1.6 var(--serif);color:var(--ink)}
.vocab p b{font:500 11px/1 var(--sans);letter-spacing:.18em;text-transform:uppercase;color:var(--brass);margin-right:10px}
.vocab p small{font:500 11px/1 var(--sans);color:var(--ink-3);letter-spacing:.06em;vertical-align:super;margin-left:2px}
.vocab p small[title]{cursor:help}
.vocab .fn{font:400 13.5px/1.6 var(--sans);color:var(--ink-3);text-align:center}
/* journal */
.journal{max-width:760px;margin:0 auto;display:grid}
.journal a{display:grid;gap:8px;padding:22px 0;border-top:1px solid var(--line)}
.journal time{font:500 11px/1 var(--sans);letter-spacing:.18em;text-transform:uppercase;color:var(--ink-3)}
.journal h3{font-size:clamp(22px,2.4vw,30px);line-height:1.15;font-weight:500}
.journal a:hover h3{color:var(--brass)}
.journal p{color:var(--ink-2);font-size:15px}
/* correspondence */
.corr{max-width:760px;margin:0 auto;display:grid;gap:26px;justify-items:center;text-align:center}
.corr h2{font-size:clamp(30px,4vw,54px);line-height:1.05;font-weight:400}
.corr p{color:var(--ink-2);max-width:48ch}
.corr .links{display:flex;flex-wrap:wrap;justify-content:center;gap:22px}
form{width:100%;display:grid;gap:16px;text-align:left;margin-top:8px}
.field{display:grid;gap:6px}
.field label{font:500 11px/1 var(--sans);letter-spacing:.18em;text-transform:uppercase;color:var(--ink-3)}
.field input,.field textarea{width:100%;padding:12px 0;border-bottom:1px solid var(--line-2);background:transparent;color:var(--ink);font:400 16px/1.5 var(--sans);transition:border-color .35s}
.field input:focus,.field textarea:focus{outline:none;border-color:var(--brass)}
.field textarea{min-height:110px;resize:vertical}
form .lnk{justify-self:start}
.fn{font-size:12.5px;color:var(--ink-3)}
.sent{padding:12px 0;border-block:1px solid var(--up);font-size:14px}
footer{display:flex;flex-wrap:wrap;justify-content:space-between;gap:10px 24px;padding-block:26px 48px;border-top:1px solid var(--line);font:500 11px/1.8 var(--sans);letter-spacing:.14em;text-transform:uppercase;color:var(--ink-3)}
footer a:hover{color:var(--ink)}
html.js [data-reveal]{opacity:0;transform:translateY(12px);transition:opacity 1.3s var(--ease),transform 1.3s var(--ease);transition-delay:calc(var(--i,0) * 90ms)}
html.js [data-reveal].is-in{opacity:1;transform:none}
`;

export default {
  id: '09',
  slug: 'atelier',
  name: 'Atelier',
  concept: 'quiet luxury · slow',
  file: '09-atelier.html',
  fonts: ['Cormorant Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500', 'Onest:wght@400;500;600'],
  axes: {
    layout: 'One project on the stage at a time with previous/next and thumbnails; everything else is a centred column with vast margins',
    canvas: 'Cream / espresso, a muted brass',
    type: 'Cormorant Garamond + Onest',
    motion: 'Slow crossfades between projects, subtle parallax on the stage, 700 ms easing throughout',
  },
  says: 'You are calm, selective and confident enough to show one thing at a time. Reads as senior. Slower to scan than the others; a recruiter in a hurry may not click through all seven.',
  render(c, h) {
    const t = h.tenure(c.experience.startDate);
    const slides = c.demos
      .map((d, i) => `<article class="slide${i === 0 ? ' is-on' : ''}" data-i="${i}" aria-hidden="${i === 0 ? 'false' : 'true'}">
  <div class="frame">${h.shot(d)}${h.keyVisual(d, 'class="kv"', { fallback: false })}<a href="${d.demoUrl ?? d.url}" target="_blank" rel="noopener" aria-label="Open ${h.esc(d.name)}"></a></div>
  <div class="text">
    <span class="n">${String(i + 1).padStart(2, '0')} — ${String(c.demos.length).padStart(2, '0')}</span>
    <h3>${h.esc(d.name)}</h3>
    <p>${h.esc(d.problem)}</p>
    <div class="meta"><span>${h.statusDot(d.slug)} live</span><span>${h.esc(d.kind)}</span><span>${d.period}</span><span>${h.esc(d.stack.slice(0, 3).join(' · '))}</span></div>
    ${d.credentials.length ? `<div class="creds">${d.credentials.map((cr) => `${h.esc(cr.label)} · ${h.esc(cr.user)}<button type="button" data-copy="${h.esc(cr.user)}" aria-label="Copy">${h.icon('copy')}</button> · ${h.esc(cr.pass)}<button type="button" data-copy="${h.esc(cr.pass)}" aria-label="Copy">${h.icon('copy')}</button>`).join('<br>')}</div>` : `<div class="creds">${h.esc(d.note)}</div>`}
    <div class="links"><a class="lnk" href="${d.demoUrl ?? d.url}" target="_blank" rel="noopener">${d.demoUrl ? 'Open signed in' : 'Open the app'} ${h.icon('arrow-up-right')}</a><a class="lnk" href="/work/${d.slug}/">Case study</a>${d.repo ? `<a class="lnk" href="${d.repo}" target="_blank" rel="noopener">Source</a>` : ''}</div>
  </div>
</article>`)
      .join('');

    return `${h.head({ title: 'Muhammed Kado — Atelier', description: c.profile.headline, fonts: this.fonts, light: '#f7f3ec', dark: '#171311', css })}
<body>
<a class="skip" href="#main">Skip to content</a>
<div class="wrap">
<header class="top">
  ${h.statusPill('status', 'All systems up')}
  <a class="name" href="#top">${h.hasLogo ? h.mark({ size: 24 }) : ''}${h.esc(c.profile.name)}</a>
  <nav aria-label="Sections">${c.nav.map((n) => `<a href="${n.href}">${n.label}</a>`).join('')}</nav>
</header>
<main id="main">
<section class="hero${h.plateClass('plate-atelier')}" id="top">
  <p class="sc" style="--i:0">${h.esc(c.profile.title)} · ${h.esc(c.profile.role)} · İstanbul</p>
  <h1 style="--i:1">The web side of <em>RFID systems</em>, in thirty countries and counting.</h1>
  <div class="rule" style="--i:2"></div>
  <p class="who" style="--i:3">${h.esc(c.profile.plain)} At USTEK: a laundry-management platform for commercial laundries, hotels and hospitals. Seven applications below, each deployed and open.</p>
  <div class="tenure" style="--i:4"><div><b>${t.years}<span style="font-size:.5em"> yrs</span> ${t.months}<span style="font-size:.5em"> mo</span></b><span class="sc">at USTEK RFID</span></div><div><b>7</b><span class="sc">live applications</span></div><div><b>4</b><span class="sc">languages</span></div></div>
  <div class="cta" style="--i:5"><a class="lnk" href="#work">Selected work ${h.icon('arrow-down')}</a><a class="lnk" href="${c.profile.cv}">Curriculum vitae</a><a class="lnk" href="${c.profile.github}" target="_blank" rel="noopener">GitHub</a></div>
  ${h.plate('plate-atelier')}
</section>

<section class="sec" id="work">
  <div class="sec-head" data-reveal><p class="sc">Selected work</p><h2>Seven applications, one at a time</h2><p>Each is deployed and yours to open, with a demo account where one is needed. Demo data resets nightly.</p></div>
  <div class="stage" aria-live="polite">${slides}</div>
  <div class="ctl"><button type="button" data-prev>${h.icon('arrow-left')} Previous</button><span class="count"><span data-count>01</span> / ${String(c.demos.length).padStart(2, '0')}</span><button type="button" data-next>Next ${h.icon('arrow-right')}</button></div>
  <div class="thumbs" role="tablist" aria-label="Choose a project">${c.demos.map((d, i) => `<button type="button" role="tab" data-go="${i}" aria-label="${h.esc(d.name)}" aria-current="${i === 0 ? 'true' : 'false'}">${h.hasMedia(d.visual) ? h.keyVisual(d) : h.shot(d, 'width="64" height="40"')}</button>`).join('')}</div>
</section>

<section class="sec" id="experience">
  <div class="two">
    <div class="side" data-reveal><p class="sc">Practice</p><h2>From a degree to production, in thirty countries</h2><p>${h.esc(c.experience.summary)}</p></div>
    <div class="essay">${c.timeline.map((e) => `<article data-reveal><span class="when">${e.from} – ${e.to}${e.live ? ` · ${t.short}, counting` : ''}</span><h3>${h.esc(e.title)}</h3><span class="org">${h.esc(e.org)} · ${h.esc(e.where)}</span><p>${h.esc(e.summary)}</p>${e.bullets.length ? `<ul>${e.bullets.map((b) => `<li>${h.esc(b)}</li>`).join('')}</ul>` : ''}</article>`).join('')}</div>
  </div>
</section>

<section class="sec" id="how">
  <div class="sec-head" data-reveal><p class="sc">Method</p><h2>${h.esc(c.proof.title)}</h2></div>
  <div class="method" data-reveal>
    <p class="lead">${h.esc(c.proof.lead)}</p>
    <dl>${c.proof.facts.map((f) => `<div><dt>${h.esc(f.k)}</dt><dd>${h.esc(f.v)}</dd></div>`).join('')}</dl>
    <p class="more"><a class="lnk" href="${c.proof.link}">${h.esc(c.proof.linkLabel)} ${h.icon('arrow-right')}</a></p>
  </div>
</section>

<section class="sec" id="skills">
  <div class="sec-head" data-reveal><p class="sc">Vocabulary</p><h2>Skills, with evidence</h2><p>The small figure is how many projects on this page use the skill.</p></div>
  <div class="vocab" data-reveal>
    ${c.skills.map((g) => `<p><b>${h.esc(g.group)}</b>${g.items.map((s) => `${h.esc(s.name)}${s.projects.length ? `<small title="${h.esc(s.projects.join(', '))}">${s.projects.length}</small>` : ''}`).join(', ')}.</p>`).join('')}
    <p class="fn">Kurdish, Arabic and Turkish natively; English professionally. Five of the seven applications are right-to-left.</p>
  </div>
</section>

<section class="sec" id="notes">
  <div class="sec-head" data-reveal><p class="sc">Journal</p><h2>Notes from production</h2></div>
  <div class="journal">${c.notes.map((n) => `<a href="/notes/${n.slug}/" data-reveal><time datetime="${n.date}">${h.fmtDate(n.date)}</time><h3>${h.esc(n.title)}</h3><p>${h.esc(n.description)}</p></a>`).join('')}</div>
</section>

<section class="sec" id="contact">
  <div class="corr" data-reveal>
    <p class="sc">Correspondence</p>
    <h2>Hiring a full-stack engineer?</h2>
    <p>${h.esc(c.profile.availability)} I reply within a day.</p>
    <div class="links"><a class="lnk" href="mailto:${c.profile.email}">${c.profile.email}</a><a class="lnk" href="${c.profile.whatsapp}" target="_blank" rel="noopener">WhatsApp</a><a class="lnk" href="${c.profile.linkedin}" target="_blank" rel="noopener">LinkedIn</a></div>
    <form action="/api/contact" method="post" novalidate>
      <div class="field"><label for="cf-name">Name</label><input id="cf-name" name="name" type="text" autocomplete="name" required></div>
      <div class="field"><label for="cf-email">Email</label><input id="cf-email" name="email" type="email" autocomplete="email" required></div>
      <div class="field"><label for="cf-msg">Message</label><textarea id="cf-msg" name="message" required></textarea></div>
      <button class="lnk" type="submit">Send ${h.icon('arrow-right')}</button>
      <p class="fn">Turnstile-protected. Stored first, forwarded second.</p>
    </form>
  </div>
</section>
</main>
<footer><span>© 2026 ${h.esc(c.profile.name)}</span><span><a href="/about-this-site">About this site</a> · <a href="/notes/">Notes</a> · <a href="/rss.xml">RSS</a> · <a href="https://github.com/muhammedkado/mkado.dev" target="_blank" rel="noopener">Source</a></span></footer>
</div>
${h.candidateBar(h.id, h.total)}
${h.revealScript}
${h.copyScript}
<script>
(function(){
  var slides=[].slice.call(document.querySelectorAll('.slide')),thumbs=[].slice.call(document.querySelectorAll('[data-go]')),count=document.querySelector('[data-count]'),cur=0;
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  function go(i){cur=(i+slides.length)%slides.length;slides.forEach(function(s,k){s.classList.toggle('is-on',k===cur);s.setAttribute('aria-hidden',k===cur?'false':'true')});thumbs.forEach(function(t,k){t.setAttribute('aria-current',k===cur?'true':'false')});count.textContent=String(cur+1).padStart(2,'0')}
  document.querySelector('[data-prev]').addEventListener('click',function(){go(cur-1)});document.querySelector('[data-next]').addEventListener('click',function(){go(cur+1)});
  thumbs.forEach(function(t){t.addEventListener('click',function(){go(+t.dataset.go)})});
  document.addEventListener('keydown',function(e){if(e.target.closest('input,textarea'))return;if(e.key==='ArrowRight')go(cur+1);if(e.key==='ArrowLeft')go(cur-1)});
  if(!reduce){var stage=document.querySelector('.stage'),raf=null;function par(){raf=null;var r=stage.getBoundingClientRect();var p=(r.top+r.height/2-innerHeight/2)/innerHeight;slides[cur].querySelector('.frame').style.setProperty('--py',(p*-24).toFixed(1)+'px')}addEventListener('scroll',function(){if(!raf)raf=requestAnimationFrame(par)},{passive:true});par()}
  var f=document.querySelector('form');f&&f.addEventListener('submit',function(e){e.preventDefault();var m=document.createElement('p');m.className='sent';m.textContent='Design mockup: on the built site this posts to /api/contact.';f.replaceChildren(m)});
})();
</script>
</body>
</html>`;
  },
};
