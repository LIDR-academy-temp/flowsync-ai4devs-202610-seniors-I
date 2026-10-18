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

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Quiero que el fichero CLAUDE.md unicamente referencie a un fichero AGENTS.md en el que vamos a crear y definir. Dicho fichero debe indicar que este proyecto es monorepo cuyo backend es en AdonisJS 7, API y el frontend en React19 + Vite. Los gotchas son auth por access tokens (@adonisjs/auth), el perfil se sirve por transformer y que no debe introducir dependencias nuevas sin justificarlas en el PR
```

**Qué salió:** Genero el fichero AGENTS.md con lo que indque e hizo la referencia al mismo desde CLAUDE.md

## Prompt 2

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Para continuar necesito una conexion MCP con mi tablero de jira a nivel de proyecto. Vamos a configurarla
```

**Qué salió:** Me ha creado el fichero mcp.json en la raiz del proyecto y ha añadido la conexion con Atlassian. Me ha dejado pendiente de reiniciar y comprobar si funciona la conexion cuando haga el login.

## Prompt 3

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
 Quiero comprobar que la autenticacion con atlassian es correcta, lista mis issues. Por cierto, el codigo de mi proyecto es FLOW pero quizas ya puedas consultarlo tu.
```

**Qué salió:** Efectivamente ha comprobado que la conexion funciona, ha visto que no tengo issues y que el codigo del proyecto es FLOW

## Prompt 4

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Vamos a crear una skill, cuyo nombre sea /priority-ticket dicha skill debe traer de mi tablero de jira el ticket de mayor prioridad que tenga asignado en "TODO", resumir sus criterios de aceptacion, entrar en plan mode y proponer como implementar el ticket. Al aprobar dicho plan, movera la tarea a "In progress"
```

**Qué salió:** Ha creado la skill siguiendo las instrucciones que le he indicado.

## Prompt 5

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Vamos a crear otra skill cuyo nombre sea /commit que debe crear un commit convencional con su mensaje con el formato (tipo(scope): descripcion) a partir de los cambios preparados. Para esta skill usaremos el modelo haiku
```

**Qué salió:** Ha creado la skill siguiendo las instrucciones que le he indicado.

## Prompt 6

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Ahora vamos a crear un subagente "adversarial-reviewer" que revisa una pull request intentando romperla, no la aprueba ni edita nada.
```

**Qué salió:** Ha creado el subagente siguiendo las instrucciones que le he indicado.

## Prompt 7

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Ahora quiero un hook que me formatee el codigo frontend cada vez que se edite un archivo dentro de frontend/src/** como no tengo un formateador instalado, instala Prettier en frontend/
```

**Qué salió:** Me ha instalado Prettier en el directorio que le he indicado y me ha configurado el hook. Ademas ya lo ha probado el solo.

## Prompt 8

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Vamos a añadir unas reglas de proceso en nuestro fichero AGENTS.md. Hay que crear una rama nueva antes de tocar el codigo; al cerrar, hay que llamar a /commit y hay que hacer una PR usando gh pr create; Despues el subagente adversarial-reviewer debe revusarla sobre el propio pull request; En el chat solo debe ponerme la url del PR
```

**Qué salió:** Ha añadido lo que le he indicado. El unico problema que ha tenido es que el subagente no tenia permisos para añadir el comentario en la pr y lo va a delegar al agente principal con gh.

## Prompt 9

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
/priority-ticket
```

**Qué salió:** Ha obtenido la issue, resumido los criterios de aceptacion y me ha propuesto un plan detallado de la implementacion a realizar.

## Prompt 10 (En el proyecto sin harness)

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Trae el ticket de maxima prioridad que tengo en jira y entra en modo plan para implementarlo.
```

**Qué salió:** Me ha ofrecido o conectar el mcp o pegarle el ticket a mano. Entiendo que no tengo que ayudarle pero lo mas "rapido" es pegarle el ticket (Aunque claro no me esta priorizando lo estoy haciendo yo)









