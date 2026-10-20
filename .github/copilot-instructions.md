# FlowSync

Two independent apps, each with its own `package.json` and lockfile — there is no root
workspace. Always `cd backend/` or `cd frontend/` before running npm commands.

- `backend/` — AdonisJS 7 API (TypeScript), SQLite via Lucid ORM.
- `frontend/` — React 19 + Vite starter (TypeScript). Currently a bare scaffold (no router,
  no state library, no shadcn/ui components yet) — it does not call the backend API yet.

`README.md` documents a training-exercise workflow (forking, a harness comparison task), not
the application itself; it's not needed for day-to-day code changes.

## Code change workflow

Any task that edits tracked files (not read-only exploration, review, or chat-only answers)
must follow this sequence, in order, without skipping steps:

1. **Branch first.** Before touching any file, create and check out a new branch off the
   current branch (e.g. `git checkout -b <type>/<short-description>`). Never edit tracked files
   directly on the branch you started from.
2. Make the change.
3. **Commit with `/commit`.** Use the `/commit` skill to review the diff and draft the commit
   message — don't hand-write a commit outside that flow.
4. **Open a pull request** from the new branch (push it, then open the PR with the available
   GitHub tooling — `gh` CLI or the GitHub MCP server — targeting the branch it was created
   from).
5. **Run the Adversarial Reviewer.** Invoke the `Adversarial Reviewer` custom agent against the
   pull request that was just opened before considering the task done. See
   [AGENTS.md](../AGENTS.md) for what it checks and the other custom agents available in this
   repo.
6. **Report only the PR URL.** The final chat message for the task must contain nothing but the
   pull request URL — no summary, no file list, no extra commentary.

## Backend (`backend/`)

### Setup & commands

```bash
npm install
cp .env.example .env && node ace generate:key   # first time only
node ace migration:run                           # creates SQLite db + regenerates database/schema.ts
npm run dev                                      # ace serve --hmr, http://localhost:3333
```

- `npm run build` — `node ace build`
- `npm run lint` — `eslint .` (uses `@adonisjs/eslint-config`; includes `prettier/prettier` as a
  lint rule, so run `npm run format` — `prettier --write .` — to auto-fix style failures)
- `npm run typecheck` — `tsc --noEmit`
- `npm test` — `node ace test`, runs all suites defined in `adonisrc.ts` (`unit`:
  `tests/unit/**/*.spec.ts`, timeout 2s; `functional`: `tests/functional/**/*.spec.ts`, timeout
  30s). No spec files exist yet, only `tests/bootstrap.ts`.
  - Single file: `node ace test --files=<filename-without-ext>`
  - Single suite: `node ace test functional` / `node ace test unit`
  - Filter by title/group: `node ace test --tests="..."` / `--groups="..."`

### Architecture

Request flow follows the standard AdonisJS layering: `start/routes.ts` → controller
(`app/controllers/*_controller.ts`) → VineJS validator (`app/validators/*.ts`) → Lucid model
(`app/models/*.ts`) → transformer (`app/transformers/*_transformer.ts`) → response.

- **Generated files — do not hand-edit:**
  - `database/schema.ts` is auto-generated from migrations (`schemaGeneration.enabled: true` in
    `config/database.ts`) and is regenerated every time `node ace migration:run` runs. Models
    extend these generated `*Schema` classes instead of declaring `@column` fields directly,
    e.g. `class User extends compose(UserSchema, withAuthFinder(hash))`. To change the schema,
    add a new migration under `database/migrations/` and rerun `migration:run` — never edit an
    already-applied migration or `schema.ts` by hand.
  - `.adonisjs/` (client + server registries, including the Tuyau typed-route client and
    `#generated/controllers` used by `start/routes.ts`) is committed generated code, rebuilt via
    the `indexEntities`/`generateRegistry` hooks in `adonisrc.ts` whenever the app boots/builds.
- **Subpath imports:** the codebase uses the Node.js `imports` map from `package.json`
  (`#controllers/*`, `#models/*`, `#validators/*`, `#transformers/*`, `#middleware/*`,
  `#database/*`, `#config/*`, etc.) instead of relative `../../` paths.
- **Response envelope:** controllers return `serialize(...)` (added to every `HttpContext` by
  `providers/api_provider.ts`), not raw objects — this wraps all JSON responses as
  `{ data: ... }`. Use `serialize.withoutWrapping(...)` to opt out.
- **Transformers** (extend `BaseTransformer`, implement `toObject()` with `this.pick(...)`)
  decide exactly what fields reach the client, e.g. `UserTransformer` deliberately omits the
  password hash (the model also sets `serializeAs: null` on `password`).
- **Auth** is dual-guard (`config/auth.ts`): `api` (default) is a stateless bearer-token guard
  via `DbAccessTokensProvider`/`auth_access_tokens` table (tokens prefixed `oat_`); `web` is a
  session guard. Protect routes with `.use(middleware.auth())` on a route group (see the
  `account` group in `start/routes.ts`); `silent_auth_middleware` runs globally so `auth.user`
  is available without forcing authentication everywhere.
- **Routes** live under `/api/v1`, grouped and named (`.prefix(...).as(...)`) — route names feed
  the generated Tuyau client registry, so keep route naming/group structure consistent when
  adding endpoints.
- **Validators** centralize VineJS schemas per resource in `app/validators/<resource>.ts`,
  factoring shared field rules into small functions (e.g. `email()`, `password()` in
  `app/validators/user.ts`) rather than inlining rules in controllers.
- Controllers stay thin: validate with `request.validateUsing(...)`, call model statics
  (`User.create`, `User.verifyCredentials`, `User.accessTokens.create`), return
  `serialize(...)`.
- DB is SQLite (`better-sqlite3`) at `tmp/db.sqlite3`; only `users` and `auth_access_tokens`
  tables exist so far.
- CORS (`config/cors.ts`) allows all origins in dev and is locked down (empty allowlist) in
  production via `CORS_ORIGIN`.

## Frontend (`frontend/`)

```bash
npm install
npm run dev       # vite, http://localhost:5173 (server.host=true in vite.config.ts so it's
                   # reachable from outside a container/port-forward)
npm run build      # tsc -b && vite build
npm run lint       # oxlint (see .oxlintrc.json)
npm run format     # prettier --write . — also runs automatically after edits via the
                   # format-frontend PostToolUse hook (.github/hooks/)
npm run preview
```

No test runner is configured. The app is currently the unmodified Vite+React template
(`src/App.tsx`, `src/main.tsx`) — when adding real UI, note the backend already exposes and
expects:

- `POST /api/v1/auth/signup` — body `{ fullName?, email, password, passwordConfirmation }`
- `POST /api/v1/auth/login` — body `{ email, password }`
- `GET /api/v1/account/profile` — requires `Authorization: Bearer <token>`
- `POST /api/v1/account/logout` — requires `Authorization: Bearer <token>`

All responses are wrapped as `{ data: { ... } }` (see backend response envelope above).
