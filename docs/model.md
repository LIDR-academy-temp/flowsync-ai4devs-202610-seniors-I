# FlowSync — Modelo y estado actual (base de verdad)

> Documento vivo. Describe **lo que ya existe** en el repo para no reinventar nada al
> añadir funcionalidad. Si cambias el modelo de datos, las rutas o los contratos de API,
> **actualiza este fichero en el mismo PR**.
>
> Última revisión: 2026-10-25 (rama `s2/start`).

FlowSync es un gestor de tareas en equipo (proyecto de práctica del curso). Monorepo sin
workspaces: `backend/` (AdonisJS 7 + Lucid 22 + SQLite) y `frontend/` (React 19 + Vite 8).
Detalles de comandos y arquitectura en `CLAUDE.md`; aquí está **el qué**, no el cómo.

---

## 1. Qué hay construido hoy

El único dominio implementado es **autenticación de usuarios**. No existe todavía nada de
"tareas", "equipos" ni "proyectos" pese a que ese es el objetivo del producto.

Funcionalidades en marcha:

- **Registro** (self-signup) con nombre opcional, email y contraseña + confirmación.
- **Login** por email/contraseña, devuelve un access token opaco.
- **Perfil** del usuario autenticado.
- **Logout** (revoca el token actual).
- **Rehidratación de sesión** en el frontend: el token vive en `localStorage`
  (`flowsync.token`) y al arrancar se valida contra `GET /account/profile`.

---

## 2. Modelo de datos

SQLite en `backend/tmp/db.sqlite3`. El esquema se genera desde las migraciones a
`backend/database/schema.ts` (**no se edita a mano**); los modelos extienden la clase
generada y solo añaden relaciones/mixins/getters.

### Tabla `users`

Migración: `database/migrations/1761885935168_create_users_table.ts`
Modelo: `app/models/user.ts` → `class User extends compose(UserSchema, withAuthFinder(hash))`

| Columna      | Tipo            | Notas                                         |
|--------------|-----------------|-----------------------------------------------|
| `id`         | increments PK   | not null                                      |
| `full_name`  | string          | **nullable**                                  |
| `email`      | string(254)     | not null, **unique**                          |
| `password`   | string          | not null, hasheada; `serializeAs: null`       |
| `created_at` | timestamp       | not null, autoCreate                          |
| `updated_at` | timestamp       | nullable, autoCreate + autoUpdate             |

Añadidos en el modelo (no en el esquema):
- `static accessTokens = DbAccessTokensProvider.forModel(User)` — provider de tokens.
- `declare currentAccessToken?: AccessToken` — token con el que se autenticó la request.
- `get initials()` — iniciales derivadas de `fullName` (o del email si no hay nombre).

### Tabla `auth_access_tokens`

Migración: `database/migrations/1768620764696_create_access_tokens_table.ts`
Gestionada por `@adonisjs/auth` (`DbAccessTokensProvider`). Tokens **opacos**, no JWT.

| Columna        | Tipo      | Notas                                        |
|----------------|-----------|----------------------------------------------|
| `id`           | increments| PK                                           |
| `tokenable_id` | integer   | FK → `users.id`, `onDelete('CASCADE')`       |
| `type`         | string    | not null                                     |
| `name`         | string    | nullable                                     |
| `hash`         | string    | not null                                     |
| `abilities`    | text      | not null                                     |
| `created_at`   | timestamp |                                              |
| `updated_at`   | timestamp |                                              |
| `last_used_at` | timestamp | nullable                                     |
| `expires_at`   | timestamp | nullable (sin expiración configurada)        |

### Relaciones

- `users` 1 — N `auth_access_tokens` (vía `tokenable_id`). Borrar un usuario borra sus tokens.
- **No hay más tablas ni relaciones.** Todo el dominio de tareas está por construir.

---

## 3. API REST

Todas las rutas cuelgan de `/api/v1` (`start/routes.ts`). El servidor escucha en
`http://localhost:3333`. Guard por defecto: **`api`** (access tokens). El `web` (sesión)
está configurado pero sin uso.

| Método | Ruta                        | Controlador                      | Auth | Descripción                          |
|--------|-----------------------------|----------------------------------|------|--------------------------------------|
| GET    | `/`                         | inline                           | no   | `{ hello: 'world' }` (health check)  |
| POST   | `/api/v1/auth/signup`       | `NewAccountController.store`      | no   | Registro, devuelve `{ user, token }` |
| POST   | `/api/v1/auth/login`        | `AccessTokensController.store`    | no   | Login, devuelve `{ user, token }`    |
| GET    | `/api/v1/account/profile`   | `ProfileController.show`          | sí   | Perfil del usuario autenticado       |
| POST   | `/api/v1/account/logout`    | `AccessTokensController.destroy`  | sí   | Revoca el token actual               |

### Formato de respuesta

Toda respuesta pasa por `ctx.serialize()` (`providers/api_provider.ts`), que **envuelve el
payload en `{ data: ... }`**. Los controladores devuelven siempre un transformer, no el
modelo crudo. Para respuestas sin envoltorio: `serialize.withoutWrapping(...)`.

Forma del `User` serializado (`UserTransformer`, `app/transformers/user_transformer.ts`):

```json
{ "id", "fullName", "email", "createdAt", "updatedAt", "initials" }
```

(`password` nunca sale: es `serializeAs: null`.)

Respuesta de signup/login:

```json
{ "data": { "user": { ...User }, "token": "<opaque token>" } }
```

### Validación (VineJS 4, `app/validators/user.ts`)

Builders compartidos: `email()` = string email maxLength 254; `password()` = string 8–32.

- `signupValidator`: `fullName` (nullable), `email` (unique en `users.email`),
  `password`, `passwordConfirmation` (`.sameAs('password')`).
- `loginValidator`: `email`, `password`.

### Errores

- `422` → errores de validación VineJS por campo (`{ errors: [{ rule, field, meta }] }`).
- `400` → `E_INVALID_CREDENTIALS` (login fallido, sin `field`).
- `401` → token inválido/caducado.

---

## 4. Frontend

React 19 + Vite 8, escucha en `http://localhost:5173`. Tailwind v4 + shadcn/ui +
react-router. URL de API en `VITE_API_URL` (por defecto `http://localhost:3333`).

### Capa de API — `src/lib/api.ts` (único punto de contacto con el backend)

Envuelve `fetch`, desenvuelve el `{ data }`, adjunta `Authorization: Bearer` y traduce los
errores de VineJS/auth a `ApiError` (`message` ya en castellano + `fieldErrors` por campo).
**Toda llamada nueva a la API se añade aquí, no en los componentes.**

Funciones existentes: `signup`, `login`, `getProfile`, `logout`.

### Tipos — `src/lib/types.ts`

Espejo del backend: `User`, `AuthResult` (`{ user, token }`), `SignupPayload`,
`LoginPayload`. Mantener sincronizados con los transformers del backend.

### Auth — `src/auth/`

- `auth-provider.tsx`: token en `localStorage` (`flowsync.token`), rehidratado contra
  `GET /account/profile` al arrancar. Estados: `loading | authenticated | anonymous`.
- `auth-context.ts`, `use-auth.ts`, `use-auth-form.ts`.

### Rutas — `src/routes/app-routes.tsx`

| Ruta        | Página          | Guard                            |
|-------------|-----------------|----------------------------------|
| `/login`    | `LoginPage`     | `PublicOnlyRoute` (solo anónimo) |
| `/register` | `RegisterPage`  | `PublicOnlyRoute`                |
| `/profile`  | `ProfilePage`   | `ProtectedRoute` (autenticado)   |
| `*`         | → `/profile`    | redirección                      |

Páginas existentes: `login-page`, `register-page`, `profile-page`. No hay runner de tests.

---

## 5. Convenciones a respetar al añadir dominio nuevo

Al implementar tareas/equipos/lo-que-venga, seguir el mismo patrón que auth:

1. **Datos**: nueva migración → `node ace migration:run` (regenera `schema.ts`) → el modelo
   extiende la clase `*Schema` generada y solo añade relaciones/getters.
2. **API**: controlador en `app/controllers/`, ruta en `start/routes.ts` bajo `/api/v1`,
   protegida con `.use(middleware.auth())` cuando aplique.
3. **Validación**: validador VineJS en `app/validators/` con `vine.create({...})`, consumido
   con `request.validateUsing(...)`.
4. **Respuesta**: transformer en `app/transformers/` + `serialize(...)` (envoltura `{ data }`).
5. **Frontend**: añadir la llamada a `src/lib/api.ts`, el tipo espejo a `src/lib/types.ts`,
   y la pantalla/ruta correspondiente.
6. Usar imports por subpath (`#models/*`, `#controllers/*`, …) y el alias `@/*` en el front.
7. Tras tocar controladores/rutas, regenerar `.adonisjs/` (arrancar dev o tests) y commitear.
