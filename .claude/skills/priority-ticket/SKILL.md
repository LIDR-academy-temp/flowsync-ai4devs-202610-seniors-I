---
name: priority-ticket
description: Trae de Jira (proyecto FLOW) el ticket de mayor prioridad asignado al usuario en "To Do", resume sus criterios de aceptación, entra en plan mode para proponer la implementación y, al aprobarse el plan, mueve el ticket a "In Progress". Úsala cuando el usuario invoque /priority-ticket o pida "coger el siguiente ticket prioritario".
---

# /priority-ticket

Flujo para empezar a trabajar en el ticket más prioritario del usuario en Jira.

## Datos fijos

- Sitio Jira: `panfri787.atlassian.net`
- cloudId: `ada957d7-205d-4bc6-a23e-77556fafae21` (si falla, obtenlo con `mcp__atlassian__getAccessibleAtlassianResources`)
- Proyecto: `FLOW` (FlowSync)

Las herramientas de Atlassian son diferidas: cárgalas con `ToolSearch` antes de usarlas
(`select:mcp__atlassian__searchJiraIssuesUsingJql,mcp__atlassian__getJiraIssue,mcp__atlassian__getTransitionsForJiraIssue,mcp__atlassian__transitionJiraIssue`).

## Pasos

### 1. Buscar el ticket

Llama a `mcp__atlassian__searchJiraIssuesUsingJql` con:

```
project = FLOW AND assignee = currentUser() AND status = "To Do" ORDER BY priority DESC, created ASC
```

- `maxResults`: 50 (luego quédate con el primero).
- `fields`: `["summary", "status", "priority", "issuetype"]`.

Si no hay resultados, reintenta con `statusCategory = "To Do"` en lugar de `status = "To Do"`
(el nombre del estado puede variar). Si sigue vacío, informa al usuario de que no tiene tickets
asignados en To Do y **termina** la skill.

Si hay empate de prioridad, gana el más antiguo (ya lo resuelve el `ORDER BY`).

### 2. Leer el detalle

Llama a `mcp__atlassian__getJiraIssue` sobre la key elegida con `responseContentFormat: "markdown"`
y `fields: ["*all"]` para incluir campos personalizados. Los criterios de aceptación pueden estar:

- en la descripción (sección "Criterios de aceptación", "Acceptance criteria", "AC", lista de checks, Given/When/Then…), o
- en un campo personalizado cuyo nombre contenga "Acceptance" o "Criterios".

Lee también subtareas y comentarios si existen: pueden matizar el alcance.

### 3. Resumir al usuario

Muestra de forma breve:

- **Key y título**, prioridad, tipo y enlace (`https://panfri787.atlassian.net/browse/<KEY>`).
- **Criterios de aceptación** resumidos en una lista numerada, uno por línea.
- Si el ticket **no tiene criterios de aceptación explícitos**, dilo claramente y deriva unos
  provisionales a partir de la descripción, marcados como "inferidos".

### 4. Plan mode

Entra en plan mode con `EnterPlanMode` (cárgala con `ToolSearch` si es diferida). Dentro de plan mode:

1. Explora el código relevante del monorepo (`backend/` AdonisJS 7, `frontend/` React 19 + Vite)
   siguiendo `AGENTS.md`: auth por access tokens, respuestas de perfil vía
   `backend/app/transformers/user_transformer.ts`, y nada de dependencias nuevas sin justificarlas.
2. Redacta un plan que incluya:
   - Ticket (key + título) y criterios de aceptación.
   - Cambios por archivo (backend / frontend / migraciones / tests).
   - Cómo se verifica **cada** criterio de aceptación (test o comprobación manual).
   - Riesgos o dudas abiertas.
3. Presenta el plan con `ExitPlanMode` para que el usuario lo apruebe.

No modifiques código ni el estado del ticket antes de la aprobación.

### 5. Al aprobarse el plan

Solo si el usuario aprueba el plan:

1. `mcp__atlassian__getTransitionsForJiraIssue` sobre la key para obtener las transiciones disponibles.
2. Elige la que lleve a "In Progress" (compara sin distinguir mayúsculas; acepta variantes como
   "En curso" / "In Progress" o la de `statusCategory` "In Progress").
3. `mcp__atlassian__transitionJiraIssue` con ese id de transición.
4. Confirma al usuario: "<KEY> movido a In Progress" y empieza a implementar el plan.

Si no existe una transición a In Progress, informa de las transiciones disponibles y no muevas el ticket.
Si el usuario rechaza el plan, no toques el ticket: ajusta el plan con su feedback y vuelve a presentarlo.
