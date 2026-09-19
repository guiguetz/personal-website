# Plano de implementação — Orçamento de bundle com size-limit

## Objetivo
Travar um orçamento (budget) para o tamanho do JS inicial do site e falhar o build/PR quando ele estourar — evita que shadcn + recharts + framer-motion cresçam sem controle.

## Decisões
- Ferramenta: [`size-limit`](https://github.com/ai/size-limit) com preset **app** (mede gzip/brotli do que carrega na primeira pintura).
- Mede o **output do Vite** (`dist/assets/*.js`) — não precisa de integração com o bundler.
- Foco no **chunk inicial** (o que o `index.html` carrega), não no total — o projeto já tem code-splitting de rotas/chunks pesados.

## Etapas

0. **Pré-requisito: limpar lockfiles duplicados**
   - O repo tem `pnpm-lock.yaml` **e** `package-lock.json`. Escolher npm (é o que gerou o `node_modules` atual) e remover `pnpm-lock.yaml` (e `pnpm-workspace.yaml` se não for usado) para não dividir a fonte da verdade.

1. **Instalar**
   ```bash
   npm i -D size-limit @size-limit/preset-app
   ```

2. **Medir a baseline**
   ```bash
   npm run build && npx size-limit --why
   ```
   - Anotar o gzip do JS inicial (checar no `dist/index.html` quais chunks são `type="module"` sem `async` — esses são o inicial).
   - Se o inicial já estiver gordo demais, primeira tarefa vira **code-splitting**: `React.lazy` em `recharts` (`chart.tsx` do shadcn), `react-day-picker` (`calendar.tsx`) e `input-otp` — componentes que o portfólio provavelmente nem usa.

3. **Configurar no `package.json`**
   ```json
   "size-limit": [
     {
       "name": "JS inicial (gzip)",
       "path": "dist/assets/index-*.js",
       "limit": "150 kB",
       "gzip": true
     },
     {
       "name": "CSS (gzip)",
       "path": "dist/assets/index-*.css",
       "limit": "40 kB",
       "gzip": true
     }
   ]
   ```
   - Ajustar limites = baseline + ~20% de folga. O objetivo é **prevenir regressão**, não punir features novas (aí se abre PR subindo o limite com justificativa).

4. **Script e CI**
   ```json
   "size": "vite build && size-limit"
   ```
   - Local: rodar `npm run size` antes de commit grande.
   - CI (GitHub Actions): job que roda `npm run size` em cada PR e falha se estourar. Exemplo mínimo:
     ```yaml
     - run: npm ci
     - run: npm run size
     ```

5. **(Opcional) Comentário automático no PR**
   - Action `andresz1/size-limit-action` posta o tamanho e o delta no PR.

## Validação
- `npm run size` verde na baseline.
- Simular estouro: importar uma lib pesada no topo de `App.tsx` → `size-limit` deve falhar apontando o excesso.
- Confirmar que chunks lazy (pdf.js do outro plano) **não** contam no budget inicial.

## Riscos
- Glob do path: nome dos assets do Vite tem hash (`index-Db3x1a.js`); usar `index-*.js` e revisar se o Vite não gera outro chunk síncrono (checar `dist/index.html`).
- Se houver mais de um entry chunk síncrono, adicionar entradas no array do size-limit para cada um.
