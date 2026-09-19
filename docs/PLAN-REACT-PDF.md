# Plano de implementação — Preview de currículo com react-pdf

## Objetivo
Exibir o currículo (`public/Guilherme Aguiar.pdf`) como preview embutido na seção de contato (e/ou sidebar), com download, sem recarregar a página e sem carregar o pdf.js no bundle inicial.

## Decisões
- Biblioteca: [`react-pdf`](https://github.com/wojtekmaj/react-pdf) (wrapper do pdf.js).
- **Lazy load obrigatório**: pdf.js + worker são pesados (~1 MB). Só carrega quando o usuário abrir o preview (`React.lazy` + `Suspense`).
- Worker do pdf.js servido como asset do Vite via `?url` (sem CDN externo — funciona offline e evita issue de CORS/CSP).

## Etapas

1. **Organizar o asset**
   - Renomear `public/Guilherme Aguiar.pdf` → `public/guilherme-aguiar-cv.pdf` (URL sem espaço/acentuação).
   - Atualizar referências em `ContactSection.tsx`, `Sidebar.tsx` e `HeroSection.tsx` (procurar por `pdf`/`Download`).

2. **Instalar**
   ```bash
   npm i react-pdf
   ```

3. **Criar `src/components/CvPreviewDialog.tsx`**
   - Wrapper em `React.lazy` que só baixa o código ao abrir o Dialog (shadcn `dialog`).
   - Config do worker (uma vez, dentro do módulo lazy):
     ```ts
     import { Document, Page, pdfjs } from 'react-pdf';
     pdfjs.GlobalWorkerOptions.workerSrc = new URL(
       'pdfjs-dist/build/pdf.worker.min.mjs',
       import.meta.url,
     ).toString();
     ```
   - `<Document file="/guilherme-aguiar-cv.pdf" onLoadSuccess={...}>` + `<Page pageNumber={n} width={larguraContainer}>`.
   - Largura responsiva: medir o container com `ResizeObserver` e passar `width` (não usar CSS scale, o pdf.js renderiza no tamanho pedido).
   - Paginação: botões prev/next + "página X de Y" (`numPages` do `onLoadSuccess`).
   - `renderTextLayer` habilitado para permitir seleção de texto (acessibilidade).

4. **Integrar na UI**
   - `ContactSection.tsx`: o botão de download ganha um irmão "Ver currículo" que abre o dialog.
   - `Sidebar.tsx` (se houver link de CV): mesmo handler.
   - Botão primário continua sendo **download** (atributo `download`); preview é secundário.
   - Estados: skeleton enquanto carrega, mensagem de erro com fallback "Baixar PDF" (se pdf.js falhar, download ainda funciona).

5. **Acessibilidade**
   - Dialog com foco preso (shadcn já faz), `aria-label` nos botões de página, `Esc` fecha.
   - Alternativa textual: link direto para o PDF visível fora do dialog.

## Validação
- Preview abre no mobile (largura correta, sem scroll horizontal).
- Lighthouse: bundle inicial **não** aumenta (checar aba Network — chunk do pdf.js só carrega ao clicar).
- Testar em Chrome/Firefox/Safari (pdf.js varia entre browsers).
- Download continua funcionando com o novo nome de arquivo.

## Riscos
- `pdfjs-dist` + Vite: se o worker falhar com erro de módulo, fix conhecido é apontar `workerSrc` para o import `?url` explícito do `pdfjs-dist`.
- PDF com fonte não embarcada renderiza diferente — conferir visual.
