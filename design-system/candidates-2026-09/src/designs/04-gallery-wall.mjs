// 04 · Gallery Wall — media-first, bright, tactile.
// The screenshots are the page: a tight-guttered wall of seven tiles at
// mixed sizes, captions that slide up on hover, and only as much text as the
// wall needs. Type: Gabarito for titles, Figtree for everything else.

const css = `
:root{color-scheme:light dark;
--bg:light-dark(#fafaf7,#17181a);--surface:light-dark(#ffffff,#1f2124);--surface-2:light-dark(#f1f1ec,#26292d);--ink:light-dark(#17181a,#f2f2ef);--ink-2:light-dark(#4a4d52,#b5b7bb);--ink-3:light-dark(#66696f,#8c8f95);--line:light-dark(#e4e4df,#2c2f33);--accent:light-dark(#0b6e86,#67e8f9);--accent-ink:light-dark(#ffffff,#0b1114);--accent-fill:light-dark(#0b6e86,#22d3ee);--accent-soft:light-dark(#dff6fb,#0f2a30);--up:light-dark(#15803d,#4ade80);--focus:var(--accent);
--mark-bg:light-dark(#17181a,#f2f2ef);--mark-fg:light-dark(#fafaf7,#17181a);--mark-pulse:var(--accent-fill);--mark-dot:var(--accent-fill);
--display:"Gabarito",system-ui,sans-serif;--body:"Figtree",system-ui,sans-serif;--ease:cubic-bezier(.2,.9,.25,1);--r:6px;--gap:8px}
:root[data-theme="light"]{color-scheme:light}:root[data-theme="dark"]{color-scheme:dark}
html{scroll-behavior:smooth}
body{background:var(--bg);color:var(--ink);font:15.5px/1.55 var(--body);padding-inline:clamp(12px,2vw,24px)}
.wrap{max-width:1400px;margin:0 auto}
.skip{position:absolute;left:16px;top:-48px;padding:10px 14px;background:var(--ink);color:var(--bg);border-radius:6px;z-index:50}.skip:focus{top:12px}
.label{font:600 11.5px/1 var(--body);letter-spacing:.12em;text-transform:uppercase;color:var(--ink-3)}
h1,h2,h3{font-family:var(--display);font-weight:700;letter-spacing:-.02em;text-wrap:balance}
/* top */
.top{display:flex;align-items:center;justify-content:space-between;gap:16px;padding-block:14px}
.brand{display:flex;align-items:center;gap:10px;font:700 15px/1.2 var(--display)}
.brand small{display:block;font:500 12px/1.3 var(--body);color:var(--ink-3)}
.nav{display:flex;gap:2px}
.nav a{padding:8px 11px;border-radius:999px;font-size:14px;font-weight:500;color:var(--ink-2)}
.nav a:hover{background:var(--surface-2);color:var(--ink)}
.pill{display:inline-flex;align-items:center;gap:8px;padding:7px 12px;border-radius:999px;background:var(--surface-2);font-size:12.5px;font-weight:600;color:var(--ink-2)}
.dot{width:8px;height:8px;border-radius:50%;background:var(--up);flex:none}
[data-state="down"]>.dot{background:#ef4444}
@media (max-width:900px){.nav{display:none}.pill span:last-child{display:none}}
/* intro */
.intro{display:grid;grid-template-columns:minmax(0,8fr) minmax(0,4fr);gap:24px;align-items:end;padding-block:clamp(28px,5vw,64px) clamp(20px,3vw,32px)}
.intro h1{font-size:clamp(34px,5.6vw,76px);line-height:.98;font-weight:800;letter-spacing:-.035em}
.intro h1 span{color:var(--accent)}
.intro .side{display:grid;gap:12px;justify-items:start}
.intro .side p{color:var(--ink-2);max-width:40ch}
.cta{display:flex;flex-wrap:wrap;gap:8px}
.btn{display:inline-flex;align-items:center;gap:8px;padding:11px 16px;border-radius:999px;font-weight:600;font-size:14px;background:var(--surface-2);color:var(--ink);transition:transform .35s var(--ease),background .2s,color .2s}
.btn:hover{transform:translateY(-2px);background:var(--ink);color:var(--bg)}
.btn.primary{background:var(--accent-fill);color:var(--accent-ink)}
.btn.primary:hover{background:var(--ink);color:var(--bg)}
.btn svg{width:15px;height:15px}
html.js .intro>*{opacity:0;animation:rise .8s var(--ease) forwards}html.js .intro>*:nth-child(2){animation-delay:.2s}
@keyframes rise{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
@media (max-width:900px){.intro{grid-template-columns:1fr}}
/* wall */
.wall{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));grid-auto-rows:clamp(150px,17vw,250px);gap:var(--gap);grid-auto-flow:dense}
.tile{position:relative;overflow:hidden;border-radius:var(--r);background:var(--surface-2);grid-column:span var(--c,2);grid-row:span var(--rw,1);outline:1px solid var(--line);outline-offset:-1px}
.tile img{width:100%;height:100%;object-fit:cover;object-position:top;transition:transform .9s var(--ease)}
.tile:hover img{transform:scale(1.035)}
.tile .open{position:absolute;inset:0;z-index:1}
.tile .open:focus-visible{outline:3px solid var(--accent);outline-offset:-3px}
.tile .cap{position:absolute;left:0;right:0;bottom:0;z-index:2;padding:14px 16px 14px;color:#fff;background:linear-gradient(180deg,transparent,rgba(10,12,14,.78) 60%);pointer-events:none;display:grid;gap:8px}
.tile .cap .row{display:flex;justify-content:space-between;align-items:baseline;gap:12px}
.tile .cap h3{font-size:clamp(17px,1.6vw,22px);line-height:1.1;color:#fff}
.tile .cap .kind{font-size:12px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;opacity:.85;white-space:nowrap;display:inline-flex;gap:8px;align-items:center}
.tile .cap .more{display:grid;gap:10px;max-height:0;opacity:0;transform:translateY(8px);transition:max-height .5s var(--ease),opacity .4s var(--ease),transform .5s var(--ease);overflow:hidden}
.tile:hover .cap .more,.tile:focus-within .cap .more{max-height:200px;opacity:1;transform:none}
.tile .cap p{font-size:13.5px;line-height:1.45;color:rgba(255,255,255,.92);max-width:52ch}
.tile .cap .acts{display:flex;gap:8px;flex-wrap:wrap;pointer-events:auto}
.tile .cap .acts a{display:inline-flex;align-items:center;gap:6px;padding:7px 11px;border-radius:999px;background:#fff;color:#17181a;font-size:12.5px;font-weight:600}
.tile .cap .acts a:hover{background:var(--accent-fill);color:var(--accent-ink)}
.tile .cap .acts a.ghost{background:rgba(255,255,255,.18);color:#fff;backdrop-filter:blur(6px)}
.tile .cap .creds{font-size:12px;color:rgba(255,255,255,.85);font-family:ui-monospace,Menlo,Consolas,monospace}
.t-pos{--c:4;--rw:2}.t-besttrend{--c:2}.t-besttrend-api{--c:2}.t-invoice{--c:3}.t-findjob{--c:3}.t-tireshop{--c:2}.t-timezone{--c:4}
@media (max-width:900px){.wall{grid-template-columns:repeat(2,minmax(0,1fr));grid-auto-rows:clamp(150px,30vw,220px)}.t-pos{--c:2;--rw:2}.t-besttrend,.t-besttrend-api,.t-invoice,.t-findjob,.t-tireshop{--c:1;--rw:1}.t-timezone{--c:2}.tile .cap .more{display:none}.tile .cap h3{font-size:15px}.tile .cap .kind{display:none}}
@media (hover:none){.tile .cap .more{max-height:200px;opacity:1;transform:none}}
.wall-note{display:flex;flex-wrap:wrap;justify-content:space-between;gap:8px 24px;padding-block:14px 6px;font-size:13px;color:var(--ink-3)}
/* bands */
.sec{padding-block:clamp(40px,6vw,80px);border-top:1px solid var(--line)}
.sec-head{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:end;gap:10px 32px;margin-bottom:clamp(20px,3vw,36px)}
.sec-head h2{font-size:clamp(26px,3.4vw,44px);line-height:1.05}
.sec-head p{color:var(--ink-2);max-width:50ch}
.about{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(20px,3vw,40px)}
.about h2{font-size:clamp(26px,3vw,40px);line-height:1.05}
.about p{color:var(--ink-2)}
.about .big{font:800 clamp(44px,5vw,72px)/1 var(--display);letter-spacing:-.04em;color:var(--accent)}
.about .big small{font:600 13px/1 var(--body);letter-spacing:.08em;text-transform:uppercase;color:var(--ink-3);margin-left:8px}
.about .col{display:grid;gap:12px;align-content:start}
@media (max-width:900px){.about{grid-template-columns:1fr}}
.facts{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:0;border:1px solid var(--line);border-radius:10px;overflow:hidden;background:var(--surface)}
.facts div{padding:18px;border-right:1px solid var(--line)}
.facts div:last-child{border-right:0}
.facts dt{font:700 14px/1.2 var(--display);margin-bottom:8px;color:var(--accent)}
.facts dd{font-size:13.5px;color:var(--ink-2)}
@media (max-width:1000px){.facts{grid-template-columns:repeat(2,minmax(0,1fr))}.facts div{border-bottom:1px solid var(--line)}.facts div:nth-child(2n){border-right:0}}
@media (max-width:560px){.facts{grid-template-columns:1fr}.facts div{border-right:0}}
.two{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:clamp(24px,4vw,64px)}
@media (max-width:900px){.two{grid-template-columns:1fr}}
.xp article{padding:18px 0;border-bottom:1px solid var(--line);display:grid;grid-template-columns:120px 1fr;gap:12px 20px}
.xp .when{font:600 13px/1.5 var(--body);color:var(--ink-3)}
.xp .when b{display:block;color:var(--accent);font-size:13px}
.xp h3{font-size:19px;line-height:1.2}
.xp .org{color:var(--ink-2);font-size:14px}
.xp p{margin-top:8px;color:var(--ink-2);font-size:14.5px}
.xp ul{margin-top:8px;display:grid;gap:5px;font-size:14px;color:var(--ink-2)}
.xp li{padding-left:14px;position:relative}.xp li::before{content:"";position:absolute;left:0;top:.7em;width:6px;height:6px;border-radius:50%;background:var(--accent-fill)}
@media (max-width:560px){.xp article{grid-template-columns:1fr}}
.sk{display:grid;gap:16px}
.sk h3{font:600 11.5px/1 var(--body);letter-spacing:.12em;text-transform:uppercase;color:var(--ink-3);margin-bottom:8px}
.sk ul{display:flex;flex-wrap:wrap;gap:6px}
.sk li{display:inline-flex;align-items:center;gap:8px;padding:7px 11px;border-radius:999px;background:var(--surface-2);font-size:13.5px;font-weight:500}
.sk li b{font-size:12px;color:var(--accent)}
.sk li b[title]{cursor:help}
.notes{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:var(--gap)}
.notes a{display:grid;gap:10px;padding:22px;border-radius:10px;background:var(--surface-2);transition:transform .4s var(--ease),background .2s}
.notes a:hover{transform:translateY(-4px);background:var(--accent-soft)}
.notes time{font-size:12px;font-weight:600;color:var(--ink-3);letter-spacing:.06em}
.notes h3{font-size:19px;line-height:1.2}
.notes p{font-size:14px;color:var(--ink-2)}
.notes .go{margin-top:auto;font-weight:600;color:var(--accent);display:inline-flex;align-items:center;gap:6px}
@media (max-width:900px){.notes{grid-template-columns:1fr}}
.contact{display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);gap:clamp(24px,4vw,64px)}
.contact h2{font-size:clamp(30px,4vw,52px);line-height:1}
.contact p{margin-top:12px;color:var(--ink-2);max-width:44ch}
.links{margin-top:20px;display:flex;flex-wrap:wrap;gap:8px}
form{display:grid;gap:12px;padding:22px;border-radius:12px;background:var(--surface-2)}
.field{display:grid;gap:5px}
.field label{font:600 12px/1 var(--body);color:var(--ink-2)}
.field input,.field textarea{width:100%;padding:11px 13px;border-radius:8px;background:var(--surface);color:var(--ink);border:1px solid var(--line);transition:border-color .2s,box-shadow .2s}
.field input:focus,.field textarea:focus{outline:none;border-color:var(--accent);box-shadow:0 0 0 3px var(--accent-soft)}
.field textarea{min-height:120px;resize:vertical}
form .btn{justify-self:start}
.fn{font-size:12.5px;color:var(--ink-3)}
.sent{padding:12px;border-radius:8px;background:var(--surface);border:1px solid var(--up);font-size:14px}
@media (max-width:900px){.contact{grid-template-columns:1fr}}
footer{display:flex;flex-wrap:wrap;justify-content:space-between;gap:10px 24px;padding-block:24px 36px;border-top:1px solid var(--line);font-size:13px;color:var(--ink-3)}
footer a:hover{color:var(--ink)}
html.js [data-reveal]{opacity:0;transform:translateY(12px) scale(.985);transition:opacity .8s var(--ease),transform .8s var(--ease);transition-delay:calc(var(--i,0) * 55ms)}
html.js [data-reveal].is-in{opacity:1;transform:none}
`;

export default {
  id: '04',
  slug: 'gallery-wall',
  name: 'Gallery Wall',
  concept: 'media-first · bright · tactile',
  file: '04-gallery-wall.html',
  fonts: ['Gabarito:wght@500;600;700;800', 'Figtree:wght@400;500;600'],
  axes: {
    layout: 'A tight-guttered wall of the seven screenshots at mixed sizes; captions slide up on hover, everything else is short bands below',
    canvas: 'Off-white / charcoal, cyan accent',
    type: 'Gabarito + Figtree',
    motion: 'Tiles scale in as you scroll, hover zoom, captions slide up',
  },
  says: 'You have shipped a lot of visible product and you are proud of it. Fast to scan on a phone. Best if the screenshots are strong; weaker if you want the story to lead.',
  render(c, h) {
    const t = h.tenure(c.experience.startDate);
    const tiles = c.demos
      .map((d, i) => `<article class="tile t-${d.slug}" data-reveal>
  ${h.shot(d)}
  <a class="open" href="${d.demoUrl ?? d.url}" target="_blank" rel="noopener" aria-label="Open ${h.esc(d.name)}${d.demoUrl ? ', signed in' : ''}"></a>
  <div class="cap">
    <div class="row"><h3>${h.esc(d.name)}</h3><span class="kind">${h.statusDot(d.slug)}${h.esc(d.kind)} · ${d.period}</span></div>
    <div class="more">
      <p>${h.esc(d.problem)}</p>
      ${d.credentials.length ? `<div class="creds">${h.esc(d.credentials[0].user)} / ${h.esc(d.credentials[0].pass)}</div>` : ''}
      <div class="acts"><a href="${d.demoUrl ?? d.url}" target="_blank" rel="noopener">${d.demoUrl ? 'Open signed in' : 'Open'} ${h.icon('arrow-up-right')}</a><a class="ghost" href="/work/${d.slug}/">Case study</a>${d.repo ? `<a class="ghost" href="${d.repo}" target="_blank" rel="noopener">${h.icon('github')} Source</a>` : ''}</div>
    </div>
  </div>
</article>`)
      .join('');

    return `${h.head({ title: 'Muhammed Kado — Gallery Wall', description: c.profile.headline, fonts: this.fonts, light: '#fafaf7', dark: '#17181a', css })}
<body>
<a class="skip" href="#main">Skip to content</a>
<div class="wrap">
<header class="top">
  <a class="brand" href="#top">${h.mark({ size: 32, font: 'Gabarito, system-ui, sans-serif' })}<span>${h.esc(c.profile.name)}<small>${h.esc(c.profile.role)} · İstanbul</small></span></a>
  <nav class="nav" aria-label="Sections">${c.nav.map((n) => `<a href="${n.href}">${n.label}</a>`).join('')}</nav>
  ${h.statusPill('pill')}
</header>
<main id="main">
<section class="intro" id="top">
  <h1>Seven apps you can open. <span>Built end to end</span>, running right now.</h1>
  <div class="side">
    <p>${h.esc(c.profile.headline)} ${h.esc(c.profile.plain)}</p>
    <div class="cta"><a class="btn primary" href="#work">See the wall ${h.icon('arrow-down')}</a><a class="btn" href="${c.profile.cv}">${h.icon('download')} CV</a><a class="btn" href="${c.profile.github}" target="_blank" rel="noopener">${h.icon('github')} GitHub</a></div>
  </div>
</section>

<section id="work" aria-label="Live applications">
  <div class="wall">${tiles}</div>
  <div class="wall-note"><span>Hover or focus a tile for the problem it solves and the demo account. Every app resets nightly.</span><span>Screenshots are the live apps, captured 1440×900.</span></div>
</section>

<section class="sec" id="experience">
  <div class="about">
    <div class="col" data-reveal><p class="label">Since 2023</p><h2>The web side of RFID systems</h2><p>${h.esc(c.experience.summary)}</p></div>
    <div class="col" data-reveal><p class="label">At USTEK RFID</p><div class="big">${t.years}.${Math.round((t.months / 12) * 10)}<small>years, counting</small></div><p>${h.esc(c.experience.bullets[0])}</p><p>${h.esc(c.experience.bullets[2])}</p></div>
    <div class="col" data-reveal><p class="label">Open to</p><h2 style="font-size:clamp(22px,2.2vw,30px)">Full-time, remote or İstanbul. Freelance too.</h2><p>Native Kurdish, Arabic and Turkish; professional English. Five of the seven apps ship right-to-left.</p><div class="cta"><a class="btn primary" href="#contact">Get in touch ${h.icon('arrow-right')}</a></div></div>
  </div>
</section>

<section class="sec" id="how">
  <div class="sec-head" data-reveal><h2>${h.esc(c.proof.title)}</h2><p>${h.esc(c.proof.lead)} <a href="${c.proof.link}" style="color:var(--accent);font-weight:600">${h.esc(c.proof.linkLabel)} →</a></p></div>
  <dl class="facts" data-reveal>${c.proof.facts.map((f) => `<div><dt>${h.esc(f.k)}</dt><dd>${h.esc(f.v)}</dd></div>`).join('')}</dl>
</section>

<section class="sec" id="skills">
  <div class="two">
    <div>
      <div class="sec-head" data-reveal><h2>Timeline</h2></div>
      <div class="xp">${c.timeline.map((e) => `<article data-reveal><div class="when">${e.from} – ${e.to}${e.live ? `<b>${t.short}, counting</b>` : ''}</div><div><h3>${h.esc(e.title)}</h3><div class="org">${h.esc(e.org)} · ${h.esc(e.where)}</div><p>${h.esc(e.summary)}</p>${e.bullets.length ? `<ul>${e.bullets.slice(1).map((b) => `<li>${h.esc(b)}</li>`).join('')}</ul>` : ''}</div></article>`).join('')}</div>
    </div>
    <div>
      <div class="sec-head" data-reveal><h2>Skills, with evidence</h2><p>The number is how many projects here ship it.</p></div>
      <div class="sk">${c.skills.map((g) => `<div data-reveal><h3>${h.esc(g.group)}</h3><ul>${g.items.map((s) => `<li>${h.esc(s.name)}${s.projects.length ? `<b title="${h.esc(s.projects.join(', '))}">${s.projects.length}</b>` : ''}</li>`).join('')}</ul></div>`).join('')}</div>
    </div>
  </div>
</section>

<section class="sec" id="notes">
  <div class="sec-head" data-reveal><h2>Notes</h2><p>What broke, and what fixed it.</p></div>
  <div class="notes">${c.notes.map((n) => `<a href="/notes/${n.slug}/" data-reveal><time datetime="${n.date}">${h.fmtDate(n.date)}</time><h3>${h.esc(n.title)}</h3><p>${h.esc(n.description)}</p><span class="go">Read ${h.icon('arrow-right')}</span></a>`).join('')}</div>
</section>

<section class="sec" id="contact">
  <div class="contact">
    <div data-reveal>
      <p class="label">Contact</p>
      <h2>Hiring a full-stack engineer?</h2>
      <p>${h.esc(c.profile.availability)} I reply within a day.</p>
      <div class="links"><a class="btn" href="mailto:${c.profile.email}">${h.icon('mail')} Email</a><a class="btn" href="${c.profile.whatsapp}" target="_blank" rel="noopener">${h.icon('whatsapp')} WhatsApp</a><a class="btn" href="${c.profile.linkedin}" target="_blank" rel="noopener">${h.icon('linkedin')} LinkedIn</a><a class="btn" href="${c.profile.cv}">${h.icon('download')} CV</a></div>
    </div>
    <form action="/api/contact" method="post" data-reveal novalidate>
      <div class="field"><label for="cf-name">Your name</label><input id="cf-name" name="name" type="text" autocomplete="name" required></div>
      <div class="field"><label for="cf-email">Email</label><input id="cf-email" name="email" type="email" autocomplete="email" required></div>
      <div class="field"><label for="cf-msg">Message</label><textarea id="cf-msg" name="message" required></textarea></div>
      <button class="btn primary" type="submit">Send message ${h.icon('arrow-right')}</button>
      <p class="fn">Protected by Turnstile. Stored first, forwarded second.</p>
    </form>
  </div>
</section>
</main>
<footer><span>© 2026 ${h.esc(c.profile.name)}</span><span><a href="/about-this-site">About this site</a> · <a href="/notes/">Notes</a> · <a href="/rss.xml">RSS</a> · <a href="https://github.com/muhammedkado/mkado.dev" target="_blank" rel="noopener">Source</a></span></footer>
</div>
${h.candidateBar(h.id, h.total)}
${h.revealScript}
<script>(function(){var f=document.querySelector('form');f&&f.addEventListener('submit',function(e){e.preventDefault();var m=document.createElement('p');m.className='sent';m.textContent='Design mockup: on the built site this posts to /api/contact.';f.replaceChildren(m)})})();</script>
</body>
</html>`;
  },
};
