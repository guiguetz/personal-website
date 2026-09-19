import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, ChevronDown, MapPin } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { useStagger } from '@/hooks/useStagger';
import { useI18n } from '@/i18n/I18nContext';
import { supabase } from '@/lib/supabase';

const companies = [
  {
    company: 'Meutudo',
    year: '2023',
    current: true,
    tags: ['React Native', 'TypeScript', 'Redux', 'Jest', 'MCP', 'Claude API'],
  },
  {
    company: 'HX-TOS (ex-Hexagon Pro)',
    year: '2021',
    tags: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Cypress'],
  },
  {
    company: 'Mosten (ex-ModalGR)',
    year: '2020',
    tags: ['React', 'styled-components', 'Figma'],
  },
  {
    company: 'Loocal',
    year: '2020',
    tags: ['Next.js', 'styled-components'],
  },
  {
    company: 'Goflux',
    year: '2019',
    tags: ['React Native', 'Redux'],
  },
  {
    company: 'Mosten (ex-ModalGR)',
    year: '2018',
    tags: ['Angular', 'Python'],
  },
];

export function ExperienceSection() {
  const { t, locale } = useI18n();
  const [showExtra, setShowExtra] = useState(false);
  const [remoteItems, setRemoteItems] = useState<typeof t.experience.items | null>(null);

  useEffect(() => {
    if (!supabase) return;
    supabase.from('portfolio_experience').select('company,year,current,position,period,location,description,tags')
      .eq('locale', locale).order('sort_order')
      .then(({ data }) => { if (data?.length) setRemoteItems(data as typeof t.experience.items); });
  }, [locale, t.experience.items]);

  const experienceItems = remoteItems ?? t.experience.items;
  const { container, item, viewport } = useStagger(0.1, 18);

  return (
    <section id="experience" className="mb-20">
      <SectionHeading
        number="03"
        title={t.experience.title}
        description={t.experience.description}
      />

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute bottom-2 left-[7px] top-2 w-px bg-gradient-to-b from-primary/60 via-border to-transparent sm:left-[4.5rem] sm:-translate-x-1/2" />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="space-y-6"
        >
          {experienceItems.map((exp, index) => {
            const fallback = companies[index] ?? companies[0];
            const meta = { ...fallback, ...exp };
            return (
              <motion.div
                key={index}
                variants={item}
                className="group relative grid gap-3 sm:grid-cols-[4.5rem_1fr] sm:gap-6"
              >
                {/* Year column */}
                <div className="hidden sm:block">
                  <span className="font-mono text-xs font-medium text-muted-foreground">
                    {meta.year}
                  </span>
                </div>

                {/* Dot */}
                <span className="absolute left-0 top-1.5 z-10 flex h-[15px] w-[15px] items-center justify-center sm:left-[4.5rem] sm:-translate-x-1/2">
                  <span
                    className={`h-[15px] w-[15px] rounded-full border-2 border-background ${
                      meta.current ? 'bg-primary' : 'bg-border group-hover:bg-primary/70'
                    } transition-colors`}
                  />
                  {meta.current && (
                    <span className="absolute h-[15px] w-[15px] animate-ping rounded-full bg-primary/60" />
                  )}
                </span>

                {/* Card */}
                <div className="panel panel-interactive ml-7 rounded-2xl p-5 sm:ml-0">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="flex items-center gap-2 text-base font-semibold">
                      <Building2 className="h-4 w-4 shrink-0 text-primary" />
                      {meta.company}
                    </h3>
                    <span className="font-mono text-xs text-muted-foreground">{exp.period}</span>
                  </div>

                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                    <span className="font-medium text-primary">{exp.position}</span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3 shrink-0" />
                      {exp.location}
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {exp.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {meta.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg border border-border bg-secondary px-2.5 py-1 font-mono text-[11px] font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Additional experience */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-6 sm:pl-[6rem]"
        >
          <button
            onClick={() => setShowExtra((v) => !v)}
            aria-expanded={showExtra}
            className="flex w-full items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-left text-sm font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
          >
            <ChevronDown
              className={`h-4 w-4 shrink-0 transition-transform ${showExtra ? 'rotate-180' : ''}`}
            />
            {t.experience.extraToggle}
          </button>
          <AnimatePresence initial={false}>
            {showExtra && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden px-4 pt-3 text-sm text-muted-foreground"
              >
                {t.experience.extraText}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}