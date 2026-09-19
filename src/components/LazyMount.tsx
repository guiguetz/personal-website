import { useEffect, useRef, useState, type ReactNode } from 'react';

/**
 * Renderiza os filhos somente quando o container se aproxima do viewport,
 * adiando o download/execução de código da dobra para baixo.
 */
export function LazyMount({ children, rootMargin = '400px 0px' }: { children: ReactNode; rootMargin?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (visible) return;
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible, rootMargin]);

  return <div ref={ref} style={{ minHeight: visible ? undefined : '1px' }}>{visible ? children : null}</div>;
}