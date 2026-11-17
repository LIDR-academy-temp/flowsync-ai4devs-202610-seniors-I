# Auditoría de las reglas de proceso

**Alcance:** las reglas de proceso de [`CLAUDE.md`](../../CLAUDE.md) contrastadas contra los **últimos
15 commits** del repositorio y el estado del árbol. La ventana es la que fija la lección del módulo.

**Cómo se ha hecho:** con comandos de `git` y leyendo ficheros. Cada fila dice qué se miró, para que
se pueda repetir. Cuando una regla no deja rastro comprobable, se dice; no se supone.

---

## Antes de nada: la apuesta

**No se escribió la apuesta antes de mirar, y eso ya no tiene arreglo.** Se comprobó el historial
antes de apuntar qué reglas se creían cumplidas, así que la tabla de abajo está contaminada por el
resultado y no puede decirse que sepa lo que yo creía.

Lo que sí se puede decir, mirando la tabla con hindsight: de las siete reglas, **tres parecían cumplidas** —la del commit por petición, la del PR único y la del pase del revisor— y **ninguna de
las tres se cumple**. Las otras cuatro, la que de verdad se incumple —el PR— es la que más cuesta, porque es la que se nota desde fuera: hay 26 pull requests abiertos en el repositorio y el trabajo
auditado no tuvo ninguno.

---

## La tabla

| # | Qué pide la regla | Qué se miró para comprobarlo | Veredicto | La evidencia | Qué harías con ella |
|---|---|---|---|---|---|
| 1 | La rama es por **unidad de trabajo**, no por petición | `git branch -a --contains` de los 15; `git log upstream/s5/start..auditoria-af` | **no se puede comprobar** | Los 15 commits están en `auditoria-af` y en `upstream/s5/start`, y no hay ninguna otra ref. `auditoria-af` es **idéntica** a `s5/start` (0 commits propios). Git no guarda el nombre de la rama en el commit: no queda rastro de en qué rama se escribieron | **bajarla** |
| 2 | Nunca commitear directo en `main` ni en una `sN/*` | `git log main`; `git log --merges --all` | **no se puede comprobar** | En `main`: ningún commit auditado está ahí, y solo tiene el «Initial commit». En `sN/*`: los 15 commits viven en `upstream/s5/start`, cuya punta es `aee9a24` —idéntica a la de `auditoria-af`— y en **línea recta, sin un solo merge**. Eso es compatible con dos lecturas (se commiteó directamente en `s5/start`, o se commiteó en una rama de trabajo que luego se publicó tal cual) y el historial no las separa | **bajarla** |
| 3 | El commit es por petición, con la skill `/commit` | `git log -15 --format="%s\|%b"`; `.claude/skills/commit/SKILL.md` | **no se puede comprobar** | La **forma** que fija la skill sí se cumple: 15/15 son `tipo(scope): descripción` (13 con scope, 2 sin). Pero la skill no deja marca, y 13/15 llevan cuerpo en prosa y `Co-Authored-By: Claude …`, que ella no produce (son 3 pasos: diff staged → redactar → commitear). Y «una petición, un commit» no es observable: el historial dice qué cambió, no qué lo pidió | **bajarla** |
| 4 | Si el cambio toca rutas, controladores, validadores o transformers, el OpenAPI y el README de la capability se actualizan **en el mismo commit** | `git log -15 --name-only`; orden real del grafo; `.adonisjs/` regenerado en una copia y comparado con lo commiteado | **se cumple** | La regla nace en `160fbc7`; en el grafo, `ea5db1f` (rutas) y `4e03d1f` (transformer) son **ancestros** de ese commit, así que aún no les aplicaba. El único al que le aplicaba es `cbe9617`: actualiza los 3 controladores + `app/openapi/schemas.ts` + `config/openapi.ts` + `docs/capabilities/tasks/README.md` en el mismo commit. Y el diff regenerado de `.adonisjs/` era **vacío**: 9/9 ficheros idénticos a los commiteados, así que no había nada que commitear | **dejarla** |
| 5 | `gh pr create` **una sola vez** al terminar la unidad de trabajo, con la descripción completa en el cuerpo | `gh pr list --state all --limit 100`; ¿qué PR contiene `4427afc`? | **no se cumple** | La unidad auditada se cerró **sin PR**: ningún PR del repo contiene el trabajo (ni mergeado —`gh pr list --state merged` devuelve 0— ni abierto). Se publicó directo en `upstream/s5/start`, en línea recta. La regla nació en `0e56705`, ancestro de 13 de los 15 commits, así que les aplicaba. *La parte del cuerpo sí se cumple en el único caso observable: el PR #164 del módulo 4 lleva tres párrafos con qué se auditó, qué se añadió y qué ficheros forman la entrega* | **bajarla** |
| 6 | El pase del subagente `adversarial-reviewer` sobre ese PR, lo último | `.claude/agents/adversarial-reviewer.md`; `.claude/settings.json`; `gh pr view 164 --json comments,reviews` | **no se cumple** | El revisor existe (lo crea `8f9e715`, dentro de la ventana, y está en `origin/trazabilidad-af`), pero **nada lo invoca**: el único hook de `settings.json` es el de Prettier. Y no dejó rastro: el PR #164 tiene `comments: []` y `reviews: []` | **dejarla** |
| 7 | Al abrir el PR, no repetir el resumen: **solo la URL** | Transcript de Codex del módulo 4 (`~/.codex/sessions/2026/11/16/rollout-2026-11-16T21-26-13-*.jsonl`) | **no se cumple** | `gh pr create` devolvió solo la URL; la respuesta en el chat fue: «PR #164 verificado. Está abierto contra `s4/start`, coincide con la entrega aprobada y contiene los tres tests previstos. Sin bloqueos.» El fondo se respetó —no repitió el resumen—, pero la respuesta no fue solo la URL | **bajarla** |

---

## Las tres líneas

**1. La regla de la que más me separé.** La 5, la del PR. La daba por cumplida porque el repositorio
tiene 26 pull requests abiertos y `gh pr create` funcionaba de sobra; al mirar el grafo resultó que
la unidad auditada se publicó en `s5/start` sin pasar por un PR. No lo sospeché porque **nunca había
mirado** si había merge commits: ese era el dato, y estaba a un `git log --merges` de distancia.

**2. La que no se puede comprobar.** La 1, la rama por unidad de trabajo. No deja rastro en ninguna
parte: git no guarda el nombre de la rama, y la rama de trabajo del autor —si la hubo— no está en
ninguna ref. Para que dejara rastro tendría que ser un hook `PreToolUse` sobre `git commit` que
compruebe `git rev-parse --abbrev-ref HEAD`; el hook convertiría la intención en algo ejecutable, y
de paso taparía la regla 2.

**3. La que borraría.** La 3, «el commit es por petición». Es la que no se cumple nunca y a nadie le
ha importado: la mitad de la forma —`tipo(scope): descripción`— la cumple el 100 % de los commits sin
que nadie la escriba, porque es lo que sale solo. La otra mitad —«una petición, un commit»— no es una
regla: es una intención, y no se puede auditar sin el contexto de la sesión.

---

## Dos notas sobre el estado del repositorio

- El **filtro por estado** de `GET /api/v1/tasks` sigue devolviendo `200` con lista vacía donde la spec
  pide `422`. No es un incumplimiento de las reglas de proceso —las reglas no hablan de eso—, pero
  está declarado como «Sin cumplir hoy» en el README de la capability, y conviene saberlo: es un
  incumplimiento de la spec que sobrevive a todo esto.
- La **capability `auth`** no tiene anotaciones de OpenAPI: sus cuatro rutas salen con
  `responses: {}` en el documento. El de `tasks` sí está anotado entero, desde `cbe9617`.
