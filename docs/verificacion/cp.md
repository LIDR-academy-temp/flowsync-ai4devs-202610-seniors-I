# Verificación: «Lo que cada tarea muestra de su responsable»

Requisito de `openspec/specs/tasks/spec.md`.

**Scenarios del requisito:** 3
**Cubiertos:** 0

## Matriz de trazabilidad

| Scenario                                                                                                                            | Prueba que lo cubre | Estado      | Si «No lo sé», qué faltó |
| ----------------------------------------------------------------------------------------------------------------------------------- | ------------------- | ----------- | ------------------------ |
| Responsable identificable: una tarea cuyo responsable es "Ada Lovelace" trae en `assignee` ese nombre y sus iniciales.              | —                   | No cubierto | —                        |
| La tarea no filtra datos de cuenta: el `assignee` de cualquier tarea, suelta o en la lista, no incluye el email ni datos de acceso. | —                   | No cubierto | —                        |
| Responsable sin nombre: si el responsable se registró sin nombre, su nombre llega nulo y sus iniciales siguen llegando.             | —                   | No cubierto | —                        |

La matriz recoge lo que la suite cubría antes de escribir nada. No había ningún test en `backend/tests/functional/tasks/` ni en ningún otro sitio de la suite que tocara `assignee`, así que las tres filas quedaron en «No cubierto» sin margen para un «No lo sé». El que más se parece, `Auth | iniciales › sin nombre, las iniciales salen del email` (`backend/tests/functional/auth/initials.spec.ts`), comprueba las iniciales en la respuesta del login, no en el responsable de una tarea, así que no cubre el tercer scenario.

## Tests escritos (A.2)

En `backend/tests/functional/tasks/assignee.spec.ts`, grupo `Tasks | responsable`, uno por fila. Ejecutados con `node ace test functional --files=tasks/assignee`: 2 en verde y 1 en rojo.

| Scenario                           | Test                                                                 | Resultado |
| ---------------------------------- | -------------------------------------------------------------------- | --------- |
| Responsable identificable          | `el responsable llega con su nombre y sus iniciales`                 | Verde     |
| La tarea no filtra datos de cuenta | `el responsable de una tarea no expone su email ni datos de acceso`  | **Rojo**  |
| Responsable sin nombre             | `un responsable sin nombre llega con el nombre nulo y con iniciales` | Verde     |

El rojo es del código, no del test: el `assignee` de `GET /tasks` trae `email`, `createdAt` y `updatedAt` de la cuenta, porque `TaskTransformer` usa `UserTransformer` desde el commit `0aa5af7`. Se entrega rojo, sin arreglar el código ni aflojar el test.

Queda una duda abierta en esa misma fila: el test cayó en la comprobación de la lista y no llegó a ejecutar la de la tarea suelta (`GET /tasks/:id`). Que la tarea suelta no expone el email se sabe por leer `TaskAssigneeTransformer`, no porque un test lo haya demostrado.

## Las tres líneas

1. Creía cubiertos: 3. Estaban cubiertos: 0.
2. «La tarea no filtra datos de cuenta»: no supe si era hueco de test o de spec porque el scenario solo nombra las lecturas («suelta o dentro de la lista») y los «datos de acceso», mientras que el requisito prohíbe exponer junto a la tarea «ningún otro dato de esa cuenta», así que el email y las fechas de la cuenta que devuelven `POST /tasks` y `PATCH /tasks/:id/status` incumplen la regla escrita sin que ningún scenario lo anticipe, y un test fiel al scenario puede salir verde con el requisito incumplido.
3. Yo decidí qué es un «dato de acceso» (el email y cualquier rastro de `password`, dejando fuera el `id`, `createdAt` y `updatedAt` de la cuenta aunque el requisito los prohíbe) y qué lecturas cuentan como «cualquier tarea» (solo `GET /tasks` y `GET /tasks/:id`, no las respuestas de `POST /tasks` ni de `PATCH /tasks/:id/status`, que también la devuelven).
