// 05 · Reel — cinematic, horizontal, bold.
// The seven apps are a reel you scroll sideways: a native scroll-snap track
// (keyboard, touch and trackpad all work; the page body never scrolls
// sideways), a progress bar and a kinetic counter. Everything after the reel
// reads like credits. Type: Syne for titles, Hanken Grotesk for text.

const css = `
:root{color-scheme:light dark;
--bg:light-dark(#f6f1e7,#0a1230);--surface:light-dark(#fffdf8,#111a3d);--ink:light-dark(#0a1230,#f6f1e7);--ink-2:light-dark(#3e4560,#c3beb0);--ink-3:light-dark(#5c6380,#9a968b);--line:light-dark(#ddd6c7,#222c55);--line-2:light-dark(#0a1230,#f6f1e7);--amber:#f2b33d;--amber-ink:#0a1230;--amber-text:light-dark(#7a5300,#f2b33d);--band-bg:light-dark(#0a1230,#f6f1e7);--band-ink:light-dark(#f6f1e7,#0a1230);--band-2:light-dark(#c3beb0,#3e4560);--band-hi:light-dark(#f2b33d,#7a5300);--up:light-dark(#0f7a3a,#4ade80);--focus:var(--amber-text);
--mark-bg:light-dark(#0a1230,#f6f1e7);--mark-fg:light-dark(#f6f1e7,#0a1230);--mark-pulse:#f2b33d;--mark-dot:#f2b33d;
--display:"Syne",system-ui,sans-serif;--body:"Hanken Grotesk",system-ui,sans-serif;--ease:cubic-bezier(.16,1,.3,1)}
:root[data-theme="light"]{color-scheme:light}:root[data-theme="dark"]{color-scheme:dark}
html{scroll-behavior:smooth}
body{background:var(--bg);color:var(--ink);font:16px/1.55 var(--body)}
.pad{padding-inline:clamp(16px,4vw,64px)}
.skip{position:absolute;left:16px;top:-48px;padding:10px 14px;background:var(--ink);color:var(--bg);z-index:50}.skip:focus{top:12px}
.label{font:600 11.5px/1 var(--body);letter-spacing:.16em;text-transform:uppercase;color:var(--ink-3)}
h1,h2,h3{font-family:var(--display);font-weight:800;letter-spacing:-.02em;text-wrap:balance}
/* top */
.top{display:flex;align-items:center;justify-content:space-between;gap:16px;padding-block:18px}
.brand{display:flex;align-items:center;gap:12px;font:700 15px/1.2 var(--display)}
.brand small{display:block;font:500 12px/1.3 var(--body);color:var(--ink-3);letter-spacing:.04em}
.nav{display:flex;gap:18px;font-size:14px;font-weight:600}
.nav a{position:relative;padding-block:4px}.nav a::after{content:"";position:absolute;left:0;bottom:0;width:100%;height:2px;background:var(--amber);transform:scaleX(0);transform-origin:right;transition:transform .4s var(--ease)}.nav a:hover::after{transform:scaleX(1);transform-origin:left}
.pill{display:inline-flex;align-items:center;gap:8px;padding:7px 12px;border:1px solid var(--line);border-radius:999px;font-size:12.5px;font-weight:600;color:var(--ink-2)}
.dot{width:8px;height:8px;border-radius:50%;background:var(--up);flex:none}
[data-state="down"]>.dot{background:#ef4444}
@media (max-width:900px){.nav{display:none}.pill span:last-child{display:none}}
/* hero */
.hero{padding-block:clamp(40px,7vw,96px) clamp(24px,4vw,48px);display:grid;grid-template-columns:1fr;gap:clamp(24px,4vw,48px)}
.hero h1{font-size:clamp(34px,8.6vw,132px);line-height:.9;letter-spacing:-.04em;text-transform:uppercase}
.hero .side{justify-self:end;max-width:560px;width:100%}
@media (max-width:600px){.hero h1{overflow-wrap:anywhere}}
.hero h1 .a{color:var(--amber-text)}
.hero h1 .line{display:block;overflow:hidden}
.hero h1 .line span{display:block}
html.js .hero h1 .line span{transform:translateY(110%);animation:up 1.1s var(--ease) forwards;animation-delay:calc(var(--i) * 120ms + .1s)}
@keyframes up{to{transform:none}}
.hero .side{display:grid;gap:16px}
.hero .side p{color:var(--ink-2);max-width:40ch}
.hero .stat{display:flex;align-items:baseline;gap:10px;padding-top:14px;border-top:1px solid var(--line-2)}
.hero .stat b{font:800 clamp(34px,4vw,56px)/1 var(--display);letter-spacing:-.04em}
.hero .stat span{font-size:13px;color:var(--ink-3);text-transform:uppercase;letter-spacing:.1em;font-weight:600}
html.js .hero .side>*{opacity:0;animation:rise .9s var(--ease) forwards;animation-delay:calc(var(--i,0) * 100ms + .5s)}
@keyframes rise{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
.cta{display:flex;flex-wrap:wrap;gap:8px}
.btn{display:inline-flex;align-items:center;gap:8px;padding:12px 18px;border-radius:999px;font-weight:700;font-size:14px;border:1px solid var(--line-2);color:var(--ink);transition:transform .35s var(--ease),background .2s,color .2s}
.btn:hover{transform:translateY(-2px);background:var(--ink);color:var(--bg)}
.btn.amber{background:var(--amber);border-color:var(--amber);color:var(--amber-ink)}
.btn.amber:hover{background:var(--ink);border-color:var(--ink);color:var(--bg)}
.btn svg{width:15px;height:15px}
/* reel */
.reel-head{display:flex;justify-content:space-between;align-items:end;gap:16px;padding-block:8px 14px}
.reel-head .count{font:800 clamp(28px,3vw,40px)/1 var(--display);letter-spacing:-.03em;font-variant-numeric:tabular-nums}
.reel-head .count small{font:600 12px/1 var(--body);color:var(--ink-3);letter-spacing:.12em;margin-left:6px}
.reel-head .ctl{display:flex;gap:6px}
.reel-head button{width:44px;height:44px;border-radius:50%;border:1px solid var(--line-2);display:inline-flex;align-items:center;justify-content:center;transition:background .2s,color .2s,transform .3s var(--ease)}
.reel-head button:hover{background:var(--ink);color:var(--bg);transform:translateY(-2px)}
.reel-head button svg{width:18px;height:18px}
.progress{height:2px;background:var(--line);position:relative;overflow:hidden}
.progress i{position:absolute;left:0;top:0;bottom:0;width:100%;background:var(--amber);transform-origin:left;transform:scaleX(var(--p,.143));transition:transform .2s linear}
.reel{display:flex;gap:clamp(12px,2vw,24px);overflow-x:auto;overscroll-behavior-x:contain;scroll-snap-type:x mandatory;scroll-padding-inline:clamp(16px,4vw,64px);padding-block:22px 12px;padding-inline:clamp(16px,4vw,64px);scrollbar-width:none;-webkit-overflow-scrolling:touch}
.reel::-webkit-scrollbar{display:none}
.reel:focus-visible{outline:2px solid var(--amber-text);outline-offset:-2px}
.panel{flex:0 0 min(82vw,1080px);scroll-snap-align:start;display:grid;grid-template-columns:minmax(0,7fr) minmax(0,5fr);gap:clamp(14px,2vw,28px);align-items:end}
.panel .frame{position:relative;aspect-ratio:1440/900;overflow:hidden;border-radius:6px;background:var(--surface);box-shadow:0 40px 80px -50px rgba(0,0,0,.55)}
.panel .frame img{width:110%;max-width:none;height:100%;object-fit:cover;object-position:top;transform:translateX(var(--px,0));will-change:transform}
.panel .frame .num{position:absolute;left:14px;bottom:8px;font:800 clamp(64px,9vw,140px)/1 var(--display);letter-spacing:-.06em;color:var(--amber);mix-blend-mode:normal;text-shadow:0 2px 24px rgba(0,0,0,.35)}
/* generated media: key visuals on the reel frames (the screenshot on hover or focus); a haze plate behind the hero */
.panel .frame img.kv{position:absolute;left:0;top:0;object-position:center;transition:opacity .5s var(--ease)}
.panel .frame:hover img.kv,.panel:focus-within .frame img.kv{opacity:0}
@media (hover:none){.panel .frame img.kv{display:none}}
.hero.has-plate{--plate-o:.3;--plate-o-dark:.65}
.hero.has-plate .side{background:color-mix(in srgb,var(--bg) 82%,transparent);padding:16px 18px;border-radius:8px}
.panel .info{display:grid;gap:12px;padding-bottom:6px}
.panel h3{font-size:clamp(24px,2.8vw,40px);line-height:1;letter-spacing:-.03em}
.panel .kind{font:600 12px/1 var(--body);letter-spacing:.12em;text-transform:uppercase;color:var(--ink-3);display:flex;align-items:center;gap:8px}
.panel p{color:var(--ink-2);max-width:44ch;font-size:15px}
.panel .stack{font-size:13px;color:var(--ink-3)}
.panel .creds{font:500 12.5px/1.6 ui-monospace,Menlo,Consolas,monospace;color:var(--ink-2);display:grid;gap:2px}
.panel .creds button{display:inline-flex;align-items:center;gap:4px;margin-left:6px;padding:1px 6px;border:1px solid var(--line);border-radius:4px;font:600 10.5px/1.4 var(--body);color:var(--ink-3)}
.panel .creds button:hover{color:var(--ink);border-color:var(--ink)}.panel .creds button.copied{color:var(--up);border-color:var(--up)}
.panel .acts{display:flex;flex-wrap:wrap;gap:8px}
.panel .acts .btn{padding:10px 14px;font-size:13px}
@media (max-width:900px){.panel{flex-basis:88vw;grid-template-columns:1fr}.panel .frame .num{font-size:56px}}
.reel-note{padding-block:6px 0;font-size:13px;color:var(--ink-3)}
/* credits */
.sec{padding-block:clamp(48px,7vw,96px)}
.credits{max-width:920px;margin:0 auto;text-align:center}
.credits h2{font-size:clamp(28px,4vw,56px);line-height:1;text-transform:uppercase;letter-spacing:-.03em}
.credits .lead{margin-top:16px;color:var(--ink-2);max-width:60ch;margin-inline:auto}
.roll{margin-top:40px;display:grid;gap:0;text-align:left}
.roll div{display:grid;grid-template-columns:1fr auto 1fr;gap:12px;align-items:baseline;padding:14px 0;border-bottom:1px solid var(--line)}
.roll .l{font:700 13px/1.4 var(--body);letter-spacing:.12em;text-transform:uppercase;color:var(--ink-3);text-align:right}
.roll .dots{border-bottom:1px dotted var(--ink-3);width:clamp(20px,6vw,80px);transform:translateY(-4px)}
.roll .r{font:700 clamp(17px,1.8vw,22px)/1.3 var(--display)}
.roll .r small{display:block;font:400 14px/1.5 var(--body);color:var(--ink-2);max-width:48ch}
.roll .r b{color:var(--amber-text)}
@media (max-width:640px){.roll div{grid-template-columns:1fr}.roll .l{text-align:left}.roll .dots{display:none}}
/* band */
.band{background:var(--band-bg);color:var(--band-ink)}
.band .in{max-width:1240px;margin:0 auto;display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);gap:clamp(24px,4vw,64px);padding-block:clamp(48px,7vw,96px)}
.band h2{font-size:clamp(28px,3.6vw,48px);line-height:1;text-transform:uppercase;letter-spacing:-.03em}
.band .lead{margin-top:14px;color:var(--band-2)}
.band .btn{margin-top:20px;border-color:var(--band-ink);color:var(--band-ink)}.band .btn:hover{background:var(--band-ink);color:var(--band-bg)}
.band dl{display:grid;gap:0}
.band dl div{display:grid;grid-template-columns:110px 1fr;gap:14px;padding:14px 0;border-bottom:1px solid color-mix(in srgb,var(--band-ink) 18%,transparent)}
.band .label{color:var(--band-hi)}
.band dt{font:700 12px/1.8 var(--body);letter-spacing:.12em;text-transform:uppercase;color:var(--band-hi)}
.band dd{color:var(--band-2);font-size:15px}
@media (max-width:900px){.band .in{grid-template-columns:1fr}}
/* marquee */
.marq{overflow:hidden;border-block:1px solid var(--line);padding-block:14px;display:grid;gap:10px}
.marq .track{display:flex;gap:28px;white-space:nowrap;width:max-content;animation:scroll 40s linear infinite}
.marq .track.rev{animation-direction:reverse}
.marq:hover .track,.marq:focus-within .track{animation-play-state:paused}
.marq span{font:700 clamp(18px,2vw,26px)/1 var(--display);letter-spacing:-.02em;text-transform:uppercase}
.marq span b{color:var(--amber-text);font-weight:800;margin-left:6px;font-size:.7em}
@keyframes scroll{to{transform:translateX(-50%)}}
@media (prefers-reduced-motion:reduce){.marq .track{animation:none;width:auto;flex-wrap:wrap;white-space:normal}}
.sk{max-width:1240px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr));gap:24px;padding-top:28px}
.sk h3{font:700 12px/1 var(--body);letter-spacing:.14em;text-transform:uppercase;color:var(--ink-3);margin-bottom:10px}
.sk li{display:flex;justify-content:space-between;gap:10px;font-size:14.5px;padding:5px 0;border-bottom:1px solid var(--line)}
.sk li b{color:var(--amber-text)}.sk li b[title]{cursor:help}
/* notes + contact */
.notes{max-width:1240px;margin:0 auto;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px}
.notes a{display:grid;gap:10px;padding-top:16px;border-top:2px solid var(--line-2)}
.notes time{font:700 12px/1 var(--body);letter-spacing:.12em;color:var(--ink-3)}
.notes h3{font-size:22px;line-height:1.1}
.notes a:hover h3{color:var(--amber-text)}
.notes p{font-size:14.5px;color:var(--ink-2)}
@media (max-width:900px){.notes{grid-template-columns:1fr}}
.contact{max-width:1240px;margin:0 auto;display:grid;grid-template-columns:minmax(0,6fr) minmax(0,6fr);gap:clamp(24px,4vw,64px)}
.contact h2{font-size:clamp(34px,5vw,72px);line-height:.95;text-transform:uppercase;letter-spacing:-.04em}
.contact p{margin-top:14px;color:var(--ink-2);max-width:44ch}
.links{margin-top:22px;display:flex;flex-wrap:wrap;gap:8px}
form{display:grid;gap:12px}
.field{display:grid;gap:5px}
.field label{font:700 12px/1 var(--body);letter-spacing:.1em;text-transform:uppercase;color:var(--ink-3)}
.field input,.field textarea{width:100%;padding:12px 14px;border:1px solid var(--line-2);border-radius:6px;background:var(--surface);color:var(--ink);transition:box-shadow .2s}
.field input:focus,.field textarea:focus{outline:none;box-shadow:0 0 0 3px color-mix(in srgb,var(--amber) 50%,transparent)}
.field textarea{min-height:130px;resize:vertical}
form .btn{justify-self:start}
.fn{font-size:12.5px;color:var(--ink-3)}
.sent{padding:12px;border:1px solid var(--up);border-radius:6px;font-size:14px}
@media (max-width:900px){.contact{grid-template-columns:1fr}}
footer{display:flex;flex-wrap:wrap;justify-content:space-between;gap:10px 24px;padding-block:24px 40px;border-top:1px solid var(--line);font-size:13px;color:var(--ink-3)}
footer a:hover{color:var(--ink)}
html.js [data-reveal]{opacity:0;transform:translateY(16px);transition:opacity .9s var(--ease),transform .9s var(--ease);transition-delay:calc(var(--i,0) * 70ms)}
html.js [data-reveal].is-in{opacity:1;transform:none}
`;

export default {
  id: '05',
  slug: 'reel',
  name: 'Reel',
  concept: 'cinematic · horizontal · bold',
  file: '05-reel.html',
  fonts: ['Syne:wght@600;700;800', 'Hanken Grotesk:wght@400;500;600;700'],
  axes: {
    layout: 'Horizontal reel of the seven apps (native scroll-snap, keyboard and touch), then credits, a dark band and a skills marquee',
    canvas: 'Cream / deep navy, amber accent',
    type: 'Syne + Hanken Grotesk',
    motion: 'Headline lines rise, per-panel parallax, progress bar and counter, pausable marquee',
  },
  says: 'You want to be remembered. Confident and a little theatrical, still readable. Best for a client audience; recruiters get the point in five seconds.',
  render(c, h) {
    const t = h.tenure(c.experience.startDate);
    const panels = c.demos
      .map((d, i) => `<article class="panel" data-i="${i}" aria-label="${String(i + 1)} of ${c.demos.length}: ${h.esc(d.name)}">
  <div class="frame">${h.shot(d)}${h.keyVisual(d, 'class="kv"', { fallback: false })}<span class="num" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span></div>
  <div class="info">
    <div class="kind">${h.statusDot(d.slug)}${h.esc(d.kind)} · ${d.period} · ${h.esc(d.langs)}</div>
    <h3>${h.esc(d.name)}</h3>
    <p>${h.esc(d.problem)}</p>
    <div class="stack">${h.esc(d.stack.join(' · '))}</div>
    ${d.credentials.length ? `<div class="creds">${d.credentials.map((cr) => `<div>${h.esc(cr.label)}: ${h.esc(cr.user)} <button type="button" data-copy="${h.esc(cr.user)}" aria-label="Copy">${h.icon('copy')}</button> ${h.esc(cr.pass)} <button type="button" data-copy="${h.esc(cr.pass)}" aria-label="Copy">${h.icon('copy')}</button></div>`).join('')}</div>` : `<div class="stack">${h.esc(d.note)}</div>`}
    <div class="acts"><a class="btn amber" href="${d.demoUrl ?? d.url}" target="_blank" rel="noopener">${d.demoUrl ? 'Open signed in' : 'Open the app'} ${h.icon('arrow-up-right')}</a><a class="btn" href="/work/${d.slug}/">Case study</a>${d.repo ? `<a class="btn" href="${d.repo}" target="_blank" rel="noopener">${h.icon('github')}</a>` : ''}</div>
  </div>
</article>`)
      .join('');
    const allSkills = c.skills.flatMap((g) => g.items);
    const marq = (items) => items.map((s) => `<span>${h.esc(s.name)}${s.projects.length ? `<b>${s.projects.length}</b>` : ''}</span>`).join('');

    return `${h.head({ title: 'Muhammed Kado — Reel', description: c.profile.headline, fonts: this.fonts, light: '#f6f1e7', dark: '#0a1230', css })}
<body>
<a class="skip" href="#main">Skip to content</a>
<header class="top pad">
  <a class="brand" href="#top">${h.mark({ size: 34, font: 'Syne, system-ui, sans-serif' })}<span>${h.esc(c.profile.name)}<small>${h.esc(c.profile.role)} · İstanbul</small></span></a>
  <nav class="nav" aria-label="Sections">${c.nav.map((n) => `<a href="${n.href}">${n.label}</a>`).join('')}</nav>
  ${h.statusPill('pill')}
</header>
<main id="main">
<section class="hero pad${h.plateClass('plate-reel')}" id="top">
  <h1><span class="line"><span style="--i:0">Seven live</span></span><span class="line"><span style="--i:1">apps.</span></span><span class="line"><span style="--i:2"><span class="a">One</span> engineer.</span></span></h1>
  <div class="side">
    <p style="--i:0">${h.esc(c.profile.headline)} ${h.esc(c.profile.plain)}</p>
    <div class="stat" style="--i:1"><b>${t.years}.${Math.round((t.months / 12) * 10)}</b><span>years at USTEK RFID, counting</span></div>
    <div class="cta" style="--i:2"><a class="btn amber" href="#work">Play the reel ${h.icon('arrow-right')}</a><a class="btn" href="${c.profile.cv}">CV</a><a class="btn" href="${c.profile.github}" target="_blank" rel="noopener">GitHub</a></div>
  </div>
  ${h.plate('plate-reel')}
</section>

<section id="work" aria-label="The reel">
  <div class="reel-head pad">
    <div class="count"><span data-count>01</span> / ${String(c.demos.length).padStart(2, '0')}<small>LIVE</small></div>
    <div class="ctl"><button type="button" data-prev aria-label="Previous">${h.icon('arrow-left')}</button><button type="button" data-next aria-label="Next">${h.icon('arrow-right')}</button></div>
  </div>
  <div class="progress" aria-hidden="true"><i></i></div>
  <div class="reel" tabindex="0" aria-label="Seven applications, scroll sideways">${panels}</div>
  <p class="reel-note pad">Scroll sideways, use the arrows, or swipe. Demo data resets nightly.</p>
</section>

<section class="sec pad" id="experience">
  <div class="credits">
    <p class="label" data-reveal>Credits</p>
    <h2 data-reveal>Cast &amp; crew</h2>
    <p class="lead" data-reveal>${h.esc(c.experience.summary)}</p>
    <div class="roll">
      <div data-reveal><span class="l">Now</span><span class="dots"></span><span class="r">${h.esc(c.experience.role)}, ${h.esc(c.experience.company)}<small>${h.esc(c.experience.period)} · <b>${t.long}</b> · ${h.esc(c.experience.bullets[0])}</small></span></div>
      <div data-reveal><span class="l">Hardware</span><span class="dots"></span><span class="r">UHF RFID terminals and readers<small>${h.esc(c.experience.bullets[2])}</small></span></div>
      <div data-reveal><span class="l">Independent</span><span class="dots"></span><span class="r">Seven live applications<small>${h.esc(c.timeline[1].summary)}</small></span></div>
      <div data-reveal><span class="l">Education</span><span class="dots"></span><span class="r">${h.esc(c.education.degree)}<small>${h.esc(c.education.school)}, ${h.esc(c.education.period)}. ${h.esc(c.education.project)}</small></span></div>
      <div data-reveal><span class="l">Languages</span><span class="dots"></span><span class="r">Kurdish · Arabic · Turkish · English<small>Three native, one professional. Five of the seven apps ship right-to-left.</small></span></div>
    </div>
  </div>
</section>

<section class="band pad" id="how">
  <div class="in">
    <div data-reveal><p class="label">Behind the scenes</p><h2>${h.esc(c.proof.title)}</h2><p class="lead">${h.esc(c.proof.lead)}</p><a class="btn" href="${c.proof.link}">${h.esc(c.proof.linkLabel)} ${h.icon('arrow-right')}</a></div>
    <dl data-reveal>${c.proof.facts.map((f) => `<div><dt>${h.esc(f.k)}</dt><dd>${h.esc(f.v)}</dd></div>`).join('')}</dl>
  </div>
</section>

<section class="sec" id="skills" style="padding-inline:0">
  <div class="marq" aria-label="Skills">
    <div class="track">${marq(allSkills)}${marq(allSkills)}</div>
    <div class="track rev">${marq([...allSkills].reverse())}${marq([...allSkills].reverse())}</div>
  </div>
  <div class="sk pad">${c.skills.map((g) => `<div data-reveal><h3>${h.esc(g.group)}</h3><ul>${g.items.map((s) => `<li><span>${h.esc(s.name)}</span>${s.projects.length ? `<b title="${h.esc(s.projects.join(', '))}">${s.projects.length}</b>` : ''}</li>`).join('')}</ul></div>`).join('')}</div>
  <p class="reel-note pad" style="max-width:1240px;margin:16px auto 0">The number next to a skill is how many projects on this page ship it.</p>
</section>

<section class="sec pad" id="notes">
  <div class="notes">${c.notes.map((n) => `<a href="/notes/${n.slug}/" data-reveal><time datetime="${n.date}">${h.fmtDate(n.date)}</time><h3>${h.esc(n.title)}</h3><p>${h.esc(n.description)}</p></a>`).join('')}</div>
</section>

<section class="sec pad" id="contact">
  <div class="contact">
    <div data-reveal>
      <p class="label">Contact</p>
      <h2>Roll the next one.</h2>
      <p>${h.esc(c.profile.availability)} I reply within a day.</p>
      <div class="links"><a class="btn amber" href="mailto:${c.profile.email}">${h.icon('mail')} ${c.profile.email}</a><a class="btn" href="${c.profile.whatsapp}" target="_blank" rel="noopener">${h.icon('whatsapp')} WhatsApp</a><a class="btn" href="${c.profile.linkedin}" target="_blank" rel="noopener">${h.icon('linkedin')} LinkedIn</a></div>
    </div>
    <form action="/api/contact" method="post" data-reveal novalidate>
      <div class="field"><label for="cf-name">Name</label><input id="cf-name" name="name" type="text" autocomplete="name" required></div>
      <div class="field"><label for="cf-email">Email</label><input id="cf-email" name="email" type="email" autocomplete="email" required></div>
      <div class="field"><label for="cf-msg">Message</label><textarea id="cf-msg" name="message" required></textarea></div>
      <button class="btn amber" type="submit">Send ${h.icon('arrow-right')}</button>
      <p class="fn">Turnstile-protected. Stored first, forwarded second.</p>
    </form>
  </div>
</section>
</main>
<footer class="pad"><span>© 2026 ${h.esc(c.profile.name)}</span><span><a href="/about-this-site">About this site</a> · <a href="/notes/">Notes</a> · <a href="/rss.xml">RSS</a> · <a href="https://github.com/muhammedkado/mkado.dev" target="_blank" rel="noopener">Source</a></span></footer>
${h.candidateBar(h.id, h.total)}
${h.revealScript}
${h.copyScript}
<script>
(function(){
  var reel=document.querySelector('.reel'),panels=[].slice.call(reel.querySelectorAll('.panel')),count=document.querySelector('[data-count]'),prog=document.querySelector('.progress');
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches,raf=null;
  function update(){raf=null;var max=reel.scrollWidth-reel.clientWidth;var p=max>0?reel.scrollLeft/max:0;prog.style.setProperty('--p',(0.143+p*0.857).toFixed(3));
    var mid=reel.scrollLeft+reel.clientWidth*0.35,idx=0;panels.forEach(function(pl,i){if(pl.offsetLeft<=mid)idx=i;
      if(!reduce){var rel=(pl.offsetLeft-reel.scrollLeft)/reel.clientWidth;pl.querySelector('.frame').style.setProperty('--px',(-rel*40).toFixed(1)+'px')}});
    count.textContent=String(idx+1).padStart(2,'0')}
  reel.addEventListener('scroll',function(){if(!raf)raf=requestAnimationFrame(update)},{passive:true});update();
  function go(dir){var w=panels[0].getBoundingClientRect().width+parseFloat(getComputedStyle(reel).columnGap||getComputedStyle(reel).gap||16);reel.scrollBy({left:dir*w,behavior:reduce?'auto':'smooth'})}
  document.querySelector('[data-prev]').addEventListener('click',function(){go(-1)});document.querySelector('[data-next]').addEventListener('click',function(){go(1)});
  var f=document.querySelector('form');f&&f.addEventListener('submit',function(e){e.preventDefault();var m=document.createElement('p');m.className='sent';m.textContent='Design mockup: on the built site this posts to /api/contact.';f.replaceChildren(m)});
})();
</script>
</body>
</html>`;
  },
};
