/**
 * Theme ripple — animates a circular clip-path reveal when toggling themes.
 * Captures the click origin, creates an overlay with the current theme's
 * background, toggles the theme, then shrinks the overlay to the click point.
 */

const BG_LIGHT = '#ffffff';
const BG_DARK = '#09090b';

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

  const isCurrentlyLight = document.documentElement.classList.contains('light');
  const overlayBg = isCurrentlyLight ? BG_LIGHT : BG_DARK;

  // Create full-screen overlay with current theme background
  const overlay = document.createElement('div');
  overlay.setAttribute('aria-hidden', 'true');
  Object.assign(overlay.style, {
    position: 'fixed',
    inset: '0',
    zIndex: '9999',
    backgroundColor: overlayBg,
    clipPath: `circle(150% at ${x}px ${y}px)`,
    pointerEvents: 'none',
  });
  document.body.appendChild(overlay);

  // Toggle the real theme (page changes underneath the overlay)
  document.documentElement.classList.toggle('light');
  localStorage.setItem('theme', document.documentElement.classList.contains('light') ? 'light' : 'dark');

  // Animate the overlay shrinking to the click point
  const animation = overlay.animate(
    [
      { clipPath: `circle(150% at ${x}px ${y}px)` },
      { clipPath: `circle(0% at ${x}px ${y}px)` },
    ],
    {
      duration: 500,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      fill: 'forwards',
    },
  );

  animation.onfinish = () => {
    overlay.remove();
  };
}