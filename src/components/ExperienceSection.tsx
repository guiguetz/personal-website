import { motion } from 'framer-motion';
import { Calendar, Code, Zap, Brain, Shield, Globe, MapPin } from 'lucide-react';
import { SectionHeading } from './SectionHeading';

const experiences = [
  {
    company: 'Meutudo',
    position: 'Desenvolvedor Front-end Sênior',
    period: 'Jul 2023–Presente',
    location: 'Remoto',
    description: 'Soluções mobile para o setor financeiro (React Native, TypeScript, Redux, Jest, RTL); fluxos transacionais do Consignado Privado CLT (900 mil+ usuários, R$1,57 bi+ em 2025); liderança técnica dos fluxos de autorização/validação de cartão do Pix Parcelado (BaaS Dock); idealização de plataforma de geração dinâmica de telas via protocolo MCP do Figma + APIs da Anthropic (Claude) para UI aderente a design tokens e guard rails; arquitetura de atualização de telas em tempo real sem publicação em loja.',
    tags: ['React Native', 'TypeScript', 'Redux', 'Jest', 'MCP', 'Claude API'],
    icon: Code,
    color: 'text-primary'
  },
  {
    company: 'HX-TOS (ex-Hexagon Pro)',
    position: 'Team Lead / Dev Front-end',
    period: 'Fev 2021–Jul 2023',
    location: 'Santos, SP',
    description: 'Liderança de 6 devs em ecossistema com 12+ soluções logísticas (Porto de Santos); migração de Angular 6 para React (TypeScript, Vite, Tailwind, RTL, Cypress); mentoria e code review; representação da empresa no Web Summit Lisboa 2022.',
    tags: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Cypress'],
    icon: Shield,
    color: 'text-blue-500'
  },
  {
    company: 'Mosten (ex-ModalGR)',
    position: 'Consultor/Dev Front-end',
    period: 'Out 2020–Fev 2021',
    location: 'Santos, SP',
    description: 'Plataforma para construção civil (React, styled-components, Materialize); Figma → produção; projeto que originou a startup Hexagon Pro (depois HX-TOS, selecionada pelo Cubo Itaú).',
    tags: ['React', 'styled-components', 'Figma'],
    icon: Globe,
    color: 'text-green-500'
  },
  {
    company: 'Loocal',
    position: 'Consultor de Front-end',
    period: 'Jul–Out 2020',
    location: 'Santos, SP',
    description: 'Backoffice de entregas (Next.js, styled-components); integração em tempo real; operação presente em 30+ municípios, 1 milhão+ de entregas.',
    tags: ['Next.js', 'styled-components'],
    icon: MapPin,
    color: 'text-purple-500'
  },
  {
    company: 'Goflux',
    position: 'Dev Front-end',
    period: 'Dez 2019–Jul 2020',
    location: 'São Paulo, SP',
    description: 'Único dev front-end da equipe mobile (React Native, Redux); app de monitoramento de motoristas com geolocalização; portal de leilão de frete.',
    tags: ['React Native', 'Redux'],
    icon: Zap,
    color: 'text-yellow-500'
  },
  {
    company: 'Mosten (ex-ModalGR)',
    position: 'Estagiário → Jr → Pleno',
    period: 'Jul 2018–Dez 2019',
    location: 'Santos, SP',
    description: 'Angular/AngularJS/Python; sistema de monitoramento para o Porto de Santos; app hospitalar com 20 mil+ downloads; mentoria técnica.',
    tags: ['Angular', 'Python'],
    icon: Calendar,
    color: 'text-gray-500'
  }
];

export function ExperienceSection() {
  return (
    <section id="experience" className="mb-16">
      <SectionHeading number="03" title="Experiência profissional" description="Timeline de minha trajetória profissional, focada em resultados e tecnologias aplicadas." />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
        className="relative pl-4 md:pl-8"
      >
        {/* Timeline line */}
        <div className="absolute inset-y-0 left-0 w-px bg-primary/20" />
        
        {/* Timeline items */}
        {experiences.map((exp, index) => (
          <motion.div
            key={exp.company}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.08, duration: 0.5 }}
            className="mb-12"
          >
            {/* Year badge */}
            <div className="absolute left-0 top-0 -mt-2.5 -ml-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-medium z-10" />
            
            {/* Content */}
            <div className="ml-6 bg-card border border-border rounded-xl p-6">
              <div className="flex items-start gap-4 mb-2">
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary/20 flex-shrink-0">
                  <exp.icon className={`w-5 h-5 ${exp.color}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{exp.company}</h3>
                  <p className="text-sm text-muted-foreground">{exp.position}</p>
                  <p className="text-xs text-muted-foreground">{exp.period} • {exp.location}</p>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-4">{exp.description}</p>
              
              {/* Tech tags */}
              <div className="flex flex-wrap gap-2">
                {exp.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 text-xs font-medium bg-accent rounded border border-border hover:bg-primary/20 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
        
        {/* Additional experience collapsible */}
        <motion.div
          key="additional"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: experiences.length * 0.08, duration: 0.5 }}
          className="pt-6 border-t border-border"
        >
          <button
            className="w-full text-left text-sm font-medium text-primary hover:text-primary/80 flex items-center gap-2"
          >
            Experiência adicional (2014-2018)
            <Calendar className="w-4 h-4" />
          </button>
          <div className="mt-2 text-sm text-muted-foreground pl-4">
            Projetos com PHP (Zend), WordPress, Joomla, SEO, Photoshop, Mailchimp
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}