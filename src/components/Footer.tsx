import { Linkedin, Github, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-gray-800 py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-6 text-center">
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-white">Guilherme Aguiar</h3>
          <p className="text-gray-400">Desenvolvedor Front End</p>
        </div>
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <a href="#hero" className="hover:text-primary transition-colors">Início</a>
          <a href="#about" className="hover:text-primary transition-colors">Sobre</a>
          <a href="#skills" className="hover:text-primary transition-colors">Habilidades</a>
          <a href="#projects" className="hover:text-primary transition-colors">Projetos</a>
          <a href="#experience" className="hover:text-primary transition-colors">Experiência</a>
          <a href="#contact" className="hover:text-primary transition-colors">Contato</a>
        </div>
        <div className="flex justify-center space-x-4">
          <a href="#" className="hover:text-primary transition-colors">
            <Linkedin className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-primary transition-colors">
            <Github className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-primary transition-colors">
            <Instagram className="h-5 w-5" />
          </a>
        </div>
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} Guilherme Aguiar. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}