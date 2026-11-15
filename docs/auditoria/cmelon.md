# Auditoría de reglas de proceso — cmelon

## Apuesta (antes de mirar)
1. Rama por unidad de trabajo / no crear otra si ya estás en una de trabajo: No
2. Nunca commitear directo en main ni en sN/*: Si
3. Commit por petición con la skill /commit: Si
4. Cambio en rutas/controladores/validadores/transformers → mismo commit con diff de .adonisjs/ y README de la capability: No
5. PR con descripción completa, una sola vez al final de la unidad: Si
6. adversarial-reviewer sobre el PR, como último paso: Si
7. Al abrir el PR, responder solo con la URL: No

## Tabla

Ventana auditada: `git log -15` desde `HEAD` = `aee9a24` (de `b955a72` a `aee9a24`), más el estado actual del árbol en `auditoria-cmelon`.

| Qué pide la regla (1 frase) | Qué se miró (comando o archivo exacto) | Veredicto | Evidencia (1 línea: sha/archivo donde se rompe, o qué falta para comprobarla) | Acción (dejarla / borrarla / bajarla) |
|---|---|---|---|---|
| La rama es por unidad de trabajo, no por petición. | `git log -15 --stat --format=fuller`, `git branch -a`, `git reflog -n 30 --date=iso` | no se puede comprobar con lo que hay | Git no registra qué es una "petición" ni una "unidad de trabajo"; faltaría el registro de peticiones (sesiones/tickets) para cruzarlo con las ramas. | bajarla |
| Antes de tocar código, mirar en qué rama se está. | `git reflog -n 30 --date=iso` | no se puede comprobar con lo que hay | Mirar la rama (`git status`/`git branch`) no deja rastro en git; faltaría la transcripción de la sesión. | bajarla |
| Si ya se está en una rama de trabajo (no `main` ni `sN/*`), seguir en ella en vez de crear otra. | `git reflog -n 30 --date=iso` | se cumple | Reflog local: ningún `checkout` crea rama nueva desde una de trabajo; siempre se vuelve a `sN/start` antes (p. ej. `trazabilidad-cmelon → s5/start → auditoria-cmelon`, 2026-11-15). Solo cubre este clon, no los 15 commits de upstream. | dejarla |
| Solo se crea rama nueva desde `main` o desde una `sN/*`. | `git reflog -n 30 --date=iso`, `git rev-parse --short auditoria-cmelon s5/start` | se cumple | `auditoria-cmelon` nace de `s5/start` (ambas en `aee9a24`); `alcance-`, `spec-viva-`, `trazabilidad-cmelon` nacen de `s2/`, `s3/`, `s4/start` según el reflog. | dejarla |
| La rama nueva se llama `feat/<slug>`. | `git branch -a` | no se cumple | No existe ninguna rama `feat/*` local ni remota; la rama actual es `auditoria-cmelon` (y `alcance-`, `spec-viva-`, `trazabilidad-cmelon`, `harness-cmelon`). | borrarla |
| Nunca commitear directo en `main` ni en una `sN/*`. | `git log --graph --all --oneline -40`, `git log -15 --merges --oneline`, `git branch -a --contains <sha>` (4427afc, 0e56705, 4e03d1f, ea5db1f, cbe9617, afc4b74, aee9a24) | no se puede comprobar con lo que hay | Los 15 commits son lineales en `s5/start`, sin merge y sin rama `feat/*` que los contenga, pero autor ≠ committer (p. ej. `4427afc`, `cbe9617`) indica rebase/cherry-pick: un fast-forward desde otra rama es indistinguible; faltarían los PR o la rama original. | bajarla |
| Hacer un commit por cada petición. | `git log -15 --stat --format=fuller` | no se puede comprobar con lo que hay | Hay 15 commits pero ningún registro de peticiones con el que emparejarlos; faltaría el historial de sesiones/prompts por petición. | dejarla |
| Al cerrar cada petición, commitear con la skill `/commit`. | `.claude/skills/commit/SKILL.md`, `git log -15 --stat --format=fuller` | no se puede comprobar con lo que hay | El uso de una skill no deja rastro en el commit; el formato `tipo(scope): …` lo cumple cualquiera a mano. Faltaría la transcripción de la sesión. | bajarla |
| Un cambio en rutas/controladores/validadores/transformers de una capability lleva en el mismo commit el documento OpenAPI al día (diff de `.adonisjs/`). | `git log -15 --format='%h %s' -- backend/start/routes.ts backend/app/controllers backend/app/validators backend/app/transformers backend/.adonisjs docs/capabilities`, `git show --stat 4e03d1f`, `grep -n -i transformer backend/.adonisjs/client/registry/schema.d.ts` | se cumple | `ea5db1f` toca `start/routes.ts` y trae el diff de `.adonisjs/`; `cbe9617` toca 3 controladores y actualiza el OpenAPI con decoradores en el mismo commit, sin diff de `.adonisjs/` (el documento vive en los decoradores, no en `.adonisjs/`, al contrario de lo que dice la regla). | bajarla |
| Ese mismo cambio lleva en el mismo commit `docs/capabilities/<nombre>/README.md` al día. | `git show --stat 4e03d1f`, `git show 4e03d1f^:docs/capabilities/tasks/README.md`, `git show --stat cbe9617` | no se cumple | `4e03d1f` cambia `backend/app/transformers/task_transformer.ts` (la forma del `assignee`) sin README; el README no existía y llega después en `7662fb1` (la regla se añade aún después, en `160fbc7`). `cbe9617` sí lo cumple. | bajarla |
| Abrir el PR con `gh pr create` y una descripción completa de los cambios en el cuerpo. | `git log -15 --merges --oneline`, `git branch -a` | no se puede comprobar con lo que hay | Ningún merge en los 15 commits y nada de GitHub en git; faltaría la lista de PR del repo (`gh pr list --state all`) con sus cuerpos. | dejarla |
| El PR se abre una sola vez, al terminar la unidad de trabajo, no por petición. | `git log -15 --merges --oneline` | no se puede comprobar con lo que hay | Sin merges ni referencias a PR en los mensajes; faltarían los PR de GitHub con sus commits asociados. | dejarla |
| Pasar el subagente `adversarial-reviewer` sobre ese PR una sola vez, al terminar la unidad. | `.claude/agents/adversarial-reviewer.md`, `git show --stat 8f9e715` | no se puede comprobar con lo que hay | Que el agente exista (`8f9e715` lo modifica) no prueba que se ejecutara; faltaría la transcripción de la sesión o un comentario del review en el PR. | bajarla |
| El review adversarial es lo último antes de dar la unidad por terminada. | `git log -15 --stat --format=fuller` | no se puede comprobar con lo que hay | Faltaría el momento del review (sesión o comentario en el PR) para compararlo con el último commit/merge de la unidad. | bajarla |
| Al abrir el PR, responder en el chat solo con la URL, sin repetir el resumen. | — (no hay artefacto en el repo) | no se puede comprobar con lo que hay | La respuesta del chat no deja rastro en git; faltaría la transcripción de la sesión. | bajarla |


## 🅱️ Parte B: las tres líneas

**1. La regla sobre la que me equivoqué.**
"Si ya estás en una rama de trabajo, sigue en ella en vez de crear otra": aposté que **no** se cumplía y el reflog dice que **se cumple** (siempre vuelvo a `sN/start` antes de crear la rama del ejercicio). Mi apuesta se apoyaba en la sensación de que crear ramas era decisión del desarrollador. En sentido contrario, aposté **sí** a "nunca commitear en `main`/`sN/*`" y al `adversarial-reviewer`, y resultaron **no comprobables**: daba por hecho que se cumplían solo porque estaban escritas.

**2. La regla que no se puede comprobar con lo que hay.**
"Pasar el `adversarial-reviewer` sobre el PR como último paso": hoy se ejecuta a mano dentro de una sesión y no deja ningún rastro. Para que lo deje, habría que bajarlo a la CI: un job que lance el revisor al abrir el PR y publique su resultado como comentario en el propio PR. Además, la auditoría mostró que la regla del OpenAPI describe mal el mecanismo (el documento vive en los decoradores de los controladores, no en `.adonisjs/`), así que antes de bajarla hay que reescribirla.

**3. La regla que borraría, y por qué.**
"La rama nueva se llama `feat/<slug>`": pertenece al grupo de las que **no se cumplen nunca y a nadie le ha importado**. No existe ninguna rama `feat/*` local ni remota, y el propio curso me pide nombres como `auditoria-cmelon`. La regla solo alarga el contexto que el agente lee en cada arranque.

**Fila verificada a mano:** "Ese mismo cambio lleva el README de la capability al día" → `git show --stat 4e03d1f` confirma que toca `backend/app/transformers/task_transformer.ts` y no `docs/capabilities/tasks/README.md`.