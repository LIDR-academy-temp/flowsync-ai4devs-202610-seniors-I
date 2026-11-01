# Parte A: la spec, con reloj

# Cuentas y acceso

## Purpose

Permitir que una persona cree una cuenta, inicie sesión, mantenga su sesión activa entre
recargas de página y acceda únicamente a las pantallas que corresponden a su estado de
autenticación, tanto a través de la API (`/api/v1/auth`, `/api/v1/account`) como de la interfaz
web que consume esa API.

## Requirements

### Requirement: Registro de una cuenta nueva

El sistema SHALL permitir crear una cuenta nueva a partir de un nombre completo opcional, un
email y una contraseña con su confirmación, y SHALL iniciar sesión automáticamente con la
cuenta recién creada.

#### Scenario: Alta con datos válidos

- **WHEN** una persona no autenticada envía `POST /api/v1/auth/signup` (o el formulario de
  registro) con un email que no existe todavía, una contraseña de entre 8 y 32 caracteres y la
  misma contraseña repetida en `passwordConfirmation`
- **THEN** la API responde `200` con `{ "data": { "user": {...}, "token": "oat_..." } }` (el
  usuario incluye `id`, `fullName`, `email`, `createdAt`, `updatedAt` e `initials`, nunca la
  contraseña), y en la interfaz la persona queda autenticada sin pasar por login, viendo la
  pantalla de perfil con sus datos.

#### Scenario: Nombre completo ausente

- **WHEN** el formulario de registro se envía con el campo "Nombre completo" vacío (la interfaz
  manda igualmente la clave `fullName` con valor `null`, nunca la omite)
- **THEN** la cuenta se crea con `fullName: null`, el perfil muestra "Sin nombre" en lugar del
  nombre, y las iniciales se calculan a partir del email (las dos primeras letras de la parte
  anterior a la `@` cuando no hay espacio que separar, o la primera letra de cada uno de los dos
  primeros "trozos" separados por espacio del nombre cuando sí lo hay); si se omite la clave
  `fullName` por completo en la petición a la API (en vez de mandar `null`), la API responde
  `422` señalando que el campo `fullName` debe estar definido.

#### Scenario: Email o contraseñas inválidos

- **WHEN** el email no tiene formato válido, ya está registrado, la contraseña o su
  confirmación tienen menos de 8 o más de 32 caracteres, o `passwordConfirmation` no coincide
  con `password`
- **THEN** la API responde `422` con `{ "errors": [{ "message", "rule", "field", "meta"? }] }`
  (un objeto por regla incumplida, sin envoltorio `data`) y la interfaz pinta cada error bajo su
  campo correspondiente con un mensaje en castellano (p. ej. "Ese email ya está registrado.
  Inicia sesión en su lugar." para el email duplicado, "Las contraseñas no coinciden." para el
  desajuste), sin enviar la petición si el desajuste de contraseñas se detecta ya en el propio
  formulario antes de llamar a la API.

### Requirement: Inicio de sesión

El sistema SHALL permitir iniciar sesión con email y contraseña devolviendo un token de acceso
y los datos del usuario, con la misma forma que el registro.

#### Scenario: Credenciales correctas

- **WHEN** una persona no autenticada envía `POST /api/v1/auth/login` (o el formulario de
  login) con el email y la contraseña de una cuenta existente
- **THEN** la API responde `200` con `{ "data": { "user": {...}, "token": "oat_..." } }` y la
  interfaz guarda la sesión y navega a la pantalla de perfil.

#### Scenario: Credenciales incorrectas

- **WHEN** el email no corresponde a ninguna cuenta, o la contraseña no es la de esa cuenta
- **THEN** la API responde `400` con `{ "errors": [{ "message": "Invalid user credentials" }] }`
  (sin `field`, sin distinguir si falló el email o la contraseña) y la interfaz muestra un
  único aviso general "El email o la contraseña no son correctos.", sin señalar ningún campo en
  concreto.

#### Scenario: Formulario de login incompleto o mal formado

- **WHEN** falta la contraseña o el email no tiene formato válido
- **THEN** la API responde `422` con un error por campo y la interfaz los muestra bajo el campo
  correspondiente, igual que en el registro.

### Requirement: Sesión persistente entre recargas

El sistema SHALL recordar la sesión entre recargas de página guardando el token en el
almacenamiento local del navegador y validándolo contra el backend al arrancar, sin expulsar a
la persona mientras esa validación está en curso.

#### Scenario: Token guardado sigue siendo válido

- **WHEN** la página se recarga (o se abre de nuevo) con un token guardado de una sesión
  previa que el backend todavía reconoce
- **THEN** mientras se comprueba el token con `GET /api/v1/account/profile` se muestra un
  indicador de carga a pantalla completa en vez de redirigir a ningún sitio, y al confirmarse
  válido la persona queda autenticada con sus datos de perfil cargados.

#### Scenario: Token guardado ha caducado o es inválido

- **WHEN** el backend responde `401` (`{ "errors": [{ "message": "Unauthorized access" }] }`)
  a la comprobación del token guardado
- **THEN** la interfaz borra el token del almacenamiento local, pasa a estado no autenticado,
  redirige a login y muestra allí el aviso "Tu sesión ha caducado. Vuelve a iniciar sesión."

#### Scenario: El backend no responde o falla al comprobar el token

- **WHEN** la comprobación del token guardado falla por un error de red o un error de servidor
  (no un `401`)
- **THEN** la interfaz trata a la persona como no autenticada y la manda a login con el aviso
  correspondiente ("No se pudo conectar con el servidor..." o "Algo ha ido mal en el
  servidor..."), pero **conserva el token en el almacenamiento local** (no lo borra), de modo
  que una recarga posterior, si el backend ya responde, puede recuperar la sesión sin tener que
  volver a iniciar sesión a mano.

### Requirement: Cierre de sesión

El sistema SHALL permitir cerrar la sesión activa, revocando el token en el backend y
limpiándola en el cliente de forma inmediata, aunque la llamada al backend falle.

#### Scenario: Cierre de sesión normal

- **WHEN** una persona autenticada pulsa "Cerrar sesión" en la pantalla de perfil
- **THEN** la interfaz borra el token del almacenamiento local y pasa a estado no autenticado al
  instante (sin esperar respuesta del servidor), y en paralelo envía
  `POST /api/v1/account/logout` con el token todavía válido; el backend responde `200` con
  `{ "message": "Logged out successfully" }` (a diferencia de todos los demás endpoints, esta
  respuesta **no** va envuelta en `data`) y revoca el token, de modo que una petición posterior
  con ese mismo token a `GET /api/v1/account/profile` recibe `401`.

#### Scenario: Cierre de sesión sin conexión con el backend

- **WHEN** la llamada a `POST /api/v1/account/logout` falla (red caída, servidor caído, token ya
  inválido)
- **THEN** la interfaz ignora el error: la sesión local ya se cerró igualmente y la persona
  queda redirigida a login.

### Requirement: Acceso protegido según estado de sesión

El sistema SHALL mostrar únicamente login/registro a quien no tiene sesión y únicamente el
perfil a quien sí la tiene, sin dejar ver la pantalla equivocada en ningún momento intermedio.

#### Scenario: Persona sin sesión intenta ver el perfil

- **WHEN** alguien sin sesión activa navega a `/profile`
- **THEN** es redirigida a `/login` sin llegar a ver ningún dato de perfil.

#### Scenario: Persona con sesión intenta ver login o registro

- **WHEN** alguien con sesión activa navega a `/login` o `/register`
- **THEN** es redirigida a `/profile` sin llegar a ver el formulario.

#### Scenario: Ruta desconocida

- **WHEN** se navega a cualquier ruta que no sea `/login`, `/register` o `/profile` (incluida
  la raíz `/`)
- **THEN** la interfaz redirige a `/profile`, lo que a su vez — si no hay sesión — produce una
  segunda redirección inmediata a `/login`; no existe una pantalla de "página no encontrada".

#### Scenario: Estado de sesión todavía sin resolver

- **WHEN** el estado de sesión está "cargando" (token guardado pendiente de validar contra el
  backend)
- **THEN** tanto las rutas protegidas como las exclusivas para anónimos muestran el mismo
  indicador de carga a pantalla completa en vez de decidir una redirección, para no expulsar
  por error a alguien que en realidad sigue autenticado.

### Requirement: Perfil de la cuenta autenticada

El sistema SHALL exponer y mostrar los datos de la cuenta autenticada, y SHALL exigir un token
de acceso válido para entregarlos.

#### Scenario: Consulta del perfil con token válido

- **WHEN** se envía `GET /api/v1/account/profile` con la cabecera `Authorization: Bearer <token>` de una
  sesión activa
- **THEN** la API responde `200` con `{ "data": { "id", "fullName", "email", "createdAt",
  "updatedAt", "initials" } }` (nunca la contraseña) y la pantalla de perfil muestra el avatar
  con las iniciales, el nombre (o "Sin nombre" si es `null`), el email y la fecha de alta
  formateada en castellano (p. ej. "1 de noviembre de 2026").

#### Scenario: Consulta del perfil sin token o con token inválido/revocado

- **WHEN** se envía `GET /api/v1/account/profile` sin cabecera `Authorization`, con una
  cabecera que no es un bearer token válido, o con un token ya revocado por un logout previo
- **THEN** la API responde siempre `401` con `{ "errors": [{ "message": "Unauthorized
  access" }] }`, sin distinguir entre "no venía token" y "el token no es válido".

## Parte B

### 1. Requisitos escritos y verificados

- **Requisitos escritos: 6
- **Requisitos verificados: 0.

### 2. Incoherencias encontradas

- Los errores `400` (credenciales inválidas) y `401` (sin token / token inválido) llegan con la
  misma forma que los `422` de validación.
- El código de éxito de signup y login es `200`, no `201`, pese a que ambos crean un recurso
- Cuando `fullName` tiene tres o más palabras, las iniciales solo usan la primera y la segunda.

### 3. Lo que no se pudo decidir solo con el comportamiento externo

No quedó claro si el `401` sin distinguir "no mandaste token" de "tu token ya no vale" es el
contrato deseado o un descuido.
