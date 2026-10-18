## Parte A: Comparación con harness vs sin harness

**1. Qué archivos propone tocar, contados.**

**Con harness**

 0. Rama: git switch -c feat/FLOW-3-login desde harness-guialante. Es regla de CLAUDE.md, y el nombre feat/FLOW-3-login-harness ya existe en el remoto.
 1. Tooling (frontend/):
    - npm i -D prettier y scripts format / format:check en package.json. El hook .claude/hooks/format-frontend.sh y CLAUDE.md ya dan Prettier por instalado, pero no está declarado. Añadir también .prettierrc (sin ;, comillas simples, como el código actual).
    - Tailwind v4: npm i tailwindcss @tailwindcss/vite, añadir el plugin en vite.config.ts y el alias @ → ./src (usando path + @types/node, que ya está).
    - paths @/* en tsconfig.json y tsconfig.app.json, que es lo que exige shadcn.
    - npx shadcn@latest init, que genera components.json, src/lib/utils.ts y los tokens en src/index.css. Después, npx shadcn@latest add button input label card alert.
    - npm i react-router.
 2. Limpiar la plantilla: borrar src/App.css, src/assets/* y el contenido demo de App.tsx. Cambiar <title> en index.html a «FlowSync» y lang="es".
 3. src/lib/api.ts: API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3333', una función request<T>(path, { method, body, token }) que devuelve json.data, class ApiError { status, errors }, y los tipos User / AuthPayload. Funciones signup, login, getProfile y logout.
 4. src/lib/auth-errors.ts: pasa un ApiError a un mensaje legible: 400 en login → «Email o contraseña incorrectos»; database.unique → «Ya existe una cuenta con ese email»; sameAs / minLength / maxLength / email → mensajes por campo; un error de red → «No se pudo conectar con el servidor».
 5. src/auth/AuthContext.tsx: { token, setToken, logout } persistido en localStorage (flowsync.token), con lecturas y escrituras dentro de try/catch.
 6. src/auth/RequireAuth.tsx: si no hay token, <Navigate to="/login" replace />.
 7. Páginas en src/pages/:
    - LoginPage.tsx: email y password. Al enviar, login → setToken → navigate('/profile'). Muestra el error en un Alert y tiene el enlace «¿No tienes cuenta? Regístrate» → /signup.
    - SignupPage.tsx: nombre (opcional), email, password y confirmación. Al registrarse correctamente guarda el token (el backend lo devuelve) y redirige a /profile. Muestra errores generales y por campo, y enlaza «¿Ya tienes cuenta? Inicia sesión» → /login.
    - ProfilePage.tsx: getProfile(token) muestra las iniciales, el nombre, el email y la fecha de alta, con un botón «Cerrar sesión» (POST /account/logout, limpia el token y vuelve a /login). Si la respuesta es 401, limpia el token y redirige a /login.
    - Estado de envío: botón deshabilitado y texto «Entrando…».
 8. src/App.tsx / src/main.tsx: BrowserRouter + AuthProvider + Routes.
 9. frontend/.env.example con VITE_API_URL=http://localhost:3333.

 
 **Sin Harness**

  1. frontend/package.json: npm install con las versiones que ya hay en node_modules, para que queden en package.json y en el lockfile:
    - deps: react-router@^8.4.0, radix-ui@^1.8.1, class-variance-authority@^0.7.1, clsx@^2.1.1, tailwind-merge@^3.7.0, lucide-react@^1.59.0
    - devDeps: tailwindcss@^4.3.3, @tailwindcss/vite@^4.3.3
 2. frontend/vite.config.ts: añadir tailwindcss() a los plugins, resolve.alias: { '@': path.resolve(__dirname, './src') } y server.proxy: { '/api': 'http://localhost:3333' }.
 3. frontend/tsconfig.app.json: añadir "baseUrl": "." y "paths": { "@/*": ["./src/*"] }.
 4. frontend/src/index.css: sustituir el contenido por @import "tailwindcss";, el bloque estándar de shadcn (new-york, base neutral) con :root/.dark, el mapeo @theme inline y la capa @layer base, que da el borde y el fondo/texto del body. Sin tw-animate-css, porque no está instalado y ningún componente lo usa.
 5. frontend/src/main.tsx: envolver en <BrowserRouter><AuthProvider>….
 6. frontend/src/App.tsx: reescribirlo con Routes:
    - /login → LoginPage, /signup → SignupPage
    - un layout RequireAuth que contenga /profile → ProfilePage
    - / y * → <Navigate to={token ? '/profile' : '/login'} />
    - un contenedor centrado (min-h-svh flex items-center justify-center p-4)
 7. Limpieza: borrar src/App.css y los assets de la demo (hero.png, react.svg, vite.svg) si nada más los referencia.

 2. **Qué convenciones del proyecto respetó y cuáles no**, nombrándolas una a una. Si en un lado no había ninguna escrita en ninguna parte, esa es la respuesta y vale.

 **Con harness**

  ▎ ⚠ El README del ejercicio (Parte A, paso 3) dice: «No apliques el plan en ninguna de las dos: se comparan los dos planes». Si apruebas este plan solo para compararlo, no lo implemento. Dímelo al aprobarlo.

 **Sin Harness**
 Ejecutar el plan. FLOW-3 ya está en «In Progress», así que no hace falta transición en Jira.


 **Cuántas veces tuviste que intervenir**
 Ninguna en ambos casos


 **Qué te tocaría arreglar a mano antes de enseñarle eso a alguien de tu equipo.**

 **Con harness**
 Dudas / riesgos

 - ¿Aplicar o solo comparar? Ver el aviso de arriba (README del ejercicio).
 - passwordConfirmation y fullName van más allá del texto del ticket, pero el backend los exige o acepta. Los incluyo.
 - Token en localStorage: es simple y basta para el ejercicio, aunque es vulnerable a XSS. La alternativa (cookies con el guard web) obligaría a tocar el backend, que no se puede modificar.
 - shadcn init reescribe src/index.css y puede preguntar cosas de forma interactiva. Lo lanzo con flags no interactivos (-y, --base-color neutral).

  **Sin Harness**
  No propone nada


## Parte B: las tres líneas


1. Hasta qué pieza llegaste, y cuál te costó más de lo que esperabas

Pude hacer todos los puntos, ninguno tuvo una mayor dificultad.


2. La primera diferencia que viste entre las dos salidas, y en qué te fijaste para verla.

La respuesta dada por el ejecutado con Harness es mas estructurada, y mas descriptiva, tambien pude ver
que realiza preguntas, no asume.


3. Algo que dejaste escrito en el harness y que el agente no cumplió igualmente
