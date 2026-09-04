// Motion for /v2, built from the ui-ux-pro-max GSAP presets:
// hero stagger (SplitText words, expo.out), grid stagger (back.out, grid:'auto'),
// subtle/standard hover micro-interactions (quickTo), scrub-driven progress lines,
// and a magnetic focal CTA. Everything runs on transform/opacity, and
// prefers-reduced-motion renders the final state immediately.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { Flip } from 'gsap/Flip';

gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin, Flip);

const YEAR_MS = 365.25 * 24 * 60 * 60 * 1000;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---- work grid filters: cards glide to their new positions (FLIP) ---- */
{
  const chips = Array.from(document.querySelectorAll<HTMLButtonElement>('.filters .chip'));
  const cards = Array.from(document.querySelectorAll<HTMLElement>('#work-grid .card'));
  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const key = chip.dataset.filter ?? 'all';
      chips.forEach((c) => c.setAttribute('aria-pressed', String(c === chip)));

      const state = Flip.getState(cards);
      cards.forEach((card) => {
        card.hidden = !(key === 'all' || (card.dataset.cats ?? '').split(' ').includes(key));
        card.style.opacity = '';
      });
      if (reduceMotion) return;

      Flip.from(state, {
        duration: 0.5,
        ease: 'power2.inOut',
        absolute: true,
        onEnter: (els) => gsap.fromTo(els, { autoAlpha: 0, scale: 0.9 }, { autoAlpha: 1, scale: 1, duration: 0.4, ease: 'power2.out' }),
        onLeave: (els) => gsap.to(els, { autoAlpha: 0, scale: 0.9, duration: 0.3, ease: 'power2.in' }),
      });
    });
  });
}

// Live tenure: recomputed on every load, then handed to the count-up.
document.querySelectorAll<HTMLElement>('[data-tenure-start]').forEach((el) => {
  const start = new Date(el.dataset.tenureStart ?? '');
  const years = (Date.now() - start.getTime()) / YEAR_MS;
  el.dataset.count = years.toFixed(1);
  el.dataset.decimals = '1';
  el.textContent = years.toFixed(1);
});

function showAll(): void {
  document.querySelectorAll<HTMLElement>('.anim').forEach((el) => {
    el.style.opacity = '1';
  });
  document.querySelectorAll('.section-head h2').forEach((el) => el.classList.add('in'));
  document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
    el.textContent = (el.dataset.count ?? '') + (el.dataset.suffix ?? '');
  });
}

const mm = gsap.matchMedia();

mm.add('(prefers-reduced-motion: reduce)', () => {
  showAll();
});

mm.add('(prefers-reduced-motion: no-preference)', () => {
  // Never leave content hidden if anything below throws or stalls.
  const safety = window.setTimeout(showAll, 3000);

  /* ---- hero entrance: one orchestrated timeline ---- */
  const tl = gsap.timeline({ defaults: { ease: 'expo.out' }, onComplete: () => window.clearTimeout(safety) });
  tl.fromTo('.hero .eyebrow', { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.5 }, 0);

  const h1 = document.querySelector<HTMLElement>('.hero h1');
  if (h1) {
    const split = new SplitText(h1, { type: 'words' });
    gsap.set(h1, { autoAlpha: 1 });
    tl.fromTo(
      split.words,
      { autoAlpha: 0, y: 26, rotateX: -35 },
      { autoAlpha: 1, y: 0, rotateX: 0, duration: 0.7, stagger: 0.045 },
      0.1,
    );
  }

  tl.fromTo('.hero .lede', { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.6 }, 0.4)
    .fromTo(
      '.hero .cta-row .btn, .hero .hero-links a',
      { autoAlpha: 0, y: 10 },
      { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.06 },
      0.55,
    )
    .fromTo(
      '.fact',
      { autoAlpha: 0, y: 16, scale: 0.92 },
      { autoAlpha: 1, y: 0, scale: 1, duration: 0.45, stagger: { each: 0.06, grid: 'auto' }, ease: 'back.out(1.4)', clearProps: 'transform' },
      0.5,
    );

  /* ---- count-ups on the hero facts ---- */
  document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
    const to = parseFloat(el.dataset.count ?? '0');
    const dec = parseInt(el.dataset.decimals ?? '0', 10);
    const suffix = el.dataset.suffix ?? '';
    const obj = { v: 0 };
    el.textContent = (0).toFixed(dec) + suffix;
    gsap.to(obj, {
      v: to,
      duration: 1.1,
      delay: 0.8,
      ease: 'power2.out',
      onUpdate: () => {
        el.textContent = obj.v.toFixed(dec) + suffix;
      },
    });
  });

  /* ---- reading progress under the nav ---- */
  gsap.to('.nav-progress', {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 0.3 },
  });

  /* ---- scroll reveals: grid wave stagger ---- */
  ScrollTrigger.batch('.strength, .card, .tl, .skill-group, .cta-panel', {
    start: 'top 88%',
    once: true,
    onEnter: (batch) =>
      gsap.fromTo(
        batch,
        { autoAlpha: 0, y: 18, scale: 0.98 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.5, stagger: { each: 0.07, grid: 'auto' }, ease: 'back.out(1.2)', clearProps: 'transform' },
      ),
  });

  ScrollTrigger.batch('.section-head', {
    start: 'top 88%',
    once: true,
    onEnter: (batch) => {
      gsap.fromTo(batch, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' });
      batch.forEach((el) => el.querySelector('h2')?.classList.add('in'));
    },
  });

  /* ---- strengths: the icons draw themselves ---- */
  document.querySelectorAll<HTMLElement>('.strength').forEach((card) => {
    const shapes = card.querySelectorAll('svg :is(path, rect, circle, line)');
    if (!shapes.length) return;
    gsap.fromTo(
      shapes,
      { drawSVG: '0%' },
      { drawSVG: '100%', duration: 0.9, stagger: 0.06, ease: 'power2.inOut', scrollTrigger: { trigger: card, start: 'top 85%', once: true } },
    );
  });

  /* ---- experience: the line follows your scroll ---- */
  if (document.querySelector('.tl-progress')) {
    gsap.to('.tl-progress', {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: { trigger: '.timeline', start: 'top 75%', end: 'bottom 55%', scrub: 0.6 },
    });
  }

  /* ---- pointer-only micro-interactions ---- */
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    // One magnetic focal element per screen: the primary CTA.
    const mag = document.querySelector<HTMLElement>('.hero .btn-primary');
    if (mag) {
      const xTo = gsap.quickTo(mag, 'x', { duration: 0.4, ease: 'power3.out' });
      const yTo = gsap.quickTo(mag, 'y', { duration: 0.4, ease: 'power3.out' });
      mag.addEventListener('pointermove', (e) => {
        const r = mag.getBoundingClientRect();
        xTo((e.clientX - r.left - r.width / 2) * 0.25);
        yTo((e.clientY - r.top - r.height / 2) * 0.25);
      });
      mag.addEventListener('pointerleave', () => {
        gsap.to(mag, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
      });
    }

    // Fact tiles tilt toward the pointer.
    document.querySelectorAll<HTMLElement>('.fact').forEach((tile) => {
      gsap.set(tile, { transformPerspective: 700 });
      const rx = gsap.quickTo(tile, 'rotationX', { duration: 0.35, ease: 'power2.out' });
      const ry = gsap.quickTo(tile, 'rotationY', { duration: 0.35, ease: 'power2.out' });
      tile.addEventListener('pointermove', (e) => {
        const r = tile.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        ry(px * 10);
        rx(-py * 10);
      });
      tile.addEventListener('pointerleave', () => {
        rx(0);
        ry(0);
      });
    });

    // Cards: spotlight that follows the pointer + the standard lift.
    document.querySelectorAll<HTMLElement>('.card').forEach((card) => {
      const lift = gsap.quickTo(card, 'y', { duration: 0.25, ease: 'power2.out' });
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
        card.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
      });
      card.addEventListener('pointerenter', () => lift(-4));
      card.addEventListener('pointerleave', () => lift(0));
    });
  }

  /* ---- back to top ---- */
  const top = document.querySelector<HTMLElement>('.to-top');
  if (top) {
    ScrollTrigger.create({ start: 500, end: 'max', onToggle: (self) => top.classList.toggle('show', self.isActive) });
  }

  document.fonts?.ready.then(() => ScrollTrigger.refresh());
});
