const experiences = [
  {
    id: 1,
    company: 'Tech Solutions Inc.',
    position: 'Desenvolvedor Front End Sênior',
    period: '2022 - Presente',
    description: 'Lidero o desenvolvimento de interfaces para aplicações web de alta escalabilidade, utilizando React e TypeScript. Responsável por melhorar o desempenho em 40% e reduzir o tempo de carregamento médio de 3s para 1.8s.',
    achievements: [
      'Desenvolvi sistema de design reutilizado em 5+ produtos internos',
      'Mentorei equipe de 3 desenvolvedores júniores',
      'Implementei testes automatizados aumentando cobertura de 60% para 85%',
    ],
  },
  {
    id: 2,
    company: 'Startup Innovate',
    position: 'Desenvolvedor Front End Pleno',
    period: '2020 - 2022',
    description: 'Desenvolvi aplicações SPA usando React e Redux, focando em experiência do usuário e acessibilidade. Colaborei com equipe de UX para criar interfaces intuitivas.',
    achievements: [
      'Aumentei taxa de conversão em 25% através de otimização de formulários',
      'Integrei API GraphQL reduzindo requisições em 30%',
      'Desenvolvi componente de calendário customizado adotado por 2 outros times',
    ],
  },
  {
    id: 3,
    company: 'Freelancer',
    position: 'Desenvolvedor Web',
    period: '2018 - 2020',
    description: 'Trabalhei em diversos projetos para clientes variados, incluindo lojas virtuais, sites institucionais e aplicativos de gestão.',
    achievements: [
      'Entreguei 15+ projetos dentro do prazo e orçamento',
      'Especializei-me em otimização de performance e SEO',
      'Mantive taxa de satisfação de clientes acima de 95%',
    ],
  },
];

export function Experience() {
  return (
    <section id="experience" className="py-20 px-6 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-white animate-fade-in-up">
          Experiência Profissional
        </h2>
        <div className="relative">
          {/* Timeline line with animated gradient */}
          <div className="absolute inset-0 w-0.5 bg-gradient-to-t from-primary/20 via-primary/40 to-primary/20 animate-[gradientShift_3s_ease_infinite]"></div>
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              className="relative px-4 py-8 animate-fade-in-up delay-[{index * 200}ms]"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Content wrapper with hover lift */}
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 hover:-translate-y-1 hover:shadow-xl transition-all duration-500">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-white">{exp.company}</h3>
                  <span className="text-sm text-gray-400">{exp.period}</span>
                </div>
                <h4 className="text-base font-medium text-primary mb-2">{exp.position}</h4>
                <p className="text-gray-300 mb-4">{exp.description}</p>
                {exp.achievements && (
                  <ul className="list-disc list-inside text-gray-300 space-y-1">
                    {exp.achievements.map((ach, achIndex) => (
                      <li key={achIndex} className="animate-fade-in-up delay-[{achIndex * 100}ms]">
                        {ach}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {/* Animated dot */}
              <div className="absolute left-0 -top-2.5 w-6 h-6 bg-primary rounded-full border-2 border-gray-900 animate-pulse delay-[{index * 200}ms]">
                <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}