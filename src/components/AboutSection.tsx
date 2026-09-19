import { motion } from 'framer-motion';
import { Code2, Layers, Users, Smartphone, Server, Wrench } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { useStagger } from '@/hooks/useStagger';

const pillars = [
  {
    icon: Code2,
    title: 'Especialista em Front-end',
    detail: 'React, React Native, Next.js, TypeScript',
  },
  {
    icon: Layers,
    title: 'Arquitetura escalável',
    detail: 'Design Systems, performance, micro-frontends',
  },
  {
    icon: Users,
    title: 'Liderança técnica',
    detail: 'Mentoria, code review, Agile/Scrum',
  },
  {
    icon: Smartphone,
    title: 'Mobile & cross-platform',
    detail: 'React Native, Expo, Redux, Jest, RTL',
  },
  {
    icon: Server,
    title: 'Backend & dados',
    detail: 'Node.js, GraphQL, Firebase, MongoDB',
  },
  {
    icon: Wrench,
    title: 'DevOps & ferramentas',
    detail: 'Git, Docker, Azure DevOps, Vite, Nx',
  },
];

const languages = [
  { code: 'PT', name: 'Português', level: 'Nativo', value: 100 },
  { code: 'EN', name: 'Inglês', level: 'Fluente · C2', value: 85 },
];

export function AboutSection() {
  const pillarsStagger = useStagger(0.07, 16);
  const languagesStagger = useStagger(0.12, 12);

  return (
    <section id="about" className="mb-20">
      <SectionHeading
        number="01"
        title="Sobre mim"
        description="Mais de 10 anos construindo produtos digitais de alto impacto para os setores financeiro, logístico e de saúde."
      />

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl text-base leading-relaxed text-muted-foreground"
      >
        Minha trajetória inclui liderança de equipes técnicas, migração de sistemas legados para
        stacks modernas e a criação de produtos que impactam milhões de usuários — sempre com foco
        em performance, acessibilidade e resultados de negócio.
      </motion.p>

      <motion.div
        variants={pillarsStagger.container}
        initial="hidden"
        whileInView="show"
        viewport={pillarsStagger.viewport}
        className="mt-8 grid gap-3 sm:grid-cols-2"
      >
        {pillars.map((pillar) => (
          <motion.div
            key={pillar.title}
            variants={pillarsStagger.item}
            className="card-hover group flex items-start gap-4 rounded-2xl border border-border bg-card p-4"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
              <pillar.icon className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <h3 className="text-sm font-semibold">{pillar.title}</h3>
              <p className="mt-0.5 text-sm text-muted-foreground">{pillar.detail}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Languages */}
      <div className="mt-10">
        <h3 className="mb-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Idiomas
        </h3>
        <motion.div
          variants={languagesStagger.container}
          initial="hidden"
          whileInView="show"
          viewport={languagesStagger.viewport}
          className="grid gap-3 sm:grid-cols-2"
        >
          {languages.map((lang) => (
            <motion.div
              key={lang.code}
              variants={languagesStagger.item}
              className="rounded-2xl border border-border bg-card p-4"
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 font-mono text-xs font-semibold text-primary">
                    {lang.code}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{lang.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{lang.level}</p>
                  </div>
                </div>
                <span className="shrink-0 font-mono text-xs text-muted-foreground">
                  {lang.value}%
                </span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${lang.value}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="h-full rounded-full bg-gradient-to-r from-primary to-fuchsia-500"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}