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

export function AboutSection() {
  const pillarsStagger = useStagger(0.07, 16);

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
            </section>
          );
        }