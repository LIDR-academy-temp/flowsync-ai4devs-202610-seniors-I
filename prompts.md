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

**Modelo:** Opus 5.5
**Herramienta:** Claude Code (extensión de VS Code)

```
/init
```

**Qué salió:** tuve que pararlo: el directorio de trabajo había quedado en la copia `flowsync-sin-harness`.

## Prompt 2

**Modelo:** Opus 5.5
**Herramienta:** Claude Code (extensión de VS Code)

```
Procede. Solo se trabajará en la carpeta de flowsync original y no la copiada "sin harness".
```

**Qué salió:** generó `CLAUDE.md` en el clon original, comprobando el contrato de la API contra el backend levantado.

## Prompt 3

**Modelo:** Opus 5.5
**Herramienta:** Claude Code (extensión de VS Code)

```
A partir de ahora, guarda cada prompt (incluido este y el comando init inicial) en un archivo prompts.md
```

**Qué salió:** funcionó a la primera.

## Prompt 4

**Modelo:** Opus 5.5
**Herramienta:** Claude Code (extensión de VS Code)

```
Instala el MCP de JIRA, y conecta con mi tablero FlowSync (Code FLOW)
```

**Qué salió:** añadió el MCP de Atlassian en `.mcp.json`, pero la aprobación y el login OAuth los tuve que hacer yo con `/mcp`.

## Prompt 5

**Modelo:** Opus 5.5
**Herramienta:** Claude Code (extensión de VS Code)

```
Reinicia la sesión para ver el mcp de Atlassian
```

**Qué salió:** no puede reiniciar su propia sesión; me dio los pasos para hacerlo yo.

## Prompt 6

**Modelo:** Opus 5.5
**Herramienta:** Claude Code (extensión de VS Code)

```
Sigue sin aparecer el servidor de Atlassian con el comando /mcp
```

**Qué salió:** encontró la causa: la sesión arrancaba en `~` y no en el repo, así que no leía `.mcp.json`.

## Prompt 7

**Modelo:** Opus 5.5
**Herramienta:** Claude Code (extensión de VS Code)

```
/priority-ticket
```

**Qué salió:** no funcionó: la skill no estaba instalada en esta sesión.

## Prompt 8

**Modelo:** Opus 5.5
**Herramienta:** Claude Code (extensión de VS Code)

```
Existe en el repo la skill de priority-ticket para instalar aquí en local?
```

**Qué salió:** la encontró en las ramas de `upstream` (`s1/end`, `s2/*`, `s3/start`), junto con la skill `commit` y el agente `adversarial-reviewer`.

## Prompt 9

**Modelo:** Opus 5.5
**Herramienta:** Claude Code (extensión de VS Code)

```
Instala las skills.
```

**Qué salió:** copió `priority-ticket` y `commit` a `.claude/skills/`.

## Prompt 10

**Modelo:** Opus 5.5
**Herramienta:** Claude Code (extensión de VS Code)

```
Y los agentes
```

**Qué salió:** copió `adversarial-reviewer` a `.claude/agents/`. Avisó de que `/commit` commiteaba sin pedir aprobación y de que el agente leía un `AGENTS.md` que no existía.

## Prompt 11

**Modelo:** Opus 5.5
**Herramienta:** Claude Code (extensión de VS Code)

```
Instala Un hook que formatea el frontend cada vez que el agente edita un archivo.
```

**Qué salió:** instaló Prettier en `frontend/` y añadió el hook `PostToolUse` en `.claude/settings.json`. Lo probó con un archivo del frontend y otro del backend.

## Prompt 12

**Modelo:** Opus 5.5
**Herramienta:** Claude Code (extensión de VS Code)

```
Actualiza el Claude.md como sugieres, con lo del formateador y la aprobación de la revisión previo al commit. El agente de revisión seguirá leyendo Agents.md, lo crearé a continuación
```

**Qué salió:** actualizó la parte del formateador y añadió la sección «Commits» con la aprobación previa.

## Prompt 13

**Modelo:** Opus 5.5
**Herramienta:** Claude Code (extensión de VS Code)

```
Sí cámbialo
```

**Qué salió:** cambió la skill `/commit` para que espere aprobación antes de commitear.

## Prompt 14

**Modelo:** Opus 5.5
**Herramienta:** Claude Code (extensión de VS Code)

```
Las reglas de proceso, al final del CLAUDE.md: rama nueva antes de tocar código; al cerrar, /commit y el pull request con gh pr create; después, el subagente revisor sobre el pull request; y en el chat, solo la URL del pull request.
```

**Qué salió:** añadió la sección «Reglas de proceso». Añadió por su cuenta que la aprobación del commit cubre también el push y el PR.

## Prompt 15

**Modelo:** Opus 5.5
**Herramienta:** Claude Code (extensión de VS Code)

```
Descarga el AGENTS.md del repo
```

**Qué salió:** en `upstream` es un enlace simbólico a `CLAUDE.md`, así que creó el mismo enlace.

## Prompt 16 (copia sin harness)

**Modelo:** Opus 5.5
**Herramienta:** Claude Code (extensión de VS Code), en `flowsync-sin-harness`

```
Implementar login en el frontend

Descripción

Implementar la autenticación en el frontend, consumiendo el backend de auth ya existente (POST /api/v1/auth/signup, POST /api/v1/auth/login). Usar shadcn/ui para los componentes.

Criterios de aceptación

Pantalla de registro (email+password) que llama a POST /api/v1/auth/signup.

Pantalla de login (email+password) que llama a POST /api/v1/auth/login y guarda el token recibido.

Tras login exitoso: redirige a una vista protegida (p. ej. perfil) que consuma GET /api/v1/account/profile.

Credenciales inválidas en login, o email ya registrado en signup, muestran un mensaje claro — no un error genérico ni de consola.

Enlace de navegación entre login y registro.
```

**Qué salió:** pegué el ticket sin la instrucción de la skill, así que el encargo no fue el mismo que en la copia con harness. No entró en plan mode: implementó directamente. Añadió al registro «Repite la contraseña» y «Nombre (opcional)», y lo probó con 12 casos en Chrome headless. No commiteó.

## Prompt 17

**Modelo:** Opus 5.5
**Herramienta:** Claude Code (extensión de VS Code)

```
/priority-ticket
```

**Qué salió:** trajo FLOW-1 de Jira y resumió sus criterios. Detectó que el backend exige `passwordConfirmation` y `fullName`, y entró en plan mode.

## Prompt 18 (respuesta a una pregunta del agente)

**Modelo:** Opus 5.5
**Herramienta:** Claude Code (extensión de VS Code)

```
Solo email + contraseña
```

**Qué salió:** era la opción a la pregunta de qué campos lleva el registro. El plan quedó con solo email y contraseña; el cliente completa `fullName: null` y `passwordConfirmation`. Aprobé el plan desde el diálogo de plan mode y el agente movió FLOW-1 a «En curso».

## Prompt 19 (respuesta a una pregunta del agente)

**Modelo:** Opus 5.5
**Herramienta:** Claude Code (extensión de VS Code)

```
Commitéalo tú
```

**Qué salió:** era la opción a la pregunta de qué hacer con el harness sin commitear. Preparó el commit y me enseñó el diff y el mensaje antes de hacerlo.

## Prompt 20

**Modelo:** Opus 5.5
**Herramienta:** Claude Code (extensión de VS Code)

```
Apruebo
```

**Qué salió:** commiteó el harness y creó la rama `feat/FLOW-1-login-frontend`. Implementó el plan y lo probó con 15 casos en Chrome headless.

## Prompt 21 (repetido 5 veces)

**Modelo:** Opus 5.5
**Herramienta:** Claude Code (extensión de VS Code)

```
Your response above was cut off mid-stream. Resume directly from where it stops — no apology, no recap. If none of it survived, answer the request from the start.
```

**Qué salió:** la respuesta se cortó 5 veces durante las pruebas en Chrome headless, y cada vez retomó desde donde iba. Las pruebas fallaban por carreras del script, no de la app.

## Prompt 22

**Modelo:** Opus 5.5
**Herramienta:** Claude Code (extensión de VS Code)

```
Crea una columna de estado en Slack de nombre "En Revisión" y pásalo ahí. Apruebo, procede
```

**Qué salió:** hizo commit y push, y abrió el PR #1 en mi fork. El `adversarial-reviewer` revisó el PR y el agente comentó en FLOW-1 con el enlace. No pudo crear la columna: entendió que era Jira y no Slack, pero las herramientas de Jira no permiten crear estados.

## Prompt 23

**Modelo:** Opus 5.5
**Herramienta:** Claude Code (extensión de VS Code)

```
/commit
```

**Qué salió:** no había nada preparado para el commit; preguntó qué hacer.

## Prompt 24

**Modelo:** Opus 5.5
**Herramienta:** Claude Code (extensión de VS Code)

```
Con base en el apartado del README del repo, de cómo se entrega, crea el archivo de comparacion.md con 3 diferencias entre el resultado de lo pedido entre los dos proyectos con y sin harness. Empuja la rama, al upstream para abrir el PR como se indica allí.
```

**Qué salió:** creó `docs/harness/comparacion.md` a partir de esta sesión y de la de la copia sin harness. Detectó que `prompts.md` estaba incompleto y que el repo del curso es `LIDR-academy-temp`, y esperó mi aprobación antes del commit.

## Prompt 25

**Modelo:** Opus 5.5
**Herramienta:** Claude Code (extensión de VS Code)

```
Apruebo, procede con todo
```

**Qué salió:** completó este archivo desde el Prompt 7, hizo el commit de entrega y abrió el PR contra el repo del curso.
