/**
 * Prerender (SSG): renderiza a App no servidor e injeta o HTML no index.html,
 * acelerando FCP/LCP drasticamente. Roda após o build (postbuild).
 */
import { rolldown } from 'rolldown';
import { renderToString } from 'react-dom/server';
import { readFileSync, writeFileSync, readdirSync, globSync, rmSync } from 'node:fs';
import path from 'node:path';

const marker = '<div id="root"></div>';
const outfile = '.prerender/entry-server.js';

async function run() {
  // 1. Empacota a entry SSR com rolldown (TSX + alias @/)
  await rolldown({
    input: 'src/entry-server.tsx',
    platform: 'node',
    resolve: { alias: { '@': path.resolve('src') }, extensions: ['.tsx', '.ts', '.jsx', '.js'] },
    external: [/css$/, 'react-pdf', 'react-pdf/**'],
    transform: { tsconfig: { jsx: 'react-jsx' } },
    inlineDynamicImports: true,
  }).then(async (bundle) => {
    await bundle.write({ dir: '.prerender', format: 'esm', entryFileNames: 'entry-server.js' });
    await bundle.close();
  });

  // 2. Renderiza
  const { render } = await import(path.resolve(outfile));
  const html = await render();
  if (!html || html.length < 100) throw new Error('Prerender produced empty HTML');

  const inject = (file) => {
    let content = readFileSync(file, 'utf8');
    // Funciona com marcador cru, escapado (template nitro) ou já injetado antes.
    const re = /(<div id="root">)[\s\S]*?(<\/div>\s*<\/body>)/;
    const reEsc = /(<div id=\\"root\\">)[\s\S]*?(<\/div>\\n  <\/body>)/;
    const escaped = html.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
    // Transforma o script de entrada em loader diferido (FCP primeiro).
    const escIdx = escaped.indexOf('<script type=\"module\"');
    let escHtml = escaped;
    if (escIdx !== -1) {
      const escTagEnd = escaped.indexOf('</script>', escIdx);
      const escTag = escaped.slice(escIdx, escTagEnd);
      const escSrc = escTag.match(/src=\\"([^\"]+)\\"/);
      const escCross = escTag.includes('crossorigin') ? "s.crossOrigin='';" : '';
      if (escSrc) {
        const escLoader = `<script>window.addEventListener('load',function(){setTimeout(function(){var s=document.createElement('script');s.type='module';${escCross}src='${escSrc[1]}';document.head.appendChild(s);},150);});</script>`;
        escHtml = escaped.slice(0, escIdx) + escLoader + escaped.slice(escTagEnd + 9);
      }
    }
    if (reEsc.test(content)) {
      content = content.replace(reEsc, (m, a, b) => a + escHtml + b);
    } else if (re.test(content)) {
      content = content.replace(re, (m, a, b) => a + html + b);
    } else return false;
    writeFileSync(file, content);
    return true;
  };

  let patched = false;
  try {
    const chunkDir = '.output/server/_chunks';
    for (const f of readdirSync(chunkDir)) {
      if (f.includes('renderer-template')) patched = inject(`${chunkDir}/${f}`) || patched;
    }
  } catch {}
  // Gera .output/public/index.html (deploys estáticos) a partir do template,
  // desescapando a string literal embutida.
  try {
    const tpl = readFileSync('.output/server/_chunks/renderer-template.mjs', 'utf8');
    const m = tpl.match(/HTTPResponse\("(.*?)", \{ headers/s);
    if (m) {
      const unescaped = JSON.parse(`"${m[1]}"`);
      // O script de entrada é injetado após o load: o conteúdo pré-renderizado
      // pinta primeiro (FCP), e o JS monta/hidrata logo em seguida.
      const idx = unescaped.indexOf('<script type="module"');
      let injected = unescaped;
      if (idx !== -1) {
        const tagEnd = unescaped.indexOf('</script>', idx);
        const tag = unescaped.slice(idx, tagEnd);
        const srcMatch = tag.match(/src="([^"]+)"/);
        const crossorigin = tag.includes('crossorigin') ? "s.crossOrigin='';" : '';
        const loader = `<script>window.addEventListener('load',function(){setTimeout(function(){var s=document.createElement('script');s.type='module';${crossorigin}src='${srcMatch ? srcMatch[1] : ''}';document.head.appendChild(s);},150);});</script>`;
        injected = unescaped.slice(0, idx) + loader + unescaped.slice(tagEnd + 9);
      }
      writeFileSync('.output/public/index.html', injected || unescaped);
      patched = true;
    }
  } catch (e) {
    console.warn('[prerender] could not write .output/public/index.html:', e?.message);
  }
  rmSync('.prerender', { recursive: true, force: true });
  console.log(`[prerender] injected ${html.length} bytes (patched: ${patched})`);
}

run().catch((err) => {
  console.error('[prerender] failed:', err);
  process.exit(1);
});