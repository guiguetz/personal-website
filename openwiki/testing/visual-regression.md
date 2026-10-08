---
type: testing
title: Testes de Regressão Visual
description: BackstopJS com Puppeteer para regressão visual — cenários, viewports, configuração, como gerar referências, comparar e aprovar mudanças
tags: [testing, visual-regression, backstopjs, puppeteer]
verified:
  - by: openwiki/0.7.1
    at: 2026-10-08T17:41:36.140Z
sources:
  - id: openwiki-source-b838c8e0cc9b913f7498d67a
    resource: repo://backstop.json
  - id: openwiki-source-48da52c2a9b18619f64451c0
    resource: repo://docs/PLAN-BACKSTOP.md
  - id: openwiki-source-5b54a58d1b51cd490b0e7162
    resource: repo://package.json
generated: { by: "pi", at: "2026-10-08T17:41:36.140Z" }
---

# Testes de Regressão Visual

## Visão geral

O projeto usa **BackstopJS** com **Puppeteer** para testes de regressão visual automatizados. Os testes capturam screenshots em múltiplas viewports e comparam com referências salvas.

## Configuração (`backstop.json`)

### Viewports

Três tamanhos de tela:

| Label | Width | Height | Device típico |
| --- | --- | --- | --- |
| `phone` | 375 | 812 | iPhone X/11/12 |
| `tablet` | 768 | 1024 | iPad |
| `desktop` | 1440 | 900 | Desktop widescreen |

### Cenários

| Cenário | URL | Delay | Threshold |
| --- | --- | --- | --- |
| `home` | `http://localhost:4173/` | 2500ms | 0.1% |
| `contact` | `http://localhost:4173/#contact` | 3000ms | 0.1% |
| `experience` | `http://localhost:4173/#experience` | 3000ms | 0.1% |

- O delay aguarda animações CSS (fade-in, reveal) e carregamento de fontes.
- O `misMatchThreshold` de 0.1% tolera diferenças mínimas de anti-aliasing.
- `.grecaptcha-badge` é ocultado em todos os cenários (`hideSelectors`).

### Paths

```
backstop_data/
├── bitmaps_reference/   # Screenshots de referência (committed)
├── bitmaps_test/        # Screenshots do teste atual (gitignored)
├── engine_scripts/      # Scripts Puppeteer (onReady, etc.)
├── html_report/         # Relatório HTML interativo
└── ci_report/           # Relatório para CI
```

### Engine options

```json
{
  "engine": "puppeteer",
  "engineOptions": { "args": ["--no-sandbox"] },
  "asyncCaptureLimit": 2,
  "asyncCompareLimit": 10,
  "report": ["browser"]
}
```

## Comandos

### Gerar referências

```bash
npm run test:visual:ref
```

Executa: `npm run build && vite preview --port 4173 && backstop reference`.

Gera screenshots de referência em `backstop_data/bitmaps_reference/`. Esses arquivos devem ser commitados.

### Executar testes

```bash
npm run test:visual
```

Executa: `npm run build && vite preview --port 4173 && backstop test`.

Compara screenshots atuais com as referências. Abre o relatório HTML no browser em caso de divergência.

### Aprovar mudanças

```bash
npm run test:visual:approve
```

Quando uma mudança visual é intencional: atualiza as referências com os screenshots atuais.

## Fluxo de trabalho

1. Desenvolver a feature.
2. Executar `npm run test:visual` para verificar se algo quebrou.
3. Se houver diferenças intencionais: `npm run test:visual:approve`.
4. Commitar as referências atualizadas em `backstop_data/bitmaps_reference/`.

## Dicas

- O delay de 2-3s é necessário para aguardar animações de reveal (`IntersectionObserver` + transições CSS).
- Para debugar um cenário específico, editar `backstop.json` e comentar os outros.
- Em CI, o `--no-sandbox` é necessário para Puppeteer em containers Linux.
- O relatório HTML mostra diff visual lado a lado com regiões destacadas em vermelho.

## Ver também

- [Guia de Desenvolvimento](../development/guide.md) — scripts e comandos
- [Estilização e Tema](../styling/theme.md) — animações que os testes capturam
