## Purpose

El módulo de cuentas y acceso permite que una persona cree su cuenta, inicie y cierre sesión y consulte su perfil, tanto desde la API como desde la aplicación web. Además, impide que alguien sin sesión válida acceda a las partes privadas.

## Requirements

### Requirement: Registro de cuenta en la API
La API SHALL aceptar `POST /api/v1/auth/signup` con un cuerpo JSON que incluya `fullName`, `email`, `password` y `passwordConfirmation`. Cuando los datos son válidos, SHALL crear la cuenta y devolver en la misma respuesta el usuario creado y un token de acceso, de modo que la persona queda ya con la sesión iniciada.

> Estado: pendiente de verificar

#### Scenario: Registro correcto con nombre
- **WHEN** se envía `fullName` "Ada Lovelace", un `email` válido que no está registrado, una `password` de entre 8 y 32 caracteres y una `passwordConfirmation` igual a la contraseña
- **THEN** la API responde 200 con `{ "data": { "user": {...}, "token": "<token>" } }`, y el token sirve desde ese momento para las peticiones autenticadas

#### Scenario: Registro correcto sin nombre
- **WHEN** se envía `fullName` con valor `null` (o una cadena vacía) junto con un email, una contraseña y una confirmación válidos
- **THEN** la API responde 200, crea la cuenta y devuelve el usuario con `fullName` igual a `null`

### Requirement: Validación de los datos de registro
La API SHALL rechazar el registro con un 422 cuando algún campo no cumple las reglas. El cuerpo SHALL tener la forma `{ "errors": [{ "message", "rule", "field", "meta"? }] }` y los mensajes vendrán en inglés. Las reglas son las siguientes:
- `fullName` debe venir siempre en el cuerpo, aunque sea `null`, y no tiene longitud máxima.
- `email` es obligatorio, debe tener formato de email válido, como máximo 254 caracteres, y no puede estar ya registrado.
- `password` es obligatoria y debe tener entre 8 y 32 caracteres.
- `passwordConfirmation` es obligatoria, debe tener entre 8 y 32 caracteres y debe ser igual a `password`.

> Estado: pendiente de verificar

#### Scenario: Email ya registrado
- **WHEN** se intenta registrar un email que ya existe exactamente igual en otra cuenta
- **THEN** la API responde 422 con un error cuyo `field` es `email`, cuya `rule` es `database.unique` y cuyo `message` es "The email has already been taken"
> Estado: Verificado

#### Scenario: Contraseñas distintas
- **WHEN** `password` y `passwordConfirmation` tienen la longitud correcta pero no coinciden
- **THEN** la API responde 422 con un error cuyo `field` es `passwordConfirmation` y cuya `rule` es `sameAs`
> Estado: Verificado

#### Scenario: Contraseña demasiado corta o demasiado larga
- **WHEN** la `password` tiene menos de 8 caracteres o más de 32
- **THEN** la API responde 422 con un error en el campo `password`, con `rule` `minLength` o `maxLength`
> Estado: Verificado

#### Scenario: Email con formato inválido
- **WHEN** el `email` no tiene formato de dirección de correo
- **THEN** la API responde 422 con un error en el campo `email` y `rule` `email`
> Estado: Verificado

#### Scenario: Falta la clave fullName
- **WHEN** el cuerpo del registro no incluye la clave `fullName`
- **THEN** la API responde 422 con un error en el campo `fullName` y `rule` `required`
> Estado: Verificado

### Requirement: El email distingue mayúsculas y minúsculas
La API SHALL tratar el email tal como llega, sin pasarlo a minúsculas y sin recortar espacios, tanto al registrar como al iniciar sesión.

> Estado: pendiente de verificar
> Estado: Verificado

#### Scenario: Dos cuentas que solo se diferencian en las mayúsculas
- **WHEN** existe una cuenta con "ana@ejemplo.com" y alguien se registra con "Ana@ejemplo.com"
- **THEN** la API acepta el registro y crea una segunda cuenta distinta
> Estado: Verificado

#### Scenario: Login con distintas mayúsculas
- **WHEN** existe una cuenta con "ana@ejemplo.com" y se inicia sesión con "ANA@ejemplo.com" y la contraseña correcta
- **THEN** la API responde 400 por credenciales inválidas
> Estado: Verificado

### Requirement: Inicio de sesión en la API
La API SHALL aceptar `POST /api/v1/auth/login` con `email` y `password`. Cuando las credenciales son correctas, SHALL devolver el usuario y un token de acceso nuevo. Cada inicio de sesión genera un token distinto y los anteriores siguen siendo válidos.

> Estado: pendiente de verificar

#### Scenario: Login correcto
- **WHEN** se envía el email de una cuenta existente, escrito igual que al registrarla, junto con su contraseña correcta
- **THEN** la API responde 200 con `{ "data": { "user": {...}, "token": "<token>" } }`

#### Scenario: Varios logins de la misma cuenta
- **WHEN** la misma cuenta inicia sesión dos veces
- **THEN** la API devuelve un token distinto cada vez y los dos sirven para hacer peticiones autenticadas

### Requirement: Validación de los datos de login
La API SHALL rechazar el inicio de sesión con un 422 y el mismo formato de errores que el registro cuando falta el email, cuando el email no tiene formato válido o supera los 254 caracteres, o cuando falta la contraseña. La contraseña no tiene longitud mínima ni máxima al iniciar sesión.

> Estado: pendiente de verificar

#### Scenario: Email vacío
- **WHEN** se envía el login con `email` vacío o sin la clave `email`
- **THEN** la API responde 422 con un error en el campo `email` y `rule` `required`

#### Scenario: Contraseña vacía
- **WHEN** se envía el login con un email válido y `password` vacía o sin la clave `password`
- **THEN** la API responde 422 con un error en el campo `password` y `rule` `required`

### Requirement: Credenciales incorrectas
La API SHALL responder 400 con `{ "errors": [{ "message": "Invalid user credentials" }] }` cuando el email no corresponde a ninguna cuenta o la contraseña no es la correcta. La respuesta es idéntica en los dos casos y no indica cuál de los dos datos falló.

> Estado: pendiente de verificar

#### Scenario: Contraseña incorrecta
- **WHEN** se inicia sesión con el email de una cuenta existente y una contraseña que no es la suya
- **THEN** la API responde 400 con el mensaje "Invalid user credentials"

#### Scenario: Email inexistente
- **WHEN** se inicia sesión con un email válido que no pertenece a ninguna cuenta
- **THEN** la API responde 400 con el mismo mensaje "Invalid user credentials"

### Requirement: Datos del usuario expuestos por la API
Siempre que la API devuelve un usuario, SHALL incluir exactamente los campos `id`, `fullName`, `email`, `createdAt`, `updatedAt` e `initials`, y nunca la contraseña. El campo `initials` SHALL calcularse así, siempre en mayúsculas:
- Si hay nombre, se toma la primera letra de sus dos primeras palabras.
- Si no hay nombre, se usa la parte del email anterior a la `@` y la posterior.
- Si solo hay una parte, se toman sus dos primeras letras.

> Estado: pendiente de verificar

#### Scenario: Iniciales con nombre y apellido
- **WHEN** el usuario se llama "Ada Lovelace"
- **THEN** `initials` vale "AL"

#### Scenario: Iniciales con una sola palabra
- **WHEN** el usuario se llama "Ada"
- **THEN** `initials` vale "AD"

#### Scenario: Iniciales sin nombre
- **WHEN** el usuario no tiene nombre y su email es "ana@ejemplo.com"
- **THEN** `initials` vale "AE"

#### Scenario: Nombre con espacios dobles
- **WHEN** el usuario se llama "Ada  Lovelace", con dos espacios entre las palabras
- **THEN** `initials` vale "AD"

### Requirement: Consulta del perfil en la API
La API SHALL aceptar `GET /api/v1/account/profile` con la cabecera `Authorization: Bearer <token>` y SHALL devolver 200 con `{ "data": { ...usuario } }`, donde el usuario es el dueño del token.

> Estado: pendiente de verificar

#### Scenario: Perfil con token válido
- **WHEN** se pide el perfil con un token obtenido en un registro o login y que no se ha revocado
- **THEN** la API responde 200 con los datos del usuario dueño del token

### Requirement: Rechazo de peticiones sin token válido
La API SHALL responder 401 con `{ "errors": [{ "message": "Unauthorized access" }] }` a las peticiones de perfil y de cierre de sesión que no traen token, que traen un token mal formado o que traen un token que ya no existe.

> Estado: pendiente de verificar

#### Scenario: Sin cabecera de autorización
- **WHEN** se pide el perfil sin cabecera `Authorization`
- **THEN** la API responde 401 con el mensaje "Unauthorized access"

#### Scenario: Token revocado
- **WHEN** se pide el perfil con un token que ya se usó para cerrar sesión
- **THEN** la API responde 401 con el mensaje "Unauthorized access"

### Requirement: Cierre de sesión en la API
La API SHALL aceptar `POST /api/v1/account/logout` con un token válido, SHALL revocar únicamente ese token y SHALL responder 200 con `{ "message": "Logged out successfully" }`. Esta respuesta no va envuelta en `data`. Los demás tokens de la misma cuenta siguen siendo válidos.

> Estado: pendiente de verificar

#### Scenario: Logout correcto
- **WHEN** se cierra sesión con un token válido
- **THEN** la API responde 200 con `{ "message": "Logged out successfully" }`, y ese token responde 401 en cualquier petición posterior

#### Scenario: Otras sesiones abiertas
- **WHEN** una cuenta tiene dos tokens activos y cierra sesión con uno de ellos
- **THEN** el otro token sigue funcionando para consultar el perfil

### Requirement: Los tokens no caducan
La API SHALL emitir tokens de acceso sin fecha de caducidad. Un token SHALL dejar de valer solo cuando se revoca con un cierre de sesión hecho con ese mismo token o cuando desaparece la cuenta a la que pertenece.

> Estado: pendiente de verificar

#### Scenario: Token antiguo
- **WHEN** se usa un token emitido hace mucho tiempo y nunca revocado
- **THEN** la API lo acepta y responde 200 al pedir el perfil

### Requirement: Protección de la zona privada en la web
La aplicación web SHALL permitir entrar en `/profile` solo con una sesión válida. Mientras comprueba una sesión guardada, SHALL mostrar únicamente un indicador de carga a pantalla completa.

> Estado: pendiente de verificar

#### Scenario: Acceso sin sesión
- **WHEN** una persona sin sesión abre `/profile`
- **THEN** la aplicación la redirige a `/login`

#### Scenario: Comprobando la sesión guardada
- **WHEN** una persona abre la aplicación con un token guardado y el servidor todavía no ha respondido
- **THEN** ve solo un indicador de carga, sin que se la redirija a ningún sitio

### Requirement: Login y registro solo para quien no tiene sesión
La aplicación web SHALL redirigir a `/profile` a cualquier persona con sesión válida que abra `/login` o `/register`.

> Estado: pendiente de verificar

#### Scenario: Abrir el login con sesión
- **WHEN** una persona con sesión válida abre `/login` o `/register`
- **THEN** la aplicación la redirige a `/profile`

### Requirement: Direcciones desconocidas
La aplicación web SHALL redirigir a `/profile` cualquier dirección que no sea `/login`, `/register` ni `/profile`, incluida la raíz `/`. Tras iniciar sesión o registrarse, SHALL llevar siempre a `/profile`, sin recordar la dirección a la que se intentó ir antes.

> Estado: pendiente de verificar

#### Scenario: Dirección desconocida sin sesión
- **WHEN** una persona sin sesión abre `/` o cualquier dirección desconocida
- **THEN** pasa por `/profile` y termina en `/login`

#### Scenario: Dirección desconocida con sesión
- **WHEN** una persona con sesión válida abre una dirección desconocida
- **THEN** termina en `/profile`

### Requirement: Pantalla de inicio de sesión
La pantalla `/login` SHALL mostrar los siguientes elementos:
- El nombre "FlowSync".
- El título "Inicia sesión" y el texto "Entra con tu cuenta para volver a tus tareas.".
- Los campos "Email", con el ejemplo "tu@email.com", y "Contraseña".
- El botón "Entrar".
- El texto "¿Aún no tienes cuenta?" con el enlace "Crea una", que lleva a `/register`.

El navegador no valida los campos antes de enviar el formulario.

> Estado: pendiente de verificar

#### Scenario: Envío en curso
- **WHEN** la persona pulsa "Entrar" y el servidor aún no ha respondido
- **THEN** el botón muestra "Entrando…" y queda desactivado

#### Scenario: Login correcto desde la web
- **WHEN** la persona introduce un email y una contraseña correctos y pulsa "Entrar"
- **THEN** la sesión queda iniciada y la aplicación la lleva a `/profile`

### Requirement: Mensajes de error en el inicio de sesión
La pantalla de login SHALL mostrar en castellano los errores de cada campo debajo del campo correspondiente. Los errores que no corresponden a un campo SHALL mostrarse en un aviso rojo encima del formulario.

> Estado: pendiente de verificar

#### Scenario: Credenciales incorrectas en la web
- **WHEN** la persona introduce un email o una contraseña incorrectos
- **THEN** ve encima del formulario el aviso "El email o la contraseña no son correctos."

#### Scenario: Campos vacíos o email inválido
- **WHEN** la persona envía el formulario con el email vacío, con un email sin formato válido o con la contraseña vacía
- **THEN** ve debajo del campo afectado "Falta rellenar el email.", "Introduce una dirección de email válida." o "Falta rellenar la contraseña.", según el caso

#### Scenario: Servidor inaccesible al iniciar sesión
- **WHEN** la persona pulsa "Entrar" y no se puede contactar con el servidor
- **THEN** ve el aviso "No se pudo conectar con el servidor. Comprueba que el backend está arrancado."

#### Scenario: Error inesperado del servidor
- **WHEN** el servidor responde con un error que no es 400, 401 ni 422
- **THEN** la persona ve el aviso "Algo ha ido mal en el servidor. Inténtalo de nuevo en un momento."

#### Scenario: Cualquier 400 se muestra como credenciales incorrectas
- **WHEN** el servidor responde 400 por un motivo distinto de las credenciales
- **THEN** la persona ve igualmente "El email o la contraseña no son correctos."

### Requirement: Pantalla de registro
La pantalla `/register` SHALL mostrar los siguientes elementos:
- El nombre "FlowSync".
- El título "Crea tu cuenta" y el texto "Regístrate para empezar a organizar el trabajo del equipo.".
- Los campos "Nombre completo (opcional)", "Email", "Contraseña" (con la pista "Entre 8 y 32 caracteres.") y "Repite la contraseña".
- El botón "Crear cuenta".
- El texto "¿Ya tienes cuenta?" con el enlace "Inicia sesión", que lleva a `/login`.

Si el nombre está vacío o solo tiene espacios, SHALL enviarse como nulo.

> Estado: pendiente de verificar

#### Scenario: Registro correcto desde la web
- **WHEN** la persona rellena el formulario con datos válidos y pulsa "Crear cuenta"
- **THEN** la cuenta se crea, la sesión queda iniciada sin tener que hacer login y la aplicación la lleva a `/profile`

#### Scenario: Envío del registro en curso
- **WHEN** la persona pulsa "Crear cuenta" y el servidor aún no ha respondido
- **THEN** el botón muestra "Creando cuenta…" y queda desactivado

#### Scenario: Contraseñas distintas detectadas en el navegador
- **WHEN** la persona escribe dos contraseñas distintas y pulsa "Crear cuenta"
- **THEN** ve "Las contraseñas no coinciden." debajo de "Repite la contraseña" y no se envía nada al servidor

### Requirement: Mensajes de error en el registro
La pantalla de registro SHALL mostrar en castellano, debajo de cada campo, los errores de validación que devuelve el servidor. Cuando hay un error que no corresponde a ningún campo de la pantalla, o un error sin campo, SHALL mostrar un aviso rojo encima del formulario.

> Estado: pendiente de verificar

#### Scenario: Email ya registrado en la web
- **WHEN** la persona intenta registrarse con un email que ya existe
- **THEN** ve debajo del campo Email "Ese email ya está registrado. Inicia sesión en su lugar."

#### Scenario: Contraseña demasiado corta en la web
- **WHEN** la persona usa una contraseña de menos de 8 caracteres, repetida igual en los dos campos
- **THEN** ve debajo del campo Contraseña, en lugar de la pista, "la contraseña debe tener al menos 8 caracteres.", y debajo de "Repite la contraseña" ve "la confirmación de la contraseña debe tener al menos 8 caracteres."

#### Scenario: Contraseña demasiado larga en la web
- **WHEN** la persona usa una contraseña de más de 32 caracteres, repetida igual en los dos campos
- **THEN** ve debajo del campo Contraseña "la contraseña no puede superar los 32 caracteres.", y debajo de "Repite la contraseña" ve "la confirmación de la contraseña no puede superar los 32 caracteres."

#### Scenario: Servidor inaccesible al registrarse
- **WHEN** la persona pulsa "Crear cuenta" y no se puede contactar con el servidor
- **THEN** ve el aviso "No se pudo conectar con el servidor. Comprueba que el backend está arrancado."

### Requirement: Sesión persistente en el navegador
La aplicación web SHALL guardar el token en el almacenamiento local del navegador al iniciar sesión o registrarse. Al volver a abrir la aplicación, SHALL comprobar ese token contra el servidor antes de dar la sesión por válida. Fuera de esa comprobación inicial, la aplicación no vuelve a validar el token mientras se usa.

> Estado: pendiente de verificar
> Duda: ¿bug o diseño? Ver Lista 3

#### Scenario: Recarga con sesión válida
- **WHEN** una persona con sesión iniciada recarga la página
- **THEN** sigue dentro y ve su perfil, sin tener que iniciar sesión de nuevo

#### Scenario: Token rechazado al recargar
- **WHEN** una persona abre la aplicación con un token guardado que el servidor ya no acepta
- **THEN** se borra el token guardado, la persona termina en `/login` y ve el aviso "Tu sesión ha caducado. Vuelve a iniciar sesión."

#### Scenario: Servidor caído al recargar
- **WHEN** una persona abre la aplicación con un token guardado y el servidor no responde
- **THEN** termina en `/login` con el aviso "No se pudo conectar con el servidor. Comprueba que el backend está arrancado.", y el token sigue guardado en el navegador

#### Scenario: Error del servidor al recargar
- **WHEN** una persona abre la aplicación con un token guardado y el servidor responde con un error 5xx
- **THEN** termina en `/login` con el aviso "Algo ha ido mal en el servidor. Inténtalo de nuevo en un momento.", y el token sigue guardado en el navegador

#### Scenario: Token revocado mientras se usa la aplicación
- **WHEN** el token de una persona deja de ser válido en el servidor mientras ella tiene abierta la aplicación
- **THEN** sigue viendo su perfil hasta que recarga la página

### Requirement: Aviso de sesión perdida en el login
La pantalla de login SHALL seguir mostrando el aviso que explica por qué se perdió la sesión anterior hasta que la persona inicia sesión con éxito o se registra, aunque mientras tanto haya intentos fallidos con errores en algún campo. Ese aviso no aparece en la pantalla de registro.

> Estado: pendiente de verificar
> Duda: ¿bug o diseño? Ver Lista 3

#### Scenario: Error de campo con aviso de sesión pendiente
- **WHEN** la persona llega a `/login` con el aviso "Tu sesión ha caducado. Vuelve a iniciar sesión." y envía el formulario con el email vacío
- **THEN** sigue viendo ese aviso encima del formulario y, además, "Falta rellenar el email." debajo del campo

### Requirement: Pantalla de perfil
La pantalla `/profile` SHALL mostrar las iniciales del usuario dentro de un círculo, su nombre completo (o "Sin nombre" si no tiene), su email y la línea "Miembro desde" con la fecha de alta en formato largo en español. También SHALL mostrar un botón "Cerrar sesión".

> Estado: pendiente de verificar

#### Scenario: Usuario con nombre
- **WHEN** entra en su perfil una persona llamada "Ada Lovelace", registrada el 29 de octubre de 2026
- **THEN** ve "AL", "Ada Lovelace", su email y "Miembro desde 29 de octubre de 2026"

#### Scenario: Usuario sin nombre
- **WHEN** entra en su perfil una persona que se registró sin nombre
- **THEN** ve "Sin nombre" en lugar del nombre

### Requirement: Cierre de sesión desde la web
Al pulsar "Cerrar sesión", la aplicación web SHALL cerrar la sesión en el navegador de inmediato y llevar a la persona a `/login` sin ningún aviso. Después SHALL pedir al servidor que revoque el token. Si esa petición falla, la aplicación no lo muestra.

> Estado: pendiente de verificar
> Duda: ¿bug o diseño? Ver Lista 3

#### Scenario: Cerrar sesión
- **WHEN** la persona pulsa "Cerrar sesión" en su perfil
- **THEN** el botón muestra "Cerrando sesión…", la persona termina en `/login` sin aviso y ya no hay sesión guardada en el navegador

#### Scenario: Cerrar sesión con el servidor caído
- **WHEN** la persona pulsa "Cerrar sesión" y el servidor no responde
- **THEN** igualmente termina en `/login` sin aviso, y el token sigue siendo válido en el servidor


---
## Lista 1 — Requisitos generados y comprobados
- Generados por el agente: 22
- Comprobados por mí: 8

## Lista 2 — Incoherencias detectadas
- (por verificar) Los mensajes del frontend hablan de "sesión caducada", pero los tokens no caducan nunca; el 401 solo ocurre si se revoca el token.
- (por verificar) Cualquier error 400 se muestra como "email o contraseña incorrectos", aunque la causa sea otra (también en registro).
- El agente al usar:grep -rn "message" backend/app/controllers/ me dice: La API devuelve los errores en inglés (los genera la librería) y el frontend los traduce por código de estado; por eso cualquier 400 se muestra como "email o contraseña incorrectos", aunque la causa sea otra (también en registro).
- (por verificar) La respuesta del logout no usa el mismo formato (envoltorio data) que el resto de la API.
- (por verificar) En login, el aviso de sesión perdida sigue visible junto al error de un campo; solo se borra al entrar con éxito.
- (por verificar) El nombre completo es opcional en la pantalla, pero la API exige que el campo venga siempre (aunque sea null); si se omite, responde 422.
- (Verificado) Con espacios dobles en el nombre, las iniciales salen mal ("Ada  Lovelace" → "AD").

## Lista 3 — Comportamientos sin clasificar (bug o contrato)
- **Los tokens no caducan y los anteriores siguen válidos tras un nuevo login.**
  - Si es bug: falta expiración y revocación de sesiones viejas, lo que es un riesgo de seguridad.
  - Si es contrato: decisión deliberada para no obligar al usuario a volver a entrar.
  - Por qué el código no lo aclara: no hay comentario, test ni documento que diga cuál es la intención.
- **El email distingue mayúsculas y minúsculas.**
  - Si es bug: el usuario puede crear dos cuentas con el "mismo" email pero luego no le deja ingresar, le dice: "El email o la contraseña no son correctos."
  - Si es contrato: se decidió tratar el email tal cual se escribe.
  - Por qué el código no lo aclara: el validador no normaliza el email, pero tampoco hay nada que diga si fue a propósito.
- **La sesión no se revalida mientras se usa la app.**
  - Si es bug: un usuario con el token revocado sigue viendo su perfil.
  - Si es contrato: se comprueba solo al cargar para ahorrar peticiones.
  - Por qué el código no lo aclara: no hay comentario ni test que explique si se decidió así.
- **El logout cierra la sesión en el navegador aunque el servidor no responda, y el token sigue válido.**
  - Si es bug: el token queda vivo y cualquiera que lo tenga sigue entrando.
  - Si es contrato: se prioriza que el usuario salga rápido aunque falle la red.
  - Por qué el código no lo aclara: no hay reintento ni aviso, y no se sabe si se aceptó ese riesgo a propósito.
- **Con el servidor caído al recargar, la app manda a login pero conserva el token.**
  - Si es bug: el usuario ve "inicia sesión" teniendo una sesión válida.
  - Si es contrato: se guarda el token para no perder la sesión si es una caída momentánea.
  - Por qué el código no lo aclara: no hay comentario ni test que explique la intención.

## Notas fuera de alcance
- CORS con la lista de orígenes vacía en producción: el usuario vería un mensaje de "no se pudo conectar" que no describe el problema real.
- El guard web y el middleware de sesión por cookie están configurados pero no se usan.

