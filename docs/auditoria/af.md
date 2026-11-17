# Auditoría de las reglas de proceso

**Alcance:** las reglas de proceso de [`CLAUDE.md`](../../CLAUDE.md) contrastadas contra los **últimos
15 commits** del repositorio y el estado del árbol. La ventana es la que fija la lección del módulo.

**Qué son esos 15 commits:** los que acaban en `aee9a24`, que es la punta de `upstream/s5/start` en
el momento de la auditoría. Hay que fijarlos por su hash, no por «los últimos 15», porque en cuanto
esta misma auditoría se commitea la ventana se desplaza.

**Cuándo se miró el árbol:** antes de commitear estos entregables. El estado que se auditó era el de
la rama de partida, con un único cambio sin commitear —`prompts.md`— y sin commits propios. A partir
de ese momento la rama lleva ya los commits de esta entrega y existe una rama aparte con la
funcionalidad de versionar el documento OpenAPI, así que alguna evidencia de las filas 1 y 2 («0
commits propios», «la punta de `s5/start` coincide con la de la rama») ya no es cierta hoy. Lo que
se audita es el estado de aquel momento, que es el que las reglas describen.

**Cómo se ha hecho:** con comandos de `git` y leyendo ficheros. Cada fila dice qué se miró, para que
se pueda repetir. Cuando una regla no deja rastro comprobable, se dice; no se supone.

---

## Antes de nada: la apuesta

**No se escribió la apuesta antes de mirar, y eso ya no tiene arreglo.** Se comprobó el historial
antes de apuntar qué reglas se creían cumplidas, así que la tabla de abajo está contaminada por el
resultado. La primera de las tres líneas no puede, por eso, apoyarse en un contraste real: no hay
columna izquierda con la que compararla.

Lo que sí se puede decir mirando la tabla después, y que es una conjetura y no una apuesta: de las
siete filas, **una se cumple, tres no se pueden comprobar y tres no se cumplen**. La que se cumple
es la que nadie mira —la del contrato de la capability—, y las tres que se incumplen son las tres
que se ven desde fuera: el pull request, el pase del revisor y la respuesta con la URL.

Sobre el recuento: `CLAUDE.md` tiene **cinco viñetas** en «Reglas de proceso» y la tabla tiene
**siete filas**, porque dos viñetas esconden dos reglas cada una. La primera («la rama es por unidad
de trabajo… nunca commitear directo en `main` ni en una `sN/*»») son dos, y la cuarta («`gh pr
create`… y el pase del revisor…») también. El enunciado admite el troceo —«si necesitas tres frases,
es que ahí hay dos reglas metidas en una»—, pero conviene decirlo.

---

## La tabla

| # | Qué pide la regla | Qué se miró para comprobarlo | Veredicto | La evidencia | Qué harías con ella |
|---|---|---|---|---|---|
| 1 | La rama es por **unidad de trabajo**, no por petición | `git branch -a --contains` de los 15; `git log upstream/s5/start..auditoria-af` | **no se puede comprobar** | Los 15 commits están en `auditoria-af` y en `upstream/s5/start`, y dos de ellos (`b955a72` y `fd8946a`) también en `origin/trazabilidad-af`. En el momento de la auditoría, `auditoria-af` era **idéntica** a `s5/start` (0 commits propios). Git no guarda el nombre de la rama en el commit: no queda rastro de en qué rama se escribieron | **bajarla** |
| 2 | Nunca commitear directo en `main` ni en una `sN/*` | `git log main`; `git log -15 aee9a24 --format="%h %p"` | **no se puede comprobar** | En `main`: ningún commit auditado está ahí, y solo tiene el «Initial commit». En `sN/*`: los 15 commits viven en `upstream/s5/start` —cuyo punta es `aee9a24`, idéntica entonces a la de `auditoria-af`— y **cada uno tiene un solo padre**: línea recta, sin un solo merge. Eso es compatible con dos lecturas (se commiteó directamente en `s5/start`, o se commiteó en una rama de trabajo que luego se publicó tal cual) y el historial no las separa | **bajarla** |
| 3 | El commit es por petición, con la skill `/commit` | `git log -15 aee9a24 --format="%s\|%b"`; `.claude/skills/commit/SKILL.md` | **no se puede comprobar** | La **forma** que fija la skill la cumplen 14 de los 15: `tipo(scope): descripción`. El único que no lleva scope es `aee9a24`, que es `docs: …`. Pero la skill no deja marca, y 12 de los 15 llevan cuerpo en prosa y `Co-Authored-By: Claude …`, que ella no produce (son 3 pasos: diff staged → redactar → commitear). Y «una petición, un commit» no es observable: el historial dice qué cambió, no qué lo pidió | **borrarla** |
| 4 | Si el cambio toca rutas, controladores, validadores o transformers, el OpenAPI y el README de la capability se actualizan **en el mismo commit** | `git log -15 aee9a24 --name-only`; orden real del grafo; `.adonisjs/` regenerado en una copia y comparado con lo commiteado | **se cumple** | La regla nace en `160fbc7`; en el grafo, `ea5db1f` (rutas) y `4e03d1f` (transformer) son **ancestros** de ese commit, así que aún no les aplicaba. El único al que le aplicaba es `cbe9617`: actualiza los 3 controladores + `app/openapi/schemas.ts` + `config/openapi.ts` + `docs/capabilities/tasks/README.md` en el mismo commit. Y el diff regenerado de `.adonisjs/` era **vacío**: 9/9 ficheros idénticos a los commiteados, así que no había nada que commitear | **dejarla** |
| 5 | `gh pr create` **una sola vez** al terminar la unidad de trabajo, con la descripción completa en el cuerpo | `gh pr list --state all --limit 100`; ¿qué PR contiene `4427afc`? | **no se cumple** | La unidad auditada se cerró **sin PR**: ningún PR del repo contiene el trabajo (ni mergeado —`gh pr list --state merged` devuelve 0— ni abierto). Se publicó directo en `upstream/s5/start`. La regla nació en `0e56705`, que es ancestro de 12 de los 15 commits: a esos 12 les aplicaba. *La parte del cuerpo sí se cumple en el único caso observable: el PR #164 del módulo 4 lleva tres párrafos con qué se auditó, qué se añadió y qué ficheros forman la entrega* | **bajarla** |
| 6 | El pase del subagente `adversarial-reviewer` sobre ese PR, lo último | `.claude/agents/adversarial-reviewer.md`; `.claude/settings.json`; `gh pr view 164 --json comments,reviews` | **no se cumple** | El revisor existe y estaba disponible: el fichero está en el árbol de la rama auditada y en `origin/trazabilidad-af`, y lo crea `8f9e715`, dentro de la ventana. Pero **nada lo invoca**: el único hook de `settings.json` es el de Prettier. Y el único PR de la serie donde se puede mirar, el #164, tiene `comments: []` y `reviews: []` | **bajarla** |
| 7 | Al abrir el PR, no repetir el resumen: **solo la URL** | Transcript de Codex del módulo 4 (`~/.codex/sessions/2026/11/16/rollout-2026-11-16T21-26-13-*.jsonl`) | **no se cumple** | `gh pr create` devolvió solo la URL; la respuesta en el chat fue: «PR #164 verificado. Está abierto contra `s4/start`, coincide con la entrega aprobada y contiene los tres tests previstos. Sin bloqueos.» El fondo se respetó —no repitió el resumen—, pero la respuesta no fue solo la URL | **dejarla** |

---

## Las tres líneas

**1. La regla de la que más me separé.** Sin apuesta no hay comparación, así que la línea que puedo
escribir es la otra: **la regla cuyo veredicto más me sorprendió, y por tanto la que más
probablemente daba por cumplida**. Fue la 5, la del pull request. El repositorio tiene 162 pull
requests abiertos y el trabajo auditado no tuvo ninguno, y no lo sospeché porque nunca miré si
había merge commits: ese era el dato, y estaba a un `git log --merges` de distancia.

**2. La que no se puede comprobar.** La 1, la rama por unidad de trabajo. No deja rastro en ninguna
parte: git no guarda el nombre de la rama, y la rama de trabajo del autor —si la hubo— no está en
ninguna ref. Para que dejara rastro tendría que ser un hook `PreToolUse` sobre `git commit` que
compruebe `git rev-parse --abbrev-ref HEAD`; el hook convertiría la intención en algo ejecutable, y
de paso taparía la regla 2.

**3. La que borraría.** La 3, «el commit es por petición». Es del grupo de **las que se cumplen sola
porque la herramienta ya lo impone**: la forma del mensaje —`tipo(scope): descripción`— la
impone la propia skill, y la cumplen 14 de los 15 commits sin que nadie la escriba. Lo único que la
regla añade encima es «una petición, un commit», que no es una regla sino una intención: no deja
rastro, no se puede comprobar y a nadie le ha pasado nada. La regla, tal como está escrita, ya no
dice nada que la herramienta no haga sola.

---

## Tres notas sobre el estado del repositorio

- El **filtro por estado** de `GET /api/v1/tasks`: un estado que **no existe** devuelve `200` con
  lista vacía, donde la spec pide `422`. Ojo con no confundirlo con lo otro: un filtro **válido** sin
  resultados también devuelve `200`, y eso la spec lo exige. No es un incumplimiento de las reglas
  de proceso —las reglas no hablan de eso—, pero está declarado como «Sin cumplir hoy» en el README
  de la capability, y conviene saberlo: es un incumplimiento de la spec que sobrevive a todo esto.
- La **capability `auth`** no tiene anotaciones de OpenAPI: sus cuatro rutas salen con
  `responses: {}` en el documento, y las tres del propio OpenAPI (`/api`, `/api.json`, `/api.yaml`)
  también. Solo los tres controladores de `tasks` llevan decoradores.
- Y una consecuencia de la fila 4: el documento OpenAPI que esa regla mantiene al día
  **documenta la desviación del filtro** —su descripción dice que un estado fuera de los tres no se
  rechaza—. El documento está al día con el código, que es lo que la regla pide; lo que no está al
  día es el código con la spec.
