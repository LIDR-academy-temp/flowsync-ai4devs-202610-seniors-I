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
(En modo plan)
Genera un plan para llevar a cabo la siguiente tarea:

Escribe una especificación de lo hace actualmente el sistema y guárdala en docs/spec-viva/cp.md

Debes limitarte a observar las dos capas disponibles, @backend  y @frontend , estrictamente sólo para el módulo de cuentas y acceso.

Documenta lo que ocurre en la API y lo que ve el usuario en pantalla. No amplíes el alcance.

Sigue este formato obligatorio:
- Arriba, un ## Purpose de una o dos frases: para qué existe esta capability.
- Debajo, ## Requirements, y colgando de él ### Requirement: en los que el sistema SHALL hacer algo.
- Bajo cada requisito, al menos un #### Scenario: de cuatro almohadillas, con dos viñetas: - **WHEN** y - **THEN**. No hay casilla para el GIVEN: la precondición se mete dentro del WHEN.
- En castellano, salvo las mayúsculas de la RFC.

Además, sigue las siguientes reglas:
- Nada de ADDED, MODIFIED ni REMOVED. Eso es el vocabulario de un delta, y esto no es un delta: es la verdad actual del sistema. Si tu archivo tiene una de esas secciones, has escrito otra cosa.
- Solo comportamiento observable desde fuera. Ni un nombre de clase, ni un nombre de archivo, ni una ruta de código. En la API, observable es la petición y la respuesta. En la pantalla, observable es lo que una persona ve y puede hacer.
- No toques el código. Ni siquiera para arreglar lo que encuentres
```

**Qué salió:** generó un plan donde indica que abarca solo el módulo de cuentas y acceso, que hoy abarca cuatro endpoints bajo /api/v1 (signup, login, profile y logout) y tres pantallas (/login, /register y /profile), más las redirecciones entre ellas. Sin embargo, por diferencias entre en AGENTS y el README, sugiere crear una rama de trabajo que difiere del README.

## Prompt 2

**Modelo:** Opus 5.5 300k Medium
**Herramienta:** Cursor

```
(En modo plan)
Usa la rama spec-viva-cp, puedes confirmar, pero ya estamos sobre esa rama, no hace falta crearla.
```

**Qué salió:** Ya estamos en una rama de trabajo, pero se llama spec-viva-cp, no docs/spces-viva-cp. Trabajaré sobre esa y he quitado del plan el paso de crear una rama nueva. Se llevó a cabo el levantamiento de la aplicación y el agente tomó el control del browser para auditar cada endpoint.

## Prompt 3

**Modelo:** Opus 5.5 300k Medium
**Herramienta:** Cursor

```
(En modo agent)
Implementa el plan
```

**Qué salió:** El agente llevó a cabo la ejecución, pero siguió el harness, lo que lo llevó a hacer más de la cuenta: no sólo creó el documento, sino que corrió la verificación adversarial y llevó a cabo las correcciones, además hizo dos commits (uno con la primera versión del doc y otro con la enmienda) y creó el PR hacia LIDR-academy-temp:s3/start from carlospravia:spec-viva-cp

## Prompt 4

**Modelo:** Opus 5.5 300k Medium
**Herramienta:** Cursor

```
(En modo ask)
Muéstrame el código en el API donde se lleva a cabo el registro de una nueva cuenta (Requisito El sistema SHALL permitir registrar una cuenta nueva por la API)
```

**Qué salió:** El agente muestra las partes del código donde se implementa la creación de la cuenta y la validación.

## Prompt 5

**Modelo:** Opus 5.5 300k Medium
**Herramienta:** Cursor

```
(En modo ask)
Muéstrame en el código en el API donde se lleva a cabo Requirement: El sistema SHALL rechazar registros con datos inválidos o email ya usado
```

**Qué salió:** El agente indica que ese rechazo no está escrito a mano en el controlador, sino que ocurre en la validación, antes de crear el usuario. Muestra el código que lo fundamenta. Además, indica qué corresponde a los escenarios de la spec. Indica que no ha un if aparte para "email ya usado", sino que lo hace Vine consultando la tabla users con la regla unique.

## Prompt 6

**Modelo:** Opus 5.5 300k Medium
**Herramienta:** Cursor

```
(En modo ask)
Muéstrame en el código en el API donde se lleva a cabo Requirement: El sistema SHALL rechazar registros con datos inválidos o email ya usado
```

**Qué salió:** El agente indica que ese rechazo no está escrito a mano en el controlador, sino que ocurre en la validación, antes de crear el usuario. Muestra el código que lo fundamenta. Además, indica qué corresponde a los escenarios de la spec. Indica que no ha un if aparte para "email ya usado", sino que lo hace Vine consultando la tabla users con la regla unique.

## Prompt 7

**Modelo:** Opus 5.5 300k Medium
**Herramienta:** Cursor

```
(En modo ask)
Muéstrame en el código de la API dónde se lleva a cabo El sistema SHALL permitir iniciar sesión por la API con credenciales correctas
```

**Qué salió:** El agente indica la ruta del API con el login correcto. Muestra cómo el controlador valida, comprueba crecenciales, crea el token y serializa. Validación previa del formato del email y que haya password, pero no comprueba que sean correctos. Las credenciales se verifican con verifyCredentials, lo que devuelve el usuario y se crea un access token y serializa responde con 200.

## Prompt 8

**Modelo:** Opus 5.5 300k Medium
**Herramienta:** Cursor

```
(En modo ask)
Hemos revisado tres requerimientos. ¿hay incoherencias que hayas detectado entre estos tres requerimientos en código vs la documentación que generamos en docs/spec-viva/cp.md ?
```

**Qué salió:** El agente muestra lo que él considera inconsistencias o tensiones entre la descripción de un requisito y los escenarios. Algunos casos se trata de omisiones en la descripción vs lo observado en el código y otras veces la redacción está en positivo cuando sugiere que sea negativo (rechazo).

## Prompt 9

**Modelo:** Opus 5.5 300k Medium
**Herramienta:** Cursor

```
(En modo ask)
Enséñame en código del API dónde está implementado el Requirement: El sistema SHALL rechazar inicios de sesión inválidos
```

**Qué salió:** El agente indica que el rechazo ocurre en el mismo endpoint de login (muestra el código), en dos puntos distintos de AccessTokensController.store. Puede fallar tanto la validación de correo electrónico como las credenciales incorrectas. El email es case sensitive.

## Prompt 10

**Modelo:** Opus 5.5 300k Medium
**Herramienta:** Cursor

```
(En modo ask)
Muestrame en codigo dónde se implementa en el API Requirement: El sistema SHALL exponer el perfil de la persona autenticada
```

**Qué salió:** El agente muestra en el código en qué ruta entra, grupo con middleware auth. Muestra el controlador que toma el usuario autenticado, lo transforma y lo envuelve en data y los campos de la respuesta. También indica el rechazo en caso que no haya token o sea inválido.

## Prompt 11

**Modelo:** Opus 5.5 300k Medium
**Herramienta:** Cursor

```
(En modo ask)
Muestrame en código donde se implementa en el API Requirement: El sistema SHALL permitir cerrar sesión y revocar el token actual
```

**Qué salió:** El agente muestra en el código en qué ruta entra, donde se exige el Bearer válido, y también la revocación del token actual. Muestra el proveedor de tokens que está en el modelo.

## Prompt 12

**Modelo:** Opus 5.5 300k Medium
**Herramienta:** Cursor

```
(En modo ask)
cuál es la diferencia entre los requisitos:
- Requirement: El sistema SHALL mostrar el perfil de la persona autenticada
- Requirement: El sistema SHALL exponer el perfil de la persona autenticada
?
```

**Qué salió:** El agente muestra una tabla comparativa de ambos requisitos, indicando que la diferencia es la capa observada y no el dominio. Exponer = qué devuelve el backend; mostrar = qué pinta el frontend con (o a partir de) esos datos. Comparten el mismo concepto de "perfil autenticado", pero uno es petición/respuesta y el otro es UI/UX.

## Prompt 13

**Modelo:** Opus 5.5 300k Medium
**Herramienta:** Cursor

```
(En modo ask)
¿hay más requisitos como estos que estén emparejados?
```

**Qué salió:** El agente indica que el emparejamiento explícito por nombre (mismo verbo de dominio, distinta capa) solo está en el perfil, en los demás no se usa ese mismo patrón léxico, aunque sí hay pares temáticos.
