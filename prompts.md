<!--
  Autoría: Sc4rc3 powered by AI
  Propósito: Registro literal y cronológico de todos los prompts lanzados durante el ejercicio del Módulo 1 (FlowSync Harness Engineering).
-->

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

---

## Prompt 1

**Modelo:** Gemini 3.1 Pro (Argon)
**Herramienta:** Google Antigravity 2.0

```
/init

Analiza este código fuente y genera un archivo CLAUDE.md en la raíz del proyecto que resuma los comandos de build/dev/test y la arquitectura de alto nivel del repositorio.
```

**Qué salió:** Al intentar usar `/init` vi que Antigravity 2.0 no trae ese slash command predefinido en el menú como Claude Code, así que lancé el encargo explícito. Funcionó a la primera: inspeccionó `backend/` (AdonisJS 7, rutas `/api/v1`, validadores VineJS en `app/validators/user.ts`, modelos y transformers) y `frontend/` (React 19 + Vite 8) y generó `CLAUDE.md` en la raíz.

---

## Prompt 2

**Modelo:** Gemini 3.1 Pro (Argon)
**Herramienta:** Google Antigravity 2.0

```
Configura el servidor MCP de Jira en .mcp.json para sc4rc3.atlassian.net (proyecto FLOW) usando mi correo felipepardo@gmail.com y este token: <JIRA_API_TOKEN_REDACTED>
```

**Qué salió:** Funcionó a la primera. Creó `.mcp.json` en la raíz del proyecto apuntando a `sc4rc3.atlassian.net` (proyecto `FLOW`), guardó el token real en `.env.local` (ignorado por `.gitignore`) y verificó la conexión listando los tickets del tablero (`FLOW-1` a `FLOW-4`).

---

## Prompt 3

**Modelo:** Gemini 3.1 Pro (Argon)
**Herramienta:** Google Antigravity 2.0

```
crea una skill /priority-ticket: trae el ticket de mayor prioridad asignado a ti en «Por hacer», resume sus criterios de aceptación, entra en plan mode y propone cómo implementarlo; al aprobar el plan, lo mueve a «En curso»
```

**Qué salió:** Funcionó a la primera. Generó `.claude/skills/priority-ticket/SKILL.md` (y su espejo `.agent/skills/priority-ticket/SKILL.md` para Antigravity) con el frontmatter y los 4 pasos del flujo (consulta en Jira, resumen de criterios, Plan Mode verificando contratos del backend y transición a «En curso» tras aprobación).

---

## Prompt 4

**Modelo:** Gemini 3.1 Pro (Argon)
**Herramienta:** Google Antigravity 2.0

```
Crea una skill /commit: un commit convencional (tipo(scope): descripción) a partir de los cambios preparados.
```

**Qué salió:** Funcionó a la primera. Creó `.claude/skills/commit/SKILL.md` (y `.agent/skills/commit/SKILL.md`) que revisa `git diff --staged` y genera el commit con formato `tipo(scope): descripción`.

---

## Prompt 5

**Modelo:** Gemini 3.1 Pro (Argon)
**Herramienta:** Google Antigravity 2.0

```
crea Un subagente adversarial-reviewer: revisa un pull request intentando romperlo, no aprobarlo, y sin editar nada.
```

**Qué salió:** Funcionó a la primera. Creó `.claude/agents/adversarial-reviewer.md` (y `.agent/agents/adversarial-reviewer.md`), además de registrarlo en el runtime de Antigravity con `enable_write_tools: false` para garantizar por permisos que no pueda editar ningún archivo.

---

## Prompt 6

**Modelo:** Gemini 3.1 Pro (Argon)
**Herramienta:** Google Antigravity 2.0

```
crea Un hook que formatea el frontend cada vez que el agente edita un archivo. El frontend no trae formateador: instala Prettier en frontend/ y dispáralo sobre frontend/src/**
```

**Qué salió:** Funcionó a la primera. Instaló `prettier` como dependencia de desarrollo en `frontend/package.json` y configuró el hook `PostToolUse` en `.claude/settings.json` (y `.agent/settings.json`) para disparar `npx --prefix frontend prettier --write "frontend/src/**/*.{ts,tsx,css,json}"` al editar archivos.

---

## Prompt 7

**Modelo:** Gemini 3.1 Pro (Argon)
**Herramienta:** Google Antigravity 2.0

```
Agrega Las reglas de proceso, al final del CLAUDE.md: rama nueva antes de tocar código; al cerrar, /commit y el pull request con gh pr create; después, el subagente revisor sobre el pull request; y en el chat, solo la URL del pull request.
```

**Qué salió:** Funcionó a la primera. Añadió la sección `## Process Rules (Mandatory Workflow)` al final de `CLAUDE.md` con las 4 reglas obligatorias.

---

## Prompt 8

**Modelo:** Gemini 3.1 Pro (Argon)
**Herramienta:** Google Antigravity 2.0

```
ajusta o crea el archivo AGENTS.md como enlace a CLAUDE.md, para que lo lean también otras herramientas: ln -s CLAUDE.md AGENTS.md
```

**Qué salió:** En Windows sin privilegios de Administrador, el symlink simbólico (`mklink AGENTS.md CLAUDE.md` / `ln -s`) devolvió `Carece de privilegios suficientes para realizar esta operación`, por lo que el agente lo resolvió creando un vínculo permanente NTFS (`cmd /c mklink /H AGENTS.md CLAUDE.md`), dejando ambos apuntando al mismo nodo en disco.

---

## Prompt 9

**Modelo:** Gemini 3.1 Pro (Argon)
**Herramienta:** Google Antigravity 2.0

```
/priority-ticket
```

**Qué salió:** Ejecutó la skill `/priority-ticket` sobre la copia con harness: consultó Jira (`sc4rc3.atlassian.net`, proyecto `FLOW`), recuperó el ticket `FLOW-1` (*«Implementar login en el frontend»*) asignado a Felipe Pardo en estado «Tareas por hacer», resumió sus 5 criterios de aceptación, contrastó contra `CLAUDE.md` y el validador real del backend (`backend/app/validators/user.ts`) —detectando que `signupValidator` exige `passwordConfirmation: password().sameAs('password')`, `password` de 8–32 caracteres y `fullName: vine.string().nullable()` que el ticket de producto omitía— y propuso en Plan Mode el plan de 8 archivos sin editar código, deteniéndose a esperar aprobación antes de mover el ticket a «En curso».

---

## Prompt 10

**Modelo:** Gemini 3.1 Pro (Argon)
**Herramienta:** Google Antigravity 2.0 (en `flowsync-sin-harness/`)

```
Trae el ticket de mayor prioridad asignado a mí en «Por hacer», resume sus criterios de aceptación y entra en plan mode para proponer cómo implementarlo.
```

**Qué salió:** Al no tener `.mcp.json` ni `CLAUDE.md`, reportó que no existía conexión a Jira ni gestor de tickets configurado en el directorio; para no quedarse bloqueado, buscó dentro del repositorio y encontró el enunciado del ticket dentro de `README.md` (sin conocer la clave `FLOW-1` ni su estado real en Jira). Luego exploró a mano `backend/` y `frontend/`, sí descubrió `passwordConfirmation` en `backend/app/validators/user.ts` y la envoltura `{ data }`, y propuso un plan mucho más extenso de 18 archivos (6 a modificar y 12 a crear, aunque en el título sumó mal y puso "15 archivos"), ignorando por completo las reglas de proceso (rama nueva, transición en Jira, hook de Prettier, `/commit` y `adversarial-reviewer`).


