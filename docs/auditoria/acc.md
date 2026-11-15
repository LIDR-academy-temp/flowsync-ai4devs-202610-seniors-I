# Auditoría del historial de git (acc)

## Antes de lanzar nada: apunta tu apuesta

1. Seguir en la rama de trabajo si ya existe:  si
2. No commitear en main ni sN/*: si
3. Commit por petición con /commit: si 
4. OpenAPI y README al día en el mismo commit: no
5. gh pr create una sola vez, al final: si
6. adversarial-reviewer sobre el PR: si
7. Responder solo con la URL: no

## Tabla de auditoría

Contraste de las 7 reglas de proceso de `CLAUDE.md` contra los 15 commits listados abajo y el estado del árbol. Solo lectura. Borrador del agente: la evidencia de al menos una fila hay que reabrirla a mano en el historial.

| # | Qué pide la regla | Qué se miró | Veredicto | Evidencia | Qué haría |
|---|---|---|---|---|---|
| 1 | Si ya estás en una rama de trabajo, seguir en ella; solo crear rama nueva desde `main` o `sN/*`. | `git log --graph`, `git branch -a --contains <hash>`, `git reflog` | No se puede comprobar | La historia de los 15 es lineal y un commit no guarda el nombre de la rama donde se hizo. El reflog solo cubre mi máquina, no la de quien los escribió. Faltaría un registro de la rama por commit (p. ej. PRs con su rama). | Bajarla |
| 2 | No commitear directo en `main` ni en `sN/*`. | `git branch -a --contains <hash>`, `git branch -vv` | No se puede comprobar | Ninguno de los 15 está en `main` (sigue en `6973cba`, "Initial commit"). Pero todos están en `s5/start` y `upstream/s4/end`, y git no dice si se escribieron ahí o se llevaron después. | Bajarla (protección de rama en GitHub) |
| 3 | Cerrar cada petición con un commit hecho con `/commit`. | `git log -15 --pretty=%B`, conteo de `Co-Authored-By` | No se puede comprobar | Los 15 siguen Conventional Commits y 12 llevan `Co-Authored-By` de Claude (los 3 sin él son los de LIDR). Es un indicio de que se usó la skill, pero no distingue un commit por petición de uno por unidad de trabajo. | Dejarla |
| 4 | Un cambio en rutas, controladores, validadores o transformers cierra con OpenAPI y README de la capability al día en el mismo commit. | `git log -15 --name-only`, `git show ea5db1f -- backend/start/routes.ts`, `git show 160fbc7` | Se cumple (con matiz) | La regla nace en `160fbc7`. Después de ella solo `cbe9617` toca controladores y trae `docs/capabilities/tasks/README.md` + `backend/app/openapi/schemas.ts`. Matices: `4e03d1f` (transformer, sin README ni OpenAPI) es anterior a la regla; y `cbe9617` no trae diff de `.adonisjs/`, que la regla dice que es lo que se commitea. | Bajarla (comprobación en CI) |
| 5 | `gh pr create` una sola vez, al terminar la unidad de trabajo. | `gh pr list --state all`, `git log --graph` | No se puede comprobar | Ningún commit tiene merge ni PR asociado en el historial. `gh pr list` solo devuelve PRs de otros alumnos del curso. | Dejarla |
| 6 | Pasar `adversarial-reviewer` sobre el PR, una vez y al final. | `ls .claude/agents`, `git show 8f9e715`, `git log --grep` | No se puede comprobar | El agente existe (`.claude/agents/adversarial-reviewer.md`, ajustado en `8f9e715`), pero no queda rastro de que se ejecutara sobre ningún PR. Faltaría que su informe se guardara en el PR. | Bajarla (job de CI que lo lance) |
| 7 | Al abrir el PR, responder solo con la URL. | Todo el historial y el árbol | No se puede comprobar | Vive en la conversación, no en git ni en el árbol. Ningún comando la ve. | Borrarla |

## Commits (del más reciente al más antiguo)

| # | Hash | Fecha | Tipo | Resumen | Cambios |
|---|---|---|---|---|---|
| 1 | aee9a24 | 2026-09-23 | docs | Las instrucciones apuntan a los repos del cohorte 202610-seniors-I | 1 archivo, +5/−5 |
| 2 | 21ce54d | 2026-09-23 | docs(s5) | El README pasa a ser la lección del ejercicio, generada | 1 archivo, +173/−73 |
| 3 | afc4b74 | 2026-08-28 | docs(s5) | Enunciado del ejercicio y plantilla de prompts en la rama de partida | 1 archivo, +51/−99 |
| 4 | cbe9617 | 2026-08-27 | docs(tasks) | El documento OpenAPI recoge el contrato que exige la spec | 7 archivos, +413/−2 |
| 5 | 8f9e715 | 2026-08-24 | chore(harness) | El revisor adversarial contrasta contra la spec viva | 1 archivo, +8/−6 |
| 6 | 160fbc7 | 2026-08-20 | docs(process) | El contrato de una capability se actualiza en el mismo commit | 1 archivo, +1 |
| 7 | 7662fb1 | 2026-08-20 | docs(tasks) | README de la capability, enlazando la spec en vez de copiarla | 1 archivo, +182 |
| 8 | c2fa70b | 2026-08-20 | docs(adr) | Los tests de integración pasan a ser la fuente de verdad ejecutable | 2 archivos, +126/−3 |
| 9 | d789d5c | 2026-08-20 | docs(adr) | Registrar las delta-specs de OpenSpec como fuente de verdad viva | 1 archivo, +144 |
| 10 | ea5db1f | 2026-08-20 | feat(openapi) | Registrar las rutas del documento y nombrar a FlowSync | 10 archivos, +154/−3 |
| 11 | 190c80c | 2026-08-20 | docs(architecture) | Diagrama de contenedores C4 de FlowSync | 1 archivo, +101 |
| 12 | 4e03d1f | 2026-08-20 | fix(tasks) | Dejar de publicar el email del responsable en la lista | 1 archivo, +6/−2 |
| 13 | 0e56705 | 2026-08-20 | docs(process) | La rama es por unidad de trabajo y el PR va una sola vez | 1 archivo, +4/−4 |
| 14 | 4427afc | 2026-08-20 | test(tasks) | Tests del responsable que muestra cada tarea | 1 archivo, +118 |
| 15 | b955a72 | 2026-08-28 | docs(s4) | Enunciado del ejercicio y plantilla de prompts en la rama de partida | 1 archivo, +108/−48 |

## Observaciones

- **Composición:** 11 de 15 commits son `docs`; hay 1 `feat` (OpenAPI), 1 `fix`, 1 `test` y 1 `chore`.
- **Autoría:** 11 commits de Earvin Saúl Pérez Ramos; 3 de LIDR Academy / LIDR-AI4Devs (material del curso). Ninguno de Chock en este tramo.
- **Seguridad:** `4e03d1f` corrige que la lista de tareas exponía el email del responsable. Los tests de ese comportamiento (`4427afc`) son anteriores al fix.
- **Temas recurrentes:** spec y tests como fuente de verdad (OpenSpec, ADRs), contrato OpenAPI de `tasks`, reglas de proceso (rama por unidad de trabajo, un solo PR).
- **Fechas no lineales:** `b955a72` (28-ago) aparece al final de la lista pese a ser posterior a los commits del 20-ago, y `afc4b74` (28-ago) precede a `cbe9617` (27-ago). `git log --graph` muestra historia lineal sin merges, así que no son merges: las fechas de autor no siguen el orden de los commits (probablemente rebase o cherry-pick al montar las ramas `sN/*`).

### Parte B ###
1. Apostaba sí en 1, 2, 3, 5 y 6 y salieron como que no se pueden comprobar.
2. La regla 6 no se puede comprobar del todo: no deja rastro.
3. Borraría la regla 7. No deja ningun rastro.