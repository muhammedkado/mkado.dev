# mkado.dev

Personal site of Muhammed Kado — computer engineer and full-stack PHP/Laravel/React developer in İstanbul. Live at **https://mkado.dev**.

Two renderings of the same content, both static:

- `/` — the main site: an animated RFID-reader hero, a tabbed showcase of five live demos with sign-in details, a timeline, skills tied to the projects that use them, contact.
- `/v2` — a Swiss / minimalist rendering generated with the [ui-ux-pro-max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) design system (`design-system/mkado-dev-v2/MASTER.md`): navy + blue CTA, Space Grotesk / Archivo, hero → strengths → filterable project grid → about + experience → skills → CTA panel, staggered reveals. `noindex`, left out of the sitemap.
- `/v3` — "mkOS": the same content as a small operating system, written so non-programmers can follow it. Boot screen, menu bar with a live clock and status, windows with working minimize / maximize / close, a dock, Ctrl+K search, a terminal window with clickable commands, a trash-bin easter egg, and an in-place English / Turkish switch (Turkish copy in `src/data/tr.ts`). `noindex`, left out of the sitemap.

All content lives in `src/data/site.ts`; the components only render it. The years-of-experience figure is computed from `experience.startDate` (`src/lib/tenure.ts`) at build time and again in the browser on every load, so it never goes stale.

## Live demos linked from the site

| App | URL | Repo |
|---|---|---|
| POS Admin Dashboard | https://pos.mkado.dev | [POS-Project-Admin-LTE-Dashboard-](https://github.com/muhammedkado/POS-Project-Admin-LTE-Dashboard-) |
| BestTrend SY | https://besttrend.mkado.dev (admin: https://besttrend-api.mkado.dev/admin/login) | private |
| Invoice System | https://invoice.mkado.dev | [invoice-system-php](https://github.com/muhammedkado/invoice-system-php) |
| Find Job with AI | https://findjob.mkado.dev | [find_job_with_ai](https://github.com/muhammedkado/find_job_with_ai) |
| Tire Shop PWA | https://tireshop.mkado.dev | [tire-shop](https://github.com/muhammedkado/tire-shop) |

Flip `demosLive` in `src/data/site.ts` to `true` once the subdomains resolve — it switches the status pills from "deploying now" to a live indicator.

## Stack

- [Astro](https://astro.build) 7, static output, two pages, no client-side framework
- Tailwind CSS 4 (via `@tailwindcss/vite`) plus hand-written stylesheets: `src/styles/global.css` (main) and `src/styles/terminal.css` (`/v2`)
- Google Fonts: Bricolage Grotesque + Instrument Sans (main), IBM Plex Mono (`/v2`)
- Light/dark theme: system preference by default (the terminal defaults to dark), toggle stored in `localStorage` and shared by both pages
- `@astrojs/sitemap`, Open Graph image (`public/og.png`), JSON-LD `Person`

## Develop

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # -> dist/
npm run preview
```

## Deploy

`dist/` is plain static files. `deploy/deploy.sh` builds locally and rsyncs it to the VPS; `deploy/nginx.conf` is the vhost (Cloudflare Origin CA in front, long cache on `/_astro/`).

```sh
./deploy/deploy.sh deploy@VPS_IP
```
