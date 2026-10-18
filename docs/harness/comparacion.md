# Comparación: mismo ticket, con harness y sin harness

**Ticket:** FLOW-4 «Implementar login en el frontend» (Task, To Do, asignado a mí) — https://elisahdz.atlassian.net/browse/FLOW-4
**Modelo / herramienta:** (igual en los dos lados)
**Reloj:** inicio 14:05 · fin 14:50 (45 min)

## Parte A — las cuatro casillas

| | Con harness | Sin harness |
|---|---|---|
| 1. Archivos que propone tocar (contados) | **10** de frontend + dependencias (api.ts, auth.ts, SignupForm, LoginForm, SignupPage, LoginPage, ProfilePage, App.tsx, main.tsx, deps). Backend a leer: 6, **ya respondidos** sin leerlos en el turno. | **8** de frontend + dependencias (sin separar components/ de pages/). Backend **leído de verdad** en el turno: 8 archivos, incluidos `auth_middleware.ts` y `exceptions/handler.ts` (401/422, formato de errores VineJS). Añade sección Verificación de 8 pasos. |
| 2. Convenciones del proyecto respetadas / no respetadas | Respetó: no tocar backend; errores a pantalla; conventional commits (CLAUDE.md). **No respetó:** "entra en plan mode" (skill, paso 3): imprimió el plan en el chat y pidió aprobación por texto. **No recogió:** rama `ehz/tipo/FLOW-n-…`, flujo /commit → PR → revisor (reglas de proceso en CLAUDE.md). No mencionó la sección Gherkin del ticket. Sí cumplió "no mover el ticket sin aprobar" (FLOW-4 sigue en To Do). | No había ninguna convención escrita en ningún sitio. Esa es la respuesta. **Sí entró en plan mode real** (diálogo del sistema), que era lo que pedía el prompt. |
| 3. Veces que tuve que intervenir | **1** durante el montaje (pieza 6: el hook quedó registrado con esquema inválido y la "prueba" fue manual; prompt 7b para corregir). **0** durante el encargo. | **0**. |
| 4. Qué tendría que arreglar a mano antes de enseñarlo al equipo | La skill `/priority-ticket` para que entre en plan mode de verdad. Que el plan incluya rama, commit y PR según las reglas de proceso. Decidir si `/init` debe leer o no los archivos de preparación del ejercicio (prompts.md, docs/harness) que le dieron contexto que no era del proyecto. | Todo lo que no existe: archivo de instrucciones, convenciones de rama/commit/PR, revisor, formateador. Y aclarar cómo tuvo acceso a Jira sin configuración de proyecto (ver nota de condiciones). |

## Parte B — las tres líneas

1. **Hasta qué pieza llegué (número de la lista) y cuál costó más de lo esperado:** Llegué a las 8. Las monté en 23 minutos, más rápido de lo que esperaba. La que me costó fue la 6, el hook de Prettier: el agente me dijo "funciona" y me enseñó una prueba, pero el hook estaba registrado con un formato que Claude Code no lee, y la prueba era el comando corrido a mano, no el hook. Tuve que lanzar un segundo prompt. Lo que de verdad se comió tiempo fue antes del reloj: Jira me puso la clave KAN y hubo que cambiarla a FLOW, y el MCP lo instalé dos veces mal (primero como plugin global, luego el `.mcp.json` en la carpeta de arriba).

2. **Primera diferencia que vi entre las dos salidas, y en qué me fijé para verla:** La última línea. La copia raw me sacó el cuadro de plan mode de Claude Code, el de "Would you like to proceed?". La del harness terminó con una frase en el chat: "Aprueba el plan para que mueva FLOW-4". No tuve que abrir nada, se ve en pantalla. Ya leyendo el cuerpo vi la segunda: la raw fue a leer los archivos del backend en ese momento y los citó (hasta el middleware y el handler de errores); la del harness ya traía las respuestas puestas, porque estaban en el CLAUDE.md desde el `/init`.

3. **Algo que dejé escrito en el harness y que el agente no cumplió igualmente:** "Entra en plan mode". Está literal en el paso 3 de la skill `/priority-ticket` y no lo hizo. Lo incómodo es que la copia raw, con esa misma frase pero en el prompt a mano, sí lo hizo. Y una segunda: las reglas de proceso que puse al final del CLAUDE.md (rama `ehz/…`, `/commit`, PR, revisor) no aparecen por ningún lado en el plan. Las escribí, las commiteé, y el plan sigue como si no existieran.

## Nota de condiciones
- **La copia raw tuvo acceso a Jira.** Se lanzó con `claude` a secas, sin el flag `--strict-mcp-config` que estaba previsto, así que el conector de Atlassian de claude.ai (alcance usuario) estuvo disponible y leyó FLOW-4. Error de lanzamiento mío, no del agente. Consecuencia: la condición "sin Jira" no se cumplió y la diferencia más grande esperada (que la raw no pudiera traer el ticket) no se midió. Lo que sí quedó aislado: sin CLAUDE.md, sin skills, sin subagente, sin hook, sin `.mcp.json` de proyecto.
- **`/init` leyó `prompts.md` y `docs/harness/comparacion.md`**, que estaban en el repo antes de montar el harness, y por eso el CLAUDE.md sabía cuál era el ejercicio. No fue decisión mía; es un efecto de tener los archivos de preparación dentro del repo.
- **Desviación del README:** al ticket FLOW-4 se le añadió una sección «Escenarios (Gherkin)» (6 escenarios en lenguaje de producto) debajo de los 5 criterios originales, que quedaron intactos. El mentor usa el ticket sin esa sección; la comparación con el directo no es uno a uno en ese punto.
- Ambas copias corren con la misma configuración global de Claude Code (`~/.claude/CLAUDE.md`, skills y agentes globales). La única variable es el harness a nivel de proyecto.
