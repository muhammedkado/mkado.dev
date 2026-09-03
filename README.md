# mkado.dev

Personal site of Muhammed Kado — full-stack PHP/Laravel developer in İstanbul. Live at **https://mkado.dev**.

The page is a single static build: who I am, one job, four live demos with sign-in details, other projects, skills, contact. All content lives in `src/data/site.ts`; the components only render it.

## Live demos linked from the site

| App | URL | Repo |
|---|---|---|
| POS Admin Dashboard | https://pos.mkado.dev | [POS-Project-Admin-LTE-Dashboard-](https://github.com/muhammedkado/POS-Project-Admin-LTE-Dashboard-) |
| BestTrend SY | https://besttrend.mkado.dev (admin: https://besttrend-api.mkado.dev/admin/login) | private |
| Invoice System | https://invoice.mkado.dev | [invoice-system-php](https://github.com/muhammedkado/invoice-system-php) |
| Find Job with AI | https://findjob.mkado.dev | [find_job_with_ai](https://github.com/muhammedkado/find_job_with_ai) |

Flip `demosLive` in `src/data/site.ts` to `true` once the subdomains resolve — it switches the board header from "deploying now" to a live indicator.

## Stack

- [Astro](https://astro.build) 7, static output, one page
- Tailwind CSS 4 (via `@tailwindcss/vite`) plus a hand-written stylesheet in `src/styles/global.css`
- Instrument Serif + Geist from Google Fonts
- Light/dark theme: system preference by default, toggle stored in `localStorage`
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
