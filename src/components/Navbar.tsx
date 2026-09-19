import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const updateScrollPosition = () => {
      const scrollY = window.pageYOffset;
      
      if (scrollY > lastScrollY && scrollY > 100) {
        // Scrolling down & past header height
        setIsHidden(true);
      } else if (scrollY < lastScrollY) {
        // Scrolling up
        setIsHidden(false);
      }
      setLastScrollY(scrollY);
    };

    window.addEventListener('scroll', updateScrollPosition);
    return () => window.removeEventListener('scroll', updateScrollPosition);
  }, [lastScrollY]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-sm border-b border-gray-800 px-4 py-3 transition-transform duration-300 ${isHidden ? '-translate-y-full' : 'translate-y-0'}`}>
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="text-xl font-bold text-primary">Guilherme Aguiar</span>
        </div>
        <div className="hidden md:flex space-x-6">
          <Link to="#hero" className="hover:text-primary transition-colors">Início</Link>
          <Link to="#about" className="hover:text-primary transition-colors">Sobre</Link>
          <Link to="#skills" className="hover:text-primary transition-colors">Habilidades</Link>
          <Link to="#projects" className="hover:text-primary transition-colors">Projetos</Link>
          <Link to="#experience" className="hover:text-primary transition-colors">Experiência</Link>
          <Link to="#contact" className="hover:text-primary transition-colors">Contato</Link>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" className="hover:bg-primary/10">
            Português
          </Button>
          <Button variant="outline" size="sm" className="hover:bg-primary/10">
            English
          </Button>
        </div>
      </div>
    </nav>
  );
}