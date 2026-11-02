# Cuentas y acceso

## Purpose

Permite que una persona cree una cuenta en FlowSync, inicie y cierre sesión con un token de acceso y consulte su perfil, tanto a través de la API como desde la aplicación web.

## Requirements

### Requirement: Formato común de las respuestas de la API

La API SHALL responder siempre en JSON, aunque el cliente no lo pida, y SHALL envolver las respuestas correctas de registro, inicio de sesión y perfil en un objeto con la clave `data`. Los errores de validación, de credenciales y de autenticación SHALL devolverse en un objeto con la clave `errors`, que contiene una lista de objetos con al menos un `message`.

#### Scenario: Respuesta correcta envuelta

- **WHEN** un cliente pide su perfil con un token válido
- **THEN** el cuerpo de la respuesta es `{ "data": { ... } }`

#### Scenario: JSON aunque el cliente no lo pida

- **WHEN** un cliente envía una petición sin la cabecera `Accept: application/json` y la petición falla por autenticación
- **THEN** el error llega igualmente como JSON con la clave `errors`

### Requirement: Datos públicos del usuario

Cuando la API devuelve un usuario, SHALL exponer exactamente `id`, `fullName` (texto o `null`), `email`, `createdAt`, `updatedAt` (fechas en formato ISO 8601) e `initials`, y SHALL NOT exponer nunca la contraseña.

#### Scenario: La contraseña no se expone

- **WHEN** un usuario se registra, inicia sesión o pide su perfil
- **THEN** el objeto de usuario de la respuesta no tiene ningún campo con la contraseña ni con su hash

### Requirement: Cálculo de las iniciales

La API SHALL calcular `initials` así: si el usuario tiene nombre, lo parte por cada espacio; si no lo tiene, parte el email por la `@`. Si los dos primeros trozos tienen contenido, SHALL devolver la primera letra de cada uno, en mayúsculas; si no, SHALL devolver en mayúsculas los dos primeros caracteres del primer trozo.

#### Scenario: Nombre y apellido

- **WHEN** el nombre del usuario es `Ada Lovelace`
- **THEN** `initials` vale `AL`

#### Scenario: Una sola palabra

- **WHEN** el nombre del usuario es `Ada`
- **THEN** `initials` vale `AD`

#### Scenario: Sin nombre

- **WHEN** el usuario no tiene nombre y su email es `ada@example.com`
- **THEN** `initials` vale `AE` (la primera letra antes de la `@` y la primera después)

#### Scenario: Doble espacio en el nombre

- **WHEN** el nombre del usuario es `Ada  Lovelace`, con dos espacios
- **THEN** `initials` vale `AD`

### Requirement: Registro de cuenta en la API

La API SHALL aceptar `POST /api/v1/auth/signup` sin autenticación, con un cuerpo JSON que tenga `fullName`, `email`, `password` y `passwordConfirmation`. Si los datos son válidos, SHALL crear el usuario, emitir un token de acceso nuevo y responder con estado 200 y `{ "data": { "user": <usuario>, "token": "<token>" } }`, donde el token es una cadena que empieza por `oat_`.

#### Scenario: Registro correcto

- **WHEN** un cliente envía un nombre, un email que no está registrado, una contraseña de entre 8 y 32 caracteres y la misma contraseña como confirmación
- **THEN** recibe estado 200 con el usuario creado y un token, que sirve de inmediato para las peticiones autenticadas

#### Scenario: Registro sin nombre

- **WHEN** un cliente envía `fullName` con valor `null` o una cadena vacía, y el resto de campos son válidos
- **THEN** la cuenta se crea con `fullName` igual a `null`

### Requirement: Validación del registro

La API SHALL rechazar el registro con estado 422 y un error por cada campo inválido (cada uno con `message`, `rule` y `field`) en estos casos:
- falta la clave `fullName` (`rule: "required"`);
- el email falta, no tiene formato de email o supera 254 caracteres;
- la contraseña falta, tiene menos de 8 caracteres o más de 32;
- la confirmación falta, tiene menos de 8 o más de 32 caracteres, o no coincide con la contraseña (`rule: "sameAs"`);
- el email ya está registrado (`rule: "database.unique"`).

Los mensajes SHALL estar en inglés. La API SHALL NOT recortar los espacios del email ni pasarlo a minúsculas, y SHALL comparar los emails distinguiendo mayúsculas de minúsculas.

#### Scenario: Email duplicado

- **WHEN** un cliente intenta registrarse con un email idéntico al de una cuenta existente
- **THEN** recibe estado 422 con `{ "errors": [{ "message": "The email has already been taken", "rule": "database.unique", "field": "email" }] }`

#### Scenario: El mismo email con otras mayúsculas

- **WHEN** ya existe la cuenta `ada@x.com` y un cliente se registra con `Ada@x.com`
- **THEN** la API crea una segunda cuenta independiente

#### Scenario: Confirmación corta

- **WHEN** un cliente envía una contraseña y una confirmación iguales de 5 caracteres
- **THEN** recibe estado 422 con un error `minLength` en `password` y otro en `passwordConfirmation`

#### Scenario: Contraseñas distintas

- **WHEN** un cliente envía una contraseña y una confirmación válidas pero distintas
- **THEN** recibe estado 422 con un error `sameAs` en `passwordConfirmation`

### Requirement: Inicio de sesión en la API

La API SHALL aceptar `POST /api/v1/auth/login` sin autenticación, con `email` y `password`. Si las credenciales son correctas, SHALL emitir un token nuevo y responder con estado 200 y la misma forma que el registro: `{ "data": { "user", "token" } }`. Cada inicio de sesión SHALL crear un token adicional sin invalidar los anteriores, y los tokens SHALL NOT caducar.

#### Scenario: Credenciales correctas

- **WHEN** un cliente envía el email y la contraseña de una cuenta existente
- **THEN** recibe estado 200 con el usuario y un token nuevo

#### Scenario: Varias sesiones a la vez

- **WHEN** un usuario inicia sesión dos veces y obtiene dos tokens
- **THEN** los dos tokens siguen sirviendo para las peticiones autenticadas

#### Scenario: Credenciales incorrectas

- **WHEN** un cliente envía un email que no existe, o un email existente con la contraseña equivocada
- **THEN** recibe estado 400 con `{ "errors": [{ "message": "Invalid user credentials" }] }`, sin decir cuál de los dos falló

#### Scenario: Email con otras mayúsculas

- **WHEN** existe la cuenta `ada@x.com` y un cliente inicia sesión con `Ada@x.com` y la contraseña correcta
- **THEN** recibe estado 400 por credenciales incorrectas

#### Scenario: Datos mal formados

- **WHEN** un cliente envía un email sin formato válido, o deja vacío el email o la contraseña
- **THEN** recibe estado 422 con errores de validación por campo, no un 400

#### Scenario: Longitud de la contraseña

- **WHEN** un cliente inicia sesión con una contraseña de cualquier longitud que no sea la correcta
- **THEN** recibe estado 400 por credenciales incorrectas, sin error de longitud

### Requirement: Autenticación con token

La API SHALL autenticar las rutas protegidas con la cabecera `Authorization: Bearer <token>`. Si la cabecera falta, si el esquema no es `Bearer` o si el token no existe, está mal formado o se ha revocado, SHALL responder con estado 401 y `{ "errors": [{ "message": "Unauthorized access" }] }`.

#### Scenario: Sin token

- **WHEN** un cliente pide su perfil sin cabecera `Authorization`
- **THEN** recibe estado 401 con el mensaje `Unauthorized access`

#### Scenario: Token revocado

- **WHEN** un cliente usa un token con el que ya cerró sesión
- **THEN** recibe estado 401

### Requirement: Consulta del perfil en la API

La API SHALL aceptar `GET /api/v1/account/profile` con un token válido y responder con estado 200 y los datos públicos del usuario autenticado, directamente bajo `data`, sin clave `user`.

#### Scenario: Perfil del usuario autenticado

- **WHEN** un cliente pide el perfil con un token válido
- **THEN** recibe estado 200 con `{ "data": { "id", "fullName", "email", "createdAt", "updatedAt", "initials" } }`

### Requirement: Cierre de sesión en la API

La API SHALL aceptar `POST /api/v1/account/logout` con un token válido, revocar solo ese token y responder con estado 200 y `{ "message": "Logged out successfully" }`, sin la envoltura `data`. Los demás tokens del mismo usuario SHALL seguir siendo válidos.

#### Scenario: Cierre de sesión correcto

- **WHEN** un cliente con un token válido cierra sesión
- **THEN** recibe estado 200 con `{ "message": "Logged out successfully" }`, y ese token pasa a responder 401

#### Scenario: Otras sesiones abiertas

- **WHEN** un usuario tiene dos tokens y cierra sesión con uno
- **THEN** el otro token sigue autenticando

#### Scenario: Cerrar sesión dos veces

- **WHEN** un cliente repite el cierre de sesión con un token ya revocado
- **THEN** recibe estado 401

### Requirement: Navegación según el estado de la sesión

La aplicación web SHALL ofrecer tres pantallas: `/login`, `/register` y `/profile`. SHALL llevar a `/login` a quien entre en `/profile` sin sesión, SHALL llevar a `/profile` a quien entre en `/login` o `/register` con sesión, y SHALL redirigir cualquier otra dirección, incluida `/`, a `/profile`. Mientras comprueba una sesión guardada, SHALL mostrar un indicador de carga a pantalla completa, con el texto accesible «Cargando…».

#### Scenario: Visitante sin sesión

- **WHEN** una persona sin sesión abre `/` o `/profile`
- **THEN** acaba en la pantalla de inicio de sesión

#### Scenario: Usuario con sesión

- **WHEN** una persona con la sesión iniciada abre `/login` o `/register`
- **THEN** acaba en su perfil

#### Scenario: No se recuerda el destino

- **WHEN** una persona sin sesión intenta abrir una dirección e inicia sesión después
- **THEN** llega siempre a `/profile`, no a la dirección que intentó abrir

### Requirement: Pantalla de registro

La pantalla `/register` SHALL mostrar el título «Crea tu cuenta», la descripción «Regístrate para empezar a organizar el trabajo del equipo.» y estos campos: «Nombre completo (opcional)», con el ejemplo «Ada Lovelace»; «Email», con el ejemplo «tu@email.com»; «Contraseña», con la ayuda «Entre 8 y 32 caracteres.»; y «Repite la contraseña». También SHALL mostrar el botón «Crear cuenta» y el enlace «¿Ya tienes cuenta? Inicia sesión», que lleva a `/login`.

Antes de enviar, SHALL comprobar solo que las dos contraseñas coinciden. El resto de las validaciones las hace el servidor. SHALL quitar los espacios del principio y del final del nombre y enviarlo vacío como «sin nombre», pero SHALL enviar el email y las contraseñas tal cual. Si el registro sale bien, SHALL dejar la sesión iniciada y llevar a la persona a `/profile`.

#### Scenario: Registro correcto

- **WHEN** una persona sin sesión rellena el formulario con datos válidos y pulsa «Crear cuenta»
- **THEN** el botón cambia a «Creando cuenta…» y se desactiva, y al terminar la persona ve su perfil con la sesión iniciada

#### Scenario: Contraseñas que no coinciden

- **WHEN** la persona escribe dos contraseñas distintas y pulsa «Crear cuenta»
- **THEN** ve «Las contraseñas no coinciden.» bajo «Repite la contraseña» y no se envía nada al servidor

#### Scenario: Email ya registrado

- **WHEN** la persona intenta registrarse con un email que ya existe
- **THEN** ve bajo «Email» el mensaje «Ese email ya está registrado. Inicia sesión en su lugar.»

#### Scenario: Contraseña demasiado corta

- **WHEN** la persona envía dos contraseñas iguales de menos de 8 caracteres
- **THEN** ve bajo «Contraseña», en lugar de la ayuda, «la contraseña debe tener al menos 8 caracteres.», en minúscula inicial, y bajo «Repite la contraseña» «la confirmación de la contraseña debe tener al menos 8 caracteres.»

### Requirement: Pantalla de inicio de sesión

La pantalla `/login` SHALL mostrar el título «Inicia sesión», la descripción «Entra con tu cuenta para volver a tus tareas.», los campos «Email» (con el ejemplo «tu@email.com») y «Contraseña», el botón «Entrar» y el enlace «¿Aún no tienes cuenta? Crea una», que lleva a `/register`. SHALL NOT validar nada en el navegador antes de enviar. Si el inicio de sesión sale bien, SHALL guardar la sesión y llevar a la persona a `/profile`.

#### Scenario: Inicio de sesión correcto

- **WHEN** una persona sin sesión introduce credenciales válidas y pulsa «Entrar»
- **THEN** el botón cambia a «Entrando…» y se desactiva, y al terminar la persona ve su perfil

#### Scenario: Credenciales incorrectas

- **WHEN** la persona introduce un email o una contraseña que no son correctos
- **THEN** ve un aviso destacado con «El email o la contraseña no son correctos.»

#### Scenario: Campos vacíos o email inválido

- **WHEN** la persona deja vacío un campo, o escribe un email sin formato válido, y pulsa «Entrar»
- **THEN** ve bajo el campo afectado «Falta rellenar el email.», «Falta rellenar la contraseña.» o «Introduce una dirección de email válida.»

### Requirement: Mensajes de error comunes del cliente

La aplicación web SHALL mostrar en castellano los errores del servidor que no corresponden a un campo concreto:
- sin conexión con el servidor: «No se pudo conectar con el servidor. Comprueba que el backend está arrancado.»;
- un 401: «Tu sesión ha caducado. Vuelve a iniciar sesión.»;
- cualquier 400: «El email o la contraseña no son correctos.»;
- cualquier otro error del servidor: «Algo ha ido mal en el servidor. Inténtalo de nuevo en un momento.»

#### Scenario: Servidor caído al enviar un formulario

- **WHEN** la persona envía el formulario de inicio de sesión o de registro con el servidor apagado
- **THEN** ve un aviso destacado con «No se pudo conectar con el servidor. Comprueba que el backend está arrancado.»

### Requirement: Persistencia y restauración de la sesión

La aplicación web SHALL guardar solo el token en el almacenamiento local del navegador. Al cargar la página con un token guardado, SHALL pedir el perfil al servidor y mostrar el indicador de carga mientras espera. Si el servidor responde 401, SHALL borrar el token. Si falla por cualquier otro motivo, SHALL tratar a la persona como sin sesión pero SHALL conservar el token guardado. En los dos casos, SHALL mostrar el motivo en un aviso destacado en `/login`, y no en `/register`.

#### Scenario: Recarga con sesión válida

- **WHEN** una persona con la sesión iniciada recarga la página
- **THEN** ve un momento el indicador de carga y después su perfil, sin volver a iniciar sesión

#### Scenario: Token rechazado al recargar

- **WHEN** una persona recarga la página con un token guardado que el servidor rechaza con 401
- **THEN** llega a `/login` con el aviso «Tu sesión ha caducado. Vuelve a iniciar sesión.» y el token deja de estar guardado

#### Scenario: Servidor caído al recargar

- **WHEN** una persona recarga la página con un token guardado y el servidor no responde
- **THEN** llega a `/login` con el aviso «No se pudo conectar con el servidor. Comprueba que el backend está arrancado.», y una recarga posterior con el servidor arrancado restaura la sesión

#### Scenario: Revocación durante la visita

- **WHEN** el token de una persona se revoca en el servidor mientras ella está viendo su perfil
- **THEN** la aplicación sigue mostrando el perfil hasta la siguiente recarga

### Requirement: Pantalla de perfil

La pantalla `/profile` SHALL mostrar las iniciales del usuario en un avatar circular, su nombre completo (o «Sin nombre» si no tiene), su email y la fila «Miembro desde» con la fecha de alta en formato largo en español (por ejemplo, «2 de noviembre de 2026»). SHALL NOT permitir editar el perfil.

#### Scenario: Usuario con nombre

- **WHEN** una persona con la sesión iniciada y nombre «Ada Lovelace» abre su perfil
- **THEN** ve el avatar «AL», el nombre «Ada Lovelace», su email y la fecha de alta

#### Scenario: Usuario sin nombre

- **WHEN** una persona sin nombre abre su perfil
- **THEN** ve «Sin nombre» como título, y en el avatar las iniciales calculadas a partir de su email

### Requirement: Cierre de sesión desde la aplicación web

La pantalla de perfil SHALL ofrecer el botón «Cerrar sesión». Al pulsarlo, la aplicación SHALL borrar la sesión local y llevar a la persona a `/login` sin esperar al servidor. Después SHALL pedir al servidor que revoque el token e ignorar cualquier error de esa petición.

#### Scenario: Cierre de sesión

- **WHEN** una persona con la sesión iniciada pulsa «Cerrar sesión»
- **THEN** el botón cambia a «Cerrando sesión…» y se desactiva, y la persona llega a `/login` sin ningún aviso

#### Scenario: Cierre de sesión sin conexión

- **WHEN** una persona pulsa «Cerrar sesión» con el servidor caído
- **THEN** sale de la sesión en el navegador sin ver ningún error, aunque el token sigue siendo válido en el servidor

## Revisión

### 1. Requisitos generados y comprobados

- Requisitos escritos por el agente: 16
- Requisitos comprobados consultando el código: 12

### 2. Incoherencias detectadas

- Las respuestas correctas van dentro de `data`, salvo la del cierre de sesión, que devuelve `{ "message": ... }` sin envoltura (API, cierre de sesión).
- El usuario llega dentro de `data.user` al registrarse o iniciar sesión, y directamente dentro de `data` al pedir el perfil (API, registro e inicio de sesión frente a perfil).
- La web dice «Tu sesión ha caducado», pero los tokens no caducan nunca: un 401 solo aparece si el token se ha revocado o no existe (web, mensajes de error; API, tokens).
- La web traduce cualquier 400 como «El email o la contraseña no son correctos.», no solo el error de credenciales (web, mensajes de error comunes).
- El registro exige contraseñas de entre 8 y 32 caracteres; el inicio de sesión acepta cualquier longitud y responde 400 (API, registro frente a inicio de sesión).
- Un email mal formado en el inicio de sesión devuelve 422, y unas credenciales incorrectas devuelven 400: son dos códigos distintos para «no puedes entrar» (API, inicio de sesión).
- La pantalla de registro muestra «Entre 8 y 32 caracteres.» y marca los campos como obligatorios, pero el navegador no valida nada: solo comprueba que las contraseñas coincidan (web, registro).
- Los mensajes de longitud empiezan en minúscula («la contraseña debe tener…») y el resto de mensajes empiezan en mayúscula (web, mensajes de validación).
- Con nombre, las iniciales salen del nombre y del apellido; sin nombre, de la parte local del email y de su dominio (`ada@example.com` → «AE») (API, iniciales).
- La web recorta los espacios del nombre y la API no: si otro cliente envía un nombre con solo espacios, se guarda tal cual y las iniciales salen vacías (registro, web frente a API).
- La API no recorta los espacios del email ni lo pasa a minúsculas: un email con un espacio delante o detrás se rechaza como inválido, y uno con otras mayúsculas cuenta como una cuenta distinta (API, registro e inicio de sesión).
- El aviso de sesión perdida se ve en la pantalla de inicio de sesión, pero no en la de registro (web, restauración de la sesión).
- El botón de cierre de sesión tiene el texto «Cerrando sesión…», pero la redirección a `/login` es inmediata y ese texto nunca llega a verse (web, perfil).
- Dos registros simultáneos con el mismo email pasan la validación, y el segundo responde 500 en vez de 422 (API, registro).

### 3. Comportamientos que no supe clasificar como bug o contrato

- **El email distingue mayúsculas.** `Ada@x.com` y `ada@x.com` son dos cuentas distintas, y con otra combinación de mayúsculas no se puede iniciar sesión.
  - Si es un bug, se olvidó normalizar el email, y los usuarios acaban con cuentas duplicadas o con inicios de sesión fallidos.
  - Si es contrato, la comparación exacta es una decisión deliberada.
  - Por qué no se sabe: el código no normaliza ni activa la comparación sin mayúsculas, pero no hay ningún comentario ni test que diga si fue a propósito.
- **Los tokens no caducan y cada inicio de sesión crea uno más, sin revocar los anteriores.**
  - Si es contrato, se buscan sesiones indefinidas y en varios dispositivos.
  - Si es un bug, se olvidó configurar la caducidad: el mensaje «Tu sesión ha caducado» de la web da a entender que se esperaba que caducara.
  - Por qué no se sabe: el valor viene del comportamiento por defecto de la librería, sin configuración explícita ni test en ningún sentido.
- **El cierre de sesión responde sin la envoltura `data`.**
  - Si es contrato, no se devuelve ningún recurso, solo una confirmación, y no tendría sentido envolverla.
  - Si es un bug, rompe la convención de que toda respuesta va dentro de `data`.
  - Por qué no se sabe: la web ignora el cuerpo de esta respuesta, así que nada falla. No hay ningún consumidor ni test que fije cuál es la forma correcta.
