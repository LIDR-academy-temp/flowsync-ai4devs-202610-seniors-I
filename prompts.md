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

**Modelo:** Opus 5.5 300k Medium
**Herramienta:** Cursor

```
(agente en modo ask, sin cambiar nada)
Ok, vamos a empezar a realizar una serie de tareas que tendrán las siguientes salidas:
1- Una matriz de trazabilidad y lo que llamaremos "las tres líneas", eso va junto en docs/verificacion/cp.md
2- Los tests que escribamos van en backend/tests/functional/tasks/ . NO toques nada fuera de backend/tests/
```

**Qué salió:** el agente leyó prompts.md y la spec de tasks para entender bien el contexto antes de empezar. Reconoció que ambas carpetas aún no existen y me hizo tres preguntas.

## Prompt 2

**Modelo:** Opus 5.5 300k Medium
**Herramienta:** Cursor

```
(agente en modo ask, sin cambiar nada)
Te respondo las tres preguntas:
1- Efectivamente docs/verificacion/cp.md y @prompts.md  son excepciones
2- Sobre las tres líneas, puedes leer README.md en la raíz del repo para que lo entiendas, pero déjame que yo voy a ir a mi ritmo con los ejercicios
3- Ya te iré diciendo contra qué se traza la matriz.
```

**Qué salió:** el agente leyó README.md, afirmó que entendió el alcance pero también la naturaleza del ejercicio. Además, advierte que AGENTS.md choca con la entrega del README: El AGENTS.md pide ramas feat/<slug>, la skill /commit y una revisión con adversarial-reviewer. El README pide la rama trazabilidad-<iniciales> y un PR contra el repo del curso con tres cosas y ni una más.

## Prompt 3

**Modelo:** Opus 5.5 300k Medium
**Herramienta:** Cursor

```
(agente en modo agente, con autorización de creación de archivos y ejecución)
Ok, ya revisé y no encontré ningún test dentro de backend/tests/functional/tasks, entonces el primer dato numérico en @docs/verification/cp.md es 0, pero puedes por favor verificar mi afirmación.

Vamos a trabajar exclusivamente sobre el requisito  «Lo que cada tarea muestra de su responsable», necesito que crees la matriz de trazabilidad según se especifica en A.1 de @README.md  y una vez que haz hecho la matriz, llevar a cabo A.2: los tests que faltan, en la carpeta que anteriormente te indiqué. Esto aplica para los escenarios que quedaron en estado No cubierto. Un test por scenario, siguiendo el estilo de los que ya existen en el proyecto (ver previamente los tests disponibles en backend/tests/functional/auth/ para seguir el patrón. Observa que todos tienen TSDocs).

NO ejecutes ningún test aún.
```

**Qué salió:** el agente llevó a cabo la lectura de los tests existentes para seguir el mismo formato y creó tres tests en backend/tests/functional/tasks/assignee.spec.ts, en el grupo Tasks | responsable. TSDoc, transacción global y sesión mediante login real. No ha ejecutado ningún test; solo ha pasado Prettier, ESLint y la comprobación de tipos sobre ese fichero.

## Prompt 4

**Modelo:** Opus 5.5 300k Medium
**Herramienta:** Cursor

```
(agente en modo agente, con autorización de creación de archivos y ejecución)
Ahora, quiero ir un paso más, quiero que me ayudes a hacer dos inspecciones adicionales:
1- Verificar = ¿el código cumple los criterios de aceptación? (trazabilidad: ticket → criterio → prueba → código)
2- Revisar adversarialmente (Puedes aprovechar el subagente adversarial-reviewer) = ¿qué se rompe aunque los cumpla? (edge cases, seguridad, desviaciones de la spec que ningún criterio anticipó).
```

**Qué salió:** el agente fue a buscar el ticket del backlog del que sale ese requisito y la definición del subagente adversarial-reviewer. Con eso hizo la trazabilidad y después lanzó la revisión adversarial. En la fase de verificación reconoció el PRD RF-17, donde se pide que cada tarea de la lista muestre su título, responsable y estado. De ahí salta al ticket E3-1 (us-lista-compartida) y de ahí al spec. Posteriormente a los tests y código. Identificó un escenario que no se está cumpliendo: "La tarea no filtra datos de cuenta", e indica que en el código la lista, la creación y el cambio de estado usan UserTransformer, que incluye email, createdAt y updatedAt. Indica que el commit 0aa5af7 («refactor(tasks): reutilizar UserTransformer y no duplicar la forma del usuario») sustituyó TaskAssigneeTransformer por UserTransformer. Con la revisión adversarial se identificaron tests que no eran laxos y pasaban en verde aunque el escenario no se cumple.

## Prompt 5

**Modelo:** Opus 5.5 300k Medium
**Herramienta:** Cursor

```
(agente en modo ask, sin cambiar nada)
Ok, corrígeme si me equivoco, pero entonces el escenario "la tarea no filtra datos de cuenta" no se está cumpliendo según el código porque hay al menos tres endpoints donde el email asignado a una tarea se expone, cuando la información de esa tarea es recuperada por otra persona?
```

**Qué salió:** el agente clarificó que hay dos matices aunque la conclusión es correcta: cuando la información de las tareas es recuperada por cualquier persona, la lista de tareas expone los email de los responsables. Eso es una fuga clara. Además, el endpoint PATCH para modificar el estado de una tarea trae e email del responsable, y cualquiera puede cambiar el estado. En el endpoint de creación también se retorna la información del responsable (quien acaba de crearla), no parece ser una fuga de información (mi interpretación), pero incumple la regla del requisito, que dice «NO SHALL exponer junto a la tarea ningún otro dato».

## Prompt 6

**Modelo:** Opus 5.5 300k Medium
**Herramienta:** Cursor

```
(agente en modo ask, sin cambiar nada)
Antes de correr los test, profundicemos en la situación para completar la línea tres. Lo que estamos observando es que el scenario "la tarea no filtra datos de cuenta" no se está cumpliendo porque sí retorna el email, y estamos extendiendo la observación no sólo hacia los endpoints de lectura, sino a los endpoints de creación y modificación, y observamos también los datos de fechas de creación y modificación, y estamos asumiendo que esa información cuenta como "datos de acceso". Ahora, puedes confirmar en código que ese paquete de información es retornado como parte de su "assignee" o viaja en otra parte de la respuesta?
```

**Qué salió:** el agente confirma que el email y las dos fechas de la cuenta viajan dentro de assignee. Los endpoints de lista, creación y cambio de estado usan TraskTransformer que retorna fechas de la tarea, y assignee se construye con UserTransformer, el cual inyecta email, fechas de creación y update, fullName e initials. El endpoint que obtiene la tarea suelta y el cambio de fecha no retornan email ni fechas de la cuenta.
