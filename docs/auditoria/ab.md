# Auditoría de las reglas de proceso (ab)

## La apuesta

> he leido la parte de reglas del proceso y mi apuesta es que se van a cumplir las 5 reglas, creo que aunque esten escritas de forma bastante narrativa indican lo que se espera y creo que seras capaz de tenerlas en cuenta.

## Alcance

- **Contra qué:** las 5 reglas de «Reglas de proceso» de `CLAUDE.md`, partidas en 13 obligaciones que se pueden comprobar una a una.
- **Sobre qué:** los 15 últimos commits (`b955a72`…`aee9a24`) y el estado actual del repo, a 2026-11-17.
- **Con qué:** `git log`, `git branch -a`, `git ls-remote upstream`, y `gh pr list` contra `upstream` (LIDR-academy-temp) y `origin` (fork).
- **Cuándo entraron en vigor las reglas.** Las reglas 1, 2 y 4, en su redacción actual, entran en `0e56705`, el 2.º de los 15 commits. La regla 3 entra en `160fbc7`, el 10.º. Se audita contra la redacción actual; cuando un commit es anterior a la regla, se indica.
- **Sobre la rama `auditoria-ab`:** la creó Alex para el ejercicio.

## Resultado

| ID | Qué se pide | Qué se miró | Veredicto | Evidencia | Qué haría con ella |
|---|---|---|---|---|---|
| 1a | Mirar en qué rama se está antes de tocar código | No deja rastro | No se puede comprobar con lo que hay | Git no registra lo que se consultó antes de editar. | Bajarla |
| 1b | Si ya es rama de trabajo, seguir en ella y no crear otra | `git branch -a --contains <hash>`; `git log -15 --format='%h autor:%ad commit:%cd %cn' --date=short`; `git cat-file -t 5cb8726` | No se puede comprobar con lo que hay | La historia se reescribió y se perdieron las ramas de origen. `4e03d1f` cita «5cb8726», y `git cat-file -t 5cb8726` da `fatal: Not a valid object name 5cb8726`. Además, las fechas de autor van fuera de orden (`b955a72` es del 28/08 y va antes que los del 20/08). | Dejarla |
| 1c | Rama nueva solo desde `main` o `sN/*`, con el nombre `feat/<slug>` | `git ls-remote upstream` | No se puede comprobar con lo que hay | En `upstream` solo hay `main` y `sN/*`. Las ramas en que se trabajaron estos commits no se conservan, porque la historia se reescribió (ver 1b). | Bajarla |
| 1d | Nunca commitear directo en `main` ni en `sN/*` | `git branch -a --contains <hash>`; `git log -15 --merges --oneline`; `git cat-file -t 5cb8726` | No se puede comprobar con lo que hay | Los 15 están en `upstream/s4/end` y `s5/start` con historia lineal, sin merge ni PR. Pero la historia se reescribió (`5cb8726`, citado en `4e03d1f`, ya no existe), así que no se sabe en qué rama se hizo cada commit. | Bajarla |
| 2a | Un commit al cerrar cada petición | `git log -15 --format='%h %ad %an \| %s' --date=iso` | No se puede comprobar con lo que hay | Las peticiones no quedan en git. Solo se ve que hay 11 commits de una misma sesión el 20/08, con 1–3 min entre uno y otro. | Dejarla |
| 2b | Commitear con la skill `/commit` | `git log -15 --format='%h %an \| %s'`; `cat .claude/skills/commit/SKILL.md` | No se puede comprobar con lo que hay | Los 15 son `tipo(scope): …`, pero el formato no prueba que se usara la skill. 4 son de «LIDR Academy/LIDR-AI4Devs», sin coautoría de Claude. | Bajarla |
| 3a | El commit que toca rutas, controladores, validadores o transformers lleva el diff regenerado de `.adonisjs/` | `git log -15 --name-only`; `git show --stat 4e03d1f ea5db1f cbe9617`; `grep -n tasks_controller backend/.adonisjs/client/registry/schema.d.ts` | No se puede comprobar con lo que hay | `ea5db1f` (rutas nuevas) incluye su `.adonisjs/`. `4e03d1f` y `cbe9617` no lo traen, y probablemente no generaban diff, porque el registro referencia los tipos por `import(...)`. No se ha regenerado para comprobarlo. | Bajarla |
| 3b | Ese mismo commit pone al día `docs/capabilities/<nombre>/README.md` | `git show --stat 4e03d1f cbe9617`; `git log --oneline -- docs/capabilities/tasks/README.md` | Se cumple | `cbe9617`, el único commit posterior a la regla (`160fbc7`) que toca controladores, trae `docs/capabilities/tasks/README.md`. `4e03d1f` no lo trae, pero es anterior a la regla y al README (nace en `7662fb1`). | Bajarla |
| 4a | `gh pr create` una sola vez, al terminar la unidad | `gh pr list -R <upstream\|origin> --state all --search <hash>`; `gh repo view <upstream> --json isFork,parent,createdAt`; `git log -15 --merges --oneline` | No se puede comprobar con lo que hay | `upstream` se creó el 15/10/2026, sin repo padre y después de los commits, que vienen del «repo de diseño» (`21ce54d`). Si hubo PRs, están allí. Que falten `(#N)` y merges no prueba nada tras un rebase o una copia. | Dejarla |
| 4b | El cuerpo del PR describe los cambios por completo | `gh pr list -R <upstream\|origin> --state all --search <hash>` | No se puede comprobar con lo que hay | Depende de 4a: si hubo PR, está en el repo de diseño, al que no hay acceso. | Dejarla |
| 4c | Pasar `adversarial-reviewer` sobre ese PR, una sola vez | `git log --oneline -- .claude/agents/adversarial-reviewer.md` | No se puede comprobar con lo que hay | Pasar el revisor no deja rastro en git, y el PR, si lo hubo, está fuera de esta copia. Solo consta la edición del agente (`8f9e715`). | Dejarla |
| 4d | El review adversarial es lo último antes de cerrar la unidad | No deja rastro | No se puede comprobar con lo que hay | No queda rastro del orden de los pasos. | Borrarla |
| 5 | Al abrir el PR, en el chat solo la URL | No deja rastro | No se puede comprobar con lo que hay | Es comportamiento en el chat, y el chat no queda en el repo. | Dejarla |

**Recuento:** 1 se cumple (3b), 0 no se cumplen y 12 no se pueden comprobar con lo que hay.

**Conclusión:** con lo que hay, la apuesta ni se confirma ni se refuta. El hallazgo principal es que este historial no sirve para auditar las reglas de proceso:
- Es una copia del repo de diseño del curso, creada el 15/10/2026, después de los commits.
- La historia está reescrita: los commits de Earvin los aplica como committer «LIDR Academy», y `5cb8726`, citado en `4e03d1f`, ya no existe.
- Se perdieron las ramas de origen, los PRs y cualquier rastro de cómo se trabajó.

Para auditar el proceso habría que hacerlo en el repo de diseño, o sobre trabajo hecho en esta copia, a partir de ahora.

## Parte B

1. Aposte a que se cumplian las 5 y solo hemos podido comprobar 1, la 3b. El resto no dejan rastro. Me apoyaba en que el agente las iba a seguir.

2. la 1d, no hacer comint en main ni en las sN. La historia se reescribio por lo que no se puede saber en que rama se hizo cada comit. Habria que meter un hook que no dejase hacer un comit en esas ramas.

3. La 4d la booraria porque ya lo dice la 4c y nunca se va a poder comprobar
