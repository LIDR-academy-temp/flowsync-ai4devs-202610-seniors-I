---
name: priority-ticket
description: Trae de Jira el ticket de mayor prioridad asignado al usuario en "Por hacer", resume sus criterios de aceptación, entra en plan mode para proponer la implementación y, al aprobar el plan, mueve el ticket a "En curso". Úsala cuando el usuario escriba /priority-ticket o pida "el siguiente ticket".
disable-model-invocation: true
---

# priority-ticket

Usa las herramientas del servidor MCP de Atlassian (Jira) configurado en este proyecto. Si no hay ninguna disponible, para y dile al usuario que falta conectar el MCP de Atlassian; no inventes el ticket.

## 1. Buscar el ticket

1. Obtén el `cloudId` con `getAccessibleAtlassianResources` (una sola vez) y el usuario actual con `atlassianUserInfo` si hace falta.
2. Busca con `searchJiraIssuesUsingJql`:

   ```
   assignee = currentUser() AND status = "Por hacer" ORDER BY priority DESC, created ASC
   ```

   Si el proyecto está en otro idioma y no devuelve nada, repite con `statusCategory = "To Do"`. Limita a 1 resultado.
3. Si no hay ninguno, dilo y termina. No entres en plan mode.
4. Lee el ticket completo con `getJiraIssue` (descripción y criterios de aceptación, no solo el resumen).

## 2. Resumir

Muestra al usuario, breve:
- Clave, título y prioridad del ticket.
- Los criterios de aceptación como lista numerada, tal cual están en el ticket (sin reinterpretarlos).
- Lo que el ticket **no especifica** y que haya que comprobar en el código (p. ej. campos que el backend exige y el ticket no menciona).

## 3. Plan mode

Entra en plan mode (`EnterPlanMode`). Antes de proponer nada, explora el código real: lee `CLAUDE.md` y los archivos del backend que el ticket toca (rutas, validadores, transformers) para no suponer su contrato.

El plan debe incluir:
- Archivos a crear o modificar, contados y con su ruta.
- Cómo se cubre cada criterio de aceptación (referencia por número).
- Convenciones del proyecto que se respetan.
- Cómo se verificará (lint, build, prueba manual).
- Dudas abiertas, si las hay.

Presenta el plan con `ExitPlanMode` para que el usuario lo apruebe.

## 4. Al aprobar el plan

Solo si el usuario **aprueba** el plan:
1. Obtén las transiciones con `getTransitionsForJiraIssue`.
2. Elige la que lleva a "En curso" (o "In Progress" si el tablero está en inglés) y aplícala con `transitionJiraIssue`.
3. Confirma en una línea que el ticket pasó a "En curso". Si no existe esa transición, no elijas otra: dile al usuario cuáles hay.

Si el usuario rechaza el plan o pide cambios, **no muevas el ticket**: ajusta el plan y vuelve a presentarlo.
