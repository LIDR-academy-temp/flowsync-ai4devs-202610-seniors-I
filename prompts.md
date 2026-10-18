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

**Modelo:** Haiku 5.5
**Herramienta:** Claude Code

/init

## Prompt 2

**Modelo:** Haiku 5.5
**Herramienta:** Claude Code

/priority-ticket

**Qué salió:**
The /priority-ticket command isn't installed in this session, so I didn't run it. I also don't have enough to do the task on my own: the message has no ticket key, no project, and no criteria for ranking.

What would you like me to do? For example:

## Prompt 3

**Modelo:** Haiku 5.5
**Herramienta:** Claude Code

@plan_con_harness @plan_sin_harness 
Estos dos archivos fueron generados como ejercicio para comparar diferentes planes, compáralos y coloca el resultado en el archivo de comparacion.md indicado en el readme:
1. Qué archivos propone tocar, contados.
2. Qué convenciones del proyecto respetó y cuáles no, nombrándolas una a una. Si en un lado no había ninguna escrita en ninguna parte, esa es la respuesta y vale.


**Qué salió:**
He creado docs/harness/comparacion.md: tablas de archivos, convenciones respetadas y no respetadas, y la nota de alcance.