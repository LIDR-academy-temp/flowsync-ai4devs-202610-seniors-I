# Auditoría de las reglas de proceso de `CLAUDE.md` (jcpv)

- **Fecha:** 2026-11-12
- **Rama:** `auditoria-jcpv` (creada desde `s5/start`), HEAD `aee9a24`
- **Alcance:** la sección «Reglas de proceso» de `CLAUDE.md`, contrastada contra `git log -15` (de `aee9a24` a `b955a72`) y contra el estado actual del árbol, las ramas y los PR del repositorio.
- **Cómo se ejecutó:** git desde WSL (`wsl -e git ...`), porque el git de Windows sobre `\\wsl.localhost` da falsos positivos: marca `AGENTS.md` como modificado porque no resuelve el symlink. `gh` autenticado como `JCPorrasDev`, contra `origin` (`JCPorrasDev/...`) y `upstream` (`LIDR-academy-temp/...`).

## Mi apuesta con las Reglas de proceso

- La rama es por unidad de trabajo, no por petición (No). Antes de tocar código, mira en qué rama estás: si ya es una rama de trabajo —cualquiera que no sea `main` ni una `sN/*`—, sigue en ella en vez de crear otra (Si). Solo desde `main` o desde una `sN/*` se crea una nueva (`git checkout -b feat/<slug>`) (No). Nunca commitear directo en `main` ni en una `sN/*` (Si).
- El commit sí es por petición: al cerrar cada una, usar la skill `/commit` (Si).
- Un cambio que toque rutas, controladores, validadores o transformers de una capability se cierra en el mismo commit con el documento OpenAPI y el README de esa capability al día (Si). El documento se construye en cada petición y no hay fichero que generar, así que lo que se commitea es el diff regenerado de `.adonisjs/` (Si); el README es `docs/capabilities/<nombre>/README.md` (Si).
- `gh pr create` (con una descripción completa de los cambios en el cuerpo del PR) y el pase del subagente `adversarial-reviewer` sobre ese PR van **una sola vez, al terminar la unidad de trabajo**, no al cerrar cada petición (Si). El review adversarial es lo último, antes de dar la unidad por terminada (Si).
- Cuando abras el PR, no repitas ese resumen en el chat: la sesión se va a perder, el PR no. Responde solo con la URL del PR (Si).

## Tabla de auditoría del Agente

| # | Qué pide la regla | Qué se miró | Veredicto | Evidencia | Qué harías |
|---|---|---|---|---|---|
| 1 | Si ya estás en una rama de trabajo, sigues en ella en vez de crear otra. | `git reflog --date=iso` | se cumple | Las cuatro ramas de trabajo del clon (`alcance-`, `spec-viva-`, `trazabilidad-` y `auditoria-jcpv`) nacen de `s2/`, `s3/`, `s4/` y `s5/start`; ninguna sale de otra rama de trabajo. | dejarla |
| 2 | Una rama nueva se llama `feat/<slug>`. | `git branch -a` y `git reflog` | no se cumple | No hay ninguna rama `feat/*`: `auditoria-jcpv` se creó desde `s5/start` el 2026-11-12 a las 20:32 con el patrón `<ejercicio>-<iniciales>`, el mismo que usan todos los PR de `upstream`. | borrarla |
| 3 | Nunca se commitea directo en `main` ni en una `sN/*`. | `git branch -a --contains <sha>` para los 15 commits, `git log -15 --merges` y `gh api repos/LIDR-academy-temp/flowsync-ai4devs-202610-seniors-I/commits/<sha>/pulls` | no se cumple | `afc4b74` («…en la rama de partida») y `aee9a24` (la punta de `s5/start`) solo están en ramas `sN/*` (más `auditoria-jcpv`, que se creó después), sin merge y sin PR. | bajarla |
| 4 | Al cerrar cada petición se hace un commit. | `git status --porcelain` y `git log -15` | no se puede comprobar con lo que hay | El repo no guarda las peticiones, así que no hay con qué emparejar cada commit; haría falta el transcript o una referencia petición→hash. El árbol tiene además `README.md` modificado sin commitear y no se sabe de qué petición sale. | bajarla |
| 5 | El commit se hace con la skill `/commit`, que exige `tipo(scope): descripción`. | `git log -15 --format='%h %an %s %(trailers:key=Co-Authored-By)'` frente a `.claude/skills/commit/SKILL.md` | no se cumple | `aee9a24` («docs: las instrucciones apuntan…») no tiene scope. Además `aee9a24`, `afc4b74` y `b955a72` no llevan trailer `Co-Authored-By`, así que no los hizo Claude. | bajarla |
| 6 | Si un commit toca rutas, controladores, validadores o transformers, lleva también el diff regenerado de `.adonisjs/`. | `git log 160fbc7..HEAD --name-status`, `backend/.adonisjs/client/registry/schema.d.ts:102` y `backend/start/routes.ts` frente a `backend/.adonisjs/server/routes.d.ts` | se cumple | Desde que existe la regla solo `cbe9617` toca controladores, y solo añade decoradores. El registro deduce los tipos con `import(...)`, así que no había diff que regenerar, y `routes.d.ts` recoge las mismas 12 rutas con nombre que `routes.ts`. | bajarla |
| 7 | Ese mismo commit pone al día `docs/capabilities/<nombre>/README.md`. | `git show --stat cbe9617` | se cumple | `cbe9617` modifica `docs/capabilities/tasks/README.md` junto con los tres controladores. | dejarla |
| 8 | Al terminar la unidad de trabajo se abre un PR con `gh pr create`. | `gh api repos/LIDR-academy-temp/flowsync-ai4devs-202610-seniors-I/commits/<sha>/pulls` para los 15 commits y `gh pr list -R JCPorrasDev/flowsync-ai4devs-202610-seniors-I --state all` | no se cumple | Ninguno de los 15 commits está en un PR de `upstream` ni de `origin` (las dos consultas devuelven `[]`). Las unidades de `4427afc` a `cbe9617` entraron en `s4/end` en línea recta. | bajarla |
| 9 | El cuerpo del PR describe de forma completa los cambios. | Lo mismo que en la fila 8, más `gh pr view 135 -R LIDR-academy-temp/flowsync-ai4devs-202610-seniors-I --json body` | no se puede comprobar con lo que hay | Los 15 commits no tienen PR, y «completa» no tiene criterio con el que medirla. Falta una plantilla de PR con secciones obligatorias. | bajarla |
| 10 | Se abre un solo PR por unidad de trabajo, no uno por petición. | `gh pr list -R LIDR-academy-temp/flowsync-ai4devs-202610-seniors-I --state all --head <rama>` para cada rama de trabajo del clon | se cumple | `harness-jcp` → #28, `alcance-jcpv` → #55, `spec-viva-jcpv` → #86 y `trazabilidad-jcpv` → #135: un PR por rama. | dejarla |
| 11 | El subagente `adversarial-reviewer` revisa el PR, y es lo último antes de cerrar la unidad. | `.claude/agents/adversarial-reviewer.md` (`tools: Read, Grep, Glob`) y `gh pr view 135 --json comments,reviews` | no se puede comprobar con lo que hay | El agente no escribe ni publica nada, y la única review de #135 es una rúbrica que no se le puede atribuir. Falta que su salida quede en el PR (como comentario) o en un fichero versionado. | bajarla |
| 12 | Al abrir el PR, en el chat se responde solo con su URL. | El repo entero: `git log` y los PR | no se puede comprobar con lo que hay | El chat no se guarda en ningún sitio del repo. Habría que conservar los transcripts de sesión. | borrarla |

## Estado del árbol en el momento de la auditoría

- `git status --porcelain` (WSL): ` M README.md`. El enlace al repo cambia de `LIDR-academy/...` a `LIDR-academy-temp/...` y está sin commitear.
- `.claude/settings.local.json` está sin trackear, pero lo ignora `~/.config/git/ignore`, no el `.gitignore` del repo, así que en otro clon aparecería como fichero nuevo.
- `docs/capabilities/` solo contiene `tasks/`. `auth` tiene rutas y controladores pero no tiene README, así que el próximo cambio en `auth` no puede cumplir la regla 7 tal como está escrita.

## Notas sobre la evidencia

- **Regla 3 en este clon.** El reflog local no muestra ningún `commit:` hecho con HEAD en `main` ni en una `sN/*`; todos están en ramas `*-jcpv`. Los incumplimientos de la tabla son de los 15 commits que vienen de `upstream`.
- **Filas 3 y 8: la historia se reescribió.** `4e03d1f` cita el commit `5cb8726`, que no existe en este repo (`git cat-file -t 5cb8726` → «Not a valid object name»), y `21ce54d` menciona un «repo de diseño». Puede que esos commits se hicieran en una rama o con un PR en otro repositorio. Aun así, en este repo no queda ningún rastro de eso, y es aquí donde se aplica la regla.
- **Fila 6.** No se regeneró `.adonisjs/` para comprobarlo, porque arrancar el servidor o los tests reescribe ficheros y esto es una auditoría. El veredicto se basa en que el registro tipa con `import(...)` sobre controladores y validadores, y en que la lista de rutas coincide.
- **Fila 1.** Que cada rama sea una unidad de trabajo distinta se deduce de que cada una corresponde a un ejercicio diferente (s2 a s5). Git no registra qué se entendía por «unidad de trabajo».

## Parte B
- **La regla sobre la que te equivocaste.** La rama es por unidad de trabajo, no por petición: pensaba que este criterio se iba a incumplir, sin embargo, el agente identificó que los últimos 15 commits si cumplen esta regla.
- **La regla que no se puede comprobar con lo que hay.** 4 Al cerrar cada petición se hace un commit: El repo no guarda las transcripciones o historial es mejor asumir que vive de la buena voluntad. 9 El cuerpo del PR describe de forma completa los cambios: para comprobarlo se debe establecer un criterio para medir 'completa'. 11 El subagente `adversarial-reviewer` revisa el PR, y es lo último antes de cerrar la unidad: para comprobar esta regla se debería incluir un comentario en el PR o un fichero versionado el histórico de las revisiones. 12 Al abrir el PR, en el chat se responde solo con su URL: para comprobarlo requiere de una auditoría humana que confirme el comportamiento en el chat.
- **La regla que borrarías, y por qué.** 2 Una rama nueva se llama `feat/<slug>`: la auditoría indica que esta es una regla que no se cumple nunca, y a nadie le ha importado ya que se ha utilizado otro formato en las cuatro ramas, y en ningún ejercicio se ha corregido el nombre de la rama.