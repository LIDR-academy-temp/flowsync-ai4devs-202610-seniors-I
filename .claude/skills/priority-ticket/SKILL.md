---
name: priority-ticket
description: Toma el ticket de mayor prioridad asignado al usuario en el proyecto SCRUM de Jira con estado "Tareas por hacer", lo resume, propone un plan de implementación en plan mode y, solo cuando el usuario aprueba el plan, mueve el ticket a "En curso".
disable-model-invocation: true
---

# priority-ticket

Sigue estos pasos en orden. Usa siempre el servidor MCP `atlassian` de este proyecto (definido en `.mcp.json`, con herramientas `mcp__atlassian__*`). Si sus herramientas no aparecen, búscalas con ToolSearch (por ejemplo `searchJiraIssuesUsingJql`) antes de dar el servidor por no disponible.

## 1. Encontrar el ticket

1. Obtén el `cloudId` con `mcp__atlassian__getAccessibleAtlassianResources`.
2. Busca con `mcp__atlassian__searchJiraIssuesUsingJql` usando este JQL:

   ```
   project = SCRUM AND assignee = currentUser() AND status = "Tareas por hacer" ORDER BY priority DESC, created ASC
   ```

   Pide los campos `summary`, `status`, `priority`, `issuetype`.
3. Quédate con el primer resultado, que es el de mayor prioridad. Si hay empate de prioridad, gana el más antiguo.
4. **Si no hay resultados**, dile al usuario que no tiene tickets asignados en "Tareas por hacer" en el proyecto SCRUM y **detente**. No entres en plan mode ni sigas con los demás pasos.

## 2. Resumir el ticket

1. Lee el ticket completo con `mcp__atlassian__getJiraIssue` (`responseContentFormat: "markdown"`).
2. Muestra al usuario un resumen breve:
   - Clave con enlace, tipo, prioridad y título.
   - Qué pide el ticket, en dos o tres frases.
   - Criterios de aceptación, en lista. Búscalos en la descripción (secciones como "Criterios de aceptación", "Acceptance criteria" o "AC") y, si no están ahí, en los campos personalizados. Si el ticket no tiene criterios, dilo explícitamente.

## 3. Planificar (sin modificar archivos)

1. Entra en plan mode con `EnterPlanMode`.
2. Explora el código necesario para implementar el ticket. Usa solo herramientas de lectura y no modifiques ningún archivo.
   - El trabajo va en `frontend/`. El backend (`backend/`) no se modifica: se lee como contrato.
   - Si el ticket no especifica algún campo, regla de validación, endpoint o forma de respuesta, búscalo en el backend: `backend/start/routes.ts`, `backend/app/validators/`, `backend/app/controllers/`, `backend/app/transformers/` y `backend/providers/api_provider.ts`. En el plan indica qué datos salen del ticket y cuáles del backend.
3. Escribe el plan de implementación: archivos que se crearán o modificarán, dependencias nuevas, pasos en orden, cómo se cubre cada criterio de aceptación y cómo se verificará. Señala también las dudas o ambigüedades del ticket.
4. Presenta el plan con `ExitPlanMode` para que el usuario lo apruebe.

## 4. Mover el ticket a "En curso" (solo tras la aprobación)

- **Si el usuario rechaza el plan o pide cambios**, no toques Jira. Ajusta el plan y vuelve a presentarlo.
- **Cuando el usuario apruebe el plan:**
  1. Obtén las transiciones disponibles con `mcp__atlassian__getTransitionsForJiraIssue`.
  2. Elige la transición cuyo estado destino sea "En curso" y aplícala con `mcp__atlassian__transitionJiraIssue`. Si no existe esa transición, díselo al usuario y no apliques ninguna otra.
  3. Confirma al usuario que el ticket pasó a "En curso", con el enlace al ticket.
  4. Detente y pregunta al usuario si quiere empezar la implementación. No empieces a implementar sin que te lo pida.
