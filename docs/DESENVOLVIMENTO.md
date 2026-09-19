# Desenvolvimento

## Pré-requisitos

- Node.js 20+ (recomendado 22).
- npm (o projeto usa `package-lock.json`; não use `pnpm`, apesar de existir um
  `pnpm-workspace.yaml` legado).

## Setup

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
| `VITE_SUPABASE_ANON_KEY` | cliente + servidor | Chave anônima |
| `SUPABASE_SERVICE_ROLE_KEY` | **servidor** | Bypassa RLS na rota de contato. Nunca prefixar com `VITE_` |
| `VITE_RECAPTCHA_SITE_KEY` | cliente | Site key do reCAPTCHA v3 |
| `RECAPTCHA_SECRET_KEY` | **servidor** | Secret key da verificação |

Sem essas variáveis:

- O cliente Supabase fica `null` e a `ExperienceSection` usa o dicionário local.
- O formulário de contato falha com mensagem de erro (mas o site continua funcionando).

## Fluxo de trabalho

1. Crie/edite componentes em `src/components` (novas seções usam `SectionHeading` +
   `useReveal`).
2. Textos novos: adicione em `pt` e `en` em `src/i18n/translations.ts`.
3. Rode `npm run lint` e `npm run dev` para validar.
4. Antes de publicar, siga o checklist em
   [QUALIDADE-E-TESTES.md](./QUALIDADE-E-TESTES.md#checklist-manual-antes-de-publicar).

## Animação de entrada de uma seção

```tsx
const { ref, shown } = useReveal<HTMLDivElement>();

<div ref={ref} className={`reveal-children ${shown ? 'reveal-shown' : ''}`}>
  {/* filhos animam em cascata */}
</div>
```

Para o próprio elemento: `reveal-self` + `reveal-shown`. Para expansão de altura:
`reveal-expand` + `reveal-shown`.

## Pitfalls conhecidos

- **Ordem dos plugins no `vite.config.ts`:** `nitro()` deve ser o último.
- **Imports Nitro:** helpers H3 vêm de `"nitro/h3"` (a convenção em `AI_RULES.md`).
  O `contact.post.ts` atual usa `"h3"` diretamente — não copie esse padrão em rotas novas.
- **SSR x cliente:** o locale inicia em `pt` para casar com o SSR; não troque o valor
  inicial do `useState` do `I18nProvider` sem ajustar o prerender.
- **`src/App.css` e `made-with-dyad.tsx`** são legado do template e não são usados.
- **`components.json`** aponta para `src/index.css` (inexistente); o CSS real é
  `src/globals.css`.
- **`framer-motion` e `recharts`** estão em `dependencies` mas não são importados.

## Documentos relacionados

- [ARQUITETURA.md](./ARQUITETURA.md)
- [BUILD-E-PERFORMANCE.md](./BUILD-E-PERFORMANCE.md)
- [BACKEND-E-DADOS.md](./BACKEND-E-DADOS.md)
- [QUALIDADE-E-TESTES.md](./QUALIDADE-E-TESTES.md)
