import { useReducedMotion, type Variants } from 'framer-motion';

/**
 * Returns parent/child variants for staggered list animations.
 * Respects the user's `prefers-reduced-motion` setting by removing
 * both the offsets and the stagger delay.
 */
export function useStagger(stagger = 0.08, distance = 16) {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : stagger,
        delayChildren: reduce ? 0 : 0.05,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : distance },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.45, ease: 'easeOut' },
    },
  };

  return {
    container,
    item,
    viewport: { once: true, amount: 0.15 } as const,
  };
}