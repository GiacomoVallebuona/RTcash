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

test('home page uses the new product-led hero without the removed risks block', async () => {
  const html = await readFile('index.html', 'utf8');
  assert.match(html, /data-home-shader/);
  assert.match(html, /Tu efectivo bajo control/);
  assert.doesNotMatch(html, /Riesgos que pueden afectar|Inseguridad ciudadana|Billetes y monedas falsas/);
});

test('about page introduces exactly three project members and the concise purpose', async () => {
  const html = await readFile('nosotros.html', 'utf8');
  assert.equal((html.match(/data-team-member/g) || []).length, 3);
  assert.match(html, /Nuestro propósito/);
  assert.match(html, /Buscamos facilitar la contabilidad, minimizar errores humanos, y proteger el efectivo de las empresas/);
  assert.match(html, />Contáctanos\s*<span/);
});

test('product page uses a compact product showcase instead of a landing-page flow', async () => {
  const html = await readFile('producto.html', 'utf8');
  assert.match(html, /product-showcase/);
  assert.match(html, /Conoce más sobre nuestros productos/);
  assert.match(html, /Lo esencial para tu operación/);
  assert.doesNotMatch(html, /Solicita una cotización <span|Conoce sus beneficios/);
  assert.doesNotMatch(html, /process-grid|specs-grid|example-section/);
});

test('home shader and product essentials use readable red-on-black and dark-on-light treatments', async () => {
  const css = await readFile('assets/css/styles.css', 'utf8');
  const shader = await readFile('assets/js/home-shader.js', 'utf8');
  assert.match(css, /\.home-shader/);
  assert.match(css, /\.product-essentials[^}]*color:#/);
  assert.match(shader, /canvas\.getContext\('webgl'/);
});

test('product page keeps the essential operating benefits visible', async () => {
  const html = await readFile('producto.html', 'utf8');
  for (const phrase of ['Recibe pagos', 'Valida al recibir', 'Resguarda el dinero', 'Entrega el cambio', 'Facilita el cierre']) assert.ok(html.includes(phrase), `missing ${phrase}`);
});

test('information page exposes an accessible Supabase quote form', async () => {
  const html = await readFile('informacion.html', 'utf8');
  for (const item of ['data-quote-form', 'name="name"', 'name="company"', 'name="email"', 'name="phone"', 'name="business_type"', 'name="cash_volume"', 'name="message"', 'name="website"', 'role="status"', 'assets/js/supabase-form.js']) assert.ok(html.includes(item), `missing ${item}`);
});

test('information page is focused on common questions and the quote form', async () => {
  const html = await readFile('informacion.html', 'utf8');
  assert.match(html, /Preguntas\s*<em>frecuentes/);
  assert.match(html, /id="cotizacion"/);
  assert.doesNotMatch(html, /BUEN ENCAJE|Lo que evaluamos|evaluation-grid/);
});

test('all pages provide a floating WhatsApp contact link', async () => {
  const script = await readFile('assets/js/main.js', 'utf8');
  const css = await readFile('assets/css/styles.css', 'utf8');
  assert.match(script, /https:\/\/wa\.me\/51922744688/);
  assert.match(script, /whatsapp-float/);
  assert.match(css, /\.whatsapp-float/);
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

test('hero styling keeps the ATM visible high in the initial viewport', async () => {
  const css = await readFile('assets/css/styles.css', 'utf8');
  assert.match(css, /\.hero-home \.hero-product\{[^}]*translateY\(-/);
});

test('README preserves the collaborator pull, commit and push workflow', async () => {
  const readme = await readFile('README.md', 'utf8');
  for (const command of ['git pull origin main', 'git commit', 'git push origin main']) assert.ok(readme.includes(command));
});

test('Vercel deployment has an explicit static build output', async () => {
  const packageJson = JSON.parse(await readFile('package.json', 'utf8'));
  const vercel = JSON.parse(await readFile('vercel.json', 'utf8'));
  assert.equal(packageJson.scripts.build, 'node scripts/build.mjs');
  assert.equal(vercel.outputDirectory, 'dist');
});
