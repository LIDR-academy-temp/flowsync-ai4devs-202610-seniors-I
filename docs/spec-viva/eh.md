# Spec viva — Cuentas y acceso

## Purpose

Describe lo que FlowSync hace hoy para que una persona cree una cuenta, inicie sesión, mantenga y cierre su sesión y consulte su perfil, tanto en la API (`/api/v1`) como en las pantallas de la aplicación web.

## Requirements

### Requirement: Formato común de respuestas y errores de la API

La API MUST responder siempre en JSON, aunque el cliente pida otro formato. Las respuestas correctas de registro, inicio de sesión y perfil SHALL ir envueltas en un objeto `{ "data": ... }`. Los errores SHALL devolverse como `{ "errors": [ ... ] }`, donde cada error de validación lleva `message`, `rule` y `field` (y `meta` cuando la regla tiene parámetros).

#### Scenario: Error de validación

- **WHEN** un cliente envía a un endpoint de cuentas un cuerpo que incumple alguna regla de validación
- **THEN** la API responde 422 con `{ "errors": [ { "message", "rule", "field", ... } ] }`, un elemento por cada regla incumplida

#### Scenario: Cliente que pide HTML

- **WHEN** un cliente llama a cualquier endpoint de cuentas con la cabecera `Accept: text/html`
- **THEN** la API responde igualmente en JSON

### Requirement: Registro de cuenta por API

`POST /api/v1/auth/signup` SHALL crear un usuario a partir de `fullName`, `email`, `password` y `passwordConfirmation`, y SHALL devolver el usuario creado junto con un token de acceso ya válido, sin necesidad de un inicio de sesión aparte. Las reglas son: `email` con formato de email y como máximo 254 caracteres, no registrado ya; `password` entre 8 y 32 caracteres; `passwordConfirmation` entre 8 y 32 caracteres e igual a `password`; `fullName` texto o `null`, y la clave MUST estar presente.

#### Scenario: Registro correcto

- **WHEN** se envían un `fullName` (o `null`), un `email` no registrado y dos contraseñas iguales de entre 8 y 32 caracteres
- **THEN** la API responde 200 con `{ "data": { "user": { "id", "fullName", "email", "createdAt", "updatedAt", "initials" }, "token": "<token opaco>" } }`, y la contraseña no aparece en la respuesta

#### Scenario: Email ya registrado

- **WHEN** se envía un `email` idéntico, carácter a carácter, al de una cuenta existente
- **THEN** la API responde 422 con un error de regla `database.unique` en el campo `email` y no crea la cuenta

#### Scenario: Contraseñas que no coinciden

- **WHEN** `passwordConfirmation` es distinta de `password`
- **THEN** la API responde 422 con un error de regla `sameAs` en el campo `passwordConfirmation`

#### Scenario: Contraseña fuera de longitud

- **WHEN** `password` tiene menos de 8 caracteres o más de 32
- **THEN** la API responde 422 con un error de regla `minLength` o `maxLength` en el campo `password`

#### Scenario: Falta la clave del nombre

- **WHEN** el cuerpo no incluye la clave `fullName`
- **THEN** la API responde 422 con un error de regla `required` en el campo `fullName`, aunque el nombre sea opcional

#### Scenario: Nombre vacío

- **WHEN** `fullName` se envía como cadena vacía `""`
- **THEN** la cuenta se crea y se guarda con `fullName` igual a `""` (no `null`)

> [COMPROBADO: incorrecto] El servidor convierte las cadenas vacías en `null` y recorta los espacios antes de validar. Con `""`, la cuenta se guarda con `fullName` igual a `null`, no `""`.

> [DUDA] ¿bug o contrato?: la unicidad del email distingue mayúsculas de minúsculas, así que `Ana@x.com` y `ana@x.com` pueden ser dos cuentas distintas. Lectura A: es un bug, los emails deberían compararse sin distinguir mayúsculas. Lectura B: es el contrato, el email se guarda y se compara tal cual se escribió.

> [DUDA] ¿bug o contrato?: que `fullName` sea opcional pero su clave obligatoria hace fallar a un cliente que simplemente omite el campo. Lectura A: es un bug, omitirlo debería equivaler a `null`. Lectura B: es el contrato, el cliente debe enviar siempre la clave (la web lo hace).

### Requirement: Inicio de sesión por API

`POST /api/v1/auth/login` SHALL comprobar `email` y `password` y, si coinciden con una cuenta, SHALL emitir un token de acceso nuevo y devolverlo junto con el usuario. Cada inicio de sesión correcto MUST crear un token adicional sin invalidar los anteriores.

#### Scenario: Credenciales correctas

- **WHEN** se envían el `email` y la `password` de una cuenta existente
- **THEN** la API responde 200 con `{ "data": { "user": { ... }, "token": "<token opaco>" } }`, con el usuario en la misma forma que en el registro

#### Scenario: Credenciales incorrectas

- **WHEN** el email tiene formato válido pero no corresponde a ninguna cuenta, o la contraseña no es la de esa cuenta, o la contraseña es una cadena vacía
- **THEN** la API responde 400 con `{ "errors": [ { "message": "Invalid user credentials" } ] }`, sin indicar qué campo falló

> [COMPROBADO: incorrecto en parte] Con la contraseña como cadena vacía la respuesta no es 400. La cadena llega como `null` y la API responde 422 con un error de regla `required` en el campo `password`.

#### Scenario: Email con formato inválido

- **WHEN** `email` no tiene formato de email o supera los 254 caracteres
- **THEN** la API responde 422 con un error de validación en el campo `email` y no comprueba las credenciales

#### Scenario: Email con distinta capitalización

- **WHEN** se intenta entrar con el email de una cuenta existente pero escrito con otras mayúsculas o minúsculas
- **THEN** la API lo trata como credenciales incorrectas (400)

> [DUDA] ¿bug o contrato?: el inicio de sesión distingue mayúsculas en el email. Lectura A: es un bug, quien se registró como `Ana@x.com` debería poder entrar con `ana@x.com`. Lectura B: es el contrato, coherente con cómo se guarda el email en el registro.

### Requirement: Autenticación de peticiones protegidas

Los endpoints bajo `/api/v1/account` MUST exigir un token de acceso válido en la cabecera `Authorization: Bearer <token>`. Los tokens SHALL seguir siendo válidos indefinidamente hasta que se revoquen con el cierre de sesión.

#### Scenario: Sin token o con token inválido

- **WHEN** se llama a un endpoint de `/api/v1/account` sin cabecera `Authorization`, con un token que no existe o con uno ya revocado
- **THEN** la API responde 401 con `{ "errors": [ { "message": "Unauthorized access" } ] }`

#### Scenario: Token antiguo

- **WHEN** se usa un token emitido hace mucho tiempo y nunca revocado
- **THEN** la API lo acepta igual que uno recién emitido

> [DUDA] ¿bug o contrato?: los tokens no caducan nunca. Lectura A: es un hueco de seguridad, un token filtrado vale para siempre. Lectura B: es el contrato actual, la sesión dura hasta que la persona la cierra.

### Requirement: Consulta del perfil por API

`GET /api/v1/account/profile` SHALL devolver los datos del usuario dueño del token.

#### Scenario: Perfil con sesión válida

- **WHEN** se llama con un token válido
- **THEN** la API responde 200 con `{ "data": { "id", "fullName", "email", "createdAt", "updatedAt", "initials" } }`, sin la contraseña

### Requirement: Cálculo de las iniciales

El campo `initials` del usuario SHALL calcularse así: si hay nombre, se parte por espacios simples y se toman la primera letra de la primera parte y de la segunda; si no hay segunda parte, las dos primeras letras de la primera. Si no hay nombre (`null` o `""`), se parte el email por la `@` y se toma la primera letra de lo que va antes y de lo que va después. El resultado MUST ir en mayúsculas.

#### Scenario: Nombre y apellido

- **WHEN** el usuario se llama `Ada Lovelace`
- **THEN** `initials` vale `AL`

#### Scenario: Solo un nombre

- **WHEN** el usuario se llama `Ada`
- **THEN** `initials` vale `AD`

#### Scenario: Sin nombre

- **WHEN** el usuario no tiene nombre y su email es `ada@flowsync.dev`
- **THEN** `initials` vale `AF` (primera letra del usuario del email y primera del dominio)

#### Scenario: Nombre con doble espacio

- **WHEN** el usuario se llama `Ada  Lovelace` (con dos espacios entre palabras)
- **THEN** `initials` vale `AD`, no `AL`

> [DUDA] ¿bug o contrato?: sin nombre, la segunda inicial sale del dominio del email. Lectura A: es un bug, deberían ser las dos primeras letras de lo que va antes de la `@`. Lectura B: es el contrato, se trata el email como "nombre@apellido".

> [DUDA] ¿bug o contrato?: un doble espacio (o un espacio inicial) en el nombre cambia las iniciales. Lectura A: es un bug, los espacios repetidos deberían ignorarse. Lectura B: es el contrato, el nombre se usa exactamente como se guardó.

### Requirement: Cierre de sesión por API

`POST /api/v1/account/logout` SHALL revocar únicamente el token usado en esa petición. Los demás tokens de la misma cuenta MUST seguir siendo válidos.

#### Scenario: Cierre de sesión correcto

- **WHEN** se llama con un token válido
- **THEN** la API responde 200 con `{ "message": "Logged out successfully" }` y, a partir de ese momento, ese token recibe 401 en los endpoints protegidos

#### Scenario: Otras sesiones abiertas

- **WHEN** la misma cuenta ha iniciado sesión varias veces y cierra sesión con uno de sus tokens
- **THEN** los demás tokens siguen funcionando

> [DUDA] ¿bug o contrato?: la respuesta del cierre de sesión no va envuelta en `{ "data": ... }`, a diferencia del resto. Lectura A: es un bug, rompe la convención de envoltorio. Lectura B: es el contrato, es un mensaje de confirmación y no un recurso.

### Requirement: Navegación según el estado de sesión

La aplicación web SHALL tener tres pantallas: `/login` y `/register`, solo para personas sin sesión, y `/profile`, solo para personas con sesión. Cualquier otra dirección MUST redirigir a `/profile`. Mientras se comprueba una sesión guardada, SHALL mostrarse un indicador de carga a pantalla completa en vez de redirigir.

#### Scenario: Visitante sin sesión entra en el perfil

- **WHEN** una persona sin sesión abre `/profile` o cualquier dirección desconocida
- **THEN** acaba en `/login`

#### Scenario: Persona con sesión entra en el acceso

- **WHEN** una persona con sesión activa abre `/login` o `/register`
- **THEN** se la redirige a `/profile`

#### Scenario: Comprobación en curso

- **WHEN** la aplicación arranca con una sesión guardada y aún no ha terminado de validarla
- **THEN** cualquier pantalla de acceso o de perfil muestra solo un indicador de carga ("Cargando…" para lectores de pantalla)

### Requirement: Persistencia y restauración de la sesión en la web

La aplicación SHALL guardar el token en el almacenamiento del navegador al registrarse o iniciar sesión, de modo que la sesión sobreviva a recargas y a nuevas pestañas. Al arrancar con un token guardado, MUST validarlo contra el perfil antes de dar la sesión por buena.

#### Scenario: Recarga con sesión válida

- **WHEN** una persona con sesión recarga la página
- **THEN** ve brevemente el indicador de carga y vuelve a la pantalla en la que estaba

#### Scenario: Token rechazado al restaurar

- **WHEN** al arrancar el backend responde 401 al token guardado
- **THEN** el token se borra, la persona va a la pantalla de inicio de sesión y ve el aviso "Tu sesión ha caducado. Vuelve a iniciar sesión."

#### Scenario: Backend no disponible al restaurar

- **WHEN** al arrancar no se puede contactar con el backend o este responde con un error que no es 401
- **THEN** la persona va a la pantalla de inicio de sesión con el aviso correspondiente (por ejemplo "No se pudo conectar con el servidor. Comprueba que el backend está arrancado."), pero el token se conserva y una recarga posterior con el backend disponible restaura la sesión

### Requirement: Pantalla de registro

La pantalla de registro SHALL pedir nombre completo (marcado como opcional), email, contraseña (con la pista "Entre 8 y 32 caracteres.") y repetición de la contraseña, y SHALL enlazar a la pantalla de inicio de sesión. Al registrarse con éxito, la persona MUST quedar con la sesión iniciada y llegar a su perfil.

#### Scenario: Registro correcto

- **WHEN** la persona rellena datos válidos y pulsa "Crear cuenta"
- **THEN** el botón muestra "Creando cuenta…" y queda deshabilitado, y al terminar la persona ve su perfil con la sesión iniciada

#### Scenario: Contraseñas distintas

- **WHEN** las dos contraseñas no coinciden y pulsa "Crear cuenta"
- **THEN** aparece "Las contraseñas no coinciden." bajo la repetición de la contraseña y no se envía nada al servidor

#### Scenario: Nombre en blanco

- **WHEN** deja el nombre vacío o solo con espacios
- **THEN** la cuenta se crea sin nombre; si escribe un nombre, se guarda sin los espacios de los extremos

#### Scenario: Email ya registrado

- **WHEN** usa un email que ya tiene cuenta
- **THEN** aparece bajo el email "Ese email ya está registrado. Inicia sesión en su lugar."

#### Scenario: Errores de validación del servidor

- **WHEN** el servidor rechaza uno o más campos
- **THEN** cada campo muestra debajo un único mensaje en castellano (el primero que devolvió el servidor) y no aparece aviso general

#### Scenario: Contraseña demasiado corta

- **WHEN** la contraseña tiene menos de 8 caracteres
- **THEN** bajo la contraseña aparece "la contraseña debe tener al menos 8 caracteres." en lugar de la pista

> [DUDA] ¿bug o contrato?: los mensajes de longitud empiezan en minúscula ("la contraseña debe…", "el email no puede superar…"). Lectura A: es un bug de redacción, deberían empezar en mayúscula. Lectura B: es aceptado, el texto se compone con la etiqueta del campo tal cual.

### Requirement: Pantalla de inicio de sesión

La pantalla de inicio de sesión SHALL pedir email y contraseña y SHALL enlazar a la pantalla de registro ("¿Aún no tienes cuenta? Crea una"). Al entrar con éxito, la persona MUST llegar a su perfil. Si una sesión anterior se perdió, la pantalla SHALL explicar por qué hasta que haya un error del intento actual, que tiene prioridad.

#### Scenario: Entrada correcta

- **WHEN** la persona introduce credenciales válidas y pulsa "Entrar"
- **THEN** el botón muestra "Entrando…" y queda deshabilitado, y al terminar ve su perfil

#### Scenario: Credenciales incorrectas

- **WHEN** introduce un email o una contraseña que no son correctos
- **THEN** aparece un aviso general "El email o la contraseña no son correctos." y el botón vuelve a estar disponible

#### Scenario: Email con formato inválido

- **WHEN** introduce un texto que no es un email
- **THEN** aparece bajo el email "Introduce una dirección de email válida." (el navegador no lo bloquea antes)

#### Scenario: Servidor caído o con error

- **WHEN** no se puede contactar con el backend, o este falla con un error inesperado
- **THEN** aparece un aviso general "No se pudo conectar con el servidor. Comprueba que el backend está arrancado." o "Algo ha ido mal en el servidor. Inténtalo de nuevo en un momento.", respectivamente

### Requirement: Pantalla de perfil

La pantalla de perfil SHALL mostrar un círculo con las iniciales, el nombre (o "Sin nombre" si no tiene), el email y "Miembro desde" con la fecha de alta en formato largo en castellano, y un botón "Cerrar sesión". Los datos mostrados SHALL ser los recibidos al registrarse o iniciar sesión, o los del perfil al restaurar la sesión.

#### Scenario: Perfil de una persona con nombre

- **WHEN** una persona llamada "Ada Lovelace" con email `ada@flowsync.dev`, dada de alta el 1 de noviembre de 2026, abre su perfil
- **THEN** ve "AL" en el círculo, "Ada Lovelace", `ada@flowsync.dev` y "Miembro desde 1 de noviembre de 2026"

#### Scenario: Perfil sin nombre

- **WHEN** la persona no indicó nombre al registrarse
- **THEN** ve "Sin nombre" como título y las iniciales calculadas a partir de su email

### Requirement: Cierre de sesión en la web

Al pulsar "Cerrar sesión", la aplicación SHALL cerrar la sesión local de inmediato (borrar el token guardado y llevar a la persona a la pantalla de inicio de sesión) y SHALL pedir al backend que revoque el token, sin esperar ni depender de su respuesta.

#### Scenario: Cierre de sesión con backend disponible

- **WHEN** la persona pulsa "Cerrar sesión" en su perfil
- **THEN** llega a la pantalla de inicio de sesión sin ningún aviso, y el token deja de ser válido en el backend

#### Scenario: Cierre de sesión con backend caído

- **WHEN** la persona pulsa "Cerrar sesión" y el backend no responde
- **THEN** igualmente llega a la pantalla de inicio de sesión sin ningún aviso, aunque el token sigue siendo válido en el backend

#### Scenario: Varias pestañas abiertas

- **WHEN** la persona cierra sesión en una pestaña y tiene otra abierta en el perfil
- **THEN** la otra pestaña sigue mostrando el perfil hasta que se recarga

---

## Parte B — las tres listas

### 1. Requisitos escritos y comprobados

- **Escritos por el agente:** 13. En el chat dijo primero 14 y se corrigió en la misma respuesta.
- **Comprobados abriendo el código:** 13. La comprobación la hicieron dos revisores leyendo el código, uno para la API y otro para la pantalla, en una sesión paralela. Dos de sus hallazgos los verifiqué yo a mano.
- **Resultado:** 11 coinciden con el código y 2 tienen un escenario incorrecto (registro con nombre vacío, login con contraseña vacía). Hay además 2 escenarios con matiz: "Miembro desde" aparece como dos textos, no como una frase, y el error de contraseña corta solo aparece después de ir al servidor.

### 2. Incoherencias

- **Envoltorio de las respuestas.** Registro, login y perfil responden dentro de `{ "data": ... }`; el cierre de sesión no, y además su mensaje está en inglés. Se ve en la respuesta del logout.
- **Saber si un email ya existe.** El login no dice si un email está registrado ("credenciales incorrectas" sin indicar campo). El registro sí: "Ese email ya está registrado". Se ve comparando las dos respuestas.
- **Longitud de la contraseña.** El registro exige de 8 a 32 caracteres; el login acepta cualquier longitud. Se ve en los errores 422 de cada uno.
- **Todo 400 se traduce como credenciales.** La pantalla interpreta cualquier 400 como "El email o la contraseña no son correctos.", también en el registro (por ejemplo, con un cuerpo mal formado). Se ve en la pantalla de registro.
- **Tres mensajes genéricos para el mismo fallo.** "Algo ha ido mal en el servidor…", "Algo ha ido mal. Inténtalo de nuevo." y "No hemos podido restaurar tu sesión.", según dónde ocurra. Se ve en los avisos de las pantallas de acceso.
- **Errores duplicados.** Con una contraseña corta y bien repetida salen dos errores casi iguales, uno bajo la contraseña y otro bajo la repetición. Se ve en el registro.
- **La propia spec se equivocó.** Escribió que una cadena vacía se guarda tal cual, pero el servidor la convierte en `null` antes de validar (ver los dos [COMPROBADO]).

### 3. Lo que no supe decidir si era bug o contrato

- **La sesión no caduca nunca, pero la pantalla habla de caducidad.** Un token dura hasta que se cierra sesión, y si el cierre de sesión falla en el servidor, sigue vivo aunque la pantalla te haya sacado. Aun así, el aviso dice "Tu sesión ha caducado". Lectura A: la sesión indefinida es el contrato, y el texto solo describe mal un token revocado. Lectura B: el texto es la intención, y falta una caducidad que nadie configuró. El código no dice cuál de las dos se decidió.
- **Los espacios de la contraseña se recortan.** La contraseña `" abcdefgh "` se guarda como `"abcdefgh"`, y los límites de 8 y 32 caracteres se cuentan sin esos espacios. Lectura A: es una limpieza razonable de la entrada. Lectura B: es un bug, porque una contraseña nunca debería modificarse. Es un ajuste global del servidor que afecta a todo, no una decisión tomada para la contraseña.
- **Mayúsculas en el email.** `Ana@x.com` y `ana@x.com` son cuentas distintas, y para entrar hay que escribirlo exacto. Lectura A: es un bug, porque para una persona son el mismo email. Lectura B: es el contrato, coherente con cómo se guarda. Desde fuera no se sabe si alguien lo decidió.
- **Iniciales sin nombre.** Se toma la segunda letra del dominio del email (`ada@flowsync.dev` da "AF"). Lectura A: es un bug, debería usar solo lo que va antes de la `@`. Lectura B: es el contrato, el email se trata como "nombre@apellido".
