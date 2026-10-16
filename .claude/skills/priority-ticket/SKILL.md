---
name: priority-ticket
description: Coge un ticket de Jira (el indicado, o el de mayor prioridad en TODO si no se indica ninguno), lo mueve a En progreso, te lo asigna, y genera un plan de implementación en .claude/tmp/plans/ para tu revisión antes de escribir ningún código. Úsala cuando el usuario escriba /priority-ticket, pida "coger la siguiente tarea de Jira", "empezar con el ticket de más prioridad" o "planifica FLOW-XXX".
---

# priority-ticket

Selecciona un ticket de Jira del proyecto **FLOW**, lo mueve a **En progreso**, te lo asigna a ti,
y produce un plan de implementación en Markdown para tu aprobación. **No escribe ni modifica
ningún código** hasta que el plan es aprobado explícitamente.

## Configuración de este proyecto

- Sitio Atlassian: `iduetxe.atlassian.net`
- Proyecto Jira: `FLOW`
- Conector MCP a usar: el prefijo `mcp__claude_ai_Atlassian_MCP__*` (NO el conector
  `mcp__claude_ai_Atlassian__*`, que está autorizado contra otro sitio distinto —
  `kuorum.atlassian.net`). Si `mcp__claude_ai_Atlassian_MCP__*` no está disponible o falla la
  resolución del sitio, comprueba con `getAccessibleAtlassianResources` de ese mismo conector antes
  de intentar nada más.
- `cloudId` del sitio: resuélvelo con `getAccessibleAtlassianResources` del conector
  `Atlassian MCP` al principio de cada ejecución (no lo hardcodees, puede rotar).
- Nombres de estado en este proyecto están en español: `"Tareas por hacer"` (TODO),
  `"En curso"` / `"En progreso"` (In Progress) — confirma el nombre exacto de la transición
  disponible con la propia llamada de transición o leyendo el estado actual del issue; no asumas
  el nombre en inglés.
- Directorio de planes: `.claude/tmp/plans/` (créalo si no existe).

## Argumento

El usuario puede invocar la skill como `/priority-ticket` (sin argumento) o
`/priority-ticket FLOW-123` (con la clave de un ticket concreto).

## Flujo

### 1. Resolver identidad y sitio

1. Llama a `getAccessibleAtlassianResources` (conector Atlassian MCP) para obtener el `cloudId`
   de `iduetxe.atlassian.net`.
2. Llama a `atlassianUserInfo` (o equivalente del conector MCP) para obtener tu `accountId`
   actual. Este paso se repite siempre, en cada ejecución — no reutilices un accountId guardado de
   una sesión anterior, porque la cuenta conectada puede haber cambiado.

### 2. Seleccionar el ticket

**Caso A — se pasó un argumento (ej. `FLOW-123`):**

1. Obtén el issue con `getJiraIssue`.
2. Si el issue **no existe**, informa al usuario y detente.
3. Si el estado actual **no es** "Tareas por hacer" (TODO), muestra el estado actual y
   pregunta al usuario (con AskUserQuestion) si quiere continuar igualmente (planificar y
   mover a En progreso desde su estado actual) o abortar. No continúes sin respuesta explícita.
4. Si el issue es de tipo **Epic**, avisa de que normalmente los Epics no se implementan
   directamente y pregunta si realmente quiere continuar con ese Epic o si busca una de sus
   historias hijas.

**Caso B — no se pasó argumento (selección automática):**

1. Ejecuta esta JQL vía `searchJiraIssuesUsingJql`:
   ```
   project = FLOW AND status = "Tareas por hacer" AND issuetype != Epic
   ORDER BY priority DESC, Rank ASC
   ```
   (Usa el nombre de estado exacto vigente en el proyecto; si cambiase, ajusta la JQL — puedes
   comprobarlo listando los estados del proyecto o mirando el valor `status.name` de un issue
   conocido.)
2. Si no hay ningún resultado, informa al usuario de que no hay tickets pendientes en TODO
   (excluyendo Epics) y detente.
3. Toma el primer resultado de la lista como ticket seleccionado.

### 3. Crear la rama de trabajo

1. Antes de tocar cualquier código, crea y cambia a una rama nueva desde la rama base actualizada,
   con la convención usada en todo el harness (ver "Reglas de proceso" en `CLAUDE.md` raíz):
   ```
   feature/FLOW-XXX-slug-corto-del-titulo
   ```
   donde `FLOW-XXX` es la clave del ticket y el slug es una versión corta en kebab-case del
   summary (sin tildes ni caracteres especiales).
2. Si ya existe una rama local o remota con ese nombre, pregunta al usuario si quiere reutilizarla
   (`git checkout`) o crear una variante distinta — no sobrescribas una rama existente sin
   confirmación.

### 4. Mover a En progreso y asignar

1. Usa `transitionJiraIssue` para mover el ticket al estado "En progreso" (comprueba el nombre
   exacto de la transición disponible para ese issue si no es obvio).
2. Usa `editJiraIssue` para asignar el ticket a tu `accountId` (campo `assignee`).
3. Confirma ambos cambios al usuario con un mensaje breve (clave, resumen, estado nuevo,
   asignado a quién).

Si cualquiera de estos dos pasos falla, informa del error concreto devuelto por Jira y detente —
no sigas al paso de planificación con un ticket a medio mover.

### 5. Leer el ticket y plantear dudas de negocio

1. Lee la descripción completa del ticket (`getJiraIssue` con `view: "full"` o
   `fields: ["*all"]` si hace falta), incluyendo comentarios si los hay.
2. Explora el código relevante del repo (backend/frontend) para entender el contexto técnico
   antes de preguntar — no preguntes algo que ya es evidente leyendo el código.
3. Si tras leer el ticket y el código quedan **dudas de negocio o de producto** (comportamiento
   esperado, alcance, casos límite, decisiones de UX, etc. que no estén especificadas y que no
   puedas inferir razonablemente del código o las convenciones del repo), formúlalas con
   `AskUserQuestion` antes de escribir el plan. No inventes decisiones de negocio no especificadas.
4. Dudas puramente técnicas que puedas resolver tú mismo explorando el código no necesitan
   pregunta — resuélvelas directamente en el plan.

### 6. Escribir el plan (sin tocar código)

1. Determina el nombre de archivo: `.claude/tmp/plans/FLOW-XXX-NombreTarea.md`, donde
   `NombreTarea` es un slug corto en PascalCase o kebab-case derivado del summary del ticket
   (sin espacios ni caracteres especiales).
2. Escribe el plan en ese archivo con, al menos:
   - Cabecera: clave del ticket, link (`https://iduetxe.atlassian.net/browse/FLOW-XXX`),
     resumen, tipo, prioridad.
   - Contexto / problema a resolver (resumen de la descripción del ticket).
   - Decisiones de negocio confirmadas (resumen de las respuestas obtenidas en el paso 4, si
     hubo alguna).
   - Plan de implementación paso a paso, con los ficheros concretos a tocar y el enfoque técnico
     (sin escribir código real, solo descripción del cambio).
   - Criterios de aceptación / cómo verificar que está hecho.
   - Riesgos o supuestos abiertos, si los hay.
3. Esta skill **no debe escribir, modificar ni generar código de producto en ningún fichero
   fuera de `.claude/tmp/plans/`** durante este paso.

### 7. Esperar aprobación

1. Presenta un resumen breve del plan en el chat y usa `ExitPlanMode` (el flujo nativo de Plan
   Mode de Claude Code) para pedir aprobación explícita del plan ya escrito en el `.md`.
2. Si el usuario pide cambios, actualiza el fichero del plan y repite la solicitud de aprobación.
3. No empieces el paso 8 sin una aprobación explícita.

### 8. Implementación

1. Una vez aprobado el plan, procede a implementarlo siguiendo los pasos descritos en el
   fichero de plan, respetando las convenciones del repo (ver `CLAUDE.md` raíz).
2. Sigue el plan aprobado como referencia principal; si durante la implementación surge algo no
   contemplado que requiera una decisión de negocio, pregunta antes de asumir.
3. Al terminar la implementación, sigue las "Reglas de proceso" de `CLAUDE.md` raíz para cerrar
   el ciclo: `/commit`, `gh pr create`, revisión con el subagente `adversarial-reviewer`, y
   reportar solo la URL del PR en el chat.
