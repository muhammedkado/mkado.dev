// Motion for the main site, on top of the CSS entrance and the CSS-driven timeline:
// backdrop parallax that follows the scroll, colour fields that drift toward the
// pointer, a magnetic primary CTA, a pointer spotlight on the showcase panel and a
// stagger reveal for the skill groups. Transform/opacity only; reduced motion
// renders the final state. Brand motion tokens: docs/brand-guidelines.md §6.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function showAll(): void {
  document.querySelectorAll<HTMLElement>('.anim').forEach((el) => {
    el.style.opacity = '1';
  });
}

const mm = gsap.matchMedia();

mm.add('(prefers-reduced-motion: reduce)', () => {
  showAll();
});

mm.add('(prefers-reduced-motion: no-preference)', () => {
  const safety = window.setTimeout(showAll, 3000);

  /* backdrop: decorative layers move with the scroll, small deltas */
  gsap.utils.toArray<HTMLElement>('.bg-blob').forEach((layer, i) => {
    gsap.to(layer, {
      yPercent: (i + 1) * -7,
      ease: 'none',
      scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 0.8 },
    });
  });
  gsap.to('.bg-pulse', {
    yPercent: -16,
    rotation: -6,
    transformOrigin: '100% 0%',
    ease: 'none',
    scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 0.8 },
  });

  /* skill groups: grid-wave stagger on scroll */
  ScrollTrigger.batch('.skill-group', {
    start: 'top 88%',
    once: true,
    onEnter: (batch) =>
      gsap.fromTo(
        batch,
        { autoAlpha: 0, y: 16, scale: 0.98 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.5, stagger: { each: 0.07, grid: 'auto' }, ease: 'back.out(1.2)', clearProps: 'transform', onComplete: () => window.clearTimeout(safety) },
      ),
  });

  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    // colour fields drift toward the pointer
    const drift = document.querySelector<HTMLElement>('.bg-drift');
    if (drift) {
      const dx = gsap.quickTo(drift, 'x', { duration: 1.4, ease: 'power2.out' });
      const dy = gsap.quickTo(drift, 'y', { duration: 1.4, ease: 'power2.out' });
      window.addEventListener(
        'pointermove',
        (e) => {
          dx((e.clientX / window.innerWidth - 0.5) * 48);
          dy((e.clientY / window.innerHeight - 0.5) * 48);
        },
        { passive: true },
      );
    }

    // one magnetic focal element: the primary CTA in the hero
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

    // spotlight follows the pointer across the showcase panel
    const panels = document.querySelector<HTMLElement>('.panels');
    if (panels) {
      panels.addEventListener('pointermove', (e) => {
        const r = panels.getBoundingClientRect();
        panels.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
        panels.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
      });
    }
  }

  document.fonts?.ready.then(() => ScrollTrigger.refresh());
});
