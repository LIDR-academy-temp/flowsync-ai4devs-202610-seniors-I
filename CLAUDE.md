# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Qué es

FlowSync: monorepo con dos aplicaciones independientes (cada una con su `package.json` y su `node_modules`), TypeScript de punta a punta. Requiere Node.js 24+.

- `backend/` — API en AdonisJS 7 (ESM), Lucid ORM sobre SQLite (`better-sqlite3`, archivo `backend/tmp/db.sqlite3`), validación con VineJS, tests con Japa. Puerto 3333.
- `frontend/` — React 19 + Vite. Hoy es la plantilla de Vite sin tocar (`src/App.tsx`): sin router, sin librería de estado, sin framework CSS y sin cliente HTTP. Puerto 5173. El curso usa shadcn/ui (componentes copiados al repo, no una dependencia).

El `README.md` raíz es el enunciado del ejercicio del curso (no documentación técnica). `prompts.md` es un entregable del ejercicio: registro de los prompts lanzados.

## Comandos

Backend (desde `backend/`):

```bash
npm run dev                 # node ace serve --hmr
npm run typecheck           # tsc --noEmit
npm run lint                # eslint
npm run format              # prettier --write
npm test                    # node ace test (todas las suites)
node ace test functional    # una suite (unit | functional)
node ace test --files=tests/functional/auth/login.spec.ts   # un archivo
node ace test --tests="nombre exacto del test"              # un test concreto
node ace migration:run      # aplica migraciones y regenera database/schema.ts
node ace make:migration <nombre> | make:controller | make:validator | make:test
```

Primer arranque: `npm install && cp .env.example .env && node ace generate:key && node ace migration:run`.

Frontend (desde `frontend/`):

```bash
npm run dev      # vite
npm run lint     # oxlint
npx tsc -b       # typecheck (también lo ejecuta npm run build)
npm run build
```

El frontend no tiene test runner ni formateador.

## Arquitectura del backend

**Rutas** (`start/routes.ts`): todo cuelga de `/api/v1`. Los controladores se referencian mediante `controllers.X` importado de `#generated/controllers`, no con imports directos.

| Método | Ruta | Controlador | Auth |
|---|---|---|---|
| POST | `/api/v1/auth/signup` | `NewAccountController.store` | no |
| POST | `/api/v1/auth/login` | `AccessTokensController.store` | no |
| GET | `/api/v1/account/profile` | `ProfileController.show` | sí |
| POST | `/api/v1/account/logout` | `AccessTokensController.destroy` | sí |

**Código generado — no editar a mano:**
- `.adonisjs/` lo regeneran los hooks de `adonisrc.ts` (`indexEntities`, `generateRegistry` de Tuyau) al arrancar/compilar: índice de controladores (`#generated/controllers`), registro tipado de rutas (lo usan los tests vía `RoutesRegistry`).
- `database/schema.ts` lo genera `node ace migration:run` a partir de las tablas. Los modelos **extienden** esas clases (`User extends compose(UserSchema, withAuthFinder(hash))`), así que las columnas se añaden con una migración nueva, no declarándolas en el modelo. Reglas de generación personalizadas en `database/schema_rules.ts`.

**Flujo de una petición:** controlador → `request.validateUsing(validator)` (VineJS, `app/validators/`) → modelo Lucid → `ctx.serialize(Transformer.transform(model))`.
- `ctx.serialize` lo añade `providers/api_provider.ts` y **envuelve toda respuesta en `{ data: ... }`** (y añade metadatos de paginación de Lucid). Usa `serialize.withoutWrapping` si no se quiere el envoltorio.
- Los transformers (`app/transformers/`) deciden qué campos se exponen (`UserTransformer` devuelve `id, fullName, email, createdAt, updatedAt, initials`).
- `force_json_response_middleware` fuerza `Accept: application/json` en todas las peticiones, por lo que los errores (validación, auth) siempre salen como JSON.

**Autenticación:** guard por defecto `api` = access tokens opacos en BD (`DbAccessTokensProvider`, tabla `auth_access_tokens`), con prefijo `oat_`. Se envían como `Authorization: Bearer <token>`. Signup y login devuelven `{ data: { user, token } }`. Existe también un guard `web` de sesión, sin usar por las rutas.

**Contrato de validación (`app/validators/user.ts`)** — más estricto de lo que suele asumirse:
- signup: `fullName` (string, nullable), `email` (email, máx. 254, **único** en `users`), `password` (8–32 caracteres) y **`passwordConfirmation` obligatorio**, igual a `password`.
- login: `email` (email) y `password` (string).

**CORS:** en desarrollo acepta cualquier origen (`app.inDev ? true : []`), con `credentials: true`.

## Tests (backend)

Suites definidas en `adonisrc.ts`: `unit` → `tests/unit/**/*.spec.ts`, `functional` → `tests/functional/**/*.spec.ts`. Todavía no hay ningún test; solo `tests/bootstrap.ts`, que registra los plugins `assert`, `apiClient`, `authApiClient` (permite `.loginAs(user)`), `sessionApiClient` y `dbAssertions`, y levanta el servidor HTTP para la suite funcional. `.env.test` fija `SESSION_DRIVER=memory`.

## Convenciones

- Imports del backend con los alias de subpath de `package.json` (`#controllers/*`, `#models/*`, `#validators/*`, `#services/*`, `#transformers/*`, `#start/*`, `#config/*`…), no con rutas relativas.
- Formato del backend: `@adonisjs/prettier-config`; lint: `@adonisjs/eslint-config`. Frontend: oxlint (`react/rules-of-hooks` como error).

## Reglas de proceso

Obligatorias en toda tarea que toque código:

1. **Rama nueva antes de tocar código.** Nunca se trabaja sobre `main` ni sobre la rama en la que estés: crea una rama desde la actual antes del primer cambio (`feat/<clave-jira>-<slug>`, p. ej. `feat/KAN-4-login-frontend`; `fix/…` para correcciones).
2. **Al cerrar, `/commit`.** Prepara los cambios (`git add` de lo que pertenece a la tarea) y usa la skill `/commit`; no escribas el mensaje a mano.
3. **Después, el pull request con `gh pr create`**: push de la rama y PR contra `main`, con título convencional y en el cuerpo los criterios de aceptación del ticket y la clave de Jira.
4. **Después, el subagente `adversarial-reviewer` sobre el pull request.** Si encuentra bloqueantes, corrígelos en la misma rama, vuelve a commitear con `/commit` y repite la revisión.
5. **En el chat, solo la URL del pull request.** El mensaje final es la URL y nada más: ni resumen, ni lista de cambios, ni informe del revisor.
