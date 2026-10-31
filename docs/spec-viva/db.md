# Especificación Viva: Cuentas y Acceso

## Purpose

Permite a los usuarios crear cuentas, autenticarse mediante tokens de acceso opacos, consultar su perfil y cerrar sesión.

## Requirements

### Requirement: Registro de nuevas cuentas

El sistema SHALL permitir el registro de nuevos usuarios mediante email y contraseña, devolviendo un token de acceso inmediato tras el registro exitoso.

#### Scenario: Registro exitoso con nombre completo

- **WHEN** se envía una petición POST a `/api/v1/auth/signup` con `fullName`, `email`, `password` y `passwordConfirmation` válidos
- **THEN** el sistema devuelve código 200 con un objeto que contiene los datos del usuario creado (`id`, `fullName`, `email`, `createdAt`, `updatedAt`, `initials`) y un token de acceso bajo la clave `data`

#### Scenario: Registro exitoso sin nombre completo

- **WHEN** se envía una petición POST a `/api/v1/auth/signup` con `fullName` nulo, `email`, `password` y `passwordConfirmation` válidos
- **THEN** el sistema devuelve código 200 con un objeto que contiene los datos del usuario creado (`id`, `fullName` nulo, `email`, `createdAt`, `updatedAt`, `initials`) y un token de acceso bajo la clave `data`

#### Scenario: Email ya registrado

- **WHEN** se envía una petición POST a `/api/v1/auth/signup` con un `email` que ya existe en el sistema
- **THEN** el sistema devuelve código 422 con errores de validación indicando que el email no es único

#### Scenario: Las contraseñas no coinciden

- **WHEN** se envía una petición POST a `/api/v1/auth/signup` con `password` y `passwordConfirmation` que no son iguales
- **THEN** el sistema devuelve código 422 con errores de validación indicando que `passwordConfirmation` debe coincidir con `password`

#### Scenario: Contraseña demasiado corta

- **WHEN** se envía una petición POST a `/api/v1/auth/signup` con un `password` de menos de 8 caracteres
- **THEN** el sistema devuelve código 422 con errores de validación indicando que `password` debe tener al menos 8 caracteres

#### Scenario: Contraseña demasiado larga

- **WHEN** se envía una petición POST a `/api/v1/auth/signup` con un `password` de más de 32 caracteres
- **THEN** el sistema devuelve código 422 con errores de validación indicando que `password` no puede exceder 32 caracteres

#### Scenario: Email inválido

- **WHEN** se envía una petición POST a `/api/v1/auth/signup` con un `email` que no cumple el formato de email válido
- **THEN** el sistema devuelve código 422 con errores de validación indicando que el email no es válido

#### Scenario: Email demasiado largo

- **WHEN** se envía una petición POST a `/api/v1/auth/signup` con un `email` de más de 254 caracteres
- **THEN** el sistema devuelve código 422 con errores de validación indicando que el email no puede exceder 254 caracteres

### Requirement: Inicio de sesión

El sistema SHALL permitir a usuarios existentes autenticarse mediante email y contraseña, devolviendo un token de acceso tras la verificación exitosa de credenciales.

#### Scenario: Inicio de sesión exitoso

- **WHEN** se envía una petición POST a `/api/v1/auth/login` con `email` y `password` correctos de un usuario existente
- **THEN** el sistema devuelve código 200 con un objeto que contiene los datos del usuario (`id`, `fullName`, `email`, `createdAt`, `updatedAt`, `initials`) y un token de acceso bajo la clave `data`

#### Scenario: Credenciales incorrectas

- **WHEN** se envía una petición POST a `/api/v1/auth/login` con `email` o `password` incorrectos
- **THEN** el sistema devuelve código 400 con un mensaje de error indicando que las credenciales son inválidas

#### Scenario: Email inválido en login

- **WHEN** se envía una petición POST a `/api/v1/auth/login` con un `email` que no cumple el formato de email válido
- **THEN** el sistema devuelve código 422 con errores de validación indicando que el email no es válido

### Requirement: Consulta de perfil autenticado

El sistema SHALL permitir a usuarios autenticados consultar sus propios datos de perfil mediante un token de acceso válido.

#### Scenario: Consulta exitosa con token válido

- **WHEN** se envía una petición GET a `/api/v1/account/profile` con un header `Authorization: Bearer <token>` válido
- **THEN** el sistema devuelve código 200 con un objeto que contiene los datos del usuario autenticado (`id`, `fullName`, `email`, `createdAt`, `updatedAt`, `initials`) bajo la clave `data`

#### Scenario: Consulta sin token

- **WHEN** se envía una petición GET a `/api/v1/account/profile` sin header `Authorization`
- **THEN** el sistema devuelve código 401 con un mensaje de error indicando que la autenticación es requerida

#### Scenario: Consulta con token inválido

- **WHEN** se envía una petición GET a `/api/v1/account/profile` con un header `Authorization: Bearer <token>` donde el token no existe o no es válido
- **THEN** el sistema devuelve código 401 con un mensaje de error indicando que la autenticación es requerida

### Requirement: Cierre de sesión

El sistema SHALL permitir a usuarios autenticados invalidar su token de acceso actual para cerrar sesión.

#### Scenario: Cierre de sesión exitoso

- **WHEN** se envía una petición POST a `/api/v1/account/logout` con un header `Authorization: Bearer <token>` válido
- **THEN** el sistema devuelve código 200 con un mensaje "Logged out successfully" y el token queda invalidado

#### Scenario: Cierre de sesión sin token

- **WHEN** se envía una petición POST a `/api/v1/account/logout` sin header `Authorization`
- **THEN** el sistema devuelve código 401 con un mensaje de error indicando que la autenticación es requerida

#### Scenario: Cierre de sesión con token inválido

- **WHEN** se envía una petición POST a `/api/v1/account/logout` con un header `Authorization: Bearer <token>` donde el token no existe o no es válido
- **THEN** el sistema devuelve código 401 con un mensaje de error indicando que la autenticación es requerida

### Requirement: Registro de nuevas cuentas desde la interfaz web

El sistema SHALL proporcionar una pantalla de registro accesible en la dirección `/register` que permita a los visitantes crear una cuenta ingresando sus datos.

#### Scenario: Acceso a la pantalla de registro

- **WHEN** el usuario navega a `/register`
- **THEN** se muestra un formulario con los campos "Nombre completo" (opcional), "Email", "Contraseña" y "Confirmar contraseña", un botón "Registrarse" y un enlace "¿Ya tienes cuenta? Inicia sesión"

#### Scenario: Registro exitoso desde el formulario

- **WHEN** el usuario completa el formulario de registro con datos válidos y presiona "Registrarse"
- **THEN** el navegador redirige automáticamente a `/profile` y se muestra la pantalla de perfil del usuario recién creado

#### Scenario: Registro con error de validación en el formulario

- **WHEN** el usuario completa el formulario con datos que no cumplen las validaciones (por ejemplo, email inválido, contraseñas que no coinciden, contraseña menor a 8 caracteres) y presiona "Registrarse"
- **THEN** se muestran mensajes de error específicos debajo de cada campo afectado sin cambiar de página

#### Scenario: Registro con email ya existente

- **WHEN** el usuario completa el formulario con un email que ya está registrado y presiona "Registrarse"
- **THEN** se muestra un mensaje de error debajo del campo "Email" indicando que el email ya está en uso

#### Scenario: Navegación desde registro a login

- **WHEN** el usuario presiona el enlace "¿Ya tienes cuenta? Inicia sesión" en la pantalla de registro
- **THEN** el navegador navega a `/login`

#### Scenario: Acceso a registro con sesión activa

- **WHEN** el usuario navega a `/register` mientras tiene una sesión activa
- **THEN** el navegador redirige automáticamente a `/profile`

### Requirement: Inicio de sesión desde la interfaz web

El sistema SHALL proporcionar una pantalla de inicio de sesión accesible en la dirección `/login` que permita a usuarios existentes autenticarse ingresando sus credenciales.

#### Scenario: Acceso a la pantalla de inicio de sesión

- **WHEN** el usuario navega a `/login`
- **THEN** se muestra un formulario con los campos "Email" y "Contraseña", un botón "Iniciar sesión" y un enlace "¿No tienes cuenta? Regístrate"

#### Scenario: Inicio de sesión exitoso desde el formulario

- **WHEN** el usuario completa el formulario con credenciales válidas y presiona "Iniciar sesión"
- **THEN** el navegador redirige automáticamente a `/profile` y se muestra la pantalla de perfil del usuario autenticado

#### Scenario: Inicio de sesión con credenciales incorrectas

- **WHEN** el usuario completa el formulario con credenciales incorrectas y presiona "Iniciar sesión"
- **THEN** se muestra un mensaje de error general indicando "Credenciales inválidas" sin especificar si el email o la contraseña son incorrectos

#### Scenario: Inicio de sesión con error de validación

- **WHEN** el usuario completa el formulario con datos que no cumplen las validaciones (por ejemplo, email inválido) y presiona "Iniciar sesión"
- **THEN** se muestran mensajes de error específicos debajo de cada campo afectado sin cambiar de página

#### Scenario: Navegación desde login a registro

- **WHEN** el usuario presiona el enlace "¿No tienes cuenta? Regístrate" en la pantalla de inicio de sesión
- **THEN** el navegador navega a `/register`

#### Scenario: Acceso a login con sesión activa

- **WHEN** el usuario navega a `/login` mientras tiene una sesión activa
- **THEN** el navegador redirige automáticamente a `/profile`

#### Scenario: Redirección tras login cuando venía de ruta protegida

- **WHEN** el usuario intenta acceder a `/profile` sin sesión, es redirigido a `/login`, ingresa credenciales válidas y presiona "Iniciar sesión"
- **THEN** el navegador redirige automáticamente a `/profile` (la ruta original que intentaba visitar)

### Requirement: Visualización del perfil autenticado

El sistema SHALL proporcionar una pantalla de perfil accesible en la dirección `/profile` que muestre los datos del usuario autenticado y permita cerrar sesión.

#### Scenario: Acceso a la pantalla de perfil con sesión activa

- **WHEN** el usuario navega a `/profile` mientras tiene una sesión activa
- **THEN** se muestra un encabezado con el texto "Perfil", los datos del usuario (nombre completo o "Sin nombre" si no lo tiene, email, iniciales, fecha de creación y fecha de actualización) y un botón "Cerrar sesión"

#### Scenario: Cierre de sesión desde el perfil

- **WHEN** el usuario presiona el botón "Cerrar sesión" en la pantalla de perfil
- **THEN** el navegador redirige automáticamente a `/login` y el usuario ya no tiene acceso a rutas protegidas

#### Scenario: Acceso a perfil sin sesión activa

- **WHEN** el usuario navega a `/profile` sin tener una sesión activa
- **THEN** el navegador redirige automáticamente a `/login`

### Requirement: Persistencia de sesión al recargar la página

El sistema SHALL mantener la sesión del usuario activa tras recargar la página, siempre que el token de acceso siga siendo válido en el servidor.

#### Scenario: Recarga de página con sesión activa

- **WHEN** el usuario recarga la página estando en `/profile` con una sesión activa
- **THEN** la página se vuelve a cargar mostrando el perfil del usuario sin redirigir al login

#### Scenario: Recarga de página sin sesión

- **WHEN** el usuario recarga la página estando en `/login` o `/register` sin sesión activa
- **THEN** la página se vuelve a cargar mostrando el mismo formulario

#### Scenario: Recarga de ruta protegida sin sesión

- **WHEN** el usuario recarga la página estando en `/profile` sin sesión activa (por ejemplo, tras expiración o eliminación manual del token)
- **THEN** el navegador redirige automáticamente a `/login`

### Requirement: Protección de rutas autenticadas

El sistema SHALL impedir el acceso a rutas protegidas cuando el usuario no tiene una sesión activa, redirigiendo automáticamente a la pantalla de inicio de sesión.

#### Scenario: Acceso directo a ruta protegida sin sesión

- **WHEN** el usuario navega directamente a `/profile` sin tener una sesión activa
- **THEN** el navegador redirige automáticamente a `/login`

#### Scenario: Acceso directo a ruta protegida con sesión

- **WHEN** el usuario navega directamente a `/profile` teniendo una sesión activa
- **THEN** se muestra la pantalla de perfil sin redirecciones

### Requirement: Manejo de errores de conectividad

El sistema SHALL informar al usuario cuando no pueda comunicarse con el servidor, mostrando mensajes de error claros.

#### Scenario: Error de red durante registro

- **WHEN** el usuario completa el formulario de registro y presiona "Registrarse", pero el servidor no responde o no está disponible
- **THEN** se muestra un mensaje de error indicando "No se pudo conectar con el servidor. Por favor, intenta nuevamente"

#### Scenario: Error de red durante login

- **WHEN** el usuario completa el formulario de inicio de sesión y presiona "Iniciar sesión", pero el servidor no responde o no está disponible
- **THEN** se muestra un mensaje de error indicando "No se pudo conectar con el servidor. Por favor, intenta nuevamente"

#### Scenario: Error de red durante carga de perfil

- **WHEN** el usuario navega a `/profile` con sesión activa pero el servidor no responde al validar el token
- **THEN** se muestra un mensaje de error indicando "No se pudo cargar el perfil. Por favor, intenta nuevamente"

#### Scenario: Error de red durante cierre de sesión

- **WHEN** el usuario presiona "Cerrar sesión" pero el servidor no responde
- **THEN** se muestra un mensaje de error indicando "No se pudo cerrar sesión. Por favor, intenta nuevamente" y el usuario permanece en la pantalla de perfil

---

## Parte B

### 1. Requisitos escritos y comprobados

- Escritos por el agente: 10
- Comprobados por mí: 1

### 2. Incoherencias

- Un error de credenciales en el login responde con código 400, mientras que el resto de errores de datos (email repetido, contraseña corta, contraseñas que no coinciden) responde con 422. Se ve en la API: `POST /api/v1/auth/login` frente a `POST /api/v1/auth/signup`.
- Registro, login y perfil devuelven sus datos dentro de una clave `data`, pero el logout devuelve un `message` suelto, sin `data`. Se ve en la API: `POST /api/v1/account/logout`.
- La pantalla de login avisa "Tu sesión ha caducado" cuando el servidor rechaza el token, pero los tokens no tienen fecha de vencimiento. Se ve en la pantalla de login tras un 401.

### 3. Bug o contrato

- Un usuario que se registra sin nombre, por ejemplo `juan@gmail.com`, obtiene las iniciales "JG": la J de "juan" y la G de "gmail". Lectura A: es contrato, alguien decidió que sin nombre las iniciales salen del email. Lectura B: es un bug, porque el dominio no forma parte de la persona y deberían ser "JU". Leyendo el código no hay forma de saber cuál de las dos se quiso.
