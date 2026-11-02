---
name: priority-ticket
description: Trae de Jira el ticket de mayor prioridad asignado al usuario en «Por hacer», resume sus criterios de aceptación, propone un plan en plan mode y, al aprobarse, mueve el ticket a «En curso».
disable-model-invocation: true
---

# /priority-ticket

Sigue estos pasos en orden. Usa las herramientas del servidor MCP `atlassian`. Si no están disponibles o piden autenticación, dilo y para: no sustituyas el ticket por uno inventado ni sigas sin él.

## 1. Trae el ticket

Busca con esta JQL y quédate con el primer resultado:

```
assignee = currentUser() AND status = "Por hacer" ORDER BY priority DESC, created ASC
```

Si no hay ningún resultado, dilo y para. Si no conoces el `cloudId`, obtenlo de los recursos accesibles de Atlassian; si hay más de un sitio, pregunta cuál usar.

Lee el ticket completo: título, descripción y criterios de aceptación.

## 2. Resume los criterios

Muestra la clave, el título, la prioridad y los criterios de aceptación en una lista breve. Señala lo que el ticket no especifica.

## 3. Entra en plan mode y propón la implementación

Entra en plan mode con la herramienta `EnterPlanMode` y explora el código antes de proponer nada. El ticket describe el producto, no todo lo que exige el código: comprueba cada contrato contra su fuente real, sin suponerlo. En un ticket de frontend, eso significa leer los validadores, las rutas, los controladores y los transformers del backend, además de la sección de API de `CLAUDE.md`.

El plan debe incluir:

- La clave del ticket.
- Los archivos que se crean o modifican.
- Cómo se cubre cada criterio de aceptación.
- Los requisitos que no aparecen en el ticket y has encontrado en el código, con el archivo donde están.
- Cómo se verificará el resultado.

Presenta el plan con `ExitPlanMode`. No toques el ticket en Jira ni el código antes de la aprobación.

## 4. Al aprobarse el plan, mueve el ticket

Solo si el usuario aprueba el plan:

1. Consulta las transiciones disponibles del ticket.
2. Aplica la que lleva a «En curso».
3. Confirma que el ticket ha quedado en ese estado.

Si no existe esa transición, no elijas otra: dilo y deja el ticket como está.

Si el usuario rechaza el plan, el ticket se queda en «Por hacer».

## 5. Continúa

Con el ticket en «En curso», implementa el plan aprobado siguiendo las reglas de `CLAUDE.md`.
