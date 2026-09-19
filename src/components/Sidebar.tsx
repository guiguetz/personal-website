import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Download,
  Menu,
    X,
    Sun,
    Moon,
  } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/useTheme';

const navItems = [
  { name: 'Sobre', href: '#about', id: 'about' },
  { name: 'Impacto', href: '#impact', id: 'impact' },
  { name: 'Experiência', href: '#experience', id: 'experience' },
  { name: 'Competências', href: '#skills', id: 'skills' },
  { name: 'Projetos', href: '#case-study', id: 'case-study' },
  { name: 'Contato', href: '#contact', id: 'contact' },
];

const socialLinks = [
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:guilhermebruno.aguiar@gmail.com', label: 'E-mail' },
  { icon: Phone, href: 'https://wa.me/5513992025755', label: 'WhatsApp' },
];

function SidebarContent({ activeId, onNavigate }: { activeId: string; onNavigate?: () => void }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="flex h-full flex-col">
      {/* Identity */}
      <div className="px-6 pb-6 pt-8">
        <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="pr-8 lg:pr-0"
                >
          <div className="flex items-center gap-3">
            <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary via-indigo-500 to-fuchsia-500 text-lg font-bold text-white shadow-lg shadow-primary/25">
              GA
              <span className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full border-[3px] border-card bg-emerald-400" />
            </div>
            <div className="min-w-0">
              <h1 className="truncate text-base font-bold tracking-tight">Guilherme Aguiar</h1>
              <p className="truncate text-xs font-medium text-primary">
                Front-end / Mobile Sênior
              </p>
            </div>
          </div>

          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            Construo produtos financeiros e logísticos usados por milhões de pessoas.
          </p>

          <div className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            São Vicente, SP · Remoto
          </div>
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3">
        <ul className="space-y-0.5">
          {navItems.map((item, index) => {
            const isActive = activeId === item.id;
            return (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
              >
                <a
                  href={item.href}
                  onClick={onNavigate}
                  className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                  }`}
                >
                  <span
                    className={`h-px transition-all duration-300 ${
                      isActive
                        ? 'w-8 bg-primary'
                        : 'w-4 bg-border group-hover:w-6 group-hover:bg-muted-foreground'
                    }`}
                  />
                  {item.name}
                </a>
              </motion.li>
            );
          })}
        </ul>
      </nav>

      {/* Footer actions */}
      <div className="space-y-4 border-t border-border px-6 py-6">
        <div className="flex items-center gap-2">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
              >
                <Icon className="h-4 w-4" />
              </a>
            );
          })}
          <button
            onClick={toggleTheme}
            aria-label="Alternar tema"
            className="ml-auto flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>

        <Button size="sm" className="w-full gap-2">
          <Download className="h-4 w-4" />
          Baixar currículo
        </Button>
      </div>
    </div>
  );
}

export function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeId, setActiveId] = useState('about');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );

    navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Mobile top bar */}
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-border/60 bg-background/70 px-5 py-3 backdrop-blur-xl lg:hidden">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-fuchsia-500 text-xs font-bold text-white">
            GA
          </div>
          <span className="text-sm font-semibold">Guilherme Aguiar</span>
        </div>
        <button
          onClick={() => setMobileOpen(true)}
          aria-label="Abrir menu"
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-card"
        >
          <Menu className="h-4 w-4" />
        </button>
      </header>

      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-border bg-card/40 backdrop-blur-xl lg:block">
        <SidebarContent activeId={activeId} />
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 left-0 z-50 w-[85%] max-w-xs border-r border-border bg-card lg:hidden"
            >
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Fechar menu"
                className="absolute right-4 top-6 flex h-8 w-8 items-center justify-center rounded-xl border border-border bg-background"
              >
                <X className="h-4 w-4" />
              </button>
              <SidebarContent activeId={activeId} onNavigate={() => setMobileOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
          </>
        );
      }