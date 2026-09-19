# Estilo, tema e animações

## Tailwind

Configuração em `tailwind.config.ts`:

- `darkMode: ["class"]` — o tema escuro é o **padrão** (tokens em `:root`) e o claro é
  ativado pela classe `.light` no `<html>`.
- `content`: `./pages`, `./components`, `./app` e `./src/**/*.{ts,tsx}`.
- `prefix: ""`.
- Container centralizado com padding `2rem` e breakpoint `2xl` em `1400px`.
- Plugin `tailwindcss-animate`.

O PostCSS usa `postcss.config.js` com Tailwind + Autoprefixer. O CSS global é
`src/globals.css`, importado em `src/main.tsx`.

> ⚠️ `components.json` aponta `tailwind.css` para `src/index.css`, arquivo que **não
> existe** (o real é `src/globals.css`). É uma inconsistência do shadcn sem efeito em
> runtime — corrija se for regenerar componentes.

## Design tokens

Definidos como variáveis CSS (HSL sem `hsl()`) em `src/globals.css`:

- `:root` → tema **escuro** (padrão). Fundo `222 47% 5%`, primário `239 92% 75%`.
- `.light` → tema **claro**.

Tokens: `--background`, `--foreground`, `--card`, `--popover`, `--primary`,
`--secondary`, `--muted`, `--accent`, `--destructive`, `--border`, `--input`, `--ring`,
`--radius`.

No `tailwind.config.ts` esses tokens são mapeados para as classes utilitárias
(`bg-background`, `text-foreground`, `border-border`, etc.).

## Tema claro/escuro

Controlado por `useTheme` (ver [COMPONENTES.md](./COMPONENTES.md#hooks)):

- Padrão: escuro.
- Claro: adiciona `.light` ao `<html>`.
- Persistência: `localStorage.theme` = `'light'` | `'dark'`.
- Botão no `Sidebar` (`Sun`/`Moon`), com `aria-label` e `title` de `t.a11y.toggleTheme`.

## Utilitários CSS (`@layer components` / `utilities`)

| Classe | Função |
| --- | --- |
| `.panel` | Cartão com borda "hairline" desenhada via máscara de gradiente (`::after`) |
| `.panel-interactive` | Hover com elevação e anel em `primary` (`::before`) |
| `.glass` | Fundo translúcido com `backdrop-filter: blur(12px)` |
| `.text-gradient` | Texto com gradiente `foreground → primary` |
| `.bg-grid` | Grade fina de fundo (estilo home do Tailwind) |
| `.font-mono` | Força JetBrains Mono |
| `.reveal-*` | Animações de entrada por scroll (ver abaixo) |
| `.reveal-expand` | Expansão de altura via `grid-template-rows: 0fr → 1fr` |
| `.locale-hidden` | Esconde texto folha durante a troca de idioma |

## Animações

Keyframes definidos em `globals.css`:

- `fade-in-up` → `.animate-fade-in-up`
- `pulse-soft` → `.animate-pulse-soft`
- `marquee` → `.animate-marquee` (usado no marquee de stack do hero)

Reveal por scroll (substitui `framer-motion whileInView`):

- `.reveal-self` + `.reveal-shown` → elemento revela (fade + subir).
- `.reveal-children` + `.reveal-shown` → filhos revelam em cascata com `transition-delay`
  crescente (até o 10º filho).

Expansão (substitui `AnimatePresence` height auto):

- `.reveal-expand` + `.reveal-shown` (aplicado no botão "Experiência adicional").

## Acessibilidade e movimento

- Todo o bloco `@media (prefers-reduced-motion: reduce)` zera animações/transições e o
  `scroll-behavior: smooth`.
- A troca de idioma e as animações via JS checam `prefers-reduced-motion` antes de rodar.
- `section { scroll-margin-top: 6rem }` compensa a barra fixa mobile ao navegar por âncora.
- Foco visível no `Button` via `focus-visible:ring`.

## Badge do reCAPTCHA

O badge do reCAPTCHA v3 é ocultado por padrão e só aparece durante a interação com o
formulário, controlado por classes no `<body>`:

- `.grecaptcha-badge` (oculto)
- `body.recaptcha-visible` (visível, desliza para dentro)
- `body.recaptcha-exiting` (fica visível durante o fade de saída)

A `ContactSection` adiciona/remove essas classes via `IntersectionObserver` e no
foco/submit do formulário.
