# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Qué es este repo

FlowSync: monorepo de un ejercicio del curso AI4Devs con dos apps independientes, cada una con su propio `package.json` y `node_modules` (no hay workspace ni scripts en la raíz):

- `backend/`: API REST en AdonisJS 7 (TypeScript, Lucid ORM, VineJS, SQLite). **Ya existe y en este ejercicio no se modifica**: se lee para saber qué contrato tiene que respetar el frontend.
- `frontend/`: React 19 + Vite + TypeScript. Sigue siendo la plantilla de Vite (sin router, sin cliente HTTP, sin shadcn/ui instalado). El trabajo del ejercicio ocurre aquí; el README pide usar shadcn/ui para los componentes.

`README.md` es el enunciado del ejercicio (generado, no se edita a mano) y `prompts.md` es una plantilla que rellena el alumno.

Requiere Node.js 24 o superior (con versiones anteriores el backend falla con `Unknown file extension ".ts"`).

## Comandos

Backend (desde `backend/`):

```bash
npm install && cp .env.example .env && node ace generate:key   # primera vez
node ace migration:run      # aplica migraciones y regenera database/schema.ts
npm run dev                 # node ace serve --hmr → http://localhost:3333
npm test                    # Japa, todas las suites
node ace test functional    # una sola suite (unit | functional)
node ace test --files=tests/functional/auth.spec.ts   # un solo archivo
node ace test --tests="nombre del test"                # un solo test por título
npm run lint && npm run typecheck && npm run format
```

Frontend (desde `frontend/`):

```bash
npm run dev       # Vite → http://localhost:5173
npm run build     # tsc -b && vite build (el type-check va dentro del build)
npm run lint      # oxlint
npm run format    # prettier --write .
```

El frontend no tiene tests. Se formatea con Prettier (`frontend/.prettierrc.json`: sin punto y coma, comillas simples). Un hook `PostToolUse` de `.claude/settings.json` pasa Prettier sobre cada archivo de `frontend/` que el agente crea o edita, así que no hace falta formatear a mano después de una edición.

## Commits

Antes de cualquier commit (también con la skill `/commit`): mostrar el diff staged y el mensaje propuesto, y esperar a que el usuario los revise y apruebe. No commitear sin esa aprobación. Una aprobación vale solo para ese commit.

## Arquitectura del backend

Flujo de una petición: `start/routes.ts` → middleware (`start/kernel.ts`) → controlador → validador VineJS → modelo Lucid → transformer → `ctx.serialize()`.

- **Rutas bajo `/api/v1`**: `POST auth/signup`, `POST auth/login` (públicas); `GET account/profile` y `POST account/logout` (protegidas con `middleware.auth()`).
- **Controladores autodescubiertos**: las rutas referencian `controllers.NewAccount`, `controllers.AccessTokens`, etc., importados desde `#generated/controllers`. Ese archivo y todo `backend/.adonisjs/` los generan los hooks de `adonisrc.ts` (`indexEntities`, `generateRegistry` de Tuyau) al arrancar `node ace serve`/`build`. No se editan a mano; un controlador nuevo aparece ahí tras regenerar.
- **Modelos sobre esquema generado**: `database/schema.ts` lo genera `node ace migration:run` a partir de las migraciones ("DO NOT EDIT"). Los modelos extienden esas clases (`User extends compose(UserSchema, withAuthFinder(hash))`). Para cambiar columnas: migración nueva + `migration:run`, nunca editar `schema.ts` ni la tabla.
- **Respuestas envueltas en `data`**: `providers/api_provider.ts` añade `ctx.serialize()`, que envuelve la respuesta como `{ "data": ... }`. Los transformers (`app/transformers/`) deciden qué campos salen; `UserTransformer` expone `id, fullName, email, createdAt, updatedAt, initials` (`initials` es un getter del modelo, no una columna). Excepción: `logout` devuelve `{ "message": ... }` sin envolver.
- **Auth por access tokens**: guard por defecto `api` (tokens opacos con prefijo `oat_`, tabla `auth_access_tokens`). Signup y login devuelven `{ data: { user, token } }`; el cliente envía `Authorization: Bearer <token>`. También hay un guard `web` de sesión configurado, pero las rutas usan el de tokens.
- **Siempre JSON**: `force_json_response_middleware` fuerza `Accept: application/json`, así que todos los errores salen como `{ "errors": [...] }`.
- **CORS**: en desarrollo acepta cualquier origen con credenciales (`config/cors.ts`). Vite no tiene proxy configurado: el frontend llama a `http://localhost:3333` directamente.
- **Shield**: CSRF desactivado, así que los POST de la API no necesitan token CSRF.
- **Alias de imports**: `#controllers/*`, `#models/*`, `#validators/*`, `#transformers/*`, `#start/*`, `#config/*`, etc. (campo `imports` de `backend/package.json`).

## Contrato de la API que el frontend tiene que respetar

Definido en `backend/app/validators/user.ts`:

- **Signup** exige `fullName` (puede ser `null`, pero la clave debe ir), `email` (formato email, máx. 254, único en `users`), `password` (8–32 caracteres) y `passwordConfirmation` (igual que `password`). Si falta un campo, la respuesta es 422 `{"errors":[{"message","rule","field"}]}`.
- **Login** exige `email` y `password`. Si las credenciales son incorrectas, la respuesta es 400 `{"errors":[{"message":"Invalid user credentials"}]}`.
- Pedir una ruta protegida sin token devuelve 401 `{"errors":[{"message":"Unauthorized access"}]}`.

## Tests

Japa con dos suites definidas en `adonisrc.ts`: `unit` (`tests/unit/**/*.spec.ts`, timeout 2 s) y `functional` (`tests/functional/**/*.spec.ts`, timeout 30 s; levanta el servidor HTTP). Hoy solo existe `tests/bootstrap.ts`, sin specs. `.env.test` solo cambia `SESSION_DRIVER=memory`: la base de datos de test es el mismo `backend/tmp/db.sqlite3` que usa desarrollo.

## Reglas de proceso

1. **Rama nueva antes de tocar código.** Ningún cambio se hace sobre `main` ni sobre una rama ya existente de otra tarea.
2. **Al cerrar, `/commit` y después el pull request con `gh pr create`.** La aprobación del commit (sección «Commits») cubre el push y el PR de ese cierre; los siguientes cambios necesitan una aprobación nueva.
3. **Después, el subagente `adversarial-reviewer` revisa el pull request.**
4. **En el chat, solo la URL del pull request.**
