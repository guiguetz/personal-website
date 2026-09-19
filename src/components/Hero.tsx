import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section id="hero" className="relative min-h-[80vh] flex flex-col items-center justify-center px-6 pt-20 pb-16 bg-gradient-to-b from-gray-900 via-gray-900/50 to-transparent overflow-hidden">
      {/* Subtle animated background */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1920&q=80')] bg-center bg-cover opacity-15 animate-pulse"></div>
      <div className="relative z-10 max-w-4xl text-center space-y-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight animate-fade-in-up">
          Guilherme Aguiar
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 animate-fade-in-up delay-100">
          Desenvolvedor Front End
        </p>
        <p className="text-lg text-gray-200 max-w-xl animate-fade-in-up delay-200">
          Transformando ideias em soluções
        </p>
        <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up delay-300">
          <Button variant="default" size="lg" className="bg-primary hover:bg-primary/90">
            Ver projetos
          </Button>
          <Button variant="outline" size="lg" className="border-primary hover:bg-primary/10">
            Entre em contato
          </Button>
        </div>
      </div>
    </section>
  );
}