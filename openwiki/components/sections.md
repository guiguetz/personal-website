---
type: component
title: Seções da Página
description: Cada seção do portfólio — Hero, About, Impact, Experience, Skills, CaseStudy, Contact e Footer — com responsabilidades, dados e padrões visuais
tags: [components, sections, portfolio, react, lazy-loading]
verified:
  - by: openwiki/0.7.1
    at: 2026-10-08T17:41:36.140Z
sources:
  - id: openwiki-source-54631e6ebf1d3b815c4a5eed
    resource: repo://src/App.tsx
  - id: openwiki-source-c59e06f81b087c7b629ebaad
    resource: repo://src/components/AboutSection.tsx
  - id: openwiki-source-bb522bd4f598d8772ab3af72
    resource: repo://src/components/CaseStudySection.tsx
  - id: openwiki-source-927f8f492de072ea09d27a01
    resource: repo://src/components/ContactSection.tsx
  - id: openwiki-source-9cceb54165ffc8b540d6f922
    resource: repo://src/components/ExperienceSection.tsx
  - id: openwiki-source-616cb05809696e2fb9feb393
    resource: repo://src/components/ImpactSection.tsx
  - id: openwiki-source-1685c01a8ebc254bce2a5af3
    resource: repo://src/components/SectionHeading.tsx
  - id: openwiki-source-9d67a2ef511e766a9c03b49e
    resource: repo://src/lib/supabase.ts
generated: { by: "pi", at: "2026-10-08T17:41:36.140Z" }
---

# Seções da Página

## Visão geral

O portfólio é composto por 8 seções renderizadas sequencialmente dentro de um `<Layout>`. Todas exceto `HeroSection` são carregadas via `React.lazy` e envolvidas por `LazyMount` para adiar download e montagem até se aproximarem do viewport.

```tsx
// src/App.tsx — composição das seções
<Layout>
  <HeroSection />                          {/* bundle inicial */}
  <Suspense fallback={null}>
    <LazyMount><AboutSection /></LazyMount>
    <LazyMount><ImpactSection /></LazyMount>
    <LazyMount><ExperienceSection /></LazyMount>
    <LazyMount><SkillsSection /></LazyMount>
    <LazyMount><CaseStudySection /></LazyMount>
    <LazyMount><ContactSection /></LazyMount>
    <LazyMount><Footer /></LazyMount>
  </Suspense>
</Layout>
```

## Padrão comum

Todas as seções compartilham um padrão consistente:

- **ID de âncora** — cada `<section>` recebe um `id` (`#about`, `#impact`, etc.) usado pela navegação lateral.
- **Heading padronizado** — `SectionHeading` renderiza o número sequencial, título e descrição.
- **Reveal animation** — `useReveal<T>()` observa a entrada no viewport via `IntersectionObserver` e aplica as classes CSS `reveal-children reveal-shown` ou `reveal-self reveal-shown`.
- **Internacionalização** — toda texto vem do dicionário `t` via `useI18n()`.
- **Painéis** — cards usam a classe CSS `panel` (e `panel-interactive` para hover).

## SectionHeading

Componente reutilizável que renderiza o cabeçalho de cada seção:

```tsx
interface SectionHeadingProps {
  number: string;      // "01", "02", etc.
  title: string;
  description?: string;
}
```

Renderiza o número em font-mono com cor primária, o título em negrito e uma linha gradiente decorativa à direita (visível em `sm:`).

---

## 1. HeroSection (`#hero`)

**Bundle:** inicial (estático, não lazy).

**Conteúdo:**
- Badge "Disponível para oportunidades" com ponto animado (ping).
- Título em duas linhas, a segunda com gradiente de cor (`text-gradient`).
- Parágrafo descritivo.
- Dois CTAs: "Baixar currículo" (link direto para `/guilherme-aguiar-cv.pdf`) e "Fale comigo" (âncora `#contact`).
- Três highlights com ícones (R$ 1,57 bi+, 900 mil+ usuários, 6 devs liderados).
- Marquee da stack tecnológico (React, TypeScript, Next.js, Node.js, etc.) — animação CSS pura.

**Dados:** todos do dicionário i18n (`t.hero`). Nenhuma chamada de API.

---

## 2. AboutSection (`#about`)

**Conteúdo:**
- Heading "01 — Sobre mim".
- Parágrafo com a trajetória profissional.
- Grid 2-colunas de "pilares" de especialização (Front-end, Arquitetura, Liderança, Mobile, Backend, Ferramentas).
- Cada pilar tem ícone do lucide-react, título e detalhe.

**Dados:** do dicionário (`t.about.pillars`). Os ícones são mapeados por índice no array `pillarIcons`.

---

## 3. ImpactSection (`#impact`)

**Conteúdo:**
- Heading "02 — Impacto".
- Grid 2-colunas de cards de métricas.
- Cada card mostra: ícone, label, valor numérico, nota descritiva e uma **sparkline em SVG puro**.

**Sparkline (SVG puro):**
O componente `Sparkline` substitui o `recharts` (~376 kB) por ~30 linhas de SVG:

```tsx
function Sparkline({ data, color, id }: { data: number[]; color: string; id: string }) {
  // Gera pontos SVG a partir dos dados, com gradiente de preenchimento
  // e polyline para a linha.
}
```

- Os dados das sparklines são estáticos (hardcoded em `metricVisuals`).
- Os 4 cards: crescimento de faturamento, base de usuários, devs liderados, tempo de rollout.

---

## 4. ExperienceSection (`#experience`)

**Conteúdo:**
- Heading "03 — Experiência".
- Timeline vertical com linha gradiente e dots.
- Cada entrada mostra: ano, empresa, cargo, período, localização, descrição e tags tecnológicas.
- O cargo atual (`current: true`) tem um dot animado (ping).
- Layout em grid com coluna de ano (visível em `sm:`).

**Dados:**
- Fallback local: array `companies` hardcoded no componente com empresa, ano e tags.
- Dados remotos: se o Supabase estiver configurado, busca de `portfolio_experience` via `supabase.from('portfolio_experience').select(...)`.
- Se dados remotos existirem, sobrescrevem o fallback (merge por spread: `{ ...fallback, ...exp }`).
- Suporta botão "Mostrar mais" para experiências adicionais.

---

## 5. SkillsSection (`#skills`)

**Conteúdo:**
- Heading "04 — Competências".
- Grid 2-colunas de cards por categoria.
- Cada card: ícone da categoria, header, destaque principal (com badge "PRIMÁRIO") e lista de skills secundárias em chips.
- Hover: glow de fundo (`bg-primary/10 blur-2xl`).

**Dados:** do dicionário (`t.skills.categories`). Ícones mapeados por índice em `categoryIcons` e `mainIcons`.

---

## 6. CaseStudySection (`#case-study`)

**Conteúdo:**
- Heading "05 — Projetos".
- Painel principal com ícone gradiente e headline.
- Grid 3-colunas com os 3 passos do case study: Problema, Solução, Resultado.
- Cada passo tem ícone colorido, label e texto descritivo.
- Stack tecnológico em chips na base.
- CTA para mais detalhes.

**Dados:** do dicionário (`t.caseStudy`). Stack hardcoded no componente.

---

## 7. ContactSection (`#contact`)

**Conteúdo:**
- Heading "06 — Contato".
- Grid 2-colunas: canais de contato + formulário.

**Canais:** email, WhatsApp, LinkedIn, GitHub — cada um com ícone, valor e link externo.

**Formulário:**
- Campos: nome, email, mensagem.
- Validação reCAPTCHA v3 (token gerado no submit).
- Loader do script reCAPTCHA é lazy (IntersectionObserver na seção).
- Feedback visual: estados `idle`, `success`, `error`.
- Toast para feedback.
- Download do CV embutido.

**Fluxo detalhado:** ver [Fluxo do Formulário de Contato](../workflows/contact-form.md).

---

## 8. Footer

**Conteúdo:**
- Texto "feito com..." (do dicionário `t.footer.builtWith`).
- Copyright com ano dinâmico.

**Dados:** do dicionário. Componente mais simples do projeto.

---

## Ver também

- [Layout, Sidebar e UI Components](./ui-and-layout.md) — estrutura que envolve as seções
- [Internacionalização](../i18n/system.md) — como os textos são gerenciados
- [Estilização e Tema](../styling/theme.md) — classes CSS de reveal, panels e animações
