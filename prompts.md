# Prompts

Registro semi-automático (hooks `UserPromptSubmit` y `Stop`): cada prompt lanzado, con su modelo, su herramienta y un resumen automatico o ajustado manualmente de la salida.
sesion_actual: Sesion 4
**Sesiones**:
  - nombre: Sesion 4
    prompts: 1-33
---

## Prompt 1

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Quiero que leas el readme.md del proyecto para hacer la tarea S4. El entorno está listo y chequeado, la suite instalada y funciona. los test se corrieron con npm como se solicita y salieron en verde
```

**Qué salió:** leyó el readme, empezó a correr los test y lo corté

---

## Prompt 2

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
leí los escenarios de task incluido el de "Lo que cada tarea muestra de su responsable ". veo que hay tres escenario pero los tests indican validar la parte de auth. creo que no hay test de ninguna spec de task
```

**Qué salió:** lee las specs y me dice que hay tres escenarios y ningún test, corto la ejecución cambio a modo manual.

---

## Prompt 3

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
lee los escenarios de la spec referente al requerimiento de task "Lo que cada tarea muestra de su responsable" y los test existentes. Antes de escribir los test necesito que hagas la matriz de trazabilidad inicial para cada escenario de ese requerimiento. para cada una indica el criterio de aceptacion, que prueba lo cubre y si está o no cubierto por orden de prioridad. No implementes nada aún
```

**Qué salió:** muestra una matriz inicial con los tres escenarios

---

## Prompt 4

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
el id no se permite. la spec dice que no se dan datos extra del usuario y eso incluye  el id de acceso. Obtener una tarea aplica a la lista y a la creacion. Es un punto de duda sobre la spec ya que es no es precisa al respecto.  Respecto al responsable sin nombre el escenario refiere a no recurrir a su email para mostrarlo. Has de comprobar nombre nulo e iniciales no vacías, sin fijar el valor
```

**Qué salió:** empieza a definir los escenario y cotinua con el readme. lo corto 

---

## Prompt 5

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
no modifiquemos las spec. Sigamos con la tarea del readme paso a paso. Haz un plan de ejecucion y check list. Quiero que generes una primera versión de la matriz tal como la pide el readme
```

**Qué salió:** Escribió la primera versión de la matriz y me dió los siguientes pasos a seguir

---

## Prompt 6

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
la que más dudas me genera es la del id. de alguna manera en menos expuesta a nivel de datos pero es más especifica a nivel de usuario que el dato de las iniciales. actualiza la matriz
```

**Qué salió:** me indica que la fila 1 puede estar en no lo sé porque no sabe si id se considera dato a restringir. Y me avisa que está por todos lados.

---

## Prompt 7

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
entiendo que no hay razon para exponer el id aunque puede ser util a posteriori. Dado que no hay indiicaciones explicitas déjalo. Se ha de modificar la spec si eso es lo que se necesita, pero está fuera del scope de la tarea.
```

**Qué salió:** Actualizó la matriz para una primera versión

---

## Prompt 8

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
bien deja la primera versión
```

**Qué salió:** Dejo la matriz así como primera versión en [docs/verificacion/salv.md](../docs/verificacion/salv.md), sin commit. - [x] Matriz inicial: 3 scenarios, la fila 1 en «No lo sé» y las dos filas de iniciales en «No cubierto» - [x] Decisiones anotadas debajo de la matriz - [ ] Tests (punto 3), que no empiezo hasta que me lo digas

---

## Prompt 9

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
bien inicia los test manteniendo la metodología de los test existentes. muestrame luego las specs vs cada test cubierto
```

**Qué salió:** Empieza a correr todos los test en vez de iniciar la creación de los especificos, el prompt fue vago. lo detengo.

---

## Prompt 10

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
me rectifico, inicia la creación de los tests para cada escenario del requerimiento trabajado
```

**Qué salió:** Escribió los tres tests con una explicacion vaga

---

## Prompt 11

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
muestrame los tres test
```

**Qué salió:** muestra el codigo de los tres test

---

## Prompt 12

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
donde usas Fecha today=2026-11-06: la pide GET /tasks/:id
```

**Qué salió:** me indica donde se usa la fecha y que no es relevante para el caso de prueba.

---

## Prompt 13

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
pon la fecha del sistema  en su lugar
```

**Qué salió:** Cambió la fecha fija por la del sistema: `const HOY = DateTime.now().toFormat('yyyy-MM-dd')`, con el import de `luxon` que ya usa el backend. Toma el día en la zona horaria local de la máquina que ejecuta los tests. Para el responsable da igual, porque esa fecha solo afecta a `isOverdue`. ¿Los ejecuto ya?

---

## Prompt 14

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
repiteme las tareas pendientes del readme antes
```

**Qué salió:** muestra lo faltante del readme

---

## Prompt 15

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
bien sube primero la versión actual de la matriz
```

**Qué salió:** me muestra que está hecho el comit y me consulta si sigue

---

## Prompt 16

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
ejecuta los test
```

**Qué salió:** Ejecuta todos los test, y yo lo hago manualmente para ver el output de falla

---

## Prompt 17

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
ejecuté los test y me devolvió ok en dos de los tres casos de tarea fallando para "la tarea no expone el email ni datos de acceso de su responsable (213ms)"
```

**Qué salió:**  me indica que le salió lo mismo al ejecutar los test

---

## Prompt 18

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
aumenta  los test para poder probar los escenarios de lista y tarea suelta. La tarea hoy la hace el dueño y queda asignado (por ende no se revela nada a otro usuario) pero eso podría no mantenerse y no se condice con la spec.  Luego marcala como cubierta aunque falle el código. El id es un punto de duda. queda en no lo sé con las salvedades antedichas
```

**Qué salió:** da los resultados de los test y sus alcances limitados

---

## Prompt 19

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
si, muestrame la matriz y dame recomendaciones en base a lo discutido
```

**Qué salió:** hace lo solicitado

---

## Prompt 20

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Mi estimacion, en todo caso después de leer las specs era 3. de todas formas leí el código, ejecuté los test y leí los outputs. del solo readme no se puede estimar.
```

**Qué salió:** Cambió la línea 1 a **3 / 0**, con la nota de que estimaste tras leer la spec porque con solo el README no se puede. En un mensaje anterior escribiste «creo que no hay test de ninguna spec de task», que se lee como una estimación de 0. Si ese mensaje fue después de leer el código y los tests, entonces el 3 es tu estimación previa y está bien así. ¿Resumo la casilla de la fila 1 para que la matriz quepa en una pantalla, y paso a `prompts.md`?

---

## Prompt 21

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
si hazlo. Valida la entrega y lanza en paralelo la revisión  adversarial
```

**Qué salió:** entrega una respuesta de una validación casi correcta.

---

## Prompt 22

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
  (retorno de la revision adversarial)
```

**Qué salió:** La revisión adversarial aprueba la entrega con reservas. No encontró falsos verdes ni cambios fuera de alcance, y confirma el resultado: 27 en verde y 2 en rojo. **Hallazgos de severidad media**, que dependen de decisiones tuyas: 1. **La línea 1 no da dos números limpios.** Pone «3 / 0» y luego añade «3 tienen test y 2 se cumplen» y una explicación. El README pide los números «sin redondear ni explicar». El revisor también señala que el prompt 2 («creo que no hay test…») contradice la estimación de 3. 2. **La fila 1 tiene un estado híbrido**, «Cubierto: rojo… `id`: No lo sé», que no es ninguno de los tres estados. Además, el «3 cubiertos» de la cabecera puede leerse como «3 se cumplen». 3. **Hueco no declarado en el scenario 1.** El requisito prohíbe «ningún otro dato», pero el test no …

---

## Prompt 23

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
ajusta prompts.md para que los casos sin respuesta figure "(sin anotar)". Revisaré esas respuestas a mano. Repara la matriz con los criterios indicados por el revisor incluidos los nombres de los test. En la columna 1 pon el valor correcto de No lo sé. La lina 1 deja solo los dos numeros 0 y 0. Leí y vi que habia en el código antes de leer el readme para entender el proyecto.  Dime que falta aclarar
```

**Qué salió:** Aplicó los cambios y me indicó los faltantes

---

## Prompt 24

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
muestrame el archivo de matriz que tienes hasta ahora
```

**Qué salió:** me muestra el contenido del archivo

---

## Prompt 25

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
veo que agregaste una columna a la matriz. No pongas lo del id en la matriz. queda explicado en la parte B. Además rechequea los outputs del revisor
```

**Qué salió:** Quitó la columna `#`, así que la matriz queda con las cuatro casillas del README. También saquóa el `id` de la matriz: ahora solo aparece en la línea 2 de la parte B. La fila 1 sigue en «No lo sé», con este motivo: «el requisito prohíbe "ningún otro dato" y el scenario solo nombra email y acceso; el test no comprueba `createdAt` ni `updatedAt`». ## Los hallazgos del revisor, contra el estado actual | # | Hallazgo | Estado ahora | |---|---|---| | 1 | La línea 1 no da dos números limpios | **Resuelto**: `0 / 0` sin texto. El revisor citaba el prompt 2 como contradicción, pero ya no aplica: aclaraste que leíste el código antes del README | | 2 | La fila 1 tiene un estado híbrido y la cabecera infla los cubiertos | **Resuelto**: «No lo sé» y 2 cubiertos | | 3 | El test no comprueba `createdA…

---

## Prompt 26

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
verifica que test hay para el escenario 1 y agrega test para updateAt y createAt si no existen
```

**Qué salió:** No había ningún test de `createdAt` ni `updatedAt`. Lo añadó aparte, uno por lectura, y salen las fechas al crear la tarea y en la lista. **Antes:** el scenario 1 tenía 3 tests, «la tarea no expone el email ni datos de acceso de su responsable», uno por lectura. Solo comprobaban el email, la contraseña y el token. **Nuevo**, en [assignee.spec.ts](backend/tests/functional/tasks/assignee.spec.ts): | Test: «la tarea no expone las fechas de la cuenta de su responsable» | Resultado | |---|---| | `(al crearla)` | ✖ sale `createdAt` | | `(suelta)` | ✔ | | `(en la lista)` | ✖ sale `createdAt` | - **Suite:** **28 en verde y 4 en rojo, de 32**. Los 4 rojos son del scenario 1: email y fechas, al crear y en la lista. Prettier pasa. - **Por qué un test aparte:** si las fechas fueran en el mismo test…

---

## Prompt 27

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
agrega a la fila 1, por ejemplo el id
```

**Qué salió:** En la fila 1, la casilla «qué faltó» queda así: > El requisito prohíbe «ningún otro dato» y el scenario solo nombra email y acceso. No está fijado qué otros datos de la cuenta cuentan, por ejemplo el `id` Releí el archivo después del aviso de cambio en disco y no hay cambios inesperados. Sin commit todavía.

---

## Prompt 28

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
repasé el prompts.md, corre nuevamente la revisión adversarial
```

**Qué salió:** Lanzó la segunda revisión adversarial sobre el estado actual, incluidos los cambios sin commit. Va a comprobar que se resolvieron los hallazgos de la primera pasada, buscar falsos verdes y contrastar la matriz con un `npm test` 

---

## Prompt 29

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
(notificación automática de la revisión adversarial, no es un prompt)
```

**Qué salió:** Lanzó la segunda revisión adversarial sobre el estado actual, incluidos los cambios sin commit. Comprueba que se resolvieron los hallazgos de la primera pasada, busca falsos verdes y contrasta la matriz con un `npm test` real.

---

## Prompt 30

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Relee el prompts.md para verificar el estado. dame las tres lineas de la parte B para ajustarlas
```

**Qué salió:** verifica y retorna el estado casi correcto

---

## Prompt 31

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
ajusta la linea 2 de la parte B. debe decir que la spec no especifica "datos de cuenta" y el escenario no indica que es "dato de acceso". Tal vez refiere a datos personales.  los escenarios no alcanzan datos como el id. Lo ideal sería revisar el PRD. La linea 3  el requisito no idicaba para quien estaba restringida la visualizacion de datos y el escenario era vago en el detalle. Decidí que el alcance era total incluyendo listar, obtener y crear dado que no está bien especificado el alcance debe ser total.
```

**Qué salió:** hizo lo solicitado

---

## Prompt 32

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
añade a la linea 3 la frase.  Mostrar al dueño sus datos cuando crea la tarea no es una fuga de información, pero es innecesario siendo un punto a especificar.
```

**Qué salió:** Añadió la frase al final de la línea 3: > …y que la tarea la lea también otra cuenta. Mostrar al dueño sus datos cuando crea la tarea no es una fuga de información, pero es innecesario y es un punto a especificar. Ajustó la frase para que encaje en el texto: escribió «y es un punto a especificar» en vez de «siendo un punto a especificar».

---

## Prompt 33

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
se volvió a revisar manualmente prompts.md. prepara el commit
```

**Qué salió:** Hizo el commit con los 3 ficheros de la entrega. me señala unos links relativos en las respuestas de este archivo (prompts.md)  Los corrijo a mano.

