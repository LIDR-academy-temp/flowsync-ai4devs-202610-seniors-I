# Verificación de cobertura — «Lo que cada tarea muestra de su responsable»

Requisito: `openspec/specs/tasks/spec.md`, líneas 97-114.
Rama: `trazabilidad-pamf` · Herramienta: Claude Code 2.1.316 · Modelo: Claude Opus 5.5.

**Predicción inicial del alumno (antes de auditar):** 2 de 3 scenarios cubiertos.

## 1. Cobertura antes de esta intervención

**Scenarios en el requisito: 3 · Cubiertos: 0**

| Scenario | Test exacto | Estado | Qué faltó para decidir |
|---|---|---|---|
| Responsable identificable (`spec.md:101-104`) | | No cubierto | |
| La tarea no filtra datos de cuenta (`spec.md:106-109`) | | No cubierto | |
| Responsable sin nombre (`spec.md:111-114`) | | No cubierto | |

### Evidencias

1. **Inventario de tests** (`find backend/tests -type f`): solo hay `bootstrap.ts` y cuatro
   ficheros en `backend/tests/functional/auth/` (`initials`, `login`, `session`, `signup`).
   `backend/tests/unit/` no existe.
2. **Búsqueda textual** `grep -rln "tasks\|assignee" backend/tests` → sin coincidencias.
   Ningún test llama a una ruta de tareas ni lee un campo `assignee`.
3. **Lectura de las aserciones, no solo de los nombres.** Hay tests de `auth` que se
   parecen a estos scenarios pero comprueban **otro objeto** (el `user` de la respuesta de
   auth o el perfil), no el `assignee` de una tarea:
   - `initials.spec.ts:24-34` («un nombre de dos palabras…», «sin nombre, las iniciales
     salen del email») — asserta `response.body().data.user.initials` de
     `POST /api/v1/auth/login`. Comprueba cómo se calculan las iniciales de la cuenta, no que
     una tarea las traiga.
   - `signup.spec.ts:43-53` («una cuenta puede quedarse sin nombre») — asserta
     `data.user.fullName` nulo en `POST /api/v1/auth/signup`. No hay ninguna tarea.
   - `session.spec.ts:21-33` y `login.spec.ts:21-41` — assertan que el perfil/usuario **sí**
     incluye `email`. Es lo contrario de lo que pide el scenario 2, y además sobre otro
     recurso.

   Ninguno de ellos sirve como evidencia de este requisito. Como mucho, el cálculo de
   iniciales (que el scenario 1 y el 3 usan) está probado en el contexto de auth.

### Diferencia con la predicción

La predicción era 2 de 3. El resultado verificado es 0 de 3. Probablemente la diferencia
viene de los nombres de los tests de auth («iniciales», «sin nombre»), que parecen cubrir
el requisito, pero sus aserciones se hacen sobre la cuenta de la sesión, nunca sobre una
tarea.

## 2. Tests creados en esta intervención

Fichero: `backend/tests/functional/tasks/assignee.spec.ts` · grupo `Tasks | responsable`.

Ejecución: `node ace test functional --files=tasks/assignee` → **2 passed, 1 failed (3)**.
Suite completa (`node ace test`) → **22 passed, 1 failed (23)**. El único fallo es el de abajo.

**Scenarios en el requisito: 3 · Con test: 3 · Test en verde: 2**

| Scenario | Test exacto | Estado | Qué faltó para decidir |
|---|---|---|---|
| Responsable identificable | `Tasks \| responsable / el assignee de una tarea trae el nombre y las iniciales de su responsable` | Cubierto (pasa) | |
| La tarea no filtra datos de cuenta | `Tasks \| responsable / el assignee no expone el email ni datos de acceso, ni suelto ni en la lista` | Cubierto (**falla**: el sistema incumple el scenario) | |
| Responsable sin nombre | `Tasks \| responsable / un responsable sin nombre llega con fullName nulo y con iniciales` | Cubierto (pasa) | |

### Parte B — Reflexiones

- Predicción: Estimé 2 de 3 scenarios cubiertos, pero la auditoría inicial demostró que ninguno tenía tests específicos (0 de 3); los existentes verificaban autenticación, no responsables de tareas.
- Duda: En el scenario de privacidad, la expresión "otros datos de acceso" no concreta todos los campos prohibidos, lo que genera incertidumbre entre falta de cobertura y falta de precisión en la spec.
- Decisión: Verificamos email, contraseña y token, tanto en la consulta individual como en la lista; así descubrimos que el listado exponía indebidamente el email del responsable.

### Fallo documentado (no corregido)

```
AssertionError: tarea en la lista: el assignee incluye email:
expected { id: 2, …(5) } to not have nested property 'email'
  at tests/functional/tasks/assignee.spec.ts:70
```

- La tarea **suelta** (`GET /api/v1/tasks/:id`) pasa todas las aserciones: usa
  `TaskDetailTransformer` → `TaskAssigneeTransformer`, que solo saca `id`, `fullName` e `initials`.
- La tarea **dentro de la lista** (`GET /api/v1/tasks`) filtra el email: `TasksController.index`
  serializa con `TaskTransformer`, y este usa `UserTransformer` para el `assignee`
  (`app/transformers/task_transformer.ts`). `UserTransformer` incluye `email`, `createdAt` y
  `updatedAt`. `TasksController.store` usa el mismo `TaskTransformer`, aunque esa ruta no
  entra en el scenario.
- El test se deja fallando a propósito: arreglarlo exige tocar código de producción, que
  queda fuera del alcance de esta fase.

### Notas de ejecución

- La primera ejecución falló por entorno, no por el código: `SqliteError: no such table: tasks`.
  La BD local (`backend/tmp/db.sqlite3`, compartida con el dev server) tenía pendientes
  `create_tasks_table` y `add_due_date_to_tasks_table`. Se aplicaron con
  `node ace migration:run`. No cambió ningún fichero versionado (`database/schema.ts` sin diff).
- Las tareas se crean con `Task.create` dentro de una transacción global
  (`testUtils.db().withGlobalTransaction()`), igual que en los tests de `auth`.
- `GET /tasks/:id` exige el parámetro `today` (`taskReferenceDayValidator`). Los tests
  mandan `today=2026-11-07`, que no afecta al `assignee`.
- Lo que el scenario 2 llama «datos de acceso» se comprueba así: que no exista la propiedad
  `email` y que el JSON del `assignee` no contenga el email, `password`, la contraseña ni el
  token. No se exige un conjunto exacto de claves, porque la spec no lo fija.
