# Matriz de trazabilidad — Lo que cada tarea muestra de su responsable

Spec: `openspec/changes/archive/2026-08-13-add-task-list/specs/tasks/spec.md` (líneas 93-110)

**Scenarios del requisito: 3 — cubiertos: 2 (1 dudoso). El test del scenario «no filtra datos de cuenta» en la lista FALLA: el código incumple la spec (la lista devuelve el email).**

| Scenario | Test que lo cubre | Cobertura | Qué falta para saberlo |
|---|---|---|---|
| Responsable identificable: `assignee` trae "Ada Lovelace" y sus iniciales | `en la lista, el assignee trae el nombre y las iniciales…` — `backend/tests/functional/tasks/assignee.spec.ts`:56; `en la tarea suelta, el assignee trae el nombre y las iniciales…` — `backend/tests/functional/tasks/assignee.spec.ts`:68 | Cubre (pasa) | — |
| La tarea no filtra datos de cuenta: `assignee` sin email ni datos de acceso | `en la lista, el assignee no incluye el email…` — `backend/tests/functional/tasks/assignee.spec.ts`:82 (FALLA); `en la tarea suelta, el assignee no incluye el email…` — `backend/tests/functional/tasks/assignee.spec.ts`:96 (pasa) | Cubre (el test de la lista detecta el incumplimiento) | — |
| Responsable sin nombre: nombre nulo e iniciales presentes | `sin nombre, las iniciales salen del email` — `backend/tests/functional/auth/initials.spec.ts:21-25` (indirecto) | No sé / no estoy seguro | El test solo comprueba `data.user.initials` en la respuesta de `POST /auth/login`, no el `assignee` de una tarea. Falta un test sobre `GET /api/v1/tasks` (o el detalle) con un responsable de `fullName` nulo que verifique `assignee.fullName === null` e `initials` no vacías. |



PARTE B

1. Cuántos scenarios creías cubiertos antes de mirar, y cuántos lo estaban.

- 0 y resultó que 0 estaban cubiertos pero uno parcialmente, asumí que 0 estaban cubiertos ya que no vi tests sobre tasks cuando repasé los tests existentes.

2. El scenario del que no supiste si era un hueco de test o un hueco de spec-
- El scenario que genera dudas es el de "Responsable sin nombre", ya que las iniciales salen del email y entonces algo de información de este estás filtrando, dando problemas con el scenario anterior.

3. Algo que el scenario no decidía por ti y tuviste que decidir al escribir el test.
- Los scenarios de la spec no especificaban nada sobre los ids de la cuenta ya que técnicamente no son datos de acceso, pero por coherencia y ya que no era necesario, asumí que el id del usuario tampoco se tenía que filtrar.
