# Auditoría de reglas de proceso

Fuente de las reglas: sección `## Reglas de proceso` de `AGENTS.md` / `CLAUDE.md`.

## Apuesta (escrita antes de consultar el historial)

| # | Regla (resumen) | Apuesta | Razonamiento |
|---|---|---|---|
| 1 | Rama por unidad de trabajo; no crear otra si ya hay rama de trabajo; nunca commitear en `main` ni en `sN/*` | parcialmente | Creo que se cumple parcialmente: cuando se pide explícitamente una rama, posiblemente se genere, y también si se crea por fuera. |
| 2 | Commit por petición usando la skill `/commit` | sí | Creo que se cumple en cada commit, porque está en una skill y la herramienta la usa. |
| 3 | Un cambio en rutas/controladores/validadores/transformers se cierra en el mismo commit con el diff de `.adonisjs/` y el README de la capability | parcialmente | No hay hooks que lo fuercen y la condición es muy amplia, salvo que se pida explícitamente. |
| 4 | `gh pr create` y el pase de `adversarial-reviewer` una sola vez, al final de la unidad de trabajo | no | No hay hooks que lo fuercen. |
| 5 | Al abrir el PR, responder solo con la URL, sin repetir el resumen en el chat | no | La herramienta casi obliga al agente a devolver un resumen. |

## Tabla

Ventana: los últimos 15 commits (`b955a72`…`aee9a24`) y el árbol actual. La 5b es la regla 5 original. La 5a no es parte de la regla 5: se extrae del paréntesis de la regla 4 («con una descripción completa de los cambios en el cuerpo del PR»), porque es una exigencia distinta.

| # | Qué pide la regla | Qué se miró | Veredicto | Evidencia | Qué harías |
|---|---|---|---|---|---|
| 1 | Una rama por unidad de trabajo, y nunca commitear en `main` ni en `sN/*` | `git log -15 --first-parent`, `git log -15 --merges`, `git branch -a --contains <sha>` | no se puede comprobar con lo que hay | Historial lineal, sin merges, y los 15 commits están en `upstream/s4/end` y `s5/start`. Encaja con commits directos, pero un fast-forward deja la misma forma | bajarla |
| 2 | Un commit por petición, con la skill `/commit` | `.claude/skills/commit/SKILL.md` y trailers de `git log -15` | no se puede comprobar con lo que hay | Usar la skill no deja rastro, y "petición" no queda registrada en ningún sitio | borrarla |
| 3 | Si se tocan rutas, controladores, validadores o transformers: el diff de `.adonisjs/` y el README de la capability van en el mismo commit | `git log -15 --name-status` desde `160fbc7`, `git status backend/.adonisjs` | se cumple | `cbe9617` toca 3 controladores (solo decoradores OpenAPI, sin cambio de rutas, así que no hay diff de `.adonisjs/` que generar) y actualiza `docs/capabilities/tasks/README.md`; único caso en la ventana | dejarla |
| 4 | PR y pase del `adversarial-reviewer` una sola vez, al final de la unidad | `gh pr list` (upstream y origin), `git log --merges` | no se puede comprobar con lo que hay | `gh` sin autenticar, sin merges ni referencias a PRs; el reviewer no deja rastro | bajarla |
| 5a | El PR lleva en su cuerpo una descripción completa de los cambios | `gh pr view --json body` | no se puede comprobar con lo que hay | `gh` sin autenticar; no hay `.github/pull_request_template.md` | bajarla |
| 5b | Al abrir el PR, responder en el chat solo con la URL, sin repetir el resumen | Repo e historial (las sesiones no están en el repo) | no se puede comprobar con lo que hay | Solo vive en el chat; no queda nada en git | borrarla |

### Cómo se bajan las que se quedan

- **1:** hook `PreToolUse` sobre `git commit` / `git checkout -b` que bloquea commitear en `main` o `sN/*` y abrir otra rama estando ya en una de unidad. Si se quiere cubrir también el remoto, branch protection en el fork.
- **4:** hook `PreToolUse` sobre `gh pr create` que bloquea un segundo PR de la misma rama, y un job de CI en `pull_request` que lanza el `adversarial-reviewer` y deja el hallazgo comentado en el PR.
- **5a:** el mismo hook de `gh pr create` rechaza un cuerpo vacío o ausente.
- **Unidad de trabajo**, a definir en la regla, en los hooks y en el agente: una unidad es una rama `feat/<slug>`; empieza al crearla desde `main` o `sN/*` y termina al abrir su PR. El reviewer revisa la unidad entera (`git diff <base>...HEAD`).

## Parte B: las tres líneas

1. **La regla sobre la que me equivoqué: la 2.** Aposté *sí* porque estaba en una skill que usa la herramienta, y el veredicto es *no se puede comprobar*: usar la skill no deja ningún rastro en el commit, y lo que daba por cumplido era en realidad algo que suponía.
2. **La regla que no se puede comprobar: la 4.** Dejaría rastro si el `adversarial-reviewer` corriera en CI sobre cada PR de una rama de unidad y dejara su hallazgo comentado en él.
3. **La regla que borraría: la 2.** Es del grupo de las que la herramienta ya cubre: decirle que use la skill `/commit` para commitear repite lo que la propia skill declara, y no añade nada que se pueda comprobar.

_Hueco detectado en la regla 3:_ se dispara por tipo de fichero, no por lo que documenta el README. Un cambio de puerto deja obsoleto el README de la capability sin activarla, y un cambio de ruta obliga además a tocar la spec viva y `docs/architecture.md`, que la regla no menciona.
