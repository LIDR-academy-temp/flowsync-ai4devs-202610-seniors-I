---
name: priority-ticket
description: Trae de Jira el ticket de mayor prioridad asignado al usuario en «Por hacer», resume sus criterios de aceptación, entra en plan mode y propone cómo implementarlo; al aprobar el plan, lo mueve a «En curso». Úsala cuando el usuario pida empezar el siguiente ticket o el más prioritario.
disable-model-invocation: true
---

# /priority-ticket

Usa el servidor MCP `atlassian` (sitio `aisos-team.atlassian.net`, proyecto `KAN`).

1. **Busca el ticket.** Con `searchJiraIssuesUsingJql`:
   ```
   project = KAN AND assignee = currentUser() AND statusCategory = "To Do" ORDER BY priority DESC, created ASC
   ```
   Filtra por `statusCategory`, no por nombre de estado: el tablero puede estar en inglés («To Do») o en español («Por hacer»). Quédate con el primero. Si no hay ninguno, dilo y para.

2. **Léelo entero** con `getJiraIssue` (descripción en markdown). No inventes criterios que no estén en el ticket.

3. **Resume** en el chat: clave, título, prioridad y los criterios de aceptación como lista, uno por línea, tal como los escribe el ticket.

4. **Entra en plan mode** (`EnterPlanMode`) y, antes de proponer nada, explora el código que el ticket toca. Si el ticket deja huecos (campos obligatorios, formatos, códigos de error…), resuélvelos leyendo el código real (validadores, rutas, transformers del backend), no suponiendo. El plan debe:
   - mapear cada criterio de aceptación a los archivos y cambios que lo cumplen;
   - listar los archivos a crear o modificar;
   - señalar lo que el ticket no especifica y cómo lo has resuelto (citando el archivo);
   - respetar las convenciones de `CLAUDE.md` y sus reglas de proceso (rama nueva antes de tocar código).

5. **Al aprobarse el plan**, y solo entonces, mueve el ticket a «En curso»: `getTransitionsForJiraIssue` y aplica con `transitionJiraIssue` la transición cuyo destino tenga categoría «In Progress» (se llame «In Progress» o «En curso»). Si el plan se rechaza, no muevas el ticket.
