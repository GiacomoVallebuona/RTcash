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

test('shared CSS includes tokens and responsive motion rules', async () => {
  const css = await readFile('assets/css/styles.css', 'utf8');
  for (const item of ['--red: #E50914', '--ink: #090909', '@media (max-width: 760px)', '@media (prefers-reduced-motion: reduce)']) {
    assert.ok(css.includes(item));
  }
});

test('shared script supports menu and current navigation', async () => {
  const script = await readFile('assets/js/main.js', 'utf8');
  for (const item of ['data-menu-toggle', 'aria-current', 'menu-open']) assert.ok(script.includes(item));
});

test('README documents pull, commit and push', async () => {
  const readme = await readFile('README.md', 'utf8');
  for (const command of ['git pull origin main', 'git commit', 'git push origin main']) assert.ok(readme.includes(command));
});
