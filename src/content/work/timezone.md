---
title: TimeZone.tools
tagline: Five small time tools — zone converter, meeting planner, date difference, countdown and working days — in seven languages, fast, and entirely in the browser.
period: "2025"
order: 7
problem: Remote teams and job seekers across time zones keep asking the same three questions — what time is it there, when can we all meet, and how many working days until a date. Existing sites answer them slowly, behind ads and cookie walls, and rarely in Arabic or Kurdish. This one had to be instant, shareable by link, and right-to-left when needed.
built:
  - React 19 + TypeScript single-page app (Vite, Tailwind 4, wouter for routing) with no backend at all — conversions and calendars come from the browser's Intl API.
  - Seven languages through i18next with translation files loaded at runtime, including Arabic with a full right-to-left layout.
  - Shareable state — the selected zones, times and dates live in the URL, so a meeting proposal is one link.
  - "SEO-ready static build: per-tool pages, Open Graph tags, sitemap and robots, served as cached static files behind Cloudflare."
tryIt:
  - Open the converter, add two or three cities and change the time — every zone updates together.
  - Switch the language to العربية from the header and watch the whole layout mirror.
  - Copy the link after setting a meeting time and open it in another tab; the state comes with it.
---

## Notes from building it

**No backend on purpose.** Everything a time-zone tool needs — zone data, daylight-saving rules, date formatting per locale — already ships in every modern browser as the Intl API. Skipping a server made the app cheaper to host (a folder on nginx), faster (nothing to wait for) and easier to trust (nothing leaves the page).

**State in the URL.** The point of a meeting planner is sending it to someone. Serialising the selection into the query string means a share button is just "copy the address", and the back button works the way people expect.

**A Replit monorepo, built on Windows.** The repository came from Replit's workspace layout, which excludes every non-Linux build binary. The portfolio deploy builds on a Windows workstation, so the workspace now allows the win32 binaries too — a two-line change that turned a red build green.
