## Purpose

Permite a una persona crear una cuenta, iniciar y cerrar sesión, mantener la sesión al recargar la aplicación y consultar su perfil. También restringe el acceso a las rutas que exigen estar autenticado.

## Requirements

### Requirement: Registro de cuenta

El sistema SHALL crear una cuenta mediante `POST /api/v1/auth/signup`. La petición lleva `fullName`, `email`, `password` y `passwordConfirmation` en el cuerpo. Si los datos son válidos, el sistema SHALL devolver el usuario creado junto con un token de acceso e iniciar la sesión en la aplicación.

#### Scenario: Registro correcto en la API

- **WHEN** se envía `POST /api/v1/auth/signup` con datos válidos y un email que ninguna cuenta usa todavía
- **THEN** la respuesta tiene la forma `{ "data": { "user": { "id", "fullName", "email", "createdAt", "updatedAt", "initials" }, "token": "<token>" } }`
- **THEN** la respuesta no incluye la contraseña

#### Scenario: Registro correcto desde la pantalla

- **WHEN** el usuario envía el formulario de `/register` con datos válidos
- **THEN** mientras se procesa la petición, el botón muestra "Creando cuenta…" y está deshabilitado
- **THEN** al terminar, la sesión queda iniciada sin pasar por el login y la aplicación redirige a `/profile`

### Requirement: Validación del email

En el registro y en el login, el sistema SHALL exigir que el campo `email` sea una dirección de email válida de 254 caracteres como máximo. En el registro, además, SHALL rechazar un email que ya use otra cuenta. Si la validación falla, el sistema SHALL responder 422 con el cuerpo `{ "errors": [ ... ] }`. Cada elemento del array tiene `message`, `rule` y `field`, y puede tener `meta`. Cada campo aparece como mucho una vez.

#### Scenario: Falta el email en el registro

- **WHEN** se envía `POST /api/v1/auth/signup` sin el campo `email`
- **THEN** la respuesta es 422 con un error en `email`, con la regla `required` y el mensaje "The email field must be defined"

#### Scenario: Email con formato no válido

- **WHEN** se envía `POST /api/v1/auth/signup` o `POST /api/v1/auth/login` con un `email` que no es una dirección de email válida
- **THEN** la respuesta es 422 con un error en `email`, con la regla `email` y el mensaje "The email field must be a valid email address"
- **THEN** en pantalla, bajo el campo Email, se muestra "Introduce una dirección de email válida."

#### Scenario: Email demasiado largo

- **WHEN** se envía `POST /api/v1/auth/signup` o `POST /api/v1/auth/login` con un `email` de más de 254 caracteres
- **THEN** la respuesta es 422 con un error en `email`, con la regla `maxLength` y el mensaje "The email field must not be greater than 254 characters"

#### Scenario: Email ya registrado

- **WHEN** se envía `POST /api/v1/auth/signup` con un `email` válido que ya pertenece a otra cuenta
- **THEN** la respuesta es 422 con un error en `email`, con la regla `database.unique` y el mensaje "The email has already been taken"
- **THEN** en pantalla, bajo el campo Email, se muestra "Ese email ya está registrado. Inicia sesión en su lugar."

### Requirement: Validación de la contraseña en el registro

En el registro, el sistema SHALL exigir que `password` y `passwordConfirmation` tengan entre 8 y 32 caracteres. También SHALL exigir que `passwordConfirmation` sea igual a `password`. Si alguna de estas condiciones falla, el sistema SHALL responder 422 con el formato de errores por campo.

#### Scenario: Contraseña demasiado corta

- **WHEN** se envía `POST /api/v1/auth/signup` con un `password` de menos de 8 caracteres
- **THEN** la respuesta es 422 con un error en `password`, con la regla `minLength` y el mensaje "The password field must have at least 8 characters"

#### Scenario: Contraseña demasiado larga

- **WHEN** se envía `POST /api/v1/auth/signup` con un `password` de más de 32 caracteres
- **THEN** la respuesta es 422 con un error en `password`, con la regla `maxLength` y el mensaje "The password field must not be greater than 32 characters"

#### Scenario: La confirmación no coincide (API)

- **WHEN** se envía `POST /api/v1/auth/signup` con un `passwordConfirmation` distinto de `password`
- **THEN** la respuesta es 422 con un error en `passwordConfirmation`, con la regla `sameAs` y el mensaje "The passwordConfirmation field and password field must be the same"

#### Scenario: Indicación de longitud en el formulario

- **WHEN** el usuario está en `/register` y el campo Contraseña no tiene ningún error
- **THEN** bajo el campo se muestra "Entre 8 y 32 caracteres."

### Requirement: Comprobación local de la confirmación de contraseña

En la pantalla de registro, el sistema SHALL comprobar que la contraseña y su confirmación coinciden antes de enviar nada al servidor.

#### Scenario: Las contraseñas no coinciden en el formulario

- **WHEN** el usuario envía el formulario de `/register` con "Contraseña" y "Repite la contraseña" distintas
- **THEN** no se hace ninguna petición al servidor
- **THEN** bajo el campo "Repite la contraseña" se muestra "Las contraseñas no coinciden."

### Requirement: Nombre opcional

El sistema SHALL aceptar `fullName` con valor `null` en el registro. La pantalla de registro SHALL presentar el nombre como opcional, recortar los espacios del principio y del final, y enviar `null` cuando el resultado quede vacío.

#### Scenario: Registro sin nombre en la API

- **WHEN** se envía `POST /api/v1/auth/signup` con `fullName: null` y el resto de datos válidos
- **THEN** la cuenta se crea y el usuario devuelto tiene `fullName: null`

#### Scenario: Nombre en blanco en el formulario

- **WHEN** el usuario envía el formulario de `/register` con el campo "Nombre completo (opcional)" vacío o solo con espacios
- **THEN** la petición de registro envía `fullName: null`

#### Scenario: Nombre con espacios alrededor en el formulario

- **WHEN** el usuario envía el formulario de `/register` con un nombre que tiene espacios al principio o al final
- **THEN** la petición de registro envía el nombre sin esos espacios

### Requirement: Presentación de errores en los formularios de acceso

Cuando el servidor rechaza un registro o un login, el sistema SHALL mostrar cada error de validación bajo el campo al que afecta, con un solo mensaje por campo. Los errores que no se pueden asociar a un campo visible SHALL mostrarse en un aviso en la parte superior del formulario.

#### Scenario: Errores de validación en el registro

- **WHEN** el registro devuelve 422 con errores en uno o varios de los campos nombre, email, contraseña y confirmación
- **THEN** cada mensaje aparece bajo su campo
- **THEN** no se muestra el aviso superior

#### Scenario: Error en la contraseña del registro

- **WHEN** el registro devuelve un error en `password`
- **THEN** bajo el campo Contraseña se muestra el error en lugar de "Entre 8 y 32 caracteres."

#### Scenario: Errores de validación en el login

- **WHEN** el login devuelve 422 con errores en `email` o en `password`
- **THEN** cada mensaje aparece bajo su campo en `/login`

#### Scenario: Servidor inalcanzable

- **WHEN** el usuario envía el formulario de `/register` o de `/login` y no se puede conectar con el servidor
- **THEN** el aviso superior muestra "No se pudo conectar con el servidor. Comprueba que el backend está arrancado."

#### Scenario: Error del servidor

- **WHEN** el registro o el login responden con un estado distinto de 400, 401 y 422, o con un 422 sin errores
- **THEN** el aviso superior muestra "Algo ha ido mal en el servidor. Inténtalo de nuevo en un momento."

### Requirement: Inicio de sesión

El sistema SHALL iniciar sesión mediante `POST /api/v1/auth/login` con `email` y `password`. Si las credenciales son correctas, SHALL devolver el usuario junto con un token de acceso nuevo, sin revocar los tokens anteriores del usuario. El login SHALL NOT aplicar reglas de longitud a la contraseña.

#### Scenario: Login correcto en la API

- **WHEN** se envía `POST /api/v1/auth/login` con el email y la contraseña de una cuenta existente
- **THEN** la respuesta tiene la forma `{ "data": { "user": { "id", "fullName", "email", "createdAt", "updatedAt", "initials" }, "token": "<token>" } }`
- **THEN** los tokens emitidos antes para ese usuario siguen siendo válidos

#### Scenario: Login correcto desde la pantalla

- **WHEN** el usuario envía el formulario de `/login` con credenciales correctas
- **THEN** mientras se procesa la petición, el botón muestra "Entrando…" en lugar de "Entrar" y está deshabilitado
- **THEN** al terminar, la sesión queda iniciada y la aplicación redirige a `/profile`

### Requirement: Credenciales incorrectas

El sistema SHALL rechazar el login con 400 cuando el email no corresponde a ninguna cuenta o la contraseña no coincide. La respuesta SHALL ser la misma en los dos casos.

#### Scenario: Email desconocido o contraseña incorrecta

- **WHEN** se envía `POST /api/v1/auth/login` con un email válido que no está registrado, o con la contraseña equivocada de una cuenta existente
- **THEN** la respuesta es 400 con el cuerpo `{ "errors": [ { "message": "Invalid user credentials" } ] }`
- **THEN** en `/login`, el aviso superior muestra "El email o la contraseña no son correctos."

### Requirement: Restauración de la sesión al cargar la aplicación

Si al arrancar la aplicación hay un token guardado en el navegador, el sistema SHALL validarlo contra `GET /api/v1/account/profile` antes de dar la sesión por iniciada. Si no hay token guardado, el sistema SHALL considerar desde el principio que no hay sesión.

#### Scenario: Validación en curso

- **WHEN** la aplicación arranca con un token guardado y la respuesta del perfil todavía no ha llegado
- **THEN** en lugar de `/login`, `/register` o `/profile` se muestra un indicador de carga con el texto accesible "Cargando…"

#### Scenario: Token aceptado

- **WHEN** la aplicación arranca con un token guardado y `GET /api/v1/account/profile` responde correctamente
- **THEN** la sesión queda iniciada con los datos de usuario que devuelve el servidor

#### Scenario: Token rechazado

- **WHEN** la aplicación arranca con un token guardado y `GET /api/v1/account/profile` responde 401
- **THEN** el token guardado se elimina y no queda ninguna sesión
- **THEN** en `/login`, el aviso superior muestra "Tu sesión ha caducado. Vuelve a iniciar sesión."

#### Scenario: Servidor inalcanzable al restaurar

- **WHEN** la aplicación arranca con un token guardado y no se puede conectar con el servidor
- **THEN** no queda ninguna sesión, pero el token guardado se conserva
- **THEN** en `/login`, el aviso superior muestra "No se pudo conectar con el servidor. Comprueba que el backend está arrancado."
- **THEN** la siguiente vez que se carga la aplicación, se vuelve a validar ese mismo token

#### Scenario: Error del servidor al restaurar

- **WHEN** la aplicación arranca con un token guardado y `GET /api/v1/account/profile` responde con un error que no es 401
- **THEN** no queda ninguna sesión, pero el token guardado se conserva
- **THEN** en `/login`, el aviso superior muestra el mensaje de error traducido, por ejemplo "Algo ha ido mal en el servidor. Inténtalo de nuevo en un momento." si es un error del servidor

#### Scenario: Prioridad del error del intento actual

- **WHEN** hay un aviso de sesión perdida en `/login` y el usuario hace un intento de login que falla
- **THEN** el aviso superior muestra el error del intento actual en lugar del de la sesión perdida

### Requirement: Acceso a las pantallas según la sesión

El sistema SHALL permitir el acceso a `/login` y `/register` solo sin sesión, y a `/profile` solo con sesión. Cualquier otra ruta SHALL redirigir a `/profile`. Estas redirecciones SHALL sustituir la entrada actual del historial.

#### Scenario: Pantallas públicas con sesión iniciada

- **WHEN** un usuario con sesión navega a `/login` o a `/register`
- **THEN** la aplicación redirige a `/profile`

#### Scenario: Perfil sin sesión

- **WHEN** un usuario sin sesión navega a `/profile`
- **THEN** la aplicación redirige a `/login`

#### Scenario: Ruta desconocida

- **WHEN** se navega a una ruta que no es `/login`, `/register` ni `/profile`, incluida `/`
- **THEN** la aplicación redirige a `/profile`, que a su vez aplica la regla de sesión

#### Scenario: Sin retorno a la ruta de origen

- **WHEN** un usuario sin sesión es redirigido a `/login` e inicia sesión
- **THEN** la aplicación redirige a `/profile`, sea cual sea la ruta que el usuario pidió al principio

### Requirement: Cierre de sesión

El sistema SHALL cerrar la sesión mediante `POST /api/v1/account/logout`, que exige autenticación y revoca solo el token con el que se hace la petición. En pantalla, el sistema SHALL cerrar la sesión local antes de llamar al servidor y SHALL completar el cierre aunque esa llamada falle.

#### Scenario: Logout en la API

- **WHEN** se envía `POST /api/v1/account/logout` con un token válido
- **THEN** ese token deja de ser válido
- **THEN** los demás tokens del mismo usuario siguen siendo válidos

#### Scenario: Logout desde la pantalla

- **WHEN** el usuario pulsa "Cerrar sesión" en `/profile`
- **THEN** el botón muestra "Cerrando sesión…" y está deshabilitado
- **THEN** se eliminan el token guardado y los datos del usuario
- **THEN** la aplicación redirige a `/login` sin mostrar ningún aviso

#### Scenario: El servidor falla durante el logout

- **WHEN** el usuario pulsa "Cerrar sesión" y la llamada al servidor falla o no se puede conectar
- **THEN** la sesión local queda cerrada de todas formas y no se muestra ningún error

### Requirement: Consulta del perfil

El sistema SHALL devolver los datos del usuario autenticado mediante `GET /api/v1/account/profile`. La pantalla `/profile` SHALL mostrar esos datos junto con la opción de cerrar sesión.

#### Scenario: Perfil en la API

- **WHEN** se envía `GET /api/v1/account/profile` con un token válido
- **THEN** la respuesta tiene la forma `{ "data": { "id", "fullName", "email", "createdAt", "updatedAt", "initials" } }`, sin la contraseña

#### Scenario: Pantalla de perfil

- **WHEN** un usuario con sesión está en `/profile`
- **THEN** se ven sus iniciales en un círculo
- **THEN** se ve su nombre como título, o "Sin nombre" si no lo tiene
- **THEN** se ve su email
- **THEN** se ve "Miembro desde" con la fecha de alta en formato de fecha largo en español
- **THEN** se ve el botón "Cerrar sesión"

### Requirement: Iniciales del usuario

Cuando el usuario tiene nombre, el sistema SHALL calcular `initials` a partir de ese nombre, separado por espacios.

#### Scenario: Nombre de dos o más palabras

- **WHEN** las dos primeras partes del nombre, separadas por espacios, no están vacías
- **THEN** `initials` es la primera letra de cada una de esas dos partes, en mayúsculas

#### Scenario: Nombre de una sola palabra

- **WHEN** el nombre no tiene una segunda parte que no esté vacía
- **THEN** `initials` son los dos primeros caracteres de la primera parte, en mayúsculas

### Requirement: Protección de las rutas autenticadas

En las rutas que exigen autenticación, el sistema SHALL responder 401 a cualquier petición sin un token de acceso válido. En el resto de rutas, el sistema SHALL NOT rechazar una petición porque lleve un token no válido.

#### Scenario: Petición sin token válido

- **WHEN** se hace una petición a `GET /api/v1/account/profile`, a `POST /api/v1/account/logout` o a cualquier otra ruta que exija autenticación, en alguno de estos casos:
  - sin la cabecera `Authorization`;
  - con un esquema distinto de `Bearer`;
  - con un token mal formado, desconocido o revocado;
  - con un token cuyo usuario ya no existe.
- **THEN** la respuesta es 401 con el cuerpo `{ "errors": [ { "message": "Unauthorized access" } ] }`

#### Scenario: Token no válido en una ruta pública

- **WHEN** se envía `POST /api/v1/auth/signup` o `POST /api/v1/auth/login` con una cabecera `Authorization` que lleva un token no válido
- **THEN** la petición se procesa igual que si no llevara esa cabecera

### Requirement: Traducción de los errores del servidor en la aplicación

La aplicación SHALL mostrar los errores del servidor en castellano y SHALL NOT mostrar los mensajes originales en inglés.

#### Scenario: Respuesta 401

- **WHEN** cualquier llamada al servidor responde 401
- **THEN** el mensaje que usa la aplicación es "Tu sesión ha caducado. Vuelve a iniciar sesión."

#### Scenario: Errores de validación traducidos

- **WHEN** una llamada responde 422 con errores de validación
- **THEN** cada error se traduce según su regla:
  - `sameAs` → "Las contraseñas no coinciden."
  - `email` → "Introduce una dirección de email válida."
  - `database.unique` en `email` → "Ese email ya está registrado. Inicia sesión en su lugar."
  - `required` → "Falta rellenar " seguido de "el nombre", "el email", "la contraseña" o "la confirmación de la contraseña", según el campo, y un punto final
  - cualquier regla que no tenga una traducción propia → "Revisa " seguido del nombre del campo y un punto final

## Parte B

### 1. Requisitos generados y comprobados

- Requisitos escritos por el agente: 15
- Requisitos comprobados por mí: 15 (curl)

### 2. Incoherencias detectadas

- Longitud de la contraseña: el registro exige 8–32 caracteres, pero el login acepta cualquier longitud (40 caracteres → 400 de credenciales, no 422). Se ve en `POST /api/v1/auth/signup` frente a `POST /api/v1/auth/login`. [curl]
- Formato de los errores: la validación devuelve `{errors:[{message, rule, field}]}`, las credenciales `{errors:[{message}]}` y un JSON mal formado devuelve un 400 con un volcado de depuración (`frames`, `stack`, `raw`). Se ve en `POST /api/v1/auth/signup` y `/login`. [curl]
- Respuesta del logout: es la única sin el envoltorio `{data}` (`{"message":"Logged out successfully"}`), frente al registro, el login y el perfil. Se ve en `POST /api/v1/account/logout`. [curl]
- Cualquier 400 se muestra como "El email o la contraseña no son correctos.", también en el registro (por ejemplo, con un JSON mal formado). Se ve en los avisos de `/register` y `/login`. [código, agente; el 400 por JSON mal formado, curl]
- Email de más de 254 caracteres: responde con la regla `email`, no con `maxLength`, así que el escenario "Email demasiado largo" de la spec quizá no se pueda provocar desde fuera. Se ve en `POST /api/v1/auth/signup`. [curl con la parte local larga; pendiente con dominio largo]
- Los atributos de validación del formulario (`required`, longitud mínima, tipo email) no tienen efecto porque el formulario los desactiva; la única comprobación previa es "las contraseñas no coinciden". Se ve en `/register`. [código, agente]

### 3. Comportamientos que no supe clasificar como bug o contrato

- **Email sensible a mayúsculas.** Se pueden registrar `ada…@example.com` y `ADA…@example.com` como dos cuentas distintas [curl].
  - Contrato: el email se guarda tal como se escribe y cada variante es una identidad distinta.
  - Bug: es la misma persona con dos cuentas, y el login exige recordar las mayúsculas exactas.
  - Por qué no se puede decidir: el código no normaliza el email ni tiene ningún comentario sobre el tema, así que no hay rastro de que se decidiera.
- **Máximo de 32 caracteres en la contraseña del registro** [curl].
  - Contrato: es una política de seguridad elegida a propósito.
  - Bug: es un valor arbitrario, bajo para gestores de contraseñas, y el login ni siquiera lo aplica.
  - Por qué no se puede decidir: aparece como número suelto en el validador y en la pista del formulario, sin justificación.
