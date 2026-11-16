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

**Modelo:** GLM-5.3-Flash 
**Herramienta:**  Opencode

```
Siguiendo el readme, tengo que hacer los ejercicios que nombra ahi (parte A y parte B), me ayudas hacerlo. Vamos parte por parte ya que es   muy confusa la redaccion. Podrias hacerme un listado de lo hay que hacer de la parte A
```

**Qué salió:** 

```
Me detallo muy bien los steps a seguir, de forma mas ordenada y ya cargo en su contexto lo que habia que hacer
```

---

## Prompt 2

**Modelo:** GLM-5.3-Flash 
**Herramienta:**  Opencode

```
Empezamos con la matriz del A.1
```

**Qué salió:** 

```
Me generó la martiz, me menciono la ruta de la spect y de la suite de tests
```

---

## Prompt 3

**Modelo:** GLM-5.3-Flash 
**Herramienta:**  Opencode

```
Vamos A.2. 
De las filas que quedaron en No cubierto, escribe los tests que faltan: uno por scenario, siguiendo el estilo de los que ya existen en el proyecto, y sin tocar nada fuera de la carpeta de tests.
Después, ejecútalos.
Pase lo que pase, no arregles el código, y no aflojes el test para que pase. Si algo se pone rojo, se queda rojo
```

**Qué salió:** 

```
Funciono a la primera y me resalto el bug de TaskTransformer (el que usa la lista y la creación) serializa el assignee con UserTransformer
```