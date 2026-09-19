import { FormEvent, lazy, Suspense, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin, Github, MapPin, ArrowRight, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeading } from './SectionHeading';
import { useStagger } from '@/hooks/useStagger';
import { useI18n } from '@/i18n/I18nContext';
declare global {
  interface Window { grecaptcha?: { ready: (callback: () => void) => void; execute: (siteKey: string, options: { action: string }) => Promise<string> } }
}

const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

const CvPreviewDialog = lazy(() => import('@/components/CvPreviewDialog'));

function loadRecaptcha(): Promise<void> {
  if (window.grecaptcha?.execute) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>('script[data-recaptcha]');
    if (existing) {
      existing.addEventListener('load', () => resolve(), { once: true });
      existing.addEventListener('error', reject, { once: true });
      return;
    }
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(recaptchaSiteKey)}`;
    script.async = true; script.defer = true; script.dataset.recaptcha = 'true';
    script.onload = () => resolve(); script.onerror = reject;
    document.head.appendChild(script);
  });
}

async function getRecaptchaToken() {
  await loadRecaptcha();
  return new Promise<string>((resolve, reject) => {
    window.grecaptcha?.ready(() => {
      window.grecaptcha?.execute(recaptchaSiteKey, { action: 'contact' }).then(resolve).catch(reject);
    });
  });
}

const channelMeta = [
  { key: 'email', icon: Mail, value: 'guilhermebruno.aguiar@gmail.com', href: 'mailto:guilhermebruno.aguiar@gmail.com' },
  { key: 'phone', icon: Phone, value: '+55 (13) 99202-5755', href: 'https://wa.me/5513992025755' },
  { key: 'linkedin', icon: Linkedin, value: 'Guilherme Aguiar', href: 'https://www.linkedin.com/in/guilherme-aguiar-dev' },
  { key: 'github', icon: Github, value: '@guiguetz', href: 'https://github.com/guiguetz' },
] as const;

export function ContactSection() {
  const { t } = useI18n();
  const { container, item, viewport } = useStagger(0.07, 16);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [captchaVisible, setCaptchaVisible] = useState(false);
  const [cvOpen, setCvOpen] = useState(false);
  const contactRef = useRef<HTMLElement>(null);

  useEffect(() => {
    document.body.classList.toggle('recaptcha-visible', captchaVisible);
    document.body.classList.toggle('recaptcha-exiting', !captchaVisible);
    return () => {
      document.body.classList.remove('recaptcha-visible', 'recaptcha-exiting');
    };
  }, [captchaVisible]);

  useEffect(() => {
    const section = contactRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => {
      setCaptchaVisible(entry.isIntersecting);
      if (entry.isIntersecting) loadRecaptcha().catch(() => undefined);
    }, { threshold: 0.15 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true); setStatus('idle'); setCaptchaVisible(true);
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    try {
      if (!recaptchaSiteKey) throw new Error('Site key do reCAPTCHA não configurada');
      const recaptchaToken = await getRecaptchaToken();
      const response = await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.get('name'), email: form.get('email'), message: form.get('message'), recaptchaToken }),
      });
      if (!response.ok) throw new Error('Falha ao enviar');
      setStatus('success'); formElement.reset();
    } catch { setStatus('error'); }
    finally { setSending(false); }
  }

  return (
    <section ref={contactRef} id="contact"
 className="mb-20">
      <SectionHeading number="06" title={t.contact.title} description={t.contact.description} />

      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        {/* Channels */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="space-y-3"
        >
          <motion.div
            variants={item}
            className="flex items-center gap-2 text-xs text-muted-foreground"
          >
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span>{t.contact.locationLine}</span>
          </motion.div>

          {channelMeta.map((channel) => {
            const Icon = channel.icon;
            return (
              <motion.a
                key={channel.key}
                variants={item}
                href={channel.href}
                className="panel panel-interactive group flex items-center gap-4 rounded-2xl p-4"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                  <Icon className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {t.contact.channels[channel.key]}
                  </p>
                  {channel.value && (
                    <p className="truncate text-sm font-medium">{channel.value}</p>
                  )}
                </div>
                <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
              </motion.a>
            );
          })}

          <motion.div variants={item} className="flex w-full flex-col gap-2 sm:flex-row">
            <Button asChild size="lg" className="w-full gap-2 shadow-lg shadow-primary/20">
              <a href="/guilherme-aguiar-cv.pdf" download="Guilherme-Aguiar-CV.pdf">
                <Download className="h-4 w-4" />
                {t.contact.download}
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full"
              onClick={() => setCvOpen(true)}
            >
              {t.contact.viewResume}
            </Button>
          </motion.div>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          onFocus={() => setCaptchaVisible(true)}
          layout
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="panel space-y-4 rounded-2xl p-5"
        >
          <h3 className="text-sm font-semibold">{t.contact.formTitle}</h3>
          <div>
            <label htmlFor="name" className="mb-1.5 block text-xs font-medium text-muted-foreground">
              {t.contact.name}
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder={t.contact.namePlaceholder}
              className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-muted-foreground">
              {t.contact.email}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder={t.contact.emailPlaceholder}
              className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label htmlFor="message" className="mb-1.5 block text-xs font-medium text-muted-foreground">
              {t.contact.message}
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              placeholder={t.contact.messagePlaceholder}
              className="w-full resize-none rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <Button type="submit" disabled={sending} className="w-full">
            {sending ? 'Enviando...' : t.contact.submit}
          </Button>
          {status === 'success' && <p role="status" className="text-sm text-emerald-400">Mensagem enviada com sucesso.</p>}
          {status === 'error' && <p role="alert" className="text-sm text-destructive">Não foi possível enviar. Configure o Supabase ou tente por e-mail.</p>}
        </motion.form>
      </div>
      {cvOpen && (
        <Suspense fallback={null}>
          <CvPreviewDialog open={cvOpen} onOpenChange={setCvOpen} />
        </Suspense>
      )}
    </section>
  );
}