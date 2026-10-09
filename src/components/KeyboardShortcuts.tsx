import { useEffect, useState } from 'react';
import { Keyboard } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { useI18n } from '@/i18n/I18nContext';

const NAV_SECTIONS = ['about', 'impact', 'experience', 'skills', 'case-study', 'contact'] as const;

const shortcutLabels = {
  pt: {
    sections: 'Seções',
    theme: 'Tema',
    lang: 'Idioma',
    top: 'Topo',
  },
  en: {
    sections: 'Sections',
    theme: 'Theme',
    lang: 'Language',
    top: 'Top',
  },
} as const;

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    el.focus({ preventScroll: true });
  }
}

export function KeyboardShortcuts() {
  const { toggleTheme } = useTheme();
  const { locale, setLocale } = useI18n();
  const [expanded, setExpanded] = useState(false);
  const labels = shortcutLabels[locale];

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

      const num = parseInt(e.key, 10);
      if (num >= 1 && num <= NAV_SECTIONS.length) {
        e.preventDefault();
        scrollToSection(NAV_SECTIONS[num - 1]);
        return;
      }

      if (e.key === 't' && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        toggleTheme();
        return;
      }

      if (e.key === 'l' && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        setLocale(locale === 'pt' ? 'en' : 'pt');
        return;
      }

      if (e.key === 'Home' && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleTheme, locale, setLocale]);

  return (
    <div
      className="fixed bottom-6 right-24 z-40 hidden lg:block"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <div
        className={`flex items-center gap-2 rounded-full border border-border bg-card/80 shadow-lg backdrop-blur-sm transition-all duration-200 ${
          expanded ? 'px-4 py-2.5' : 'px-3 py-1.5'
        }`}
      >
        <Keyboard className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
        {expanded ? (
          <div className="flex flex-col gap-1 text-[11px] text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <kbd className="inline-flex h-4 min-w-[16px] items-center justify-center rounded border border-border bg-muted px-1 font-mono font-medium">1</kbd>
              <span>–</span>
              <kbd className="inline-flex h-4 min-w-[16px] items-center justify-center rounded border border-border bg-muted px-1 font-mono font-medium">6</kbd>
              <span>{labels.sections}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <kbd className="inline-flex h-4 min-w-[16px] items-center justify-center rounded border border-border bg-muted px-1 font-mono font-medium">T</kbd>
              <span>{labels.theme}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <kbd className="inline-flex h-4 min-w-[16px] items-center justify-center rounded border border-border bg-muted px-1 font-mono font-medium">L</kbd>
              <span>{labels.lang}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <kbd className="inline-flex h-4 min-w-[16px] items-center justify-center rounded border border-border bg-muted px-1 font-mono font-medium">⇧</kbd>
              <span>{labels.top}</span>
            </div>
          </div>
        ) : (
          <span className="text-[11px] font-medium text-muted-foreground">
            {locale === 'pt' ? 'Atalhos' : 'Shortcuts'}
          </span>
        )}
      </div>
    </div>
  );
}