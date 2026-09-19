import { motion } from 'framer-motion';
import { SectionHeading } from './SectionHeading';

export function SkillsSection() {
  return (
    <section id="skills" className="mb-16">
      <SectionHeading number="04" title="Competências técnicas" description="Habilidades organizadas por categoria, com foco nas tecnologias mais relevantes para o papel." />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        {/* Frontend */}
        <motion.div
          key="frontend"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-3">
            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/20 text-primary">
              </span>
              Frontend
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-5 h-5 flex items-center justify-center rounded-full bg-primary text-primary text-xs font-medium">
                React
              </span>
              <span className="text-sm text-muted-foreground">React Native • Next.js • TypeScript • JavaScript • Angular</span>
            </div>
          </div>
        </motion.div>

        {/* State Management */}
        <motion.div
          key="state"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-3">
            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/20 text-primary">
              </span>
              Gerenciamento de Estado
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-5 h-5 flex items-center justify-center rounded-full bg-primary text-primary text-xs font-medium">
                Redux
              </span>
              <span className="text-sm text-muted-foreground">Redux Saga • Redux Thunk • Context API</span>
            </div>
          </div>
        </motion.div>

        {/* UI & Design */}
        <motion.div
          key="ui"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-3">
            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/20 text-primary">
              </span>
              UI & Design Systems
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-5 h-5 flex items-center justify-center rounded-full bg-primary text-primary text-xs font-medium">
                Tailwind CSS
              </span>
              <span className="text-sm text-muted-foreground">Styled Components • Framer Motion • Material UI • Design Systems • Figma</span>
            </div>
          </div>
        </motion.div>

        {/* Testing */}
        <motion.div
          key="testing"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-3">
            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/20 text-primary">
              </span>
              Testes
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-5 h-5 flex items-center justify-center rounded-full bg-primary text-primary text-xs font-medium">
                Jest
              </span>
              <span className="text-sm text-muted-foreground">React Testing Library • Cypress</span>
            </div>
          </div>
        </motion.div>

        {/* Backend & Data */}
        <motion.div
          key="backend"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-3">
            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/20 text-primary">
              </span>
              Backend & Dados
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-5 h-5 flex items-center justify-center rounded-full bg-primary text-primary text-xs font-medium">
                Node.js
              </span>
              <span className="text-sm text-muted-foreground">GraphQL • Firebase • MongoDB</span>
            </div>
          </div>
        </motion.div>

        {/* DevOps & Tools */}
        <motion.div
          key="devops"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-3">
            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/20 text-primary">
              </span>
              DevOps & Ferramentas
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-5 h-5 flex items-center justify-center rounded-full bg-primary text-primary text-xs font-medium">
                Git
              </span>
              <span className="text-sm text-muted-foreground">Azure DevOps • Docker • Linux/Unix • Vite • Lerna • Nx • TurboRepo</span>
            </div>
          </div>
        </motion.div>

        {/* Leadership */}
        <motion.div
          key="leadership"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-3">
            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/20 text-primary">
              </span>
              Liderança
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-5 h-5 flex items-center justify-center rounded-full bg-primary text-primary text-xs font-medium">
                Mentoria Técnica
              </span>
              <span className="text-sm text-muted-foreground">Arquitetura Front-end • Code Review • Agile/Scrum</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}