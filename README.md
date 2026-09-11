# Pulso ATM

Sitio de demostración para una marca ficticia de cajeros automáticos. Está creado con HTML, CSS y JavaScript, sin dependencias de ejecución.

## Vista local

Abre `index.html` en un navegador o utiliza una extensión de servidor local en tu editor. Para las comprobaciones automatizadas ejecuta:

```powershell
node --test tests/site.test.mjs
```

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
