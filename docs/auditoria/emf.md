# Auditoría de las reglas de proceso (emf)

### Apuesta inicial

| Regla | Mi apuesta |
|-------|-----------|
| 1 | Se cumple parcialmente |
| 2 | Se cumple |
| 3 | No se cumple |
| 4 | No lo sé |
| 5 | Se cumple |

## Task

Alcance: las 5 reglas de la sección «Reglas de proceso» de `CLAUDE.md` contrastadas contra los últimos 15 commits de `s5/start` (`b955a72..aee9a24`, `git log --oneline -15`). Fecha: 2026-11-15.

| Regla | Qué se miró | Veredicto | Evidencia | Acción |
|-------|-----------|-----------|-----------|--------|
| 1. Una rama por unidad de trabajo: desde `main` o `sN/*` se crea `feat/<slug>`, y nunca se commitea directo en `main` ni en una `sN/*`. | `git log --oneline --graph -18`, `git log -15 --merges --oneline`, `git branch -a --contains <sha>` | no se cumple | La historia es lineal y no hay ni un merge en los 15 commits (el último es `9987cf0`, fuera del rango). Los commits de trabajo (`4427afc` test, `4e03d1f` fix, `ea5db1f` feat, `cbe9617` docs/openapi…) solo aparecen en `s5/start` y `upstream/s4/end`; ninguna rama `feat/*` los contiene. Se commitearon directamente sobre ramas `sN/*`. | bajarla a algo que se ejecute (protección de rama / hook `pre-commit` que rechace commits en `main` y `s*/*`) |
| 2. El commit es por petición y se hace con la skill `/commit`. | `.claude/skills/commit/SKILL.md`, `git log -15 --format='%h %s %(trailers:key=Co-Authored-By)'` | no se puede comprobar | Los 15 mensajes siguen `tipo(scope): descripción` y 12 llevan `Co-Authored-By: Claude …`, compatible con la skill, pero un commit hecho con la skill no deja ninguna marca distinguible de uno hecho a mano. Tampoco hay forma de saber desde git qué era «una petición». Además la skill dice «commitea directamente», sin mirar en qué rama, lo que contradice la regla 1. | bajarla a algo que se ejecute (hook `commit-msg` que valide el formato convencional; la parte «por petición» es inverificable) |
| 3. Un cambio en rutas, controladores, validadores o transformers de una capability se commitea junto con el diff regenerado de `.adonisjs/` y el README `docs/capabilities/<nombre>/README.md` al día. | `git show --stat <sha>` para cada commit que toca `backend/start/routes.ts`, `app/controllers`, `app/validators`, `app/transformers` | no se cumple | La regla entra en `160fbc7`. Antes: `4e03d1f` toca `task_transformer.ts` sin README; `ea5db1f` toca `start/routes.ts` con `.adonisjs/` pero sin README. Después de la regla: `cbe9617` toca los tres controladores de tasks y actualiza el README, pero **no** trae diff de `.adonisjs/` (0 ficheros). Además el árbol de trabajo actual tiene controladores, transformer, `routes.ts` y `.adonisjs/` modificados sin commitear. | bajarla a algo que se ejecute (check en CI/pre-commit: si el diff toca esas rutas, exigir cambios en `backend/.adonisjs/` y `docs/capabilities/*/README.md`) |
| 4. `gh pr create` con descripción completa y pase del subagente `adversarial-reviewer` sobre el PR, una sola vez al terminar la unidad de trabajo. | `gh pr list --state all --search <sha>` (para `cbe9617`, `4e03d1f`, `ea5db1f`), `git log -15 --merges` | no se cumple | Ningún PR introduce estos commits: las búsquedas solo devuelven PRs de alumnos (#140–#151) basados en `s5/start`, que los arrastran como base. Sin merges ni PR, no hubo dónde pasar el revisor adversarial; no queda rastro de su ejecución (`8f9e715` solo reconfigura el agente). | bajarla a algo que se ejecute (rama protegida que exija PR + check/revisión obligatoria antes de mergear) |
| 5. Al abrir el PR, responder en el chat solo con la URL del PR, sin repetir el resumen. | Historial de git y PRs (no hay transcripciones de sesión en el repo) | no se puede comprobar | Afecta a la salida del chat, que no se versiona. Además, sin PRs para estos commits (regla 4), nunca se dio la condición de la regla. | borrarla (o dejarla como preferencia de estilo fuera de «Reglas de proceso»: no es auditable) |


## Parte B: Análisis

### 1. La regla sobre la que me equivoqué

1. Mi apuesta inical era que se cumplía parcialmente. El veredicto real es que no se cumple. Me equivoqué porque asumía que los desarrolladores creaban las ramas para cada unidad de trabajo. Pero el agente ha detectado que los commits se hacen directamente en la rama s5/start, sin creación de ramas.


### 2. La regla que no se puede comprobar con lo que hay

La regla que no se puede comprobar es la 2, porque no se puede detectar si el commit es una acción humana o hecho por un agente usand SKILL.

### 3. La regla que borraría

Borraría la regla 2, ya que no se pueden comprobar con los agentes. La 2 porque no hay forma de detectar la acción humana vs skill.
