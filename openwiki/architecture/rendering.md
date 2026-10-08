---
type: architecture
title: Renderização e Performance
description: Pipeline SSG com rolldown, code-splitting por seção, LazyMount com IntersectionObserver, loader diferido e otimizações de bundle
tags: [ssg, prerender, performance, code-splitting, lazy-loading, vite]
verified:
  - by: openwiki/0.7.1
    at: 2026-10-08T17:41:36.140Z
sources:
  - id: openwiki-source-c83a8d61677eda2bd5d4ea73
    resource: repo://scripts/prerender.mjs
  - id: openwiki-source-54631e6ebf1d3b815c4a5eed
    resource: repo://src/App.tsx
  - id: openwiki-source-616cb05809696e2fb9feb393
    resource: repo://src/components/ImpactSection.tsx
  - id: openwiki-source-def191459760da26ce179d1a
    resource: repo://src/components/LazyMount.tsx
  - id: openwiki-source-7467757629db411963ee5dee
    resource: repo://src/entry-server.tsx
  - id: openwiki-source-95bfccfd0c712f6e72040e0d
    resource: repo://src/main.tsx
generated: { by: "pi", at: "2026-10-08T17:41:36.140Z" }
---

# Renderização e Performance

## Visão geral

O portfólio usa uma estratégia de renderização em duas fases: **SSG no build** (o HTML completo é gerado uma única vez) e **montagem no cliente** (React monta sobre o HTML existente sem hidratação). Seções abaixo da dobra são carregadas sob demanda via `React.lazy` + `LazyMount`.

## Pipeline SSG (scripts/prerender.mjs)

O script de prerender roda como postbuild (chamado automaticamente por `npm run build`) e executa três etapas:

### 1. Bundle SSR com rolldown

```js
await rolldown({
  input: 'src/entry-server.tsx',
  platform: 'node',
  resolve: { alias: { '@': path.resolve('src') }, extensions: ['.tsx', '.ts', '.jsx', '.js'] },
  external: [/css$/, 'react-pdf', 'react-pdf/**'],
  transform: { tsconfig: { jsx: 'react-jsx' } },
  inlineDynamicImports: true,
})
```

- Empacota `src/entry-server.tsx` em `.prerender/entry-server.js` (formato ESM).
- CSS e `react-pdf` são externalizados (não precisam no bundle SSR).
- `inlineDynamicImports: true` colapsa todos os chunks em um único arquivo.

### 2. Renderização do HTML

```js
const { render } = await import(path.resolve(outfile));
const html = await render();
```

A entry `src/entry-server.tsx` usa `renderToReadableStream` do React 19 para gerar o HTML da árvore completa (incluindo todas as seções lazy, que são resolvidas no servidor).

### 3. Injeção no index.html

O HTML é injetado dentro de `<div id="root">...</div>` em dois alvos:

- **Template do Nitro** (`.output/server/_chunks/renderer-template.mjs`) — para SSR na Vercel
- **`.output/public/index.html`** — para deploy estático direto

Em ambos os casos, o `<script type="module">` original é **substituído** por um loader diferido:

```js
window.addEventListener('load', function() {
  setTimeout(function() {
    var s = document.createElement('script');
    s.type = 'module';
    s.src = '<bundle-url>';
    document.head.appendChild(s);
  }, 150);
});
```

**Efeito:** o conteúdo pré-renderizado pinta imediatamente (FCP/LCP), e o JavaScript do React é carregado e executado apenas após o evento `window.load` + 150ms.

## Montagem no cliente (createRoot)

```tsx
// src/main.tsx
createRoot(document.getElementById("root")!).render(<App />);
```

O projeto **não** usa `hydrateRoot`. A escolha é intencional:

- O SSR renderiza sempre com locale `pt` (fixo no servidor).
- O cliente pode ter locale `en` salvo em `localStorage`.
- `hydrateRoot` causaria mismatch de hidratação quando o locale salvo difere do renderizado no servidor.
- `createRoot` monta o React "do zero" sobre o HTML existente, sem validar correspondência.

**Trade-off:** o HTML pré-renderizado é descartado e recriado pelo React na montagem. Para um site de portfólio estático, isso é aceitável — o benefício do FCP instantâneo compensa.

## Code-splitting por seção (React.lazy)

```tsx
const AboutSection = lazy(() =>
  import("@/components/AboutSection").then((m) => ({ default: m.AboutSection })),
);
// ... igual para Impact, Experience, Skills, CaseStudy, Contact, Footer
```

- `HeroSection` é importada estaticamente (está no bundle inicial).
- Todas as outras seções são carregadas via `React.lazy`, gerando chunks separados no build.
- Isso reduz o bundle crítico da primeira renderização.

## LazyMount (IntersectionObserver)

`LazyMount` é um componente wrapper que só renderiza seus filhos quando o container se aproxima do viewport:

```tsx
export function LazyMount({ children, rootMargin = '400px 0px' }: { children: ReactNode; rootMargin?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (visible) return;
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible, rootMargin]);

  return <div ref={ref} style={{ minHeight: visible ? undefined : '1px' }}>{visible ? children : null}</div>;
}
```

**Comportamento:**

- Antes de entrar no viewport: renderiza um `<div>` vazio com `minHeight: 1px`.
- Quando a seção se aproxima (400px antes da borda): monta os filhos reais.
- Uma vez visível, nunca desmonta (`visible` é one-way).
- Fallback: se `IntersectionObserver` não existir (SSR ou browsers antigos), renderiza imediatamente.

**Efeito combinado com `React.lazy`:** o download do chunk da seção só acontece quando o usuário se aproxima dela, adiando tanto o download quanto a montagem.

## Otimizações de bundle

| Técnica | Impacto |
| --- | --- |
| SVG puro para sparklines (`ImpactSection`) | Elimina `recharts` (~376 kB) do bundle |
| CSS + IntersectionObserver em vez de framer-motion | Remove `framer-motion` (~60 kB) do runtime |
| `LazyMount` + `React.lazy` | Chunks das seções abaixo da dobra só carregam quando necessário |
| Loader diferido (150ms após load) | FCP/LCP do conteúdo SSG não compete com o JS bundle |
| `size-limit` no CI | Orçamento de bundle para detectar regressões |

## Orçamento de bundle

O projeto usa `size-limit` com `@size-limit/preset-app` para monitorar o tamanho do bundle. A configuração está em `package.json`:

```json
"size-limit": [{ "path": "dist/**/*.js", "limit": "200 kB" }]
```

Executar com `npm run size` após o build.

## Ver também

- [Visão Geral da Arquitetura](./overview.md) — stack e estrutura de diretórios
- [Deploy e SEO](../deployment/vercel.md) — como o build é implantado na Vercel
