import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    // Simulate success
    setSubmitStatus('success');
    setIsSubmitting(false);
    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="py-20 px-6 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-white animate-fade-in-up">
          Contato
        </h2>
        <p className="text-center text-gray-300 mb-12 animate-fade-in-up delay-100">
          Vamos transformar uma ideia em um projeto incrível?
        </p>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-transparent text-white placeholder-gray-400"
                  placeholder="Seu nome"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-transparent text-white placeholder-gray-400"
                  placeholder="seu@email.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Mensagem
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-transparent text-white placeholder-gray-400"
                  placeholder="Sua mensagem..."
                  required
                />
              </div>
              <Button
                type="submit"
                variant="default"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Enviando...' : 'Enviar mensagem'}
              </Button>
            </form>
            {submitStatus === 'success' && (
              <p className="mt-4 text-green-400 text-center animate-fade-in-up delay-200">
                Mensagem enviada com sucesso! Entrarei em contato em breve.
              </p>
            )}
          </div>
          <div className="space-y-8 animate-fade-in-up delay-300">
            <h3 className="text-xl font-semibold text-white">Meus contatos</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                <span className="text-gray-300">guilherme.aguiar@email.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                </svg>
                <span className="text-gray-300">linkedin.com/in/guilhermeaguiar</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 012-2h2a2 2 0 012 2v6M9 19a2 2 0 01-2-2h-2a2 2 0 002 2h2v-2a2 2 0 012-2h2V9a2 2 0 01-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 012-2zm10.5-8.5L15 9l3 3m0 0l-3 3m3-3H9a6.006 6.006 0 01-6.405 4.416A11.955 11.955 0 0012 20c1.397 0 2.765-.41 3.973-1.175A6.006 6.006 0 0121 9v2z"></path>
                </svg>
                <span className="text-gray-300">github.com/guilhermeaguiar</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 11a3 3 0 106 0 3 3 0 00-6 0zm4 9a7 7 0 01-7 7c0 4.021-2.572 7.39-5.914 7.766a11.017 11.017 0 10-3.574-.512A7 7 0 013 20a7 7 0 0114 0v-2.013c-.378-.464-.87-1.08-1.466-1.466A11.017 11.017 0 0013.018 11a11.017 11.017 0 00-7.766-5.914A7 7 0 013 3a7 7 0 0114 0v7a7 7 0 017 7z"></path>
                </svg>
                <span className="text-gray-300">instagram.com/guilhermeaguiar</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}