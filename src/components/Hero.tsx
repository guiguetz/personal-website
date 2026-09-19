import { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';

export function Hero() {
  const [showContent, setShowContent] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePosition({ x, y });
      }
    };

    heroRef.current?.addEventListener('mousemove', handleMouseMove);
    return () => heroRef.current?.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      id="hero" 
      ref={heroRef}
      className="relative min-h-[80vh] flex flex-col items-center justify-center px-6 pt-20 pb-16 bg-gradient-to-b from-gray-900 via-gray-900/50 to-transparent overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1920&q=80')] bg-center bg-cover opacity-10 animate-[gradientShift_15s_ease_infinite]"></div>
        <div className="absolute inset-0 -rotate-12 bg-[url('https://images.unsplash.com/photo-1526402003271-309007090489?auto=format&fit=crop&w=1920&q=80')] bg-center bg-cover opacity-5 animate-[gradientShift_20s_ease_infinite]"></div>
      </div>
      
      {/* Mouse-reactive decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Element 1 */}
        <div 
          className="absolute w-8 h-8 bg-primary/20 rounded-full"
          style={{
            left: `calc(50% + ${(mousePosition.x - 150) * 0.1}px)`,
            top: `calc(50% + ${(mousePosition.y - 200) * 0.1}px)`,
            transform: 'translate(-50%, -50%)',
            transition: 'all 0.3s ease'
          }}
        ></div>
        
        {/* Element 2 */}
        <div 
          className="absolute w-6 h-6 bg-primary/15 rounded-full"
          style={{
            left: `calc(50% + ${(mousePosition.x - 200) * 0.08}px)`,
            top: `calc(50% + ${(mousePosition.y - 100) * 0.08}px)`,
            transform: 'translate(-50%, -50%)',
            transition: 'all 0.3s ease'
          }}
        ></div>
        
        {/* Element 3 */}
        <div 
          className="absolute w-10 h-10 bg-primary/12 rounded-full"
          style={{
            left: `calc(50% + ${(mousePosition.x - 100) * 0.12}px)`,
            top: `calc(50% + ${(mousePosition.y - 300) * 0.12}px)`,
            transform: 'translate(-50%, -50%)',
            transition: 'all 0.3s ease'
          }}
        ></div>
      </div>
      
      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-6 h-6 bg-primary/20 rounded-full animate-[float_6s_ease_infinite]"></div>
        <div className="absolute bottom-20 right-20 w-8 h-8 bg-primary/10 rounded-full animate-[float_8s_ease_infinite reverse]"></div>
        <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-primary/15 rounded-full animate-[float_4s_ease_infinite]"></div>
        <div className="absolute bottom-1/3 right-1/4 w-5 h-5 bg-primary/12 rounded-full animate-[float_5s_ease_infinite reverse]"></div>
      </div>
      
      <div className="relative z-10 max-w-4xl text-center space-y-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight animate-fade-in-up">
          Guilherme Aguiar
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 animate-fade-in-up delay-100">
          Desenvolvedor Front End
        </p>
        {showContent && (
          <>
            <p className="text-lg text-gray-200 max-w-xl animate-fade-in-up delay-200">
              Transformando ideias em soluções
            </p>
            <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up delay-300">
              <Button variant="default" size="lg" className="bg-primary hover:bg-primary/90 hover:-translate-y-1 transition-all duration-300">
                Ver projetos
              </Button>
              <Button variant="outline" size="lg" className="border-primary hover:bg-primary/10 hover:-translate-y-1 transition-all duration-300">
                Entre em contato
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}