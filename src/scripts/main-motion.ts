// Motion entry for every page (docs/brand-guidelines.md §6). Smooth scrolling
// (Lenis) runs everywhere; the home page's scroll choreography (GSAP,
// home-motion.ts) is fetched only on pages that have something to reveal, so
// the other pages never download GSAP. Under reduced motion neither runs and
// the page renders in its final state.
import './smooth-scroll';

const root = document.documentElement;
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduce && document.querySelector('[data-reveal]')) {
  // If the chunk cannot load, drop the hidden starting states (global.css) at once.
  import('./home-motion').catch(() => root.classList.remove('motion'));
}
