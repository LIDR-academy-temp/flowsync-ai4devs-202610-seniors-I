# Comparación: FlowSync con harness y sin harness

**Requerimiento:** Ticket de Jira: FLOW-1 «Implementar login en el frontend».
**Modelo y herramienta:** Opus 5.5 en Claude Code (VS Code) en ambos lados (con harness y sin harness)
**Cómo se lanzó:** con harness, `/priority-ticket`; sin harness, la misma instrucción escrita a mano. Ninguno de los dos planes se aplicó. En el archivo prompts.md se encuentran los prompts utilizados en ambos lados.

## 1. Archivos que propone tocar

- **Con harness:** 11 en su lista explícita (`lib/api.ts`, `lib/auth.tsx`, `lib/errors.ts`, `ProtectedRoute.tsx`, 3 páginas, `App.tsx`, `main.tsx`, `.env.example`, `index.html`). Además nombra 4 de configuración en el setup (`vite.config.ts`, `tsconfig.app.json`, `index.css` y `App.css`, que borra), más los que genera shadcn.
- **Sin harness:** 24, en una lista cerrada: 7 modificados, 13 nuevos (5 de ellos de shadcn) y 4 borrados (`App.css` y los 3 archivos de `src/assets/`). Backend sin cambios.

## 2. Convenciones respetadas y no respetadas

- **Con harness:** respeta las que están escritas en `CLAUDE.md`: no toca el backend, valida con `npm run build` (que hace de typecheck) y `npm run lint` como se indica en la skill. En el contexto señala el uso de `{ data }` de la respuesta, porque también está en `CLAUDE.md`. Llama directamente al backend con una URL absoluta y se apoya en que CORS está abierto en desarrollo (no había convención sobre esto).
- **Sin harness:** no había ninguna convención escrita. Aun así no toca el backend y valida con build y lint, cosa que deduce del `README.md` y del `package.json`. Duda de la forma `{ data }` (dice «probablemente») porque esta convención estaba escrita en `CLAUDE.md` y esta copia no tiene este archivo, es por ello que añade un `curl` para confirmarla. Los nombres de los archivos están en minúsculas mientras que "Con harness" tienen la primer letra de cada palabra en mayúsculas (no había convención para esto y cada uno tomó decisiones distintas). Decide utilizar el proxy de Vite y evita CORS (no había convención sobre esto).

## 3. Intervenciones

- **Con harness:** 3 antes de obtener un plan válido. Antes de crear la skill lancé /priority-ticket cuando todavía no existía, y Claude improvisó el plan (me devolvió el plan en inglés). Posteriormente, creé la skill y al ejecutarla en la misma sesión Claude no la cargó (ahí detecté que Claude Code solo carga las skills al arrancar). Tuve que abrir una sesión nueva y volver a ejecutar la skill, en esta tercera ejecución me generó el plan en español. No realicé ninguna intervención sobre el plan en sí.
- **Sin harness:** ninguna sobre el plan. Generó el plan con el primer prompt sin preguntarme nada.


## 4. Qué arreglaría a mano

- **Con harness:** Este plan no hace las validaciones en el cliente, solo valida el backend obligando a ir y volver al servidor. El alias `@/` solo está en `tsconfig.app.json`, y shadcn también lo necesita en `tsconfig.json`. Para producción habría que configurar CORS porque en desarrollo acepta cualquier origen.
- **Sin harness:** no sería necesario el paso del `curl`, porque la forma `{ data }` ya está en el código. Definir la regla para los nombres de los archivos (minúsculas o primer letra de palabra en mayúscula) y agregar esta regla al harness (`CLAUDE.md`). Definir con el equipo si se usa el proxy de Vite o la URL absoluta y crear la regla en el harness.

**Lo que comparten:** los dos exigen `passwordConfirmation` (8 a 32 caracteres), y distinguen el 422 `database.unique` del 400 de credenciales malas. Los dos `README.md`, que son iguales, ya dicen que el backend no se toca.

---

## Parte B

1. **Hasta qué pieza llegué y cuál me costó más:** 
Llegué hasta ejecutar la skill `/priority-ticket` y hacer el archivo de comparación de los 2 planes de ejecución, es decir, del harness monté las piezas 1 a 3 de 8 (/init, el MCP de Atlassian y la skill /priority-ticket); las piezas 4 a 8 no las monté por falta de tiempo. 
Tuve que pasar mucho tiempo comparando los 2 planes de ejecución para entender que proponían de forma igual y qué diferente (en este punto se me fue todo el tiempo porque me obligó a comparar cada línea de cada archivo).

2. **La primera diferencia que vi y en qué me fijé:** 
Con harness, Claude reescribió el título («Plan FLOW-1: login y registro en el frontend»); sin harness, copió el del ticket («FLOW-1 — Implementar login en el frontend»). Lo vi en la cabecera de cada plan al abrirlos en VS Code. 

3. **Algo escrito en el harness que el agente no cumplió:** 
Me muestra una descripción del ticket prioritario en un sólo párrafo, no mostró el enlace, la prioridad, el tipo ni los criterios de aceptación, como pide el Paso 2 del SKILL.md.
