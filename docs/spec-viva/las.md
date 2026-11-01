# Cuentas y acceso

## Purpose

Permitir que una persona cree una cuenta en FlowSync, inicie y cierre sesión, y consulte su perfil, de forma que solo quien tiene una sesión válida pueda acceder a las partes privadas de la aplicación.

## Requirements

### Requirement: Registro de una cuenta nueva

El sistema SHALL permitir crear una cuenta mediante `POST /api/v1/auth/signup` con `fullName`, `email`, `password` y `passwordConfirmation`; `fullName` puede valer `null`, pero la clave tiene que venir en la petición. Al crearla, la persona SHALL quedar autenticada de inmediato.

#### Scenario: Registro correcto

- **WHEN** se envía un email válido que no está registrado, una contraseña de entre 8 y 32 caracteres, la misma contraseña en `passwordConfirmation` y un `fullName` (o `null`)
- **THEN** la respuesta es un 200 con `{ data: { user, token } }`, donde `user` contiene `id`, `fullName`, `email`, `createdAt`, `updatedAt` e `initials`, la respuesta no incluye la contraseña, y `token` es un token de acceso que sirve para las rutas protegidas

#### Scenario: Registro sin nombre

- **WHEN** se registra una cuenta con `fullName` a `null`
- **THEN** la cuenta se crea igualmente y `user.fullName` vale `null`

### Requirement: Validación de los datos de registro

El sistema SHALL rechazar un registro con datos no válidos respondiendo con un 422 cuyo cuerpo contiene `errors`, una lista en la que cada error indica el campo afectado y el motivo del rechazo, y la cuenta SHALL no existir después: con ese email no se puede iniciar sesión.

#### Scenario: Email ya registrado

- **WHEN** se intenta registrar un email que ya pertenece a otra cuenta
- **THEN** la respuesta es un 422 con un error sobre `email` que indica que ya está en uso, y la cuenta existente sigue iniciando sesión con su contraseña de siempre

#### Scenario: Email con formato inválido o demasiado largo

- **WHEN** se envía un `email` que no tiene formato de email o que supera los 254 caracteres
- **THEN** la respuesta es un 422 con un error sobre `email`

#### Scenario: Contraseña fuera de rango

- **WHEN** se envía una `password` de menos de 8 caracteres o de más de 32
- **THEN** la respuesta es un 422 con un error de longitud sobre `password`

#### Scenario: La confirmación no coincide

- **WHEN** `passwordConfirmation` es distinta de `password`
- **THEN** la respuesta es un 422 con un error sobre `passwordConfirmation`

#### Scenario: Faltan campos obligatorios

- **WHEN** falta en la petición `email`, `password`, `passwordConfirmation` o la clave `fullName`
- **THEN** la respuesta es un 422 con un error de campo obligatorio sobre cada campo que falta

### Requirement: Inicio de sesión con email y contraseña

El sistema SHALL permitir iniciar sesión mediante `POST /api/v1/auth/login` con `email` y `password`, y SHALL emitir un token de acceso nuevo en cada inicio de sesión correcto.

#### Scenario: Credenciales correctas

- **WHEN** se envían el email y la contraseña de una cuenta existente
- **THEN** la respuesta es un 200 con `{ data: { user, token } }`, con la misma forma de `user` que en el registro

#### Scenario: Credenciales incorrectas

- **WHEN** se envía un email que no está registrado, o un email registrado con una contraseña que no es la suya
- **THEN** la respuesta es un 400 y no se emite ningún token; la respuesta es la misma en los dos casos y no revela si el email existe

#### Scenario: Datos de login mal formados

- **WHEN** falta el `email` o la `password`, o el `email` no tiene formato de email
- **THEN** la respuesta es un 422 con los errores por campo, no un 400 de credenciales incorrectas

#### Scenario: Varias sesiones a la vez

- **WHEN** la misma cuenta inicia sesión más de una vez
- **THEN** cada inicio de sesión recibe un token distinto y todos siguen siendo válidos a la vez

### Requirement: Protección de las rutas de cuenta

El sistema SHALL exigir un token de acceso válido, enviado como `Authorization: Bearer <token>`, en todas las rutas bajo `/api/v1/account`.

#### Scenario: Petición sin token

- **WHEN** se llama a `GET /api/v1/account/profile` o a `POST /api/v1/account/logout` sin cabecera `Authorization`
- **THEN** la respuesta es un 401

#### Scenario: Token inválido o ya cerrado

- **WHEN** se llama a una ruta de cuenta con un token que nunca se emitió o que ya se usó para cerrar sesión
- **THEN** la respuesta es un 401

#### Scenario: Un token sigue valiendo hasta cerrar sesión

- **WHEN** se usa un token con el que no se ha cerrado sesión, haya pasado el tiempo que haya pasado desde que se emitió
- **THEN** la petición se acepta

### Requirement: Consulta del perfil propio

El sistema SHALL devolver mediante `GET /api/v1/account/profile` los datos de la cuenta dueña del token.

#### Scenario: Perfil con sesión válida

- **WHEN** se pide el perfil con un token válido
- **THEN** la respuesta es un 200 con `{ data: user }`, con los campos `id`, `fullName`, `email`, `createdAt`, `updatedAt` e `initials`

#### Scenario: Iniciales a partir del nombre

- **WHEN** la cuenta tiene un `fullName` de al menos dos palabras separadas por espacio
- **THEN** `initials` está formado por la primera letra de la primera palabra y la primera letra de la segunda, en mayúsculas

#### Scenario: Iniciales sin nombre

- **WHEN** la cuenta no tiene `fullName`
- **THEN** `initials` se calcula a partir del email, tomando como palabras la parte anterior y la posterior a la `@`

#### Scenario: Iniciales con una sola palabra

- **WHEN** el `fullName` tiene una sola palabra
- **THEN** `initials` son las dos primeras letras de esa palabra, en mayúsculas

### Requirement: Cierre de sesión en el servidor

El sistema SHALL invalidar mediante `POST /api/v1/account/logout` el token con el que se hace la petición, de modo que deje de aceptarse.

#### Scenario: Cierre de sesión correcto

- **WHEN** se cierra la sesión con un token válido
- **THEN** la respuesta es un 200 con `{ message: "Logged out successfully" }` y ese token deja de ser aceptado en las rutas protegidas

#### Scenario: El cierre solo afecta al token usado

- **WHEN** una cuenta con varias sesiones abiertas cierra una de ellas
- **THEN** solo deja de aceptarse el token usado en esa petición y los demás siguen funcionando

### Requirement: Pantalla de registro

La aplicación web SHALL ofrecer en `/register` un formulario con «Nombre completo (opcional)», «Email», «Contraseña» (con la indicación «Entre 8 y 32 caracteres.») y «Repite la contraseña», y un enlace a la pantalla de inicio de sesión.

#### Scenario: Registro desde la pantalla

- **WHEN** la persona rellena el formulario con datos válidos y pulsa «Crear cuenta»
- **THEN** el botón pasa a «Creando cuenta…» y se desactiva mientras se envía, se abre la sesión y la persona llega a su perfil

#### Scenario: Las contraseñas no coinciden en el navegador

- **WHEN** la contraseña y su repetición no coinciden al pulsar «Crear cuenta»
- **THEN** aparece al momento «Las contraseñas no coinciden.» bajo la repetición, el botón no pasa a «Creando cuenta…» y la persona sigue en la pantalla de registro

#### Scenario: Nombre en blanco

- **WHEN** el nombre se deja vacío o con solo espacios
- **THEN** la cuenta se crea sin nombre

#### Scenario: Errores de validación del servidor

- **WHEN** el servidor rechaza el registro por la validación
- **THEN** cada error aparece en castellano bajo su campo (por ejemplo, «Ese email ya está registrado. Inicia sesión en su lugar.»); si algún error afecta a un campo que no está en pantalla, el mensaje aparece en un aviso destacado encima del formulario

### Requirement: Pantalla de inicio de sesión

La aplicación web SHALL ofrecer en `/login` un formulario con «Email» y «Contraseña», un botón «Entrar» y un enlace a la pantalla de registro.

#### Scenario: Inicio de sesión desde la pantalla

- **WHEN** la persona introduce unas credenciales correctas y pulsa «Entrar»
- **THEN** el botón pasa a «Entrando…» y se desactiva mientras se envía, se abre la sesión y la persona llega a su perfil

#### Scenario: Credenciales incorrectas en pantalla

- **WHEN** el servidor rechaza las credenciales
- **THEN** aparece un aviso destacado con «El email o la contraseña no son correctos.» y la persona sigue en la pantalla de inicio de sesión

#### Scenario: Servidor inaccesible

- **WHEN** no se puede conectar con el servidor al enviar el formulario
- **THEN** aparece un aviso con «No se pudo conectar con el servidor. Comprueba que el backend está arrancado.»

#### Scenario: Error inesperado del servidor

- **WHEN** el servidor responde con un error que no es de validación, de credenciales ni de autenticación
- **THEN** aparece un aviso con «Algo ha ido mal en el servidor. Inténtalo de nuevo en un momento.»

### Requirement: Persistencia de la sesión en el navegador

La aplicación web SHALL mantener a la persona dentro de su sesión al recargar o volver a abrir la aplicación, mientras esa sesión siga siendo válida en el servidor.

#### Scenario: Recarga con una sesión válida

- **WHEN** la persona recarga la página teniendo una sesión abierta
- **THEN** ve un indicador de carga un momento y después sigue dentro sin volver a iniciar sesión

#### Scenario: La sesión ya no es válida

- **WHEN** la persona vuelve a abrir la aplicación y su sesión ya no es válida en el servidor (por ejemplo, porque se cerró desde otro sitio)
- **THEN** llega a la pantalla de inicio de sesión con el aviso «Tu sesión ha caducado. Vuelve a iniciar sesión.», y si recarga sigue fuera

#### Scenario: El servidor no está disponible al arrancar

- **WHEN** la persona tiene una sesión abierta y vuelve a abrir la aplicación cuando el servidor no responde o falla
- **THEN** llega a la pantalla de inicio de sesión con un aviso que explica el motivo y, si recarga cuando el servidor vuelve a responder, entra directamente a su perfil sin iniciar sesión

### Requirement: Acceso a las pantallas según la sesión

La aplicación web SHALL mostrar el perfil solo a quien tiene sesión, y las pantallas de inicio de sesión y registro solo a quien no la tiene.

#### Scenario: Acceso al perfil sin sesión

- **WHEN** una persona sin sesión abre `/profile`
- **THEN** se la redirige a `/login`

#### Scenario: Acceso a login o registro con sesión

- **WHEN** una persona con sesión abre `/login` o `/register`
- **THEN** se la redirige a `/profile`

#### Scenario: Dirección desconocida

- **WHEN** se abre cualquier dirección que no es `/login`, `/register` ni `/profile`
- **THEN** se redirige a `/profile`, y desde ahí a `/login` si no hay sesión

#### Scenario: Mientras se comprueba la sesión

- **WHEN** la persona abre la aplicación con una sesión abierta y el servidor todavía no ha respondido
- **THEN** las pantallas de acceso y de perfil muestran un indicador de carga y no la redirigen a ningún sitio

### Requirement: Pantalla de perfil

La aplicación web SHALL mostrar en `/profile` las iniciales, el nombre, el email y la fecha de alta de la persona, y un botón para cerrar sesión.

#### Scenario: Perfil con nombre

- **WHEN** una persona con nombre abre su perfil
- **THEN** ve un círculo con sus iniciales, su nombre, su email y «Miembro desde» con la fecha de alta en formato largo en castellano (por ejemplo, «1 de noviembre de 2026»)

#### Scenario: Perfil sin nombre

- **WHEN** una persona que se registró sin nombre abre su perfil
- **THEN** en lugar del nombre ve «Sin nombre»

### Requirement: Cierre de sesión desde la aplicación

La aplicación web SHALL sacar a la persona de su sesión siempre que lo pida, responda o no el servidor.

#### Scenario: Cerrar sesión

- **WHEN** la persona pulsa «Cerrar sesión» en su perfil
- **THEN** el botón pasa a «Cerrando sesión…», la persona llega a la pantalla de inicio de sesión sin ningún aviso, y si vuelve a abrir `/profile` o recarga se la manda de nuevo al inicio de sesión

#### Scenario: Cerrar sesión con el servidor caído

- **WHEN** la persona cierra sesión y el servidor no responde o rechaza la petición
- **THEN** llega igualmente a la pantalla de inicio de sesión, sin ningún aviso de error

---

# Las tres listas

| Requisitos escritos | Requisitos comprobados |
|---------------------|------------------------|
| 12 (39 escenarios)  | 3                      |

## Incoherencias

### Requirement: Registro de una cuenta nueva

- Especifica que el endpoint `/api/v1/auth/signup` puede recibir un `passwordConfirmation`, y el validador `validateUsing` lo tiene definido. Sin embargo, el controlador `NewAccountController` solo se deserializa `fullName`, `email`, `password`, con lo que el `passwordConfirmation` no se está usando.
- Indica que se comprueba que la contraseña es igual que `passwordConfirmation`, pero en las validaciones de `signupValidator` realmente se está usando `password` tanto en `password` como en `passwordConfirmation`, con lo que realmente no solo no se usa la confirmación del password, si no que a la hora de realizar las validaciones se usa el mismo valor en ambos campos, con lo que la contraseña siempre será correcta.

### Requirement: Validación de los datos de registro

- `passwordConfirmation` utiliza el valor de `password` para compararse contra si misma (`passwordConfirmation: password().sameAs('password')`), con lo que nunca se llega a usar `passwordConfirmation` en la creación del usuario.

### Requirement: Inicio de sesión con email y contraseña

- En caso de que se envío un email que no está registrado, o un email registrado con una contraseña que no es la suya, debería devolver un 400 y no emitir ningún token. Sin embargo, revisando el endpoint en back-end el método `User.verifyCredentials` parece que siempre devuelve un usuario, sin comprobar si existe realmente en la base de datos. De igual manera, siempre devolverá un `token` serializado en la respuesta, mientras que la spec viva dice que no debería devolverlo en caso de que las credenciales sean incorrectas.

### Requirement: Protección de las rutas de cuenta

- Se me ha agotado el tiempo, y no he podido encontrar la implementación del middleware de autenticación que comprueba que el formato del token es `Authorization: Bearer <token>`.

## ¿Bug o contrato?

En ningún momento se transforma un email a minúsculas, con lo que una persona que se registre con su email en minúsculas e intente acceder a la aplicación escribiendo su email en mayúsculas (o con la primera letra mayúscula desde el móvil, un comportamiento habitual en las cajas de texto), podrá tener problemas de inicio de sesión. ¿Debería ser así o falta hacer un `toLowerCase()` en la validación del campo?
