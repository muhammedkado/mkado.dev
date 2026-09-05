---
title: POS Admin Dashboard
tagline: A back office for a small retail shop — products, categories, clients and staff with role-based permissions, in English and Arabic.
period: "2024"
order: 1
problem: A shop needs one place where staff manage what is on the shelves and who they sell to, where a cashier cannot delete the product catalogue, and where the owner sees stock and inventory value at a glance. It also had to work in Arabic, right-to-left, without a second codebase.
built:
  - Laravel 10 back office on AdminLTE with full CRUD for products, categories, clients and users, image uploads with resizing, and dashboard widgets for low stock and inventory value.
  - Roles and permissions with Laratrust — super admin, admin and a read-only viewer — checked per action in the controllers, not only hidden in the menu.
  - English and Arabic with mcamara/laravel-localization — locale-prefixed URLs, an RTL stylesheet layer for AdminLTE, translated validation messages.
  - Demo hardening for a public deployment — seeded accounts protected by middleware, registration closed, a one-click sign-in route, nightly re-seed.
tryIt:
  - Open the dashboard signed in as admin and change a product's price or stock — the widgets update.
  - Switch the language to عربي from the top bar; every screen flips to right-to-left.
  - Sign in as the viewer (user@app.com / password) and notice what is hidden.
---

## Notes from building it

**RTL on a framework that never planned for it.** AdminLTE 2 ships left-to-right only. Instead of forking it, the layout loads an RTL stylesheet and a small script when the locale is Arabic; the sidebar, breadcrumbs and form alignment all come from that layer, so the English build is untouched.

**Localized URLs and route caching don't mix.** mcamara/laravel-localization builds routes per locale at runtime, so `php artisan route:cache` silently drops the `/ar/...` routes and every Arabic page 404s. The deploy script clears the route cache instead of building it — a small line that cost an afternoon.

**A public demo needs guard rails.** Anyone can sign in as the admin, so a middleware blocks edits and deletes on the three seeded accounts, registration is off, and the whole database is re-seeded every night. Everything else — products, clients, extra users — is yours to break.
