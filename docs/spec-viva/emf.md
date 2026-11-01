# Spec viva: cuentas y acceso

## Purpose

Permitir que una persona cree una cuenta, inicie y cierre sesión, mantenga la sesión entre recargas y consulte su perfil, de forma que solo quien tiene una sesión válida accede a las pantallas privadas de FlowSync.

## Requirements

### Requirement: Registro de cuenta por API

El sistema SHALL crear una cuenta nueva a partir de nombre (opcional), email, contraseña y confirmación de contraseña válidos, y SHALL devolver en la misma respuesta los datos públicos del usuario y un token de acceso, envueltos en un objeto `data`.

#### Scenario: Registro correcto

- **WHEN** se envía `POST /api/v1/auth/signup` con `fullName` (texto o `null`), un `email` con formato válido que no está registrado, un `password` de entre 8 y 32 caracteres y un `passwordConfirmation` idéntico
- **THEN** la respuesta es correcta, con cuerpo `{ "data": { "user": { ... }, "token": "<token>" } }`, y ese token sirve desde ese momento para acceder a las peticiones protegidas

> ⚠️ Pendiente de confirmar ejecutando: el código de estado exacto de la respuesta correcta (200 o 201).

#### Scenario: Nombre sin indicar

- **WHEN** se registra una cuenta con `fullName` igual a `null`
- **THEN** la cuenta se crea y el usuario devuelto tiene `fullName` igual a `null`

> ⚠️ Pendiente de confirmar ejecutando: qué ocurre si la clave `fullName` no se envía (no es lo mismo que enviarla con `null`).

### Requirement: Validación de los datos de registro

El sistema SHALL rechazar un registro con datos no válidos sin crear la cuenta, y SHALL responder con 422 y una lista `errors` en la que cada elemento indica `message`, `rule`, `field` y, si procede, `meta`.

#### Scenario: Email ya registrado

- **WHEN** se intenta registrar una cuenta con un email que ya pertenece a otra cuenta
- **THEN** la respuesta es 422, con un error sobre `email` y regla `database.unique`, y no se crea ninguna cuenta

> ⚠️ Pendiente de confirmar ejecutando: si el mismo email escrito con otras mayúsculas o con espacios alrededor cuenta como repetido.

#### Scenario: Email con formato no válido

- **WHEN** se intenta registrar una cuenta con un email sin formato de email o de más de 254 caracteres
- **THEN** la respuesta es 422, con un error sobre `email`

#### Scenario: Contraseña fuera de longitud

- **WHEN** se intenta registrar una cuenta con una contraseña de menos de 8 o de más de 32 caracteres
- **THEN** la respuesta es 422, con un error sobre `password` de regla `minLength` o `maxLength`, según corresponda

#### Scenario: Confirmación distinta

- **WHEN** se envía por API un registro en el que `passwordConfirmation` no coincide con `password`
- **THEN** la respuesta es 422, con un error sobre `passwordConfirmation` de regla `sameAs`

### Requirement: Inicio de sesión por API

El sistema SHALL entregar un token de acceso nuevo, junto con los datos públicos del usuario, cuando el email y la contraseña corresponden a una cuenta existente.

#### Scenario: Credenciales correctas

- **WHEN** se envía `POST /api/v1/auth/login` con el email y la contraseña de una cuenta existente
- **THEN** la respuesta es `{ "data": { "user": { ... }, "token": "<token>" } }` y el token permite acceder a las peticiones protegidas

#### Scenario: Varios inicios de sesión de la misma cuenta

- **WHEN** la misma cuenta inicia sesión dos veces
- **THEN** cada inicio de sesión devuelve un token distinto y los dos siguen siendo válidos a la vez

### Requirement: Rechazo de credenciales incorrectas

El sistema SHALL rechazar el inicio de sesión sin entregar ningún token cuando el email no corresponde a ninguna cuenta o la contraseña no es la de esa cuenta.

#### Scenario: Contraseña incorrecta o email desconocido

- **WHEN** se envía `POST /api/v1/auth/login` con un email inexistente, o con un email existente y una contraseña que no es la suya
- **THEN** la respuesta es un error, sin token, y no indica cuál de los dos datos falló

> ⚠️ Pendiente de confirmar ejecutando: el código de estado (la interfaz da por hecho que es 400) y la forma del cuerpo de error.

#### Scenario: Datos de inicio de sesión mal formados

- **WHEN** se envía un inicio de sesión sin email, con un email sin formato válido o sin contraseña
- **THEN** la respuesta es 422, con un error por cada campo afectado

### Requirement: Datos públicos del usuario

El sistema SHALL representar al usuario en sus respuestas con `id`, `fullName`, `email`, `createdAt`, `updatedAt` e `initials`, y SHALL NOT incluir la contraseña.

#### Scenario: Forma del usuario

- **WHEN** una respuesta de registro, de inicio de sesión o de perfil incluye al usuario
- **THEN** el usuario contiene exactamente `id`, `fullName`, `email`, `createdAt`, `updatedAt` e `initials`, y en ningún caso la contraseña

### Requirement: Cálculo de las iniciales

El sistema SHALL calcular las iniciales en mayúsculas: a partir del nombre si existe, y a partir del email si no.

#### Scenario: Nombre de dos o más palabras

- **WHEN** el usuario tiene como nombre «Ada Lovelace»
- **THEN** `initials` vale `AL`

#### Scenario: Nombre de una sola palabra

- **WHEN** el usuario tiene como nombre «Ada»
- **THEN** `initials` vale `AD`

#### Scenario: Sin nombre

- **WHEN** el usuario no tiene nombre y su email es `ana@acme.com`
- **THEN** `initials` vale `AA` (primera letra de lo que va antes de la arroba y primera letra de lo que va después)

> ⚠️ Pendiente de confirmar ejecutando: el resultado con nombres de espacios dobles, espacios iniciales o nombre vacío (`""`).

### Requirement: Perfil del usuario autenticado

El sistema SHALL devolver los datos del usuario dueño del token en `GET /api/v1/account/profile` y SHALL rechazar con 401 las peticiones sin token válido.

#### Scenario: Con token válido

- **WHEN** se envía `GET /api/v1/account/profile` con la cabecera `Authorization: Bearer <token>` y un token vigente
- **THEN** la respuesta es `{ "data": { ...usuario } }` con los datos del dueño del token

#### Scenario: Sin token o con token inválido

- **WHEN** se envía `GET /api/v1/account/profile` sin cabecera de autorización, o con un token inexistente o ya invalidado
- **THEN** la respuesta es 401 y no se devuelve ningún dato de usuario

### Requirement: Cierre de sesión por API

El sistema SHALL invalidar el token con el que se hace la petición de cierre de sesión, y solo ese.

#### Scenario: Cerrar sesión con un token válido

- **WHEN** se envía `POST /api/v1/account/logout` con un token vigente
- **THEN** la respuesta es `{ "message": "Logged out successfully" }` (sin envoltorio `data`) y cualquier petición posterior con ese token recibe 401

#### Scenario: Otros tokens de la misma cuenta

- **WHEN** una cuenta tiene dos tokens vigentes y cierra sesión con uno de ellos
- **THEN** el otro token sigue siendo válido

#### Scenario: Cerrar sesión sin token

- **WHEN** se envía `POST /api/v1/account/logout` sin token válido
- **THEN** la respuesta es 401

### Requirement: Vigencia de los tokens

El sistema SHALL mantener vigente un token mientras no se cierre sesión con él.

#### Scenario: Paso del tiempo

- **WHEN** ha pasado tiempo desde que se emitió un token y no se ha cerrado sesión con él
- **THEN** el token sigue siendo aceptado

> ⚠️ Pendiente de confirmar: se deduce de que los tokens se emiten sin fecha de caducidad. No se ha comprobado esperando.

### Requirement: Pantalla de registro

La interfaz SHALL ofrecer en `/register` un formulario con nombre completo (marcado como opcional), email, contraseña y «Repite la contraseña», y SHALL dejar a la persona con la sesión iniciada en su perfil cuando el registro sale bien.

#### Scenario: Registro correcto desde la pantalla

- **WHEN** una persona sin sesión rellena el formulario con datos válidos y pulsa «Crear cuenta»
- **THEN** el botón muestra «Creando cuenta…» y queda deshabilitado mientras se envía, y después la persona ve su perfil con la sesión iniciada, sin ningún paso adicional

#### Scenario: Contraseñas distintas

- **WHEN** la persona escribe dos contraseñas distintas y pulsa «Crear cuenta»
- **THEN** ve «Las contraseñas no coinciden.» bajo el campo «Repite la contraseña», y la petición no llega al servidor

#### Scenario: Nombre en blanco

- **WHEN** la persona deja el nombre vacío o con solo espacios y completa el registro
- **THEN** la cuenta se crea sin nombre y su perfil muestra «Sin nombre»

#### Scenario: Indicación de longitud

- **WHEN** la persona ve el formulario sin errores en la contraseña
- **THEN** bajo el campo de contraseña aparece «Entre 8 y 32 caracteres.»

#### Scenario: Enlace a inicio de sesión

- **WHEN** la persona pulsa «Inicia sesión» bajo el formulario
- **THEN** pasa a la pantalla de inicio de sesión

### Requirement: Pantalla de inicio de sesión

La interfaz SHALL ofrecer en `/login` un formulario de email y contraseña, y SHALL llevar a la persona a su perfil cuando las credenciales son correctas.

#### Scenario: Inicio de sesión correcto

- **WHEN** una persona sin sesión introduce credenciales correctas y pulsa «Entrar»
- **THEN** el botón muestra «Entrando…» y queda deshabilitado mientras se envía, y después la persona ve su perfil

#### Scenario: Credenciales incorrectas

- **WHEN** la persona introduce un email o una contraseña incorrectos y pulsa «Entrar»
- **THEN** ve un aviso con «El email o la contraseña no son correctos.» y sigue en la pantalla de inicio de sesión

> ⚠️ Pendiente de confirmar ejecutando: depende de que el servidor responda 400. Si respondiera 401, el aviso sería «Tu sesión ha caducado. Vuelve a iniciar sesión.».

#### Scenario: Enlace a registro

- **WHEN** la persona pulsa «Crea una» bajo el formulario
- **THEN** pasa a la pantalla de registro

### Requirement: Mensajes de error de los formularios de acceso

La interfaz SHALL mostrar los errores de validación del servidor en castellano: bajo el campo afectado si ese campo está en pantalla, y en un aviso general en caso contrario.

#### Scenario: Error de un campo visible

- **WHEN** el servidor rechaza el formulario con un error de validación sobre un campo que la pantalla muestra
- **THEN** el mensaje traducido aparece bajo ese campo (por ejemplo, «Ese email ya está registrado. Inicia sesión en su lugar.», «Introduce una dirección de email válida.» o «Falta rellenar el email.») y no aparece aviso general

#### Scenario: Varios errores en un mismo campo

- **WHEN** el servidor devuelve más de un error para el mismo campo
- **THEN** bajo el campo solo se muestra el primero

#### Scenario: Servidor inaccesible

- **WHEN** la persona envía un formulario de acceso y el servidor no responde
- **THEN** ve el aviso «No se pudo conectar con el servidor. Comprueba que el backend está arrancado.»

#### Scenario: Error inesperado del servidor

- **WHEN** el servidor responde con un error que no es de validación, de credenciales ni de autorización
- **THEN** la persona ve el aviso «Algo ha ido mal en el servidor. Inténtalo de nuevo en un momento.»

### Requirement: Persistencia de la sesión en el navegador

La interfaz SHALL conservar la sesión entre recargas y cierres de pestaña, y SHALL volver a comprobarla con el servidor cada vez que se carga la aplicación.

#### Scenario: Recarga con sesión válida

- **WHEN** una persona con sesión iniciada recarga la página o vuelve a abrir la aplicación en el mismo navegador
- **THEN** ve un indicador de carga mientras se comprueba la sesión y después su perfil, sin volver a introducir credenciales

#### Scenario: Sesión rechazada por el servidor

- **WHEN** se carga la aplicación con una sesión guardada que el servidor ya no reconoce
- **THEN** la sesión guardada se descarta y la persona ve la pantalla de inicio de sesión con el aviso «Tu sesión ha caducado. Vuelve a iniciar sesión.»

#### Scenario: Servidor caído al cargar

- **WHEN** se carga la aplicación con una sesión guardada y el servidor no responde
- **THEN** la persona ve la pantalla de inicio de sesión con el aviso «No se pudo conectar con el servidor. Comprueba que el backend está arrancado.», y la sesión guardada se conserva, de modo que al recargar con el servidor ya disponible vuelve a entrar sin introducir credenciales

### Requirement: Protección de las pantallas

La interfaz SHALL mostrar el perfil solo con sesión iniciada, y las pantallas de inicio de sesión y registro solo sin sesión.

#### Scenario: Perfil sin sesión

- **WHEN** una persona sin sesión abre `/profile`
- **THEN** acaba en la pantalla de inicio de sesión

#### Scenario: Acceso con sesión iniciada

- **WHEN** una persona con sesión iniciada abre `/login` o `/register`
- **THEN** acaba en su perfil

#### Scenario: Cualquier otra dirección

- **WHEN** una persona abre `/` o cualquier dirección que no es `/login`, `/register` ni `/profile`
- **THEN** se la lleva al perfil si tiene sesión, o a la pantalla de inicio de sesión si no la tiene

#### Scenario: Sesión comprobándose

- **WHEN** la aplicación todavía está comprobando la sesión guardada
- **THEN** cualquiera de esas pantallas muestra solo un indicador de carga, sin redirigir todavía

### Requirement: Pantalla de perfil

La interfaz SHALL mostrar en el perfil las iniciales, el nombre, el email y la fecha de alta del usuario con sesión.

#### Scenario: Perfil con nombre

- **WHEN** una persona con sesión y con nombre abre su perfil
- **THEN** ve un círculo con sus iniciales, su nombre, su email y «Miembro desde» seguido de la fecha de alta en formato largo en español (por ejemplo, «1 de noviembre de 2026»)

#### Scenario: Perfil sin nombre

- **WHEN** la persona no tiene nombre
- **THEN** en lugar del nombre ve «Sin nombre»

### Requirement: Cierre de sesión desde la interfaz

La interfaz SHALL cerrar la sesión en el navegador cuando la persona pulsa «Cerrar sesión», aunque el servidor no confirme el cierre.

#### Scenario: Cerrar sesión

- **WHEN** una persona con sesión pulsa «Cerrar sesión» en su perfil
- **THEN** el botón muestra «Cerrando sesión…», la persona acaba en la pantalla de inicio de sesión sin ningún aviso, y al recargar sigue sin sesión

#### Scenario: Servidor caído al cerrar sesión

- **WHEN** la persona cierra sesión y el servidor no responde
- **THEN** la sesión se cierra igualmente en el navegador, sin mostrar ningún error

> ⚠️ Pendiente de confirmar ejecutando: si pulsar «atrás» en el navegador tras cerrar sesión vuelve a mostrar el perfil.

---

## Parte B: las tres listas

### 1. Requisitos escritos y comprobados

- Requisitos generados por el agente: **16**
- Requisitos completamente comprobados por mí abriendo el código: **0**

Estado de la revisión al cerrar el tiempo:

- Requisito 1 (Registro de cuenta por API): **parcialmente comprobado**. Quedan pendientes qué ocurre al omitir `fullName` y el estado HTTP exacto.
- Requisito 2 (Validación de los datos de registro): **parcialmente comprobado**. Quedan pendientes el estado HTTP exacto, la estructura de `errors` y los nombres de regla devueltos, y el tratamiento de mayúsculas y espacios en el email.
- Requisito 3 (Inicio de sesión por API): **revisión iniciada, sin completar**.
- Requisitos 4 a 16: **no revisados personalmente**.

### 2. Incoherencias detectadas al escribirla

**Identificada por mí durante la revisión (pendiente):**

- Ambigüedad entre «nombre opcional» y admitir `fullName: null`: el registro acepta `null`, pero sigue pendiente comprobar qué ocurre si se omite la clave. Dónde: `POST /api/v1/auth/signup` (validador de registro).

**Candidatos propuestos por el agente, pendientes de mi revisión (no confirmados):**

- El cierre de sesión responde `{ "message": "Logged out successfully" }` sin el envoltorio `data` y en inglés; el resto de respuestas correctas van envueltas en `data`, y la interfaz está en castellano. Dónde: `POST /api/v1/account/logout` (`backend/app/controllers/access_tokens_controller.ts`).
- Los mensajes de longitud empiezan en minúscula («la contraseña debe tener al menos 8 caracteres.»), y el resto de mensajes de error empieza en mayúscula. Dónde: pantalla de registro (`frontend/src/lib/api.ts`, `translate`, casos `minLength` y `maxLength`).
- La contraseña se valida con 8 a 32 caracteres en el registro, pero el inicio de sesión no aplica ningún límite. Dónde: `POST /auth/signup` frente a `POST /auth/login` (`backend/app/validators/user.ts`).
- Con nombre `null`, el perfil muestra «Sin nombre»; con nombre `""` (aceptado si se envía directamente a la API), mostraría un título vacío y las iniciales saldrían del email. Dónde: pantalla de perfil (`frontend/src/pages/profile-page.tsx`, `backend/app/models/user.ts`).
- Sin nombre, las «iniciales» se sacan del email combinando usuario y dominio (`ana@acme.com` → `AA`), así que no son iniciales de la persona. Dónde: campo `initials` (`backend/app/models/user.ts`).
- La interfaz dice «Tu sesión ha caducado» ante cualquier 401, pero los tokens se emiten sin caducidad: la única forma de perderlos es cerrar sesión. Dónde: arranque y pantalla de inicio de sesión (`frontend/src/lib/api.ts`, `toApiError`).
- La interfaz trata cualquier 400 como «El email o la contraseña no son correctos.», aunque la causa sea otra (por ejemplo, un cuerpo mal formado). Dónde: `frontend/src/lib/api.ts`, `toApiError`.
- El aviso de sesión perdida solo se muestra en la pantalla de inicio de sesión; en la de registro no se ve. Dónde: `/register` frente a `/login` (`frontend/src/pages/register-page.tsx`).
- Si el servidor está caído al cargar, la interfaz trata a la persona como sin sesión, pero el navegador conserva el token: lo que se ve y lo que está guardado no coinciden. Dónde: arranque de la aplicación (`frontend/src/auth/auth-provider.tsx`).
- La interfaz recorta los espacios del nombre antes de enviarlo, pero no los del email. Dónde: pantalla de registro (`frontend/src/pages/register-page.tsx`).
- El PRD (RF-1) pide registrarse «con nombre, email y contraseña», pero el nombre es opcional en la API y en la pantalla. Dónde: `docs/prd/flowsync-mvp.md` frente a `/register`.
- El PRD (RF-1) dice que tras registrarse la persona «ve el espacio»; hoy acaba en su perfil porque no existe ningún espacio. Dónde: `docs/prd/flowsync-mvp.md` (ya señalado en su PA-11).

### 3. ¿Bug o contrato?

**Duda propia, apoyada en el controlador de inicio de sesión que he leído:**

- **Varios tokens por cuenta.** Al iniciar sesión se crea un token nuevo y en ese método no aparece una revocación explícita de los tokens anteriores. Lectura A: es una decisión para permitir varias sesiones simultáneas. Lectura B: es un control de revocación que se ha omitido. No he terminado de revisar el proveedor de tokens, así que no puedo determinar la intención ni he demostrado que dos tokens sean válidos a la vez.

**Candidatos propuestos por el agente, pendientes de mi revisión:**

- **Tokens sin caducidad y acumulados.** Lectura A: es intencionado, la sesión dura hasta que se cierra (RF-3 pide que sobreviva a cerrar la pestaña). Lectura B: es un descuido; cada inicio de sesión deja un token vivo para siempre y robar uno da acceso indefinido. *Pendiente de tu revisión.*
- **Cierre de sesión sin `data` y en inglés.** Lectura A: es un mensaje informativo que la interfaz ignora, y no forma parte del contrato. Lectura B: rompe la convención de que toda respuesta va envuelta en `data`, y quien consuma la API lo tiene que tratar como caso especial. *Pendiente de tu revisión.*
- **El inicio de sesión no exige longitud de contraseña.** Lectura A: es intencionado, no hay que revelar la política ni bloquear cuentas creadas con reglas anteriores. Lectura B: es una incoherencia con el registro, que nadie ha decidido. *Pendiente de tu revisión.*
- **Máximo de 32 caracteres en la contraseña.** Lectura A: es una decisión de producto. Lectura B: es un límite arbitrario que impide usar frases de paso o gestores de contraseñas. *Pendiente de tu revisión.*
- **Email sensible a mayúsculas y espacios (sin confirmar).** Lectura A: se espera que el email se escriba igual siempre. Lectura B: «Ana@acme.com» y «ana@acme.com» deberían ser la misma cuenta, y hoy podrían ser dos. No se puede decidir sin ejecutarlo contra la base de datos. *Pendiente de tu revisión.*
- **Con el servidor caído al cargar, se conserva el token pero se muestra el inicio de sesión.** Lectura A: es intencionado, para no perder la sesión por un corte de red pasajero (así lo dice un comentario del código). Lectura B: la persona ve que «no tiene sesión» y podría iniciarla otra vez, creando un segundo token mientras el primero sigue vivo. *Pendiente de tu revisión.*
- **La clave `fullName` es obligatoria aunque admita `null` (sin confirmar).** Lectura A: es un contrato explícito, el cliente siempre tiene que enviarla. Lectura B: es un efecto secundario de la regla de validación, y omitirla debería equivaler a no tener nombre. *Pendiente de tu revisión.*
- **Iniciales tomadas del dominio del email.** Lectura A: es un valor de reserva aceptable para el avatar. Lectura B: es un error, porque `ana@acme.com` y `alberto@acme.com` muestran ambos «AA». *Pendiente de tu revisión.*
- **Registro abierto a cualquiera.** Lectura A: es el contrato (supuesto 1 del PRD, sin invitaciones). Lectura B: sumado al borrado irreversible de tareas, deja el espacio expuesto a cualquier desconocido (PA-10 del PRD). *Pendiente de tu revisión.*
