import { useEffect } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { useI18n } from '@/i18n/I18nContext';

const NAV_SECTIONS = ['about', 'impact', 'experience', 'skills', 'case-study', 'contact'] as const;

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

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // Skip when user is typing in an input
      const tag = (e.target as HTMLElement).tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

      // Number keys 1-6 navigate to sections
      const num = parseInt(e.key, 10);
      if (num >= 1 && num <= NAV_SECTIONS.length) {
        e.preventDefault();
        scrollToSection(NAV_SECTIONS[num - 1]);
        return;
      }

      // 't' toggles theme
      if (e.key === 't' && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        toggleTheme();
        return;
      }

      // 'l' toggles language
      if (e.key === 'l' && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        setLocale(locale === 'pt' ? 'en' : 'pt');
        return;
      }

      // Home scrolls to top
      if (e.key === 'Home' && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleTheme, locale, setLocale]);

  return null;
}