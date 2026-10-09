import { useEffect, useRef, useState } from 'react';

/**
 * Anima um valor numérico de 0 até `target` usando requestAnimationFrame.
 * Respeita prefers-reduced-motion (retorna o valor final imediatamente).
 *
 * @param target  - valor final desejado
 * @param duration - duração da animação em milissegundos (padrão 1200ms)
 * @param start   - quando true inicia a animação
 * @param decimals - casas decimais (padrão 0)
 */
export function useCountUp(target: number, duration = 1200, start: boolean, decimals = 0): number {
  const [current, setCurrent] = useState(0);
  const rafRef = useRef<number>(0);
  const factor = Math.pow(10, decimals);

  useEffect(() => {
    if (!start || target === 0) {
      setCurrent(target * factor);
      return;
    }

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setCurrent(target * factor);
      return;
    }

    const startTime = performance.now();
    const scaledTarget = target * factor;
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setCurrent(Math.round(easeOutCubic(progress) * scaledTarget));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration, start, factor]);

  return current;
}
