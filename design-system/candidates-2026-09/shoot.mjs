// Screenshots of every candidate for the gallery and the phone check.
//
//   node design-system/candidates-2026-09/shoot.mjs        all
//   node design-system/candidates-2026-09/shoot.mjs 03     one
//
// One headless Chrome (launch/connect are the ones from scripts/shots.mjs),
// one tab, each design × {light, dark} × {1440×900 viewport, 390 full page}.
// The phone pass asserts the page never scrolls sideways and runs with
// prefers-reduced-motion so nothing that depends on animation stays hidden.
// Output: previews/NN-name-{light|dark}-{1440|390}.jpg (720 px wide, q80).
import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import sharp from 'sharp';

const CHROME =
  process.env.CHROME ??
  ['C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', '/usr/bin/google-chrome', '/usr/bin/chromium'].find(existsSync);
if (!CHROME) throw new Error('Chrome not found; set CHROME=<path to chrome executable>');

const root = dirname(fileURLToPath(import.meta.url));
const only = process.argv.slice(2);
const pages = readdirSync(root).filter((f) => /^\d\d-.+\.html$/.test(f)).sort();
const outDir = join(root, 'previews');
mkdirSync(outDir, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const SETTLE_MS = 2500; // Google Fonts + entrance animations

function launch(profile) {
  return new Promise((resolveLaunch, reject) => {
    const proc = spawn(
      CHROME,
      ['--headless=new', '--disable-gpu', '--no-first-run', '--hide-scrollbars', '--window-size=1440,900',
       '--remote-debugging-port=0', '--remote-debugging-address=127.0.0.1', `--user-data-dir=${profile}`, 'about:blank'],
      { stdio: ['ignore', 'ignore', 'pipe'] },
    );
    let err = '';
    proc.stderr.on('data', (chunk) => {
      err += chunk.toString();
      const m = err.match(/DevTools listening on ws:\/\/127\.0\.0\.1:(\d+)\//);
      if (m) resolveLaunch({ proc, base: `http://127.0.0.1:${m[1]}` });
    });
    proc.on('exit', (code) => reject(new Error(`Chrome exited (${code}): ${err.slice(-300)}`)));
    setTimeout(() => reject(new Error('Chrome did not expose DevTools in time')), 20_000);
  });
}

function connect(wsUrl) {
  return new Promise((resolveConn, reject) => {
    const ws = new WebSocket(wsUrl);
    let id = 0;
    const pending = new Map();
    const listeners = new Map();
    ws.onopen = () =>
      resolveConn({
        send: (method, params = {}) =>
          new Promise((res, rej) => {
            const msgId = ++id;
            pending.set(msgId, { res, rej });
            ws.send(JSON.stringify({ id: msgId, method, params }));
          }),
        once: (event) => new Promise((res) => listeners.set(event, res)),
        close: () => ws.close(),
      });
    ws.onmessage = (e) => {
      const msg = JSON.parse(e.data);
      if (msg.id && pending.has(msg.id)) {
        const { res, rej } = pending.get(msg.id);
        pending.delete(msg.id);
        msg.error ? rej(new Error(msg.error.message)) : res(msg.result);
      } else if (msg.method && listeners.has(msg.method)) {
        listeners.get(msg.method)(msg.params);
        listeners.delete(msg.method);
      }
    };
    ws.onerror = () => reject(new Error(`WebSocket error on ${wsUrl}`));
  });
}

const passes = [
  { size: '1440', width: 1440, height: 900, mobile: false, dsf: 1, full: false, reduce: false },
  { size: '390', width: 390, height: 844, mobile: true, dsf: 2, full: true, reduce: true },
];

const profile = mkdtempSync(join(tmpdir(), 'mkado-cand-'));
let chrome;
let failed = 0;
try {
  chrome = await launch(profile);
  const page = await (await fetch(`${chrome.base}/json/new?about:blank`, { method: 'PUT' })).json();
  const cdp = await connect(page.webSocketDebuggerUrl);
  await cdp.send('Page.enable');
  for (const file of pages) {
    const id = file.slice(0, 2);
    if (only.length && !only.includes(id)) continue;
    const stem = file.replace(/\.html$/, '');
    for (const theme of ['light', 'dark']) {
      for (const p of passes) {
        const out = join(outDir, `${stem}-${theme}-${p.size}.jpg`);
        try {
          await cdp.send('Emulation.setDeviceMetricsOverride', { width: p.width, height: p.height, deviceScaleFactor: p.dsf, mobile: p.mobile });
          await cdp.send('Emulation.setEmulatedMedia', {
            features: [
              { name: 'prefers-color-scheme', value: theme },
              { name: 'prefers-reduced-motion', value: p.reduce ? 'reduce' : 'no-preference' },
            ],
          });
          const loaded = cdp.once('Page.loadEventFired');
          await cdp.send('Page.navigate', { url: `${pathToFileURL(join(root, file)).href}?theme=${theme}&bare=1` });
          await Promise.race([loaded, sleep(15_000)]);
          await sleep(SETTLE_MS);
          const { result } = await cdp.send('Runtime.evaluate', {
            expression: `window.scrollTo(0,0); document.activeElement && document.activeElement.blur();
              JSON.stringify({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth, h: document.documentElement.scrollHeight })`,
            returnByValue: true,
          });
          const m = JSON.parse(result.value);
          if (m.sw > m.cw + 1) {
            const { result: who } = await cdp.send('Runtime.evaluate', {
              expression: `JSON.stringify([].slice.call(document.querySelectorAll('body *')).map(function(e){var r=e.getBoundingClientRect();return {r:Math.round(r.right),s:e.tagName.toLowerCase()+(e.className&&typeof e.className==='string'?'.'+e.className.trim().split(/\\s+/).slice(0,2).join('.'):''),t:(e.textContent||'').trim().slice(0,30)}}).filter(function(x){return x.r>${p.width}+1}).sort(function(a,b){return b.r-a.r}).slice(0,6))`,
              returnByValue: true,
            });
            throw new Error(`horizontal overflow: scrollWidth ${m.sw} > ${m.cw}\n       ${JSON.parse(who.value).map((x) => `${x.r}px ${x.s} "${x.t}"`).join('\n       ')}`);
          }
          await sleep(200);
          const shot = await cdp.send('Page.captureScreenshot', {
            format: 'png',
            captureBeyondViewport: p.full,
            clip: p.full ? { x: 0, y: 0, width: p.width, height: Math.min(m.h, 6000), scale: 1 } : undefined,
          });
          await sharp(Buffer.from(shot.data, 'base64')).resize({ width: p.full ? 420 : 720 }).jpeg({ quality: p.full ? 70 : 80, mozjpeg: true }).toFile(out);
          console.log(`ok   ${stem.padEnd(22)} ${theme.padEnd(5)} ${p.size.padStart(4)}  ${p.full ? `${m.h}px tall` : ''}`);
        } catch (e) {
          failed++;
          console.log(`FAIL ${stem.padEnd(22)} ${theme.padEnd(5)} ${p.size.padStart(4)}  ${e.message}`);
        }
      }
    }
  }
  cdp.close();
} finally {
  chrome?.proc.kill();
  await sleep(200);
  rmSync(profile, { recursive: true, force: true });
}
process.exit(failed ? 1 : 0);
