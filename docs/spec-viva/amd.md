# Cuentas y acceso

## Purpose

Permitir que una persona cree su cuenta en FlowSync, entre y salga con ella y consulte sus datos, de modo que solo quien tiene una sesión válida accede a lo que la requiere.

## Requirements

<!-- API: lo observable es la petición y la respuesta -->

### Requirement: Registro de una cuenta

El sistema SHALL permitir crear una cuenta con un email, una contraseña, su confirmación y el campo del nombre completo, que SHALL estar presente en la petición pero puede llegar vacío o nulo, y SHALL dejar a la persona autenticada en el mismo paso, sin un inicio de sesión aparte.

#### Scenario: Registro con nombre

- **WHEN** se envía un registro (`POST /api/v1/auth/signup`) con el nombre «Ada Lovelace», un email que no tiene cuenta, una contraseña de 10 caracteres y la misma contraseña como confirmación
- **THEN** el sistema responde con éxito con los datos públicos de la cuenta (identificador, nombre, email, fecha de alta, fecha de última actualización e iniciales «AL») y un token de acceso

#### Scenario: Registro sin nombre

- **WHEN** se envía un registro válido con el campo del nombre vacío o nulo
- **THEN** el sistema crea la cuenta y la devuelve sin nombre

#### Scenario: El token del registro ya da acceso

- **WHEN** se consulta el perfil con el token recibido al registrarse
- **THEN** el sistema responde con los datos de la cuenta recién creada

### Requirement: Validación del registro

El sistema SHALL rechazar con `422` el registro, sin crear ninguna cuenta, cuando falta el email, la contraseña, la confirmación o el campo del nombre, cuando el email no tiene formato de email o ya tiene cuenta, cuando la contraseña tiene menos de 8 o más de 32 caracteres o cuando la confirmación no coincide con la contraseña, con un error asociado a cada campo que falla.

#### Scenario: Registro sin el campo del nombre

- **WHEN** se envía un registro con email, contraseña y confirmación válidos, pero sin el campo `fullName`
- **THEN** el sistema responde `422` con un error asociado a `fullName` y no crea la cuenta

#### Scenario: Email que ya tiene cuenta

- **WHEN** se envía un registro con exactamente el mismo email que una cuenta existente
- **THEN** el sistema responde `422` con un error asociado a `email` y no crea una segunda cuenta

#### Scenario: Email sin formato de email

- **WHEN** se envía un registro con el email «foo»
- **THEN** el sistema responde `422` con un error asociado a `email`

#### Scenario: Contraseña de 7 caracteres

- **WHEN** se envía un registro con una contraseña de 7 caracteres, repetida igual en la confirmación
- **THEN** el sistema responde `422` con un error asociado a `password` y no crea la cuenta

#### Scenario: Contraseña de 32 caracteres

- **WHEN** se envía un registro con una contraseña de exactamente 32 caracteres, repetida igual en la confirmación
- **THEN** el sistema crea la cuenta

#### Scenario: Contraseña de 33 caracteres

- **WHEN** se envía un registro con una contraseña de 33 caracteres, repetida igual en la confirmación
- **THEN** el sistema responde `422` con un error asociado a `password` y no crea la cuenta

#### Scenario: Confirmación distinta

- **WHEN** se envía un registro cuya confirmación no coincide con la contraseña
- **THEN** el sistema responde `422` con un error asociado a `passwordConfirmation`

### Requirement: Inicio de sesión

El sistema SHALL permitir iniciar sesión con el email y la contraseña de una cuenta y SHALL devolver los datos públicos de la cuenta con un token de acceso nuevo.

#### Scenario: Credenciales correctas

- **WHEN** se envía un inicio de sesión (`POST /api/v1/auth/login`) con el email y la contraseña de una cuenta
- **THEN** el sistema responde con éxito con los datos públicos de la cuenta y un token de acceso

### Requirement: Credenciales incorrectas

El sistema SHALL rechazar con `400` un inicio de sesión cuyas credenciales no corresponden a ninguna cuenta, y SHALL NOT entregar ningún token. El rechazo del inicio de sesión SHALL ser el mismo tanto si el email no tiene cuenta como si la contraseña es incorrecta; esta regla se limita al inicio de sesión y no impide que otras operaciones revelen si un email tiene cuenta.

#### Scenario: Contraseña incorrecta

- **WHEN** se envía un inicio de sesión con el email de una cuenta y una contraseña que no es la suya
- **THEN** el sistema responde `400` con un error genérico de credenciales y sin token

#### Scenario: Email sin cuenta

- **WHEN** se envía un inicio de sesión con un email que no tiene cuenta
- **THEN** el sistema responde exactamente lo mismo que ante una contraseña incorrecta

### Requirement: Validación del inicio de sesión

El sistema SHALL responder `422`, con un error asociado a cada campo que falla y antes de comprobar las credenciales, cuando falta el email o la contraseña o cuando el email no tiene formato de email.

#### Scenario: Campos vacíos

- **WHEN** se envía un inicio de sesión con el email y la contraseña vacíos
- **THEN** el sistema responde `422` con un error asociado a `email` y otro asociado a `password`

#### Scenario: Email sin formato de email

- **WHEN** se envía un inicio de sesión con el email «foo»
- **THEN** el sistema responde `422` con un error asociado a `email`

### Requirement: Consulta del perfil

El sistema SHALL devolver los datos públicos de la cuenta a quien presente un token de acceso válido de esa cuenta.

#### Scenario: Perfil con token válido

- **WHEN** se consulta el perfil (`GET /api/v1/account/profile`) con un token de acceso válido
- **THEN** el sistema responde con éxito con el identificador, el nombre, el email, la fecha de alta, la fecha de última actualización y las iniciales de la cuenta

### Requirement: Operaciones que exigen sesión

El sistema SHALL responder `401`, sin devolver ningún dato de cuenta, a la consulta del perfil y al cierre de sesión cuando la petición no lleva un token de acceso válido.

#### Scenario: Sin token

- **WHEN** se consulta el perfil sin token
- **THEN** el sistema responde `401`

#### Scenario: Token que el sistema no emitió

- **WHEN** se consulta el perfil con un token inventado
- **THEN** el sistema responde `401`

#### Scenario: Token de una sesión cerrada

- **WHEN** se consulta el perfil o se cierra la sesión con un token cuya sesión ya se cerró
- **THEN** el sistema responde `401`

### Requirement: Cierre de sesión

El sistema SHALL invalidar el token con el que se cierra la sesión.

#### Scenario: Cerrar la sesión

- **WHEN** se cierra la sesión (`POST /api/v1/account/logout`) con un token válido
- **THEN** el sistema responde con éxito y, desde ese momento, ese token recibe `401`

### Requirement: La contraseña nunca sale del sistema

El sistema SHALL NOT incluir la contraseña, en ninguna forma, en ninguna respuesta.

#### Scenario: Registro, inicio de sesión y perfil

- **WHEN** una cuenta se registra, inicia sesión y consulta su perfil
- **THEN** ninguna de las tres respuestas contiene la contraseña ni ningún valor derivado de ella

### Requirement: Forma de las respuestas

Las respuestas correctas de registro, inicio de sesión y perfil SHALL entregar su contenido dentro de un campo `data`. Las respuestas de error de validación (`422`) SHALL entregar una lista `errors` en la que cada elemento indica el campo afectado y la regla que incumple.

#### Scenario: Respuesta correcta

- **WHEN** un registro, un inicio de sesión o una consulta del perfil van bien
- **THEN** el contenido de la respuesta viene dentro de `data`

#### Scenario: Error de validación

- **WHEN** un registro falla porque el email ya tiene cuenta
- **THEN** la respuesta trae `errors` con un elemento que indica el campo `email` y la regla que incumple

<!-- Pantalla: lo observable es lo que una persona ve y puede hacer -->

### Requirement: Pantalla de registro

La pantalla de registro SHALL pedir el nombre completo, marcado como opcional, el email, la contraseña y su repetición; SHALL indicar que la contraseña debe tener entre 8 y 32 caracteres; SHALL ofrecer el paso al inicio de sesión; y, si el registro va bien, SHALL llevar a la persona a su perfil con la sesión ya iniciada.

#### Scenario: Registro correcto

- **WHEN** una persona sin sesión rellena el registro con datos válidos y pulsa «Crear cuenta»
- **THEN** ve su perfil sin haber tenido que iniciar sesión

#### Scenario: Contraseñas que no coinciden

- **WHEN** la contraseña y su repetición no coinciden y la persona pulsa «Crear cuenta»
- **THEN** ve «Las contraseñas no coinciden.» bajo la repetición de la contraseña, y no se envía nada al servidor

#### Scenario: Email que ya tiene cuenta

- **WHEN** la persona intenta registrarse con un email que ya tiene cuenta
- **THEN** ve «Ese email ya está registrado. Inicia sesión en su lugar.» bajo el email

#### Scenario: Contraseña demasiado corta

- **WHEN** la persona intenta registrarse con una contraseña de 7 caracteres, repetida igual
- **THEN** ve bajo la contraseña un error que indica que debe tener al menos 8 caracteres

#### Scenario: Envío en curso

- **WHEN** la persona pulsa «Crear cuenta» y el servidor todavía no ha respondido
- **THEN** el botón aparece desactivado con el texto «Creando cuenta…»

### Requirement: Pantalla de inicio de sesión

La pantalla de inicio de sesión SHALL pedir email y contraseña, SHALL ofrecer el paso al registro y, si las credenciales son correctas, SHALL llevar a la persona a su perfil. Los errores de un campo SHALL mostrarse bajo ese campo, y los demás en un aviso sobre el formulario.

#### Scenario: Credenciales correctas

- **WHEN** una persona sin sesión introduce el email y la contraseña de su cuenta y pulsa «Entrar»
- **THEN** ve su perfil

#### Scenario: Credenciales incorrectas

- **WHEN** la persona introduce una contraseña que no es la de su cuenta y pulsa «Entrar»
- **THEN** ve el aviso «El email o la contraseña no son correctos.» y sigue en la pantalla de inicio de sesión

#### Scenario: Campos vacíos

- **WHEN** la persona pulsa «Entrar» sin rellenar nada
- **THEN** ve «Falta rellenar el email.» bajo el email y «Falta rellenar la contraseña.» bajo la contraseña

#### Scenario: Servidor inaccesible

- **WHEN** la persona pulsa «Entrar» y el servidor no responde
- **THEN** ve el aviso «No se pudo conectar con el servidor. Comprueba que el backend está arrancado.»

#### Scenario: Envío en curso

- **WHEN** la persona pulsa «Entrar» y el servidor todavía no ha respondido
- **THEN** el botón aparece desactivado con el texto «Entrando…»

### Requirement: Pantallas que exigen sesión

Sin una sesión iniciada, la aplicación SHALL NOT mostrar el perfil: cualquier dirección que no sea el inicio de sesión o el registro SHALL llevar a la pantalla de inicio de sesión.

#### Scenario: Perfil sin sesión

- **WHEN** una persona sin sesión abre la dirección del perfil
- **THEN** ve la pantalla de inicio de sesión

#### Scenario: Dirección desconocida sin sesión

- **WHEN** una persona sin sesión abre una dirección que no existe en la aplicación
- **THEN** ve la pantalla de inicio de sesión

#### Scenario: Volver atrás tras cerrar sesión

- **WHEN** una persona cierra sesión y pulsa «atrás» en el navegador
- **THEN** ve la pantalla de inicio de sesión, no su perfil

### Requirement: Pantallas solo para quien no tiene sesión

Con una sesión iniciada, la aplicación SHALL llevar al perfil a quien abra el inicio de sesión, el registro o una dirección desconocida.

#### Scenario: Inicio de sesión o registro con sesión abierta

- **WHEN** una persona con sesión abre la pantalla de inicio de sesión o la de registro
- **THEN** ve su perfil

#### Scenario: Dirección desconocida con sesión

- **WHEN** una persona con sesión abre una dirección que no existe en la aplicación
- **THEN** ve su perfil

### Requirement: La sesión sobrevive a recargas

La sesión SHALL mantenerse al recargar la página y al cerrar y volver a abrir la pestaña, sin pedir de nuevo las credenciales mientras el servidor la acepte. Mientras la aplicación comprueba una sesión guardada, SHALL mostrar un indicador de carga en lugar de cualquier pantalla.

#### Scenario: Recargar con sesión

- **WHEN** una persona con sesión recarga la página del perfil
- **THEN** ve un indicador de carga y, después, su perfil, sin introducir credenciales

#### Scenario: Cerrar y volver a abrir la pestaña

- **WHEN** una persona con sesión cierra la pestaña y vuelve a abrir la aplicación en el mismo navegador
- **THEN** sigue con la sesión iniciada

### Requirement: Sesión guardada que ya no sirve

Si al abrir la aplicación el servidor rechaza la sesión guardada, la aplicación SHALL descartarla y SHALL llevar a la persona al inicio de sesión con un aviso que le pide volver a entrar. Si el servidor no responde, SHALL llevarla al inicio de sesión con un aviso de conexión, pero SHALL conservar la sesión guardada para recuperarla en una recarga posterior.

#### Scenario: El servidor rechaza la sesión guardada

- **WHEN** una persona abre la aplicación con una sesión guardada que el servidor ya no acepta
- **THEN** ve el inicio de sesión con un aviso que le pide volver a iniciar sesión, y una recarga posterior tampoco recupera la sesión

#### Scenario: El servidor no responde al abrir

- **WHEN** una persona abre la aplicación con una sesión guardada y el servidor no responde
- **THEN** ve el inicio de sesión con el aviso «No se pudo conectar con el servidor. Comprueba que el backend está arrancado.»

#### Scenario: El servidor vuelve a responder

- **WHEN** después de ese aviso el servidor vuelve a responder y la persona recarga la página
- **THEN** ve su perfil sin introducir credenciales

### Requirement: Perfil en pantalla

La pantalla de perfil SHALL mostrar las iniciales de la persona, su nombre o «Sin nombre» si no lo tiene, su email y la fecha de alta como «Miembro desde» en formato largo en castellano, y SHALL ofrecer el botón «Cerrar sesión».

#### Scenario: Persona con nombre

- **WHEN** Ada Lovelace, que se registró el 30 de octubre de 2026, abre su perfil
- **THEN** ve las iniciales «AL», el nombre «Ada Lovelace», su email y «Miembro desde 30 de octubre de 2026»

#### Scenario: Persona sin nombre

- **WHEN** una persona que se registró sin nombre abre su perfil
- **THEN** ve «Sin nombre» en el lugar del nombre

### Requirement: Cierre de sesión en pantalla

Al pulsar «Cerrar sesión», la aplicación SHALL cerrar la sesión en ese navegador y llevar a la persona al inicio de sesión, aunque el servidor no llegue a confirmar el cierre.

#### Scenario: Cerrar sesión

- **WHEN** una persona pulsa «Cerrar sesión» en su perfil
- **THEN** ve el inicio de sesión sin ningún aviso, y una recarga posterior no recupera la sesión

#### Scenario: Cerrar sesión sin servidor

- **WHEN** una persona pulsa «Cerrar sesión» y el servidor no responde
- **THEN** ve igualmente el inicio de sesión y queda sin sesión en ese navegador

---

## Parte B

### 1. Requisitos escritos y comprobados

- Escritos por el agente: 18
- Comprobados abriendo el código: 18, todos por el agente y no por mí, y sin reloj. Los 10 de la API, leyendo el código y ejecutando cada escenario contra una copia aislada del backend. Los 8 de pantalla, solo leyendo el código, sin abrirla en el navegador.

### 2. Incoherencias que aparecieron al escribirla

- Las respuestas correctas van dentro de `data`, salvo la del cierre de sesión, que devuelve `{"message":"Logged out successfully"}` sin envoltorio y en inglés. Se ve en la respuesta de `POST /api/v1/account/logout`.
- La pantalla presenta el nombre como «(opcional)», pero la API rechaza con `422` («The fullName field must be defined») un registro que no traiga el campo; solo lo acepta si llega vacío o nulo. Se ve al registrarse por la API sin `fullName`.
- El inicio de sesión no revela si un email tiene cuenta (misma respuesta para un email desconocido y para una contraseña errónea), pero el registro sí lo revela («Ese email ya está registrado»). Se ve comparando un registro con un email existente y un inicio de sesión con uno inexistente.
- La pantalla habla de una sesión «caducada» («Tu sesión ha caducado. Vuelve a iniciar sesión.»), pero ninguna sesión caduca por tiempo: el aviso solo sale cuando el servidor rechaza una sesión guardada por otro motivo. Se ve en el inicio de sesión al abrir la aplicación con una sesión que el servidor ya no acepta.
- Todos los mensajes de error empiezan en mayúscula salvo los de longitud: «la contraseña debe tener al menos 8 caracteres.». Se ve al registrarse con una contraseña de 7 caracteres.

### 3. Lo que no supe decidir si era bug o contrato

- **¿Cuánto dura una sesión?** Una lectura: hasta que se cierra, sin límite; el token no caduca, y lo único que pide el PRD es que sobreviva a recargas y al cierre de la pestaña. La otra: dos horas; el servidor entrega una cookie de sesión que caduca a las dos horas, y la pantalla habla de sesiones «caducadas». Leyendo el código no se decide, y comprobarlo exige esperar.
- **¿«ADA@example.com» y «ada@example.com» son la misma persona?** Una lectura: sí, y es un bug que hoy se puedan crear dos cuentas que solo se diferencian en las mayúsculas, y que el inicio de sesión falle si cambias una. La otra: el sistema trata el email como texto exacto, algo que el estándar del correo admite para la parte local; normalizarlo sería cambiar el contrato, no arreglarlo.
- **Las iniciales de quien no tiene nombre.** Para «ana@example.com», el perfil muestra «AE»: la inicial del usuario y la del dominio. Una lectura: es la regla, dos letras, una de cada parte. La otra: es casualidad, porque con los nombres de una sola palabra la regla toma las dos primeras letras («Cher» da «CH»), y con ese criterio «ana@…» daría «AN».
- **¿Cerrar sesión cierra esta sesión o todas?** Cada inicio de sesión entrega un token nuevo, y cerrar sesión invalida solo el token con el que se cierra: las otras sesiones de la misma cuenta siguen vivas. Una lectura: es el contrato, cada dispositivo va por su cuenta. La otra: es lo que el sistema hace por defecto, nadie lo anuncia ni depende de ello, y quien cierra sesión puede esperar haber salido de todas partes.
