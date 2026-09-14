// Motion for the main site. Almost everything is CSS (global.css): the one
// page-load moment in the hero, the halftone drift and the timeline rail on
// scroll, the disclosure rows, link and button states. The only script-driven
// effect is the magnetic primary button in the hero, for fine pointers, never
// under reduced motion. Brand motion tokens: docs/brand-guidelines.md §6.

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduce && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  const mag = document.querySelector<HTMLElement>('.hero .btn-primary');
  if (mag) {
    mag.style.transition = 'transform 400ms cubic-bezier(.2,.8,.2,1)';
    mag.addEventListener('pointermove', (e) => {
      const r = mag.getBoundingClientRect();
      const dx = (e.clientX - r.left - r.width / 2) * 0.22;
      const dy = (e.clientY - r.top - r.height / 2) * 0.22;
      mag.style.transform = `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px)`;
    });
    mag.addEventListener('pointerleave', () => {
      mag.style.transition = 'transform 600ms cubic-bezier(.34,1.56,.64,1)';
      mag.style.transform = '';
    });
  }
}
