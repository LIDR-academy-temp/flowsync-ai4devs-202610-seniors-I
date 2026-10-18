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
**Herramienta:** Claude Code

```
/init
```

**Qué salió:**  Creo el CLAUDE.md con informacion de dentro del reposiotrio.

## Prompt 2

**Modelo:** Opus 5.5 Medium
**Herramienta:** Claude Code

```
I need to create a new skill for this repo called priority-ticket. This skill should get from JIRA using the atlasian mcp the ticket assigned to me with more priority in "To do".
Then summary the acceptance criteria of the ticket and in plan mode create a plan,f user approve it should move the ticket to "In progress"

```

**Qué salió:**  Creo una skill llamada priority-ticket. Provada y funciona como espera

## Prompt 3

**Modelo:** Opus 5.5 Medium
**Herramienta:** Claude Code

```
Create skill called commit. This will be in charge of do the commits, the commit should be atomic and small. The message should follow conventions, type(scope): description, check the diff to know the changes.

```

**Qué salió:** Creo una skill llamada commit. Provada y funciona como espera

## Prompt 4

**Modelo:** Opus 5.5 Medium
**Herramienta:** Claude Code

```
Create an agent called adversarial-reviewer. This agent will receive a pull request and review the changes. Its goal is to break the generated code in order to identify bugs and vulnerabilities.
Check the code and run it locally if necessary.
Do not modify any code or approve the PR.
Create a summary of your findings and add a comment to the PR using the gh command.

```

**Qué salió:** Creo una agente adversarial-reviewer.



## Prompt 5

**Modelo:** Opus 5.5 Medium
**Herramienta:** Claude Code

```
Create a hook in the /frontend that uses prettifier to format the code
```

**Qué salió:** Creo el hook para claude, modifico el frontend para añadir el comando 'npm format'. Creo el archivo de configuracion del prettier. (El prettier fue instalado antes del prompt de forma manual)

## Prompt 6

**Modelo:** Opus 5.5 Medium
**Herramienta:** Claude Code

```
 Update the CLAUDE.md to establish some working rules.
  - Each new task has to be implemnted in a new branch
  - All commits have to be done with the /commit skill and pusshed to github using gh command
  - Create PR using "gh pr create". Each PR should have a descriotion with 3 sections. 1- What (short description about what changes) , 2 -Why (Ask to the user if you can't get it from
  a ticket or from a spec), 3- How to test. Can have an option  section about Desicions.
  - After a PR is created the agent @"adversarial-reviewer (agent)" will check the PR, only the PR URL will be showed to the user
```

**Qué salió:**  Modifico el CLAUDE.md para añadir estas reglas.

## Prompt 7

**Modelo:** Opus 5.5 Medium
**Herramienta:** Claude Code

```
 /priority-ticket 
```

**Qué salió:**  Ejecutado en el proyecto con harness, consiguio el tiquet y creo un plan.


## Prompt 8

**Modelo:** Opus 5.5 Medium
**Herramienta:** Claude Code

```
Connect to Jira and get the ticket in "to do" assigned to me  with more priority, summary the acceptance criteria and propouse a plan in plan mode.
```

**Qué salió:**  Ejecutado en el proyecto sin harness, consiguio el tiquet y creo un plan.



