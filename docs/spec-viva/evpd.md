# Cuentas y acceso

## Purpose

Permite que una persona cree una cuenta en FlowSync, entre y salga de ella, y consulte su perfil, de modo que solo quien se ha identificado pueda acceder a las zonas privadas de la aplicación.

## Requirements

### Requirement: Registro de cuenta por API

El sistema SHALL aceptar `POST /api/v1/auth/signup` con un cuerpo JSON que contenga `fullName` (texto u opcionalmente `null`), `email`, `password` y `passwordConfirmation`, y SHALL crear la cuenta y devolver en la misma respuesta una sesión ya iniciada.

#### Scenario: Registro correcto

- **WHEN** se envía un registro con un email válido no usado por ninguna otra cuenta, una contraseña de entre 8 y 32 caracteres y una confirmación idéntica
- **THEN** la respuesta es un 200 con cuerpo `{ "data": { "user": { ... }, "token": "<token>" } }`, donde `user` contiene `id`, `fullName`, `email`, `initials`, `createdAt` y `updatedAt`, y la contraseña no aparece en ningún campo

#### Scenario: Nombre ausente o vacío

- **WHEN** se envía un registro válido con `fullName` a `null` o como cadena vacía
- **THEN** la cuenta se crea igualmente y el `user` devuelto tiene `fullName` a `null`

#### Scenario: Email ya registrado

- **WHEN** se envía un registro cuyo email ya pertenece a otra cuenta
- **THEN** la respuesta es un 422 con `{ "errors": [ ... ] }` donde un error tiene `field: "email"` y `rule: "database.unique"`, y no se crea ninguna cuenta

#### Scenario: Datos inválidos

- **WHEN** se envía un registro al que le falta un campo obligatorio, con un email mal formado o de más de 254 caracteres, con una contraseña de menos de 8 o más de 32 caracteres, o con una confirmación distinta de la contraseña
- **THEN** la respuesta es un 422 con `{ "errors": [ ... ] }`, y cada error MUST indicar `message`, `field` y `rule` (`required`, `email`, `minLength`, `maxLength` o `sameAs`), con `meta` indicando el límite cuando la regla es de longitud

### Requirement: Inicio de sesión por API

El sistema SHALL aceptar `POST /api/v1/auth/login` con `email` y `password` y, si las credenciales son correctas, SHALL emitir un token de acceso nuevo.

#### Scenario: Credenciales correctas

- **WHEN** se envía el email y la contraseña de una cuenta existente
- **THEN** la respuesta es un 200 con `{ "data": { "user": { ... }, "token": "<token>" } }`, con la misma forma de `user` que en el registro, y cada inicio de sesión emite un token distinto que convive con los anteriores

#### Scenario: Credenciales incorrectas

- **WHEN** se envía un email que no corresponde a ninguna cuenta, o una contraseña que no es la de esa cuenta
- **THEN** la respuesta es un 400 con `{ "errors": [ { "message": ... } ] }` sin `field`, idéntica en ambos casos, de modo que no revela si el email existe

#### Scenario: Datos de login mal formados

- **WHEN** se envía un login sin email, sin contraseña, o con un email mal formado o de más de 254 caracteres
- **THEN** la respuesta es un 422 con los errores por campo, con la misma forma que en el registro

### Requirement: Acceso autenticado por token

El sistema SHALL exigir una cabecera `Authorization: Bearer <token>` válida en las peticiones a `/api/v1/account/*` y SHALL rechazar las que no la traigan.

#### Scenario: Petición sin token o con token inválido

- **WHEN** se llama a `GET /api/v1/account/profile` o a `POST /api/v1/account/logout` sin cabecera de autorización, con un token inventado o con un token ya revocado
- **THEN** la respuesta es un 401 con `{ "errors": [ { "message": ... } ] }`

#### Scenario: Los tokens no caducan solos

- **WHEN** se usa un token emitido en un registro o login anterior que no ha sido revocado, sin importar el tiempo transcurrido
- **THEN** la petición se acepta

### Requirement: Consulta del perfil por API

El sistema SHALL devolver los datos de la cuenta dueña del token en `GET /api/v1/account/profile`.

#### Scenario: Perfil con token válido

- **WHEN** se pide el perfil con un token válido
- **THEN** la respuesta es un 200 con `{ "data": { "id", "fullName", "email", "initials", "createdAt", "updatedAt" } }` de esa cuenta

#### Scenario: Cálculo de las iniciales

- **WHEN** se consulta una cuenta
- **THEN** `initials` MUST ser, en mayúsculas: la primera letra de las dos primeras palabras del nombre si tiene al menos dos; las dos primeras letras del nombre si tiene una sola palabra; y, si no hay nombre, la primera letra de la parte del email anterior a la arroba junto con la primera letra de la parte posterior

### Requirement: Cierre de sesión por API

El sistema SHALL revocar el token con el que se hace la petición en `POST /api/v1/account/logout`.

#### Scenario: Logout correcto

- **WHEN** se llama al logout con un token válido
- **THEN** la respuesta es un 200 con `{ "message": "Logged out successfully" }` sin envoltorio `data`, y ese token deja de ser aceptado en peticiones posteriores

#### Scenario: Otros tokens de la misma cuenta

- **WHEN** una cuenta tiene varios tokens activos y se cierra sesión con uno de ellos
- **THEN** los demás tokens de esa cuenta MUST seguir siendo aceptados

### Requirement: Pantalla de registro

La aplicación SHALL ofrecer en `/register` un formulario titulado «Crea tu cuenta» con los campos «Nombre completo (opcional)», «Email», «Contraseña» y «Repite la contraseña», y un botón «Crear cuenta».

#### Scenario: Registro correcto desde la pantalla

- **WHEN** una persona sin sesión rellena el formulario con datos válidos y pulsa «Crear cuenta»
- **THEN** el botón se deshabilita y muestra «Creando cuenta…» mientras espera, y al terminar la persona queda con la sesión iniciada y ve su perfil

#### Scenario: Ayuda de la contraseña

- **WHEN** el campo «Contraseña» no tiene ningún error
- **THEN** bajo él se ve la indicación «Entre 8 y 32 caracteres.»

#### Scenario: Contraseñas distintas

- **WHEN** la persona pulsa «Crear cuenta» con «Contraseña» y «Repite la contraseña» diferentes
- **THEN** bajo la confirmación aparece «Las contraseñas no coinciden.» sin que se haga ninguna petición al servidor

#### Scenario: Errores de validación del servidor

- **WHEN** el servidor rechaza el registro por datos inválidos
- **THEN** cada campo afectado muestra bajo él un único mensaje en castellano (por ejemplo «Ese email ya está registrado. Inicia sesión en su lugar.», «Introduce una dirección de email válida.», «la contraseña debe tener al menos 8 caracteres.»), y no se muestra aviso general si todos los errores se han podido colocar bajo su campo

#### Scenario: Enlace a login

- **WHEN** la persona pulsa «Inicia sesión» bajo el formulario
- **THEN** pasa a la pantalla de inicio de sesión

### Requirement: Pantalla de inicio de sesión

La aplicación SHALL ofrecer en `/login` un formulario titulado «Inicia sesión» con los campos «Email» y «Contraseña» y un botón «Entrar».

#### Scenario: Login correcto desde la pantalla

- **WHEN** una persona sin sesión introduce credenciales correctas y pulsa «Entrar»
- **THEN** el botón se deshabilita y muestra «Entrando…» mientras espera, y al terminar la persona ve su perfil

#### Scenario: Credenciales incorrectas en pantalla

- **WHEN** la persona introduce un email o una contraseña que no son correctos
- **THEN** sobre el formulario aparece un aviso de error con «El email o la contraseña no son correctos.» y el botón vuelve a estar disponible

#### Scenario: Campos mal formados en pantalla

- **WHEN** la persona envía el formulario con el email vacío o mal formado, o con la contraseña vacía
- **THEN** el formulario se envía igualmente al servidor y el mensaje de error aparece bajo el campo afectado

#### Scenario: Enlace a registro

- **WHEN** la persona pulsa «Crea una» bajo el formulario
- **THEN** pasa a la pantalla de registro

### Requirement: Errores de conexión y del servidor en pantalla

La aplicación SHALL mostrar en un aviso sobre el formulario los fallos que no correspondan a un campo concreto.

#### Scenario: Servidor inaccesible

- **WHEN** la persona envía el login o el registro y el servidor no responde
- **THEN** ve el aviso «No se pudo conectar con el servidor. Comprueba que el backend está arrancado.»

#### Scenario: Error inesperado del servidor

- **WHEN** el servidor responde con un error que no es de validación, de credenciales ni de autorización
- **THEN** la persona ve el aviso «Algo ha ido mal en el servidor. Inténtalo de nuevo en un momento.»

### Requirement: Pantalla de perfil

La aplicación SHALL mostrar en `/profile`, solo con sesión iniciada, una tarjeta con las iniciales de la persona en un círculo, su nombre, su email, la fecha «Miembro desde» y un botón «Cerrar sesión».

#### Scenario: Perfil con nombre

- **WHEN** una persona con sesión y con nombre abre su perfil
- **THEN** ve su nombre, su email y la fecha de alta en castellano en formato largo (por ejemplo «1 de noviembre de 2026»)

#### Scenario: Perfil sin nombre

- **WHEN** una persona que se registró sin nombre abre su perfil
- **THEN** en lugar del nombre ve «Sin nombre»

### Requirement: Cierre de sesión desde la pantalla

La aplicación SHALL cerrar la sesión de la persona al pulsar «Cerrar sesión» y llevarla a la pantalla de inicio de sesión.

#### Scenario: Cierre de sesión

- **WHEN** la persona pulsa «Cerrar sesión» en su perfil
- **THEN** pasa a la pantalla de inicio de sesión sin ningún aviso de error, y al recargar la página sigue sin sesión

#### Scenario: Cierre de sesión con el servidor caído

- **WHEN** la persona pulsa «Cerrar sesión» y el servidor no está disponible o rechaza la petición
- **THEN** la sesión se cierra igualmente en la aplicación y la persona pasa a la pantalla de inicio de sesión

### Requirement: Control de acceso entre pantallas

La aplicación SHALL dejar ver el perfil solo con sesión iniciada, y SHALL dejar ver el login y el registro solo sin ella.

#### Scenario: Perfil sin sesión

- **WHEN** una persona sin sesión abre `/profile`
- **THEN** se la lleva a `/login`

#### Scenario: Login o registro con sesión

- **WHEN** una persona con sesión abre `/login` o `/register`
- **THEN** se la lleva a `/profile`

#### Scenario: Dirección desconocida

- **WHEN** alguien abre una dirección de la aplicación que no es `/login`, `/register` ni `/profile`
- **THEN** se le lleva a `/profile`, y de ahí a `/login` si no tiene sesión

### Requirement: Sesión persistente entre recargas

La aplicación SHALL recordar la sesión en el navegador y SHALL comprobarla contra el servidor al cargar la página antes de dar acceso.

#### Scenario: Recarga con sesión válida

- **WHEN** una persona con sesión recarga la página o vuelve a abrir la aplicación en el mismo navegador
- **THEN** ve un indicador de carga mientras se comprueba la sesión y después sigue en la pantalla en la que estaba, con la sesión iniciada

#### Scenario: Sesión rechazada por el servidor

- **WHEN** la aplicación carga con una sesión recordada que el servidor ya no acepta
- **THEN** la persona llega a la pantalla de inicio de sesión con el aviso «Tu sesión ha caducado. Vuelve a iniciar sesión.», y la sesión deja de recordarse

#### Scenario: Servidor caído al recargar

- **WHEN** la aplicación carga con una sesión recordada y el servidor no responde
- **THEN** la persona llega a la pantalla de inicio de sesión con el aviso «No se pudo conectar con el servidor. Comprueba que el backend está arrancado.», y la sesión se sigue recordando, de modo que al recargar con el servidor ya disponible MUST recuperarse sin volver a introducir credenciales

#### Scenario: Prioridad del aviso

- **WHEN** en la pantalla de inicio de sesión hay un aviso por sesión perdida y la persona intenta entrar y falla
- **THEN** el aviso pasa a mostrar el error del intento actual

---

### 🅱️ Parte B: las tres listas

**1. Cuántos requisitos escribió el agente, y cuántos comprobaste tú abriendo el código.** Los dos números, tal cual salieron. No los redondees ni los expliques. Comprobar significa haber ido a mirar si el código hace eso; leer el requisito y que suene razonable no cuenta.
12 y 1

**2. Las incoherencias que aparecieron al escribirla.** Una línea cada una, con **dónde se ve**. No las busques a propósito: aparecen solas, porque una regla que se cumple en casi todas partes canta en cuanto intentas escribirla como si se cumpliera siempre.
- Solo me dio tiempo a revisar el Requisito 1, y no encontré ninguna incoherencia. Verifiqué los escenarios en el código de la API (tardé por desconocimiento de AdonisJS y su stack), pero no encontré ninguna incoherencia.

**3. Lo que no supiste decidir si era un bug o el contrato.** Al menos una, y en una frase, **qué dos lecturas se contradecían**. Esta es la lista que importa. No es lo que estaba mal: es lo que podría estar bien o mal según a quién le preguntes, y no había forma de decidirlo leyendo el código.
- Solo me dio tiempo a revisar el Requisito 1, y no encontré ninguna incoherencia. Verifiqué los escenarios en el código de la API (tardé por desconocimiento de AdonisJS y su stack), pero no encontré ninguna incoherencia.