import { useEffect, useRef, useState } from 'react';

/**
 * Anima um valor numérico de 0 até `target` usando requestAnimationFrame.
 * Respeita prefers-reduced-motion (retorna o valor final imediatamente).
 *
 * @param target  - valor final desejado
 * @param duration - duração da animação em milissegundos (padrão 1200ms)
 * @param start   - quando true inicia a animação
 */
export function useCountUp(target: number, duration = 1200, start: boolean): number {
  const [current, setCurrent] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!start || target === 0) {
      setCurrent(target);
      return;
    }

    // Respeita preferência do sistema por movimento reduzido
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setCurrent(target);
      return;
    }

    const startTime = performance.now();

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setCurrent(Math.round(easeOutCubic(progress) * target));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration, start]);

  return current;
}
