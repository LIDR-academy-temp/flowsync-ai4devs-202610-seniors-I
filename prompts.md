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

## Prompts

**Modelo:** Sonnet
**Herramienta:** Claude Code

## Prompt #1


```
 lee el @README.md y explicame la tarea que tengo que hacer. Tanto la parte A como la parte B.
```

## Prompt #2

```
crea la rama. Mis iniciale son ml. Crea un template de la tabla del archivo
  en docs/auditoria
```

## Prompt #3

```
 Pregunta: no entiendo si yo tengo que completar la columna "Qué pide la
  regla", o alguna otra a mano antes de lanzar la peticion para que analice
  los commits, o la tabla de auditoria completa del archivo
  @docs/auditoria/ml.md es llenada por el agente.
```

## Prompt #4

```
actualiza la tabla de la seccion "Tabla de auditoría" del
  archivo @docs/auditoria/ml.md , con el resultado de analizar los ultimos 15
  commits del source branch (s5/start del repo upstream) y el estado actual
  del arbol. El unico archivo a modificar es @docs/auditoria/ml.md.
```