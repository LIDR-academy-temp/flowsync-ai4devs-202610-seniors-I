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

**Modelo:** DeepSeek V4.1 Flash Free
**Herramienta:** OpenCode

```
podrias buscarme los ultimos commits y resumirmelos?
```

**Qué salió:** funcionó a la primera; 20 commits con fecha, autor y ficheros tocados.

## Prompt 2

**Modelo:** DeepSeek V4.1 Flash Free
**Herramienta:** OpenCode

```
partiendo del README.md(parte A) ayudame a constatar que reglas de proceso definidas en el CLAUDE.md se cumplen acorde a los ultimos 15 commits, siguiendo la tabla y el archivo que solicita en el mismo ejercicio del README
```

**Qué salió:** funcionó, pero con un aviso: el agente tuvo que apoyarse en el `git reflog` y en los commits propios como evidencia secundaria.

