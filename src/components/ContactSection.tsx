import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin, Github, MapPin, ArrowRight, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeading } from './SectionHeading';

const channels = [
  {
    icon: Mail,
    label: 'E-mail',
    value: 'guilhermebruno.aguiar@gmail.com',
    href: 'mailto:guilhermebruno.aguiar@gmail.com',
  },
  {
    icon: Phone,
    label: 'Telefone / WhatsApp',
    value: '+55 (13) 99202-5755',
    href: 'https://wa.me/5513992025755',
  },
  { icon: Linkedin, label: 'LinkedIn', value: '[SEU_LINK_AQUI]', href: '#' },
  { icon: Github, label: 'GitHub', value: '[SEU_LINK_AQUI]', href: '#' },
];

export function ContactSection() {
  return (
    <section id="contact" className="mb-20">
      <SectionHeading
        number="06"
        title="Contato"
        description="Aberto a oportunidades como Front-end / Mobile Sênior ou Tech Lead. Vamos conversar?"
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="grid gap-8 lg:grid-cols-[1fr_0.9fr]"
      >
        {/* Channels */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            São Vicente, SP · Disponível para trabalho remoto
          </div>

          {channels.map((channel) => {
            const Icon = channel.icon;
            return (
              <a
                key={channel.label}
                href={channel.href}
                className="card-hover group flex items-center gap-4 rounded-2xl border border-border bg-card p-4"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                  <Icon className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {channel.label}
                  </p>
                  <p className="truncate text-sm font-medium">{channel.value}</p>
                </div>
                <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
              </a>
            );
          })}

          <Button size="lg" className="w-full gap-2 shadow-lg shadow-primary/20">
            <Download className="h-4 w-4" />
            Baixar currículo (PDF)
          </Button>
        </div>

        {/* Form */}
        <form className="space-y-4 rounded-2xl border border-border bg-card p-5">
          <h3 className="text-sm font-semibold">Envie uma mensagem</h3>
          <div>
            <label htmlFor="name" className="mb-1.5 block text-xs font-medium text-muted-foreground">
              Nome
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Seu nome"
              className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-muted-foreground">
              E-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="seu@email.com"
              className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label htmlFor="message" className="mb-1.5 block text-xs font-medium text-muted-foreground">
              Mensagem
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              placeholder="Como posso ajudar?"
              className="w-full resize-none rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <Button type="submit" className="w-full">
            Enviar mensagem
          </Button>
        </form>
      </motion.div>
    </section>
  );
}