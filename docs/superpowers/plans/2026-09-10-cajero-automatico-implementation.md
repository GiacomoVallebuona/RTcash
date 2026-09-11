# Sitio de Cajero Automático Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Crear un sitio estático de cuatro páginas para una marca ficticia de cajeros, con navegación y guía de colaboración Git/GitHub.

**Architecture:** Cuatro HTML comparten encabezado, navegación y pie. Un CSS contiene los tokens rojo/negro y la respuesta móvil; un JavaScript añade el menú móvil, el año y el estado de enlace actual.

**Tech Stack:** HTML5, CSS3, JavaScript del navegador, `node --test`.

## Global Constraints

- Sin dependencias externas de JavaScript.
- Cuatro páginas: Inicio, Nosotros, Información y Producto.
- Paleta: `#090909`, `#151515`, `#E50914`, `#8D0007`, `#F4F1EB`, `#A6A6A6`.
- Titulares Space Mono y cuerpo DM Sans.
- Incluir foco visible, semántica HTML, menú móvil y `prefers-reduced-motion`.
- El contenido comercial es ficticio.

---

### Task 1: Páginas y prueba de navegación

**Files:**
- Create: `package.json`
- Create: `tests/site.test.mjs`
- Create: `index.html`, `nosotros.html`, `informacion.html`, `producto.html`

**Interfaces:** Cada `body` publica su nombre mediante `data-page`; cada documento enlaza las cuatro rutas.

- [ ] **Step 1: Write the failing test**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const pages = ['index.html', 'nosotros.html', 'informacion.html', 'producto.html'];
for (const page of pages) test(`${page} includes site navigation`, async () => {
  const html = await readFile(page, 'utf8');
  for (const href of pages) assert.match(html, new RegExp(`href="${href}"`));
  assert.match(html, /<main[\s>]/); assert.match(html, /data-page=/);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/site.test.mjs`  
Expected: FAIL because the HTML files do not exist.

- [ ] **Step 3: Write minimal implementation**

Create the four documents with semantic `header`, `nav`, `main` and `footer`, links to every page, and headings `Dinero en movimiento`, `Somos Pulso`, `Todo lo que necesitas saber` and `ATM PULSO X1`.

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/site.test.mjs`  
Expected: four passing tests.

- [ ] **Step 5: Commit**

Run: `git add package.json tests/site.test.mjs *.html && git commit -m "feat: add ATM site pages"`

### Task 2: Sistema visual responsive

**Files:**
- Modify: `tests/site.test.mjs`
- Create: `assets/css/styles.css`
- Modify: `index.html`, `nosotros.html`, `informacion.html`, `producto.html`

**Interfaces:** Las cuatro páginas cargan `assets/css/styles.css`; el CSS expone los tokens `--red` y `--ink`.

- [ ] **Step 1: Write the failing test**

```js
test('shared CSS includes tokens and responsive motion rules', async () => {
  const css = await readFile('assets/css/styles.css', 'utf8');
  for (const item of ['--red: #E50914', '--ink: #090909', '@media (max-width: 760px)', '@media (prefers-reduced-motion: reduce)']) assert.ok(css.includes(item));
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/site.test.mjs`  
Expected: FAIL because the stylesheet does not exist.

- [ ] **Step 3: Write minimal implementation**

Implement CSS variables, a twelve-column desktop composition, an ATM visual on Inicio, shared controls, focus styles, an adaptation below 760px and reduced-motion styles. Link the stylesheet from every page.

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/site.test.mjs`  
Expected: all tests pass.

- [ ] **Step 5: Commit**

Run: `git add assets/css/styles.css tests/site.test.mjs *.html && git commit -m "style: add red and black ATM visual system"`

### Task 3: Menú y guía de colaboración

**Files:**
- Modify: `tests/site.test.mjs`
- Create: `assets/js/main.js`, `.gitignore`, `README.md`
- Modify: `index.html`, `nosotros.html`, `informacion.html`, `producto.html`

**Interfaces:** `main.js` consume `data-menu-toggle`, `data-menu` y `[data-year]`; alterna `menu-open` y asigna `aria-current="page"`.

- [ ] **Step 1: Write the failing test**

```js
test('shared script supports menu and current navigation', async () => {
  const script = await readFile('assets/js/main.js', 'utf8');
  for (const item of ['data-menu-toggle', 'aria-current', 'menu-open']) assert.ok(script.includes(item));
});
test('README documents pull, commit and push', async () => {
  const readme = await readFile('README.md', 'utf8');
  for (const command of ['git pull origin main', 'git commit', 'git push origin main']) assert.ok(readme.includes(command));
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/site.test.mjs`  
Expected: FAIL because the script and README do not exist.

- [ ] **Step 3: Write minimal implementation**

Add menu controls and a year span to every page. Implement the menu, link state, year and reveal hooks in `main.js`, loaded with `defer`. Add a Spanish README with preview and the `pull`, `commit`, `push` workflow. Add a narrow `.gitignore` for editor and operating-system files.

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/site.test.mjs`  
Expected: all tests pass.

- [ ] **Step 5: Commit**

Run: `git add assets/js/main.js tests/site.test.mjs *.html .gitignore README.md && git commit -m "feat: add navigation and collaboration guide"`

### Task 4: Entrega verificable

**Files:** Verify all site files and `README.md`.

- [ ] **Step 1: Run the full suite**

Run: `node --test tests/site.test.mjs`  
Expected: zero failures.

- [ ] **Step 2: Run static design audits**

Run: `rg -ni "violet|purple|indigo|fuchsia|Inter|Roboto|Arial|Helvetica" *.html assets`  
Expected: no matches.

- [ ] **Step 3: Inspect Git state**

Run: `git status --short; git log --oneline --max-count=4`  
Expected: commits for documentation and site implementation.
