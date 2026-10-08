---
type: deployment
title: Deploy e SEO
description: Deploy na Vercel com SPA rewrite e cache imutável, meta tags, Open Graph, Twitter Card, hreflang, sitemap, robots.txt, analytics e Speed Insights
tags: [deployment, vercel, seo, analytics, performance]
verified:
  - by: openwiki/0.7.1
    at: 2026-10-08T17:41:36.140Z
sources:
  - id: openwiki-source-f8d10828394c4129061d5b0e
    resource: repo://index.html
  - id: openwiki-source-081155d46b331267578d3705
    resource: repo://public/sitemap.xml
  - id: openwiki-source-54631e6ebf1d3b815c4a5eed
    resource: repo://src/App.tsx
  - id: openwiki-source-55831e92f29f8b3e9d43f58b
    resource: repo://vercel.json
generated: { by: "pi", at: "2026-10-08T17:41:36.140Z" }
---

# Deploy e SEO

## Deploy na Vercel

O projeto é implantado na Vercel como um SPA estático (após o SSG prerender).

### vercel.json

```json
{
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ],
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

- **Cache imutável em assets** — todos os arquivos em `/assets/` (output do Vite com hash no filename) recebem `max-age=31536000, immutable`.
- **SPA fallback (rewrite)** — qualquer rota desconhecida redireciona para `/index.html`, necessário para uma SPA de página única que usa âncoras `#id` para navegação.

### Pipeline de build

```bash
npm run build
# 1. vite build → .output/ (bundle do cliente + camada Nitro)
# 2. node scripts/prerender.mjs → injeta HTML no index.html
```

## Meta tags e SEO (index.html)

O `index.html` contém todas as meta tags de SEO inseridas diretamente no `<head>`:

### Título e descrição

```html
<title>Guilherme Aguiar — Desenvolvedor Front-end / Mobile Sênior</title>
<meta name="description" content="Desenvolvedor Front-end / Mobile Sênior com mais de 10 anos de experiência em produtos financeiros e logísticos usados por milhões." />
```

### Open Graph

```html
<meta property="og:type" content="website" />
<meta property="og:title" content="Guilherme Aguiar — Front-end / Mobile Sênior" />
<meta property="og:description" content="Mais de 10 anos construindo produtos digitais usados por milhões de pessoas." />
<meta property="og:locale" content="pt_BR" />
<meta property="og:url" content="https://guilherme.digital/" />
<meta property="og:image" content="https://guilherme.digital/avatar.jpeg" />
```

### Twitter Card

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Guilherme Aguiar — Front-end / Mobile Sênior" />
<meta name="twitter:description" content="..." />
<meta name="twitter:image" content="https://guilherme.digital/avatar.jpeg" />
```

### hreflang (internacionalização)

```html
<link rel="alternate" hreflang="pt-BR" href="https://guilherme.digital/" />
<link rel="alternate" hreflang="en" href="https://guilherme.digital/?lang=en" />
<link rel="alternate" hreflang="x-default" href="https://guilherme.digital/" />
```

### Favicon e theme-color

```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<meta name="theme-color" content="#0b1120" />
```

## sitemap.xml (`public/sitemap.xml`)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://guilherme.digital/</loc><changefreq>monthly</changefreq><priority>1.0</priority></url>
</urlset>
```

- URL única (o site é uma SPA de página única).
- Frequência de atualização: mensal.

## robots.txt (`public/robots.txt`)

```
User-agent: *
Allow: /
Sitemap: https://guilherme.digital/sitemap.xml
```

## Analytics e Speed Insights

O `App.tsx` inclui os componentes de analytics da Vercel:

```tsx
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

// Renderizados no nível raiz, fora do Layout
<Analytics />
<SpeedInsights />
```

- **Analytics** — rastreamento de pageviews e eventos (sem configuração adicional necessária).
- **SpeedInsights** — coleta de Web Vitals (LCP, FID, CLS) reportados no dashboard da Vercel.

## Assets estáticos (`public/`)

| Arquivo | Finalidade |
| --- | --- |
| `avatar.jpeg` | Foto de perfil (usada no og:image e Twitter Card) |
| `favicon.svg` | Favicon vetorial |
| `favicon.ico` | Favicon legado (fallback) |
| `guilherme-aguiar-cv.pdf` | Currículo em PDF (download na sidebar e HeroSection) |
| `placeholder.svg` | Placeholder genérico |
| `robots.txt` | Diretrizes para crawlers |
| `sitemap.xml` | Sitemap para buscadores |

## Ver também

- [Renderização e Performance](../architecture/rendering.md) — pipeline SSG e loader diferido
- [Visão Geral da Arquitetura](../architecture/overview.md) — stack e estrutura de diretórios
- [Guia de Desenvolvimento](../development/guide.md) — scripts e comandos disponíveis
