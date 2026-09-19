const testimonials = [
  {
    id: 1,
    name: 'Maria Silva',
    position: 'Product Manager',
    company: 'Tech Solutions',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=60',
    text: 'Guilherme transformou nossa visão em uma realidade digital impressionante. Sua atenção aos detalhes e comprometimento com prazos foram fundamentais para o sucesso do projeto.',
    rating: 5,
  },
  {
    id: 2,
    name: 'João Pereira',
    position: 'CTO',
    company: 'Startup Innovate',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=60',
    text: 'Trabalhar com Guilherme foi uma experiência excepcional. Ele não apenas entregou código de alta qualidade, mas também sugeriu melhorias que elevaram o produto além das expectativas.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Ana Costa',
    position: 'Diretor de Marketing',
    company: 'Freelancer Client',
    avatar: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?auto=format&fit=crop&w=150&q=60',
    text: 'O site desenvolvido pelo Guilherme superou todas as nossas expectativas. É rápido, responsivo e visualmente atraente. Recomendo fortemente seus serviços.',
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 px-6 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-white animate-fade-in-up">
          Depoimentos
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:-translate-y-1 transition-all duration-300 animate-fade-in-up delay-[{testimonial.id * 100}ms]"
              style={{ animationDelay: `${testimonial.id * 100}ms` }}
            >
              <div className="flex items-start space-x-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary"
                />
                <div>
                  <p className="text-gray-300 italic">{testimonial.text}</p>
                  <div className="mt-4 flex items-start space-x-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-white">{testimonial.name}</h4>
                      <p className="text-sm text-gray-400">
                        {testimonial.position} • {testimonial.company}
                      </p>
                    </div>
                    <div className="flex space-x-1 text-yellow-400">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className="h-4 w-4"
                          fill={star <= testimonial.rating ? 'currentColor' : 'none'}
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.218 4.324a1 1 0 001.518.61l4.324-1.218a1 1 0 001.118-.363l2.888-3.976a1 1 0 001.81-.588l-4.674-1.519a1 1 0 00-1.902 0l-1.519-4.674a1 1 0 00-.69-.95h-4.915a1 1 0 00-.69.95l-1.218-4.324a1 1 0 00-1.118-.61l-4.324 1.218a1 1 0 00-.363-1.118l-3.976-2.888a1 1 0 00-.588-1.81l-1.519 4.674a1 1 0 00.69.95h4.915a1 1 0 00.95-.69l1.519-4.674z"
                          />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}