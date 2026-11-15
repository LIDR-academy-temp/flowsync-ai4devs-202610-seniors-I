# Auditoría de las reglas de proceso de `CLAUDE.md`

Contrastadas contra los últimos 15 commits del repositorio y el estado actual del árbol.

## Mi apuesta (escrita antes de comprobar nada)

| #   | Regla (resumida)                                                                                                                                                                            | Apuesta                               |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| 1   | La rama es por unidad de trabajo, no por petición; nunca commitear directo en `main` ni en `sN/*`.                                                                                          | **Sí**                                |
| 2   | El commit es por petición: al cerrar cada una, usar la skill `/commit`.                                                                                                                     | **Ni idea** (lo más probable, que sí) |
| 3   | Un cambio que toque rutas/controladores/validadores/transformers de una capability se cierra en el mismo commit con el OpenAPI (diff de `.adonisjs/`) y el README de esa capability al día. | **Sí**                                |
| 4   | `gh pr create` + pase del `adversarial-reviewer` van una sola vez, al terminar la unidad de trabajo, no al cerrar cada petición.                                                            | **Ni idea**                           |
| 5   | Al abrir el PR, no repetir el resumen en el chat: responder solo con la URL del PR.                                                                                                         | **Ni idea**                           |

---

## La tabla

Ventana auditada: `4427afc..aee9a24` (los 15 commits de `git log -15`) + estado del árbol (`git status`: solo `prompts.md` modificado y `docs/auditoria/` sin trackear).

| Regla | Qué pide | Qué se miró | Veredicto | Evidencia | Qué haría |
|---|---|---|---|---|---|
| 1. Rama por unidad de trabajo; nunca commitear en `main` ni `sN/*` | No crear rama por petición; no commitear directo sobre `main` ni una `sN/*`. | `git branch -a --contains` sobre los 15 commits; `git branch -a \| grep feat/`; `git log --merges`. | **No se cumple** | Los 14 commits de trabajo (`4427afc..aee9a24`) viven solo en `s4/end`/`s5/start`: no hay ni una rama `feat/*` y cero merges. Se commiteó directo sobre `sN/*`, justo lo que la regla prohíbe. | Dejarla (es útil), pero bajarla a un guardarraíl que rechace commits directos sobre `main`/`sN/*`. |
| 2. Commit por petición con la skill `/commit` | Cerrar cada petición con un commit hecho vía `/commit`. | Mensajes y trailers de los 15 commits; búsqueda de rastro de la skill. | **No se puede comprobar con lo que hay** | Los commits siguen Conventional Commits y llevan `Co-Authored-By: Claude`, pero nada distingue un commit hecho con `/commit` de uno a mano. La skill no deja marca en el historial. | Dejarla, pero asumir que vive de la buena voluntad salvo que `/commit` estampe un trailer propio. |
| 3. Cambio en rutas/controladores/validadores/transformers de una capability → mismo commit con OpenAPI (`.adonisjs/`) y README de la capability | El código de la capability y su contrato (OpenAPI + README) viajan en el mismo commit. | `git show --stat 4e03d1f`; `git log -- backend/.adonisjs/`; `git log -- docs/capabilities/`; fechas. | **No se cumple** | `4e03d1f fix(tasks)` toca `task_transformer.ts` (un transformer de `tasks`) y no lleva ni `.adonisjs/` ni README. El README (`7662fb1`) y el OpenAPI (`cbe9617`) llegan en commits aparte, este último una semana después. | Dejarla, pero bajarla a un check que falle si cambia código de una capability sin tocar su contrato. |
| 4. `gh pr create` + `adversarial-reviewer` una sola vez, al terminar la unidad | Un único PR y un único pase del revisor por unidad de trabajo, no por petición. | `git log --merges`; `gh pr list`; búsqueda de refs a PR/reviewer en los mensajes. | **No se puede comprobar con lo que hay** | No hay merges ni refs a PR en estos commits; los PRs que lista `gh` son de otros alumnos del cohorte sobre el repo del curso, no de este historial. La unidad de trabajo aún no se ha cerrado con PR. | Dejarla; para comprobarla haría falta que el PR/review dejara rastro enlazado al commit (trailer o merge). |
| 5. Al abrir el PR, no repetir el resumen en el chat; responder solo con la URL | Comportamiento del agente en el chat al abrir el PR. | Naturaleza de la regla frente al material disponible (historial git). | **No se puede comprobar con lo que hay** | Es una regla sobre lo que se dice en el chat; el chat no se versiona y no deja ningún rastro en el repo. Imposible de auditar desde el historial. | Dejarla, asumiendo que vive de la buena voluntad: no hay artefacto que la pueda ejecutar ni verificar.

---

## Parte B: las tres líneas

1. **La regla sobre la que más me equivoqué: la 3.** Aposté *sí* con seguridad y sale *no se cumple*. Me confundí porque me fié del harness: di por hecho que, si la regla estaba escrita, el harness ataría el contrato al commit automáticamente. Pero quien hizo estos commits o no usó este harness, o usó otro, o el modelo simplemente ignoró la regla — y el resultado es que el `fix(tasks)` que tocó un transformer (`4e03d1f`) fue sin OpenAPI ni README, que llegaron después y por separado (`7662fb1` y `cbe9617`, este último una semana más tarde). Es además la más fácil de seguir y revisar, y aun así se rompió.

2. **La regla que no se puede comprobar con lo que hay: la 2** (`/commit` por petición). Para que dejara rastro, `/commit` tendría que estampar un trailer propio en el mensaje (p. ej. `Via: /commit`), de forma que un commit hecho con la skill se distinga de uno a mano; hoy el historial no permite separarlos. Pero la más destacable de las no comprobables es la **4** (el pase del `adversarial-reviewer`): hoy depende de que el agente se acuerde de invocarlo al cerrar la unidad, y no deja rastro. La bajaría a la review que ya corre el repositorio en cada PR, dejando los hallazgos como comentarios del PR; así deja de depender de la buena voluntad y se convierte en un guardarraíl que se ejecuta siempre.

3. **La regla que borraría: la 5** (no repetir el resumen en el chat, responder solo con la URL). Pertenece al grupo de las que **no dejan rastro y nadie puede verificar**: es una preferencia de estilo de respuesta en un canal efímero (el chat), sin modo de fallo observable en el repo. No es un guardarraíl, es una cortesía.
