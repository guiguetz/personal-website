# Build e performance

## Scripts

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Vite dev server em `http://localhost:8080` (host `::`) |
| `npm run build` | `vite build` + `node scripts/prerender.mjs` (SSG) |
| `npm run build:dev` | Build em modo development |
| `npm run preview` | Serve o build de produção |
| `npm run size` | Build + verificação do orçamento de bundle |
| `npm run lint` | ESLint |
| `npm run test:visual:ref` | BackstopJS: gera referências |
| `npm run test:visual` | BackstopJS: compara com as referências |
| `npm run test:visual:approve` | Aprova novas referências |

## Vite

`vite.config.ts`:

- Plugins: `dyadComponentTagger()`, `react()` (SWC) e `nitro()` **por último**.
- `build.sourcemap: true`.
- `server.host: "::"`, `server.port: 8080`.
- Alias `@` → `./src`.

## Prerender / SSG (`scripts/prerender.mjs`)

Executado automaticamente no `npm run build`. Passos:

1. **Bundle SSR**: empacota `src/entry-server.tsx` com `rolldown`
   (`platform: 'node'`, alias `@`, `inlineDynamicImports: true`). CSS e `react-pdf*` são
   marcados como `external`.
2. **Render**: importa `render()` de `.prerender/entry-server.js`. O entry usa
   `renderToReadableStream` (React 19) e concatena o stream em uma string. Falha se o HTML
   resultante tiver menos de 100 caracteres.
3. **Injeção**: substitui o conteúdo de `<div id="root">…</div></body>` pelo HTML
   renderizado, tanto no template do Nitro
   (`.output/server/_chunks/renderer-template.mjs`) quanto em
   `.output/public/index.html` (versão desescapada).
4. **Loader diferido**: o `<script type="module">` de entrada é removido do HTML inicial e
   passa a ser injetado por um pequeno `<script>` que escuta o evento `load` e adiciona o
   módulo após ~150 ms. Assim o HTML pré-renderizado pinta antes, melhorando FCP/LCP.
5. Remove a pasta temporária `.prerender`.

O resultado é um `index.html` com conteúdo real no HTML (bom para SEO e primeira pintura) e
a aplicação montando logo em seguida no cliente.

## Code-splitting

Em `src/App.tsx`:

- `HeroSection` entra no bundle inicial.
- As demais seções (`AboutSection`, `ImpactSection`, `ExperienceSection`, `SkillsSection`,
  `CaseStudySection`, `ContactSection`, `Footer`) usam `React.lazy` + `<Suspense>`.
- Cada uma é envolta por `LazyMount`, que só monta o componente ao chegar perto do
  viewport (`rootMargin: 400px`).

Isso reduz o JavaScript crítico e adia o custo de seções fora da tela.

## Orçamento de bundle (`size-limit`)

Configurado no `package.json`:

```json
"size-limit": [
  { "name": "JS inicial (gzip)", "path": ".output/public/assets/index-*.js", "limit": "380 kB", "gzip": true },
  { "name": "CSS (gzip)", "path": ".output/public/assets/index-*.css", "limit": "30 kB", "gzip": true }
]
```

Rode `npm run size` para validar. O CI/PR deve falhar se o chunk inicial ultrapassar o
limite.

## Estrutura de build (`.output/`)

```
.output/
├── nitro.json
├── server/            # runtime Nitro (SSR/rotas) + template
└── public/            # assets estáticos + index.html pré-renderizado
    ├── index.html
    ├── assets/        # chunks JS/CSS com hash
    └── ...            # cópia de public/
```

`.output` está no `.gitignore`.

## Técnicas de performance aplicadas

- **SSG** com conteúdo no HTML inicial.
- **Loader diferido** do bundle de entrada.
- **Code-splitting** por seção + **LazyMount**.
- **Sparkline SVG** em vez de `recharts` (≈ −376 kB).
- **Animações CSS/WAAPI** em vez de `framer-motion`.
- **Fontes do sistema** com `font-feature-settings` (`Inter` quando disponível).
- **Scroll nativo** e reveal por `IntersectionObserver` (sem listeners de scroll).
- **Headers de cache imutável** para `/assets/*` (ver `vercel.json`).
- **Vercel Speed Insights** para monitorar Web Vitals em produção.
