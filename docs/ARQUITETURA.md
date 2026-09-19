# Arquitetura

## Visão geral

Site institucional/portfólio de uma página (`single page`) com âncoras de navegação,
renderizado estaticamente (SSG) e depois montado no cliente. Não há roteamento
(`react-router` não é usado): a navegação é feita por `#id` entre seções.

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

## Estrutura de diretórios

```
.
├── index.html                  # HTML base (meta tags, SEO) — template do SSG
├── vite.config.ts              # Vite + plugin Nitro + alias @
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
│   ├── fix-contact-policy.sql  # correções de policy
│   └── fix-contact-policy-v2.sql
│
├── public/                     # assets servidos na raiz
│   ├── avatar.jpeg
│   ├── guilherme-aguiar-cv.pdf
│   ├── favicon.svg / favicon.ico
│   ├── sitemap.xml
│   └── robots.txt
│
├── src/
│   ├── main.tsx                # entry do cliente (createRoot)
│   ├── entry-server.tsx        # entry usada pelo prerender (renderToReadableStream)
│   ├── App.tsx                 # composição das seções + analytics
│   ├── globals.css             # tokens, utilitários e animações
│   ├── App.css                 # CSS legado do template Vite (não importado)
│   ├── components/
│   │   ├── *Section.tsx        # seções da página
│   │   ├── Layout.tsx, Sidebar.tsx, Footer.tsx
│   │   ├── LazyMount.tsx, SectionHeading.tsx, FlagIcons.tsx
│   │   ├── made-with-dyad.tsx
│   │   └── ui/                 # shadcn/ui
│   ├── hooks/                  # useTheme.ts, useReveal.ts
│   ├── i18n/                   # I18nContext.tsx, translations.ts
│   ├── lib/                    # supabase.ts, utils.ts
│   └── utils/                  # toast.ts
│
├── docs/                       # esta documentação
├── .output/                    # build gerado (ignorado no git)
└── backstop_data/              # referências/relatórios do BackstopJS
```

## Fluxo de renderização (SSG + montagem no cliente)

1. `vite build` gera o build do cliente e a camada Nitro em `.output/`.
2. `scripts/prerender.mjs` (chamado no `npm run build`) empacota `src/entry-server.tsx`,
   renderiza a árvore com `renderToReadableStream` e injeta o HTML no `index.html`
   (e no template do Nitro).
3. O `<script type="module">` de entrada é substituído por um loader que só o injeta após o
   evento `load` (com ~150 ms de atraso). Assim o conteúdo pré-renderizado pinta primeiro
   (FCP/LCP) e o React monta por cima depois.
4. No cliente, `main.tsx` usa `createRoot(...).render(<App />)` — **não** há hidratação
   (`hydrateRoot`), evitando mismatch entre o HTML do SSR e o estado do cliente.

Detalhes do pipeline em [BUILD-E-PERFORMANCE.md](./BUILD-E-PERFORMANCE.md).

## Decisões técnicas

| Decisão | Motivo |
| --- | --- |
| SSG em vez de SSR por request | Site estático; melhor TTFB e custo zero de servidor para o HTML |
| `renderToReadableStream` no prerender | API de streaming do React 19, alinhada ao React atual |
| `createRoot` (sem hidratar) | O locale inicial difere entre SSR (`pt` fixo) e cliente (preferência salva); a montagem limpa evita mismatch |
| Sparkline em SVG puro (`ImpactSection`) | Substitui o `recharts` (≈ −376 kB no bundle) |
| Animações por CSS + `IntersectionObserver` | Substitui `whileInView`/`AnimatePresence` do `framer-motion`, removendo peso do bundle |
| `LazyMount` + `React.lazy` | Adia download e montagem das seções abaixo da dobra |
| Nitro para a API de contato | Mantém o segredo de reCAPTCHA/Supabase no servidor |

> Observação: `framer-motion` e `recharts` continuam em `dependencies`, mas **não são
> importados** em `src/` (aparecem apenas em comentários). Podem ser removidos do
> `package.json` em uma limpeza futura.

## Alias e TypeScript

- `@/*` → `src/*` (definido em `tsconfig.json`, `tsconfig.app.json` e `vite.config.ts`).
- `tsconfig.json` é um "solution" que referencia `tsconfig.app.json` (app) e
  `tsconfig.node.json` (config do Vite).
- O projeto usa `strict: false` (sem `strictNullChecks`/`noImplicitAny`).
