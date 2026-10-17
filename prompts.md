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

**Qué salió:** Genera el fichero CLAUDE.MD


## Prompt 2

**Modelo:** Opus 5.5 Medium
**Herramienta:** Claude Code

```
Configura el MCP de Jira para poder interactuar con las tareas definidas en el tablero FlowSync de mi cuenta de Jira.

Sabes que has terminado cuando:

- Puedes ver todas las tareas del tablero.
- Puedes leer el contenido de las tareas que existen.
- Puedes mover tareas de un estado a otro.
```

**Qué salió:** Ha creado el archivo `.mcp.json` pero no ha sido capaz de verificar las tres condiciones que le he puesto al no estar logeado correctamente en atlassian desde VS Code.

He tenido que reiniciar VS Code para que se coja la configuración de `.mcp.json` y logearme contra Atlassian. Hice la configuración de las herramientas desde la terminal del equipo en lugar de desde VS Code.


## Prompt 3

**Modelo:** Opus 5.5 Medium
**Herramienta:** Claude Code

```
Acabo de configurar el MCP de Atlassian, con lo que ya deberías tener permiso para acceder a Jira. Comprueba las tres validaciones del prompt anterior para garantizar que la configuración es correcta.
```

**Qué salió:** Ha realizado las tres comprobaciones de manera satisfactoria, incluso moviendo la tarea "Hello, world" que tengo en Jira a "In Progress" y después a "To do", para dejar el tablero tal y como estaba aunque no se lo hubiera especificado.


## Prompt 4

**Modelo:** Opus 5.5 Medium
**Herramienta:** Claude Code

```
Crea una skill llamada "priority-ticket" que se encargue de empezar una tarea nueva, haciendo lo siguiente:

- Traer el ticket de mayor prioridad asignado a mi y que esté en la columna "To do".
- Resumir sus criterios de aceptación.
- Entrar en "Plan mode".
- Realizar una propuesta de cómo implementarlo.
- Esperar la aprobación del plan por mi parte.

En caso de que el plan no se apruebe, habrá que modificar los detalles necesarios hasta que se apruebe ese plan.

Una vez se apruebe el plan, hay que mover la tarea a la columna "In Progress" en Jira.

No muevas la tarea hasta que no se haya aprobado el plan, y no salgas del "Plan mode" hasta que yo no haya aprobado el plan.

Utiliza las buenas práctica de Claude Code tanto a la hora de crear la skill, como a la hora de organizarla dentro de la estructura de carpetas del proyecto: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices
```

**Qué salió:** Ha creado la skill `priority-ticket` dentro de la carpeta `.claude/skills/priority-ticket` con el listado de checks que tiene que realizar durante el flujo de ejecución de la skill.

Durante la ejecución ha tomado tres decisiones que yo no le he indicado:

- Solo se lanza la skill a mano.
- Pide permiso solo para mover los tickets.
- Lo ha llamado `priority-tickets` aunque la documentación que le he pasado como Recurso sugiere el uso de gerundio como `prioritizing-tickets`, con lo que ha primado mi instrucción.


## Prompt 5

**Modelo:** Opus 5.5 Medium
**Herramienta:** Claude Code

```
Crea una skill llamada "commit" que realice un conventional commit a partir de los cambios preparados, con el formato `type(scope): description`. 

Utiliza las buenas prácticas de Conventional Commits a la hora de definir cómo tiene que actuar esta skill: https://www.conventionalcommits.org/en/v1.0.0/

Utiliza las buenas prácticas de definición de skills para Claude Code como has hecho en el prompt anterior a la hora de crear la skill, y sigue respetando el naming que te he dado yo a la hora de definir la skill ("commit", no hace falta usar el gerundio).
```

**Qué salió:** Ha creado la skill correctamente siguiendo mis instrucciones, aunque no la ha probado haciendo un commit real.

Durante la ejecución ha tomado dos decisiones que yo no le he indicado:

- La ejecución puede ser manual, pero también la puede lanzar Claude directamente.
- No me pide permisos para los comandos de git, con lo que la skill puede ejecutarlos sin pedirme permisos.


## Prompt 6

**Modelo:** Opus 5.5 Medium
**Herramienta:** Claude Code

```
Crea un subagente `adversarial-reviewer` para revisar una pull request con el objetivo de romperla.

La revisión tiene que poner a prueba los cambios de la pull request tratando de romperla desde el punto de vista de la especificación de producto, desde un punto de vista de implementación técnica, y desde el punto de vista de la seguridad.

Como resultado, tiene que mostrar un mensaje indicando qué partes de la PR ha podido romper en caso de que haya conseguido romper alguna.

El subagente no tiene que aprobar la pull request y tampoco tiene que editar nada, su único objetivo es romper la pull request desde el punto de vista de: producto, técnico y seguridad.
```

**Qué salió:** Ha creado el subagente dentro de `.claude/agents` si nque yo se lo especificara, y ha incluido las instrucciones necesarias para comprobar todo lo que le he dicho.

Además, ha creado un hook que le impide modificar el contenido de la PR aunque hay algunos límites, ya que el hook no deja de ser un listado de comandos que no se pueden ejecutar. Hay algunos que se han quedado fuera (como `node -e`). Dicho hook se ha declarado en la cabecera del subagente, con lo que solo funcionará con versiones recientes de Claude Code.

## Prompt 7

**Modelo:** Opus 5.5 Medium
**Herramienta:** Claude Code

```
Vamos a crear un hook que formatee el frontend cada vez que el agente edite un archivo.

Ahora mismo el proyecto de frontend no tiene ningún formateador, con lo que sabes que has terminado cuando:

- Creas el hook que hace que cada vez que el agente edite un archivo, formatee el archivo.
- Instalas Prettier dentro del proyecto `frontend`.
- Ejecutas el hook sobre `frontend/src/**`.

En ningún momento de la ejecución de esta tarea puedes hacer commit de los cambios. Los cambios los commitearé yo manualmente cuando termine todo, pero ahora mismo no hagas commit de ningún cambio.
```

**Qué salió:** Ha instalado y configurado Prettier dentro de la carpeta `frontend`, y ha ejecutado el formateador sobre los archivos de la carpeta `frontend/src` sin modificar ninguno porqué ya cumplían con el formato correcto. Aunque el proyecto muestra vulnerabilidades al hacer `npm install`, no ha ejecutado un `npm audit fix` sobre el proyecto.

**⚠ Este es el último prompt que he podido lanzar dentro de los 45 minutos de la tarea**

## Prompt 8

**Modelo:** Opus 5.5 Medium
**Herramienta:** Claude Code

```
Define las reglas de proceso al final de `CLAUDE.md` para especificar como trabajar en las tareas del proyecto. Las reglas de proceso son las siguientes:

- Antes de tocar nada en el código, hay que crear una rama nueva.
- Una vez esté implementada la iteración de la tarea, hay que lanzar la skill `/commit` y crear una pull request con `gh pr create`.
- Una vez creada la pull request, hay que lanzar el subagente revisor sobre la pull request.
- Finalmente, en el chat tienes que devolver la URL de la pull request.
```

**Qué salió:** Ha creado dentro de `CLAUDE.md` la sección `Process Rules` con los pasos a seguir a la hora de trabajar en tareas dentro del repositorio. Ha añadido dos cosas que no le he pedido:

- `--repo` en `gh pr create` para crear la PR a mi repo en lugar de al repo original. Esto NO es correcto según las instrucciones del curso, por lo que voy a tener que re-trabajarlo.
- `git push -u origin <rama>` antes de crear la PR para asegurarse de que la rama está en el remoto.


## Prompt 9

**Modelo:** Opus 5.5 Medium
**Herramienta:** Claude Code

```
Un punto importante: las pull requests tienen que ir contra el repositorio original `LIDR-academy-temp/...`, no contra mi repositorio. Por lo tanto, la decisión de añadir el `--repo`no era necesaria.

Vuelve a modificar las "Process rules" para que, antes de crear la PR, me pregunte en qué repositorio quiero crearlo: en el mío o en el original. De esta manera, tendré una forma de validar que estamos creando la Pull Request en el lugar correcto.
```

**Qué salió:** Ha modificado el proceso para que, antes de crear la PR, me pregunte sobre qué repositorio tiene que crearla. De esta manera, no creará PRs de manera 100% automática, si no que tendré una forma de crear PRs contra mi repo en caso de que me haga falta en el futuro, para no meter ruido sobre el repositorio de LIDR.


## Prompt 10

**Modelo:** Opus 5.5 Medium
**Herramienta:** Claude Code

```
Finalmente, crea el archivo `AGENTS.md` como enlace a `CLAUDE.md` para que cualquier herramienta diferente a Claude pueda usarlo sin problema.
```

**Qué salió:** Me ha creado el archivo `AGENTS.md` como symlink de `CLAUDE.md` incluso sin especificarle el comando.