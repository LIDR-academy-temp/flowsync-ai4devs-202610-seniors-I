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
Lee el contexto de este proyecto
```

**Qué salió:** leyó CLAUDE.md, README, AGENTS.md, prompts.md y el backlog, y resumió el proyecto y el ejercicio.

## Prompt 2

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Dentro del archivo docs/spec-viva/las.md vamos a crear una especificación explicando lo que tenemos implementado y funciona
a día de hoy, tanto en frontend como en backend, de la vertical de cuentas y acceso, que incluye el registro de usuario,
el inicio de sesión, la sesión y el perfil. Escríbelo en formato RFC-2119, con todo el contenido en español excepto los
términos MUST, SHALL y SHOULD que tienen que estar siempre en mayúsculas y en inglés. El formato del archivo tiene que ser
el siguiente: 1. Un "## Purpose" de una o dos frases indicando para qué existe esa capability. 2. Debajo, "##
Requirements", y colgando de él "### Requirement" en los que el sistema SHALL hacer algo. 3. Bajo cada uno de los
requisitos, al menos un "#### Scenario:" de cuatro almohadillas, con dos viñetas: "- **WHEN**" y "- **THEN**", sin incluir
la casilla del "GIVEN", ya que la precondición estará metida dentro del "WHEN".
```

**Qué salió:** De primeras, me ha escrito en el archivo spec-viva/las.md 12 requisitos y 39 escenarios que cubren tanto API como web. Revisando los requisitos, veo que ha escrito un montón de términos referente al código (endpoints, nombres de entidad...), que se contradice con una de las reglas duras del proyecto.

## Prompt 3

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Hay tres reglas duras que tienes que respetar y no te he especificado, y una de ellas es bastante relevante porqué te la has saltado: 1. Nada de `ADDED`, `MODIFIED` ni `REMOVED`. Estamos definiendo lo que hace el sistema, y ese es vocabulario de un delta. 2. Solo comportamiento observable desde fuera. Ni un nombre de clase, ni un nombre de archivo, ni una ruta de código. En la API, observable es la petición y la respuesta. En la pantalla, observable es lo que una persona ve y puede hacer. (Creo que esta es la que te has saltado). 3. No toques el código. Ni siquiera para arreglar lo que encuentres, y sobre todo para eso: lo que encuentres es material de la parte B.
```

**Qué salió:** reconoció que había escenarios con comportamiento interno (sesión guardada, llamadas al servidor, regla de validación, caducidad del token) y los reescribió en términos de petición/respuesta y de lo que se ve en pantalla.
