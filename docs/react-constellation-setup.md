# Variante React para ConstellationGrid

El proyecto actual es una web estática con HTML, CSS y JavaScript; no contiene `package.json` de React, Tailwind, TypeScript ni la estructura de shadcn. Por eso la portada usa una adaptación nativa en `assets/js/constellation.js` y no se fuerza una migración del sitio completo.

Si el proyecto se migra a React/Next.js, la estructura recomendada es:

```powershell
npx create-next-app@latest rt-cash --typescript --tailwind --eslint --app
cd rt-cash
npx shadcn@latest init
New-Item -ItemType Directory -Force components/ui
```

`components/ui` es la ubicación convencional para componentes reutilizables de shadcn. Mantener allí `constellation-grid.tsx` permite importarlo con una ruta estable, compartirlo entre páginas y conservar la separación entre componentes de interfaz y composición de páginas.

El componente recibido solo usa React y APIs nativas del navegador; no necesita una dependencia externa. Si se añaden iconos o controles shadcn, se puede instalar `lucide-react`:

```powershell
npm install lucide-react
```

Después se puede copiar `constellation-grid.tsx` a `components/ui/` e importarlo desde la página de inicio. El color de los nodos debe cambiarse a la paleta roja de RTcash y el componente debe ocupar únicamente el hero inicial.
