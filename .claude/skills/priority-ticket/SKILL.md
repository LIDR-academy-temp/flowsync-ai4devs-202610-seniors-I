---
name: priority-ticket
description: Trae de Jira el ticket de mayor prioridad asignado a mí en «Por hacer», resume sus criterios de aceptación y propone en plan mode cómo implementarlo. Al aprobar el plan, lo mueve a «En curso». Úsala para empezar el siguiente ticket.
---

Trae el ticket de mayor prioridad asignado a mí en «Por hacer», resume sus criterios de aceptación y entra en plan mode para proponer cómo implementarlo.

1. Busca con el MCP de Atlassian: `assignee = currentUser() AND status = "Por hacer" ORDER BY priority DESC, created ASC`. Quédate con el primero. Si no hay ninguno, dilo y para.
2. Muestra la clave, el título y los criterios de aceptación en una lista numerada.
3. Entra en plan mode. Antes de proponer nada, lee lo que el ticket no especifica: en el backend, las rutas, los validadores y los transformers son el contrato de la API.
4. El plan cubre cada criterio de aceptación por su número y lista los archivos que vas a crear o tocar.
5. No escribas código antes de que apruebe el plan. Solo cuando lo apruebe, mueve el ticket a «En curso».
