---
type: server
title: API Routes (Nitro)
description: Camada servidor Nitro, rotas API, verificação reCAPTCHA v3 no servidor, integração Supabase para persistência de mensagens e variáveis de ambiente
tags: [nitro, server, api, recaptcha, supabase, backend]
verified:
  - by: openwiki/0.7.1
    at: 2026-10-08T17:41:36.140Z
sources:
  - id: openwiki-source-6fc5df70933c30333a43a0a5
    resource: repo://AI_RULES.md
  - id: openwiki-source-07fb4fbbdef934c92dca0299
    resource: repo://server/routes/api/contact.post.ts
  - id: openwiki-source-99d223e2816dd94bd3cbee17
    resource: repo://server/routes/api/hello.ts
generated: { by: "pi", at: "2026-10-08T17:41:36.140Z" }
---

# API Routes (Nitro)

## Visão geral

A camada servidor do projeto usa **Nitro** (integrado ao Vite via plugin) para expor rotas HTTP. Atualmente há duas rotas em `server/routes/api/`:

- `hello.ts` — rota de exemplo.
- `contact.post.ts` — POST `/api/contact` (verificação reCAPTCHA + insert no Supabase).

## Configuração

### vite.config.ts

O plugin `nitro()` é registrado como **último** entry na lista de plugins:

```ts
plugins: [dyadComponentTagger(), react(), nitro()]
```

**Importante:** deve ser o último para que seu SPA fallback não intercepte URLs internas do Vite (`/src/*.tsx`, `/@vite/client`, etc.).

### nitro.config.ts

Configuração mínima — define apenas o diretório do servidor:

```ts
import { defineConfig } from "nitro";
export default defineConfig({ serverDir: "./server" });
```

## Convenções de rotas

### Localização

```
server/routes/api/
├── hello.ts            # GET /api/hello
└── contact.post.ts     # POST /api/contact
```

### Método HTTP

Sufixo do arquivo: `contact.post.ts` → aceita apenas `POST`. Arquivo sem sufixo (`hello.ts`) → aceita qualquer método.

### Rota dinâmica

`[param].ts` → `/api/:param`. Parâmetros acessíveis via `getRouterParam(event, 'param')`.

### Imports

```ts
import { defineHandler } from "nitro";    // Handler definition
import { readBody, createError } from "h3"; // Helpers HTTP
```

> **Nota:** o projeto atual importa helpers de `"h3"` diretamente. Se preferir seguir a convenção oficial do Nitro v3, use `"nitro/h3"` — ambas funcionam.

### Helpers comuns (via `nitro/h3`)

| Helper | Uso |
| --- | --- |
| `readBody(event)` | Lê o body da requisição (JSON) |
| `readValidatedBody(event, schema)` | Lê e valida o body com schema |
| `getQuery(event)` | Query parameters |
| `getRouterParam(event, name)` | Parâmetro de rota |
| `createError({ statusCode, statusMessage })` | Erro HTTP |
| `setResponseStatus(event, code)` | Define status code |
| `getRequestHeaders(event)` | Headers da requisição |
| `setCookie(event, name, value)` | Define cookie |

### Runtime config

```ts
const config = useRuntimeConfig();
// Variáveis acessíveis: process.env.NITRO_* ou runtimeConfig em nitro.config.ts
```

## Rota de contato (`contact.post.ts`)

Fluxo completo da rota POST `/api/contact`:

```ts
export default defineHandler(async (event) => {
  const body = await readBody<{ name?: string; email?: string; message?: string; recaptchaToken?: string }>(event);
  // 1. Validação de campos obrigatórios
  // 2. Verificação do reCAPTCHA v3 com Google
  // 3. Persistência no Supabase
  // 4. Retorno de { success: true, result }
});
```

### 1. Validação de entrada

```ts
const { name, email, message, recaptchaToken } = body ?? {};
if (!name || !email || !message || !recaptchaToken) {
  throw createError({ statusCode: 400, statusMessage: 'Dados incompletos' });
}
```

### 2. Verificação reCAPTCHA v3

```ts
const secret = process.env.RECAPTCHA_SECRET_KEY;
const verification = await $fetch<{ success: boolean; score?: number; action?: string }>(
  'https://www.google.com/recaptcha/api/siteverify',
  { method: 'POST', body: new URLSearchParams({ secret, response: recaptchaToken }) },
);
const minimumScore = process.env.NODE_ENV !== 'production' ? 0.3 : 0.5;
if (!verification.success || (verification.score ?? 0) < minimumScore || verification.action !== 'contact') {
  throw createError({ statusCode: 403, statusMessage: 'Validação anti-spam recusada' });
}
```

- Score mínimo: 0.3 em dev, 0.5 em produção.
- Ação esperada: `'contact'` (deve bater com o action do client).

### 3. Persistência no Supabase

```ts
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
const result = await $fetch(`${supabaseUrl}/rest/v1/contact_messages`, {
  method: 'POST',
  headers: {
    apikey: supabaseKey,
    Authorization: `Bearer ${supabaseKey}`,
    'Content-Type': 'application/json',
    Prefer: 'return=representation',
  },
  body: { name, email, message },
});
```

- Usa `SUPABASE_SERVICE_ROLE_KEY` (bypassa RLS) quando disponível.
- Fallback para `VITE_SUPABASE_ANON_KEY` (depende da RLS policy de insert).
- Usa a API REST do Supabase diretamente (não o SDK `@supabase/supabase-js`).

### 4. Tratamento de erros

```ts
catch (error: unknown) {
  console.error('[contact] Supabase insert failed:', errorData ?? errorMessage ?? error);
  throw createError({ statusCode: 502, statusMessage: 'Não foi possível salvar a mensagem no Supabase' });
}
```

## Variáveis de ambiente do servidor

| Variável | Obrigatória | Descrição |
| --- | --- | --- |
| `RECAPTCHA_SECRET_KEY` | Sim | Secret key do reCAPTCHA v3 |
| `VITE_SUPABASE_URL` | Sim | URL do projeto Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Não | Bypassa RLS (recomendado) |
| `VITE_SUPABASE_ANON_KEY` | Fallback | Usada se service role não existir |

**Segurança:** variáveis sem prefixo `VITE_` nunca são incluídas no bundle do cliente.

## Erros comuns

| Erro | Causa | Correção |
| --- | --- | --- |
| `import { readBody } from "nitro"` | h3 helpers não estão em `"nitro"` | Importar de `"h3"` (ou `"nitro/h3"` se preferir a convenção Nitro v3) |
| `/api/*` retorna `index.html` | Plugin `nitro()` ausente ou na posição errada | Deve ser o último em `plugins[]` |
| Variáveis secretas expostas no client | Uso de `process.env.VITE_*` no server ou prefixo `VITE_` em segredos | Remover prefixo `VITE_` dos segredos |

## Ver também

- [Supabase e Banco de Dados](../database/supabase.md) — schema, RLS e seed
- [Fluxo do Formulário de Contato](../workflows/contact-form.md) — end-to-end
- [Guia de Desenvolvimento](../development/guide.md) — setup e variáveis de ambiente
