import { motion } from 'framer-motion';
import { Code, Terminal, Box, Type, Server, GitBranch, Github } from 'lucide-react';
import { SectionHeading } from './SectionHeading';

export function AboutSection() {
  return (
    <section id="about" className="mb-16">
      <SectionHeading number="01" title="Sobre mim" description="Mais de 10 anos construindo produtos digitais de alto impacto para setores financeiro, logístico e de saúde." />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
          Sou desenvolvedor front-end sênior especializado em React, React Native, TypeScript e arquitetura de aplicações escaláveis. Minha trajetória inclui liderança de equipes técnicas, migração de sistemas legados para tecnologias modernas e criação de produtos que impactam milhões de usuários.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Code className="w-5 h-5 text-primary" />
              <div>
                <h3 className="font-semibold">Especialista em Front-end</h3>
                <p className="text-sm text-muted-foreground">React, React Native, Next.js, TypeScript, JavaScript</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Terminal className="w-5 h-5 text-primary" />
              <div>
                <h3 className="font-semibold">Arquitetura Escalável</h3>
                <p className="text-sm text-muted-foreground">Design Systems, Micro-frontends, Performance Optimization</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Box className="w-5 h-5 text-primary" />
              <div>
                <h3 className="font-semibold">Liderança Técnica</h3>
                <p className="text-sm text-muted-foreground">Mentoria, Code Review, Agile/Scrum, Arquitetura</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Type className="w-5 h-5 text-primary" />
              <div>
                <h3 className="font-semibold">Mobile & Cross-platform</h3>
                <p className="text-sm text-muted-foreground">React Native, Expo, Redux, Jest, RTL</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Server className="w-5 h-5 text-primary" />
              <div>
                <h3 className="font-semibold">Backend & Dados</h3>
                <p className="text-sm text-muted-foreground">Node.js, GraphQL, Firebase, MongoDB</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <GitBranch className="w-5 h-5 text-primary" />
              <div>
                <h3 className="font-semibold">DevOps & Ferramentas</h3>
                <p className="text-sm text-muted-foreground">Git, Docker, Azure DevOps, Vite, Nx, TurboRepo</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Languages moved here */}
        <div className="mt-8 pt-6 border-t border-border">
          <h3 className="font-semibold text-lg mb-4">Idiomas</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/20 text-primary text-sm font-medium">
                  BR
                </span>
                <div>
                  <h4 className="font-medium">Português</h4>
                  <p className="text-sm text-muted-foreground">Nativo</p>
                </div>
              </div>
              <div className="h-1.5 w-full bg-muted-foreground/5 rounded-full">
                <div className="h-full bg-primary rounded-full" style={{ width: '100%' }} />
              </div>
            </div>
            <div className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/20 text-primary text-sm font-medium">
                  EN
                </span>
                <div>
                  <h4 className="font-medium">Inglês</h4>
                  <p className="text-sm text-muted-foreground">Fluente (C2)</p>
                </div>
              </div>
              <div className="h-1.5 w-full bg-muted-foreground/5 rounded-full">
                <div className="h-full bg-primary rounded-full" style={{ width: '85%' }} />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}