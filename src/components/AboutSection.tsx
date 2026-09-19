import { motion } from 'framer-motion';
import { Code2, Layers, Users, Smartphone, Server, Wrench } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { useStagger } from '@/hooks/useStagger';
import { useI18n } from '@/i18n/I18nContext';

const pillarIcons = [Code2, Layers, Users, Smartphone, Server, Wrench];

export function AboutSection() {
  const { t } = useI18n();
  const { container, item, viewport } = useStagger(0.07, 16);

  return (
    <section id="about" className="mb-20">
      <SectionHeading number="01" title={t.about.title} description={t.about.description} />

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl text-base leading-relaxed text-muted-foreground"
      >
        {t.about.paragraph}
      </motion.p>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="mt-8 grid gap-3 sm:grid-cols-2"
      >
        {t.about.pillars.map((pillar, index) => {
          const Icon = pillarIcons[index] ?? Code2;
          return (
            <motion.div
              key={pillar.title}
              variants={item}
              className="card-hover group flex items-start gap-4 rounded-2xl border border-border bg-card p-4"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                <Icon className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold">{pillar.title}</h3>
                <p className="mt-0.5 text-sm text-muted-foreground">{pillar.detail}</p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}