import { useCountUp } from '@/hooks/useCountUp';

interface AnimatedCounterProps {
  /** Valor final do contador */
  value: number;
  /** Texto antes do número (ex: "R$ ") */
  prefix?: string;
  /** Texto depois do número (ex: "+") */
  suffix?: string;
  /** Duração da animação em ms (padrão 1200) */
  duration?: number;
  /** Quando true inicia a contagem */
  start: boolean;
  /** Locale para Intl.NumberFormat (padrão "pt-BR") */
  locale?: string;
}

/**
 * Exibe um número animado de 0 até `value`, com prefixo/sufixo e
 * formatação localizada via Intl.NumberFormat.
 */
export function AnimatedCounter({
  value,
  prefix = '',
  suffix = '',
  duration = 1200,
  start,
  locale = 'pt-BR',
}: AnimatedCounterProps) {
  const count = useCountUp(value, duration, start);

  const formatted = new Intl.NumberFormat(locale).format(count);

  return (
    <span>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
