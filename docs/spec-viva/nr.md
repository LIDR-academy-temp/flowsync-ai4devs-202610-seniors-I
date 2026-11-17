# Spec viva: cuentas y acceso

## Purpose

Describe lo que FlowSync hace hoy en el vertical de cuentas y acceso (registro, inicio de sesión, sesión y perfil), tanto en la API como en las pantallas. Es un retrato del comportamiento actual, no una propuesta de cambio.

## Requirements

### Requirement: Registro de cuenta con datos válidos

El sistema SHALL permitir crear una cuenta con `POST /api/v1/auth/signup` y, en la misma respuesta, abrir una sesión para la cuenta recién creada. La respuesta SHALL NOT incluir la contraseña ni su versión cifrada.

#### Scenario: Registro correcto con nombre

- **WHEN** se envía `POST /api/v1/auth/signup` con `{ "fullName": "Ada Lovelace", "email": "ada@example.com", "password": "secreto123", "passwordConfirmation": "secreto123" }` y no existe ninguna cuenta con ese email
- **THEN** responde 200 con `{ "data": { "user": { "id", "fullName", "email", "createdAt", "updatedAt", "initials" }, "token": "<texto>" } }`, sin ningún campo de contraseña dentro de `user`

#### Scenario: Registro correcto sin nombre

- **WHEN** se envía `POST /api/v1/auth/signup` con `"fullName": null`, un email nuevo y válido, y contraseña y confirmación idénticas de entre 8 y 32 caracteres
- **THEN** responde 200 con la cuenta creada y `"fullName": null` dentro de `user`, y un `token` utilizable

### Requirement: Validación de los datos de registro

El sistema SHALL rechazar el registro con 422 cuando el email no sea una dirección válida o supere los 254 caracteres, cuando la contraseña tenga menos de 8 o más de 32 caracteres, cuando la confirmación no cumpla esos mismos límites o no sea idéntica a la contraseña, cuando falte la clave del nombre o cuando el email ya pertenezca a otra cuenta. El sistema SHALL NOT crear la cuenta ni devolver token en ninguno de esos casos.

#### Scenario: Email ya registrado

- **WHEN** se envía `POST /api/v1/auth/signup` con un email que ya pertenece a una cuenta existente y el resto de campos válidos
- **THEN** responde 422 con un error sobre el campo `email` cuyo mensaje es "The email has already been taken", y no se crea ninguna cuenta nueva

#### Scenario: Confirmación distinta de la contraseña

- **WHEN** se envía `POST /api/v1/auth/signup` con `password` y `passwordConfirmation` de valores diferentes
- **THEN** responde 422 con un error sobre el campo `passwordConfirmation` cuyo mensaje es "The passwordConfirmation field and password field must be the same"

#### Scenario: Contraseña fuera de rango

- **WHEN** se envía `POST /api/v1/auth/signup` con una contraseña de 7 caracteres, o de 33
- **THEN** responde 422 con un error sobre el campo `password` que indica el mínimo de 8 o el máximo de 32 caracteres

#### Scenario: Falta la clave del nombre

- **WHEN** se envía `POST /api/v1/auth/signup` sin la clave `fullName` en el cuerpo (ni siquiera con valor `null`)
- **THEN** responde 422 con un error sobre el campo `fullName` cuyo mensaje es "The fullName field must be defined"

#### Scenario: Cadena vacía tratada como ausente

- **WHEN** se envía `POST /api/v1/auth/signup` con `"fullName": ""` y el resto de campos válidos
- **THEN** responde 200 y la cuenta se crea con `"fullName": null`

### Requirement: Forma de los errores de validación

El sistema SHALL devolver los errores de validación de registro y de inicio de sesión con código 422 y un cuerpo `{ "errors": [ ... ] }`, donde cada elemento incluye `message`, `rule` y `field`, y además `meta` cuando la regla lo aporta. El sistema SHALL NOT envolver estos errores en `data`.

#### Scenario: Varios campos inválidos a la vez

- **WHEN** se envía `POST /api/v1/auth/signup` con un email mal formado y una contraseña de 3 caracteres
- **THEN** responde 422 con un `errors` que contiene un elemento para `email` (regla `email`) y otro para `password` (regla `minLength`, con `meta` que incluye el mínimo 8), sin clave `data`

### Requirement: Inicio de sesión con credenciales correctas

El sistema SHALL permitir iniciar sesión con `POST /api/v1/auth/login` y SHALL devolver un token nuevo en cada inicio de sesión correcto, sin invalidar los tokens emitidos antes.

#### Scenario: Login correcto

- **WHEN** se envía `POST /api/v1/auth/login` con `{ "email": "ada@example.com", "password": "secreto123" }` y esa cuenta existe con esa contraseña
- **THEN** responde 200 con `{ "data": { "user": { "id", "fullName", "email", "createdAt", "updatedAt", "initials" }, "token": "<texto>" } }`

#### Scenario: Dos logins consecutivos

- **WHEN** la misma cuenta inicia sesión dos veces seguidas con `POST /api/v1/auth/login`
- **THEN** cada respuesta trae un token distinto y ambos tokens siguen siendo válidos para consultar el perfil

### Requirement: Rechazo de credenciales incorrectas

El sistema SHALL responder 400 con un único error de mensaje "Invalid user credentials" cuando el email no corresponda a ninguna cuenta o la contraseña no coincida, sin distinguir entre ambos casos y sin indicar ningún campo.

#### Scenario: Contraseña equivocada

- **WHEN** se envía `POST /api/v1/auth/login` con el email de una cuenta existente y una contraseña que no es la suya
- **THEN** responde 400 con `{ "errors": [ { "message": "Invalid user credentials" } ] }`

#### Scenario: Email desconocido

- **WHEN** se envía `POST /api/v1/auth/login` con un email que no pertenece a ninguna cuenta
- **THEN** responde 400 con exactamente el mismo cuerpo que en el caso de contraseña equivocada

### Requirement: Validación de los datos de inicio de sesión

El sistema SHALL rechazar con 422 el inicio de sesión cuando falte el email o la contraseña, o cuando el email no sea una dirección válida o supere los 254 caracteres. El sistema SHALL NOT aplicar a la contraseña de login los límites de longitud del registro.

#### Scenario: Contraseña ausente

- **WHEN** se envía `POST /api/v1/auth/login` con un email válido y sin contraseña, o con la contraseña como cadena vacía
- **THEN** responde 422 con un error sobre el campo `password` cuya regla es `required`

#### Scenario: Email mal formado

- **WHEN** se envía `POST /api/v1/auth/login` con `"email": "no-es-un-email"`
- **THEN** responde 422 con un error sobre el campo `email` cuya regla es `email`

### Requirement: Consulta del perfil propio

El sistema SHALL devolver los datos de la cuenta autenticada con `GET /api/v1/account/profile`, usando el token en la cabecera `Authorization: Bearer <token>`.

#### Scenario: Perfil con token válido

- **WHEN** se envía `GET /api/v1/account/profile` con un token vigente obtenido en registro o login
- **THEN** responde 200 con `{ "data": { "id", "fullName", "email", "createdAt", "updatedAt", "initials" } }` correspondiente a la cuenta dueña del token

### Requirement: Las rutas de cuenta exigen sesión

El sistema SHALL responder 401 con `{ "errors": [ { "message": "Unauthorized access" } ] }` a cualquier petición a `GET /api/v1/account/profile` o `POST /api/v1/account/logout` que no lleve un token válido.

#### Scenario: Sin cabecera de autorización

- **WHEN** se envía `GET /api/v1/account/profile` sin cabecera `Authorization`
- **THEN** responde 401 con `{ "errors": [ { "message": "Unauthorized access" } ] }`

#### Scenario: Token inventado o revocado

- **WHEN** se envía `GET /api/v1/account/profile` con `Authorization: Bearer` seguido de un valor que no corresponde a ningún token vigente
- **THEN** responde 401 con `{ "errors": [ { "message": "Unauthorized access" } ] }`

### Requirement: Cierre de sesión en la API

El sistema SHALL revocar únicamente el token con el que se hace la petición a `POST /api/v1/account/logout` y SHALL confirmarlo con un mensaje. Los demás tokens de la misma cuenta SHALL permanecer válidos.

#### Scenario: Logout correcto

- **WHEN** se envía `POST /api/v1/account/logout` con un token vigente
- **THEN** responde 200 con `{ "message": "Logged out successfully" }` (sin envoltorio `data`) y ese token deja de servir: una petición posterior a `GET /api/v1/account/profile` con él responde 401

#### Scenario: Logout con otro token activo

- **WHEN** una cuenta tiene dos tokens vigentes y se cierra sesión con uno de ellos
- **THEN** el otro token sigue devolviendo 200 en `GET /api/v1/account/profile`

### Requirement: Iniciales del usuario

El sistema SHALL incluir en cada representación de usuario un campo `initials` en mayúsculas, calculado a partir del nombre completo si existe: la inicial de las dos primeras palabras separadas por un espacio o, si el nombre es de una sola palabra, sus dos primeras letras. Si la cuenta no tiene nombre, el sistema SHALL calcularlo a partir del email, tomando la primera letra de la parte anterior a la arroba y la primera letra de la parte posterior.

#### Scenario: Nombre de dos palabras

- **WHEN** se devuelve un usuario con `fullName` "Ada Lovelace"
- **THEN** `initials` vale "AL"

#### Scenario: Nombre de una sola palabra

- **WHEN** se devuelve un usuario con `fullName` "Ada"
- **THEN** `initials` vale "AD"

#### Scenario: Cuenta sin nombre

- **WHEN** se devuelve un usuario con `fullName` nulo y email "nuria@flowsync.io"
- **THEN** `initials` vale "NF"

### Requirement: Respuestas siempre en JSON

El sistema SHALL responder en JSON a las peticiones de cuentas y acceso aunque el cliente no envíe la cabecera `Accept: application/json` o envíe otra distinta.

#### Scenario: Petición sin Accept

- **WHEN** se envía `GET /api/v1/account/profile` sin token y sin cabecera `Accept`
- **THEN** responde 401 con cuerpo JSON `{ "errors": [ { "message": "Unauthorized access" } ] }`

### Requirement: Acceso a pantallas según el estado de sesión

El sistema SHALL mostrar las pantallas `/login` y `/register` solo a personas sin sesión, y la pantalla `/profile` solo a personas con sesión. Cualquier otra dirección SHALL redirigir a `/profile`. Mientras se comprueba si una sesión guardada sigue siendo válida, el sistema SHALL mostrar un indicador de carga a pantalla completa (accesible como "Cargando…") y SHALL NOT redirigir.

#### Scenario: Persona sin sesión entra en el perfil

- **WHEN** una persona sin sesión abre `/profile`
- **THEN** es redirigida a `/login` sin añadir una entrada nueva al historial del navegador

#### Scenario: Persona con sesión entra en login o registro

- **WHEN** una persona con sesión abre `/login` o `/register`
- **THEN** es redirigida a `/profile`

#### Scenario: Dirección desconocida

- **WHEN** cualquier persona abre una dirección distinta de `/login`, `/register` y `/profile`, como `/` o `/xyz`
- **THEN** es redirigida a `/profile` y, si no tiene sesión, de ahí a `/login`

#### Scenario: Recarga con sesión guardada

- **WHEN** una persona con una sesión guardada recarga la página en `/profile` y la comprobación contra el servidor aún no ha terminado
- **THEN** ve el indicador de carga y no es redirigida a `/login`

### Requirement: Pantalla de registro

El sistema SHALL mostrar en `/register` el encabezado "FlowSync", el título "Crea tu cuenta", la descripción "Regístrate para empezar a organizar el trabajo del equipo.", cuatro campos (Nombre completo marcado "(opcional)", Email, Contraseña con la ayuda "Entre 8 y 32 caracteres." y "Repite la contraseña"), el botón "Crear cuenta" y un enlace "Inicia sesión" bajo el texto "¿Ya tienes cuenta?" que lleva a `/login`.

#### Scenario: Persona abre el registro

- **WHEN** una persona sin sesión abre `/register`
- **THEN** ve los cuatro campos vacíos, la ayuda "Entre 8 y 32 caracteres." bajo la contraseña, el botón "Crear cuenta" y el enlace "Inicia sesión"

#### Scenario: Persona prefiere iniciar sesión

- **WHEN** una persona en `/register` pulsa el enlace "Inicia sesión"
- **THEN** pasa a la pantalla `/login`

### Requirement: Envío del formulario de registro

El sistema SHALL comprobar en pantalla, antes de llamar al servidor, que la contraseña y su repetición coinciden. Si coinciden, SHALL enviar el registro con el nombre sin espacios sobrantes en los extremos, enviando nulo cuando quede vacío, y SHALL abrir la sesión y llevar a `/profile` si el servidor lo acepta. Si el servidor rechaza el registro, el sistema SHALL mostrar cada error de campo bajo su campo, en castellano.

#### Scenario: Las contraseñas no coinciden

- **WHEN** una persona rellena el registro con "secreto123" y "secreto124" en los dos campos de contraseña y pulsa "Crear cuenta"
- **THEN** ve bajo "Repite la contraseña" el mensaje "Las contraseñas no coinciden." y no se envía ninguna petición al servidor

#### Scenario: Registro con éxito

- **WHEN** una persona rellena el registro con un email nuevo y contraseñas válidas e idénticas y pulsa "Crear cuenta"
- **THEN** queda con la sesión iniciada y ve la pantalla `/profile` con sus datos

#### Scenario: Registro sin nombre

- **WHEN** una persona deja vacío el nombre (o solo con espacios) y envía el registro con el resto de datos válidos
- **THEN** la cuenta se crea y el perfil muestra el nombre como "Sin nombre"

#### Scenario: Email ya registrado

- **WHEN** una persona envía el registro con un email que ya tiene cuenta
- **THEN** ve bajo el campo Email el mensaje "Ese email ya está registrado. Inicia sesión en su lugar." y no aparece ningún aviso general rojo

#### Scenario: Contraseña demasiado corta

- **WHEN** una persona envía el registro con una contraseña de 5 caracteres y confirmación idéntica
- **THEN** ve bajo el campo de contraseña un mensaje que indica que la contraseña debe tener al menos 8 caracteres, que sustituye a la ayuda "Entre 8 y 32 caracteres."

### Requirement: Pantalla de inicio de sesión

El sistema SHALL mostrar en `/login` el encabezado "FlowSync", el título "Inicia sesión", la descripción "Entra con tu cuenta para volver a tus tareas.", los campos Email y Contraseña, el botón "Entrar" y un enlace "Crea una" bajo el texto "¿Aún no tienes cuenta?" que lleva a `/register`.

#### Scenario: Persona abre el login

- **WHEN** una persona sin sesión abre `/login`
- **THEN** ve los campos Email y Contraseña vacíos, el botón "Entrar" y el enlace "Crea una"

#### Scenario: Persona prefiere registrarse

- **WHEN** una persona en `/login` pulsa el enlace "Crea una"
- **THEN** pasa a la pantalla `/register`

### Requirement: Envío del formulario de inicio de sesión

El sistema SHALL enviar el email y la contraseña tal como se han escrito, sin que el navegador valide los campos antes. Si el servidor acepta las credenciales, el sistema SHALL abrir la sesión y llevar a `/profile`. Si las rechaza, el sistema SHALL mostrar el motivo en castellano: un aviso general rojo cuando las credenciales son incorrectas y un mensaje bajo cada campo cuando la validación del servidor lo señala.

#### Scenario: Login con éxito

- **WHEN** una persona escribe un email y una contraseña correctos y pulsa "Entrar"
- **THEN** queda con la sesión iniciada y ve la pantalla `/profile`

#### Scenario: Credenciales incorrectas

- **WHEN** una persona escribe un email o una contraseña que no corresponden a ninguna cuenta y pulsa "Entrar"
- **THEN** ve en un aviso rojo sobre el formulario el texto "El email o la contraseña no son correctos." y permanece en `/login`

#### Scenario: Campos vacíos

- **WHEN** una persona pulsa "Entrar" con el email y la contraseña vacíos
- **THEN** ve bajo Email el mensaje "Falta rellenar el email." y bajo Contraseña el mensaje "Falta rellenar la contraseña."

#### Scenario: Email mal escrito

- **WHEN** una persona escribe "ada" en Email, una contraseña cualquiera, y pulsa "Entrar"
- **THEN** ve bajo Email el mensaje "Introduce una dirección de email válida."

### Requirement: Estado de envío de los formularios

El sistema SHALL deshabilitar el botón de envío mientras la petición está en curso, cambiando su texto a "Creando cuenta…" en el registro y a "Entrando…" en el login, y SHALL limpiar los errores anteriores al iniciar cada envío.

#### Scenario: Envío en curso

- **WHEN** una persona pulsa "Entrar" y el servidor aún no ha respondido
- **THEN** el botón aparece deshabilitado con el texto "Entrando…" y desaparecen los errores del intento anterior

#### Scenario: Envío fallido

- **WHEN** el servidor rechaza el envío
- **THEN** el botón vuelve a estar habilitado con su texto original ("Entrar" o "Crear cuenta")

### Requirement: Restauración de la sesión al recargar

El sistema SHALL conservar la sesión entre recargas y visitas, y SHALL validarla contra el servidor al arrancar antes de darla por buena. Si el servidor rechaza el token, el sistema SHALL descartarlo para siempre y SHALL explicar el motivo en la pantalla de login. Si la comprobación falla por otro motivo (servidor caído, error del servidor), el sistema SHALL dejar a la persona sin sesión en pantalla, SHALL explicar el motivo en la pantalla de login y SHALL NOT descartar el token guardado.

#### Scenario: Sesión guardada todavía válida

- **WHEN** una persona con sesión guardada abre o recarga la aplicación y el servidor reconoce su token
- **THEN** ve su perfil en `/profile` sin tener que volver a iniciar sesión

#### Scenario: Token rechazado

- **WHEN** una persona con sesión guardada abre la aplicación y el servidor responde 401 a la comprobación
- **THEN** es llevada a `/login`, ve el aviso rojo "Tu sesión ha caducado. Vuelve a iniciar sesión." y al recargar de nuevo ya no hay sesión guardada

#### Scenario: Servidor inaccesible

- **WHEN** una persona con sesión guardada abre la aplicación y el servidor no responde
- **THEN** es llevada a `/login` y ve el aviso rojo "No se pudo conectar con el servidor. Comprueba que el backend está arrancado."; al recargar con el servidor ya disponible recupera su sesión

### Requirement: Pantalla de perfil

El sistema SHALL mostrar en `/profile` un círculo con las iniciales de la persona, su nombre completo (o "Sin nombre" si no tiene), su email, la fila "Miembro desde" con la fecha de alta en formato largo en castellano de España (por ejemplo, "9 de noviembre de 2026") y el botón "Cerrar sesión".

#### Scenario: Perfil con nombre

- **WHEN** una persona con nombre "Ada Lovelace" y email "ada@example.com", dada de alta el 9 de noviembre de 2026, abre `/profile`
- **THEN** ve el círculo "AL", el nombre "Ada Lovelace", el email "ada@example.com", "Miembro desde" con "9 de noviembre de 2026" y el botón "Cerrar sesión"

#### Scenario: Perfil sin nombre

- **WHEN** una persona sin nombre abre `/profile`
- **THEN** ve "Sin nombre" donde iría el nombre, y su email debajo

### Requirement: Cierre de sesión desde la pantalla

El sistema SHALL cerrar la sesión local de inmediato al pulsar "Cerrar sesión", llevar a la persona a `/login` y pedir al servidor que revoque el token, sin que un fallo de esa petición impida ni deshaga el cierre. Al volver a `/login` por esta vía, SHALL NOT mostrar ningún aviso de sesión perdida.

#### Scenario: Cierre normal

- **WHEN** una persona con sesión pulsa "Cerrar sesión" en `/profile`
- **THEN** es llevada a `/login` sin avisos y, si intenta abrir `/profile`, vuelve a `/login`

#### Scenario: Servidor caído al cerrar

- **WHEN** una persona pulsa "Cerrar sesión" y la petición al servidor falla o devuelve error
- **THEN** es igualmente llevada a `/login`, sin ningún mensaje de error, y sin sesión

### Requirement: Mensajes de error comprensibles

El sistema SHALL traducir los fallos de la API a mensajes en castellano en pantalla: "Tu sesión ha caducado. Vuelve a iniciar sesión." ante un 401, "El email o la contraseña no son correctos." ante un 400, mensajes por campo ante un 422 y "Algo ha ido mal en el servidor. Inténtalo de nuevo en un momento." ante cualquier otro código; y "No se pudo conectar con el servidor. Comprueba que el backend está arrancado." cuando no hay conexión. Cuando un error de validación afecta a un campo que la pantalla no pinta, SHALL mostrarlo en el aviso general.

#### Scenario: Error del servidor

- **WHEN** el servidor responde 500 (aunque sea con HTML) al enviar el login
- **THEN** la persona ve el aviso rojo "Algo ha ido mal en el servidor. Inténtalo de nuevo en un momento."

#### Scenario: Sin conexión

- **WHEN** el navegador no puede alcanzar el servidor al enviar el registro
- **THEN** la persona ve el aviso rojo "No se pudo conectar con el servidor. Comprueba que el backend está arrancado."

#### Scenario: Longitud excedida

- **WHEN** el servidor rechaza una contraseña de 33 caracteres en el registro
- **THEN** la persona ve bajo el campo de contraseña el mensaje "la contraseña no puede superar los 32 caracteres." (la primera letra del mensaje queda en minúscula)

---

# Parte B

## 1. Requisitos escritos y comprobados

- **Escritos por el agente:** 21
- **Comprobados abriendo el código:** 6 (registro válido, validación del registro, inicio de sesión, validación del login, cierre de sesión en la API e iniciales). Solo he mirado backend. No he levantado el servidor ni he comprobado ninguna pantalla, así que los requisitos del frontend (las pantallas, la restauración de sesión y los mensajes de error) quedan sin comprobar, igual que el perfil, la protección de rutas y las respuestas 400 y 401.

## 2. Incoherencias que aparecieron al escribirla

Comprobadas en el código:

- El cierre de sesión devuelve `{ message }` sin `data`, y registro, login y perfil sí van envueltos en `data`. Se ve en la API: `POST /account/logout` frente a `POST /auth/login`.
- La contraseña del registro admite de 8 a 32 caracteres, pero el login no pone límite. Se ve en los dos validadores: `password()` en el alta y `vine.string()` en el login.
- El token no caduca nunca, no hay `expiresIn` en ningún sitio, y cada login crea uno nuevo sin revocar los anteriores. Se ve en el login y en el registro, que devuelven un token nuevo cada vez.
- Las iniciales de "Ada  Lovelace", con dos espacios, salen "AD", y las de un email sin nombre como `nuria@flowsync.io` salen "NF". Se ve en el perfil y en cualquier respuesta que lleve `initials`.

Sin comprobar, tal como las anotó el agente:

- El frontend dice "Tu sesión ha caducado" ante un 401, pero el backend nunca emite tokens con caducidad. Se ve en el aviso al volver a la pantalla de login.
- Los errores de validación llegan del servidor en inglés y el frontend los reescribe en castellano. Se ve en la respuesta de la API frente a lo que muestra la pantalla de registro.
- El campo de contraseña del registro tiene `minLength={8}`, pero el formulario va con `noValidate`, así que el navegador no lo aplica. Se ve en la pantalla de registro.
- El mensaje de longitud máxima empieza en minúscula: "la contraseña no puede superar los 32 caracteres." Se ve bajo el campo de contraseña del registro.

## 3. Lo que no supe decidir si era un bug o el contrato

1. **El registro responde 200 y no 201.** Comprobado: el controlador no fija ningún estado. Una lectura dice que es contrato, porque todo el vertical responde 200 y el frontend solo mira que la respuesta sea correcta. La otra dice que es un bug, porque crear un recurso suele devolver 201 y nada en el código lo exige.
2. **Credenciales incorrectas devuelven 400 y no 401.** Sin comprobar contra el servidor. Una lectura dice que es contrato, porque es lo que da la librería de autenticación y el frontend lo usa para distinguirlo de la sesión caducada, que es 401. La otra dice que es un bug, porque 400 suele significar petición mal formada y no credenciales erróneas.
3. **El email no se normaliza**, ni a minúsculas ni recortando espacios. No comprobado: no sé si `Ada@x.com` y `ada@x.com` cuentan como cuentas distintas. Una lectura dice que el email es un identificador literal y es contrato. La otra dice que puede haber dos cuentas para la misma persona, o un login que falla por una mayúscula, y eso es un bug.
4. **Los tokens no caducan y se acumulan.** Comprobado: no hay caducidad y no se revoca ninguno al hacer login. Una lectura dice que es una decisión de sesión persistente y multidispositivo, y el frontend lo apoya al guardar el token. La otra dice que un token filtrado valdría para siempre y la tabla de tokens crecería sin límite.
5. **El nombre es una clave obligatoria aunque pueda ser nulo.** Comprobado en el validador: sin la clave, falla. Una lectura dice que es contrato, porque se declaró nulable a propósito. La otra dice que es un bug, porque la pantalla lo marca como opcional y una API debería permitir omitirlo.
