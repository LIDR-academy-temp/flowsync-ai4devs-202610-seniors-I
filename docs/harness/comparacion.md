# Comparación: con harness vs. sin harness

**Encargo:** ticket de Jira «Implementar login en el frontend», el mismo texto en las dos copias.

**Harness montado:**

1. `CLAUDE.md` en la raíz, con convenciones y prohibiciones.
2. Hook `PostToolUse` que pasa Prettier sobre el archivo editado en `frontend/src`.

**Nota sobre el entorno:** la copia `flowsync-sin-harness` no quedó completa. Le faltan `.git` y parte de `backend/` (`start/routes.ts`, `package.json`, `adonisrc.ts`). Las dos copias no partían exactamente del mismo código.

## Parte A: las cuatro casillas

| | Con harness | Sin harness |
|---|---|---|
| **1. Archivos que tocó** | 12: 8 nuevos (`api/authApi.ts`, `api/httpClient.ts`, `auth/tokenStorage.ts`, `auth/authErrorMessages.ts`, `components/FormField.tsx`, `pages/LoginPage.tsx`, `pages/RegisterPage.tsx`, `pages/ProfilePage.tsx`) y 4 modificados (`App.tsx`, `App.css`, `vite.config.ts`, `package.json` con Prettier) | 11: 7 nuevos (`api.ts`, `auth/AuthProvider.tsx`, `auth/auth_context.ts`, `auth/errors.ts`, `pages/LoginPage.tsx`, `pages/SignupPage.tsx`, `pages/ProfilePage.tsx`), 3 modificados (`App.tsx`, `vite.config.ts`, `package.json`) y `App.css` borrado |
| **2. Convenciones respetadas / no respetadas** | Respetó: TypeScript, componentes pequeños, cliente HTTP compartido (`httpClient.ts`), ninguna dependencia nueva, token guardado solo tras login, nombres en camelCase/PascalCase, contrato del backend (`passwordConfirmation`, mínimo de 8 caracteres, error `database.unique`). No respetó: | No había convenciones escritas. Aun así respetó el contrato del backend (`passwordConfirmation`, mínimo de 8, `database.unique`). Añadió la dependencia `react-router`. Mezcla nombres de archivo (`auth_context.ts` frente a PascalCase) |
| **3. Veces que intervine** | 0. Un solo prompt (el ticket); el agente no hizo preguntas y no rechacé ni interrumpí nada | 0. Un solo prompt (el ticket); el agente no hizo preguntas y no rechacé ni interrumpí nada |
| **4. Qué arreglaría a mano** | Prettier sin `.prettierrc` cambió el estilo del proyecto (comillas dobles y `;` frente a comillas simples sin `;`). | Unificar nombres de archivo. Justificar o quitar `react-router`. Revisar el borrado de `App.css`. |

**Comprobaciones:**

- **Con harness:** `npm run lint` y `npm run build` pasan.
- **Sin harness:** `oxlint` y `tsc --noEmit` pasan.
- **Flujos en el navegador:** no se probaron en ninguna de las dos copias.

## Parte B: las tres líneas

1. **Qué piezas monté y cuál me costó más:** monté `CLAUDE.md` (instrucciones) y un hook `PostToolUse` con Prettier. Me costó más el hook. La primera versión (`npx prettier --write src`) formateaba todo `src` en cada edición y tocaba archivos que nadie había editado. La reescribí para que lea `tool_input.file_path` (con `node`, porque no tengo `jq`) y formatee solo ese archivo. Además, el cambio no se aplica hasta reiniciar la sesión.

2. **La primera diferencia que vi y dónde miré:** la estructura de `frontend/src`, al listar los archivos de las dos copias sin abrir ninguno. La copia con harness separó el cliente HTTP (`api/httpClient.ts`), el guardado del token (`auth/tokenStorage.ts`) y un componente `FormField`. La pelada lo concentró en un solo `api.ts` más un `AuthProvider`, y añadió `react-router` al `package.json`.

3. **Algo escrito en el harness que no se cumplió:** `CLAUDE.md` dice "No implementes cambios sin explicar primero qué archivos vas a modificar", y el agente empezó a escribir archivos directamente tras un "Now I'll implement", sin listarlos antes. Tampoco hizo la revisión de la consola del navegador ni la prueba manual de los flujos: no tenía herramienta de navegador, lo dijo, y las sustituyó por `curl` a través del proxy. Y reescribió `App.css` con un heredoc de Bash en vez de Edit/Write, así que ese archivo se saltó el hook de Prettier.
