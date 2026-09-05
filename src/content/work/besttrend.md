---
title: BestTrend SY
tagline: A real-estate platform for Syria — listings with photos and maps, search with saved searches and favourites, owner analytics — in Arabic, English and Kurdish.
period: "Jul – Oct 2025"
order: 2
problem: Property owners and agents in Syria list on Facebook groups and buyers scroll for hours. The platform needed structured listings (governorate → city → neighbourhood), photos on a CDN, three languages including right-to-left Arabic, and moderation so fake listings never reach the public.
built:
  - React 19 + TypeScript single-page app (Vite, Tailwind, shadcn/ui) with i18next for Arabic (RTL), English and Kurdish, and a multi-step listing form with image upload.
  - Laravel 10 REST API with Sanctum token auth, rate limits on sign-in and destructive routes, versioned under /api/v1 with legacy aliases kept for older clients.
  - PostgreSQL model around a Governorate → City → Neighbourhood hierarchy, property types, features and utilities as many-to-many, favourites and saved searches per user.
  - Listing photos on Bunny Storage (a CDN) through Spatie Media Library, so the API server never serves images itself.
  - Property statistics — views, favourites, inquiries — feeding an owner dashboard.
tryIt:
  - Browse and filter listings without signing in; switch the language from the header.
  - Sign in as the property owner (demo@besttrend.mkado.dev / demo1234) and add a listing with photos.
  - Open the admin panel case study to see the moderation side of the same system.
---

## Notes from building it

**One API, two very different clients.** The app talks JSON with bearer tokens; the staff back office (its own case study) uses sessions and permissions. Both sit on the same Laravel core, which is why the API is versioned and the admin panel lives on the API host rather than inside the app.

**Locale-aware data, not just locale-aware UI.** Names are stored as `name_ar` / `name_en` / `name_ku` on every location and classification table; the front end normalises those into plain strings for the active language, so components never know three languages exist.

**Images off the app server.** Uploads go straight to Bunny Storage and are served from the CDN; the API only keeps the path. That kept the Laravel host small enough for a free-tier VM.

**Private repository.** The code is shared on request; the admin panel and the API are open to try on the demo.
