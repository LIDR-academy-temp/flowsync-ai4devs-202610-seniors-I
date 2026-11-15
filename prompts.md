# Prompts

Registro semi-automático (hooks `UserPromptSubmit` y `Stop`): cada prompt lanzado, con su modelo, su herramienta y un resumen de la salida.
sesion_actual: Sin nombre
**Sesiones**:
  - nombre: Sin nombre
    prompts: 1-16
---

## Prompt 1

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Haremos una auditoría. No modifiques codigo. Lee el readme.md y ayúdame con la tarea. Tengo todo montado. Ya validé que puedas correr git. Leí Claude.md. Antes de proceder con la consulta del histórico, necesito evaluar la parte indicada de Agents y intuir cuales se cumplen o no. Pon la hora local en cada respuesta[HH:mm:ss] Muéstrame las reglas enumeradas y aguarda instrucciones. No emitas juiciso sólo muestrame las reglas tal cual están escritas
```

**Qué salió:** [20:32:20] Leí el `README.md` y el [AGENTS.md](AGENTS.md). Estas son las reglas de proceso, copiadas tal cual de la sección `## Reglas de proceso` ([AGENTS.md:129-134](AGENTS.md:129)). El `CLAUDE.md` tiene esa misma sección con el mismo texto. 1. La rama es por unidad de trabajo, no por petición. Antes de tocar código, mira en qué rama estás: si ya es una rama de trabajo —cualquiera que no sea `main` ni una `sN/*`—, sigue en ella en vez de crear otra. Solo desde `main` o desde una `sN/*` se crea una nueva (`git checkout -b feat/<slug>`). Nunca commitear directo en `main` ni en una `sN/*`. 2. El commit sí es por petición: al cerrar cada una, usar la skill `/commit`. 3. Un cambio que toque rutas, controladores, validadores o transformers de una capability se cierra en el mismo commit con …

---

## Prompt 2

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Apunta para la auditoria sobre el cumplimiento : 1) creo que se cumple parcialmente,  se solicita explicitamente una rama posiblemente se genere, adicionalmente si es por fuera. 2)  creo que se cumple en cada commit por estar en una skill y usarse por la herramienta 3) parcialmente, no hay hooks que lo fuercen y la condición es muy amplia salvo que se pida expliciatamente, 4) no se cumple, no hay hooks que lo fuercen 5) no se cumple, el retorno del agente es casi que obligatorio en la herramienta
```

**Qué salió:** [20:33:59] Guardé tu apuesta en [docs/auditoria/salv.md](docs/auditoria/salv.md), en una sección "Apuesta" que va antes de la tabla. Tiene una fila por regla y respeta tu razonamiento: | # | Apuesta | |---|---| | 1 | parcialmente | | 2 | sí | | 3 | parcialmente | | 4 | no | | 5 | no | Las secciones de la tabla y de la Parte B están vacías por ahora. No he leído el historial ni he tocado ningún otro archivo. Las iniciales `salv` las tomé del nombre de tu rama (`auditoria-salv`). No he puesto tus prompts en `prompts.md`, porque el README pide que se peguen tal cual los lanzaste y prefiero que lo hagas tú. Espero tus instrucciones.

---

## Prompt 3

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Contrastemos esas reglas contra los últimos 15 commits del repositorio y el estado actual del árbol. Muestrame la salida en el formato solicitado, no guardes nada aún, no toques codigo ni intentes arreglar nada
```

**Qué salió:** [20:34:35] Tabla de la auditoría

---

## Prompt 4

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Dime cuantos de los commits estudiados son los afectados por cada regla, cual es su costo de evaluación, y en consecuencias en caso de que se rompan.
```

**Qué salió:** [20:37:39] indica cuántos commits afecta cada regla

---

## Prompt 5

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
por ser de consecuencia alta y barata la 3 se queda y por lo visto se aplicó bien. evalua un plan para modificar el puerto 3333 a 4444. no hagas cambios
```

**Qué salió:** [20:38:21] Anota la decisión y me da un super plan pero me adiverte que no toca rutas

---

## Prompt 6

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
las rutas se tocarían si se cambia el puerto. ¿el plan no aplica la regla 3?
```

**Qué salió:** [20:39:30] Me explica que no se tocan y explica el concepto de ruta considerada distinto de url o path

---

## Prompt 7

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
bien, planea para cambiar la ruta tasks a "task"
```

**Qué salió:** [20:41:19] Plan para cambiar la ruta de la API de `/api/v1/tasks` a `/api/v1/task`. No he modificado nada. Esta vez sí se tocan rutas, así que la regla 3 se dispara. ## Primero, una decisión de alcance "La ruta tasks" puede ser dos cosas distintas: - **A. La ruta de la API:** `/api/v1/tasks/*`. Es el contrato con los clientes y lo que fija la spec. - **B. Las rutas del frontend:** `/tasks` y `/tasks/:id` en el navegador, que son independientes de la API. El plan cubre **A**. Si también quieres **B**, se añade como un paso aparte que no afecta al contrato. El **nombre de la capability** (`tasks`, que aparece en `docs/capabilities/tasks/`, `openspec/specs/tasks/` y `tests/functional/tasks/`) no es una ruta y se queda igual. ## Qué se ve afectado | Capa | Fichero | Cambio | |---|---|---| |…

---

## Prompt 8

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
bien queda validada la regla tres entonces. vamos con el resto. 1 y 4 tiene alta consecuencia se agregarian a los hooks, un control antes del commit para 1 y  otro para 4 que pase el adversarial
```

**Qué salió:** [20:46:20] Anoto la decisión: la regla 3 queda validada, y las reglas 1 y 4 bajan a controles que se ejecutan solos. Debajo, el diseño. No he modificado nada. ## Regla 1: control antes del commit | Capa | Qué haría | Cubre | No cubre | |---|---|---|---| | **Hook `PreToolUse` de Claude Code** (recomendado) | En `.claude/settings.json`, con matcher `Bash`. Lee `tool_input.command` y, si contiene `git commit`, comprueba `git branch --show-current`. Si es `main` o `s*/…`, sale con código 2 y el agente recibe el motivo por stderr. También puede bloquear `git checkout -b` / `git switch -c` cuando ya estás en una rama de trabajo (la parte de "no crear otra") | Los commits del agente, incluidos los de `/commit`. Queda versionado con el repo | Los commits humanos. Comandos con otra forma (`git -…

---

## Prompt 9

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
recuerdame la 2 y la 5. Agrega que debe especificarse unidad de trabajo en el hook y el agente
```

**Qué salió:** [20:48:12] ## Reglas 2 y 5, tal cual están escritas **2.** El commit sí es por petición: al cerrar cada una, usar la skill `/commit`. **5.** Cuando abras el PR, no repitas ese resumen en el chat: la sesión se va a perder, el PR no. Responde solo con la URL del PR. Lo que salió en la auditoría: | # | Commits afectados | Veredicto | Coste de evaluar | Consecuencia si se rompe | |---|---|---|---|---| | 2 | 11 (los del agente desde `0e56705`) | no se puede comprobar | Alto: la skill no deja rastro y "una petición" no queda registrada | Baja: se pierde formato del mensaje, o varias peticiones acaban en un mismo commit | | 5 | 0 (va por PR abierto) | no se puede comprobar | Alto: solo vive en el chat | Baja: ruido y tokens; el PR conserva su descripción | ## Añadido al plan de las reglas 1 y …

---

## Prompt 10

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
bien opino que descartaría la regla 2 ya que es como decirle a la herramienta usa el skill commit para hacer commit.  Tambien modificaría la 5 manteniendo parte de la regla en cuanto al formato
```

**Qué salió:** [20:52:04] Anoto las dos decisiones. **Regla 2: borrarla.** Encaja en el grupo de "se cumple sola porque la herramienta ya lo hace", que es una de las dos candidatas de la Parte B, línea 3. Un matiz antes de cerrarla: la regla dice dos cosas, *usar `/commit`* y *un commit por petición*. Al borrarla se pierde también lo segundo. Hoy la skill solo dice "Usar al cerrar una tarea", que no es lo mismo que "por petición". Si esa granularidad te importa, cabe en una línea de la descripción de la skill. Si no, se borra entera. **Regla 5: modificarla y quedarse con el formato.** Separo lo que es formato de lo que es justificación: | Parte actual | Qué es | |---|---| | "no repitas ese resumen en el chat" | Formato de la respuesta | | "la sesión se va a perder, el PR no" | Justificación | | "Respo…

---

## Prompt 11

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Si son dos reglas distintas. Por un lado la del formato del PR que debe conservarse y reforzarse con hook. La del formato de salida y justificación no es relevante por ser trivial y fuerza a mirar el PR por lo que la eliminaría. Abrela en una linea extra de las reglas
```

**Qué salió:** [20:56:26] Abro la regla 5 en dos filas: **5a** (formato del PR) y **5b** (formato de la respuesta en el chat). La exigencia de "descripción completa en el cuerpo del PR" hoy está escrita dentro de la regla 4, así que la 5a la saca de ahí y la convierte en regla propia. Tabla actualizada, todavía sin guardar: | # | Qué pide la regla | Qué se miró | Veredicto | Evidencia | Qué harías | |---|---|---|---|---|---| | 1 | Una rama por unidad de trabajo, y nunca commitear en `main` ni en `sN/*` | `git log -15 --first-parent`, `git log -15 --merges`, `git branch -a --contains <sha>` | no se puede comprobar con lo que hay | Historial lineal y sin merges, con los 15 commits en `upstream/s4/end` y `s5/start`. Encaja con commits directos, pero un fast-forward deja la misma forma | bajarla | | 2 | U…

---

## Prompt 12

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
bien escribe el documento y procedamos con el PR
```

**Qué salió:** Cancelo la ejeción porque me sugiere todo el comando de PR sin ejecutar el adversarial

---

## Prompt 13

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
escribe el documento
```

**Qué salió:** [21:02:18] lo escribe

---

## Prompt 14

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
ejuecuta el revisor adversarial. reevalua los resultados contra el readme.
```

**Qué salió:** [21:05:09] Lancé el `adversarial-reviewer` sobre [docs/auditoria/salv.md](docs/auditoria/salv.md). Como árbitro le di el enunciado del `README.md`: formato de la tabla, Parte B, criterios de "Cómo saber que la has hecho bien" y fidelidad a las reglas de `CLAUDE.md`. Todavía está corriendo. Cuando termine reevalúo sus hallazgos contra el README y te los muestro, sin modificar nada.

---

## Prompt 15

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
 (terminó el aversarial reviewer)
```

**Qué salió:** [21:10:11] El `adversarial-reviewer` terminó. Contrastó cada hallazgo con el README y con los datos de git que yo sí pude ver (el reviewer no puede ejecutar git). Lo más importante no es del documento sino de la entrega: en el árbol hay archivos modificados que no son tuyos. | Hallazgo | Qué dice | Mi evaluación | Qué haría | |---|---|---|---| | **Entrega (fuera de la tabla)** | Hay ficheros modificados y sin seguir (`.claude/settings.json`, `frontend/package-lock.json`, `.claude/hooks/`, `prompt_track.md`…) | **Aceptado, crítico.** El README pide "ni un archivo modificado aparte del tuyo" y un PR con "dos cosas y ni una más". Ya estaban antes de esta sesión | Añadir al commit solo `docs/auditoria/salv.md` y `prompts.md`, nunca `git add .` | | **M1** | La línea 17 dice que "la regla 5 s…

---

## Prompt 17

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
abrí el historial pero no pude comprobar lo que indica. Intentamos contrastar la regla 3 como opción. Acepto las propuestas aplícalas
```

**Qué salió:** [21:12:28] Aplicó los cuatro cambios. Indicó que faltaba hacer el prompts.md. Sigo manualmente con el PR con tiempo justo.
