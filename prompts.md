# Prompts

Todos los prompts lanzados para el ejercicio del Módulo 1, en orden, con modelo y herramienta.

Los prompts fueron redactados con ayuda de Claude (esta misma herramienta) y revisados por mí antes de lanzarlos; los lanzados tal cual aquí.

Las piezas 1 (`/init`), 2 (`claude mcp add … -s project` + `/mcp`) y 8 (`ln -s CLAUDE.md AGENTS.md`) son comandos, no prompts, y se anotan como tales.

---

## Prompt 1 — Comando pieza 1 — CLAUDE.md

**Objetivo:** Que exista un archivo de instrucciones en la raíz que el agente lea siempre, generado por él a partir del repo. Quedó bien si describe backend (AdonisJS 7) y frontend (React 19 + Vite) con sus comandos de arranque.

**Modelo:** Fable 5.1 (claude-fable-5-1)  
**Herramienta:** Claude Code 2.1.302 (comando, no prompt)

```
/init
```

**Qué salió:** Funcionó a la primera (14:08). CLAUDE.md de 72 líneas. Leyó el validador del backend y dejó escrito el hueco del ticket (passwordConfirmation, password 8–32). También leyó prompts.md y docs/harness/comparacion.md, que ya estaban en el repo, así que el harness arranca sabiendo cuál es el ejercicio.

---

## Prompt 2 — Comando pieza 2 — MCP Atlassian (nivel proyecto)

**Objetivo:** Conectar el agente al tablero FLOW a nivel de proyecto. Quedó bien si aparece `.mcp.json` en la raíz y `/mcp` muestra atlassian autenticado.

**Modelo:** Fable 5.1 (claude-fable-5-1)  
**Herramienta:** Claude Code 2.1.302 (comando, no prompt)

```
claude mcp add --transport http atlassian https://mcp.atlassian.com/v2/mcp -s project
# luego dentro de claude: /mcp → atlassian → Authenticate
```

**Qué salió:** Lo corrí desde ~/Documents/EDUCATION/ (carpeta equivocada) y el .mcp.json quedó un nivel arriba, heredado por las dos copias; hubo que moverlo al repo. Antes había instalado el plugin de Atlassian a nivel usuario, que también contaminaba la raw; desactivado.

---

## Prompt 3 — Prompt de prueba del MCP (pieza 2)

**Objetivo:** Comprobar que el MCP lee el tablero antes de construir nada encima. Quedó bien si devuelve el ticket con clave, tipo, estado, prioridad y asignado, sin proponer nada.

**Modelo:** Fable 5.1 (claude-fable-5-1)  
**Herramienta:** Claude Code 2.1.302

```
Usa el MCP de Atlassian y lista los work items del proyecto FLOW con su clave, tipo, estado, prioridad y asignado. Solo la lista, sin proponer nada.
```

**Qué salió:** Funcionó a la primera (14:11). 2 consultas al MCP, devolvió solo FLOW-4 con clave, tipo, estado, prioridad y asignado, sin proponer nada.

---

## Prompt 4 — Pieza 3 — Skill `/priority-ticket`

**Objetivo:** Un atajo repetible que conecte Jira con plan mode. Quedó bien si la skill cubre los 4 pasos en orden, usa los estados reales (To Do / In Progress), no implementa nada y solo mueve el ticket tras mi aprobación.

**Modelo:** Fable 5.1 (claude-fable-5-1)  
**Herramienta:** Claude Code 2.1.302

```
Crea una skill de proyecto llamada priority-ticket en .claude/skills/priority-ticket/SKILL.md.

Qué hace cuando la invoco con /priority-ticket:
1. Usa el MCP de Atlassian para buscar en el proyecto FLOW el work item de mayor prioridad asignado a mí que esté en estado "To Do" (JQL: project = FLOW AND assignee = currentUser() AND status = "To Do" ORDER BY priority DESC, created ASC). Si no hay ninguno, lo dice y para.
2. Muestra clave, título y un resumen de los criterios de aceptación en una lista, sin reescribirlos.
3. Entra en plan mode y propone cómo implementarlo en este repo: archivos a crear o tocar, orden, y qué del backend hay que leer antes porque el ticket no lo especifica.
4. Solo cuando yo apruebe el plan, mueve el work item a "In Progress" con el MCP. Si no apruebo, no lo mueve.

Restricciones: no escribe código ni edita archivos del proyecto; los estados se llaman exactamente "To Do" e "In Progress". Frontmatter con name y una description de una línea. Muéstrame el archivo al terminar.
```

**Qué salió:** Funcionó a la primera (14:13). SKILL.md con frontmatter, 4 pasos en orden, JQL exacto, estados literales, no edita ni escribe código, mueve solo tras aprobación. Añadió por su cuenta los nombres de las tools del MCP (searchJiraIssuesUsingJql, transitionJiraIssue).

---

## Prompt 5 — Pieza 4 — Skill `/commit`

**Objetivo:** Commits convencionales sin redactar el mensaje cada vez. Quedó bien si solo usa lo staged, respeta `tipo(scope): descripción`, nunca hace `git add` ni push, y pide mi ok antes de commitear.

**Modelo:** Fable 5.1 (claude-fable-5-1)  
**Herramienta:** Claude Code 2.1.302

```
Crea una skill de proyecto llamada commit en .claude/skills/commit/SKILL.md.

Qué hace cuando la invoco con /commit: mira solo los cambios preparados (git diff --staged), deduce tipo y scope, y crea un commit con formato Conventional Commits: tipo(scope): descripción en imperativo, en minúsculas, sin punto final, máximo 72 caracteres. Tipos permitidos: feat, fix, chore, docs, refactor, test. Scope = backend, frontend o harness según los archivos tocados.

Restricciones: si no hay nada staged, lo dice y no hace git add. Nunca hace push. Muestra el mensaje antes de commitear y espera mi ok. Frontmatter con name y description. Muéstrame el archivo al terminar.
```

**Qué salió:** Funcionó a la primera (14:16). Cumple todo: solo staged, tipos/scopes cerrados, formato y límites, ok antes de commitear, nunca add ni push. Añadió una regla propia para scopes mixtos (usar el predominante).

---

## Prompt 6 — Pieza 5 — Subagente `adversarial-reviewer`

**Objetivo:** Un revisor separado del autor que intente romper el PR. Quedó bien si solo tiene herramientas de lectura, el encargo dice 'romper, no aprobar', y la salida va por severidad con pasos para reproducir.

**Modelo:** Fable 5.1 (claude-fable-5-1)  
**Herramienta:** Claude Code 2.1.302

```
Crea un subagente de proyecto llamado adversarial-reviewer en .claude/agents/adversarial-reviewer.md.

Rol: revisa un pull request de este repo intentando romperlo, no aprobarlo. Recibe el número o URL del PR, lee el diff con gh pr diff y los archivos que toca, y busca: criterios de aceptación del ticket que no se cumplen, entradas que el backend valida y el frontend no contempla, errores que terminan en consola en vez de en pantalla, estado de auth que se pierde al recargar, y convenciones de CLAUDE.md que no respeta.

Salida: lista de hallazgos ordenada por severidad; cada uno con archivo y línea, qué pasa, cómo reproducirlo. Si no encuentra nada, dice qué probó. No propone ni aplica fixes.

Restricciones: herramientas Read, Grep, Glob y Bash únicamente; nunca Edit ni Write. Frontmatter con name, description y tools. Muéstrame el archivo al terminar.
```

**Qué salió:** Funcionó a la primera (14:18). Solo lectura, "romper no aprobar", salida por severidad con repro, sin fixes. Añadió por su cuenta los archivos y campos exactos del backend (sacados del CLAUDE.md de /init) y los criterios del ticket.

---

## Prompt 7 — Pieza 6 — Hook de Prettier en el frontend

**Objetivo:** Que el formato del frontend no dependa de que alguien se acuerde. Quedó bien si prettier está en `frontend/`, el hook PostToolUse solo actúa bajo `frontend/src/`, y una edición real sale formateada.

**Modelo:** Fable 5.1 (claude-fable-5-1)  
**Herramienta:** Claude Code 2.1.302

```
Monta un formateador automático para el frontend.

1. Instala prettier como devDependency en frontend/ y añade un script "format" en su package.json. No toques backend/.
2. Crea un hook de Claude Code a nivel de proyecto en .claude/settings.json: evento PostToolUse, matcher Edit|Write, que lea la ruta del archivo editado del JSON de stdin y, solo si la ruta está bajo frontend/src/, ejecute prettier --write sobre ese archivo usando el prettier de frontend/node_modules. Si la ruta no está bajo frontend/src/, no hace nada y sale 0.
3. Pruébalo: edita frontend/src/App.tsx con un cambio trivial de formato y confirma que el hook lo reformateó. Luego revierte ese cambio.

Muéstrame el settings.json y el resultado de la prueba.
```

**Qué salió:** A medias (14:21). Instaló prettier, creó el script format, el comando del hook funciona probado a mano (formatea bajo frontend/src, ignora el resto) y revirtió App.tsx. Pero registró el hook con un esquema inválido en settings.json (command directo bajo matcher, sin el array hooks con type command), así que Claude Code no lo dispara en ediciones reales. La "prueba" fue correr el comando a mano, no una edición real. Intervención 1.

---

## Prompt 7b — Corrección del hook (intervención 1)

**Objetivo:** Que el hook quede registrado con el esquema que Claude Code realmente lee y se dispare en una edición real, no en una prueba manual. Quedó bien si `settings.json` tiene `matcher` + `hooks: [{type: "command", command}]` y un `Edit` real sobre `App.tsx` deja el archivo formateado.

**Modelo:** Fable 5.1 (claude-fable-5-1)  
**Herramienta:** Claude Code 2.1.302

```
El hook en .claude/settings.json no sigue el esquema de Claude Code: cada entrada de PostToolUse debe tener "matcher" y un array "hooks" con objetos {"type": "command", "command": "..."}. Corrígelo manteniendo el mismo comando. No lo pruebes a mano: haz una edición real con Edit sobre frontend/src/App.tsx (añade y quita un espacio) y confirma con git diff que el archivo quedó formateado por el hook.
```

**Qué salió:** Funcionó a la primera (14:24). Esquema corregido (matcher + hooks[{type: command}]), probado con un Edit real sobre App.tsx, archivo revertido.

---

## Prompt 8a — Pieza 7, primera versión lanzada (sin convención de rama)

**Objetivo:** El mismo que el bloque 8, antes de decidir la convención de nombre de rama.

**Modelo:** Fable 5.1 (claude-fable-5-1)  
**Herramienta:** Claude Code 2.1.302

```
Añade al final de CLAUDE.md una sección "## Reglas de proceso" con exactamente estas reglas, en este orden, sin cambiar nada del resto del archivo:

1. Antes de tocar código, crea una rama nueva desde la rama actual; nunca commitees directo en s1/start ni en main.
2. Al cerrar una tarea: prepara los cambios, usa /commit, y abre el pull request con gh pr create contra el repo del curso.
3. Después de abrir el PR, lanza el subagente adversarial-reviewer sobre ese PR y resume sus hallazgos.
4. En el chat, al terminar, responde solo con la URL del pull request.

Muéstrame la sección añadida.
```

**Qué salió:** Funcionó a la primera. Mientras lo lanzaba me di cuenta de que sin convención el agente va a inventar un nombre de rama distinto cada vez, así que lo relancé con el formato ehz/tipo/FLOW-n-… (bloque 8).

---

## Prompt 8 — Pieza 7 — Reglas de proceso al final de CLAUDE.md

**Objetivo:** Que el flujo rama → commit → PR → revisión → URL esté escrito donde el agente lo lee siempre, con una convención de nombre de rama ligada al ticket. Quedó bien si la sección está al final de `CLAUDE.md`, con las 4 reglas en orden, sin tocar lo que generó `/init`.

**Modelo:** Fable 5.1 (claude-fable-5-1)  
**Herramienta:** Claude Code 2.1.302

```
Añade al final de CLAUDE.md una sección "## Reglas de proceso" con exactamente estas reglas, en este orden, sin cambiar nada del resto del archivo:

1. Antes de tocar código, crea una rama nueva desde la rama actual con el formato ehz/tipo/FLOW-n-descripcion-corta (ejemplo: ehz/feat/FLOW-4-login-frontend), donde ehz son mis iniciales y tipo es feat, fix, chore, docs, refactor o test; nunca commitees directo en s1/start ni en main.
2. Al cerrar una tarea: prepara los cambios, usa /commit, y abre el pull request con gh pr create contra el repo del curso.
3. Después de abrir el PR, lanza el subagente adversarial-reviewer sobre ese PR y resume sus hallazgos.
4. En el chat, al terminar, responde solo con la URL del pull request.

Muéstrame la sección añadida.
```

**Qué salió:** Funcionó a la primera (14:27), pero se lanzó dos veces: primero una versión anterior del prompt (ver 8a) y luego esta con el prefijo ehz/. La sección quedó con las 4 reglas en orden y el resto del archivo intacto; el agente reportó qué cambió entre las dos versiones.

---

## Prompt 9 — Comando pieza 8 — AGENTS.md

**Objetivo:** Que otras herramientas lean las mismas instrucciones. Quedó bien si `ls -la` muestra `AGENTS.md -> CLAUDE.md`.

**Modelo:** Fable 5.1 (claude-fable-5-1)  
**Herramienta:** Claude Code 2.1.302 (comando, no prompt)

```
ln -s CLAUDE.md AGENTS.md
```

**Qué salió:** Hecho a mano (14:28). Symlink creado, modo 120000 en el commit.

---

## Prompt 10 — Commit del harness (a mano)

**Objetivo:** Dejar el harness versionado antes de lanzar el encargo. Quedó bien si `git log` muestra el commit y `git status` queda limpio.

**Modelo:** Fable 5.1 (claude-fable-5-1)  
**Herramienta:** Claude Code 2.1.302 (comando, no prompt)

```
git add CLAUDE.md AGENTS.md .claude .mcp.json frontend/package.json frontend/package-lock.json
git commit -m "chore(harness): instrucciones, skills, subagente revisor, hook prettier y mcp atlassian"
```

**Qué salió:** Hecho a mano (14:28). Commit 1c58d41 en harness-eh: 9 archivos, 249 inserciones. Las 8 piezas en 23 minutos.

---

## Prompt 11 — Copia con harness — lanzar el encargo

**Objetivo:** Obtener el plan de implementación del ticket en la copia con harness. Quedó bien si trae FLOW-?, resume los criterios, entra en plan mode y propone archivos y orden. No se aprueba el plan.

**Modelo:** Fable 5.1 (claude-fable-5-1)  
**Herramienta:** Claude Code 2.1.302 (comando, no prompt)

```
/priority-ticket
```

**Qué salió:** A medias (14:31). Trajo FLOW-4 con 1 consulta, resumió los 5 criterios, propuso 10 archivos + deps con los huecos del backend ya resueltos (del CLAUDE.md). Pero no entró en plan mode: imprimió el plan en el chat y pidió aprobación por texto. No movió el ticket (sigue en To Do). No aprobé.

---

## Prompt 12 — Copia raw — mismo encargo escrito a mano

**Objetivo:** Obtener el mismo plan en la copia raw con la misma instrucción escrita a mano. Quedó bien si se guarda lo que salga, incluido 'no tengo acceso a Jira', sin guiarla.

**Modelo:** Fable 5.1 (claude-fable-5-1)  
**Herramienta:** Claude Code 2.1.302

```
Busca en mi tablero de Jira, proyecto FLOW, el work item de mayor prioridad asignado a mí que esté en "To Do". Muestra clave, título y un resumen de sus criterios de aceptación. Luego entra en plan mode y propón cómo implementarlo en este repo: archivos a crear o tocar, orden, y qué del backend hay que leer antes porque el ticket no lo especifica. No implementes nada.
```

**Qué salió:** Funcionó a la primera (14:34) y mejor de lo esperado: leyó FLOW-4 de Jira (la raw tenía acceso; ver comparación), resumió los 5 criterios, ENTRÓ EN PLAN MODE REAL, leyó 8 archivos del backend y propuso 8 archivos + verificación. No aprobé.

---
