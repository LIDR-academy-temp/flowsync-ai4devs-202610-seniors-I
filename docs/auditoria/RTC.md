# Auditoria Previa ( Manual ).
Me basado en el trabajo en previas sesiones para evaluar-lo.

| Regla | Se cumple no se cumple | 
|---|---|
| Antes de tocar código, mira en qué rama estás | Si |
| La rama es por unidad de trabajo, no por petición | Si |
|Si ya estás en una rama de trabajo (cualquiera que no sea main ni sN/*), sigue en ella y no crees otra | Si |
|Nunca commitear directo en main ni en una sN/* | No se |
|Un commit por petición: al cerrar cada petición, usa la skill /commit | Si |
|Un cambio que toque rutas, controladores, validadores o transformers de una capability va en el mismo commit que el documento OpenAPI al día, que se commitea como el diff regenerado de .adonisjs/ y el README de la capability al día, en docs/capabilities/<nombre>/README.md | No se |
|Crea el PR con gh pr create, con una descripción completa de los cambios en el cuerpo | Si |
|El PR se abre una sola vez, al terminar la unidad de trabajo, no al cerrar cada petición | Si |
|Después de crear el PR, pasa el subagente adversarial-reviewer una sola vez sobre ese PR | No lo se |
|El review adversarial es lo último antes de dar la unidad por terminada | No |
|Al abrir el PR, no repitas el resumen en el chat: responde solo con la URL del PR (la sesión se pierde, el PR no) | No |



# Auditoría de las «Reglas de proceso» — últimos 15 commits

Alcance: `git log -15` desde `auditoria-RTC` (HEAD `aee9a24` = `s5/start` = `upstream/s5/start`), de `b955a72` a `aee9a24`. Historia lineal sin ningún merge. Las reglas de rama y PR entraron en `0e56705` (2026-08-20) y la del contrato en el mismo commit en `160fbc7` (2026-08-20). Los commits anteriores a cada regla se señalan como tales.

| Regla | Comprobación | Veredicto | Evidencia | Qué hacer |
|---|---|---|---|---|
| Antes de tocar código, mira en qué rama estás. | `git reflog` (local, 42 entradas) y `git log -15 --format='%h %P %D'` | No se puede comprobar | Mirar la rama es algo que se hace durante la sesión y git no lo registra. Ninguno de los 15 commits se creó en este clon, así que el reflog no los incluye. Lo único que se ve es `checkout: moving from s5/start to auditoria-RTC`, y es posterior al rango auditado. | Bajarla: convertirla en un hook `PreToolUse` (Edit/Write) que imprima la rama actual y bloquee si es `main` o `sN/*`. |
| La rama es por unidad de trabajo, no por petición. | `git branch -a --contains <sha>` para cada commit y `git log --merges` | No se puede comprobar | Los 14 commits de `4427afc` a `aee9a24` cubren unidades muy distintas: tests de tasks, fix del transformer, diagrama C4, OpenAPI, ADRs, README de la capability, harness y enunciado de s5. Solo los contienen `s4/end`, `s5/start` y `auditoria-RTC`. No existe ninguna rama de trabajo ni ningún merge que muestre cómo se agruparon. | Dejarla: es el principio de las tres reglas siguientes. Conviene fusionarla con ellas en una sola. |
| Si ya estás en una rama de trabajo (cualquiera que no sea main ni sN/*), sigue en ella y no crees otra. | `git branch -a`, `git reflog` | No se puede comprobar | Para el rango no hay ramas de trabajo que contrastar. Fuera del rango, las ramas locales (`harness-RTC`, `alcance-RTC`, `alcance-RTC-envivo`, `spec-viva-RTC`, `trazabilidad-RTC`, `auditoria-RTC`) parecen una por ejercicio, pero no pertenecen a estos 15 commits. | Dejarla. Se puede fusionar con la anterior. |
| Nunca commitear directo en main ni en una sN/*. | `git log --merges` (0 merges en el rango); `gh api repos/LIDR-academy-temp/…/commits/<sha>/pulls` para `4427afc`, `0e56705`, `4e03d1f`, `ea5db1f`, `cbe9617`, `aee9a24` | No se cumple | Los 14 commits llegaron a `s4/end` y `s5/start` sin ningún merge y sin ningún PR asociado (la API devuelve una lista vacía para cada uno). O se commitearon directamente en la rama `sN`, o se empujaron a ella en fast-forward sin pasar por un PR. | Bajarla: protección de rama en GitHub para `main` y `sN/*`, más un hook `pre-commit` local que rechace esas ramas. |
| Un commit por petición: al cerrar cada petición, usa la skill /commit. | `.claude/skills/commit/SKILL.md` (sin cambios desde `8f871d3`, 2026-07-25) frente al formato de los mensajes con `git log -15 --format='%s%n%b'` | No se puede comprobar | Git no registra qué skill generó un commit. Hay indicios en contra: la skill pide solo `tipo(scope): descripción` y commitear directamente, pero 12 de los commits llevan cuerpos largos y el trailer `Co-Authored-By: Claude …`, que la skill no genera. `aee9a24` (`docs: …`) no tiene scope. Tampoco hay forma de saber qué petición corresponde a cada commit. | Dejarla y hacerla trazable: que la skill añada una marca en el mensaje (trailer `Skill: commit`) y que defina cuerpo y trailers. |
| Un cambio que toque rutas, controladores, validadores o transformers de una capability va en el mismo commit que el documento OpenAPI al día (diff regenerado de `.adonisjs/`) y el README de la capability al día (`docs/capabilities/<nombre>/README.md`). | `git log -15 --name-only` filtrando `start/routes.ts`, `app/controllers`, `app/validators`, `app/transformers`, `.adonisjs/`, `docs/capabilities/` | No se cumple | `4e03d1f` toca `app/transformers/task_transformer.ts` sin cambios en `.adonisjs/` ni en el README de tasks. Es anterior a la regla (`160fbc7`), y en ese momento el README no existía. `ea5db1f` toca `start/routes.ts` e incluye `.adonisjs/`, sin README, pero son rutas de infraestructura OpenAPI y no de una capability. Desde que existe la regla se cumple: `cbe9617` toca 3 controladores de tasks e incluye `docs/capabilities/tasks/README.md`. Sin embargo, ese mismo commit no tiene diff en `.adonisjs/` aunque cambia el documento OpenAPI, porque los decoradores no alteran el registro. Eso demuestra que la parte «el OpenAPI se commitea como diff de `.adonisjs/`» está mal planteada. | Dejarla, reescribiendo la parte del OpenAPI: que exija los decoradores de `@foadonis/openapi` al día y el diff de `.adonisjs/` solo cuando cambien rutas. Se podría bajar a una comprobación de CI. |
| Crea el PR con gh pr create, con una descripción completa de los cambios en el cuerpo. | `gh api repos/LIDR-academy-temp/…/commits/<sha>/pulls`; `gh pr list --state all` en upstream y en `ricardTorrents/…` | No se cumple | Ningún commit del rango tiene PR asociado en el upstream ni en el fork. Los PRs más antiguos del upstream (#1–#19) son `harness-*` de alumnos contra `s1/start`, sin relación con estos commits. | Dejarla. |
| El PR se abre una sola vez, al terminar la unidad de trabajo, no al cerrar cada petición. | `gh pr list --state all` (upstream y fork) cruzado con los commits | No se puede comprobar | Sin PR no hay nada con lo que contar cuántas veces ni cuándo se abrió. | Dejarla, fusionada con la anterior en una sola regla. |
| Después de crear el PR, pasa el subagente adversarial-reviewer una sola vez sobre ese PR. | Comentarios y reviews del PR (`gh pr view --comments`); `.claude/agents/adversarial-reviewer.md` | No se puede comprobar | No hay PR. Aunque lo hubiera, el subagente es de solo lectura (Read, Grep, Glob), corre en local y no deja rastro ni en git ni en GitHub. | Bajarla: que el resultado del revisor se publique como comentario del PR (`gh pr comment`) para que quede constancia. |
| El review adversarial es lo último antes de dar la unidad por terminada. | Orden temporal entre el último commit de la unidad y el comentario del review en el PR | No se puede comprobar | Sin PR y sin rastro del review no hay ningún orden que comparar. | Dejarla, fusionada con la anterior. Si el review queda como comentario del PR, se puede comprobar que no hay commits posteriores. |
| Al abrir el PR, no repitas el resumen en el chat: responde solo con la URL del PR (la sesión se pierde, el PR no). | Transcripciones de sesión: no están en el repo (`ls ~/.claude/projects/…` solo cubre las sesiones locales de este clon, y ninguna abrió estos commits) | No se puede comprobar | Es una regla sobre lo que se dice en el chat, que no se versiona. Además, en el rango no se abrió ningún PR. | Bajarla a la skill o al paso que ejecuta `gh pr create`, como instrucción de salida. |

## Resumen

- **No se cumple (4):** crear rama `feat/<slug>`, no commitear directo en `sN/*`, contrato de la capability en el mismo commit (solo `4e03d1f`, anterior a la regla) y `gh pr create`.
- **No se puede comprobar (8):** el resto, porque se hacen durante la sesión o porque dependen de un PR que no existe.
- **Se cumple:** ninguna sin matices. La regla del contrato sí se respeta desde que existe (`cbe9617`).

## Parte B: las tres líneas
### La regla sobre la que te equivocaste 
Compara tu apuesta con el veredicto y escribe la que más se separó, en un sentido o en el otro. Si acertaste todas, escríbelo tal cual y añade en una frase en qué te apoyabas para acertar: si la respuesta es "me sonaba", eso también es el dato.
* Todas las reglas en las que puse que si se cumplian no havia una fuente clara y no se podian comprovar, como me base en la experiencia de las ultimas sessiones yo tenia el recuerdo pero para el agente esto no podia ser verificable.
* Lo mismo con las dos que he puesto que no, al ser un recuerdo basado en mi experiencia no son verificables. 

### La regla que no se puede comprobar con lo que hay 
 y en una frase qué tendría que cambiar para que dejara rastro. Puede ser reescribirla, puede ser que algo la ejecute, puede ser que no haya arreglo posible y toque asumir que vive de la buena voluntad.

* Antes de tocar código, mira en qué rama estás --> Que lo ejecute algo: un hook `PreToolUse` (Edit/Write) que imprima la rama y bloquee si es `main` o `sN/*`.
* La rama es por unidad de trabajo, no por petición --> Reescribirla fusionada con las de rama y exigir que cada unidad entre por un PR propio, así la rama queda visible en el merge.
* Si ya estás en una rama de trabajo, sigue en ella y no crees otra --> Reescribirla junto a la anterior: con un PR por unidad se comprueba que todos sus commits salen de una sola rama.
* Un commit por petición con la skill `/commit` --> Que la skill deje rastro añadiendo un trailer `Skill: commit` y el id de la petición en el mensaje.
* El PR se abre una sola vez, al terminar la unidad --> Fusionarla con la de `gh pr create`; con PRs reales se comprueba con `gh pr list` que hay uno por rama.
* Pasar el `adversarial-reviewer` una sola vez sobre el PR --> Que el resultado del revisor se publique con `gh pr comment` para que quede en GitHub.
* El review adversarial es lo último antes de terminar --> Depende de la anterior: con el review como comentario se comprueba que no hay commits posteriores a su fecha.
* Al abrir el PR, responde solo con la URL en el chat --> No tiene arreglo: el chat no se versiona, así que hay que asumir que vive de la buena voluntad (como mucho, ponerlo como instrucción de salida en la skill que abre el PR).


### La regla que borrarías, y por qué.
Hay dos candidatas típicas: la que se cumple sola porque la herramienta ya lo impide, y la que no se cumple nunca y a nadie le ha importado. Elige una y di a cuál de los dos grupos pertenece.
 Al exraer las reglas del archivo hay algunas que si bien no se borrarian como tal se unirian unas con las otras, en la tabla salen especificadas. 
 
 Se cumpla sola
 * Antes de tocar código, mira en qué rama estás" --> se cumple sola con el resto de reglas 
 * El review adversarial es lo último antes de dar la unidad por terminada --> se cumpple sola con la regla anterior 

 A nadie le ha importado:
 * "Al abrir el PR, no repitas el resumen en el chat" --> no se puede comprovar y realmente a nadie le importa si te pone el texto si quieres lo lees. 

