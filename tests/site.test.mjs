import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const pages = ['index.html', 'nosotros.html', 'informacion.html', 'producto.html'];

for (const page of pages) {
  test(`${page} includes site navigation`, async () => {
    const html = await readFile(page, 'utf8');
    for (const href of pages) assert.match(html, new RegExp(`href="${href}"`));
    assert.match(html, /<main[\s>]/);
    assert.match(html, /data-page=/);
  });
}
