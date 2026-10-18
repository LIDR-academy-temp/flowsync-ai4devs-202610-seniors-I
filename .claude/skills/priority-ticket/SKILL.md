---
name: priority-ticket
description: Trae el ticket de mayor prioridad en To Do desde Jira FLOW, resume sus criterios y entra en plan mode para implementarlo.
---

Cuando el usuario invoque `/priority-ticket`, sigue estos pasos en orden:

## 1. Buscar el ticket prioritario

Usa el MCP de Atlassian para ejecutar esta búsqueda JQL en el proyecto FLOW:

```
project = FLOW AND assignee = currentUser() AND status = "To Do" ORDER BY priority DESC, created ASC
```

- Usa `searchJiraIssuesUsingJql` con view `"full"` para obtener la descripción completa.
- Si no hay resultados, responde "No hay work items en To Do asignados a ti en FLOW" y para. No hagas nada más.

## 2. Mostrar resumen del ticket

Del primer resultado (el de mayor prioridad), muestra:

- **Clave** (e.g. FLOW-4)
- **Título**
- **Criterios de aceptación**: lista resumida tal como aparecen en la descripción del ticket, sin reescribirlos ni añadir criterios propios.

## 3. Proponer plan de implementación

Entra en plan mode y propón cómo implementar el ticket en este repo:

- Qué archivos crear o tocar, en qué orden.
- Qué partes del backend hay que leer antes de implementar, porque el ticket no las especifica (validadores, transformers, rutas, modelos).
- No escribas código ni edites ningún archivo del proyecto en este paso.

Espera la aprobación explícita del usuario antes de continuar.

## 4. Mover el ticket a "In Progress"

Solo cuando el usuario apruebe el plan, usa el MCP de Atlassian para mover el work item a estado **"In Progress"** (usa `transitionJiraIssue` o la operación equivalente descubierta vía `discover`).

Si el usuario no aprueba, no muevas el ticket.
