# Apuesta: 
Todas las reglas se cumplen, porque son pedidos claros y simples y Claude los puede manejar.

# Auditoría: "Reglas de proceso" de CLAUDE.md

Contraste con los últimos 15 commits (`aee9a24`..`b955a72`) y el árbol actual.

| Qué pide la regla | Qué se miró | Veredicto | Evidencia | Qué haría |
|---|---|---|---|---|
| 1. Una rama por unidad de trabajo; solo se crea desde `main`/`sN/*`; nunca commitear en `main` ni `sN/*` | `git branch -a --contains 4e03d1f`; `git log -15 --format='%h %p'` | no se puede comprobar | El commit no guarda la rama donde se hizo. Historial lineal, sin merges. `4e03d1f` (y los otros commits de trabajo) están en `s5/start` y `upstream/s4/end`, lo que sugiere commit directo en una `sN/*`, pero un fast-forward lo explicaría igual. Falta el reflog del autor o un hook | bajarla |
| 2. Un commit por petición, con la skill `/commit` | `git log -15 --format='%h %s'` | no se puede comprobar | Solo se ve el formato convencional (15/15). Git no registra si se usó la skill ni cuántas peticiones hubo. Falta el log de sesiones | bajarla |
| 3. Si cambia rutas/controladores/validadores/transformers, el mismo commit actualiza OpenAPI (diff de `.adonisjs/`) y el README de la capability | `git log -- CLAUDE.md` (regla desde `160fbc7`, 2026-08-20); `git show --stat --format= <sha>` de los 15 commits | no se cumple (comprobado manualmente)| Único commit posterior a la regla que toca controladores: `cbe9617`. Cambia 3 controladores, el README de `tasks` y la definición del contrato (`app/openapi/schemas.ts`, `config/openapi.ts`), pero no trae nada de `.adonisjs/`: el espíritu se respeta, la letra (diff de `.adonisjs/`) no. Salvedad: si la regeneración no produjo diff, no había nada que commitear. `4e03d1f` (transformer, sin README) y `ea5db1f` (rutas, con `.adonisjs/` pero sin README) son anteriores a la regla y no la incumplen | bajarla |
| 4. `gh pr create` una sola vez, al terminar la unidad, y después el pase de `adversarial-reviewer` | `gh pr list --state all --limit 10`; `git branch -a` | no se puede comprobar | Los PR listados son de otros alumnos. Ninguna rama local ni remota corresponde a los commits auditados. El paso del revisor no deja rastro en git. Falta el PR de la unidad y la traza del subagente | bajarla |
| 5. Al abrir el PR, responder en el chat solo con la URL | Nada en git ni en el árbol | no se puede comprobar | Es una conducta de la conversación y no queda en el repo. Falta el transcript de la sesión | dejarla |

## Avisos

- **Reglas con dos pedidos distintos adentro:**
  - Regla 1: "reutilizar la rama de trabajo / crear solo desde `main` o `sN/*`" y "no commitear en `main` ni `sN/*`".
  - Regla 3: OpenAPI al día y README al día.
  - Regla 4: "PR una sola vez" y "revisor adversarial el último".

---
Comprobacion:

 git branch -a --contains 4e03d1f
* auditoria-db
  s5/start
  remotes/origin/s5/start
… +2 lines

Confirmado: 4e03d1f está en s5/start, origin/s5/start, upstream/s4/end y upstream/s5/start, además de auditoria-db, que parte de ahí. Ninguna de esas ramas es main.

---
 git show --stat --format= cbe9617
 .../app/controllers/task_due_dates_controller.ts   |  36 ++++
 .../app/controllers/task_statuses_controller.ts    |  35 ++++
 backend/app/controllers/tasks_controller.ts        |  96 ++++++++-
 backend/app/openapi/schemas.ts                     | 215 +++++++++++++++++++++
 backend/config/openapi.ts                          |  13 ++
 backend/package.json                               |   1 +
 docs/capabilities/tasks/README.md                  |  19 +-
 7 files changed, 413 insertions(+), 2 deletions(-)

Lo que muestra coincide con cbe9617 toca tres controladores y docs/capabilities/tasks/README.md. No hay ningún archivo bajo .adonisjs/.

Hay un dato que la fila no recoge. El commit también cambia backend/app/openapi/schemas.ts y backend/config/openapi.ts, que son la definición del documento OpenAPI. Es decir, el contrato OpenAPI sí se actualizó en ese commit, aunque no como diff de .adonisjs/. Según CLAUDE.md, el documento se construye en cada petición y lo que se commitea es el diff regenerado de .adonisjs/. Pero la regla dice "OpenAPI al día", y esos dos archivos son donde vive el contenido del documento.
---

### 🅱️ Parte B: las tres líneas

1. **La regla sobre la que te equivocaste.** Yo aposte a que Claude cumpliria con esas reglas tan simples. Pero el problema fue como verificarlo con evidencia. La regla 3 salió “no se cumple”, y las otras cuatro no se pueden comprobar.

2. **La regla que no se puede comprobar con lo que hay**, y en una frase qué tendría que cambiar para que dejara rastro. Puede ser reescribirla, puede ser que algo la ejecute, puede ser que no haya arreglo posible y toque asumir que vive de la buena voluntad.

Por ejemplo, la 2. Nada en git dice si se usó /commit. Para que dejara rastro, /commit podría agregar una marca al mensaje del commit. Otra opción es la 1: un hook de git, que es un programita que corre solo antes de cada commit, podría bloquear commits en main o sN/*, y entonces ya no dependería de la buena voluntad.

3. **La regla que borrarías, y por qué.** Hay dos candidatas típicas: la que se cumple sola porque la herramienta ya lo impide, y la que no se cumple nunca y a nadie le ha importado. Elige una y di a cuál de los dos grupos pertenece.

  Yo borraria una regla que “la herramienta ya lo impide”, pero no encontre ninguna en los guardrails, asi que mantengo todas.
  
