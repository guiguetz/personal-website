---
type: quickstart
title: Quickstart
description: Guia rápido de setup, pré-requisitos, variáveis de ambiente, instalação e primeiros passos para desenvolvimento
tags: [quickstart, setup, install, environment, getting-started]
verified:
  - by: openwiki/0.7.1
    at: 2026-10-08T17:41:36.140Z
sources:
  - id: openwiki-source-5f5b95b3d6a215fa02ceb945
    resource: repo://.env.example
  - id: openwiki-source-23775c3de52f3ab95a13cb8b
    resource: repo://README.md
generated: { by: "pi", at: "2026-10-08T17:41:36.140Z" }
---

# Quickstart

## Pré-requisitos

- **Node.js** 20+ (recomendado 22).
- **npm** — o projeto usa `package-lock.json`.

## Instalação

```bash
git clone <repo-url>
cd guilherme-aguiar
npm install
cp .env.example .env
```

## Variáveis de ambiente

Preencha o `.env` com os valores do seu projeto:

| Variável | Onde obter | Escopo |
| --- | --- | --- |
| `VITE_SUPABASE_URL` | Supabase → Project Settings → API | Cliente + servidor |
| `VITE_SUPABASE_ANON_KEY` | Supabase → Project Settings → API | Cliente + servidor |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Project Settings → API | **Somente servidor** |
| `VITE_RECAPTCHA_SITE_KEY` | Google reCAPTCHA Admin | Cliente |
| `RECAPTCHA_SECRET_KEY` | Google reCAPTCHA Admin | **Somente servidor** |

> **Segurança:** variáveis sem prefixo `VITE_` nunca são incluídas no bundle do cliente. `SUPABASE_SERVICE_ROLE_KEY` e `RECAPTCHA_SECRET_KEY` são usadas apenas nas rotas do servidor Nitro.

**Sem essas variáveis:** o site funciona normalmente, mas a seção de experiência usa o dicionário local em vez do Supabase e o formulário de contato falha.

## Rodando em desenvolvimento

```bash
npm run dev
```

Abre em **http://localhost:8080** com hot module replacement (HMR).

## Scripts principais

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento (Vite) |
| `npm run build` | Build de produção + prerender (SSG) |
| `npm run preview` | Serve o build de produção localmente |
| `npm run lint` | ESLint em todo o projeto |
| `npm run size` | Build + verificação do orçamento de bundle |
| `npm run test:visual:ref` | Gera screenshots de referência (BackstopJS) |
| `npm run test:visual` | Compara build atual com referências visuais |
| `npm run test:visual:approve` | Aprova novas referências visuais |

## Primeiros passos

1. **Explore a estrutura:** `src/App.tsx` é o ponto de composição das seções.
2. **Adicione texto:** toda string em tela vive em `src/i18n/translations.ts` (dicionários `pt` e `en`).
3. **Crie uma seção:** use `SectionHeading` + `useReveal` para animação de entrada.
4. **Estilize:** use Tailwind classes. Tokens de design estão em `src/globals.css`.
5. **Valide:** `npm run lint` antes de commitar.

## Estrutura de diretórios

```
├── public/                  # Assets estáticos (favicon, CV, sitemap, robots)
├── scripts/prerender.mjs    # SSG: renderiza e injeta HTML no build
├── server/routes/api/       # Rotas HTTP (Nitro)
│   ├── hello.ts             # GET /api/hello
│   └── contact.post.ts      # POST /api/contact (reCAPTCHA + Supabase)
├── src/
│   ├── components/          # Seções + componentes shadcn/ui
│   ├── hooks/               # useTheme, useReveal
│   ├── i18n/                # Dicionários e provider de idioma
│   ├── lib/                 # Cliente Supabase e utilitários
│   ├── App.tsx              # Composição das seções
│   ├── main.tsx             # Bootstrap do cliente
│   └── entry-server.tsx     # Entry usada pelo prerender
├── supabase/                # schema.sql e seeds
├── backstop.json            # Cenários de regressão visual
├── nitro.config.ts          # Configuração do servidor Nitro
├── vite.config.ts           # Vite + Nitro + React
└── tailwind.config.ts       # Tailwind + tokens de design
```

## Próximos passos

- [Visão Geral da Arquitetura](./architecture/overview.md) — decisões de design e stack completa
- [Guia de Desenvolvimento](./development/guide.md) — convenções, pitfalls e boas práticas
- [Deploy na Vercel](./deployment/vercel.md) — configuração e variáveis de produção
