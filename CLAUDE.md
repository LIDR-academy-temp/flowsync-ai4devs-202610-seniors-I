# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Layout

Two independent npm projects, no root package.json or workspaces: `backend/` (AdonisJS 7, Lucid on SQLite, VineJS, Japa) and `frontend/` (React 19 + Vite, still the bare Vite template). Run every command from inside the relevant folder. Node >= 24 is required (older Node fails with `Unknown file extension ".ts"`).

In this exercise session the backend is not modified — work happens in `frontend/` only. The README is generated from the lesson; don't edit it by hand.

## Commands

- Backend: `npm run dev` (port 3333), `npm test`, `npm run lint`, `npm run format`, `npm run typecheck`. First setup: `cp .env.example .env && node ace generate:key && node ace migration:run`.
- Single backend test: `node ace test unit`, `node ace test --files=tests/unit/foo.spec.ts`, or `node ace test --tests="title"`.
- Frontend: `npm run dev`, `npm run build` (`tsc -b && vite build`), `npm run lint` (this is **oxlint**, not eslint). No test framework in `frontend/`; the formatter is **oxfmt** (`npm run format`), run automatically by the `PostToolUse` hook.

## Code rules

- Frontend tsconfig enforces `verbatimModuleSyntax` (use `import type` for types) and `erasableSyntaxOnly` (no enums, no constructor parameter properties); unused locals/params are errors.
- Backend: import via `#` subpath aliases (`#models/*`, `#validators/*`, …), not relative paths. Schema changes go in a new migration; `backend/database/schema.ts` and `.adonisjs/` are generated — don't edit them.
- Backend style is the Adonis Prettier config (no semicolons, single quotes).

## API contract (for frontend work)

All routes under `/api/v1`; every response is wrapped as `{ data: ... }` and is always JSON.
- `POST auth/signup` — body `{ fullName?, email, password, passwordConfirmation }`; password 8–32 chars, `passwordConfirmation` must equal `password`, email unique. Returns `{ data: { user, token } }`.
- `POST auth/login` — body `{ email, password }`. Returns `{ data: { user, token } }`.
- `GET account/profile`, `POST account/logout` — require `Authorization: Bearer <token>`.
- User fields: `id, fullName, email, createdAt, updatedAt, initials`.

## Git

Conventional Commits written in Spanish, e.g. `docs(s1): ...`, `fix(backend): ...`.

## Reglas de proceso
- Antes de tocar código: crear una rama nueva (`git checkout -b feat/<slug>`). Nunca commitear directo en `main`/`s1/start`.
- Al cerrar la tarea: usar la skill `/commit`, luego `gh pr create` con una descripción completa de los cambios en el cuerpo del PR.
- Después de abrir el PR: usar el subagente `adversarial-reviewer` sobre él, antes de darlo por terminado.
- No repitas ese resumen en el chat: la sesión se va a perder, el PR no. Responde solo con la URL del PR.
