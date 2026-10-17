# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

FlowSync is a two-package monorepo used as a teaching project: an AdonisJS 7 API (`backend/`) and a React 19 + Vite SPA (`frontend/`), both TypeScript end-to-end. The two packages are independent npm projects (no workspace tooling, no root `package.json`) — always `cd` into the relevant package before running commands.

**Backend (`backend/`) is pre-built auth and is not meant to be modified in this exercise** — only read/consumed from the frontend. It already implements signup, login, logout, and a protected profile endpoint. **Frontend (`frontend/`) is a bare Vite+React starter** (no router, no UI library installed yet) — this is where implementation work happens.

## Commands

### Backend (`cd backend`)
- `npm run dev` — start the API with HMR on `http://localhost:3333`
- `npm run build` — production build (`node ace build`)
- `npm run test` — run Japa tests (`node ace test`)
- `npm run lint` — ESLint (`@adonisjs/eslint-config`)
- `npm run format` — Prettier write (`@adonisjs/prettier-config`: no semicolons, single quotes)
- `npm run typecheck` — `tsc --noEmit`
- One-time setup: `cp .env.example .env && node ace generate:key && node ace migration:run`
- `node ace migration:run` — apply new migrations (SQLite file at `backend/tmp/db.sqlite3`); never hand-edit the DB schema, always add a migration under `database/migrations/`

### Frontend (`cd frontend`)
- `npm run dev` — Vite dev server on `http://localhost:5173`
- `npm run build` — `tsc -b && vite build`
- `npm run lint` — oxlint
- `npm run format` — Prettier write (no semicolons, single quotes, printWidth 100, es5 trailing commas — see `.prettierrc.json`)
- `npm run preview` — preview the production build

Run backend and frontend in separate terminals; the backend must stay running for the frontend to call it.

## Architecture

### Backend: AdonisJS 7 layers

Requests flow through named layers (standard AdonisJS conventions, not FlowSync-specific, but worth knowing to navigate this repo):
- **Routes** (`start/routes.ts`) — all API routes are under `/api/v1`, grouped as `auth/*` (signup, login — public) and `account/*` (profile, logout — behind `middleware.auth()`). Controllers are referenced via the generated `#generated/controllers` registry (Tuyau), not by direct import.
- **Controllers** (`app/controllers/*.ts`) — one per resource action, thin: validate → call model → serialize via a transformer.
- **Validators** (`app/validators/*.ts`, VineJS) — define the exact accepted request shape. Product tickets rarely spell out validation rules in full (e.g. password length/confirmation); the validator is the source of truth when a ticket is ambiguous.
- **Models** (`app/models/*.ts`, Lucid) — `User` composes `UserSchema` (generated, read-only — see below) with `withAuthFinder` for credential verification and `DbAccessTokensProvider` for token issuance.
- **Transformers** (`app/transformers/*.ts`) — control exactly what's serialized back to the client (e.g. `UserTransformer` exposes `id, fullName, email, createdAt, updatedAt, initials` and never the password hash).
- **Migrations** (`database/migrations/*.ts`) — versioned schema changes; `database/schema.ts` (`UserSchema`, `AuthAccessTokenSchema`) is auto-generated from migrations by `node ace migration:run` — it is annotated "DO NOT EDIT manually."

### Auth model

- Two guards are configured (`config/auth.ts`): `api` (token-based, default — used by the SPA) and `web` (session-based, unused by the frontend flow).
- Tokens come from `POST /api/v1/auth/signup` or `POST /api/v1/auth/login` as `{ user, token }`, where `token` is the bearer value to send as `Authorization: Bearer <token>` on subsequent requests (AdonisJS access tokens are prefixed `oat_`).
- Protected routes use `auth.getUserOrFail()` inside the controller; there is no session cookie involved in the API guard.
- `POST /api/v1/account/logout` revokes the current token server-side.

### API surface the frontend must integrate with

- `POST /api/v1/auth/signup` — body `{ fullName?, email, password, passwordConfirmation }` → `{ user, token }`
- `POST /api/v1/auth/login` — body `{ email, password }` → `{ user, token }`
- `GET /api/v1/account/profile` — bearer token required → serialized user
- `POST /api/v1/account/logout` — bearer token required → `{ message }`
- Validation and auth failures come back as AdonisJS's standard error shape (via `app/exceptions/handler.ts`), not a custom envelope — don't assume a bespoke error format without checking a real response.

### CORS

`config/cors.ts` allows all origins in dev (`app.inDev`) and credentials are enabled; in production it's an explicit allowlist via `CORS_ORIGIN`. No frontend changes needed for local dev CORS.

### Frontend

Currently the default Vite React template (`src/App.tsx`, counter + Vite/React links) with no routing library, no UI library, and no API client set up. shadcn/ui components are meant to be copied into the repo (not installed as a dependency) as screens are built. Prettier config lives at `frontend/.prettierrc.json`; lint is oxlint (`.oxlintrc.json`), not ESLint.

## Conventions worth preserving

- Backend: no semicolons, single quotes (Prettier via `@adonisjs/prettier-config`); subpath imports use the `#controllers/*`, `#models/*`, `#validators/*`, etc. aliases defined in `backend/package.json`'s `imports` field — never deep relative imports across layers.
- Frontend: no semicolons, single quotes, 100-char print width (`.prettierrc.json`).
- Never edit `backend/database/schema.ts` directly — it's regenerated from migrations.

## Process

- Crear una rama nueva antes de tocar código.
- Al cerrar el trabajo, usar /commit y abrir el pull request con gh pr create.
- Después, lanzar el subagente adversarial-reviewer sobre el pull request.
- En el chat, al terminar, responder solo con la URL del pull request.
