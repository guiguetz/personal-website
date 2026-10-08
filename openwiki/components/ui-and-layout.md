---
type: component
title: Layout, Sidebar e UI Components
description: Estrutura de layout com sidebar fixa, navegação por âncoras com IntersectionObserver, componentes shadcn/ui e ícones inline
tags: [layout, sidebar, shadcn, navigation, components]
verified:
  - by: openwiki/0.7.1
    at: 2026-10-08T17:41:36.140Z
sources:
  - id: openwiki-source-7134eb581509295a3074a917
    resource: repo://src/components/FlagIcons.tsx
  - id: openwiki-source-1b76538b580c92488b5842f3
    resource: repo://src/components/Layout.tsx
  - id: openwiki-source-3ebc5908ac6b484ea56fc63c
    resource: repo://src/components/Sidebar.tsx
  - id: openwiki-source-7d3296704b782eb684734580
    resource: repo://src/components/ui/button.tsx
  - id: openwiki-source-968a964669a73b7bdeb8bba3
    resource: repo://src/components/ui/sheet.tsx
generated: { by: "pi", at: "2026-10-08T17:41:36.140Z" }
---

# Layout, Sidebar e UI Components

## Layout (`src/components/Layout.tsx`)

O `Layout` é o shell estrutural que envolve todas as seções do portfólio:

```tsx
<div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
  {/* Grid + ambient glow backdrop (fixed, z-10) */}
  <Sidebar />
  <main className="lg:pl-72">
    <div className="mx-auto max-w-3xl px-6 pb-20 pt-16 sm:px-8 lg:px-12 lg:pt-16">
      {children}
    </div>
  </main>
  {/* Soft fade top/bottom edges */}
</div>
```

**Elementos:**
- **Backdrop decorativo** — grid com máscara radial + blobs de cor (primary, fuchsia, sky) com blur, todos fixos e `pointer-events-none`.
- **Sidebar** — fixa à esquerda no desktop (largura 72/288px), drawer no mobile.
- **Main** — conteúdo centralizado em `max-w-3xl` com padding responsivo, offset de 72px à esquerda no desktop.
- **Fade superior/inferior** — gradientes fixos que suavizam as bordas do conteúdo rolável.

## Sidebar (`src/components/Sidebar.tsx`)

A sidebar é o componente mais complexo do layout. Possui duas variantes: desktop (fixa) e mobile (drawer com overlay).

### SidebarContent

Componente interno compartilhado entre desktop e mobile:

**Identidade:**
- Avatar do LinkedIn com borda gradiente e badge de status (verde).
- Nome, cargo e tagline.

**Navegação:**
- 6 links de âncora: Sobre, Impacto, Experiência, Competências, Projetos, Contato.
- O link "Projetos" aponta para `#case-study`.
- Destaque do item ativo via `IntersectionObserver` com `rootMargin: '-45% 0px -50% 0px'` (detecta qual seção está no centro da viewport).

**Rodapé da sidebar:**
- Links sociais (GitHub, LinkedIn, Email, WhatsApp) em ícones.
- Botão de troca de idioma (bandeiras BR/EU inline em SVG).
- Botão de toggle tema (Sun/Moon).
- Botão "Baixar currículo" (link direto para o PDF).

### Detecção de seção ativa

```tsx
useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveId(entry.target.id);
      });
    },
    { rootMargin: '-45% 0px -50% 0px' },
  );
  ['about', 'impact', 'experience', 'skills', 'case-study', 'contact'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
  return () => observer.disconnect();
}, []);
```

### Mobile

- Top bar fixa com avatar, nome e botão hamburger.
- Drawer lateral com overlay escuro e `backdrop-blur`.
- `document.body.style.overflow = 'hidden'` enquanto o drawer está aberto.
- Swipe/scroll lock para prevenir scroll do body.

## Componentes shadcn/ui (`src/components/ui/`)

O projeto usa shadcn/ui (Radix UI + Tailwind) para componentes de UI primitivos:

| Arquivo | Componente | Uso principal |
| --- | --- | --- |
| `button.tsx` | `Button` | CTAs, links estilizados com variantes (default, outline, ghost, etc.) |
| `dialog.tsx` | `Dialog` | Modal genérico (Radix Dialog) |
| `input.tsx` | `Input` | Campo de texto do formulário de contato |
| `label.tsx` | `Label` | Rótulos de formulário |
| `separator.tsx` | `Separator` | Linha divisória |
| `sheet.tsx` | `Sheet` | Drawer lateral (usado na sidebar mobile) |
| `skeleton.tsx` | `Skeleton` | Placeholder de carregamento |
| `toggle.tsx` | `Toggle` | Botão de alternância |

**Convenção shadcn:** esses componentes são gerados pelo CLI do shadcn e não devem ser editados diretamente. Para customizar, criar novos componentes que os compõem.

## SectionHeading

Componente reutilizável para cabeçalhos de seção:

```tsx
interface SectionHeadingProps {
  number: string;      // "01", "02", etc.
  title: string;
  description?: string;
}
```

Renderiza número em `font-mono text-primary`, título em `text-2xl font-bold` e uma linha gradiente decorativa à direita (visível apenas em `sm:`).

## FlagIcons

Bandeiras inline em SVG para o seletor de idioma:
- `FlagBR` — bandeira do Brasil (verde, losango amarelo, círculo azul).
- `FlagUS` — bandeira dos EUA (listras vermelhas, cantão azul com estrelas).

Ambas recebem `className` opcional e usam `role="img"` com `aria-label` para acessibilidade.

## Ver também

- [Seções da Página](./sections.md) — cada seção do portfólio
- [Estilização e Tema](../styling/theme.md) — tokens CSS, animações e tema claro/escuro
- [Renderização e Performance](../architecture/rendering.md) — LazyMount e code-splitting
