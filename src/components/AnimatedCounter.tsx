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
  /** Casas decimais (padrão 0) */
  decimals?: number;
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
  decimals = 0,
}: AnimatedCounterProps) {
  const count = useCountUp(value, duration, start, decimals);
  const divisor = Math.pow(10, decimals);
  const displayValue = decimals > 0 ? count / divisor : count;

  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(displayValue);

  return (
    <span>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
