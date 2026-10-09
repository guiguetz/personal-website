/**
 * Smoothly scrolls to a section by id, using the View Transitions API
 * when available. Falls back to native smooth scrolling.
 */
export function smoothNavigate(sectionId: string): void {
  const element = document.getElementById(sectionId);
  if (!element) return;

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches;

  const scrollToElement = () => {
    element.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
  };

  if (prefersReducedMotion) {
    scrollToElement();
    return;
  }

  if (typeof document !== 'undefined' && 'startViewTransition' in document) {
    (document as Document & { startViewTransition: (cb: () => void) => ViewTransition }).startViewTransition(scrollToElement);
  } else {
    scrollToElement();
  }
}