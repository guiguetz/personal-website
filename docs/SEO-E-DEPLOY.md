# SEO, analytics e deploy

## SEO

### `index.html`

Tags presentes no template:

- `lang="pt-BR"` (atualizado para `en` pelo i18n quando necessário).
- `title` e `meta name="description"`.
- **Open Graph**: `og:type`, `og:title`, `og:description`, `og:locale` (`pt_BR`),
  `og:url`, `og:image` (`/avatar.jpeg`).
- **Twitter Card**: `summary_large_image`, `twitter:title`, `twitter:description`,
  `twitter:image`.
- `link rel="canonical"` → `https://guilherme.digital/`.
- **hreflang**: `pt-BR` (`/`), `en` (`/?lang=en`) e `x-default`.
- `theme-color` (`#0b1120`), favicons.

> Observação: o parâmetro `?lang=en` está declarado no `hreflang`, mas o app lê o idioma de
> `localStorage` (chave `locale`), **não** da query string. O `hreflang` funciona como
> sinalização; o idioma padrão de um visitante novo é `pt`.

### `public/robots.txt`

Permite indexação e referencia o sitemap.

### `public/sitemap.xml`

Contém a URL raiz `https://guilherme.digital/` com `changefreq: monthly` e
`priority: 1.0`.

### Semântica

- Um único `<h1>` (hero), `<h2>` por seção (`SectionHeading`) e `<h3>` nos cards.
- Links/ícones com `aria-label` e elementos decorativos com `aria-hidden`.
- `aria-expanded` no toggle de experiência adicional.

## Analytics

- `@vercel/analytics` (`<Analytics />`) — page views.
- `@vercel/speed-insights` (`<SpeedInsights />`) — Web Vitals.

Ambos são renderizados no `App.tsx` e só têm efeito quando hospedados na Vercel.

## Deploy (Vercel)

- `vercel.json`:
  - `Cache-Control: public, max-age=31536000, immutable` para `/assets/(.*)`.
  - Rewrite de SPA: `/(.*)` → `/index.html` (as âncoras não precisam de rotas no servidor).
- Configure na Vercel as variáveis de ambiente:
  - `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_RECAPTCHA_SITE_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`, `RECAPTCHA_SECRET_KEY` (server-only)
- O domínio de produção é `https://guilherme.digital` (canonical/hreflang/sitemap).

### Passos de deploy

1. Garanta que as env vars estão configuradas no projeto da Vercel.
2. Faça push na branch conectada (a Vercel roda `npm run build`).
3. Após o deploy, valide:
   - página carrega com conteúdo no HTML (view-source);
   - `/api/contact` responde (teste de envio);
   - `https://guilherme.digital/sitemap.xml` e `/robots.txt` acessíveis;
   - Analytics/Speed Insights aparecem no painel da Vercel.

## Segurança

- Secrets de servidor nunca no bundle do cliente (sem prefixo `VITE_`).
- reCAPTCHA v3 com score mínimo e verificação de `action`.
- Para produção, considerar rate-limit/anti-spam adicional na rota de contato.
