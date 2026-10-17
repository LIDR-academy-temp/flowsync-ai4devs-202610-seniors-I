# Parte A

## La comparación

```text
REPOSITORIO A (con harness)                                   | REPOSITORIO B (sin harness)
==============================================================+=========================================================
1. ARCHIVOS TOCADOS                                           |
  5 eliminados, 6 modificados, 25 creados                     | 1 eliminado, 4 modificados, 5 creados
  - Eliminados:                                               | - Eliminados:
    * frontend/src/App.tsx                                    |   * frontend/src/App.css
    * frontend/src/App.css                                    | 
    * frontend/src/assets/hero.png                            | 
    * frontend/src/assets/react.svg                           | 
    * frontend/src/assets/vite.svg                            | 
  - Modificados:                                              | - Modificados:
    * frontend/package.json                                   |   * frontend/src/App.tsx
    * frontend/package-lock.json                              |   * frontend/src/main.tsx
    * frontend/src/main.tsx                                   |   * frontend/package-lock.json
    * frontend/tsconfig.app.json                              | 
    * frontend/vite.config.ts                                 | 
    * frontend/src/index.css                                  |
  - Creados:                                                  | - Creados:
    * frontend/components.json                                |   * frontend/src/auth/api.ts
    * frontend/src/app/pages/HomePage.tsx                     |   * frontend/src/auth/AuthContext.tsx
    * frontend/src/app/App.tsx                                |   * frontend/src/auth/LoginPage.css
    * frontend/src/app/router.tsx                             |   * frontend/src/auth/LoginPage.tsx
    * frontend/src/features/auth/api/getProfile.ts            |   * frontend/src/Home.tsx           
    * frontend/src/features/auth/api/login.ts                 |       
    * frontend/src/features/auth/components                   |     
    * frontend/src/features/auth/components/AuthProvider.tsx  |                      
    * frontend/src/features/auth/components/LoginForm.tsx     |                   
    * frontend/src/features/auth/components/RequireAuth.tsx   |                     
    * frontend/src/features/auth/hooks                        |
    * frontend/src/features/auth/hooks/useLogin.ts            |            
    * frontend/src/features/auth/hooks/useSession.ts          |              
    * frontend/src/features/auth/pages                        |
    * frontend/src/features/auth/pages/LoginPage.tsx          |              
    * frontend/src/features/auth/auth-context.ts              |          
    * frontend/src/features/auth/index.ts                     |   
    * frontend/src/features/auth/schemas.ts                   |     
    * frontend/src/features/auth/session-storage.ts           |             
    * frontend/src/features/auth/types.ts                     |
  ------------------------------------------------------------+---------------------------------------------------------
2. CONVENCIONES RESPETADAS VS. INCUMPLIDAS                    |
  - Respetadas:                                               |  - Respetadas: no hay
    * Feature-first, alias `@/` e `index.ts` como API pública |
     de `features/auth`                                       |
    * Componentes de UI de shadcn/ui en `shared/components/ui`|
    * `import type`, sin `enum`/`any`, componentes con        | 
      `export function`                                       |
    * RHF + zod, `api-client` único, token aislado en         |
      `session-storage.ts`                                    |
    * Textos en español                                       |                                                           
    * `lint` y `build` pasan                                  |
                                                              |
  - Incumplidas:                                              |  - Incumplidas:
    * Dependencias nuevas (13) sin justificar en un PR; entre |    * Implementó el cerrar sesión también sin pedírselo.
      ellas `cn`, instalada por error                         |
    * No se ejecutó `adversarial-reviewer`                    |
    * Sin tests, aunque la tarea no los pedía.                |
    * Se tocó `backend/package-lock.json` (revertido) pese a  |
      que el backend no se modifica                           |
    * Ficheros shadcn con comillas dobles y 2 avisos de       |
      `only-export-components`                                |
  ------------------------------------------------------------+---------------------------------------------------------
3. INTERVENCIONES NECESARIAS                                  |
                                                              |
  1 intervención                                              |  0 intervenciones
                                                              |
  - El token se guardaba como `undefined` porque el backend   | 
    responde `{ data: { token, user } }`; hubo que reportarlo |
    para corregir `api-client`                                |
  ------------------------------------------------------------+---------------------------------------------------------
4. TRABAJO MANUAL PENDIENTE                                   |
                                                              |
  - Escribir tests (Vitest + MSW)                             |  - Escribir tests
  - Analizar si el proyecto merece una estructura diferente.  |  - Analizar si el proyecto merece una estructura diferente.
  - Justificar las dependencias en el PR                      |
  - Ejecutar `adversarial-reviewer`                           |
  - Eliminar la dependencia `cn` de `package.json`            |
```

## Parte B
1. **Qué piezas montaste y cuál te costó más de lo que esperabas**. Los nombres tal cual, y en qué se te fue el rato de verdad.
    - AGENTS.md: punto de entrada del harness.
    - CLAUDE.md: referencia a AGENTS.md
    - .claude/agents/adversarial-reviewer.md: agente que revisa el código de forma adversaria.
    - docs/frontend-architecture.md: arquitectura del frontend.
    - docs/frontend-conventions.md: convenciones de nombres, etc.
    - docs/frontend-test.md: cómo implementar los tests.
    - .claude/settings.json: para configurar el hook que ejecuta validate-frontend.sh.
    - .claude/hooks/validate-frontend.sh: para ejecutar cuando se editan ficheros.

Lo que más me llevó fue revisar los ficheros generados del harness.

2. **La primera diferencia que viste entre las dos salidas, y en qué te fijaste para verla**.
    - Revisando el estado del repositorio con `git status` vi la diferencia de cantidad de ficheros de una solución con respecto a la otra.

3. **Algo que dejaste escrito en el harness y que el agente no cumplió igualmente*.
    - El agente no cumplió la indicación de no tocar el backend, aunque no tocó código del servicio, sí tocó el fichero package-lock.json para deshacer los cambios que yo había hecho, este es el mensaje que me retornó en la respuesta:
      * _Tengo que avisarte de un error mío: ejecuté git checkout backend/package-lock.json para limpiar el lockfile y descarté tu modificación sin cambios confirmados en ese fichero. El backend queda ahora igual que en el último commit. Si hace falta, npm install en backend/ debería regenerar el lockfile, aunque no sé si saldrá idéntico al que tenías._ 
    - No se ejecutó el agente `adversarial-reviewer`, esta es la salida:
      * _No he lanzado el agente adversarial-reviewer._
    - Tengo puesto en AGENTS.md que `No introducir dependencias nuevas sin justificarlas en el PR`, pero añadió las siguientes dependencias sin justificar (aunque la mayoría estaban condicionadas por los componentes de shadcn y por la arquitectura definida):
      * "@hookform/resolvers": "^5.9.1",
      * "@tailwindcss/vite": "^4.3.3",
      * "class-variance-authority": "^0.7.1",
      * "clsx": "^2.1.1",
      * "cn": "^0.5.0",
      * "lucide-react": "^1.58.0",
      * "radix-ui": "^1.8.1",
      * "react-hook-form": "^7.90.0",
      * "react-router": "^8.4.0",
      * "tailwind-merge": "^3.7.0",
      * "tailwindcss": "^4.3.3",
      * "tw-animate-css": "^1.4.0",
      * "zod": "^4.6.7" 
