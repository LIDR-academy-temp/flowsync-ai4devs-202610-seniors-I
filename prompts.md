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
Analiza el requisito "Lo que cada tarea muestra de su responsable" en @openspec/specs/tasks/spec.md y 
Despliega los scenarios, en forma ordenada.
No toques nada fuera de `backend/tests/`. se sepa dónde empieza y dónde acaba.
```

**Qué salió:** (opcional, una línea) funcionó a la primera / tuve que insistir / me inventó una ruta que no existe.

Funcionó a la primera completo la matriz de trazabilidad con los 3 escenarios.


## Prompt 2

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Examina los tests del scenario
```

**Qué salió:** (opcional, una línea) funcionó a la primera / tuve que insistir / me inventó una ruta que no existe.

Seguimos con el ejercicio de trazabilidad del requisito del responsable: los tests están escritos y dos fallan en la lista, como debe ser.



## Prompt 3

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Crea un test por cada scenario que no cubriste, con el mismo formato.
```

**Qué salió:** (opcional, una línea) funcionó a la primera / tuve que insistir / me inventó una ruta que no existe.

Dice que los 3 scenarios de «Lo que cada tarea muestra de su responsable» ya tienen test en assignee.spec.ts: dos cada uno, uno para la tarea suelta y otro para la lista. Lo he corrido y sale 4 verdes y 2 rojos

