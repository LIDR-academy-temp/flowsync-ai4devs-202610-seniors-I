---
name: priority-ticket
description: Toma el ticket de Jira de mayor prioridad asignado al usuario en «Por hacer» (To Do) del proyecto FLOW, resume sus criterios de aceptación, entra en plan mode para proponer cómo implementarlo en el repo actual y, cuando el usuario aprueba el plan, lo mueve a «En curso» (In Progress). Úsala siempre que el usuario pida su siguiente ticket, qué le toca hacer, "dame mi ticket más prioritario", "¿qué sigue en Jira?", "arranquemos el próximo ticket", "toma la siguiente tarea de FLOW" o invoque /priority-ticket, aunque no diga "prioridad" ni "plan mode" explícitamente.
---
 
# priority-ticket
 
Flujo para empezar a trabajar en el siguiente ticket: encontrarlo, entenderlo, planearlo con el usuario y, solo cuando el plan está aprobado, marcarlo como en curso en Jira. El orden importa: el ticket se mueve **después** de la aprobación porque moverlo antes le diría al equipo que alguien ya lo está trabajando cuando todavía puede rechazarse o replantearse.
 
Responde al usuario en español.
 
## Contexto fijo
 
- Sitio Jira: `https://guillermoalvarez.atlassian.net` (puedes pasar esa URL como `cloudId`, o llamar una vez a `getAccessibleAtlassianResources` y reutilizar el id).
- Proyecto: **FLOW**. No busques en otros proyectos.
- Los estados del sitio están en inglés por debajo («To Do», «In Progress», «Done») aunque el usuario los llame «Por hacer» y «En curso». Filtra por **categoría de estado** (`statusCategory`), no por nombre, para que el flujo no se rompa si alguien renombra o traduce los estados.
## Paso 1 — Encontrar el ticket
 
La "mayor prioridad" es el **orden del tablero (Rank)**: el ticket que está más arriba en la columna «Por hacer». Así lo ordena el equipo a mano, por eso pesa más que el campo Prioridad.
 
Busca con `searchJiraIssuesUsingJql`:
 
```
project = FLOW AND assignee = currentUser() AND statusCategory = "To Do" ORDER BY Rank ASC
```
 
Pide unos 5 resultados (`maxResults: 5`) con `fields: ["summary","status","priority","issuetype"]`. El primero es el elegido; los demás sirven para mencionar en una línea qué viene después.
 
**Si no hay resultados:** dilo claramente y detente. Antes de parar, busca los tuyos en curso (`statusCategory = "In Progress"`) y, si hay alguno, menciónalo ("No tienes nada en Por hacer; sigues con FLOW-3 en curso"). No ofrezcas tickets sin asignar ni de otras personas: el usuario prefiere que la skill pare.
 
## Paso 2 — Leer el ticket y sus criterios de aceptación
 
Trae el ticket completo con `getJiraIssue` usando `view: "evidence"` (incluye campos personalizados y enlaces a otros tickets).
 
En este proyecto los criterios de aceptación no tienen un lugar fijo, así que búscalos en este orden:
 
1. **Campo personalizado** cuyo nombre se parezca a «Acceptance Criteria» / «Criterios de aceptación» (en `fields.customFields`).
2. **Sección en la descripción** con un encabezado como «Criterios de aceptación», «Acceptance criteria», «AC», «Definition of Done», o listas con formato Dado/Cuando/Entonces (Given/When/Then).
3. Checklists o listas de tareas dentro de la descripción.
Si no aparecen en ningún lado, **infiérelos** de la descripción y el resumen, y márcalos explícitamente como inferidos. Esto es importante: el usuario debe saber qué viene del ticket y qué es interpretación tuya, porque un criterio inventado que parece oficial puede llevar a implementar lo que nadie pidió.
 
Muestra un resumen corto con este formato:
 
```
**FLOW-N — <resumen>** (<tipo>, prioridad <prioridad>)
<enlace al ticket>
 
<1–2 frases sobre qué se pide y por qué, en tus palabras>
 
**Criterios de aceptación** (<del ticket | inferidos — no había criterios escritos>)
- [ ] ...
- [ ] ...
 
Siguientes en tu cola: FLOW-X, FLOW-Y
```
 
Si hay tickets enlazados que bloquean este (p. ej. "is blocked by" sin terminar), señálalo antes de planear: puede cambiar si tiene sentido empezar.
 
## Paso 3 — Plan mode
 
Entra en plan mode con `EnterPlanMode` (cárgala con ToolSearch si no está disponible). Dentro de plan mode:
 
1. Explora el repo actual para entender dónde encaja el cambio: estructura, patrones existentes, archivos que probablemente se tocan, tests existentes. Basa el plan en el código real, no en suposiciones genéricas.
2. Redacta el plan:
   - Enfoque general en 2–3 frases.
   - Pasos concretos, con los archivos que crearás o modificarás.
   - **Cómo se cumple cada criterio de aceptación**: relaciona cada criterio con el paso o la prueba que lo cubre. Si algún criterio queda sin cubrir, dilo.
   - Pruebas a añadir o ejecutar.
   - Dudas o riesgos abiertos (ambigüedades del ticket, decisiones que el usuario debería tomar).
3. Presenta el plan con `ExitPlanMode` para que el usuario lo apruebe.
Si el usuario pide cambios, ajusta el plan y vuelve a presentarlo. Si lo rechaza, no muevas el ticket.
 
## Paso 4 — Al aprobar: mover a «En curso»
 
Solo después de que el usuario apruebe el plan:
 
1. Obtén las transiciones disponibles del ticket. No es una herramienta primaria: usa `discover` con algo como "list Jira issue transitions" y ejecútala con `executeRead`.
2. Elige la transición cuyo **estado destino** pertenezca a la categoría In Progress (normalmente «In Progress» / «En curso»). Ojo: el nombre de la transición puede diferir del estado destino; elige por destino.
3. Ejecuta `transitionJiraIssue` con ese `transitionId`.
4. Confirma con el estado en que realmente quedó el ticket (lo devuelve la propia llamada): "FLOW-N movido a In Progress."
Si no existe una transición directa a In Progress, o falla, no improvises otro estado: informa qué transiciones hay y pregunta.
 
No hagas nada más en Jira (ni comentarios ni reasignaciones) y no crees ramas: el usuario solo quiere el cambio de estado. Después, continúa con la implementación según el plan aprobado si el usuario lo pide o si el flujo de plan mode lo implica.
