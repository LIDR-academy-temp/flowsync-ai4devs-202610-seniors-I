---
name: priority-ticket
description: Trae el ticket de mayor prioridad asignado al usuario en el estado "Por hacer" del tablero Jira del proyecto, resume sus criterios de aceptación y entra en plan mode para proponer la implementación. Al aprobar el plan, mueve el ticket a "En curso". Usar cuando el usuario invoque /priority-ticket o pida "trae mi siguiente ticket" / "qué tengo que hacer ahora".
---

# priority-ticket

Trae el ticket Jira de mayor prioridad asignado al usuario actual que esté en **"Por hacer"**, resume sus criterios de aceptación y propone un plan de implementación. Al aprobarse el plan, mueve el ticket a **"En curso"**.

> Los nombres de estado de este tablero son exactamente **"Por hacer"** y **"En curso"** (verificados contra el proyecto Jira real vía el MCP de Atlassian). Úsalos tal cual, literalmente, en cualquier JQL o comparación de estado. No los traduzcas ni los asumas en inglés ("To Do" / "In Progress"): si el MCP devuelve otros nombres, usa los que el MCP devuelva, no estos.

## Pasos

1. **Resolver el `cloudId`** del sitio de Atlassian con el MCP (recursos accesibles), si no se tiene ya en contexto.
2. **Buscar el ticket**: usa el MCP de Atlassian para consultar, con JQL, los issues del proyecto cuyo `assignee` sea el usuario actual y cuyo estado sea `"Por hacer"`, ordenados por prioridad descendente. Toma el primero (mayor prioridad). Si hay varios con la misma prioridad máxima, toma el más antiguo (menor fecha de creación).
   - Si no hay ningún ticket asignado al usuario en "Por hacer", dilo explícitamente y detente ahí. No sigas con los pasos siguientes.
3. **Leer el ticket completo** (resumen, descripción, criterios de aceptación) con el MCP.
4. **Resumir los criterios de aceptación** del ticket en una lista breve, antes de proponer nada. Si el ticket no trae criterios de aceptación explícitos, dilo en vez de inventarlos.
5. **Entrar en plan mode** y proponer cómo implementar el ticket: qué archivos tocarías y por qué, en qué orden, y qué parte del encargo queda ambigua (si el ticket no especifica algo, como una validación o un detalle de la API, dilo en el plan en vez de asumirlo en silencio).
6. **Al aprobarse el plan** (y solo entonces): usa el MCP de Atlassian para transicionar ese ticket al estado `"En curso"`. Confirma brevemente que quedó movido.

## Restricciones

- **No crear ni modificar tickets.** La única escritura permitida en Jira es la transición de estado del paso 6, nada más (ni campos, ni comentarios, ni descripción, ni asignación).
- **No implementar nada todavía.** Esta skill termina al mover el ticket a "En curso"; la implementación del plan aprobado es un paso posterior, fuera de esta skill.
- **No hacer nada más que lo descrito arriba.** No busques otros tickets, no toques otros issues, no cambies de proyecto Jira sin que el usuario lo pida.
