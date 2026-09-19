export function About() {
  return (
    <section id="about" className="py-20 px-6 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-white animate-fade-in-up">
          Sobre mim
        </h2>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <p className="text-gray-300 leading-relaxed animate-fade-in-up delay-100">
              Sou desenvolvedor front-end com paixão por criar interfaces digitais que sejam ao mesmo tempo belas, funcionais e acessíveis. Com foco em experiência do usuário e desempenho, trabalho para transformar conceitos em produtos que realmente fazem a diferença.
            </p>
            <p className="text-gray-300 leading-relaxed animate-fade-in-up delay-200">
              Minha jornada começou com um fascínio por como as coisas funcionam na web, e desde então tenho me dedicado a dominar as tecnologias modernas que impulsionam as experiências interativas de hoje.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in-up delay-300">
              <a 
                href="#" 
                className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all duration-300 hover:-translate-y-1"
              >
                Baixar CV
              </a>
              <a 
                href="#contact" 
                className="inline-flex items-center px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-all duration-300 hover:-translate-y-1"
              >
                Entre em contato
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 animate-fade-in-up delay-300">
            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:-translate-y-2 transition-all duration-500 text-center">
              <h3 className="text-3xl font-bold text-primary mb-2">5+</h3>
              <p className="text-sm text-gray-400">Anos de experiência</p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:-translate-y-2 transition-all duration-500 text-center">
              <h3 className="text-3xl font-bold text-primary mb-2">50+</h3>
              <p className="text-sm text-gray-400">Projetos concluídos</p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:-translate-y-2 transition-all duration-500 text-center">
              <h3 className="text-3xl font-bold text-primary mb-2">15+</h3>
              <p className="text-sm text-gray-400">Clientes atendidos</p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:-translate-y-2 transition-all duration-500 text-center">
              <h3 className="text-3xl font-bold text-primary mb-2">10+</h3>
              <p className="text-sm text-gray-400">Tecnologias dominadas</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}