# Parte A

## Apuesta (escrita antes de lanzar nada, sin retocar después)

Reglas de proceso

- La rama es por unidad de trabajo, no por petición. Antes de tocar código, mira en qué rama estás: si ya es una rama de trabajo —cualquiera que no sea `main` ni una `sN/*`—, sigue en ella en vez de crear otra. Solo desde `main` o desde una `sN/*` se crea una nueva (`git checkout -b feat/<slug>`). Nunca commitear directo en `main` ni en una `sN/*`. - NO (un hook que bloquee el commit según la rama, o protección de rama en GitHub).
- El commit sí es por petición: al cerrar cada una, usar la skill `/commit`. - NO
- Un cambio que toque rutas, controladores, validadores o transformers de una capability se cierra en el mismo commit con el documento OpenAPI y el README de esa capability al día. El documento se construye en cada petición y no hay fichero que generar, así que lo que se commitea es el diff regenerado de `.adonisjs/`; el README es `docs/capabilities/<nombre>/README.md`. - NO
- `gh pr create` (con una descripción completa de los cambios en el cuerpo del PR) y el pase del subagente `adversarial-reviewer` sobre ese PR van **una sola vez, al terminar la unidad de trabajo**, no al cerrar cada petición. El review adversarial es lo último, antes de dar la unidad por terminada. -NO (job de CI)
- Cuando abras el PR, no repitas ese resumen en el chat: la sesión se va a perder, el PR no. Responde solo con la URL del PR. - NI IDEA

## Tabla

Ventana: `git log -15` en `auditoria-at` (de `b955a72` a `aee9a24`) y el árbol actual. Las reglas 1, 2, 4 y 5 ya existían antes de la ventana (desde `8f871d3`: no commitear en `main`/`s1/start`, `/commit` al cerrar la tarea, PR + `adversarial-reviewer`, responder solo con la URL) y en `0e56705` se reescriben. La 3 entra en `160fbc7`, así que solo se exige a los commits posteriores.

| #   | Qué pide                                                                          | Qué se miró                                            | Veredicto                            | Evidencia                                                      | Acción   |
| --- | --------------------------------------------------------------------------------- | ------------------------------------------------------ | ------------------------------------ | -------------------------------------------------------------- | -------- |
| 1   | Rama por unidad de trabajo; nunca commitear en `main` ni `sN/*`                   | `git log -15 --format=...`, `git branch -a --contains` | no se puede comprobar con lo que hay | sin rastro: falta la rama de origen de cada commit             | bajarla  |
| 2   | Cada petición se cierra con un commit vía `/commit`                               | `git log -15`, `.claude/skills/commit/SKILL.md`        | no se puede comprobar con lo que hay | sin rastro: falta casar petición con commit; indicio `aee9a24` | bajarla  |
| 3   | Rutas/controladores/validadores/transformers: OpenAPI y README en el mismo commit | `git show --stat`, `git show cbe9617`                  | se cumple                            | `cbe9617` incluye `docs/capabilities/tasks/README.md`          | bajarla  |
| 4   | PR y `adversarial-reviewer` una sola vez, al final                                | `git log -15`, `ls .github`                            | no se puede comprobar con lo que hay | sin rastro: falta el historial de PRs en GitHub                | bajarla  |
| 5   | Al abrir el PR, responder solo con la URL                                         | ninguno: no hay artefacto                              | no se puede comprobar con lo que hay | sin rastro: faltan las transcripciones de las sesiones         | borrarla |

## Detalle de las comprobaciones

### Regla 1

- **Regla completa:** una rama por unidad de trabajo, creada solo desde `main` o una `sN/*`; nunca commitear directo en `main` ni en una `sN/*`.
- **Comandos:** `git log -15 --format='%h %p %s'`, `git branch -a --contains <sha>` por commit, `git branch --show-current`, `ls .git/hooks`.
- **Salida resumida:** los 15 commits son lineales (un solo padre, sin merges), ninguno está en `main` ni en una rama `feat/*`, y solo aparecen en `s5/start` y `upstream/s4/end`. Eso encaja con commits directos en una `sN/*`, pero un rebase o fast-forward desde otra rama dejaría el mismo rastro. Para comprobarlo hace falta saber en qué rama se hizo cada commit (reflog de quien lo hizo, o el historial de PRs en GitHub). La rama actual, `auditoria-at`, sí es de trabajo.

### Regla 2

- **Regla completa:** cerrar cada petición con un commit hecho mediante la skill `/commit`.
- **Comandos / archivos:** `git log -15` (mensajes y trailers), `.claude/skills/commit/SKILL.md`.
- **Salida resumida:** la skill no deja ninguna marca en el commit, y en git no hay registro de qué peticiones hubo para casar una con cada commit. Hay un indicio en contra: `aee9a24` (`docs: …`) no tiene el scope que exige el formato `tipo(scope)` de la skill.

### Regla 3

- **Regla completa:** si un commit toca rutas, controladores, validadores o transformers de una capability, el mismo commit actualiza su OpenAPI (diff de `.adonisjs/`) y `docs/capabilities/<nombre>/README.md`.
- **Comandos / archivos:** `git show --stat` de los 15 commits, `git show cbe9617`, `git log -S'se cierra en el mismo commit' -- CLAUDE.md`, `backend/.adonisjs/client/registry/schema.d.ts`.
- **Salida resumida:** después de `160fbc7`, el único commit que toca controladores es `cbe9617`. Ese commit incluye `docs/capabilities/tasks/README.md`. No añade rutas ni controladores, y el registro tipa las respuestas con `ReturnType<import(...)>`, así que no había diff de `.adonisjs/` que regenerar. `4e03d1f` (transformer sin README) y `ea5db1f` (rutas) son anteriores a la regla.

### Regla 4

- **Regla completa:** `gh pr create` con una descripción completa y el pase de `adversarial-reviewer` se hacen una sola vez, al terminar la unidad, y el review es lo último.
- **Comandos:** `git log -15` (sin merges), `ls .github` (no existe).
- **Salida resumida:** no deja rastro en git ni en el árbol: no hay merges de PR en la ventana ni CI. Para comprobarlo hace falta el historial de PRs y de sus comentarios en GitHub (`gh pr list` / `gh pr view`), que en esta auditoría no se podía usar.

### Regla 5

- **Regla completa:** al abrir el PR, responder en el chat solo con su URL, sin repetir el resumen.
- **Comandos:** nada: no tiene un artefacto que mirar.
- **Salida resumida:** solo afecta al texto del chat, que no queda en git ni en el árbol. Para comprobarlo hacen falta las transcripciones de las sesiones.

# Parte B

1. La regla sobre la que me equivoqué: la 3. Aposté que no se cumplía, porque es la más cara de cumplir, y salió "se cumple".
   Lo incómodo es que acerté en espíritu y fallé en el veredicto: en la misma ventana hay dos commits que la rompen justo antes de que la regla se escribiera.
   La regla existe porque ya se había incumplido. El "se cumple" vale para un solo commit.
2. La regla que no se puede comprobar, y qué tendría que cambiar: la 2. Un commit hecho con la skill y uno hecho a mano son idénticos en git.
   Para que dejara rastro habría que reescribirla en términos observables, el formato tipo(scope): que la propia skill impone, y bajarla a un hook de commit-msg que rechace lo que no lo cumpla.
3. La regla que borraría, y por qué: la 5, responder solo con la URL del PR.
   Su fallo es invisible, no deja rastro y cuesta una línea de chat.
