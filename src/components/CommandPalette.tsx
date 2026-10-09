import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import { useI18n } from '@/i18n/I18nContext';
import { useTheme } from '@/hooks/useTheme';
import {
  User,
  BarChart3,
  Briefcase,
  Code2,
  FolderGit2,
  Mail,
  Sun,
  Moon,
  Languages,
  Search,
} from 'lucide-react';

function isMac() {
  if (typeof navigator === 'undefined') return false;
  return /Mac|iPod|iPhone|iPad/.test(navigator.platform ?? navigator.userAgent);
}

// Bilingual strings — self-contained, not in translations.ts
const strings = {
  pt: {
    title: 'Paleta de Comandos',
    placeholder: 'Buscar comando…',
    navigation: 'Navegação',
    actions: 'Ações',
    about: 'Sobre Mim',
    impact: 'Impacto',
    experience: 'Experiência',
    skills: 'Habilidades',
    projects: 'Projetos',
    contact: 'Contato',
    toggleTheme: 'Alternar Tema',
    toggleLanguage: 'Alternar Idioma',
    noResults: 'Nenhum resultado encontrado.',
    shortcut: '⌘K',
  },
  en: {
    title: 'Command Palette',
    placeholder: 'Search command…',
    navigation: 'Navigation',
    actions: 'Actions',
    about: 'About Me',
    impact: 'Impact',
    experience: 'Experience',
    skills: 'Skills',
    projects: 'Projects',
    contact: 'Contact',
    toggleTheme: 'Toggle Theme',
    toggleLanguage: 'Toggle Language',
    noResults: 'No results found.',
    shortcut: '⌘K',
  },
} as const;

const shortcutKey = isMac() ? '⌘K' : 'Ctrl+K';

type CommandGroup = 'navigation' | 'actions';

interface CommandItem {
  id: string;
  label: string;
  group: CommandGroup;
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
  sectionId?: string;
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { locale, toggleLocale } = useI18n();
  const { isDark, toggleTheme } = useTheme();
  const t = strings[locale];

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    el.focus({ preventScroll: true });
  }, []);

  const items: CommandItem[] = useMemo(
    () => [
      { id: 'about', label: t.about, group: 'navigation', icon: User, sectionId: 'about', action: () => scrollToSection('about') },
      { id: 'impact', label: t.impact, group: 'navigation', icon: BarChart3, sectionId: 'impact', action: () => scrollToSection('impact') },
      { id: 'experience', label: t.experience, group: 'navigation', icon: Briefcase, sectionId: 'experience', action: () => scrollToSection('experience') },
      { id: 'skills', label: t.skills, group: 'navigation', icon: Code2, sectionId: 'skills', action: () => scrollToSection('skills') },
      { id: 'projects', label: t.projects, group: 'navigation', icon: FolderGit2, sectionId: 'case-study', action: () => scrollToSection('case-study') },
      { id: 'contact', label: t.contact, group: 'navigation', icon: Mail, sectionId: 'contact', action: () => scrollToSection('contact') },
      { id: 'toggle-theme', label: `${t.toggleTheme} (${isDark ? '🌙' : '☀️'})`, group: 'actions', icon: isDark ? Sun : Moon, action: toggleTheme },
      { id: 'toggle-language', label: `${t.toggleLanguage} (${locale === 'pt' ? 'EN' : 'PT'})`, group: 'actions', icon: Languages, action: toggleLocale },
    ],
    [t, isDark, locale, toggleTheme, toggleLocale, scrollToSection],
  );

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return items;
    return items.filter((item) => item.label.toLowerCase().includes(q));
  }, [items, query]);

  const grouped = useMemo(() => {
    const map = new Map<CommandGroup, CommandItem[]>();
    for (const item of filtered) {
      const list = map.get(item.group);
      if (list) list.push(item);
      else map.set(item.group, [item]);
    }
    return map;
  }, [filtered]);

  // Keyboard shortcut: Cmd+K / Ctrl+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Reset state on open
  useEffect(() => {
    if (open) {
      setQuery('');
      setActiveIndex(0);
    }
  }, [open]);

  // Keep activeIndex in bounds
  useEffect(() => {
    if (activeIndex >= filtered.length) setActiveIndex(Math.max(0, filtered.length - 1));
  }, [filtered.length, activeIndex]);

  // Scroll active item into view
  useEffect(() => {
    const el = listRef.current?.querySelector('[data-active="true"]');
    if (el) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      el.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'nearest' });
    }
  }, [activeIndex]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setActiveIndex((i) => (i + 1) % Math.max(1, filtered.length));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setActiveIndex((i) => (i - 1 + Math.max(1, filtered.length)) % Math.max(1, filtered.length));
          break;
        case 'Enter':
          e.preventDefault();
          if (filtered[activeIndex]) {
            filtered[activeIndex].action();
            setOpen(false);
          }
          break;
        case 'Escape':
          e.preventDefault();
          setOpen(false);
          break;
      }
    },
    [filtered, activeIndex],
  );

  const executeItem = (item: CommandItem) => {
    item.action();
    setOpen(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
        className="bg-card border-border rounded-xl shadow-2xl max-w-md w-[calc(100%-2rem)] p-0 gap-0 overflow-hidden backdrop-blur-xl bg-card/95 [&>button]:hidden"
        onKeyDown={handleKeyDown}
        aria-label={t.title}
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        // Prevent Radix from auto-focusing the close button
        onOpenAutoFocus={(e) => {
          e.preventDefault();
          inputRef.current?.focus();
        }}
      >
        <DialogTitle className="sr-only">{t.title}</DialogTitle>

        {/* Search input */}
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(0);
            }}
            placeholder={t.placeholder}
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
            aria-label={t.placeholder}
          />
          <kbd className="hidden sm:inline-flex items-center gap-1 rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
            ESC
          </kbd>
        </div>

        {/* Results list */}
        <div
          ref={listRef}
          role="listbox"
          aria-label={t.title}
          className="max-h-72 overflow-y-auto overscroll-contain p-1.5"
        >
          {filtered.length === 0 && (
            <p className="px-3 py-6 text-center text-sm text-muted-foreground">
              {t.noResults}
            </p>
          )}

          {Array.from(grouped.entries()).map(([group, groupItems]) => (
            <div key={group} role="group" aria-label={group === 'navigation' ? t.navigation : t.actions}>
              <p className="px-2 pt-2 pb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70 select-none">
                {group === 'navigation' ? t.navigation : t.actions}
              </p>
              {groupItems.map((item) => {
                const index = filtered.indexOf(item);
                const isActive = index === activeIndex;
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    role="option"
                    aria-selected={isActive}
                    data-active={isActive}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => executeItem(item)}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                      isActive
                        ? 'bg-accent text-accent-foreground'
                        : 'text-foreground hover:bg-accent/50'
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <span className="flex-1 truncate">{item.label}</span>
                    {item.sectionId && (
                      <kbd className="hidden sm:inline-flex items-center rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                        #{item.sectionId}
                      </kbd>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Footer hint */}
        <div className="flex items-center justify-between border-t border-border px-3 py-2 text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1">
            <kbd className="inline-flex h-5 items-center rounded border border-border bg-muted px-1 font-medium">
              ↑↓
            </kbd>
            <span className="sr-only sm:not-sr-only">navigate</span>
          </span>
          <span className="flex items-center gap-1">
            <kbd className="inline-flex h-5 items-center rounded border border-border bg-muted px-1 font-medium">
              ↵
            </kbd>
            <span className="sr-only sm:not-sr-only">select</span>
          </span>
          <span className="flex items-center gap-1">
            <kbd className="inline-flex h-5 items-center rounded border border-border bg-muted px-1 font-medium">
              esc
            </kbd>
            <span className="sr-only sm:not-sr-only">close</span>
          </span>
        </div>
      </DialogContent>
    </Dialog>

    {/* Desktop trigger hint — hidden on mobile */}
    {!open && (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-30 hidden items-center gap-1.5 rounded-full border border-border bg-card/80 px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-lg backdrop-blur-sm transition-all hover:border-primary/40 hover:text-foreground lg:flex"
        aria-label={`${t.title} (${shortcutKey})`}
      >
        <Search className="h-3 w-3" />
        <kbd className="font-mono text-[11px]">{shortcutKey}</kbd>
      </button>
    )}
    </>
  );
}