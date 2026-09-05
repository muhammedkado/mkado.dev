// Live status for the demo boards on /, /v2 and /v3.
//
// The pages are built with a static "all systems up" state (site.ts demosLive).
// This swaps in the server's 5-minute probe — /status.json, written by
// deploy/mkado-status.sh — and stays silent on any error, so the static markup
// is the fallback. Elements opt in with data attributes:
//   [data-status-dot="<slug>"]   one per demo; gets data-state="up|down"
//   [data-status-pill]           the summary pill; gets data-state, and its
//   [data-status-text]           child receives the new wording.

type App = { ok: boolean; code: number; ms: number };
type Status = { checkedAt: string; apps: Record<string, App> };

const TR = document.documentElement.lang === 'tr';

function ago(iso: string): string {
  const min = Math.max(0, Math.round((Date.now() - Date.parse(iso)) / 60_000));
  if (TR) return min < 1 ? 'az önce' : `${min} dk önce`;
  return min < 1 ? 'just now' : min === 1 ? '1 min ago' : `${min} min ago`;
}

function wording(up: number, total: number, when: string): string {
  if (TR) {
    return up === total
      ? `Tüm sistemler ayakta · ${when} kontrol edildi`
      : `${total} demodan ${up} tanesi ayakta · ${when} kontrol edildi`;
  }
  return up === total ? `All systems up · checked ${when}` : `${up} of ${total} up · checked ${when}`;
}

async function refresh(): Promise<void> {
  try {
    const res = await fetch('/status.json', { cache: 'no-store' });
    if (!res.ok) return;
    const status: Status = await res.json();
    // Ignore a stale file (probe not running for >20 min): the static state is safer than a wrong one.
    if (Date.now() - Date.parse(status.checkedAt) > 20 * 60_000) return;

    let up = 0;
    let total = 0;
    const seen = new Set<string>();
    document.querySelectorAll<HTMLElement>('[data-status-dot]').forEach((el) => {
      const slug = el.dataset.statusDot ?? '';
      const app = status.apps[slug];
      if (!app) return;
      el.dataset.state = app.ok ? 'up' : 'down';
      el.title = app.ok ? `${slug}: up (${app.ms} ms)` : `${slug}: not responding (HTTP ${app.code})`;
      if (!seen.has(slug)) {
        seen.add(slug);
        total += 1;
        if (app.ok) up += 1;
      }
    });
    if (total === 0) return;

    const when = ago(status.checkedAt);
    document.querySelectorAll<HTMLElement>('[data-status-pill]').forEach((pill) => {
      pill.dataset.state = up === total ? 'up' : 'down';
      const text = pill.querySelector<HTMLElement>('[data-status-text]');
      if (text) text.textContent = wording(up, total, when);
    });
  } catch {
    // Network or JSON error: keep the build-time state.
  }
}

refresh();
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') refresh();
});
