import { motion } from 'framer-motion';
import { Sparkles, AlertCircle, Lightbulb, TrendingUp, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeading } from './SectionHeading';
import { useStagger } from '@/hooks/useStagger';
import { useI18n } from '@/i18n/I18nContext';

const stepVisuals = [
  { icon: AlertCircle, color: 'text-amber-400' },
  { icon: Lightbulb, color: 'text-sky-400' },
  { icon: TrendingUp, color: 'text-emerald-400' },
];

const stack = ['React Native', 'TypeScript', 'MCP (Figma)', 'Claude API', 'Redux', 'Native Modules'];

export function CaseStudySection() {
  const { t } = useI18n();
  const { container, item, viewport } = useStagger(0.12, 16);

  return (
    <section id="case-study" className="mb-20">
      <SectionHeading
        number="05"
        title={t.caseStudy.title}
        description={t.caseStudy.description}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="panel relative overflow-hidden rounded-3xl p-6 sm:p-8"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/15 blur-3xl"
        />

        <div className="relative flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-fuchsia-500 text-white shadow-lg shadow-primary/25">
            <Sparkles className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <h3 className="text-lg font-bold leading-snug sm:text-xl">{t.caseStudy.headline}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{t.caseStudy.subtitle}</p>
          </div>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="relative mt-8 grid gap-6 sm:grid-cols-3"
        >
          {t.caseStudy.steps.map((step, index) => {
            const visual = stepVisuals[index] ?? stepVisuals[0];
            const Icon = visual.icon;
            return (
              <motion.div key={index} variants={item}>
                <div className="mb-3 flex items-center gap-2">
                  <Icon className={`h-4 w-4 shrink-0 ${visual.color}`} />
                  <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    {step.label}
                  </h4>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{step.text}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Stack */}
        <div className="relative mt-8 flex flex-wrap gap-2 border-t border-border pt-6">
          {stack.map((tech) => (
            <span
              key={tech}
              className="rounded-lg border border-border bg-secondary px-2.5 py-1 font-mono text-[11px] font-medium text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="relative mt-6">
          <Button variant="outline" className="group w-full gap-2 sm:w-auto">
            {t.caseStudy.cta}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </motion.div>
    </section>
  );
}