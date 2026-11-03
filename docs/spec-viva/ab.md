# Cuentas y acceso

## Purpose

Permite a una persona crear una cuenta con email y contraseña, iniciar y cerrar sesión, y consultar su perfil. El acceso a la API se identifica con un token que se entrega al registrarse o al iniciar sesión y que la aplicación web recuerda entre recargas.

## Requirements

### Requirement: Registro de cuenta por API

El sistema SHALL crear una cuenta cuando `POST /api/v1/auth/signup` reciba `fullName`, `email`, `password` y `passwordConfirmation` válidos. En ese caso SHALL responder 200 con `{ "data": { "user": <usuario>, "token": <token> } }`, donde el token ya sirve para autenticarse.

#### Scenario: Registro correcto

- **WHEN** se envía `{ "fullName": "Ada Lovelace", "email": "ada@example.com", "password": "secreta123", "passwordConfirmation": "secreta123" }`
- **THEN** la respuesta es 200 con `data.user` (los datos de la nueva cuenta) y `data.token` (una cadena no vacía)
- **AND** ese token permite consultar el perfil en ese mismo momento

#### Scenario: Registro sin nombre

- **WHEN** se envía `fullName: null` junto con un email y contraseñas válidos
- **THEN** la cuenta se crea y `data.user.fullName` es `null`

### Requirement: Validación del registro

El sistema SHALL rechazar el registro con 422 y `{ "errors": [ { "message", "rule", "field", "meta"? } ] }` cuando los datos no cumplan estas reglas:
- `fullName` debe venir siempre, como texto o como `null`.
- `email` debe ser un email válido de 254 caracteres como mucho y no puede estar ya registrado.
- `password` debe tener entre 8 y 32 caracteres.
- `passwordConfirmation` debe cumplir las mismas reglas que `password` y ser idéntica a ella.

#### Scenario: Email ya registrado

- **WHEN** se intenta registrar un email que ya tiene una cuenta, escrito exactamente igual
- **THEN** la respuesta es 422 con un error de `field: "email"` y `rule: "database.unique"`
- **AND** no se crea ninguna cuenta

#### Scenario: Contraseña demasiado corta

- **WHEN** se envía una `password` de 7 caracteres
- **THEN** la respuesta es 422 con un error de `field: "password"`, `rule: "minLength"` y `meta.min: 8`

#### Scenario: Contraseña demasiado larga

- **WHEN** se envía una `password` de 33 caracteres
- **THEN** la respuesta es 422 con un error de `field: "password"`, `rule: "maxLength"` y `meta.max: 32`

#### Scenario: Confirmación distinta

- **WHEN** `passwordConfirmation` no es idéntica a `password`
- **THEN** la respuesta es 422 con un error de `field: "passwordConfirmation"` y `rule: "sameAs"`

#### Scenario: Falta la clave del nombre

- **WHEN** el cuerpo no incluye la clave `fullName`
- **THEN** la respuesta es 422 con un error de `field: "fullName"` y `rule: "required"`

#### Scenario: Email con formato inválido

- **WHEN** se envía `email: "no-es-un-email"`
- **THEN** la respuesta es 422 con un error de `field: "email"` y `rule: "email"`

### Requirement: El email distingue mayúsculas y minúsculas

El sistema SHALL tratar el email tal cual se escribe, sin normalizarlo. Dos emails que solo se diferencian en mayúsculas cuentan como cuentas distintas, y para iniciar sesión hay que escribir el email exactamente como se registró.

#### Scenario: Registro con otra capitalización

- **WHEN** existe la cuenta `ada@example.com` y se registra `Ada@Example.com`
- **THEN** el registro se acepta y se crea una segunda cuenta

#### Scenario: Login con otra capitalización

- **WHEN** existe la cuenta `ada@example.com` y se inicia sesión con `ADA@example.com` y la contraseña correcta
- **THEN** la respuesta es la de credenciales incorrectas

### Requirement: Inicio de sesión por API

El sistema SHALL responder a `POST /api/v1/auth/login` con 200 y `{ "data": { "user": <usuario>, "token": <token> } }` cuando `email` y `password` correspondan a una cuenta. Cada inicio de sesión SHALL emitir un token nuevo, y los tokens emitidos antes SHALL seguir siendo válidos.

#### Scenario: Credenciales correctas

- **WHEN** se envían el email y la contraseña de una cuenta existente
- **THEN** la respuesta es 200 con los datos del usuario y un token nuevo

#### Scenario: Varias sesiones a la vez

- **WHEN** la misma cuenta inicia sesión dos veces
- **THEN** se obtienen dos tokens distintos y los dos permiten consultar el perfil

### Requirement: Credenciales incorrectas

El sistema SHALL responder 400 con un error sin `field` cuando el email no exista o la contraseña no coincida. La respuesta SHALL ser la misma en los dos casos, de modo que no revela si el email está registrado.

#### Scenario: Contraseña incorrecta

- **WHEN** se envía un email registrado con una contraseña equivocada
- **THEN** la respuesta es 400 con `errors[0]` sin `field`

#### Scenario: Email no registrado

- **WHEN** se envía un email sin cuenta
- **THEN** la respuesta es 400, igual que si la contraseña fuera incorrecta

### Requirement: Validación del inicio de sesión

El sistema SHALL rechazar el inicio de sesión con 422 cuando falte `email`, cuando no tenga formato de email o supere los 254 caracteres, o cuando falte `password`. La contraseña de login no tiene límite de longitud.

#### Scenario: Email mal formado

- **WHEN** se envía `email: "abc"` con cualquier contraseña
- **THEN** la respuesta es 422 con un error de `field: "email"` y `rule: "email"`

#### Scenario: Falta la contraseña

- **WHEN** se envía solo el email
- **THEN** la respuesta es 422 con un error de `field: "password"` y `rule: "required"`

### Requirement: Datos públicos del usuario

El sistema SHALL devolver al usuario siempre con `id`, `fullName` (texto o `null`), `email`, `initials`, `createdAt` y `updatedAt`, y SHALL NOT incluir nunca la contraseña ni su hash.

#### Scenario: Respuesta sin contraseña

- **WHEN** se registra una cuenta, se inicia sesión o se consulta el perfil
- **THEN** el objeto de usuario trae exactamente esos campos y ninguno contiene la contraseña

### Requirement: Cálculo de las iniciales

El sistema SHALL calcular `initials` en mayúsculas así:
- Con nombre de dos o más palabras separadas por espacio: la primera letra de las dos primeras.
- Con nombre de una sola palabra: sus dos primeras letras.
- Sin nombre: la primera letra de la parte del email anterior a la arroba y la primera de la parte posterior.

#### Scenario: Nombre y apellido

- **WHEN** el usuario se llama "Ada Lovelace"
- **THEN** `initials` es "AL"

#### Scenario: Una sola palabra

- **WHEN** el usuario se llama "Ada"
- **THEN** `initials` es "AD"

#### Scenario: Sin nombre

- **WHEN** `fullName` es `null` y el email es `ada@example.com`
- **THEN** `initials` es "AE"

### Requirement: Consulta del perfil

El sistema SHALL responder a `GET /api/v1/account/profile` con 200 y `{ "data": <usuario> }` con los datos del dueño del token, siempre que la petición lleve `Authorization: Bearer <token>` con un token válido.

#### Scenario: Perfil con token válido

- **WHEN** se pide el perfil con el token recibido al iniciar sesión
- **THEN** la respuesta es 200 con los datos de esa cuenta

### Requirement: Acceso protegido

El sistema SHALL responder 401 en las rutas de `/api/v1/account/` cuando la petición no lleve token, cuando el token sea desconocido o cuando haya sido revocado. Las rutas de registro e inicio de sesión SHALL funcionar sin token.

#### Scenario: Sin token

- **WHEN** se pide el perfil sin cabecera `Authorization`
- **THEN** la respuesta es 401

#### Scenario: Token inventado

- **WHEN** se pide el perfil con `Authorization: Bearer cualquiercosa`
- **THEN** la respuesta es 401

### Requirement: Los tokens no caducan

El sistema SHALL mantener válido un token hasta que se cierre sesión con él, sin caducidad por tiempo ni por inactividad.

#### Scenario: Token antiguo

- **WHEN** se usa un token emitido hace mucho tiempo y nunca revocado
- **THEN** el perfil se sigue obteniendo con 200

### Requirement: Cierre de sesión por API

El sistema SHALL revocar el token usado cuando `POST /api/v1/account/logout` reciba un token válido, y SHALL responder 200 con `{ "message": "Logged out successfully" }`, sin el envoltorio `data`. Los demás tokens de la misma cuenta SHALL seguir siendo válidos.

#### Scenario: Logout correcto

- **WHEN** se cierra sesión con un token válido
- **THEN** la respuesta es 200 con `message`
- **AND** una petición posterior con ese mismo token recibe 401

#### Scenario: Otras sesiones siguen vivas

- **WHEN** una cuenta tiene dos tokens y cierra sesión con uno
- **THEN** el otro sigue permitiendo consultar el perfil

#### Scenario: Logout sin token

- **WHEN** se llama al logout sin token o con un token ya revocado
- **THEN** la respuesta es 401

### Requirement: Pantallas y redirecciones según la sesión

La aplicación web SHALL ofrecer las pantallas `/login`, `/register` y `/profile`:
- Sin sesión, SHALL llevar a `/login` a quien intente entrar en `/profile`.
- Con sesión, SHALL llevar a `/profile` a quien intente entrar en `/login` o `/register`.
- Cualquier otra dirección SHALL redirigir a `/profile`, y de ahí, sin sesión, a `/login`.

#### Scenario: Entrar al perfil sin sesión

- **WHEN** una persona sin sesión abre `/profile`
- **THEN** ve la pantalla de inicio de sesión

#### Scenario: Volver al login con sesión

- **WHEN** una persona con sesión abre `/login` o `/register`
- **THEN** ve su perfil

#### Scenario: Dirección desconocida

- **WHEN** se abre `/cualquier-cosa`
- **THEN** se acaba en el perfil si hay sesión o en el inicio de sesión si no la hay

### Requirement: Sesión recordada entre recargas

La aplicación web SHALL recordar la sesión iniciada al recargar o volver a abrir el navegador. Mientras comprueba con el servidor que la sesión sigue siendo válida, SHALL mostrar un indicador de carga a pantalla completa en lugar de redirigir.

#### Scenario: Recarga con sesión válida

- **WHEN** una persona con sesión recarga `/profile`
- **THEN** ve un indicador de carga y después su perfil, sin pasar por el inicio de sesión

#### Scenario: Sesión rechazada por el servidor

- **WHEN** se recarga la página y el servidor ya no acepta la sesión guardada
- **THEN** la persona ve el inicio de sesión con el aviso "Tu sesión ha caducado. Vuelve a iniciar sesión."
- **AND** la aplicación olvida esa sesión, de modo que otra recarga no vuelve a intentarlo

#### Scenario: Servidor inaccesible al recargar

- **WHEN** se recarga la página y no se puede contactar con el servidor
- **THEN** la persona ve el inicio de sesión con el aviso "No se pudo conectar con el servidor. Comprueba que el backend está arrancado."
- **AND** la sesión guardada no se olvida, así que una recarga con el servidor ya disponible devuelve al perfil

### Requirement: Pantalla de inicio de sesión

La aplicación web SHALL mostrar, bajo la marca "FlowSync", la tarjeta "Inicia sesión" con el texto "Entra con tu cuenta para volver a tus tareas.". La tarjeta SHALL tener los campos "Email" y "Contraseña", el botón "Entrar" y el enlace "¿Aún no tienes cuenta? Crea una", que lleva al registro. Con un inicio de sesión correcto, SHALL llevar a la persona a su perfil.

#### Scenario: Login correcto

- **WHEN** la persona escribe credenciales válidas y pulsa "Entrar"
- **THEN** llega a su perfil

#### Scenario: Envío en curso

- **WHEN** la persona pulsa "Entrar"
- **THEN** mientras se espera la respuesta, el botón muestra "Entrando…" y no se puede pulsar

#### Scenario: Credenciales incorrectas en pantalla

- **WHEN** el email o la contraseña no son correctos
- **THEN** aparece un aviso de error arriba del formulario con "El email o la contraseña no son correctos."

#### Scenario: Ir al registro

- **WHEN** la persona pulsa "Crea una"
- **THEN** ve la pantalla de registro

### Requirement: Pantalla de registro

La aplicación web SHALL mostrar la tarjeta "Crea tu cuenta" con el texto "Regístrate para empezar a organizar el trabajo del equipo.". La tarjeta SHALL tener los campos "Nombre completo (opcional)", "Email", "Contraseña" (con la pista "Entre 8 y 32 caracteres.") y "Repite la contraseña", el botón "Crear cuenta" y el enlace "¿Ya tienes cuenta? Inicia sesión". Con un registro correcto, SHALL dejar a la persona con la sesión iniciada en su perfil. El nombre se envía sin espacios al principio ni al final, y si queda vacío la cuenta se crea sin nombre.

#### Scenario: Registro correcto en pantalla

- **WHEN** la persona rellena los campos con datos válidos y pulsa "Crear cuenta"
- **THEN** llega a su perfil con la sesión iniciada

#### Scenario: Envío en curso

- **WHEN** la persona pulsa "Crear cuenta"
- **THEN** mientras se espera la respuesta, el botón muestra "Creando cuenta…" y no se puede pulsar

#### Scenario: Nombre en blanco

- **WHEN** la persona deja el nombre vacío o con solo espacios
- **THEN** la cuenta se crea y el perfil muestra "Sin nombre"

#### Scenario: Contraseñas distintas

- **WHEN** "Contraseña" y "Repite la contraseña" no coinciden y se pulsa "Crear cuenta"
- **THEN** aparece "Las contraseñas no coinciden." bajo "Repite la contraseña", sin enviar nada al servidor

#### Scenario: Email ya registrado en pantalla

- **WHEN** el email ya tiene cuenta
- **THEN** aparece "Ese email ya está registrado. Inicia sesión en su lugar." bajo el campo Email

#### Scenario: Ir al login

- **WHEN** la persona pulsa "Inicia sesión"
- **THEN** ve la pantalla de inicio de sesión

### Requirement: Mensajes de error en los formularios

Los formularios de inicio de sesión y registro SHALL dejar la validación al servidor, sin la validación nativa del navegador, y SHALL mostrar en castellano bajo cada campo el primer error que el servidor devuelva para él. Cuando un error se refiera a un campo que no está en pantalla o no sea de un campo, SHALL mostrarlo en un aviso arriba del formulario. Cada nuevo envío SHALL borrar los errores del anterior. Los textos son:
- Formato de email: "Introduce una dirección de email válida."
- Campo vacío: "Falta rellenar <campo>.", por ejemplo "Falta rellenar la contraseña."
- Longitud mínima: "<campo> debe tener al menos N caracteres.", con el nombre del campo en minúscula, por ejemplo "la contraseña debe tener al menos 8 caracteres."
- Longitud máxima: "<campo> no puede superar los N caracteres."
- Servidor inaccesible: "No se pudo conectar con el servidor. Comprueba que el backend está arrancado."
- Fallo del servidor: "Algo ha ido mal en el servidor. Inténtalo de nuevo en un momento."

#### Scenario: Email inválido

- **WHEN** se envía el formulario con "abc" en el email
- **THEN** aparece "Introduce una dirección de email válida." bajo el campo Email y el campo queda marcado como inválido

#### Scenario: Contraseña corta en registro

- **WHEN** se registra con una contraseña de 5 caracteres
- **THEN** la pista "Entre 8 y 32 caracteres." se sustituye por "la contraseña debe tener al menos 8 caracteres."

#### Scenario: Servidor caído al enviar

- **WHEN** se envía cualquiera de los dos formularios con el servidor inaccesible
- **THEN** aparece arriba el aviso "No se pudo conectar con el servidor. Comprueba que el backend está arrancado."

### Requirement: Aviso de sesión perdida en el login

La pantalla de inicio de sesión SHALL mostrar el motivo por el que se perdió una sesión anterior mientras no haya un error del intento en curso, que tiene prioridad. El aviso SHALL desaparecer al iniciar sesión correctamente o al cerrar sesión.

#### Scenario: Prioridad del error actual

- **WHEN** se muestra el aviso de sesión caducada y la persona falla el inicio de sesión
- **THEN** el aviso pasa a ser "El email o la contraseña no son correctos."

### Requirement: Pantalla de perfil

La aplicación web SHALL mostrar en el perfil:
- Las iniciales del usuario en un círculo.
- Su nombre, o "Sin nombre" si no lo tiene.
- Su email.
- "Miembro desde", con la fecha de alta en formato largo en castellano, por ejemplo "3 de noviembre de 2026".
- El botón "Cerrar sesión".

#### Scenario: Ver el perfil

- **WHEN** una persona con sesión abre `/profile`
- **THEN** ve sus iniciales, su nombre o "Sin nombre", su email y su fecha de alta

### Requirement: Cierre de sesión en pantalla

La aplicación web SHALL cerrar la sesión cuando se pulse "Cerrar sesión". El botón SHALL pasar a "Cerrando sesión…" sin poder pulsarse, y la persona SHALL ver la pantalla de inicio de sesión sin ningún aviso. La sesión SHALL cerrarse en la aplicación aunque el servidor no responda o rechace la petición.

#### Scenario: Cerrar sesión

- **WHEN** la persona pulsa "Cerrar sesión"
- **THEN** ve el inicio de sesión sin aviso
- **AND** al recargar sigue sin sesión

#### Scenario: Cerrar sesión con el servidor caído

- **WHEN** la persona pulsa "Cerrar sesión" sin conexión con el servidor
- **THEN** ve igualmente el inicio de sesión y la aplicación ya no recuerda la sesión

## Parte B

1. Requisitos: el agente escribió 20 y yo he comprobado 13. Los de la API los probamos con peticiones contra el servidor y los de pantalla los probé yo en el navegador. Me faltaron las validaciones, las pantallas de login y registro y los mensajes de error de los formularios.

2. Incoherencias:
- El logout devuelve un message suelto, el resto de respuestas van dentro de data.
- En el registro la contraseña tiene que tener entre 8 y 32 caracteres, pero en el login acepta una de 1000 sin decir nada.
- La misma cuenta devuelve el createdAt con milisegundos en el registro y sin ellos en el login y el perfil.

3. Bug o contrato:
- El email distingue mayúsculas: si me registro con minúsculas y entro con mayúsculas no me deja, y puedo crear otra cuenta con el mismo email cambiando mayúsculas. Puede ser un bug porque alguien se puede quedar fuera o duplicar la cuenta, o puede ser que se quiera guardar el email tal cual se escribe.
- Cambié el token a mano en el navegador y me salió "Tu sesión ha caducado", pero los tokens no caducan. No sé si es un texto genérico puesto a propósito para el usuario o si es un error porque realmente el token es inválido, no caducado. Que los tokens no caducan tampoco lo pude comprobar porque habría que esperar.
