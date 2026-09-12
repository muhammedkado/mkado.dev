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
  artifact together with the ten pages, `shots/` and `previews/`.
