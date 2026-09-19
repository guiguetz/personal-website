# Documentação do projeto — guilherme.digital

Documentação técnica do portfólio pessoal de Guilherme Aguiar. O objetivo desta pasta é
registrar **como o projeto funciona hoje** (não apenas planos), servindo de referência para
manutenção e evolução.

> Produção: <https://guilherme.digital>

## Índice

| Documento | Conteúdo |
| --- | --- |
| [ARQUITETURA.md](./ARQUITETURA.md) | Visão geral, estrutura de diretórios, fluxo de dados e decisões técnicas |
| [COMPONENTES.md](./COMPONENTES.md) | Catálogo de componentes, hooks, libs e utilitários |
| [INTERNACIONALIZACAO.md](./INTERNACIONALIZACAO.md) | Sistema pt-BR/en e a animação de troca de idioma |
| [ESTILO-E-TEMA.md](./ESTILO-E-TEMA.md) | Tailwind, design tokens, tema claro/escuro, animações e utilitários CSS |
| [BACKEND-E-DADOS.md](./BACKEND-E-DADOS.md) | Camada Nitro, rota de contato, Supabase, RLS e seeds |
| [BUILD-E-PERFORMANCE.md](./BUILD-E-PERFORMANCE.md) | Build, prerender (SSG), code-splitting e orçamento de bundle |
| [QUALIDADE-E-TESTES.md](./QUALIDADE-E-TESTES.md) | ESLint, BackstopJS (regressão visual) e size-limit |
| [SEO-E-DEPLOY.md](./SEO-E-DEPLOY.md) | Meta tags, sitemap/robots, analytics e deploy na Vercel |
| [DESENVOLVIMENTO.md](./DESENVOLVIMENTO.md) | Setup local, variáveis de ambiente e fluxo de trabalho |

## Planos (ainda não implementados)

Os arquivos `PLAN-*.md` e `CASE-STUDY-PLAN.md` são **planos de trabalho**, não descrições do
estado atual. Em especial:

- [`PLAN-REACT-PDF.md`](./PLAN-REACT-PDF.md) — preview embutido do currículo com `react-pdf`.
  Hoje o currículo apenas é baixado ou aberto em nova aba; `react-pdf` **não** está instalado.
- [`PLAN-BACKSTOP.md`](./PLAN-BACKSTOP.md) — regressão visual (implementado; ver
  [QUALIDADE-E-TESTES.md](./QUALIDADE-E-TESTES.md)).
- [`PLAN-SIZE-LIMIT.md`](./PLAN-SIZE-LIMIT.md) — orçamento de bundle (implementado).
- [`CASE-STUDY-PLAN.md`](./CASE-STUDY-PLAN.md) — página dedicada de case study (planejada).

## Convenções gerais

- **Idioma da documentação e dos comentários:** português (pt-BR).
- **Alias de importação:** `@/` aponta para `src/` (configurado em `tsconfig.app.json` e
  `vite.config.ts`).
- **Componentes de UI:** biblioteca shadcn/ui em `src/components/ui/` — não editar esses
  arquivos; crie wrappers em `src/components/`.
