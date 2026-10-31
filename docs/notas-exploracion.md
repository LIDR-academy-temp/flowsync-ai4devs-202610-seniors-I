# Cuentas y acceso de FlowSync: comportamiento actual

**Cómo lo comprobé**
- **API:** ejecuté los casos marcados con `[E]` con `curl` contra una copia desechable del backend, con su propia BD, en el scratchpad. Los demás salen de leer el código.
- **Frontend:** todo sale de leer el código; no lo he abierto en un navegador.
- **Repo:** no he modificado nada. El cambio en `prompts.md` y el `docs/spec-viva/` sin seguimiento tienen fecha de antes de esta exploración.

## 1. Comportamientos candidatos a requisito

### API

1. `POST /api/v1/auth/signup` con datos válidos responde **200** y `{data:{user,token}}`, con la cuenta ya creada y la sesión iniciada. `[E]` [new_account_controller.ts:7-16](backend/app/controllers/new_account_controller.ts#L7-L16)
2. `POST /api/v1/auth/signup`, `POST /api/v1/auth/login` y `GET /api/v1/account/profile` devuelven en el usuario `id, fullName, email, createdAt, updatedAt, initials`, nunca la contraseña. `[E]` [user_transformer.ts:6-13](backend/app/transformers/user_transformer.ts#L6-L13)
3. `POST /api/v1/auth/signup` exige un `email` con formato válido, de 254 caracteres como máximo y no registrado; si no, responde 422 con la regla `email`, `maxLength` o `database.unique`. Probé `email` y `database.unique`; el límite de 254 sale de leer el validador. `[E]` [validators/user.ts:6,14](backend/app/validators/user.ts#L6)
4. `POST /api/v1/auth/signup` exige una `password` de entre 8 y 32 caracteres, y una `passwordConfirmation` con la misma regla y el mismo valor; si no, 422. `[E]` [validators/user.ts:7,15-16](backend/app/validators/user.ts#L7)
5. `POST /api/v1/auth/signup` exige la clave `fullName`, que admite `null`. Si falta, 422 `required`; `""` y `"   "` se guardan como `null`. `[E]` [validators/user.ts:13](backend/app/validators/user.ts#L13), [bodyparser.ts:33](backend/config/bodyparser.ts#L33)
6. `POST /api/v1/auth/login` con credenciales correctas responde 200 y `{data:{user,token}}`, con un token nuevo en cada login (prefijo `oat_`). `[E]` [access_tokens_controller.ts:7-17](backend/app/controllers/access_tokens_controller.ts#L7-L17)
7. `POST /api/v1/auth/login` da la misma respuesta con una contraseña incorrecta o un email inexistente: 400 `Invalid user credentials`. `[E]` [access_tokens_controller.ts:10](backend/app/controllers/access_tokens_controller.ts#L10)
8. `POST /api/v1/auth/login` responde 422 con un email vacío o mal formado, o con una contraseña vacía. La contraseña no tiene reglas de longitud en esta ruta. `[E]` [validators/user.ts:23-26](backend/app/validators/user.ts#L23-L26)
9. `GET /api/v1/account/profile` con un token válido responde 200 y `{data:user}`. `[E]` [profile_controller.ts:5-7](backend/app/controllers/profile_controller.ts#L5-L7)
10. `GET /api/v1/account/profile` y `POST /api/v1/account/logout` responden 401 `{errors:[{message:"Unauthorized access"}]}` sin token, con un token inválido o con uno revocado. `[E]` [routes.ts:28-35](backend/start/routes.ts#L28-L35)
11. `POST /api/v1/account/logout` revoca solo el token usado y responde 200 `{message:"Logged out successfully"}`. Repetirlo con ese token da 401. `[E]` [access_tokens_controller.ts:19-28](backend/app/controllers/access_tokens_controller.ts#L19-L28)
12. Tras `POST /api/v1/account/logout`, los demás tokens del usuario siguen funcionando en `GET /api/v1/account/profile`. `[E]` [access_tokens_controller.ts:22](backend/app/controllers/access_tokens_controller.ts#L22)
13. `POST /api/v1/auth/signup` y `POST /api/v1/auth/login` no rechazan una petición por llevar un token inválido; el login probado responde 200. `[E]` [silent_auth_middleware.ts:11-15](backend/app/middleware/silent_auth_middleware.ts#L11-L15)
14. El campo `initials` de `POST /api/v1/auth/signup`, `POST /api/v1/auth/login` y `GET /api/v1/account/profile` usa las iniciales de las dos primeras palabras del nombre (`AL`) o los dos primeros caracteres si hay una sola (`Ada` → `AD`). Sin nombre, usa la primera letra del email antes y después de la arroba (`c@x.com` → `CX`). `[E]` [user.ts:11-17](backend/app/models/user.ts#L11-L17)

### Frontend

**Rutas y sesión**

1. Sin sesión, `/profile` redirige a `/login`. [protected-route.tsx:13](frontend/src/routes/protected-route.tsx#L13)
2. Con sesión, `/login` y `/register` redirigen a `/profile`. [public-only-route.tsx:13](frontend/src/routes/public-only-route.tsx#L13)
3. Cualquier otra ruta redirige a `/profile`, y de ahí se aplican los puntos anteriores. [app-routes.tsx:20](frontend/src/routes/app-routes.tsx#L20)
4. Mientras se valida el token guardado, las rutas muestran un loader y no redirigen. [protected-route.tsx:12](frontend/src/routes/protected-route.tsx#L12), [public-only-route.tsx:12](frontend/src/routes/public-only-route.tsx#L12)
5. La sesión se mantiene al recargar. [auth-provider.tsx:30-39,43-56](frontend/src/auth/auth-provider.tsx#L30-L56)
6. Al cargar la app, un token guardado se valida contra `GET /account/profile`. [auth-provider.tsx:43-56](frontend/src/auth/auth-provider.tsx#L43-L56)
7. Si esa validación da 401, se borra el token y el login muestra «Tu sesión ha caducado…». [auth-provider.tsx:60-62](frontend/src/auth/auth-provider.tsx#L60-L62), [api.ts:75-79](frontend/src/lib/api.ts#L75-L79)
8. Con otro error (red o 5xx), el token se conserva, la app queda anónima y el login muestra el error; recargar vuelve a intentarlo. [auth-provider.tsx:63-70](frontend/src/auth/auth-provider.tsx#L63-L70)
9. El logout cierra la sesión local primero y luego llama al backend, ignorando cualquier fallo de esa llamada. [auth-provider.tsx:98-107](frontend/src/auth/auth-provider.tsx#L98-L107)

**Formularios**

10. Login: unas credenciales incorrectas (400) muestran «El email o la contraseña no son correctos.» en un aviso general. [api.ts:83-85](frontend/src/lib/api.ts#L83-L85), [login-page.tsx:36-41](frontend/src/pages/login-page.tsx#L36-L41)
11. Los errores 422 se traducen al castellano y se muestran bajo cada campo; solo el primero por campo. [api.ts:87-96](frontend/src/lib/api.ts#L87-L96), [use-auth-form.ts:35-51](frontend/src/auth/use-auth-form.ts#L35-L51)
12. Un error de red muestra «No se pudo conectar…» y otros errores (404, 5xx) un mensaje genérico. [api.ts:98-101,125-130](frontend/src/lib/api.ts#L98-L101)
13. Registro: si las contraseñas difieren, muestra el error sin llamar al backend. [register-page.tsx:34-37](frontend/src/pages/register-page.tsx#L34-L37)
14. Registro: un nombre vacío o solo con espacios se envía como `null`. [register-page.tsx:42](frontend/src/pages/register-page.tsx#L42)
15. El formulario se puede enviar con campos vacíos y los errores los informa el servidor. [login-page.tsx:35](frontend/src/pages/login-page.tsx#L35), [register-page.tsx:55](frontend/src/pages/register-page.tsx#L55)
16. El botón de envío se desactiva y cambia de texto mientras se envía. [login-page.tsx:78-80](frontend/src/pages/login-page.tsx#L78-L80), [register-page.tsx:150-152](frontend/src/pages/register-page.tsx#L150-L152)
17. El perfil muestra iniciales, nombre (o «Sin nombre»), email, «Miembro desde» en formato `es-ES` y un botón de cerrar sesión. [profile-page.tsx:35-67](frontend/src/pages/profile-page.tsx#L35-L67)

## Cambios en los otros apartados

- **Apartado 2 (incoherencias):** no cambia, porque no incluía nada de cookies ni CORS.
- **Apartado 3 (dudosos):** quito el punto 8 (cookie de sesión) y el 10 (CORS). El de las iniciales pasa de 9 a 8, y el resto conserva su número.
## 2. Incoherencias

| # | Incoherencia | Ubicación |
|---|---|---|
| 1 | El logout responde sin envoltorio `{data}` y sin `serialize()`; los demás endpoints correctos lo usan. | [access_tokens_controller.ts:25-27](backend/app/controllers/access_tokens_controller.ts#L25-L27) |
| 2 | La UI impide entrar en login y registro con sesión activa, pero la API los acepta con un token válido y crea otro token u otra cuenta. `[E]` | [public-only-route.tsx:13](frontend/src/routes/public-only-route.tsx#L13), [routes.ts:20-26](backend/start/routes.ts#L20-L26) |
| 3 | El aviso de sesión perdida aparece en login pero no en registro, aunque ambas son rutas públicas a las que se llega con ese estado. | [login-page.tsx:23](frontend/src/pages/login-page.tsx#L23), [register-page.tsx:56](frontend/src/pages/register-page.tsx#L56) |
| 4 | El mensaje dice que la sesión «ha caducado», pero los tokens se crean sin expiración (`expires_at` nulo en todos). El 401 se debe a un token revocado o inválido. `[E]` | [api.ts:77](frontend/src/lib/api.ts#L77), [access_tokens_controller.ts:11](backend/app/controllers/access_tokens_controller.ts#L11) |
| 5 | El login evita revelar si un email existe, pero el registro lo confirma con «Ese email ya está registrado». `[E]` | [validators/user.ts:14](backend/app/validators/user.ts#L14), [api.ts:50-53](frontend/src/lib/api.ts#L50-L53) |
| 6 | El email y la contraseña tienen límite máximo, `fullName` no: se aceptó uno de 300 caracteres, aunque la columna se declara `string()`. `[E]` | [validators/user.ts:13](backend/app/validators/user.ts#L13), [migración:9](backend/database/migrations/1761885935168_create_users_table.ts#L9) |
| 7 | El frontend recorta `fullName` antes de enviarlo, pero el backend ya recorta todo el cuerpo, contraseñas incluidas. La comparación local usa los valores sin recortar: `"abc12345 "` y `"abc12345"` fallan en la UI y pasarían en la API. | [register-page.tsx:34,42](frontend/src/pages/register-page.tsx#L34) |
| 8 | Con una contraseña corta y distinta de la confirmación, la UI informa solo de la diferencia y la API solo de `minLength`, sin `sameAs`. `[E]` | [register-page.tsx:34](frontend/src/pages/register-page.tsx#L34) |
| 9 | Los errores de longitud empiezan en minúscula («la contraseña debe tener…»), y los demás en mayúscula. | [api.ts:61,63](frontend/src/lib/api.ts#L61) |
| 10 | `updatedAt` es `string` en el frontend y `DateTime \| null` en el esquema. Hoy siempre se rellena al crear, así que no llega a fallar. | [types.ts:10](frontend/src/lib/types.ts#L10), [schema.ts:49](backend/database/schema.ts#L49) |
| 11 | El mismo usuario devuelve fechas con milisegundos en signup (`.551`) y sin ellos después (`.000`), porque la respuesta sale antes de releer la BD. `[E]` | [new_account_controller.ts:10-15](backend/app/controllers/new_account_controller.ts#L10-L15) |
| 12 | El frontend trata cualquier 400 como credenciales incorrectas, y el backend también responde 400 a un JSON malformado. `[E]` El cliente actual siempre envía JSON válido, así que no se da hoy. | [api.ts:83-85](frontend/src/lib/api.ts#L83-L85) |

## 3. Comportamientos dudosos

**1. Emails que solo difieren en mayúsculas**
- **Qué pasa:** `ada@x.com` y `ADA@x.com` crean dos cuentas, y entrar con `ADA@x.com` cuando solo existe `ada@x.com` da 400. `[E]` ([validators/user.ts:6,14](backend/app/validators/user.ts#L6))
- **Bug:** es probable que sea la misma persona, y `unique` admite `caseInsensitive`, que aquí no se usa.
- **Diseño:** el email se trataría como un identificador literal.
- **Por qué no se decide:** no hay normalización, tests ni comentario que fijen la intención.

**2. Recorte de espacios en la contraseña**
- **Qué pasa:** `"  password1  "` se registra, y luego se entra tanto con espacios como sin ellos. `[E]` Lo hace el bodyparser con su configuración por defecto, sin nada explícito en [bodyparser.ts](backend/config/bodyparser.ts).
- **Bug:** se altera un secreto en silencio, y la longitud mínima se comprueba tras el recorte.
- **Diseño:** es un valor por defecto aceptable que perdona errores al copiar y pegar.
- **Por qué no se decide:** el proyecto no declara nada sobre este caso.

**3. Logout con fallo de red**
- **Qué pasa:** el token desaparece del navegador, pero sigue válido en el servidor y sin expiración. ([auth-provider.tsx:100-106](frontend/src/auth/auth-provider.tsx#L100-L106))
- **Diseño:** el comentario dice que el cierre local se hace «pase lo que pase».
- **Bug:** su justificación solo cubre el caso de un token que ya no vale, no un token vivo que nadie puede revocar.
- **Por qué no se decide:** el comentario no aclara si se aceptó ese riesgo.

**4. Tokens sin expiración y sin cierre global**
- **Qué pasa:** cada login acumula un token permanente, y el logout solo revoca uno. `[E]`
- **Diseño:** serían sesiones por dispositivo de larga duración.
- **Bug:** no hay forma de cerrar todas las sesiones ni de limpiar las antiguas, y el mensaje «caducado» sugiere que se esperaba una expiración.
- **Por qué no se decide:** `expiresIn` no se configura y nada documenta si fue a propósito.

**5. Sesión abierta con el token ya revocado**
- **Qué pasa:** el token solo se valida al cargar la app, sin gestión global de 401 ni evento `storage`. Si se cierra sesión en otra pestaña, esta sigue mostrando el perfil hasta recargar. ([auth-provider.tsx:43-82](frontend/src/auth/auth-provider.tsx#L43-L82))
- **Diseño:** el perfil no hace más llamadas, así que no hacía falta más.
- **Bug:** la sesión visible no refleja la real.
- **Por qué no se decide:** con una sola pantalla protegida, el código no muestra qué se espera cuando haya más.

**6. Registro con código 200**
- **Qué pasa:** crear una cuenta responde 200, no 201. `[E]`
- **Diseño:** el frontend solo mira `response.ok`, así que le da igual, y login y registro quedan uniformes.
- **Bug:** es un descuido respecto a la convención REST.
- **Por qué no se decide:** nada en el código fija ese código de estado.

**7. Sin límite de intentos en login y registro**
- **Qué pasa:** no hay limitador en [kernel.ts](backend/start/kernel.ts), [routes.ts](backend/start/routes.ts) ni en las dependencias.
- **Diseño:** se habría dejado fuera por ser un proyecto de práctica.
- **Bug:** es un hueco de seguridad, sobre todo porque la contraseña no tiene más protección.
- **Por qué no se decide:** el código solo muestra la ausencia, no el motivo.

**8. Iniciales con varios espacios en el nombre**
- **Qué pasa:** `"Ada  Lovelace"` genera `AD` en lugar de `AL`, porque `split(' ')` deja un elemento vacío. `[E]` ([user.ts:12](backend/app/models/user.ts#L12))
- **Bug:** es lo más probable, aunque el código nunca dice qué formatos de nombre espera.
- **Diseño:** bastaría con admitir solo la separación por un espacio y aceptar el resultado en otros casos.
- **Por qué no se decide:** ni el validador ni los tests definen un formato de nombre.

