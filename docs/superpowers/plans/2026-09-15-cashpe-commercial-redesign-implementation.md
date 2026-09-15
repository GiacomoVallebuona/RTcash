# CashPE Commercial Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convertir el sitio estático existente en una experiencia comercial premium de CashPE y guardar solicitudes de cotización en la tabla existente de Supabase.

**Architecture:** Cuatro páginas HTML comparten una hoja de estilos, navegación y scripts. `config.js` publica únicamente la configuración pública de Supabase y los activos de Storage; `supabase-form.js` valida y envía el formulario a la tabla real. El contenido mantiene una secuencia problema → beneficio → solución → acción.

**Tech Stack:** HTML5, CSS3, JavaScript del navegador, Supabase Data API, Supabase Storage, Node.js test runner.

## Global Constraints

- Conservar cuatro páginas: `index.html`, `producto.html`, `nosotros.html`, `informacion.html`.
- Usar exclusivamente la fotografía del cajero, el logotipo y el imagotipo entregados en Supabase Storage.
- No exponer una clave `service_role`; solo la clave anónima pública.
- Permitir inserciones anónimas de solicitudes sin permitir lectura, edición ni eliminación anónima.
- Mantener WCAG AA, navegación por teclado, `prefers-reduced-motion` y respuesta móvil completa.
- Evitar precios, métricas de mercado e integraciones no verificadas.

---

### Task 1: Auditar y asegurar el destino de cotizaciones

**Files:**
- Inspect: Supabase project `mrikuclvirhoxcvhgant`
- Create if needed: `supabase/migrations/20260915_secure_existing_leads.sql`

**Interfaces:**
- Consumes: tabla existente para solicitudes comerciales.
- Produces: nombre de tabla y columnas que usará `window.CASHPE_CONFIG.leadsTable`.

- [ ] Inspectar tablas y columnas mediante el MCP de Supabase o introspección autorizada del proyecto.
- [ ] Verificar que la tabla esté expuesta al Data API y tenga RLS activado.
- [ ] Aplicar una política `FOR INSERT TO anon WITH CHECK (true)` si falta y confirmar que no exista una política pública de lectura.
- [ ] Ejecutar una inserción de prueba con un registro identificado por `source = 'cashpe-web-test'` cuando exista esa columna.
- [ ] Confirmar que una consulta anónima no devuelve registros.

### Task 2: Escribir pruebas de marca, contenido y formulario

**Files:**
- Modify: `tests/site.test.mjs`

**Interfaces:**
- Consumes: URLs de Storage y contrato de formulario.
- Produces: pruebas que fallan mientras permanezcan imágenes de PULSO o falte la integración.

- [ ] Añadir una prueba que lea las cuatro páginas y confirme el uso de `RT%20logotipo.png`, `RT%20cash%20PE%20imagotipo.png` y `cajero%20png.png`.
- [ ] Añadir una prueba que rechace referencias a `pulso-x1.svg`, `favicon.svg`, `PULSO X1` y `Pulso ATM` en las páginas.
- [ ] Añadir una prueba que confirme `data-quote-form`, estados accesibles y carga de `assets/js/supabase-form.js`.
- [ ] Añadir una prueba que confirme la URL del proyecto, la clave anónima y un nombre de tabla real en `config.js`.
- [ ] Ejecutar `node --test tests/site.test.mjs` y observar fallos por la implementación ausente.

### Task 3: Reescribir las cuatro páginas y el sistema visual

**Files:**
- Modify: `index.html`
- Modify: `producto.html`
- Modify: `nosotros.html`
- Modify: `informacion.html`
- Modify: `assets/css/styles.css`
- Modify: `assets/js/main.js`
- Modify: `assets/js/constellation.js`
- Modify: `assets/js/config.js`
- Modify: `docs/design-guideline.md`
- Modify: `docs/design-story.md`

**Interfaces:**
- Consumes: URLs de `window.CASHPE_CONFIG.assets`.
- Produces: navegación de cuatro páginas, CTAs hacia `informacion.html#cotizacion` y animaciones de revelado.

- [ ] Sustituir la marca visible por RT Cash PE y cargar el logotipo remoto como favicon.
- [ ] Reemplazar cada imagen del producto por la fotografía remota del cajero con texto alternativo específico.
- [ ] Reescribir Inicio con hero, cuatro problemas, cuatro pasos, beneficios, sectores y CTA.
- [ ] Reescribir Producto con ciclo del efectivo, reciclaje, ejemplo de cambio, componentes, seguridad y ficha técnica.
- [ ] Reescribir Nosotros con propósito, principios y posicionamiento prudente sobre integraciones.
- [ ] Reescribir Información con elegibilidad, preguntas, proceso comercial y formulario.
- [ ] Reorganizar CSS en tokens, layout, componentes, movimiento y media queries; mantener efectos solo con `transform` y `opacity`.
- [ ] Actualizar navegación, año, revelados, contadores y menú móvil en `main.js`.
- [ ] Actualizar las guías de diseño y narrativa con la marca CashPE.
- [ ] Ejecutar las pruebas y corregir hasta obtener cero fallos.

### Task 4: Implementar el formulario Supabase

**Files:**
- Create: `assets/js/supabase-form.js`
- Modify: `assets/js/config.js`
- Modify: `informacion.html`
- Modify: `tests/site.test.mjs`

**Interfaces:**
- Consumes: `window.CASHPE_CONFIG.supabaseUrl`, `anonKey`, `leadsTable` y columnas inspeccionadas.
- Produces: `POST /rest/v1/{leadsTable}` con una sola solicitud validada.

- [ ] Implementar validación de nombre, empresa, correo, teléfono, tipo de negocio y mensaje.
- [ ] Ignorar el envío cuando el campo trampa tenga contenido.
- [ ] Desactivar el botón y anunciar “Enviando solicitud…” durante la petición.
- [ ] Enviar `apikey`, `Authorization: Bearer`, `Content-Type: application/json` y `Prefer: return=minimal`.
- [ ] Mostrar confirmación y limpiar el formulario con HTTP 201; conservar datos y permitir reintentar ante error.
- [ ] Añadir pruebas unitarias para el mapeo de datos y la prevención de doble envío.
- [ ] Ejecutar `node --test tests/site.test.mjs` y confirmar cero fallos.

### Task 5: QA visual, accesibilidad y entrega

**Files:**
- Verify: all project files
- Modify: `README.md`

- [ ] Ejecutar `node --test tests/site.test.mjs`.
- [ ] Servir el proyecto en localhost y revisar las cuatro páginas a 1440×900 y 390×844.
- [ ] Verificar consola sin errores, enlaces, menú, foco, CTAs, imágenes y formulario.
- [ ] Ejecutar la inserción real de prueba y verificar el registro mediante Supabase.
- [ ] Actualizar README con configuración, tabla utilizada y flujo Git.
- [ ] Ejecutar `git diff --check` y revisar el diff completo.
- [ ] Crear un commit con el rediseño verificado.
