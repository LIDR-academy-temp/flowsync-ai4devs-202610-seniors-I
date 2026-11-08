# Matriz de trazabilidad: «Lo que cada tarea muestra de su responsable»

Requisito de `openspec/specs/tasks/spec.md`. Tests revisados: `backend/tests/functional/` (solo existe `auth/`; no hay ningún test de `tasks` ni ninguno que mencione `assignee`).

- **Scenarios del requisito:** 3
- **Scenarios cubiertos:** 0

La matriz tiene 4 filas: los 3 scenarios de la spec y 1 derivada del enunciado del requisito, cuya regla del email no tiene scenario propio.

| Scenario | Test que lo cubre | Estado | Qué faltó para decidir |
|---|---|---|---|
| Al obtener una tarea cuyo responsable es "Ada Lovelace", su `assignee` trae ese nombre y sus iniciales. | `un nombre de dos palabras da la inicial de cada una` | No lo sé | Se parece: afirma «AL» en el `user` del login, no en el `assignee` de una tarea. |
| Al obtener cualquier tarea, suelta o en la lista, su `assignee` no incluye email ni datos de acceso. (Derivada del enunciado del requisito: su «NO SHALL» del email no tiene scenario propio; el scenario 3 solo lo menciona para el caso sin nombre.) | `la contraseña nunca sale en la respuesta` | No lo sé | Se parece: mira el `user` del registro y solo la contraseña, no email ni tarea. |
| Si el responsable se registró sin nombre, su nombre llega nulo y sus iniciales siguen llegando en la tarea. | `sin nombre, las iniciales salen del email` | No lo sé | Se parece: afirma iniciales de cuenta sin nombre en el login, no en una tarea. |
| Si el responsable no tiene nombre, en su lugar se muestra "Sin nombre" junto a sus iniciales, y nunca su email ni un identificador interno. | — | No lo sé | Es un scenario de interfaz dentro de la spec de la API; mi test afirma `null`, no "Sin nombre", y no comprueba el `id`. |

**Tests escritos:** 3, en `backend/tests/functional/tasks/assignee.spec.ts` · **En rojo:** 1, el del email: falla en la lista de tareas, donde el `assignee` llega con `id` y `email`; la tarea suelta pasa.

Parte B:

1. Creía cubiertos 3; pero realmente estaban cubiertos 0.
2. "Responsable sin nombre": la spec lo trae dos veces, una dice `null` y otra "Sin nombre" sin identificador interno; afirmé `null` sin saber si la otra era regla de la API o de la interfaz, y el `assignee` sí lleva `id`.
3. El scenario no dice quién obtiene la tarea; en los tres tests el responsable se mira a sí mismo con su propio token, y no sé si con otro observador cambiaría.
