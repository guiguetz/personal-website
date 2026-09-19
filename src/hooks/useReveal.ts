import { useEffect, useRef, useState } from 'react';

/**
 * Revela o elemento quando entra no viewport (uma única vez).
 * Substituto leve do whileInView do framer-motion — a animação
 * em si é feita via classes CSS (reveal-children / reveal-self).
 */
export function useReveal<T extends HTMLElement>(amount = 0.15) {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;
    if (typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.intersectionRatio >= amount || e.isIntersecting)) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: amount, rootMargin: '0px 0px -40px 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [amount, shown]);

  return { ref, shown };
}