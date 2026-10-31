## Purpose

Permitir que una persona cree una cuenta en FlowSync, entre y salga de ella, y consulte su perfil. Esta capability describe lo que el sistema hace hoy, tanto en la API como en pantalla.

## Requirements

### Requirement: API - Registro de una cuenta

La API SHALL crear una cuenta mediante `POST /api/v1/auth/signup` a partir de `fullName`, `email`, `password` y `passwordConfirmation`, y SHALL dejar a la persona autenticada en la misma respuesta.

#### Scenario: Registro con datos válidos

- **WHEN** se envían un email sin cuenta, una contraseña válida y una confirmación idéntica
- **THEN** la API responde 200 con `{ data: { user, token } }`, y ese token ya sirve para consultar el perfil

### Requirement: API - Nombre obligatorio en la petición pero anulable

La API SHALL exigir que la clave `fullName` venga en la petición y SHALL aceptar `null` como valor; un texto vacío o formado solo por espacios SHALL guardarse como `null`. La API no SHALL limitar la longitud del nombre.

#### Scenario: Falta la clave del nombre

- **WHEN** la petición de registro no incluye `fullName`
- **THEN** la API responde 422 con un error de regla `required` en ese campo y no crea la cuenta

#### Scenario: Nombre solo con espacios

- **WHEN** la petición de registro incluye `fullName` formado solo por espacios y el resto de datos son válidos
- **THEN** la API crea la cuenta y devuelve `fullName` como `null`

#### Scenario: Nombre muy largo

- **WHEN** la petición de registro incluye un `fullName` de 1000 caracteres y el resto de datos son válidos
- **THEN** la API crea la cuenta

### Requirement: API - Validez y unicidad del email

La API SHALL rechazar emails con formato inválido o de más de 254 caracteres, y SHALL rechazar un registro cuyo email coincida exactamente con el de una cuenta existente. La API SHALL quitar los espacios de los extremos del email y SHALL distinguir mayúsculas de minúsculas al compararlo.

#### Scenario: Email con formato inválido

- **WHEN** se intenta registrar una cuenta con el email `nope`
- **THEN** la API responde 422 con un error de regla `email` en el campo `email`

#### Scenario: Email demasiado largo

- **WHEN** se intenta registrar una cuenta con un email de 255 caracteres
- **THEN** la API responde 422 con un error en el campo `email`

#### Scenario: Email ya registrado

- **WHEN** ya existe una cuenta con `ada@example.com` y se intenta registrar otra con ese mismo email
- **THEN** la API responde 422 con un error de regla `database.unique` en el campo `email`

#### Scenario: Mismo email con otras mayúsculas

- **WHEN** ya existe una cuenta con `ada@example.com` y se intenta registrar otra con `ADA@example.com`
- **THEN** la API crea una segunda cuenta independiente

#### Scenario: Email con espacios en los extremos

- **WHEN** se registra una cuenta con el email `" sp@example.com "`
- **THEN** la API guarda y devuelve `sp@example.com`

### Requirement: API - Reglas de la contraseña en el registro

La API SHALL exigir en el registro una contraseña de entre 8 y 32 caracteres, contados después de quitar los espacios de los extremos, y SHALL exigir que la confirmación coincida con ella.

#### Scenario: Longitud por debajo del mínimo

- **WHEN** se intenta registrar una cuenta con una contraseña de 7 caracteres, confirmada igual
- **THEN** la API responde 422 con errores de regla `minLength` en `password` y en `passwordConfirmation`

#### Scenario: Longitud en los límites

- **WHEN** se registra una cuenta con una contraseña de 8 o de 32 caracteres, confirmada igual
- **THEN** la API crea la cuenta

#### Scenario: Longitud por encima del máximo

- **WHEN** se intenta registrar una cuenta con una contraseña de 33 caracteres, confirmada igual
- **THEN** la API responde 422 con errores de regla `maxLength` en `password` y en `passwordConfirmation`

#### Scenario: Confirmación distinta

- **WHEN** se intenta registrar una cuenta con una confirmación que no coincide con la contraseña
- **THEN** la API responde 422 con un error de regla `sameAs` en `passwordConfirmation`

#### Scenario: Contraseña con espacios en los extremos

- **WHEN** existe una cuenta registrada con la contraseña `"  password1  "` y se inicia sesión con `password1`
- **THEN** la API acepta las credenciales

#### Scenario: Espacios que no alcanzan el mínimo

- **WHEN** se intenta registrar una cuenta con `"abcdef    "` como contraseña, confirmada igual
- **THEN** la API responde 422 con errores de regla `minLength`

### Requirement: API - Inicio de sesión

La API SHALL emitir un token nuevo mediante `POST /api/v1/auth/login` cuando las credenciales son correctas, y SHALL responder igual ante una contraseña incorrecta que ante un email sin cuenta.

#### Scenario: Credenciales correctas

- **WHEN** se envían el email y la contraseña de una cuenta existente
- **THEN** la API responde 200 con `{ data: { user, token } }`

#### Scenario: Contraseña incorrecta

- **WHEN** se envía el email de una cuenta existente con una contraseña que no es la suya
- **THEN** la API responde 400 con `{ errors: [{ message: "Invalid user credentials" }] }`

#### Scenario: Email sin cuenta

- **WHEN** se envía un email que no pertenece a ninguna cuenta
- **THEN** la API responde 400 con el mismo cuerpo que ante una contraseña incorrecta

#### Scenario: Email con otras mayúsculas

- **WHEN** solo existe una cuenta con `solo@example.com` y se inicia sesión con `SOLO@example.com` y la contraseña correcta
- **THEN** la API responde 400

#### Scenario: Datos de acceso mal formados

- **WHEN** se inicia sesión con un email inválido o con el email o la contraseña vacíos
- **THEN** la API responde 422 con el error en el campo correspondiente

#### Scenario: Longitud de la contraseña al entrar

- **WHEN** se inicia sesión con una contraseña incorrecta de 1 o de 100 caracteres
- **THEN** la API responde 400 y no 422, porque al entrar no aplica las reglas de longitud del registro

### Requirement: API - Vida de los tokens

La API SHALL permitir varios tokens activos a la vez por cuenta y SHALL emitirlos sin fecha de caducidad; un token SHALL dejar de valer cuando se cierra la sesión con él.

#### Scenario: Sesiones simultáneas

- **WHEN** una cuenta tiene dos tokens activos y se cierra la sesión con uno de ellos
- **THEN** el otro sigue permitiendo consultar el perfil

#### Scenario: Token sin caducidad

- **WHEN** se emite un token en un registro o en un inicio de sesión
- **THEN** el token queda sin fecha de caducidad

### Requirement: API - Consulta del perfil

La API SHALL devolver mediante `GET /api/v1/account/profile` los datos de la cuenta dueña del token, y SHALL rechazar con 401 cualquier petición sin un token válido.

#### Scenario: Token válido

- **WHEN** se consulta el perfil con un token activo
- **THEN** la API responde 200 con `{ data: user }`

#### Scenario: Sin token o con token inválido

- **WHEN** se consulta el perfil sin token, con un token inventado o con uno ya revocado
- **THEN** la API responde 401 con `{ errors: [{ message: "Unauthorized access" }] }`

### Requirement: API - Datos públicos de la cuenta

La API SHALL representar una cuenta con `id`, `fullName`, `email`, `createdAt`, `updatedAt` e `initials`, y no SHALL exponer la contraseña en ninguna respuesta.

#### Scenario: Campos devueltos

- **WHEN** se registra una cuenta, se inicia sesión o se consulta el perfil
- **THEN** el objeto de la cuenta contiene exactamente esos seis campos

### Requirement: API - Cálculo de las iniciales

La API SHALL calcular `initials` en mayúsculas: con nombre, a partir de sus dos primeros fragmentos separados por un espacio; sin nombre, a partir de las partes del email separadas por la arroba. Si el segundo fragmento falta o está vacío, SHALL usar los dos primeros caracteres del primero.

#### Scenario: Nombre de dos o más palabras

- **WHEN** la cuenta se llama `Ada Lovelace` o `Ana Maria Lopez`
- **THEN** `initials` vale `AL` o `AM`, respectivamente

#### Scenario: Nombre de una palabra

- **WHEN** la cuenta se llama `Ada`
- **THEN** `initials` vale `AD`

#### Scenario: Nombre con dos espacios seguidos

- **WHEN** la cuenta se llama `Ada  Lovelace`, con dos espacios
- **THEN** `initials` vale `AD`

#### Scenario: Cuenta sin nombre

- **WHEN** la cuenta no tiene nombre y su email es `maria.perez@example.com`
- **THEN** `initials` vale `ME`: la inicial de la parte local y la del dominio

### Requirement: API - Cierre de sesión

La API SHALL revocar el token usado mediante `POST /api/v1/account/logout` y SHALL exigir para ello un token válido. La respuesta SHALL ir sin el envoltorio `data`.

#### Scenario: Cierre con token válido

- **WHEN** se cierra la sesión con un token activo
- **THEN** la API responde 200 con `{ message: "Logged out successfully" }`, y ese token deja de valer

#### Scenario: Cierre repetido o sin token

- **WHEN** se cierra la sesión sin token o con un token ya revocado
- **THEN** la API responde 401

### Requirement: API - Cuerpo no interpretable

La API SHALL tratar un cuerpo JSON mal formado como una petición sin campos.

#### Scenario: JSON roto en el registro

- **WHEN** se envía al registro un cuerpo que no es JSON válido
- **THEN** la API responde 422 con errores `required` en todos los campos, no 400

### Requirement: Pantalla - Acceso según el estado de la sesión

La aplicación SHALL mostrar el perfil solo con sesión activa y SHALL mostrar el inicio de sesión y el registro solo sin ella. Cualquier otra ruta SHALL llevar al perfil, y de ahí a lo que corresponda.

#### Scenario: Sin sesión

- **WHEN** alguien sin sesión abre `/`, `/profile` o una ruta inexistente
- **THEN** la aplicación lo lleva a `/login`

#### Scenario: Con sesión

- **WHEN** alguien con sesión activa abre `/login`, `/register` o una ruta inexistente
- **THEN** la aplicación lo lleva a `/profile`

#### Scenario: Comprobación en curso

- **WHEN** se carga la aplicación con un token guardado y el backend aún no ha respondido
- **THEN** la aplicación muestra un indicador de carga, sin redirigir ni mostrar ningún formulario

### Requirement: Pantalla - Inicio de sesión

La aplicación SHALL ofrecer en `/login` un formulario de email y contraseña, con un enlace a `/register`, y SHALL llevar al perfil al entrar con éxito.

#### Scenario: Entrada correcta

- **WHEN** se envía el formulario con credenciales correctas
- **THEN** la aplicación guarda la sesión y muestra `/profile`

#### Scenario: Envío en curso

- **WHEN** el formulario está enviado y falta la respuesta
- **THEN** el botón aparece deshabilitado con el texto `Entrando…`

#### Scenario: Credenciales incorrectas

- **WHEN** se envía el formulario con credenciales incorrectas
- **THEN** se muestra el aviso general `El email o la contraseña no son correctos.`

#### Scenario: Campos vacíos

- **WHEN** se envía el formulario vacío
- **THEN** se muestran `Falta rellenar el email.` y `Falta rellenar la contraseña.` bajo sus campos

### Requirement: Pantalla - Registro

La aplicación SHALL ofrecer en `/register` un formulario con nombre opcional, email, contraseña y confirmación, con un enlace a `/login`, y SHALL dejar la sesión iniciada al registrarse con éxito.

#### Scenario: Registro correcto

- **WHEN** se envía el formulario con datos válidos
- **THEN** la aplicación guarda la sesión y muestra `/profile`

#### Scenario: Nombre en blanco

- **WHEN** el campo de nombre queda vacío o solo con espacios
- **THEN** la aplicación envía el nombre como `null`

#### Scenario: Envío en curso

- **WHEN** el formulario está enviado y falta la respuesta
- **THEN** el botón aparece deshabilitado con el texto `Creando cuenta…`

#### Scenario: Contraseñas distintas

- **WHEN** la contraseña y la confirmación no coinciden
- **THEN** se muestra `Las contraseñas no coinciden.` bajo la confirmación y no se llama a la API

#### Scenario: Pista de la contraseña

- **WHEN** el campo de contraseña no tiene ningún error
- **THEN** se muestra debajo la pista `Entre 8 y 32 caracteres.`, que se sustituye por el error cuando lo hay

#### Scenario: Contraseña fuera de longitud

- **WHEN** se envían una contraseña y una confirmación iguales de menos de 8 caracteres
- **THEN** se muestran, en minúscula inicial, `la contraseña debe tener al menos 8 caracteres.` y `la confirmación de la contraseña debe tener al menos 8 caracteres.`

#### Scenario: Email ya registrado

- **WHEN** se envía un email con cuenta existente
- **THEN** se muestra bajo el email `Ese email ya está registrado. Inicia sesión en su lugar.`

### Requirement: Pantalla - Permanencia de los errores

La aplicación SHALL mantener en pantalla los errores de un envío hasta el envío siguiente.

#### Scenario: Corrección de un campo

- **WHEN** un campo muestra un error y la persona cambia su contenido sin volver a enviar
- **THEN** el error sigue visible

### Requirement: Pantalla - Errores de comunicación en los formularios

La aplicación SHALL informar en un aviso general cuando un envío falla por conexión o por un error del servidor.

#### Scenario: Backend inaccesible

- **WHEN** se envía el formulario de inicio de sesión y el backend no responde
- **THEN** se muestra `No se pudo conectar con el servidor. Comprueba que el backend está arrancado.`

#### Scenario: Error del servidor

- **WHEN** se envía el formulario de inicio de sesión y el backend responde 500
- **THEN** se muestra `Algo ha ido mal en el servidor. Inténtalo de nuevo en un momento.`

### Requirement: Pantalla - Perfil

La aplicación SHALL mostrar en `/profile` las iniciales, el nombre, el email, la fecha de alta en formato largo en castellano y un botón para cerrar sesión.

#### Scenario: Cuenta con nombre

- **WHEN** entra una cuenta llamada `Ada Lovelace`
- **THEN** se muestran `AL`, `Ada Lovelace`, su email y `Miembro desde` con una fecha como `31 de octubre de 2026`

#### Scenario: Cuenta sin nombre

- **WHEN** entra una cuenta sin nombre
- **THEN** se muestra `Sin nombre` en lugar del nombre

### Requirement: Pantalla - Conservación de la sesión al recargar

La aplicación SHALL conservar la sesión entre recargas y SHALL validar el token guardado contra el backend en cada carga.

#### Scenario: Token vigente

- **WHEN** se recarga la aplicación con un token vigente
- **THEN** se sigue mostrando el perfil

#### Scenario: Token rechazado

- **WHEN** se carga la aplicación con un token que el backend rechaza
- **THEN** la aplicación borra el token, lleva a `/login` y muestra `Tu sesión ha caducado. Vuelve a iniciar sesión.`

#### Scenario: Backend inaccesible al cargar

- **WHEN** se carga la aplicación con un token guardado y el backend no responde
- **THEN** lleva a `/login`, muestra el aviso de conexión y conserva el token

#### Scenario: Error del servidor al cargar

- **WHEN** se carga la aplicación con un token guardado y el backend responde 500
- **THEN** lleva a `/login`, muestra el aviso de error del servidor y conserva el token

#### Scenario: Recuperación del backend

- **WHEN** el token se ha conservado tras un fallo y se recarga con el backend ya disponible
- **THEN** se vuelve a mostrar el perfil sin pedir credenciales

### Requirement: Pantalla - Aviso de sesión perdida

La aplicación SHALL explicar en el inicio de sesión por qué se perdió la sesión, y el error de un intento posterior SHALL ocupar su lugar. El registro no SHALL mostrar ese aviso.

#### Scenario: Paso por el registro

- **WHEN** se ha mostrado el aviso de sesión perdida y se navega a `/register` y de vuelta a `/login`
- **THEN** el aviso no aparece en el registro y reaparece en el inicio de sesión

#### Scenario: Nuevo intento fallido

- **WHEN** se ha mostrado el aviso de sesión perdida y un intento de entrar falla
- **THEN** se muestra el error de ese intento en lugar del aviso

### Requirement: Pantalla - Cierre de sesión

La aplicación SHALL cerrar la sesión local y volver a `/login` sin avisos, aunque la llamada al servidor falle.

#### Scenario: Cierre normal

- **WHEN** se pulsa `Cerrar sesión` con el backend disponible
- **THEN** la aplicación borra el token, lleva a `/login` y el token queda revocado en el servidor

#### Scenario: Cierre sin backend

- **WHEN** se pulsa `Cerrar sesión` y la llamada al servidor falla
- **THEN** la aplicación borra el token y lleva a `/login` sin avisar, y el token sigue siendo válido en el servidor

### Requirement: Pantalla - Sesión abierta sin revalidación

La aplicación SHALL mantener el perfil en pantalla mientras no se recargue, aunque el token ya no sea válido, porque solo lo revalida al cargar.

#### Scenario: Token revocado con el perfil abierto

- **WHEN** el perfil está en pantalla y su token se revoca desde otro sitio
- **THEN** el perfil sigue visible, y al recargar se lleva a `/login` con el aviso de sesión caducada

#### Scenario: Cierre en otra pestaña

- **WHEN** dos pestañas muestran el perfil y se cierra la sesión en una
- **THEN** la otra sigue mostrando el perfil, y al pulsar en ella `Cerrar sesión` lleva a `/login` sin avisos


## Parte B: las tres listas

### 1. Cuántos requisitos escribió el agente y cuántos comprobé abriendo el código

- Escritos por el agente: 20
- Comprobados por mí: 13

### 2. Las incoherencias que aparecieron al escribirla

- El primer escenario "Scenario: Falta la clave del nombre" del "Requirement: API - Nombre obligatorio en la petición pero anulable", indica que API responde 422 y no crea la cuenta, esto no es cierto, se acepta Nombre null e igual se crea la cuenta. 

### 3. Lo que no supe decidir si era un bug o el contrato

- Si el nombre de los usuarios es obligatorio o no, ya que las historias deben mostrar a quién está asignado, y si existen cuentas sin nombre pero si con correo y contraseña puede que al filtrar información se presenten fallos, o bien se visualicen datos vacíos.
