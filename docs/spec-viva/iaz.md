## Purpose

Permitir que una persona cree su cuenta en FlowSync, inicie y cierre sesión, mantenga la sesión abierta en el navegador y consulte su perfil, tanto a través de la API como desde las pantallas de la aplicación.

## Requirements

### Requirement: Registro de una cuenta nueva
El sistema SHALL permitir crear una cuenta enviando a `POST /api/v1/auth/signup` un nombre completo (que puede ser nulo), un email, una contraseña y su confirmación. Al crearla, SHALL devolver los datos públicos del usuario y un token de acceso, de forma que la cuenta queda con la sesión iniciada sin un login aparte.

#### Scenario: Registro con datos válidos
- **WHEN** se envía un registro con un email no usado, una contraseña de entre 8 y 32 caracteres y una confirmación idéntica
- **THEN** la API responde con éxito y un cuerpo `{ data: { user, token } }`, donde `user` es la representación pública del nuevo usuario y `token` es un token de acceso utilizable de inmediato

#### Scenario: Registro sin nombre completo
- **WHEN** se envía un registro válido con `fullName` a `null`
- **THEN** la cuenta se crea y el usuario devuelto tiene `fullName` a `null`

### Requirement: Validación del email en el registro
El sistema SHALL rechazar el registro con un error de validación (422) cuando el email falte, no tenga formato de email, supere los 254 caracteres o ya pertenezca a otra cuenta.

#### Scenario: Email ya registrado
- **WHEN** se intenta registrar una cuenta con un email que ya existe
- **THEN** la API responde 422 con un error asociado al campo `email` y no se crea ninguna cuenta

#### Scenario: Email con formato inválido
- **WHEN** se intenta registrar una cuenta con un email sin formato válido
- **THEN** la API responde 422 con un error asociado al campo `email`

### Requirement: Validación de la contraseña en el registro
El sistema SHALL rechazar el registro con un error de validación (422) cuando la contraseña tenga menos de 8 o más de 32 caracteres, o cuando la confirmación no coincida con la contraseña.

#### Scenario: Contraseña demasiado corta
- **WHEN** se intenta registrar una cuenta con una contraseña de 7 caracteres
- **THEN** la API responde 422 con un error asociado al campo `password`

#### Scenario: Confirmación distinta
- **WHEN** se intenta registrar una cuenta con una confirmación que no coincide con la contraseña
- **THEN** la API responde 422 con un error asociado al campo `passwordConfirmation`

### Requirement: Campo de nombre obligatorio en la petición de registro
El sistema SHALL exigir que la petición de registro incluya siempre la clave `fullName`, aunque su valor sea nulo.

#### Scenario: Petición de registro sin la clave del nombre
- **WHEN** se envía un registro válido en todo lo demás pero sin la clave `fullName`
- **THEN** la API responde 422 con un error asociado al campo `fullName`

### Requirement: Formato de los errores de validación
El sistema SHALL responder a toda entrada inválida en registro e inicio de sesión con un estado 422 y un cuerpo `{ errors: [...] }`, donde cada error indica al menos un mensaje, la regla incumplida y el campo afectado.

#### Scenario: Varios campos inválidos a la vez
- **WHEN** se envía un registro con el email mal formado y la contraseña demasiado corta
- **THEN** la API responde 422 con una lista de errores que incluye una entrada para `email` y otra para `password`, cada una con su mensaje y su regla

### Requirement: Inicio de sesión con credenciales válidas
El sistema SHALL permitir iniciar sesión enviando email y contraseña a `POST /api/v1/auth/login` y, si son correctos, SHALL devolver los datos públicos del usuario y un token de acceso nuevo.

#### Scenario: Login correcto
- **WHEN** se envían el email y la contraseña de una cuenta existente
- **THEN** la API responde con éxito y un cuerpo `{ data: { user, token } }` con un token de acceso nuevo

### Requirement: Rechazo de credenciales incorrectas
El sistema SHALL rechazar el inicio de sesión con un error 400 cuando el email no corresponda a ninguna cuenta o la contraseña no sea la correcta, sin indicar cuál de los dos ha fallado.

#### Scenario: Contraseña incorrecta
- **WHEN** se intenta iniciar sesión con un email existente y una contraseña errónea
- **THEN** la API responde 400 y no emite ningún token

#### Scenario: Email inexistente
- **WHEN** se intenta iniciar sesión con un email que no pertenece a ninguna cuenta
- **THEN** la API responde con el mismo error 400 que ante una contraseña incorrecta

### Requirement: Validación de la entrada del inicio de sesión
El sistema SHALL rechazar con un error de validación (422) el inicio de sesión cuando falte el email, el email no tenga formato válido o supere los 254 caracteres, o falte la contraseña. La contraseña de login no tiene restricción de longitud.

#### Scenario: Login sin contraseña
- **WHEN** se intenta iniciar sesión enviando solo el email
- **THEN** la API responde 422 con un error asociado al campo `password`

### Requirement: Representación pública del usuario
El sistema SHALL representar al usuario en sus respuestas con exactamente `id`, `fullName`, `email`, `initials`, `createdAt` y `updatedAt`, y SHALL NOT incluir nunca la contraseña ni ningún derivado de ella.

#### Scenario: Usuario devuelto tras registrarse
- **WHEN** se completa un registro, un login o una consulta de perfil
- **THEN** el objeto de usuario devuelto contiene esos seis campos y no contiene la contraseña

### Requirement: Cálculo de las iniciales
El sistema SHALL calcular las iniciales en mayúsculas: con un nombre de al menos dos palabras, la primera letra de las dos primeras; con un nombre de una sola palabra, sus dos primeras letras; sin nombre, la primera letra de la parte local del email y la primera del dominio.

#### Scenario: Nombre con nombre y apellido
- **WHEN** el usuario se llama "Ada Lovelace"
- **THEN** sus iniciales son "AL"

#### Scenario: Nombre de una sola palabra
- **WHEN** el usuario se llama "Ada"
- **THEN** sus iniciales son "AD"

#### Scenario: Usuario sin nombre
- **WHEN** el usuario no tiene nombre y su email es "ada@example.com"
- **THEN** sus iniciales son "AE"

### Requirement: Acceso autenticado a los endpoints de cuenta
El sistema SHALL exigir un token de acceso válido, enviado como cabecera `Authorization: Bearer <token>`, para los endpoints bajo `/api/v1/account`, y SHALL responder 401 cuando falte o no sea válido.

#### Scenario: Petición sin token
- **WHEN** se consulta el perfil sin cabecera de autorización
- **THEN** la API responde 401

#### Scenario: Token revocado
- **WHEN** se consulta el perfil con un token que ya se cerró con logout
- **THEN** la API responde 401

### Requirement: Consulta del perfil propio
El sistema SHALL devolver en `GET /api/v1/account/profile` la representación pública del usuario dueño del token, envuelta como `{ data: user }`.

#### Scenario: Consulta con token válido
- **WHEN** se consulta el perfil con un token válido
- **THEN** la API responde con éxito y `{ data: user }` con los datos del usuario al que pertenece el token

### Requirement: Cierre de sesión en la API
El sistema SHALL revocar, en `POST /api/v1/account/logout`, únicamente el token con el que se hace la petición y SHALL confirmar el cierre con un mensaje. Los demás tokens del mismo usuario SHALL seguir siendo válidos.

#### Scenario: Logout con token válido
- **WHEN** se llama a logout con un token válido
- **THEN** la API responde con éxito y un mensaje de confirmación, y ese token deja de ser aceptado

#### Scenario: Otras sesiones del mismo usuario
- **WHEN** un usuario con dos tokens activos cierra sesión con uno de ellos
- **THEN** el otro token sigue permitiendo consultar el perfil

### Requirement: Sesiones simultáneas
El sistema SHALL emitir un token distinto en cada registro o inicio de sesión, sin invalidar los tokens emitidos antes para el mismo usuario.

#### Scenario: Dos logins seguidos
- **WHEN** un usuario inicia sesión dos veces
- **THEN** obtiene dos tokens diferentes y ambos permiten consultar el perfil

### Requirement: Respuestas en JSON
El sistema SHALL responder en JSON a todas las peticiones de la API, incluidos los errores, con independencia de la cabecera `Accept` que envíe el cliente.

#### Scenario: Error pedido como HTML
- **WHEN** se consulta el perfil sin token y con `Accept: text/html`
- **THEN** la API responde 401 con un cuerpo JSON

### Requirement: Pantalla de registro
La aplicación SHALL ofrecer una pantalla de registro con los campos nombre completo (marcado como opcional), email, contraseña (con la indicación "Entre 8 y 32 caracteres.") y repetición de la contraseña, y un enlace a la pantalla de inicio de sesión.

#### Scenario: Visitante abre el registro
- **WHEN** una persona sin sesión abre la pantalla de registro
- **THEN** ve el formulario "Crea tu cuenta" con los cuatro campos, el botón "Crear cuenta" y el enlace "Inicia sesión"

### Requirement: Comprobación local de la confirmación de contraseña
La aplicación SHALL comprobar antes de enviar el registro que la contraseña y su repetición coinciden y, si no, SHALL mostrar "Las contraseñas no coinciden." bajo el campo de repetición sin llamar a la API.

#### Scenario: Contraseñas distintas en el formulario
- **WHEN** se envía el formulario de registro con contraseña y repetición diferentes
- **THEN** aparece "Las contraseñas no coinciden." bajo la repetición y no se realiza ninguna petición

### Requirement: Nombre vacío en el formulario de registro
La aplicación SHALL enviar el nombre completo sin espacios sobrantes y SHALL enviarlo como nulo cuando el campo quede vacío o solo contenga espacios.

#### Scenario: Nombre en blanco
- **WHEN** se registra una cuenta dejando el nombre con solo espacios
- **THEN** la cuenta se crea sin nombre y el perfil la muestra como "Sin nombre"

### Requirement: Entrada en la aplicación tras registrarse o iniciar sesión
La aplicación SHALL dar la sesión por iniciada en cuanto el registro o el login tienen éxito y SHALL llevar a la persona a la pantalla de perfil.

#### Scenario: Registro correcto desde la pantalla
- **WHEN** se completa el formulario de registro con datos válidos
- **THEN** la aplicación muestra la pantalla de perfil del nuevo usuario

#### Scenario: Login correcto desde la pantalla
- **WHEN** se envía el formulario de login con credenciales válidas
- **THEN** la aplicación muestra la pantalla de perfil del usuario

### Requirement: Pantalla de inicio de sesión
La aplicación SHALL ofrecer una pantalla de inicio de sesión con los campos email y contraseña, el botón "Entrar" y un enlace a la pantalla de registro.

#### Scenario: Visitante abre el login
- **WHEN** una persona sin sesión abre la pantalla de login
- **THEN** ve el formulario "Inicia sesión" con email y contraseña, el botón "Entrar" y el enlace "Crea una"

### Requirement: Estado de envío de los formularios de acceso
La aplicación SHALL desactivar el botón de envío mientras se procesa el registro o el login, mostrando "Creando cuenta…" o "Entrando…" respectivamente.

#### Scenario: Envío en curso
- **WHEN** se envía el formulario de login y la API aún no ha respondido
- **THEN** el botón aparece desactivado con el texto "Entrando…"

### Requirement: Errores de validación en los formularios
La aplicación SHALL mostrar en castellano cada error de validación de la API bajo el campo al que corresponde y SHALL mostrar en un aviso general los errores que no pueda asociar a un campo visible.

#### Scenario: Email ya registrado en el formulario
- **WHEN** se intenta registrar un email que ya existe
- **THEN** aparece bajo el campo email "Ese email ya está registrado. Inicia sesión en su lugar."

#### Scenario: Contraseña demasiado corta en el formulario
- **WHEN** la API rechaza el registro por una contraseña de menos de 8 caracteres
- **THEN** aparece bajo el campo contraseña un mensaje indicando que debe tener al menos 8 caracteres

### Requirement: Error de credenciales en el formulario de login
La aplicación SHALL mostrar el aviso general "El email o la contraseña no son correctos." cuando la API rechace las credenciales.

#### Scenario: Credenciales incorrectas
- **WHEN** se envía el login con una contraseña errónea
- **THEN** aparece el aviso "El email o la contraseña no son correctos." y la persona sigue en la pantalla de login

### Requirement: Errores de conexión y de servidor en los formularios
La aplicación SHALL mostrar un aviso general cuando no pueda contactar con la API ("No se pudo conectar con el servidor. Comprueba que el backend está arrancado.") o cuando esta falle de forma inesperada ("Algo ha ido mal en el servidor. Inténtalo de nuevo en un momento.").

#### Scenario: Backend caído al iniciar sesión
- **WHEN** se envía el login y la API no está accesible
- **THEN** aparece el aviso de que no se pudo conectar con el servidor y el botón vuelve a estar activo

### Requirement: Persistencia de la sesión en el navegador
La aplicación SHALL conservar el token de la sesión en el navegador, de forma que la sesión sobreviva a recargas y a nuevas pestañas, y SHALL validarlo contra la API al cargar, mostrando un indicador de carga mientras tanto.

#### Scenario: Recarga con sesión válida
- **WHEN** una persona con sesión iniciada recarga la pantalla de perfil
- **THEN** ve brevemente un indicador de carga y después su perfil, sin pasar por el login

### Requirement: Sesión rechazada al restaurarla
La aplicación SHALL descartar el token guardado cuando la API lo rechace como no autorizado al cargar y SHALL llevar al login mostrando "Tu sesión ha caducado. Vuelve a iniciar sesión."

#### Scenario: Token revocado al recargar
- **WHEN** se carga la aplicación con un token guardado que la API responde como no autorizado
- **THEN** se muestra la pantalla de login con el aviso "Tu sesión ha caducado. Vuelve a iniciar sesión." y el token deja de estar guardado

### Requirement: Fallo de la API al restaurar la sesión
La aplicación SHALL tratar a la persona como no autenticada cuando, al cargar, la API no responda o falle por un motivo distinto de autorización, SHALL mostrar el motivo en el login y SHALL conservar el token guardado para un nuevo intento al recargar.

#### Scenario: Backend caído al recargar
- **WHEN** se carga la aplicación con un token guardado y la API no está accesible
- **THEN** se muestra el login con el aviso de que no se pudo conectar con el servidor y, al recargar con la API disponible, la sesión se restaura sin volver a iniciar sesión

### Requirement: Protección de la pantalla de perfil
La aplicación SHALL redirigir al login a quien intente abrir la pantalla de perfil sin una sesión válida.

#### Scenario: Visitante sin sesión abre el perfil
- **WHEN** una persona sin sesión navega a la pantalla de perfil
- **THEN** la aplicación la lleva a la pantalla de login

### Requirement: Pantallas de acceso solo para visitantes
La aplicación SHALL redirigir a la pantalla de perfil a quien, con sesión válida, intente abrir las pantallas de login o de registro.

#### Scenario: Usuario con sesión abre el login
- **WHEN** una persona con sesión iniciada navega a la pantalla de login
- **THEN** la aplicación la lleva a la pantalla de perfil

### Requirement: Rutas desconocidas
La aplicación SHALL redirigir cualquier ruta no reconocida a la pantalla de perfil, que a su vez aplica su protección.

#### Scenario: Ruta inexistente sin sesión
- **WHEN** una persona sin sesión abre una ruta que no existe
- **THEN** termina en la pantalla de login

### Requirement: Pantalla de perfil
La aplicación SHALL mostrar en el perfil las iniciales del usuario, su nombre completo (o "Sin nombre" si no tiene), su email y la fecha de alta como "Miembro desde" en formato de fecha larga en castellano.

#### Scenario: Perfil de un usuario con nombre
- **WHEN** "Ada Lovelace", dada de alta el 1 de noviembre de 2026, abre su perfil
- **THEN** ve "AL", "Ada Lovelace", su email y "Miembro desde 1 de noviembre de 2026"

### Requirement: Cierre de sesión desde la aplicación
La aplicación SHALL cerrar la sesión local al pulsar "Cerrar sesión", aunque la API no confirme la revocación del token, y SHALL llevar a la persona al login sin mostrar ningún aviso de error.

#### Scenario: Cierre de sesión normal
- **WHEN** una persona con sesión pulsa "Cerrar sesión" en su perfil
- **THEN** el botón muestra "Cerrando sesión…", se revoca el token en la API y la aplicación muestra el login sin avisos

#### Scenario: Cierre de sesión con la API caída
- **WHEN** una persona pulsa "Cerrar sesión" y la API no está accesible
- **THEN** la aplicación olvida igualmente el token y muestra el login

---

# Parte B

## 1. Requisitos escritos y comprobados

- **Escritos por el agente:** 32
- **Comprobados abriendo el código:** 5

## 2. Incoherencias que aparecieron al escribirla

- El logout responde `{ message }` sin el envoltorio `data` y en inglés, cuando registro, login y perfil responden siempre `{ data: ... }`. Se ve en `POST /api/v1/account/logout`.
- La contraseña tiene que medir entre 8 y 32 caracteres al registrarse, pero el login no le pone ningún límite. Se ve comparando `POST /api/v1/auth/signup` con `POST /api/v1/auth/login`.
- La pantalla de registro indica "Entre 8 y 32 caracteres.", pero la única comprobación que hace antes de enviar es que las dos contraseñas coincidan; la longitud solo la rechaza la API. Se ve en la pantalla de registro.
- Cualquier 401 se presenta como "Tu sesión ha caducado.", aunque los tokens nunca caducan: solo dejan de valer al hacer logout. Se ve en la pantalla de login al restaurar una sesión revocada.
- El motivo por el que se perdió la sesión anterior aparece en la pantalla de login, pero no en la de registro. Se ve recargando con un token revocado y yendo a "Crea una".
- Los mensajes de longitud empiezan en minúscula ("la contraseña debe tener al menos 8 caracteres."), mientras que el resto de mensajes empiezan en mayúscula. Se ve bajo el campo contraseña al registrarse con una contraseña corta.

## 3. Lo que no supe decidir si era un bug o el contrato

- **Iniciales sin nombre:** "ada@example.com" da "AE". ¿Es una regla decidida (inicial del usuario más inicial del dominio) o un efecto de reutilizar sobre el email la lógica de nombre y apellido?
- **Clave `fullName` obligatoria aunque admita nulo:** omitirla devuelve 422. ¿Es un contrato que obliga a todo cliente a enviarla siempre (la interfaz lo hace a propósito) o un accidente de cómo se declaró la validación?
- **Tokens sin caducidad:** ¿son sesiones indefinidas decididas a propósito, o un olvido? El texto "Tu sesión ha caducado" de la interfaz sugiere que alguien esperaba que caducaran.
- **Sesión en varias pestañas:** cerrar sesión en una pestaña no cierra la otra, que sigue mostrando el perfil hasta recargar. ¿Es aislamiento aceptable por pestaña o un bug de sincronización?
- **Credenciales incorrectas con 400 y no 401:** ¿es una elección para distinguir "login fallido" de "no autenticado", o el valor por defecto que nadie revisó?
- **Email sin normalizar:** ¿pueden `Ada@x.com` y `ada@x.com` ser dos cuentas distintas, y debe el login distinguir mayúsculas? Leyendo el código no se puede decidir si eso es lo que se quería.
