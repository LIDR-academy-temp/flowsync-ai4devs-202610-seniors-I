# Trazabilidad: «Lo que cada tarea muestra de su responsable»

Spec: `openspec/specs/tasks/spec.md` · Requisito: **Lo que cada tarea muestra de su responsable**

- **Scenarios del requisito:** 3
- **Scenarios cubiertos:** 2

## Matriz

Tests en `backend/tests/functional/tasks/assignee.spec.ts`, grupo `Tasks | responsable`. Hay un test por scenario y lectura: la creación (`POST /tasks`), la tarea suelta (`GET /tasks/:id`) y la lista (`GET /tasks`). La suelta y la lista las lee otra cuenta.

| Scenario (en una línea) | Prueba que lo cubre (nombre en la suite) | Estado | Si «No lo sé», qué faltó |
|---|---|---|---|
| La tarea no filtra datos de la cuenta: su `assignee`, al crearla, suelta o en la lista, no trae el email ni ningún dato de acceso | «la tarea no expone el email ni datos de acceso de su responsable (al crearla)» ✖<br>«la tarea no expone el email ni datos de acceso de su responsable (suelta)» ✔<br>«la tarea no expone el email ni datos de acceso de su responsable (en la lista)» ✖<br>«la tarea no expone las fechas de la cuenta de su responsable (al crearla)» ✖<br>«la tarea no expone las fechas de la cuenta de su responsable (suelta)» ✔<br>«la tarea no expone las fechas de la cuenta de su responsable (en la lista)» ✖ | No lo sé | El requisito prohíbe «ningún otro dato» y el scenario solo nombra email y acceso. No está fijado qué otros datos de la cuenta cuentan, por ejemplo el `id` |
| Responsable sin nombre: `assignee.fullName` llega nulo y sus iniciales siguen llegando | «un responsable sin nombre llega con nombre nulo y con iniciales (al crearla)» ✔<br>«un responsable sin nombre llega con nombre nulo y con iniciales (suelta)» ✔<br>«un responsable sin nombre llega con nombre nulo y con iniciales (en la lista)» ✔ | Cubierto | — |
| Responsable identificable: si se llama "Ada Lovelace", su `assignee` trae ese nombre y sus iniciales | «el responsable de una tarea trae su nombre y sus iniciales (al crearla)» ✔<br>«el responsable de una tarea trae su nombre y sus iniciales (suelta)» ✔<br>«el responsable de una tarea trae su nombre y sus iniciales (en la lista)» ✔ | Cubierto | — |

**Resultado de `npm test`:** 28 en verde y 4 en rojo, de 32. Los cuatro rojos son del scenario 1, al crear la tarea y en la lista: `expected { id: 6, …(5) } to not have nested property 'email'` y `… 'createdAt'`. Esas dos lecturas sacan el responsable con `UserTransformer`, que incluye `email`, `createdAt` y `updatedAt`. La tarea suelta usa `TaskAssigneeTransformer`, que no los incluye. Los rojos se entregan tal cual: no se ha tocado el código.

Orden por prioridad: el primero es el único que trata de exponer datos de una cuenta. Los otros dos son de presentación.

**Decisiones para escribir los tests** (la spec no las fija; no se modifica, queda fuera del alcance):

- **Datos de la cuenta que se comprueban:** el scenario 1 se prueba con dos tests por lectura. Uno prohíbe el email, la contraseña y el token, que son los datos que nombra el scenario. El otro prohíbe `createdAt` y `updatedAt`, que el scenario no nombra pero el requisito sí prohíbe con «ningún otro dato de esa cuenta».
- **«Obtener una tarea»:** incluye la tarea suelta (`GET /tasks/:id`), la lista (`GET /tasks`) y la creación (`POST /tasks`).
- **Quién lee:** la tarea suelta y la lista las lee otra cuenta, no el responsable. Hoy una tarea nace a nombre de quien la crea, así que si la lee su dueño no se revela nada a nadie. Pero eso podría cambiar, y la spec no limita el scenario al dueño.
- **Responsable sin nombre:** se comprueba que el nombre sea nulo y que las iniciales no estén vacías, sin fijar su valor.

## Tres líneas

1. **Cubiertos según mi estimación antes de mirar / cubiertos de verdad:** 0 / 0
2. **Hueco de test o de spec:** «La tarea no filtra datos de cuenta». Es un hueco de spec. La spec no define qué son «datos de cuenta», y el scenario no dice qué es un «dato de acceso». Quizá se refiere a datos personales. Ningún scenario llega a datos como el `id`. Lo ideal sería revisar el PRD.
3. **Lo que el scenario no decidía y tuve que decidir yo:** el alcance. El requisito no dice para quién está restringida la visualización de los datos, y el scenario es vago en el detalle. Como el alcance no está bien especificado, decidí que fuera total: la lista, la tarea suelta y la creación, y que la tarea la lea también otra cuenta. Mostrar al dueño sus datos cuando crea la tarea no es una fuga de información, pero es innecesario y es un punto a especificar.
