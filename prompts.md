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

```
lee el archiv prompts y ve guardando los prompts que realice de acuerdo a ese formato
```

## Prompt 2

**Modelo:** Haiku 5.5
**Herramienta:** Claude Code

```
escribe la spec de lo que el sistema hace hoy y déjala en un archivo versionado del proyecto, no en el chat. Las dos capas, y solo ese vertical. Lo que pasa por la API y lo que se ve en pantalla, y nada que no sea cuentas y acceso, no insistir en incluir más allá.
El formato de la spec debe ser estrictamente:
Arriba, un ## Purpose de una o dos frases: para qué existe esta capability.
Debajo, ## Requirements, y colgando de él ### Requirement: en los que el sistema SHALL hacer algo.
Bajo cada requisito, al menos un #### Scenario: de cuatro almohadillas, con dos viñetas: - **WHEN** y - **THEN**. No hay casilla para el GIVEN: la precondición se mete dentro del WHEN.
En castellano, salvo las mayúsculas de la RFC.
Y tres reglas duras, que son las que separan este ejercicio de escribir documentación:

Nada de ADDED, MODIFIED ni REMOVED. Eso es el vocabulario de un delta, y esto no es un delta: es la verdad actual del sistema. Si tu archivo tiene una de esas secciones, has escrito otra cosa.
Solo comportamiento observable desde fuera. Ni un nombre de clase, ni un nombre de archivo, ni una ruta de código. En la API, observable es la petición y la respuesta. En la pantalla, observable es lo que una persona ve y puede hacer.
No toques el código. Ni siquiera para arreglar lo que encuentres, y sobre todo para eso: lo que encuentres es material de la parte B.
```
