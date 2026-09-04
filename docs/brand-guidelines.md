# Brand Guidelines v1.0 — Muhammed Kado / mkado.dev

> Last updated: 2026-09-04
> Status: Active — source of truth for `assets/design-tokens.json` / `.css` (run `sync-brand-to-tokens.cjs` after editing)

## Quick Reference

| Element | Value |
|---------|-------|
| Primary Color | #1F4FD8 |
| Secondary Color | #16A34A |
| Accent Color | #06B6D4 |
| Primary Font | Bricolage Grotesque |
| Body Font | Instrument Sans |
| Voice | Plain, specific, first person |

---

## Brand Concept: "Signal"

Muhammed Kado is a computer engineer who builds the web side of RFID systems: the software that turns a
read pulse from a reader into inventory, billing and logistics for hotels, hospitals and laundries in 30+
countries. The brand borrows its one image from that world — **the read pulse**: concentric arcs
spreading from a reader, and the tag that lights up when the pulse reaches it.

Everything follows from it:

- **Precision over decoration.** Grids, hairlines, tabular numbers, real facts (years, countries, apps).
- **Quiet confidence.** One accent colour, one orchestrated moment of motion, then calm.
- **Readable by anyone.** Every technical claim gets a plain-words version; a recruiter without a
  technical background should never feel lost.
- **Proof, not adjectives.** The work is live and can be opened; the site says so and gets out of the way.

Mood keywords: precise, calm, technical, trustworthy, alive (a live status, not a loud one).

---

## 1. Color Palette

### Primary Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Cobalt Signal | #1F4FD8 | rgb(31,79,216) | Primary actions, links, the read pulse, focus of attention |
| Cobalt Dark | #173FB0 | rgb(23,63,176) | Hover / pressed states of primary actions |
| Cobalt Light | #6D93FF | rgb(109,147,255) | Primary on dark surfaces, pulse highlight |

### Secondary Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Live Green | #16A34A | rgb(22,163,74) | "Live / open to work" status only — never decorative |
| Live Green Dark | #15803D | rgb(21,128,61) | Status on light surfaces where more contrast is needed |
| Live Green Light | #34D399 | rgb(52,211,153) | Status on dark surfaces |

### Accent Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Pulse Cyan | #06B6D4 | rgb(6,182,212) | Second colour field in backdrops, the pulse arcs in the mark |
| Pulse Cyan Light | #6FD0FF | rgb(111,208,255) | Pulse arcs on dark surfaces |

### Neutral Palette

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Ink | #101828 | rgb(16,24,40) | Headings, body text, the mark's tile |
| Ink 2 | #475467 | rgb(71,84,103) | Secondary text |
| Ink 3 | #8A94A6 | rgb(138,148,166) | Captions, meta |
| Line | #E4E7EC | rgb(228,231,236) | Hairlines, borders |
| Surface | #FFFFFF | rgb(255,255,255) | Cards, panels |
| Background | #F7F7F5 | rgb(247,247,245) | Page background (light) |
| Night | #0B0F17 | rgb(11,15,23) | Page background (dark) |
| Night Surface | #111827 | rgb(17,24,39) | Cards, panels (dark) |

### Semantic Colors

| State | Hex | Usage |
|-------|-----|-------|
| Success / Live | #16A34A | Live demos, open to work |
| Warning | #D97706 | Deploying / pending |
| Error | #DC2626 | Failed actions, destructive |
| Info | #1F4FD8 | Informational (same as primary) |

### Accessibility

- Ink on Background: 15.6:1 (AAA). Ink 2 on Surface: 7.8:1 (AAA).
- Cobalt Signal on white: 6.2:1 (AA text, AAA large). White on Cobalt Signal: 6.2:1 (button labels).
- Live Green is never the only carrier of meaning: a dot is always paired with the word "live" / "open".
- Cobalt Light (#6D93FF) is the primary on Night backgrounds (7.9:1); Cobalt Signal is not used as text on dark.

---

## 2. Typography

### Font Stack

```css
--font-heading: 'Bricolage Grotesque', 'Instrument Sans', system-ui, sans-serif;
--font-body: 'Instrument Sans', system-ui, -apple-system, 'Segoe UI', sans-serif;
--font-mono: ui-monospace, 'Cascadia Mono', 'SF Mono', Menlo, Consolas, monospace;
```

Bricolage Grotesque carries the personality (optical size 96 for display, weight 640–700, tracking
−0.02em). Instrument Sans does the reading (16px base, line-height 1.6). Monospace is reserved for data
people copy: credentials, dates, counts.

### Type Scale

| Element | Size (Desktop) | Size (Mobile) | Weight | Line Height |
|---------|----------------|---------------|--------|-------------|
| Display / H1 | 62px | 37px | 640 | 1.04 |
| H2 | 31px | 24px | 600 | 1.15 |
| H3 | 18px | 18px | 600 | 1.3 |
| Body | 16px | 16px | 400 | 1.6 |
| Lede | 18px | 17px | 400 | 1.6 |
| Small | 14px | 14px | 400 | 1.5 |
| Data (mono) | 13px | 13px | 400 | 1.5 |

### Font Loading

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500..700&family=Instrument+Sans:wght@400;500;600&display=swap" rel="stylesheet">
```

---

## 3. Logo Usage

The mark is a rounded Ink tile with the lowercase **"mk"** and two **read-pulse arcs** in Pulse Cyan
around a Cobalt Light dot (the tag being read). It is the only place the pulse motif is drawn literally;
everywhere else the pulse appears as motion or as a faint divider.

### Variants

| Variant | File | Use Case |
|---------|------|----------|
| Mark | public/logo-mark.svg | Nav, footer, social avatars, any size ≥ 20px |
| Favicon | public/favicon.svg | Browser tab (same drawing, system font fallback) |
| Wordmark | "Muhammed Kado" set in Bricolage Grotesque 600 next to the mark | Header, documents |
| Monochrome | Mark with tile = currentColor, arcs/dot at 60% / 35% opacity | Print, single-colour contexts |

### Clear Space

Minimum clear space around the mark = 25% of its width on every side.

### Minimum Size

| Context | Minimum Width |
|---------|---------------|
| Digital – mark | 20px |
| Digital – mark + wordmark | 120px |
| Print – mark | 8mm |

### Don'ts

- Don't recolour the tile; on light and dark it stays Ink.
- Don't add extra arcs, rotate, skew or add shadows.
- Don't set the wordmark in any face but Bricolage Grotesque.

---

## 4. Voice & Tone

**Voice:** plain, specific, first person. Short sentences. Facts with numbers (3.3 years, 5 live apps, 30+
countries) instead of adjectives ("passionate", "innovative" never appear). Sentence case everywhere; no
exclamation marks; no emoji.

**Two registers, always both:**

1. *Technical* — names the real stack and the real problem ("REST APIs in PHP, Laravel and Zend Framework 1
   for real-time RFID inventory tracking").
2. *Plain words* — the same claim for a non-technical reader, introduced with "In plain words:" ("I build the
   software that lets hotels and laundries know where every towel and uniform is, automatically").

**Tone by context**

| Context | Tone |
|---------|------|
| Hero / positioning | Direct, declarative: "I build the web side of RFID systems that run in 30+ countries." |
| Work / demos | Practical, inviting: "Sign in with the demo account, change whatever you like; everything resets overnight." |
| Contact | Warm, low-pressure: "Email is the fastest way to reach me." |
| Errors / empty states | Say what happened and what to do next; never apologise, never vague. |

**Words we use:** build, ship, live, runs in, since 2023, open to work, in plain words.

### Brand Personality

| Trait | Description |
|-------|-------------|
| **Precise** | Names the real stack, the real numbers and the real problem |
| **Plain** | Every technical claim has a plain-words twin for non-technical readers |
| **Calm** | One accent, one orchestrated moment of motion, then quiet |
| **Proven** | The work is live and can be opened; the site points at it instead of describing it |

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
| Positioning | Computer engineer, full-stack developer in İstanbul, three years on production RFID software at USTEK, five live applications anyone can open. |
| Proof points | 3.3 years at USTEK RFID (live counter) · 5 live apps with demo accounts · 30+ countries · 4 languages (Kurdish, Arabic, Turkish, English) |
| Audiences | Technical hiring managers (want stack + proof) · HR / recruiters, often Turkish-speaking (want clarity + plain words) · Clients (want "can this person ship?") |
| Call to action | Primary: "See the live work" / "Open <app>". Secondary: "Download CV". Contact: "Email me". |

---

## 6. Imagery & Motion

- **One illustration:** the RFID reader sweeping a field of tags (SVG, animated with CSS). No stock
  photography, no abstract 3D renders.
- **Motif:** concentric read-pulse arcs — literal only in the mark; elsewhere as faint section dividers and
  as the hero animation.
- **Backdrop:** gradient ground + colour fields in Cobalt, Pulse Cyan and Live Green at low opacity, a 64px
  grid faded to the edges, film grain at ≤ 0.5 opacity. Decorative layers move only with scroll or pointer.
- **Icons:** 24px stroke icons (1.8px, round caps), currentColor. Never emoji.
- **Motion tokens:** fast 200ms (hover), base 350ms (reveals), slow 450ms (orchestrated entrances);
  ease-out `cubic-bezier(0.22,1,0.36,1)`, overshoot `cubic-bezier(0.34,1.56,0.64,1)`. One orchestrated
  entrance per page; everything else answers a user action; `prefers-reduced-motion` renders the final
  state. Continuous animation is reserved for the live-status dot.

---

## 7. AI Image Generation

### Base Prompt Template

Always prepend to image generation prompts:

```
Minimal technical illustration, deep ink navy (#101828) background, cobalt blue (#1F4FD8) and cyan (#06B6D4) concentric signal arcs spreading from a small reader, small glowing tag markers lighting up as the pulse reaches them, fine 64px grid, subtle film grain, no text, no people, calm and precise.
```

### Style Keywords

| Category | Keywords |
|----------|----------|
| **Lighting** | soft, low-key, glow only on the tag markers |
| **Mood** | calm, precise, technical, alive |
| **Composition** | asymmetric, reader at left, pulses spreading right, generous empty space |
| **Treatment** | muted ground, one saturated accent, grain |
| **Aesthetic** | modern, minimal, engineering |

### Visual Don'ts

| Avoid | Reason |
|-------|--------|
| Neon green on black | Reads as "hacker", not engineer |
| Circuit-board / binary clichés | Generic tech decoration |
| Glitch effects | Off-brand: the brand is about things that work |
| Stock-photo laptops and handshakes | Nothing to do with the actual work |
