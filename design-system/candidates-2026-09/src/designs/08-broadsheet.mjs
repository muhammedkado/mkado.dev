// 08 · Broadsheet — the newspaper of the work.
// A front page: nameplate, dateline, a lead story with a drop cap and two
// columns, an "in this issue" index, a status box where the weather would be,
// then the seven applications as illustrated stories. The conventions are
// real newspaper conventions, used because the site has stories to tell.
// Type: Newsreader (optical sizes) for headlines and body, Libre Franklin for
// kickers, bylines and everything utilitarian.

const css = `
:root{color-scheme:light dark;
--bg:light-dark(#f4f1ea,#141414);--surface:light-dark(#fbf9f4,#1c1b19);--ink:light-dark(#1b1b1b,#ece8df);--ink-2:light-dark(#4a4741,#bdb8ad);--ink-3:light-dark(#6b675f,#948f85);--line:light-dark(#cfc9bc,#33312d);--rule:light-dark(#1b1b1b,#ece8df);--red:light-dark(#9b1c1c,#f0a38a);--red-ink:light-dark(#ffffff,#141414);--up:light-dark(#15803d,#4ade80);--focus:var(--red);
--mark-bg:light-dark(#1b1b1b,#ece8df);--mark-fg:light-dark(#f4f1ea,#141414);--mark-pulse:var(--red);--mark-dot:var(--red);
--serif:"Newsreader",Georgia,"Times New Roman",serif;--sans:"Libre Franklin","Helvetica Neue",Arial,sans-serif;--ease:cubic-bezier(.2,.8,.2,1)}
:root[data-theme="light"]{color-scheme:light}:root[data-theme="dark"]{color-scheme:dark}
html{scroll-behavior:smooth}
body{background:var(--bg);color:var(--ink);font:16px/1.5 var(--serif);padding-inline:clamp(14px,3vw,40px);font-feature-settings:"onum","kern"}
.wrap{max-width:1240px;margin:0 auto}
.skip{position:absolute;left:16px;top:-48px;padding:10px 14px;background:var(--ink);color:var(--bg);z-index:50}.skip:focus{top:12px}
.sans{font-family:var(--sans)}
.kicker{font:700 11px/1 var(--sans);letter-spacing:.14em;text-transform:uppercase;color:var(--red)}
.byline{font:500 12px/1.5 var(--sans);color:var(--ink-3);letter-spacing:.02em}
h1,h2,h3{font-family:var(--serif);font-weight:600;letter-spacing:-.01em;text-wrap:balance}
.dot{width:8px;height:8px;border-radius:50%;background:var(--up);flex:none;display:inline-block}
[data-state="down"]>.dot{background:var(--red)}
/* ticker */
.ticker{overflow:hidden;border-bottom:1px solid var(--rule);font:600 11px/1 var(--sans);letter-spacing:.1em;text-transform:uppercase;padding-block:8px}
.ticker .track{display:flex;gap:36px;width:max-content;white-space:nowrap;animation:tick 45s linear infinite}
.ticker:hover .track,.ticker:focus-within .track{animation-play-state:paused}
.ticker span{display:inline-flex;align-items:center;gap:8px}
@keyframes tick{to{transform:translateX(-50%)}}
@media (prefers-reduced-motion:reduce){.ticker .track{animation:none;width:auto;flex-wrap:wrap;white-space:normal;gap:10px 24px}}
/* masthead */
.mast{text-align:center;padding-block:14px 10px;border-bottom:3px double var(--rule)}
.mast .dateline{display:flex;justify-content:space-between;gap:12px;font:500 12px/1.5 var(--sans);color:var(--ink-3);letter-spacing:.04em;border-bottom:1px solid var(--rule);padding-bottom:8px}
.mast h1{font-size:clamp(40px,7.4vw,92px);line-height:1;font-weight:800;letter-spacing:-.02em;font-variation-settings:"opsz" 72;padding-block:14px 8px}
.mast .tag{font:500 13px/1.5 var(--sans);color:var(--ink-2);letter-spacing:.06em;text-transform:uppercase;display:flex;justify-content:center;gap:14px;flex-wrap:wrap;border-top:1px solid var(--rule);padding-top:8px}
.mast nav{display:flex;justify-content:center;gap:2px;flex-wrap:wrap;margin-top:8px}
.mast nav a{padding:6px 10px;font:600 12px/1 var(--sans);letter-spacing:.08em;text-transform:uppercase;border-bottom:2px solid transparent}
.mast nav a:hover{border-color:var(--red)}
@media (max-width:640px){.mast .dateline span:nth-child(2){display:none}}
/* front page */
.front{display:grid;grid-template-columns:3fr 6fr 3fr;gap:0;margin-top:18px}
.front>*{padding:8px 22px}
.front>*:first-child{padding-left:0;border-right:1px solid var(--line)}
.front>*:last-child{padding-right:0;border-left:1px solid var(--line)}
.issue h2{font:700 11px/1 var(--sans);letter-spacing:.14em;text-transform:uppercase;padding-bottom:8px;border-bottom:1px solid var(--rule);margin-bottom:6px}
.issue a{display:grid;grid-template-columns:1fr auto;gap:10px;align-items:baseline;padding:8px 0;border-bottom:1px solid var(--line);font-size:16px;line-height:1.25}
.issue a:hover{color:var(--red)}
.issue a small{font:500 11px/1 var(--sans);color:var(--ink-3);letter-spacing:.06em;white-space:nowrap;display:inline-flex;gap:6px;align-items:center}
.issue a i{display:block;font-style:normal;font:400 13px/1.4 var(--serif);color:var(--ink-2);margin-top:2px}
.lead .kicker{margin-bottom:8px}
.lead h2{font-size:clamp(30px,3.6vw,48px);line-height:1.02;font-variation-settings:"opsz" 48;font-weight:600}
.lead .deck{font-size:clamp(17px,1.5vw,20px);line-height:1.35;font-style:italic;color:var(--ink-2);margin-top:12px;font-variation-settings:"opsz" 24}
.lead .byline{margin-top:12px;padding-bottom:12px;border-bottom:1px solid var(--rule)}
.lead .body{column-count:2;column-gap:26px;column-rule:1px solid var(--line);margin-top:14px;font-size:15.5px;line-height:1.55;text-align:justify;hyphens:auto}
.lead .body p{margin-bottom:.8em;break-inside:avoid}
.lead .body p:first-child::first-letter{font-size:3.6em;line-height:.8;float:left;padding:6px 8px 0 0;font-weight:700;color:var(--red)}
.lead .cont{font:600 12px/1 var(--sans);letter-spacing:.08em;text-transform:uppercase;color:var(--red);margin-top:6px;display:inline-flex;gap:6px;align-items:center}
.lead .cta{display:flex;flex-wrap:wrap;gap:8px;margin-top:16px}
.btn{display:inline-flex;align-items:center;gap:8px;padding:10px 14px;border:1px solid var(--rule);font:700 12px/1 var(--sans);letter-spacing:.08em;text-transform:uppercase;transition:background .2s,color .2s}
.btn:hover{background:var(--ink);color:var(--bg)}
.btn.red{background:var(--red);border-color:var(--red);color:var(--red-ink)}.btn.red:hover{background:var(--ink);border-color:var(--ink);color:var(--bg)}
.btn svg{width:14px;height:14px}
.box{border:1px solid var(--rule);padding:12px 14px;margin-bottom:14px;background:var(--surface)}
.box h3{font:700 11px/1 var(--sans);letter-spacing:.14em;text-transform:uppercase;padding-bottom:8px;border-bottom:1px solid var(--rule);margin-bottom:8px}
.box .big{font:600 34px/1 var(--serif);font-variation-settings:"opsz" 48;letter-spacing:-.02em;display:flex;align-items:baseline;gap:8px}
.box .big small{font:500 11px/1 var(--sans);color:var(--ink-3);letter-spacing:.08em;text-transform:uppercase}
.box dl{display:grid;grid-template-columns:auto 1fr;gap:5px 12px;font-size:13.5px;margin-top:8px}
.box dt{font:600 11px/1.7 var(--sans);letter-spacing:.08em;text-transform:uppercase;color:var(--ink-3)}
.box dd{color:var(--ink-2)}
.box .status{display:flex;align-items:center;gap:8px;font:500 12.5px/1.4 var(--sans);color:var(--ink-2)}
@media (max-width:960px){.front{grid-template-columns:1fr}.front>*{padding:14px 0;border:0!important;border-bottom:1px solid var(--line)!important}.lead .body{column-count:1}}
/* section header */
.sech{display:flex;align-items:center;gap:14px;margin-top:36px;margin-bottom:16px;border-top:3px double var(--rule);border-bottom:1px solid var(--rule);padding-block:8px}
.sech h2{font:700 12px/1 var(--sans);letter-spacing:.16em;text-transform:uppercase}
.sech p{font-size:13.5px;color:var(--ink-2);font-style:italic}
/* stories */
.stories{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:0}
.story{padding:0 22px 22px;border-right:1px solid var(--line);border-bottom:1px solid var(--line);display:grid;gap:10px;align-content:start}
.story:nth-child(3n){border-right:0}.story:nth-child(3n+1){padding-left:0}.story:nth-last-child(-n+1){border-bottom:0}
.story figure{margin:0}
.story img{border:1px solid var(--line)}
.story figcaption{font:500 11px/1.5 var(--sans);color:var(--ink-3);margin-top:6px;letter-spacing:.02em;display:flex;justify-content:space-between;gap:8px}
.story h3{font-size:24px;line-height:1.1;font-variation-settings:"opsz" 36}
.story h3 a:hover{text-decoration:underline;text-underline-offset:4px;text-decoration-thickness:1px}
.story .deck{font-size:15px;color:var(--ink-2);line-height:1.45}
.story .notice{border:1px solid var(--rule);padding:8px 10px;font:500 12px/1.6 var(--sans);color:var(--ink-2)}
.story .notice b{font-weight:700;color:var(--ink);letter-spacing:.06em;text-transform:uppercase;font-size:10.5px;display:block;margin-bottom:2px}
.story .notice code{font-family:ui-monospace,Menlo,Consolas,monospace;font-size:11.5px}
.story .notice button{display:inline-flex;align-items:center;gap:3px;margin-left:4px;padding:0 5px;border:1px solid var(--line);font:600 10px/1.5 var(--sans);color:var(--ink-3)}
.story .notice button:hover{color:var(--ink);border-color:var(--ink)}.story .notice button.copied{color:var(--up);border-color:var(--up)}
.story .links{display:flex;flex-wrap:wrap;gap:6px 14px;font:700 11.5px/1 var(--sans);letter-spacing:.08em;text-transform:uppercase}
.story .links a{border-bottom:1px solid var(--rule);padding-bottom:2px}.story .links a:hover{color:var(--red);border-color:var(--red)}
@media (max-width:960px){.stories{grid-template-columns:1fr 1fr}.story{border-right:0;padding-inline:0}.story:nth-child(2n+1){padding-right:22px;border-right:1px solid var(--line)}.story:nth-child(2n){padding-left:22px}}
@media (max-width:600px){.stories{grid-template-columns:1fr}.story,.story:nth-child(2n+1),.story:nth-child(2n){padding:0 0 18px;border-right:0}}
/* profile + how */
.two{display:grid;grid-template-columns:8fr 4fr;gap:0}
.two>*:first-child{padding-right:26px;border-right:1px solid var(--line)}
.two>*:last-child{padding-left:26px}
.profile h3{font-size:clamp(24px,2.6vw,34px);line-height:1.05;font-variation-settings:"opsz" 36}
.profile .deck{font-style:italic;color:var(--ink-2);margin-top:8px;font-size:17px}
.profile .cols{column-count:2;column-gap:26px;column-rule:1px solid var(--line);margin-top:14px;font-size:15px;line-height:1.55}
.profile .cols p{margin-bottom:.8em;break-inside:avoid}
.profile .cols h4{font:700 11px/1.8 var(--sans);letter-spacing:.12em;text-transform:uppercase;color:var(--red);margin-top:4px}
.profile .cols li{padding-left:12px;text-indent:-12px;margin-bottom:.4em}
.profile .cols li::before{content:"— "}
.how h3{font:700 11px/1 var(--sans);letter-spacing:.14em;text-transform:uppercase;padding-bottom:8px;border-bottom:1px solid var(--rule)}
.how .lead2{font-size:16px;margin-top:10px;font-style:italic;color:var(--ink-2)}
.how dl{margin-top:10px}
.how dl div{padding:8px 0;border-bottom:1px solid var(--line);font-size:14px}
.how dt{font:700 11px/1.8 var(--sans);letter-spacing:.1em;text-transform:uppercase}
.how dd{color:var(--ink-2)}
.how .more{margin-top:12px}
@media (max-width:900px){.two{grid-template-columns:1fr}.two>*{padding:0!important;border:0!important}.two>*:last-child{margin-top:24px}.profile .cols{column-count:1}}
/* classified */
.classified{column-count:3;column-gap:26px;column-rule:1px solid var(--line);font-size:13.5px}
.classified .grp{break-inside:avoid;margin-bottom:14px}
.classified h3{font:700 11px/1 var(--sans);letter-spacing:.14em;text-transform:uppercase;border-bottom:1px solid var(--rule);padding-bottom:6px;margin-bottom:6px}
.classified li{display:flex;justify-content:space-between;gap:8px;padding:3px 0;border-bottom:1px dotted var(--line)}
.classified li b{font:700 11.5px/1.6 var(--sans);color:var(--red)}
.classified li b[title]{cursor:help}
.classified .fn{font:500 12px/1.5 var(--sans);color:var(--ink-3);break-inside:avoid;margin-top:8px}
@media (max-width:900px){.classified{column-count:2}}@media (max-width:560px){.classified{column-count:1}}
/* opinion */
.opinion{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:0}
.opinion a{padding:0 22px;border-right:1px solid var(--line);display:grid;gap:8px;align-content:start}
.opinion a:first-child{padding-left:0}.opinion a:last-child{border-right:0;padding-right:0}
.opinion time{font:600 11px/1 var(--sans);letter-spacing:.1em;text-transform:uppercase;color:var(--ink-3)}
.opinion h3{font-size:22px;line-height:1.15;font-variation-settings:"opsz" 36}
.opinion a:hover h3{text-decoration:underline;text-underline-offset:4px;text-decoration-thickness:1px}
.opinion p{font-size:15px;color:var(--ink-2);line-height:1.45}
@media (max-width:900px){.opinion{grid-template-columns:1fr}.opinion a{padding:0 0 18px;border:0;border-bottom:1px solid var(--line)}}
/* letters */
.letters{display:grid;grid-template-columns:5fr 7fr;gap:0}
.letters>*:first-child{padding-right:26px;border-right:1px solid var(--line)}
.letters>*:last-child{padding-left:26px}
.letters h3{font-size:clamp(26px,3vw,38px);line-height:1.05;font-variation-settings:"opsz" 48}
.letters p{margin-top:10px;color:var(--ink-2);max-width:44ch}
.letters .links{margin-top:14px;display:grid;gap:4px;font-size:15px}
.letters .links a{display:grid;grid-template-columns:90px 1fr;gap:10px;padding:6px 0;border-bottom:1px solid var(--line)}
.letters .links a span:first-child{font:600 11px/1.9 var(--sans);letter-spacing:.1em;text-transform:uppercase;color:var(--ink-3)}
.letters .links a:hover span:last-child{color:var(--red)}
form{display:grid;gap:12px}
.field{display:grid;gap:5px}
.field label{font:700 11px/1 var(--sans);letter-spacing:.12em;text-transform:uppercase;color:var(--ink-3)}
.field input,.field textarea{width:100%;padding:10px 12px;border:1px solid var(--rule);background:var(--surface);color:var(--ink);font-family:var(--serif);font-size:16px;transition:box-shadow .2s}
.field input:focus,.field textarea:focus{outline:none;box-shadow:0 0 0 2px var(--red)}
.field textarea{min-height:130px;resize:vertical}
form .btn{justify-self:start}
.fn{font:500 12px/1.5 var(--sans);color:var(--ink-3)}
.sent{padding:12px;border:1px solid var(--up);font-size:15px}
@media (max-width:900px){.letters{grid-template-columns:1fr}.letters>*{padding:0!important;border:0!important}.letters>*:last-child{margin-top:20px}}
footer{margin-top:36px;padding-block:14px 36px;border-top:3px double var(--rule);display:flex;flex-wrap:wrap;justify-content:space-between;gap:8px 24px;font:500 12px/1.6 var(--sans);color:var(--ink-3);letter-spacing:.04em}
footer a:hover{color:var(--ink)}
html.js [data-reveal]{opacity:0;transform:translateY(8px);transition:opacity .7s var(--ease),transform .7s var(--ease);transition-delay:calc(var(--i,0) * 60ms)}
html.js [data-reveal].is-in{opacity:1;transform:none}
`;

export default {
  id: '08',
  slug: 'broadsheet',
  name: 'Broadsheet',
  concept: 'the newspaper of the work',
  file: '08-broadsheet.html',
  fonts: ['Newsreader:ital,opsz,wght@0,6..72,400..800;1,6..72,400..800', 'Libre Franklin:wght@400;500;600;700'],
  axes: {
    layout: 'A front page: nameplate, lead story with drop cap and columns, an index of the seven apps, a status box; then the apps as illustrated stories, a profile, classifieds, opinion and letters',
    canvas: 'Newsprint / near-black, one red',
    type: 'Newsreader (optical sizes) + Libre Franklin',
    motion: 'Pausable status ticker, columns settle in, headline underlines',
  },
  says: 'You write and you have a point of view. Warm, literate, distinctive without a single animation trick. It will divide people: memorable to some, a costume to others.',
  render(c, h) {
    const t = h.tenure(c.experience.startDate);
    const today = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    const stories = c.demos
      .map((d, i) => `<article class="story" data-reveal id="st-${d.slug}">
  <figure>${h.shot(d)}<figcaption><span>${h.esc(d.name)}, ${d.period}. Screenshot of the live app.</span><span>${h.statusDot(d.slug)} up</span></figcaption></figure>
  <p class="kicker">${h.esc(d.kind)} · ${h.esc(d.langs)}</p>
  <h3><a href="/work/${d.slug}/">${h.esc(d.name)}</a></h3>
  <p class="deck">${h.esc(d.problem)}</p>
  <p class="byline">Built with ${h.esc(d.stack.join(', '))}.</p>
  <div class="notice"><b>Notice</b>${d.credentials.length ? d.credentials.map((cr) => `${h.esc(cr.label)}: <code>${h.esc(cr.user)}</code><button type="button" data-copy="${h.esc(cr.user)}" aria-label="Copy">${h.icon('copy')}</button> <code>${h.esc(cr.pass)}</code><button type="button" data-copy="${h.esc(cr.pass)}" aria-label="Copy">${h.icon('copy')}</button>`).join('<br>') : h.esc(d.note)}</div>
  <div class="links"><a href="${d.demoUrl ?? d.url}" target="_blank" rel="noopener">${d.demoUrl ? 'Open signed in' : 'Open the app'}</a><a href="/work/${d.slug}/">Full story</a>${d.repo ? `<a href="${d.repo}" target="_blank" rel="noopener">Source</a>` : ''}</div>
</article>`)
      .join('');

    return `${h.head({ title: 'Muhammed Kado — Broadsheet', description: c.profile.headline, fonts: this.fonts, light: '#f4f1ea', dark: '#141414', css })}
<body>
<a class="skip" href="#main">Skip to content</a>
<div class="wrap">
<div class="ticker" aria-label="Live status">
  <div class="track">${[0, 1].map(() => `<span data-status-pill data-state="up"><span class="dot"></span><span data-status-text>All systems up · checked 2 min ago</span></span>${c.demos.map((d) => `<span>${h.statusDot(d.slug)}${h.esc(d.name)} · up</span>`).join('')}<span>${t.short} at USTEK RFID · counting</span>`).join('')}</div>
</div>
<header class="mast">
  <div class="dateline"><span>${today}</span><span>İstanbul edition · Vol. 1, No. 7</span><span>${c.profile.tz} · Free</span></div>
  <h1>Muhammed Kado</h1>
  <div class="tag"><span>${h.esc(c.profile.role)}</span><span>·</span><span>The web side of RFID systems</span><span>·</span><span>Est. 2023, İstanbul</span></div>
  <nav aria-label="Sections">${c.nav.map((n) => `<a href="${n.href}">${n.label}</a>`).join('')}</nav>
</header>

<main id="main">
<section class="front">
  <aside class="issue" data-reveal>
    <h2>In this issue</h2>
    ${c.demos.map((d, i) => `<a href="#st-${d.slug}">${h.esc(d.name)}<i>${h.esc(d.short)}, ${d.period}</i><small>${h.statusDot(d.slug)}p. ${i + 2}</small></a>`).join('')}
    <a href="#experience">Profile<i>From degree to production</i><small>p. 9</small></a>
    <a href="#notes">Opinion<i>Three notes from production</i><small>p. 11</small></a>
  </aside>
  <article class="lead" data-reveal id="work">
    <p class="kicker">Lead · Full-stack</p>
    <h2>${h.esc(c.profile.headline)}</h2>
    <p class="deck">Seven applications, deployed and open to anyone; a laundry-management platform in more than thirty countries; and a habit of writing down what broke.</p>
    <p class="byline">By ${h.esc(c.profile.name)} · İstanbul</p>
    <div class="body">
      <p>${h.esc(c.profile.intro)}</p>
      <p>${h.esc(c.experience.summary)} ${h.esc(c.experience.bullets[0])}</p>
      <p>${h.esc(c.experience.bullets[2])} ${h.esc(c.experience.bullets[3])}</p>
    </div>
    <a class="cont" href="#experience">Continued on p. 9 ${h.icon('arrow-right')}</a>
    <div class="cta"><a class="btn red" href="#st-pos">The applications ${h.icon('arrow-down')}</a><a class="btn" href="${c.profile.cv}">CV, PDF</a><a class="btn" href="${c.profile.github}" target="_blank" rel="noopener">GitHub</a></div>
  </article>
  <aside data-reveal>
    <div class="box"><h3>System status</h3><div class="big">7<small>of 7 up</small></div><p class="status">${h.statusPill('status', 'Checked 2 minutes ago · probe every 5 min')}</p></div>
    <div class="box"><h3>At a glance</h3><div class="big">${t.years}<small>yrs</small> ${t.months}<small>mo at USTEK</small></div><dl><dt>Deployed</dt><dd>30+ countries</dd><dt>Languages</dt><dd>Kurdish, Arabic, Turkish, English</dd><dt>Open to</dt><dd>Full-time, remote or İstanbul; freelance</dd><dt>Reply</dt><dd>Within a day</dd></dl></div>
    <div class="box"><h3>Correspondence</h3><dl><dt>Email</dt><dd><a href="mailto:${c.profile.email}">${c.profile.email}</a></dd><dt>WhatsApp</dt><dd><a href="${c.profile.whatsapp}" target="_blank" rel="noopener">${c.profile.phone}</a></dd><dt>LinkedIn</dt><dd><a href="${c.profile.linkedin}" target="_blank" rel="noopener">in/muhammed-kado</a></dd></dl></div>
  </aside>
</section>

<div class="sech" id="apps"><h2>Section A · The applications</h2><p>Seven, each running on the same free machine, each with a demo account or none needed.</p></div>
<section class="stories">${stories}</section>

<div class="sech" id="experience"><h2>Section B · Profile</h2><p>Continued from the front page.</p></div>
<section class="two">
  <article class="profile" data-reveal>
    <p class="kicker">Profile</p>
    <h3>From a computer-engineering degree to production systems used in more than thirty countries</h3>
    <p class="deck">A timeline, newest first.</p>
    <div class="cols">
      ${c.timeline.map((e) => `<h4>${e.from} – ${e.to}${e.live ? ` · ${t.short}, counting` : ''}</h4><p><strong>${h.esc(e.title)}</strong>, ${h.esc(e.org)}, ${h.esc(e.where)}. ${h.esc(e.summary)}</p>${e.bullets.length ? `<ul>${e.bullets.map((b) => `<li>${h.esc(b)}</li>`).join('')}</ul>` : ''}`).join('')}
    </div>
  </article>
  <aside class="how" data-reveal id="how">
    <h3>How this paper is printed</h3>
    <p class="lead2">${h.esc(c.proof.lead)}</p>
    <dl>${c.proof.facts.map((f) => `<div><dt>${h.esc(f.k)}</dt><dd>${h.esc(f.v)}</dd></div>`).join('')}</dl>
    <p class="more"><a class="btn" href="${c.proof.link}">${h.esc(c.proof.linkLabel)}</a></p>
  </aside>
</section>

<div class="sech" id="skills"><h2>Section C · Classified</h2><p>Skills, with the number of projects in this issue that use each.</p></div>
<section class="classified" data-reveal>
  ${c.skills.map((g) => `<div class="grp"><h3>${h.esc(g.group)}</h3><ul>${g.items.map((s) => `<li><span>${h.esc(s.name)}</span>${s.projects.length ? `<b title="${h.esc(s.projects.join(', '))}">${s.projects.length}</b>` : ''}</li>`).join('')}</ul></div>`).join('')}
  <p class="fn">Languages: Kurdish, Arabic, Turkish (native); English (professional). Five of the seven applications ship right-to-left interfaces.</p>
</section>

<div class="sech" id="notes"><h2>Section D · Opinion</h2><p>Notes from production: what broke, and the fix.</p></div>
<section class="opinion">${c.notes.map((n) => `<a href="/notes/${n.slug}/" data-reveal><time datetime="${n.date}">${h.fmtDate(n.date)}</time><h3>${h.esc(n.title)}</h3><p>${h.esc(n.description)}</p></a>`).join('')}</section>

<div class="sech" id="contact"><h2>Letters</h2><p>Replies within a day.</p></div>
<section class="letters">
  <div data-reveal>
    <h3>Hiring a full-stack engineer?</h3>
    <p>${h.esc(c.profile.availability)}</p>
    <div class="links">
      <a href="mailto:${c.profile.email}"><span>Email</span><span>${c.profile.email}</span></a>
      <a href="${c.profile.whatsapp}" target="_blank" rel="noopener"><span>WhatsApp</span><span>${c.profile.phone}</span></a>
      <a href="${c.profile.linkedin}" target="_blank" rel="noopener"><span>LinkedIn</span><span>in/muhammed-kado</span></a>
      <a href="${c.profile.cv}"><span>CV</span><span>Download the PDF</span></a>
    </div>
  </div>
  <form action="/api/contact" method="post" data-reveal novalidate>
    <div class="field"><label for="cf-name">Name</label><input id="cf-name" name="name" type="text" autocomplete="name" required></div>
    <div class="field"><label for="cf-email">Email</label><input id="cf-email" name="email" type="email" autocomplete="email" required></div>
    <div class="field"><label for="cf-msg">Letter</label><textarea id="cf-msg" name="message" required></textarea></div>
    <button class="btn red" type="submit">Send the letter</button>
    <p class="fn">Turnstile-protected. Stored first, forwarded second.</p>
  </form>
</section>
</main>
<footer><span>© 2026 ${h.esc(c.profile.name)} · Printed on one Always-Free VM</span><span><a href="/about-this-site">About this site</a> · <a href="/notes/">Notes</a> · <a href="/rss.xml">RSS</a> · <a href="https://github.com/muhammedkado/mkado.dev" target="_blank" rel="noopener">Source</a></span></footer>
</div>
${h.candidateBar(h.id, h.total)}
${h.revealScript}
${h.copyScript}
<script>(function(){var f=document.querySelector('form');f&&f.addEventListener('submit',function(e){e.preventDefault();var m=document.createElement('p');m.className='sent';m.textContent='Design mockup: on the built site this posts to /api/contact.';f.replaceChildren(m)})})();</script>
</body>
</html>`;
  },
};
