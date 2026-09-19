import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, ChevronDown, MapPin } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { useStagger } from '@/hooks/useStagger';

const experiences = [
  {
    company: 'Meutudo',
    position: 'Desenvolvedor Front-end Sênior',
    period: 'Jul 2023 — Presente',
    year: '2023',
    location: 'Remoto',
    description:
      'Soluções mobile para o setor financeiro (React Native, TypeScript, Redux, Jest, RTL); fluxos transacionais do Consignado Privado CLT (900 mil+ usuários, R$ 1,57 bi+ em 2025); liderança técnica dos fluxos de autorização/validação de cartão do Pix Parcelado (BaaS Dock); idealização de plataforma de geração dinâmica de telas via protocolo MCP do Figma + APIs da Anthropic (Claude) para UI aderente a design tokens e guard rails; arquitetura de atualização de telas em tempo real sem publicação em loja.',
    tags: ['React Native', 'TypeScript', 'Redux', 'Jest', 'MCP', 'Claude API'],
    current: true,
  },
  {
    company: 'HX-TOS (ex-Hexagon Pro)',
    position: 'Team Lead / Dev Front-end',
    period: 'Fev 2021 — Jul 2023',
    year: '2021',
    location: 'Santos, SP',
    description:
      'Liderança de 6 devs em ecossistema com 12+ soluções logísticas (Porto de Santos); migração de Angular 6 para React (TypeScript, Vite, Tailwind, RTL, Cypress); mentoria e code review; representação da empresa no Web Summit Lisboa 2022.',
    tags: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Cypress'],
  },
  {
    company: 'Mosten (ex-ModalGR)',
    position: 'Consultor / Dev Front-end',
    period: 'Out 2020 — Fev 2021',
    year: '2020',
    location: 'Santos, SP',
    description:
      'Plataforma para construção civil (React, styled-components, Materialize); Figma → produção; projeto que originou a startup Hexagon Pro (depois HX-TOS, selecionada pelo Cubo Itaú).',
    tags: ['React', 'styled-components', 'Figma'],
  },
  {
    company: 'Loocal',
    position: 'Consultor de Front-end',
    period: 'Jul — Out 2020',
    year: '2020',
    location: 'Santos, SP',
    description:
      'Backoffice de entregas (Next.js, styled-components); integração em tempo real; operação presente em 30+ municípios, 1 milhão+ de entregas.',
    tags: ['Next.js', 'styled-components'],
  },
  {
    company: 'Goflux',
    position: 'Dev Front-end',
    period: 'Dez 2019 — Jul 2020',
    year: '2019',
    location: 'São Paulo, SP',
    description:
      'Único dev front-end da equipe mobile (React Native, Redux); app de monitoramento de motoristas com geolocalização; portal de leilão de frete.',
    tags: ['React Native', 'Redux'],
  },
  {
    company: 'Mosten (ex-ModalGR)',
    position: 'Estagiário → Jr → Pleno',
    period: 'Jul 2018 — Dez 2019',
    year: '2018',
    location: 'Santos, SP',
    description:
      'Angular/AngularJS/Python; sistema de monitoramento para o Porto de Santos; app hospitalar com 20 mil+ downloads; mentoria técnica.',
    tags: ['Angular', 'Python'],
  },
];

export function ExperienceSection() {
  const [showExtra, setShowExtra] = useState(false);
  const { container, item, viewport } = useStagger(0.1, 18);

  return (
    <section id="experience" className="mb-20">
      <SectionHeading
        number="03"
        title="Experiência profissional"
        description="Minha trajetória profissional, com foco em resultados e tecnologias aplicadas."
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
          {experiences.map((exp) => (
            <motion.div
              key={`${exp.company}-${exp.period}`}
              variants={item}
              className="group relative grid gap-3 sm:grid-cols-[4.5rem_1fr] sm:gap-6"
            >
              {/* Year column */}
              <div className="hidden sm:block">
                <span className="font-mono text-xs font-medium text-muted-foreground">
                  {exp.year}
                </span>
              </div>

              {/* Dot */}
              <span className="absolute left-0 top-1.5 z-10 flex h-[15px] w-[15px] items-center justify-center sm:left-[4.5rem] sm:-translate-x-1/2">
                <span
                  className={`h-[15px] w-[15px] rounded-full border-2 border-background ${
                    exp.current ? 'bg-primary' : 'bg-border group-hover:bg-primary/70'
                  } transition-colors`}
                />
                {exp.current && (
                  <span className="absolute h-[15px] w-[15px] animate-ping rounded-full bg-primary/60" />
                )}
              </span>

              {/* Card */}
              <div className="card-hover ml-7 rounded-2xl border border-border bg-card p-5 sm:ml-0">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="flex items-center gap-2 text-base font-semibold">
                    <Building2 className="h-4 w-4 shrink-0 text-primary" />
                    {exp.company}
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
                  {exp.tags.map((tag) => (
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
          ))}
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
            Experiência adicional (2014 — 2018)
          </button>
          <AnimatePresence initial={false}>
            {showExtra && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden px-4 pt-3 text-sm text-muted-foreground"
              >
                Projetos com PHP (Zend), WordPress, Joomla, SEO, Photoshop e Mailchimp.
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}