# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

FlowSync is a full-stack TypeScript application built for the AI4Devs course (cohort 202610-seniors-I). It demonstrates harness engineering principles by comparing AI-assisted development with and without proper tooling scaffolding.

**Stack:**
- Backend: AdonisJS 7 (Node.js TypeScript framework) with SQLite
- Frontend: React 19 + Vite
- TypeScript throughout for improved AI code generation

## Development Commands

### Backend (AdonisJS 7)

```bash
cd backend
npm install                  # Install dependencies
cp .env.example .env        # Create environment file (first time only)
node ace generate:key       # Generate APP_KEY (first time only)
node ace migration:run      # Run database migrations
npm run dev                 # Start development server (http://localhost:3333)
npm run build              # Build for production
npm test                   # Run tests
npm run lint               # Run ESLint
npm run format             # Format code with Prettier
npm run typecheck          # Type check without emitting
```

### Frontend (React + Vite)

```bash
cd frontend
npm install                # Install dependencies
npm run dev               # Start development server (http://localhost:5173)
npm run build             # Build for production (runs typecheck first)
npm run lint              # Run Oxlint
npm run preview           # Preview production build
```

**Important:** Backend and frontend run in separate terminals. Backend must be running for frontend API calls to work.

## Architecture & Key Concepts

### Backend Architecture (AdonisJS)

The backend follows AdonisJS conventions with a layered architecture:

1. **Routes** (`start/routes.ts`): Maps HTTP endpoints to controllers. All API routes are prefixed with `/api/v1`
2. **Controllers** (`app/controllers/*.ts`): Handle HTTP requests and orchestrate business logic
3. **Validators** (`app/validators/*.ts`): VineJS schemas that validate request payloads before processing
4. **Models** (`app/models/*.ts`): Lucid ORM models representing database tables
5. **Migrations** (`database/migrations/*.ts`): Versioned database schema changes - never edit tables directly
6. **Transformers** (`app/transformers/*.ts`): Format data returned to clients (filter sensitive fields like password hashes)
7. **Middleware** (`app/middleware/*.ts`): Request preprocessing (auth, JSON responses, etc.)

**Path aliases:** Backend uses `#` imports (e.g., `#models/user`, `#controllers/*`). These are defined in `package.json` imports field.

### Authentication

- Uses token-based auth with AdonisJS access tokens
- All tokens start with prefix `oat_`
- Auth endpoints:
  - `POST /api/v1/auth/signup` - Register new user
  - `POST /api/v1/auth/login` - Login (returns token)
  - `POST /api/v1/account/logout` - Logout (requires auth)
  - `GET /api/v1/account/profile` - Get current user (requires auth)

### Frontend Architecture (React)

- Minimal starter template with React 19 + Vite
- Uses shadcn/ui pattern: components are copied into the codebase (not installed as dependencies)
- No routing library installed yet
- No state management library installed yet
- Entry point: `frontend/src/main.tsx` → `frontend/src/App.tsx`

## Key Validators

When implementing features that interact with the backend, check the validators to understand exact requirements:

**Signup** (`signupValidator` in `app/validators/user.ts`):
- `fullName`: string, nullable
- `email`: string, email format, max 254 chars, must be unique
- `password`: string, 8-32 chars
- `passwordConfirmation`: string, must match password

**Login** (`loginValidator` in `app/validators/user.ts`):
- `email`: string, email format, max 254 chars
- `password`: string (no min length on login)

## Code Conventions

### Backend
- Use AdonisJS path aliases (`#models/*`, `#controllers/*`, etc.)
- Controllers should be thin - delegate to models/services
- Always use validators for request validation
- Use transformers to format API responses
- Migrations are append-only - create new migration files, don't edit existing ones
- Follow AdonisJS naming: `snake_case` for DB columns, `camelCase` for JS/TS

### Frontend
- React functional components with hooks
- TypeScript strict mode enabled
- Use Oxlint for linting (not ESLint)
- No formatter installed by default (Prettier can be added if needed)

## Testing

Backend uses Japa test runner:
```bash
cd backend
npm test                    # Run all tests
node ace test --files=<pattern>  # Run specific test file(s)
```

## Database

- SQLite database (development)
- Location: `backend/tmp/db.sqlite3`
- To reset database: delete the file and run `node ace migration:run` again
- Access via AdonisJS commands: `node ace db:seed`, `node ace migration:rollback`, etc.

## Important Notes for AI Development

1. **Backend exists and works** - For module 1 exercises, the backend is complete and should not be modified. Only implement frontend features.

2. **Validator discovery** - Product tickets may not specify all field requirements. When implementing forms, always check the corresponding validator in `app/validators/` to understand exact validation rules.

3. **API response structure** - Responses use transformers. Check `app/transformers/` to see what fields are actually returned.

4. **Auth token handling** - The frontend needs to store and include the token from login response in subsequent authenticated requests.

5. **Error handling** - Backend returns structured error responses. Frontend should display user-friendly messages, not console errors.

## Branch Strategy

- `main`: stable branch
- `s1/start`: starting point for session 1
- Feature branches: `harness-<initials>` for exercise submissions
- Work is submitted via pull request to the course repository

## Course Context

This is a teaching project for demonstrating "harness engineering" - the infrastructure around AI coding assistants (prompts, context, tooling) that improves AI-assisted development outcomes. The same ticket implemented with and without proper harness setup produces measurably different results in code quality, convention adherence, and developer intervention required.

## Reglas de proceso

1. Antes de tocar código, crea una rama nueva desde la actual.
2. Al terminar, haz el commit con la skill /commit y abre el pull request con gh pr create.
3. Después, lanza el subagente adversarial-reviewer sobre ese pull request.
4. En el chat, al final, responde solo con la URL del pull request.
