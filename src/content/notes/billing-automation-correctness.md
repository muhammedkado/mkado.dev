---
title: "Billing automation that must be correct with no one watching"
description: "Lessons from building unattended, recurring invoicing on a production platform: idempotent runs, double-fire guards, date boundaries, and tests that pin the money."
date: 2026-09-05
tags: [laravel, billing, testing, reliability]
---

Most of my day job is web features for an RFID laundry-management platform. The part I learned the most from is the one nobody sees: billing runs that wake up on a schedule, generate numbered invoices, and go back to sleep. Nothing here is specific to that platform — these are the rules I would carry to any system that moves money on its own.

## The run must be safe to run twice

Schedulers fire twice more often than you think: a retry after a timeout, an operator re-running "just in case", two workers picking the same minute. If a second run can issue a second invoice, it eventually will. So every run is keyed — a billing period and a customer identify one intended invoice — and the job checks for that key before it writes. A re-run becomes a no-op, and a "sweep" that re-processes a whole month is safe by construction rather than by care.

The same key is what makes the run resumable. If it dies halfway, the next run finishes the remaining customers and skips the ones already done, instead of starting over or, worse, starting over *and* duplicating.

## Guard against the double fire, then make it visible

A guard is cheap: a lock around the run, and an "already issued" check per customer. What matters more is that a guarded skip is logged in a way somebody reads. A silent skip that hides a real bug (the previous run *did* issue the invoice, but for the wrong amount) is a worse outcome than a loud duplicate.

## Dates are where the money leaks

The most expensive bugs I have fixed were not arithmetic; they were boundaries. A period that ends at "midnight" in server time but the customer lives three hours east. A monthly cadence that started on the 31st and quietly became the 30th, then the 28th. A comparison of a timestamp with a date that dropped the last day of the month from every run — silent under-billing that nobody complained about, because who complains about a smaller invoice?

The fixes are dull and specific: store the customer's timezone, compute period boundaries in it and convert to UTC once; represent cadences as "day-of-month with clamp" rather than "add one month"; and treat a half-open interval `[start, end)` as the only shape a period can have.

## Pin the money with tests

For billing code, a test that says "it runs without error" is nearly worthless. The useful tests pin numbers: this customer, this cadence, this period, produces exactly this invoice with exactly this total and exactly this number, and running it again produces nothing. Each of the boundary bugs above became a test before it became a fix, and the suite is what lets the next change to that code be boring.

I also attach a coverage report to every change in that area — not to chase a percentage, but so a reviewer can see that the line that computes the period end is actually exercised.

## Correct with nobody watching

The bar for unattended automation is different from the bar for a form somebody submits. A form has a human who notices the error page. A scheduled job has a log line at 03:00 and a customer who notices in six weeks. Idempotent keys, loud skips, timezone-correct periods and tests that assert amounts are what let me sleep while it runs.
