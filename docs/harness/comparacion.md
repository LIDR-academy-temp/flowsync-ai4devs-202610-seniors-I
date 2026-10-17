# Comparación: con harness vs. sin harness

**Encargo:** FLOW-5 «Implementar login en el frontend». Con harness: `/priority-ticket`. Sin harness: la misma instrucción escrita a mano (traer el ticket de mayor prioridad asignado a mí, resumir sus criterios y entrar en plan mode). Se comparan los **planes**; no se aplicó ninguno.

**Modelo y herramienta:** Opus 5.5 · Claude Code, en las dos copias, cada una en su carpeta y su sesión.

## 1. Archivos que propone tocar

Contando cada archivo por separado (`package.json` y su lock son dos).

**Con harness**

- 21 creados o modificados (el plan dice 20 porque cuenta `package.json` y el lock como uno).
- 4 borrados: `App.css`, `react.svg`, `vite.svg`, `hero.png`.
- Solo `frontend/`.

**Sin harness**

- 25 creados o modificados: 15 nuevos (con los 5 de `ui/`) y 10 modificados.
- Borrados sin enumerar: "`src/App.css`, `src/assets/*` y `public/icons.svg` si nada los usa".
- Solo `frontend/`.
- Lo que añade respecto al otro plan: `frontend/.env.example`, un `frontend/README.md` nuevo, `@types/node`, cambios en `src/main.tsx` y una carpeta `auth/` (`AuthProvider`, `useAuth`, `ProtectedRoute`) en lugar de un `lib/auth.ts`.

## 2. Convenciones respetadas y no respetadas

**Con harness**

- ✅ Rama nueva antes de tocar código (`feat/FLOW-5-login`).
- ✅ Proceso completo: `/commit` → `gh pr create` → `adversarial-reviewer` → `gh pr comment` con el informe → solo el enlace.
- ✅ El plan sigue las 7 secciones que pide la skill `/priority-ticket`, con referencias `archivo:línea`.
- ✅ Formato con Prettier (`.prettierrc.json`, `npm run format`, `prettier --check`).
- ✅ `import type` y sin enums, como pide el tsconfig.
- ✅ Sin alcance extra: deja fuera el logout porque el ticket no lo pide.
- ✅ Avisa del riesgo de base del PR (`harness-at` vs `main`).
- ❌ Contrato: dice que `fullName` es opcional y no lo manda; no lo es.

**Sin harness**

- ✅ Rama nueva y commits convencionales, sin un archivo de instrucciones que los pida.
- ✅ Deduce otras convenciones del código: imports con extensión explícita, componentes `function X()` + `export default`, comentarios en inglés, textos de la UI en español.
- ⚠ Formato: deduce el estilo de `main.tsx` y plantea reformatear a mano lo que genera shadcn.
- ❌ Alcance extra: logout (botón «Cerrar sesión»), `AuthProvider`, `.env.example`, nuevo README.
- ✅ Contrato correcto: `fullName` es `nullable()` sin `optional()`, y el plan lo aplica (`SignupPage` envía `fullName: null`).

## 3. Intervenciones

**Con harness:** "Plan aceptado, guardado en la carpeta `Plans` y en la rama `feat/FLOW-5-login`, sin ejecutar." Al aceptarlo, el agente creó la rama `feat/FLOW-5-login` (regla 1 del `CLAUDE.md`), pero no tocó código.

**Sin harness:** "Plan aceptado, guardado en la carpeta `Plans`, sin ejecutar." No se creó ninguna rama.

## 4. Qué arreglaría a mano

**Con harness**

- Enviar `fullName: null` en el signup: con el plan tal cual, el registro daría 422.
- Corregir la tabla de `CLAUDE.md`, que es de donde viene el error.

**Sin harness**

- Quitar lo que va más allá del ticket (logout, `AuthProvider`, README).
- Nada que corregir en el contrato.

**Nota sobre la copia pelada:** no está del todo pelada. El `README.md` de `s1/start` está en las dos copias y describe las 8 piezas, así que la copia sin harness pudo leer parte de las reglas desde ahí (su plan dice "El backend no se toca (lo dice el README)" y "Rama: nueva antes de tocar código", con las mismas palabras que la regla del README).

## Las tres líneas

1. **Hasta qué pieza llegué y cuál me costó más:** llegué a la 8 (las ocho montadas y commiteadas).
2. **Primera diferencia que vi y dónde miraba:**
3. **Algo escrito en el harness que el agente no cumplió:** la skill `/priority-ticket` dice "find those in the code, not by guessing". El plan con harness repitió lo que dice el `CLAUDE.md` generado por `/init` (`fullName (optional/nullable)`) en vez de leerlo bien en el validador, aunque cita ese mismo archivo (`user.ts:13`). El harness no solo no evitó el error, lo introdujo: un `CLAUDE.md` "tal cual sale" con un dato mal puesto pesa más que el código que el agente tiene delante.
