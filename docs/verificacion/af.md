# Trazabilidad del requisito de responsable de la tarea

**Escenarios en el requisito** · 3. **Cubiertos en la suite inicial** · 0.

| Escenario | Test que lo cubre | Estado | Qué te faltó |
|---|---|---|---|
| Una tarea asignada a Ada Lovelace incluye su nombre e iniciales en `assignee`. | | No cubierto | — |
| El `assignee` de una tarea, individual o en el listado, omite el email y otros datos de acceso. | | No cubierto | — |
| Con un responsable sin nombre, `assignee` contiene nombre nulo e iniciales. | | No cubierto | — |

La matriz recoge la suite inicial. Los tres escenarios se comprobaron después en `backend/tests/functional/tasks/assignee.spec.ts`.

- `una tarea muestra el nombre y las iniciales de su responsable` · Pasa.
- `el detalle y el listado solo muestran el nombre y las iniciales de la cuenta` · Falla. El detalle incluye `id`. El listado incluye `id`, `email`, `createdAt` y `updatedAt`.
- `el responsable sin nombre conserva sus iniciales` · Pasa.

## Reflexión

1. Escenarios que creía cubiertos: **3**. Escenarios cubiertos en la suite inicial: **0**.
2. En el escenario de privacidad, el email queda excluido explícitamente. Queda por confirmar si el `id` debe considerarse un dato de cuenta adicional o si hace falta documentar una excepción para identificar al responsable.
3. Para el responsable sin nombre, comprobé `fullName: null` e iniciales como texto no vacío, porque el escenario deja abierto su valor exacto.
