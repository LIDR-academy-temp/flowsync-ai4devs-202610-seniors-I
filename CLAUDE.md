# FlowSync

Monorepo with two independent apps: `frontend/` (React SPA) and `backend/` (AdonisJS API under `/api/v1`). Each has its own `package.json`; run commands from inside its folder. Node.js 24+ is required.

## Frontend (frontend/)

### Tech stack
- React 19 + TypeScript 6, built with Vite 8 (`@vitejs/plugin-react`)
- UI: shadcn/ui (planned, not installed yet); data layer: TanStack Query (planned, not installed yet)
- Validation, ORM, auth, testing: none installed yet
- Lint: Oxlint (`.oxlintrc.json`); no formatter configured yet
- `@/` alias is not configured yet (needs `paths` in `tsconfig.app.json` and `resolve.alias` in `vite.config.ts`)
- Commands: `npm install`, `npm run dev` (port 5173), `npm run build` (`tsc -b && vite build`), `npm run lint`; no test script yet
- See @frontend/README.md

### Conventions
1. Name components in PascalCase.tsx (one component per file, file name matches the export), hooks as useThing.ts, and utilities in kebab-case.ts.
2. Organize code by feature (features/<name>/{components,hooks,api}) instead of one global components/ folder (shadcn/ui stays in components/ui/, app-specific variants go in wrapper components).
3. Use function components and hooks only, and type props with a named `type` (e.g. `type LoginFormProps`), not inline in the signature.
4. Make all HTTP calls through a single API client module (lib/api.ts), and manage server state with a data-fetching library (e.g. TanStack Query), not ad-hoc fetch calls inside components.
5. Use the `@/` path alias for imports instead of deep relative paths like ../../../.

### Never do
1. Never use `any` or `@ts-ignore` (if a suppression is unavoidable, use `@ts-expect-error` with a comment explaining why).
2. Never use `useEffect` for derived state or data fetching (compute during render or use the data-fetching layer).
3. Never put secrets in `VITE_*` environment variables (they are shipped to the browser).
4. Never import from another feature's internals (import only from that feature's public index.ts).
5. Never commit `console.log` statements.

## Backend (backend/)

### Tech stack
- AdonisJS 7 (`@adonisjs/core`) + TypeScript 6, run with `node ace`
- Validation: VineJS (`app/validators/`); transformers in `app/transformers/`
- ORM: Lucid with SQLite (`better-sqlite3`), migrations in `database/migrations/`
- Auth: `@adonisjs/auth` access tokens (`api` guard, `oat_` prefix) plus session guard; authorization: Bouncer (not installed yet, no `app/policies/`)
- Testing: Japa (`tests/unit`, `tests/functional`); lint: ESLint (`@adonisjs/eslint-config`); format: Prettier
- Commands: `npm install`, `cp .env.example .env && node ace generate:key && node ace migration:run`, `npm run dev` (port 3333), `npm run build`, `npm test`, `npm run lint`, `npm run typecheck`
- See @backend/README.md

### Conventions
1. Keep controllers thin: receive the request, delegate to a service/action in services/, and return the response (business logic does not live in controllers or routes).
2. Validate every endpoint that accepts input with a VineJS validator (validators/), called first in the controller.
3. Return every response through a transformer (transformers/) so the API contract is explicit.
4. Use snake_case file names (user_controller.ts), PascalCase classes, plural snake_case table names, and the `#` subpath import aliases (e.g. `#models/user`) instead of relative paths.
5. Make all schema changes through a new migration with a working `down`, and put authorization in Bouncer policies instead of inline checks.

### Never do
1. Never edit a migration that has already been merged, and never change the database schema by hand (create a new migration instead).
2. Never pass `request.all()` or unvalidated input into a model (only validated data reaches Lucid).
3. Never return a Lucid model directly from a controller (fields like the password hash could leak; use a transformer).
4. Never read `process.env` outside `start/env.ts`/config files.
5. Never build SQL by string concatenation (use the query builder or parameterized queries).
