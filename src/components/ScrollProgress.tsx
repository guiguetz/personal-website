import { useEffect, useRef, useState } from 'react';

/**
 * Thin progress bar fixed at the top of the viewport that fills
 * proportionally to the current vertical scroll position.
 *
 * - Hidden at scroll 0 %.
 * - Uses requestAnimationFrame for smooth 60 fps updates.
 * - Respects `prefers-reduced-motion` (instant width, no transition).
 * - Fully self-contained; no external deps beyond React.
 */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const rafId = useRef(0);

  useEffect(() => {
    function update() {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const maxScroll = scrollHeight - clientHeight;
      setProgress(maxScroll > 0 ? scrollTop / maxScroll : 0);
    }

    function onScroll() {
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(update);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    // Sync once in case the page loads already scrolled.
    update();

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  if (progress === 0) return null;

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: `${(progress * 100).toFixed(2)}%`,
        height: '2px',
        background: 'linear-gradient(to right, hsl(239 92% 75%), hsl(270 80% 65%))',
        zIndex: 50,
        transition: prefersReducedMotion ? 'none' : 'width 100ms ease-out',
      }}
    />
  );
}