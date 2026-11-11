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

**Modelo:** Auto (Composer)
**Herramienta:** Cursor

```
Vamos  a realizar una matriz de trazabilidad con 4 columnas, scenario, prueba, cobertura,Observación, en esta vamos analizar el requisito "Lo que cada tarea muestra de su responsable" @openspec/specs/tasks/spec.md , solo este y sus Scenarios.
Vamos a validar un scenario  a la vez, no repares el código.
El archivo de salida debe quedar en docs/verificacion/cag.md.
Los scenarios que esten en no  cubiertos vamos a ecribir las pruebas en backend/tests/functional/tasks/, siguiendo el estilo de los que ya hay en backend/tests/functional/auth/. No toques nada fuera de backend/tests/.
```

**Qué salió:** no escribió nada: estaba en modo plan y armó un plan para la matriz y los tres tests a la vez.

## Prompt 2

**Modelo:** Auto (Composer)
**Herramienta:** Cursor

```
quita la tarea 2 y 3
```

**Qué salió:** quitó del plan escribir las pruebas y ejecutarlas. Quedó solo la matriz.

## Prompt 3

**Modelo:** Auto (Composer)
**Herramienta:** Cursor

```
Matriz de trazabilidad: responsable de la tarea

Implement the plan as specified, it is attached for your reference. Do NOT edit the plan file itself.

To-do's from the plan have already been created. Do not create them again. Mark them as in_progress as you work, starting with the first one. Don't stop until you have completed all the to-dos.
```

**Qué salió:** creó `docs/verificacion/cag.md` con los tres scenarios en no cubierto, sin tests.

## Prompt 4

**Modelo:** Auto (Composer)
**Herramienta:** Cursor

```
Estudia el proyecto identifica si existen pruebas para estos scenarios
```

**Qué salió:** confirmó que no hay tests de tasks. Los de auth cubren la cuenta, no el `assignee` de una tarea.

## Prompt 5

**Modelo:** Auto (Composer)
**Herramienta:** Cursor

```
Perfecto vamos a escribir la prueba para el primer scenario
```

**Qué salió:** escribió el test del responsable identificable y pasó a la primera.

## Prompt 6

**Modelo:** Auto (Composer)
**Herramienta:** Cursor

```
ajusta la matriz para este primer scenario
```

**Qué salió:** marcó el primer scenario como cubierto, con el nombre de la prueba.

## Prompt 7

**Modelo:** Auto (Composer)
**Herramienta:** Cursor

```
Implementemos es test para el segundo scenario
```

**Qué salió:** escribió el test y se quedó en rojo: la lista devuelve el email. No tocó el código de la aplicación.

## Prompt 8

**Modelo:** Auto (Composer)
**Herramienta:** Cursor

```
actualiza la matriz
```

**Qué salió:** apuntó la prueba del segundo scenario y lo dejó en no cubierto.

## Prompt 9

**Modelo:** Auto (Composer)
**Herramienta:** Cursor

```
Implementemos es test para el tercer scenario
```

**Qué salió:** escribió el test del responsable sin nombre y pasó. La suite sigue con el rojo del segundo.

## Prompt 10

**Modelo:** Auto (Composer)
**Herramienta:** Cursor

```
actualiza la matriz
```

**Qué salió:** marcó el tercer scenario como cubierto.

## Prompt 11

**Modelo:** Auto (Composer)
**Herramienta:** Cursor

```
ayudame a llenar esto @prompts.md
```

**Qué salió:** este archivo, con los prompts de la conversación tal cual.
