# Backend e dados

## Camada Nitro

O projeto usa [Nitro](https://nitro.build/) como camada de servidor, integrada ao Vite:

- `nitro.config.ts` define `serverDir: "./server"`.
- `vite.config.ts` registra `nitro()` como **último** plugin — precisa rodar depois do
  middleware de transformação do Vite, caso contrário o fallback de SPA intercepta URLs
  internas (`/@vite/client`, `/src/*`, `/@fs/*`) e devolve `index.html`.

### Convenções de rota

- Arquivos em `server/routes/api/`.
- Rotas dinâmicas: `[param].ts`. Específicas por método: `hello.get.ts`, `hello.post.ts`.
- Runtime config via `useRuntimeConfig()` (variáveis com prefixo `NITRO_`).

### Imports — atenção

A convenção documentada em `AI_RULES.md` é:

- `defineHandler` e `useRuntimeConfig` de **`"nitro"`**.
- Helpers de request/response de **`"nitro/h3"`** (`readBody`, `createError`,
  `getQuery`, `setResponseStatus`, etc.).

> O `contact.post.ts` atual importa `readBody`/`createError` de `"h3"` diretamente e
> `$fetch` de `"ofetch"`. Funciona, mas foge da convenção. Ao criar novas rotas, use
> `"nitro/h3"` conforme `AI_RULES.md`.

## Rotas

### `GET /api/hello` (`server/routes/api/hello.ts`)
Rota de exemplo: retorna `{ message: "Hello Nitro!" }`.

### `POST /api/contact` (`server/routes/api/contact.post.ts`)

Fluxo:

```
Cliente (ContactSection)
  │  1. carrega reCAPTCHA v3 ao aproximar da seção / focar o form
  │  2. window.grecaptcha.execute(siteKey, { action: 'contact' })
  │  3. POST /api/contact { name, email, message, recaptchaToken }
  ▼
Nitro handler
  │  4. valida presença dos campos
  │  5. siteverify no Google com RECAPTCHA_SECRET_KEY
  │     - score mínimo: 0.5 em produção, 0.3 em dev
  │     - action deve ser 'contact'
  │  6. POST em {VITE_SUPABASE_URL}/rest/v1/contact_messages
  │     - apikey/Authorization: SUPABASE_SERVICE_ROLE_KEY (fallback anon)
  │     - Prefer: return=representation
  ▼
Resposta → { success: true, result }
```

Respostas de erro:

| Status | Motivo |
| --- | --- |
| 400 | Dados incompletos |
| 500 | Serviço não configurado (faltam secrets/env) |
| 403 | Falha na validação anti-spam (score/action) |
| 502 | Falha ao gravar no Supabase |

**Segurança:** a `SUPABASE_SERVICE_ROLE_KEY` e a `RECAPTCHA_SECRET_KEY` são lidas de
`process.env` **somente no servidor**. Nunca use prefixo `VITE_` nelas nem as importe em
`src/`, pois o bundle do cliente é público.

## Supabase

### Schema (`supabase/schema.sql`)

```sql
contact_messages (
  id uuid pk default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
)

portfolio_experience (
  id bigint identity pk,
  locale text not null check (locale in ('pt','en')),
  company text not null,
  year text not null,
  current boolean not null default false,
  position text not null,
  period text not null,
  location text not null,
  description text not null,
  tags text[] not null default '{}',
  sort_order integer not null default 0
)
```

RLS habilitado nas duas tabelas, com policies:

- `contact_messages`: INSERT público (`to anon`, `with check (true)`) — o formulário grava.
- `portfolio_experience`: SELECT público (`to anon`, `using (true)`).

> Como o `contact.post.ts` usa a service role, ele não depende da policy de INSERT; ela é
> necessária caso o cliente anon escreva diretamente. Recomendação do próprio schema:
> adicionar rate-limit/anti-spam (ex.: Edge Function) antes de expor publicamente.

### Seed (`supabase/seed.sql`)

Popula `portfolio_experience` com 6 experiências × 2 idiomas (`pt`/`en`). O script faz
`truncate ... restart identity` antes de inserir — **execute com cuidado** e revise o
conteúdo antes de publicar.

### Correções de policy

- `fix-contact-policy.sql` — adiciona `grant insert ... to anon` e recria a policy de
  INSERT (erro `42501 new row violates row-level security policy`).
- `fix-contact-policy-v2.sql` — versão que remove mismatch de role, concede acesso ao
  schema e cria a policy permissiva `"Allow anonymous contact inserts"`, além de um
  `select` de diagnóstico em `pg_policies`.

Execute esses arquivos no SQL Editor do Supabase quando necessário.

## Consumo no front

`src/lib/supabase.ts` cria o cliente com as variáveis `VITE_*`. A `ExperienceSection`
faz:

```ts
supabase
  .from('portfolio_experience')
  .select('company,year,current,position,period,location,description,tags')
  .eq('locale', locale)
  .order('sort_order')
```

Se não houver dados, mantém os itens do dicionário local.

## Variáveis de ambiente

| Variável | Onde é lida | Escopo |
| --- | --- | --- |
| `VITE_SUPABASE_URL` | `src/lib/supabase.ts`, `server/.../contact.post.ts` | cliente + servidor |
| `VITE_SUPABASE_ANON_KEY` | `src/lib/supabase.ts`, `server/.../contact.post.ts` | cliente + servidor |
| `SUPABASE_SERVICE_ROLE_KEY` | `server/.../contact.post.ts` | **servidor** |
| `VITE_RECAPTCHA_SITE_KEY` | `src/components/ContactSection.tsx` | cliente |
| `RECAPTCHA_SECRET_KEY` | `server/.../contact.post.ts` | **servidor** |

Ver também [DESENVOLVIMENTO.md](./DESENVOLVIMENTO.md).
