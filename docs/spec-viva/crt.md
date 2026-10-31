# Spec viva: cuentas y acceso

## Purpose

Describe cómo FlowSync permite hoy a una persona crear una cuenta, iniciar sesión, mantener la sesión entre recargas, consultar su perfil y cerrar sesión, tanto en la API como en la aplicación web.

## Requirements

### Requirement: Envoltorio de respuestas de cuenta

Las respuestas correctas de registro, inicio de sesión y perfil SHALL devolver su contenido dentro de una clave `data`, y los errores de validación (422), de credenciales (400) y de autenticación (401) SHALL devolverse en JSON como una lista bajo la clave `errors`.

#### Scenario: Respuesta correcta envuelta

- **WHEN** una petición de registro, inicio de sesión o perfil termina con éxito
- **THEN** el cuerpo de la respuesta es un objeto JSON cuyo contenido está bajo `data`

#### Scenario: Errores en JSON aunque el cliente no lo pida

- **WHEN** una petición de cuenta falla por validación, credenciales o autenticación y el cliente no ha enviado cabecera `Accept: application/json`
- **THEN** la respuesta de error se devuelve igualmente en JSON, con un objeto que contiene la lista `errors`

#### Scenario: Otros errores sin lista `errors`

- **WHEN** una petición falla por otro motivo (ruta inexistente o error interno)
- **THEN** la respuesta es JSON con el código correspondiente (404, 500…) pero sin lista `errors`: en producción solo trae `message` y en desarrollo un volcado detallado del error

### Requirement: Representación pública del usuario

Toda respuesta que incluya un usuario SHALL exponer exactamente los campos `id`, `fullName`, `email`, `initials`, `createdAt` y `updatedAt`, y MUST NOT incluir la contraseña ni su hash.

#### Scenario: Usuario devuelto sin contraseña

- **WHEN** la API devuelve un usuario (al registrarse, al iniciar sesión o al pedir el perfil)
- **THEN** el objeto usuario contiene `id`, `fullName` (texto o `null`), `email`, `initials`, `createdAt` y `updatedAt`, y no contiene ningún campo de contraseña

### Requirement: Cálculo de iniciales

El sistema SHALL calcular `initials` en mayúsculas partiendo el nombre completo por cada espacio (o, si no hay nombre, el email por la arroba) y usando solo los dos primeros fragmentos: la primera letra de cada uno si ambos tienen contenido, o las dos primeras letras del primero en otro caso.

#### Scenario: Nombre con dos o más palabras

- **WHEN** el usuario tiene `fullName` "Ada Lovelace"
- **THEN** `initials` es "AL" (primera letra de las dos primeras palabras separadas por espacio)

#### Scenario: Nombre de una sola palabra

- **WHEN** el usuario tiene `fullName` "Ada"
- **THEN** `initials` es "AD" (las dos primeras letras de esa palabra)

#### Scenario: Nombre con espacios irregulares

- **WHEN** el usuario tiene `fullName` "Ada  Lovelace" (dos espacios seguidos) o " Ada" (espacio inicial)
- **THEN** `initials` es "AD" en el primer caso y una cadena vacía en el segundo

#### Scenario: Sin nombre

- **WHEN** el usuario tiene `fullName` `null` y email "ana@flowsync.io"
- **THEN** `initials` es "AF" (primera letra de la parte anterior a la arroba y primera letra del dominio)

### Requirement: Registro de cuenta en la API

El sistema SHALL permitir crear una cuenta con `POST /api/v1/auth/signup` sin autenticación previa, y SHALL devolver el usuario creado junto con un token de acceso ya válido.

#### Scenario: Registro correcto

- **WHEN** se envía `fullName` (texto o `null`), un `email` válido y no registrado, una `password` de 8 a 32 caracteres y una `passwordConfirmation` idéntica
- **THEN** la respuesta es 200 con `data.user` (el usuario creado) y `data.token` (texto), y ese token sirve para las rutas protegidas desde ese momento

#### Scenario: Nombre vacío en la petición

- **WHEN** se envía `fullName` como cadena vacía `""`
- **THEN** el registro se acepta y la cuenta queda con `fullName` `null`

#### Scenario: Nombre ausente en la petición

- **WHEN** se envía la petición de registro sin la clave `fullName`
- **THEN** la respuesta es 422 con un error de regla `required` sobre el campo `fullName`

### Requirement: Validación del registro

El registro SHALL rechazar con 422 cualquier petición que no cumpla las reglas de los campos, devolviendo en `errors` un elemento por fallo con `message`, `rule`, `field` y, cuando aplica, `meta`.

#### Scenario: Email con formato inválido

- **WHEN** se envía un `email` que no tiene formato de email
- **THEN** la respuesta es 422 con un error de regla `email` sobre `email`

#### Scenario: Email demasiado largo

- **WHEN** se envía un `email` de más de 254 caracteres
- **THEN** la respuesta es 422 con un error de regla `maxLength` sobre `email`

#### Scenario: Email ya registrado

- **WHEN** se envía un `email` idéntico (mismas mayúsculas y minúsculas) al de una cuenta existente
- **THEN** la respuesta es 422 con un error de regla `database.unique` sobre `email` y no se crea ninguna cuenta

#### Scenario: Email existente con distinta capitalización

- **WHEN** ya existe una cuenta con "ana@flowsync.io" y se registra "Ana@flowsync.io"
- **THEN** el registro se acepta y se crea una segunda cuenta distinta

#### Scenario: Contraseña fuera de rango

- **WHEN** se envía una `password` de menos de 8 o de más de 32 caracteres
- **THEN** la respuesta es 422 con un error de regla `minLength` o `maxLength` sobre `password`, con el límite en `meta`

#### Scenario: Confirmación distinta

- **WHEN** se envía una `passwordConfirmation` de 8 a 32 caracteres que no coincide con `password`
- **THEN** la respuesta es 422 con un error de regla `sameAs` sobre `passwordConfirmation`

#### Scenario: Confirmación fuera de rango

- **WHEN** se envía una `passwordConfirmation` de menos de 8 o de más de 32 caracteres
- **THEN** la respuesta es 422 con un error `minLength` o `maxLength` sobre `passwordConfirmation`, y no se informa de `sameAs` aunque tampoco coincida

### Requirement: Inicio de sesión en la API

El sistema SHALL permitir iniciar sesión con `POST /api/v1/auth/login` enviando `email` y `password`, y SHALL emitir un token de acceso nuevo en cada inicio de sesión correcto.

#### Scenario: Credenciales correctas

- **WHEN** se envían el `email` (con la misma capitalización con la que se registró) y la `password` de una cuenta existente
- **THEN** la respuesta es 200 con `data.user` y `data.token`, un token nuevo distinto de los emitidos antes

#### Scenario: Credenciales incorrectas

- **WHEN** el `email` no corresponde a ninguna cuenta o la `password` no es la suya
- **THEN** la respuesta es 400 con una lista `errors` que contiene un único mensaje genérico, sin indicar qué campo falla

#### Scenario: Petición mal formada

- **WHEN** falta `email` o `password`, o el `email` no tiene formato de email o supera 254 caracteres
- **THEN** la respuesta es 422 con los errores por campo en `errors`

#### Scenario: Varios inicios de sesión

- **WHEN** una persona inicia sesión varias veces sin cerrar sesión
- **THEN** todos los tokens emitidos siguen siendo válidos a la vez

### Requirement: Autenticación por token

Las rutas bajo `/api/v1/account` SHALL exigir un token de acceso válido en la cabecera `Authorization: Bearer <token>` y SHALL responder 401 en otro caso. Los tokens MUST NOT caducar por tiempo.

#### Scenario: Sin token o con token no válido

- **WHEN** se llama a una ruta de cuenta sin cabecera `Authorization`, con un token inventado o con un token ya revocado
- **THEN** la respuesta es 401 con una lista `errors` que contiene un mensaje de acceso no autorizado

#### Scenario: Token antiguo

- **WHEN** se usa un token emitido hace mucho tiempo y nunca revocado
- **THEN** la petición se acepta como autenticada

### Requirement: Consulta del perfil en la API

El sistema SHALL devolver los datos del usuario autenticado con `GET /api/v1/account/profile`.

#### Scenario: Perfil propio

- **WHEN** una persona autenticada pide su perfil con su token
- **THEN** la respuesta es 200 con su usuario en `data`

### Requirement: Cierre de sesión en la API

El sistema SHALL revocar el token usado en la petición al llamar a `POST /api/v1/account/logout`, sin afectar a otros tokens de la misma persona.

#### Scenario: Cierre de sesión correcto

- **WHEN** una persona autenticada llama a cerrar sesión con su token
- **THEN** la respuesta es 200 con `{ "message": "Logged out successfully" }` (sin envoltorio `data`) y ese token deja de ser válido

#### Scenario: Otros tokens intactos

- **WHEN** una persona con dos tokens activos cierra sesión con uno de ellos
- **THEN** el otro token sigue siendo aceptado en las rutas protegidas

### Requirement: Pantalla de registro

La aplicación web SHALL ofrecer en `/register` un formulario con nombre completo (marcado como opcional), email, contraseña (con la ayuda "Entre 8 y 32 caracteres.") y repetición de contraseña, un botón "Crear cuenta" y un enlace "Inicia sesión" hacia `/login`.

#### Scenario: Registro correcto desde la pantalla

- **WHEN** una persona sin sesión rellena el formulario con datos válidos y pulsa "Crear cuenta"
- **THEN** el botón muestra "Creando cuenta…" y queda deshabilitado mientras dura la petición, y al terminar la persona queda con sesión iniciada y ve su perfil

#### Scenario: Nombre en blanco

- **WHEN** la persona deja el nombre vacío o solo con espacios y envía el formulario
- **THEN** la cuenta se crea sin nombre y el perfil muestra "Sin nombre"

#### Scenario: Contraseñas distintas detectadas en el navegador

- **WHEN** la persona escribe una contraseña y una repetición distintas y pulsa "Crear cuenta"
- **THEN** no se envía nada al servidor y bajo "Repite la contraseña" aparece "Las contraseñas no coinciden."

#### Scenario: Email ya registrado

- **WHEN** la persona intenta registrarse con un email que ya existe
- **THEN** bajo el campo email aparece "Ese email ya está registrado. Inicia sesión en su lugar."

#### Scenario: Otros errores de validación

- **WHEN** el servidor rechaza el registro por reglas de campo (email inválido, contraseña corta o larga, campo vacío)
- **THEN** cada mensaje en castellano aparece bajo su campo correspondiente (por ejemplo "Introduce una dirección de email válida." o "la contraseña debe tener al menos 8 caracteres.") y no se muestra aviso general

### Requirement: Pantalla de inicio de sesión

La aplicación web SHALL ofrecer en `/login` un formulario con email y contraseña, un botón "Entrar" y un enlace "Crea una" hacia `/register`.

#### Scenario: Inicio de sesión correcto desde la pantalla

- **WHEN** una persona sin sesión introduce credenciales correctas y pulsa "Entrar"
- **THEN** el botón muestra "Entrando…" y queda deshabilitado mientras dura la petición, y al terminar la persona ve su perfil

#### Scenario: Credenciales incorrectas

- **WHEN** la persona introduce un email o contraseña incorrectos
- **THEN** aparece un aviso destacado arriba del formulario con "El email o la contraseña no son correctos."

#### Scenario: Error de validación en el login

- **WHEN** la persona envía el formulario con el email vacío o con formato inválido
- **THEN** el mensaje en castellano aparece bajo el campo afectado ("Falta rellenar el email." o "Introduce una dirección de email válida.")

#### Scenario: Aviso de sesión perdida persistente

- **WHEN** la persona llegó a `/login` tras perder una sesión previa al recargar y envía el formulario con un error de campo
- **THEN** el error aparece bajo el campo y el aviso de la sesión perdida sigue visible arriba hasta que inicie sesión correctamente

### Requirement: Mensajes de error de red y servidor

Los formularios de acceso SHALL mostrar un aviso general comprensible cuando el servidor no responde o falla.

#### Scenario: Servidor inaccesible

- **WHEN** la persona envía el formulario de login o registro y el servidor no está disponible
- **THEN** aparece el aviso "No se pudo conectar con el servidor. Comprueba que el backend está arrancado."

#### Scenario: Error inesperado del servidor

- **WHEN** el servidor responde con un error no previsto (por ejemplo, 500)
- **THEN** aparece el aviso "Algo ha ido mal en el servidor. Inténtalo de nuevo en un momento."

### Requirement: Persistencia y restauración de la sesión

La aplicación web SHALL guardar el token en el almacenamiento local del navegador al iniciar sesión o registrarse, y al cargar la aplicación SHALL validarlo contra el perfil antes de dar la sesión por buena.

#### Scenario: Recarga con sesión válida

- **WHEN** una persona con sesión iniciada recarga la página
- **THEN** ve un indicador de carga a pantalla completa y después su perfil, sin pasar por el login

#### Scenario: Token rechazado al recargar

- **WHEN** la aplicación arranca con un token guardado que el servidor rechaza con 401
- **THEN** el token se borra del navegador, la persona llega a `/login` y ve el aviso "Tu sesión ha caducado. Vuelve a iniciar sesión."

#### Scenario: Servidor caído al recargar

- **WHEN** la aplicación arranca con un token guardado y el servidor no responde o devuelve un error distinto de 401
- **THEN** la persona llega a `/login` con el aviso del error correspondiente, pero el token se conserva en el navegador, de modo que al recargar con el servidor disponible la sesión se restaura

### Requirement: Protección de rutas en la aplicación web

La aplicación web SHALL permitir ver `/profile` solo con sesión, SHALL impedir ver `/login` y `/register` con sesión, y SHALL redirigir cualquier otra ruta a `/profile`.

#### Scenario: Perfil sin sesión

- **WHEN** una persona sin sesión abre `/profile`
- **THEN** es redirigida a `/login`

#### Scenario: Login o registro con sesión

- **WHEN** una persona con sesión abre `/login` o `/register`
- **THEN** es redirigida a `/profile`

#### Scenario: Ruta desconocida

- **WHEN** una persona abre una ruta que no existe (incluida la raíz `/`)
- **THEN** es redirigida a `/profile`, y de ahí a `/login` si no tiene sesión

#### Scenario: Sesión aún en comprobación

- **WHEN** la aplicación todavía está validando un token guardado y la persona abre cualquier ruta de acceso o de perfil
- **THEN** ve solo un indicador de carga, sin redirección, hasta que termina la comprobación

### Requirement: Pantalla de perfil

La aplicación web SHALL mostrar en `/profile` las iniciales en un círculo, el nombre completo (o "Sin nombre"), el email, la fecha de alta como "Miembro desde" en formato largo en castellano y un botón "Cerrar sesión".

#### Scenario: Perfil con nombre

- **WHEN** una persona con nombre "Ada Lovelace", registrada el 3 de marzo de 2026 a mediodía, abre su perfil
- **THEN** ve "AL", "Ada Lovelace", su email y "Miembro desde 3 de marzo de 2026"

#### Scenario: Fecha según la zona horaria del navegador

- **WHEN** la cuenta se creó cerca de la medianoche y la persona abre el perfil desde un navegador en otra zona horaria
- **THEN** la fecha de "Miembro desde" se muestra según la zona horaria del navegador, por lo que puede aparecer el día anterior o el siguiente

### Requirement: Cierre de sesión desde la aplicación web

Al pulsar "Cerrar sesión", la aplicación web SHALL cerrar la sesión local de inmediato, sea cual sea la respuesta del servidor, y SHALL pedir al servidor que revoque el token.

#### Scenario: Cierre de sesión normal

- **WHEN** una persona con sesión pulsa "Cerrar sesión"
- **THEN** el botón pasa a "Cerrando sesión…" y se deshabilita, el token se borra del navegador, la persona llega a `/login` sin ningún aviso y el servidor revoca ese token

#### Scenario: Servidor caído al cerrar sesión

- **WHEN** una persona pulsa "Cerrar sesión" y el servidor no responde
- **THEN** la persona igualmente queda sin sesión en el navegador y llega a `/login` sin ver ningún error
