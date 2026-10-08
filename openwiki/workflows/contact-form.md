---
type: workflow
title: Fluxo do Formulário de Contato
description: Fluxo end-to-end do formulário de contato — renderização, lazy-load do reCAPTCHA, envio via API Nitro, verificação anti-spam, persistência no Supabase e feedback visual
tags: [workflow, contact-form, recaptcha, supabase, form]
verified:
  - by: openwiki/0.7.1
    at: 2026-10-08T17:41:36.140Z
sources:
  - id: openwiki-source-07fb4fbbdef934c92dca0299
    resource: repo://server/routes/api/contact.post.ts
  - id: openwiki-source-927f8f492de072ea09d27a01
    resource: repo://src/components/ContactSection.tsx
generated: { by: "pi", at: "2026-10-08T17:41:36.140Z" }
---

# Fluxo do Formulário de Contato

## Visão geral

O formulário de contato é implementado na `ContactSection` (seção `#contact`) e faz uma jornada completa: renderização do formulário → lazy-load do reCAPTCHA v3 → envio POST para API Nitro → verificação anti-spam → persistência no Supabase → feedback ao usuário.

## Diagrama de fluxo

```
Usuário
  │ Digita nome, email, mensagem
  ▼
ContactSection (React)
  │ IntersectionObserver carrega script reCAPTCHA
  │ Ao submit: getRecaptchaToken()
  │   └─ window.grecaptcha.execute(siteKey, { action: 'contact' })
  ▼
POST /api/contact { name, email, message, recaptchaToken }
  │
  ▼
contact.post.ts (Nitro)
  ├─ Valida campos obrigatórios (400 se incompleto)
  ├─ Verifica reCAPTCHA com Google (403 se falhar)
  │   └─ POST https://www.google.com/recaptcha/api/siteverify
  │   └─ score >= 0.3 (dev) ou >= 0.5 (prod), action === 'contact'
  ├─ Insere no Supabase (502 se falhar)
  │   └─ POST /rest/v1/contact_messages (service role key)
  └─ Retorna { success: true, result }
  │
  ▼
ContactSection
  ├─ Sucesso: setStatus('success'), reseta formulário, toast
  └─ Erro: setStatus('error'), toast
```

## Client-side (ContactSection)

### Lazy loading do reCAPTCHA

O script do reCAPTCHA v3 não é carregado no bootstrap. Ele é carregado de forma lazy via IntersectionObserver quando a seção de contato entra no viewport:

```tsx
useEffect(() => {
  const observer = new IntersectionObserver(([entry]) => {
    setCaptchaVisible(entry.isIntersecting);
    if (entry.isIntersecting) loadRecaptcha().catch(() => undefined);
  }, { threshold: 0.15 });
  observer.observe(contactRef.current);
  return () => observer.disconnect();
}, []);
```

`loadRecaptcha()` injeta o script `<script src="https://www.google.com/recaptcha/api.js?render=SITE_KEY">` no `<head>` (idempotente — verifica se já existe).

### Geração do token

```tsx
async function getRecaptchaToken() {
  await loadRecaptcha();
  return new Promise<string>((resolve, reject) => {
    window.grecaptcha?.ready(() => {
      window.grecaptcha?.execute(siteKey, { action: 'contact' }).then(resolve).catch(reject);
    });
  });
}
```

- O token é gerado no momento do submit (não antes).
- `action: 'contact'` é verificado no servidor para garantir que o token foi gerado pelo formulário certo.

### Estado do formulário

- `sending: boolean` — desabilita o botão durante o envio.
- `status: 'idle' | 'success' | 'error'` — controla mensagem de feedback.
- `captchaVisible: boolean` — controla visibilidade do badge reCAPTCHA no body.

### Feedback visual

- Badge reCAPTCHA: oculto por padrão, visível quando a seção está no viewport (via classes `recaptcha-visible`/`recaptcha-exiting` no `<body>`).
- Toast via `sonner` para feedback de sucesso/erro.

## Server-side (contact.post.ts)

Ver detalhes completos em [API Routes (Nitro)](../server/api-routes.md).

### Validação reCAPTCHA

- Endpoint: `https://www.google.com/recaptcha/api/siteverify`
- Método: POST com `secret` e `response` (token).
- Critérios: `success === true`, `score >= threshold`, `action === 'contact'`.
- Score mínimo: 0.3 em desenvolvimento, 0.5 em produção (localhost recebe scores mais baixos).

### Persistência Supabase

- Tabela: `contact_messages` (id UUID, name, email, message, created_at).
- Autenticação: service role key (bypassa RLS).
- RLS policy: `contact_messages` permite INSERT público, mas não SELECT.
- Retorno: `{ success: true, result }` com os dados inseridos (incluindo `id` gerado).

## Segurança

| Camada | Mecanismo |
| --- | --- |
| Anti-spam | reCAPTCHA v3 com score mínimo |
| Validação de ação | `action === 'contact'` no servidor |
| Campos obrigatórios | Validação server-side (400 se incompleto) |
| RLS | INSERT público, sem SELECT (mensagens não são lidas pelo client) |
| Segredos | `RECAPTCHA_SECRET_KEY` e `SUPABASE_SERVICE_ROLE_KEY` nunca expostas ao client |

## Ver também

- [API Routes (Nitro)](../server/api-routes.md) — implementação do servidor
- [Supabase e Banco de Dados](../database/supabase.md) — schema e RLS
- [Seções da Página](../components/sections.md) — ContactSection
