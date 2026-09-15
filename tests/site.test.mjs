import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const pages = ['index.html', 'nosotros.html', 'informacion.html', 'producto.html'];
const atmUrl = 'https://mrikuclvirhoxcvhgant.supabase.co/storage/v1/object/public/Imagenes%20de%20la%20web/cajero%20png.png';
const logoUrl = 'https://mrikuclvirhoxcvhgant.supabase.co/storage/v1/object/public/Imagenes%20de%20la%20web/RT%20logotipo.png';
const imagotypeUrl = 'https://mrikuclvirhoxcvhgant.supabase.co/storage/v1/object/public/Imagenes%20de%20la%20web/RT%20cash%20PE%20imagotipo.png';

for (const page of pages) {
  test(`${page} has CashPE navigation, favicon and quote action`, async () => {
    const html = await readFile(page, 'utf8');
    for (const href of pages) assert.match(html, new RegExp(`href="${href}`));
    assert.match(html, /<main[\s>]/);
    assert.match(html, /data-page=/);
    assert.ok(html.includes(logoUrl));
    assert.match(html, /informacion\.html#cotizacion/);
    assert.doesNotMatch(html, /PULSO|pulso-x1/i);
  });
}

test('every product photograph uses the supplied Supabase image', async () => {
  const content = await Promise.all(pages.map((page) => readFile(page, 'utf8')));
  const html = content.join('\n');
  assert.ok(html.includes(atmUrl));
  assert.ok(html.includes(imagotypeUrl));
  assert.doesNotMatch(html, /assets\/images\/(?:pulso|atm|cajero)/i);
});

test('product imagery preserves its natural aspect ratio', async () => {
  const css = await readFile('assets/css/styles.css', 'utf8');
  assert.match(css, /\.hero-product>img[^}]*height:auto[^}]*object-fit:contain/);
  assert.match(css, /\.page-product>img[^}]*height:auto[^}]*object-fit:contain/);
});

test('shared CSS defines the approved premium system and responsive motion rules', async () => {
  const css = await readFile('assets/css/styles.css', 'utf8');
  for (const item of ['--red: #E21A22', '--ink: #080808', '--paper: #F4F0E8', '@media (max-width: 760px)', '@media (prefers-reduced-motion: reduce)', '.reveal', ':focus-visible']) {
    assert.ok(css.includes(item), `missing ${item}`);
  }
});

test('home page communicates problem, benefit, solution and action', async () => {
  const html = await readFile('index.html', 'utf8');
  for (const phrase of ['Menos efectivo expuesto', 'Valida cada billete', 'Recibe, valida, resguarda', 'Solicita una cotización']) assert.ok(html.includes(phrase), `missing ${phrase}`);
});

test('product page documents the real operating flow and supported denominations', async () => {
  const html = await readFile('producto.html', 'utf8');
  for (const phrase of ['Recibe', 'Valida', 'Resguarda', 'Entrega', 'S/ 0.50', 'S/ 200', '7 pulgadas', '500 a 1,000']) assert.ok(html.includes(phrase), `missing ${phrase}`);
});

test('information page exposes an accessible Supabase quote form', async () => {
  const html = await readFile('informacion.html', 'utf8');
  for (const item of ['data-quote-form', 'name="name"', 'name="company"', 'name="email"', 'name="phone"', 'name="business_type"', 'name="cash_volume"', 'name="message"', 'name="website"', 'role="status"', 'assets/js/supabase-form.js']) assert.ok(html.includes(item), `missing ${item}`);
});

test('public Supabase configuration is separated from submission logic', async () => {
  const config = await readFile('assets/js/config.js', 'utf8');
  const form = await readFile('assets/js/supabase-form.js', 'utf8');
  assert.match(config, /window\.CASHPE_CONFIG/);
  assert.match(config, /https:\/\/mrikuclvirhoxcvhgant\.supabase\.co/);
  assert.match(config, /leadsTable/);
  assert.doesNotMatch(config, /service_role/i);
  assert.match(form, /Prefer: 'return=minimal'/);
  assert.match(form, /data-quote-form/);
  assert.match(form, /AbortController/);
});

test('shared interaction script supports menu, active navigation and reveal animation', async () => {
  const script = await readFile('assets/js/main.js', 'utf8');
  for (const item of ['data-menu-toggle', 'aria-current', 'menu-open', 'IntersectionObserver', 'reducedMotion']) assert.ok(script.includes(item), `missing ${item}`);
});

test('README preserves the collaborator pull, commit and push workflow', async () => {
  const readme = await readFile('README.md', 'utf8');
  for (const command of ['git pull origin main', 'git commit', 'git push origin main']) assert.ok(readme.includes(command));
});
