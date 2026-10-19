# Plan — FLOW-1 · Enlace de navegación entre login y registro

**Ticket:** [FLOW-1](https://izprojects.atlassian.net/browse/FLOW-1) · Prioridad Medium · Estado «Tareas por hacer» (categoría «Por hacer»; aceptado por la persona usuaria como equivalente). Sin comentarios.

## Context
FLOW-1 pide enlazar las pantallas de login y registro, pero el frontend todavía es la plantilla de Vite: no hay pantallas, router, shadcn/ui ni alias. Alcance acordado: **pantallas mínimas (esqueleto, sin llamar al API) + los enlaces**. Navegación según la definición del proyecto (README raíz): React 19 + Vite + **shadcn/ui**; el ticket padre («Implementar login») exige rutas reales (redirigir a una vista protegida), así que se usa **react-router** con URLs `/login` y `/signup`.

## Criterios de aceptación
- [ ] AC1: `/login` muestra un enlace que lleva a `/signup`.
- [ ] AC2: `/signup` muestra un enlace que lleva a `/login`.

**Ambigüedades (no resueltas por mí):** el ticket no fija el texto de los enlaces ni la ruta raíz; propongo «¿No tienes cuenta? Regístrate» / «¿Ya tienes cuenta? Inicia sesión» y `/` → `/login`. Los campos del formulario siguen `backend/app/validators/user.ts` (signup: fullName opcional, email, password, passwordConfirmation) pero no se envían: la integración es del ticket «Implementar login».

## Pasos
0. Mover FLOW-1 a «En curso» (tras aprobar). Crear rama `feat/flow-1-enlace-login-registro` desde `harness-IAZ`, sin tocar los cambios previos sin commitear (solo se preparan los archivos de esta tarea).
1. **Base del frontend** (`frontend/`):
   - `npm i react-router tailwindcss @tailwindcss/vite`.
   - Alias `@/* → src/*` en `tsconfig.json` y `tsconfig.app.json` (`baseUrl`/`paths`) y `resolve.alias` + plugin `tailwindcss()` en `vite.config.ts`.
   - `npx shadcn@latest init` (genera `components.json`, `src/lib/utils.ts`, tokens en `src/index.css`) y `npx shadcn@latest add button input label card`.
2. **Limpiar plantilla:** reemplazar `src/App.tsx`; borrar `src/App.css` y los assets de la plantilla (`hero.png`, `react.svg`, `vite.svg`) si quedan sin uso.
3. **Rutas:** `src/main.tsx` envuelve en `<BrowserRouter>`; `src/App.tsx` define `<Routes>`: `/login`, `/signup`, `/` y `*` → `<Navigate to="/login" replace />`.
4. **Pantallas** (`src/pages/LoginPage.tsx`, `src/pages/SignupPage.tsx`): `Card` de shadcn con título, campos (`Label`+`Input`) y `Button` de envío (`onSubmit` con `preventDefault`, sin API). Pie con `<Link>` de react-router:
   - Login → `<Link to="/signup">Regístrate</Link>` (AC1)
   - Signup → `<Link to="/login">Inicia sesión</Link>` (AC2)
5. El hook `.claude/hooks/format-frontend.mjs` formatea con Prettier al editar.

## Verificación
- `npm run build` (tsc + vite) y `npm run lint` sin errores en `frontend/`.
- `npm run dev` → abrir `http://localhost:5173`: redirige a `/login`; clic en «Regístrate» → `/signup`; clic en «Inicia sesión» → `/login` (AC1, AC2). Comprobar también recarga directa en `/signup`.

## Cierre (AGENTS.md)
`/commit` (convencional, p. ej. `feat(frontend): enlace de navegación entre login y registro`), `gh pr create` con resumen y verificaciones, revisión con el subagente `adversarial-reviewer` sobre el PR, y responder solo con la URL del PR.
