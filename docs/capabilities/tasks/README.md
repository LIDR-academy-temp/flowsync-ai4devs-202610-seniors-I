# Capability `tasks`

> **Las reglas de negocio no están aquí.** Viven en [`openspec/specs/tasks/spec.md`](../../../openspec/specs/tasks/spec.md), con un escenario verificable por regla. Este README explica dónde está cada cosa en el código y cómo levantarla; si algo de aquí contradice la spec, manda la spec.

## Qué hace

Es la lista de trabajo del equipo: **una sola lista compartida** con todas las tareas del espacio, la misma para cualquier cuenta. Crear una tarea solo pide el título, y de cada una se ve quién la lleva y en qué estado está sin abrirla. Además:

- se acota la lista por estado (la vista por defecto deja fuera lo hecho);
- cualquiera con sesión cambia el estado de cualquier tarea;
- cada tarea puede tener una fecha de vencimiento, y al abrirla se dice si está vencida.

Lo que la capability **no** hace a propósito (lista personal, presencia, filtros por responsable…) también está en la spec.

## Endpoints

Todos bajo `/api/v1/tasks`, todos exigen `Authorization: Bearer <token>` (grupo con `middleware.auth()` en [`start/routes.ts`](../../../backend/start/routes.ts)) y todos responden envueltos en `{ "data": ... }`.

| Método | Ruta | Controlador | Qué hace |
|---|---|---|---|
| `GET` | `/api/v1/tasks` | `TasksController.index` | La lista. `?status=` opcional para acotar a un estado |
| `POST` | `/api/v1/tasks` | `TasksController.store` | Crea una tarea con `{ "title": "..." }` |
| `GET` | `/api/v1/tasks/:id` | `TasksController.show` | Una tarea con su vencimiento. Exige `?today=AAAA-MM-DD` |
| `PATCH` | `/api/v1/tasks/:id/status` | `TaskStatusesController.update` | Cambia el estado con `{ "status": "..." }` |
| `PUT` | `/api/v1/tasks/:id/due-date` | `TaskDueDatesController.update` | Fija o quita la fecha con `{ "dueDate": "AAAA-MM-DD" \| null, "today": "AAAA-MM-DD" }` |

El contrato completo (parámetros, códigos de respuesta y forma de cada objeto) está en el documento OpenAPI que sirve el propio backend: **`http://localhost:3333/api`** (interfaz) y `/api.json`. Sale de los decoradores de los controladores y de [`app/openapi/schemas.ts`](../../../backend/app/openapi/schemas.ts), así que si cambias lo que devuelve un endpoint, cambia también su anotación.

## Reglas de negocio

Están en la [spec](../../../openspec/specs/tasks/spec.md). Para orientarte en ella:

| Si vas a tocar… | Busca los requisitos sobre… |
|---|---|
| la creación | título obligatorio, longitud máxima, responsable y estado por defecto |
| la lista y el filtro | lista compartida, acotar por estado, filtro sin resultados, estado inexistente |
| el estado | los tres estados fijos y el cambio de estado |
| la fecha de vencimiento | fecha opcional, fijar/retirar, cuándo está vencida, día de referencia, la lista sin vencimiento |
| lo que se expone del responsable | qué muestra cada tarea de su responsable |
| el frontend | los requisitos que empiezan por «Pantalla…», «Aviso…» y «La interfaz…» |

La historia de cada cambio (propuesta, diseño, tareas) está archivada en [`openspec/changes/archive/`](../../../openspec/changes/archive/): `add-task-list`, `add-task-status-filter` y `add-task-due-date`.

### Dónde vive cada regla en el código

Cada regla tiene **un solo sitio** de implementación; si cambias una, cámbiala ahí:

- **Estados y vista por defecto:** `TASK_STATUSES` y `DEFAULT_LIST_STATUSES` en [`app/models/task.ts`](../../../backend/app/models/task.ts).
- **Qué es estar vencida:** `Task.isOverdueOn(referenceDay)`, en el mismo modelo. Es la única definición del sistema; el frontend nunca compara fechas.
- **Qué se acepta en cada petición:** [`app/validators/task.ts`](../../../backend/app/validators/task.ts).
- **Qué sale en cada respuesta:** [`app/transformers/`](../../../backend/app/transformers/). `TaskTransformer` (lista, creación, cambio de estado) no lleva vencimiento; `TaskDetailTransformer` (consulta suelta, cambio de fecha) sí; `TaskAssigneeTransformer` es la única vista del responsable y no incluye el email.
- **Esquema de la tabla:** [`database/migrations/`](../../../backend/database/migrations/) (`create_tasks_table` y `add_due_date_to_tasks_table`). `database/schema.ts` se genera a partir de ellas y no se edita.

En el frontend, todas las llamadas están en [`src/lib/api.ts`](../../../frontend/src/lib/api.ts); las pantallas son [`pages/tasks-page.tsx`](../../../frontend/src/pages/tasks-page.tsx) (`/tasks`) y [`pages/task-page.tsx`](../../../frontend/src/pages/task-page.tsx) (`/tasks/:id`), con [`components/task-filter.tsx`](../../../frontend/src/components/task-filter.tsx) y [`components/task-item.tsx`](../../../frontend/src/components/task-item.tsx).

### Desviación conocida

`GET /api/v1/tasks?status=<valor inventado>` responde `200` con lista vacía, y la spec exige `422` («Un estado que no existe se rechaza, no se responde vacío»). El validador acepta cualquier texto desde el commit `8c15707`. Borra este apartado cuando se corrija.

## Cómo probarla en local

### Levantarla

```bash
# Backend (http://localhost:3333)
cd backend
npm install
cp .env.example .env && node ace generate:key   # solo la primera vez
node ace migration:run
npm run dev

# Frontend (http://localhost:5173/tasks), en otra terminal
cd frontend
npm install
npm run dev
```

### Tests automáticos

```bash
cd backend
node ace test functional --files=tasks/assignee   # solo los de tareas
npm test                                          # toda la suite
```

Hoy la capability solo tiene [`tests/functional/tasks/assignee.spec.ts`](../../../backend/tests/functional/tasks/assignee.spec.ts) (qué muestra cada tarea de su responsable). El resto de escenarios de la spec no tiene test. Los tests pegan contra el mismo `tmp/db.sqlite3` que el servidor de desarrollo: aísla los nuevos con `testUtils.db().withGlobalTransaction()`, como hace ese fichero.

### A mano

La forma más rápida es la interfaz de `http://localhost:3333/api`: configura el token como *bearer* y lanza las peticiones desde ahí. Por terminal (necesita `jq`; escribe en la base de datos de desarrollo):

```bash
API=http://localhost:3333/api/v1

# Cuenta y token (o usa auth/login con una cuenta que ya exista)
TOKEN=$(curl -s -X POST $API/auth/signup -H 'Content-Type: application/json' \
  -d '{"fullName":"Ada Lovelace","email":"ada@example.com","password":"secreto123","passwordConfirmation":"secreto123"}' \
  | jq -r .data.token)
AUTH="Authorization: Bearer $TOKEN"

# Crear, listar y acotar
ID=$(curl -s -X POST $API/tasks -H "$AUTH" -H 'Content-Type: application/json' \
  -d '{"title":"Revisar el informe"}' | jq .data.id)
curl -s $API/tasks -H "$AUTH" | jq
curl -s "$API/tasks?status=done" -H "$AUTH" | jq

# Cambiar estado, poner fecha y consultarla con el día de referencia
curl -s -X PATCH $API/tasks/$ID/status -H "$AUTH" -H 'Content-Type: application/json' -d '{"status":"in_progress"}' | jq
curl -s -X PUT $API/tasks/$ID/due-date -H "$AUTH" -H 'Content-Type: application/json' \
  -d "{\"dueDate\":\"2026-09-30\",\"today\":\"$(date +%F)\"}" | jq
curl -s "$API/tasks/$ID?today=$(date +%F)" -H "$AUTH" | jq
```
