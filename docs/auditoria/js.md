# Auditoría de las reglas de proceso — js

## Tabla

| # | Qué pide la regla | Qué se miró para comprobarlo | Veredicto | La evidencia | Qué haría |
|---|---|---|---|---|---|
| 1 | Una rama por unidad de trabajo, no por petición | `git reflog` + `git log --oneline sN/start..<rama>` | Se cumple | `harness-js`→`076d9d2`, `alcance-js`→`449b369`, `trazabilidad-js`→`970176f`: una rama, un commit. `spec-viva-js` nació y se quedó vacía. | Dejarla |
| 2 | Solo se crea rama nueva desde `main` o `sN/*` | `git reflog` (entradas `checkout`) | Se cumple | Cada rama nace tras un `checkout: moving from s1/start…`, `s2/start…`, `s3/start…`, `s4/start…`, `s5/start…`. | Dejarla |
| 3 | Nunca commitear directo en `main` ni en una `sN/*` | `git log --oneline main` + `git reflog` | Se cumple | `main` solo tiene `6973cba Initial commit`; ningún `commit:` del reflog ocurre estando en `main` o en `sN/*`. | Bajarla |
| 4 | El commit es por petición: al cerrar, usar la skill `/commit` | `.claude/skills/commit/SKILL.md` + `git show` de los 3 commits propios | No se cumple | `970176f`, `449b369` y `076d9d2` usan `trazabilidad:`, `alcance:`, `harness:`; la skill exige `tipo(scope): descripción`. | Bajarla |
| 5 | Rutas, controladores, validadores o transformers se cierran en el mismo commit con el OpenAPI y el README de la capability | `git show --stat cbe9617 4e03d1f ea5db1f` | Se cumple | `cbe9617` mete 3 controladores + `app/openapi/schemas.ts` + `config/openapi.ts` + `docs/capabilities/tasks/README.md`. `4e03d1f`/`ea5db1f` no lo cumplen, pero son 14–21 min anteriores a la regla (`160fbc7`, 17:07). | Bajarla |
| 6 | `gh pr create` una sola vez, al terminar la unidad, con descripción completa | API de GitHub: PRs 23, 61 y 162 | No se cumple | Hay un PR por unidad (bien), pero los tres tienen el cuerpo vacío: `body: ""` en `GET /pulls/{23,61,162}`. | Bajarla |
| 7 | El `adversarial-reviewer` pasa sobre el PR al final, antes de dar la unidad por terminada | `.claude/agents/adversarial-reviewer.md` + reviews de los PRs | No se puede comprobar | Es read-only y devuelve los hallazgos al chat: no deja artefacto. Las únicas reviews son de `LIDR-AI4Devs`. Falta que escriba `docs/reviews/<pr>.md` o comente el PR. | Bajarla |
| 8 | Al abrir el PR, responder solo con la URL, sin repetir el resumen en el chat | Historial y PRs: no hay artefacto donde se registre la respuesta | No se puede comprobar | La respuesta vive en la sesión, no en el repositorio; y con cuerpos vacíos no hay resumen que contrastar. Falta el transcript de la sesión. | Borrarla |

## Notas

- **Fila 3:** no hay hook que lo impida; se cumple por disciplina. Un `pre-commit` que rechace `main` y `sN/*` lo convertiría en guardarraíl.
- **Fila 4:** la skill se invoca a mano y no deja rastro; lo único comprobable es el formato del mensaje, y ahí falla. Un `commit-msg` con commitlint lo ejecutaría solo.
- **Fila 5:** la regla dice que el documento «se construye en cada petición y no hay fichero que generar», pero `app/openapi/schemas.ts` y `config/openapi.ts` sí son ficheros escritos a mano. La premisa está desactualizada; lo que falta es un test que compare el documento con las rutas.
- **Fila 6:** el PR 162 (trazabilidad) tiene 3 ficheros y cuerpo vacío; el 61 y el 23, dos ficheros y cuerpo vacío. Una plantilla de PR con secciones obligatorias y un check que rechace el cuerpo vacío lo resuelven.
- **Fila 7:** el revisor adversarial no tiene `Write` ni `Bash`, así que por diseño no puede dejar el hallazgo en ningún sitio que sobreviva a la sesión.

## Parte B

**1. La regla sobre la que te equivocaste.** La del PR (fila 6): aposté **sí** y el veredicto es **no se cumple**. Daba por hecho que abrir un PR implicaba describirlo, y los tres tienen el cuerpo vacío. Es la separación más incómoda porque no es falta de rastro: es un incumplimiento con evidencia. Las filas 7 y 8 también se movieron (de *sí* a *no se puede comprobar*), pero ahí lo que falla es la trazabilidad, no la conducta.

> Apuesta previa: `1 sí · 2 sí · 3 sí · 4 no · 5 ni idea · 6 sí · 7 sí · 8 sí`.

**2. La regla que no se puede comprobar con lo que hay.** La del `adversarial-reviewer` (fila 7). Para que dejara rastro, el subagente tendría que escribir su informe en `docs/reviews/<pr>.md` (o comentar el PR con un token), y el informe viajaría en el mismo commit o en el PR; hoy es read-only y solo habla en el chat.

**3. La regla que borrarías, y por qué.** La de responder solo con la URL del PR (fila 8). Es del grupo de las que no se cumplen nunca y a nadie le ha importado: no deja rastro, no se puede verificar y su valor es higiene de chat, no del repositorio. Si se quiere conservar, su sitio es una preferencia de sesión, no una regla de proceso del proyecto.
