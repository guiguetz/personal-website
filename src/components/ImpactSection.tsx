import { motion } from 'framer-motion';
import { BarChart2, Users, Clock, TrendingUp } from 'lucide-react';
import { BarChart } from 'recharts';
import { SectionHeading } from './SectionHeading';

export function ImpactSection() {
  return (
    <section id="impact" className="mb-16">
      <SectionHeading number="02" title="Impacto em números" description="Resultados mensuráveis dos produtos que desenvolvi e liderei." />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
        className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {/* Originação anual */}
        <motion.div
          key="origination"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <BarChart2 className="w-6 h-6 text-primary" />
            <div>
              <h3 className="font-semibold text-sm text-muted-foreground">Originação anual</h3>
              <p className="text-2xl font-bold text-primary">R$ 1,57 bi+</p>
            </div>
          </div>
          <div className="h-4 w-full bg-muted-foreground/5 rounded-full mb-2">
            <div className="h-full bg-primary rounded-full" style={{ width: '85%' }} />
          </div>
          <p className="text-xs text-muted-foreground">Consignado Privado CLT</p>
        </motion.div>

        {/* Usuários impactados */}
        <motion.div
          key="users"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-6 h-6 text-primary" />
            <div>
              <h3 className="font-semibold text-sm text-muted-foreground">Usuários ativos</h3>
              <p className="text-2xl font-bold text-primary">900 mil+</p>
            </div>
          </div>
          <div className="h-4 w-full bg-muted-foreground/5 rounded-full mb-2">
            <div className="h-full bg-primary rounded-full" style={{ width: '92%' }} />
          </div>
          <p className="text-xs text-muted-foreground">Setor financeiro</p>
        </motion.div>

        {/* Liderança */}
        <motion.div
          key="leadership"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-6 h-6 text-primary" />
            <div>
              <h3 className="font-semibold text-sm text-muted-foreground">Equipe liderada</h3>
              <p className="text-2xl font-bold text-primary">6 devs</p>
            </div>
          </div>
          <div className="h-4 w-full bg-muted-foreground/5 rounded-full mb-2">
            <div className="h-full bg-primary rounded-full" style={{ width: '78%' }} />
          </div>
          <p className="text-xs text-muted-foreground">Técnica e mentoria</p>
        </motion.div>

        {/* Tempo de rollout */}
        <motion.div
          key="rollout"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-6 h-6 text-primary" />
            <div>
              <h3 className="font-semibold text-sm text-muted-foreground">Tempo de rollout</h3>
              <p className="text-2xl font-bold text-primary">De 6 dias → minutos</p>
            </div>
          </div>
          <div className="h-4 w-full bg-muted-foreground/5 rounded-full mb-2">
            <div className="h-full bg-primary rounded-full" style={{ width: '95%' }} />
          </div>
          <p className="text-xs text-muted-foreground">Plataforma MCP + IA generativa</p>
        </motion.div>
      </motion.div>
    </section>
  );
}