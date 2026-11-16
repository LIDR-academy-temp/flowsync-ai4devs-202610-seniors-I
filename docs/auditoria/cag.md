## Reglas de proceso

- La rama es por unidad de trabajo, no por petición. Antes de tocar código, mira en qué rama estás: si ya es una rama de trabajo —cualquiera que no sea `main` ni una `sN/*`—, sigue en ella en vez de crear otra. Solo desde `main` o desde una `sN/*` se crea una nueva (`git checkout -b feat/<slug>`). Nunca commitear directo en `main` ni en una `sN/*`.

R: No

- El commit sí es por petición: al cerrar cada una, usar la skill `/commit`.

R: Sí

- Un cambio que toque rutas, controladores, validadores o transformers de una capability se cierra en el mismo commit con el documento OpenAPI y el README de esa capability al día. El documento se construye en cada petición y no hay fichero que generar, así que lo que se commitea es el diff regenerado de `.adonisjs/`; el README es `docs/capabilities/<nombre>/README.md`.

R: No

- `gh pr create` (con una descripción completa de los cambios en el cuerpo del PR) y el pase del subagente `adversarial-reviewer` sobre ese PR van **una sola vez, al terminar la unidad de trabajo**, no al cerrar cada petición. El review adversarial es lo último, antes de dar la unidad por terminada.

R: Sí

- Cuando abras el PR, no repitas ese resumen en el chat: la sesión se va a perder, el PR no. Responde solo con la URL del PR.

R: Sí

---

## Tabla de auditoría

Contraste de las reglas de proceso (`CLAUDE.md` / `AGENTS.md`) contra `git log -15` y el árbol actual (`git status`, `git branch --show-current`). Las balas compuestas se parten en una fila por norma atómica.

| Qué pide la regla | Qué se miró | Veredicto | Evidencia | Qué harías |
|---|---|---|---|---|
| No crear rama nueva por cada petición: una rama cubre la unidad de trabajo. | `git branch -a`; `git log -15 --oneline`; ramas `origin/*-cag` | no se puede comprobar con lo que hay | En los 15 commits no queda cuántas peticiones hubo por rama; solo se ven unidades en `origin` (`alcance-cag`, `harness-cag`, `trazabilidad-cag`), no el vínculo petición↔rama. | dejarla |
| Si ya estás en una rama de trabajo (no `main` ni `sN/*`), sigue en ella. | `git branch --show-current`; `git reflog` | se cumple | HEAD está en `auditoria-cag` (creada desde `s5/start`); no hay ramas extra creadas encima para esta unidad. | dejarla |
| Una rama nueva solo nace desde `main` o desde una `sN/*` (`feat/<slug>`). | `git reflog`; `git branch -a \| grep feat/` | se cumple | Reflog: `checkout: moving from s5/start to auditoria-cag`. No hay ninguna `feat/` local ni remota. | dejarla |
| Nunca commitear directo en `main` ni en una `sN/*`. | `git log s5/start -15 --oneline`; `git branch -a --contains 4e03d1f` | no se cumple | Los 15 commits viven en la línea de `s5/start` (sin merges); p. ej. `4e03d1f`, `ea5db1f`, `4427afc` solo aparecen en `s5/start` / `auditoria-cag`, no en una rama de trabajo. | bajarla |
| Al cerrar cada petición, hay un commit. | `git log -15 --format='%h %s'` | se cumple | Quince mensajes distintos y atómicos (`fix(tasks)`, `test(tasks)`, `feat(openapi)`, `docs(…)`, …), uno por cambio cerrado. | dejarla |
| Ese commit se hace con la skill `/commit`. | `.claude/skills/commit/SKILL.md`; trailers `Co-Authored-By` en `git log -15` | no se puede comprobar con lo que hay | El formato convencional encaja con la skill, pero el historial no deja rastro de que se invocara `/commit` frente a un `git commit` manual del agente. | bajarla |
| Si se tocan rutas/controladores/validadores/transformers de una capability, el mismo commit lleva OpenAPI/`.adonisjs` y el README de esa capability. | `git show --name-only` en `4e03d1f`, `ea5db1f`, `cbe9617` | no se cumple | `4e03d1f` solo cambia `backend/app/transformers/task_transformer.ts` (sin `docs/capabilities/tasks/README.md` ni `.adonisjs/`). | bajarla |
| `gh pr create` (cuerpo completo) una sola vez al cerrar la unidad, no por petición. | `gh pr list` (falla 401); `git branch -a` | no se puede comprobar con lo que hay | Sin credenciales de `gh` no hay PRs visibles; el historial git no registra cuántas veces se abrió un PR por unidad. | bajarla |
| El pase de `adversarial-reviewer` va una sola vez y es lo último de la unidad. | `.claude/agents/adversarial-reviewer.md`; `git show 8f9e715 --stat` | no se puede comprobar con lo que hay | El agente existe y `8f9e715` lo reescribe, pero no hay log ni comentario de PR que demuestre una ejecución al cierre de unidad. | bajarla |
| Al abrir el PR, en el chat solo se responde con la URL. | historial git / árbol; no hay transcripción de chat versionada | no se puede comprobar con lo que hay | Esa regla solo deja rastro en la conversación del agente, y eso no está en el repositorio. | borrarla |

---

## Parte B

1. **La regla sobre la que me equivoqué:** aposté *Sí* a que el PR + el review adversarial van una sola vez al cerrar la unidad; el veredicto es *no se puede comprobar con lo que hay* — no hay rastro en git ni acceso a PRs (`gh` 401).

2. **La que no se puede comprobar:** «al abrir el PR, responde solo con la URL en el chat»; para que dejara rastro haría falta versionar la respuesta del agente o bajarla a un checklist/hook de entrega que no dependa del chat.

3. **La que borraría:** la del chat (solo URL), porque pertenece al grupo de las que no se cumplen nunca de forma verificable y a nadie le ha importado dejar evidencia; es etiqueta sin guardarraíl.
