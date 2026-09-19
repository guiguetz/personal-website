# guilherme.digital

Portfólio pessoal de **Guilherme Aguiar** — Desenvolvedor Front-end / Mobile Sênior, com mais de 10 anos construindo produtos digitais (financeiro e logístico) usados por milhões de pessoas.

🌐 **Produção:** [https://guilherme.digital](https://guilherme.digital)

---

## ✨ Funcionalidades

- **Site de página única** com navegação por seções: Sobre, Impacto, Experiência, Skills, Case Study e Contato.
- **Internacionalização (pt-BR / en)** com troca de idioma em runtime, persistência em `localStorage` e transição animada de texto.
- **Tema claro/escuro** persistente.
- **Formulário de contato** com validação anti-spam via **Google reCAPTCHA v3** e persistência no **Supabase**.
- **Preview do currículo (PDF)** sob demanda, com download (`react-pdf`, carregado de forma lazy).
- **Performance**: SSG/prerender, code-splitting por seção, `LazyMount` (montagem só ao entrar na viewport) e orçamento de bundle.
- **SEO**: meta tags, Open Graph, Twitter Card, `hreflang`, `sitemap.xml` e `robots.txt`.
- **Analytics**: Vercel Analytics + Speed Insights.

## 🧱 Stack

| Camada | Tecnologia |
| --- | --- |
| UI | React 19, TypeScript, Tailwind CSS, shadcn/ui (Radix UI), lucide-react |
| Animação | framer-motion |
| Build | Vite 8, Nitro (camada de servidor/SSR) |
| Backend | Nitro API routes + Supabase (Postgres) |
| Internacionalização | Contexto próprio (`src/i18n`) |
| Analytics | `@vercel/analytics`, `@vercel/speed-insights` |
| Qualidade | ESLint, size-limit, BackstopJS (regressão visual) |
| Deploy | Vercel |

## 📁 Estrutura do projeto

```
├── public/                 # Assets estáticos (favicon, CV, sitemap, robots)
├── scripts/prerender.mjs   # SSG: injeta o HTML renderizado no build
├── server/routes/api/      # Rotas HTTP (Nitro)
│   └── contact.post.ts     # Valida reCAPTCHA e grava mensagem no Supabase
├── src/
│   ├── components/         # Seções do site + componentes shadcn/ui
│   ├── hooks/              # useTheme, useReveal
│   ├── i18n/               # Dicionários e provider de idioma
│   ├── lib/                # Cliente Supabase e utilitários
│   ├── App.tsx             # Composição das seções
│   ├── main.tsx            # Bootstrap do cliente
│   └── entry-server.tsx    # Entry usada pelo prerender
├── supabase/               # schema.sql e seeds
├── backstop.json           # Cenários de regressão visual
└── vite.config.ts          # Vite + Nitro
```

## 🚀 Começando

### Pré-requisitos

- Node.js 20+ (recomendado 22)
- npm (o projeto usa `package-lock.json`)

### Instalação

```bash
npm install
```

### Variáveis de ambiente

Copie o arquivo de exemplo e preencha os valores:

```bash
cp .env.example .env
```

| Variável | Escopo | Descrição |
| --- | --- | --- |
| `VITE_SUPABASE_URL` | cliente + servidor | URL do projeto Supabase |
| `VITE_SUPABASE_ANON_KEY` | cliente + servidor | Chave anônima do Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | **somente servidor** | Bypassa RLS na rota de contato. Nunca prefixe com `VITE_` |
| `VITE_RECAPTCHA_SITE_KEY` | cliente | Site key do reCAPTCHA v3 |
| `RECAPTCHA_SECRET_KEY` | **somente servidor** | Secret key usada na verificação |

### Scripts

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento em `http://localhost:8080` |
| `npm run build` | Build de produção + prerender (SSG) |
| `npm run preview` | Serve o build de produção |
| `npm run lint` | ESLint em todo o projeto |
| `npm run size` | Build + verificação do orçamento de bundle |
| `npm run test:visual:ref` | Gera referências de regressão visual (BackstopJS) |
| `npm run test:visual` | Compara o build atual com as referências |
| `npm run test:visual:approve` | Aprova novas referências após revisão |

## 🏗️ Arquitetura

### Renderização e performance

O `npm run build` gera o build do Vite e em seguida executa `scripts/prerender.mjs`, que renderiza a aplicação no servidor e injeta o HTML em `index.html` (SSG). Isso melhora FCP/LCP. O JavaScript de entrada é carregado de forma diferida após o evento `load`, então o conteúdo pré-renderizado aparece antes da hidratação.

As seções abaixo da dobra usam `React.lazy` + `LazyMount`, carregando e montando apenas quando entram na viewport.

### Camada Nitro

O projeto possui uma camada de servidor Nitro configurada em `nitro.config.ts` (`serverDir: "./server"`). As rotas ficam em `server/routes/api/`.

> Importante: `defineHandler` vem de `"nitro"`, mas os helpers H3 (`readBody`, `createError`, etc.) vêm de `"nitro/h3"`. Consulte `AI_RULES.md` para as convenções completas.

### Fluxo do formulário de contato

1. O cliente carrega o reCAPTCHA v3 ao se aproximar da seção e obtém um token.
2. `POST /api/contact` recebe `name`, `email`, `message` e `recaptchaToken`.
3. O servidor valida o token no Google (score mínimo 0.5 em produção, 0.3 em dev).
4. A mensagem é gravada em `contact_messages` via API REST do Supabase.

### Banco de dados

O schema em `supabase/schema.sql` cria as tabelas `contact_messages` e `portfolio_experience`, com RLS habilitado (inserção pública em contato, leitura pública da experiência).

## 🚢 Deploy

O projeto é publicado na **Vercel**. O `vercel.json` define cache imutável para `/assets/*` e rewrite de SPA para `index.html`. Configure as variáveis de ambiente no painel da Vercel antes do deploy.

## 📚 Documentação

Planos de implementação e decisões técnicas ficam em [`docs/`](./docs):

- [`PLAN-REACT-PDF.md`](./docs/PLAN-REACT-PDF.md) — preview de currículo
- [`PLAN-BACKSTOP.md`](./docs/PLAN-BACKSTOP.md) — regressão visual
- [`PLAN-SIZE-LIMIT.md`](./docs/PLAN-SIZE-LIMIT.md) — orçamento de bundle
- [`CASE-STUDY-PLAN.md`](./docs/CASE-STUDY-PLAN.md) — tela de case study
