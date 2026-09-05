---
title: Find Job with AI
tagline: Upload a CV, get it parsed into an editable profile by Gemini, then see it scored against live job postings — with the cost of a public demo kept on a leash.
period: "2025"
order: 5
problem: Matching a CV to job postings by hand is slow and vague. The app turns a PDF into structured data, lets you correct it, and asks a language model to score each posting with a reason — while a public, sign-in-free demo cannot be allowed to run up an API bill.
built:
  - A three-step Laravel 12 wizard (Blade + Alpine.js, Tailwind via Vite) — upload, an editable profile, matches — with no SPA framework and no separate JSON API.
  - PDF text extraction with smalot/pdfparser; the uploaded file is never stored.
  - Gemini calls for parsing, "enhance with AI" rewrites and match scoring, with the model's thinking budget set to zero so the token limit goes to the answer.
  - Live postings from the JSearch API with a sample-data fallback when no key is configured.
  - Cost control — 20 AI requests per hour per visitor and a shared daily budget; once it is spent the app serves sample data instead of failing.
tryIt:
  - Click "Try with sample CV" for a zero-cost walkthrough of all three steps.
  - Upload your own PDF and correct the parsed profile.
  - Press "Enhance with AI" on the summary, then open Matches and read the reasons.
---

## Notes from building it

**Budget first, features second.** Every visitor shares one daily allowance for Gemini and JSearch calls, on top of a per-IP throttle. When the allowance runs out the app switches to sample data and says so, which is why the demo can stay open without a sign-in.

**Thinking tokens count.** Gemini 2.5 spends part of `maxOutputTokens` on reasoning; with a small limit the reasoning ate almost all of it and the answer came back empty. Setting the thinking budget to zero for these structured tasks fixed "Failed to process CV" for good.

**Stateless by design.** SQLite holds sessions only. The CV text lives in the session for the length of the wizard and nowhere else.
