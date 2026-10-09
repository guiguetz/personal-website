import { useEffect, useState } from 'react';
import { Keyboard } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

const strings = {
  pt: {
    title: 'Atalhos de Teclado',
    description: 'Atalhos disponíveis neste site',
    shortcuts: [
      { keys: ['⌘K', 'Ctrl+K'], action: 'Paleta de comandos' },
      { keys: ['?'], action: 'Mostrar atalhos' },
      { keys: ['Esc'], action: 'Fechar sobreposição' },
      { keys: ['1'], action: 'Sobre' },
      { keys: ['2'], action: 'Impacto' },
      { keys: ['3'], action: 'Experiência' },
      { keys: ['4'], action: 'Competências' },
      { keys: ['5'], action: 'Projetos' },
      { keys: ['6'], action: 'Contato' },
      { keys: ['T'], action: 'Alternar tema' },
      { keys: ['L'], action: 'Alternar idioma' },
    ],
  },
  en: {
    title: 'Keyboard Shortcuts',
    description: 'Available shortcuts on this site',
    shortcuts: [
      { keys: ['⌘K', 'Ctrl+K'], action: 'Command palette' },
      { keys: ['?'], action: 'Show shortcuts' },
      { keys: ['Esc'], action: 'Close overlay' },
      { keys: ['1'], action: 'About' },
      { keys: ['2'], action: 'Impact' },
      { keys: ['3'], action: 'Experience' },
      { keys: ['4'], action: 'Skills' },
      { keys: ['5'], action: 'Projects' },
      { keys: ['6'], action: 'Contact' },
      { keys: ['T'], action: 'Toggle theme' },
      { keys: ['L'], action: 'Toggle language' },
    ],
  },
} as const;

const sectionMap: Record<string, string> = {
  '1': '#about',
  '2': '#impact',
  '3': '#experience',
  '4': '#skills',
  '5': '#case-study',
  '6': '#contact',
};

function isEditableTarget(e: KeyboardEvent): boolean {
  const el = e.target as HTMLElement;
  if (!el) return false;
  const tag = el.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true;
  if (el.isContentEditable) return true;
  return false;
}

function getLocale(): 'pt' | 'en' {
  const stored = localStorage.getItem('locale');
  return stored === 'pt' ? 'pt' : 'en';
}

export default function KeyboardShortcuts() {
  const [open, setOpen] = useState(false);
  const [locale, setLocale] = useState<'pt' | 'en'>(getLocale());

  // Keep locale in sync if changed elsewhere
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setLocale(getLocale());
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

    const onStorage = (e: StorageEvent) => {
      if (e.key === 'locale') setLocale(getLocale());
    };
    window.addEventListener('storage', onStorage);

    return () => {
      observer.disconnect();
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (isEditableTarget(e)) return;

      // ? → open shortcuts
      if (e.key === '?') {
        e.preventDefault();
        setOpen(true);
        return;
      }

      // 1-6 → navigate sections
      if (e.key >= '1' && e.key <= '6' && !e.metaKey && !e.ctrlKey && !e.altKey) {
        const hash = sectionMap[e.key];
        if (hash) {
          e.preventDefault();
          window.location.hash = hash;
        }
        return;
      }

      // T → toggle theme
      if (e.key === 't' || e.key === 'T') {
        if (!e.metaKey && !e.ctrlKey && !e.altKey) {
          e.preventDefault();
          const current = localStorage.getItem('theme') !== 'light';
          document.documentElement.classList.toggle('light', current);
          localStorage.setItem('theme', current ? 'light' : 'dark');
          window.dispatchEvent(new CustomEvent('theme-toggle'));
        }
        return;
      }

      // L → toggle language
      if (e.key === 'l' || e.key === 'L') {
        if (!e.metaKey && !e.ctrlKey && !e.altKey) {
          e.preventDefault();
          const next = getLocale() === 'pt' ? 'en' : 'pt';
          localStorage.setItem('locale', next);
          window.dispatchEvent(new CustomEvent('locale-toggle'));
        }
        return;
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const t = strings[locale];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Keyboard className="h-5 w-5" />
            {t.title}
          </DialogTitle>
          <DialogDescription>{t.description}</DialogDescription>
        </DialogHeader>

        <div className="mt-2 space-y-2">
          {t.shortcuts.map((shortcut) => (
            <div
              key={shortcut.action}
              className="flex items-center justify-between rounded-md px-2 py-1.5 hover:bg-muted/50 transition-colors motion-reduce:transition-none"
            >
              <span className="text-sm text-muted-foreground">{shortcut.action}</span>
              <div className="flex items-center gap-1">
                {shortcut.keys.map((key) => (
                  <kbd
                    key={key}
                    className="inline-flex items-center justify-center min-w-[28px] h-7 px-2 rounded-md bg-muted border border-border text-xs font-mono font-medium"
                  >
                    {key}
                  </kbd>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}