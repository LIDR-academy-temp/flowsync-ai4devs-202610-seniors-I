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

**Modelo:** Opus 5.5 
**Herramienta:** Claude Code

```
Crear un skill llamado priority-ticket que va a trear el ticket de mayor prioridad asignado a Sylvia Hernandez en «To Do», va a resumir los criterios de aceptación, entra en plan mode y propone cómo implementarlo; al aprobar el plan, lo mueve a «In progress».

```

## Prompt 2

**Modelo:** Opus 5.5 
**Herramienta:** Claude Code

```
Crear una skill /commit para un commit convencional (tipo(scope): descripción) a partir de los cambios preparados.

```

## Prompt 3

**Modelo:** Opus 5.5 
**Herramienta:** Claude Code

```
 Crear un subagente llamado adversarial-reviewer, su trabaja va a ser revisar un pull request intentando romperlo, no aprobarlo, y sin editar nada.

```
## Prompt 4

**Modelo:** Opus 5.5 
**Herramienta:** Claude Code

```

Crear un hook que formatea el frontend cada vez que el agente edita un archivo. El frontend no trae formateador: instala Prettier en `frontend/` y dispáralo sobre `frontend/src/**`.

```
## Prompt 5

**Modelo:** Opus 5.5 
**Herramienta:** Claude Code

```
Actualizar Las reglas de proceso, al final del `CLAUDE.md`, se crea una rama nueva antes de tocar código; al cerrar,se debe utilizar `/commit` y el pull request debe realizarse con `gh pr create`; después, se debe utilizar el subagente revisor sobre el pull request; y en el chat, solo la URL del pull request. Además agrega el cambio del formateador y el uso del hook.

```

## Prompt 6

**Modelo:** Opus 5.5 
**Herramienta:** Claude Code

```
Agrega AGENTS.md como enlace a CLAUDE.md**, para que lo lean también otras herramientas.

```

## Prompt 7

**Modelo:** Opus 5.5 
**Herramienta:** Claude Code

```

Entra en plan mode y utiliza el skill priority ticket para planear la implementación de lo solicitado en el ticket cumpliendo los criterios de aceptación

```