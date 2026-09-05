---
title: Tire Shop PWA
tagline: A mobile-first, installable app for running a car-tire shop — inventory, sales and invoices, expenses and profit reports — in Arabic, right-to-left.
period: "2025"
order: 6
problem: A small tire shop runs on a phone, not a desktop. The owner needs today's sales and profit at a glance, low-stock warnings, a way to log expenses, and no login screen on day one — with a path to a shared cloud database later.
built:
  - React 19 + TypeScript + Vite progressive web app — installable, service worker, Tailwind 4, the whole interface in Arabic with right-to-left layout.
  - A local-first data store (React Context + localStorage) with seed data; the portfolio build runs in this mode, so nothing leaves your browser.
  - Optional cloud mode — Supabase auth and PostgreSQL, plus an edge function that posts low-stock alerts to a Telegram bot; the same code, switched by two environment variables.
  - Reports with recharts — daily sales, expenses and net profit — and a sales flow with photo attachments and printable invoices.
tryIt:
  - Sell something from بيع and watch today's profit change on the home screen.
  - Add an expense, then open التقارير for the day's net.
  - On a phone, use "Add to home screen" — it installs and works offline.
---

## Notes from building it

**Local first, then cloud.** The store abstraction is the same in both modes; when Supabase variables are present the app signs in and syncs, when they are absent the auth gate is skipped and data stays in localStorage. The portfolio deliberately ships the local build so a visitor is never asked to register.

**Designed for one thumb.** Bottom navigation, large touch targets, a single primary action per screen, numbers in Turkish lira. The desktop view is simply the phone layout centred — the audience is not at a desk.

**RTL from the first commit.** Tailwind's logical properties (`ms-`, `pe-`, `text-start`) instead of left/right, so the layout mirrored correctly without a second stylesheet.
