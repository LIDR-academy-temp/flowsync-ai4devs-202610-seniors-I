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

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code (pieza 1 del harness, en la copia con harness)

```
/init
```

**Qué salió:** generó `CLAUDE.md` en la raíz del repo; se usa tal cual, sin retocar.

## Prompt 2

**Modelo:** n/a (comando de shell, no es un prompt al modelo)
**Herramienta:** Claude Code CLI (pieza 2: MCP de Atlassian a nivel de proyecto)

```
claude mcp add --transport http --scope project atlassian https://mcp.atlassian.com/v1/mcp/authv2
```

**Qué salió:** se registró en `.mcp.json`; tras autenticar con `/mcp` quedó conectado.

## Prompt 3

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code (con el MCP de Atlassian conectado; crear el ticket del ejercicio en Jira)

```
Crea en el proyecto FLOW de mi Jira un elemento de trabajo de tipo Tarea, asignado a mí, en estado To Do y con prioridad Highest.

Título: Implementar login en el frontend

Descripción:
Implementar la autenticación en el frontend, consumiendo el backend de auth ya existente (`POST /api/v1/auth/signup`, `POST /api/v1/auth/login`). Usar shadcn/ui para los componentes.

Criterios de aceptación:
- Pantalla de registro (email+password) que llama a `POST /api/v1/auth/signup`.
- Pantalla de login (email+password) que llama a `POST /api/v1/auth/login` y guarda el token recibido.
- Tras login exitoso: redirige a una vista protegida (p. ej. perfil) que consuma `GET /api/v1/account/profile`.
- Credenciales inválidas en login, o email ya registrado en signup, muestran un mensaje claro — no un error genérico ni de consola.
- Enlace de navegación entre login y registro.
```

**Qué salió:** creó FLOW-4 en To Do, asignado a mí, prioridad Highest, con el texto íntegro.

## Prompt 4

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code (pieza 3: skill `/priority-ticket`)

```
ahi lo tienes en la imagen
```

Contexto: respondía a la pregunta de cómo se llaman las columnas del tablero de Jira, adjuntando una captura (To Do / In Progress / In Review / Done, proyecto FLOW). El contenido de la skill lo redactó Claude Code a partir del README, no un prompt mío.

**Qué salió:** creó `.claude/skills/priority-ticket/SKILL.md`.

## Prompt 5

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code (pieza 4: skill `/commit`)

```
sí, créala ya
```

Contexto: confirmaba crear la skill tras decidir que no lleve `Co-Authored-By` ni atribución de IA. El contenido lo redactó Claude Code a partir del README.

**Qué salió:** creó `.claude/skills/commit/SKILL.md`.

## Prompt 6

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code (pieza 5: subagente `adversarial-reviewer`)

```
usa opus para el subagente
```

Contexto: respondía a qué modelo debía usar el subagente. El contenido lo redactó Claude Code a partir del README.

**Qué salió:** creó `.claude/agents/adversarial-reviewer.md` con `model: opus`.

## Prompt 7

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code (pieza 6: hook de formato, instalación de Prettier)

```
sí, instala Prettier en frontend.
```

**Qué salió:** instaló Prettier 3.9.10 en `frontend/` y creó `.claude/settings.json` con un hook `PostToolUse` (`Edit|Write`) que formatea solo `frontend/src/**`. Probado a mano con un archivo temporal: formateó bien.

## Prompt 8

**Modelo:** Opus (plan mode)
**Herramienta:** Claude Code, copia **con** harness (`flowsync-ai4devs-202610-seniors-I`)

```
/priority-ticket
```

**Qué salió:** encontró FLOW-4 por Jira (MCP de Atlassian), entró en plan mode y propuso un plan (sin aplicarlo). Detectó huecos entre el ticket y el backend leyendo `backend/app/validators/user.ts`: signup exige `passwordConfirmation`, `fullName` es nullable (no optional), contraseña de 8-32 caracteres, respuestas envueltas en `{ data }`, y errores distintos (422 validación, 400 credenciales inválidas, 401 sin token). Propuso guardar el token en `localStorage`, añadir un botón de logout (fuera de los criterios), instalar Tailwind v4 + shadcn + react-router + Vitest, actualizar `CLAUDE.md` y registrar el prompt en `prompts.md`. Terminó con una pregunta sobre si incluir tests. El plan no se aplicó.

## Prompt 9

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code, copia **sin** harness (`flowsync-sin-harness`)

```
 trae el ticket de mayor prioridad asignado a mí, resume sus criterios y entra en plan mode para implementarlo.
```

**Qué salió:** no llegó a ningún plan. Buscó los tickets en GitHub (`gh issue list` devolvió vacío) y concluyó que viven en Jira por el README. Se bloqueó: la copia no tiene el MCP de Atlassian conectado y el único disponible (`atlassian-rovo`, de un plugin) estaba sin autenticar. Preguntó si lanzar la autenticación OAuth de ese conector o si le pegaba el texto del ticket. Según el ejercicio, no se rescató a esta copia.
