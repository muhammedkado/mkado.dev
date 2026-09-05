---
title: "Six live demos on Oracle's free tier, deployed over SSH"
description: "How this portfolio's six applications run on one Always-Free VM behind Cloudflare, deploy with one command without giving the server any GitHub access, and reset themselves every night."
date: 2026-09-05
tags: [devops, nginx, cloudflare, deployment]
---

A portfolio that says "I build web applications" is stronger when the applications are running. Six of mine are, on a single virtual machine that costs nothing. This is the setup, including the two mistakes worth knowing about.

## The machine

Oracle Cloud's Always-Free tier gives an ARM VM with four cores and 24 GB of memory — far more than six demos need. Ubuntu 24.04, nginx, PHP 8.3-FPM, PostgreSQL, MySQL, ufw and fail2ban, SSH by key only. Cloudflare sits in front: DNS, TLS to the visitor, caching, and an origin certificate so the hop from Cloudflare to the VM is encrypted as well.

Each application gets its own nginx virtual host and — for the PHP apps — its own PHP-FPM pool. Pools are cheap and they isolate the demos from each other: a slow Gemini call in the job-search app cannot starve the POS dashboard. Each app also owns its database.

## Deploys without GitHub on the server

I did not want a GitHub token or deploy key on a public machine. The alternative is old and good: every application directory on the server is a git repository with

```
git config receive.denyCurrentBranch updateInstead
```

so a `git push` from my workstation over SSH updates the checked-out code in place. The push is refused if the working tree on the server is dirty, which is exactly the safety you want. A script per repository then runs Composer, migrations, caches and a PHP-FPM reload. From my side the whole thing is `./deploy.sh pos`.

Front-end builds are the exception: the server has no Node. The Astro site, the React apps and the PWA build locally, and only the output is uploaded — into a `.new` directory that is swapped in, so a visitor never sees a half-copied site.

**Mistake one.** My firewall rule for SSH was `ufw limit 22`, the common hardening default: six connections per thirty seconds, then drop. A deploy opens several SSH sessions in quick succession, so the third app timed out with a "connection timed out" that looked like a network fault. Brute force is fail2ban's job and passwords are off anyway; the rule is now a plain `allow`.

## Nightly reset

Anyone can sign in to the demos as an administrator and change things, so at 03:00 UTC a cron job runs `migrate:fresh --seed` for every app. Two consequences follow. The seeded accounts must be protected from visitors *before* the reset — a middleware refuses password, e-mail, status and role changes on them — and anything that watches the apps must tolerate a few seconds of failure every night.

## Real status, not a green dot

The front page used to have a hardcoded "all systems up". Now a cron job probes every app's health endpoint every five minutes, applies a two-strike rule (one failed probe is a blip, two is an outage — so the nightly reset never shows red), and writes a small JSON file outside the deploy directory. The page reads it and shows "checked N minutes ago". The same endpoints are what an external uptime monitor watches, so an outage becomes an e-mail rather than a grey dot nobody sees.

**Mistake two — avoided narrowly.** The obvious place for that JSON is the static site's `dist/` folder, and the deploy swaps that folder out wholesale; the file would have lived only until the next deploy. Anything generated on the server needs a home the deploy does not touch, and nginx can alias it into the site from there.

## What it costs

Nothing, apart from the domain. The whole configuration — vhosts, pools, cron entries, the status probe, the deploy script — lives in the repositories, so the machine could be rebuilt from scratch in an afternoon. The [about-this-site](/about-this-site/) page has the diagram.
