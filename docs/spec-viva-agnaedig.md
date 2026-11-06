# Cuentas y acceso

## Purpose

Permite a una persona crear una cuenta, iniciar y cerrar sesión y consultar sus datos de perfil, de modo que el resto del producto pueda actuar en nombre de un usuario identificado. Cubre la API de autenticación y las pantallas de registro, inicio de sesión y perfil.

## Requirements

### Requirement: Registro de cuenta por la API

El sistema SHALL permitir crear una cuenta mediante `POST /api/v1/auth/signup` con los campos `fullName`, `email`, `password` y `passwordConfirmation`. Si la petición es válida, el sistema SHALL devolver los datos del usuario creado y un token de acceso dentro de `data`.

#### Scenario: Alta correcta con nombre

- **WHEN** se envía un `fullName` no vacío, un `email` que no está registrado, una `password` de entre 8 y 32 caracteres y una `passwordConfirmation` idéntica a la contraseña
- **THEN** el sistema responde con un código de éxito y un cuerpo `{ "data": { "user": { ... }, "token": "..." } }`, donde `user` incluye `id`, `fullName`, `email`, `createdAt`, `updatedAt` e `initials`, y no incluye la contraseña

#### Scenario: Alta correcta sin nombre

- **WHEN** se envía `fullName` con valor `null`, junto con un email no registrado y contraseñas válidas e iguales
- **THEN** el sistema crea la cuenta y responde igual que en el alta con nombre, con `fullName` a `null` en `user`

#### Scenario: Email ya registrado

- **WHEN** se envía un `email` que ya pertenece a otra cuenta, con el resto de campos válidos
- **THEN** el sistema responde con código 422 y un error de campo `email` con la regla `database.unique`, y no crea ninguna cuenta

#### Scenario: Contraseñas que no coinciden

- **WHEN** se envía una `passwordConfirmation` distinta de `password`
- **THEN** el sistema responde con código 422 y un error de campo `passwordConfirmation` con la regla `sameAs`

#### Scenario: Contraseña fuera de rango

- **WHEN** se envía una `password` de menos de 8 o más de 32 caracteres
- **THEN** el sistema responde con código 422 y un error de campo `password`

#### Scenario: Email con formato inválido

- **WHEN** se envía un `email` que no tiene formato de dirección válido o supera 254 caracteres
- **THEN** el sistema responde con código 422 y un error de campo `email`

#### Scenario: Campos ausentes

- **WHEN** se envía la petición sin alguno de los campos `fullName`, `email`, `password` o `passwordConfirmation`
- **THEN** el sistema responde con código 422 y un error de la regla `required` por cada campo ausente

### Requirement: Inicio de sesión por la API

El sistema SHALL permitir iniciar sesión mediante `POST /api/v1/auth/login` con `email` y `password`. Si las credenciales son correctas, el sistema SHALL devolver los datos del usuario y un token de acceso dentro de `data`.

#### Scenario: Credenciales correctas

- **WHEN** se envía un `email` registrado con su contraseña correcta
- **THEN** el sistema responde con un código de éxito y un cuerpo `{ "data": { "user": { ... }, "token": "..." } }` con la misma forma que en el alta

#### Scenario: Credenciales incorrectas

- **WHEN** se envía un `email` no registrado o una contraseña que no corresponde a ese email
- **THEN** el sistema responde con código 400 y el mensaje `Invalid user credentials`, sin indicar cuál de los dos datos es incorrecto

#### Scenario: Petición mal formada

- **WHEN** se envía la petición sin `email` o sin `password`, o con un `email` de formato inválido
- **THEN** el sistema responde con código 422 y errores de campo

### Requirement: Consulta del perfil por la API

El sistema SHALL devolver los datos del usuario autenticado en `GET /api/v1/account/profile` cuando la petición lleva un token válido en la cabecera `Authorization: Bearer`.

#### Scenario: Token válido

- **WHEN** se hace una petición de perfil con un token devuelto por el alta o el inicio de sesión y todavía no cerrado
- **THEN** el sistema responde con un código de éxito y un cuerpo `{ "data": { "id", "fullName", "email", "createdAt", "updatedAt", "initials" } }`

#### Scenario: Sin token o token no válido

- **WHEN** se hace una petición de perfil sin cabecera `Authorization`, o con un token que no existe o que ya se cerró
- **THEN** el sistema responde con código 401 y el mensaje `Unauthorized access`

### Requirement: Cierre de sesión por la API

El sistema SHALL invalidar el token usado en `POST /api/v1/account/logout` cuando la petición lo lleva en la cabecera `Authorization: Bearer`.

#### Scenario: Cierre correcto

- **WHEN** se hace una petición de cierre de sesión con un token válido
- **THEN** el sistema responde con un código de éxito y el mensaje `Logged out successfully`, y a partir de ese momento el mismo token es rechazado en la consulta de perfil con código 401

#### Scenario: Cierre sin token válido

- **WHEN** se hace una petición de cierre de sesión sin cabecera `Authorization` o con un token que no existe
- **THEN** el sistema responde con código 401 y el mensaje `Unauthorized access`

### Requirement: Pantalla de registro

El sistema SHALL mostrar a una persona sin sesión un formulario de registro con los campos nombre completo (opcional), email, contraseña, con una pista de "Entre 8 y 32 caracteres", y repetición de la contraseña.

#### Scenario: Registro correcto desde la pantalla

- **WHEN** una persona sin sesión rellena el formulario con datos válidos y pulsa "Crear cuenta"
- **THEN** el botón muestra "Creando cuenta…" mientras se envía, y al completarse la persona queda con sesión iniciada y es llevada a su perfil

#### Scenario: Contraseñas distintas antes de enviar

- **WHEN** la persona pulsa "Crear cuenta" con la contraseña y su repetición distintas
- **THEN** la pantalla muestra "Las contraseñas no coinciden." bajo el campo de repetición y no envía la petición

#### Scenario: Email ya registrado

- **WHEN** la persona envía el formulario con un email que ya tiene cuenta
- **THEN** la pantalla muestra "Ese email ya está registrado. Inicia sesión en su lugar." bajo el campo de email

#### Scenario: Errores de validación del servidor

- **WHEN** el servidor rechaza un campo por formato, longitud o confirmación
- **THEN** la pantalla muestra bajo ese campo un mensaje en castellano que describe el problema

#### Scenario: Enlace a inicio de sesión

- **WHEN** la persona pulsa "Inicia sesión" en la pantalla de registro
- **THEN** la pantalla de inicio de sesión se muestra

### Requirement: Pantalla de inicio de sesión

El sistema SHALL mostrar a una persona sin sesión un formulario con email y contraseña.

#### Scenario: Inicio de sesión correcto desde la pantalla

- **WHEN** una persona sin sesión introduce credenciales correctas y pulsa "Entrar"
- **THEN** el botón muestra "Entrando…" mientras se envía, y al completarse la persona queda con sesión iniciada y es llevada a su perfil

#### Scenario: Credenciales incorrectas

- **WHEN** la persona introduce un email o una contraseña que no corresponden a una cuenta y pulsa "Entrar"
- **THEN** la pantalla muestra en un aviso destacado "El email o la contraseña no son correctos." y la persona permanece en la pantalla de inicio de sesión

#### Scenario: Enlace a registro

- **WHEN** la persona pulsa "Crea una" en la pantalla de inicio de sesión
- **THEN** la pantalla de registro se muestra

### Requirement: Acceso restringido a las pantallas de cuenta

El sistema SHALL impedir que una persona sin sesión vea su perfil, y SHALL impedir que una persona con sesión vea las pantallas de inicio de sesión y registro.

#### Scenario: Perfil sin sesión

- **WHEN** una persona sin sesión abre la ruta del perfil
- **THEN** la pantalla de inicio de sesión se muestra en su lugar

#### Scenario: Ruta desconocida

- **WHEN** una persona abre cualquier ruta que no existe
- **THEN** se muestra el perfil si tiene sesión, o la pantalla de inicio de sesión si no la tiene

#### Scenario: Inicio de sesión o registro con sesión activa

- **WHEN** una persona con sesión iniciada abre la pantalla de inicio de sesión o la de registro
- **THEN** se muestra su perfil en su lugar

### Requirement: Mantenimiento de la sesión al recargar

El sistema SHALL conservar la sesión iniciada en el navegador entre recargas de la página, y SHALL validarla con el servidor al cargar.

#### Scenario: Recarga con sesión válida

- **WHEN** una persona con sesión iniciada recarga la página y el servidor reconoce su sesión
- **THEN** la persona sigue viendo su perfil sin pasar por la pantalla de inicio de sesión

#### Scenario: Recarga con sesión caducada o revocada

- **WHEN** una persona recarga la página y el servidor rechaza su sesión
- **THEN** la persona es llevada a la pantalla de inicio de sesión con el aviso "Tu sesión ha caducado. Vuelve a iniciar sesión."

#### Scenario: Recarga con el servidor caído

- **WHEN** una persona recarga la página y el servidor no responde
- **THEN** la persona es llevada a la pantalla de inicio de sesión con el aviso "No se pudo conectar con el servidor. Comprueba que el backend está arrancado."

### Requirement: Perfil en pantalla

El sistema SHALL mostrar en el perfil a la persona con sesión iniciada: sus iniciales, su nombre o "Sin nombre", su email y la fecha en que se registró.

#### Scenario: Datos del perfil

- **WHEN** una persona con sesión iniciada abre su perfil
- **THEN** la pantalla muestra un círculo con sus iniciales, su nombre completo o "Sin nombre" si no lo tiene, su email, y la fecha de alta en formato largo en castellano bajo el epígrafe "Miembro desde"

#### Scenario: Iniciales

- **WHEN** la persona tiene un nombre completo de dos palabras
- **THEN** las iniciales mostradas son la primera letra de cada palabra en mayúsculas

### Requirement: Cierre de sesión desde la pantalla

El sistema SHALL permitir a una persona con sesión iniciada cerrarla desde su perfil.

#### Scenario: Cerrar sesión

- **WHEN** la persona pulsa "Cerrar sesión" en su perfil
- **THEN** el botón muestra "Cerrando sesión…" y, al completarse, la persona queda sin sesión y es llevada a la pantalla de inicio de sesión

#### Scenario: Cierre de sesión con el servidor caído

- **WHEN** la persona pulsa "Cerrar sesión" y el servidor no responde
- **THEN** la persona queda sin sesión en el navegador y es llevada a la pantalla de inicio de sesión igualmente

## Parte B

1. No logré revisar ninguna, no me fue clara la explicación de lo que se tenía que hacer. la parte B menciona "cuántos comprobaste tú abriendo el código" pero en la parte A o en las instrucciones del Readme no menciona cómo tengo que comprobarlo. Además de tener la variable de entorno definida VITE_API_UR para otro proyecto entró en conflicto con este y no lo pude hacer funcionar a tiempo.

2. 
Scenario: Recarga con el servidor caído --> No puede redirigir a otra página si el servidor está caído
Scenario: Cierre de sesión con el servidor caído --> No puede redirigir a otra página si el servidor está caído

3.
En mi caso, se agotó el tiempo para validar el código desde el front, después me di cuenta que apuntaba a otro BE viendo la petición, el mensaje de error me hizo pensar que alguna dependencia no estaba bien instalada, indicaba que el backend no estaba disponible pero el comando de make start no arrojaba ningun error y el puerto 3333 del backend respondia en localhost