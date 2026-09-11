# Diseño: sitio web de cajero automático

## Propósito

Crear una demostración web de una marca ficticia de cajeros automáticos. El sitio ofrece una presentación comercial clara y sirve como base que dos colaboradores pueden editar y sincronizar mediante GitHub.

## Alcance

El sitio contiene cuatro páginas estáticas enlazadas entre sí:

- **Inicio:** propuesta de valor, una representación visual del cajero y llamadas a la acción.
- **Nosotros:** historia, principios y cifras de la empresa ficticia.
- **Información:** servicios, preguntas frecuentes y canales de atención de ejemplo.
- **Producto:** características y especificaciones de un modelo ficticio de cajero.

No se conectará a una cuenta bancaria ni se procesarán transacciones. Todo el contenido será de demostración y se podrá reemplazar fácilmente.

## Dirección visual

La interfaz seguirá una estética **industrial y tecnológica**. El negro grafito domina el fondo, con rojo intenso como color de acción y blanco cálido para el texto. Una retícula técnica tenue, bordes angulares y líneas rojas evocan el frente de un cajero sin imitar ninguna marca real.

### Paleta

- Negro profundo: `#090909`
- Negro grafito: `#151515`
- Rojo principal: `#E50914`
- Rojo oscuro: `#8D0007`
- Blanco cálido: `#F4F1EB`
- Gris metálico: `#A6A6A6`

### Tipografía y composición

Los titulares usarán **Space Mono** y el cuerpo **DM Sans**. La composición empleará una cuadrícula de doce columnas, bloques desalineados de forma intencional y módulos que sobresalen de sus contenedores. La navegación será compartida y adaptable a pantallas pequeñas.

## Arquitectura

Se usará HTML, CSS y JavaScript sin dependencias:

```
index.html          Página Inicio
nosotros.html       Página Nosotros
informacion.html    Página Información
producto.html       Página Producto
assets/css/styles.css
assets/js/main.js
README.md
.gitignore
```

`styles.css` concentrará los tokens visuales, los componentes reutilizables y las adaptaciones responsivas. `main.js` manejará el menú móvil, el año del pie de página y animaciones de aparición discretas. Cada documento HTML mantendrá el mismo encabezado, pie y navegación para que las futuras ediciones sean directas.

## Interacciones y accesibilidad

Los enlaces de navegación señalarán la página actual. Los botones tendrán estados de foco visibles y las animaciones respetarán `prefers-reduced-motion`. El menú se convertirá en un control accesible en móvil. Se emplearán HTML semántico, contraste alto y tamaños de toque adecuados.

## Colaboración con GitHub

El repositorio incluirá un README con el flujo recomendado:

1. `git pull origin main`
2. editar y comprobar el sitio localmente
3. `git add .`, `git commit -m "descripción"` y `git push origin main`

El primer historial contendrá el sitio, la guía y este documento. Cuando exista un repositorio remoto de GitHub autenticado, se añadirá como `origin` y se publicará la rama principal.

## Verificación

Se comprobarán enlaces internos, respuesta visual en escritorio y móvil, ausencia de referencias a colores o fuentes prohibidos por la guía de diseño, y estado limpio de Git tras el primer commit.
