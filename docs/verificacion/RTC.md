# Matriz de trazabilidad — Lo que cada tarea muestra de su responsable

Spec: `openspec/changes/archive/2026-08-13-add-task-list/specs/tasks/spec.md` (líneas 93-110)

**Scenarios del requisito: 3 — cubiertos: 0 (1 dudoso, 2 sin cubrir)**

| Scenario | Test que lo cubre | Cobertura | Qué falta para saberlo |
|---|---|---|---|
| Responsable identificable: `assignee` trae "Ada Lovelace" y sus iniciales | | No cubre | — (no existe ningún test de `tasks`; `tests/` solo contiene `functional/auth/`) |
| La tarea no filtra datos de cuenta: `assignee` sin email ni datos de acceso | | No cubre | — (ningún test pide una tarea y comprueba que `assignee` solo trae `id`, `fullName` e `initials`) |
| Responsable sin nombre: nombre nulo e iniciales presentes | `un nombre de una palabra…` / caso `sin nombre, las iniciales salen del email` — `backend/tests/functional/auth/initials.spec.ts:21-25` (indirecto) | No sé / no estoy seguro | El test solo comprueba `data.user.initials` en la respuesta de `POST /auth/login`, no el `assignee` de una tarea. Falta un test sobre `GET /api/v1/tasks` (o el detalle) con un responsable de `fullName` nulo que verifique `assignee.fullName === null` e `initials` no vacías. |
