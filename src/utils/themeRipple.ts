/**
 * Theme ripple — animates a circular clip-path expanding from the click point
 * outward, revealing the new theme as it passes over each element.
 */

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

  // Determine the NEW theme's background (after toggle)
  const willBeLight = !document.documentElement.classList.contains('light');
  const newBg = willBeLight ? '#ffffff' : '#09090b';

  // Create overlay with NEW theme background, starting invisible at click point
  const overlay = document.createElement('div');
  overlay.setAttribute('aria-hidden', 'true');
  Object.assign(overlay.style, {
    position: 'fixed',
    inset: '0',
    zIndex: '9999',
    background: newBg,
    clipPath: `circle(0% at ${x}px ${y}px)`,
    pointerEvents: 'none',
  });
  document.body.appendChild(overlay);

  // Animate the new theme expanding outward from the click point,
  // painting over each element as the circle grows
  const animation = overlay.animate(
    [
      { clipPath: `circle(0% at ${x}px ${y}px)` },
      { clipPath: `circle(150% at ${x}px ${y}px)` },
    ],
    {
      duration: 600,
      easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
      fill: 'forwards',
    },
  );

  animation.onfinish = () => {
    // Toggle the real theme and remove overlay
    document.documentElement.classList.toggle('light');
    localStorage.setItem('theme', document.documentElement.classList.contains('light') ? 'light' : 'dark');
    overlay.remove();
  };
}