---
name: priority-ticket
description: Trae de Jira el ticket de mayor prioridad asignado al usuario en «Por hacer», resume sus criterios de aceptación, propone un plan de implementación en plan mode y, al aprobarse, mueve el ticket a «En curso». Usar cuando el usuario escriba /priority-ticket o pida empezar con su siguiente ticket prioritario.
disable-model-invocation: true
allowed-tools: mcp__atlassian__getAccessibleAtlassianResources, mcp__atlassian__atlassianUserInfo, mcp__atlassian__searchJiraIssuesUsingJql, mcp__atlassian__getJiraIssue, mcp__atlassian__getTransitionsForJiraIssue, mcp__atlassian__transitionJiraIssue, EnterPlanMode, ExitPlanMode, Read, Glob, Grep
---

# /priority-ticket

Flujo para arrancar el siguiente ticket prioritario de Jira en este proyecto (FlowSync).

## Restricciones (obligatorias)

- **Usa solo el servidor MCP `atlassian` del proyecto** (definido en `.mcp.json`), es decir, herramientas `mcp__atlassian__*`. No uses `mcp__claude_ai_Atlassian_MCP__*` ni ningún otro conector de Atlassian. Si el servidor `atlassian` no está conectado, detente y pide al usuario que lo conecte con `/mcp`.
- **Mientras propones el plan (pasos 1–3) no hagas commit**, ni `git push`, ni crees ramas o PRs, ni implementes código.
- **Tras aprobarse el plan**, sigue la sección *Process Rules* de `CLAUDE.md` (rama nueva, `/commit`, `gh pr create` contra el upstream, revisión con `adversarial-reviewer`, respuesta final solo con la URL del PR).

## Pasos

### 1. Obtener el ticket

1. Llama a `mcp__atlassian__getAccessibleAtlassianResources` una vez y reutiliza el `cloudId` devuelto. Si hay varios sitios, pregunta al usuario cuál usar.
2. Busca con `mcp__atlassian__searchJiraIssuesUsingJql` usando:
   ```
   assignee = currentUser() AND status = "Por hacer" ORDER BY priority DESC, created ASC
   ```
   con `maxResults: 1`. Pide los campos `summary`, `description`, `priority`, `status`, `issuetype` y `labels`.
3. Si no hay resultados, informa al usuario que no tiene tickets asignados en «Por hacer» y termina.
4. Obtén el detalle completo con `mcp__atlassian__getJiraIssue` (incluye descripción y campos personalizados con `view: full` si los criterios de aceptación no aparecen en la descripción).

### 2. Resumir criterios de aceptación

Muestra al usuario:

- **Clave y título** (p. ej. `FS-12 — Pantalla de login`), prioridad y tipo.
- **Criterios de aceptación** resumidos en una lista concisa. Búscalos en la descripción (secciones como "Criterios de aceptación", "Acceptance Criteria", "AC", listas Dado/Cuando/Entonces) o en un campo personalizado. Si no existen explícitamente, dilo y deriva los criterios implícitos de la descripción, marcándolos como inferidos.
- Ambigüedades o información que falte en el ticket.

### 3. Plan mode

1. Llama a `EnterPlanMode`.
2. Explora el código relevante (solo lectura). Recuerda el contexto del proyecto en `CLAUDE.md`: el backend (AdonisJS) es de solo lectura; el trabajo ocurre en `frontend/`. Revisa `backend/start/routes.ts`, `backend/app/validators/user.ts` y `backend/app/transformers/user_transformer.ts` cuando el ticket consuma la API.
3. Redacta un plan de implementación que:
   - Mapee cada criterio de aceptación a los cambios concretos (archivos a crear/modificar).
   - Indique dependencias nuevas (los componentes de UI usan shadcn/ui copiados al repo).
   - Incluya cómo verificarlo (`npm run build`, `npm run lint`, prueba manual en el navegador).
   - Termine con los pasos de las *Process Rules* de `CLAUDE.md` (rama, commit con `/commit`, PR, revisión adversarial).
4. Presenta el plan con `ExitPlanMode` para que el usuario lo apruebe.

### 4. Al aprobar el plan

Solo si el usuario aprueba el plan:

1. Llama a `mcp__atlassian__getTransitionsForJiraIssue` para el ticket y localiza la transición cuyo destino sea «En curso».
2. Ejecuta `mcp__atlassian__transitionJiraIssue` con ese `transition.id`.
3. Confirma al usuario que el ticket se movió a «En curso». Si no existe esa transición, lista las disponibles y pregunta cuál usar; no muevas el ticket a otro estado sin confirmación.
4. Continúa con la implementación siguiendo las *Process Rules* de `CLAUDE.md`, en su orden: crea la rama antes de tocar código, implementa el plan aprobado, haz el commit con `/commit`, abre el PR con `gh pr create` contra el upstream, revísalo con el subagente `adversarial-reviewer` y responde en el chat solo con la URL del PR.

Si el usuario rechaza el plan, no muevas el ticket: ajusta el plan con su feedback y vuelve a presentarlo.
