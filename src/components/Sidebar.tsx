import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Phone, MapPin, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeading } from './SectionHeading';

export function Sidebar() {
  const navItems = [
    { name: 'Sobre', href: '#about' },
    { name: 'Impacto', href: '#impact' },
    { name: 'Experiência', href: '#experience' },
    { name: 'Projetos', href: '#projects' },
    { name: 'Competências', href: '#skills' },
    { name: 'Contato', href: '#contact' },
  ];

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:guilhermebruno.aguiar@gmail.com', label: 'E-mail' },
    { icon: Phone, href: 'https://wa.me/5513992025755', label: 'WhatsApp' },
  ];

  return (
    <aside className="fixed top-0 left-0 z-40 w-64 h-screen bg-card border-r border-border flex flex-col">
      {/* Avatar and name */}
      <div className="p-6 border-b border-border">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center"
        >
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-4xl font-bold text-white mb-4">
            GA
          </div>
          <h1 className="text-xl font-bold">Guilherme Aguiar</h1>
          <p className="text-sm text-muted-foreground mt-1">Desenvolvedor Front-end / Mobile Sênior</p>
          <div className="flex items-center mt-2 text-xs text-muted-foreground">
            <MapPin className="w-3 h-3 mr-1" />
            São Vicente, SP
          </div>
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-1">
          {navItems.map((item, index) => (
            <motion.li
              key={item.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <a
                href={item.href}
                className="block px-4 py-2 rounded-lg text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-accent transition-colors duration-200"
              >
                {item.name}
              </a>
            </motion.li>
          ))}
        </ul>
      </nav>

      {/* Social links and CTA */}
      <div className="p-4 border-t border-border space-y-4">
        <div className="flex justify-center space-x-3">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-accent hover:bg-primary/20 transition-colors duration-200"
              >
                <Icon className="w-4 h-4" />
              </a>
            );
          })}
        </div>
        
        <Button className="w-full" variant="default" size="sm">
          <Download className="w-4 h-4 mr-2" />
          Baixar CV (PDF)
        </Button>
        
        <Button className="w-full" variant="outline" size="sm">
          Fale comigo
        </Button>
      </div>
    </aside>
  );
}