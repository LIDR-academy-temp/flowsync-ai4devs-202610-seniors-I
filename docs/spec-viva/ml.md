## Purpose

Permitir que una persona cree una cuenta, inicie y cierre sesión, y consulte su perfil, tanto a través de la API como de las pantallas de la aplicación web. La sesión se identifica mediante un token que el cliente guarda y envía en cada petición protegida.

## Requirements

### Requirement: Registro de una cuenta nueva por API

El sistema SHALL crear una cuenta y abrir una sesión cuando recibe un registro válido.

#### Scenario: Registro correcto con nombre
- **WHEN** se envía `POST /api/v1/auth/signup` con un cuerpo JSON que contiene `fullName` (texto), `email` válido no registrado, `password` de entre 8 y 32 caracteres y `passwordConfirmation` idéntica a `password`
- **THEN** la respuesta es 200 con un cuerpo `{ "data": { "user": {...}, "token": "<texto>" } }`, donde `user` incluye `id`, `fullName`, `email`, `createdAt`, `updatedAt` e `initials`, y el token sirve para autenticar peticiones posteriores

#### Scenario: Registro correcto sin nombre
- **WHEN** se envía `POST /api/v1/auth/signup` con `fullName` a `null` y el resto de campos válidos
- **THEN** la respuesta es 200 y el `user` devuelto tiene `fullName` a `null`

### Requirement: El nombre completo puede ser nulo pero la clave es obligatoria en el registro

El sistema SHALL aceptar `null` como nombre completo en el registro y SHALL rechazar un registro en el que la clave `fullName` no viaje.

#### Scenario: Registro sin la clave del nombre
- **WHEN** se envía `POST /api/v1/auth/signup` sin la clave `fullName` y con el resto de campos válidos
- **THEN** la respuesta es 422 con una lista de errores que incluye uno sobre el campo `fullName` con la regla `required`, y no se crea ninguna cuenta

### Requirement: Validación de los datos de registro

El sistema SHALL rechazar con un 422 un registro cuyos datos no cumplan las reglas de email, contraseña y confirmación, sin crear la cuenta.

#### Scenario: Email con formato inválido
- **WHEN** se envía `POST /api/v1/auth/signup` con un `email` que no es una dirección válida
- **THEN** la respuesta es 422 con un cuerpo `{ "errors": [...] }` en el que hay un error sobre `email` con la regla `email`

#### Scenario: Email demasiado largo
- **WHEN** se envía `POST /api/v1/auth/signup` con un `email` de más de 254 caracteres
- **THEN** la respuesta es 422 con un error sobre `email` con la regla `maxLength`

#### Scenario: Contraseña demasiado corta
- **WHEN** se envía `POST /api/v1/auth/signup` con un `password` de menos de 8 caracteres
- **THEN** la respuesta es 422 con un error sobre `password` con la regla `minLength`

#### Scenario: Contraseña demasiado larga
- **WHEN** se envía `POST /api/v1/auth/signup` con un `password` de más de 32 caracteres
- **THEN** la respuesta es 422 con un error sobre `password` con la regla `maxLength`

#### Scenario: Campos obligatorios ausentes
- **WHEN** se envía `POST /api/v1/auth/signup` con un cuerpo vacío
- **THEN** la respuesta es 422 con errores de la regla `required` para `fullName`, `email`, `password` y `passwordConfirmation`

### Requirement: La confirmación de contraseña debe coincidir en el registro

El sistema SHALL rechazar un registro cuya confirmación de contraseña no sea igual a la contraseña.

#### Scenario: Confirmación distinta
- **WHEN** se envía `POST /api/v1/auth/signup` con `passwordConfirmation` distinta de `password`
- **THEN** la respuesta es 422 con un error sobre `passwordConfirmation` con la regla `sameAs`, y no se crea ninguna cuenta

### Requirement: No se permite registrar un email ya existente

El sistema SHALL rechazar un registro cuyo email ya pertenezca a una cuenta existente.

#### Scenario: Email repetido
- **WHEN** se envía `POST /api/v1/auth/signup` con un `email` idéntico al de una cuenta ya creada y el resto de campos válidos
- **THEN** la respuesta es 422 con un error sobre `email` con la regla `database.unique`, y no se crea una segunda cuenta

### Requirement: Inicio de sesión por API

El sistema SHALL abrir una sesión cuando recibe un email y una contraseña que corresponden a una cuenta existente.

#### Scenario: Credenciales correctas
- **WHEN** se envía `POST /api/v1/auth/login` con `email` y `password` de una cuenta existente
- **THEN** la respuesta es 200 con un cuerpo `{ "data": { "user": {...}, "token": "<texto>" } }` con los mismos campos de usuario que en el registro

#### Scenario: Cada inicio de sesión genera un token nuevo
- **WHEN** una persona inicia sesión dos veces con las mismas credenciales y después usa el token de la primera vez en una petición protegida
- **THEN** los dos inicios devuelven tokens distintos y el token de la primera vez sigue siendo aceptado

### Requirement: Rechazo de credenciales incorrectas en el inicio de sesión

El sistema SHALL rechazar con un 400 un inicio de sesión cuyas credenciales no correspondan a una cuenta, sin revelar cuál de los dos datos falla.

#### Scenario: Contraseña incorrecta
- **WHEN** se envía `POST /api/v1/auth/login` con el email de una cuenta existente y una contraseña que no es la suya
- **THEN** la respuesta es 400 con el cuerpo `{ "errors": [{ "message": "Invalid user credentials" }] }` y no se entrega ningún token

#### Scenario: Email sin cuenta
- **WHEN** se envía `POST /api/v1/auth/login` con un email sintácticamente válido que no pertenece a ninguna cuenta
- **THEN** la respuesta es 400 con el mismo cuerpo `{ "errors": [{ "message": "Invalid user credentials" }] }`

### Requirement: Validación de los datos del inicio de sesión

El sistema SHALL rechazar con un 422 un inicio de sesión cuyo cuerpo no tenga un email con formato válido y una contraseña presente.

#### Scenario: Email con formato inválido
- **WHEN** se envía `POST /api/v1/auth/login` con un `email` que no es una dirección válida
- **THEN** la respuesta es 422 con un error sobre `email` con la regla `email`

#### Scenario: Campos ausentes
- **WHEN** se envía `POST /api/v1/auth/login` con un cuerpo vacío
- **THEN** la respuesta es 422 con errores de la regla `required` para `email` y para `password`

#### Scenario: Contraseña corta no se valida por longitud
- **WHEN** se envía `POST /api/v1/auth/login` con un email válido y un `password` de un solo carácter que no es el de la cuenta
- **THEN** la respuesta es 400 por credenciales incorrectas (no un 422 por longitud)

### Requirement: Consulta del perfil propio

El sistema SHALL devolver los datos de la cuenta a quien presente un token de sesión válido.

#### Scenario: Token válido
- **WHEN** se envía `GET /api/v1/account/profile` con la cabecera `Authorization: Bearer <token>` de una sesión vigente
- **THEN** la respuesta es 200 con `{ "data": { "id", "fullName", "email", "createdAt", "updatedAt", "initials" } }` de la cuenta dueña del token

### Requirement: Los datos del usuario no incluyen la contraseña

El sistema SHALL limitar los datos de usuario de todas sus respuestas a identificador, nombre completo, email, fechas de creación y actualización, e iniciales.

#### Scenario: Respuesta de registro, inicio de sesión o perfil
- **WHEN** se completa con éxito un registro, un inicio de sesión o una consulta de perfil
- **THEN** el usuario devuelto contiene únicamente `id`, `fullName`, `email`, `createdAt`, `updatedAt` e `initials`, sin contraseña ni ningún otro campo

### Requirement: Cálculo de las iniciales del usuario

El sistema SHALL devolver en `initials` unas iniciales en mayúsculas derivadas del nombre completo o, si no hay nombre, del email.

#### Scenario: Nombre de dos palabras
- **WHEN** la cuenta tiene `fullName` "Ada Lovelace"
- **THEN** `initials` es "AL"

#### Scenario: Nombre de más de dos palabras
- **WHEN** la cuenta tiene `fullName` "Ada Augusta Lovelace"
- **THEN** `initials` es "AA" (primera letra de las dos primeras palabras)

#### Scenario: Nombre de una sola palabra
- **WHEN** la cuenta tiene `fullName` "Ada"
- **THEN** `initials` es "AD" (las dos primeras letras)

#### Scenario: Cuenta sin nombre
- **WHEN** la cuenta tiene `fullName` a `null` y el email "ada@example.com"
- **THEN** `initials` es "AE" (primera letra de la parte anterior a la arroba y primera letra de la parte posterior)

### Requirement: Rechazo de peticiones protegidas sin sesión válida

El sistema SHALL responder 401 a las peticiones a las rutas de cuenta protegidas que no presenten un token válido.

#### Scenario: Sin cabecera de autorización
- **WHEN** se envía `GET /api/v1/account/profile` sin cabecera `Authorization`
- **THEN** la respuesta es 401 con el cuerpo `{ "errors": [{ "message": "Unauthorized access" }] }`

#### Scenario: Token inventado o malformado
- **WHEN** se envía `GET /api/v1/account/profile` con `Authorization: Bearer <texto que no es un token emitido>`
- **THEN** la respuesta es 401 con el mismo cuerpo `{ "errors": [{ "message": "Unauthorized access" }] }`

### Requirement: Cierre de sesión por API

El sistema SHALL invalidar el token con el que se hace la petición de cierre de sesión y solo ese token.

#### Scenario: Cierre correcto
- **WHEN** se envía `POST /api/v1/account/logout` con un token vigente
- **THEN** la respuesta es 200 con el cuerpo `{ "message": "Logged out successfully" }` (sin el envoltorio `data`) y ese token deja de ser aceptado

#### Scenario: Token usado tras cerrar sesión
- **WHEN** tras un cierre de sesión correcto se envía `GET /api/v1/account/profile` con el mismo token
- **THEN** la respuesta es 401 con `{ "errors": [{ "message": "Unauthorized access" }] }`

#### Scenario: Otras sesiones de la misma cuenta
- **WHEN** una cuenta tiene dos tokens vigentes y se cierra sesión con uno de ellos
- **THEN** el otro token sigue siendo aceptado en `GET /api/v1/account/profile`

#### Scenario: Cierre de sesión sin sesión
- **WHEN** se envía `POST /api/v1/account/logout` sin token válido
- **THEN** la respuesta es 401 con `{ "errors": [{ "message": "Unauthorized access" }] }`

### Requirement: Las respuestas de error de la API son siempre JSON

El sistema SHALL responder en JSON a las peticiones de cuentas y acceso independientemente de la cabecera `Accept` que envíe el cliente.

#### Scenario: Cliente que pide HTML
- **WHEN** se envía `POST /api/v1/auth/login` con credenciales incorrectas y la cabecera `Accept: text/html`
- **THEN** la respuesta es 400 con un cuerpo JSON `{ "errors": [{ "message": "Invalid user credentials" }] }`

### Requirement: Pantalla de registro

El sistema SHALL ofrecer en `/register` un formulario para crear una cuenta.

#### Scenario: Contenido de la pantalla
- **WHEN** una persona sin sesión abre `/register`
- **THEN** ve el título "FlowSync", la tarjeta "Crea tu cuenta" con la descripción "Regístrate para empezar a organizar el trabajo del equipo.", los campos "Nombre completo (opcional)", "Email", "Contraseña" (con la indicación "Entre 8 y 32 caracteres.") y "Repite la contraseña", el botón "Crear cuenta" y el texto "¿Ya tienes cuenta? Inicia sesión" con un enlace a `/login`

### Requirement: La confirmación de contraseña se comprueba en pantalla antes de enviar el registro

El sistema SHALL avisar en pantalla de que las contraseñas no coinciden sin llegar a enviar el registro al servidor.

#### Scenario: Contraseñas distintas
- **WHEN** una persona rellena el formulario de registro con "Contraseña" y "Repite la contraseña" distintas y pulsa "Crear cuenta"
- **THEN** aparece bajo "Repite la contraseña" el mensaje "Las contraseñas no coinciden.", no se envía ninguna petición y el resto del formulario conserva lo escrito

### Requirement: Registro desde la pantalla

El sistema SHALL crear la cuenta, abrir sesión y llevar a la persona a su perfil cuando envía un registro válido desde la pantalla.

#### Scenario: Registro con nombre
- **WHEN** una persona rellena el formulario de registro con datos válidos, incluido un nombre, y pulsa "Crear cuenta"
- **THEN** pasa a estar con sesión iniciada y ve la pantalla de perfil en `/profile` con su nombre y su email

#### Scenario: Registro sin nombre
- **WHEN** una persona deja "Nombre completo" vacío o solo con espacios, rellena el resto con datos válidos y pulsa "Crear cuenta"
- **THEN** la cuenta se crea sin nombre y en el perfil aparece "Sin nombre" en lugar del nombre

### Requirement: Errores de validación del registro en pantalla

El sistema SHALL mostrar en español los errores de validación del registro, bajo el campo afectado cuando el campo está en pantalla.

#### Scenario: Email ya registrado
- **WHEN** una persona envía el formulario de registro con un email que ya tiene cuenta
- **THEN** aparece bajo "Email" el mensaje "Ese email ya está registrado. Inicia sesión en su lugar." y no aparece aviso general en la parte superior

#### Scenario: Email con formato inválido
- **WHEN** una persona envía el registro con un email que no es una dirección válida
- **THEN** aparece bajo "Email" el mensaje "Introduce una dirección de email válida."

#### Scenario: Contraseña demasiado corta
- **WHEN** una persona envía el registro con una contraseña de menos de 8 caracteres
- **THEN** aparece bajo la contraseña el mensaje "la contraseña debe tener al menos 8 caracteres." (con inicial minúscula) y la indicación "Entre 8 y 32 caracteres." deja de verse mientras el error está presente

#### Scenario: Contraseña demasiado larga
- **WHEN** una persona envía el registro con una contraseña de más de 32 caracteres
- **THEN** aparece bajo la contraseña el mensaje "la contraseña no puede superar los 32 caracteres." (con inicial minúscula)

#### Scenario: Campos obligatorios vacíos
- **WHEN** una persona pulsa "Crear cuenta" con "Email", "Contraseña" y "Repite la contraseña" vacíos
- **THEN** no se bloquea el envío por validación del navegador y, tras la respuesta del servidor, aparecen bajo cada campo vacío los mensajes "Falta rellenar el email.", "Falta rellenar la contraseña." y "Falta rellenar la confirmación de la contraseña."

### Requirement: Pantalla de inicio de sesión

El sistema SHALL ofrecer en `/login` un formulario para entrar con email y contraseña.

#### Scenario: Contenido de la pantalla
- **WHEN** una persona sin sesión abre `/login`
- **THEN** ve el título "FlowSync", la tarjeta "Inicia sesión" con la descripción "Entra con tu cuenta para volver a tus tareas.", los campos "Email" y "Contraseña", el botón "Entrar" y el texto "¿Aún no tienes cuenta? Crea una" con un enlace a `/register`

### Requirement: Inicio de sesión desde la pantalla

El sistema SHALL abrir sesión y llevar a la persona a su perfil cuando envía credenciales correctas desde la pantalla.

#### Scenario: Credenciales correctas
- **WHEN** una persona escribe el email y la contraseña de una cuenta existente en `/login` y pulsa "Entrar"
- **THEN** pasa a estar con sesión iniciada y ve la pantalla de perfil en `/profile`

### Requirement: Credenciales incorrectas en la pantalla de inicio de sesión

El sistema SHALL mostrar un aviso general, sin marcar ningún campo, cuando las credenciales no son correctas.

#### Scenario: Contraseña o email equivocados
- **WHEN** una persona pulsa "Entrar" con un email y una contraseña que no corresponden a una cuenta
- **THEN** aparece sobre el formulario el aviso "El email o la contraseña no son correctos.", ningún campo se marca con error y la persona permanece en `/login` con lo escrito conservado

### Requirement: Errores de validación del inicio de sesión en pantalla

El sistema SHALL mostrar bajo cada campo los errores de validación del inicio de sesión.

#### Scenario: Campos vacíos
- **WHEN** una persona pulsa "Entrar" con "Email" y "Contraseña" vacíos
- **THEN** no se bloquea el envío por validación del navegador y aparecen bajo los campos los mensajes "Falta rellenar el email." y "Falta rellenar la contraseña." sin aviso general

#### Scenario: Email con formato inválido
- **WHEN** una persona pulsa "Entrar" con un email que no es una dirección válida
- **THEN** aparece bajo "Email" el mensaje "Introduce una dirección de email válida."

### Requirement: Fallos de conexión y errores del servidor en los formularios de acceso

El sistema SHALL mostrar un aviso general cuando el servidor no responde o falla de forma inesperada al registrarse o iniciar sesión.

#### Scenario: Servidor inalcanzable
- **WHEN** una persona envía el formulario de registro o de inicio de sesión y no se puede contactar con el servidor
- **THEN** aparece el aviso "No se pudo conectar con el servidor. Comprueba que el backend está arrancado." y la persona permanece en la pantalla

#### Scenario: Error interno del servidor
- **WHEN** una persona envía el formulario y el servidor responde con un error que no es de validación ni de credenciales
- **THEN** aparece el aviso "Algo ha ido mal en el servidor. Inténtalo de nuevo en un momento."

### Requirement: Estado de envío de los formularios de acceso

El sistema SHALL impedir envíos repetidos y mostrar que hay una operación en curso mientras se procesa el formulario.

#### Scenario: Envío en curso
- **WHEN** una persona pulsa "Entrar" o "Crear cuenta" y la respuesta aún no ha llegado
- **THEN** el botón queda deshabilitado y muestra "Entrando…" o "Creando cuenta…" respectivamente, y los errores anteriores del formulario desaparecen

### Requirement: Restauración de la sesión al abrir la aplicación

El sistema SHALL recordar la sesión entre visitas guardando el token en el navegador y comprobarlo contra el servidor al cargar la aplicación.

#### Scenario: Token guardado y vigente
- **WHEN** una persona con un token guardado y vigente abre o recarga la aplicación
- **THEN** ve brevemente un indicador de carga y después la pantalla en la que estaba (por ejemplo `/profile`) con su sesión iniciada, sin pasar por `/login`

#### Scenario: Sin token guardado
- **WHEN** una persona sin token guardado abre `/profile`
- **THEN** es llevada a `/login` sin indicador de carga previo

#### Scenario: Token guardado rechazado por el servidor
- **WHEN** una persona abre la aplicación con un token guardado que el servidor rechaza con 401
- **THEN** el token se elimina del navegador, es llevada a `/login` y ve en el aviso general "Tu sesión ha caducado. Vuelve a iniciar sesión."

#### Scenario: Servidor caído al restaurar la sesión
- **WHEN** una persona abre la aplicación con un token guardado y no se puede contactar con el servidor
- **THEN** es llevada a `/login` con el aviso "No se pudo conectar con el servidor. Comprueba que el backend está arrancado.", el token se conserva en el navegador y al recargar con el servidor disponible vuelve a tener la sesión iniciada

#### Scenario: Error del servidor al restaurar la sesión
- **WHEN** una persona abre la aplicación con un token guardado y el servidor responde con un error distinto de 401
- **THEN** es llevada a `/login` con el aviso "Algo ha ido mal en el servidor. Inténtalo de nuevo en un momento." y el token se conserva en el navegador

### Requirement: El aviso de sesión perdida es propio de la pantalla de inicio de sesión

El sistema SHALL mostrar el motivo de una sesión perdida en `/login` hasta que haya un nuevo inicio de sesión o un cierre de sesión, dejando que prevalezca el error del intento en curso.

#### Scenario: Aviso persistente
- **WHEN** una persona ha sido llevada a `/login` por una sesión caducada y todavía no ha enviado el formulario
- **THEN** el aviso de sesión caducada permanece visible sobre el formulario

#### Scenario: Aviso sustituido por el error del intento
- **WHEN** esa persona pulsa "Entrar" con credenciales incorrectas
- **THEN** el aviso general pasa a ser "El email o la contraseña no son correctos." en lugar del de sesión caducada

#### Scenario: Aviso ausente en el registro
- **WHEN** una persona con un aviso de sesión caducada visible en `/login` navega a `/register`
- **THEN** la pantalla de registro no muestra ese aviso

#### Scenario: Aviso eliminado al iniciar sesión
- **WHEN** esa persona inicia sesión con credenciales correctas y más tarde cierra sesión
- **THEN** al volver a `/login` no aparece ningún aviso de sesión caducada

### Requirement: Pantalla de perfil

El sistema SHALL mostrar en `/profile` los datos de la cuenta con sesión iniciada.

#### Scenario: Cuenta con nombre
- **WHEN** una persona con sesión iniciada y nombre "Ada Lovelace" abre `/profile`
- **THEN** ve un círculo con sus iniciales ("AL"), su nombre, su email, la etiqueta "Miembro desde" con la fecha de creación de la cuenta en formato largo en castellano de España (por ejemplo "3 de noviembre de 2026") y el botón "Cerrar sesión"

#### Scenario: Cuenta sin nombre
- **WHEN** una persona con sesión iniciada y sin nombre abre `/profile`
- **THEN** ve "Sin nombre" donde iría el nombre, y las iniciales calculadas a partir de su email

### Requirement: Cierre de sesión desde la pantalla

El sistema SHALL cerrar la sesión de inmediato y llevar a la persona a `/login` cuando pulsa "Cerrar sesión".

#### Scenario: Cierre correcto
- **WHEN** una persona con sesión iniciada pulsa "Cerrar sesión" en `/profile`
- **THEN** el botón se deshabilita mostrando "Cerrando sesión…", el token se elimina del navegador, el token deja de ser válido en el servidor y la persona es llevada a `/login` sin aviso de error

#### Scenario: El servidor falla al cerrar sesión
- **WHEN** una persona pulsa "Cerrar sesión" y la petición al servidor falla o es rechazada
- **THEN** la sesión se cierra igualmente en el navegador, el token se elimina y la persona es llevada a `/login` sin aviso de error

#### Scenario: Tras cerrar sesión no se puede volver al perfil
- **WHEN** una persona que acaba de cerrar sesión abre `/profile`
- **THEN** es llevada a `/login`

### Requirement: Protección de las pantallas que exigen sesión

El sistema SHALL llevar a `/login` a quien intente abrir una pantalla protegida sin sesión iniciada.

#### Scenario: Acceso directo al perfil sin sesión
- **WHEN** una persona sin sesión escribe `/profile` en el navegador
- **THEN** es llevada a `/login` y la entrada de `/profile` no queda en el historial (volver atrás no regresa a `/profile`)

#### Scenario: Comprobación en curso
- **WHEN** se abre `/profile` con un token guardado cuya validez el servidor aún no ha confirmado
- **THEN** se muestra un indicador de carga a pantalla completa (con el texto "Cargando…" accesible para lectores de pantalla) y no se redirige hasta tener la respuesta

### Requirement: Las pantallas de acceso no se muestran a quien ya tiene sesión

El sistema SHALL llevar al perfil a quien abra `/login` o `/register` con la sesión iniciada.

#### Scenario: Sesión iniciada abre el login
- **WHEN** una persona con sesión iniciada abre `/login` o `/register`
- **THEN** es llevada a `/profile`

#### Scenario: Comprobación en curso en una pantalla de acceso
- **WHEN** se abre `/login` con un token guardado cuya validez aún no se ha confirmado
- **THEN** se muestra el indicador de carga a pantalla completa en lugar del formulario hasta tener la respuesta

### Requirement: Direcciones desconocidas

El sistema SHALL redirigir cualquier dirección de la aplicación que no sea `/login`, `/register` o `/profile` hacia `/profile`.

#### Scenario: Dirección inexistente con sesión
- **WHEN** una persona con sesión iniciada abre, por ejemplo, `/` o `/cualquier-cosa`
- **THEN** es llevada a `/profile`

#### Scenario: Dirección inexistente sin sesión
- **WHEN** una persona sin sesión abre, por ejemplo, `/` o `/cualquier-cosa`
- **THEN** es llevada a `/profile` y de ahí a `/login`

### Requirement: Navegación entre registro e inicio de sesión

El sistema SHALL permitir pasar de una pantalla de acceso a la otra mediante un enlace.

#### Scenario: Del login al registro
- **WHEN** una persona sin sesión pulsa "Crea una" en `/login`
- **THEN** se muestra la pantalla de registro en `/register`

#### Scenario: Del registro al login
- **WHEN** una persona sin sesión pulsa "Inicia sesión" en `/register`
- **THEN** se muestra la pantalla de inicio de sesión en `/login`

## PARTE B: 

1. Requisitos escritos por el agente: 32. Scenarios: 69.
Requisitos que comprobé yo abriendo el código y la consola del navegador usando la aplicacion: 8
2. Incoherencias: una línea cada una, con DÓNDE se ve.
No se recibe en el backend passwordConfirmation (en user.ts no se lee)
Dudas e incoherencias escritas por el agente (no verificadas por mi ya que se me ocurrio verificarlas luego del tiempo permitido):
```
1. Iniciales sin nombre: ada@example.com da "AE" (local + dominio), no "AD" como con un nombre de una palabra.
2. Iniciales con 3+ palabras o doble espacio: usa solo las dos primeras palabras, y con doble espacio cae a las dos primeras letras.
3. Mensajes de longitud: empiezan en minúscula ("la contraseña debe tener…"), a diferencia del resto.
4. Idioma mixto: la API responde en inglés ("Invalid user credentials", "Unauthorized access") y el frontend traduce.
5. Traducción por código de estado: cualquier 400 se muestra como "email o contraseña incorrectos" y cualquier 401 como "sesión caducada".
6. Aviso de sesión perdida: solo se ve en /login, no en /register, y lo tapa el error del intento en curso.
7. Restaurar sesión con fallo no-401: el token se conserva pero la persona queda anónima en /login.
8. Contraseña en login vs. registro: el login solo exige que exista (1 carácter da 400), el registro exige 8–32.
9. fullName en el registro: puede ser null pero la clave es obligatoria. No verifiqué qué pasa con "".
10. Validación del navegador desactivada: los campos vacíos se rechazan en el servidor y la longitud mínima del formulario de registro no tiene efecto.
11. Tokens: cada login suma uno nuevo sin revocar los anteriores. No vi caducidad configurada, pero no pude confirmarlo sin ejecutar.
12. Email: no verifiqué si distingue mayúsculas ni si recorta espacios, así que no lo afirmé en la spec.
13. Rutas desconocidas sin sesión: doble redirección (/cualquiera → /profile → /login) y / no tiene pantalla propia.
14. Contraseñas distintas en el registro: el frontend las comprueba antes de enviar, así que el error del backend solo se ve llamando a la API directamente.
15. Doble guardia de autenticación: un middleware silencioso global y otro estricto por grupo. No es observable y la protección real es solo el segundo.
```

3. No supe decidir si era bug o contrato: al menos una, en una frase,
No veo el mensaje de mail max length en el signup.
No hay validaciones de frontend (solo si password y passwordConfirmation no coinciden)