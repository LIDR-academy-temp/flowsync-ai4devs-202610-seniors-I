# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

FlowSync: a training exercise repo (LIDR-academy cohort 202610-seniors-I). It is a monorepo with two apps:

- `backend/`: AdonisJS 7 (TypeScript, ESM), SQLite via better-sqlite3, Lucid ORM, VineJS validators, token auth (`access_tokens`).
- `frontend/`: React 19 + Vite 8 + TypeScript. Still the default Vite template (`src/App.tsx`). No router, no UI kit, no tests yet.

The current task (see `README.md`) is to implement login/signup in the frontend against the existing backend. The backend is already complete for auth and should be read, not modified, during that task.

## Requirements

- Node.js 24 or newer. With Node 20/18 the backend fails with `Unknown file extension ".ts"` or `The requested module 'module' does not provide an export named 'register'`.
- Backend listens on `http://localhost:3333`, frontend on `http://localhost:5173`. Run each in its own terminal.

## Commands

Backend (run from `backend/`):

```bash
npm install
cp .env.example .env && node ace generate:key   # first time only
node ace migration:run                           # after pulling new migrations
npm run dev                                      # HMR dev server
npm run typecheck
npm run lint
npm run test                                     # runs all suites (unit, functional)
```

Frontend (run from `frontend/`):

```bash
npm install
npm run dev
npm run build      # tsc -b && vite build
npm run lint       # oxlint, config in .oxlintrc.json
```

There is no single-test script in `package.json`. To run one backend spec, pass its path to `node ace test` (check `node ace test --help` for the exact flag on your Node version).

## Backend structure

Routes are defined in `backend/start/routes.ts`. Everything API lives under `/api/v1`:

- `POST /auth/signup` → `NewAccountController.store`: validates with `signupValidator`, creates the user, returns `{ user, token }`.
- `POST /auth/login` → `AccessTokensController.store`: validates with `loginValidator`, calls `User.verifyCredentials`, returns `{ user, token }`.
- `GET /account/profile` and `POST /account/logout` are behind `middleware.auth()` (the `api` tokens guard).

Request flow: server middleware (`start/kernel.ts`) → router middleware (bodyparser, session, shield, auth init, silent auth) → controller → validator (`app/validators/user.ts`) → model (`app/models/user.ts`) → `UserTransformer` (`app/transformers/user_transformer.ts`), which whitelists the fields returned to clients. Errors go through `app/exceptions/handler.ts`.

Important details that are easy to miss:

- `database/schema.ts` and `.adonisjs/client/*` are generated. Don't hand-edit them; regenerate via `node ace migration:run` or the dev server.
- Schema changes go in a new migration under `database/migrations/`, never an edit to an existing one.
- Passwords must be 8–32 characters; signup requires `passwordConfirmation` matching `password`; the email must be unique. Validation errors are the shape to surface to the UI.
- The `User` model's `password` column is `serializeAs: null`, so it never reaches responses. Use the transformer for any new user-facing response.
- Tokens are opaque strings prefixed `oat_`. The client must send them as `Authorization: Bearer <token>`.
- CORS: all origins are allowed in dev (`config/cors.ts`), with an empty allowlist in production.
- Session driver is `cookie` in `.env.example`; the auth guards in use are token-based (`api`).

## Frontend structure

Minimal at this point: `src/main.tsx` mounts `App` inside `StrictMode`; `src/App.tsx` is placeholder content. Components for the login task are expected to be shadcn/ui components copied into the repo (not installed as a package). Prettier is configured in `frontend/` (`npm run format`, `npm run format:check`), and a PostToolUse hook (`.claude/hooks/format-frontend.sh`) formats `frontend/src` files after each edit.

The frontend calls the backend at `http://localhost:3333` directly. No Vite proxy is configured in `vite.config.ts`.

## Repo notes

- `backend/.env` and `backend/tmp/` are gitignored; never commit them.
- `backend/package-lock.json` may show local modifications from `npm install`; don't commit unrelated lockfile churn.
- `prompts.md` is the exercise's prompt log, filled in by the student. Don't rewrite entries.
- `flowsync-sin-harness/` (a sibling directory outside this repo) is an unmodified copy used for the with/without-harness comparison. Don't touch it from here.

## Process rules

- Before touching code, create a new branch off `main`. Don't work directly on `main` or on an existing feature branch.
- When the work is done, use `/commit` for the commit, then open the pull request with `gh pr create`.
- After the pull request exists, run the `adversarial-reviewer` subagent on it and address its findings.
- In the chat, reply only with the pull request URL.
