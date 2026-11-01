# Cuentas y acceso

## Purpose

Permite a una persona crear una cuenta, entrar y salir de FlowSync, y ver su perfil. Las rutas de la API que requieren sesión rechazan cualquier petición sin un token válido, y la aplicación web restringe las pantallas de la misma forma.

## Requirements

### Requirement: La API crea una cuenta y devuelve sesión en el registro

El sistema SHALL crear una cuenta nueva con `POST /api/v1/auth/signup` cuando el cuerpo cumple las validaciones, y SHALL responder con los datos del usuario y un token de acceso.

#### Scenario: Registro correcto

- **WHEN** se envía `POST /api/v1/auth/signup` con `fullName`, un `email` válido no registrado, una `password` de entre 8 y 32 caracteres y una `passwordConfirmation` idéntica a la contraseña
- **THEN** la respuesta es 200 con `{ "data": { "user": { id, fullName, email, createdAt, updatedAt, initials }, "token": "..." } }`, y el token permite llamar después a `GET /api/v1/account/profile`

### Requirement: El nombre completo en el registro es opcional pero debe enviarse la clave

El sistema SHALL aceptar `fullName` con valor `null` y SHALL rechazar la petición de registro si la clave `fullName` no viaja en el cuerpo.

#### Scenario: Registro con fullName null

- **WHEN** se envía un registro válido con `"fullName": null`
- **THEN** la respuesta es 200, el usuario devuelto tiene `fullName` a `null` y sus `initials` se calculan a partir del email

#### Scenario: Registro sin la clave fullName

- **WHEN** se envía un registro válido en todo lo demás pero sin la clave `fullName`
- **THEN** la respuesta es 422 con un error de la regla `required` sobre el campo `fullName`

### Requirement: El registro valida el formato y la longitud del email

El sistema SHALL rechazar con 422 un email con formato no válido o de más de 254 caracteres en el registro, y SHALL indicar el campo `email` en el error.

#### Scenario: Email con formato inválido en el registro

- **WHEN** se envía `POST /api/v1/auth/signup` con `email` igual a `"ana@"`
- **THEN** la respuesta es 422 con un error `{ message, rule: "email", field: "email" }` dentro de `errors`

### Requirement: El registro rechaza un email ya registrado

El sistema SHALL rechazar con 422 un registro cuyo email coincide exactamente con el de una cuenta existente.

#### Scenario: Email duplicado

- **WHEN** se envía un registro con un email que ya existe en otra cuenta
- **THEN** la respuesta es 422 con un error de la regla `database.unique` sobre el campo `email`, y no se crea ninguna cuenta

### Requirement: El registro valida la longitud de la contraseña

El sistema SHALL rechazar con 422 una contraseña de menos de 8 o de más de 32 caracteres en el registro.

#### Scenario: Contraseña demasiado corta

- **WHEN** se envía un registro con `password` de 5 caracteres
- **THEN** la respuesta es 422 con un error de la regla `minLength` sobre el campo `password`, y `meta.min` vale 8

#### Scenario: Contraseña demasiado larga

- **WHEN** se envía un registro con `password` de 33 caracteres
- **THEN** la respuesta es 422 con un error de la regla `maxLength` sobre el campo `password`, y `meta.max` vale 32

### Requirement: El registro exige que la confirmación de contraseña coincida

El sistema SHALL rechazar con 422 un registro cuya `passwordConfirmation` no sea idéntica a `password`.

#### Scenario: Confirmación distinta

- **WHEN** se envía un registro con `password` y `passwordConfirmation` distintas
- **THEN** la respuesta es 422 con un error de la regla `sameAs` sobre el campo `passwordConfirmation`

### Requirement: El email se guarda y compara tal cual se envía

El sistema SHALL tratar como emails distintos dos direcciones que solo difieran en mayúsculas y minúsculas, tanto al registrarse como al iniciar sesión.

#### Scenario: Registro con el mismo email en otra capitalización

- **WHEN** existe una cuenta con `ana@ejemplo.com` y se envía un registro con `Ana@ejemplo.com`
- **THEN** la respuesta es 200 y se crea una segunda cuenta

#### Scenario: Login con otra capitalización

- **WHEN** existe una cuenta con `ana@ejemplo.com` y se envía `POST /api/v1/auth/login` con `Ana@ejemplo.com` y la contraseña correcta
- **THEN** la respuesta es 400 con un error de credenciales inválidas

### Requirement: La API inicia sesión con email y contraseña

El sistema SHALL responder a `POST /api/v1/auth/login` con los datos del usuario y un token nuevo cuando las credenciales son correctas.

#### Scenario: Login correcto

- **WHEN** se envía `POST /api/v1/auth/login` con el email y la contraseña de una cuenta existente
- **THEN** la respuesta es 200 con `{ "data": { "user": { ... }, "token": "..." } }`

#### Scenario: Cada login genera un token nuevo sin invalidar los anteriores

- **WHEN** la misma cuenta hace dos logins correctos seguidos
- **THEN** cada respuesta trae un token distinto y ambos tokens siguen sirviendo para `GET /api/v1/account/profile`

### Requirement: El login no distingue entre email inexistente y contraseña incorrecta

El sistema SHALL responder con 400 y el mismo tipo de error de credenciales cuando el email no existe o la contraseña no coincide.

#### Scenario: Email inexistente

- **WHEN** se envía `POST /api/v1/auth/login` con un email que no tiene cuenta
- **THEN** la respuesta es 400 con un error `{ message }` dentro de `errors`, sin campo `field`

#### Scenario: Contraseña incorrecta

- **WHEN** se envía `POST /api/v1/auth/login` con el email de una cuenta existente y una contraseña incorrecta
- **THEN** la respuesta es 400 con el mismo tipo de error que con un email inexistente

### Requirement: El login valida el formato del email y exige que viajen las claves, pero no la longitud de la contraseña

El sistema SHALL rechazar con 422 un login con email mal formado, incluido el email vacío, o sin las claves `email` o `password`, y SHALL aceptar cualquier contraseña de cualquier longitud, incluida la vacía, hasta comprobar las credenciales.

#### Scenario: Email mal formado en login

- **WHEN** se envía `POST /api/v1/auth/login` con `email` igual a `"ana"`
- **THEN** la respuesta es 422 con un error de la regla `email` sobre el campo `email`

#### Scenario: Email vacío en login

- **WHEN** se envía `POST /api/v1/auth/login` con `email` igual a `""`
- **THEN** la respuesta es 422 con un error de la regla `email` sobre el campo `email`, no `required`

#### Scenario: Contraseña vacía en login

- **WHEN** se envía `POST /api/v1/auth/login` con un email existente y `password` igual a `""`
- **THEN** la respuesta es 400 de credenciales inválidas, no 422

#### Scenario: Contraseña corta en login

- **WHEN** se envía `POST /api/v1/auth/login` con un email existente y una contraseña de 3 caracteres
- **THEN** la respuesta es 400 de credenciales inválidas, no 422

### Requirement: La API protege el perfil con el token de acceso

El sistema SHALL responder 401 a `GET /api/v1/account/profile` cuando la petición no lleva un token válido.

#### Scenario: Perfil sin token

- **WHEN** se llama a `GET /api/v1/account/profile` sin cabecera `Authorization`
- **THEN** la respuesta es 401 con un error dentro de `errors`

#### Scenario: Perfil con token inválido

- **WHEN** se llama a `GET /api/v1/account/profile` con `Authorization: Bearer` seguido de un token que no existe o ya fue revocado
- **THEN** la respuesta es 401

### Requirement: La API devuelve el perfil propio con el formato de usuario

El sistema SHALL responder con los datos del usuario autenticado, envueltos en `data`, cuando el token es válido.

#### Scenario: Consulta del perfil

- **WHEN** se llama a `GET /api/v1/account/profile` con un token válido
- **THEN** la respuesta es 200 con `{ "data": { id, fullName, email, createdAt, updatedAt, initials } }` y no incluye la contraseña

### Requirement: Los tokens no caducan por tiempo

El sistema SHALL seguir aceptando un token de acceso emitido en el registro o en el login mientras no se haya cerrado la sesión con ese mismo token.

#### Scenario: Token usado horas después

- **WHEN** se usa en `GET /api/v1/account/profile` un token emitido hace varias horas y no cerrado
- **THEN** la respuesta es 200

### Requirement: La API cierra solo la sesión del token que hace la petición

El sistema SHALL revocar únicamente el token con el que se llama a `POST /api/v1/account/logout`, y SHALL dejar intactos los demás tokens de la misma cuenta.

#### Scenario: Logout con un token

- **WHEN** se llama a `POST /api/v1/account/logout` con un token válido
- **THEN** la respuesta es 200 con `{ "message": "Logged out successfully" }` sin envoltorio `data`, y ese mismo token pasa a dar 401 en el perfil

#### Scenario: Otros tokens de la cuenta siguen válidos

- **WHEN** una cuenta tiene dos tokens activos y se cierra la sesión con uno de ellos
- **THEN** el otro token sigue devolviendo 200 en `GET /api/v1/account/profile`

### Requirement: El logout exige un token válido

El sistema SHALL responder 401 a `POST /api/v1/account/logout` cuando la petición no lleva un token válido.

#### Scenario: Logout sin token

- **WHEN** se llama a `POST /api/v1/account/logout` sin cabecera `Authorization`
- **THEN** la respuesta es 401

### Requirement: Todas las respuestas de la API son JSON

El sistema SHALL responder en formato JSON también en los errores, sin importar la cabecera `Accept` que envíe el cliente.

#### Scenario: Error de validación con Accept distinto

- **WHEN** se envía un login con `Accept: text/html` y un email mal formado
- **THEN** la respuesta es 422 con cuerpo JSON `{ "errors": [...] }`

### Requirement: La API envuelve los datos de éxito en data, salvo el logout

El sistema SHALL envolver en `data` las respuestas de éxito de registro, login y perfil, y SHALL devolver la respuesta de logout sin ese envoltorio.

#### Scenario: Forma de respuesta de login frente a logout

- **WHEN** se hace un login correcto y después un logout con ese token
- **THEN** el login devuelve `{ "data": ... }` y el logout devuelve `{ "message": ... }` directamente en la raíz

### Requirement: Los errores de la API tienen la forma `{ errors: [...] }`

El sistema SHALL devolver los errores de validación, credenciales y autenticación como una lista `errors` con objetos que contienen `message` y, en los errores de validación, `rule` y `field`.

#### Scenario: Varios campos inválidos a la vez

- **WHEN** se envía un registro con email mal formado y contraseña de 3 caracteres
- **THEN** la respuesta es 422 con un error por cada campo inválido en `errors`, cada uno con su `rule` y su `field`

### Requirement: La pantalla de login muestra el formulario de acceso

El sistema SHALL mostrar en `/login` el título "Inicia sesión", los campos "Email" y "Contraseña", un botón "Entrar" y un enlace "Crea una" que lleva a `/register`.

#### Scenario: Visita a la pantalla de login sin sesión

- **WHEN** una persona sin sesión abre `/login`
- **THEN** ve el formulario de acceso con el botón "Entrar" y el enlace "Crea una"

### Requirement: El login abre la sesión y lleva al perfil

El sistema SHALL iniciar sesión desde la pantalla de login y SHALL llevar a la persona a `/profile` cuando el acceso es correcto.

#### Scenario: Login correcto desde la pantalla

- **WHEN** la persona escribe el email y la contraseña de una cuenta existente y pulsa "Entrar"
- **THEN** el botón muestra "Entrando…" y deshabilitado mientras espera, y después se muestra la pantalla de perfil

### Requirement: El login muestra un aviso cuando las credenciales son incorrectas

El sistema SHALL mostrar el aviso "El email o la contraseña no son correctos." encima del formulario y SHALL conservar lo escrito en los campos.

#### Scenario: Credenciales incorrectas

- **WHEN** la persona pulsa "Entrar" con un email que no existe o una contraseña incorrecta
- **THEN** aparece el aviso "El email o la contraseña no son correctos." encima del formulario, la persona sigue en `/login` y los campos mantienen sus valores

### Requirement: El login muestra los errores de validación bajo cada campo

El sistema SHALL mostrar bajo el campo afectado el mensaje correspondiente al error de validación del backend, sin bloquear el envío en el navegador.

#### Scenario: Email vacío en login

- **WHEN** la persona pulsa "Entrar" con el campo email vacío
- **THEN** aparece "Introduce una dirección de email válida." bajo el campo Email, y la petición llega al servidor

#### Scenario: Email con formato incorrecto en login

- **WHEN** la persona pulsa "Entrar" con un email como "ana"
- **THEN** aparece "Introduce una dirección de email válida." bajo el campo Email

### Requirement: La pantalla de login informa cuando no hay conexión o el servidor falla

El sistema SHALL mostrar un aviso general cuando no se puede contactar con el backend o cuando responde con un error del servidor.

#### Scenario: Backend apagado

- **WHEN** la persona pulsa "Entrar" y la petición no llega al servidor
- **THEN** aparece el aviso "No se pudo conectar con el servidor. Comprueba que el backend está arrancado."

#### Scenario: Error interno del servidor

- **WHEN** la persona pulsa "Entrar" y el servidor responde con un error 500
- **THEN** aparece el aviso "Algo ha ido mal en el servidor. Inténtalo de nuevo en un momento."

### Requirement: La pantalla de registro muestra el formulario de alta

El sistema SHALL mostrar en `/register` el título "Crea tu cuenta", los campos "Nombre completo (opcional)", "Email", "Contraseña" y "Repite la contraseña", un botón "Crear cuenta" y un enlace "Inicia sesión" que lleva a `/login`.

#### Scenario: Visita a la pantalla de registro sin sesión

- **WHEN** una persona sin sesión abre `/register`
- **THEN** ve el formulario de alta, y bajo el campo Contraseña aparece la ayuda "Entre 8 y 32 caracteres."

### Requirement: El registro comprueba en la pantalla que las contraseñas coinciden antes de llamar al servidor

El sistema SHALL mostrar "Las contraseñas no coinciden." bajo el campo "Repite la contraseña" y SHALL no enviar la petición cuando las dos contraseñas difieren.

#### Scenario: Contraseñas distintas

- **WHEN** la persona pulsa "Crear cuenta" con contraseñas distintas
- **THEN** aparece "Las contraseñas no coinciden." bajo "Repite la contraseña" y no se llama al servidor

### Requirement: El registro crea la cuenta, inicia sesión y lleva al perfil

El sistema SHALL crear la cuenta desde la pantalla de registro, dejar la sesión abierta y llevar a la persona a `/profile`.

#### Scenario: Alta correcta desde la pantalla

- **WHEN** la persona rellena un registro válido y pulsa "Crear cuenta"
- **THEN** el botón muestra "Creando cuenta…" y deshabilitado mientras espera, y después se muestra la pantalla de perfil con la sesión ya iniciada

#### Scenario: Nombre dejado en blanco

- **WHEN** la persona registra una cuenta con el campo nombre vacío o solo con espacios
- **THEN** el perfil muestra "Sin nombre" como nombre y las iniciales se calculan a partir del email

### Requirement: El registro muestra los errores del backend bajo cada campo

El sistema SHALL mostrar bajo el campo afectado el mensaje del error de validación del backend.

#### Scenario: Email ya registrado

- **WHEN** la persona intenta registrarse con un email que ya tiene cuenta
- **THEN** aparece "Ese email ya está registrado. Inicia sesión en su lugar." bajo el campo Email

#### Scenario: Contraseña de menos de 8 caracteres

- **WHEN** la persona pulsa "Crear cuenta" con una contraseña de 5 caracteres
- **THEN** aparece "La contraseña debe tener al menos 8 caracteres." bajo el campo Contraseña, en lugar de la ayuda "Entre 8 y 32 caracteres."

#### Scenario: Contraseña de más de 32 caracteres

- **WHEN** la persona pulsa "Crear cuenta" con una contraseña de 33 caracteres
- **THEN** aparece "La contraseña no puede superar los 32 caracteres." bajo el campo Contraseña

### Requirement: El registro no muestra el motivo de una sesión perdida

El sistema SHALL mostrar el aviso de sesión caducada o de error de restauración solo en la pantalla de login.

#### Scenario: Sesión caducada y visita a registro

- **WHEN** la persona llega a `/login` con un aviso de sesión caducada y pulsa "Crea una"
- **THEN** en `/register` no aparece ningún aviso de sesión caducada

### Requirement: La sesión se mantiene al recargar la página y al reabrir el navegador

El sistema SHALL recordar la sesión en el navegador y SHALL volver a validarla al arrancar la aplicación antes de dar a la persona por dentro.

#### Scenario: Recarga con sesión válida

- **WHEN** la persona tiene una sesión iniciada y recarga la página
- **THEN** durante la validación se muestra un indicador de carga "Cargando…" y después se muestra `/profile` sin pasar por el login

#### Scenario: Reapertura del navegador con sesión válida

- **WHEN** la persona cierra el navegador sin cerrar sesión y lo vuelve a abrir en `/profile`
- **THEN** se muestra el perfil si el token sigue siendo válido en el servidor

### Requirement: La aplicación echa a la persona al login cuando su sesión guardada ya no es válida

El sistema SHALL borrar la sesión guardada y llevar a `/login` con el aviso "Tu sesión ha caducado. Vuelve a iniciar sesión." cuando el servidor responde 401 al validar el token guardado.

#### Scenario: Token revocado mientras la persona no estaba

- **WHEN** la persona abre la aplicación con un token que fue revocado desde otra sesión
- **THEN** se muestra `/login` con el aviso "Tu sesión ha caducado. Vuelve a iniciar sesión.", y al recargar la página sigue en `/login` sin volver a intentarlo con ese token

### Requirement: Un fallo de conexión al arrancar no borra la sesión guardada

El sistema SHALL llevar a `/login` con el aviso correspondiente cuando no puede validar el token guardado por un fallo de red o de servidor, y SHALL conservar el token guardado en el navegador.

#### Scenario: Backend apagado al arrancar con sesión guardada

- **WHEN** la persona abre la aplicación con un token guardado y el backend no responde
- **THEN** se muestra `/login` con el aviso "No se pudo conectar con el servidor. Comprueba que el backend está arrancado.", y tras recargar con el backend ya levantado la sesión vuelve a restaurarse

### Requirement: Las pantallas de sesión iniciada no se muestran sin sesión y viceversa

El sistema SHALL redirigir a `/login` cuando una persona sin sesión abre `/profile`, y SHALL redirigir a `/profile` cuando una persona con sesión abre `/login` o `/register`.

#### Scenario: Acceso al perfil sin sesión

- **WHEN** una persona sin sesión escribe la dirección `/profile`
- **THEN** la aplicación la lleva a `/login` sin dejar `/profile` en el historial

#### Scenario: Acceso a login con sesión

- **WHEN** una persona con sesión iniciada abre `/login`
- **THEN** la aplicación la lleva a `/profile`

#### Scenario: Acceso a registro con sesión

- **WHEN** una persona con sesión iniciada abre `/register`
- **THEN** la aplicación la lleva a `/profile`

### Requirement: Las rutas no definidas llevan al perfil y, sin sesión, al login

El sistema SHALL redirigir cualquier dirección que no existe a `/profile`, y SHALL aplicar a partir de ahí las reglas de acceso al perfil.

#### Scenario: Dirección inexistente sin sesión

- **WHEN** una persona sin sesión abre `/no-existe`
- **THEN** la aplicación la lleva a `/profile` y de ahí a `/login`

### Requirement: Mientras se comprueba la sesión, las pantallas de acceso no redirigen

El sistema SHALL mostrar un indicador de carga en lugar de la pantalla solicitada mientras valida la sesión guardada, y SHALL no redirigir hasta tener el resultado.

#### Scenario: Apertura de /login con sesión guardada pendiente de validar

- **WHEN** la persona abre `/login` con un token guardado mientras la validación sigue en curso
- **THEN** se muestra "Cargando…" sin mostrar el formulario y sin redirigir

### Requirement: El cierre de sesión borra la sesión local aunque el servidor falle

El sistema SHALL cerrar la sesión en el navegador al pulsar "Cerrar sesión" y SHALL llevar a `/login`, aunque la llamada al servidor falle y sin mostrar ningún error.

#### Scenario: Cierre de sesión correcto

- **WHEN** la persona pulsa "Cerrar sesión" en el perfil
- **THEN** el botón muestra "Cerrando sesión…" deshabilitado mientras espera, y después se muestra `/login` sin aviso

#### Scenario: Cierre de sesión con el servidor caído

- **WHEN** la persona pulsa "Cerrar sesión" y el backend no responde
- **THEN** se muestra `/login` igualmente, sin aviso de error

### Requirement: El perfil muestra los datos de la persona

El sistema SHALL mostrar en `/profile` las iniciales, el nombre o "Sin nombre", el email y la fecha "Miembro desde" en formato largo en español.

#### Scenario: Perfil con nombre

- **WHEN** una persona con nombre "Ada Lovelace" abre `/profile`
- **THEN** ve el círculo con las iniciales "AL", el título "Ada Lovelace", su email y la fecha de alta con formato largo en español

### Requirement: El perfil no vuelve a comprobar la sesión mientras la persona navega

El sistema SHALL seguir mostrando el perfil cuando el token deja de ser válido en el servidor mientras la aplicación está abierta, y SHALL notarlo solo al recargar la página.

#### Scenario: Cierre de sesión en otra pestaña

- **WHEN** la persona tiene `/profile` abierto y cierra sesión en otra pestaña del mismo navegador
- **THEN** la pestaña con el perfil sigue mostrando el perfil, y al recargarla la persona acaba en `/login` con el aviso "Tu sesión ha caducado. Vuelve a iniciar sesión."

### Requirement: El aviso de sesión perdida se sustituye por el error del propio intento

El sistema SHALL mostrar en `/login` el error del intento de acceso actual en lugar del aviso previo de sesión perdida, cuando ambos existen.

#### Scenario: Intento fallido con aviso previo

- **WHEN** la persona llega a `/login` con el aviso "Tu sesión ha caducado. Vuelve a iniciar sesión." y pulsa "Entrar" con una contraseña incorrecta
- **THEN** el aviso visible pasa a ser "El email o la contraseña no son correctos."

---

## Parte B

### 1. Números
- Requisitos escritos por el agente: 38
- Requisitos comprobados por mí abriendo el código: 6 (comprobados a mano en el navegador, mirando pantalla y pestaña Network; no abrí el código fuente ni usé curl)

### 2. Incoherencias que aparecieron al escribirla
- Registro con contraseña de 7 caracteres: rechazado con 422 (coincide con el mínimo de 8). Pendiente de confirmar: el login con contraseña corta, que la spec dice que da 400 y no 422, a diferencia del registro.
- No confirmé ninguna otra incoherencia; no escribo las que solo salen de leer la spec.

### 3. Lo que no supe decidir si era bug o contrato
- **El email distingue mayúsculas y minúsculas.** Comprobado: `ana`, `Ana` y `aNa` se registran como cuentas distintas y el login con `aNA` da 400. Lectura A: decisión de producto, el email se guarda y compara tal cual. Lectura B: se olvidó normalizar, y una misma persona puede acabar con varias cuentas.
- **Los tokens no caducan.** El agente lo dedujo de que la configuración no define caducidad; yo no lo comprobé, y confirmarlo exige esperar. Lectura A: sesión larga a propósito. Lectura B: falta configurar la caducidad.