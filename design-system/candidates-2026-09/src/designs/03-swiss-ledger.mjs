// 03 · Swiss Ledger — grid, objective, résumé.
// A twelve-column modular grid, one grotesque in three weights, black on
// white with a single red rule. The work is a real table; the demo accounts
// are a ledger. Nothing decorates: hierarchy comes from scale, weight and
// position. Type: Host Grotesk only.

const css = `
:root{color-scheme:light dark;
--bg:light-dark(#ffffff,#0a0a0a);--ink:light-dark(#0a0a0a,#f4f4f4);--ink-2:light-dark(#444444,#b4b4b4);--ink-3:light-dark(#6a6a6a,#8a8a8a);--line:light-dark(#d9d9d9,#2a2a2a);--line-2:light-dark(#0a0a0a,#f4f4f4);--red:light-dark(#e10600,#ff3b30);--red-ink:light-dark(#ffffff,#0a0a0a);--surface:light-dark(#f4f4f4,#161616);--up:light-dark(#0f7a3a,#3ddc84);--focus:var(--red);
--mark-bg:light-dark(#0a0a0a,#f4f4f4);--mark-fg:light-dark(#ffffff,#0a0a0a);--mark-pulse:var(--red);--mark-dot:var(--red);
--font:"Host Grotesk","Helvetica Neue",Helvetica,Arial,sans-serif;--ease:cubic-bezier(.2,.8,.2,1);--col:minmax(0,1fr);--gap:24px}
:root[data-theme="light"]{color-scheme:light}:root[data-theme="dark"]{color-scheme:dark}
html{scroll-behavior:smooth}
body{background:var(--bg);color:var(--ink);font:15px/1.5 var(--font);padding-inline:clamp(16px,3vw,40px);font-feature-settings:"tnum","ss02"}
.wrap{max-width:1280px;margin:0 auto}
.skip{position:absolute;left:16px;top:-48px;padding:10px 14px;background:var(--ink);color:var(--bg);z-index:50}.skip:focus{top:12px}
.g{display:grid;grid-template-columns:repeat(12,var(--col));gap:var(--gap)}
.c2{grid-column:span 2}.c3{grid-column:span 3}.c4{grid-column:span 4}.c5{grid-column:span 5}.c6{grid-column:span 6}.c7{grid-column:span 7}.c8{grid-column:span 8}.c9{grid-column:span 9}.c10{grid-column:span 10}.c12{grid-column:span 12}
.s7{grid-column:7 / span 4}
.label{font-size:11px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:var(--ink-3)}
h1,h2,h3{font-weight:600;letter-spacing:-.02em}
.rule{height:1px;background:var(--line)}
.rule.strong{background:var(--line-2)}
.rule.red{height:3px;background:var(--red)}
/* top */
.top{padding-block:18px 0}
.top .g{align-items:center}
.top .name{font-size:15px;font-weight:600;display:flex;align-items:center;gap:8px}.top .name svg{flex:none}
.top .meta{font-size:12.5px;color:var(--ink-3)}
.top nav{display:flex;gap:18px;justify-content:flex-end;font-size:13px}
.top nav a{position:relative;padding-block:4px}
.top nav a::after{content:"";position:absolute;left:0;bottom:0;height:2px;width:100%;background:var(--red);transform:scaleX(0);transform-origin:left;transition:transform .4s var(--ease)}
.top nav a:hover::after,.top nav a[aria-current]::after{transform:scaleX(1)}
.status{display:inline-flex;align-items:center;gap:8px;font-size:12.5px;color:var(--ink-2)}
.dot{width:8px;height:8px;border-radius:50%;background:var(--up);flex:none}
[data-state="down"]>.dot{background:var(--red)}
@media (max-width:900px){.top nav{display:none}}
/* hero */
.hero{padding-block:clamp(40px,7vw,96px) clamp(32px,5vw,64px)}
.hero h1{font-size:clamp(40px,7.2vw,104px);line-height:.95;letter-spacing:-.035em;font-weight:700;text-wrap:balance}
.hero h1 .red{color:var(--red)}
.hero .claim{font-size:clamp(18px,1.7vw,22px);line-height:1.35;color:var(--ink);margin-top:0;max-width:34ch;font-weight:500}
.hero .sub{margin-top:14px;color:var(--ink-2);max-width:48ch}
.hero .cta{display:flex;flex-wrap:wrap;gap:8px;margin-top:22px}
.btn{display:inline-flex;align-items:center;gap:8px;padding:11px 16px;border:1px solid var(--line-2);font-weight:600;font-size:13.5px;transition:background .2s,color .2s,transform .3s var(--ease)}
.btn:hover{background:var(--ink);color:var(--bg)}
.btn.red{background:var(--red);border-color:var(--red);color:var(--red-ink)}
.btn.red:hover{background:var(--ink);border-color:var(--ink)}
.btn svg{width:15px;height:15px}
.kv{display:grid;grid-template-columns:auto 1fr;gap:8px 18px;font-size:13.5px;align-content:start}
.kv dt{color:var(--ink-3)}.kv dd{font-weight:500}
.kv dd b{font-weight:700;color:var(--red)}
html.js .hero [data-in]{opacity:0;animation:in .7s var(--ease) forwards;animation-delay:calc(var(--i,0) * 90ms)}
@keyframes in{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
@media (max-width:900px){.hero .c8,.hero .c4,.hero .c6,.hero .c3{grid-column:span 12}.s7,.s4,.s3{grid-column-start:auto}}
/* section */
.sec{padding-block:clamp(36px,5vw,64px)}
.sec .head{grid-column:span 12;display:grid;grid-template-columns:repeat(12,var(--col));gap:var(--gap);padding-bottom:14px;border-bottom:1px solid var(--line-2);margin-bottom:22px;align-items:end}
.sec .head .n{grid-column:span 2;font-size:13px;font-weight:600;color:var(--red)}
.sec .head h2{grid-column:span 6;font-size:clamp(22px,2.6vw,32px);line-height:1.1}
.sec .head p{grid-column:span 4;font-size:13.5px;color:var(--ink-2);text-align:right}
@media (max-width:760px){.sec .head .n,.sec .head h2,.sec .head p{grid-column:span 12}.sec .head p{text-align:left}}
/* thumbs */
.thumbs{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:12px;margin-bottom:22px}
.thumbs a{display:block;position:relative;border:1px solid var(--line);aspect-ratio:1440/900;overflow:hidden;background:var(--surface);transition:border-color .2s}
.thumbs a img{width:100%;height:100%;object-fit:cover;object-position:top;transition:transform .5s var(--ease)}
.thumbs a:hover,.thumbs a.is-on{border-color:var(--red)}
.thumbs a:hover img{transform:scale(1.04)}
.thumbs a span{position:absolute;left:0;top:0;padding:3px 6px;background:var(--bg);font-size:11px;font-weight:600;border-right:1px solid var(--line);border-bottom:1px solid var(--line)}
/* generated media: key visuals in grey on the thumbnail strip (the screenshot on hover or row focus); one plate as a figure under the hero */
.thumbs a img.kv{position:absolute;inset:0;object-position:center;filter:grayscale(1) contrast(1.05);transition:opacity .4s var(--ease),transform .5s var(--ease)}
.thumbs a:hover img.kv,.thumbs a.is-on img.kv,.thumbs a:focus-visible img.kv{opacity:0}
.band{margin-top:clamp(28px,4vw,48px);border-top:3px solid var(--red);aspect-ratio:1440/400;overflow:hidden;background:var(--surface)}
.band img{width:100%;height:100%;object-fit:cover;filter:grayscale(1) contrast(1.02)}
:root[data-theme="dark"] .band img{filter:grayscale(1) invert(1) contrast(1.02)}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]) .band img{filter:grayscale(1) invert(1) contrast(1.02)}}
@media (max-width:560px){.band{aspect-ratio:16/9}}
@media (max-width:900px){.thumbs{grid-template-columns:repeat(4,minmax(0,1fr))}}
@media (max-width:560px){.thumbs{grid-template-columns:repeat(2,minmax(0,1fr))}}
/* table */
.tablewrap{overflow-x:auto;border-top:1px solid var(--line-2)}
table{width:100%;font-size:13.5px;min-width:820px}
th{text-align:left;font-size:11px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-3);padding:10px 10px 10px 0;border-bottom:1px solid var(--line);white-space:nowrap}
td{padding:14px 10px 14px 0;border-bottom:1px solid var(--line);vertical-align:top}
tr:hover td{background:var(--surface)}
td.n{color:var(--red);font-weight:600;width:36px}
td.name{font-weight:600;font-size:15px}
td.name small{display:block;font-weight:400;color:var(--ink-2);font-size:13px;margin-top:3px;max-width:44ch}
td.stack{color:var(--ink-2);max-width:220px}
td.acts{white-space:nowrap}
td.acts a{margin-right:14px;font-weight:600;border-bottom:1px solid var(--line-2)}
td.acts a:hover{color:var(--red);border-color:var(--red)}
td .status{white-space:nowrap}
/* ledger */
.ledger{margin-top:28px}
.ledger h3{font-size:13px;font-weight:600;margin-bottom:10px}
.ledger table{min-width:640px}
.ledger code{font-family:ui-monospace,Menlo,Consolas,monospace;font-size:12.5px}
.copy{display:inline-flex;align-items:center;gap:4px;margin-left:8px;padding:2px 6px;border:1px solid var(--line);font-size:11px;font-weight:600;color:var(--ink-2)}
.copy:hover{border-color:var(--ink);color:var(--ink)}.copy.copied{color:var(--up);border-color:var(--up)}
.ledger .note{margin-top:10px;font-size:12.5px;color:var(--ink-3)}
/* method */
.facts{display:grid;grid-template-columns:repeat(12,var(--col));gap:var(--gap)}
.facts .lead{grid-column:span 5;font-size:clamp(18px,1.8vw,22px);line-height:1.35;font-weight:500}
.facts dl{grid-column:span 7;border-top:1px solid var(--line-2)}
.facts dl div{display:grid;grid-template-columns:120px 1fr;gap:16px;padding:12px 0;border-bottom:1px solid var(--line);font-size:14px}
.facts dt{font-weight:600}.facts dd{color:var(--ink-2)}
.facts .more{grid-column:span 5;margin-top:16px}
@media (max-width:760px){.facts .lead,.facts dl,.facts .more{grid-column:span 12}}
/* experience */
.xp{border-top:1px solid var(--line-2)}
.xp article{display:grid;grid-template-columns:repeat(12,var(--col));gap:var(--gap);padding:22px 0;border-bottom:1px solid var(--line)}
.xp .when{grid-column:span 2;font-weight:600;font-size:13.5px}
.xp .when small{display:block;font-weight:600;color:var(--red);font-size:12px;margin-top:4px}
.xp .who{grid-column:span 4}.xp .who h3{font-size:18px;line-height:1.2}.xp .who p{color:var(--ink-2);font-size:13.5px;margin-top:4px}
.xp .what{grid-column:span 6;color:var(--ink-2);font-size:14px}
.xp .what ul{margin-top:8px;display:grid;gap:5px}
.xp .what li{padding-left:14px;position:relative}.xp .what li::before{content:"—";position:absolute;left:0;color:var(--ink-3)}
@media (max-width:760px){.xp .when,.xp .who,.xp .what{grid-column:span 12}}
/* skills */
.sk{display:grid;grid-template-columns:repeat(12,var(--col));gap:var(--gap)}
.sk .grp{grid-column:span 4;border-top:1px solid var(--line-2);padding-top:10px}
.sk h3{font-size:11px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:var(--ink-3);margin-bottom:8px}
.sk li{display:flex;justify-content:space-between;gap:12px;padding:6px 0;border-bottom:1px solid var(--line);font-size:14px}
.sk li b{color:var(--red);font-weight:600;font-size:13px}
.sk li b[title]{cursor:help}
.sk .foot{grid-column:span 12;font-size:12.5px;color:var(--ink-3);margin-top:6px}
@media (max-width:900px){.sk .grp{grid-column:span 6}}@media (max-width:560px){.sk .grp{grid-column:span 12}}
/* notes */
.nt{border-top:1px solid var(--line-2)}
.nt a{display:grid;grid-template-columns:repeat(12,var(--col));gap:var(--gap);padding:18px 0;border-bottom:1px solid var(--line);align-items:baseline}
.nt time{grid-column:span 2;font-size:13px;color:var(--ink-3)}
.nt h3{grid-column:span 5;font-size:17px;line-height:1.25}
.nt a:hover h3{color:var(--red)}
.nt p{grid-column:span 5;font-size:13.5px;color:var(--ink-2)}
@media (max-width:760px){.nt time,.nt h3,.nt p{grid-column:span 12}}
/* contact */
.ct{display:grid;grid-template-columns:repeat(12,var(--col));gap:var(--gap)}
.ct .say{grid-column:span 5}
.ct .say h2{font-size:clamp(28px,3.4vw,44px);line-height:1.05}
.ct .say p{margin-top:12px;color:var(--ink-2);max-width:42ch}
.ct .say .kv{margin-top:20px}
.ct form{grid-column:7 / span 6;display:grid;gap:12px;align-content:start}
.field{display:grid;gap:5px}
.field label{font-size:11px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-3)}
.field input,.field textarea{width:100%;padding:10px 12px;border:1px solid var(--line-2);background:var(--bg);color:var(--ink);transition:box-shadow .2s}
.field input:focus,.field textarea:focus{outline:none;box-shadow:0 0 0 2px var(--red)}
.field textarea{min-height:120px;resize:vertical}
.ct form .btn{justify-self:start}
.ct .fn{font-size:12.5px;color:var(--ink-3)}
.sent{padding:12px;border:1px solid var(--up);font-size:14px}
@media (max-width:760px){.ct .say,.ct form{grid-column:span 12}}
footer{display:grid;grid-template-columns:repeat(12,var(--col));gap:var(--gap);padding-block:20px 36px;border-top:3px solid var(--red);font-size:12.5px;color:var(--ink-3);margin-top:24px}
footer span{grid-column:span 6}footer span:last-child{text-align:right}
footer a:hover{color:var(--ink)}
@media (max-width:640px){footer span{grid-column:span 12}footer span:last-child{text-align:left}}
html.js .line-draw{transform:scaleX(0);transform-origin:left;transition:transform 1s var(--ease)}
html.js .line-draw.is-in{transform:scaleX(1)}
html.js [data-reveal]:not(.line-draw){opacity:0;transform:translateY(10px);transition:opacity .7s var(--ease),transform .7s var(--ease);transition-delay:calc(var(--i,0) * 50ms)}
html.js [data-reveal].is-in{opacity:1;transform:none}
`;

export default {
  id: '03',
  slug: 'swiss-ledger',
  name: 'Swiss Ledger',
  concept: 'grid · objective · résumé',
  file: '03-swiss-ledger.html',
  fonts: ['Host Grotesk:wght@400;500;600;700'],
  axes: {
    layout: 'Strict 12-column grid; the work is a real table with a thumbnail strip, demo accounts are a ledger',
    canvas: 'White / black, one red rule',
    type: 'Host Grotesk only, three weights',
    motion: 'Rules draw in, red nav marker, nothing else',
  },
  says: 'You are rigorous and you respect the reader’s time. The closest thing to a printed CV that still feels designed. Recruiters will love it; it takes no risks.',
  render(c, h) {
    const t = h.tenure(c.experience.startDate);
    const rows = c.demos
      .map((d, i) => `<tr data-slug="${d.slug}">
  <td class="n">${String(i + 1).padStart(2, '0')}</td>
  <td class="name">${h.esc(d.name)}<small>${h.esc(d.problem)}</small></td>
  <td>${h.esc(d.kind)}</td>
  <td class="stack">${h.esc(d.stack.join(', '))}</td>
  <td>${d.period}</td>
  <td><span class="status" data-status-pill data-state="up">${h.statusDot(d.slug)}<span>up</span></span></td>
  <td class="acts"><a href="${d.demoUrl ?? d.url}" target="_blank" rel="noopener">${d.demoUrl ? 'Open signed in' : 'Open'}</a><a href="/work/${d.slug}/">Case study</a>${d.repo ? `<a href="${d.repo}" target="_blank" rel="noopener">Source</a>` : ''}</td>
</tr>`)
      .join('');
    const ledger = c.demos
      .flatMap((d) => (d.credentials.length ? d.credentials.map((cr) => ({ d, cr })) : [{ d, cr: null }]))
      .map(({ d, cr }) => `<tr><td class="name" style="font-size:13.5px">${h.esc(d.name)}</td><td>${cr ? h.esc(cr.label) : '—'}</td><td>${cr ? `<code>${h.esc(cr.user)}</code><button class="copy" type="button" data-copy="${h.esc(cr.user)}" aria-label="Copy">${h.icon('copy')}copy</button>` : `<span style="color:var(--ink-3)">no sign-in</span>`}</td><td>${cr ? `<code>${h.esc(cr.pass)}</code><button class="copy" type="button" data-copy="${h.esc(cr.pass)}" aria-label="Copy">${h.icon('copy')}copy</button>` : ''}</td><td style="color:var(--ink-2)">${h.esc(d.note)}</td></tr>`)
      .join('');

    return `${h.head({ title: 'Muhammed Kado — Swiss Ledger', description: c.profile.headline, fonts: this.fonts, light: '#ffffff', dark: '#0a0a0a', css })}
<body>
<a class="skip" href="#main">Skip to content</a>
<div class="wrap">
<header class="top">
  <div class="g">
    <div class="c3"><div class="name">${h.hasLogo ? h.mark({ size: 22 }) : ''}${h.esc(c.profile.name)}</div><div class="meta">${h.esc(c.profile.role)} · ${h.esc(c.profile.location)}</div></div>
    <div class="c3">${h.statusPill('status', 'All systems up · 2 min ago')}</div>
    <nav class="c6" aria-label="Sections">${c.nav.map((n) => `<a href="${n.href}">${n.label}</a>`).join('')}</nav>
  </div>
  <div class="rule red" style="margin-top:14px"></div>
</header>

<main id="main">
<section class="hero">
  <div class="g">
    <h1 class="c8" data-in style="--i:0">Muhammed<br>Kado<span class="red">.</span></h1>
    <dl class="kv c4" data-in style="--i:1">
      <dt>Role</dt><dd>${h.esc(c.profile.role)}</dd>
      <dt>Employer</dt><dd>${h.esc(c.experience.company)}, ${h.esc(c.experience.period)}</dd>
      <dt>Tenure</dt><dd><b>${t.short}</b></dd>
      <dt>Deployed</dt><dd>30+ countries</dd>
      <dt>Live apps</dt><dd>7 of 7 up</dd>
      <dt>Languages</dt><dd>KU · AR · TR · EN</dd>
      <dt>Open to</dt><dd>Full-time · freelance</dd>
    </dl>
  </div>
  <div class="g" style="margin-top:clamp(28px,4vw,48px)">
    <p class="claim c6" data-in style="--i:2">${h.esc(c.profile.headline)}</p>
    <div class="c4 s7" data-in style="--i:3">
      <p class="sub" style="margin-top:0">${h.esc(c.profile.plain)} At USTEK, a laundry-management platform for commercial laundries, hotels and hospitals.</p>
      <div class="cta"><a class="btn red" href="#work">Work ${h.icon('arrow-down')}</a><a class="btn" href="${c.profile.cv}">CV, PDF</a><a class="btn" href="${c.profile.github}" target="_blank" rel="noopener">GitHub</a><a class="btn" href="${c.profile.linkedin}" target="_blank" rel="noopener">LinkedIn</a></div>
    </div>
  </div>
  ${h.hasMedia('plate-swiss-ledger') ? `<figure class="band" data-in style="--i:4" aria-hidden="true">${h.picture('plate-swiss-ledger', { sizes: '100vw', loading: 'eager' })}</figure>` : ''}
</section>

<section class="sec" id="work">
  <div class="head" data-reveal><span class="n">1</span><h2>Live applications</h2><p>Seven, each deployed and open. Data resets nightly.</p></div>
  <div class="thumbs" data-reveal>${c.demos.map((d, i) => `<a href="${d.demoUrl ?? d.url}" target="_blank" rel="noopener" data-thumb="${d.slug}" aria-label="${h.esc(d.name)}">${h.shot(d)}${h.keyVisual(d, 'class="kv"', { fallback: false })}<span>${String(i + 1).padStart(2, '0')}</span></a>`).join('')}</div>
  <div class="tablewrap" data-reveal>
    <table>
      <thead><tr><th>№</th><th>Application</th><th>Type</th><th>Stack</th><th>Year</th><th>Status</th><th>Links</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
  </div>
  <div class="ledger" data-reveal>
    <h3>Demo accounts</h3>
    <div class="tablewrap"><table><thead><tr><th>Application</th><th>Account</th><th>User</th><th>Password</th><th>Note</th></tr></thead><tbody>${ledger}</tbody></table></div>
    <p class="note">Registration is closed on every app; the accounts above are re-created each night.</p>
  </div>
</section>

<section class="sec" id="how">
  <div class="head" data-reveal><span class="n">2</span><h2>Method</h2><p>How seven apps run on one free machine.</p></div>
  <div class="facts">
    <p class="lead" data-reveal>${h.esc(c.proof.lead)}</p>
    <dl data-reveal>${c.proof.facts.map((f) => `<div><dt>${h.esc(f.k)}</dt><dd>${h.esc(f.v)}</dd></div>`).join('')}</dl>
    <p class="more" data-reveal><a class="btn" href="${c.proof.link}">${h.esc(c.proof.linkLabel)} ${h.icon('arrow-right')}</a></p>
  </div>
</section>

<section class="sec" id="experience">
  <div class="head" data-reveal><span class="n">3</span><h2>Experience</h2><p>Newest first.</p></div>
  <div class="xp">
    ${c.timeline.map((e) => `<article data-reveal>
      <div class="when">${e.from}–${e.to}${e.live ? `<small>${t.short}, counting</small>` : ''}</div>
      <div class="who"><h3>${h.esc(e.title)}</h3><p>${h.esc(e.org)}, ${h.esc(e.where)}</p></div>
      <div class="what">${h.esc(e.summary)}${e.bullets.length ? `<ul>${e.bullets.map((b) => `<li>${h.esc(b)}</li>`).join('')}</ul>` : ''}</div>
    </article>`).join('')}
  </div>
</section>

<section class="sec" id="skills">
  <div class="head" data-reveal><span class="n">4</span><h2>Skills</h2><p>The figure is the number of projects above that ship the skill.</p></div>
  <div class="sk">
    ${c.skills.map((g) => `<div class="grp" data-reveal><h3>${h.esc(g.group)}</h3><ul>${g.items.map((s) => `<li><span>${h.esc(s.name)}</span>${s.projects.length ? `<b title="${h.esc(s.projects.join(', '))}">${s.projects.length}</b>` : ''}</li>`).join('')}</ul></div>`).join('')}
    <p class="foot">Languages: Kurdish, Arabic, Turkish (native), English (professional). Five of the seven apps ship right-to-left interfaces.</p>
  </div>
</section>

<section class="sec" id="notes">
  <div class="head" data-reveal><span class="n">5</span><h2>Notes</h2><p>What broke, and the fix.</p></div>
  <div class="nt">${c.notes.map((n) => `<a href="/notes/${n.slug}/" data-reveal><time datetime="${n.date}">${h.fmtDate(n.date)}</time><h3>${h.esc(n.title)}</h3><p>${h.esc(n.description)}</p></a>`).join('')}</div>
</section>

<section class="sec" id="contact">
  <div class="head" data-reveal><span class="n">6</span><h2>Contact</h2><p>Replies within a day.</p></div>
  <div class="ct">
    <div class="say" data-reveal>
      <h2>Hiring a full-stack engineer?</h2>
      <p>${h.esc(c.profile.availability)}</p>
      <dl class="kv">
        <dt>Email</dt><dd><a href="mailto:${c.profile.email}">${c.profile.email}</a></dd>
        <dt>WhatsApp</dt><dd><a href="${c.profile.whatsapp}" target="_blank" rel="noopener">${c.profile.phone}</a></dd>
        <dt>LinkedIn</dt><dd><a href="${c.profile.linkedin}" target="_blank" rel="noopener">in/muhammed-kado</a></dd>
        <dt>CV</dt><dd><a href="${c.profile.cv}">PDF</a></dd>
      </dl>
    </div>
    <form action="/api/contact" method="post" data-reveal novalidate>
      <div class="field"><label for="cf-name">Name</label><input id="cf-name" name="name" type="text" autocomplete="name" required></div>
      <div class="field"><label for="cf-email">Email</label><input id="cf-email" name="email" type="email" autocomplete="email" required></div>
      <div class="field"><label for="cf-msg">Message</label><textarea id="cf-msg" name="message" required></textarea></div>
      <button class="btn red" type="submit">Send</button>
      <p class="fn">Turnstile-protected. Stored, then forwarded.</p>
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
  var thumbs=[].slice.call(document.querySelectorAll('[data-thumb]')),rows=[].slice.call(document.querySelectorAll('tbody tr[data-slug]'));
  rows.forEach(function(r){r.addEventListener('mouseenter',function(){thumbs.forEach(function(t){t.classList.toggle('is-on',t.dataset.thumb===r.dataset.slug)})});r.addEventListener('mouseleave',function(){thumbs.forEach(function(t){t.classList.remove('is-on')})})});
  var links=[].slice.call(document.querySelectorAll('.top nav a')),secs=links.map(function(a){return document.querySelector(a.getAttribute('href'))}).filter(Boolean);
  if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){links.forEach(function(a){if(a.getAttribute('href')==='#'+e.target.id)a.setAttribute('aria-current','true');else a.removeAttribute('aria-current')})}})},{rootMargin:'-40% 0px -55% 0px'});secs.forEach(function(s){io.observe(s)})}
  var f=document.querySelector('form');f&&f.addEventListener('submit',function(e){e.preventDefault();var m=document.createElement('p');m.className='sent';m.textContent='Design mockup: on the built site this posts to /api/contact.';f.replaceChildren(m)});
})();
</script>
</body>
</html>`;
  },
};
