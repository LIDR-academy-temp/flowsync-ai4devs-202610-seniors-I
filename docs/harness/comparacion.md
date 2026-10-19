### Comparación

## Con harness

Propone tocar los siguientes archivos:

1. frontend/vite.config.ts: plugin de Tailwind y alias @.
2. frontend/tsconfig.app.json: baseUrl/paths para @/*.
3. frontend/src/index.css: @import "tailwindcss" y variables de tema de shadcn (sustituye los estilos de la plantilla).
4. frontend/components.json: generado por npx shadcn@latest init. Componentes shadcn (copiados al repo con el CLI): src/components/ui/button.tsx, input.tsx, label.tsx, card.tsx, alert.tsx, más src/lib/utils.ts.
5. src/lib/api.ts: cliente fetch con base http://localhost:3333/api/v1, adjunta el Bearer, y una clase ApiError que normaliza 422 (errores por campo) y credenciales inválidas.
6. src/lib/auth.tsx: AuthProvider + useAuth (user, token, login, signup, logout). Token en localStorage.
7. src/pages/LoginPage.tsx
8. src/pages/SignupPage.tsx
9. src/pages/ProfilePage.tsx: llama a GET /account/profile.
10. src/components/ProtectedRoute.tsx: redirige a /login si no hay token.
11. Modificar src/App.tsx (rutas: /login, /signup, /profile protegida, / redirige) y src/main.tsx (BrowserRouter + AuthProvider).
12. Eliminar src/App.css y los assets de la plantilla que dejen de usarse.

Convenciones respetadas:

- Prettier del frontend: sin punto y coma, comillas simples, ancho 100. Lo aplico a los archivos nuevos con npx prettier --write solo sobre ellos.
- TS estricto: verbatimModuleSyntax (imports type), erasableSyntaxOnly (sin enum ni parameter properties; ApiError se escribe sin parameter properties), noUnusedLocals.
- oxlint: react/only-export-components. Por eso useAuth y AuthProvider se separan en archivos distintos si el linter avisa.
- No se toca backend/. No se commitea en esta fase. Al cerrar se sigue "Reglas del proceso": rama nueva (estamos en harness-gams), /commit, PR con gh pr create, subagente revisor adversarial-reviewer, y solo la URL del
PR en el chat.

Intervenciones:

- Ninguna

## Sin harness

Toco los siguientes archivos:

1. frontend/package-lock.json
2. frontend/package.json
3. frontend/src/App.css
4. frontend/src/App.tsx
5. frontend/src/index.css
6. frontend/tsconfig.app.json
7. frontend/tsconfig.json
8. frontend/vite.config.ts
9. frontend/components.json
10. frontend/src/auth/
11. frontend/src/components/
12. frontend/src/lib/
13. frontend/src/pages/


Intervenciones:

- Ninguna


* **Hasta qué pieza llegaste, y cuál te costó más de lo que esperabas:** Complete las 8 sin problemas
* **La primera diferencia que viste entre las dos salidas, y en qué te fijaste para verla:** Me fije en el resultado que me dio claude cuando ejecuté /priority-ticket en el proyecto con harness y directamente la descripción del ticket en el proyecto sin harness, en el proyecto con harness con se modificó ningun archivo y se creo un plan con el detalle de lo que se va arealizar y en el proyecto sin harness modificó directamente lso archivos.
* **Algo que dejaste escrito en el harness y que el agente no cumplió igualmente:** No cumplió ninguna de las reglas del proceso que deje escritas al final del archivo CLAUDE.md
