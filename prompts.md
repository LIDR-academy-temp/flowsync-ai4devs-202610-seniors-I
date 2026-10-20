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

**Modelo:** Opus 1M xHigh
**Herramienta:** Claude Code

```
Configure an MCP to connect to Jira so it allows to read tickets/tasks or other from it and work based on those from claude cli and use the description of jira tickets as prompts
```

**Qué salió:** funciono pero pidio reiniciar claude para autenticar con jira

## Prompt 2

**Modelo:** Opus 1M xHigh
**Herramienta:** Claude Code

```
yes
```

**Qué salió:** claude esta leyende el readme antonce me ofrecio seguir con priority skill y lo creo de inmediato

## Prompt 3

**Modelo:** Opus 1M xHigh
**Herramienta:** Claude Code

```
Create the commit skill taking into account the jira ticket type for the commit message like "<jiraTicketType-JiraTicketId>(scope): summary of changes description
```

**Qué salió:** creo el skill con una buena base simple

## Prompt 4

**Modelo:** Opus 1M xHigh
**Herramienta:** Claude Code

```
Create the adversarial-reviewer skill that will try to break the code changes by:
 - Forcing all edge cases
 - Trying values out of valid group
 - Testing all branches (if/else/switch, etc) in all functions

This will only check for logic issues, it will not edit any code nor approve anything
```

**Qué salió:** creo un subagante en lugar de un skill, ya que era mas apropiado, tambien agrego mas detalle de los que pedi que era lo que esperaba, sin embargo mi instruccion de solo revisar logica lo bloqueo de aspectos como UI o AC del ticket

## Prompt 5

**Modelo:** Opus 1M xHigh
**Herramienta:** Claude Code

```
Create a hook to format the files as soon as an agent edits the file, use prettier to format and install it in frontend/, and trigger it in frontend/src 
```

**Qué salió:** funciono, pero asumio que queria las reglas del codigo existente

## Prompt 6

**Modelo:** Opus 1M xHigh
**Herramienta:** Claude Code

```
Update CLAUDE.md at the end of the file with these process rules:
1.Create a new branch before starting to code, use JIRA ticket for the branch name like <jiraTicketType-JiraTicketId>
2. When code is finished call the commit skill
3. Create a pull request by running 'gh pr create'
4. Call adversarial-reviewer
5. Print in console the pull request URL that has been generated
```

**Qué salió:** funciono pero ahora tengo que cambiar disable-model-invocation por mi cuenta ya que bloquea el paso 2

## Prompt 7

**Modelo:** Opus 1M xHigh
**Herramienta:** Claude Code

```
Create an AGENTS.md file linked to CLAUDE.md so it works 
```

**Qué salió:** funciono pero tuve que cambiar disable-model-invocation por mi cuenta ya que bloqueaba el paso 2