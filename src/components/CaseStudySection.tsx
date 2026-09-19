import { motion } from 'framer-motion';
import { Sparkles, AlertCircle, Lightbulb, TrendingUp, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeading } from './SectionHeading';

const steps = [
  {
    icon: AlertCircle,
    label: 'Problema',
    color: 'text-amber-400',
    text: 'Atualizações de UI exigiam publicação nas lojas, levando até 6 dias para chegar ao usuário — um gargalo para correções críticas, testes A/B e personalização em tempo real.',
  },
  {
    icon: Lightbulb,
    label: 'Solução',
    color: 'text-sky-400',
    text: 'Uma plataforma que usa o protocolo MCP (Model Context Protocol) do Figma para extrair design tokens e componentes, combinado com APIs da Anthropic (Claude) para gerar variações de UI aderentes aos guard rails da marca.',
  },
  {
    icon: TrendingUp,
    label: 'Resultado',
    color: 'text-emerald-400',
    text: 'Interfaces renderizadas em tempo real no app via bridge nativa, sem publicação na loja — reduzindo o rollout de dias para minutos em um produto com 900 mil+ usuários.',
  },
];

const stack = ['React Native', 'TypeScript', 'MCP (Figma)', 'Claude API', 'Redux', 'Native Modules'];

export function CaseStudySection() {
  return (
    <section id="case-study" className="mb-20">
      <SectionHeading
        number="05"
        title="Destaque: IA Generativa"
        description="O projeto mais desafiador da minha carreira — unindo design, IA e engenharia de plataforma."
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 sm:p-8"
      >
        {/* Decorative glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/15 blur-3xl"
        />

        <div className="relative flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-fuchsia-500 text-white shadow-lg shadow-primary/25">
            <Sparkles className="h-5 w-5" />
          </span>
          <div>
            <h3 className="text-lg font-bold sm:text-xl">
              Plataforma de geração dinâmica de interfaces
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Reduzindo o rollout de dias para minutos com atualização em tempo real
            </p>
          </div>
        </div>

        <div className="relative mt-8 grid gap-6 sm:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="mb-3 flex items-center gap-2">
                  <Icon className={`h-4 w-4 ${step.color}`} />
                  <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    {step.label}
                  </h4>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{step.text}</p>
              </motion.div>
            );
          })}
        </div>

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
          <Button variant="outline" className="group gap-2">
            Ver detalhes do case
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </motion.div>
    </section>
  );
}