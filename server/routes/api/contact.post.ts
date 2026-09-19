import { defineHandler } from 'nitro';
import { readBody, createError } from 'h3';
import { $fetch } from 'ofetch';

export default defineHandler(async (event) => {
  const body = await readBody<{ name?: string; email?: string; message?: string; recaptchaToken?: string }>(event);
  const { name, email, message, recaptchaToken } = body ?? {};
  if (!name || !email || !message || !recaptchaToken) {
    throw createError({ statusCode: 400, statusMessage: 'Dados incompletos' });
  }

  const secret = process.env.RECAPTCHA_SECRET_KEY;
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  // The service role key is server-only and bypasses RLS safely here.
  // Never expose it as a VITE_ variable or send it to the browser.
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
  if (!secret || !supabaseUrl || !supabaseKey) {
    throw createError({ statusCode: 500, statusMessage: 'Serviço não configurado' });
  }

  const verification = await $fetch<{ success: boolean; score?: number; action?: string }>(
    'https://www.google.com/recaptcha/api/siteverify',
    { method: 'POST', body: new URLSearchParams({ secret, response: recaptchaToken }) },
  );
  console.info('[contact] reCAPTCHA verification:', {
    success: verification.success,
    score: verification.score,
    action: verification.action,
  });
  // Localhost can receive lower scores during development; keep production stricter.
  const minimumScore = process.env.NODE_ENV !== 'production' ? 0.3 : 0.5;
  if (!verification.success || (verification.score ?? 0) < minimumScore || verification.action !== 'contact') {
    throw createError({ statusCode: 403, statusMessage: 'Validação anti-spam recusada' });
  }

  try {
    const result = await $fetch(`${supabaseUrl}/rest/v1/contact_messages`, {
      method: 'POST',
      headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}`, 'Content-Type': 'application/json', Prefer: 'return=representation' },
      body: { name, email, message },
    });
    return { success: true, result };
  } catch (error: unknown) {
    const errorData =
      typeof error === 'object' && error !== null && 'data' in error ? error.data : undefined;
    const errorMessage = error instanceof Error ? error.message : undefined;
    console.error('[contact] Supabase insert failed:', errorData ?? errorMessage ?? error);
    throw createError({ statusCode: 502, statusMessage: 'Não foi possível salvar a mensagem no Supabase' });
  }
});
