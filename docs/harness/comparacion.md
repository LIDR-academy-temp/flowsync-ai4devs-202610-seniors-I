# Comparación: FLOW-1 con y sin harness

Ticket: **FLOW-1 «Enlace de navegación entre login y registro»**. Se comparan los dos planes:
`docs/harness/plan-flow-1.md` (con harness) y `crea-un-plan-para-lively-swing.md` (copia sin harness).

| Casilla | Con harness | Sin harness |
|---|---|---|
| **1. Archivos que propone tocar** | ~19: `package.json`, `tsconfig.json`, `tsconfig.app.json`, `vite.config.ts`, `components.json`, `src/lib/utils.ts`, `src/index.css`, 4 componentes `src/components/ui/*`, `main.tsx`, `App.tsx`, 2 páginas, y borra `App.css` + 3 assets. El PR real tocó 20. | 6: `package.json`, `main.tsx`, `App.tsx`, `pages/LoginPage.tsx`, `pages/SignupPage.tsx`, `App.css`. |
| **2. Convenciones respetadas / no** | ✔ backend intacto · ✔ campos según `app/validators/user.ts` · ✔ shadcn/ui (README) · ✔ rama nueva antes de tocar código · ✔ commit convencional · ✔ `gh pr create` · ✔ revisión con `adversarial-reviewer`. ✗ el código no pasa Prettier (el hook no lo dejó formateado) · ✗ dependencias de build en `dependencies` · ~ «Por hacer» exacto: no coincidía y lo preguntó. | No había ninguna convención escrita. ✔ backend intacto · ✔ campos según el validador (lo leyó por su cuenta) · ✗ deja fuera shadcn/ui a propósito, aunque el README del curso lo usa. |
| **3. Intervenciones** | 3 en el plan: confirmar FLOW-1 (estado distinto), elegir el alcance y redirigir la decisión del router a los README. 0 durante la implementación. | 3 |
| **4. Qué arreglaría a mano** | Mover `tailwindcss`, `@tailwindcss/vite` y `shadcn` a `devDependencies` · añadir `.prettierrc` y formatear · quitar `lucide-react` (no se usa) · `<h1>` en las páginas · `lang="es"` y `<title>` en `index.html` · comentario de `SignupPage.tsx` que cita el ticket equivocado. | Habría que rehacer las pantallas con shadcn/ui cuando llegue el ticket «Implementar login» · fija `react-router` v7 (la actual es 8.x) · mantiene estilos propios en `App.css`. |


## Las tres líneas

1. **Hasta qué pieza llegué y cuál costó más:**
2. **Primera diferencia y dónde la vi:** El alcance. Con harness entra shadcn/ui + Tailwind + alias (~19 archivos); sin harness, solo react-router (6 archivos). Se ve en la lista de «Pasos» de cada plan.
3. **Algo escrito en el harness que no se cumplió:** El hook de Prettier sobre `frontend/src/**` estaba montado, y aun así `prettier --check src` falla en los 10 archivos del PR. Además, `AGENTS.md` dice «en el chat, responde únicamente con la URL del PR», y el agente respondió con más texto en mensajes posteriores.
