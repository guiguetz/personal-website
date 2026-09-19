import { motion } from 'framer-motion';
import { SectionHeading } from './SectionHeading';

export function LanguagesSection() {
  return (
    <section id="languages" className="mb-16">
      <SectionHeading number="06" title="Idiomas" description="Proficiência em idiomas para comunicação eficaz em ambientes globais." />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
        className="grid md:grid-cols-2 gap-6"
      >
        {/* Portuguese */}
        <motion.div
          key="portuguese"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/20 text-primary text-sm font-medium">
              BR
            </span>
            <div>
              <h3 className="font-semibold">Português</h3>
              <p className="text-sm text-muted-foreground">Nativo</p>
            </div>
          </div>
          <div className="h-2 w-full bg-muted-foreground/5 rounded-full">
            <div className="h-full bg-primary rounded-full" style={{ width: '100%' }} />
          </div>
        </motion.div>

        {/* English */}
        <motion.div
          key="english"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/20 text-primary text-sm font-medium">
              EN
            </span>
            <div>
              <h3 className="font-semibold">Inglês</h3>
              <p className="text-sm text-muted-foreground">Fluente (C2)</p>
            </div>
          </div>
          <div className="h-2 w-full bg-muted-foreground/5 rounded-full">
            <div className="h-full bg-primary rounded-full" style={{ width: '85%' }} />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}