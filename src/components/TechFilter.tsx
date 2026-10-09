import { Filter, X } from 'lucide-react';
import { useI18n } from '@/i18n/I18nContext';

interface TechFilterProps {
  technologies: string[];
  activeFilters: string[];
  onToggle: (tech: string) => void;
  onClear: () => void;
}

const translations = {
  pt: { filterBy: 'Filtrar por', clear: 'Limpar', all: 'Todos' },
  en: { filterBy: 'Filter by', clear: 'Clear', all: 'All' },
} as const;

export function TechFilter({
  technologies,
  activeFilters,
  onToggle,
  onClear,
}: TechFilterProps) {
  const { locale } = useI18n();
  const t = translations[locale] ?? translations.en;
  const hasFilters = activeFilters.length > 0;

  return (
    <div className="mb-6">
      <div className="mb-2 flex items-center gap-2 text-xs font-medium text-muted-foreground">
        <Filter className="h-3.5 w-3.5" />
        <span>{t.filterBy}</span>
      </div>

      <div
        role="group"
        aria-label={t.filterBy}
        className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin"
      >
        {technologies.map((tech) => {
          const active = activeFilters.includes(tech);
          return (
            <button
              key={tech}
              type="button"
              aria-pressed={active}
              onClick={() => onToggle(tech)}
              className={`shrink-0 rounded-lg px-3 py-1.5 font-mono text-xs font-medium transition-colors ${
                active
                  ? 'bg-primary text-primary-foreground'
                  : 'border border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground'
              }`}
            >
              {tech}
            </button>
          );
        })}

        {hasFilters && (
          <button
            type="button"
            onClick={onClear}
            className="flex shrink-0 items-center gap-1 rounded-lg border border-border bg-card px-3 py-1.5 font-mono text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
          >
            <X className="h-3 w-3" />
            {t.clear}
          </button>
        )}
      </div>
    </div>
  );
}
