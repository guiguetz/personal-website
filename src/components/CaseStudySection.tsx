import { motion } from 'framer-motion';
import { Brain, Code, Zap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeading } from './SectionHeading';

export function CaseStudySection() {
  return (
    <section id="case-study" className="mb-16">
      <SectionHeading number="05" title="Destaque especial: IA Generativa" description="Projeto que reduziu o rollout de interfaces de até 6 dias para minutos, usando protocolo MCP do Figma e APIs da Anthropic (Claude)." />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
        className="bg-card border border-border rounded-xl p-8"
      >
        {/* Header */}
        <motion.div
          key="header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="flex items-start gap-4 mb-6"
        >
          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-primary/20 flex-shrink-0">
            <Brain className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2">Plataforma de Geração Dinâmica de Interfaces</h2>
            <p className="text-muted-foreground">Reduzindo rollout de dias para minutos com atualização em tempo real</p>
          </div>
        </motion.div>

        {/* Problem */}
        <motion.div
          key="problem"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-6"
        >
          <h3 className="font-semibold text-lg mb-2">Problema</h3>
          <p className="text-muted-foreground">
            Processos tradicionais de atualização de UI exigiam publicação nas lojas de aplicativos, levando até 6 dias para que mudanças chegassem aos usuários. Isso criava gargalos para correções críticas, testes A/B e personalização em tempo real.
          </p>
        </motion.div>

        {/* Solution */}
        <motion.div
          key="solution"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-6"
        >
          <h3 className="font-semibold text-lg mb-2">Solução</h3>
          <p className="text-muted-foreground">
            Desenvolvi uma plataforma que utiliza o protocolo MCP (Model Context Protocol) do Figma para extrair design tokens e componentes diretamente do arquivo de design, combinado com APIs da Anthropic (Claude) para gerar variações de UI aderentes aos guard rails da marca. As interfaces são renderizadas em tempo real no aplicativo via bridge nativa, sem necessidade de atualização na loja.
          </p>
        </motion.div>

        {/* Stack */}
        <motion.div
          key="stack"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mb-6 flex flex-wrap gap-3"
        >
          <h3 className="font-semibold text-lg mb-2 w-full">Stack utilizada</h3>
          <div className="flex flex-wrap gap-2">
            {['React Native', 'TypeScript', 'MCP (Figma)', 'Anthropic Claude', 'Redux', 'Jest', 'TypeScript', 'Native Modules'].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 text-sm font-medium bg-accent rounded border border-border hover:bg-primary/20 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Result */}
        <motion.div
          key="result"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mb-6"
        >
          <h3 className="font-semibold text-lg mb-2">Resultado</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-primary/10 p-4 rounded-lg border border-border">
              <h4 className="font-semibold mb-2">Tempo de rollout</h4>
              <p className="text-2xl font-bold text-primary">De 6 dias → minutos</p>
              <p className="text-xs text-muted-foreground">Atualização em tempo real</p>
            </div>
            <div className="bg-primary/10 p-4 rounded-lg border border-border">
              <h4 className="font-semibold mb-2">Escalabilidade</h4>
              <p className="text-2xl font-bold text-primary">900k+ usuários</p>
              <p className="text-xs text-muted-foreground">Impacto financeiro</p>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          key="cta"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="pt-4 border-t border-border"
        >
          <Button size="lg" className="w-full group">
            <ArrowRight className="w-4 h-4 mr-2" />
            Saiba mais sobre este projeto
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}