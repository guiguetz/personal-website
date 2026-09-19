# Componentes, hooks e utilitários

Todo o código de UI fica em `src/components`. Seções da página ficam na raiz de
`src/components`; primitivos do shadcn/ui em `src/components/ui`.

## Seções da página

| Componente | Âncora | Responsabilidade |
| --- | --- | --- |
| `HeroSection` | `#hero` | Título, CTA de download do CV, CTA de contato, destaques, marquee de stack |
| `AboutSection` | `#about` | Parágrafo + grade de 6 pilares (`Code2`, `Layers`, `Users`, `Smartphone`, `Server`, `Wrench`) |
| `ImpactSection` | `#impact` | 4 métricas com sparkline SVG puro (`TrendingUp`, `Users`, `UserCog`, `Timer`) |
| `ExperienceSection` | `#experience` | Linha do tempo; tenta carregar dados do Supabase e cai no dicionário local |
| `SkillsSection` | `#skills` | 7 categorias, cada uma com uma skill "principal" destacada |
| `CaseStudySection` | `#case-study` | Case de IA generativa em 3 passos (Problema/Solução/Resultado) + stack |
| `ContactSection` | `#contact` | Canais de contato, formulário e integração com `/api/contact` |
| `Footer` | — | Assinatura e ano dinâmico |

Todas as seções (exceto `HeroSection`) usam `SectionHeading` e `useReveal` para animação de
entrada. Elas são carregadas por `React.lazy` no `App.tsx`.

## Componentes de layout e apoio

### `Layout`
Envolve a página: fundo decorativo (`bg-grid` + glows), `Sidebar`, `<main>` com largura
máxima e fades superior/inferior. Props: `children`.

### `Sidebar`
- **Desktop (≥ lg):** `aside` fixa de 72 (18rem) à esquerda.
- **Mobile:** barra superior fixa + drawer animado por CSS (sem `framer-motion`).
- Contém identidade (avatar/`AVATAR_URL`, nome, cargo, localização), navegação
  (`navItems`), links sociais, alternador de idioma, alternador de tema e botão de download.
- Controla o item ativo via `IntersectionObserver` com `rootMargin: '-45% 0px -50% 0px'`.
- Bloqueia o scroll do body enquanto o drawer mobile está aberto.
- Nota: o item de menu `projects` aponta para a seção `#case-study`.

### `SectionHeading`
Props `number`, `title`, `description?`. Renderiza o número monoespaçado, o `<h2>` e um
divisor em gradiente.

### `LazyMount`
Renderiza `children` apenas quando o container se aproxima do viewport
(`rootMargin` padrão `400px 0px`). Evita montar seções fora da tela. Props:
`children`, `rootMargin?`. Como o React.lazy já adia o download, o `LazyMount` adia a
**montagem** (efeitos, observers, etc.).

### `FlagIcons`
SVGs simplificados das bandeiras do Brasil (`FlagBR`) e dos EUA (`FlagUS`). Props:
`className?`.

### `made-with-dyad`
Componente de crédito do gerador Dyad. Existe no repositório mas **não é renderizado** no
`App.tsx`.

## Hooks

### `useTheme` (`src/hooks/useTheme.ts`)
- Tema padrão: **escuro**. Aplica a classe `light` no `<html>` quando o usuário escolhe claro.
- Persiste a preferência em `localStorage` na chave `theme` (`'light'` | `'dark'`).
- Retorna `{ isDark, toggleTheme }`.

### `useReveal` (`src/hooks/useReveal.ts`)
- `useReveal<T>(amount = 0.15)` → `{ ref, shown }`.
- Dispara uma vez quando o elemento entra no viewport (`IntersectionObserver`,
  `rootMargin: '0px 0px -40px 0px'`).
- As classes CSS (`reveal-self`, `reveal-children`, `reveal-shown`) fazem a animação; o hook
  só alterna o estado.

## Infra

### `src/lib/supabase.ts`
Cria o cliente Supabase a partir de `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`.
Exporta `supabase` (ou `null` se não configurado) e `isSupabaseConfigured`. O cliente é
usado em `ExperienceSection` para ler `portfolio_experience`.

### `src/lib/utils.ts`
`cn(...)` — combina `clsx` + `tailwind-merge` (padrão shadcn/ui).

### `src/utils/toast.ts`
Wrappers de `sonner`: `showSuccess`, `showError`, `showLoading`, `dismissToast`.
> Atualmente não são usados por nenhum componente (a `ContactSection` usa mensagens inline),
> mas permanecem disponíveis. O `<Toaster />` também não está montado no `App.tsx`.

## shadcn/ui (`src/components/ui`)

Presentes no repositório: `button`, `dialog`, `input`, `label`, `separator`, `sheet`,
`skeleton`, `toggle`. Apenas `button` é usado pelas seções; os demais são primitivos
disponíveis para evolução (ex.: o `dialog` seria usado pelo preview de CV planejado).

> Não edite arquivos em `ui/`; crie componentes derivados em `src/components/`.

## Componentes de página do template

`src/App.css` e `src/components/made-with-dyad.tsx` são resquícios do template Vite/Dyad.
O `App.css` **não é importado**.
