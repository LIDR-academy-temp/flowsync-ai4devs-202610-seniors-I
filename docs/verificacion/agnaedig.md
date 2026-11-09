# Matriz de trazabilidad: «Lo que cada tarea muestra de su responsable»

Requisito de `openspec/specs/tasks/spec.md`: el sistema acompaña cada tarea del nombre y las
iniciales de su responsable, y no expone junto a la tarea ningún otro dato de esa cuenta, en
particular su email.

**Scenarios cubiertos: 0 de 3**

| # | Scenario (una línea) | Prueba que lo cubre | Estado | Si «No lo sé», qué faltó |
|---|---|---|---|---|
| 1 | Al obtener una tarea de «Ada Lovelace», su `assignee` trae nombre e iniciales | Ninguna en la suite (`tests/functional/tasks/` no existe) | No cubierto | — |
| 2 | Al obtener cualquier tarea (suelta o en la lista), su `assignee` no incluye el email ni datos de acceso | Ninguna en la suite | No cubierto | — |
| 3 | Responsable sin nombre: `fullName` llega nulo y `initials` siguen llegando | Ninguna en la suite | No cubierto | — |

## Tests escritos para las filas «No cubierto» (A.2)

Archivo: `backend/tests/functional/tasks/assignee.spec.ts`. Ejecución:
`node ace test --files=assignee` con Node 24. Resultado: **2 en verde, 1 en rojo**.

| # | Test | Resultado |
|---|---|---|
| 1 | `el responsable de la tarea trae su nombre y sus iniciales` | Verde (solo comprueba la lista) |
| 2 | `la tarea no expone el email ni otros datos de la cuenta del responsable` | **Rojo**: `expected { id: 1, …(5) } to not have nested property 'email'` sobre el `assignee` de la lista. Defecto real de la app (`TaskTransformer` usa `UserTransformer`). No se arregla aquí. |
| 3 | `un responsable sin nombre llega con nombre nulo y con iniciales` | Verde (solo comprueba la lista) |

Revisión adversarial (agente genérico con las instrucciones de `adversarial-reviewer`, solo lectura,
porque `adversarial-reviewer` no estaba registrado en la sesión): confirmó que el primer fallo del test 2
era un error mío de redacción (`.query()` en vez de `.qs()`), corregido sin cambiar ninguna
aserción, y que el rojo actual es un hallazgo de la app. Huecos que señaló y que **no** cubrí: el POST
y el PATCH de estado devuelven el mismo `assignee` con email, y los tests 1 y 3 solo miran la lista.

## Lectura del código (contra la matriz)

Esto no cambia el estado de ninguna fila, pero explica por qué las filas 1 y 2 no se pueden dar
por buenas solo leyendo el código:

- **Lista** (`GET /api/v1/tasks`, `TaskTransformer`): el `assignee` sale de `UserTransformer`, que
  incluye `email`, `createdAt` y `updatedAt` de la cuenta. Es un fallo frente al scenario 2.
- **Tarea suelta** (`GET /api/v1/tasks/:id`, `TaskDetailTransformer`): el `assignee` sale de
  `TaskAssigneeTransformer` (solo `id`, `fullName`, `initials`). Ahí el scenario 2 se cumple.
- **Creación** (`POST /api/v1/tasks`): devuelve el `assignee` a través de `TaskTransformer`, así que
  hereda el mismo problema que la lista.

## Qué no decide el scenario (y es un hueco de spec, no de test)

Fila 2: el requisito general dice «ningún otro dato de esa cuenta», pero el scenario solo nombra
«el email ni ningún otro dato de acceso». La lista expone también `createdAt` y `updatedAt` de la
cuenta. Si esas fechas son «datos de acceso», la lista incumple el scenario; si no lo son, el
scenario deja fuera algo que el requisito sí prohíbe. El scenario no lo resuelve.

---

## Las tres líneas

1. **Scenarios que creía cubiertos antes de mirar: 2 de 3. Cubiertos de verdad: 0 de 3.**
   (Creía que la lista y la tarea suelta estaban igual de protegidas, y el scenario 1 lo daba por
   hecho. Ninguno tiene test.)

2. **Scenario del que no supe si era hueco de test o de spec: el 2.** En el test hay un hueco
   claro (no existe ningún test de `tasks`), pero además el texto del scenario dice «datos de
   acceso» mientras el requisito dice «cualquier otro dato de esa cuenta». No sé qué regla quedó
   escrita de verdad: si la del requisito (más amplia) o la del scenario (más estrecha).

3. **Decisión que el scenario no tomaba y tuve que tomar al escribir el test:** el test de la
   fila 2 comprueba que el `assignee` no contenga `email`, `createdAt` ni `updatedAt`. Me quedo
   con la lectura amplia del requisito. El valor de prueba que usé es la cuenta «Ada Lovelace»
   con `ada@example.com`, creada con `User.create`.
