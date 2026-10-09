/**
 * Theme transition — imabi.org style expanding circle inversion.
 *
 * Creates a white overlay with `mix-blend-mode: difference` that
 * inverts all colors as a circle expands from the click point.
 * When the circle covers the viewport, the real theme is toggled
 * underneath and the overlay is removed — seamless inversion.
 *
 * @see https://imabi.org/ for the original inspiration
 */

/**
 * Toggle theme with an expanding circle inversion effect.
 * @param e          Mouse event (for click coordinates)
 * @param onToggled  Called once when the theme class has been toggled
 */
export function toggleThemeWithRipple(e: MouseEvent, onToggled?: () => void) {
  const x = e.clientX;
  const y = e.clientY;

  // Respect reduced motion — instant toggle
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    document.documentElement.classList.toggle('light');
    localStorage.setItem('theme', document.documentElement.classList.contains('light') ? 'light' : 'dark');
    onToggled?.();
    return;
  }

  // Disable CSS transitions during the animation so theme colors snap
  const root = document.documentElement;
  root.classList.add('theme-transition-disabled');

  // White overlay with mix-blend-mode: difference inverts all colors
  const overlay = document.createElement('div');
  overlay.setAttribute('aria-hidden', 'true');
  Object.assign(overlay.style, {
    position: 'fixed',
    inset: '0',
    zIndex: '9999',
    background: '#fff',
    mixBlendMode: 'difference',
    pointerEvents: 'none',
    clipPath: `circle(0% at ${x}px ${y}px)`,
  });
  document.body.appendChild(overlay);

  // Radius large enough to cover the entire viewport from click point
  const maxR = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  ) * 1.1;
  const maxPct = (maxR / Math.min(window.innerWidth, window.innerHeight)) * 100;

  // Animate the circle expanding from the click point
  const animation = overlay.animate(
    [
      { clipPath: `circle(0% at ${x}px ${y}px)` },
      { clipPath: `circle(${maxPct}% at ${x}px ${y}px)` },
    ],
    {
      duration: 600,
      easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
      fill: 'forwards',
    },
  );

  // Toggle the real theme at the end so the overlay is still covering
  // everything — the inversion hides the color swap. Then remove overlay.
  animation.onfinish = () => {
    root.classList.toggle('light');
    localStorage.setItem('theme', root.classList.contains('light') ? 'light' : 'dark');
    onToggled?.();
    requestAnimationFrame(() => {
      overlay.remove();
      root.classList.remove('theme-transition-disabled');
    });
  };
}