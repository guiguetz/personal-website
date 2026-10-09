/**
 * Theme transition — expanding circle with real target colors.
 *
 * 1. Read the CURRENT theme's CSS variables.
 * 2. Create an overlay covering the viewport, with old theme colors baked in.
 * 3. Toggle the class on <html> — page underneath gets the TARGET theme instantly.
 * 4. Animate the overlay's clip-path shrinking from full → 0 at the click point.
 *    The old theme "shrinks away", revealing the real new theme underneath.
 * 5. Remove overlay.
 *
 * No mix-blend-mode inversion — colors are always correct.
 *
 * @see https://imabi.org/ for the original inspiration
 */

/** CSS variables that define the theme palette. */
const THEME_VARS = [
  '--background', '--foreground',
  '--card', '--card-foreground',
  '--popover', '--popover-foreground',
  '--primary', '--primary-foreground',
  '--secondary', '--secondary-foreground',
  '--muted', '--muted-foreground',
  '--accent', '--accent-foreground',
  '--destructive', '--destructive-foreground',
  '--border', '--input', '--ring',
];

/** Read current computed CSS variables from <html>. */
function readThemeVars(): Record<string, string> {
  const cs = getComputedStyle(document.documentElement);
  const vars: Record<string, string> = {};
  for (const v of THEME_VARS) {
    vars[v] = cs.getPropertyValue(v).trim();
  }
  return vars;
}

/**
 * Toggle theme with an expanding circle transition.
 * The circle reveals the real target colors — no blend-mode inversion.
 *
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

  const root = document.documentElement;

  // 1. Read the CURRENT theme variables (before toggle)
  const oldVars = readThemeVars();

  // 2. Create overlay covering the full viewport with old theme colors baked in.
  //    Inline CSS variables override the toggled class on <html>.
  const overlay = document.createElement('div');
  overlay.setAttribute('aria-hidden', 'true');
  Object.assign(overlay.style, {
    position: 'fixed',
    inset: '0',
    zIndex: '9999',
    pointerEvents: 'none',
  });
  for (const [prop, val] of Object.entries(oldVars)) {
    overlay.style.setProperty(prop, val);
  }
  overlay.style.backgroundColor = 'hsl(var(--background))';
  document.body.appendChild(overlay);

  // 3. Toggle class on <html> — page underneath gets the TARGET theme.
  //    Overlay (covering everything) still shows old theme via its inline vars.
  root.classList.add('theme-transition-disabled');
  root.classList.toggle('light');
  localStorage.setItem('theme', root.classList.contains('light') ? 'light' : 'dark');

  // 4. Shrink the overlay away from the click point → old theme disappears,
  //    revealing the real new theme content underneath.
  const maxR = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  ) * 1.1;
  const maxPct = (maxR / Math.min(window.innerWidth, window.innerHeight)) * 100;

  const animation = overlay.animate(
    [
      { clipPath: `circle(${maxPct}% at ${x}px ${y}px)` },
      { clipPath: `circle(0% at ${x}px ${y}px)` },
    ],
    {
      duration: 600,
      easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
      fill: 'forwards',
    },
  );

  // 5. Cleanup — remove overlay and re-enable transitions
  animation.onfinish = () => {
    onToggled?.();
    requestAnimationFrame(() => {
      overlay.remove();
      root.classList.remove('theme-transition-disabled');
    });
  };
}