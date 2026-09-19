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
          className="space-y-4"
        >
          <h3 className="font-semibold text-lg mb-3">Frontend</h3>
          <div className="flex flex-wrap gap-2">
            {['React', 'React Native', 'Next.js', 'TypeScript', 'JavaScript', 'Angular'].map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 text-sm font-medium bg-accent rounded border border-border hover:bg-primary/20 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>

        {/* State Management */}
        <motion.div
          key="state"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="space-y-4"
        >
          <h3 className="font-semibold text-lg mb-3">Gerenciamento de Estado</h3>
          <div className="flex flex-wrap gap-2">
            {['Redux', 'Redux Saga', 'Redux Thunk', 'Context API'].map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 text-sm font-medium bg-accent rounded border border-border hover:bg-primary/20 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>

        {/* UI & Design */}
        <motion.div
          key="ui"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="space-y-4"
        >
          <h3 className="font-semibold text-lg mb-3">UI & Design Systems</h3>
          <div className="flex flex-wrap gap-2">
            {['Tailwind CSS', 'Styled Components', 'Framer Motion', 'Material UI', 'Design Systems', 'Figma'].map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 text-sm font-medium bg-accent rounded border border-border hover:bg-primary/20 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Testing */}
        <motion.div
          key="testing"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="space-y-4"
        >
          <h3 className="font-semibold text-lg mb-3">Testes</h3>
          <div className="flex flex-wrap gap-2">
            {['Jest', 'React Testing Library', 'Cypress'].map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 text-sm font-medium bg-accent rounded border border-border hover:bg-primary/20 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Backend & Data */}
        <motion.div
          key="backend"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="space-y-4"
        >
          <h3 className="font-semibold text-lg mb-3">Backend & Dados</h3>
          <div className="flex flex-wrap gap-2">
            {['Node.js', 'GraphQL', 'Firebase', 'MongoDB'].map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 text-sm font-medium bg-accent rounded border border-border hover:bg-primary/20 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>

        {/* DevOps & Tools */}
        <motion.div
          key="devops"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="space-y-4"
        >
          <h3 className="font-semibold text-lg mb-3">DevOps & Ferramentas</h3>
          <div className="flex flex-wrap gap-2">
            {['Git', 'Azure DevOps', 'Docker', 'Linux/Unix', 'Vite', 'Lerna', 'Nx', 'TurboRepo'].map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 text-sm font-medium bg-accent rounded border border-border hover:bg-primary/20 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Leadership */}
        <motion.div
          key="leadership"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="space-y-4"
        >
          <h3 className="font-semibold text-lg mb-3">Liderança</h3>
          <div className="flex flex-wrap gap-2">
            {['Mentoria Técnica', 'Arquitetura Front-end', 'Code Review', 'Agile/Scrum'].map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 text-sm font-medium bg-accent rounded border border-border hover:bg-primary/20 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}