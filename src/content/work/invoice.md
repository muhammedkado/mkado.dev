---
title: Invoice System
tagline: Create invoices with line items and live totals, track outstanding, paid and late payments, print to PDF and e-mail the customer — in plain PHP, no framework.
period: "2025"
order: 4
problem: A small business needs invoices that look right and a list that shows who still owes money. Doing it without a framework was the point — to show that sessions, CSRF protection, prepared statements and a clean interface can be built by hand, in a couple of thousand lines.
built:
  - Plain PHP 8 with PDO prepared statements everywhere, per-user data scoping, session login with ID regeneration and a CSRF token on every form.
  - An invoice editor with dynamic line items and live subtotal, tax and total in vanilla JavaScript — no jQuery, no build step.
  - Server-side PDF rendering with TCPDF (print or download) and e-mail with PHPMailer; on the public demo sending is disabled and the app shows what would have gone out.
  - A ledger view with status filters (outstanding, paid, late) and hand-written CSS — Fraunces and Public Sans, no Bootstrap.
tryIt:
  - Create an invoice with three lines and watch the totals update as you type.
  - Mark it paid, then filter the ledger by status.
  - Print one — the PDF is generated on the server from the same data.
---

## Notes from building it

**Framework-free is a discipline, not a shortcut.** Every query is a prepared statement, every write checks the owner, every form carries a token that is verified with a constant-time comparison. The whole thing is small enough to read in one sitting, which was the goal.

**Configuration without a .env file.** On the server the PHP-FPM pool passes credentials as real environment variables; locally a gitignored `config.php` defines the same constants. One line in the bootstrap decides which, and nothing secret is ever deployed.

**The demo lies about e-mail on purpose.** Outbound mail is switched off, so "send invoice" renders the message and tells you it would have been sent — a demo should never e-mail strangers.
