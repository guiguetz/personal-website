import { ArrowRight, Download, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/i18n/I18nContext';

const stack = [
  'React',
  'React Native',
  'TypeScript',
  'Next.js',
  'Node.js',
  'Redux',
  'Tailwind CSS',
  'Jest',
  'MCP',
  'GraphQL',
  'Figma',
];

export function HeroSection() {
  const { t } = useI18n();

  return (
    <section id="hero" className="relative flex flex-col justify-center py-6 lg:min-h-[calc(100vh-4rem)] lg:py-12">
      <div className="max-w-2xl animate-fade-in-up">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
          <span className="relative flex h-1.5 w-1.5">
            <span aria-hidden className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span aria-hidden className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
          <span>{t.hero.availability}</span>
        </div>

        <h1 className="text-[2rem] font-extrabold leading-[1.12] tracking-tight sm:text-5xl lg:text-[3.4rem]">
          <span>{t.hero.titleLine1}</span>
          <br />
          <span className="text-gradient">{t.hero.titleLine2}</span>
        </h1>

        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {t.hero.paragraph}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button
            asChild
            size="lg"
            className="w-full gap-2 shadow-lg shadow-primary/20 sm:w-auto"
          >
            <a href="/guilherme-aguiar-cv.pdf" download="Guilherme-Aguiar-CV.pdf">
              <Download className="h-4 w-4" />
              {t.hero.download}
            </a>
          </Button>
          <a
            href="#contact"
            className="group inline-flex h-11 w-full items-center justify-center gap-2 rounded-md border border-input px-8 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground sm:w-auto"
          >
            {t.hero.contact}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
          {t.hero.highlights.map((highlight, index) => (
            <div key={index} className="flex items-center gap-x-4">
              {index > 0 && <span className="hidden h-4 w-px bg-border sm:block" />}
              <span className="inline-flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                <span>
                  <strong className="font-semibold text-foreground">{highlight.value}</strong>{' '}
                  {highlight.label}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Stack marquee */}
      <div
        aria-hidden
        className="relative mt-14 overflow-hidden border-y border-border py-4 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] lg:mt-16"
      >
        <div className="flex w-max animate-marquee gap-10">
          {[...stack, ...stack].map((tech, i) => (
            <span
              key={`${tech}-${i}`}
              className="whitespace-nowrap font-mono text-xs uppercase tracking-widest text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}