---
type: styling
title: Estilização e Tema
description: Tailwind CSS com design tokens HSL, tema claro/escuro persistente, animações CSS de reveal e scroll, panels com hairline glow e fontes customizadas
tags: [tailwind, css, theme, dark-mode, animations, design-tokens]
verified:
  - by: openwiki/0.7.1
    at: 2026-10-08T17:41:36.140Z
sources:
  - id: openwiki-source-62a400b9890b650e6b513f15
    resource: repo://src/globals.css
  - id: openwiki-source-cbe630169919ea20f9b06256
    resource: repo://src/hooks/useTheme.ts
  - id: openwiki-source-8da81a2fde84a0a26486d778
    resource: repo://tailwind.config.ts
generated: { by: "pi", at: "2026-10-08T17:41:36.140Z" }
---

# Estilização e Tema

## Stack de estilização

- **Tailwind CSS 3.4** como base utilitária.
- **CSS custom properties (HSL)** para tokens de design (cores, border-radius).
- **tailwindcss-animate** para animações utilitárias.
- **Inter** como fonte primária, **JetBrains Mono** para monospace.
- **Figma assets** importados via shadcn/ui.

## Design tokens (globals.css)

Todas as cores são definidas como CSS custom properties em HSL dentro de `@layer base`:

### Tema escuro (padrão — `:root`)

```css
:root {
  --background: 222 47% 5%;
  --foreground: 213 31% 91%;
  --card: 222 40% 8%;
  --primary: 239 92% 75%;
  --secondary: 217 33% 14%;
  --muted: 217 33% 14%;
  --muted-foreground: 215 20% 62%;
  --border: 217 33% 20%;
  --ring: 239 84% 67%;
  --radius: 0.75rem;
}
```

### Tema claro (`.light`)

```css
.light {
  --background: 210 40% 98%;
  --foreground: 222 47% 11%;
  --primary: 239 84% 60%;
  --card: 0 0% 100%;
  --border: 214 32% 88%;
  /* ... etc */
}
```

### Mapeamento para Tailwind

`tailwind.config.ts` mapeia cada variável para uma cor Tailwind:

```ts
colors: {
  background: "hsl(var(--background))",
  foreground: "hsl(var(--foreground))",
  primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
  // ...
}
```

## Tema claro/escuro (useTheme)

```tsx
// src/hooks/useTheme.ts
export function useTheme() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const dark = localStorage.getItem('theme') !== 'light';
    setIsDark(dark);
    if (!dark) document.documentElement.classList.add('light');
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('light');
    localStorage.setItem('theme', !isDark ? 'dark' : 'light');
  };

  return { isDark, toggleTheme };
}
```

- Padrão: escuro.
- Persistência: `localStorage` (chave `'theme'`).
- Toggle: adiciona/remove classe `.light` no `<html>`.

## Componente Panel

Painéis são cards com borda hairline gradiente:
- `.panel` — border-radius 1rem, fundo `(--card)`.
- `::after` — borda base (gradiente vertical de `border`).
- `::before` — borda de hover (gradiente de `primary`), opacity 0 por padrão.
- `.panel-interactive` — adiciona `translate-y-0.5` e `shadow` no hover.

## Animações CSS

### Reveal on scroll (substitui framer-motion)

```css
.reveal-self { opacity: 0; transform: translateY(16px); transition: ... }
.reveal-self.reveal-shown { opacity: 1; transform: none; }

.reveal-children > * { opacity: 0; transform: translateY(16px); transition: ... }
.reveal-children.reveal-shown > * { opacity: 1; transform: none; }
/* Delay escalonado: nth-child(1) 0.05s, (2) 0.12s, ... (10+) 0.68s */
```

Usado por `useReveal()` + `IntersectionObserver` para animar seções ao entrar no viewport.

### Outras animações

- `.animate-fade-in-up` — fade-in subindo (0.6s, hero).
- `.animate-pulse-soft` — pulse suave (2.5s).
- `.animate-marquee` — scroll horizontal contínuo (30s, stack marquee).
- `.reveal-expand` — expansão de altura via `grid-template-rows: 0fr → 1fr`.

### Acessibilidade

```css
@media (prefers-reduced-motion: reduce) {
  .reveal-self, .reveal-children > * { opacity: 1; transform: none; transition: none; }
  /* Global: todas as animações e transições são reduzidas a 0.001ms */
}
```

## Tipografia

```css
body {
  font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
  font-feature-settings: 'cv02', 'cv03', 'cv04', 'ss01';
}
.font-mono { font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, monospace; }
```

## Recaptcha badge

O badge do reCAPTCHA v3 é oculto por padrão (`.grecaptcha-badge { visibility: hidden }`) e só aparece quando o body tem `.recaptcha-visible` (adicionado por `ContactSection` quando a seção entra no viewport).

## Grid backdrop

```css
.bg-grid {
  background-image:
    linear-gradient(to right, hsl(var(--border) / 0.5) 1px, transparent 1px),
    linear-gradient(to bottom, hsl(var(--border) / 0.5) 1px, transparent 1px);
  background-size: 3.5rem 3.5rem;
}
```

Usado no backdrop fixo do `Layout`.

## Ver também

- [Layout, Sidebar e UI Components](../components/ui-and-layout.md) — estrutura visual
- [Renderização e Performance](../architecture/rendering.md) — lista do que foi removido
