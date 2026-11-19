## Purpose

Describe cómo una persona crea una cuenta en FlowSync, inicia y cierra sesión, mantiene su sesión entre recargas y consulta su propio perfil, tanto en el contrato HTTP como en lo que ve y puede hacer en pantalla.

## Requirements

### Requirement: La API SHALL crear una cuenta al registrarse y devolver una sesión lista para usar

`POST /api/v1/auth/signup` recibe nombre, email, contraseña y confirmación de contraseña, y responde con la cuenta creada más un token de acceso.

#### Scenario: Registro con datos válidos

- **WHEN** se envía `POST /api/v1/auth/signup` con un nombre, un email que no pertenece a ninguna cuenta, una contraseña de entre 8 y 32 caracteres y la misma contraseña en la confirmación
- **THEN** la respuesta es `200` con `data.user` (identificador, nombre, email, iniciales, fecha de alta y fecha de última modificación) y `data.token` con un token de acceso, y la contraseña no aparece en ningún punto de la respuesta

#### Scenario: Registro sin nombre

- **WHEN** se envía `POST /api/v1/auth/signup` con el nombre a `null`, un email libre y contraseñas válidas y coincidentes
- **THEN** la respuesta es `200` con `data.user.fullName` a `null` y el resto de campos de la cuenta informados

#### Scenario: Email ya registrado

- **WHEN** se envía `POST /api/v1/auth/signup` con un email que ya pertenece a una cuenta
- **THEN** la respuesta es `422` con un error asociado al campo `email` por email repetido, no se crea ninguna cuenta y no se devuelve token

#### Scenario: Email con formato inválido o demasiado largo

- **WHEN** se envía `POST /api/v1/auth/signup` con un email que no tiene formato de dirección de correo o que supera los 254 caracteres
- **THEN** la respuesta es `422` con un error asociado al campo `email` y no se crea ninguna cuenta

#### Scenario: Contraseña fuera del rango permitido

- **WHEN** se envía `POST /api/v1/auth/signup` con una contraseña de menos de 8 caracteres o de más de 32 caracteres
- **THEN** la respuesta es `422` con un error asociado al campo `password` y no se crea ninguna cuenta

#### Scenario: Confirmación de contraseña distinta

- **WHEN** se envía `POST /api/v1/auth/signup` con una confirmación de contraseña distinta de la contraseña
- **THEN** la respuesta es `422` con un error asociado al campo de la confirmación y no se crea ninguna cuenta

### Requirement: La API SHALL iniciar sesión con email y contraseña y emitir un token nuevo

`POST /api/v1/auth/login` valida las credenciales de una cuenta existente y responde con esa cuenta y un token de acceso recién emitido.

#### Scenario: Credenciales correctas

- **WHEN** se envía `POST /api/v1/auth/login` con el email y la contraseña de una cuenta existente
- **THEN** la respuesta es `200` con `data.user` (identificador, nombre, email, iniciales, fecha de alta y fecha de última modificación) y `data.token` con un token de acceso distinto de los emitidos antes

#### Scenario: Credenciales incorrectas

- **WHEN** se envía `POST /api/v1/auth/login` con un email registrado y una contraseña equivocada, o con un email que no pertenece a ninguna cuenta
- **THEN** la respuesta es `400` con un error general sin campo asociado, y no se devuelve token

#### Scenario: Email con formato inválido al iniciar sesión

- **WHEN** se envía `POST /api/v1/auth/login` con un email que no tiene formato de dirección de correo o que supera los 254 caracteres
- **THEN** la respuesta es `422` con un error asociado al campo `email`

#### Scenario: Falta un dato obligatorio al iniciar sesión

- **WHEN** se envía `POST /api/v1/auth/login` sin email o sin contraseña
- **THEN** la respuesta es `422` con un error asociado al campo que falta

### Requirement: La API SHALL rechazar con `401` cualquier petición a las rutas de cuenta sin un token válido

`GET /api/v1/account/profile` y `POST /api/v1/account/logout` solo se atienden con un token de acceso vigente enviado en la cabecera `Authorization` con esquema `Bearer`.

#### Scenario: Petición sin token

- **WHEN** se llama a `GET /api/v1/account/profile` o a `POST /api/v1/account/logout` sin cabecera `Authorization`
- **THEN** la respuesta es `401` y no se ejecuta la operación

#### Scenario: Token desconocido o ya cerrado

- **WHEN** se llama a una ruta de cuenta con un token que no corresponde a ninguna sesión vigente, por ejemplo uno ya cerrado con el cierre de sesión
- **THEN** la respuesta es `401` y no se ejecuta la operación

### Requirement: La API SHALL devolver el perfil de la persona autenticada

`GET /api/v1/account/profile` responde con la cuenta dueña del token enviado.

#### Scenario: Perfil de la sesión en curso

- **WHEN** se llama a `GET /api/v1/account/profile` con un token vigente
- **THEN** la respuesta es `200` con `data` conteniendo identificador, nombre, email, iniciales, fecha de alta y fecha de última modificación, y sin contraseña

### Requirement: La API SHALL cerrar solo la sesión del token con el que se pide el cierre

`POST /api/v1/account/logout` revoca el token usado en la petición y deja intactas las demás sesiones de la misma cuenta.

#### Scenario: Cierre de sesión correcto

- **WHEN** se llama a `POST /api/v1/account/logout` con un token vigente
- **THEN** la respuesta es `200` con el cuerpo `{ "message": "Logged out successfully" }` sin envoltorio `data`, y ese mismo token deja de servir para llamar a `GET /api/v1/account/profile`

#### Scenario: Otras sesiones de la misma cuenta siguen abiertas

- **WHEN** una cuenta tiene dos tokens vigentes y se cierra la sesión con uno de ellos
- **THEN** el otro token sigue respondiendo `200` en `GET /api/v1/account/profile`

### Requirement: La API SHALL publicar unas iniciales derivadas del nombre y, si no hay nombre, del email

El campo `initials` que acompaña a la cuenta en las respuestas se calcula a partir del nombre completo o del email, siempre en mayúsculas.

#### Scenario: Nombre con dos o más palabras

- **WHEN** la cuenta tiene el nombre `Ada Lovelace` y se consulta su perfil
- **THEN** `initials` es `AL`

#### Scenario: Nombre con tres palabras

- **WHEN** la cuenta tiene el nombre `Ada Maria Lovelace` y se consulta su perfil
- **THEN** `initials` es `AM`, tomando la primera letra de las dos primeras palabras

#### Scenario: Nombre de una sola palabra

- **WHEN** la cuenta tiene el nombre `Ada` y se consulta su perfil
- **THEN** `initials` es `AD`, tomando las dos primeras letras del nombre

#### Scenario: Cuenta sin nombre

- **WHEN** la cuenta no tiene nombre y su email es `ada@example.com`
- **THEN** `initials` es `AE`, tomando la primera letra de la parte local del email y la primera letra del dominio

### Requirement: La pantalla de registro SHALL permitir crear una cuenta desde un formulario

La pantalla de registro presenta un formulario con nombre completo opcional, email, contraseña y repetición de la contraseña, y al completarlo con éxito deja a la persona dentro de su cuenta.

#### Scenario: Formulario de registro visible

- **WHEN** una persona sin sesión abre la pantalla de registro
- **THEN** ve el nombre de la aplicación, el título «Crea tu cuenta», la descripción «Regístrate para empezar a organizar el trabajo del equipo.», los campos «Nombre completo (opcional)», «Email», «Contraseña» —con la ayuda «Entre 8 y 32 caracteres.»— y «Repite la contraseña», el botón «Crear cuenta» y el enlace «Inicia sesión» hacia la pantalla de inicio de sesión

#### Scenario: Contraseñas que no coinciden

- **WHEN** la persona envía el formulario de registro con una contraseña y una repetición distintas
- **THEN** ve el mensaje «Las contraseñas no coinciden.» bajo el campo de repetición y no se llama al servidor

#### Scenario: Envío en curso

- **WHEN** la persona envía un formulario de registro que sí llega al servidor
- **THEN** el botón queda deshabilitado y muestra «Creando cuenta…» hasta que la petición termina

#### Scenario: Registro correcto

- **WHEN** la persona envía el formulario con datos válidos y el servidor crea la cuenta
- **THEN** queda con sesión iniciada y se le lleva a su perfil, sin pasar por la pantalla de inicio de sesión

#### Scenario: Email ya registrado desde la pantalla

- **WHEN** la persona envía el formulario con un email que ya tiene cuenta
- **THEN** ve el mensaje «Ese email ya está registrado. Inicia sesión en su lugar.» bajo el campo de email y sigue en el formulario

#### Scenario: Nombre vacío

- **WHEN** la persona envía el formulario sin escribir el nombre completo
- **THEN** la cuenta se crea sin nombre y su perfil muestra «Sin nombre» como nombre

### Requirement: La pantalla de inicio de sesión SHALL permitir entrar con email y contraseña

La pantalla de inicio de sesión presenta un formulario con email y contraseña y, al autenticarse, deja a la persona en su perfil.

#### Scenario: Formulario de inicio de sesión visible

- **WHEN** una persona sin sesión abre la pantalla de inicio de sesión
- **THEN** ve el nombre de la aplicación, el título «Inicia sesión», la descripción «Entra con tu cuenta para volver a tus tareas.», los campos «Email» y «Contraseña», el botón «Entrar» y el enlace «Crea una» hacia la pantalla de registro

#### Scenario: Envío en curso

- **WHEN** la persona envía el formulario de inicio de sesión
- **THEN** el botón queda deshabilitado y muestra «Entrando…» hasta que la petición termina

#### Scenario: Credenciales correctas

- **WHEN** la persona envía un email y una contraseña correctos
- **THEN** queda con sesión iniciada y se le lleva a su perfil

#### Scenario: Credenciales incorrectas desde la pantalla

- **WHEN** la persona envía un email o una contraseña que el servidor rechaza
- **THEN** ve el aviso «El email o la contraseña no son correctos.» en la parte superior del formulario y sigue en la pantalla

#### Scenario: Email con formato inválido desde la pantalla

- **WHEN** la persona envía un email que no tiene formato de dirección de correo
- **THEN** ve el mensaje «Introduce una dirección de email válida.» bajo el campo de email

### Requirement: Las pantallas de cuenta SHALL mostrar en castellano el resultado de cada intento fallido

Los errores del servidor y de red se presentan como mensaje bajo el campo afectado o como aviso general cuando el error no corresponde a ningún campo visible.

#### Scenario: Error de validación de un campo visible

- **WHEN** el servidor rechaza el envío por un dato del formulario y el error corresponde a un campo que está en pantalla
- **THEN** el mensaje aparece bajo ese campo y no se muestra además el aviso general de la parte superior

#### Scenario: Servidor inalcanzable

- **WHEN** la persona envía un formulario de cuenta y no hay conexión con el servidor
- **THEN** ve el aviso «No se pudo conectar con el servidor. Comprueba que el backend está arrancado.»

#### Scenario: Fallo inesperado del servidor

- **WHEN** la persona envía un formulario de cuenta y el servidor responde con un error no contemplado
- **THEN** ve el aviso «Algo ha ido mal en el servidor. Inténtalo de nuevo en un momento.»

### Requirement: La sesión SHALL mantenerse al recargar la aplicación sin volver a pedir credenciales

Si el navegador conserva un token de sesión, al abrir de nuevo la aplicación se comprueba contra el servidor antes de dejar pasar.

#### Scenario: Recarga con una sesión válida

- **WHEN** la persona recarga la aplicación con una sesión válida guardada en el navegador
- **THEN** ve un indicador de carga a pantalla completa y, sin pedirle credenciales, termina en su perfil con los datos actualizados de su cuenta

#### Scenario: Primera visita sin sesión guardada

- **WHEN** la persona abre la aplicación sin ninguna sesión guardada en el navegador
- **THEN** no ve el indicador de carga de sesión y se le lleva directamente a la pantalla de inicio de sesión

### Requirement: La sesión SHALL cerrarse cuando el servidor rechaza el token guardado

Si el token conservado en el navegador ya no es válido, se descarta y se explica el motivo al llegar a la pantalla de inicio de sesión.

#### Scenario: Token rechazado al recargar

- **WHEN** la persona recarga la aplicación con un token que el servidor rechaza por no ser válido y el servidor está disponible
- **THEN** se le lleva a la pantalla de inicio de sesión con el aviso «Tu sesión ha caducado. Vuelve a iniciar sesión.», y una recarga posterior ya no intenta recuperar sesión

### Requirement: La sesión SHALL conservarse cuando la recuperación falla por causas ajenas al token

Un fallo de red o del servidor durante la recuperación de la sesión no invalida el token guardado.

#### Scenario: Backend caído al recargar

- **WHEN** la persona recarga la aplicación con un token guardado y el servidor no responde
- **THEN** se le lleva a la pantalla de inicio de sesión con el aviso «No se pudo conectar con el servidor. Comprueba que el backend está arrancado.»

#### Scenario: Recarga posterior con el backend disponible

- **WHEN** la persona vuelve a recargar la aplicación una vez el servidor responde y el token guardado sigue siendo válido
- **THEN** recupera su sesión y termina en su perfil sin pedirle credenciales

### Requirement: Las pantallas SHALL respetar el estado de la sesión al navegar

El perfil exige sesión y las pantallas de acceso se reservan a quien no la tiene.

#### Scenario: Persona sin sesión que abre el perfil

- **WHEN** una persona sin sesión abre la dirección del perfil
- **THEN** se le lleva a la pantalla de inicio de sesión

#### Scenario: Persona con sesión que abre una pantalla de acceso

- **WHEN** una persona con sesión abre la pantalla de inicio de sesión o la de registro
- **THEN** se le lleva a su perfil

#### Scenario: Dirección desconocida sin sesión

- **WHEN** una persona sin sesión abre una dirección que no corresponde a ninguna pantalla
- **THEN** se le lleva a la pantalla de inicio de sesión

#### Scenario: Dirección desconocida con sesión

- **WHEN** una persona con sesión abre una dirección que no corresponde a ninguna pantalla
- **THEN** se le lleva a su perfil

### Requirement: La pantalla de perfil SHALL mostrar los datos de la propia cuenta y permitir cerrar sesión

El perfil presenta la identidad de la persona y su antigüedad en la aplicación, y ofrece el cierre de sesión.

#### Scenario: Perfil visible

- **WHEN** una persona con sesión abre su perfil
- **THEN** ve un círculo con sus iniciales, su nombre completo (o «Sin nombre» si la cuenta no tiene nombre), su email y la fila «Miembro desde» con la fecha de alta escrita en castellano con formato largo, junto al botón «Cerrar sesión»

#### Scenario: Cierre de sesión desde el perfil

- **WHEN** la persona pulsa «Cerrar sesión»
- **THEN** el botón queda deshabilitado y muestra «Cerrando sesión…», la sesión local se cierra de inmediato y se le lleva a la pantalla de inicio de sesión

#### Scenario: Cierre de sesión con el servidor inalcanzable

- **WHEN** la persona pulsa «Cerrar sesión» y el servidor no responde
- **THEN** la sesión local se cierra igualmente y se le lleva a la pantalla de inicio de sesión, sin ningún aviso de error

## 🅱 Parte B: las tres listas

### 1. Requisitos generados y comprobados

14 requisitos generados por el agente con 45 scenarios
2 revisados

### 2. Incoherencias detectadas

1. Scenario: Cierre de sesión desde el perfil

    El botón no llega a verse deshabilitado ni muestra «Cerrando sesión…»: React renderiza /login antes de que el botón «Cerrar sesión» se vuelva a renderizar.

    Dónde:
    - frontend/src/pages/profile-page.tsx:24-28: `setLoggingOut(true)` y a continuación `logout()`.
    - frontend/src/auth/auth-provider.tsx:98-106: `clearSession()` se ejecuta antes de esperar la llamada al servidor.
    - frontend/src/routes/protected-route.tsx: redirige en cuanto el estado pasa a `anonymous`.
    - Para reproducirlo: abre /profile, limita la red a "Slow 3G" en DevTools y pulsa «Cerrar sesión». Acabas en /login y el texto del botón nunca cambia.

### 3. Comportamientos que no supiste clasificar como bug o contrato.

1. Scenarios: Registro con datos válidos / Credenciales correctas

    El signup y el login responden `200`, no `201`, porque ningún controlador fija el código de estado y el framework usa el de por defecto.

    Dónde:
    - backend/app/controllers/new_account_controller.ts:13-16: `return serialize(...)` sin `response.status(201)`.
    - backend/app/controllers/access_tokens_controller.ts:13-16: lo mismo en el login.
    - Para reproducirlo: `curl -i -X POST localhost:3333/api/v1/auth/signup ...` muestra `HTTP/1.1 200 OK`.


2. Scenarios: Cuenta sin nombre / Nombre con tres palabras

    Las iniciales se calculan con las dos primeras partes de un `split`: `ada@example.com` da `AE` (local-part + dominio) y `Ada Maria Lovelace` da `AM` (segunda palabra, no la última).

    Dónde:
    - backend/app/models/user.ts:11-17: `fullName.split(' ')` o `email.split('@')`, y `slice(0, 2)` solo si falta la segunda parte.
    - Para reproducirlo: `POST /api/v1/auth/signup` con `"fullName": null, "email": "ada@example.com"` y mira `data.user.initials` (`AE`). Repite con `"fullName": "Ada Maria Lovelace"` (`AM`).

3. Tokens sin caducidad

    Los tokens de acceso no caducan nunca. Solo dejan de valer al cerrar sesión con ellos.

    Dónde:
    - backend/app/models/user.ts:8: `DbAccessTokensProvider.forModel(User)` sin la opción `expiresIn`.
    - backend/database/migrations/1768620764696_create_access_tokens_table.ts:24: `expires_at` es `nullable()`.
    - Para reproducirlo: inicia sesión y ejecuta `sqlite3 backend/tmp/db.sqlite3 "select id, expires_at from auth_access_tokens"`. `expires_at` sale `NULL`.

4. Scenario: Cierre de sesión correcto

    La respuesta del logout no lleva el envoltorio `data`, a diferencia del resto de rutas, porque devuelve un objeto plano en vez de pasar por `serialize()`.

    Dónde:
    - backend/app/controllers/access_tokens_controller.ts:25-27: `return { message: 'Logged out successfully' }`.
    - frontend/src/lib/api.ts (función `logout`): ignora el cuerpo de la respuesta.
    - Para reproducirlo: `curl -X POST localhost:3333/api/v1/account/logout -H "Authorization: Bearer <token>"` devuelve `{"message":"Logged out successfully"}`.

5. Emails sensibles a mayúsculas

    El email no se normaliza, así que la unicidad y el login distinguen mayúsculas de minúsculas: `ada@example.com` y `Ada@Example.com` son cuentas distintas.

    Dónde:
    - backend/app/validators/user.ts:6: `vine.string().email().maxLength(254)` sin `.toLowerCase()` ni `.normalizeEmail()`.
    - backend/database/migrations/1761885935168_create_users_table.ts:10: `.unique()` sobre SQLite, que compara en binario.
    - Para reproducirlo: regístrate con `ada@example.com` y luego con `Ada@Example.com`. Las dos responden `200`. Intenta entrar con `Ada@Example.com` y la contraseña de la primera cuenta: responde `400`.
