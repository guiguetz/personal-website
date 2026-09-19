import { motion } from 'framer-motion';
import { ArrowRight, Download, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const stack = [
  'React',
  'React Native',
  'TypeScript',
  'Next.js',
  'Node.js',
  'Redux',
  'Tailwind CSS',
  'Jest',
  'IA Generativa',
  'MCP',
  'GraphQL',
  'Figma',
];

export function HeroSection() {
  return (
    <section id="hero" className="relative flex min-h-[calc(100vh-4rem)] flex-col justify-center py-12">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-2xl"
      >
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
          Disponível para oportunidades
        </div>

        <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.4rem]">
          Construo produtos digitais
          <br />
          <span className="text-gradient">usados por milhões</span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          Desenvolvedor Front-end / Mobile Sênior com mais de 10 anos de experiência.
          Combino React, React Native e IA generativa aplicada a UI para transformar rollout
          de dias em minutos.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          <Button size="lg" className="group gap-2 shadow-lg shadow-primary/20">
            <Download className="h-4 w-4" />
            Baixar currículo
          </Button>
          <a
                      href="#contact"
                      className="group inline-flex h-11 items-center justify-center gap-2 rounded-md border border-input px-8 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      Fale comigo
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground"
        >
          <span className="inline-flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <strong className="font-semibold text-foreground">R$ 1,57 bi+</strong> originados
          </span>
          <span className="hidden h-4 w-px bg-border sm:block" />
          <span>
            <strong className="font-semibold text-foreground">900 mil+</strong> usuários
          </span>
          <span className="hidden h-4 w-px bg-border sm:block" />
          <span>
            <strong className="font-semibold text-foreground">6 devs</strong> liderados
          </span>
        </motion.div>
      </motion.div>

      {/* Stack marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="relative mt-16 overflow-hidden border-y border-border py-4 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
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
      </motion.div>
    </section>
  );
}