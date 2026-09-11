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

test('home hero includes RTcash rotating title and constellation canvas', async () => {
  const html = await readFile('index.html', 'utf8');
  assert.match(html, /RTcash/);
  assert.match(html, /data-rotating-word/);
  assert.match(html, /data-constellation/);
  assert.match(html, /constellation-canvas/);
});

test('constellation animation is isolated to the home hero and uses red accents', async () => {
  const css = await readFile('assets/css/styles.css', 'utf8');
  const constellation = await readFile('assets/js/constellation.js', 'utf8');
  assert.match(css, /\.constellation-bg/);
  assert.match(constellation, /255, 61, 71/);
  assert.match(constellation, /prefers-reduced-motion/);
  assert.match(constellation, /data-constellation/);
  assert.match(constellation, /frame = requestAnimationFrame\(draw\)/);
  assert.match(constellation, /event\.clientX - rect\.left/);
  assert.match(constellation, /event\.clientY - rect\.top/);
});

test('rotating title script contains requested support words', async () => {
  const script = await readFile('assets/js/main.js', 'utf8');
  for (const word of ['seguridad', 'contabilidad', 'eficiencia', 'escalabilidad']) assert.ok(script.includes(word));
});

test('rotating title uses a typewriter sequence instead of swapping words', async () => {
  const script = await readFile('assets/js/main.js', 'utf8');
  assert.match(script, /charIndex/);
  assert.match(script, /deleting/);
  assert.match(script, /slice\(0, charIndex\)/);
  assert.match(script, /setTimeout\(tick/);
});

test('React migration source is available at the shadcn component path', async () => {
  const component = await readFile('components/ui/constellation-grid.tsx', 'utf8');
  assert.match(component, /'use client'/);
  assert.match(component, /export default function ConstellationGrid/);
  assert.match(component, /RTcash/);
  assert.match(component, /seguridad/);
  assert.match(component, /typedWord/);
  assert.match(component, /charIndex/);
});

test('README documents pull, commit and push', async () => {
  const readme = await readFile('README.md', 'utf8');
  for (const command of ['git pull origin main', 'git commit', 'git push origin main']) assert.ok(readme.includes(command));
});
