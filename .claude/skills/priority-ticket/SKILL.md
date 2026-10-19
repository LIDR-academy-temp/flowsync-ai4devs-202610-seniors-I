---
name: priority-ticket
description: Busca el ticket de mayor prioridad asignado a la persona usuaria en «Por hacer», resume sus criterios de aceptación, propone un plan y lo mueve a «En curso» solo después de que se apruebe el plan.
argument-hint: [filtro opcional del ticket]
---

# Trabajar en el ticket de mayor prioridad

1. Identifica a la persona usuaria actual y qué integración con el gestor de tareas está conectada en esta sesión. Busca los tickets asignados a esa persona cuyo estado sea exactamente `Por hacer`. Si no hay acceso al gestor, no se puede identificar a la persona o falta la integración, explica el bloqueo y pide que se conecte; no inventes un ticket.
2. Elige el ticket coincidente de mayor prioridad. Si hay empate, prioriza el de creación más antigua y luego el identificador estable del ticket. Si `$ARGUMENTS` tiene contenido, úsalo solo para acotar o desambiguar la búsqueda. Muestra el título, identificador, prioridad y enlace del ticket.
3. Lee la descripción completa y los comentarios pertinentes al alcance. Resume cada criterio de aceptación como una viñeta verificable y señala las ambigüedades sin resolverlas por tu cuenta.
4. Activa el modo de planificación con el control disponible `EnterPlanMode`. Inspecciona el código en modo de solo lectura cuando haga falta y prepara un plan concreto, paso a paso, vinculado a archivos y criterios de aceptación. Mientras planificas, no edites archivos ni cambies el estado del ticket.
5. Presenta el plan y espera la aprobación explícita de la persona usuaria. Si pide cambios, revisa el plan y vuelve a esperar su aprobación.
6. Tras la aprobación, sal del modo de planificación y cambia el estado del ticket a `En curso` mediante el gestor conectado. Confirma el cambio de estado y luego implementa el plan aprobado. Si falla la actualización, informa el problema y no afirmes que el cambio se realizó.
