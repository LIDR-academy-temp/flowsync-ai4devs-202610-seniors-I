# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository overview

FlowSync is a course exercise repo (LIDR AI4Devs, cohort 202610-seniors-I) with two independent npm projects, each with its own `package.json` and `node_modules` — run commands from inside `backend/` or `frontend/`, there is no root workspace.

- `backend/` — AdonisJS 7 API (TypeScript, Lucid ORM on SQLite, VineJS, token auth). **It already exists and is not to be modified in this session**; it is read as the source of truth for what the API requires.
- `frontend/` — React 19 + Vite 8 + TypeScript. Still the bare Vite template (`src/App.tsx`): no router, no shadcn/ui, no path aliases, no formatter installed yet. This is where new work happens.
- `README.md` is generated from the course lesson (do not edit by hand). `prompts.md` is a template the student fills with the prompts they launched.

Requires Node.js 24+ (Node 20 fails with `Unknown file extension ".ts"`).

## Commands

Backend (`cd backend`):

```bash
npm install && cp .env.example .env && node ace generate:key   # first-time setup
node ace migration:run      # creates tmp/db.sqlite3 and regenerates database/schema.ts
npm run dev                 # http://localhost:3333 with HMR
npm test                    # node ace test (Japa); suites: unit, functional
node ace test functional    # one suite
node ace test --files=tests/functional/auth.spec.ts   # one file
node ace test --tests="test title"                    # one test by title
npm run lint                # eslint
npm run typecheck           # tsc --noEmit
npm run format              # prettier (@adonisjs/prettier-config)
```

No spec files exist yet; suites look in `tests/unit/**/*.spec.ts` and `tests/functional/**/*.spec.ts` (functional suite boots the HTTP server; `.env.test` uses in-memory sessions).

Frontend (`cd frontend`):

```bash
npm run dev       # http://localhost:5173
npm run build     # tsc -b && vite build (type errors fail the build)
npm run lint      # oxlint
```

No test runner is configured in the frontend.

## Backend architecture

Request flow: `start/routes.ts` → controller (`app/controllers`) → `request.validateUsing(validator)` (`app/validators`) → Lucid model (`app/models`) → `ctx.serialize(Transformer.transform(model))`.

- **Response envelope**: `providers/api_provider.ts` adds `ctx.serialize()`, which wraps every payload as `{ "data": ... }`. Clients must read `response.data`.
- **Auth**: default guard is `api` (opaque access tokens, prefix `oat_`, stored in `auth_access_tokens`). Send `Authorization: Bearer <token>`. Signup and login both return `{ data: { user, token } }`.
- **Routes** (all under `/api/v1`):
  - `POST auth/signup` — body `{ fullName (nullable), email, password, passwordConfirmation }`
  - `POST auth/login` — body `{ email, password }`
  - `GET account/profile`, `POST account/logout` — protected by `middleware.auth()`
- **Validation rules** (`app/validators/user.ts`): email ≤254 chars and unique on signup; password 8–32 chars; `passwordConfirmation` must equal `password`. Product tickets often omit these (e.g. `passwordConfirmation`) — check the validator rather than the ticket.
- **Errors**: `force_json_response_middleware` makes all responses JSON. VineJS failures return 422 with `{ errors: [{ field, rule, message }] }`; bad credentials from `User.verifyCredentials` return an `E_INVALID_CREDENTIALS` error.
- **UserTransformer** exposes only `id, fullName, email, createdAt, updatedAt, initials` (`initials` is a computed getter on the model).
- **CORS**: in dev every origin is allowed with credentials, so the Vite dev server can call `http://localhost:3333` directly (no Vite proxy is configured).
- Imports use subpath aliases from `package.json` `imports` (`#controllers/*`, `#models/*`, `#validators/*`, `#transformers/*`, `#generated/*`, ...) with `.js` resolution.

### Generated files — do not edit by hand

- `database/schema.ts` — generated from migrations by `node ace migration:run`; models extend these schema classes (`User extends compose(UserSchema, ...)`). Schema changes go in a new migration under `database/migrations/`, never in this file or the DB.
- `.adonisjs/` — regenerated on boot by `adonisrc.ts` hooks (`indexEntities`, Tuyau `generateRegistry`). Controllers are referenced in routes via `controllers.X` from `#generated/controllers`, and `backend/package.json` exports a typed route registry (`./registry`, `./data`) usable by a client.

@AGENTS.md