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

**Modelo:** Opus 5.5 Medium 
**Herramienta:** Claude Code en VSCode
**Repo:** flowsync-ai4devs-202610-seniors-I

```
/init

```

**Qué salió:**
Claude me generó el archivo CLAUDE.md

## Prompt 2

**Modelo:** Opus 5.5 Medium 
**Herramienta:** Claude Code en VSCode
**Repo:** flowsync-ai4devs-202610-seniors-I

```
/priority-ticket

```

**Qué salió:**
Primer intento fallido: la skill no existía, Claude improvisó y el plan salió en inglés.

## Prompt 3

**Modelo:** Opus 5.5 Medium 
**Herramienta:** Claude Code en VSCode
**Repo:** flowsync-ai4devs-202610-seniors-I

```
Crea una skill para este proyecto llamada priority-ticket en .claude/skills/priority-ticket/SKILL.md (crear la carpeta dentro de este repo, solo este repo puede ver esta skill).

Al invocar /priority-ticket debe:
1. Acceder a Jira (proyecto FlowSync, a través del MCP de Atlassian) el ticket de mayor prioridad asignado a mí en estado «Por hacer».
2. Mostrar el ticket, el título y un resumen de sus criterios de aceptación.
3. Entrar en plan mode y proponer cómo implementarlo, leyendo el código real del proyecto antes de proponer.
4. Solo cuando yo apruebe el plan, mover el ticket a «En curso».

Restricciones:
- Si no hay ningún ticket que cumpla el filtro, informarlo y finalizar.
- No escribir código ni mover el ticket antes de que se apruebe el plan.

Cuando termines, enséñame el contenido del SKILL.md y no hagas nada más.
```

**Qué salió:**
Claude me generó el archivo skill.md con el skill de /priority-ticket


## Prompt 4

**Modelo:** Opus 5.5 Medium 
**Herramienta:** Claude Code en VSCode
**Repo:** flowsync-ai4devs-202610-seniors-I

```
/priority-ticket

```

**Qué salió:**
Segundo intento fallido. Cuando lo ejecutó por primera vez me sale el siguiente mensaje: "/priority-ticket no está registrado en esta sesión porque la skill se creó con la sesión ya abierta. Sigo los pasos del SKILL.md a mano."


## Prompt 5

**Modelo:** Opus 5.5 Medium 
**Herramienta:** Claude Code en VSCode
**Repo:** flowsync-ai4devs-202610-seniors-I

```
/priority-ticket

```

**Qué salió:**
Tercer intento, este sí tuve éxito. Abrí una nueva sesión de Claude, y al ejecutar este prompt, Claude cargó la skill, entró en plan mode y generó el plan en español. No lo aprobé.


## Prompt 6

**Modelo:** Opus 5.5 Medium 
**Herramienta:** Claude Code en VSCode
**Repo:** flowsync-sin-harness

```
Busca en Jira (proyecto FlowSync) el ticket de mayor prioridad asignado a mí en estado «Por hacer», muestrame el ticket, 
el título y un resumen de sus criterios de aceptación, entra en plan mode y arma el plan de implementación leyendo el código 
del proyecto. Solo cuando apruebe el plan, mueve el ticket a «En curso».
```
**Qué salió:**
A priori, salió todo ok, generó el plan a la primera sin preguntarme nada.