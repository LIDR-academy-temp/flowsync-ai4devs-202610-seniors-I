# Comparación: con harness vs. sin harness

Archivos que cambian entre `flowsync-sin-harness` (sin harness) y este repositorio (con harness). Se excluyen `node_modules/`, `.git/`, `dist/`, `.adonisjs/` y `frontend/test-results/` (artefactos generados o ignorados por git). El backend no tiene diferencias.

## Harness (solo existe con harness)

- `CLAUDE.md` — instrucciones del proyecto para el agente.
- `.mcp.json` — configuración de servidores MCP.
- `.claude/agents/adversarial-reviewer.md` — subagente que revisa PRs intentando romperlos.
- `.claude/hooks/scripts/format.sh` — hook que formatea los archivos editados.
- `.claude/skills/commit/SKILL.md` — skill para commits convencionales en español.
- `.claude/skills/priority-ticket/SKILL.md` — skill que trae el ticket de Jira más prioritario.

## Frontend: archivos añadidos

Configuración y pruebas E2E:

- `frontend/.env.example`
- `frontend/components.json` (shadcn/ui)
- `frontend/playwright.config.ts`
- `frontend/e2e/auth.spec.ts`

Código fuente (`frontend/src/`):

- `app-routes.tsx`
- `auth/auth-context.ts`
- `auth/auth-provider.tsx`
- `auth/require-auth.tsx`
- `auth/require-auth.test.tsx`
- `components/auth-card.tsx`
- `components/form-field.tsx`
- `components/ui/alert.tsx`
- `components/ui/button.tsx`
- `components/ui/card.tsx`
- `components/ui/input.tsx`
- `components/ui/label.tsx`
- `lib/api.ts`
- `lib/api.test.ts`
- `lib/auth-errors.ts`
- `lib/auth-errors.test.ts`
- `lib/utils.ts`
- `pages/login-page.tsx`
- `pages/login-page.test.tsx`
- `pages/profile-page.tsx`
- `pages/profile-page.test.tsx`
- `pages/signup-page.tsx`
- `pages/signup-page.test.tsx`
- `test/render-app.tsx`
- `test/setup.ts`

## Frontend: archivos modificados

- `frontend/.gitignore`
- `frontend/.oxlintrc.json`
- `frontend/index.html`
- `frontend/package.json`
- `frontend/package-lock.json`
- `frontend/tsconfig.json`
- `frontend/tsconfig.app.json`
- `frontend/tsconfig.node.json`
- `frontend/vite.config.ts`
- `frontend/src/index.css`
- `frontend/src/main.tsx`

## Frontend: archivos eliminados (plantilla de Vite)

- `frontend/src/App.tsx`
- `frontend/src/App.css`
- `frontend/src/assets/hero.png`
- `frontend/src/assets/react.svg`
- `frontend/src/assets/vite.svg`
