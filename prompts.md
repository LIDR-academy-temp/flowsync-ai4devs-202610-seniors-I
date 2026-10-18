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

**Modelo:** Opus 5.5 medium
**Herramienta:** Claude App

```
Let's create a skill together using your skill-creator skill. First ask me what the skill should do.

skill name: priority-ticket

trae el ticket de mayor prioridad asignado a ti en «Por hacer», resume sus criterios de aceptación, entra en plan mode y propone cómo implementarlo; al aprobar el plan, lo mueve a «En curso».
```

**Qué salió:** 
```
El borrador ya está listo en SKILL.md. Resumen de cómo quedó:

Búsqueda: solo en FLOW, tus tickets en la categoría «To Do», ordenados por Rank. Si no hay ninguno, te avisa, menciona lo que tienes en curso y se detiene.
Criterios: primero busca un campo personalizado, luego una sección en la descripción y por último checklists. Si no encuentra nada, los infiere y los marca como inferidos.
Plan: entra en plan mode, explora el repo y conecta cada criterio con el paso o la prueba que lo cubre.
Al aprobar: elige la transición según el estado de destino (In Progress), no según su nombre, y no hace nada más.

Casos de prueba que propongo:

«dame mi ticket más prioritario de FLOW y planeemos cómo hacerlo». Debería elegir el de mayor Rank, con criterios escritos en la descripción.
«¿qué me toca ahora en Jira?». Un ticket sin criterios, para comprobar que los infiere y los etiqueta.
«/priority-ticket» sin tickets en «Por hacer». Se puede probar ahora mismo, porque tu cola está vacía.

Como elegiste probar contra Jira real, hay dos cosas que necesito que me confirmes:

¿Creo 2 tickets de prueba en FLOW asignados a ti? Uno llevaría criterios de aceptación en la descripción y el otro no. Les pondría el prefijo «[PRUEBA skill]» para que sea fácil cerrarlos o borrarlos después. Al aprobar cada plan, esos tickets pasarían de verdad a In Progress.
El repo: mi espacio de trabajo aquí no tiene ningún repositorio, así que el paso de plan mode quedaría bastante genérico. Si me dices qué repo de GitHub corresponde a FLOW, lo conecto para que el plan explore código real. Si no, probamos sin repo y nos fijamos sobre todo en la parte de Jira.
```

## Prompt 2

**Modelo:** Opus 5.5 medium
**Herramienta:** Claude App

```
Let's create a skill together using your skill-creator skill. First ask me what the skill should do.

skill name: commit 

content:
un commit convencional (tipo(scope): descripción) a partir de los cambios preparados.
```

**Qué salió:** 
```
The commit skill is ready in commit.skill; use Save skill on its card to install it. I didn’t run any test cases, as you asked.

Here’s how it behaves, based on your answers:

What it reads: only the staged changes (git diff --cached).
Nothing staged: it stops, says so and shows git status. It doesn’t stage anything for you.
Message format: in Spanish, using the standard types (feat, fix, docs, refactor, chore, and so on).
The scope comes from the changed paths. If the changes span several areas with nothing in common, it leaves the scope out.
Subject lines are in present tense, lowercase and 72 characters or less, e.g. fix(auth): corrige la expiración del token.
A body explaining the why is added only for non-trivial changes.
Breaking changes get ! and a BREAKING CHANGE: footer.
Committing: it shows the message and the files it will include, then runs git commit only after you say yes. It never skips failing hooks with --no-verify.
Jira: no ticket keys are added.

It triggers on things like “commitea esto”, “haz el commit”, “qué mensaje le pongo” or /commit. To change a detail, like allowing scopes with hyphens or setting a different line length, just tell me and I’ll update it.
```

## Prompt 3

**Modelo:** Opus 5.5 medium
**Herramienta:** Claude App

help me to create this sub agent in my project
```
adversarial-reviewer: revisa un pull request intentando romperlo, no aprobarlo, y sin editar nada.
```

**Qué salió:** 
```
Here’s the subagent, ready for you to save. Put adversarial-reviewer.md at .claude/agents/adversarial-reviewer.md in your project’s root, creating the folder if it doesn’t exist:

bash
mkdir -p .claude/agents && mv ~/Downloads/adversarial-reviewer.md .claude/agents/

If Claude Code is already running, restart it so it picks up the new subagent. Then invoke it directly, for example “usa el adversarial-reviewer en el PR #42”, or let Claude choose it automatically when you ask for a tough review.

How I designed it:

Tools: it only gets Read, Grep, Glob and Bash, with no Edit or Write, so it can’t change files through the normal editing tools.
Bash is still a risk: it needs Bash to run git diff, gh pr diff and tests, but Bash could technically modify files. The prompt strictly forbids any write or state-changing command such as commit, checkout, push or approving the PR.
Stricter option: if you want a hard guarantee, remove Bash from the tools line. The trade-off is that the subagent can then only review a diff you paste in or files already in the repo.
Approach: it attacks each change from fixed angles: edge-case inputs, concurrency, error handling, security, compatibility, performance and test quality.
Report: it opens with a verdict (No mergear / Mergear con cambios / No encontré cómo romperlo), then lists findings by severity. Each finding gives archivo:línea and the concrete input that breaks it, and is marked confirmed or suspected.
```

## Prompt 4

**Modelo:** Opus 5.5 medium
**Herramienta:** Claude App

I need to create a hook:
```
Un hook que formatea el frontend cada vez que el agente edita un archivo. El frontend no trae formateador: instala Prettier en frontend/ y dispáralo sobre frontend/src/**.
```

**Qué salió:** 
```
I’ll set this up as a Claude Code PostToolUse hook: after every Edit/Write, a script checks whether the edited file is under frontend/src/ and runs Prettier on it.

The hook is ready and tested.

I ran it against a sample project with Prettier 3.9 installed. A messy file in frontend/src/ came out formatted. A file outside frontend/src/ was left untouched. A file with a syntax error made the hook exit with code 2, which sends Prettier’s error back to Claude so it fixes the file.
```

## Prompt 5

**Modelo:** Opus 5.5 medium
**Herramienta:** Claude App

I need to add this rules on CLAUDE.md
```
Las reglas de proceso, al final del CLAUDE.md: rama nueva antes de tocar código; al cerrar, /commit y el pull request con gh pr create; después, el subagente revisor sobre el pull request; y en el chat, solo la URL del pull request.
```
translate to english

**Qué salió:** 
I added the rules in English as a new Process rules section at the end of CLAUDE.md:
```
## Process rules

- **Create a new branch before touching any code.** Never work directly on `main`.
- **When the work is done, commit with `/commit`**, then open the pull request with `gh pr create`.
- **After the pull request is open, run the `adversarial-reviewer` subagent on it.**
- **In the chat, reply with only the pull request URL.**
```

## Prompt 6

**Modelo:** Opus 5.5 medium
**Herramienta:** Claude Code

```
 /priority-ticket
```

**Qué salió:**   Called Atlassian MCP 2 times

No tienes tickets asignados en «Por hacer» en el proyecto FLOW, así que me detengo aquí.

Sigues con FLOW-3 — Implementar login en el frontend (Epic, prioridad Medium), que está en In Progress

## Prompt 7

**Modelo:** Opus 5.5 medium
**Herramienta:** Claude Code

```
sigamos con FLOW-3
```

**Qué salió:** 
```
Here is Claude's plan:
╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌
 Plan — FLOW-3: Implementar login en el frontend

 Contexto

 FLOW-3 (Epic, In Progress, sin subtareas ni bloqueos) pide registro, login y una vista protegida de perfil en frontend/. Todo va contra el backend AdonisJS que ya existe y no se modifica, y los componentes son de shadcn/ui. Hoy frontend/ es la plantilla pelada de Vite: no tiene router, ni Tailwind, ni shadcn, ni Prettier en package.json. Algunos de esos paquetes están en node_modules, pero vienen de otra rama y no están declarados. ...
 ```
