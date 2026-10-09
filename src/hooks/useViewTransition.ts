import { useCallback } from 'react';

/**
 * Wraps a callback in the View Transitions API when available.
 * Falls back to calling the callback directly in unsupported browsers
 * or when the user prefers reduced motion.
 */
export function useViewTransition() {
  const startTransition = useCallback((cb: () => void) => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (prefersReducedMotion) {
      cb();
      return;
    }

    if (typeof document !== 'undefined' && 'startViewTransition' in document) {
      (document as Document & { startViewTransition: (cb: () => void) => ViewTransition }).startViewTransition(cb);
    } else {
      cb();
    }
  }, []);

  return { startTransition };
}