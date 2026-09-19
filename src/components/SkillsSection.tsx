import { motion } from 'framer-motion';
import {
  Code2,
  Atom,
  Layers,
  Braces,
  Palette,
  Wind,
  TestTube2,
  FlaskConical,
  Server,
  Database,
  Terminal,
  GitBranch,
  Users,
  Crown,
} from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { useStagger } from '@/hooks/useStagger';
import { useI18n } from '@/i18n/I18nContext';

const categoryIcons = [Code2, Layers, Palette, TestTube2, Server, Terminal, Users];
const mainIcons = [Atom, Braces, Wind, FlaskConical, Database, GitBranch, Crown];

export function SkillsSection() {
  const { t } = useI18n();
  const { container, item, viewport } = useStagger(0.08, 18);

  return (
    <section id="skills" className="mb-20">
      <SectionHeading number="04" title={t.skills.title} description={t.skills.description} />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="grid gap-4 sm:grid-cols-2"
      >
        {t.skills.categories.map((cat, index) => {
          const CategoryIcon = categoryIcons[index] ?? Code2;
          const MainIcon = mainIcons[index] ?? Code2;
          return (
            <motion.div
              key={index}
              variants={item}
              className="panel panel-interactive group relative overflow-hidden rounded-2xl p-5"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-primary/10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
              />

              {/* Category header */}
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-secondary text-muted-foreground transition-colors group-hover:bg-primary/15 group-hover:text-primary">
                  <CategoryIcon className="h-4 w-4" />
                </span>
                <h3 className="text-sm font-semibold">{cat.category}</h3>
              </div>

              {/* Main highlight */}
              <div className="mt-4 flex items-center gap-3 rounded-xl border border-primary/25 bg-primary/10 px-3 py-2.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm shadow-primary/30">
                  <MainIcon className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold leading-tight">{cat.main}</p>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-primary/80">
                    {t.skills.primaryLabel}
                  </p>
                </div>
              </div>

              {/* Secondary items */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {cat.items.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg border border-border bg-secondary px-2.5 py-1 font-mono text-[11px] text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}