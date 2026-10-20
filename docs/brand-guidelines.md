# Brand Guidelines v2.0 — Muhammed Kado / mkado.dev

> Last updated: 2026-09-14
> Status: Active — source of truth for `src/styles/global.css` tokens and `assets/design-tokens.{css,json}` (kept in step by hand)

## Quick Reference

| Element | Value |
|---------|-------|
| Paper (background) | #F4F3ED light · #121317 dark |
| Ink (text, blocks) | #17181C light · #ECEBE4 dark |
| Signal (the one colour) | #2447D6 light · #8EA3FF dark |
| Live (status only) | #157A3B light · #3FC46F dark |
| Display font | Instrument Serif |
| Body font | Instrument Sans |
| Illustration | Two-ink risograph prints (black + cobalt on paper), generated with Higgsfield |
| Voice | Plain, specific, first person |

---

## Brand Concept: "Two-ink print"

Muhammed Kado is a computer engineer who builds the web side of RFID systems: the software that turns a
read pulse from a reader into inventory, billing and logistics for hotels, hospitals and laundries in 30+
countries. The brand takes its material from that world and from print: **paper, black ink and one
signal blue**. The site reads like a well-printed technical brochure — hairlines instead of cards,
ruled lists instead of chips, one ink-filled block for rhythm — and its pictures are risograph-style
prints of the actual work: a laundry floor, a handheld reader, tagged linen, one small server with seven
cables. Blue is the read signal: the tag that lights up, the link you can follow, the dot in the mark.

Everything follows from it:

- **Precision over decoration.** Hairlines, tabular numbers, real facts (years, countries, applications).
  No gradients, no shadows, no bevels.
- **Quiet confidence.** One accent colour, one orchestrated moment of motion on load, then calm.
- **Readable by anyone.** Every technical claim gets a plain-words version; a recruiter without a
  technical background should never feel lost.
- **Proof, not adjectives.** The work is live and can be opened; the site says so and gets out of the way.

Mood keywords: printed, precise, calm, technical, trustworthy, alive (a live status, not a loud one).

The dark theme is the same page printed in reverse (paper and ink swap, the blue lightens); the prints
themselves stay on paper in both themes, like a photograph pasted onto the page.

---

## 1. Color Palette

### Light theme

| Token | Name | Hex | Usage |
|-------|------|-----|-------|
| `--paper` | Paper | #F4F3ED | Page background |
| `--paper-2` | Paper 2 | #EBE9E1 | Recessed surfaces: credential boxes, code |
| `--ink` | Ink | #17181C | Text, the ink block, the mark's tile, primary buttons |
| `--ink-2` | Ink 2 | #4A4C54 | Secondary text |
| `--ink-3` | Ink 3 | #5F626B | Captions, labels (4.9:1 on paper) |
| `--line` | Line | #D9D7CE | Hairlines |
| `--line-2` | Line 2 | #C4C2B8 | Stronger hairlines, form borders |
| `--accent` | Signal | #2447D6 | Links, active nav, focus, the rail, the halftone field (6.4:1 on paper) |
| `--accent-deep` | Signal deep | #1A36AD | Hover |
| `--accent-tint` | Signal tint | #D6DEF9 | Fills and the screenshot duotone, never text |
| `--accent-on-ink` | Signal on ink | #6F8BFF | The blue when it sits on an ink surface (mark dot) |
| `--live` | Live | #157A3B | The live-status dot and "copied" only, never decorative |
| `--down` | Down | #B45309 | A demo that is not responding, form errors |

### Dark theme (`html[data-theme="dark"]`)

| Token | Hex | Note |
|-------|-----|------|
| `--paper` / `--paper-2` | #121317 / #1A1B21 | |
| `--ink` / `--ink-2` / `--ink-3` | #ECEBE4 / #B6B5AD / #8D8D87 | |
| `--line` / `--line-2` | #2A2B32 / #3A3B43 | |
| `--accent` / `--accent-deep` / `--accent-tint` | #8EA3FF / #A9BAFF / #1D2A66 | 7.8:1 on paper |
| `--accent-on-ink` | #2447D6 | on the light tile |
| `--live` / `--down` | #3FC46F / #F59E0B | |

The prints keep `--print-paper: #F4F3ED` in both themes. The ink block (`.ink`) takes the other theme's
tokens wholesale, so buttons and links inside it need no special rules.

### Accessibility

Every text/background pair produced by the tokens was checked (14 pairs per theme, 2026-09-14): all at
or above 4.5:1; Ink on Paper 16:1, Signal on Paper 6.4:1 (light) and 7.8:1 (dark). Live green is never
the only carrier of meaning: a dot is always paired with a word or a year.

---

## 2. Typography

```css
--font-display: "Instrument Serif", Georgia, "Times New Roman", serif;
--font-body: "Instrument Sans Variable", "Instrument Sans", system-ui, -apple-system, "Segoe UI", sans-serif;
--font-mono: ui-monospace, "Cascadia Mono", "SF Mono", Menlo, Consolas, monospace;
```

Instrument Serif (regular only, no bold) carries the headlines, the application names and the big
numbers; it is set large and never used for body text. Instrument Sans, from the same designer, does the
reading and every control. Monospace is reserved for data people copy: credentials and the build hash.
Both faces are self-hosted from fontsource (`font-src 'self'`) and preloaded.

| Element | Size | Face | Line height |
|---------|------|------|-------------|
| H1 | clamp(2.6rem, 6.2vw, 4.6rem) | Serif 400, −0.01em | 1.0 |
| H2 | clamp(2rem, 3.6vw, 2.9rem) | Serif 400 | 1.05 |
| H3 / application names | 1.5rem | Serif 400 | 1.2 |
| Big numbers (facts, ink block) | 1.85–2rem | Serif 400, tabular | 1.05 |
| Body | 17px (16px under 640px) | Sans 400 | 1.6 |
| Lede | 1.08rem | Sans 400, Ink 2 | 1.6 |
| Controls, labels | 0.86–0.95rem | Sans 500 | 1.5 |
| Data | 0.84rem | Mono | 1.5 |

Rules: sentence case everywhere; no uppercase tracked labels; no single-word accents inside a headline;
no arrows appended to link text. Structure comes from hairlines, not from labels.

---

## 3. Logo Usage

The mark is a rounded Ink tile with the lowercase **"mk"** drawn as one monoline stroke; the k's arm ends
in the blue read dot. It is set by the tokens in the site (`src/components/Mark.astro`), so it prints
dark-on-paper in the light theme and paper-on-dark in the dark theme; the dot is always the signal blue.

| Variant | File | Use Case |
|---------|------|----------|
| Mark (site) | src/components/Mark.astro | Header; colours from tokens |
| Mark (fixed colours) | public/logo-mark.svg | Share images, avatars, documents (#17181C tile, #F4F3ED stroke, #6F8BFF dot) |
| Favicon | public/favicon.svg | Browser tab (same drawing, heavier stroke) |
| Wordmark | "Muhammed Kado" set in Instrument Sans 600 next to the mark | Header, documents |

Clear space: 25% of the mark's width on every side. Minimum size 16px (the "mk" stays legible).
Don'ts: no extra colours, no rotation, no shadows, no outline around the tile.

---

## 4. Voice & Tone

**Voice:** plain, specific, first person. Short sentences. Facts with numbers (3.3 years, 7 live
applications, 30+ countries) instead of adjectives ("passionate", "innovative" never appear). Sentence
case everywhere; no exclamation marks; no emoji.

**Two registers, always both:**

1. *Technical* — names the real stack and the real problem ("REST APIs in PHP, Laravel and Zend Framework 1
   for real-time RFID inventory tracking").
2. *Plain words* — the same claim for a non-technical reader ("I build the software that lets hotels and
   laundries know where every towel and uniform is, automatically").

**Tone by context**

| Context | Tone |
|---------|------|
| Hero / positioning | Direct, declarative: "I build the web side of RFID systems that run in 30+ countries." |
| Work / demos | Practical, inviting: "Use the demo accounts, change whatever you like; everything resets overnight." |
| Contact | Warm, low-pressure: "Email is the fastest way to reach me." |
| Errors / empty states | Say what happened and what to do next; never apologise, never vague. |

**Words we use:** build, ship, live, runs in, since 2023, open to work, in plain words.

### Prohibited Terms

| Avoid | Reason |
|-------|--------|
| Passionate | Says nothing a live demo doesn't say better |
| Ninja / rockstar / guru | Undermines the engineer positioning |
| Cutting-edge / innovative | Vague claim; use the specific thing instead |
| Synergy / leverage | Corporate filler; use "use" |
| Click here | Links say what they open |
| Exclamation marks / emoji | Off-voice for a calm, precise brand |

---

## 5. Messaging Framework

| Layer | Message |
|-------|---------|
| Tagline | I build the web side of RFID systems that run in 30+ countries. |
| Positioning | Computer engineer, full-stack developer in İstanbul, three years on production RFID software at USTEK, seven live applications anyone can open. |
| Proof points | 3.3 years at USTEK RFID (live counter) · 7 live applications with demo accounts · 30+ countries · 4 languages (Kurdish, Arabic, Turkish, English) |
| Audiences | Technical hiring managers (want stack + proof) · HR / recruiters, often Turkish-speaking (want clarity + plain words) · Clients (want "can this person ship?") |
| Call to action | Primary: "See the live work" / "Open <app>". Secondary: "Download CV". Contact: "Send me a message". |

---

## 6. Imagery & Motion

- **Prints:** nine risograph-style two-ink illustrations (black + cobalt on off-white paper, visible
  grain, a hint of misregistration, wordless): the hero (a laundry floor with a handheld reader and
  tagged linen), one spot per application, and a small server with seven cables (`about.webp`, made for
  the old "how it runs" block; not on the home page since 2026-10-20).
  Sources: `../../tools/mkado-art-src/*.png` (7 MB originals, outside the repo); `scripts/art.mjs`
  resizes them into `src/assets/art/*.webp`; `<Picture>` serves AVIF/WebP. Prints sit on `--print-paper`
  in both themes, inside a hairline with a 14px radius. No stock photography, no 3D renders, no photos
  of people.
- **Screenshots:** the seven signed-in dashboards (`npm run shots`) are shown as a blue duotone inside a
  hairline frame (`.frame`), and in real colour under the pointer, on focus, and on touch screens.
- **Backdrop:** paper with a film of print grain (feTurbulence, multiply on light / screen on dark) and
  one halftone dot field in Signal behind the hero that scrolls away with it. Nothing else.
- **Icons:** 24px stroke icons (2px, round caps), currentColor. Never emoji.
- **Motion: the page goes through the press as it is read.** Three layers:
  1. *Load (CSS, never waits for a script):* the hero copy rises in order, the print prints itself with a
     clip-path wipe, the reader pulses once.
  2. *Reading (GSAP + ScrollTrigger, home page only, `src/scripts/home-motion.ts`):* headlines are set
     line by line; a ruled list rules its heavy top line from the left, then its rows rise as they reach
     the screen; the ink block rolls out from an inset, rounded card to the full width and an RFID read
     travels across it, tag to reader to platform, lighting each step and "my part" last; the timeline rail fills and each entry's dot takes the signal colour as the
     rail reaches it; the halftone field drifts up as the hero leaves and shifts slightly against the
     pointer; the primary hero button leans toward the pointer. Each reveal plays once; the scroll-linked
     ones follow the scroll both ways. Markup hooks: `data-reveal="lines" | "up" | "rows"`.
  3. *Scrolling (Lenis, every page, `src/scripts/smooth-scroll.ts`):* smooth wheel scrolling, in-page
     links glide to the section under the header; touch keeps the platform's own scrolling.

  Motion that answers an action stays CSS (a row opens, a link underline fills, a button fills with ink,
  "copied"). GSAP is fetched only by pages with `data-reveal` (~47 KB gz); Lenis ships everywhere (~5 KB gz).
  Easing `cubic-bezier(0.22,1,0.36,1)` in CSS, `power4.out` in GSAP; transforms, opacity and short clips
  only; no blur, no bounce. `prefers-reduced-motion` renders the final state with native scrolling; with
  JavaScript off, or if the GSAP chunk has not arrived within 2.5 s, the page shows as it is. Continuous
  animation is reserved for the live-status dot.

---

## 7. AI Image Generation (Higgsfield, GPT Image 2.5)

Style constant, prepended to every prompt (`tools/shots/higgsfield/gen-mkado.mjs`):

```
Risograph print illustration in exactly two inks, deep black and bright cobalt blue, on off-white paper, with visible grain and a hint of misregistration. Flat graphic shapes, generous empty paper around the subject, wordless (every line of text is a plain horizontal stroke), calm, front-on composition.
```

Spot prints add "Same style as the reference image." and pass the hero's job id as the image reference,
so the set stays one hand. Hero 4:3, spots 1:1, quality high, resolution 2k (3 credits each).

| Category | Keywords |
|----------|----------|
| **Subject** | the actual work: linen carts, handheld readers, tags, a counter, a clipboard, clocks, a server |
| **Treatment** | two inks only, paper texture, misregistration, flat shapes, blue as the one highlight |
| **Composition** | front-on, centred, generous paper around the subject |
| **Never** | text or letters, faces, screens with real UI, logos, trademarks |

### Visual Don'ts

| Avoid | Reason |
|-------|--------|
| Neon green on black | Reads as "hacker", not engineer |
| Circuit-board / binary clichés | Generic tech decoration |
| Gradients, glows, glass | Off-brand: this is a printed page |
| Stock-photo laptops and handshakes | Nothing to do with the actual work |
