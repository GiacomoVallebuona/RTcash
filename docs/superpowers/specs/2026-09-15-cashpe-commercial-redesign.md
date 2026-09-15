# Diseño: rediseño comercial de CashPE

## Objetivo

Transformar el sitio existente en una presentación comercial B2B de CashPE que explique el producto en pocos segundos, convierta el interés en solicitudes de cotización y mantenga una identidad tecnológica consistente en escritorio y móvil.

## Mensaje central

CashPE automatiza el ciclo del efectivo en el punto de venta: recibe, valida, resguarda, calcula y entrega cambio. La comunicación seguirá el orden **problema → beneficio → solución → acción** y evitará afirmaciones de mercado, precios o compatibilidades que no estén verificadas.

## Dirección visual

La estética será industrial premium: negro carbón como base, rojo como señal de acción y marfil para superficies de lectura. La fotografía real del cajero reemplazará todas las ilustraciones anteriores. El imagotipo aparecerá como marca de gran formato en el hero y el logotipo se utilizará en la navegación y como favicon.

La imagen del cajero se mostrará sobre encuadres controlados, halos rojos discretos y fondos técnicos. No se deformará ni se sustituirá por otros renders. Los activos se consumirán desde el bucket público del proyecto Cashpe en Supabase.

## Sistema visual

- Tipografía: Space Grotesk para titulares y Manrope para texto y controles.
- Paleta: `#080808`, `#111111`, `#E21A22`, `#8E0D12`, `#F4F0E8`, `#A7A29A`.
- Retícula: doce columnas en escritorio, seis en tableta y una composición vertical en móvil.
- Formas: radios contenidos, bordes finos, marcos técnicos y números de proceso de gran escala.
- Movimiento: entradas con opacidad y desplazamiento de 16–24 px, secuencias de 70–100 ms y una animación principal para el flujo del efectivo. Todas usarán `transform` y `opacity` y respetarán `prefers-reduced-motion`.
- Accesibilidad: contraste WCAG AA, foco visible, HTML semántico, navegación por teclado, textos alternativos y estados de formulario anunciados con `aria-live`.

## Arquitectura de contenidos

### Inicio

El hero abrirá con una promesa concreta: automatizar el manejo de efectivo para reducir riesgo, errores y tiempo de caja. La fotografía real del equipo será el objeto principal, con el imagotipo como fondo de marca. Los CTAs serán “Solicita una cotización” y “Mira cómo funciona”.

Después se presentarán cuatro problemas comerciales: dinero expuesto, billetes falsos, descuadres y falta de cambio. Una secuencia visual explicará cuatro momentos: ingresar monto, recibir efectivo, validar y resguardar, entregar cambio. Cerrará con beneficios, sectores recomendados y un CTA hacia el formulario.

### Producto

La página detallará el ciclo completo del efectivo y el reciclaje multidenominación. Incluirá componentes, seguridad física, denominaciones peruanas, pantalla de 7 pulgadas, conectividad, construcción de acero, peso aproximado, capacidad y dimensiones. Los datos se expresarán como ficha informativa y no como garantías de compatibilidad con sistemas específicos.

### Nosotros

La página explicará el propósito de CashPE: reducir la fricción operativa del efectivo en negocios peruanos. Presentará el producto como una arquitectura adaptable y evitará afirmar integraciones certificadas que no se hayan confirmado.

### Información

La página agrupará negocios adecuados, preguntas frecuentes, proceso de evaluación comercial y el formulario de cotización. El formulario pedirá únicamente la información necesaria para contactar y calificar una oportunidad: nombre, empresa, correo, teléfono, tipo de negocio, volumen aproximado y mensaje.

## Conversión y formulario

Todos los CTAs principales llevarán al formulario de cotización de Información. El formulario se conectará a una tabla existente del proyecto Supabase Cashpe. Durante la implementación se inspeccionará el esquema real mediante el MCP conectado y se mapearán los campos a sus columnas sin duplicar tablas.

La política de seguridad permitirá a `anon` insertar solicitudes, pero no leer, editar ni eliminar registros. Se verificará RLS y el acceso de la tabla al Data API. Si la tabla existente no dispone de una columna opcional, el formulario omitirá ese campo antes de alterar el esquema; solo se añadirá una columna cuando sea necesaria para guardar un dato que el negocio ya decidió recopilar.

El cliente enviará una sola solicitud por interacción, bloqueará el botón durante el envío y mostrará estados de progreso, éxito y error. Un campo trampa oculto reducirá envíos automatizados básicos. No se incluirá ninguna clave `service_role`; solo la clave pública proporcionada.

## Integración de Supabase

La configuración pública estará aislada en `assets/js/config.js` y la lógica del formulario en un módulo dedicado. La integración usará la URL del proyecto y la clave anónima para insertar el registro. Las imágenes y la marca seguirán sirviéndose desde Supabase Storage mediante las URLs públicas proporcionadas.

Antes de cerrar el trabajo se ejecutará una inserción de prueba controlada y se comprobará que el navegador no pueda consultar los registros de la tabla. El registro de prueba se identificará claramente para poder retirarlo desde el panel si fuera necesario.

## Estados y errores

- Si una imagen remota no carga, su contenedor conservará proporción, fondo y texto alternativo.
- Si Supabase no responde, el formulario conservará los datos introducidos y ofrecerá reintentar.
- Si la validación falla, cada campo mostrará un mensaje breve junto al control.
- Si JavaScript está deshabilitado, el contenido y la navegación seguirán disponibles, aunque el formulario indicará que requiere JavaScript.

## Verificación

Se revisarán las cuatro páginas como conjunto en resoluciones móviles y de escritorio. La comprobación cubrirá enlaces, imágenes, logotipo, favicon, espaciados, legibilidad, foco, animaciones reducidas, estados de formulario, consola del navegador, inserción en Supabase y ausencia de acceso público de lectura a las solicitudes.
