# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

FlowSync is a course exercise (AI4Devs, module 1 "harness engineering"). Two independent npm projects, both TypeScript end to end:

- `backend/` — AdonisJS 7 REST API (Lucid ORM on SQLite, VineJS validation, token auth). **Already complete; the exercise says it is read-only.** Read it to learn what the API expects, do not change it unless explicitly asked.
- `frontend/` — React 19 + Vite 8 scaffold (still the Vite starter page). This is where feature work happens. shadcn/ui is the intended component library (copied-in components, not an npm dependency); nothing is installed yet, nor is a router or HTTP client.

The root `README.md` is the exercise brief (Spanish) and `prompts.md` is the deliverable log of every prompt sent to the agent. Deliverables go in `docs/harness/comparacion.md` and `prompts.md` on a `harness-<initials>` branch, PR'd against the course repo (`upstream`), not the fork (`origin`).

Requires Node 24+ (Node 20 fails with `Unknown file extension ".ts"`).

## Commands

Each project has its own `package.json`; run commands from inside `backend/` or `frontend/`.

### Backend (`backend/`)

```bash
npm install
cp .env.example .env && node ace generate:key   # first time only
node ace migration:run                           # creates tmp/db.sqlite3, regenerates database/schema.ts
npm run dev                                      # http://localhost:3333 (HMR via hot-hook)
npm run typecheck                                # tsc --noEmit
npm run lint                                     # eslint (@adonisjs/eslint-config)
npm run format                                   # prettier (@adonisjs/prettier-config)
npm test                                         # node ace test (Japa; suites: unit, functional)
node ace test functional                         # one suite
node ace test --files=auth/login                 # one spec file (match on path fragment)
node ace test --tests="logs in with valid creds" # one test by title
node ace list:routes                             # print the route table
```

Tests live in `tests/unit/**/*.spec.ts` and `tests/functional/**/*.spec.ts` (none exist yet; `tests/bootstrap.ts` already wires `@japa/api-client`, auth and session API-client plugins and DB assertions).

### Frontend (`frontend/`)

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # tsc -b && vite build
npm run lint       # oxlint (.oxlintrc.json: react + typescript + oxc plugins)
npm run preview
npm run format        # prettier --write src
npm run format:check  # prettier --check src
```

There is no test runner in the frontend yet. Prettier (`.prettierrc.json`) matches the existing style: single quotes, no semicolons, trailing commas, `endOfLine: "auto"` (Windows checkouts use CRLF via `core.autocrlf`; don't change it to `lf`, or every touched file gets rewritten line by line).

**Format-on-edit hook**: `.claude/settings.json` registers a `PostToolUse` hook on `Edit|Write|MultiEdit` that runs `.claude/hooks/format-frontend.mjs`. It formats the edited file with the project's Prettier only when it lives under `frontend/src/`; everything else (backend, docs, config) is left alone. It never blocks: if Prettier fails (e.g. a syntax error) it reports on stderr and the edit stands. Consequences:

- After editing a file under `frontend/src/`, the file on disk may differ from what you wrote (quotes, semicolons, wrapping). Re-read it before another `Edit` that targets the reformatted region.
- Don't hand-format to Prettier's style or run `npm run format` after each edit; the hook already did it. Run `npm run format:check` before closing work to catch files changed outside the agent.
- Review or disable the hook with `/hooks`.

## Backend architecture (what the frontend must match)

Request flow: `start/routes.ts` → controller (`app/controllers/`) → validator (`app/validators/`, VineJS) → model (`app/models/`, Lucid) → transformer (`app/transformers/`) → `ctx.serialize()`.

**All routes are under `/api/v1`** and every response is forced to JSON (`force_json_response_middleware`):

| Method | Path | Auth | Controller |
|---|---|---|---|
| POST | `/api/v1/auth/signup` | no | `NewAccountController.store` |
| POST | `/api/v1/auth/login` | no | `AccessTokensController.store` |
| GET | `/api/v1/account/profile` | bearer token | `ProfileController.show` |
| POST | `/api/v1/account/logout` | bearer token | `AccessTokensController.destroy` |

**Validation rules live only in `app/validators/user.ts`**, and product tickets do not restate them:

- `signupValidator`: `fullName` (string, nullable), `email` (valid email, max 254, unique in `users`), `password` (8–32 chars), `passwordConfirmation` (must equal `password`). The confirmation field is required by the backend even though the ticket only mentions email + password.
- `loginValidator`: `email`, `password` (any string).

**Response envelope**: `providers/api_provider.ts` adds `ctx.serialize()`, which wraps every payload under `data`. Signup and login return `{ data: { user: {...}, token: "oat_..." } }`; profile returns `{ data: { id, fullName, email, createdAt, updatedAt, initials } }` (fields picked by `UserTransformer`, password never exposed). Logout returns `{ message }` without the wrapper.

**Auth**: default guard is `api` (opaque access tokens stored in `auth_access_tokens`, prefix `oat_`). Protected routes need `Authorization: Bearer <token>`. A `web` session guard also exists but no route uses it.

**Error shapes the frontend has to handle**:

- 422 validation failure (VineJS): `{ errors: [{ message, rule, field }] }` — e.g. duplicate email on signup arrives as a `field: "email"` error with rule `database.unique`.
- 400 `E_INVALID_CREDENTIALS` on login with wrong email/password, body `{ errors: [{ message: "Invalid user credentials" }] }`.
- 401 `E_UNAUTHORIZED_ACCESS` on protected routes without a valid token, same `{ errors: [{ message }] }` shape.

CORS allows any origin in development (`config/cors.ts`), so the Vite dev server can call `localhost:3333` directly.

### Generated files — do not hand-edit

- `backend/database/schema.ts` — model base classes generated from the DB by `node ace migration:run`. Models extend these (`User extends compose(UserSchema, withAuthFinder(hash))`), so schema changes go through a new migration, never by editing a table or this file.
- `backend/.adonisjs/` — controller index and Tuyau route registry regenerated on every boot (`adonisrc.ts` hooks `indexEntities` + `generateRegistry`). Routes are referenced as `controllers.NewAccount`, not by import path. These files churn in `git status` after running the backend; that is expected. The package exports `backend/registry` and `backend/data` (typed routes and transformer output) if a typed client is ever wanted on the frontend.

### Backend conventions

- Subpath imports (`#controllers/*`, `#models/*`, `#validators/*`, …) are defined in `backend/package.json`; use them instead of relative paths.
- Controller methods use the AdonisJS resource names (`store`, `show`, `destroy`) and return `serialize(...)`.
- Env vars are validated in `start/env.ts`; adding one means adding it there and to `.env.example`.

## Frontend conventions

- Strict TS: `noUnusedLocals`, `noUnusedParameters`, `verbatimModuleSyntax`, `erasableSyntaxOnly` (no enums/namespaces/parameter properties). Use `import type` for types.
- `react/only-export-components` is a warning: keep non-component exports (hooks, helpers) out of component files.
- Components go under `src/`; shadcn/ui components, when added, are copied into the repo and edited freely.

## Process rules (reglas de proceso)

Follow these for every task that changes code, in order:

1. **Branch first.** Before touching any code, create a new branch from `harness-sh` (`git switch harness-sh && git switch -c <type>/<short-description>`, e.g. `feat/signup-form`). Never edit code directly on `harness-sh` or `main`. If the working tree already has unrelated changes, say so before branching instead of carrying them along silently.
2. **Close with `/commit`.** When the work is done (build and lint pass, `npm run format:check` clean for frontend changes), stage only the files that belong to the task with `git add <paths>` and run the `/commit` skill. Don't write commit messages by hand with `git commit`. Generated files that churn (`backend/.adonisjs/`, lockfiles not touched on purpose) stay out of the commit.
3. **Open the PR with `gh pr create` against `harness-sh`.** Push the branch (`git push -u origin <branch>`) and open the pull request in the fork, with `harness-sh` as base: `gh pr create --repo sylviahr81/flowsync-ai4devs-202610-seniors-I --base harness-sh --head <branch>`, with a title and a body that says what changed and how it was verified. Always pass `--repo`, `--base` and `--head`; `gh` would otherwise default to `upstream`/`main`. `harness-sh` must exist on `origin` (`git push -u origin harness-sh` once if it doesn't). The single PR from `harness-sh` to `upstream` (see "What this repo is") is the course deliverable, opened only when asked.
4. **Review with the `adversarial-reviewer` subagent.** Once the PR exists, run the `adversarial-reviewer` subagent (`.claude/agents/adversarial-reviewer.md`) on it, passing the PR number. It is read-only; it doesn't edit or comment on the PR. If it reports blocking findings, fix them on the same branch, `/commit` again and push, then rerun the reviewer.
5. **Reply with the PR URL only.** The final message in the chat is the pull request URL and nothing else: no summary, no review report, no list of changes.
