# Candidate designs, September 2026

Ten homepage directions for mkado.dev, all rendering the same content, so the
choice is about layout, type, canvas and motion, not about what is said.

Open `index.html` for the gallery, or any `NN-name.html` directly. The pill in
the bottom-right corner switches dark and light and links back to the gallery.
`?theme=dark|light` forces a theme, `?bare=1` hides the pill (the screenshot
pass uses both).

| # | File | Concept |
|---|---|---|
| 01 | `01-signal-index.html` | Numbered editorial index, hover previews, Fraunces + Schibsted Grotesk |
| 02 | `02-control-room.html` | Telemetry: pinned project panel beside a stream of screenshots, Sora + Martian Mono |
| 03 | `03-swiss-ledger.html` | Twelve-column grid, the work as a table, one red rule, Host Grotesk |
| 04 | `04-gallery-wall.html` | Tight-guttered wall of the seven screenshots, Gabarito + Figtree |
| 05 | `05-reel.html` | Horizontal reel with native scroll-snap, credits, marquee, Syne + Hanken Grotesk |
| 06 | `06-chapters.html` | One project per screen with CSS scroll-snap, per-project accents, Anybody + Public Sans |
| 07 | `07-blueprint.html` | Engineering drawing built on the real architecture diagrams, Red Hat Display + Mono |
| 08 | `08-broadsheet.html` | A newspaper front page and sections, Newsreader + Libre Franklin |
| 09 | `09-atelier.html` | One project on stage at a time, quiet luxury, Cormorant Garamond + Onest |
| 10 | `10-monolith.html` | Black and white, huge list with a cursor-following preview, Familjen Grotesk + Instrument Serif |

## Layout of this folder

```
build.mjs            renders src/designs/*.mjs to NN-name.html, index.html and artifact.html; copies shots/
shoot.mjs            headless-Chrome captures to previews/ (light + dark, 1440 viewport + 390 full page)
check.mjs            contrast audit of every page in both themes
src/content.mjs      the one content object (mirrors src/data/site.ts and the case studies)
src/helpers.mjs      escaping, <head>, theme script, reset, icons, logo mark, status attributes, reveal observer
src/gallery.mjs      the gallery template
src/designs/         one module per design, fully self-contained (own CSS, structure and scripts)
shots/               the seven demo screenshots, copied from src/assets/shots at build time
previews/            output of shoot.mjs, used by the gallery
media.mjs            Higgsfield generation: cost gate, download, sharp to AVIF/WebP, manifest, logo post-processing
higgsfield-oauth.mjs sign-in for the Higgsfield MCP (device code), used by media.mjs
src/media-brief.mjs  every generated asset: model, params, prompt (7 key visuals, 10 plates, 3 logo candidates)
media/               optimised outputs + manifest.json (committed)
media-src/           originals and raw job responses (gitignored; re-fetch from the manifest URLs)
brandkit/            Higgsfield brandkit state: approved palette, brand lock, review boards
```

```
node design-system/candidates-2026-09/build.mjs        # all designs
node design-system/candidates-2026-09/build.mjs 03 07  # some
node design-system/candidates-2026-09/shoot.mjs        # previews; fails on horizontal overflow at 390px
node design-system/candidates-2026-09/check.mjs        # contrast below 4.5:1 (3:1 for large text)
```

## Rules every design follows

- Same theme contract as the live site: `data-theme="dark|light"` on `<html>` or the system
  preference, `localStorage.theme`, tokens defined once with `light-dark()`.
- The status contract survives: `data-status-dot="<slug>"`, `data-status-pill`,
  `data-status-text`, so `src/scripts/status.ts` can patch the winner unchanged.
- Motion is CSS, IntersectionObserver and requestAnimationFrame only, gated on `html.js`,
  flattened under `prefers-reduced-motion`. No GSAP, no WebGL.
- Fonts come from Google Fonts here only. Production CSP is `font-src 'self'`, so the winner's
  faces are installed from fontsource when it is built into the Astro site.
- `artifact.html` is the gallery without the document wrapper, for publishing as a claude.ai
  artifact together with the ten pages, `shots/`, `previews/` and `media/`.

## Generated media (Higgsfield)

```
node design-system/candidates-2026-09/media.mjs --balance          # credits left
node design-system/candidates-2026-09/media.mjs --plan --cap 100   # cost of what is missing, no spend
node design-system/candidates-2026-09/media.mjs --only kv-pos      # generate (refuses past the cap)
node design-system/candidates-2026-09/media.mjs --import kv-pos=<url> --cost 3   # a result made elsewhere
node design-system/candidates-2026-09/media.mjs --logo media-src/logo-2.svg      # approved mark → media/logo-mark.svg
```

- Media is optional. Until an asset exists, pages render exactly as before and `build.mjs` lists
  what is missing. Helpers: `h.plate(id)` + `h.plateClass(id)` for a hero plate,
  `h.keyVisual(demo, attrs, { fallback })` for a project cover, `h.picture(id)` for a plain figure.
- One image per asset serves both themes. A plate made for a light ground multiplies on light and
  is inverted and screened on dark (and the reverse for a dark ground); tune per design with
  `--plate-o`, `--plate-o-dark`, `--plate-mask`.
- Key visuals cover the screenshots on hover-capable screens; the live screenshot shows on hover or
  focus, and touch screens keep the screenshot (Gallery Wall inverts this; Monolith's cursor preview
  and Swiss Ledger's strip show covers only).
- `check.mjs` cannot see through a blend, so it counts text over generated media separately; look at
  those spots in both themes.
- Production CSP is `img-src 'self' data:`: only the optimised copies in `media/` are ever referenced,
  never Higgsfield URLs.
