# Auditoría de las reglas de proceso — jmb

- **Fecha:** 2026-11-15
- **Rama auditada:** `auditoria-jmb`, que apunta al mismo commit que `s5/start` (`aee9a24`), con el árbol limpio.
- **Reglas:** `AGENTS.md` es un enlace simbólico a `CLAUDE.md` (`ls -la` → `AGENTS.md -> CLAUDE.md`). Las reglas son las cinco viñetas de «Reglas de proceso» (`CLAUDE.md:130-134`). Cuando una viñeta mete dos reglas en una, aquí van en filas separadas.
- **Ventana:** `git log -15`, de `b955a72` a `aee9a24`. Cada regla se juzga solo contra los commits posteriores a su redacción actual: la de ramas y PR se reescribió en `0e56705`, y la del contrato se añadió en `160fbc7`.
- **Estado del árbol:** ramas locales y remotas, reflog, hooks, `.claude/`, el fork y el repo del curso en GitHub (`gh api`), y una regeneración de `.adonisjs/` en una copia aislada fuera del repo.

## Resultado

| # | Qué pide la regla | Qué se miró | Veredicto | Evidencia | Qué haría |
|---|---|---|---|---|---|
| 1 | Antes de tocar código, comprobar en qué rama se está. | `ls .git/hooks` (solo `*.sample`), `.claude/settings.json` (el único hook es un `PostToolUse` de Prettier) | **No se puede comprobar** | Es un paso que da el agente y no queda registrado en ningún sitio. Para poder comprobarla haría falta un hook `PreToolUse` que bloquee `Edit`/`Write` en `main` o en `sN/*`. | Bajarla |
| 2 | No commitear directamente en `main` ni en una `sN/*`. | `git branch -a --contains <sha>` para los 15, `git log -15 --merges`, `gh api repos/LIDR-academy-temp/…/commits/<sha>/pulls`, `gh api …/branches/<rama>/protection`, `git rev-list --count upstream/sN/start..sN/start` | **No se puede comprobar** | Los 15 commits solo se alcanzan desde `s4/start`, `s4/end` y `s5/start`, con historia lineal, sin merges y sin PR asociado. Git no guarda en qué rama nació un commit, así que esto encaja tanto con un commit directo como con una rama de trabajo que se fusionó en fast-forward y luego se borró. Ninguna rama está protegida. En este clon, `main` y `sN/start` no tienen commits propios. Para comprobarla harían falta merges `--no-ff`, PRs o protección de rama. | Bajarla |
| 3 | Las ramas nuevas se llaman `feat/<slug>`. | `git branch -a`, `gh api repos/JoseMariaBernad/…/branches`, `README.md:109` | **No se cumple** | La rama actual se llama `auditoria-jmb` y la anterior `trazabilidad-jmb`. No hay ni una `feat/*` ni en local ni en los remotos. El propio README de la rama manda `git checkout -b auditoria-<tus-iniciales>`, que contradice la regla. | Borrarla |
| 4 | Solo se abre rama nueva desde `main` o desde una `sN/*`. Si ya se está en una de trabajo, se sigue en ella: una rama por unidad de trabajo, no por petición. | `git reflog` | **Se cumple** | `HEAD@{3}: moving from s4/start to trazabilidad-jmb` y `HEAD@{0}: moving from s5/start to auditoria-jmb`. Ninguna rama se creó desde otra rama de trabajo. Ojo: el reflog es local, así que esto solo cubre este clon. Para los 15 commits no queda rastro (fila 2). | Dejarla |
| 5 | Cada petición se cierra con su propio commit. | `git log -15`, `prompts.md` | **No se puede comprobar** | Las peticiones no se guardan en nada que esté versionado (`prompts.md` sigue siendo la plantilla sin rellenar), así que no hay con qué emparejar los commits. Haría falta un registro de peticiones, o un hook `Stop` que avise si el turno acaba con el árbol sucio. | Bajarla |
| 6 | Los commits se hacen con la skill `/commit`. | `.claude/skills/commit/SKILL.md`, `git log -15 --format='%h %an %s%n%b'` | **No se cumple** | La skill no deja ninguna marca. Lo único que se puede contrastar es su formato, `tipo(scope): descripción`. `aee9a24` («docs: las instrucciones apuntan…») no tiene scope, así que no salió de la skill. Además, `README.md:203` manda hacer `git commit -m "auditoria: …"` a mano. | Bajarla |
| 7 | Si un commit toca rutas, controladores, validadores o transformers de una capability, ese mismo commit lleva el diff regenerado de `.adonisjs/` (el OpenAPI). | `git log 160fbc7..HEAD -- backend/app backend/start` (sale solo `cbe9617`), `git show cbe9617`, `node ace test` sobre una copia del backend en el scratchpad y `diff -r .adonisjs` | **Se cumple** | `cbe9617` añade decoradores `@Api*` sin tocar rutas ni firmas, y `.adonisjs/server/controllers.ts` se regenera idéntico. `routes.ts` y `.adonisjs/` se tocaron por última vez juntos, en `ea5db1f`. Solo hay un caso (n=1), y el registro Tuyau no se pudo regenerar (ver nota 1). | Bajarla |
| 8 | Ese mismo commit lleva también al día el README de la capability. | `git show --stat cbe9617` | **Se cumple** | `cbe9617` modifica `docs/capabilities/tasks/README.md` y corrige una fila que daba por cumplido el rechazo de un estado inventado. `4e03d1f`, que toca un transformer, es anterior a la regla y al README, así que queda fuera. | Dejarla |
| 9 | Al terminar la unidad de trabajo se abre un PR con `gh pr create`, una sola vez y con una descripción completa. | `gh api …/commits/<sha>/pulls` para cada commit, `gh api '…/pulls?state=closed'`, `gh pr list --author JoseMariaBernad`, `gh api repos/JoseMariaBernad/…/branches` | **No se cumple** | Ninguno de los 15 commits tiene PR asociado, y el repo del curso tiene 0 PRs mergeados. Por ejemplo, `4e03d1f` (un fix de código en `tasks`) llegó a `s4/end` y `s5/start` sin pasar por ningún PR. En local, la unidad `trazabilidad-jmb` (`0697efd`) no está empujada al fork ni tiene PR. | Bajarla |
| 10 | Lo último de la unidad es pasar el subagente `adversarial-reviewer` sobre ese PR. | `.claude/agents/adversarial-reviewer.md` (solo tiene `Read`, `Grep` y `Glob`, y devuelve el resultado al chat), comentarios de PR | **No se puede comprobar** | El revisor no escribe en ningún sitio, y además no hay ningún PR sobre el que se pudiera haber pasado. Haría falta que el resultado quedara publicado, por ejemplo como comentario en el PR. | Bajarla |
| 11 | Al abrir el PR, en el chat se responde solo con la URL. | Nada versionado: las sesiones del agente no se guardan en el repo | **No se puede comprobar** | No queda rastro de la respuesta del chat. Lo que la regla quiere proteger, que el resumen viva en el PR, ya lo pide la fila 9. | Borrarla |

**Recuento:** 3 se cumplen, 3 no se cumplen y 5 no se pueden comprobar.

## Notas

1. **No se pudo regenerar el registro Tuyau.** Al arrancar la copia aislada, falla con `Cannot find package '@foadonis/openapi'`. El paquete está en `backend/package.json:66` desde `ea5db1f`, pero no está instalado en `backend/node_modules`. Así que en este clon el backend no arranca sin un `npm install`, y la fila 7 se apoya solo en que `controllers.ts` sale idéntico y en que el diff de `cbe9617` no cambia rutas ni firmas.
2. **La historia viene importada de otro repo.** `4e03d1f` cita `5cb8726`, que no existe aquí (`git cat-file -t 5cb8726` → `Not a valid object name`), y `21ce54d` dice que el README se genera «en el repo de diseño». Por eso las filas 2 y 9 no tienen rastro de ramas: si lo hubo, se quedó en el otro repo.
3. **El README del ejercicio contradice tres reglas.** Pide la rama `auditoria-<iniciales>` y no `feat/<slug>` (fila 3), un `git commit -m` a mano en vez de `/commit` (fila 6) y un PR por ejercicio, que choca con «al terminar la unidad» (fila 9). Si el agente obedece a CLAUDE.md, se sale del enunciado, y al revés.
4. **Nada ejecuta estas reglas.** No hay CI (no existe `.github/`), ni hooks de git, ni protección de rama, y el único hook de Claude es el de Prettier. Por eso la columna «Qué haría» casi siempre dice *bajarla*: las seis filas que hoy no se cumplen o no se pueden comprobar, y que tienen alguna consecuencia, solo pasarán a verificarse si las comprueba una máquina (protección de rama con PR obligatorio, un hook `commit-msg`, un `git diff --exit-code backend/.adonisjs` en CI y el revisor adversarial como job que comente en el PR).

## Parte B
En donde más me he equivocado es en esta: Las ramas nuevas se llaman feat/<slug>. La auditoría dice que habría que borrarla
pero yo creo que debe quedarse. La auditoría se basa en los últimos commits míos, que son de un ejercicio que hay que hacer,
no son de un repositorio de programación normal en el que se haya trabajado de verdad. Por eso no hay ramas de ese nombre.

No se puede comprobar: Antes de tocar código, comprobar en qué rama se está.
Habría que hacer:
Un hook PreToolUse en .claude/settings.json que mira la rama antes de cada Edit o Write y lo bloquea si se está en una rama prohibida:

"PreToolUse": [{
"matcher": "Edit|Write|NotebookEdit",
"hooks": [{ "type": "command", "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/guard-branch.sh" }]
}]
#!/bin/sh
b=$(git -C "$CLAUDE_PROJECT_DIR" branch --show-current)
case "$b" in
main|s[0-9]*/*) echo "Estás en '$b'. Crea una rama de trabajo antes de editar." >&2; exit 2 ;;
esac

El exit 2 cancela la edición y le pasa el mensaje al agente, que tiene que crear la rama antes de seguir.

No borraría ninguna regla, porque no he encontrado ninguna que pertenezca a ninguna de las 2 categorías que indica el enunciado.