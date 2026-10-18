---
name: priority-ticket
description: Trae de Jira el ticket de mayor prioridad asignado a Sylvia Hernandez en «To Do» del proyecto FLOW, resume sus criterios de aceptación, entra en plan mode para proponer la implementación y, cuando el plan se aprueba, mueve el ticket a «In Progress». Úsala cuando el usuario escriba /priority-ticket o pida empezar el siguiente ticket prioritario.
disable-model-invocation: true
---

# /priority-ticket

Flujo fijo de cinco pasos. No te saltes ninguno ni cambies el orden.

## Datos de Jira

| Dato | Valor |
|---|---|
| Sitio | `costmg.atlassian.net` |
| cloudId | `1010506d-3ee4-403a-bbef-ff7e769299d5` |
| Proyecto | `FLOW` (FlowSync) |
| Asignada | Sylvia Hernandez, accountId `603581081853760070160be6` |
| Estado de origen | `To Do` |
| Estado destino | `In Progress` (transición `21` cuando se escribió esta skill) |

Las herramientas son las del MCP de Atlassian Rovo (`mcp__claude_ai_Atlassian_Rovo__*`). Si están diferidas, cárgalas en una sola llamada a ToolSearch junto con plan mode:

```
select:mcp__claude_ai_Atlassian_Rovo__searchJiraIssuesUsingJql,mcp__claude_ai_Atlassian_Rovo__getJiraIssue,mcp__claude_ai_Atlassian_Rovo__getTransitionsForJiraIssue,mcp__claude_ai_Atlassian_Rovo__transitionJiraIssue,EnterPlanMode,ExitPlanMode
```

Si el cloudId falla, obtén uno nuevo con `getAccessibleAtlassianResources`.

## 1. Traer el ticket

Llama a `searchJiraIssuesUsingJql` con `responseContentFormat: "markdown"` y esta JQL:

```
project = FLOW AND assignee = 603581081853760070160be6 AND status = "To Do" ORDER BY priority DESC, created ASC
```

- El primer resultado es el ticket. El desempate entre misma prioridad es el más antiguo.
- Si no hay resultados, dilo y **termina**. No busques en otros estados ni en otros asignados.
- Luego llama a `getJiraIssue` sobre esa clave con `fields: ["summary","description","priority","status","issuetype","comment","labels"]` para tener la descripción completa y los comentarios.

## 2. Resumir los criterios de aceptación

Muestra al usuario, en el chat y antes de planificar:

- Clave, título, prioridad y enlace `https://costmg.atlassian.net/browse/<CLAVE>`.
- Los criterios de aceptación en una lista numerada, con una línea cada uno y sin reinterpretarlos.
- Si el ticket no tiene una sección de criterios, dilo explícitamente y deriva los criterios de la descripción, marcados como «derivados».
- Lo que diga algún comentario que cambie el alcance.

## 3. Entrar en plan mode

Llama a `EnterPlanMode`. Dentro de plan mode:

1. Lee `CLAUDE.md` y respeta sus convenciones. En particular, el backend es de solo lectura salvo que el ticket diga lo contrario.
2. Cruza cada criterio con el código real. Cuando el ticket nombre un endpoint, abre su ruta, su controlador y **su validador** en `backend/app/validators/` para sacar los campos y reglas que el ticket no dice (campos obligatorios extra, longitudes, unicidad). También mira el formato de respuesta y los errores que devuelve.
3. Escribe el plan en el archivo de plan que indique plan mode, con estas secciones:
   - **Contexto**: ticket, criterios numerados, y una lista «Lo que el ticket no dice y el código exige».
   - **Enfoque**: pasos en orden. El primero siempre es crear una rama nueva `feat/<clave-en-minúsculas>-<slug>`.
   - **Archivos**: modificados, nuevos y eliminados.
   - **Verificación**: comandos de build, lint y tests, y un recorrido manual que cubra **cada** criterio de aceptación, incluidos los casos de error.
4. Si hay una decisión que cambia materialmente el trabajo y no se puede resolver con el código, pregúntala con `AskUserQuestion` antes de cerrar el plan.
5. Termina con `ExitPlanMode`.

No escribas código ni muevas el ticket mientras estés en plan mode.

## 4. Al aprobarse el plan: mover a «In Progress»

Solo si `ExitPlanMode` devuelve que el usuario **aprobó** el plan:

1. Llama a `getTransitionsForJiraIssue` sobre la clave y busca la transición cuyo `to.name` sea `In Progress`. No asumas el id `21` sin comprobarlo.
2. Llama a `transitionJiraIssue` con ese id.
3. Comprueba con `getJiraIssue` (campo `status`) que el estado es `In Progress`.

Si el usuario rechaza el plan o pide cambios, el ticket se queda en «To Do». Si la transición falla, informa del error exacto y no lo reintentes con otro id.

## 5. Cierre

Informa en pocas líneas: clave del ticket, que el plan se aprobó, el estado actual en Jira y la ruta del archivo de plan. La implementación empieza después, no forma parte de esta skill.
