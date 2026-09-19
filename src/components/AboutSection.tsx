import { Code2, Layers, Users, Smartphone, Server, Wrench } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { useReveal } from '@/hooks/useReveal';
import { useI18n } from '@/i18n/I18nContext';

const pillarIcons = [Code2, Layers, Users, Smartphone, Server, Wrench];

export function AboutSection() {
  const { t } = useI18n();
  const { ref: gridRef, shown: gridShown } = useReveal<HTMLDivElement>();
  const { ref: pRef, shown: pShown } = useReveal<HTMLParagraphElement>(0.6);

  return (
    <section id="about" className="mb-20">
      <SectionHeading number="01" title={t.about.title} description={t.about.description} />

      <p
        ref={pRef}
        className={`reveal-self max-w-2xl text-base leading-relaxed text-muted-foreground ${pShown ? 'reveal-shown' : ''}`}
      >
        {t.about.paragraph}
      </p>

      <div
        ref={gridRef}
        className={`reveal-children mt-8 grid gap-3 sm:grid-cols-2 ${gridShown ? 'reveal-shown' : ''}`}
      >
        {t.about.pillars.map((pillar, index) => {
          const Icon = pillarIcons[index] ?? Code2;
          return (
            <div
              key={index}
              className="panel panel-interactive group flex items-start gap-4 rounded-2xl p-4"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                <Icon className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold">{pillar.title}</h3>
                <p className="mt-0.5 text-sm text-muted-foreground">{pillar.detail}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}