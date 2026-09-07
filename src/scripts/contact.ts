// Contact form: validation, lazy Turnstile, submit to POST /api/contact.
//
// The markup is src/components/Contact.astro. Copy comes from data-messages on
// the form (only the active language ships). The server validates everything
// again and is the authority; this is here so people are told what is wrong
// before they wait for a round trip.
//
// Turnstile is injected on the first interaction with any field, so a visitor
// who only reads the page never downloads it.

type Messages = Record<string, string>;

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      reset: (id?: string) => void;
      getResponse: (id?: string) => string | undefined;
    };
    onTurnstileReady?: () => void;
  }
}

const form = document.getElementById('contact-form') as HTMLFormElement | null;

if (form) {
  const endpoint = form.dataset.endpoint ?? '/api/contact';
  const siteKey = form.dataset.sitekey ?? '';
  const m: Messages = JSON.parse(form.dataset.messages ?? '{}');

  const $ = <T extends HTMLElement>(id: string) => document.getElementById(id) as T | null;
  const name = $<HTMLInputElement>('cf-name')!;
  const email = $<HTMLInputElement>('cf-email')!;
  const message = $<HTMLTextAreaElement>('cf-message')!;
  const honeypot = $<HTMLInputElement>('cf-website')!;
  const submit = $<HTMLButtonElement>('cf-submit')!;
  const formErr = $<HTMLParagraphElement>('cf-form-err')!;
  const counter = $<HTMLSpanElement>('cf-count')!;
  const done = $<HTMLDivElement>('cf-done')!;
  const doneBody = $<HTMLParagraphElement>('cf-done-body')!;
  const captchaSlot = $<HTMLDivElement>('cf-turnstile')!;
  const live = document.getElementById('a11y-live');

  const fields: HTMLInputElement[] | HTMLTextAreaElement[] = [name, email, message] as never;

  // ---- validation (mirrors server/contact.php) ----------------------------

  const rules: Record<string, (v: string) => string | null> = {
    name: (v) => (!v ? m.required : v.length < 2 ? m.nameShort : null),
    // Deliberately loose: the server uses filter_var, and exotic-but-valid
    // addresses should not be rejected in the browser.
    email: (v) => (!v ? m.required : /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? null : m.emailInvalid),
    message: (v) => (!v ? m.required : v.length < 20 ? m.messageShort : v.length > 2000 ? m.messageLong : null),
  };

  const errorFor = (el: HTMLInputElement | HTMLTextAreaElement) => document.getElementById(`${el.id}-err`);

  function setError(el: HTMLInputElement | HTMLTextAreaElement, text: string | null) {
    const box = errorFor(el);
    if (box) box.textContent = text ?? '';
    el.setAttribute('aria-invalid', text ? 'true' : 'false');
  }

  function validate(el: HTMLInputElement | HTMLTextAreaElement): boolean {
    const rule = rules[el.name];
    if (!rule) return true;
    const problem = rule(el.value.trim());
    setError(el, problem);
    return !problem;
  }

  for (const el of fields as (HTMLInputElement | HTMLTextAreaElement)[]) {
    el.addEventListener('blur', () => validate(el));
    el.addEventListener('input', () => {
      // Only re-check once a field has already complained, so typing is quiet.
      if (el.getAttribute('aria-invalid') === 'true') validate(el);
    });
  }

  message.addEventListener('input', () => {
    counter.textContent = `${message.value.length} / 2000`;
  });

  // ---- Turnstile, loaded on first interaction ------------------------------

  let widgetId: string | undefined;
  let loading = false;

  function mountCaptcha() {
    if (loading || !siteKey) return;
    loading = true;
    window.onTurnstileReady = () => {
      if (!window.turnstile) return;
      widgetId = window.turnstile.render(captchaSlot, { sitekey: siteKey, theme: 'auto', action: 'contact' });
    };
    const s = document.createElement('script');
    s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileReady&render=explicit';
    s.async = true;
    s.defer = true;
    document.head.appendChild(s);
  }

  // focusin bubbles (focus does not) and pointerdown covers a tap that has not
  // landed in a field yet, so the widget is ready by the time anyone can submit.
  form.addEventListener('focusin', mountCaptcha, { once: true });
  form.addEventListener('pointerdown', mountCaptcha, { once: true });

  // ---- submit --------------------------------------------------------------

  let sending = false;

  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    if (sending) return;

    formErr.textContent = '';
    let ok = true;
    let firstBad: HTMLElement | null = null;
    for (const el of fields as (HTMLInputElement | HTMLTextAreaElement)[]) {
      if (!validate(el)) {
        ok = false;
        if (!firstBad) firstBad = el;
      }
    }
    if (!ok) {
      firstBad?.focus();
      return;
    }

    const token = window.turnstile && widgetId !== undefined ? window.turnstile.getResponse(widgetId) : undefined;

    sending = true;
    submit.disabled = true;
    submit.textContent = m.sending;

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.value.trim(),
          email: email.value.trim(),
          message: message.value.trim(),
          website: honeypot.value,
          token: token ?? '',
          locale: document.documentElement.lang || 'en',
        }),
      });

      if (res.ok) {
        form.hidden = true;
        doneBody.textContent = (m.okBody ?? '').replace('{email}', email.value.trim());
        done.hidden = false;
        done.focus();
        if (live) live.textContent = m.okTitle;
        return;
      }

      const body = (await res.json().catch(() => ({}))) as { errors?: Record<string, string>; error?: string };

      if (res.status === 422 && body.errors) {
        // The server answers with message keys, translated here.
        for (const el of fields as (HTMLInputElement | HTMLTextAreaElement)[]) {
          const key = body.errors[el.name];
          if (key) setError(el, m[key] ?? m.server);
        }
        (fields as (HTMLInputElement | HTMLTextAreaElement)[]).find((el) => el.getAttribute('aria-invalid') === 'true')?.focus();
      } else if (res.status === 429) {
        formErr.textContent = m.rate;
      } else if (res.status === 400) {
        formErr.textContent = m[body.error ?? 'captcha'] ?? m.captcha;
      } else {
        formErr.textContent = m.server;
      }
    } catch {
      formErr.textContent = m.network;
    } finally {
      sending = false;
      submit.disabled = false;
      submit.textContent = m.send;
      // Turnstile tokens are single use; a new one is needed for the next try.
      if (window.turnstile && widgetId !== undefined) window.turnstile.reset(widgetId);
    }
  });
}
