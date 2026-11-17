# Auditoría de reglas de proceso: ml

Fuente de las reglas: `CLAUDE.md`, sección "Reglas de proceso".
Ventana auditada: últimos 15 commits + estado actual del árbol.

## Mi apuesta (escrita ANTES de mirar nada, no se retoca)

| # | Regla | Apuesta (sí / no / ni idea) | Comentarios |
|---|---|---|---|
| 1 | Una rama por unidad de trabajo. No se commitea en main ni en sN/*. | No a la primera parte. Si a la segunda. | No esta claro cuando tiene que crear la rama, si es la primera vez que hace cambios en el codigo o cuando. Regla de commitear deberia estar separada. |
| 2 | Un commit por petición, con la skill /commit. | No | En una conversacion se hara commit despues de cada prompt y que haga cambios? Esto no esta claro. |
| 3 | Un cambio en rutas, controladores, validadores o transformers se cierra en el mismo commit con el OpenAPI regenerado (.adonisjs/) y el README de la capability | Primera parte no, segunda si | |
| 4 | gh pr create y el pase de adversarial-reviewer se hacen una sola vez, al terminar la unidad de trabajo. Además, al abrir el PR respondes solo con la URL. | No | No esta claro cuando abrir el PR |

## Tabla de auditoría

Ventana: los 15 commits de `s5/start` (`upstream/s5/start` = `aee9a24`), de `aee9a24` a `b955a72`, más el árbol actual.

| # | Qué pide la regla | Qué se miró | Veredicto | Evidencia | Qué haría |
|---|---|---|---|---|---|
| 1 | No commitear en `main` ni en `sN/*`; si ya estás en una rama de trabajo, seguir en ella; crear rama nueva solo desde `main`/`sN/*`. | `git log --graph --format='%h %p %s' s5/start -15`, `git log --merges b955a72^..s5/start`, `git reflog` | **no se puede comprobar con lo que hay** | Historia lineal y sin merges en la ventana: un commit no guarda en qué rama se hizo. El reflog solo es el mío (local), no el de quien commiteó. Faltaría un rastro de la rama de origen (PR o hook que la registre). | bajarla |
| 2 | Al cerrar cada petición, un commit hecho con la skill `/commit`. | `git log s5/start -15 --format=%s`, `.claude/skills/commit/SKILL.md`, `git log --format=%(trailers)` | **no se puede comprobar con lo que hay** | 15/15 mensajes son `tipo(scope): descripción`, pero la skill solo genera ese formato y se puede escribir a mano igual; nada indica que se invocó, ni que el commit fuera "por petición". Faltaría un `commit-msg` hook o commitlint (no hay `.husky` ni hooks activos en `.git/hooks`). | bajarla |
| 3 | Si un commit toca rutas, controladores, validadores o transformers de una capability, ese mismo commit lleva OpenAPI (`.adonisjs/`) y `docs/capabilities/<nombre>/README.md` al día. | `git log s5/start -15 -- backend/start/routes.ts backend/app/{controllers,validators,transformers}`, `git show --stat cbe9617 4e03d1f ea5db1f`, `git show 160fbc7` (cuándo nace la regla) | **se cumple** | Solo `cbe9617` toca controladores *después* de que exista la regla (`160fbc7`): incluye README de tasks y los decoradores OpenAPI; `.adonisjs/` no cambia porque no hay rutas ni tipos nuevos. `4e03d1f` (transformer) y `ea5db1f` (rutas) son anteriores a la regla, así que no cuentan. Muestra de 1 caso. | bajarla |
| 4 | `gh pr create` con descripción completa y pase de `adversarial-reviewer` una sola vez, al terminar la unidad; al abrir el PR, responder solo con la URL. | `git log --merges b955a72^..s5/start`, `git ls-files .github`, `grep -rli adversarial` fuera de `.claude/` | **no se puede comprobar con lo que hay** | Ni PR, ni informe del reviewer, ni CI en el árbol; el pase del reviewer y "solo la URL" ocurren en el chat, que la propia regla da por perdido. Faltaría que un job de CI lance al revisor al abrir el PR y deje el informe como comentario. | bajarla |

Veredictos posibles: **se cumple** · **no se cumple** · **no se puede comprobar con lo que hay**
Qué haría: **dejarla** · **borrarla** · **bajarla** (a algo que se ejecute solo)

## Las tres líneas

1. **La regla sobre la que me equivoqué:**
Un cambio en rutas, controladores, validadores o transformers se cierra en el mismo commit con el OpenAPI regenerado (.adonisjs/) y el README de la capability.
Pense que no se podia comprobar esto, y viendo los archivos del commit si se puede comprobar.

2. **La regla que no se puede comprobar con lo que hay** (y qué tendría que cambiar para que dejara rastro):
Todas menos la regla que mencione en el punto anterior

3. **La regla que borraría, y por qué** (¿se cumple sola porque la herramienta ya lo impide, o no se cumple nunca y a nadie le importa?):
No se commitea en main ni en sN/*
GitHub puede impedir esto. Y ademas, si la regla dice que se crea una rama, nunca se va a intentar commitear en esos branches.