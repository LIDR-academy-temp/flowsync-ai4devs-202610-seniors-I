
# Parte A
1. Que piden las reglas
 1. crear una rama antes de empezar si ya no estás en una rama.
 2. Utilizar el skill /commit pero solo por petición.
 3. Cuando hacen ciertos cambios se actualiza la documemntación pero sin generar un documento nuevo.
 4. crear un PR y pasa el revisor adversarial.
 5. Cuando se abra el PR envío sola la URL.

 2. Que se miró: lo miro el agente según el prompt 1. Pudo mirar varios archivos `backend/app/controllers/tasks_controller.ts`, `task_statuses_controller.ts`, `task_due_dates_controller.ts`, `backend/app/openapi/schemas.ts`, `backend/config/openapi.ts`, `docs/capabilities/tasks/README.md`
 3. Veredicto: excepto 3, dice que no sepuede comprobar, viendolo en perspectiva de agente tiene sentido, como sabes si alguien pidio los skills? si no es un pipeline o hay un prompt guardado difícil.
 4. En los archivos mostrados en la tabla, el agente lo pudo ver bien. En los no se puede comprobar, parecia algo que se le deja al usuario, por tanto no se puede asegurar sin una pipeline que lo invoque.
 5. borraría las 2 primeras, la otras dos las organizaría y pondría en un pipeline. Lo de la rama, lo miraría bien en el PR.

 # Parte B

 1. 1 si, 2 si, 3 a medias, 4 no  y  5 no (estás solo si alguien se acordo). Dije 1 y 2 se cumplian, pero no lo puede comprobar, y tiene lógica, dije 4 y 5, pero no se puede comprobar sin un pipeline.
 2. Ya lo dije, el PR y adversarial en un pipeline.
 3. 1 y 2, como lo compruebas, dejaría el skill por si alguien lo quiere utilizar.

---

# Parte C — Auditoría de los últimos 15 commits (`git log -15`, rama `auditoria-rm`)

Reglas auditadas (de `CLAUDE.md`, «Reglas de proceso»): **R1** rama de trabajo antes de tocar código · **R2** commit con `/commit` · **R3** contrato OpenAPI + README de la capability en el mismo commit · **R4** un único PR + revisor adversarial una vez · **R5** al cerrar, solo la URL del PR.

Leyenda: ✅ se cumple · ❌ no se cumple · ❔ no se puede comprobar · ➖ no aplica.

| # | Commit | Archivos (evidencia) | R1 | R2 | R3 | R4 | R5 |
|---|--------|----------------------|----|----|----|----|----|
| 1 | `aee9a24` docs: instrucciones a repos del cohorte | `README.md` | ❔ | ❔ | ➖ | ❔ | ❔ |
| 2 | `21ce54d` docs(s5): README es la lección | `README.md` | ❔ | ❔ | ➖ | ❔ | ❔ |
| 3 | `afc4b74` docs(s5): enunciado del ejercicio | `README.md` | ❔ | ❔ | ➖ | ❔ | ❔ |
| 4 | `cbe9617` docs(tasks): OpenAPI recoge el contrato | `backend/app/controllers/tasks_controller.ts`, `task_statuses_controller.ts`, `task_due_dates_controller.ts`, `backend/app/openapi/schemas.ts`, `backend/config/openapi.ts`, `docs/capabilities/tasks/README.md` | ❔ | ❔ | ✅ | ❔ | ❔ |
| 5 | `8f9e715` chore(harness): revisor contrasta con la spec | `.claude/agents/adversarial-reviewer.md` | ❔ | ❔ | ➖ | ❔ | ❔ |
| 6 | `160fbc7` docs(process): contrato en el mismo commit | `CLAUDE.md` | ❔ | ❔ | ➖ | ❔ | ❔ |
| 7 | `7662fb1` docs(tasks): README de la capability | `docs/capabilities/tasks/README.md` | ❔ | ❔ | ➖ | ❔ | ❔ |
| 8 | `c2fa70b` docs(adr): tests como fuente de verdad | `docs/adr/0001-…md`, `docs/adr/0002-…md` | ❔ | ❔ | ➖ | ❔ | ❔ |
| 9 | `d789d5c` docs(adr): delta-specs de OpenSpec | `docs/adr/0001-…md` | ❔ | ❔ | ➖ | ❔ | ❔ |
| 10 | `ea5db1f` feat(openapi): registrar rutas | `backend/start/routes.ts`, `backend/config/openapi.ts`, `backend/adonisrc.ts`, `backend/.adonisjs/**`, `package*.json` | ❔ | ❔ | ❌ | ❔ | ❔ |
| 11 | `190c80c` docs(architecture): diagrama C4 | `docs/architecture.md` | ❔ | ❔ | ➖ | ❔ | ❔ |
| 12 | `4e03d1f` fix(tasks): no publicar email | `backend/app/transformers/task_transformer.ts` | ❔ | ❔ | ❌ | ❔ | ❔ |
| 13 | `0e56705` docs(process): rama por unidad y un PR | `CLAUDE.md` | ❔ | ❔ | ➖ | ❔ | ❔ |
| 14 | `4427afc` test(tasks): responsable de cada tarea | `backend/tests/functional/tasks/assignee.spec.ts` | ❔ | ❔ | ➖ | ❔ | ❔ |
| 15 | `b955a72` docs(s4): enunciado del ejercicio | `README.md` | ❌ | ❔ | ➖ | ❔ | ❔ |

## Dónde se rompió (❌)

- **R3 · `4e03d1f`** (`task_transformer.ts`): cambia un transformer de `tasks` y no toca `docs/capabilities/tasks/README.md` ni el contrato OpenAPI. La regla no existía aún: se escribe 3 commits después en `160fbc7` (`CLAUDE.md`), así que es un incumplimiento retroactivo, no una desobediencia.
- **R3 · `ea5db1f`** (`start/routes.ts`, `.adonisjs/**`): toca rutas y no actualiza el README de la capability. Misma situación: anterior a `160fbc7`. El commit que sí lo cumple es `cbe9617`.
- **R1 · `b955a72`**: es el commit de plantilla de `s4/start`; solo está en `s4/start`, `s4/start2` y ramas derivadas, es decir, se hizo directamente sobre una rama `sN/*`. (Es del curso, no del trabajo del alumno.)

## Qué falta para poder comprobar (❔)

- **R1 (rama):** el historial es lineal y los commits `4427afc…cbe9617` solo están alcanzables desde `s5/start`; no queda ninguna rama de trabajo que los contenga y el reflog local empieza en el clon (2026-10-24), después de ellos. Falta el reflog del repo donde se escribieron, o el nombre de la rama de cabeza de los PR en GitHub (`rsmunoza-dev/raulmunoz`).
- **R2 (`/commit`):** el mensaje tiene formato Conventional Commits con cuerpo y trailer `Co-Authored-By` en los commits del alumno (`4427afc…cbe9617`), y existe `.claude/skills/commit`, pero un commit no registra qué skill lo produjo. Falta el transcript de las sesiones o `prompts.md` que muestre la invocación de `/commit`.
- **R4 (PR único + revisor):** no hay merges ni metadatos de PR en git y `gh` no está instalado. Falta la lista de PR de GitHub (cuántos, rama base/cabeza, a qué commits corresponden) y el comentario o salida del `adversarial-reviewer` sobre cada PR. El subagente existe (`.claude/agents/adversarial-reviewer.md`, `8f9e715`), pero eso no prueba que se ejecutara.
- **R5 (solo la URL):** es un mensaje de chat, no queda en git. Falta el transcript de cierre de cada unidad de trabajo.
- Los commits 1-3 y 15 son de la plataforma del curso (`LIDR`), solo tocan `README.md`; las reglas de proceso no tienen evidencia ni obligación clara sobre ellos.

## Estado actual del árbol (rama `auditoria-rm`, sin commitear)

Modificados: `backend/app/openapi/schemas.ts`, `backend/tests/functional/tasks/assignee.spec.ts`, `docs/adr/0001-…md`, `docs/adr/0002-…md`, `docs/capabilities/tasks/README.md`, `prompts.md`. Sin seguimiento: `.devcontainer/`, `.github/`, `backend/tests/functional/tasks/responsable.spec.ts`, `docs/auditoria/`. Hay trabajo pendiente de commitear que toca `schemas.ts` (contrato OpenAPI) y el README de la capability: al commitearlo, R3 exige que vayan juntos.
