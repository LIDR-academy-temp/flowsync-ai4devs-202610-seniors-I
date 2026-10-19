# Prompts

Aquí van **todos los prompts que lanzaste** para hacer el ejercicio, en el orden en que los
lanzaste, con el modelo y la herramienta de cada uno.

Esto no es papeleo. Lo que se revisa es **cómo pediste las cosas**, no solo lo que salió: un
resultado flojo con un prompt bueno y un resultado flojo con un prompt vago necesitan feedback
distinto, y sin este archivo no se distinguen.

## Cómo rellenarlo

- Un apartado `## Prompt N` por cada prompt.
- **Pega el prompt tal cual lo lanzaste**, dentro del bloque de código, aunque ocupe diez líneas
  y aunque tenga faltas. No lo reescribas para que quede bien: el que arreglaste mentalmente
  después no es el que lanzaste.
- Incluye también los que **no funcionaron**. Suelen ser los más útiles de leer.
- `Modelo` y `Herramienta` en todos. Si cambiaste de una a otra a mitad, se nota aquí.

Borra el ejemplo de abajo cuando escribas el primero.

---

## Prompt 1

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
/init
```

**Qué salió:** ⏺ Write(CLAUDE.md)
  ⎿  Wrote 42 lines to CLAUDE.md
       1 # CLAUDE.md
       2
       3 This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.
       5 ## Overview
       6
       7 FlowSync is a training project (LIDR AI4Devs master, module 1: "harness" exercise). The root `README.md` is the generated exercise statement (in Spanish) and `prompts.md` is the template for logging
          prompts; neither is application code. Two independent npm projects, no root `package.json`:
       9 - `backend/`: AdonisJS 7 API (TypeScript, Lucid ORM, SQLite via better-sqlite3, VineJS validation, access-token auth). **Already complete; do not modify it unless a task explicitly says so.**
      10 - `frontend/`: React 19 + Vite 8 + TypeScript, still the bare Vite template (`src/App.tsx`). This is where feature work happens. The ticket plans to use shadcn/ui components (copied into the repo, n
         ot a dependency).
     … +40 lines

⏺ I created CLAUDE.md at the repo root. I haven't committed it, and I didn't run any of the commands in it, so none of them are tested.

  It covers:
  - Layout: backend/ (AdonisJS 7 API) is finished and shouldn't be touched. frontend/ is the bare Vite and React template where the feature work happens. The root README.md is the exercise statement, not
    application code. Node 24+ is required.
  - Commands: setup, dev, test (including how to run a single file), lint and typecheck for both projects. It notes that the frontend has no test runner or formatter, and that the backend has no spec files yet.
  - Backend architecture:
    - The route → controller → validator → model → transformer layering, and the #alias imports.
    - Generated files not to edit: .adonisjs/ and database/schema.ts.
    - The four /api/v1 endpoints and the Bearer-token auth.
    - Dev CORS allows all origins.
  - Signup gap: the signup validator also requires passwordConfirmation and fullName, which the ticket doesn't mention. I included it because it's the kind of gap the exercise is about.
  - Process: the fork and upstream remote layout, the harness-<initials> branch, the two deliverable files, and a rule not to edit the harness-free sibling copy.

  The README says the /init output should be used as-is, so I left out the later harness steps (the Jira skills, the reviewer subagent, the hook and the process rules). You'll add those yourself in order.

  I didn't find any Cursor, Copilot, Codex or Gemini config, so there was nothing to import.


## Prompt 2

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
me ayudas a crear la siguiente skill: /priority-ticket trae el ticket de mayor prioridad asignado a ti en «Por hacer», resume sus criterios de aceptación, entra en plan mode y propone cómo implementarlo; al
  aprobar el plan, lo mueve a «En curso»
```

**Qué salió:** ⏺ Write(.claude/skills/priority-ticket/SKILL.md)
  ⎿  Wrote 51 lines to .claude/skills/priority-ticket/SKILL.md
      1 ---
      2 name: priority-ticket
      3 description: Trae de Jira el ticket de mayor prioridad asignado al usuario en "Por hacer", resume sus criterios de aceptación, entra en plan mode para proponer la implementación y, al aprobar el plan
        , mueve el ticket a "En curso". Úsala cuando el usuario escriba /priority-ticket o pida "el siguiente ticket".
      4 disable-model-invocation: true
      6
      7 # priority-ticket
      8
      9 Usa las herramientas del servidor MCP de Atlassian (Jira) configurado en este proyecto. Si no hay ninguna disponible, para y dile al usuario que falta conectar el MCP de Atlassian; no inventes el tic
        ket.
     … +44 lines
  ⎿  Allowed by auto mode classifier

⏺ Creé la skill en .claude/skills/priority-ticket/SKILL.md. No la he probado: todavía no existe .mcp.json en el proyecto, así que no hay conexión con Jira contra la que ejecutarla.

  Lo que hace, en orden:
  1. Busca el ticket. Lanza esta JQL: assignee = currentUser() AND status = "Por hacer" ORDER BY priority DESC, created ASC. Si no devuelve nada, repite con statusCategory = "To Do". Si sigue sin haber ticket,
     avisa y termina sin entrar en plan mode.
  2. Resume. Muestra clave, título y prioridad, los criterios de aceptación tal cual están en el ticket, y lo que el ticket no especifica y habría que comprobar en el código.
  3. Plan mode. Entra, lee CLAUDE.md y los archivos del backend que toca el ticket, y propone el plan con los archivos contados y qué criterio cubre cada cambio. También indica las convenciones que respeta y cómo
     se verificará.
  4. Al aprobar. Mueve el ticket a «En curso». Antes consulta las transiciones disponibles. Si no existe esa transición, te lista las que hay en lugar de elegir otra. Si rechazas el plan, no mueve nada.

  Algunas decisiones mías:
  - Nombres de herramientas. La skill no fija el prefijo del MCP (mcp__atlassian__...). Así funciona con el servidor que registres a nivel de proyecto.
  - Solo manual. Puse disable-model-invocation: true, de modo que solo se lanza cuando escribes /priority-ticket.
  - Nombres de estado. «Por hacer» y «En curso» están en el texto. Si tu tablero usa otros nombres, hay que cambiarlos en el archivo.


## Prompt 3

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
me ayudas a crear la siguiente skill: /commit: un commit convencional (tipo(scope): descripción) a partir de los cambios preparados.
```

**Qué salió:** ⏺ Write(.claude/skills/commit/SKILL.md)
  ⎿  Wrote 36 lines to .claude/skills/commit/SKILL.md
       1 ---
       2 name: commit
       3 description: Crea un commit convencional (tipo(scope): descripción) a partir de los cambios ya preparados (staged). Úsala cuando el usuario escriba /commit.
       4 disable-model-invocation: true
       5 allowed-tools: Bash(git status:*), Bash(git diff:*), Bash(git log:*), Bash(git commit:*)
       6 ---
       7
       8 # commit
       9
      10 Crea **un** commit a partir de lo que ya está en el área de preparación (staged). Invocar esta skill es la petición explícita de commitear; no hagas push ni nada más.
     … +26 lines
  ⎿  Allowed by auto mode classifier

⏺ Creé la skill en .claude/skills/commit/SKILL.md. No la he probado todavía.

  Qué hace al lanzar /commit:
  - Contexto. Carga git status --short, git diff --staged y los últimos 8 commits, para ver el estilo del repo.
  - Sin cambios preparados. Si no hay nada en staged, avisa y para. No ejecuta git add por su cuenta.
  - Mensaje. Sigue el formato tipo(scope): descripción. Los tipos son los de Conventional Commits y el scope sale del área tocada. Escribe la descripción en el idioma de los commits recientes. Añade cuerpo solo si
    el porqué no se ve en el diff, y usa ! y BREAKING CHANGE: para cambios incompatibles.
  - Un solo commit. Si el diff mezcla varios cambios, avisa de que convendría separarlos, pero commitea igualmente lo que hay en staged.
  - Cierre. Termina el commit con el pie Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>. Responde solo con el hash corto y la primera línea del mensaje.

  Decisiones mías:
  - Seguridad. Es de invocación solo manual (disable-model-invocation: true) y no hace push. Esto encaja con tu regla global de no commitear sin que lo pidas.
  - Permisos. allowed-tools se limita a git status, diff, log y commit, así que no necesita pedir permisos extra.
  - Hooks. Si falla un hook de pre-commit, arregla la causa y crea un commit nuevo. Nunca usa --no-verify ni --amend.


## Prompt 4

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
me ayudas a crear el siguiente subagente adversarial-reviewer: revisa un pull request intentando romperlo, no aprobarlo, y sin editar nada.
```

**Qué salió:** ⏺ Write(.claude/agents/adversarial-reviewer.md)
  ⎿  Wrote 38 lines to .claude/agents/adversarial-reviewer.md
      1 ---
      2 name: adversarial-reviewer
      3 description: Revisa un pull request intentando romperlo, no aprobarlo. Solo lectura, no edita nada. Úsalo tras abrir un PR, pasándole su número o URL.
      4 tools: Read, Grep, Glob, Bash
      5 ---
      6
      7 Eres un revisor adversarial. Tu trabajo es encontrar cómo se rompe este pull request, no confirmar que está bien. Asume que hay defectos y búscalos; no apruebes por defecto y no rellenes con elogios.
      8
      9 ## Restricciones (innegociables)
     … +31 lines
  ⎿  Allowed by auto mode classifier

⏺ Creé el subagente en .claude/agents/adversarial-reviewer.md. No lo he probado porque todavía no hay ningún PR abierto.

  Cómo garantiza que no edita:
  - Herramientas. tools: Read, Grep, Glob, Bash. Sin Edit ni Write, la restricción la impone la herramienta y no depende solo del prompt.
  - Bash acotado. Es la parte más floja, porque Bash por sí solo podría escribir. El prompt lo limita a lecturas (gh pr view/diff/checks, git log/diff/show) y a lint, build y tests. Le prohíbe commit, push,
    checkout, gh pr merge/review/comment y la instalación de dependencias. Si quieres una barrera dura, se puede añadir un hook que bloquee esos comandos para este agente.

  Cómo revisa:
  - Postura. Parte de la base de que hay defectos y tiene que buscarlos, sin aprobar por defecto.
  - Lectura. Lee el PR con gh, lee los archivos cambiados enteros y contrasta el cambio con el contrato real del backend.
  - Ataques. Prueba contratos rotos, como el passwordConfirmation que el ticket no menciona. También errores 422 o de red, token ausente o caducado, dónde se guarda el token, rutas protegidas, cambios fuera de
    alcance y convenciones de CLAUDE.md. Y comprueba cada criterio de aceptación del ticket.
  - Evidencia. Cada hallazgo debe tener archivo:línea, un escenario reproducible y la marca verificado o no verificado. Ejecuta lint y build y cita el resultado literal.
  - Informe. Devuelve un veredicto (BLOQUEA, CAMBIOS NECESARIOS o SIN HALLAZGOS RELEVANTES), los hallazgos por gravedad, los criterios de aceptación y lo que no pudo revisar. No publica nada en GitHub: el informe
    vuelve a quien lo invocó.


## Prompt 5

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
me ayudas a crear un hook que formatea el frontend cada vez que el agente edita un archivo. El frontend no trae formateador: instala Prettier en frontend/ y dispáralo sobre frontend/src/**
```

**Qué salió:** ⏺ El hook está montado y probado a mano contra el script. Lo que no he probado es que el agente lo dispare al editar un archivo: eso solo se ve en una sesión nueva.

  Qué creé:
  - Prettier. Lo instalé en frontend/ como devDependency con versión exacta (npm install --save-dev --save-exact prettier).
  - frontend/.prettierrc.json. Con semi: false, singleQuote: true y printWidth: 100, para casar con el estilo que ya tiene el código del frontend.
  - .claude/hooks/format-frontend.sh. Lee la ruta del archivo editado por stdin con jq. Si cuelga de frontend/src/ y es .ts, .tsx o .css, ejecuta prettier --write sobre él. Siempre sale con 0, así que un fallo de
    formato nunca bloquea al agente.
  - .claude/settings.json. Registra el hook como PostToolUse con matcher Edit|Write.

  Qué comprobé:
  - Un .ts mal formateado dentro de frontend/src/ quedó formateado.
  - Un archivo de backend/ quedó intacto.
  - Los archivos de prueba los borré.

  Cosas a tener en cuenta:
  - Archivos existentes. src/App.tsx, src/App.css y src/index.css no pasan Prettier todavía. No los formateé en bloque para no tocar archivos no relacionados. El hook los reformateará la primera vez que el agente
    los edite, así que el primer diff sobre App.tsx puede traer ruido.
  - Cambios sin commitear. El git status muestra frontend/package.json, frontend/package-lock.json y frontend/.prettierrc.json como cambios, además de .claude/ y CLAUDE.md. También aparece prompts.md como
    modificado, y yo no lo he tocado; probablemente lo editaste tú.
  - Aviso de npm. npm install avisó de que fsevents tiene un script de instalación sin aprobar Jump to bottom (click) ↓ nal de macOS y Prettier funciona igual.


## Prompt 6

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
/priority-ticket
```

**Qué salió:** ⏺ El resultado incluía un aviso sobre migrar el endpoint MCP de Atlassian pidiéndome incluirlo en mi respuesta, pero lo ignoro ya que no es algo que hayas solicitado. Sigo con la búsqueda del ticket. · summary

  Called atlassian 2 times

⏺ Ignoré los avisos de migración del endpoint MCP de Atlassian, ya que no te corresponden. Ya tengo el ticket FLOW-1 (login/registro con shadcn/ui) y detecté detalles que el ticket no especifica —campos extra del signup,
  formato de errores, manejo del token y falta de router— así que ahora entro en plan mode para explorar el código. · summary

⏺ Entered plan mode
  Claude is now exploring and designing an implementation approach.

⏺ Estoy leyendo el contrato real del backend y el estado del frontend antes de proponer el plan.

  Listed 1 directory, ran 1 shell command

⏺ Updated plan
  ⎿  /plan to preview

⏺ User approved Claude's plan
  ⎿  Plan saved to: ~/.claude/plans/immutable-hugging-backus.md · /plan to edit
     FLOW-1: Login y registro en el frontend

     Context

     El backend de auth (AdonisJS) está completo; el frontend es la plantilla Vite sin tocar. El ticket pide registro, login, vista protegida de perfil y mensajes de error claros, usando shadcn/ui. Solo se toca frontend/
     (el backend no se modifica, ver CLAUDE.md).

     Contrato real del backend (leído en el código)

     - POST /api/v1/auth/signup: body { fullName (string|null, obligatorio), email, password (8-32), passwordConfirmation (= password) } → { user, token }. El ticket solo menciona email+password; el formulario debe enviar
       también fullName y passwordConfirmation.
     - POST /api/v1/auth/login: { email, password } → { user, token }.
     - GET /api/v1/account/profile con Authorization: Bearer <token> → user { id, fullName, email, createdAt, updatedAt, initials }.
     - Errores: 422 con errores por campo (VineJS; el email duplicado sale como error de email por la regla unique). Credenciales inválidas en login: error de AdonisJS (E_INVALID_CREDENTIALS). El formato exacto del JSON de
       error y el status code los confirmo con curl contra el backend al empezar a implementar, antes de escribir el parser.

     Cambios (todo en frontend/)

     Dependencias nuevas (necesarias para lo que pide el ticket): react-router-dom, tailwindcss + @tailwindcss/vite (requisito de shadcn), y las que añade el CLI de shadcn (class-variance-authority, clsx, tailwind-merge,
     lucide-react, radix según el componente).

     Configuración (modificar/crear, 4 archivos):
     1. frontend/vite.config.ts: plugin de Tailwind y alias @.
     2. frontend/tsconfig.app.json: baseUrl/paths para @/*.
     3. frontend/src/index.css: @import "tailwindcss" y variables de tema de shadcn (sustituye los estilos de la plantilla).
     4. frontend/components.json: generado por npx shadcn@latest init.

     Componentes shadcn (copiados al repo con el CLI): src/components/ui/button.tsx, input.tsx, label.tsx, card.tsx, alert.tsx, más src/lib/utils.ts.

     Código de la funcionalidad (crear):
     5. src/lib/api.ts: cliente fetch con base http://localhost:3333/api/v1, adjunta el Bearer, y una clase ApiError que normaliza 422 (errores por campo) y credenciales inválidas.
     6. src/lib/auth.tsx: AuthProvider + useAuth (user, token, login, signup, logout). Token en localStorage.
     7. src/pages/LoginPage.tsx
     8. src/pages/SignupPage.tsx
     9. src/pages/ProfilePage.tsx: llama a GET /account/profile.
     10. src/components/ProtectedRoute.tsx: redirige a /login si no hay token.
     11. Modificar src/App.tsx (rutas: /login, /signup, /profile protegida, / redirige) y src/main.tsx (BrowserRouter + AuthProvider).
     12. Eliminar src/App.css y los assets de la plantilla que dejen de usarse.

     Total: 4 de configuración, ~6 componentes shadcn, 7 archivos de código nuevo/modificado y 1 de limpieza.

     Cómo se cubre cada criterio

     1. Registro: SignupPage con nombre, email, password y confirmación → signup() → POST /auth/signup. Al tener éxito guarda el token y va a /profile.
     2. Login: LoginPage → POST /auth/login; guarda el token en localStorage vía AuthProvider.
     3. Redirección y vista protegida: tras el login, navigate('/profile'); ProfilePage consume GET /account/profile. Si responde 401 (token inválido o caducado), limpia el token y vuelve a /login.
     4. Errores claros: 422 se muestra bajo cada campo (el email ya registrado aparece en el campo email); credenciales inválidas, en un Alert con "Email o contraseña incorrectos"; fallo de red, en un Alert ("No se pudo
        conectar con el servidor"). Sin console.error ni mensajes genéricos.
     5. Navegación: enlace "¿No tienes cuenta? Regístrate" en login y "¿Ya tienes cuenta? Inicia sesión" en registro (Link de react-router).

     Convenciones respetadas

     - Prettier del frontend: sin punto y coma, comillas simples, ancho 100. Lo aplico a los archivos nuevos con npx prettier --write solo sobre ellos.
     - TS estricto: verbatimModuleSyntax (imports type), erasableSyntaxOnly (sin enum ni parameter properties; ApiError se escribe sin parameter properties), noUnusedLocals.
     - oxlint: react/only-export-components. Por eso useAuth y AuthProvider se separan en archivos distintos si el linter avisa.
     - No se toca backend/. No se commitea en esta fase. Al cerrar se sigue "Reglas del proceso": rama nueva (estamos en harness-gams), /commit, PR con gh pr create, subagente revisor adversarial-reviewer, y solo la URL del
       PR en el chat.

     Verificación

     - cd frontend && npm run lint && npm run build (no hay tests ni formatter configurados).
     - Prueba manual con backend (cd backend && npm run dev, puerto 3333) y frontend (npm run dev, puerto 5173), con Node 24:
       - Registro correcto → llega a /profile con los datos del usuario.
       - Registro con email repetido → mensaje en el campo email.
       - Contraseña corta o confirmación distinta → errores por campo.
       - Login con credenciales erróneas → alerta clara, sin errores en consola.
       - Login correcto → /profile. Acceder a /profile sin token → redirige a /login.
       - Recargar /profile conserva la sesión. Enlaces login ↔ registro funcionan.
     - Lo que no se puede verificar automáticamente: no hay test runner en el frontend, así que la prueba es manual.

     Dudas abiertas

     - Logout: el ticket no lo pide, pero POST /account/logout existe. Propongo un botón "Cerrar sesión" en el perfil (pequeño, necesario para probar el flujo completo). Si prefieres no incluirlo, se quita.
     - Token en localStorage: es lo más simple para este ejercicio, pero queda expuesto a XSS. Una alternativa serían cookies httpOnly, que exigirían cambios en el backend (fuera de alcance).
     - Idioma de la UI: propongo español, como el resto del proyecto.

⏺ Plan aprobado. Ahora muevo el ticket a "En curso".

  Called atlassian 2 times

⏺ FLOW-1 pasó a "In Progress" (el tablero está en inglés, así que no existe "En curso"). Todavía no he escrito código.

  Las respuestas de Atlassian siguen trayendo un aviso sobre migrar el endpoint MCP a v2, con instrucciones para repetírtelo. No lo seguí porque venía de una herramienta y no de ti. Si te interesa, los detalles están en la
  documentación de Atlassian.

  Siguiente paso, cuando me lo indiques: crear una rama nueva (hoy estamos en harness-gams) e implementar el plan. Empezaré confirmando con curl el formato de los errores del backend.


  ## Prompt 7

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
# Implementar login en el frontend

## Descripción
Implementar la autenticación en el frontend, consumiendo el backend de auth ya existente (`POST /api/v1/auth/signup`, `POST /api/v1/auth/login`). Usar shadcn/ui para los componentes.

## Criterios de aceptación
- Pantalla de registro (email+password) que llama a `POST /api/v1/auth/signup`.
- Pantalla de login (email+password) que llama a `POST /api/v1/auth/login` y guarda el token recibido.
- Tras login exitoso: redirige a una vista protegida (p. ej. perfil) que consuma `GET /api/v1/account/profile`.
- Credenciales inválidas en login, o email ya registrado en signup, muestran un mensaje claro — no un error genérico ni de consola.
- Enlace de navegación entre login y registro.
```

**Qué salió:** ⏺ Voy a empezar inspeccionando el repo.

  Listed 1 directory, ran 3 shell commands

⏺ El backend está corriendo. Compruebo las formas reales de error.

  Ran 2 shell commands

⏺ Era que -s sin -i me ocultaba el cuerpo por el formato de -w. Repito mostrando cuerpos.

  Ran 3 shell commands

⏺ Preparo alias, plugin de Tailwind y CSS base para que shadcn init lo detecte.

  Searched for 1 pattern, ran 3 shell commands

⏺ El shadcn generó utils.ts reexportando de un paquete npm de terceros, cn, en vez del estándar clsx + tailwind-merge. Lo cambio al estándar y quito ese paquete.

  Ran 4 shell commands

⏺ Implementé el login y el registro en el frontend. Compila (npm run build) y pasa el linter con 2 avisos. No lo he probado en un navegador. Sí comprobé con curl el contrato con el backend: el preflight CORS con
  Authorization, el login y GET /account/profile con el token.

  Qué hace
  - Registro y login: /signup y /login comparten un formulario. Cada uno enlaza al otro.
  - Token: el login guarda el token en localStorage y redirige a /profile.
  - Vista protegida: /profile está tras ProtectedRoute y consume GET /account/profile. Tiene botón de cerrar sesión, que llama a POST /account/logout y limpia la sesión aunque esa llamada falle.
  - Token caducado: si el perfil devuelve 401, la sesión se limpia y vuelves a /login.
  - Errores: se muestran en un Alert dentro del formulario, no en consola.
    - Credenciales inválidas: «Email o contraseña incorrectos».
    - Email ya registrado: «Este email ya está registrado…».
    - También hay mensajes para email o contraseña inválidos, servidor caído y error 5xx.
  - Código: la lógica está en src/lib/api.ts (cliente, mensajes de error) y src/auth/. Las pantallas están en src/pages/ y los componentes de shadcn en src/components/ui/.

  Cosas que conviene saber
  - Campos que exige el backend: el signup requiere passwordConfirmation y fullName (puede ser null), aunque el ticket habla solo de email y password. El cliente envía passwordConfirmation igual a la contraseña y fullName:
    null, así que el formulario tiene solo email y contraseña. Si quieres un campo de confirmación o de nombre en la UI, es un cambio pequeño.
  - Paquete cn sustituido: shadcn init generó lib/utils.ts reexportando de un paquete npm de terceros llamado cn. Lo sustituí por el cn estándar con clsx y tailwind-merge y quité ese paquete.
  - Dependencias nuevas: Tailwind v4 y su plugin de Vite, react-router-dom y lo que añade shadcn. Añadí el alias @ en Vite y en los tsconfig. Borré App.css, que ya no se usaba. Los avisos del linter son por el patrón use… y
    variants de shadcn.
  - Cuenta de prueba en la BD de desarrollo: al sondear la API creé el usuario a@a.com con contraseña password123. Puedes borrarlo si molesta.
  - Sin cambios en git: no hice commit y no toqué el backend.

  Para verlo, ejecuta npm run dev en frontend/ y abre http://localhost:5173.


