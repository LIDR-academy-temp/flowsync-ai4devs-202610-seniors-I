# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

FlowSync is a teaching project for an AI-for-devs course (LIDR Academy, cohort 202610-seniors-I). It's a full-stack TypeScript app: AdonisJS 7 backend + React 19 / Vite frontend. The backend already has auth (signup, login, logout, profile) fully implemented; the course exercise is implementing the frontend auth that consumes it.

## Commands

### Backend (`backend/`)

```bash
npm install
cp .env.example .env        # first time only
node ace generate:key        # first time only
node ace migration:run       # first time only (SQLite, stored in backend/tmp/db.sqlite3)
npm run dev                  # http://localhost:3333
npm run test                 # all tests (Japa runner)
node ace test --files="tests/unit/foo.spec.ts"  # single test
npm run lint                 # ESLint
npm run typecheck            # tsc --noEmit
```

### Frontend (`frontend/`)

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # tsc -b && vite build
npm run lint      # oxlint
```

Both servers must be running simultaneously (two terminals).

## Architecture

### Backend (AdonisJS 7)

All API routes are under `/api/v1`. Auth uses token-based access tokens (prefix `oat_`).

| Endpoint | Auth | Controller | What it does |
|---|---|---|---|
| `POST /api/v1/auth/signup` | no | `NewAccountController` | Creates user + returns token |
| `POST /api/v1/auth/login` | no | `AccessTokensController` | Verifies credentials + returns token |
| `GET /api/v1/account/profile` | yes | `ProfileController` | Returns authenticated user |
| `POST /api/v1/account/logout` | yes | `AccessTokensController` | Destroys token |

Key files for understanding backend validation (the frontend must match these):
- `app/validators/user.ts` — signup requires `email`, `password`, `passwordConfirmation`, optional `fullName`; password 8–32 chars; email unique check. Login requires `email` + `password` only.
- `app/transformers/user_transformer.ts` — API returns: `id`, `fullName`, `email`, `createdAt`, `updatedAt`, `initials`.
- `database/migrations/` — `users` table: `id`, `full_name` (nullable), `email` (unique, max 254), `password`, timestamps.

DB: SQLite via better-sqlite3, file at `backend/tmp/db.sqlite3`. CORS allows all origins in dev.

The `#imports` aliases (e.g. `#models/user`, `#validators/user`) resolve via the `imports` field in `backend/package.json`.

### Frontend (React 19 + Vite)

Starter state: single `App.tsx` with a counter — no routing, no auth, no component library yet. The exercise adds shadcn/ui components, routing, and auth screens.

Linter is oxlint (not ESLint). No formatter installed by default.

### MCP

`.mcp.json` at root connects the Atlassian MCP server for Jira integration (project FLOW).

## Conventions

- Conventional commits: `feat(frontend):`, `fix(backend):`, `chore(harness):`, etc.
- Branch from current working branch, never commit directly to `s1/start` or `main`.
- The backend is read-only for this exercise — don't modify backend code.

## Reglas de proceso

1. Antes de tocar código, crea una rama nueva desde la rama actual con el formato `ehz/tipo/FLOW-n-descripcion-corta` (ejemplo: `ehz/feat/FLOW-4-login-frontend`), donde `ehz` son mis iniciales y `tipo` es feat, fix, chore, docs, refactor o test; nunca commitees directo en s1/start ni en main.
2. Al cerrar una tarea: prepara los cambios, usa /commit, y abre el pull request con `gh pr create` contra el repo del curso.
3. Después de abrir el PR, lanza el subagente adversarial-reviewer sobre ese PR y resume sus hallazgos.
4. En el chat, al terminar, responde solo con la URL del pull request.
