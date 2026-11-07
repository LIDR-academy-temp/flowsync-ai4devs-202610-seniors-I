# Verificación: «Lo que cada tarea muestra de su responsable»

Spec: `openspec/specs/tasks/spec.md` → Requirement «Lo que cada tarea muestra de su responsable»

- **Scenarios del requisito:** 3
- **Scenarios cubiertos:** 0

## Matriz de trazabilidad

| Scenario (una línea) | Prueba que lo cubre (nombre en la suite) | Estado | Si «No lo sé», qué faltó |
|---|---|---|---|
| Responsable identificable: una tarea cuyo responsable es "Ada Lovelace" trae en `assignee` ese nombre y sus iniciales | Ninguna. Se parece `Auth \| registro › registrarse devuelve la cuenta y un token que ya sirve` (afirma `fullName` e `initials` = `AL`), pero sobre la cuenta, no sobre el `assignee` de una tarea | No cubierto | |
| La tarea no filtra datos de cuenta: el `assignee` de cualquier tarea (suelta o en lista) no trae email ni datos de acceso | Ninguna. No hay ningún test que pida `/api/v1/tasks` | No cubierto | |
| Responsable sin nombre: si la cuenta se registró sin nombre, `assignee` trae nombre nulo y sí trae iniciales | Ninguna. Se parece `Auth \| iniciales › sin nombre, las iniciales salen del email` (afirma `initials` = `AE` con `fullName` null), pero en la respuesta de login, no en el `assignee` | No cubierto | |

## Tests añadidos

En `backend/tests/functional/tasks/assignee.spec.ts` (grupo `Tasks | responsable`), uno por scenario. Cada uno lee la tarea suelta (`GET /api/v1/tasks/:id`) y dentro de la lista (`GET /api/v1/tasks`):

| Scenario | Test | Resultado |
|---|---|---|
| Responsable identificable | `el responsable se identifica por su nombre y sus iniciales` | ✔ verde |
| La tarea no filtra datos de cuenta | `el responsable de una tarea no expone su email ni datos de acceso` | ✖ **rojo**: en la lista el `assignee` trae `email` (`TaskTransformer` usa `UserTransformer`). Se entrega en rojo, sin arreglar |
| Responsable sin nombre | `un responsable sin nombre llega con nombre nulo y con iniciales` | ✔ verde |

## Las tres líneas

1. **Creía cubiertos 5; estaban cubiertos 0** (de 3).
2. **«La tarea no filtra datos de cuenta»**: el requisito dice que junto a la tarea no sale *ningún otro dato* de la cuenta salvo nombre e iniciales, pero el scenario solo nombra el email y los «datos de acceso»; el `assignee` trae además `id` (y en la lista `createdAt`/`updatedAt`), y no sé si eso es un hueco de test (la regla ya lo prohíbe y nadie lo comprueba) o de spec (nadie escribió si el `id` cuenta como «dato de la cuenta»).
3. **Las iniciales de una cuenta sin nombre**: el scenario solo dice que «siguen llegando, sin recurrir a su email», y yo fijé que sean exactamente `AE`, que salen precisamente del email (`ada@example.com`); también decidí que «se obtiene una tarea» son `GET /tasks/:id` y `GET /tasks`, dejando fuera la respuesta de `POST /tasks`, que usa el mismo transformer con email.

## Revisión adversarial (después del reloj)

Hecha con el subagente `adversarial-reviewer` (read-only) sobre el diff de la rama. **Los tests se dejan como quedaron al sonar el reloj**; esto solo anota lo que les falta.

No pudo refutar: la matriz (ningún test previo toca `/api/v1/tasks`, 0/3 es cierto), el motivo del rojo (`TaskTransformer` → `UserTransformer` con `email`) ni el alcance del diff.

Debilidades que encontró en mis tests:

1. **La fuga no está solo en la lista.** `POST /tasks` y `PATCH /tasks/:id/status` también serializan con `TaskTransformer` y devuelven el email del responsable; arreglar solo `index` dejaría el test en verde con la fuga viva.
2. **El test del email comprueba menos que el requisito.** Solo prohíbe `email`/`password`; la lista expone además `createdAt`/`updatedAt` de la cuenta y el test no lo ve. Fijar las claves exactas (`id`, `fullName`, `initials`) lo cerraría.
3. **No se afirma que la tarea esté en la lista.** Si no apareciera, el fallo sería un `TypeError` opaco en vez de una aserción clara.
4. Menores: el primer `assert` rojo oculta los siguientes del bucle; el test 1 usa una sola cuenta (no distingue de quién es la tarea); `client: any` y login real en vez del cliente tipado.
