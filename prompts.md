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

**Modelo:** Opus 4.8
**Herramienta:** Claude Code

```
Vamos a trabajar el ejercicio de trazabilidad del módulo 4.

Revisa únicamente el requisito "Lo que cada tarea muestra de su responsable" que está en openspec/specs/tasks/spec.md. No revises toda la capability.

Primero identifica sus scenarios y compáralos con los tests que ya existen. No te bases solo en el nombre del test: lee qué comprueba realmente.

Guarda la matriz en docs/verificacion/fc.md, con el total de scenarios y los cubiertos. Usa exactamente cuatro columnas: Scenario, Test que lo cubre, Estado (Cubierto / No cubierto / No lo sé) y Qué faltó para decidirlo.

Mi estimación antes de revisar fue que 4 de 4 estaban cubiertos, aunque pensé que las pruebas podían ser básicas. Déjala registrada como estimación, no como resultado.

Por ahora no escribas tests ni arregles código. Tampoco modifiques la spec. Si algo no está claro, márcalo como "No lo sé" y explica por qué.

Registra este prompt literalmente en prompts.md, indicando Claude Code y el modelo que estés usando. No reescribas ni mejores mis instrucciones.
```

**Qué salió:** El requisito tenía 3 scenarios (no 4) y ninguno estaba cubierto: solo hay tests de `auth`, ninguno toca los endpoints de tareas.

---

## Prompt 2

**Modelo:** Opus 4.8
**Herramienta:** Claude Code

```
Ahora quiero que escribas los tests que faltan para los 3 escenarios del requisito "Lo que cada tarea muestra de su responsable".

Haz un test por escenario dentro de backend/tests/functional/tasks/, siguiendo el estilo de las pruebas existentes en backend/tests/functional/auth/.

No modifiques el código de la aplicación ni la spec. Ejecuta los tests y dime cuáles pasan y cuáles fallan. Si alguno falla, déjalo en rojo, no lo arregles ni cambies el test para hacerlo pasar.

Actualiza la matriz en docs/verificacion/fc.md si encuentras nueva evidencia, diferenciando las pruebas que ya existían de las que acabas de crear.

Registra este prompt tal cual en prompts.md, indicando Claude Code y el modelo utilizado. Todavía no completes las tres líneas de reflexión.
```

**Qué salió:** 2 verdes, 1 rojo. El scenario 2 destapa que la lista (`GET /tasks`) filtra el email del responsable; se deja en rojo sin tocar código.

---

## Prompt 3

**Modelo:** Opus 4.8
**Herramienta:** Claude Code

```
Revisa los archivos de entrega del módulo 4 antes de cerrar la práctica.

En docs/verificacion/fc.md deja una sola fila por cada uno de los 3 scenarios, con las 4 columnas que pide el ejercicio. Conserva el resultado original de 0/3 pruebas existentes y explica aparte que añadimos 3 pruebas nuevas: 2 verdes y 1 roja. No marques como cumplido el scenario cuyo test falla.

Revisa también prompts.md para quitar únicamente encabezados duplicados o restos de plantilla, sin cambiar el texto original de ningún prompt. Registra este mensaje exactamente como Prompt 3.

No modifiques los tests, el código de la aplicación ni la spec. No arregles el error del email.

Muéstrame qué quedó pendiente para que yo pueda escribir las tres líneas de reflexión con mis propias conclusiones.
```

**Qué salió:** Matriz dejada a 3 filas (scenario 2 como «No cubierto»), limpieza del resto de plantilla y pendientes listados para que yo escriba las tres líneas de reflexión.

---

## Prompt 4

**Modelo:** Opus 4.8
**Herramienta:** Claude Code

```
Agrega al final de docs/verificacion/fc.md un apartado llamado "Mis tres reflexiones".

Quiero que pongas exactamente estas tres líneas, con un lenguaje sencillo:

1. Pensé que estaban cubiertos los 4 escenarios, pero al revisar encontré que realmente eran 3 y ninguno tenía pruebas. Después escribimos las tres y dos pasaron.
2. Me hizo dudar el escenario de los datos del responsable, porque no sabía si faltaba probarlo o si el sistema estaba mostrando información que no debía.
3. Para comprobar que no se mostraran datos personales, decidimos revisar tanto una tarea individual como el listado completo. Ahí encontramos que el listado sí mostraba el correo.

No modifiques la matriz, los tests ni el código de la aplicación. Conserva el test rojo.

Registra este mensaje exactamente como Prompt 4 en prompts.md, indicando Claude Code y Opus 4.8.

Al terminar, muéstrame únicamente qué archivos quedaron modificados.
```

**Qué salió:** Apartado «Mis tres reflexiones» añadido al final de `fc.md` con las tres líneas tal cual; matriz, tests y código sin tocar.
