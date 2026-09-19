import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin, Github, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeading } from './SectionHeading';

export function ContactSection() {
  return (
    <section id="contact" className="mb-16">
      <SectionHeading number="07" title="Contato" description="Aberto a oportunidades como Front-end/Mobile Sênior ou Tech Lead." />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
        className="grid md:grid-cols-2 gap-8"
      >
        {/* Contact form */}
        <motion.div
          key="form"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="space-y-6"
        >
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-2">
                Nome
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Seu nome"
                className="w-full px-4 py-3 bg-card border border-border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-transparent text-foreground placeholder-muted-foreground/50"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-2">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="seu@email.com"
                className="w-full px-4 py-3 bg-card border border-border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-transparent text-foreground placeholder-muted-foreground/50"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-2">
                Mensagem
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Como posso ajudar?"
                className="w-full px-4 py-3 bg-card border border-border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-transparent text-foreground placeholder-muted-foreground/50"
                required
              />
            </div>
            <Button type="submit" size="lg" className="w-full">
              Enviar mensagem
            </Button>
          </form>
        </motion.div>

        {/* Contact info */}
        <motion.div
          key="info"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="space-y-6"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-primary" />
              <div>
                <h3 className="font-semibold">Localização</h3>
                <p className="text-muted-foreground">São Vicente, SP</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-primary" />
              <div>
                <h3 className="font-semibold">E-mail</h3>
                <p className="text-muted-foreground"><a href="mailto:guilhermebruno.aguiar@gmail.com" className="text-primary hover:underline">guilhermebruno.aguiar@gmail.com</a></p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-primary" />
              <div>
                <h3 className="font-semibold">Telefone/WhatsApp</h3>
                <p className="text-muted-foreground"><a href="https://wa.me/5513992025755" className="text-primary hover:underline">+55 (13) 99202-5755</a></p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Linkedin className="w-5 h-5 text-primary" />
              <div>
                <h3 className="font-semibold">LinkedIn</h3>
                <p className="text-muted-foreground"><a href="#" className="text-primary hover:underline">[SEU_LINK_AQUI]</a></p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Github className="w-5 h-5 text-primary" />
              <div>
                <h3 className="font-semibold">GitHub</h3>
                <p className="text-muted-foreground"><a href="#" className="text-primary hover:underline">[SEU_LINK_AQUI]</a></p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-border">
            <Button size="lg" className="w-full group">
              <Mail className="w-4 h-4 mr-2" />
              Enviar e-mail diretamente
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}