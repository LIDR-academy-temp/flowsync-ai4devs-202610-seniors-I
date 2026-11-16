# Auditoría de reglas de proceso — agnaedig

Fecha: 2026-11-16. Rama: `auditoria-agnaedig`. Alcance: las 5 reglas de `## Reglas de proceso` de `CLAUDE.md` (`AGENTS.md` es un symlink a él), contrastadas contra los últimos 15 commits (`aee9a24` … `b955a72`) y el estado del árbol. Auditoría, no arreglo: no se ha modificado ningún otro archivo.

## Apuesta (escrita antes de comprobar)

Marcas «Sí» del usuario, las 5 reglas. Están como sufijo en las líneas de `CLAUDE.md`/`AGENTS.md`, sin commitear en el árbol:

- Regla 1 (rama por unidad): **Sí**
- Regla 2 (commit con `/commit`): **Sí**
- Regla 3 (OpenAPI + README + `.adonisjs/` en el mismo commit): **Sí**
- Regla 4 (PR y revisor una sola vez): **Sí**
- Regla 5 (al abrir el PR, responder solo con la URL): **Sí**

## Tabla

| # | Qué pide la regla | Qué se miró | Veredicto | Evidencia | Qué hacer |
|---|---|---|---|---|---|
| 1 | Trabajar en rama de unidad; nunca commitear en `main` ni en `sN/*`. | `git branch --show-current`; `git reflog`; `git branch --contains` sobre los 15 commits; `git log --graph` | **no se puede comprobar con lo que hay** | La rama actual es `auditoria-agnaedig`, correcta. Los 15 commits son lineales, sin merges, y aparecen en `s5/start` y `upstream/s5/start`. Git no guarda en qué rama se hizo cada commit, y el reflog local arranca en el clon (`6973cba`). No hay traza de PR ni de hook que impida commitear en `sN/*`. | bajarla: protección de ramas en el remoto o hook `pre-commit` que bloquee `main`/`sN/*` |
| 2 | Cada petición se commitea con la skill `/commit`. | Existencia de `.claude/skills/commit/SKILL.md`; mensajes de los 15 commits | **no se puede comprobar con lo que hay** | La skill existe. Los mensajes son Conventional Commits con trailer `Co-Authored-By`, pero nada en el commit indica si se creó con `/commit` o a mano. No se abrió el contenido de `SKILL.md`. | dejarla, o bajarla a un hook que exija el formato del mensaje |
| 3 | Un cambio que toque rutas, controladores, validadores o transformers de una capability cierra en el mismo commit el OpenAPI y el README de la capability, y el diff de `.adonisjs/`. | `git show --stat` de `160fbc7` (fecha de la regla: 2026-08-20 17:07), `cbe9617`, `4e03d1f`, `ea5db1f` | **no se cumple** (en `cbe9617`) | `cbe9617` (2026-08-27) toca `controllers` de tareas, `app/openapi/schemas.ts`, `config/openapi.ts`, `package.json` y `docs/capabilities/tasks/README.md`, pero no hay ningún cambio en `.adonisjs/`. Los commits `4e03d1f` (transformer) y `ea5db1f` (rutas) son anteriores a la regla (16:46 y 16:53), así que no cuentan. Caveat: no se ha regenerado `.adonisjs/` para saber si habría cambiado; sí se sabe que el commit no lo incluye. | bajarla: un job de CI que regenere `.adonisjs/` y falle si el diff no está commiteado |
| 4 | `gh pr create` con descripción completa y el pase de `adversarial-reviewer` sobre el PR, una sola vez al terminar la unidad. | `gh pr list`; `git ls-remote`/`git branch -a` para la rama de la unidad | **no se puede comprobar con lo que hay** | La rama `auditoria-agnaedig` no existe en `origin`, así que todavía no hay PR de esta unidad. El agente `.claude/agents/adversarial-reviewer.md` existe (`8f9e715`), pero no hay en los commits ninguna traza de que haya pasado. | bajarla: un workflow de CI que lance el revisor y deje su resultado como comentario en el PR |
| 5 | Al abrir el PR, responder en el chat solo con la URL, sin repetir el resumen. | Nada en el repositorio | **no se puede comprobar con lo que hay** | Es conducta del chat. La sesión no deja rastro en git ni en ningún archivo del repo. | borrarla, o asumir que vive de la buena voluntad |

## Parte B (borrador: la apuesta es tuya, confirma o cambia)

1. **La regla donde más me separé:** En todas me separé, al tener las reglas de proceso literalmente en el archivo de insturcciones, pensé que eso obligaba a cumplirlas.

2. **Regla que no se puede comprobar con lo que hay:** la 4. Para que deje rastro, un workflow de CI tendría que lanzar el revisor sobre cada PR y publicar su hallazgo como comentario. Con la regla 1 pasa igual: solo se vería con protección de ramas o un hook.

3. **Regla que borraría:** la 5. Es conducta del chat, no deja rastro en ningún sitio y nadie puede comprobarla después. Pertenece al grupo «no se cumple nunca y a nadie le importa»: no hay nada que ejecutar sobre ella.

