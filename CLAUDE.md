# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

FlowSync is a full-stack TypeScript app with a **complete, read-only backend** (AdonisJS 7) and a **starter frontend** (React 19 + Vite) where the work happens. The exercise is implementing authentication UI in the frontend that consumes the existing backend API.

## Commands

### Backend (`cd backend`)
```bash
npm install
cp .env.example .env        # first time only
node ace generate:key        # first time only
node ace migration:run       # first time only
npm run dev                  # dev server → http://localhost:3333
npm run build                # compile for production
npm test                     # Japa test suite
npm run lint                 # ESLint
npm run format               # Prettier
npm run typecheck            # tsc --noEmit
```

### Frontend (`cd frontend`)
```bash
npm install
npm run dev                  # Vite dev server → http://localhost:5173
npm run build                # tsc -b && vite build
npm run lint                 # Oxlint
npm run preview              # preview production build
```

**Requires Node.js 24+** (v20 fails with `Unknown file extension ".ts"`).

## Architecture

### Backend (AdonisJS 7 — do not modify)

Layers: Routes → Controllers → Validators (VineJS) → Models (Lucid ORM) → Transformers

**API endpoints** (all prefixed `/api/v1`):

| Method | Path | Auth | Controller | Purpose |
|--------|------|------|------------|---------|
| POST | `/auth/signup` | No | `NewAccountController.store` | Create user + token |
| POST | `/auth/login` | No | `AccessTokensController.store` | Verify credentials + token |
| GET | `/account/profile` | Yes | `ProfileController.show` | Return user profile |
| POST | `/account/logout` | Yes | `AccessTokensController.destroy` | Revoke token |

**Signup validation** (`backend/app/validators/user.ts`):
- `email`: valid email, max 254 chars, **must be unique**
- `password`: 8–32 chars
- `passwordConfirmation`: must match `password`
- `fullName`: nullable string

**Login validation**: email + password (no length check on password at login).

**Success response shape** (signup and login):
```json
{ "user": { "id", "fullName", "email", "createdAt", "updatedAt", "initials" }, "token": "oat_..." }
```

**Profile response shape**: same user object without token.

**Auth mechanism**: Bearer token (`Authorization: Bearer oat_...`). Tokens are opaque access tokens stored in `auth_access_tokens` table.

**CORS**: all origins allowed in development, credentials enabled.

### Frontend (React 19 + Vite — work happens here)

Starter template with `src/App.tsx` as root component. UI components should use **shadcn/ui** (copy components into repo, not npm install). No router or state management installed yet.

## Key Files

- `backend/start/routes.ts` — all API route definitions
- `backend/app/validators/user.ts` — validation rules (the ticket doesn't specify all of them; read this)
- `backend/app/transformers/user_transformer.ts` — fields exposed to the client
- `backend/app/models/user.ts` — User model with `initials` computed property
- `frontend/src/App.tsx` — frontend entry component
- `frontend/vite.config.ts` — Vite configuration
- `prompts.md` — template for documenting prompts used (part of the deliverable)

## Git Workflow

- `origin` = student's fork, `upstream` = `LIDR-academy/flowsync-ai4devs-202610-seniors-I`
- Working branch: `harness-<initials>` (based off `s1/start`)
- PRs go against the upstream course repo, not the fork

## Process Rules

Follow these steps, in this order, for every code change:

1. Before touching any code, create a new branch.
2. When done, commit using the `/commit` skill and open the pull request with `gh pr create` against the upstream repository `LIDR-academy-temp/flowsync-ai4devs-202610-seniors-I` (e.g. `gh pr create --repo LIDR-academy-temp/flowsync-ai4devs-202610-seniors-I`).
3. Then review the pull request with the `adversarial-reviewer` subagent.
4. In the chat, reply only with the pull request URL.
