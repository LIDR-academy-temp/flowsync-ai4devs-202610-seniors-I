# Comparación: con harness vs. sin harness

Encargo: FLOW-1 «Implementar login en el frontend». Mismo modelo (Opus 5.5) y misma herramienta (Claude Code, terminal) en los dos lados. Con harness: `/priority-ticket`. Sin harness: la misma instrucción escrita a mano. Ningún plan se aplicó.

| Casilla | Con harness | Sin harness |
|---|---|---|
| **1. Archivos que propone tocar** | 18 nombrados: 5 modificados (`vite.config.ts`, `tsconfig.app.json`, `index.css`, `main.tsx`, `App.tsx`) y 13 nuevos (`components.json`, `lib/{api,utils}.ts`, 5 de `components/ui`, 3 páginas, `AuthContext`, `ProtectedRoute`). Borra `App.css` y los assets. No nombra `package.json`, aunque añade dependencias. | 20 nombrados: 7 modificados (los mismos más `package.json` y `tsconfig.json`) y los mismos 13 nuevos. Borra `App.css` y los assets. |
| **2. Convenciones respetadas / no** | Sí: backend intacto, shadcn/ui, rama nueva (`feat/FLOW-1-login`), `/commit`, PR contra `LIDR-academy-temp`, revisión con `adversarial-reviewer`, `build` + `lint`. No: no lista `package.json`; la skill pedía leer el ticket con `getJiraIssue` y no lo hizo. | No había ninguna escrita. Dedujo del código: backend intacto (lo leyó en el README), shadcn/ui (ticket), `erasableSyntaxOnly` del tsconfig, `build` + `lint`. Nada de rama, commit, PR ni revisión. |
| **3. Intervenciones** | 0 en el encargo (solo permisos de lectura y Esc para no aprobar). En el montaje: 3. | 0 (solo permisos de lectura y Esc para no aprobar). |
| **4. Qué arreglaría a mano** | Añadir `package.json` al plan; el hook de Prettier usará comillas dobles y `;`, al revés que el repo; `VITE_API_URL` sin documentar en un `.env.example`. | Añadir todo el flujo de git: rama, commit, PR y revisión. Sin eso trabajaría directamente sobre `harness-SNMS`. |

Los dos encontraron el hueco del ticket (`passwordConfirmation`, `fullName`, 422 `database.unique`, 400 en login, 401 en perfil) leyendo el backend.

## Parte B

1. **Llegué a la pieza 8 y al commit del harness. La que más me costó fue la 2 (conectar Jira):** unos 20 minutos. El agente creó el archivo `.mcp.json` con un error, lo "probó" usando la conexión a Jira que ya tenía mi cuenta y me dijo que estaba listo. Tuve que pedirle que lo comprobara de verdad con `claude mcp list`, y luego aprobar y conectar el servidor yo mismo.
2. **Pensaba que la diferencia estaría en los datos que el ticket no dice, y no fue así:** la copia sin harness también revisó el backend y pidió confirmar la contraseña. La diferencia la vi en la terminal, al final de cada plan: el de la copia con harness termina con los pasos de trabajo (crear rama, `/commit`, abrir el PR en el repo correcto y pasar el revisor); el de la copia sin harness no dice nada de git.
3. **La skill `/priority-ticket` le pide leer el ticket completo con `getJiraIssue`, y no lo hizo:** se quedó con el resultado de la búsqueda. Lo vi al revisar el registro de la sesión.

**Tiempo:** no paré a los 45 minutos. El montaje y el encargo me llevaron unos 85 (00:26 → 01:52). Más o menos a los 45 minutos iba por la pieza 3.
