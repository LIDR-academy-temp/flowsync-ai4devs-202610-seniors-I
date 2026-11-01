# Especificación Viva: Cuentas y Acceso

## Purpose

Describe lo que el sistema hace hoy en registro de usuarios, inicio y cierre de sesión, consulta del perfil y control de acceso, tanto en la API (`backend/`, rutas bajo `/api/v1`) como en la interfaz web (`frontend/`, rutas `/login`, `/register` y `/profile`). Documenta el comportamiento implementado, no el que se podría desear.

## Requirements

### Requirement: Registro de cuentas por API

El sistema SHALL crear una cuenta a partir de `fullName` (la clave es obligatoria y su valor puede ser `null`), `email` y `password` mediante `POST /api/v1/auth/signup`, y SHALL devolver el usuario creado junto con un token de acceso, de modo que el registro también inicia sesión.

Reglas de validación (`backend/app/validators/user.ts`):
- `email`: formato de email válido, máximo 254 caracteres, único en la tabla `users`.
- `password`: entre 8 y 32 caracteres.
- `passwordConfirmation`: debe ser idéntica a `password`.
- `fullName`: la clave debe enviarse siempre; su valor puede ser `null`. No tiene mínimo ni máximo en el backend.

#### Scenario: Registro con nombre completo

- **WHEN** se envía `POST /api/v1/auth/signup` con `fullName`, un `email` no registrado, `password` y `passwordConfirmation` válidos
- **THEN** el sistema devuelve código 200 con `{ "data": { "user": { id, fullName, email, createdAt, updatedAt, initials }, "token": "<token opaco>" } }`

#### Scenario: Registro sin nombre completo

- **WHEN** se envía `POST /api/v1/auth/signup` con `fullName` a `null`
- **THEN** el sistema devuelve código 200, `user.fullName` vale `null` y `user.initials` se calcula a partir del email: la primera letra de la parte local seguida de la primera letra del dominio, en mayúsculas (por ejemplo, `ada@ejemplo.com` produce `AE`)

#### Scenario: Contraseñas distintas

- **WHEN** se envía `POST /api/v1/auth/signup` con `password` y `passwordConfirmation` diferentes
- **THEN** el sistema devuelve código 422 con un error en el campo `passwordConfirmation` cuya regla es `sameAs`, y no crea ningún usuario

#### Scenario: Contraseña por debajo o por encima del rango

- **WHEN** se envía `POST /api/v1/auth/signup` con una `password` de menos de 8 caracteres o de más de 32
- **THEN** el sistema devuelve código 422 con un error en el campo `password` (reglas `minLength` o `maxLength`) y no crea ningún usuario

#### Scenario: Email ya registrado

- **WHEN** se envía `POST /api/v1/auth/signup` con un `email` que ya existe en `users`
- **THEN** el sistema devuelve código 422 con un error en el campo `email` cuya regla es `database.unique`

#### Scenario: Email con formato inválido o demasiado largo

- **WHEN** se envía `POST /api/v1/auth/signup` con un `email` que no tiene formato válido o supera los 254 caracteres
- **THEN** el sistema devuelve código 422 con un error en el campo `email` (reglas `email` o `maxLength`)

#### Scenario: Campos obligatorios ausentes

- **WHEN** se envía `POST /api/v1/auth/signup` sin `fullName`, `email`, `password` o `passwordConfirmation`
- **THEN** el sistema devuelve código 422 con un error de regla `required` en cada campo ausente, aunque el valor de `fullName` pueda ser `null` cuando la clave está presente

### Requirement: Inicio de sesión por API

El sistema SHALL verificar `email` y `password` en `POST /api/v1/auth/login` y SHALL crear un token de acceso nuevo en cada inicio de sesión correcto.

#### Scenario: Inicio de sesión correcto

- **WHEN** se envía `POST /api/v1/auth/login` con el `email` y la `password` de un usuario existente
- **THEN** el sistema devuelve código 200 con `{ "data": { "user": { ... }, "token": "<token opaco>" } }`, y el token es distinto del que devolvió cualquier login anterior de ese usuario

#### Scenario: Credenciales incorrectas

- **WHEN** se envía `POST /api/v1/auth/login` con un `email` que no existe o con una `password` incorrecta
- **THEN** el sistema devuelve código 400 con el error `E_INVALID_CREDENTIALS`, sin distinguir cuál de los dos datos es incorrecto

#### Scenario: Email con formato inválido en login

- **WHEN** se envía `POST /api/v1/auth/login` con un `email` que no tiene formato válido
- **THEN** el sistema devuelve código 422 con un error en el campo `email` y no consulta las credenciales

#### Scenario: Contraseña vacía en login

- **WHEN** se envía `POST /api/v1/auth/login` sin `password`
- **THEN** el sistema devuelve código 422 con un error de regla `required` en `password`

Nota de comportamiento: el login no aplica el rango de 8 a 32 caracteres de la contraseña; ese rango solo se valida en el registro.

### Requirement: Consulta del perfil autenticado

El sistema SHALL devolver los datos del usuario dueño del token en `GET /api/v1/account/profile`, identificándolo mediante la cabecera `Authorization: Bearer <token>`.

#### Scenario: Consulta con token válido

- **WHEN** se envía `GET /api/v1/account/profile` con `Authorization: Bearer <token>` válido
- **THEN** el sistema devuelve código 200 con `{ "data": { id, fullName, email, createdAt, updatedAt, initials } }` del usuario dueño del token

#### Scenario: Cada token devuelve solo su usuario

- **WHEN** dos usuarios distintos consultan el perfil con sus propios tokens
- **THEN** cada petición devuelve únicamente los datos del usuario al que pertenece su token

#### Scenario: Consulta sin cabecera de autenticación

- **WHEN** se envía `GET /api/v1/account/profile` sin cabecera `Authorization`
- **THEN** el sistema devuelve código 401 y no devuelve datos de usuario

#### Scenario: Consulta con token inexistente o no válido

- **WHEN** se envía `GET /api/v1/account/profile` con `Authorization: Bearer <token>` cuyo valor no existe en la tabla de tokens
- **THEN** el sistema devuelve código 401 y no devuelve datos de usuario

#### Scenario: Consulta con un token ya revocado

- **WHEN** se envía `GET /api/v1/account/profile` con un token que ya se usó en `POST /api/v1/account/logout`
- **THEN** el sistema devuelve código 401

### Requirement: Cierre de sesión por API

El sistema SHALL invalidar únicamente el token con el que se hace la petición en `POST /api/v1/account/logout`. Los demás tokens del mismo usuario SHALL seguir siendo válidos.

#### Scenario: Cierre de sesión correcto

- **WHEN** se envía `POST /api/v1/account/logout` con `Authorization: Bearer <token>` válido
- **THEN** el sistema devuelve código 200 con `{ "message": "Logged out successfully" }` (sin el envoltorio `data`) y elimina ese token de la tabla

#### Scenario: Otros dispositivos siguen conectados

- **WHEN** un usuario tiene dos tokens activos, A y B, y hace logout con A
- **THEN** el token A deja de funcionar y el token B sigue devolviendo código 200 en el perfil

#### Scenario: Logout sin autenticación

- **WHEN** se envía `POST /api/v1/account/logout` sin cabecera `Authorization` o con un token no válido
- **THEN** el sistema devuelve código 401

### Requirement: Control de acceso por endpoint

El sistema SHALL exigir un token válido en todas las rutas de `/api/v1/account/*` mediante `middleware.auth()`, y SHALL dejar abiertas las rutas de `/api/v1/auth/*` y `GET /`.

Estado actual de la autorización: no existen roles, permisos, `abilities` ni comprobaciones de propiedad sobre recursos. El único recurso protegido es el propio usuario, así que la autorización se reduce a comprobar que hay un token válido.

#### Scenario: Ruta pública sin token

- **WHEN** se envía `POST /api/v1/auth/login` o `POST /api/v1/auth/signup` sin cabecera `Authorization`
- **THEN** la petición se procesa con normalidad

#### Scenario: Ruta pública con token válido

- **WHEN** se envía `POST /api/v1/auth/login` con un token válido de otro usuario
- **THEN** la petición se procesa con normalidad y el login devuelve un token nuevo para las credenciales enviadas, no reutiliza el token de la cabecera

#### Scenario: Ruta raíz

- **WHEN** se envía `GET /` sin autenticación
- **THEN** el sistema devuelve código 200 con `{ "hello": "world" }`

#### Scenario: Respuestas siempre en JSON

- **WHEN** se envía cualquier petición sin cabecera `Accept` o con `Accept` distinto de JSON
- **THEN** el sistema fuerza `Accept: application/json` y las respuestas, incluidos los errores 401 y 422, salen en formato JSON

### Requirement: Almacenamiento de tokens de acceso

El sistema SHALL guardar cada token de acceso en la tabla `auth_access_tokens` y SHALL asociarlo al usuario mediante `tokenable_id`. El token en claro solo se devuelve en la respuesta de signup o login.

#### Scenario: Token creado en registro o login

- **WHEN** se crea un token mediante signup o login
- **THEN** la tabla guarda una fila con `tokenable_id` del usuario, un valor en la columna `hash` y `expires_at` a `null`, de modo que el token no caduca por tiempo, solo al hacer logout con él

#### Scenario: Borrado de usuario

- **WHEN** se elimina un usuario de la tabla `users`
- **THEN** sus filas de `auth_access_tokens` se eliminan en cascada

Nota: no hay ningún proceso que limpie tokens caducados, porque el sistema no genera tokens con caducidad.

### Requirement: Sesión en la interfaz web

El sistema SHALL guardar el token de acceso en `localStorage` bajo la clave `flowsync.token` tras un signup o login correcto, y SHALL validarlo contra `GET /api/v1/account/profile` al arrancar la aplicación si existe.

#### Scenario: Login o signup correcto

- **WHEN** el usuario completa correctamente el formulario de login o de registro
- **THEN** la aplicación guarda el token en `localStorage` y pasa a estado `authenticated` con los datos del usuario

#### Scenario: Recarga con token válido

- **WHEN** el usuario recarga la página teniendo `flowsync.token` en `localStorage` y el backend acepta el token
- **THEN** la aplicación muestra un cargador a pantalla completa mientras consulta el perfil y después muestra la ruta solicitada

#### Scenario: Recarga con token rechazado

- **WHEN** el usuario recarga la página y el backend responde 401 al consultar el perfil
- **THEN** la aplicación borra `flowsync.token` de `localStorage`, pasa a estado `anonymous` y redirige a `/login`, donde se muestra el aviso "Tu sesión ha caducado. Vuelve a iniciar sesión."

#### Scenario: Recarga sin conexión o con error del servidor

- **WHEN** el usuario recarga la página y la consulta del perfil falla por red o por un error distinto de 401
- **THEN** la aplicación conserva `flowsync.token` en `localStorage`, pasa a estado `anonymous` y redirige a `/login` con el mensaje del error: "No se pudo conectar con el servidor. Comprueba que el backend está arrancado." si no hay conexión, o "Algo ha ido mal en el servidor. Inténtalo de nuevo en un momento." si el servidor responde con error

#### Scenario: Cierre de sesión desde la interfaz

- **WHEN** el usuario pulsa "Cerrar sesión"
- **THEN** la aplicación borra el token y el usuario de memoria antes de llamar a `logout`, y pasa a estado `anonymous` aunque la llamada al backend falle

### Requirement: Pantalla de registro

El sistema SHALL mostrar en `/register` un formulario de registro con los campos "Nombre completo" (opcional), "Email", "Contraseña" y "Repite la contraseña", y SHALL enviar los datos a `POST /api/v1/auth/signup`.

#### Scenario: Acceso a la pantalla de registro

- **WHEN** el usuario navega a `/register` sin sesión
- **THEN** se muestra el título "Crea tu cuenta", el texto de ayuda "Entre 8 y 32 caracteres.", el botón "Crear cuenta" y el enlace "¿Ya tienes cuenta? Inicia sesión" a `/login`

#### Scenario: Contraseñas distintas sin llamar al servidor

- **WHEN** el usuario envía el formulario con "Contraseña" y "Repite la contraseña" distintas
- **THEN** la aplicación muestra "Las contraseñas no coinciden." bajo "Repite la contraseña" y no hace ninguna petición a la API

#### Scenario: Nombre vacío o con solo espacios

- **WHEN** el usuario envía el formulario con "Nombre completo" vacío o con solo espacios
- **THEN** la aplicación envía `fullName: null`

#### Scenario: Registro correcto

- **WHEN** el usuario envía el formulario con datos válidos
- **THEN** la aplicación navega a `/profile` y muestra el perfil del usuario recién creado

#### Scenario: Email ya registrado

- **WHEN** el usuario envía el formulario con un email que ya existe
- **THEN** se muestra "Ese email ya está registrado. Inicia sesión en su lugar." bajo el campo "Email"

#### Scenario: Error de validación del backend

- **WHEN** el backend devuelve un 422 con errores de campo que están en pantalla
- **THEN** cada mensaje aparece bajo su campo y la página no cambia

#### Scenario: Sin conexión

- **WHEN** el usuario envía el formulario y no hay conexión con el backend
- **THEN** se muestra en la parte superior del formulario "No se pudo conectar con el servidor. Comprueba que el backend está arrancado."

#### Scenario: Usuario ya autenticado

- **WHEN** el usuario navega a `/register` con sesión activa
- **THEN** la aplicación redirige a `/profile`

### Requirement: Pantalla de inicio de sesión

El sistema SHALL mostrar en `/login` un formulario con los campos "Email" y "Contraseña", y SHALL enviar los datos a `POST /api/v1/auth/login`.

#### Scenario: Acceso a la pantalla de inicio de sesión

- **WHEN** el usuario navega a `/login` sin sesión
- **THEN** se muestra el título "Inicia sesión", el botón "Entrar" y el enlace "¿Aún no tienes cuenta? Crea una" a `/register`

#### Scenario: Credenciales incorrectas

- **WHEN** el usuario envía el formulario con un email o una contraseña incorrectos
- **THEN** se muestra en la parte superior del formulario "El email o la contraseña no son correctos.", sin indicar cuál de los dos datos falla

#### Scenario: Inicio de sesión correcto

- **WHEN** el usuario envía el formulario con credenciales válidas
- **THEN** la aplicación navega a `/profile`

#### Scenario: Vuelta a /profile tras login desde ruta protegida

- **WHEN** el usuario intenta abrir `/profile` sin sesión, es redirigido a `/login` e inicia sesión correctamente
- **THEN** la aplicación navega a `/profile`. No recuerda la ruta original, porque el redirect de `ProtectedRoute` no guarda el destino

#### Scenario: Error de validación en login

- **WHEN** el backend devuelve un 422 por el email o la contraseña
- **THEN** el mensaje aparece bajo el campo correspondiente, por ejemplo "Introduce una dirección de email válida."

#### Scenario: Aviso de sesión perdida

- **WHEN** se llega a `/login` porque la sesión guardada fue rechazada o no se pudo restaurar
- **THEN** el aviso de `sessionError` aparece en la parte superior del formulario hasta que el usuario envía el formulario

#### Scenario: Usuario ya autenticado

- **WHEN** el usuario navega a `/login` con sesión activa
- **THEN** la aplicación redirige a `/profile`

### Requirement: Pantalla de perfil

El sistema SHALL mostrar en `/profile` los datos del usuario autenticado y un botón "Cerrar sesión".

#### Scenario: Visualización del perfil

- **WHEN** el usuario con sesión activa navega a `/profile`
- **THEN** se muestra un círculo con sus iniciales, su nombre completo o "Sin nombre" si no lo tiene, su email y "Miembro desde" con la fecha de creación en formato largo en español. La pantalla no muestra `updatedAt` ni el `id`

#### Scenario: Cierre de sesión desde el perfil

- **WHEN** el usuario pulsa "Cerrar sesión"
- **THEN** el botón cambia a "Cerrando sesión…" y, al quedar la sesión anónima, la aplicación redirige a `/login`

#### Scenario: Acceso a perfil sin sesión

- **WHEN** el usuario navega a `/profile` sin sesión activa
- **THEN** la aplicación redirige a `/login`

#### Scenario: Ruta desconocida

- **WHEN** el usuario navega a una ruta que no existe
- **THEN** la aplicación redirige a `/profile`, y de ahí a `/login` si no hay sesión
