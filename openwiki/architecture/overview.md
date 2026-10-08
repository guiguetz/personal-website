---
type: architecture
title: Visão Geral da Arquitetura
description: Pipeline de renderização SSG + hidratação, estrutura de diretórios, stack tecnológico e fluxo de dados do portfólio guilherme.digital
tags: [architecture, ssg, vite, nitro, react, rendering]
verified:
  - by: openwiki/0.7.1
    at: 2026-10-08T17:41:36.140Z
sources:
  - id: openwiki-source-5f5b95b3d6a215fa02ceb945
    resource: repo://.env.example
  - id: openwiki-source-80b6080a1c3cb26b3e21c593
    resource: repo://docs/ARQUITETURA.md
  - id: openwiki-source-074d68e469e5d190c6907503
    resource: repo://nitro.config.ts
  - id: openwiki-source-c83a8d61677eda2bd5d4ea73
    resource: repo://scripts/prerender.mjs
  - id: openwiki-source-07fb4fbbdef934c92dca0299
    resource: repo://server/routes/api/contact.post.ts
  - id: openwiki-source-54631e6ebf1d3b815c4a5eed
    resource: repo://src/App.tsx
  - id: openwiki-source-def191459760da26ce179d1a
    resource: repo://src/components/LazyMount.tsx
  - id: openwiki-source-7467757629db411963ee5dee
    resource: repo://src/entry-server.tsx
  - id: openwiki-source-95bfccfd0c712f6e72040e0d
    resource: repo://src/main.tsx
  - id: openwiki-source-81cf84df6b5988f0684554d1
    resource: repo://tsconfig.app.json
  - id: openwiki-source-98d5ddb014a0fd4d678f6f2a
    resource: repo://tsconfig.json
  - id: openwiki-source-5e1b077422a94ae165e88e4e
    resource: repo://vite.config.ts
generated: { by: "pi", at: "2026-10-08T17:41:36.140Z" }
---

# Visão Geral da Arquitetura

## Contexto

O projeto é o site portfólio pessoal de Guilherme Aguiar ([guilherme.digital](https://guilherme.digital)), um single-page application construído com React 19, TypeScript e Tailwind CSS, renderizado estaticamente (SSG) e implantado na Vercel. Não há roteamento por cliente — a navegação entre seções usa âncoras `#id`.

```
Usuário
  │
  ▼
Vercel (CDN) ── index.html pré-renderizado (SSG)
  │                 └─ loader diferido injeta o bundle após o load
  ▼
React (createRoot) ── App
  │
  ├─ I18nProvider ........ idioma pt-BR/en
  ├─ Layout .............. sidebar fixa + backdrop + main
  │    ├─ HeroSection .... sempre no bundle inicial
  │    └─ seções lazy .... About / Impact / Experience / Skills / CaseStudy / Contact / Footer
  ├─ Analytics
  └─ SpeedInsights
```

## Stack tecnológico

| Camada          | Tecnologia                                                                |
| --------------- | ------------------------------------------------------------------------- |
| UI              | React 19, TypeScript, Tailwind CSS, shadcn/ui (Radix UI), lucide-react   |
| Animação        | CSS puro + `IntersectionObserver` (substitui framer-motion em runtime)    |
| Build           | Vite 8, Nitro (camada servidor/SSR)                                       |
| Backend         | Nitro API routes + Supabase (Postgres, RLS)                               |
| Internacionalização | Contexto próprio (`src/i18n`) — dicionários pt-BR/en                |
| Analytics       | `@vercel/analytics`, `@vercel/speed-insights`                            |
| Qualidade       | ESLint, size-limit, BackstopJS (regressão visual)                        |
| Deploy          | Vercel                                                                    |

## Estrutura de diretórios

```
.
├── index.html                  # HTML base (meta tags, SEO) — template do SSG
├── vite.config.ts              # Vite + plugin Nitro + alias @/
├── nitro.config.ts             # serverDir: ./server
├── tailwind.config.ts          # tokens e plugins do Tailwind
├── components.json             # config do shadcn/ui
├── backstop.json               # cenários de regressão visual
├── vercel.json                 # headers de cache e rewrites
├── .env.example                # modelo das variáveis de ambiente
│
├── scripts/
│   └── prerender.mjs           # SSG: injeta o HTML renderizado no build
│
├── server/
│   └── routes/api/
│       ├── hello.ts            # rota de exemplo
│       └── contact.post.ts     # POST /api/contact (reCAPTCHA + Supabase)
│
├── supabase/
│   ├── schema.sql              # tabelas + RLS
│   ├── seed.sql                # dados de experiência (pt/en)
│   └── fix-contact-policy*.sql # correções de policy
│
├── public/                     # assets servidos na raiz (favicon, CV, sitemap)
│
├── src/
│   ├── main.tsx                # entry do cliente (createRoot)
│   ├── entry-server.tsx        # entry usada pelo prerender (renderToReadableStream)
│   ├── App.tsx                 # composição das seções + analytics
│   ├── globals.css             # tokens, utilitários e animações CSS
│   ├── components/
│   │   ├── *Section.tsx        # seções da página (Hero, About, Impact, etc.)
│   │   ├── Layout.tsx, Sidebar.tsx, Footer.tsx
│   │   ├── LazyMount.tsx, SectionHeading.tsx, FlagIcons.tsx
│   │   └── ui/                 # shadcn/ui (button, dialog, input, etc.)
│   ├── hooks/                  # useTheme.ts, useReveal.ts
│   ├── i18n/                   # I18nContext.tsx, translations.ts
│   ├── lib/                    # supabase.ts, utils.ts
│   └── utils/                  # toast.ts
│
└── docs/                       # documentação do projeto
```

## Pipeline de renderização (SSG + montagem no cliente)

1. `vite build` gera o bundle do cliente e a camada Nitro em `.output/`.
2. `scripts/prerender.mjs` (chamado automaticamente pelo `npm run build`) empacota `src/entry-server.tsx` com rolldown, renderiza a árvore React com `renderToReadableStream` e injeta o HTML resultante dentro de `<div id="root">` no `index.html`.
3. O `<script type="module">` de entrada original é **substituído** por um loader diferido que injeta o bundle apenas após o evento `window.load` com ~150ms de atraso. Isso garante que o conteúdo pré-renderizado pinte primeiro (FCP/LCP) antes do JS carregar.
4. No cliente, `main.tsx` chama `createRoot(document.getElementById("root")!).render(<App />)` — **não** usa `hydrateRoot`. A escolha evita mismatch de hidratação (o locale inicial do SSR é sempre `pt`, mas o cliente pode ter `en` salvo em localStorage).

## Decisões arquiteturais

| Decisão | Motivação |
| --- | --- |
| SSG em vez de SSR por request | Site estático; melhor TTFB e custo zero de servidor para o HTML |
| `renderToReadableStream` | API de streaming do React 19, alinhada à versão atual |
| `createRoot` (sem hidratar) | O locale inicial difere entre SSR (`pt` fixo) e cliente (preferência salva); montagem limpa evita mismatch de hidratação |
| SVG puro para sparklines | Substitui recharts (~376 kB) por SVG inline em `ImpactSection` |
| CSS + `IntersectionObserver` | Substitui `whileInView`/`AnimatePresence` do framer-motion, removendo peso do bundle |
| `LazyMount` + `React.lazy` | Adia download e montagem das seções abaixo da dobra |
| Nitro para API de contato | Mantém segredos (reCAPTCHA, Supabase service role key) exclusivamente no servidor |

## Dependências não utilizadas (legado)

`framer-motion` e `recharts` permanecem em `package.json` mas **não são importados** em `src/` — aparecem apenas em comentários. Podem ser removidos em uma limpeza futura.

## Alias e TypeScript

- `@/*` → `src/*` — declarado em `tsconfig.json`, `tsconfig.app.json` e `vite.config.ts`.
- `tsconfig.json` é um "solution file" que referencia `tsconfig.app.json` (app) e `tsconfig.node.json` (config Node/Vite).
- O projeto usa `strict: false` (sem `strictNullChecks` / `noImplicitAny`).

## Camada servidor (Nitro)

O Nitro é integrado ao Vite via plugin (`nitro()` como último entry em `vite.config.ts.plugins`). A configuração mínima em `nitro.config.ts` define apenas `serverDir: "./server"`. As rotas API seguem a convenção:

- Localização: `server/routes/api/`
- Método por sufixo: `contact.post.ts` → `POST /api/contact`
- Imports: `defineHandler` de `"nitro"`, helpers (`readBody`, `createError`) de `"nitro/h3"`
- Runtime config: `useRuntimeConfig()` (variáveis prefixadas com `NITRO_`)

## Ver também

- [Renderização e Performance](./rendering.md) — detalhes do SSG, code-splitting e LazyMount
- [Seções da Página](../components/sections.md) — cada seção do portfólio
- [API Routes (Nitro)](../server/api-routes.md) — camada servidor e rotas
