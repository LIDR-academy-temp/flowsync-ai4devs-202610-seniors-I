# Cuentas y acceso

## Purpose

Permitir que una persona cree una cuenta, inicie y cierre sesión y consulte su perfil, tanto a través de la API como desde la aplicación web. Solo quien tiene una sesión válida accede a las operaciones y pantallas de su cuenta.

## Requirements

### Requirement: Registro de una cuenta

La API SHALL crear la cuenta e iniciar su sesión cuando `POST /api/v1/auth/signup` recibe datos válidos, devolviendo una respuesta de éxito con el usuario y un token de acceso.

#### Scenario: Registro con datos válidos

- **WHEN** se envía `POST /api/v1/auth/signup` con `fullName`, un `email` no registrado, una `password` válida y una `passwordConfirmation` igual
- **THEN** la respuesta es de éxito y su cuerpo es `{ data: { user, token } }`

#### Scenario: El token del registro da acceso a la cuenta

- **WHEN** se envía `GET /api/v1/account/profile` con el token devuelto por el registro
- **THEN** la respuesta es 200 y contiene el usuario recién creado

### Requirement: Datos públicos del usuario

La API SHALL devolver en el usuario los campos `id`, `fullName`, `email`, `createdAt`, `updatedAt` e `initials`, y MUST NOT devolver la contraseña.

#### Scenario: Usuario devuelto por registro, inicio de sesión y perfil

- **WHEN** una petición correcta a `POST /api/v1/auth/signup`, `POST /api/v1/auth/login` o `GET /api/v1/account/profile` devuelve el usuario
- **THEN** el usuario contiene `id`, `fullName`, `email`, `createdAt`, `updatedAt` e `initials`, y no contiene la contraseña

### Requirement: Validación del email en el registro

La API SHALL rechazar con 422 en `POST /api/v1/auth/signup` un `email` con formato no válido, de más de 254 caracteres o ya registrado.

#### Scenario: Email con formato no válido

- **WHEN** se envía `POST /api/v1/auth/signup` con `email` igual a `nope`
- **THEN** la respuesta es 422 e incluye un error con `field` igual a `email` y `rule` igual a `email`

#### Scenario: Email demasiado largo

- **WHEN** se envía `POST /api/v1/auth/signup` con un `email` de más de 254 caracteres
- **THEN** la respuesta es 422 e incluye un error con `field` igual a `email` y `rule` igual a `maxLength`

#### Scenario: Email ya registrado

- **WHEN** existe una cuenta con un email y se envía `POST /api/v1/auth/signup` con ese mismo `email`
- **THEN** la respuesta es 422 e incluye un error con `field` igual a `email` y `rule` igual a `database.unique`

### Requirement: Validación de la contraseña en el registro

La API SHALL exigir en `POST /api/v1/auth/signup` una `password` de entre 8 y 32 caracteres y una `passwordConfirmation` con la misma longitud permitida y el mismo valor, y SHALL rechazar con 422 cualquier otro caso.

#### Scenario: Contraseña demasiado corta

- **WHEN** se envía `POST /api/v1/auth/signup` con `password` y `passwordConfirmation` de menos de 8 caracteres
- **THEN** la respuesta es 422 e incluye errores con `rule` igual a `minLength` para ambos campos

#### Scenario: Contraseña demasiado larga

- **WHEN** se envía `POST /api/v1/auth/signup` con `password` y `passwordConfirmation` de más de 32 caracteres
- **THEN** la respuesta es 422 e incluye errores con `rule` igual a `maxLength` para ambos campos

#### Scenario: Confirmación distinta

- **WHEN** se envía `POST /api/v1/auth/signup` con `password` y `passwordConfirmation` válidas pero diferentes
- **THEN** la respuesta es 422 e incluye un error con `field` igual a `passwordConfirmation` y `rule` igual a `sameAs`

### Requirement: Nombre opcional con clave obligatoria

La API SHALL exigir la clave `fullName` en `POST /api/v1/auth/signup`, SHALL admitir que valga `null` y SHALL devolver `null` cuando se envía vacía o solo con espacios.

#### Scenario: Clave ausente

- **WHEN** se envía `POST /api/v1/auth/signup` sin la clave `fullName`
- **THEN** la respuesta es 422 e incluye un error con `field` igual a `fullName` y `rule` igual a `required`

#### Scenario: Nombre nulo

- **WHEN** se envía `POST /api/v1/auth/signup` con `fullName` igual a `null` y el resto de datos válidos
- **THEN** la respuesta es de éxito y el usuario tiene `fullName` igual a `null`

#### Scenario: Nombre vacío o solo con espacios

- **WHEN** se envía `POST /api/v1/auth/signup` con `fullName` igual a `""` o `"   "` y el resto de datos válidos
- **THEN** la respuesta es de éxito y el usuario tiene `fullName` igual a `null`

### Requirement: Inicio de sesión con credenciales correctas

La API SHALL responder 200 con el usuario y un token nuevo, con prefijo `oat_`, cada vez que `POST /api/v1/auth/login` recibe credenciales correctas.

#### Scenario: Credenciales correctas

- **WHEN** existe una cuenta y se envía `POST /api/v1/auth/login` con su `email` y su `password`
- **THEN** la respuesta es 200 y su cuerpo es `{ data: { user, token } }`, con un `token` que empieza por `oat_`

#### Scenario: Inicios de sesión sucesivos

- **WHEN** se envía dos veces `POST /api/v1/auth/login` con las mismas credenciales correctas
- **THEN** cada respuesta contiene un token distinto

### Requirement: Credenciales incorrectas indistinguibles

La API SHALL dar la misma respuesta en `POST /api/v1/auth/login` a una contraseña incorrecta y a un email inexistente.

#### Scenario: Contraseña incorrecta

- **WHEN** existe una cuenta y se envía `POST /api/v1/auth/login` con su `email` y una `password` incorrecta
- **THEN** la respuesta es 400 y su cuerpo es `{ errors: [{ message: "Invalid user credentials" }] }`

#### Scenario: Email inexistente

- **WHEN** no existe ninguna cuenta con un email y se envía `POST /api/v1/auth/login` con ese `email`
- **THEN** la respuesta es 400 y su cuerpo es `{ errors: [{ message: "Invalid user credentials" }] }`

### Requirement: Validación de los datos de inicio de sesión

La API SHALL responder 422 en `POST /api/v1/auth/login` a un email vacío o mal formado y a una contraseña vacía, y SHALL NOT aplicar reglas de longitud a la contraseña en esta ruta.

#### Scenario: Campos vacíos

- **WHEN** se envía `POST /api/v1/auth/login` con `email` y `password` vacíos
- **THEN** la respuesta es 422 e incluye errores con `rule` igual a `required` para ambos campos

#### Scenario: Email mal formado

- **WHEN** se envía `POST /api/v1/auth/login` con `email` igual a `nope`
- **THEN** la respuesta es 422 e incluye un error con `field` igual a `email` y `rule` igual a `email`

#### Scenario: Contraseña fuera del rango de longitud del registro

- **WHEN** existe una cuenta y se envía `POST /api/v1/auth/login` con su `email` y una `password` incorrecta de menos de 8 caracteres
- **THEN** la respuesta es 400 y no 422

### Requirement: Consulta del perfil

La API SHALL responder 200 con el usuario autenticado cuando `GET /api/v1/account/profile` recibe un token válido.

#### Scenario: Token válido

- **WHEN** se envía `GET /api/v1/account/profile` con un token válido
- **THEN** la respuesta es 200 y su cuerpo es `{ data: user }`, con el usuario dueño del token

### Requirement: Rutas de cuenta protegidas

La API SHALL responder 401 con `{ errors: [{ message: "Unauthorized access" }] }` en `GET /api/v1/account/profile` y `POST /api/v1/account/logout` cuando la petición no lleva un token válido.

#### Scenario: Sin token

- **WHEN** se envía `GET /api/v1/account/profile` o `POST /api/v1/account/logout` sin token
- **THEN** la respuesta es 401 y su cuerpo es `{ errors: [{ message: "Unauthorized access" }] }`

#### Scenario: Token inválido

- **WHEN** se envía `GET /api/v1/account/profile` o `POST /api/v1/account/logout` con un token inválido
- **THEN** la respuesta es 401 y su cuerpo es `{ errors: [{ message: "Unauthorized access" }] }`

#### Scenario: Token revocado

- **WHEN** se envía `GET /api/v1/account/profile` o `POST /api/v1/account/logout` con un token ya revocado
- **THEN** la respuesta es 401 y su cuerpo es `{ errors: [{ message: "Unauthorized access" }] }`

### Requirement: Cierre de sesión

La API SHALL revocar el token usado y responder 200 con `{ message: "Logged out successfully" }` cuando `POST /api/v1/account/logout` recibe un token válido.

#### Scenario: Cierre correcto

- **WHEN** se envía `POST /api/v1/account/logout` con un token válido
- **THEN** la respuesta es 200 y su cuerpo es `{ message: "Logged out successfully" }`

#### Scenario: Repetición con el mismo token

- **WHEN** se ha cerrado sesión con un token y se envía de nuevo `POST /api/v1/account/logout` con ese token
- **THEN** la respuesta es 401

### Requirement: El cierre de sesión afecta solo al token usado

La API SHALL mantener válidos los demás tokens del usuario después de `POST /api/v1/account/logout`.

#### Scenario: Otro token del mismo usuario

- **WHEN** un usuario tiene dos tokens válidos, se envía `POST /api/v1/account/logout` con el primero y después `GET /api/v1/account/profile` con el segundo
- **THEN** la respuesta del perfil es 200

### Requirement: Un token inválido no bloquea el acceso público

La API SHALL NOT rechazar una petición a `POST /api/v1/auth/signup` o `POST /api/v1/auth/login` por llevar un token inválido.

#### Scenario: Inicio de sesión con token inválido

- **WHEN** se envía `POST /api/v1/auth/login` con credenciales correctas y un token inválido
- **THEN** la respuesta es 200 y contiene el usuario y un token

#### Scenario: Registro con token inválido

- **WHEN** se envía `POST /api/v1/auth/signup` con datos válidos y un token inválido
- **THEN** la respuesta es de éxito y contiene el usuario y un token

### Requirement: Cálculo de las iniciales

La API SHALL calcular `initials`, en mayúsculas, a partir de las dos primeras palabras del nombre, de los dos primeros caracteres si el nombre tiene una sola palabra o, sin nombre, de la primera letra del email antes y después de la arroba.

#### Scenario: Nombre de dos palabras

- **WHEN** una respuesta devuelve un usuario con `fullName` igual a `Ada Lovelace`
- **THEN** `initials` es `AL`

#### Scenario: Nombre de una palabra

- **WHEN** una respuesta devuelve un usuario con `fullName` igual a `Ada`
- **THEN** `initials` es `AD`

#### Scenario: Sin nombre

- **WHEN** una respuesta devuelve un usuario con `fullName` igual a `null` y `email` igual a `c@x.com`
- **THEN** `initials` es `CX`

### Requirement: Perfil solo con sesión

La aplicación web SHALL llevar a `/login` a quien abre `/profile` sin sesión.

#### Scenario: Acceso al perfil sin sesión

- **WHEN** una persona sin sesión abre `/profile`
- **THEN** ve la pantalla de inicio de sesión en `/login`

### Requirement: Inicio de sesión y registro solo sin sesión

La aplicación web SHALL llevar a `/profile` a quien abre `/login` o `/register` con una sesión activa.

#### Scenario: Acceso a las pantallas públicas con sesión

- **WHEN** una persona con sesión activa abre `/login` o `/register`
- **THEN** ve su perfil en `/profile`

### Requirement: Redirección de otras rutas

La aplicación web SHALL dirigir a `/profile` cualquier ruta distinta de `/login`, `/register` y `/profile`, aplicando después la protección de esa pantalla.

#### Scenario: Otra ruta con sesión

- **WHEN** una persona con sesión activa abre una ruta distinta de `/login`, `/register` y `/profile`
- **THEN** ve su perfil en `/profile`

#### Scenario: Otra ruta sin sesión

- **WHEN** una persona sin sesión abre una ruta distinta de `/login`, `/register` y `/profile`
- **THEN** ve la pantalla de inicio de sesión en `/login`

### Requirement: Espera mientras se comprueba la sesión

La aplicación web SHALL mostrar un indicador de carga, sin redirigir, mientras comprueba una sesión iniciada previamente.

#### Scenario: Comprobación en curso

- **WHEN** una persona con una sesión iniciada previamente carga la aplicación y la comprobación aún no ha terminado
- **THEN** ve un indicador de carga y no se la redirige a otra pantalla

### Requirement: La sesión se mantiene al recargar

La aplicación web SHALL mantener la sesión al recargar la página mientras el servidor siga reconociéndola.

#### Scenario: Recarga con sesión reconocida

- **WHEN** una persona con sesión activa recarga `/profile` y el servidor sigue reconociendo su sesión
- **THEN** sigue viendo su perfil sin volver a iniciar sesión

### Requirement: Sesión rechazada por el servidor

La aplicación web SHALL cerrar la sesión y explicar el motivo en la pantalla de inicio de sesión cuando el servidor rechaza con 401 una sesión iniciada previamente.

#### Scenario: Sesión ya no reconocida

- **WHEN** una persona carga la aplicación y el servidor responde 401 al comprobar su sesión
- **THEN** ve la pantalla de inicio de sesión con el aviso «Tu sesión ha caducado. Vuelve a iniciar sesión.»

#### Scenario: Recarga posterior

- **WHEN** una persona cuya sesión ha sido rechazada con 401 recarga la página
- **THEN** sigue en la pantalla de inicio de sesión

### Requirement: Sesión no comprobable

La aplicación web SHALL mostrar la pantalla de inicio de sesión con el error y SHALL conservar la sesión para un nuevo intento al recargar cuando no puede comprobarla por un error de red o del servidor.

#### Scenario: Servidor no disponible

- **WHEN** una persona con una sesión iniciada previamente carga la aplicación y la comprobación falla por un error de red
- **THEN** ve la pantalla de inicio de sesión con el aviso «No se pudo conectar con el servidor. Comprueba que el backend está arrancado.»

#### Scenario: Error del servidor

- **WHEN** una persona con una sesión iniciada previamente carga la aplicación y la comprobación falla con un error 5xx
- **THEN** ve la pantalla de inicio de sesión con el aviso «Algo ha ido mal en el servidor. Inténtalo de nuevo en un momento.»

#### Scenario: Recarga con el servidor recuperado

- **WHEN** la comprobación ha fallado por un error de red o del servidor, el servidor vuelve a funcionar y sigue reconociendo la sesión, y la persona recarga la página
- **THEN** vuelve a ver su perfil sin iniciar sesión de nuevo

### Requirement: Cierre de sesión desde la aplicación

La aplicación web SHALL cerrar la sesión de la persona aunque falle la llamada de cierre al servidor.

#### Scenario: Cierre correcto

- **WHEN** una persona pulsa «Cerrar sesión» en su perfil y el servidor responde correctamente
- **THEN** ve la pantalla de inicio de sesión

#### Scenario: Fallo de la llamada al servidor

- **WHEN** una persona pulsa «Cerrar sesión» en su perfil y la llamada al servidor falla
- **THEN** ve la pantalla de inicio de sesión sin ningún aviso de error

### Requirement: Aviso de credenciales incorrectas

La aplicación web SHALL mostrar un aviso general cuando el inicio de sesión falla por credenciales incorrectas.

#### Scenario: Credenciales rechazadas

- **WHEN** una persona envía el formulario de inicio de sesión y el servidor responde 400
- **THEN** ve el aviso «El email o la contraseña no son correctos.»

### Requirement: Errores de validación por campo

La aplicación web SHALL mostrar en castellano, bajo cada campo, los errores de validación que informa el servidor, con un solo error por campo.

#### Scenario: Email ya registrado

- **WHEN** una persona envía el formulario de registro con un email ya registrado
- **THEN** ve bajo el campo de email el mensaje «Ese email ya está registrado. Inicia sesión en su lugar.»

#### Scenario: Varios errores en un mismo campo

- **WHEN** el servidor informa de más de un error de validación para un mismo campo
- **THEN** la persona ve bajo ese campo solo el primero, traducido al castellano

### Requirement: Errores de conexión y del servidor

La aplicación web SHALL informar a la persona en el formulario cuando no puede conectar con el servidor o este responde con otro error.

#### Scenario: Error de red

- **WHEN** una persona envía un formulario y no se puede conectar con el servidor
- **THEN** ve el aviso «No se pudo conectar con el servidor. Comprueba que el backend está arrancado.»

#### Scenario: Otro error del servidor

- **WHEN** una persona envía un formulario y el servidor responde 404 o 5xx
- **THEN** ve el aviso «Algo ha ido mal en el servidor. Inténtalo de nuevo en un momento.»

### Requirement: Coincidencia de contraseñas antes de enviar

La aplicación web SHALL avisar de que las contraseñas no coinciden sin llamar al servidor.

#### Scenario: Contraseñas distintas

- **WHEN** una persona envía el formulario de registro con una contraseña y una confirmación distintas
- **THEN** ve bajo la confirmación el mensaje «Las contraseñas no coinciden.» y no se envía ninguna petición al servidor

### Requirement: Nombre opcional en el registro

La aplicación web SHALL tratar como ausente un nombre vacío o solo con espacios.

#### Scenario: Registro sin nombre

- **WHEN** una persona se registra dejando el nombre vacío o solo con espacios
- **THEN** la cuenta se crea y su perfil muestra «Sin nombre»

### Requirement: Envío de formularios con campos vacíos

La aplicación web SHALL permitir enviar los formularios con campos vacíos y SHALL mostrar los errores que informa el servidor.

#### Scenario: Inicio de sesión vacío

- **WHEN** una persona envía el formulario de inicio de sesión sin rellenar ningún campo
- **THEN** la petición se envía y ve «Falta rellenar el email.» y «Falta rellenar la contraseña.» bajo sus campos

#### Scenario: Registro vacío

- **WHEN** una persona envía el formulario de registro sin rellenar ningún campo
- **THEN** la petición se envía y ve bajo el email, la contraseña y la confirmación los mensajes de campo obligatorio

### Requirement: Estado de envío

La aplicación web SHALL desactivar el botón de envío y cambiar su texto mientras se procesa un formulario.

#### Scenario: Envío del inicio de sesión

- **WHEN** una persona envía el formulario de inicio de sesión y la respuesta está pendiente
- **THEN** el botón está desactivado y muestra «Entrando…»

#### Scenario: Envío del registro

- **WHEN** una persona envía el formulario de registro y la respuesta está pendiente
- **THEN** el botón está desactivado y muestra «Creando cuenta…»

### Requirement: Pantalla de perfil

La aplicación web SHALL mostrar en el perfil las iniciales, el nombre, el email, la fecha de alta y un botón para cerrar sesión.

#### Scenario: Usuario con nombre

- **WHEN** una persona con nombre abre su perfil
- **THEN** ve sus iniciales, su nombre, su email, «Miembro desde» con la fecha en formato largo en español y el botón «Cerrar sesión»

#### Scenario: Usuario sin nombre

- **WHEN** una persona sin nombre abre su perfil
- **THEN** ve «Sin nombre» en lugar del nombre, junto con el resto de los datos del perfil

---

## Parte B

**Cómo leer esta parte.** Las listas 2 y 3 parten de la exploración que hizo el agente (Claude Code, Opus 5.5) antes de escribir la spec. Indico en cada una cuáles verifiqué yo en el código; el resto son hallazgos del agente que no llegué a comprobar dentro del tiempo. Las rutas indican dónde aparece cada caso en el repositorio.

**Leyenda:** `[E]` = el agente lo ejecutó con `curl` contra una copia desechable del backend. No cuenta como comprobación mía.

### 1. Requisitos generados y comprobados

- Generados por el agente: **30** (14 de API y 16 de frontend).
- Comprobados por mí en el código: **5** 
    - Requirement: Validación del email en el registro
    - Requirement: Validación de la contraseña en el registro
    - Requirement: Validación de los datos de inicio de sesión
    - Requirement: Perfil solo con sesión
    - Requirement: Coincidencia de contraseñas antes de enviar
- Diferencia entre la exploración y la spec: la exploración listó 17 comportamientos de frontend y la spec tiene 16. El agente fusionó «el token guardado se valida al cargar la app» en los requisitos «La sesión se mantiene al recargar» y «Sesión rechazada por el servidor».
- Los 25 restantes quedan sin verificar por mí. Los de API tienen la ejecución `[E]` del agente como única evidencia.

### 2. Incoherencias detectadas

Verificadas por mí: 3 (la nro 3, 5 y 7). El resto son hallazgos del agente sin verificar.

| # | Incoherencia | Dónde aparece |
|---|---|---|
| 1 | El logout responde sin el envoltorio `{data}` que usan las demás respuestas correctas de la API. | `backend/app/controllers/access_tokens_controller.ts:25-27` |
| 2 | La UI impide entrar a login y registro con sesión activa, pero la API los acepta con un token válido y crea otro token u otra cuenta. `[E]` | `frontend/src/routes/public-only-route.tsx:13`, `backend/start/routes.ts:20-26` |
| 3 | El aviso de sesión perdida aparece en login pero no en registro, aunque ambas son pantallas públicas a las que se llega en ese estado. | `frontend/src/pages/login-page.tsx:23`, `frontend/src/pages/register-page.tsx:56` |
| 4 | El aviso dice que la sesión «ha caducado», pero los tokens se crean sin expiración: el 401 solo puede deberse a un token revocado o inválido. `[E]` | `frontend/src/lib/api.ts:77`, `backend/app/controllers/access_tokens_controller.ts:11` |
| 5 | El login evita revelar si un email existe, pero el registro lo confirma con «Ese email ya está registrado». `[E]` | `backend/app/validators/user.ts:14`, `frontend/src/lib/api.ts:50-53` |
| 6 | Email y contraseña tienen longitud máxima, `fullName` no: se aceptó un nombre de 300 caracteres. `[E]` | `backend/app/validators/user.ts:13` |
| 7 | El backend recorta espacios de todo el cuerpo (contraseñas incluidas), pero la UI compara las contraseñas sin recortar: `"abc12345 "` y `"abc12345"` fallan en la UI y pasarían en la API. | `frontend/src/pages/register-page.tsx:34,42` |
| 8 | Con una contraseña corta y distinta de la confirmación, la UI informa solo de la diferencia y la API solo de la longitud, sin `sameAs`. `[E]` | `frontend/src/pages/register-page.tsx:34` |
| 9 | Los mensajes de error de longitud empiezan en minúscula y los demás en mayúscula. | `frontend/src/lib/api.ts:61,63` |
| 10 | `updatedAt` es obligatorio en los tipos del frontend y admite nulo en el esquema del backend. Hoy siempre se rellena, así que no falla. | `frontend/src/lib/types.ts:10`, `backend/database/schema.ts:49` |
| 11 | El mismo usuario devuelve fechas con milisegundos en el registro y sin ellos en respuestas posteriores. `[E]` | `backend/app/controllers/new_account_controller.ts:10-15` |
| 12 | El frontend trata cualquier 400 como credenciales incorrectas, y el backend también responde 400 a un JSON malformado. `[E]` No ocurre hoy porque el cliente siempre envía JSON válido. | `frontend/src/lib/api.ts:83-85` |

### 3. Comportamientos que no supe clasificar como bug o contrato

Verificados por mí: 2 (la 1 y 2). El resto son hallazgos del agente sin verificar.

**1. Emails que solo difieren en mayúsculas** — `backend/app/validators/user.ts:6,14`
- **Qué pasa:** `ada@x.com` y `ADA@x.com` crean dos cuentas distintas, e iniciar sesión con `ADA@x.com` cuando solo existe `ada@x.com` da 400. `[E]`
- **Bug:** lo más probable es que sean la misma persona, y la regla de unicidad admite una opción sin distinción de mayúsculas que aquí no se usa.
- **Contrato:** el email se trataría como un identificador literal.
- **Por qué no se decide:** no hay normalización, tests ni comentario que fijen la intención.

**2. Recorte de espacios en la contraseña** — configuración por defecto del bodyparser del backend
- **Qué pasa:** `"  password1  "` se registra, y luego se puede iniciar sesión con o sin los espacios. `[E]`
- **Bug:** se altera un secreto en silencio, y la longitud mínima se comprueba después del recorte.
- **Contrato:** es un comportamiento por defecto aceptable que perdona errores al copiar y pegar.
- **Por qué no se decide:** el proyecto no declara nada explícito sobre este caso.

**3. Cierre de sesión con fallo de red** — `frontend/src/auth/auth-provider.tsx:100-106`
- **Qué pasa:** el token desaparece del navegador, pero sigue válido en el servidor y sin expiración.
- **Contrato:** un comentario del código dice que el cierre local se hace «pase lo que pase».
- **Bug:** esa justificación cubre el caso de un token que ya no vale, no el de un token vivo que nadie puede revocar.
- **Por qué no se decide:** el comentario no aclara si se aceptó ese riesgo.

**4. Tokens sin expiración y sin cierre global**
- **Qué pasa:** cada inicio de sesión acumula un token permanente, y el cierre de sesión solo revoca uno. `[E]`
- **Contrato:** serían sesiones por dispositivo de larga duración.
- **Bug:** no hay forma de cerrar todas las sesiones ni de limpiar las antiguas, y el aviso «ha caducado» sugiere que se esperaba una expiración.
- **Por qué no se decide:** no se configura ninguna expiración y nada documenta si fue a propósito.

**5. Sesión visible con el token ya revocado** — `frontend/src/auth/auth-provider.tsx:43-82`
- **Qué pasa:** el token solo se valida al cargar la app. Si se cierra sesión en otra pestaña, esta sigue mostrando el perfil hasta recargar.
- **Contrato:** el perfil no hace más llamadas, así que no hacía falta más control.
- **Bug:** la sesión visible no refleja la real.
- **Por qué no se decide:** con una sola pantalla protegida, el código no muestra qué se espera cuando haya más.

**6. Registro con código 200**
- **Qué pasa:** crear una cuenta responde 200, no 201. `[E]`
- **Contrato:** el frontend solo distingue éxito de error, y login y registro quedan uniformes.
- **Bug:** es un descuido respecto a la convención REST.
- **Por qué no se decide:** nada en el código fija ese código de estado. Por eso la spec dice «respuesta de éxito» en lugar de un código concreto.

**7. Sin límite de intentos en login y registro** — `backend/start/kernel.ts`, `backend/start/routes.ts`
- **Qué pasa:** no hay ningún limitador de intentos.
- **Contrato:** se habría dejado fuera por ser un proyecto de práctica.
- **Bug:** es un hueco de seguridad.
- **Por qué no se decide:** el código solo muestra la ausencia, no el motivo.

**8. Iniciales con varios espacios en el nombre** — `backend/app/models/user.ts:12`
- **Qué pasa:** `"Ada  Lovelace"` (con dos espacios) genera `AD` en lugar de `AL`. `[E]`
- **Bug:** es lo más probable.
- **Contrato:** bastaría con admitir solo nombres separados por un espacio.
- **Por qué no se decide:** ni el validador ni los tests definen un formato de nombre.

**9. Ambigüedad de la propia regla de la spec sobre rutas**
- **Qué pasa:** el ejercicio pide no incluir «rutas del código», pero en una API el método y la ruta HTTP son el contrato externo.
- **Decisión tomada:** incluí método y ruta HTTP en los requisitos de API, y las URLs visibles (`/login`, `/register`, `/profile`) en los de frontend.
- **Por qué no se decide:** la regla admite las dos lecturas.

#### Requisitos de la spec que convierten una duda en contrato

El agente redactó con SHALL dos comportamientos que figuran como dudosos en esta lista:

- «El cierre de sesión afecta solo al token usado» → depende de la duda 4.
- «Cierre de sesión desde la aplicación», escenario «Fallo de la llamada al servidor» → depende de la duda 3.

No los modifiqué porque el tiempo había terminado. Quedan señalados como requisitos que no deberían tratarse como contrato hasta resolver esas dudas.
