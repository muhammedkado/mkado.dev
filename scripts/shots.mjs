// Screenshots of the live demos for the demo boards (src/assets/shots/<slug>.png).
//
//   npm run shots            all demos
//   npm run shots -- pos     one demo
//
// Drives the installed Chrome over the DevTools protocol (Node's built-in
// WebSocket, no Playwright/puppeteer). Plain `--screenshot` was not enough:
// AdminLTE dashboards scrolled themselves before the capture and SPAs were
// still fetching. Here each demo gets its own throwaway profile (so a demo
// sign-in cookie from `demoUrl` cannot leak between shots), we wait for the
// load event plus a settle delay, scroll back to the top, blur focus, and only
// then capture the 1440×900 viewport. Output PNGs are committed (deploy.sh
// refuses a dirty tree) and rendered as AVIF/WebP by astro:assets at build.
import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { demos } from '../src/data/site.ts';

const CHROME =
  process.env.CHROME ??
  ['C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', '/usr/bin/google-chrome', '/usr/bin/chromium'].find(existsSync);
if (!CHROME) throw new Error('Chrome not found; set CHROME=<path to chrome executable>');

const WIDTH = 1440;
const HEIGHT = 900;
const SETTLE_MS = 3500; // time for dashboards/SPAs to finish their XHRs after load

const only = process.argv.slice(2);
const outDir = resolve('src/assets/shots');
mkdirSync(outDir, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** Start a headless Chrome with a fresh profile; resolve with its DevTools HTTP base URL. */
function launch(profile) {
  return new Promise((resolveLaunch, reject) => {
    const proc = spawn(
      CHROME,
      ['--headless=new', '--disable-gpu', '--no-first-run', '--hide-scrollbars', `--window-size=${WIDTH},${HEIGHT}`,
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

/** Minimal CDP client over the built-in WebSocket. */
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

async function shoot(d) {
  const url = d.shot ?? d.demoUrl ?? d.url;
  const out = join(outDir, `${d.slug}.png`);
  const profile = mkdtempSync(join(tmpdir(), 'mkado-shot-'));
  let chrome;
  try {
    chrome = await launch(profile);
    const page = await (await fetch(`${chrome.base}/json/new?about:blank`, { method: 'PUT' })).json();
    const cdp = await connect(page.webSocketDebuggerUrl);
    await cdp.send('Page.enable');
    await cdp.send('Emulation.setDeviceMetricsOverride', { width: WIDTH, height: HEIGHT, deviceScaleFactor: 1, mobile: false });
    const loaded = cdp.once('Page.loadEventFired');
    await cdp.send('Page.navigate', { url });
    await Promise.race([loaded, sleep(25_000)]);
    await sleep(SETTLE_MS);
    await cdp.send('Runtime.evaluate', {
      expression: 'window.scrollTo(0, 0); document.activeElement && document.activeElement.blur(); document.documentElement.scrollTop = 0; document.body && (document.body.scrollTop = 0);',
    });
    await sleep(300);
    const shot = await cdp.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
    writeFileSync(out, Buffer.from(shot.data, 'base64'));
    cdp.close();
    return { ok: true, url };
  } catch (e) {
    return { ok: false, url, error: e.message };
  } finally {
    chrome?.proc.kill();
    await sleep(200);
    rmSync(profile, { recursive: true, force: true });
  }
}

let failed = 0;
for (const d of demos) {
  if (only.length && !only.includes(d.slug)) continue;
  const r = await shoot(d);
  if (!r.ok) failed++;
  console.log(`${r.ok ? 'ok  ' : 'FAIL'} ${d.slug.padEnd(14)} ${r.url}${r.ok ? '' : '\n     ' + r.error}`);
}
process.exit(failed ? 1 : 0);
