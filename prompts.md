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
Crea una skill llamada priority-ticket en .claude/skills/priority-ticket/SKILL.md. Cuando la invoque con /priority-ticket debe: (1) usar el MCP de Atlassian de este proyecto para buscar en el proyecto SCRUM de Jira los tickets asignados a mí en el estado "Tareas por hacer" y quedarse con el de mayor prioridad; (2) mostrarme un resumen breve del ticket y de sus criterios de aceptación; (3) entrar en plan mode, explorar el código necesario (incluido el backend si el ticket no especifica algún campo) y proponerme un plan de implementación, sin modificar ningún archivo; (4) solo cuando yo apruebe el plan, mover el ticket al estado "En curso" en Jira. Si no encuentra ningún ticket, que me lo diga y se detenga.
```

**Qué salió:** (opcional, una línea) funcionó a la primera / tuve que insistir / me inventó una ruta que no existe.

```
Creé la skill en .claude/skills/priority-ticket/SKILL.md. Todavía no la he
  ejecutado. Hace lo siguiente:
```

## Prompt 2

**Modelo:** Opus 1M xHigh
**Herramienta:** Claude Code

```
Crea una skill llamada commit en .claude/skills/commit/SKILL.md. Cuando la invoque con /commit debe: (1) revisar solo los cambios que están en stage (git diff --staged); si no hay nada en stage, avisarme y detenerse sin agregar archivos por su cuenta; (2) redactar un mensaje de commit en formato Conventional Commits, tipo(scope): descripción, eligiendo el tipo correcto (feat, fix, refactor, docs, test, chore, style) y como scope la parte del proyecto afectada (por ejemplo frontend o backend), con la descripción en minúscula, en imperativo y de menos de 72 caracteres; (3) si los cambios lo justifican, agregar un cuerpo breve explicando el porqué; (4) mostrarme el mensaje propuesto y hacer el commit solo cuando yo lo confirme. No debe hacer push ni modificar archivos.
```

**Qué salió:** (opcional, una línea) funcionó a la primera / tuve que insistir / me inventó una ruta que no existe.

```
Creé la skill en .claude/skills/commit/SKILL.md. Todavía no la he ejecutado. Cuando
  escribes /commit:
```

## Prompt 3

**Modelo:** Opus 1M xHigh
**Herramienta:** Claude Code

```
Crea un subagente llamado adversarial-reviewer en .claude/agents/adversarial-reviewer.md. Su trabajo es revisar un pull request intentando romperlo, no aprobarlo. Debe: (1) recibir el número o la URL del PR y leer sus cambios con gh pr view y gh pr diff; (2) buscar activamente problemas: bugs, casos borde sin cubrir, manejo de errores incorrecto, problemas de seguridad (por ejemplo, cómo se guarda el token), incumplimiento de los criterios de aceptación del ticket y de las convenciones del CLAUDE.md; (3) cuando haga falta, leer el código del repo para verificar sus sospechas, por ejemplo comparar los campos del frontend con el validador del backend; (4) devolver una lista de hallazgos ordenada por gravedad, cada uno con archivo, línea y por qué es un problema. No debe editar ni crear archivos: dale solo herramientas de lectura (Read, Grep, Glob) y Bash limitado a comandos de solo lectura como git y gh pr view/diff. No debe aprobar el PR ni comentar en GitHub; solo reporta.

```
