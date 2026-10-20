// Smooth wheel scrolling on every page (Lenis), never under reduced motion;
// touch keeps the platform's own scrolling. Lenis moves the real window
// scroll, so the sticky header, the scroll-spy's IntersectionObserver and
// ScrollTrigger keep working unchanged.
import Lenis from 'lenis';

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const lenis = reduce ? null : new Lenis({ autoRaf: true });

// In-page links (#work, or /#work while on the home page) glide instead of
// jumping, and stop at the section's scroll-margin-top under the header.
// Lenis's own `anchors` option does not cancel the native jump, hence this.
// The skip link keeps the browser's behaviour, which moves focus.
if (lenis) {
  document.addEventListener('click', (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = (e.target as Element).closest<HTMLAnchorElement>('a[href*="#"]');
    if (!a || a.target || a.classList.contains('skip-link')) return;
    const url = new URL(a.href);
    if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash) return;
    const target = url.hash === '#top' ? 0 : document.getElementById(decodeURIComponent(url.hash.slice(1)));
    if (target === null) return;
    e.preventDefault();
    lenis.scrollTo(target);
    history.pushState(null, '', url.hash);
    // A keyboard press (detail 0) moves focus too, as the native jump would.
    if (e.detail === 0 && target instanceof HTMLElement) {
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    }
  });
}
