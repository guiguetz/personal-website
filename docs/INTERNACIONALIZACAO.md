# Internacionalização (i18n)

O projeto suporta **pt-BR** (padrão) e **inglês**. Não usa biblioteca externa — a
implementação é própria e fica em `src/i18n/`.

## Arquivos

- `src/i18n/translations.ts` — dicionários e títulos de página.
- `src/i18n/I18nContext.tsx` — provider, hook e animação de troca de idioma.

## Tipos e dicionários

```ts
export type Locale = 'pt' | 'en';
export type Dictionary = typeof pt;          // o dicionário pt define a forma
export const dictionaries: Record<Locale, Dictionary> = { pt, en };
export const pageTitles: Record<Locale, string> = { pt, en };
```

O objeto `pt` é a fonte de verdade do tipo `Dictionary`; o `en` é tipado como
`Dictionary`, então **adicionar uma chave só em `pt` gera erro de tipo** — o que garante
que os dois idiomas fiquem em sincronia.

Estrutura de chaves: `a11y`, `sidebar`, `nav`, `hero`, `about`, `impact`, `experience`,
`skills`, `caseStudy`, `contact`, `footer`. Alguns valores são funções de interpolação,
por exemplo `contact.resumePage(page, total)`.

## Provider (`I18nProvider`)

- Estado interno inicia **sempre em `'pt'`**, igual ao SSR. O idioma salvo em
  `localStorage` (chave `locale`) é aplicado logo após o mount — evita mismatch de
  renderização.
- `useEffect` atualiza `document.documentElement.lang` (`pt-BR` / `en`) e
  `document.title` (`pageTitles[locale]`).
- Expõe `{ locale, t, setLocale, toggleLocale }` via `useI18n()`.
- `useI18n` lança erro se usado fora do provider.

`toggleLocale` e `setLocale` chamam `playLocaleTextTransition()` antes de trocar o estado.

## Animação de troca de idioma

O objetivo é evitar um "flash" de texto trocando de forma seca. O mecanismo (em
`I18nContext.tsx`) é:

1. `beginLocaleSwitch()` adiciona a classe `locale-hidden` ao `<html>`. O CSS
   (`globals.css`) esconde **apenas elementos de texto folha** (`:not(:has(*))`, exceto
   `[aria-hidden]`), preservando layout/bordas/painéis.
2. `playTextExit()` cria overlays `<span>` posicionados sobre cada texto, copiando
   tipografia e cor, e anima cada um com a Web Animations API (fade-out + translateY).
   O overlay é anexado ao ancestral que recorta o conteúdo (`overflow` não visível) para
   não pintar por cima de outras áreas (ex.: rodapé da sidebar).
3. Após 200 ms, `finishLocaleSwitch()` dispara `animateTextEnter()` (fade-in subindo) e
   só então remove `locale-hidden`. A animação de entrada usa `fill: 'backwards'`, que
   segura o texto em opacidade 0, evitando qualquer flash entre as etapas.

Tudo é ignorado quando o usuário tem `prefers-reduced-motion: reduce`.

Constantes relevantes:

- `TEXT_TAGS` — seletores de tags de texto elegíveis.
- `isLeafTextElement` — ignora elementos com filhos, `aria-hidden` ou classes `animate-*`.
- `getClippingParent` — encontra o ancestral com overflow que recorta.

## Como adicionar um texto novo

1. Adicione a chave em `pt` **e** em `en` em `translations.ts`.
2. Use via `const { t } = useI18n()` no componente: `{t.minhaChave}`.
3. Para PLURAIS/interpolação, use funções no dicionário (padrão `resumePage`).

## Onde o idioma é trocado

No `Sidebar` (botão com a bandeira). O texto acessível vem de `t.a11y.switchLanguage`
(`'Mudar para inglês'` / `'Switch to Portuguese'`).

## Conteúdo de experiência em dois idiomas

Além do dicionário local, a `ExperienceSection` pode carregar os itens da tabela
`portfolio_experience` filtrando por `locale` (`'pt'`/`'en'`). Se não houver dados no
Supabase, usa `t.experience.items`. Ver [BACKEND-E-DADOS.md](./BACKEND-E-DADOS.md).
