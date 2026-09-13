// Contrast audit for the rendered candidates, both themes.
//
//   node design-system/candidates-2026-09/check.mjs        all
//   node design-system/candidates-2026-09/check.mjs 03     one
//
// Walks every element that owns visible text, resolves its computed colour
// against the nearest ancestor with an opaque background-color, and reports
// WCAG ratios under 4.5:1 (3:1 for text ≥ 24px, or bold ≥ 18.66px). Elements
// over gradients or images are listed separately as "unverified" rather than
// guessed. Heuristic, not a substitute for a real audit; catches the usual
// dark-mode token slips.
import { spawn } from 'node:child_process';
import { existsSync, mkdtempSync, readdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const CHROME =
  process.env.CHROME ??
  ['C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', '/usr/bin/google-chrome', '/usr/bin/chromium'].find(existsSync);
if (!CHROME) throw new Error('Chrome not found; set CHROME=<path to chrome executable>');
const root = dirname(fileURLToPath(import.meta.url));
const only = process.argv.slice(2);
const pages = readdirSync(root).filter((f) => /^\d\d-.+\.html$/.test(f)).sort();
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function launch(profile) {
  return new Promise((resolveLaunch, reject) => {
    const proc = spawn(CHROME, ['--headless=new', '--disable-gpu', '--no-first-run', '--window-size=1440,900', '--remote-debugging-port=0', '--remote-debugging-address=127.0.0.1', `--user-data-dir=${profile}`, 'about:blank'], { stdio: ['ignore', 'ignore', 'pipe'] });
    let err = '';
    proc.stderr.on('data', (c) => { err += c; const m = err.match(/DevTools listening on ws:\/\/127\.0\.0\.1:(\d+)\//); if (m) resolveLaunch({ proc, base: `http://127.0.0.1:${m[1]}` }); });
    proc.on('exit', (code) => reject(new Error(`Chrome exited (${code})`)));
    setTimeout(() => reject(new Error('Chrome did not expose DevTools in time')), 20_000);
  });
}
function connect(wsUrl) {
  return new Promise((resolveConn, reject) => {
    const ws = new WebSocket(wsUrl); let id = 0; const pending = new Map(); const listeners = new Map();
    ws.onopen = () => resolveConn({
      send: (method, params = {}) => new Promise((res, rej) => { const i = ++id; pending.set(i, { res, rej }); ws.send(JSON.stringify({ id: i, method, params })); }),
      once: (ev) => new Promise((res) => listeners.set(ev, res)), close: () => ws.close(),
    });
    ws.onmessage = (e) => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { const { res, rej } = pending.get(m.id); pending.delete(m.id); m.error ? rej(new Error(m.error.message)) : res(m.result); } else if (m.method && listeners.has(m.method)) { listeners.get(m.method)(m.params); listeners.delete(m.method); } };
    ws.onerror = () => reject(new Error('WebSocket error'));
  });
}

// Runs inside the page.
const AUDIT = `(function(){
  function parse(c){var m=c.match(/rgba?\\(([^)]+)\\)/);if(!m)return null;var p=m[1].split(',').map(parseFloat);return{r:p[0],g:p[1],b:p[2],a:p.length>3?p[3]:1}}
  function lum(c){function f(v){v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)}return .2126*f(c.r)+.7152*f(c.g)+.0722*f(c.b)}
  function blend(fg,bg){var a=fg.a;return{r:fg.r*a+bg.r*(1-a),g:fg.g*a+bg.g*(1-a),b:fg.b*a+bg.b*(1-a),a:1}}
  function ratio(a,b){var l1=lum(a),l2=lum(b);return (Math.max(l1,l2)+.05)/(Math.min(l1,l2)+.05)}
  function bgOf(el){var e=el,layers=[];while(e&&e!==document){var cs=getComputedStyle(e);var c=parse(cs.backgroundColor);if(cs.backgroundImage&&cs.backgroundImage!=='none'&&!(c&&c.a>=1&&/gradient/.test(cs.backgroundImage)))return{unknown:true};if(c&&c.a>0){layers.push(c);if(c.a>=1)break}e=e.parentElement}
    var bg={r:255,g:255,b:255,a:1};var html=parse(getComputedStyle(document.documentElement).backgroundColor);if(html&&html.a>0)bg=blend(html,bg);for(var i=layers.length-1;i>=0;i--)bg=blend(layers[i],bg);return bg}
  var bad=[],unknown=0,checked=0,overMedia=0,seen=new Set();
  var walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);var n;
  while((n=walker.nextNode())){if(!n.nodeValue.trim())continue;var el=n.parentElement;if(!el||seen.has(el))continue;seen.add(el);
    if(el.closest('.mkc,script,style,[aria-hidden="true"]'))continue;var cs=getComputedStyle(el);if(cs.visibility==='hidden'||cs.display==='none')continue;
    var r=el.getBoundingClientRect();if(r.width===0||r.height===0)continue;var op=1,e=el;while(e&&e!==document.body){op*=parseFloat(getComputedStyle(e).opacity);e=e.parentElement}if(op<.05)continue;
    var fg=parse(cs.color);if(!fg)continue;
    // Text inside a container with a generated plate or image layer: the blend is invisible to getComputedStyle, so count it for a manual look.
    var host=el.closest('.has-plate');if(host&&host.querySelector(':scope > .plate img')){overMedia++}
    var bg=bgOf(el);if(bg.unknown){unknown++;continue}
    if(fg.a<1)fg=blend(fg,bg);var size=parseFloat(cs.fontSize),bold=parseInt(cs.fontWeight,10)>=700;var large=size>=24||(bold&&size>=18.66);var need=large?3:4.5;var rr=ratio(fg,bg);checked++;
    if(rr<need)bad.push({text:n.nodeValue.trim().slice(0,40),ratio:+rr.toFixed(2),need:need,size:Math.round(size),sel:el.tagName.toLowerCase()+(el.className&&typeof el.className==='string'?'.'+el.className.trim().split(/\\s+/).slice(0,2).join('.'):'')})}
  return JSON.stringify({bad:bad,unknown:unknown,checked:checked,overMedia:overMedia})})()`;

const profile = mkdtempSync(join(tmpdir(), 'mkado-check-'));
let chrome, problems = 0;
try {
  chrome = await launch(profile);
  const page = await (await fetch(`${chrome.base}/json/new?about:blank`, { method: 'PUT' })).json();
  const cdp = await connect(page.webSocketDebuggerUrl);
  await cdp.send('Page.enable');
  await cdp.send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  for (const file of pages) {
    if (only.length && !only.includes(file.slice(0, 2))) continue;
    for (const theme of ['light', 'dark']) {
      await cdp.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-color-scheme', value: theme }, { name: 'prefers-reduced-motion', value: 'reduce' }] });
      const loaded = cdp.once('Page.loadEventFired');
      await cdp.send('Page.navigate', { url: `${pathToFileURL(join(root, file)).href}?theme=${theme}&bare=1` });
      await Promise.race([loaded, sleep(15_000)]);
      await sleep(1500);
      // Reveal everything so hidden-until-scrolled text is measured too.
      await cdp.send('Runtime.evaluate', { expression: `document.querySelectorAll('[data-reveal]').forEach(e=>e.classList.add('is-in'))` });
      await sleep(200);
      const { result } = await cdp.send('Runtime.evaluate', { expression: AUDIT, returnByValue: true });
      const r = JSON.parse(result.value);
      const tag = `${file.replace(/\.html$/, '').padEnd(22)} ${theme.padEnd(5)}`;
      const media = r.overMedia ? `, ${r.overMedia} over generated media (look manually)` : '';
      if (!r.bad.length) console.log(`ok   ${tag} ${String(r.checked).padStart(4)} checked, ${r.unknown} over gradients${media}`);
      else {
        problems += r.bad.length;
        console.log(`WARN ${tag} ${r.bad.length} below target (${r.checked} checked, ${r.unknown} over gradients${media})`);
        for (const b of r.bad.slice(0, 12)) console.log(`       ${String(b.ratio).padStart(5)} < ${b.need}  ${b.size}px  ${b.sel.padEnd(28)} "${b.text}"`);
        if (r.bad.length > 12) console.log(`       … ${r.bad.length - 12} more`);
      }
    }
  }
  cdp.close();
} finally {
  chrome?.proc.kill();
  await sleep(200);
  rmSync(profile, { recursive: true, force: true });
}
process.exit(problems ? 1 : 0);
