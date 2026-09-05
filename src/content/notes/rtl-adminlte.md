---
title: "RTL with AdminLTE 3: what actually breaks"
description: "Translating the strings is the easy half. Three layout bugs I hit making an AdminLTE admin panel work in Arabic, and the fix for each."
date: 2026-09-05
tags: [laravel, adminlte, rtl, css]
---

AdminLTE 3 has no official right-to-left build, so an Arabic admin panel ends up with a hand-written RTL layer: a stylesheet that mirrors the sidebar, a script that fixes what the stylesheet cannot, and a translation file. I inherited one of those in the BestTrend admin panel and spent an afternoon on three bugs that had nothing to do with translation.

## 1. `sidebar-mini` is not a state

The RTL stylesheet had a rule like this:

```css
body.rtl-layout.sidebar-mini .content-wrapper { margin-right: 4.6rem !important; }
```

It reads as "when the sidebar is mini, leave a small offset". But in AdminLTE, `sidebar-mini` is a **capability** class that sits on `<body>` permanently — it means "show a mini rail when collapsed". The real state class is `sidebar-collapse`. So the rule matched all the time, the expanded 250-pixel sidebar got a 74-pixel offset, and the dashboard slid underneath it: the alert cut off, the fourth stat box half hidden.

The fix is to express the three real states and nothing else:

```css
body.rtl-layout:not(.sidebar-collapse) .content-wrapper { margin-right: 265px; }          /* open */
body.rtl-layout.sidebar-mini.sidebar-collapse .content-wrapper { margin-right: calc(4.6rem + 15px); } /* rail */
body.rtl-layout.sidebar-collapse:not(.sidebar-mini) .content-wrapper { margin-right: 15px; } /* bare */
```

The `:not()` keeps the specificity equal to the older rules so the new ones win by order. Specificity is arithmetic; when a fix "doesn't take", count.

## 2. A stack that nobody rendered

The map on the property form showed one tile in a corner and nothing else. Every diagnosis pointed at Leaflet — until I noticed the rendered page contained no `leaflet.css` at all. The view pushed its styles with `@push('styles')`; the layout rendered `@stack('css')`. Twenty-one views had been silently losing their page CSS for months. Without its stylesheet, Leaflet lays its tiles out inline and then translates each one: a scattered grid.

One line in the layout (`@stack('styles')`) fixed the map and twenty other pages. The lesson is boring and important: when a library "doesn't work", check that its CSS reached the page before reading its docs.

## 3. Leaflet is not RTL-aware

Once the stylesheet loaded, the map still misbehaved inside an element with `direction: rtl`. Leaflet positions panes with left-based transforms and does not expect the container to be mirrored. Pin the map container itself to left-to-right:

```css
#propertyMap { direction: ltr; }
```

The controls and popups inside it are English anyway; nothing is lost.

## Bonus: localized routes and the route cache

On the POS demo, switching to Arabic returned a 404 for every `/ar/...` URL. `mcamara/laravel-localization` registers routes per locale at runtime, which `php artisan route:cache` cannot see. The deploy script now runs `route:clear` for that app instead of `route:cache`; the other apps keep the cache.

None of these were Arabic problems. They were a class name read as state, a stack name that did not match, and a library that assumes left-to-right. Translation came last and was the least of it.
