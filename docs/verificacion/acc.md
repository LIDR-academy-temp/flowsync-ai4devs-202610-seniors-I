# Trazabilidad: «Lo que cada tarea muestra de su responsable»

Requisito de `openspec/specs/tasks/spec.md`.

**Scenarios del requisito:** 3
**Cubiertos por la suite antes de añadir tests:** 0

## Matriz

| # | Scenario | Prueba que lo cubre | Estado | Qué faltó para decidir |
|---|---|---|---|---|
| 1 | Una tarea cuyo responsable es "Ada Lovelace" trae en `assignee` su nombre y sus iniciales | — (`Auth \| iniciales / un nombre de dos palabras da la inicial de cada una` se le parece, pero lee las iniciales del login, no de una tarea) | No cubierto | |
| 2 | Ninguna tarea, suelta o en la lista, trae en `assignee` el email ni otro dato de acceso | — | No cubierto | |
| 3 | Si el responsable se registró sin nombre, `fullName` llega nulo y las iniciales siguen llegando | — (`Auth \| iniciales / sin nombre, las iniciales salen del email` se le parece, pero lee las iniciales del login, no de una tarea) | No cubierto | |

## Tests añadidos (A.2)

En `backend/tests/functional/tasks/assignee.spec.ts`. Dos por scenario en vez de uno: la tarea suelta (`GET /api/v1/tasks/:id`) y la lista (`GET /api/v1/tasks`) se serializan con transformers distintos, y un solo test no diría cuál de las dos falla.

| # | Test | Resultado |
|---|---|---|
| 1 | `Tasks \| responsable — 1. Responsable identificable / la tarea suelta trae el nombre y las iniciales de su responsable` | verde |
| 2 | `Tasks \| responsable — 2. La tarea no filtra datos de cuenta / la tarea suelta no incluye el email ni otros datos de la cuenta` | verde |
| 3 | `Tasks \| responsable — 3. Responsable sin nombre / la tarea suelta trae el nombre nulo y las iniciales igualmente` | verde |


## Las tres líneas

1. **Cubiertos antes de mirar / cubiertos de verdad:**  0 de 3.
2. **Hueco de test o hueco de spec:** Candidatos: el `id` del responsable, que la tarea suelta expone aunque el requisito diga "ningún otro dato de esa cuenta"; y si la respuesta de `POST /api/v1/tasks`, que también trae el email, cuenta como "obtener una tarea".
3. **Lo que el scenario no decidía y decidí al escribir el test:** Candidatos: que las iniciales sin nombre son `AE` (sale del spec de `auth`, no de este); qué es "dato de acceso" (`email`, `password`, `createdAt`, `updatedAt`, elegidos a mano); que el `id` se admite; y que "esos datos bastan para saber quién la lleva" no se puede comprobar, así que no se comprueba.
