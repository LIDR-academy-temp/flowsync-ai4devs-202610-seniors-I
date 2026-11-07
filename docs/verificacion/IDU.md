# Matriz de trazabilidad — «Lo que cada tarea muestra de su responsable»

Requirement de `openspec/specs/tasks/spec.md`.

**Scenarios del requirement:** 3
**Cubiertos:** 2

Estado **antes** de la tarea (verificado con el subagente `requirement-coverage`): los 3 scenarios **No cubiertos** — no existía `backend/tests/functional/tasks/` ni ningún test que tocara `/api/v1/tasks` o `assignee`.

Estado **después** de escribir los tests que faltaban (`backend/tests/functional/tasks/assignee.spec.ts`, grupo `Tasks | responsable`):


| #   | Scenario                                                                                                                              | Prueba que lo cubre                                                                                     | Estado      | Qué faltó (si «No lo sé») |
| --- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | ----------- | ------------------------- |
| 1   | Responsable identificable: el `assignee` de la tarea trae el nombre y las iniciales, y bastan para saber quién la lleva.              | `Tasks | responsable` → `el responsable llega con su nombre y sus iniciales` (verde)                    | Cubierto    | —                         |
| 2   | La tarea no filtra datos de cuenta: el `assignee` (en tarea suelta o en lista) no incluye el email ni ningún otro dato de acceso.     | `Tasks | responsable` → `la tarea no filtra el email del responsable, ni suelta ni en lista` (**ROJO**) | No cubierto | —                         |
| 3   | Responsable sin nombre: si la cuenta responsable se registró sin nombre, el `fullName` llega nulo pero las iniciales siguen llegando. | `Tasks | responsable` → `un responsable sin nombre llega con fullName nulo pero con iniciales` (verde)  | Cubierto    | —                         |


> **El scenario 2 destapa un defecto real del código, y el test se entrega rojo (no se toca el código).** `GET /api/v1/tasks/:id` (tarea suelta) serializa el responsable con `TaskAssigneeTransformer` → solo `id`, `fullName`, `initials`, sin email: correcto. Pero `GET /api/v1/tasks` (la lista) y `POST /api/v1/tasks` serializan el responsable con `TaskTransformer`, que usa `UserTransformer` → **incluye `email`** (y `createdAt`/`updatedAt`). El requirement exige que el `assignee` no exponga el email «suelta o dentro de la lista», así que el test falla sobre la lista. Irónicamente, `task_assignee_transformer.ts` lleva un comentario advirtiendo de que no se reutilice `UserTransformer` por este mismo motivo — pero `TaskTransformer` lo reutiliza.

---

## Parte B — las tres líneas

1. **Cuántos scenarios creía cubiertos antes de mirar, y cuántos lo estaban:** 0 creídos / **0** reales. (Se veía fácilmente que no había ninguno porque la carpeta de test de la parte de "task " no estaba hecha.
2. **Scenario del que no supe si era hueco de test o hueco de spec:** el scenario 2 («la tarea no filtra datos de cuenta»). No es ambiguo: la regla está escrita en la spec y es el código quien no la cumple en la lista, así que es **hueco de código destapado por un hueco de test** —faltaba la prueba y, al escribirla, salta el defecto—, no un hueco de spec. 
3. **Algo que el scenario no decidía por mí y tuve que decidir al escribir el test:** el día de referencia. `GET /api/v1/tasks/:id` exige el parámetro `today` (si falta, responde 422), pero el scenario no habla de vencimiento ni dice qué día usar; elegí un día fijo arbitrario (`2026-01-01`) solo para poder leer la tarea. También decidí, para el responsable sin nombre, afirmar que las iniciales son «no vacías» en vez de un valor concreto, porque el scenario pide que «sigan llegando» pero no fija cuáles.