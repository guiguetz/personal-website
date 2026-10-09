/**
 * Reveal the next color scheme from the theme-toggle button, matching the
 * expanding-circle transition in https://codepen.io/z-/pen/ZEzMpdj.
 *
 * The View Transition API snapshots the actual page, avoiding a cloned DOM
 * that loses document-level theme styles or duplicates IDs. Older browsers
 * and reduced-motion users get an immediate theme change instead.
 */
export function toggleThemeWithRipple(e?: MouseEvent, onToggled?: () => void) {
  const root = document.documentElement;
  const nextIsLight = !root.classList.contains('light');

  const applyTheme = () => {
    root.classList.toggle('light', nextIsLight);
    localStorage.setItem('theme', nextIsLight ? 'light' : 'dark');
    onToggled?.();
  };

  const startViewTransition = (
    document as Document & {
      startViewTransition?: (callback: () => void) => { ready: Promise<void> };
    }
  ).startViewTransition;

  if (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    !startViewTransition
  ) {
    applyTheme();
    return;
  }

  const clientX = e?.clientX ?? window.innerWidth / 2;
  const clientY = e?.clientY ?? window.innerHeight / 2;
  const radius = Math.hypot(
    Math.max(clientX, window.innerWidth - clientX),
    Math.max(clientY, window.innerHeight - clientY),
  );
  const supportsCircleClipPath = CSS.supports('clip-path', 'circle(0px at 0px 0px)');

  // The new snapshot normally sits above the old one. To animate light → dark
  // by shrinking the outgoing light snapshot, put it above the incoming dark one.
  root.classList.toggle('theme-transition-reverse', !nextIsLight);
  const transition = startViewTransition.call(document, applyTheme);
  void transition.finished.then(
    () => root.classList.remove('theme-transition-reverse'),
    () => root.classList.remove('theme-transition-reverse'),
  );

  transition.ready.then(() => {
    const circle = `circle(${radius}px at ${clientX}px ${clientY}px)`;
    const origin = `circle(0px at ${clientX}px ${clientY}px)`;
    const inset = `inset(${clientY}px ${window.innerWidth - clientX}px ${window.innerHeight - clientY}px ${clientX}px round 50%)`;
    const clipPath = supportsCircleClipPath
      ? nextIsLight ? [origin, circle] : [circle, origin]
      : nextIsLight ? [inset, 'inset(-100vmax round 0px)'] : ['inset(-100vmax round 0px)', inset];

    const reveal = root.animate(
      { clipPath },
      {
        duration: 650,
        easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
        fill: 'forwards',
        pseudoElement: nextIsLight
          ? '::view-transition-new(root)'
          : '::view-transition-old(root)',
      } as KeyframeAnimationOptions,
    );

    // Do not release the dark snapshot ordering until the browser has removed
    // the outgoing light snapshot; otherwise it flashes back for one frame.
    if (!nextIsLight) {
      void transition.finished.then(() => reveal.cancel(), () => reveal.cancel());
    }
  });
}
