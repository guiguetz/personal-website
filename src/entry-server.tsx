import { renderToReadableStream } from 'react-dom/server';
import App from './App';

export async function render(): Promise<string> {
  const stream = await renderToReadableStream(<App />);
  let html = '';
  const decoder = new TextDecoder();
  for await (const chunk of stream as unknown as AsyncIterable<Uint8Array>) {
    html += decoder.decode(chunk, { stream: true });
  }
  return html;
}