# Prompts

Aquí van **todos los prompts que lanzaste** para hacer el ejercicio, en el orden en que los
lanzaste, con el modelo y la herramienta de cada uno.

Esto no es papeleo. Lo que se revisa es **cómo pediste las cosas**, no solo lo que salió: un
resultado flojo con un prompt bueno y un resultado flojo con un prompt vago necesitan feedback
distinto, y sin este archivo no se distinguen.

## Cómo rellenarlo

- Un apartado `## Prompt N` por cada prompt.
- **Pega el prompt tal cual lo lanzaste**, dentro del bloque de código, aunque ocupe diez líneas
  y aunque tenga faltas. No lo reescribas para que quede bien: el que arreglaste mentalmente
  después no es el que lanzaste.
- Incluye también los que **no funcionaron**. Suelen ser los más útiles de leer.
- `Modelo` y `Herramienta` en todos. Si cambiaste de una a otra a mitad, se nota aquí.

Borra el ejemplo de abajo cuando escribas el primero.

---

## Prompt 1

_Pieza 1 — CLAUDE.md con /init_

**Modelo:** Opus 5.5 High
**Herramienta:** Claude Code

```
/init
```

**Qué salió:** 

## Prompt 2

_Pieza 2 — MCP de Atlassian a nivel de proyecto_

**Modelo:** Opus 5.5 High
**Herramienta:** Claude Code

```
Contexto: Necesito que conectes este proyecto por medio del MCP de jira a nivel de proyecto en un archivo .mcp.json
Instrucción: Lee el tablero FLOW y encuentra el ticket FLOW-1, recuerda queno debes exponer contraseñas, tokens ni hacer commit
```

**Qué salió:** 

## Prompt 3

_Pieza 2 — Corrección del .mcp.json (intervención)_

**Modelo:** Opus 5.5 High
**Herramienta:** Claude Code

```
Comprueba con el comando claude mcp list que el servidor atlassian del proyecto carga sin avisos. Si hay avisos, corrige .mcp.json hasta que desaparezcan.
```

**Qué salió:** 

## Prompt 4

_Pieza 3 — Skill /priority-ticket_

**Modelo:** Opus 5.5 High
**Herramienta:** Claude Code

```
Contexto: Crea una skill con nombre "priority-ticket", que se pueda usar escribiendo en la terminal "/priority-ticket", esta skill es solo para este proyecto.
Instrucciones: La skill debe hacer los siguiente:
- traer de Jira el ticket de mayor prioridad, asignado a mi y en «Por hacer»;
- resumir sus criterios de aceptación;
- entrar en plan mode y proponer cómo implementarlo;
- al aprobar el plan, mover el ticket a «En curso».
Restricciones: Debe usar el servidor atlassian del proyecto y que no haga commit.
```

**Qué salió:** 

## Prompt 5

_Pieza 4 — Skill /commit_

**Modelo:** Opus 5.5 High
**Herramienta:** Claude Code

```
Contexto: Crea una skill con nombre "commit", que se pueda usar escribiendo en la terminal "/commit", esta skill es solo para este proyecto.
Instrucciones: La skill debe hacer los siguiente:
- Tiene que crear un commit convencional, tipo(scope): descripción, a partir de los cambios preparados (staged).
Restricciones: no hagas commit ni la pruebes al crearla.
```

**Qué salió:** 

## Prompt 6

_Pieza 5 — Subagente adversarial-reviewer_

**Modelo:** Opus 5.5 High
**Herramienta:** Claude Code

```
Contexto: Crea un subagente con nombre "adversarial-reviewer", solo para este
proyecto (en .claude/agents/ del repo).
Instrucciones: El subagente debe:
- Revisar un pull request intentando romperlo, no aprobarlo: buscar bugs,
  casos límite y requisitos del ticket que no se cumplan.
- Entregar una lista de hallazgos, ordenados del más grave al menos grave.
Restricciones:
- El subagente no puede editar archivos ni hacer commits; solo leer.
- No hagas commit ni lo pruebes al crearlo.
```

**Qué salió:** 

## Prompt 7

_Pieza 6 — Hook de Prettier en el frontend_

**Modelo:** Opus 5.5 High
**Herramienta:** Claude Code

```
Contexto: Necesito un hook de Claude Code solo para este proyecto que formatee
el frontend cada vez que edites un archivo.
Instrucciones:
- Instala Prettier como dependencia de desarrollo en frontend/ (el frontend no
  tiene formateador).
- Crea un hook en .claude/settings.json (no en settings.local.json) que, después
  de cada edición o escritura de un archivo, ejecute Prettier solo si el archivo
  está dentro de frontend/src/.
Restricciones:
- No formatees ahora los archivos que ya existen en frontend/src/.
- No hagas commit ni pruebes el hook editando archivos del código.
```

**Qué salió:** 

## Prompt 8

_Pieza 7 — Reglas de proceso en CLAUDE.md_

**Modelo:** Opus 5.5 High
**Herramienta:** Claude Code

```
Contexto: Añade una sección de reglas de proceso al final del CLAUDE.md de este
proyecto, sin modificar lo que ya contiene.
Instrucciones: Las reglas son, en este orden:
1. Antes de tocar código, crea una rama nueva.
2. Al terminar, haz el commit con la skill /commit y abre el pull request con
   gh pr create.
3. Después, revisa el pull request con el subagente adversarial-reviewer.
4. En el chat, responde solo con la URL del pull request.
Restricciones: No hagas commit.
```

**Qué salió:** 

## Prompt 9

_Pieza 7 — Corrección de dos contradicciones (intervención)_

**Modelo:** Opus 5.5 High
**Herramienta:** Claude Code

```
Contexto: Hay dos contradicciones en el harness de este proyecto que hay que
verificar y corregir.
Instrucciones:
1. El upstream real de este repo es LIDR-academy-temp/flowsync-ai4devs-202610-seniors-I
   (compruébalo con git remote -v). En la sección Process Rules del CLAUDE.md,
   indica que los pull requests van contra ese repositorio. No modifiques el
   contenido anterior a Process Rules.
2. La skill /priority-ticket prohíbe hacer commits y pull requests en cualquier
   momento, lo que choca con las Process Rules del CLAUDE.md. Ajusta la skill
   para que no haga commits mientras propone el plan, y que tras aprobarse
   siga las Process Rules del CLAUDE.md.
Restricciones: No hagas commit. Muéstrame los cambios al terminar.
```

**Qué salió:** 

> **Nota (pieza 8, comandos manuales, no son prompts):** creé `AGENTS.md` como enlace con `!ln -s CLAUDE.md AGENTS.md` y lo comprobé con `!ls -la CLAUDE.md AGENTS.md`.

## Prompt 10

_Pieza 4/7 — Quitar disable-model-invocation de /commit (intervención)_

**Modelo:** Opus 5.5 High
**Herramienta:** Claude Code

```
Contexto: Las Process Rules del CLAUDE.md piden que el agente haga el commit con
la skill /commit, pero esa skill tiene disable-model-invocation: true y el agente
no puede invocarla.
Instrucciones: Quita disable-model-invocation de la skill /commit para que el
agente pueda usarla. No cambies la skill /priority-ticket.
Restricciones: No hagas commit. Muéstrame el cambio al terminar.
```

**Qué salió:** 

## Prompt 11

_A3 — Encargo en la copia CON harness_

**Modelo:** Opus 5.5 High
**Herramienta:** Claude Code

```
/priority-ticket
```

**Qué salió:** 

## Prompt 12

_A3 — Encargo en la copia SIN harness (misma instrucción que la skill, escrita a mano)_

**Modelo:** Opus 5.5 High
**Herramienta:** Claude Code

```
Trae de Jira el ticket de mayor prioridad asignado a mí en «Por hacer», resume
sus criterios de aceptación y entra en plan mode para proponer cómo
implementarlo.
```

**Qué salió:** 

> **Comandos que no son prompts:** `/model` (antes del prompt 1) y `/mcp` (aprobación y login OAuth del servidor `atlassian`, tras el prompt 3).
