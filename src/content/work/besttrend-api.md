---
title: BestTrend Admin & API
tagline: The back office and the REST API behind the BestTrend app — listing moderation, users and roles, leads and site content, plus a public JSON API.
period: "2025"
order: 3
problem: The same Laravel core had to serve two clients with opposite needs — a JSON API for the app (tokens, rate limits, versioning) and a staff back office (sessions, granular permissions, an Arabic right-to-left interface). It also has to survive being a public demo where anyone signs in as the administrator.
built:
  - AdminLTE 3 back office — property moderation with bulk actions and CSV import, users and agents with Spatie roles and permissions, leads, contact messages, site content and home-page statistics.
  - An Arabic RTL layer for AdminLTE, which has no official RTL build — sidebar geometry, RTL stylesheets and a full translation file.
  - Public REST API under /api/v1 with a custom rate limiter, a database-backed health endpoint and image upload endpoints; feature and unit tests for the API.
  - Demo safety for a public admin panel — a middleware that keeps the seeded accounts unchangeable, throttled sign-in, a one-click demo sign-in route and a nightly re-seed.
tryIt:
  - Open the panel signed in and try Properties → bulk actions, or import a CSV.
  - Switch to عربي from the top bar and browse — the whole panel is right-to-left.
  - Call the API directly — GET /api/v1/properties returns the same listings the app shows.
---

## Notes from building it

**Two doors, one core.** Session-based admin routes and token-based API routes are separate groups on the same application, sharing models, policies and the database. Permissions are checked with Spatie's `can:` middleware and again in the controllers where an action is destructive.

**RTL is a layout problem, not a translation problem.** Translating the strings was the easy half. AdminLTE keeps `sidebar-mini` on the body permanently to mean "show a mini rail when collapsed"; an earlier RTL stylesheet read it as the current state and gave the expanded sidebar a mini-width offset, so content slid underneath it. The fix was reading the real state class — and pinning the map container to left-to-right, because Leaflet is not RTL-aware.

**Public admin demos need a different threat model.** The visitor *is* the administrator, so the usual question — "can they get in?" — becomes "what can they break for the next person?" The answer is a middleware that refuses password, e-mail, status and role changes on the seeded accounts, a login throttle, and a nightly reset for everything else.
