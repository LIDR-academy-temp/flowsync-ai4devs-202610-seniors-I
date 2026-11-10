# Capability: tasks

Lista compartida de trabajo del equipo: crear tareas con un título, ver quién las lleva y en qué estado están, acotar por estado, abrir el detalle y gestionar una fecha de vencimiento opcional. Responde «¿en qué anda cada uno?» sin preguntar a nadie.

La fuente de verdad del comportamiento (requisitos y scenarios) está en la [spec de tasks](../../../openspec/specs/tasks/spec.md). Este README orienta; no duplica esas reglas.

## Endpoints

Todas bajo `/api/v1`, con `Authorization: Bearer` (middleware `auth`). Contrato anotado en OpenAPI: UI en `http://localhost:3333/api`, documento en `http://localhost:3333/api.json`.

| Método | Ruta | Qué hace |
|--------|------|----------|
| `GET` | `/api/v1/tasks` | Lista compartida. Query opcional `status` (`pending` \| `in_progress` \| `done`). Sin filtro: pendientes y en curso (no las hechas). |
| `POST` | `/api/v1/tasks` | Crea con `{ "title": "..." }`. Responsable y estado los pone el sistema. |
| `GET` | `/api/v1/tasks/:id` | Detalle (incluye `dueDate` e `isOverdue`). Query obligatoria `today=AAAA-MM-DD`. |
| `PATCH` | `/api/v1/tasks/:id/status` | Cambia estado con `{ "status": "pending" \| "in_progress" \| "done" }`. |
| `PUT` | `/api/v1/tasks/:id/due-date` | Fija o retira fecha: `{ "today": "AAAA-MM-DD", "dueDate": "AAAA-MM-DD" \| null }`. |

Implementación: `backend/app/controllers/tasks_controller.ts`, `task_statuses_controller.ts`, `task_due_dates_controller.ts`; rutas en `backend/start/routes.ts`.

En el frontend (sesión abierta): lista `/tasks`, detalle `/tasks/:id`; cliente en `frontend/src/lib/api.ts`.

## Reglas de negocio

No se reescriben aquí. Ver la [spec](../../../openspec/specs/tasks/spec.md), en particular:

- Creación solo con título, validación de título y estados fijos
- Lista compartida, filtro por estado y pantallas de lista / detalle
- Forma del responsable (sin email)
- Vencimiento, día de referencia `today` y qué no lleva la lista

Código de apoyo: modelo `backend/app/models/task.ts`, validadores `backend/app/validators/task.ts`, transformers `task_transformer`, `task_detail_transformer`, `task_assignee_transformer`.

## Probar en local

Backend (`backend/`):

```bash
npm install
cp .env.example .env && node ace generate:key   # solo la primera vez
node ace migration:run
npm run dev   # http://localhost:3333
```

Frontend (`frontend/`):

```bash
npm install
npm run dev   # http://localhost:5173 — API por defecto en VITE_API_URL → localhost:3333
```

Tests de integración de esta capability (desde `backend/`):

```bash
node ace test --files=assignee
# o la suite functional completa:
node ace test functional
```

Hoy la cobertura de tests de tasks está en `backend/tests/functional/tasks/` (p. ej. responsable / assignee). El resto de scenarios de la spec aún no tienen test dedicado.

Exploración manual del contrato: con el servidor arriba, abrir Scalar en `http://localhost:3333/api` o inspeccionar `http://localhost:3333/api.json`.
