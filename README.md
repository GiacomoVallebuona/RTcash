# CashPE

Sitio comercial responsive para CashPE, una solución de automatización de efectivo. La experiencia presenta el problema, los beneficios, el funcionamiento del producto y un formulario de cotización conectado a Supabase.

## Estructura

```text
.
├── index.html                 # Inicio y propuesta de valor
├── producto.html              # Flujo, capacidades y especificaciones
├── nosotros.html              # Propósito y proceso de trabajo
├── informacion.html           # Preguntas frecuentes y cotización
├── assets/
│   ├── css/styles.css         # Sistema visual y responsive
│   └── js/
│       ├── config.js          # Configuración pública de Supabase
│       ├── form-core.mjs      # Validación y armado de solicitudes
│       ├── main.js            # Navegación y animaciones
│       └── supabase-form.js   # Envío del formulario
├── tests/                     # Pruebas de contenido e integración
└── docs/superpowers/          # Especificación y plan de implementación
```

## Vista local

Desde la raíz del repositorio ejecuta:

```bash
python -m http.server 8000
```

Luego abre `http://localhost:8000`.

Para ejecutar todas las comprobaciones:

```bash
npm test
```

El comando de despliegue estático es `npm run build`. Genera `dist/` con las cuatro páginas y sus assets para que Vercel sirva exactamente el mismo contenido que se prueba localmente.

## Supabase

El formulario envía una petición `POST` al Data API. La URL pública, la clave anónima, el nombre de la tabla y el mapeo de columnas viven en `assets/js/config.js`.

La tabla debe tener RLS habilitado. El rol `anon` solo necesita `INSERT`; no debe recibir `SELECT`, `UPDATE` ni `DELETE`. La clave `service_role` nunca debe incluirse en archivos del frontend.

Columnas esperadas por la configuración actual:

- `name`
- `company`
- `email`
- `phone`
- `business_type`
- `cash_volume`
- `message`
- `source`

Si la tabla existente usa otros nombres, actualiza únicamente el objeto `columns` en `assets/js/config.js`.

## Despliegue en Vercel

El sitio es estático y Vercel utiliza la configuración versionada en `vercel.json`: ejecuta `npm run build` y publica `dist/`. En el proyecto de Vercel selecciona el repositorio `GiacomoVallebuona/RTcash`, la rama `main`, el preset **Other** y deja `Root Directory` como `./`. Si el proyecto conserva una configuración anterior, fuerza un nuevo deployment desde el último commit de `main`.

## Flujo de trabajo compartido

Cada colaborador debe actualizar su copia antes de editar:

```bash
git pull origin main
```

Después de probar los cambios:

```bash
git add .
git commit -m "describe tu cambio"
git push origin main
```

Si ambos cambian la misma línea, Git pedirá resolver el conflicto antes del commit. Los commits pequeños y descriptivos facilitan ese proceso tanto desde Git como desde Claude Code.
