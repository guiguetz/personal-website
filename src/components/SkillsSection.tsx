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
import { useReveal } from '@/hooks/useReveal';
import { useI18n } from '@/i18n/I18nContext';

const categoryIcons = [Code2, Layers, Palette, TestTube2, Server, Terminal, Users];
const mainIcons = [Atom, Braces, Wind, FlaskConical, Database, GitBranch, Crown];

export function SkillsSection() {
  const { t } = useI18n();
  const { ref, shown } = useReveal<HTMLDivElement>();

  return (
    <section id="skills" className="mb-20">
      <SectionHeading number="04" title={t.skills.title} description={t.skills.description} />

      <div
        ref={ref}
        className={`reveal-children grid gap-3 sm:grid-cols-2 ${shown ? 'reveal-shown' : ''}`}
      >
        {t.skills.categories.map((cat, index) => {
          const CategoryIcon = categoryIcons[index] ?? Code2;
          const MainIcon = mainIcons[index] ?? Code2;
          return (
            <div
              key={index}
              className="panel panel-interactive group relative overflow-hidden rounded-2xl p-4"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-primary/10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
              />

              {/* Category header with primary skill inline */}
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary text-muted-foreground transition-colors group-hover:bg-primary/15 group-hover:text-primary">
                  <CategoryIcon className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold">{cat.category}</h3>
                  <p className="flex items-center gap-1.5 text-xs text-primary">
                    <MainIcon className="h-3 w-3" />
                    {cat.main}
                  </p>
                </div>
              </div>

              {/* Secondary items */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {cat.items.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md border border-border bg-secondary px-2 py-0.5 font-mono text-[11px] text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}