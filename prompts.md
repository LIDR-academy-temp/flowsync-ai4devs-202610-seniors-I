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
Debemos crear una matriz de trazabilidad en el archivo docs/verificacion/sh.md (ya creado) La matriz debe mapear , scenario
a scenario, si el requisito está cubierto. El requisito que vamos a trabajar es «Lo que cada tarea muestra de su
responsable» y se encuentra en el archivo specs/tasks/spec.md. Es el único requisito que vamos a trabajar. El formato debe
ser una fila por scenario y 4 columnas. Encima dos números: cuántos scenarios tiene el requisito y cuántos resultaron
cubiertos, el primero se anota al empezar, el segundo al terminar.

Para empezar necesito saber qué tests existen en backend/tests/functional/ y qué afirma cada uno, en una línea por test,
sin interpretar si cubren nada. Límite explícito: solo listar, no proponer.
```

**Qué salió:** 
```
backend/tests/functional/ tiene 4 ficheros con 20 tests en total, todos dentro de auth/.

initials.spec.ts
- un nombre de dos palabras da la inicial de cada una: el login de una cuenta con nombre «Ada Lovelace» devuelve 200 y las iniciales «AL».
- un nombre de una palabra da sus dos primeras letras: el login de una cuenta con nombre «Ada» devuelve 200 y las iniciales «AD».
- sin nombre, las iniciales salen del email: el login de una cuenta sin nombre y con email ada@example.com devuelve 200 y las iniciales «AE».

login.spec.ts
- con las credenciales correctas se emite un token que autentica: el login devuelve 200 con el email del usuario, y su token da 200 en el perfil.
- una contraseña equivocada no emite token: el login devuelve 400 y el cuerpo no trae la propiedad token.
- un email desconocido responde igual que una contraseña equivocada: los dos casos devuelven 400 con cuerpos idénticos.
- un email mal formado se rechaza antes de comprobar credenciales: el login devuelve 422 con un error en el campo email.

session.spec.ts
- el perfil devuelve la cuenta del token presentado: el perfil devuelve 200 con id, fullName, email, initials, createdAt y updatedAt, y el email coincide.
- sin cabecera de autorización no se devuelve nada de la cuenta: el perfil sin cabecera devuelve 401.
- un token inventado no abre las rutas de cuenta: el perfil con un token falso devuelve 401.
- cerrar sesión invalida el token usado: el logout devuelve 200 con el mensaje «Logged out successfully», y después ese token da 401 en el perfil.
- cerrar una sesión no cierra las demás de la misma cuenta: tras cerrar el primer token, un segundo token de la misma cuenta sigue dando 200 en el perfil.
- el registro y el login siguen siendo públicos: el registro sin autenticación devuelve 200.

signup.spec.ts
- registrarse devuelve la cuenta y un token que ya sirve: el registro devuelve 200 con email, fullName, initials «AL» y un token de tipo texto, y ese token da 200 en el perfil con el mismo email.
- una cuenta puede quedarse sin nombre: el registro con fullName nulo devuelve 200 y fullName nulo.
- la contraseña nunca sale en la respuesta: el usuario serializado no contiene «secreto123» ni la palabra «password».
- una contraseña corta se rechaza y no crea cuenta: el registro devuelve 422 con un error minLength en password, y no existe ningún usuario con ese email.
- la confirmación tiene que coincidir: el registro devuelve 422 con un error en passwordConfirmation, y no existe ningún usuario con ese email.
- un email mal formado se rechaza: el registro devuelve 422 con un error en el campo email.
- un email ya registrado no crea una segunda cuenta: el registro devuelve 422 con un error en email, sigue habiendo una sola cuenta con ese email y conserva el nombre original.
```

## Prompt 2

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
 Ahora vamos a trabajar en la matriz solo para el requisito  «Lo que cada tarea muestra de su responsable» una fila por scenario con las cuatro columnas, marcando “No lo sé” cuando un test se parezca pero no afirme lo mismo.
 El scenario, en una línea. Qué se espera y en qué situación. Si no cabe en una línea, es que estás juntando dos.

 Qué test lo cubre, con el nombre exacto que aparece en la suite. Sin el nombre concreto, la columna va vacía: "seguro que algo lo cubre" no es una fila.

 Cubierto · No cubierto · No lo sé. Los tres estados son válidos, y el tercero no es un fallo: es el resultado más informativo de los tres.

 Si pusiste "no lo sé", qué te faltó para decidirlo. Media línea. Suele ser una de dos: no encontraste dónde se comprueba, o encontraste algo que se le parece y no dice exactamente lo mismo.
 Así queda la tabla. Los dos números van encima — el primero antes de empezar (cuántos scenarios tiene el requisito), el segundo al terminar (cuántos resultaron cubiertos)
```

**Qué salió:** 
```
- Scenarios del requisito: 3
- Scenarios cubiertos: 0

┌────────────────────────────────────┬─────────────────────────────────────────────────────┬──────────┐
│              Scenario              │                Test que se le parece                │  Estado  │
├────────────────────────────────────┼─────────────────────────────────────────────────────┼──────────┤
│ Responsable identificable          │ un nombre de dos palabras da la inicial de cada una │ No lo sé │
├────────────────────────────────────┼─────────────────────────────────────────────────────┼──────────┤
│ La tarea no filtra datos de cuenta │ la contraseña nunca sale en la respuesta            │ No lo sé │
├────────────────────────────────────┼─────────────────────────────────────────────────────┼──────────┤
│ Responsable sin nombre             │ sin nombre, las iniciales salen del email           │ No lo sé │
└────────────────────────────────────┴─────────────────────────────────────────────────────┴──────────┘

- Por qué «No lo sé» y no «No cubierto»: cada scenario tiene un test de auth que se le parece. Ninguno afirma lo mismo, porque todos miran el usuario del login o del registro y no el responsable de una tarea.
- Lo que no hay: busqué y ningún test de la suite menciona tareas ni el campo del responsable.
- El segundo scenario además: el test parecido solo comprueba que no sale la contraseña. No comprueba el email.
```

## Prompt 3

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Ahora, por cada fila en No cubierto o no lo sé, escribe el test que falta — uno por scenario — siguiendo el estilo de los que ya existen en el proyecto. Sin tocar nada fuera de la
carpeta de tests. Cuando los tengas, ejecútalos. No arregles nada, si alguno sale en rojo se queda en rojo y así se entrega. El objetivo es saber qué está mal, no ocultarlo.
```

**Qué salió:** 
```
He escrito los 3 tests y los he ejecutado: 2 pasan y 1 falla. El rojo se queda como está. La lista de tareas expone el email del responsable.

┌────────────────────────────────────┬────────────────────────────────────────────────────────────────────────────────────┬───────────┐
│              Scenario              │                                        Test                                        │ Resultado │
├────────────────────────────────────┼────────────────────────────────────────────────────────────────────────────────────┼───────────┤
│ Responsable identificable          │ el responsable de una tarea trae su nombre y sus iniciales                         │ Verde     │
├────────────────────────────────────┼────────────────────────────────────────────────────────────────────────────────────┼───────────┤
│ La tarea no filtra datos de cuenta │ ni la tarea suelta ni la lista exponen el email ni datos de acceso del responsable │ Rojo      │
├────────────────────────────────────┼────────────────────────────────────────────────────────────────────────────────────┼───────────┤
│ Responsable sin nombre             │ un responsable sin nombre llega con nombre nulo y con iniciales                    │ Verde     │
└────────────────────────────────────┴────────────────────────────────────────────────────────────────────────────────────┴───────────┘

Qué falla. El test comprueba la tarea suelta y después la tarea dentro de la lista. La tarea suelta pasa. Falla en la lista, porque su responsable llega con seis campos, entre ellos el email:

AssertionError: expected { id: 1, …(5) } to not have nested property 'email'

Causa probable. No la he tocado. La tarea suelta usa task_assignee_transformer.ts, que solo devuelve id, nombre e iniciales. La lista, la creación y el cambio de estado usan task_transformer.ts, que monta el responsable con el transformer completo del usuario, con email y fechas.

Detalles
- Los tests están en backend/tests/functional/tasks/assignee.spec.ts. Siguen el estilo de los de auth: grupo con transacción global, login real para obtener el token y asserts sobre el cuerpo.
- La suite functional completa da 22 tests en verde y 1 en rojo, que es este. Lint y Prettier pasan sobre el fichero nuevo.
- Fuera de la carpeta de tests no ha cambiado nada. Eso incluye la matriz de docs/verificacion/sh.md, que sigue mostrando 0 scenarios cubiertos con los tres en «No lo sé».
- No he hecho commit ni abierto PR.
```