// Motion for the main site, without GSAP (it cost ~113 KB of JS for effects that
// CSS and a few lines of vanilla code cover):
//   - backdrop parallax on scroll: CSS scroll-driven animations (global.css,
//     `@supports (animation-timeline: scroll())`); older browsers get a still backdrop
//   - skill groups: IntersectionObserver adds `.is-in`, CSS transitions stagger by --i
//   - colour fields drift toward the pointer, magnetic hero CTA, pointer spotlight
//     on the showcase panel: requestAnimationFrame lerps, transform only
// Reduced motion renders the final state (CSS) and skips the pointer effects.
// Brand motion tokens: docs/brand-guidelines.md §6.

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* skill groups: reveal on scroll, staggered by index (see .anim / .is-in in global.css) */
const groups = document.querySelectorAll<HTMLElement>('.skill-group.anim');
groups.forEach((el, i) => el.style.setProperty('--i', String(i)));
if (reduce || !('IntersectionObserver' in window)) {
  groups.forEach((el) => el.classList.add('is-in'));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      });
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.1 },
  );
  groups.forEach((el) => io.observe(el));
  // safety: never leave a group invisible (e.g. observer never fires in an odd layout)
  window.setTimeout(() => groups.forEach((el) => el.classList.add('is-in')), 3000);
}

/* pointer effects: fine pointers only, never under reduced motion */
if (!reduce && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  // colour fields drift toward the pointer (slow follow)
  const drift = document.querySelector<HTMLElement>('.bg-drift');
  if (drift) {
    let tx = 0, ty = 0, x = 0, y = 0, raf = 0;
    const step = () => {
      x = lerp(x, tx, 0.06);
      y = lerp(y, ty, 0.06);
      drift.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
      raf = Math.abs(x - tx) + Math.abs(y - ty) > 0.1 ? requestAnimationFrame(step) : 0;
    };
    window.addEventListener(
      'pointermove',
      (e) => {
        tx = (e.clientX / window.innerWidth - 0.5) * 48;
        ty = (e.clientY / window.innerHeight - 0.5) * 48;
        if (!raf) raf = requestAnimationFrame(step);
      },
      { passive: true },
    );
  }

  // one magnetic focal element: the primary CTA in the hero
  const mag = document.querySelector<HTMLElement>('.hero .btn-primary');
  if (mag) {
    mag.style.transition = 'transform 400ms cubic-bezier(.2,.8,.2,1)';
    mag.addEventListener('pointermove', (e) => {
      const r = mag.getBoundingClientRect();
      const dx = (e.clientX - r.left - r.width / 2) * 0.25;
      const dy = (e.clientY - r.top - r.height / 2) * 0.25;
      mag.style.transform = `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px)`;
    });
    mag.addEventListener('pointerleave', () => {
      mag.style.transition = 'transform 600ms cubic-bezier(.34,1.56,.64,1)';
      mag.style.transform = '';
    });
  }

  // spotlight follows the pointer across the showcase panel (CSS reads --mx/--my)
  const panels = document.querySelector<HTMLElement>('.panels');
  if (panels) {
    panels.addEventListener(
      'pointermove',
      (e) => {
        const r = panels.getBoundingClientRect();
        panels.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
        panels.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
      },
      { passive: true },
    );
  }
}
