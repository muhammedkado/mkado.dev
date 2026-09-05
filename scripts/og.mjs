// Renders scripts/og.html to public/og.png (1200×630) with the installed Chrome.
//   npm run og
// Fonts come from Google Fonts at render time, so it needs network access;
// --virtual-time-budget gives them time to load before the capture.
import { spawnSync } from 'node:child_process';
import { existsSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const CHROME =
  process.env.CHROME ??
  ['C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', '/usr/bin/google-chrome', '/usr/bin/chromium'].find(existsSync);
if (!CHROME) throw new Error('Chrome not found; set CHROME=<path to chrome executable>');

const src = pathToFileURL(resolve('scripts/og.html')).href;
const out = resolve('public/og.png');
const profile = mkdtempSync(join(tmpdir(), 'mkado-og-'));
const r = spawnSync(
  CHROME,
  ['--headless=new', '--disable-gpu', '--no-first-run', '--hide-scrollbars', '--window-size=1200,630',
   '--virtual-time-budget=12000', `--user-data-dir=${profile}`, `--screenshot=${out}`, src],
  { stdio: 'pipe', timeout: 60_000 },
);
rmSync(profile, { recursive: true, force: true });
if (r.status !== 0 || !existsSync(out)) {
  console.error(r.stderr.toString().slice(-600));
  process.exit(1);
}
console.log(`og.png written: ${out}`);
