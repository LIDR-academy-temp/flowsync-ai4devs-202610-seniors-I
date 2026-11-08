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

Lee los escenarios de la spec viva "tasks Specification" de los requisitos "Lo que cada tarea muestra de su responsable" y los tests existentes en el código. Genera una tabla de trazabilidad: Scenario (la descripción del scenario en una sola línea), Test que lo cubre (nombre exacto de la suite), estado (cubierto / no cubierto / no lo se), Qué te faltó (media línea con qué falta para saberlo). Crea la tabla de trazabilidad en la ruta docs/verificacion/las.md (crea el archivo o la ruta en caso de que no existan)

**Qué salió:** La matriz de trazabilidad de las funcionalidades que hacen referencia a "lo que cada tarea muestra de su responsable".

## Prompt 2

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

Tomando como referencia los tests que tenemos en backend/tests/functional/auth, escribe los tests necesarios para que el requisito esté correctamente testeado. Crea la carpeta backend/tests/functional/tasks para organizar los tests correspondientes, y solo cubre el requisito "Lo que cada tarea muestra de su responsable".

**Qué salió:** Ha escrito y ejecutado los tests, validando que dos tests pasan correctamente mientras que el de "La tarea no expone el email ni datos de acceso de su responsable" falla, ya que la API de tareas expone el email del usuario en 3 de los endpoints.

## Prompt 3

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

Itera los tests para que los "Datos de acceso" sean todos aquellos campos que no sean "id", "fullName" o "initials". Cualquier otro campo que no sea uno de estos tres, lo vamos a considerar "Datos de acceso", y por lo tanto no aparecerán nunca al obtener cualquier tarea suelta o en una lista.

**Qué salió:** Ha actualizado la suite de tests para considerar cualquier dato fuera de id, fullName o initials como datos de acceso y que, por lo tanto, no tienen que aparecer en una tarea. El test sigue fallando, ahora con más casos ya que se han añadido campos como createdAt y updatedAt a los campos que no pueden aparecer en las tareas, y los 3 endpoints de tareas de backend los devuelven.

## Prompt 4

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

Lanza el agente /adversarial-reviewer para que haga una revisión de las funcionalidades de Tasks referentes a "Lo que cada tarea muestra de su responsable"

**Qué salió:** Ejecutó el agente en segundo plano y me mostró la revisión adversarial.

 He comprobado algunas afirmaciones del revisor y tres son incorrectas:
- Iniciales sin nombre: dice que anonima@example.com da AN. Da AE, como ya salió al ejecutar
  los tests. Su objeción de fondo sí vale: las iniciales salen del email.
- Comentario sobre los tipos (assignee.spec.ts:73): dice que es falso porque no encontró
  "email" en .adonisjs/. El comentario es correcto: los tipos se deducen de TaskTransformer,
  y el error de typecheck de antes ya mostraba email dentro de assignee.
- Matriz: habla de un fichero "assignee.assignee.spec.ts" que no aparece en
  docs/verificacion/las.md. Veo que has editado la matriz (añadiste la sección de las tres
  líneas), así que parte de lo que dice puede referirse a tu versión. Lo que sí es cierto es
  que la tabla sigue con "No cubierto" en las tres filas aunque ya hay tests.

Huecos en la spec, que tienes que decidir tú:
- Iniciales sin nombre: salen de los dos trozos del email (AE para anonima@example.com), un
  dato derivado de él. La spec no lo permite ni lo prohíbe.
- El id del responsable: la spec habla de «nombre e iniciales» y «ningún otro dato». Tú lo
  diste por permitido, pero es un número correlativo que deja recorrer las cuentas una a una,
  y el frontend no lo usa.

Casos límite reales en User.initials (backend/app/models/user.ts:12-16):
- Un nombre de solo espacios ('   ') devuelve iniciales vacías. Eso incumple el scenario 3, y
  el test no lo detecta porque solo prueba null.
- "Ada King Lovelace" da AK.
- Con doble espacio, "Ada  Lovelace" da AD.

Huecos en los tests:
- El test de fugas mete las cinco rutas en uno solo. Si se separara por ruta, se vería cuáles
  ya cumplen y se detectaría si alguna vuelve a fallar.
- Los tests 1 y 3 solo miran la lista y la tarea suelta.
- Falta el caso en que quien mira es el propio responsable.
- Falta el caso con varias tareas y varios responsables.

Frontend: no usa el email del responsable en ningún sitio, así que quitarlo de la API no
rompe nada.

## Prompt 5

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

Itera los tests del requisito "Lo que cada tarea muestra de su responsable" para considerar los Casos límite reales que ha sacado el agente de revisión adversarial, separa los tests de fugas por ruta para ver cuáles se cumplen y cuáles siguen fallando, añade los casos en que quien mira es el propio responsable y el caso con varias tareas y varios responsables siguiendo la spec viva.

**Qué salió:** Itear los tests para considerar los edge cases encontrados por el adversarial reviewer.


## Prompt 6

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

Actualiza la matriz de trazabilidad con la información añadida y recopilada durante las iteraciones que acabamos de realizar

**Qué salió:** Actualiza la matriz de trazabilidad con la última información.
