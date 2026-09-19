import { motion } from 'framer-motion';
import { ArrowRight, Code, Zap, Brain, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section id="hero" className="min-h-[calc(100vh-4rem)] flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
        >
          <Zap className="w-3 h-3" />
          <span>Disponível para oportunidades</span>
        </motion.div>

        {/* Main headline */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6">
          Construo produtos financeiros e logísticos
          <br />
          <span className="text-primary">usados por milhões de pessoas</span>
        </h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed"
        >
          Com React, React Native e IA generativa aplicada a UI — transformando rollout de dias para minutos.
        </motion.p>

        {/* Tech highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-wrap gap-3 mb-10"
        >
          {['React', 'React Native', 'TypeScript', 'Node.js', 'IA Generativa', 'MCP'].map((tech) => (
            <span
              key={tech}
              className="px-3 py-1.5 text-sm font-medium bg-accent rounded-lg border border-border hover:border-primary/50 transition-colors"
            >
              {tech}
            </span>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-wrap gap-4"
        >
          <Button size="lg" className="group">
            <Download className="w-4 h-4 mr-2" />
            Baixar Currículo (PDF)
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button size="lg" variant="outline" className="group">
            Fale comigo
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </motion.div>

      {/* Decorative elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="absolute bottom-8 right-8 lg:bottom-12 lg:right-12 hidden lg:block"
      >
        <div className="flex flex-col items-end space-y-4">
          {[
            { icon: Code, color: 'text-blue-500', label: '10+ anos' },
            { icon: Zap, color: 'text-yellow-500', label: '900k+ usuários' },
            { icon: Brain, color: 'text-purple-500', label: 'IA + MCP' },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 + i * 0.1, duration: 0.4 }}
              className="flex items-center gap-3 text-right"
            >
              <span className="text-sm text-muted-foreground w-24">{item.label}</span>
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                <item.icon className={`w-5 h-5 ${item.color}`} />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}