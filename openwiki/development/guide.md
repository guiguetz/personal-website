---
type: development
title: Guia de Desenvolvimento
description: Convenções do projeto, scripts disponíveis, ESLint, size-limit, workflow de desenvolvimento, pitfalls conhecidos e boas práticas
tags: [development, workflow, scripts, eslint, size-limit, conventions]
verified:
  - by: openwiki/0.7.1
    at: 2026-10-08T17:41:36.140Z
sources:
  - id: openwiki-source-05033bb5a7c83698edab11a8
    resource: repo://docs/DESENVOLVIMENTO.md
  - id: openwiki-source-276795f6d5ad19adb078c64e
    resource: repo://eslint.config.js
  - id: openwiki-source-5b54a58d1b51cd490b0e7162
    resource: repo://package.json
generated: { by: "pi", at: "2026-10-08T17:41:36.140Z" }
---

# Guia de Desenvolvimento

## Pré-requisitos

- **Node.js** 20+ (recomendado 22).
- **npm** — o projeto usa `package-lock.json`. Não usar `pnpm` (existe `pnpm-workspace.yaml` legado).

## Setup inicial

```bash
npm install
cp .env.example .env   # preencha os valores
npm run dev            # http://localhost:8080
```

## Variáveis de ambiente

Modelo em `.env.example`:

| Variável | Escopo | Descrição |
| --- | --- | --- |
| `VITE_SUPABASE_URL` | cliente + servidor | URL do projeto Supabase |
| `VITE_SUPABASE_ANON_KEY` | cliente + servidor | Chave anônima do Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | **servidor** | Bypassa RLS na rota de contato. **Nunca** prefixar com `VITE_` |
| `VITE_RECAPTCHA_SITE_KEY` | cliente | Site key do reCAPTCHA v3 |
| `RECAPTCHA_SECRET_KEY` | **servidor** | Secret key da verificação reCAPTCHA |

**Comportamento sem variáveis:**

- O cliente Supabase fica `null` e a `ExperienceSection` usa o dicionário local.
- O formulário de contato falha com mensagem de erro (mas o site continua funcionando).

## Scripts disponíveis

| Script | Comando | Descrição |
| --- | --- | --- |
| `npm run dev` | `vite` | Servidor de desenvolvimento em http://localhost:8080 |
| `npm run build` | `vite build && tsc` | Build de produção (rolldown + type-check) |
| `npm run preview` | `vite preview --port 4173` | Preview local da build de produção |
| `npm run lint` | `eslint .` | Linting TypeScript/TSX |
| `npm run test:visual` | `build && preview && backstop test` | Teste de regressão visual (compara screenshots) |
| `npm run test:visual:ref` | `build && preview && backstop reference` | Gera screenshots de referência |
| `npm run test:visual:approve` | `backstop approve` | Aprova mudanças visuais (atualiza referências) |
| `npm run size` | `size-limit --json` | Verifica peso dos bundles com limites definidos |

## Configuração ESLint (`eslint.config.js`)

- **Base:** `@eslint/js` recommended + `typescript-eslint` recommended.
- **Arquivos:** `**/*.{ts,tsx}`.
- **Plugins:** `react-hooks` (regras recommended) e `react-refresh` (warn para exports não-componente).
- **Regra desabilitada:** `@typescript-eslint/no-unused-vars` (off).
- **Ignorado:** `dist/`.

## Size-limit (análise de bundle)

O `size-limit` verifica que os bundles do cliente não ultrapassem limites definidos no `package.json`. Garante que code-splitting por seção continue funcionando conforme novos componentes são adicionados.

## Fluxo de trabalho

1. Crie/edite componentes em `src/components/`. Novas seções usam `SectionHeading` + `useReveal`.
2. Textos novos: adicione em **`pt`** e **`en`** em `src/i18n/translations.ts`.
3. Rode `npm run lint` e `npm run dev` para validar.
4. Antes de publicar, rode `npm run build` (type-check) e `npm run size` (limites de bundle).

## Animação de entrada de seções

```tsx
const { ref, shown } = useReveal<HTMLDivElement>();

<div ref={ref} className={`reveal-children ${shown ? 'reveal-shown' : ''}`}>
  {/* filhos animam em cascata */}
</div>
```

- **Elemento próprio:** `reveal-self` + `reveal-shown`.
- **Expansão de altura:** `reveal-expand` + `reveal-shown`.

## Convenções de código

### Tailwind CSS

Usar Tailwind classes extensivamente para layout, spacing, cores e outros aspectos de design. Design tokens são definidos como CSS custom properties em `globals.css` e mapeados em `tailwind.config.ts`.

### shadcn/ui

Preferir componentes shadcn/ui já instalados. Os arquivos de UI primitive (`src/components/ui/`) não devem ser editados — criar novos componentes se customização for necessária.

### Lucide React

Usar `lucide-react` para ícones. O pacote já está instalado.

### Estrutura de componentes

- Componentes de página/página inteira → `src/components/`.
- Componentes de UI genéricos → `src/components/ui/`.
- Hooks customizados → `src/hooks/`.
- Utilidades → `src/lib/`.

## Pitfalls conhecidos

| Pitfall | Explicação |
| --- | --- |
| **Ordem dos plugins em `vite.config.ts`** | `nitro()` **deve** ser o último na lista de plugins. Se posicionado antes, o SPA fallback do Nitro intercepta URLs internas do Vite. |
| **Imports Nitro** | Helpers H3 vêm de `"nitro/h3"`, não de `"h3"` nem de `"nitro"` diretamente. |
| **SSR x cliente** | O locale inicia em `pt` para casar com o SSR. Não troque o valor inicial do `useState` do `I18nProvider` sem ajustar o prerender. |
| **`src/App.css` e `made-with-dyad.tsx`** | Legado do template Dyad. Não são usados no projeto. |
| **`components.json`** | Aponta para `src/index.css` (inexistente). O CSS real é `src/globals.css`. |
| **`framer-motion` e `recharts`** | Estão em `dependencies` mas não são importados. Podem ser removidos para reduzir bundle. |
| **Server imports no client** | Nunca importar pacotes usados em `server/` para dentro de `src/`. Isso expõe segredos e quebra o build. |

## Ver também

- [Visão Geral da Arquitetura](../architecture/overview.md) — stack e decisões de design
- [Renderização e Performance](../architecture/rendering.md) — SSG e code-splitting
- [Testes de Regressão Visual](../testing/visual-regression.md) — BackstopJS
- [API Routes (Nitro)](../server/api-routes.md) — camada servidor
