# Spec viva — Cuentas y acceso de usuarios (FlowSync)

## Purpose

Esta especificación describe el comportamiento **real y vigente** del módulo de cuentas y acceso de usuarios de FlowSync, tal como está implementado hoy en la API (backend) y en la aplicación web (frontend). Documenta lo que el sistema **hace**, no lo que debería hacer en el futuro.

Está redactada desde el punto de vista de una persona usuaria y de la API, para servir como base de verdad ("spec viva") compartida por el equipo.

Alcance: registro de cuenta, inicio de sesión, cierre de sesión, gestión de la sesión, consulta del perfil y protección de rutas.

## Requirements

### Requirement: Registro de una cuenta nueva

The system SHALL permitir que una persona sin cuenta se registre proporcionando un correo electrónico válido y único, una contraseña dentro del rango permitido y su confirmación, y opcionalmente un nombre; al crear la cuenta SHALL cifrar la contraseña y devolver los datos públicos de la cuenta junto con un token de acceso.

#### Scenario: Registro correcto

- **WHEN** alguien envía un correo con formato válido y no registrado antes, una contraseña de entre 8 y 32 caracteres y una confirmación idéntica
- **THEN** el sistema crea la cuenta, guarda la contraseña de forma cifrada (nunca en texto plano) y responde con los datos públicos de la cuenta (identificador, nombre, correo, fechas e iniciales) y un token de acceso válido

#### Scenario: Correo ya registrado

- **WHEN** alguien intenta registrarse con un correo que ya existe
- **THEN** el sistema rechaza la operación con un error de validación (HTTP 422) indicando que el correo ya está en uso, y no crea una segunda cuenta

#### Scenario: La confirmación de contraseña no coincide

- **WHEN** la contraseña y su confirmación no son iguales
- **THEN** el sistema rechaza la operación con un error de validación (HTTP 422) y no crea la cuenta; además, la aplicación web lo detecta antes de llamar a la API y muestra el error junto al campo

#### Scenario: Contraseña fuera del rango permitido

- **WHEN** la contraseña tiene menos de 8 o más de 32 caracteres
- **THEN** el sistema rechaza la operación con un error de validación (HTTP 422) y no crea la cuenta

#### Scenario: Registro sin nombre

- **WHEN** alguien se registra dejando el nombre vacío
- **THEN** el sistema acepta la cuenta sin nombre y, cuando más adelante se necesiten iniciales, las deriva del correo

### Requirement: Inicio de sesión

The system SHALL permitir iniciar sesión con correo y contraseña, devolviendo un token de acceso cuando las credenciales son correctas y rechazando el intento cuando no lo son, sin revelar cuál de los dos datos falló.

#### Scenario: Credenciales correctas

- **WHEN** una persona envía un correo y una contraseña que corresponden a una cuenta existente
- **THEN** el sistema responde con los datos públicos de la cuenta y un token de acceso válido

#### Scenario: Credenciales incorrectas

- **WHEN** el correo no corresponde a ninguna cuenta, o la contraseña no coincide
- **THEN** el sistema rechaza el intento (HTTP 400) con un mensaje genérico que no distingue si falló el correo o la contraseña, y no emite ningún token

### Requirement: Autenticación de las peticiones mediante token

The system SHALL identificar a la persona en cada petición a partir de un token de acceso presentado en la cabecera de autorización, y SHALL considerar válido cualquier token emitido mientras no se cierre sesión.

#### Scenario: Petición con token válido

- **WHEN** una petición a un recurso protegido incluye un token de acceso válido
- **THEN** el sistema la atiende como la persona dueña de ese token

#### Scenario: Petición sin token o con token inválido

- **WHEN** una petición a un recurso protegido no incluye token, o incluye uno inexistente o revocado
- **THEN** el sistema la rechaza (HTTP 401) y no entrega datos

#### Scenario: El token no caduca por tiempo

- **WHEN** se emite un token al registrarse o al iniciar sesión
- **THEN** ese token no lleva fecha de expiración y permanece válido indefinidamente hasta que se cierre la sesión que lo revoca

### Requirement: Cierre de sesión

The system SHALL permitir que una persona autenticada cierre su sesión, revocando el token utilizado en esa petición de forma que deje de ser válido.

#### Scenario: Cierre de sesión autenticado

- **WHEN** una persona autenticada solicita cerrar sesión
- **THEN** el sistema revoca el token usado en esa petición (deja de servir para futuras peticiones) y confirma la operación

#### Scenario: Cierre de sesión desde la aplicación web

- **WHEN** la persona pulsa "cerrar sesión" en la aplicación web
- **THEN** la aplicación descarta de inmediato el token guardado y la trata como anónima, y notifica al servidor en segundo plano sin bloquear ni depender de que esa notificación tenga éxito

### Requirement: Persistencia y revalidación de la sesión en la aplicación web

The system SHALL recordar la sesión entre recargas guardando el token en el navegador, y al arrancar SHALL revalidarlo contra el servidor antes de dar la sesión por buena.

#### Scenario: Revalidación con token válido

- **WHEN** la aplicación arranca y encuentra un token guardado que el servidor acepta
- **THEN** carga los datos de la persona y muestra la sesión como autenticada sin pedir volver a iniciar sesión

#### Scenario: Token rechazado al revalidar

- **WHEN** al arrancar, el servidor rechaza el token guardado por no ser válido (HTTP 401)
- **THEN** la aplicación borra el token guardado y pasa a estado anónimo

#### Scenario: Servidor no disponible al revalidar

- **WHEN** al arrancar, la revalidación falla por un error de red o del servidor (distinto de un rechazo por token inválido)
- **THEN** la aplicación conserva el token guardado pero muestra la sesión como anónima en esa carga, de modo que pueda reintentarse en una recarga posterior

#### Scenario: Estado de carga mientras se revalida

- **WHEN** la revalidación inicial todavía está en curso
- **THEN** la sesión se mantiene en un estado de "cargando", sin considerarse todavía ni autenticada ni anónima

### Requirement: Consulta del perfil propio

The system SHALL exponer los datos de la cuenta autenticada —identificador, nombre, correo, fechas de creación y actualización, e iniciales derivadas— únicamente a quien presente un token válido, y SHALL no incluir nunca la contraseña.

#### Scenario: Perfil con sesión válida

- **WHEN** una persona autenticada consulta su perfil
- **THEN** recibe sus datos públicos, sin que la respuesta incluya la contraseña en ninguna forma

#### Scenario: Iniciales derivadas

- **WHEN** la cuenta tiene nombre
- **THEN** las iniciales se derivan del nombre; y si la cuenta no tiene nombre, se derivan del correo

### Requirement: Protección de rutas en la aplicación web

The system SHALL impedir el acceso a las páginas privadas a quien no tenga sesión iniciada, y SHALL impedir el acceso a las páginas de registro e inicio de sesión a quien ya la tenga.

#### Scenario: Persona anónima abre una página privada

- **WHEN** alguien sin sesión abre una ruta privada (por ejemplo, el perfil)
- **THEN** la aplicación lo redirige a la página de inicio de sesión

#### Scenario: Persona autenticada abre registro o inicio de sesión

- **WHEN** alguien con sesión abre la página de inicio de sesión o la de registro
- **THEN** la aplicación lo redirige a su perfil

#### Scenario: Ruta inexistente

- **WHEN** alguien abre una ruta que no existe
- **THEN** la aplicación lo redirige a la zona privada por defecto (el perfil), que a su vez aplica las reglas de protección anteriores

#### Scenario: Durante la revalidación inicial

- **WHEN** el estado de la sesión aún se está determinando al arrancar
- **THEN** la aplicación muestra carga y no redirige hasta resolver si la persona está autenticada o es anónima

### Requirement: Formato de las respuestas de datos y de los errores

The system SHALL envolver las respuestas que devuelven datos (cuenta, perfil, token) en un objeto con una propiedad de datos, y SHALL comunicar los fallos de validación como una lista de errores que identifican el campo y el motivo.

#### Scenario: Respuesta con datos

- **WHEN** un endpoint devuelve datos correctamente
- **THEN** el cuerpo de la respuesta presenta esos datos bajo una propiedad de datos

#### Scenario: Error de validación

- **WHEN** la validación de una petición falla
- **THEN** el sistema responde HTTP 422 con una lista de errores, cada uno con el campo afectado y el motivo, que la aplicación web traduce a mensajes en castellano junto a cada campo

---

## Anexos del ejercicio

### 1. Requisitos generados y comprobación

Se generaron **8 requisitos**. Su estado de comprobación por tu parte es:

- **Verificados completamente por ti: 0.**
- **Revisados parcialmente por ti: 1** — el de registro (requisito 1), por lectura directa de código. No se revisaron todos sus escenarios ni se hicieron pruebas de ejecución.
- **Pendientes: 7** (requisitos 2 a 8).

| # | Requisito | Verificado en el código (por Claude) | Comprobado por ti revisando el código |
|---|-----------|:---:|:---:|
| 1 | Registro de una cuenta nueva | Sí | Parcial (lectura directa) |
| 2 | Inicio de sesión | Sí | Pendiente |
| 3 | Autenticación de las peticiones mediante token | Sí | Pendiente |
| 4 | Cierre de sesión | Sí | Pendiente |
| 5 | Persistencia y revalidación de la sesión | Sí | Pendiente |
| 6 | Consulta del perfil propio | Sí | Pendiente |
| 7 | Protección de rutas en la aplicación web | Sí | Pendiente |
| 8 | Formato de las respuestas de datos y de los errores | Sí | Pendiente |

**Exploración general por Claude: 8 de 8.** La exploración inicial del backend y del frontend la hizo Claude, por lectura directa del código; dos puntos se confirmaron además inspeccionando el framework (la regla de correo único y los códigos HTTP 422/400/401). Esta exploración no sustituye tu comprobación personal.

**Comprobado por ti: 0 verificados completamente, 1 revisado parcialmente.** Revisaste personalmente el requisito 1 (registro) mediante lectura directa de tres archivos —el validador de usuario, el controlador de alta de cuenta y el modelo de usuario—, confirmando las reglas del correo, la longitud de la contraseña y su confirmación, la creación del usuario y del token, y que el modelo usa `withAuthFinder(hash)`. No revisaste todos los escenarios de ese requisito ni hiciste pruebas de ejecución, por eso queda como "Parcial". Los otros 7 requisitos siguen pendientes de tu comprobación.

> Nota: la única afirmación que **no** pude comprobar ejecutando el sistema es el comportamiento ante **registros simultáneos con el mismo correo** (ver inconsistencia 1 y punto abierto 6); está deducida del código, no probada en ejecución.

### 2. Inconsistencias encontradas y dónde aparecen

1. **La confirmación de cierre de sesión no sigue el formato del resto de la API.** Todos los endpoints envuelven los datos en una propiedad `data`, pero la respuesta de cierre de sesión devuelve un objeto plano con un mensaje, sin envolver. Aparece en el controlador de tokens de acceso (`backend/app/controllers/access_tokens_controller.ts`, método `destroy`).

2. **La forma de los datos de la cuenta no es homogénea entre endpoints.** En el perfil, los campos de la cuenta van directamente bajo `data`; en registro e inicio de sesión, van anidados bajo `data.user` junto al token. Aparece en `backend/app/controllers/profile_controller.ts` frente a `new_account_controller.ts` y `access_tokens_controller.ts`.

3. **La validación nativa del navegador está desactivada en los formularios web.** Los formularios usan `noValidate`, por lo que atributos como `required`, `type="email"` o `minLength` no validan nada; la única validación real en el cliente es la coincidencia de contraseñas en el registro. Aparece en `frontend/src/pages/register-page.tsx` y `frontend/src/pages/login-page.tsx`.

4. **El nombre es "nulable" pero no "opcional" en la API.** El campo debe viajar en la petición (puede ser nulo), de modo que un cliente que **omita** la clave recibiría un 422. La aplicación web lo envía siempre (nulo si está vacío), así que el desajuste solo afectaría a otros clientes. Aparece en `backend/app/validators/user.ts`.

5. **El nombre no tiene longitud máxima**, ni en el cliente ni en el servidor, a diferencia del correo (máx. 254) y la contraseña (8–32). Aparece en `backend/app/validators/user.ts` y en la página de registro.

6. **El guard de sesión está configurado pero no se usa.** La autenticación real es por token; aun así hay un guard de sesión definido y el middleware de sesión sigue registrado globalmente. Aparece en `backend/config/auth.ts` y `backend/start/kernel.ts`.

7. **No hay un manejo global del 401 en la aplicación web.** El token solo se valida/limpia al arrancar y al cerrar sesión; si caducara o se revocara con la sesión ya montada, nada lo detectaría hasta recargar. Hoy el impacto es bajo porque solo hay dos llamadas autenticadas. Aparece en `frontend/src/lib/api.ts` y `frontend/src/auth/auth-provider.tsx`.

8. **El motivo de la sesión caída se muestra en inicio de sesión pero no en registro.** Aparece en `frontend/src/pages/login-page.tsx` (muestra el motivo) frente a `register-page.tsx` (no lo muestra).

9. **Detalles menores confirmados en código:** el dato de "fecha de actualización" se expone en la API pero no se usa en la interfaz; en desarrollo, el modo estricto de React provoca una doble llamada de revalidación del perfil al arrancar; ciertos errores 422 pueden mostrarse a la vez junto al campo y en el aviso general; y las rutas desconocidas no tienen una página 404 propia. Aparecen en `frontend/src/lib/api.ts`, `frontend/src/main.tsx`, `frontend/src/auth/use-auth-form.ts` y `frontend/src/routes/app-routes.tsx`.

### 3. Comportamientos que no sabemos si son errores o decisiones

1. **Los tokens de acceso no caducan.**
   - *Como decisión:* simplifica un proyecto de práctica y da una sesión persistente cómoda, sin tener que renovar tokens.
   - *Como error:* es un riesgo de seguridad; un token filtrado sirve indefinidamente y no hay rotación ni caducidad que limite el daño.

2. **La confirmación de cierre de sesión (y la forma distinta de los datos en registro/login frente a perfil) rompe la uniformidad de la API.**
   - *Como decisión:* el cierre de sesión no devuelve "datos" sino una confirmación, y agrupar `user` + `token` puede verse como una conveniencia para el cliente.
   - *Como error:* obliga al cliente a tratar respuestas con formas distintas y contradice la convención de envolver todo en `data`.

3. **Al fallar la revalidación por red/servidor, se conserva el token pero la sesión queda anónima sin reintento automático.**
   - *Como decisión:* tolera caídas temporales del backend y permite recuperar la sesión en una recarga posterior sin perder el token.
   - *Como error:* la persona queda "anónima" teniendo un token válido guardado, y no se reintenta solo: hay que recargar a mano para recuperar la sesión.

4. **El nombre es obligatorio como clave aunque su valor pueda ser nulo.**
   - *Como decisión:* obliga al cliente a ser explícito sobre la ausencia de nombre (enviar nulo).
   - *Como error:* un cliente que simplemente no mande el campo recibe un 422 poco intuitivo para un dato "opcional".

5. **Los formularios web desactivan la validación nativa del navegador.**
   - *Como decisión:* evita los mensajes del navegador y centraliza la validación en el backend para dar mensajes consistentes en castellano.
   - *Como error:* se pierde el aviso inmediato en el cliente y quedan atributos (`minLength`, `type="email"`) presentes pero inertes, que inducen a pensar que validan cuando no lo hacen.

6. **Dos registros simultáneos con el mismo correo.**
   - *Como decisión:* es un caso muy improbable en un proyecto de práctica y, además, la base de datos tiene una restricción de unicidad que impide el duplicado igualmente.
   - *Como error:* la comprobación de correo único y la inserción no son atómicas, así que una colisión simultánea la frenaría la base de datos con un error crudo (probablemente un 500) en lugar del 422 claro que se da en el caso normal. No está probado en ejecución.

7. **Un inicio de sesión fallido responde con HTTP 400, no 401.**
   - *Como decisión:* es el valor por defecto del framework, que separa "no autenticado" (401, al acceder a recursos protegidos) de "credenciales incorrectas en el login" (400).
   - *Como error:* muchos clientes esperan 401 para un login fallido, por lo que puede sorprender a quien integre contra la API.
