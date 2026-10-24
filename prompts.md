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

**Modelo:** Opus 5.5 (1M context) - medium
**Herramienta:** Claude Code en un proyecto de claude.ai (hilo lanzado desde la tarjeta de propuesta del proyecto)

```
Draft Module 2 MVP scope

Read the Module 2 instructions on s2/start. Create branch alcance-IAZ and draft docs/prd/alcance-mvp-IAZ.md plus prompts.md. Confirm initials and scope choices with the user before committing or opening a PR.
```

**Qué salió:** este texto no lo escribí yo: lo propuso el propio proyecto y lo lancé pulsando «Start». El agente leyó el `README.md` de `s2/start`, revisó el código para el tramo 1, pegó la ficha de hechos como respuestas a sus cinco preguntas y dejó un borrador con alcance (10 propuestas, 7 dentro) y las tres líneas pendientes de mi confirmación.

## Prompt 2

**Modelo:** Opus 5.5 (1M context) - medium
**Herramienta:** Claude Code en un proyecto de claude.ai (mismo hilo)

```
me da la sensación que el alcance es muy escueto. Si nos centramo en rapidez es mas util el resumen que el filtro
```

**Qué salió:** metió el resumen de "qué se ha movido" en el alcance (quedan 8 de 10) y mantuvo el filtro por estado, porque lo fija la ficha de hechos.

## Prompt 3

**Modelo:** Opus 5.5 (1M context) - medium
**Herramienta:** Claude Code en un proyecto de claude.ai (mismo hilo)

```
te confirmo los puntos propuestos
```

**Qué salió:** confirmé el recorte (8 de 10) y las tres líneas tal como quedaron; el agente quitó las marcas de «a confirmar» y abrió el PR.
