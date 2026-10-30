## Purpose

Permitir que una persona cree una cuenta, inicie y cierre sesión, y consulte su perfil, tanto a través de la API como desde la pantalla.

## Requirements

### Requirement: El sistema SHALL permitir registrar una cuenta nueva por la API

#### Scenario: registro con nombre completo

- **WHEN** un cliente envía `POST /api/v1/auth/signup` con un cuerpo JSON que incluye `fullName` (cadena), `email` (dirección válida aún no usada, de como máximo 254 caracteres), `password` (entre 8 y 32 caracteres) y `passwordConfirmation` idéntica a `password`
- **THEN** la API responde 200 con un cuerpo envuelto en `data` que contiene `user` (con `id`, `fullName`, `email`, `createdAt`, `updatedAt` e `initials`) y `token` (cadena opaca de acceso)

#### Scenario: registro sin nombre

- **WHEN** un cliente envía `POST /api/v1/auth/signup` con `fullName` en `null` y el resto de campos válidos
- **THEN** la API responde 200 con `data.user.fullName` en `null` y un `data.token`

#### Scenario: el nombre debe enviarse aunque sea vacío

- **WHEN** un cliente envía `POST /api/v1/auth/signup` sin incluir la clave `fullName` en el cuerpo
- **THEN** la API responde 422 con un array `errors` cuyo elemento indica el campo `fullName` y la regla `required`

### Requirement: El sistema SHALL rechazar registros con datos inválidos o email ya usado

#### Scenario: email ya registrado

- **WHEN** un cliente intenta registrarse con un `email` exactamente igual a uno ya existente
- **THEN** la API responde 422 con `errors` que incluye el campo `email` y la regla `database.unique`

#### Scenario: el email distingue mayúsculas y minúsculas

- **WHEN** un cliente se registra con un email que solo difiere en mayúsculas o minúsculas de uno ya existente
- **THEN** la API acepta el registro (200) y crea una cuenta distinta

#### Scenario: email con formato inválido

- **WHEN** un cliente envía un `email` que no es una dirección válida
- **THEN** la API responde 422 con `errors` que incluye el campo `email` y la regla `email`

#### Scenario: contraseña demasiado corta

- **WHEN** un cliente envía una `password` de menos de 8 caracteres (y la misma confirmación)
- **THEN** la API responde 422 con `errors` que incluye el campo `password`, la regla `minLength` y `meta.min` igual a 8

#### Scenario: contraseña demasiado larga

- **WHEN** un cliente envía una `password` de más de 32 caracteres (y la misma confirmación)
- **THEN** la API responde 422 con `errors` que incluye el campo `password`, la regla `maxLength` y `meta.max` igual a 32

#### Scenario: confirmación de contraseña distinta

- **WHEN** un cliente envía `passwordConfirmation` distinta de `password`
- **THEN** la API responde 422 con `errors` que incluye el campo `passwordConfirmation` y la regla `sameAs`

### Requirement: El sistema SHALL permitir iniciar sesión por la API con credenciales correctas

#### Scenario: inicio de sesión correcto

- **WHEN** un cliente envía `POST /api/v1/auth/login` con el `email` y la `password` de una cuenta existente
- **THEN** la API responde 200 con `data.user` (mismos campos que en el registro) y `data.token`

#### Scenario: el email del login distingue mayúsculas y minúsculas

- **WHEN** un cliente inicia sesión con un email que solo difiere en mayúsculas o minúsculas del registrado
- **THEN** la API responde 400 con `errors` que contiene el mensaje `Invalid user credentials`

### Requirement: El sistema SHALL rechazar inicios de sesión inválidos

#### Scenario: credenciales incorrectas

- **WHEN** un cliente envía un email desconocido o una contraseña incorrecta en `POST /api/v1/auth/login`
- **THEN** la API responde 400 con `errors` que contiene el mensaje `Invalid user credentials` (sin campo ni regla)

#### Scenario: email con formato inválido en el login

- **WHEN** un cliente envía un `email` que no es una dirección válida en `POST /api/v1/auth/login`
- **THEN** la API responde 422 con `errors` que incluye el campo `email` y la regla `email`

### Requirement: El sistema SHALL exponer el perfil de la persona autenticada

#### Scenario: consulta de perfil con token válido

- **WHEN** un cliente envía `GET /api/v1/account/profile` con la cabecera `Authorization: Bearer` y un token válido
- **THEN** la API responde 200 con `data` que contiene `id`, `fullName`, `email`, `createdAt`, `updatedAt` e `initials`

#### Scenario: consulta de perfil sin token

- **WHEN** un cliente envía `GET /api/v1/account/profile` sin cabecera de autorización
- **THEN** la API responde 401 con `errors` que contiene el mensaje `Unauthorized access`

#### Scenario: consulta de perfil con token inválido

- **WHEN** un cliente envía `GET /api/v1/account/profile` con un token que el sistema no reconoce
- **THEN** la API responde 401 con `errors` que contiene el mensaje `Unauthorized access`

### Requirement: El sistema SHALL permitir cerrar sesión y revocar el token actual

#### Scenario: cierre de sesión correcto

- **WHEN** un cliente autenticado envía `POST /api/v1/account/logout` con su token Bearer
- **THEN** la API responde 200 con el cuerpo `{ "message": "Logged out successfully" }` (sin envoltorio `data`)

#### Scenario: el token deja de valer tras el logout

- **WHEN** un cliente usa el mismo token para `GET /api/v1/account/profile` después de un logout correcto
- **THEN** la API responde 401 con `errors` que contiene el mensaje `Unauthorized access`

#### Scenario: cierre de sesión sin token

- **WHEN** un cliente envía `POST /api/v1/account/logout` sin cabecera de autorización
- **THEN** la API responde 401 con `errors` que contiene el mensaje `Unauthorized access`

### Requirement: El sistema SHALL calcular las iniciales del usuario de forma determinista

#### Scenario: nombre con al menos dos palabras

- **WHEN** el usuario tiene un `fullName` con dos o más palabras separadas por espacio
- **THEN** `initials` son la primera letra de la primera palabra y la primera letra de la segunda, en mayúsculas

#### Scenario: nombre de una sola palabra

- **WHEN** el usuario tiene un `fullName` de una sola palabra
- **THEN** `initials` son las dos primeras letras de esa palabra, en mayúsculas

#### Scenario: sin nombre

- **WHEN** el usuario tiene `fullName` en `null`
- **THEN** `initials` se obtienen partiendo el email por la arroba: primera letra de la parte local y primera letra del dominio, en mayúsculas

### Requirement: El sistema SHALL no devolver nunca la contraseña

#### Scenario: ninguna respuesta de cuenta incluye la contraseña

- **WHEN** un cliente recibe la respuesta de registro, login o perfil
- **THEN** el cuerpo no incluye el campo `password` ni ningún secreto equivalente a la contraseña

### Requirement: El sistema SHALL mostrar una pantalla de inicio de sesión

#### Scenario: contenido de la pantalla de login

- **WHEN** una persona anónima abre `/login`
- **THEN** ve el título «FlowSync», la tarjeta «Inicia sesión» con la descripción «Entra con tu cuenta para volver a tus tareas.», los campos Email y Contraseña, el botón «Entrar» y el enlace «Crea una» hacia `/register`

#### Scenario: credenciales incorrectas en pantalla

- **WHEN** la persona envía el formulario de login con email o contraseña incorrectos
- **THEN** permanece en `/login` y ve el aviso «El email o la contraseña no son correctos.»

#### Scenario: estado de carga al entrar

- **WHEN** la persona pulsa «Entrar» y la petición aún no ha terminado
- **THEN** el botón muestra «Entrando…» y queda deshabilitado

### Requirement: El sistema SHALL mostrar una pantalla de registro

#### Scenario: contenido de la pantalla de registro

- **WHEN** una persona anónima abre `/register`
- **THEN** ve el título «FlowSync», la tarjeta «Crea tu cuenta» con la descripción «Regístrate para empezar a organizar el trabajo del equipo.», el campo «Nombre completo (opcional)», Email, Contraseña (con la pista «Entre 8 y 32 caracteres.»), «Repite la contraseña», el botón «Crear cuenta» y el enlace «Inicia sesión» hacia `/login`

#### Scenario: contraseñas distintas sin llamar al servidor

- **WHEN** la persona envía el registro con contraseña y confirmación distintas
- **THEN** permanece en `/register` y ve bajo la confirmación el mensaje «Las contraseñas no coinciden.»

#### Scenario: email ya registrado en pantalla

- **WHEN** la persona intenta registrarse con un email que ya existe
- **THEN** permanece en `/register` y ve bajo el email el mensaje «Ese email ya está registrado. Inicia sesión en su lugar.»

#### Scenario: estado de carga al crear la cuenta

- **WHEN** la persona pulsa «Crear cuenta» y la petición aún no ha terminado
- **THEN** el botón muestra «Creando cuenta…» y queda deshabilitado

#### Scenario: registro exitoso lleva al perfil

- **WHEN** la persona completa el registro con datos válidos
- **THEN** es llevada a `/profile` con la sesión iniciada

### Requirement: El sistema SHALL mostrar el perfil de la persona autenticada

#### Scenario: contenido del perfil con nombre

- **WHEN** una persona autenticada con nombre completo abre `/profile`
- **THEN** ve un círculo con sus iniciales, su nombre, su email, la etiqueta «Miembro desde» con la fecha de alta en formato largo en español, y el botón «Cerrar sesión»

#### Scenario: perfil sin nombre

- **WHEN** una persona autenticada sin nombre abre `/profile`
- **THEN** ve el texto «Sin nombre» en lugar del nombre completo, junto con sus iniciales derivadas del email

#### Scenario: estado de carga al cerrar sesión

- **WHEN** la persona pulsa «Cerrar sesión» y la petición aún no ha terminado
- **THEN** el botón muestra «Cerrando sesión…» y queda deshabilitado

#### Scenario: cierre de sesión en pantalla

- **WHEN** la persona pulsa «Cerrar sesión»
- **THEN** queda anónima y es llevada a `/login`

### Requirement: El sistema SHALL controlar el acceso a las pantallas según la sesión

#### Scenario: perfil exige sesión

- **WHEN** una persona anónima intenta abrir `/profile`
- **THEN** es redirigida a `/login`

#### Scenario: login y registro no están disponibles con sesión

- **WHEN** una persona autenticada intenta abrir `/login` o `/register`
- **THEN** es redirigida a `/profile`

#### Scenario: cualquier otra ruta lleva al perfil

- **WHEN** una persona abre una ruta distinta de `/login`, `/register` y `/profile`
- **THEN** es redirigida a `/profile` (y, si no hay sesión, de ahí a `/login`)

#### Scenario: indicador mientras se comprueba la sesión

- **WHEN** la aplicación está comprobando si hay una sesión guardada válida
- **THEN** la persona ve un indicador de carga a pantalla completa con el texto accesible «Cargando…»

### Requirement: El sistema SHALL persistir la sesión entre recargas

#### Scenario: la sesión se mantiene al recargar

- **WHEN** una persona autenticada recarga la página y el token sigue siendo válido en el servidor
- **THEN** permanece autenticada y puede ver `/profile`

#### Scenario: token rechazado al restaurar la sesión

- **WHEN** la aplicación arranca con un token guardado que el servidor rechaza con 401
- **THEN** la persona queda anónima en `/login`, ve el aviso «Tu sesión ha caducado. Vuelve a iniciar sesión.» y el token guardado se elimina

#### Scenario: no se puede contactar con el servidor al restaurar

- **WHEN** la aplicación arranca con un token guardado y no puede conectar con el servidor
- **THEN** la persona queda anónima en `/login`, ve el aviso «No se pudo conectar con el servidor. Comprueba que el backend está arrancado.» y el token guardado se conserva (una recarga posterior volverá a intentar restaurar la sesión)

#### Scenario: el servidor falla al restaurar la sesión

- **WHEN** la aplicación arranca con un token guardado y el servidor responde con un error distinto de 401 (por ejemplo un fallo interno)
- **THEN** la persona queda anónima en `/login`, ve el aviso «Algo ha ido mal en el servidor. Inténtalo de nuevo en un momento.» y el token guardado se conserva

### Requirement: El sistema SHALL mostrar errores de la API en castellano en pantalla

#### Scenario: fallo genérico del servidor

- **WHEN** la pantalla de login o registro recibe un error del servidor que no es de validación ni de credenciales
- **THEN** la persona ve el aviso «Algo ha ido mal en el servidor. Inténtalo de nuevo en un momento.»

#### Scenario: errores de validación bajo el campo

- **WHEN** el registro o el login reciben un 422 con errores por campo (email inválido, longitud de contraseña, email ya registrado, etc.)
- **THEN** la persona ve el mensaje traducido bajo el campo correspondiente (por ejemplo «Introduce una dirección de email válida.», «la contraseña debe tener al menos 8 caracteres.», «Ese email ya está registrado. Inicia sesión en su lugar.»)
