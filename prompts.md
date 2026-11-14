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

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
Comprueba en los últimos 15 commits y el estado actual del árbol si se han cumplido o no las reglas de proceso definidas en el CLAUDE.md. Deja el resultado escrito en docs/auditoria/lacmxx.md. No cambies nada solo indica un resumen para cada regla. El resumen que sea una tabla con el siguiente formato:
- una fila por cada regla y en cada una 5 columnas
- columna 1 con la regla.
- columna 2 dónde se miró para comprobarla, un comando o archivo. Esto no puede estar vacío. 
- columna 3: si se ha cumplido, no se ha cumplido o no se puede determinar. En caso que no se haya cumplido donde fue que se rompió la regla o que falta para poder comprobarla.
- columna 4: evidencia de donde se cumple o si no se cumple donde fue que se rompió. Si no se pudo comprobar que falta para su comprobación.
- columna 5: se debe dejar, se puede borrar o se debe mover a algo que se ejecute solo
```

**Qué salió:** funcionó a la primera.

## Prompt 2

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
Resume en una frase para cada regla R2 y R5 que no se han podido determinar que tendría que cambiar para dejar rastro y pudiera ser verificable. 
Puede ser reescribirla, puede ser que algo la ejecute, puede ser que no haya arreglo posible y toque asumirla. No cambies nada.
```

**Qué salió:** funcionó a la primera.

## Prompt 3

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
De todas las reglas que se cumplen puedes ver si alguna se puede eliminar porque la herramienta ya lo impide, y la que no se cumple nunca y a nadie le ha importado. 
Especifica el motivo por el que se podría eliminar. No cambies nada.
```

**Qué salió:** tuve que insistir porque no me pareció correcta la respuesta. Me indicó dos reglas que se cumplen pero que solo por una parte puede estar garantizada por la herramienta.

## Prompt 4

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
y la R5 no sería una candidata a borrar, lo de no repetir el resument en el chat de que puede servir.
```

**Qué salió:** funcionó a la primera.

