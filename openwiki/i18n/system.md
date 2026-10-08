---
type: system
title: Internacionalização (i18n)
description: Sistema de i18n customizado com React Context, dicionários pt-BR/en, troca de idioma com animação de transição de texto e persistência em localStorage
tags: [i18n, internationalization, context, locale, animation]
verified:
  - by: openwiki/0.7.1
    at: 2026-10-08T17:41:36.140Z
sources:
  - id: openwiki-source-f8d10828394c4129061d5b0e
    resource: repo://index.html
  - id: openwiki-source-7134eb581509295a3074a917
    resource: repo://src/components/FlagIcons.tsx
  - id: openwiki-source-39d7142aae690fbba4ae35b5
    resource: repo://src/i18n/I18nContext.tsx
  - id: openwiki-source-0400e6ad3746e82a131d5687
    resource: repo://src/i18n/translations.ts
generated: { by: "pi", at: "2026-10-08T17:41:36.140Z" }
---

# Internacionalização (i18n)

## Visão geral

O projeto usa um sistema de i18n próprio (sem bibliotecas externas) baseado em React Context, com suporte a dois idiomas: **pt-BR** (`pt`) e **en**. A troca de idioma é animada com uma transição de texto que desliza para baixo (saída) e sobe (entrada).

## Arquitetura

```
src/i18n/
├── I18nContext.tsx    # Provider, hook, animações de transição
└── translations.ts   # Dicionários pt e en, type Dictionary
```

### Dicionários (`translations.ts`)

Define o tipo `Locale = 'pt' | 'en'` e dois objetos (`pt`, `en`) com chaves idênticas:

- `a11y` — rótulos de acessibilidade
- `sidebar` — cargo, tagline, localização, botão de download
- `nav` — nomes das seções da navegação
- `hero` — título, parágrafo, CTAs, highlights
- `about` — título, descrição, parágrafo, pilares
- `impact` — título, descrição, métricas (label, value, note)
- `experience` — título, descrição, itens (position, period, location, description)
- `skills` — título, descrição, categorias (category, main, items)
- `caseStudy` — título, descrição, headline, subtitle, steps
- `contact` — título, descrição, campos, canais
- `footer` — texto "feito com...", direitos

O dicionário `en` é uma tradução completa com o mesmo shape. O componente `ExperienceSection` pode usar dados do Supabase para substituir os dados hardcoded.

### Provider (`I18nContext.tsx`)

**Estado:**
- `locale` inicia como `'pt'` (fixo) para corresponder ao SSR e evitar mismatch.
- Em `useEffect`, lê o locale salvo em `localStorage` (chave `'locale'`) e atualiza se for `'en'`.

**API:**
```tsx
interface I18nValue {
  locale: Locale;              // 'pt' | 'en'
  t: Dictionary;               // dicionário atual
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;    // alterna pt ↔ en
}
```

**Hook:**
```tsx
const { locale, t, toggleLocale } = useI18n();
```

**Efeitos colaterais:**
- `document.documentElement.lang` é atualizado (`pt-BR` ou `en`).
- `document.title` é atualizado via `pageTitles[locale]`.

## Animação de transição de texto

Quando o idioma muda, o sistema executa uma animação em três fases:

### 1. Saída do texto antigo (`playTextExit`)

Para cada elemento de texto folha na página (selecionado por `TEXT_TAGS`):
- Cria um `<span>` overlay com o texto atual, posicionado exatamente sobre o elemento original.
- Anima o overlay deslizando para baixo (`translateY(28px)`) com fade-out (200ms, ease-in).
- Remove o overlay ao final da animação.
- Respeita `prefers-reduced-motion: reduce` (sem animação).
- Quando o drawer mobile está aberto, overlays fora do drawer são ignorados para evitar conflito de z-index.

### 2. Swap invisível (`beginLocaleSwitch`)

- Adiciona classe `locale-hidden` ao `<html>` (torna texto real invisível).
- Executa `playTextExit()`.
- Após 200ms (tempo da animação de saída), chama `finishLocaleSwitch`.

### 3. Entrada do novo texto (`finishLocaleSwitch`)

- Em `requestAnimationFrame`: inicia `animateTextEnter()` e remove `locale-hidden`.
- `animateTextEnter` aplica animação WAAPI (`opacity: 0 → 1`, `translateY(16px) → 0`) em cada elemento de texto folha (450ms, ease-out, 50ms de delay).
- O `fill: 'backwards'` garante que os elementos começam em opacity 0 antes da remoção da classe hidden.

### Detecção de elementos de texto

```ts
const TEXT_TAGS = 'p, span, h1, h2, h3, h4, h5, h6, a, li, label, strong, em, small, figcaption, code, dt, dd, blockquote, td, th';
```

`isLeafTextElement` verifica:
- Não tem filhos element (apenas texto).
- Não tem `aria-hidden`.
- Não tem classes de animação (`animate-`).
- Tem conteúdo de texto não-vazio.

### Containment de clipping

`getClippingParent` encontra o ancestral mais próximo com `overflow: hidden/auto/scroll/clip` (ex.: nav) e posiciona o overlay dentro dele, evitando que overlays "vazem" para fora de containers com overflow.

## Adicionando um novo idioma

1. Criar novo objeto no `translations.ts` com o mesmo shape de `pt`.
2. Adicionar o novo locale ao tipo `Locale`.
3. Adicionar ao objeto `dictionaries` e `pageTitles`.
4. Criar componente de bandeira em `FlagIcons.tsx`.
5. Adicionar opção no botão de troca da sidebar.
6. Adicionar `<link rel="alternate" hreflang="..." />` no `index.html`.

## Ver também

- [Seções da Página](../components/sections.md) — como cada seção usa `useI18n()`
- [Layout, Sidebar e UI Components](../components/ui-and-layout.md) — seletor de idioma na sidebar
- [Supabase e Banco de Dados](../database/supabase.md) — dados de experiência por locale
