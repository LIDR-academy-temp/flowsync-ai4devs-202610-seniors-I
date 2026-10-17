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

**Modelo:** Opus 5.5 Medium effort
**Herramienta:** Claude Code

```
/init
```

**Qué salió:** I created CLAUDE.md at the repo root. I haven't committed it....

## Prompt 2

**Modelo:** Opus 5.5 Medium effort
**Herramienta:** Claude Code

```
I want you to save each my input to prompts.md file, check the ## Prompt 1 - is already filled with /init command. Do the same for Prompt 2 etc. Save each input - commands or prompts. Only in this session. Do not fill the "Qué salió:" field. Start with this one
```

**Qué salió:**: I saved this message word for word under ## Prompt 2 in prompts.md. Prompt 1 already has /init. For the rest of this session I'll put each new input (prompts and slash commands) word for word in the next empty ## Prompt N, and I won't touch the "Qué salió:" field. The template only goes up to Prompt 21, so I'll add blocks in the same format if we go past that.

## Prompt 3

**Modelo:** Opus 5.5 Medium effort
**Herramienta:** Claude Code

```
Connect the mcp of new Atlassian jira: https://aturchenko.atlassian.net
```

**Qué salió:** I've added the server to the project, but it isn't connected yet. You need to sign it in to your aturchenko account....

## Prompt 4

**Modelo:** Opus 5.5 Medium effort
**Herramienta:** Claude Code

```
/mcp
```

**Qué salió:** Authentication successful. Connected to atlassian-aturchenko

## Prompt 5

**Modelo:** Opus 5.5 Medium effort
**Herramienta:** Claude Code

```
Create a new skill named `/priority-ticket`. It should take the most priority ticket from the TO DO column of the FLOW project (https://aturchenko.atlassian.net/jira/software/projects/FLOW/boards/1?filter=&groupBy=none) that assigned to me. Read the ticket, read the codebase related with the ticket, enter to the plan mode and write the plan how to implement the ticket. The plan should show a clear  solution using best practices and project code style and project documentation styles. When the plan is approved by user the skill should move the ticket to the In Progress column
```

**Qué salió:**

## Prompt 6

**Modelo:** Opus 5.5 Medium effort
**Herramienta:** Claude Code

```
Create a new `/commit` skill it should commit not committed files using commit convencional rules (`tipo(scope): descripción`). If it was changed a lot of files it should split the changes by feature, project or other logic if it makes sense
```

**Qué salió:**

## Prompt 7

**Modelo:** Opus 5.5 Medium effort
**Herramienta:** Claude Code

```
Create a `adversarial-reviewer` subagent. It should review the PR trying to find any ways to brake the app. Any corner cases. The goal is not to approve what works, the goal is to find how it can fails.
```

**Qué salió:**

## Prompt 8

**Modelo:** Opus 5.5 Medium effort
**Herramienta:** Claude Code

```
Create a hook that will run prettier when an agent will change some code.
Before check the front-end project, it has not prettier installed - do it. To check that it works edit some file in front-end and try to run the new hook for frontend/src/**
```

**Qué salió:**

## Prompt 9

**Modelo:** Opus 5.5 Medium effort
**Herramienta:** Claude Code

```
Add rules to the CLAUDE.md:
1. Before editing any file, create a branch (e.g. feat/FLOW-3-login). Never work directly on the current branch.
2. When done, commit using your /commit skill and open the pull request with gh.
3. Then run adversarial-reviewer on that PR.
4. The final message is just the PR link.
```

**Qué salió:** .... - What happens to the review findings: the rules say to run the reviewer but not what to do with what it finds. Combined with rule 4, the agent will likely show you only the PR link and drop the findings. If you want them fixed first, or posted as a PR comment, that needs a line in the rules.....

## Prompt 10

**Modelo:** Opus 5.5 Medium effort
**Herramienta:** Claude Code

```
What happens to the review findings: the rules say to run the reviewer but not what to do with what it finds. Combined with rule 4, the agent will likely show you only the PR link and drop the findings. If you want them fixed first, or posted as a PR comment, that needs a line in the rules:  Post the findings as a PR comment
```

**Qué salió:**

## Prompt 11

**Modelo:** Opus 5.5 Medium effort
**Herramienta:** Claude Code

```
Create `AGENTS.md` it should has link to the `CLAUDE.md`, so this way other agents could read it
```

**Qué salió:**

## Prompt 12

**Modelo:** Opus 5.5 Medium effort
**Herramienta:** Claude Code

```
/priority-ticket https://aturchenko.atlassian.net/browse/FLOW-5
```

**Qué salió:**

## Prompt 13

**Modelo:** Opus 5.5 Medium effort
**Herramienta:** Claude Code

```
Plan accepted, save it to the Plans folder, do not execute it immediately.
```

**Qué salió:** I saved the plan to plan/FLOW-5-login.md on a new branch, feat/FLOW-5-login, and moved the ticket to En curso. I haven't implemented anything or committed anything.

## Prompt 14

**Copia:** sin harness (`flowsync-sin-harness`, sesión aparte)
**Modelo:** Opus 5.5 Medium effort
**Herramienta:** Claude Code

```
Get the project context then open the ticket https://aturchenko.atlassian.net/browse/FLOW-5 and in the plan mode prepare the plan for its implementation. Plan should use the project code/documentation style.
```

**Qué salió:** plan en plan mode
