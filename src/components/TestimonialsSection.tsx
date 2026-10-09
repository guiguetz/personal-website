import { Quote } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { useReveal } from '@/hooks/useReveal';
import { useI18n } from '@/i18n/I18nContext';

export function TestimonialsSection() {
  const { t } = useI18n();
  const { ref, shown } = useReveal<HTMLDivElement>();

  return (
    <section id="testimonials" className="mb-20">
      <SectionHeading
        number="07"
        title={t.testimonials.title}
        description={t.testimonials.description}
      />

      <div
        ref={ref}
        className={`reveal-children grid gap-4 sm:grid-cols-2 ${shown ? 'reveal-shown' : ''}`}
      >
        {t.testimonials.items.map((item, index) => (
          <figure
            key={index}
            className="panel panel-interactive relative flex flex-col rounded-2xl p-5"
          >
            <Quote
              aria-hidden
              className="absolute right-4 top-4 h-6 w-6 text-primary/15"
            />

            <blockquote className="flex-1 text-sm leading-relaxed text-muted-foreground">
              &ldquo;{item.quote}&rdquo;
            </blockquote>

            <figcaption className="mt-4 flex items-center gap-3">
              <span
                aria-hidden
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary"
              >
                {item.initials}
              </span>
              <div className="min-w-0">
                <cite className="block text-sm font-medium not-italic text-foreground">
                  {item.author}
                </cite>
                <span className="block text-xs text-muted-foreground">
                  {item.role}
                </span>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}