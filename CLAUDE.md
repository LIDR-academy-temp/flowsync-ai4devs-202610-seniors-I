# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Qué es este repo

FlowSync es el proyecto de ejercicio de un curso (LIDR, cohorte 202610-seniors-I). Es un monorepo con dos apps independientes, cada una con su propio `package.json` y `node_modules`, y sin workspace en la raíz:

- `backend/`: API en AdonisJS 7 (TypeScript, Lucid ORM, VineJS, SQLite vía better-sqlite3).
- `frontend/`: React 19 + Vite 8 + TypeScript. Por ahora es la plantilla de Vite sin modificar: no tiene router, cliente HTTP, shadcn/ui ni formateador.

Según el `README.md`, el backend **ya existe y no se modifica** en el ejercicio: el trabajo se hace en el frontend, y el backend se lee como contrato. `README.md` se genera a partir de la lección y no se edita a mano.

Requiere Node v24 o superior.

## Comandos

Backend (`cd backend`):

```bash
npm install
cp .env.example .env && node ace generate:key   # solo la primera vez
node ace migration:run      # crea tmp/db.sqlite3 y regenera database/schema.ts
npm run dev                 # node ace serve --hmr, en http://localhost:3333
npm test                    # node ace test (Japa)
node ace test --files=tests/functional/foo.spec.ts   # un archivo de test
node ace test functional    # una suite (unit | functional)
npm run lint                # eslint
npm run typecheck           # tsc --noEmit
npm run format              # prettier (@adonisjs/prettier-config)
```

Frontend (`cd frontend`, en otra terminal):

```bash
npm install
npm run dev      # Vite, en http://localhost:5173
npm run build    # tsc -b && vite build
npm run lint     # oxlint
```

El frontend no tiene tests configurados.

## Arquitectura del backend

- **Rutas** (`start/routes.ts`): todo cuelga de `/api/v1`.
  - `POST /api/v1/auth/signup` → `NewAccountController.store`
  - `POST /api/v1/auth/login` → `AccessTokensController.store`
  - `GET /api/v1/account/profile` → `ProfileController.show` (requiere auth)
  - `POST /api/v1/account/logout` → `AccessTokensController.destroy` (requiere auth)
- Los controladores se referencian a través de `#generated/controllers`, que es código generado en `.adonisjs/server/`. Lo regeneran los hooks `init` de `adonisrc.ts` (`indexEntities`, `generateRegistry` de Tuyau) al arrancar con `ace`. No se edita `.adonisjs/` a mano.
- **Auth**: el guard por defecto es `api` (tokens de acceso opacos guardados en BD, `DbAccessTokensProvider`). El cliente manda `Authorization: Bearer <token>`. También hay un guard `web` de sesión configurado, pero las rutas no lo usan.
- **Validación** (`app/validators/user.ts`): esto es lo que el ticket de producto no especifica y el frontend tiene que respetar.
  - signup: `email` (email válido, máximo 254, único en `users`), `password` (entre 8 y 32), `passwordConfirmation` (tiene que coincidir con `password`) y `fullName` opcional (string o null).
  - login: `email` y `password`.
  - Si el email ya existe, el signup falla en la validación con un error del campo `email`. Las credenciales inválidas en login las lanza `User.verifyCredentials`.
- **Forma de las respuestas**: `providers/api_provider.ts` añade `ctx.serialize()`, que envuelve la salida en `{ data: ... }`. Login y signup devuelven `{ data: { user, token } }`, y profile devuelve `{ data: user }`. Lo que se expone del usuario lo decide `app/transformers/user_transformer.ts` (`id`, `fullName`, `email`, `createdAt`, `updatedAt`, `initials`).
- `force_json_response_middleware` hace que todas las respuestas, también las de error, salgan en JSON.
- **CORS** (`config/cors.ts`): en desarrollo admite cualquier origen y `credentials: true`. En producción la lista de orígenes está vacía.
- **Modelos y esquema**: `database/schema.ts` se **genera** desde las migraciones (`node ace migration:run`) y no se edita a mano. Los modelos (`app/models/*.ts`) extienden esas clases generadas (`User extends compose(UserSchema, withAuthFinder(hash))`). Los cambios de esquema van en una migración nueva en `database/migrations/`, y los ajustes de generación en `database/schema_rules.ts`.
- Los imports usan los alias de subpath de `package.json` (`#models/*`, `#validators/*`, `#transformers/*`, `#start/*`, etc.) en vez de rutas relativas.
- Tests: Japa con `@japa/api-client`, configurados en `tests/bootstrap.ts`. Las suites están definidas en `adonisrc.ts` (`tests/unit/**`, `tests/functional/**`), pero todavía no hay ningún test escrito. `.env.test` usa `SESSION_DRIVER=memory`.

## Entrega del ejercicio

Se trabaja en la rama `harness-<iniciales>` (sobre un fork) y el PR va contra `LIDR-academy/flowsync-ai4devs-202610-seniors-I`. El PR solo lleva `docs/harness/comparacion.md` y `prompts.md`, con los prompts pegados tal cual se lanzaron, indicando modelo y herramienta.

## Reglas de proceso

1. Antes de tocar cualquier código, crea una rama nueva desde la rama actual con un nombre descriptivo (por ejemplo `feat/login-frontend`). Anota de qué rama partiste: será la base del PR.
2. Al terminar la implementación, prepara los cambios y haz el commit con la skill `/commit`. La skill pide confirmación del mensaje al usuario antes de commitear.
3. Haz push de la rama a `origin` (el fork `DarwinRey/flowsync-ai4devs-202610-seniors-I`) y abre el pull request con `gh pr create --repo DarwinRey/flowsync-ai4devs-202610-seniors-I --base <rama de partida>`. Los PRs de implementación van siempre contra el fork. **Nunca abras un PR contra `LIDR-academy`** (ni contra el remoto `upstream`): el PR de entrega del ejercicio lo abre el usuario a mano.
4. Después de abrir el PR, ejecuta el subagente `adversarial-reviewer` sobre ese PR y publica sus hallazgos como comentario en el PR con `gh pr comment <url> --repo DarwinRey/flowsync-ai4devs-202610-seniors-I --body-file -`. El subagente solo reporta: el comentario lo publica la sesión principal.
5. En el chat, al final, responde únicamente con la URL del pull request. Los hallazgos van en el comentario del PR, no en el chat.
