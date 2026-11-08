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

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Vamos a realizar una matriz de trazabilidad para el requisito «Lo que cada tarea muestra de su responsable». Solo ese requisito, no la capability entera. La matriz la generaremos con el siguiente formato: 

A.1 · La matriz de trazabilidad

La matriz mapea, scenario a scenario, si el requisito está cubierto por los tests. El formato lo fija esta lección y no es negociable: una fila por scenario y cuatro columnas. Encima, dos números: cuántos scenarios tiene el requisito y cuántos resultaron cubiertos — el primero se anota al empezar, el segundo al terminar.

    El scenario, en una línea. Qué se espera y en qué situación. Si no cabe en una línea, es que estás juntando dos.

    Qué test lo cubre, con el nombre exacto que aparece en la suite. Sin el nombre concreto, la columna va vacía: "seguro que algo lo cubre" no es una fila.

    Cubierto · No cubierto · No lo sé. Los tres estados son válidos, y el tercero no es un fallo: es el resultado más informativo de los tres.

    Si pusiste "no lo sé", qué te faltó para decidirlo. Media línea. Suele ser una de dos: no encontraste dónde se comprueba, o encontraste algo que se le parece y no dice exactamente lo mismo.

Así queda la tabla. Los dos números van encima — el primero antes de empezar, el segundo al terminar:

Scenarios en el requisito: 4 · Cubiertos: ___

Scenario Test que lo cubre Estado Qué te faltó (ejemplo) La tarea muestra el nombre del responsable cuando tiene uno asignado show_assignee_name_when_present Cubierto — … … … …

 y la escribiermos en un fichero en docs/verificacion/pvr.md
```

**Qué salió:** funcionó a la primera: matriz en `docs/verificacion/pvr.md`, 3 scenarios y 0 cubiertos (la capability `tasks` no tiene tests).

## Prompt 2

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Por cada fila en No cubierto, escribe el test que falta — uno por scenario — siguiendo el estilo de los que ya existen en el proyecto. Sin tocar nada fuera de la carpeta de tests.
```

**Qué salió:** tres tests en `backend/tests/functional/tasks/assignee.spec.ts`; dos pasan y uno falla porque destapa un bug real: la lista (`GET /tasks`) filtra el email del responsable.

## Prompt 3

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Elimina las notas que has puesto debajo de la matriz y vamos a añadir una lista debajo de ella con las 3 siguientes lineas: 1. Cuántos scenarios creías cubiertos antes de mirar, y cuántos lo estaban. 2. El scenario en el que no supiste si faltaba un test o faltaba la regla en la spec 3. Algo que el scenario no determinaba y tuviste que decidir al escribir el test.
```

**Qué salió:** notas sustituidas por la lista de tres líneas en `docs/verificacion/pvr.md`.
