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

**Modelo:**  Sonnet 5.5
**Herramienta:** Claude Code

```
] /opsx:explore Check the content on this repo, add
  specific interest on the specs and the tests
```

**Qué salió:** The agent get context about the current repo, 

## Prompt 2

**Modelo:**  Sonnet 5.5
**Herramienta:** Claude Code

```
 Check the spec about add-task-list and take the requirement
  "Lo que cada tarea muestra de su responsable". Create a Requirements
  traceability Matrix. Do this only for the requirement specified.
  Format:
  On top specify number of scenarios of the reuqirement and how many are
  covered.
  Then the matrix with this columns
  1. Scenario, in 1 line.
  2. Test that cover the scenario, with the name, the file and the line that
  cover it. Without the specific name leave the column empty
  3. Specify if its cover, not cover or you don' know/not sure.
  4, In case in the 3 you put don't know or not sure specify what was missing to
  know it.

  Write the matrix in a file in docs/verificacion/RTC.md
```

**Qué salió:** The file was generated with the matrix. 

## Prompt 3

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
 Create the tests for the not covered scenarios, make the
  tests to get sure the scenario is covered, don't fix the code or make the
  test weaker in order to pass the tests, if code don't pass is ok. Don't take
  desicions if something is not clear ask. Create the tests on
  backend/tests/functional/tasks/
```

**Qué salió:** Creo los tests para cubrir los escenarios, haun que le especifique que no asumiera y preguntara decidio asumir que el id no se tenia que verificar por que en la spec no lo prohibia. 



## Prompt 4

**Modelo:**  Sonnet 5.5
**Herramienta:** Claude Code

```
  the spec don't talk about the user id, I clarify the id have
  same rules as the rest of user fields, fix the tests to include it.
```

**Qué salió:** Incluio el id en las verificaciones. 
