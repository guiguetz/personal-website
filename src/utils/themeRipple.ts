/**
 * Theme ripple — toggles the theme immediately, then peels away an
 * old-theme overlay from the click point outward so the actual content
 * is visible changing color beneath the ripple edge.
 *
 * Uses an evenodd polygon clip-path: the outer ring is the full viewport,
 * the inner ring is a circle approximated by 48 points centered at the
 * click point. The "hole" grows outward, revealing the new theme underneath.
 */

const NUM_POINTS = 48;
const TWO_PI = Math.PI * 2;

/** Build a polygon(evenodd, ...) string with an outer viewport rect and
 *  an inner circle of radius r (in px) centered at (cx, cy). */
function buildClipPath(cx: number, cy: number, r: number): string {
  // Outer ring — viewport rectangle
  const outer = '0 0, 100% 0, 100% 100%, 0 100%, 0 0';

  // Inner ring — circle approximated by NUM_POINTS vertices
  // Walk clockwise so evenodd treats it as a hole
  const innerPoints: string[] = [];
  for (let i = 0; i <= NUM_POINTS; i++) {
    const angle = (i / NUM_POINTS) * TWO_PI;
    const px = cx + r * Math.cos(angle);
    const py = cy + r * Math.sin(angle);
    innerPoints.push(`${px.toFixed(2)}px ${py.toFixed(2)}px`);
  }

  return `polygon(evenodd, ${outer}, ${innerPoints.join(', ')})`;
}

export function toggleThemeWithRipple(e: MouseEvent) {
  const x = e.clientX;
  const y = e.clientY;

  // Respect reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    document.documentElement.classList.toggle('light');
    localStorage.setItem('theme', document.documentElement.classList.contains('light') ? 'light' : 'dark');
    return;
  }

  // Read the CURRENT (old) computed background before toggling
  const oldBg = getComputedStyle(document.documentElement).backgroundColor;

  // Disable CSS transitions during the ripple so colors snap instantly
  const root = document.documentElement;
  root.classList.add('theme-transition-disabled');

  // Toggle the real theme NOW — React will re-render content with new colors
  root.classList.toggle('light');
  localStorage.setItem('theme', root.classList.contains('light') ? 'light' : 'dark');

  // Overlay with old theme background, covering everything (tiny inner hole = no hole)
  const overlay = document.createElement('div');
  overlay.setAttribute('aria-hidden', 'true');
  Object.assign(overlay.style, {
    position: 'fixed',
    inset: '0',
    zIndex: '9999',
    background: oldBg,
    pointerEvents: 'none',
    clipPath: buildClipPath(x, y, 0.5),
  });
  document.body.appendChild(overlay);

  // Animate: grow the inner circle from 0.5px (no visible hole) to a
  // radius large enough to cover the viewport, carving a hole that
  // reveals the new theme from the click point outward.
  const maxR = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  ) * 1.1;

  const animation = overlay.animate(
    [
      { clipPath: buildClipPath(x, y, 0.5) },
      { clipPath: buildClipPath(x, y, maxR) },
    ],
    {
      duration: 600,
      easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
      fill: 'forwards',
    },
  );

  animation.onfinish = () => {
    overlay.remove();
    root.classList.remove('theme-transition-disabled');
  };
}