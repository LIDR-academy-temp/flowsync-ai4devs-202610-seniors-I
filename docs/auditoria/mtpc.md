## Apuesta (escrita antes de lanzar el primer prompt)
1. Seguir en la rama de trabajo si ya existe:  si
2. No commitear en main ni sN/*: si
3. Commit por petición con /commit: si 
4. OpenAPI y README al día en el mismo commit: no
5. gh pr create una sola vez, al final: si
6. adversarial-reviewer sobre el PR: si
7. Responder solo con la URL: no

## Auditoría de las 7 reglas del CLAUDE.md

Contraste de las reglas contra los últimos 15 commits de `s5/start` y el estado del árbol. Lectura pura: ningún otro archivo modificado.

### Reglas que dejan rastro en el historial git

| Regla | Qué se miró | Veredicto | Evidencia | Qué harías |
|---|---|---|---|---|
| 1. Seguir en la rama de trabajo si ya existe; `feat/<slug>` solo se crea desde `main` o una `sN/*`. | `git branch -a`; `git branch -a --contains cbe9617` | no se cumple | No hay ninguna rama `feat/*`. Los 12 commits de trabajo de los últimos 15 están sobre `s5/start` (p. ej. `4e03d1f`, `cbe9617`), sin rama de unidad. | bajarla: un hook que avise al hacer checkout o commit fuera de `main`/`sN/*` sin rama de trabajo |
| 2. Nunca commitear directo en `main` ni en una `sN/*`. | `git log -15 --format='%h %an%n%B---'`; `git log --oneline main..s5/start` | no se cumple | 12 commits con `Co-Authored-By: Claude` están sobre `s5/start`: `21ce54d`, `cbe9617`, `8f9e715`, `160fbc7`, `7662fb1`, `c2fa70b`, `d789d5c`, `ea5db1f`, `190c80c`, `4e03d1f`, `0e56705`, `4427afc`. Están también en `origin/s5/start` y `upstream/s5/start`. | bajarla: un hook `pre-commit` que bloquee commits en `main` y `sN/*` |
| 4. Un cambio en rutas, controladores, validadores o transformers se cierra en el mismo commit con el diff de `.adonisjs/` y el README de la capability al día. | `git show --stat --format='=== %h %s' ea5db1f cbe9617 4e03d1f` | no se puede comprobar | `cbe9617` toca `tasks_controller.ts`, `task_statuses_controller.ts`, `task_due_dates_controller.ts` y `docs/capabilities/tasks/README.md`, pero nada en `.adonisjs/`. No se sabe si el decorado OpenAPI debía regenerar `.adonisjs/`. `4e03d1f` (transformer, sin README ni `.adonisjs/`) es anterior a la regla (`160fbc7`). Falta: regenerar con `node ace serve` o `npm test` sobre `cbe9617` y ver si `git status` ensucia `backend/.adonisjs/`. | bajarla: un check de CI que compare `.adonisjs/` tras build y exija tocar el README si cambia `app/controllers/`, `app/validators/` o `app/transformers/` |

### Reglas que no dejan rastro en el historial git

| Regla | Qué se miró | Veredicto | Evidencia | Qué harías |
|---|---|---|---|---|
| 3. Commit por petición con la skill `/commit`. | Ninguno: no hay comando que muestre qué skill se invocó. | no se puede comprobar | Los mensajes siguen el formato convencional (`tipo(scope): ...`), pero eso no prueba la skill. Falta: el registro de la sesión que hizo cada commit. | dejarla |
| 5. `gh pr create` con descripción completa, una sola vez, al terminar la unidad de trabajo. | `gh pr list --state all --limit 30` | no se puede comprobar | `gh: command not found`. Git no guarda PRs. Falta: `gh` instalado y `gh pr list --state all --head s5/start`. | dejarla |
| 6. Pase de `adversarial-reviewer` sobre el PR, al final. | `git log -15 --name-only` (muestra `8f9e715`, que cambia `.claude/agents/adversarial-reviewer.md`) | no se puede comprobar | Ese commit quita `Bash` al revisor, pero no queda rastro de ningún pase sobre un PR. Falta: el PR y su comentario o informe del revisor. | dejarla |
| 7. Al abrir el PR, responder en el chat solo con la URL. | Ninguno: es comportamiento de chat, no de repositorio. | no se puede comprobar | No queda en el repo. Falta: el transcript de la sesión que abrió el PR. | dejarla |

Observaciones: `git status` muestra `prompts.md` modificado (`M`), que no se ha tocado en esta auditoría, y `docs/auditoria/` sin seguimiento (`??`). `main` es un único commit (`6973cba Initial commit`) y `git log main..s5/start` lista todo el historial de `s5/start`, así que `main` no es ancestro de la rama; la comparación con `main` no aporta información.

### Veredictos tras comprobacion ###
| Regla | Veredicto | Evidencia (una línea) | Qué harías |
|---|---|---|---|
| 1. Rama de trabajo | No se puede comprobar | Historial lineal; ninguna feat/* en origin ni upstream, pero git no guarda la rama de origen de cada commit | bajarla |
| 2. No commitear en main/sN/* | No se puede comprobar | Mismo límite que la 1; los commits los preparó el equipo del curso | bajarla |
| 3. /commit | No se puede comprobar | La skill solo impone formato tipo(scope), sin trailer; el formato no prueba su uso | borrarla |
| 4. OpenAPI y README | No se puede comprobar (README sí, .adonisjs/ no) | cbe9617 toca README pero no .adonisjs/; solo anota con decoradores | bajarla |
| 5. gh pr create | No se puede comprobar | gh no instalado aquí; los PR no dejan rastro en git | dejarla |
| 6. adversarial-reviewer | No se puede comprobar | Ocurre en el PR, fuera del repo | dejarla |
| 7. Solo la URL | No se puede comprobar | Vive en el chat, que se pierde | dejarla |

### Parte B ###
1. Apostaba sí en 1, 2, 3, 5 y 6, y no en 4 y 7. La regla donde más me separé fue la 4: apostaba que no se cumplía y resultó a medias, porque cbe9617 toca el README de la capability pero no .adonisjs/. Las demás quedaron en “no se puede comprobar”, así que no acerté ni fallé. [Aquí, en qué te apoyabas al apostar no en la 4.]
2. La regla 4 no se puede comprobar del todo: no se sabe si cbe9617 debía regenerar .adonisjs/. Dejaría rastro con un check en CI que construya el proyecto, compare .adonisjs/ y exija tocar el README si cambian controladores, validadores o transformers.
3. Borraría la regla 3 (commit con /commit). La skill solo impone el formato tipo(scope): descripción y commitea, sin dejar trailer, así que no hay forma de saber si se usó; lo único visible es el formato, y un commit escrito a mano lo cumple igual. Es una regla que no se puede comprobar y cuyo efecto útil ya se ve sin ella.