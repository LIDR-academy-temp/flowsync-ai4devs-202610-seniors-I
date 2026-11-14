# Auditoría de reglas de proceso — crt

Reglas: `CLAUDE.md`, sección `## Reglas de proceso`.
Ventana: últimos 15 commits + estado actual del árbol.

## Mi apuesta (escrita antes de mirar, sin retocar)

| # | Regla | Apuesta |
|---|---|---|
| 1 | Rama por unidad de trabajo; solo se crea desde `main`/`sN/*`; nunca commit directo en `main` ni `sN/*` | sí |
| 2 | Commit por petición, usando la skill `/commit` | ni idea |
| 3 | Cambio en rutas/controladores/validadores/transformers → mismo commit con OpenAPI (`.adonisjs/`) y README de la capability | no |
| 4 | `gh pr create` con descripción completa + `adversarial-reviewer` una sola vez, al final de la unidad | ni idea |
| 5 | Tras abrir el PR, responder en el chat solo con la URL | ni idea |

## Tabla

Ventana: `b955a72..aee9a24`. Historial lineal, sin merges. La versión actual de las reglas 1, 2, 4 y 5 entra en `0e56705`; la regla 3 entra en `160fbc7`.

| # | Qué pide la regla | Qué se miró | Veredicto | Evidencia | Qué haría |
|---|---|---|---|---|---|
| 1 | Una rama de trabajo por unidad, creada desde `main`/`sN/*`; nunca commit directo en `main` ni en `sN/*` | `git log --graph -15`, `git log --merges -15`, `git branch -a --contains <sha>` | No se cumple | `afc4b74` es posterior a la regla (`0e56705`) y su asunto dice que se puso "en la rama de partida": commit directo en `s5/start`. Historial lineal sin merges ni ramas `feat/*` | bajarla |
| 2 | Un commit por petición, hecho con la skill `/commit` | `git log -15 --format=%s`, `.claude/skills/commit/SKILL.md` | No se puede comprobar | 14 de 15 asuntos siguen `tipo(scope): …` (`aee9a24` no lleva scope), pero ese formato se escribe igual a mano y nada registra qué es una "petición" | bajarla |
| 3 | Un cambio en rutas, controladores, validadores o transformers lleva en el mismo commit el diff de `.adonisjs/` y el README de la capability | `git show --stat` de `cbe9617`, `ea5db1f` y `4e03d1f`; `npm test` regenera `.adonisjs` sin dejar diff | Se cumple | Desde la regla, solo `cbe9617` toca controladores, y actualiza `docs/capabilities/tasks/README.md`; `.adonisjs` ya estaba al día. `ea5db1f` y `4e03d1f` son anteriores a la regla | bajarla |
| 4 | `gh pr create` y `adversarial-reviewer` una sola vez, al final de la unidad | `gh pr list -R LIDR-academy-temp/…`, trailers de los commits | No se puede comprobar | Los 15 commits no entraron por PR en este repo, y el revisor adversarial no deja rastro en git | bajarla |
| 5 | Al abrir el PR, responder en el chat solo con la URL | Nada que mirar | No se puede comprobar | Es conducta del chat; la sesión no se guarda en el repo | borrarla |

## Las tres líneas

1. **La regla sobre la que me equivoqué:** Regla 1 (rama por unidad, nunca commitear en `sN/*`). Aposté *sí* y no se cumple: `afc4b74`, posterior a la regla, dice que se puso "en la rama de partida", es decir, directo en `s5/start`. Mi apuesta no se apoyaba en nada que hubiera mirado: lo daba por hecho.
2. **La regla que no se puede comprobar con lo que hay:** Regla 4 (PR y revisor adversarial al final). El revisor corre en una sesión local y no deja nada en git ni en el PR. Dejaría rastro si un job de CI lo lanzara en cada PR y publicara el resultado como comentario.
3. **La regla que borraría, y por qué:** Regla 5 (responder solo con la URL del PR). Es imposible de auditar y, si no se cumple, lo único que pasa es un mensaje más largo en un chat que se pierde. Es del grupo de "a nadie le importa": si se incumple, nadie se entera.

**Comprobada a mano:** regla 1, con `git show --stat afc4b74` (asunto "…en la rama de partida", solo toca `README.md`).
