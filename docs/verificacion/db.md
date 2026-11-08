# Trazabilidad: «Lo que cada tarea muestra de su responsable»

Fuente: `openspec/specs/tasks/spec.md` (requisito «Lo que cada tarea muestra de su responsable»).

Scenarios del requisito: 3
Cubiertos: 0

| Scenario | Test que lo cubre | Estado | Qué faltó para decidir |
|---|---|---|---|
| Responsable identificable: al obtener una tarea cuyo responsable es "Ada Lovelace", su `assignee` trae el nombre y las iniciales | `Auth | iniciales` › «un nombre de dos palabras da la inicial de cada una» (`backend/tests/functional/auth/initials.spec.ts`) | No lo sé | Comprueba `data.user.initials` del login, no el `assignee` de una tarea; no afirma el nombre |
| La tarea no filtra datos de cuenta: al obtener cualquier tarea, su `assignee` no incluye email ni datos de acceso | | No cubierto | |
| Responsable sin nombre: con un responsable registrado sin nombre, el nombre llega nulo y las iniciales siguen llegando | `Auth | iniciales` › «sin nombre, las iniciales salen del email» (`backend/tests/functional/auth/initials.spec.ts`) | No lo sé | Comprueba `data.user.initials` del login, no el `assignee` de una tarea; no afirma el nombre nulo |

## Notas

- `backend/tests/` solo contiene tests de `auth` (login, signup, session, initials); `backlog/` y `prd/` están vacíos. Ningún test crea ni obtiene una tarea (`GET /api/v1/tasks...`), y ninguno menciona `assignee`.
- Los dos candidatos usan la misma regla de iniciales (la de la spec de `auth`) sobre la respuesta de login. Esa regla puede ser la que reutilice la tarea, pero ningún test lo demuestra.

## Parte B

1. Antes de mirar no sabia cuantos escenarios estaban cubiertos, tal vez un par; estaban cubiertos 0.

2. «Responsable sin nombre»: no sé si es un hueco de test o de spec. La spec pide iniciales "sin recurrir a su email", pero cuando no hay nombre las iniciales salen del email (AE de ada@example.com). La spec no dice si eso cuenta como filtrar parte del email.

3. El requisito dice "ningún otro dato de esa cuenta", pero el scenario solo nombra el email. Tuve que decidir qué campos prohibir: el test prohíbe email, password y token, pero no exige que solo vengan id, nombre e iniciales. Por eso no detecta que la lista también trae las fechas de la cuenta.
