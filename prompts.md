# Prompts

> Prompts escritos con ayuda de mi tutor IA (Claude), en modo guiado; no tengo perfil de desarrollador.

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
/init

## Prompt 2
Crea una skill de proyecto llamada priority-ticket en .claude/skills/priority-ticket/SKILL.md.
Cuando la invoque con /priority-ticket debe:
1. Usar el MCP de Atlassian para buscar en mi proyecto FLOW de Jira el ticket de mayor prioridad asignado a mí que esté en la primera columna del tablero (Por hacer / To Do). Consulta los estados reales del proyecto en vez de suponer el nombre.
2. Mostrarme un resumen corto del ticket y sus criterios de aceptación.
3. Entrar en plan mode y proponer cómo implementarlo, explorando el código real del proyecto (por ejemplo los validadores del backend) para cubrir lo que el ticket no especifica.
4. Solo cuando yo apruebe el plan, mover el ticket a la columna En curso / In Progress.
Restricciones: no escribas código ni muevas el ticket antes de mi aprobación. Al terminar, muéstrame el SKILL.md creado.

Qué salió: no entró en plan mode y empezó a implementar; lo paré con Esc”

## Prompt 3

**Modelo:**  Sonnet 4.5 · Claude API
**Herramienta:** Claude Code

```
Crea una skill de proyecto llamada commit en .claude/skills/commit/SKILL.md.
Cuando la invoque debe mirar los cambios preparados (git diff --staged) y crear un commit con formato Conventional Commits: tipo(scope): descripción en imperativo, primera línea de 72 caracteres como máximo. Tipos: feat, fix, docs, refactor, test, chore; scope: backend o frontend según los archivos.
Si no hay nada preparado, avísame en vez de hacer git add por tu cuenta. Nunca hagas push.
Muéstrame el SKILL.md creado.
```



## Prompt 4
Crea un subagente de proyecto llamado adversarial-reviewer en .claude/agents/adversarial-reviewer.md.
Su trabajo: revisar un pull request intentando romperlo, no aprobarlo. Debe buscar bugs, casos límite, errores de validación sin manejar, problemas de seguridad y desvíos de las convenciones de CLAUDE.md, y devolver una lista de hallazgos ordenada por gravedad.
Restricciones: solo puede leer (herramientas Read, Grep, Glob y Bash para gh pr diff/view); nunca edita archivos ni hace commits.
Muéstrame el archivo creado.

## Prompt 5

Quiero un hook que formatee el frontend automáticamente.
1. Instala Prettier como dependencia de desarrollo en frontend/ y crea un .prettierrc sencillo.
2. Añade en .claude/settings.json (el compartido del proyecto, no settings.local.json) un hook PostToolUse para Edit, Write y MultiEdit que ejecute Prettier solo sobre el archivo editado, y solo si está dentro de frontend/src.
3. Pruébalo: crea un archivo de prueba mal formateado en frontend/src, comprueba que el hook lo formatea y luego bórralo.
Muéstrame el settings.json final.

## Prompt 6
El subagente .claude/agents/adversarial-reviewer.md no tiene frontmatter YAML. Añádele uno con name: adversarial-reviewer, una description de cuándo usarlo, y tools: Read, Grep, Glob, Bash, para que no pueda editar archivos. No cambies el resto del contenido ni ningún otro archivo.

## Prompt 7

El hook de .claude/settings.json no sigue el formato que Claude Code espera y usa una variable $FILE_PATH que no existe. Reescríbelo con el formato oficial: PostToolUse con matcher "Edit|Write|MultiEdit" y un hook de type "command" que lea la ruta del archivo editado del JSON que llega por stdin (tool_input.file_path, por ejemplo con jq), y que ejecute el Prettier instalado en frontend/ solo si el archivo está dentro de frontend/src. No silencies los errores. Solo toca .claude/settings.json.

## Prompt 8

En .claude/settings.json, el hook PostToolUse tiene "type" y "command" al mismo nivel que "matcher". Según el formato oficial deben ir dentro de un array "hooks": [{ "type": "command", "command": ... }] dentro de ese objeto. Corrígelo sin cambiar el comando y usa "$CLAUDE_PROJECT_DIR/frontend" en lugar de "cd frontend" para que no dependa de la carpeta actual. Solo toca ese archivo.



