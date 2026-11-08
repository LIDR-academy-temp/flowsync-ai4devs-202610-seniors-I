# Matriz de trazabilidad · «Lo que cada tarea muestra de su responsable»

Requisito de `openspec/specs/tasks/spec.md` (capability `tasks`). Suite revisada: `backend/tests/` (Japa, suites `unit` y `functional`). El frontend no tiene runner de tests.

**Scenarios en el requisito: 3 · Cubiertos: 0**

| Scenario | Test que lo cubre | Estado | Qué te faltó |
|---|---|---|---|
| Una tarea cuyo responsable es «Ada Lovelace» trae en `assignee` ese nombre y sus iniciales | — | No cubierto | — |
| Una tarea, suelta o dentro de la lista, no incluye en `assignee` el email ni otros datos de acceso | — | No cubierto | — |
| Si el responsable se registró sin nombre, `assignee` trae el nombre nulo y aun así sus iniciales | — | No cubierto | — |

1. Antes de mirar creía cubiertos 0 de 3, porque `CLAUDE.md` ya avisa de que la capability `tasks` no tiene tests. Al mirar, lo estaban 0 de 3.
2. En «La tarea no filtra datos de cuenta» no supe si faltaba un test o faltaba la regla. El requisito dice que la tarea muestra nombre e iniciales y ningún otro dato de la cuenta, pero el `assignee` también trae el `id` del usuario. La spec no dice si ese `id` está permitido o es una fuga.
3. En «Responsable sin nombre» el scenario solo dice que las iniciales «siguen llegando», sin decir cuáles. Al escribir el test decidí comprobar el valor exacto (`SE` para `sin-nombre@example.com`), sacado de la regla de iniciales de la spec de `auth`.
