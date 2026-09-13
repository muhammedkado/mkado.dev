// Generated media for the candidates, through the Higgsfield MCP (default) or CLI (--via cli).
//
//   node media.mjs --balance                 credits left in the workspace
//   node media.mjs --plan [--cap 100]        cost of everything still to do, no spend
//   node media.mjs [--only a,b] [--cap 100]  generate what is missing (cost-gated), download, optimise
//   node media.mjs --alt a,b                 one extra candidate per id (kept beside the primary)
//   node media.mjs --pick id=2               promote alternate 2 of id to primary
//   node media.mjs --force a,b               regenerate (spends again; the old original is kept)
//   node media.mjs --resume id               finish a job that was created but not downloaded
//   node media.mjs --optimize [--only a,b]   sharp pass only
//   node media.mjs --import id=<url> [--cost N] [--job <jobId>] [--model <m>] [--as-alt]
//                                            register a result produced through the Higgsfield MCP
//   node media.mjs --logo <svg path or url> [--map "#hex=fg,#hex=pulse,#hex=dot"]
//
// Prompts and models live in src/media-brief.mjs. Originals go to media-src/ (gitignored),
// optimised outputs and the manifest to media/ (committed). The prompt is always passed on
// stdin, never on the command line.
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { copyFileSync, existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs';
import { dirname, extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const mediaDir = join(root, 'media');
const srcDir = join(root, 'media-src');
const manifestPath = join(mediaDir, 'manifest.json');
const WORKSPACE = 'e1b7b8f7-993e-406c-ba25-14c3423feebc';
const SIZES = [1600, 800];

// ---------- args ----------
const flags = {};
for (let i = 2; i < process.argv.length; i++) {
  const a = process.argv[i];
  if (!a.startsWith('--')) continue;
  const next = process.argv[i + 1];
  if (next !== undefined && !next.startsWith('--')) { flags[a.slice(2)] = next; i++; } else flags[a.slice(2)] = true;
}
const list = (v) => (typeof v === 'string' ? v.split(',').map((s) => s.trim()).filter(Boolean) : []);
const cap = Number(flags.cap ?? 100);

// ---------- manifest ----------
mkdirSync(mediaDir, { recursive: true });
mkdirSync(srcDir, { recursive: true });
const manifest = existsSync(manifestPath)
  ? JSON.parse(readFileSync(manifestPath, 'utf8'))
  : { version: 1, cap, spent: 0, balanceBefore: null, balanceAfter: null, assets: {}, logo: null };
const save = () => writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
const done = (id) => {
  const a = manifest.assets[id];
  return !!(a && a.url && a.src && existsSync(join(root, a.src)));
};

// ---------- the CLI ----------
// On Windows the npm shim is a .cmd, which Node refuses to spawn without a shell; run the
// package's JS entry with this Node instead, so arguments never pass through cmd.exe.
function cliCommand() {
  if (process.env.HIGGSFIELD_CLI) return [process.env.HIGGSFIELD_CLI];
  if (process.platform === 'win32' && process.env.APPDATA) {
    const js = join(process.env.APPDATA, 'npm', 'node_modules', '@higgsfield', 'cli', 'bin', 'higgsfield.js');
    if (existsSync(js)) return [process.execPath, js];
  }
  return ['higgsfield'];
}
function hf(args, { input, json = true } = {}) {
  const [cmd, ...pre] = cliCommand();
  const full = [...pre, ...args, ...(json ? ['--json', '--no-color'] : ['--no-color'])];
  const r = spawnSync(cmd, full, { input, encoding: 'utf8', shell: cmd === 'higgsfield', maxBuffer: 64 * 1024 * 1024, windowsHide: true });
  return { status: r.status, out: r.stdout || '', err: r.stderr || '' };
}
function parseJson(text) {
  try { return JSON.parse(text); } catch {}
  const i = Math.min(...['[', '{'].map((c) => text.indexOf(c)).filter((n) => n >= 0));
  if (!Number.isFinite(i)) return null;
  try { return JSON.parse(text.slice(i)); } catch { return null; }
}
const fail = (msg) => { console.error(msg); process.exit(1); };

// ---------- brief ----------
const brief = await import('./src/media-brief.mjs');
function spec(id) {
  const a = brief.assets.find((x) => x.id === id);
  if (!a) fail(`unknown asset ${id}`);
  const base = brief.models[a.kind];
  const s = { ...a, model: a.model ?? base.model, params: { ...base.params, ...(a.params ?? {}) } };
  if (a.kind === 'logo') {
    const cf = join(root, brief.logoColorsFile);
    if (!existsSync(cf)) return { ...s, blocked: `${brief.logoColorsFile} missing (palette not approved yet)` };
    const c = JSON.parse(readFileSync(cf, 'utf8'));
    const arrFile = brief.logoColorsFile.replace(/.json$/, '.array.json'); // --colors wants a bare array
    writeFileSync(join(root, arrFile), JSON.stringify(c.colors));
    s.colorsArg = `@${arrFile}`;
    s.params.background_color = c.background;
  }
  return s;
}
function paramArgs(s) {
  const args = [];
  for (const [k, v] of Object.entries(s.params)) if (v !== undefined && v !== null) args.push(`--${k}`, String(v));
  if (s.colorsArg) args.push('--colors', s.colorsArg);
  return args;
}

// ---------- pieces ----------
function balance() {
  const r = hf(['workspace', 'list']);
  const j = parseJson(r.out);
  let credits = null;
  (function walk(v) {
    if (credits !== null || !v || typeof v !== 'object') return;
    if (v.id === WORKSPACE) { credits = Number(v.credits ?? v.balance ?? v.available_credits); return; }
    for (const x of Object.values(v)) walk(x);
  })(j);
  if (credits === null || Number.isNaN(credits)) {
    const m = r.out.match(/(\d+(?:\.\d+)?)\s*credits?/i);
    credits = m ? Number(m[1]) : null;
  }
  return credits;
}
function cost(s) {
  const r = hf(['generate', 'cost', s.model, ...paramArgs(s)], { input: s.prompt + '\n' });
  let j = parseJson(r.out);
  if (!j || j.credits === undefined) {
    const m = (r.out + r.err).match(/(\d+(?:\.\d+)?)\s*credits?/i);
    if (m) return Number(m[1]);
    // The prompt on stdin may not be accepted by `cost`; retry with the prompt as an argument.
    const r2 = hf(['generate', 'cost', s.model, ...paramArgs(s), '--prompt', s.prompt.replace(/"/g, "'")]);
    j = parseJson(r2.out);
    if (!j || j.credits === undefined) fail(`cost estimate failed for ${s.id}:\n${r.out}${r.err}${r2.out}${r2.err}`);
  }
  return Number(j.credits);
}
const urlRe = /^https?:\/\/\S+$/i;
const imgRe = /\.(png|jpe?g|webp|avif|svg)(\?|$)/i;
function findUrls(v, out = []) {
  if (typeof v === 'string') { if (urlRe.test(v)) out.push(v); }
  else if (Array.isArray(v)) v.forEach((x) => findUrls(x, out));
  else if (v && typeof v === 'object') Object.values(v).forEach((x) => findUrls(x, out));
  return out;
}
function findJobId(v) {
  if (Array.isArray(v)) return findJobId(v[0]);
  if (v && typeof v === 'object') return v.id ?? v.job_id ?? v.jobId ?? (v.job && findJobId(v.job)) ?? null;
  return null;
}
function resultUrl(job) {
  const urls = findUrls(job);
  return urls.find((u) => imgRe.test(u)) ?? urls.find((u) => !/higgsfield\.ai\/(apps|docs)/.test(u)) ?? null;
}
async function download(url, target) {
  const res = await fetch(url);
  if (!res.ok) fail(`download ${url} → HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  writeFileSync(target, buf);
  return buf.length;
}
function extOf(url, contentType = '') {
  const m = url.match(/\.(png|jpe?g|webp|avif|svg)(\?|$)/i);
  if (m) return m[1].toLowerCase().replace('jpeg', 'jpg');
  if (/svg/.test(contentType)) return 'svg';
  if (/webp/.test(contentType)) return 'webp';
  if (/jpe?g/.test(contentType)) return 'jpg';
  return 'png';
}
async function optimise(id) {
  const a = manifest.assets[id];
  if (!a || !a.src) fail(`nothing to optimise for ${id}`);
  const src = join(root, a.src);
  if (extname(src) === '.svg') { a.outputs = [a.src]; return; }
  const sharp = (await import('sharp')).default;
  const meta = await sharp(src).metadata();
  a.width = meta.width; a.height = meta.height;
  a.outputs = [];
  for (const w of SIZES) {
    const base = sharp(src).resize({ width: w, withoutEnlargement: true });
    const avif = `media/${id}-${w}.avif`;
    const webp = `media/${id}-${w}.webp`;
    await base.clone().avif({ quality: 55, effort: 6 }).toFile(join(root, avif));
    await base.clone().webp({ quality: 78 }).toFile(join(root, webp));
    a.outputs.push(avif, webp);
  }
  const o = await sharp(join(root, `media/${id}-${SIZES[0]}.webp`)).metadata();
  a.outWidth = o.width; a.outHeight = o.height;
}
async function generate(id, { alt = false, force = false } = {}) {
  const s = spec(id);
  if (s.blocked) { console.log(`skip ${id}: ${s.blocked}`); return; }
  if (!alt && !force && done(id)) { console.log(`have ${id}`); return; }
  const c = cost(s);
  if (manifest.spent + c > cap) fail(`refusing ${id}: spent ${manifest.spent} + ${c} > cap ${cap}`);
  console.log(`generate ${id} (${s.model}, ${c} credits) …`);
  const args = ['generate', 'create', s.model, ...paramArgs(s), '--wait', '--wait-timeout', '20m', '--wait-interval', '5s'];
  let r = hf(args, { input: s.prompt + '\n' });
  if (/missing required params: prompt/i.test(r.out + r.err)) r = hf([...args, '--prompt', s.prompt.replace(/"/g, "'")]);
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const rawPath = join(srcDir, `${id}${alt ? `.alt-${stamp}` : ''}.job.json`);
  writeFileSync(rawPath, r.out + (r.err ? `\n/* stderr */\n${r.err}` : ''));
  const job = parseJson(r.out);
  if (r.status !== 0 || !job) fail(`job failed for ${id} (exit ${r.status}); raw output in ${rawPath}\n${(r.out + r.err).slice(0, 1500)}`);
  const status = JSON.stringify(job).match(/"status"\s*:\s*"([^"]+)"/)?.[1];
  if (status && /nsfw|ip_detected|failed|error/i.test(status)) fail(`job ${id} ended with status ${status}; see ${rawPath}`);
  const jobId = findJobId(job);
  const url = resultUrl(job);
  const entry = { model: s.model, params: s.params, prompt: s.prompt, promptSha: createHash('sha256').update(s.prompt).digest('hex').slice(0, 12), jobId, url, cost: c, createdAt: new Date().toISOString(), src: null, outputs: [] };
  manifest.spent = Math.round((manifest.spent + c) * 100) / 100;
  if (alt) { const prev = manifest.assets[id] ?? { alts: [] }; prev.alts = [...(prev.alts ?? []), entry]; manifest.assets[id] = prev; }
  else {
    const prev = manifest.assets[id];
    if (prev && prev.src && existsSync(join(root, prev.src))) {
      const archived = prev.src.replace(/(\.[a-z]+)$/, `.prev-${stamp}$1`);
      renameSync(join(root, prev.src), join(root, archived));
      entry.history = [...(prev.history ?? []), { ...prev, src: archived, alts: undefined }];
    }
    entry.alts = prev?.alts ?? [];
    manifest.assets[id] = entry;
  }
  save();
  if (!url) fail(`no result URL found for ${id}; jobId ${jobId}. Inspect ${rawPath}, then: node media.mjs --resume ${id}`);
  await fetchInto(id, entry, alt ? `${id}.alt${manifest.assets[id].alts.length}` : id);
}
async function fetchInto(id, entry, stem) {
  const head = await fetch(entry.url, { method: 'HEAD' }).catch(() => null);
  const ext = extOf(entry.url, head?.headers?.get('content-type') ?? '');
  const rel = `media-src/${stem}.${ext}`;
  const bytes = await download(entry.url, join(root, rel));
  entry.src = rel;
  save();
  console.log(`  ${rel} (${(bytes / 1024).toFixed(0)} KB) from ${entry.url}`);
  if (stem === id) { await optimise(id); save(); console.log(`  optimised → ${manifest.assets[id].outputs.join(', ')}`); }
}
async function resume(id) {
  const a = manifest.assets[id];
  if (!a || !a.jobId) fail(`no job recorded for ${id}`);
  const r = hf(['generate', 'get', a.jobId]);
  const job = parseJson(r.out);
  if (!job) fail(`generate get failed:\n${r.out}${r.err}`);
  const url = resultUrl(job);
  if (!url) fail(`still no URL for ${id}:\n${r.out.slice(0, 1500)}`);
  a.url = url; save();
  await fetchInto(id, a, id);
}
async function pick(arg) {
  const [id, nStr] = arg.split('=');
  const a = manifest.assets[id];
  const n = Number(nStr);
  if (!a || !a.alts || !a.alts[n - 1]) fail(`no alternate ${nStr} for ${id}`);
  const alt = a.alts[n - 1];
  const primary = { ...a, alts: undefined, history: undefined };
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  if (primary.src && existsSync(join(root, primary.src))) {
    const archived = primary.src.replace(/(\.[a-z]+)$/, `.prev-${stamp}$1`);
    renameSync(join(root, primary.src), join(root, archived));
    primary.src = archived;
  }
  const ext = extname(alt.src);
  const newSrc = `media-src/${id}${ext}`;
  copyFileSync(join(root, alt.src), join(root, newSrc));
  manifest.assets[id] = { ...alt, src: newSrc, alts: a.alts.filter((_, i) => i !== n - 1), history: [...(a.history ?? []), primary] };
  await optimise(id); save();
  console.log(`${id}: alternate ${n} is now primary → ${manifest.assets[id].outputs.join(', ')}`);
}

// Results produced through the Higgsfield MCP (the trial account only allows MCP generation):
// register the hosted URL, then download and optimise exactly like a CLI job.
async function importUrl(arg, { alt = false } = {}) {
  const eq = arg.indexOf('=');
  const id = arg.slice(0, eq), url = arg.slice(eq + 1);
  if (!id || !/^https?:/.test(url)) fail('usage: --import id=<url>');
  const s = spec(id);
  const c = Number(flags.cost ?? 0);
  const entry = { model: flags.model ?? s.model, params: s.params, prompt: s.prompt, promptSha: createHash('sha256').update(s.prompt).digest('hex').slice(0, 12), jobId: flags.job ?? null, url, cost: c, createdAt: new Date().toISOString(), src: null, outputs: [], via: 'mcp' };
  manifest.spent = Math.round((manifest.spent + c) * 100) / 100;
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  if (alt) { const prev = manifest.assets[id] ?? { alts: [] }; prev.alts = [...(prev.alts ?? []), entry]; manifest.assets[id] = prev; }
  else {
    const prev = manifest.assets[id];
    if (prev && prev.src && existsSync(join(root, prev.src))) {
      const archived = prev.src.replace(/(\.[a-z]+)$/, `.prev-${stamp}$1`);
      renameSync(join(root, prev.src), join(root, archived));
      entry.history = [...(prev.history ?? []), { ...prev, src: archived, alts: undefined }];
    }
    entry.alts = prev?.alts ?? [];
    manifest.assets[id] = entry;
  }
  save();
  await fetchInto(id, entry, alt ? `${id}.alt${manifest.assets[id].alts.length}` : id);
}

// ---------- the MCP ----------
// The trial account only generates through the Higgsfield MCP (the CLI answers
// only_mcp_usage_on_trial_is_available). The CLI's OAuth token is accepted by the MCP
// endpoint, so the script speaks MCP JSON-RPC over HTTPS itself; the token never leaves
// this process. Model ids and params are the same as the CLI's job types.
const MCP_URL = process.env.HIGGSFIELD_MCP_URL ?? 'https://mcp.higgsfield.ai/mcp';
let tokenCache = null;
function mcpToken() {
  if (tokenCache) return tokenCache;
  if (process.env.HIGGSFIELD_MCP_TOKEN) return (tokenCache = process.env.HIGGSFIELD_MCP_TOKEN);
  // A token issued to an MCP OAuth client (see higgsfield-oauth.mjs). The CLI's own token is
  // accepted by the MCP endpoint but refused by the backend on this trial account.
  const r = spawnSync(process.execPath, [join(root, 'higgsfield-oauth.mjs'), 'token'], { encoding: 'utf8', windowsHide: true });
  const t = (r.stdout || '').trim();
  if (r.status !== 0 || !t || t.length < 20) fail((r.stderr || '').trim() || 'not signed in; run: node higgsfield-oauth.mjs login');
  return (tokenCache = t);
}
let rpcId = 100;
let session = null; // { id } once the MCP handshake is done
function mcpHeaders() {
  const h = { 'Content-Type': 'application/json', Accept: 'application/json, text/event-stream', Authorization: `Bearer ${mcpToken()}` };
  if (session?.id) { h['Mcp-Session-Id'] = session.id; h['MCP-Protocol-Version'] = session.protocol; }
  return h;
}
/** The MCP lifecycle: initialize, then notifications/initialized, before any tool call. */
async function mcpInit() {
  if (session) return;
  const res = await fetch(MCP_URL, {
    method: 'POST',
    headers: mcpHeaders(),
    body: JSON.stringify({ jsonrpc: '2.0', id: ++rpcId, method: 'initialize', params: { protocolVersion: '2025-06-18', capabilities: {}, clientInfo: { name: 'mkado-media-pipeline', version: '1.0.0' } } }),
  });
  const text = await res.text();
  if (!res.ok) fail(`MCP initialize → HTTP ${res.status}: ${text.slice(0, 300)}`);
  const line = text.split('\n').find((l) => l.startsWith('data:'));
  const init = parseJson(line ? line.slice(5) : text);
  session = { id: res.headers.get('mcp-session-id'), protocol: init?.result?.protocolVersion ?? '2025-06-18' };
  await fetch(MCP_URL, { method: 'POST', headers: mcpHeaders(), body: JSON.stringify({ jsonrpc: '2.0', method: 'notifications/initialized' }) });
}
async function mcpCall(name, args) {
  await mcpInit();
  const body = { jsonrpc: '2.0', id: ++rpcId, method: 'tools/call', params: { name, arguments: args } };
  const res = await fetch(MCP_URL, {
    method: 'POST',
    headers: mcpHeaders(),
    body: JSON.stringify(body),
  });
  const text = await res.text();
  if (!res.ok) fail(`MCP ${name} → HTTP ${res.status}: ${text.slice(0, 400)}`);
  let msg = null;
  if ((res.headers.get('content-type') || '').includes('text/event-stream')) {
    for (const line of text.split('\n')) {
      if (!line.startsWith('data:')) continue;
      try { const j = JSON.parse(line.slice(5)); if (j.id === body.id || j.result || j.error) msg = j; } catch {}
    }
  } else msg = parseJson(text);
  if (!msg) fail(`MCP ${name}: unreadable response\n${text.slice(0, 400)}`);
  if (msg.error) fail(`MCP ${name}: ${JSON.stringify(msg.error)}`);
  const content = msg.result?.content ?? [];
  const texts = content.filter((c) => c.type === 'text').map((c) => c.text);
  // Job ids, statuses and result URLs arrive in structuredContent; the text blocks are prose for the model.
  const data = [msg.result?.structuredContent, ...texts.map((t) => parseJson(t))].filter(Boolean);
  if (msg.result?.isError) fail(`MCP ${name} error: ${texts.join('\n').slice(0, 800)}`);
  return { texts, data, raw: msg.result };
}
function mcpParams(s) {
  const p = { model: s.model, prompt: s.prompt, ...s.params, use_unlim: false };
  if (s.kind === 'logo') {
    const c = JSON.parse(readFileSync(join(root, brief.logoColorsFile), 'utf8'));
    p.colors = c.colors;
    p.background_color = c.background;
  }
  return p;
}
async function mcpCost(s) {
  const r = await mcpCall('generate_image', { params: { ...mcpParams(s), get_cost: true } });
  const m = r.texts.join('\n').match(/(\d+(?:\.\d+)?)\s*credits?/i);
  if (!m) fail(`cost preflight unreadable for ${s.id}: ${r.texts.join(' ').slice(0, 300)}`);
  return Number(m[1]);
}
const uuidRe = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
function walkObjects(v, out = []) {
  if (Array.isArray(v)) v.forEach((x) => walkObjects(x, out));
  else if (v && typeof v === 'object') { out.push(v); Object.values(v).forEach((x) => walkObjects(x, out)); }
  return out;
}
/** Submitted jobs: objects carrying our index and a job uuid. */
function findJobs(data) {
  const seen = new Map();
  for (const o of walkObjects(data)) {
    const jid = [o.job_id, o.jobId, o.id].find((x) => typeof x === 'string' && uuidRe.test(x));
    if (jid && Number.isInteger(o.index) && !seen.has(o.index)) seen.set(o.index, { index: o.index, job_id: jid });
  }
  return [...seen.values()];
}
const terminalRe = /^(completed|succeeded|success|done|finished|failed|error|errored|cancelled|canceled|nsfw|ip_detected|rejected)$/i;
const goodRe = /^(completed|succeeded|success|done|finished)$/i;
/** Waited jobs: objects with our index and a status; the result URL is the first image URL inside. */
function findWaitItems(data) {
  const items = new Map();
  for (const o of walkObjects(data)) {
    if (!Number.isInteger(o.index) || typeof o.status !== 'string') continue;
    const urls = findUrls(o);
    const url = urls.find((u) => imgRe.test(u)) ?? urls.find((u) => !/higgsfield\.ai\/(apps|docs)/.test(u)) ?? null;
    const prev = items.get(o.index);
    if (!prev || (url && !prev.url)) items.set(o.index, { index: o.index, status: o.status, url, job: o });
  }
  return [...items.values()];
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function mcpGenerate(ids, { alt = false, force = false } = {}) {
  const todo = [];
  for (const id of ids) {
    const s = spec(id);
    if (s.blocked) { console.log(`skip ${id}: ${s.blocked}`); continue; }
    if (!alt && !force && done(id)) { console.log(`have ${id}`); continue; }
    const c = await mcpCost(s);
    todo.push({ id, s, c });
  }
  if (!todo.length) return;
  const total = todo.reduce((n, x) => n + x.c, 0);
  if (manifest.spent + total > cap) fail(`refusing: spent ${manifest.spent} + ${total} > cap ${cap}`);
  for (let i = 0; i < todo.length; i += 12) {
    const group = todo.slice(i, i + 12);
    const stamp = new Date().toISOString().replace(/[:.]/g, '-');
    console.log(`submit ${group.map((x) => `${x.id} (${x.s.model}, ${x.c})`).join(', ')} …`);
    const r = await mcpCall('generate_image_batch', { requests: group.map((x, k) => ({ index: k, params: mcpParams(x.s) })) });
    const rawPath = join(srcDir, `batch-${stamp}.json`);
    writeFileSync(rawPath, JSON.stringify(r.raw, null, 2));
    const jobs = findJobs(r.data);
    // Record whatever was accepted; a refused item (e.g. a model closed on the trial) must not orphan the others.
    if (jobs.length !== group.length) {
      const got = new Set(jobs.map((j) => j.index));
      const refused = group.filter((_, k) => !got.has(k)).map((x) => x.id);
      console.error(`refused (not charged): ${refused.join(', ')}\n${r.texts.join('\n').split('\n').filter((l) => /index \d+:/.test(l)).join('\n')}`);
      process.exitCode = 1;
      if (!jobs.length) continue;
    }
    const entries = {};
    for (const j of jobs) {
      const x = group[j.index];
      const entry = { model: x.s.model, params: x.s.params, prompt: x.s.prompt, promptSha: createHash('sha256').update(x.s.prompt).digest('hex').slice(0, 12), jobId: j.job_id, url: null, cost: x.c, createdAt: new Date().toISOString(), src: null, outputs: [], via: 'mcp' };
      manifest.spent = Math.round((manifest.spent + x.c) * 100) / 100;
      if (alt) { const prev = manifest.assets[x.id] ?? { alts: [] }; prev.alts = [...(prev.alts ?? []), entry]; manifest.assets[x.id] = prev; }
      else {
        const prev = manifest.assets[x.id];
        if (prev && prev.src && existsSync(join(root, prev.src))) {
          const archived = prev.src.replace(/(\.[a-z]+)$/, `.prev-${stamp}$1`);
          renameSync(join(root, prev.src), join(root, archived));
          entry.history = [...(prev.history ?? []), { ...prev, src: archived, alts: undefined }];
        }
        entry.alts = prev?.alts ?? [];
        manifest.assets[x.id] = entry;
      }
      entries[j.index] = entry;
    }
    save();
    let pending = jobs.map((j) => ({ index: j.index, job_id: j.job_id }));
    const results = {};
    for (let tries = 0; pending.length && tries < 80; tries++) {
      const w = await mcpCall('jobs_wait', { jobs: pending, timeout_seconds: 15 });
      writeFileSync(join(srcDir, `wait-${stamp}-${tries}.json`), JSON.stringify(w.raw, null, 2));
      for (const it of findWaitItems(w.data)) {
        if (!terminalRe.test(it.status)) continue;
        results[it.index] = it;
        pending = pending.filter((p) => p.index !== it.index);
        const x = group[it.index];
        console.log(`  ${x.id}: ${it.status}${it.url ? '' : ' (no url)'}`);
      }
      if (pending.length) await sleep(Math.max(3, Number(w.data[0]?.poll_after_seconds ?? 5)) * 1000);
    }
    for (const j of jobs) {
      const x = group[j.index], it = results[j.index], entry = entries[j.index];
      if (!it) fail(`${x.id}: job ${j.job_id} did not finish in time; node media.mjs --resume ${x.id}`);
      if (!goodRe.test(it.status) || !it.url) fail(`${x.id}: job ${j.job_id} ended with ${it.status}; see media-src/wait-${stamp}-*.json`);
      entry.url = it.url;
      save();
      await fetchInto(x.id, entry, alt ? `${x.id}.alt${manifest.assets[x.id].alts.length}` : x.id);
    }
  }
}
/** Finish a job whose URL was not captured (MCP path): read job_status once. */
async function mcpResume(id) {
  const a = manifest.assets[id];
  if (!a || !a.jobId) fail(`no job recorded for ${id}`);
  const r = await mcpCall('job_status', { jobId: a.jobId, sync: true });
  const urls = findUrls(r.data.length ? r.data : r.texts);
  const url = urls.find((u) => imgRe.test(u)) ?? urls[0] ?? null;
  if (!url) fail(`still no URL for ${id}: ${r.texts.join(' ').slice(0, 600)}`);
  a.url = url; save();
  await fetchInto(id, a, id);
}

// ---------- logo post-processing ----------
function normHex(c) {
  c = c.trim();
  let m = c.match(/^#([0-9a-f]{3})$/i);
  if (m) return '#' + m[1].split('').map((x) => x + x).join('').toLowerCase();
  m = c.match(/^#([0-9a-f]{6})([0-9a-f]{2})?$/i);
  if (m) return '#' + m[1].toLowerCase();
  m = c.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
  if (m) return '#' + [m[1], m[2], m[3]].map((n) => Number(n).toString(16).padStart(2, '0')).join('');
  return null;
}
async function logo(source) {
  let svg = /^https?:/.test(source) ? await (await fetch(source)).text() : readFileSync(source, 'utf8');
  if (/<image[\s>]/i.test(svg)) fail('the SVG embeds a raster <image>; it cannot be tinted. Pick another candidate.');
  writeFileSync(join(mediaDir, 'logo-original.svg'), svg);
  svg = svg.replace(/<\?xml[^>]*>\s*/i, '').replace(/<!DOCTYPE[^>]*>\s*/i, '').trim();
  const open = svg.match(/<svg\b[^>]*>/i);
  if (!open) fail('no <svg> root');
  let tag = open[0];
  let vb = tag.match(/viewBox="([^"]+)"/i)?.[1];
  const w = tag.match(/\swidth="([\d.]+)(px)?"/i)?.[1];
  const h = tag.match(/\sheight="([\d.]+)(px)?"/i)?.[1];
  if (!vb && w && h) vb = `0 0 ${w} ${h}`;
  if (!vb) fail('no viewBox and no width/height on the root');
  tag = tag.replace(/\s(width|height)="[^"]*"/gi, '');
  if (!/viewBox=/i.test(tag)) tag = tag.replace(/<svg/i, `<svg viewBox="${vb}"`);
  svg = svg.replace(open[0], tag);
  const [vx, vy, vw, vh] = vb.split(/[\s,]+/).map(Number);
  // A full-canvas background right after the root: drop it (Recraft paints one).
  const bodyStart = svg.indexOf('>', svg.indexOf('<svg')) + 1;
  const bodyMatch = svg.slice(bodyStart).match(/^\s*<rect\b[^>]*\/?>(?:\s*<\/rect>)?/i);
  if (bodyMatch) {
    const r = bodyMatch[0];
    const num = (k) => Number(r.match(new RegExp(`\\s${k}="([\\d.]+)`, 'i'))?.[1] ?? NaN);
    const near = (a, b) => Math.abs(a - b) <= Math.max(vw, vh) * 0.01;
    if (near(num('width'), vw) && near(num('height'), vh) && (Number.isNaN(num('x')) || near(num('x'), vx)) && (Number.isNaN(num('y')) || near(num('y'), vy))) {
      svg = svg.slice(0, bodyStart) + svg.slice(bodyStart + r.length);
      console.log('  dropped full-canvas background rect');
    }
  }
  // Paints in order of first appearance → the --mark-* contract.
  const seen = [];
  const paintRe = /(fill|stroke|stop-color)\s*[:=]\s*"?([^";)]+?)"?(?=[\s;"\/>])/gi;
  let m;
  while ((m = paintRe.exec(svg))) {
    const hex = normHex(m[2]);
    if (hex && !seen.includes(hex)) seen.push(hex);
  }
  const roles = ['fg', 'pulse', 'dot'];
  const map = {};
  for (const pair of list(flags.map)) { const [hex, role] = pair.split('='); map[normHex(hex)] = role; }
  seen.forEach((hex, i) => { if (!map[hex]) map[hex] = roles[Math.min(i, roles.length - 1)]; });
  for (const [hex, role] of Object.entries(map)) {
    const alt = hex.length === 7 ? [hex, hex.toUpperCase(), '#' + hex.slice(1).replace(/(.)\1/g, '$1')] : [hex];
    for (const v of alt) svg = svg.split(v).join(`var(--mark-${role})`);
    console.log(`  ${hex} → var(--mark-${role})`);
  }
  svg = svg.replace(/rgba?\([^)]*\)/gi, (c) => { const hx = normHex(c); return hx && map[hx] ? `var(--mark-${map[hx]})` : c; });
  svg = svg.replace(/\bid="([^"]+)"/g, 'id="mk-$1"').replace(/url\(#([^)]+)\)/g, 'url(#mk-$1)').replace(/href="#([^"]+)"/g, 'href="#mk-$1"');
  writeFileSync(join(mediaDir, 'logo-mark.svg'), svg + '\n');
  manifest.logo = { source, viewBox: vb, paints: map, processedAt: new Date().toISOString() };
  save();
  console.log(`wrote media/logo-mark.svg (viewBox ${vb}) and media/logo-original.svg`);
}

// ---------- main ----------
const only = list(flags.only);
const via = flags.via ?? 'mcp';
const todo = brief.assets.map((a) => a.id).filter((id) => !only.length || only.includes(id));

if (flags.balance) {
  const b = balance();
  if (manifest.balanceBefore === null) manifest.balanceBefore = b; else manifest.balanceAfter = b;
  save();
  console.log(`credits: ${b} (spent so far by this script: ${manifest.spent}, cap ${cap})`);
} else if (flags.plan) {
  let total = 0;
  const rows = [];
  for (const id of todo) {
    if (done(id) && !flags.force) { rows.push([id, '(have)', '']); continue; }
    const s = spec(id);
    if (s.blocked) { rows.push([id, s.model, `blocked: ${s.blocked}`]); continue; }
    const c = via === 'cli' ? cost(s) : await mcpCost(s);
    total += c;
    rows.push([id, s.model, c]);
  }
  for (const [id, m, c] of rows) console.log(`${id.padEnd(22)} ${String(m).padEnd(20)} ${c}`);
  console.log(`${'total'.padEnd(22)} ${''.padEnd(20)} ${Math.round(total * 100) / 100}   (spent ${manifest.spent}, cap ${cap}, balance ${balance()})`);
  if (manifest.spent + total > cap) { console.error(`over cap by ${manifest.spent + total - cap}`); process.exit(1); }
} else if (flags.logo) {
  await logo(flags.logo);
} else if (flags.import) {
  await importUrl(flags.import, { alt: !!flags['as-alt'] });
} else if (flags.resume) {
  if (via === 'cli') await resume(flags.resume); else await mcpResume(flags.resume);
} else if (flags.pick) {
  await pick(flags.pick);
} else if (flags.optimize) {
  for (const id of todo) if (manifest.assets[id]?.src) { await optimise(id); console.log(`${id} → ${manifest.assets[id].outputs.join(', ')}`); }
  save();
} else if (flags.alt) {
  if (via === 'cli') for (const id of list(flags.alt)) await generate(id, { alt: true });
  else await mcpGenerate(list(flags.alt), { alt: true });
} else if (flags.force) {
  if (via === 'cli') for (const id of list(flags.force)) await generate(id, { force: true });
  else await mcpGenerate(list(flags.force), { force: true });
} else {
  if (via === 'cli') for (const id of todo) await generate(id);
  else await mcpGenerate(todo);
  console.log(`spent ${manifest.spent} of cap ${cap}`);
}
