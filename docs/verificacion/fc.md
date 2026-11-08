# Verificación — «Lo que cada tarea muestra de su responsable»

Capability: `tasks` · Requisito revisado: **Lo que cada tarea muestra de su responsable**
(`openspec/specs/tasks/spec.md`, líneas 97–114).

Solo se ha revisado este requisito, no el resto de la capability.

## Estimación previa (antes de revisar)

Mi estimación antes de mirar los tests fue **4 de 4 scenarios cubiertos**, aunque pensé que las
pruebas podían ser básicas. Queda registrada como estimación, no como resultado.

> Nota: al revisar, el requisito resultó tener **3 scenarios**, no 4. La estimación se deja tal
> cual la hice; esta nota solo señala la diferencia con el total real.

## Resultado

### Pruebas que ya existían

**0 de 3 scenarios cubiertos.** Los únicos tests que había eran functional de `auth`
(`backend/tests/functional/auth/`: `signup`, `login`, `session`, `initials`). Ninguno llama a los
endpoints de tareas, así que ninguno cubría este requisito. `auth/initials.spec.ts` verifica las
iniciales de la *cuenta* en el login, no las del `assignee` de una tarea.

### Pruebas que añadimos

Creamos **3 pruebas nuevas** (una por scenario) en
`backend/tests/functional/tasks/assignee.spec.ts`: **2 verdes y 1 roja**. La roja es el scenario 2
y se deja en rojo a propósito —no se marca como cumplido—, sin tocar el código de la aplicación ni
la spec. Es evidencia de un defecto real: la lista filtra el email del responsable.

## Matriz

| Scenario | Test que lo cubre | Estado | Qué faltó para decidirlo |
|---|---|---|---|
| Responsable identificable (el `assignee` trae nombre e iniciales) | `tasks/assignee.spec.ts` › «el responsable de la tarea llega con nombre e iniciales» (nuevo, verde) | Cubierto | Nada. El test crea una tarea a nombre de «Ada Lovelace», la pide con `GET /tasks/:id` y comprueba `fullName` + `initials` (`AL`). |
| La tarea no filtra datos de cuenta (el `assignee` no incluye email) | `tasks/assignee.spec.ts` › «el assignee no incluye el email ni suelta ni dentro de la lista» (nuevo, rojo) | No cubierto | Nada que decidir: el test está en rojo. La tarea suelta (`GET /tasks/:id`) no filtra el email, pero la lista (`GET /tasks` → `TaskTransformer` → `UserTransformer`) **sí incluye `email`**, y el scenario lo prohíbe «suelta o dentro de la lista». El scenario no se cumple. |
| Responsable sin nombre (nombre nulo pero iniciales presentes) | `tasks/assignee.spec.ts` › «un responsable sin nombre llega con nombre nulo pero con iniciales» (nuevo, verde) | Cubierto | Nada. El test registra una cuenta sin `fullName`, crea una tarea a su nombre y comprueba que el `assignee` llega con `fullName: null` e `initials` no vacías. |

## Ejecución

`node ace test --files=assignee` → **2 passed, 1 failed (3)**.

- ✔ Responsable identificable.
- ✖ La tarea no filtra datos de cuenta: `AssertionError: expected { id, …(5) } to not have nested
  property 'email'` en la rama de la **lista**. La aserción sobre la tarea suelta pasa; la de la
  lista no.
- ✔ Responsable sin nombre.

## Cómo se decidió

- Se leyeron los transformers para entender qué expone cada camino: la lista y la tarea suelta no
  serializan el `assignee` con el mismo transformer, y solo el de la lista arrastra el email.
- El scenario 2 exige explícitamente «cualquier tarea, suelta o dentro de la lista», así que el
  test comprueba las dos rutas; por eso destapa la fuga de la lista.
- No se ha tocado el código de la aplicación ni la spec. El test en rojo se deja en rojo, y el
  scenario cuyo test falla no se marca como cumplido.

## Mis tres reflexiones

1. Pensé que estaban cubiertos los 4 escenarios, pero al revisar encontré que realmente eran 3 y ninguno tenía pruebas. Después escribimos las tres y dos pasaron.
2. Me hizo dudar el escenario de los datos del responsable, porque no sabía si faltaba probarlo o si el sistema estaba mostrando información que no debía.
3. Para comprobar que no se mostraran datos personales, decidimos revisar tanto una tarea individual como el listado completo. Ahí encontramos que el listado sí mostraba el correo.
