// Sign-in for the Higgsfield MCP through Higgsfield's device-code flow (RFC 8628), the
// flow its resource metadata advertises for agent clients. Used by media.mjs and usable as
// Claude Code's headersHelper. No redirect, no local callback server: the user opens the
// verification link, approves, and this script polls the token endpoint.
//
//   node higgsfield-oauth.mjs login     prints the verification link (and opens it), waits for approval,
//                                       stores tokens in ~/.config/higgsfield/mcp-tokens.json
//   node higgsfield-oauth.mjs token     prints a valid access token (refreshes when possible)
//   node higgsfield-oauth.mjs header    prints {"Authorization":"Bearer …"} for Claude Code's headersHelper
//   node higgsfield-oauth.mjs status    expiry and scope, no secrets
import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

const MCP_URL = process.env.HIGGSFIELD_MCP_URL ?? 'https://mcp.higgsfield.ai/mcp';
const CLIENT_ID = process.env.HIGGSFIELD_CLIENT_ID ?? 'mkado-media-pipeline';
const dir = join(homedir(), '.config', 'higgsfield');
const tokensPath = join(dir, 'mcp-tokens.json');

function readJson(p) { return existsSync(p) ? JSON.parse(readFileSync(p, 'utf8')) : null; }
function writeJson(p, v) { mkdirSync(dir, { recursive: true }); writeFileSync(p, JSON.stringify(v, null, 2) + '\n', { mode: 0o600 }); }
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** The device-code authorization server, from the MCP's protected-resource metadata. */
async function discover() {
  const rm = await (await fetch(new URL('/.well-known/oauth-protected-resource/mcp', MCP_URL))).json();
  const hint = rm.higgsfield_auth_hints?.options?.find((o) => o.flow === 'device_code');
  const server = hint?.authorization_server ?? rm.authorization_servers?.find((s) => /device/.test(s));
  if (!server) throw new Error('the MCP does not advertise a device-code authorization server');
  const scope = rm.scopes_supported?.join(' ') ?? 'openid email offline_access';
  return { server, scope, resource: rm.resource ?? MCP_URL };
}

function openBrowser(url) {
  const [cmd, args] = process.platform === 'win32' ? ['rundll32', ['url.dll,FileProtocolHandler', url]]
    : process.platform === 'darwin' ? ['open', [url]] : ['xdg-open', [url]];
  try { spawn(cmd, args, { detached: true, stdio: 'ignore' }).unref(); } catch {}
}

async function tokenRequest(server, body) {
  const r = await fetch(new URL('/token', server), { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  const text = await r.text();
  let j = null;
  try { j = JSON.parse(text); } catch {}
  if (r.ok && j && typeof j === 'object') {
    // Accept the usual field names; never echo a successful body, it holds the token.
    const access = j.access_token ?? j.accessToken ?? j.token ?? j.jwt ?? j.data?.access_token ?? j.data?.token;
    if (access) return { ok: true, tokens: { ...j, access_token: access, refresh_token: j.refresh_token ?? j.refreshToken ?? j.data?.refresh_token, expires_in: j.expires_in ?? j.expiresIn ?? j.data?.expires_in } };
    return { ok: false, code: 'unrecognised_token_response', text: `HTTP ${r.status}, fields: ${Object.keys(j).join(', ')}` };
  }
  const code = typeof j?.detail === 'string' ? j.detail : j?.error ?? `HTTP ${r.status}`;
  return { ok: false, code, text: r.ok ? `HTTP ${r.status}` : text.slice(0, 300) };
}

function save(tokens, meta) {
  const t = { ...meta, ...tokens, obtained_at: Date.now() };
  writeJson(tokensPath, t);
  return t;
}

async function login() {
  const { server, scope, resource } = await discover();
  const start = await fetch(new URL('/authorize', server), {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ client_id: CLIENT_ID, scope }),
  });
  if (!start.ok) throw new Error(`device authorization failed: HTTP ${start.status} ${(await start.text()).slice(0, 200)}`);
  const d = await start.json();
  const url = d.verification_uri_complete ?? d.verification_uri;
  console.log(`Open this link and approve the sign-in (${d.user_code ? `code ${d.user_code}, ` : ''}valid ${d.expires_in ?? 900} s):\n${url}\n`);
  openBrowser(url);
  const interval = Math.max(2, Number(d.interval) || 3);
  const deadline = Date.now() + (Number(d.expires_in) || 900) * 1000;
  let wait = interval;
  while (Date.now() < deadline) {
    await sleep(wait * 1000);
    const r = await tokenRequest(server, { grant_type: 'urn:ietf:params:oauth:grant-type:device_code', device_code: d.device_code, client_id: CLIENT_ID });
    if (r.ok) {
      const t = save(r.tokens, { server, client_id: CLIENT_ID, resource });
      console.log(`Signed in. Token stored in ${tokensPath} (expires in ${t.expires_in ?? '?'} s, refresh token: ${t.refresh_token ? 'yes' : 'no'}).`);
      return;
    }
    if (r.code === 'authorization_pending') continue;
    if (r.code === 'slow_down') { wait += 2; continue; }
    throw new Error(`sign-in did not complete: ${r.code} ${r.text}`);
  }
  throw new Error('the device code expired before approval; run login again');
}

async function refresh(t) {
  if (!t.refresh_token) throw new Error('token expired and no refresh token was issued; run: node higgsfield-oauth.mjs login');
  const r = await tokenRequest(t.server, { grant_type: 'refresh_token', refresh_token: t.refresh_token, client_id: t.client_id });
  if (!r.ok) throw new Error(`refresh failed (${r.code}); run: node higgsfield-oauth.mjs login`);
  return save(r.tokens, t);
}

async function accessToken() {
  let t = readJson(tokensPath);
  if (!t?.access_token) throw new Error('not signed in; run: node higgsfield-oauth.mjs login');
  const expiresAt = t.obtained_at + (Number(t.expires_in) || 3600) * 1000;
  if (Date.now() > expiresAt - 60_000) t = await refresh(t);
  return t.access_token;
}

const cmd = process.argv[2];
try {
  if (cmd === 'login') await login();
  else if (cmd === 'token') process.stdout.write(await accessToken());
  else if (cmd === 'header') process.stdout.write(JSON.stringify({ Authorization: `Bearer ${await accessToken()}` }));
  else if (cmd === 'status') {
    const t = readJson(tokensPath);
    if (!t) console.log('not signed in');
    else console.log(`scope: ${t.scope ?? '?'}\nexpires: ${new Date(t.obtained_at + (Number(t.expires_in) || 3600) * 1000).toISOString()}\nrefresh token: ${t.refresh_token ? 'yes' : 'no'}\nclient: ${t.client_id}\nserver: ${t.server}`);
  } else { console.error('usage: node higgsfield-oauth.mjs login|token|header|status'); process.exit(2); }
} catch (e) {
  console.error(e.message);
  process.exit(1);
}
