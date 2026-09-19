# Qualidade e testes

## ESLint

Configuração flat (`eslint.config.js`) com:

- `@eslint/js` recommended + `typescript-eslint` recommended.
- Plugins `eslint-plugin-react-hooks` e `eslint-plugin-react-refresh`.
- `react-refresh/only-export-components`: `warn` com `allowConstantExport: true`.
- `@typescript-eslint/no-unused-vars`: `off`.
- Ignora `dist`.

Rodar: `npm run lint`.

> Importante: o build **não** roda `tsc`; a checagem de tipos é feita pelo editor/ESLint.
> Não há script de `typecheck` dedicado.

## Regressão visual — BackstopJS

Ferramenta: [BackstopJS](https://github.com/garris/BackstopJS) com motor Puppeteer.

`backstop.json`:

- **Viewports:** `phone` (375×812), `tablet` (768×1024), `desktop` (1440×900).
- **Cenários:**
  - `home` → `http://localhost:4173/`
  - `contact` → `http://localhost:4173/#contact`
  - `experience` → `http://localhost:4173/#experience`
- `delay: 2500–3000` para aguardar animações de entrada.
- `hideSelectors: [".grecaptcha-badge"]` (badge assíncrono do reCAPTCHA).
- `misMatchThreshold: 0.1` (tolerância a antialiasing de fonte).
- `asyncCaptureLimit: 2`, `asyncCompareLimit: 10`.

Artefatos em `backstop_data/`:

- `bitmaps_reference/` — imagens de referência (versionadas no git).
- `bitmaps_test/`, `html_report/`, `ci_report/` — geradas (ignoradas no git).

### Fluxo

```bash
# 1) Cria/atualiza a linha de base (após revisar visualmente)
npm run test:visual:ref

# 2) Compara o estado atual com a referência
npm run test:visual

# 3) Se a mudança for intencional e aprovada
npm run test:visual:approve
```

Os scripts buildam o projeto e sobem o `vite preview` na porta `4173` com `wait-on` antes
de rodar o Backstop.

> BackstopJS roda **localmente** (não no CI, por ora). O objetivo é criar o hábito de
> validar layout responsivo antes do deploy.

## Orçamento de bundle — size-limit

Mede o gzip do chunk inicial e do CSS (ver [BUILD-E-PERFORMANCE.md](./BUILD-E-PERFORMANCE.md#orçamento-de-bundle-size-limit)).
Rode `npm run size`.

## Checklist manual antes de publicar

- [ ] `npm run lint` sem erros.
- [ ] `npm run build` conclui e o prerender injeta o HTML (`[prerender] injected …`).
- [ ] `npm run size` dentro dos limites.
- [ ] `npm run test:visual` sem regressões inesperadas (ou referências aprovadas).
- [ ] Formulário de contato envia com sucesso (reCAPTCHA + Supabase configurados).
- [ ] Troca de idioma e de tema funcionam e persistem.
- [ ] Navegação por âncoras e drawer mobile funcionam.
- [ ] `sitemap.xml`/`robots.txt` e meta tags conferem.
