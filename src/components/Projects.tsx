const projects = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=60',
    name: 'Dashboard Analytics',
    description: 'Painel de controle interativo para visualização de métricas e KPIs em tempo real.',
    technologies: ['React', 'TypeScript', 'Chart.js', 'Tailwind CSS'],
    link: '#',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1526402003271-309007090489?auto=format&fit=crop&w=800&q=60',
    name: 'E-commerce Platform',
    description: 'Plataforma de venda online com carrinho, checkout integrado e painel administrativo.',
    technologies: ['Next.js', 'React', 'Stripe', 'Prisma', 'PostgreSQL'],
    link: '#',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=60',
    name: 'Blog Pessoal',
    description: 'Blog moderno com sistema de comentários, busca e otimização SEO.',
    technologies: ['React', 'Markdown', 'Firebase', 'Tailwind CSS'],
    link: '#',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=60',
    name: 'App de Tarefas',
    description: 'Aplicativo de produtividade com sincronização em nuvem e lembretes personalizáveis.',
    technologies: ['Vue.js', 'Vuex', 'IndexedDB', 'CSS3'],
    link: '#',
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-20 px-6 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-white animate-fade-in-up">
          Projetos
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="relative bg-gray-800/50 p-6 rounded-lg border border-gray-700 overflow-hidden hover:-translate-y-1 transition-all duration-300 animate-fade-in-up delay-[{project.id * 100}ms]"
              style={{ animationDelay: `${project.id * 100}ms` }}
            >
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-white mb-2">{project.name}</h3>
              <p className="text-gray-300 mb-4 line-clamp-3">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <a href={project.link} className="inline-flex items-center text-primary font-medium hover:underline">
                Ver projeto
                <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}