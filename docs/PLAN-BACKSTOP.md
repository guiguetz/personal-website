# Plano de implementação — Regressão visual com BackstopJS

## Objetivo
Detectar mudanças visuais não intencionais (especialmente quebras de layout responsivo) comparando screenshots do site em múltiplos viewports antes de cada deploy.

## Decisões
- Ferramenta: [`BackstopJS`](https://github.com/garris/BackstopJS) (usa Puppeteer/Chromium).
- Roda **localmente** (não entra no CI por enquanto — 1º passo é criar o hábito).
- Cenários testam o **build de produção** servido pelo `vite preview`, não o dev server (evita flakiness de HMR/overlay).
- Snapshots de referência versionados no git (`backstop_data/bitmaps_reference`).

## Etapas

1. **Instalar**
   ```bash
   npm i -D backstopjs
   ```
   (Baixa o Chromium do Puppeteer na primeira execução.)

2. **Criar `backstop.json`**
   - `url`: `http://localhost:4173` (porta do `vite preview`).
   - Viewports: `phone` (375×812), `tablet` (768×1024), `desktop` (1440×900).
   - Cenários:
     - `/` — página inteira (`scrollSelector: "body"`, captura full page por viewport).
     - Seções âncora: `/#contact`, `/#experience` (o site tem navegação por seções).
   - Estabilização contra animações (framer-motion + stagger):
     - `delay: 2000` (aguarda entrada das animações).
     - `hideSelectors`: `[".grecaptcha-badge"]` (badge do reCAPTCHA é assíncrona e muda de posição).
     - `readyEvent` se necessário.
   - `miscOptions`: `mismatchThreshold: 0.1` (tolerância para antialiasing de fonte).

3. **Scripts no `package.json`**
   ```json
   "test:visual:ref": "npm run build && concurrently -k \"vite preview\" \"backstop reference\"",
   "test:visual": "npm run build && concurrently -k \"vite preview\" \"backstop test\"",
   "test:visual:approve": "backstop approve"
   ```
   - `concurrently -k`: sobe o preview, roda o backstop e mata o servidor no fim. (Instalar `concurrently` como devDep, ou encadear com `&` + `wait`.)
   - Fluxo: mudou algo de visual de propósito → `test:visual` falha → revisar relatório → `test:visual:approve` vira nova referência.

4. **Git**
   - Commitar: `backstop.json`, `backstop_data/bitmaps_reference/`.
   - Ignorar: `backstop_data/bitmaps_test/`, `backstop_data/html_report/`.

5. **(Futuro) CI**
   - GitHub Action: build → preview em background → `backstop test` → falha o PR se houver mismatch não aprovado.

## Validação
- Rodar `test:visual:ref` numa baseline limpa, depois fazer uma mudança de estilo proposital e confirmar que `test:visual` pega o diff.
- Confirmar que animações não geram falso-positivo (rodar 2× seguidas sem mudanças → 0 mismatch).

## Riscos
- Falsos positivos por animação/fonte: ajustar `delay` e `mismatchThreshold` antes de apertar a regra.
- Tamanho do repo: referências PNG de 3 viewports somam MBs; avaliar Git LFS se crescer.
- `grecaptcha` só carrega quando a seção entra em viewport — esconder via `hideSelectors` resolve.
