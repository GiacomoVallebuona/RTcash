# Pulso ATM

Sitio de demostración para una marca ficticia de cajeros automáticos. Está creado con HTML, CSS y JavaScript, sin dependencias de ejecución.

La navegación presenta Inicio, Nuestro producto, Nosotros e Información. El diseño incluye una ilustración SVG local del X1, un explorador interactivo de sus cuatro componentes, preguntas frecuentes y una guía flotante con respuestas automáticas.

La portada incorpora una constelación interactiva de puntos rojos y un título RTcash con las palabras seguridad, contabilidad, eficiencia y escalabilidad rotando. El efecto está implementado en JavaScript nativo porque este repositorio no usa React, Tailwind ni TypeScript. Las instrucciones para una futura migración del componente a shadcn están en `docs/react-constellation-setup.md`.

### WhatsApp

En `assets/js/config.js`, `whatsappNumber` admite el número comercial en formato internacional, solo dígitos, sin `+` ni espacios. Al configurarlo, la isla abre WhatsApp con un mensaje preparado; el visitante decide si lo envía. El valor vacío mantiene la guía local y muestra que el contacto comercial no está habilitado. No se inventa un número de destino ni se envían mensajes desde esta web.

Las respuestas rápidas funcionan localmente. La preferencia de cerrar el chat se guarda solo durante la sesión; no se guardan conversaciones. En móvil la isla empieza cerrada. Sin JavaScript, el contenido y la navegación siguen disponibles.

### Diseño

Consulta `docs/design-guideline.md` para los tokens y criterios de accesibilidad, y `docs/design-story.md` para la narrativa. Las fuentes se cargan desde Google Fonts con alternativas locales. Las ilustraciones son locales y no requieren servicios externos. PULSO X1 es ficticio: no hay operaciones bancarias, certificaciones ni venta de equipos.

## Vista local

Abre `index.html` en un navegador o utiliza una extensión de servidor local en tu editor. Para las comprobaciones automatizadas ejecuta:

```powershell
node --test tests/site.test.mjs
```

## Despliegue en Vercel

Este repositorio es un sitio estático: sus archivos publicables están en la raíz y no necesita una compilación. El archivo `vercel.json` fija esa raíz como directorio de salida.

Al crear el proyecto en Vercel, selecciona el repositorio `GiacomoVallebuona/RTcash`, la rama `main` y el preset **Other**. Deja el comando de compilación vacío. No hace falta activar una carpeta de salida distinta: la configuración del repositorio utiliza `.`.

Si Vercel muestra “The provided GitHub repository does not contain the requested branch or commit reference”, el código no es la causa: el error ocurre antes de descargarlo. Verifica que la rama sea `main`, y en GitHub revisa que la aplicación Vercel tenga acceso a este repositorio en **Settings → Applications → Vercel → Configure**. Después, en Vercel, desconecta y vuelve a conectar el repositorio desde **Project Settings → Git**, o crea un proyecto nuevo importando el repositorio de nuevo.

## Flujo de trabajo compartido

Tras conectar el repositorio a GitHub, cada persona debe actualizar su copia antes de modificar archivos:

```bash
git pull origin main
```

Después de probar los cambios, guarda un commit descriptivo y publícalo:

```bash
git add .
git commit -m "describe tu cambio"
git push origin main
```

Si hay cambios de ambos colaboradores en los mismos archivos, Git pedirá resolver el conflicto antes del commit. Conviene hacer cambios pequeños y usar mensajes claros.
