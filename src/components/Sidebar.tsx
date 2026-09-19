import { useEffect, useState } from 'react';
import { Github, Linkedin, Mail, Phone, MapPin, Download, Menu, X, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/useTheme';
import { useI18n } from '@/i18n/I18nContext';
import { FlagBR, FlagUS } from '@/components/FlagIcons';

const AVATAR_URL =
  'https://media.licdn.com/dms/image/v2/D4D03AQFgHKgSduxRNA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1667485617098?e=2147483647&v=beta&t=SBhM9G7pRNaBbgX3F64L3veMVa1w5sfcp8vQ_2MHO3U';

const navItems = [
  { href: '#about', id: 'about' },
  { href: '#impact', id: 'impact' },
  { href: '#experience', id: 'experience' },
  { href: '#skills', id: 'skills' },
  { href: '#case-study', id: 'projects' },
  { href: '#contact', id: 'contact' },
] as const;

const socialLinks = [
  { icon: Github, href: 'https://github.com/guiguetz', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/guilherme-aguiar-dev', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:guilhermebruno.aguiar@gmail.com', label: 'E-mail' },
  { icon: Phone, href: 'https://wa.me/5513992025755', label: 'WhatsApp' },
];

function SidebarContent({ activeId, onNavigate }: { activeId: string; onNavigate?: () => void }) {
  const { isDark, toggleTheme } = useTheme();
  const { t, locale, toggleLocale } = useI18n();

  return (
    <div className="flex h-full flex-col">
      {/* Identity */}
      <div className="px-6 pb-6 pt-8">
        <div className="animate-fade-in-up pr-8 lg:pr-0">
          <div className="flex items-center gap-3">
            <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-indigo-500 to-fuchsia-500 text-lg font-bold text-white shadow-lg shadow-primary/25">
              {AVATAR_URL ? (
                <img src={AVATAR_URL} alt="Guilherme Aguiar" className="h-full w-full object-cover" />
              ) : (
                'GA'
              )}
              <span className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full border-[3px] border-card bg-emerald-400" />
            </div>
            <div className="min-w-0">
              <h1 className="truncate text-base font-bold tracking-tight">Guilherme Aguiar</h1>
              <p className="truncate text-xs font-medium text-primary">{t.sidebar.role}</p>
            </div>
          </div>

          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{t.sidebar.tagline}</p>

          <div className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span>{t.sidebar.location}</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3">
        <ul className="space-y-0.5">
          {navItems.map((navItem) => {
            const isActive = activeId === navItem.id;
            return (
              <li key={navItem.id}>
                <a
                  href={navItem.href}
                  onClick={onNavigate}
                  className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                  }`}
                >
                  <span
                    aria-hidden
                    className={`h-px transition-all duration-300 ${
                      isActive
                        ? 'w-8 bg-primary'
                        : 'w-4 bg-border group-hover:w-6 group-hover:bg-muted-foreground'
                    }`}
                  />
                  <span>{t.nav[navItem.id]}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer actions */}
      <div className="shrink-0 space-y-4 border-t border-border px-6 py-6">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              );
            })}
          </div>

          <div className="flex shrink-0 items-center gap-1.5">
            <button
              onClick={toggleLocale}
              aria-label={t.a11y.switchLanguage}
              title={t.a11y.switchLanguage}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card transition-all hover:-translate-y-0.5 hover:border-primary/40"
            >
              <span className="h-3.5 w-5 overflow-hidden rounded-[3px] ring-1 ring-border">
                {locale === 'pt' ? (
                  <FlagBR className="h-full w-full" />
                ) : (
                  <FlagUS className="h-full w-full" />
                )}
              </span>
            </button>

            <button
              onClick={toggleTheme}
              aria-label={t.a11y.toggleTheme}
              title={t.a11y.toggleTheme}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
            >
              {isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>

        <Button asChild size="sm" className="w-full gap-2">
          <a href="/guilherme-aguiar-cv.pdf" download="Guilherme-Aguiar-CV.pdf">
            <Download className="h-4 w-4" />
            {t.sidebar.download}
          </a>
        </Button>
      </div>
    </div>
  );
}

export function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeId, setActiveId] = useState('about');
  const { t } = useI18n();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );

    // Note: the "projects" nav item points to the #case-study section.
    ['about', 'impact', 'experience', 'skills', 'case-study', 'contact'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Prevent body scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <>
      {/* Mobile top bar */}
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-border/60 bg-background/80 px-4 py-3 backdrop-blur-xl sm:px-6 lg:hidden">
        <div className="flex min-w-0 items-center gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-primary to-fuchsia-500 text-xs font-bold text-white">
            {AVATAR_URL ? (
              <img src={AVATAR_URL} alt="Guilherme Aguiar" className="h-full w-full object-cover" />
            ) : (
              'GA'
            )}
          </div>
          <span className="truncate text-sm font-semibold">Guilherme Aguiar</span>
        </div>
        <button
          onClick={() => setMobileOpen(true)}
          aria-label={t.a11y.openMenu}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border bg-card"
        >
          <Menu className="h-4 w-4" />
        </button>
      </header>

      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 bg-card/40 backdrop-blur-xl lg:block">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-border to-transparent"
              />
              <SidebarContent activeId={activeId} />
            </aside>

      {/* Mobile drawer */}
      {/* Mobile drawer — animado com CSS transitions (sem framer-motion) */}
      <>
        <div
          onClick={() => setMobileOpen(false)}
          aria-hidden={!mobileOpen}
          inert={!mobileOpen}
          className={`fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${mobileOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        />
        <aside
          data-mobile-drawer="true"
          aria-hidden={!mobileOpen}
          inert={!mobileOpen}
          className={`fixed inset-y-0 left-0 z-50 flex w-[85%] max-w-xs flex-col border-r border-border bg-card transition-transform duration-300 ease-out lg:hidden ${mobileOpen ? 'translate-x-0' : 'pointer-events-none -translate-x-full'}`}
        >
              <button
                onClick={() => setMobileOpen(false)}
                aria-label={t.a11y.closeMenu}
                className="absolute right-4 top-6 z-10 flex h-8 w-8 items-center justify-center rounded-xl border border-border bg-background"
              >
                <X className="h-4 w-4" />
              </button>
              <SidebarContent activeId={activeId} onNavigate={() => setMobileOpen(false)} />
        </aside>
      </>
    </>
  );
}