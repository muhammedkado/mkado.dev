// The home page's scroll choreography (docs/brand-guidelines.md §6): the page
// goes through the press as it is read. Headlines set line by line, ruled
// lists rule their top line and then their rows, a print prints itself, the
// ink block rolls out to the edges, and the timeline rail reads each entry as
// it passes. The hero's load moment stays in CSS so it never waits for this file.
//
// Markup API: data-reveal="lines" (a headline), "up" (a paragraph), "rows"
// (a ruled list; its children rise), "print" (a figure.print). The hidden
// starting states are CSS under html.motion (global.css), so nothing flashes.
// If this file arrives after Base.astro's fallback timer has shown the page,
// the reveals are skipped; the scroll-linked effects still run.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { lenis } from './smooth-scroll';

gsap.registerPlugin(ScrollTrigger, SplitText);
ScrollTrigger.config({ ignoreMobileResize: true });
lenis?.on('scroll', ScrollTrigger.update);

const root = document.documentElement;
const reveal = root.classList.contains('motion');
root.classList.add('motion-ready');

const ease = 'power4.out'; // close to the CSS --ease, cubic-bezier(0.22, 1, 0.36, 1)
const start = 'top 85%';

if (reveal) {
  // Headlines: lines rise in order; the split is undone afterwards so the
  // heading is plain text again (and re-wraps freely on resize).
  document.querySelectorAll<HTMLElement>('[data-reveal="lines"]').forEach((el) => {
    const split = SplitText.create(el, { type: 'lines' });
    gsap.set(el, { autoAlpha: 1 });
    gsap.from(split.lines, {
      yPercent: 45,
      autoAlpha: 0,
      duration: 0.95,
      ease,
      stagger: 0.09,
      scrollTrigger: { trigger: el, start, once: true },
      onComplete: () => split.revert(),
    });
  });

  // Paragraphs follow the headline they sit under.
  gsap.set('[data-reveal="up"]', { autoAlpha: 0, y: 16 });
  ScrollTrigger.batch('[data-reveal="up"]', {
    start,
    once: true,
    onEnter: (els) => gsap.to(els, { autoAlpha: 1, y: 0, duration: 0.8, ease, stagger: 0.08, delay: 0.15 }),
  });

  // Ruled lists: the heavy top rule is drawn left to right, then the rows rise
  // as each one reaches the screen.
  document.querySelectorAll<HTMLElement>('[data-reveal="rows"]').forEach((list) => {
    gsap.fromTo(list, { '--rule': 0 }, { '--rule': 1, duration: 1.1, ease: 'power3.inOut', scrollTrigger: { trigger: list, start, once: true } });
    const rows = Array.from(list.children);
    gsap.set(rows, { autoAlpha: 0, y: 20 });
    ScrollTrigger.batch(rows, {
      start: 'top 90%',
      once: true,
      onEnter: (els) => gsap.to(els, { autoAlpha: 1, y: 0, duration: 0.8, ease, stagger: 0.07, delay: 0.1 }),
    });
  });

  // Prints print themselves, like the hero's on load (--printed, global.css).
  document.querySelectorAll<HTMLElement>('[data-reveal="print"]').forEach((fig) => {
    gsap.fromTo(fig, { '--printed': 0 }, { '--printed': 1, duration: 1.1, ease, scrollTrigger: { trigger: fig, start, once: true } });
  });
}

// ---------- scroll-linked: these follow the scroll position, in both directions ----------

// The halftone field drifts up faster than the page as the hero leaves.
gsap.to('.bg-halftone', {
  yPercent: -24,
  ease: 'none',
  scrollTrigger: { trigger: '.halo', start: 'top top', end: 'bottom top', scrub: 1 },
});

// The hero print slides a little inside its frame. Scaled about the reader,
// so the load-time pulse rings still sit on it at the top of the page; 6%
// covers the top edge for the whole 2.5% travel (0.06 × 52% above the origin).
const heroPicture = document.querySelector('.hero-print picture');
if (heroPicture) {
  gsap.set(heroPicture, { scale: 1.06, transformOrigin: '27% 52%' });
  gsap.to(heroPicture, {
    yPercent: 2.5,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.8 },
  });
}

// The ink block rolls out from a rounded card to the full width as it comes up (--roll, global.css).
gsap.fromTo('.how', { '--roll': 0 }, {
  '--roll': 1,
  ease: 'none',
  scrollTrigger: { trigger: '.how', start: 'top bottom', end: 'top 25%', scrub: 0.8 },
});

// The timeline rail fills while the list is read; each entry's dot takes the
// signal colour as the rail's head (around 65% down the screen) reaches it.
gsap.fromTo('.tl-progress', { scaleY: 0 }, {
  scaleY: 1,
  ease: 'none',
  scrollTrigger: { trigger: '.timeline', start: 'top 70%', end: 'bottom 60%', scrub: 0.6 },
});
document.querySelectorAll('.tl-item').forEach((item) => {
  ScrollTrigger.create({ trigger: item, start: 'top 66%', toggleClass: 'is-read' });
});

// ---------- pointer: fine pointers only ----------

if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  // The primary button in the hero leans toward the pointer. GSAP owns its
  // transform, so the CSS transition keeps only the colours.
  const mag = document.querySelector<HTMLElement>('.hero .btn-primary');
  if (mag) {
    mag.style.transition = 'border-color 0.2s, background 0.2s, color 0.2s';
    const xTo = gsap.quickTo(mag, 'x', { duration: 0.45, ease: 'power3.out' });
    const yTo = gsap.quickTo(mag, 'y', { duration: 0.45, ease: 'power3.out' });
    mag.addEventListener('pointermove', (e) => {
      const r = mag.getBoundingClientRect();
      xTo((e.clientX - r.left - r.width / 2) * 0.22);
      yTo((e.clientY - r.top - r.height / 2) * 0.22);
    });
    mag.addEventListener('pointerleave', () => {
      xTo(0);
      yTo(0);
    });
  }

  // The halftone field shifts slightly against the pointer over the hero.
  const hero = document.querySelector<HTMLElement>('.hero');
  const field = document.querySelector('.bg-halftone');
  if (hero && field) {
    const xTo = gsap.quickTo(field, 'x', { duration: 1.2, ease: 'power3.out' });
    const yTo = gsap.quickTo(field, 'y', { duration: 1.2, ease: 'power3.out' });
    hero.addEventListener('pointermove', (e) => {
      xTo((e.clientX - window.innerWidth / 2) * -0.03);
      yTo((e.clientY - window.innerHeight / 2) * -0.03);
    });
    hero.addEventListener('pointerleave', () => {
      xTo(0);
      yTo(0);
    });
  }
}

// Positions move when a catalogue row opens or closes, and once the fonts land.
document.querySelectorAll('details').forEach((d) => d.addEventListener('toggle', () => ScrollTrigger.refresh()));
document.fonts.ready.then(() => ScrollTrigger.refresh());
