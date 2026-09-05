# mkado.dev

Personal site of Muhammed Kado — computer engineer and full-stack PHP/Laravel/React developer in İstanbul. Live at **https://mkado.dev**.

Three renderings of the same content, all static:

- `/` — the main site: an animated RFID-reader hero, a tabbed board of six live demos (dashboard screenshot, one-click "Open signed in" button, demo accounts as the fallback), a timeline, skills tied to the projects that use them, contact.
- `/v2` — a Swiss / minimalist rendering generated with the [ui-ux-pro-max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) design system (`design-system/mkado-dev-v2/MASTER.md`): navy + blue CTA, Space Grotesk / Archivo, filterable project grid, GSAP reveals. `noindex`, left out of the sitemap.
- `/v3` — "mkOS": the same content as a small operating system, written so non-programmers can follow it. Boot screen, windows, dock, Ctrl+K search, a terminal with clickable commands, an in-place English / Turkish switch (Turkish copy in `src/data/tr.ts`). `noindex`, left out of the sitemap.

All content lives in `src/data/site.ts`; the components only render it. The years-of-experience figure is computed from `experience.startDate` (`src/lib/tenure.ts`) at build time and again in the browser on every load, so it never goes stale.

## Live demos

| App | Open signed in | Repo |
|---|---|---|
| POS Admin Dashboard | https://pos.mkado.dev/demo/admin | [POS-Project-Admin-LTE-Dashboard-](https://github.com/muhammedkado/POS-Project-Admin-LTE-Dashboard-) |
| BestTrend SY (app) | https://besttrend.mkado.dev | private |
| BestTrend admin & API | https://besttrend-api.mkado.dev/admin/demo | private |
| Invoice System | https://invoice.mkado.dev/demo.php | [invoice-system-php](https://github.com/muhammedkado/invoice-system-php) |
| Find Job with AI | https://findjob.mkado.dev (no sign-in) | [find_job_with_ai](https://github.com/muhammedkado/find_job_with_ai) |
| Tire Shop PWA | https://tireshop.mkado.dev (local demo mode, no sign-in) | [tire-shop](https://github.com/muhammedkado/tire-shop) |

Each app exposes a `/health` probe (`/health.php` for the invoice app). On the server, `deploy/mkado-status.sh` runs every 5 minutes, probes them with a two-strike rule (the nightly reseed must not flip the board) and writes `/var/www/mkado.dev/status/status.json`, served as `/status.json`. `src/scripts/status.ts` swaps that live state into the dots and the "All systems up · checked N min ago" pill; without it the pages keep their build-time state (`demosLive` in `site.ts`).

## Screenshots and share image

- `npm run shots` — captures each demo's signed-in dashboard into `src/assets/shots/<slug>.png` with the installed Chrome over the DevTools protocol (`scripts/shots.mjs`); `astro:assets` turns them into AVIF/WebP at build time.
- `npm run og` — renders `scripts/og.html` to `public/og.png` (1200×630) in the brand.

Both outputs are committed; the deploy refuses a dirty tree.

## Brand

`docs/brand-guidelines.md` is the source of truth for colours, type, voice, the mark and motion rules (written with the ui-ux-pro-max `brand` skill). `assets/design-tokens.json` / `.css` are generated from it. The mark lives in `public/logo-mark.svg` (favicon is the same drawing).

## Stack

- [Astro](https://astro.build) 7, static output, no client-side framework; GSAP only on `/v2`
- Tailwind CSS 4 (via `@tailwindcss/vite`) plus hand-written stylesheets: `src/styles/global.css` (`/`), `swiss.css` (`/v2`), `os.css` (`/v3`)
- Fonts: Bricolage Grotesque + Instrument Sans (`/`), Space Grotesk + Archivo (`/v2`), IBM Plex Mono + VT323 (`/v3`)
- Light/dark theme: system preference by default, toggle stored in `localStorage`
- `@astrojs/sitemap`, Open Graph image, JSON-LD `Person`, custom `404.astro`

## Develop

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # -> dist/
npm run preview
```

## Deploy

`dist/` is plain static files. From the `mkado-dev` workspace (one level above the repos):

```sh
./deploy.sh mkado.dev            # build here, upload dist/ to the server, swap it in
./deploy.sh mkado.dev --nginx    # also install deploy/nginx.conf and the status probe (cron)
./deploy.sh mkado.dev --shots    # re-capture screenshots + share image first
```

The server has no Node: builds happen on the workstation, only `dist/` travels (ssh alias `mkado`). `deploy/nginx.conf` is the vhost (Cloudflare Origin CA in front, long cache on `/_astro/`, `/status.json` aliased from outside `dist/`).
