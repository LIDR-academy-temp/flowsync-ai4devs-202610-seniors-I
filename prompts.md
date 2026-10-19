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

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
/init
```

**Qué salió:** ⏺ Write(CLAUDE.md)
  ⎿  Wrote 42 lines to CLAUDE.md
       1 # CLAUDE.md
       2
       3 This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.
       5 ## Overview
       6
       7 FlowSync is a training project (LIDR AI4Devs master, module 1: "harness" exercise). The root `README.md` is the generated exercise statement (in Spanish) and `prompts.md` is the template for logging
          prompts; neither is application code. Two independent npm projects, no root `package.json`:
       9 - `backend/`: AdonisJS 7 API (TypeScript, Lucid ORM, SQLite via better-sqlite3, VineJS validation, access-token auth). **Already complete; do not modify it unless a task explicitly says so.**
      10 - `frontend/`: React 19 + Vite 8 + TypeScript, still the bare Vite template (`src/App.tsx`). This is where feature work happens. The ticket plans to use shadcn/ui components (copied into the repo, n
         ot a dependency).
     … +40 lines

⏺ I created CLAUDE.md at the repo root. I haven't committed it, and I didn't run any of the commands in it, so none of them are tested.

  It covers:
  - Layout: backend/ (AdonisJS 7 API) is finished and shouldn't be touched. frontend/ is the bare Vite and React template where the feature work happens. The root README.md is the exercise statement, not
    application code. Node 24+ is required.
  - Commands: setup, dev, test (including how to run a single file), lint and typecheck for both projects. It notes that the frontend has no test runner or formatter, and that the backend has no spec files yet.
  - Backend architecture:
    - The route → controller → validator → model → transformer layering, and the #alias imports.
    - Generated files not to edit: .adonisjs/ and database/schema.ts.
    - The four /api/v1 endpoints and the Bearer-token auth.
    - Dev CORS allows all origins.
  - Signup gap: the signup validator also requires passwordConfirmation and fullName, which the ticket doesn't mention. I included it because it's the kind of gap the exercise is about.
  - Process: the fork and upstream remote layout, the harness-<initials> branch, the two deliverable files, and a rule not to edit the harness-free sibling copy.

  The README says the /init output should be used as-is, so I left out the later harness steps (the Jira skills, the reviewer subagent, the hook and the process rules). You'll add those yourself in order.

  I didn't find any Cursor, Copilot, Codex or Gemini config, so there was nothing to import.


## Prompt 2

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
me ayudas a crear la siguiente skill: /priority-ticket trae el ticket de mayor prioridad asignado a ti en «Por hacer», resume sus criterios de aceptación, entra en plan mode y propone cómo implementarlo; al
  aprobar el plan, lo mueve a «En curso»
```

**Qué salió:** ⏺ Write(.claude/skills/priority-ticket/SKILL.md)
  ⎿  Wrote 51 lines to .claude/skills/priority-ticket/SKILL.md
      1 ---
      2 name: priority-ticket
      3 description: Trae de Jira el ticket de mayor prioridad asignado al usuario en "Por hacer", resume sus criterios de aceptación, entra en plan mode para proponer la implementación y, al aprobar el plan
        , mueve el ticket a "En curso". Úsala cuando el usuario escriba /priority-ticket o pida "el siguiente ticket".
      4 disable-model-invocation: true
      6
      7 # priority-ticket
      8
      9 Usa las herramientas del servidor MCP de Atlassian (Jira) configurado en este proyecto. Si no hay ninguna disponible, para y dile al usuario que falta conectar el MCP de Atlassian; no inventes el tic
        ket.
     … +44 lines
  ⎿  Allowed by auto mode classifier

⏺ Creé la skill en .claude/skills/priority-ticket/SKILL.md. No la he probado: todavía no existe .mcp.json en el proyecto, así que no hay conexión con Jira contra la que ejecutarla.

  Lo que hace, en orden:
  1. Busca el ticket. Lanza esta JQL: assignee = currentUser() AND status = "Por hacer" ORDER BY priority DESC, created ASC. Si no devuelve nada, repite con statusCategory = "To Do". Si sigue sin haber ticket,
     avisa y termina sin entrar en plan mode.
  2. Resume. Muestra clave, título y prioridad, los criterios de aceptación tal cual están en el ticket, y lo que el ticket no especifica y habría que comprobar en el código.
  3. Plan mode. Entra, lee CLAUDE.md y los archivos del backend que toca el ticket, y propone el plan con los archivos contados y qué criterio cubre cada cambio. También indica las convenciones que respeta y cómo
     se verificará.
  4. Al aprobar. Mueve el ticket a «En curso». Antes consulta las transiciones disponibles. Si no existe esa transición, te lista las que hay en lugar de elegir otra. Si rechazas el plan, no mueve nada.

  Algunas decisiones mías:
  - Nombres de herramientas. La skill no fija el prefijo del MCP (mcp__atlassian__...). Así funciona con el servidor que registres a nivel de proyecto.
  - Solo manual. Puse disable-model-invocation: true, de modo que solo se lanza cuando escribes /priority-ticket.
  - Nombres de estado. «Por hacer» y «En curso» están en el texto. Si tu tablero usa otros nombres, hay que cambiarlos en el archivo.


## Prompt 3

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
me ayudas a crear la siguiente skill: /commit: un commit convencional (tipo(scope): descripción) a partir de los cambios preparados.
```

**Qué salió:** ⏺ Write(.claude/skills/commit/SKILL.md)
  ⎿  Wrote 36 lines to .claude/skills/commit/SKILL.md
       1 ---
       2 name: commit
       3 description: Crea un commit convencional (tipo(scope): descripción) a partir de los cambios ya preparados (staged). Úsala cuando el usuario escriba /commit.
       4 disable-model-invocation: true
       5 allowed-tools: Bash(git status:*), Bash(git diff:*), Bash(git log:*), Bash(git commit:*)
       6 ---
       7
       8 # commit
       9
      10 Crea **un** commit a partir de lo que ya está en el área de preparación (staged). Invocar esta skill es la petición explícita de commitear; no hagas push ni nada más.
     … +26 lines
  ⎿  Allowed by auto mode classifier

⏺ Creé la skill en .claude/skills/commit/SKILL.md. No la he probado todavía.

  Qué hace al lanzar /commit:
  - Contexto. Carga git status --short, git diff --staged y los últimos 8 commits, para ver el estilo del repo.
  - Sin cambios preparados. Si no hay nada en staged, avisa y para. No ejecuta git add por su cuenta.
  - Mensaje. Sigue el formato tipo(scope): descripción. Los tipos son los de Conventional Commits y el scope sale del área tocada. Escribe la descripción en el idioma de los commits recientes. Añade cuerpo solo si
    el porqué no se ve en el diff, y usa ! y BREAKING CHANGE: para cambios incompatibles.
  - Un solo commit. Si el diff mezcla varios cambios, avisa de que convendría separarlos, pero commitea igualmente lo que hay en staged.
  - Cierre. Termina el commit con el pie Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>. Responde solo con el hash corto y la primera línea del mensaje.

  Decisiones mías:
  - Seguridad. Es de invocación solo manual (disable-model-invocation: true) y no hace push. Esto encaja con tu regla global de no commitear sin que lo pidas.
  - Permisos. allowed-tools se limita a git status, diff, log y commit, así que no necesita pedir permisos extra.
  - Hooks. Si falla un hook de pre-commit, arregla la causa y crea un commit nuevo. Nunca usa --no-verify ni --amend.


## Prompt 4

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
me ayudas a crear el siguiente subagente adversarial-reviewer: revisa un pull request intentando romperlo, no aprobarlo, y sin editar nada.
```

**Qué salió:** ⏺ Write(.claude/agents/adversarial-reviewer.md)
  ⎿  Wrote 38 lines to .claude/agents/adversarial-reviewer.md
      1 ---
      2 name: adversarial-reviewer
      3 description: Revisa un pull request intentando romperlo, no aprobarlo. Solo lectura, no edita nada. Úsalo tras abrir un PR, pasándole su número o URL.
      4 tools: Read, Grep, Glob, Bash
      5 ---
      6
      7 Eres un revisor adversarial. Tu trabajo es encontrar cómo se rompe este pull request, no confirmar que está bien. Asume que hay defectos y búscalos; no apruebes por defecto y no rellenes con elogios.
      8
      9 ## Restricciones (innegociables)
     … +31 lines
  ⎿  Allowed by auto mode classifier

⏺ Creé el subagente en .claude/agents/adversarial-reviewer.md. No lo he probado porque todavía no hay ningún PR abierto.

  Cómo garantiza que no edita:
  - Herramientas. tools: Read, Grep, Glob, Bash. Sin Edit ni Write, la restricción la impone la herramienta y no depende solo del prompt.
  - Bash acotado. Es la parte más floja, porque Bash por sí solo podría escribir. El prompt lo limita a lecturas (gh pr view/diff/checks, git log/diff/show) y a lint, build y tests. Le prohíbe commit, push,
    checkout, gh pr merge/review/comment y la instalación de dependencias. Si quieres una barrera dura, se puede añadir un hook que bloquee esos comandos para este agente.

  Cómo revisa:
  - Postura. Parte de la base de que hay defectos y tiene que buscarlos, sin aprobar por defecto.
  - Lectura. Lee el PR con gh, lee los archivos cambiados enteros y contrasta el cambio con el contrato real del backend.
  - Ataques. Prueba contratos rotos, como el passwordConfirmation que el ticket no menciona. También errores 422 o de red, token ausente o caducado, dónde se guarda el token, rutas protegidas, cambios fuera de
    alcance y convenciones de CLAUDE.md. Y comprueba cada criterio de aceptación del ticket.
  - Evidencia. Cada hallazgo debe tener archivo:línea, un escenario reproducible y la marca verificado o no verificado. Ejecuta lint y build y cita el resultado literal.
  - Informe. Devuelve un veredicto (BLOQUEA, CAMBIOS NECESARIOS o SIN HALLAZGOS RELEVANTES), los hallazgos por gravedad, los criterios de aceptación y lo que no pudo revisar. No publica nada en GitHub: el informe
    vuelve a quien lo invocó.


## Prompt 5

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
me ayudas a crear un hook que formatea el frontend cada vez que el agente edita un archivo. El frontend no trae formateador: instala Prettier en frontend/ y dispáralo sobre frontend/src/**
```

**Qué salió:** ⏺ El hook está montado y probado a mano contra el script. Lo que no he probado es que el agente lo dispare al editar un archivo: eso solo se ve en una sesión nueva.

  Qué creé:
  - Prettier. Lo instalé en frontend/ como devDependency con versión exacta (npm install --save-dev --save-exact prettier).
  - frontend/.prettierrc.json. Con semi: false, singleQuote: true y printWidth: 100, para casar con el estilo que ya tiene el código del frontend.
  - .claude/hooks/format-frontend.sh. Lee la ruta del archivo editado por stdin con jq. Si cuelga de frontend/src/ y es .ts, .tsx o .css, ejecuta prettier --write sobre él. Siempre sale con 0, así que un fallo de
    formato nunca bloquea al agente.
  - .claude/settings.json. Registra el hook como PostToolUse con matcher Edit|Write.

  Qué comprobé:
  - Un .ts mal formateado dentro de frontend/src/ quedó formateado.
  - Un archivo de backend/ quedó intacto.
  - Los archivos de prueba los borré.

  Cosas a tener en cuenta:
  - Archivos existentes. src/App.tsx, src/App.css y src/index.css no pasan Prettier todavía. No los formateé en bloque para no tocar archivos no relacionados. El hook los reformateará la primera vez que el agente
    los edite, así que el primer diff sobre App.tsx puede traer ruido.
  - Cambios sin commitear. El git status muestra frontend/package.json, frontend/package-lock.json y frontend/.prettierrc.json como cambios, además de .claude/ y CLAUDE.md. También aparece prompts.md como
    modificado, y yo no lo he tocado; probablemente lo editaste tú.
  - Aviso de npm. npm install avisó de que fsevents tiene un script de instalación sin aprobar Jump to bottom (click) ↓ nal de macOS y Prettier funciona igual.


## Prompt 6

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
me ayudas a crear un hook que formatea el frontend cada vez que el agente edita un archivo. El frontend no trae formateador: instala Prettier en frontend/ y dispáralo sobre frontend/src/**
```

**Qué salió:** 
