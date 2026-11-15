# Auditoría de reglas: últimos 15 commits y árbol actual

- **Autora:** SH (sylviahr81)
- **Fecha:** 2026-11-15
- **Base auditada:** `s5/start` en `aee9a24`. Rango de commits `b955a72..aee9a24`, 15 commits: `git log -15`.
- **Reglas auditadas:** las de `CLAUDE.md` (`AGENTS.md` es un symlink a él, `ls -la AGENTS.md`), las de la skill `.claude/skills/commit/SKILL.md` y las del subagente `.claude/agents/adversarial-reviewer.md`.
- **Alcance:** solo lectura. No se ha modificado ningún archivo del repo salvo este. Para comprobar si `.adonisjs/` estaba al día se regeneró una copia de `backend/` en un directorio temporal, fuera del repo.
- **Mi apuesta**: Se cumplen 3 y 2 no se cumplen de las reglas de CLAUDE.md.

## Tabla

| # | Qué pide la regla | Qué se miró | Veredicto | Evidencia | Qué haría |
|---|---|---|---|---|---|
| 1 | Nunca se commitea directamente en `main` ni en una `sN/*`: el trabajo va en una rama propia. | `git branch -a --contains <sha>` para cada commit; `git log -15 --merges`; `git reflog show s5/start` | no se puede comprobar con lo que hay | Los 15 commits solo están en `sN/*`, sin merge commits. Un fast-forward desde una rama ya borrada deja la misma historia, así que falta protección de rama o exigir merge commits. | bajarla |
| 2 | Si ya estás en una rama de trabajo, sigues en ella en vez de abrir otra por cada petición. | `git branch -a`; `git log -15 --format='%h %s'` | no se puede comprobar con lo que hay | Git no registra qué petición generó cada commit ni en qué rama nació, y hay ramas `*-sh` por ejercicio, no por petición. Faltaría un vínculo commit→petición, por ejemplo un ticket en un trailer. | borrarla |
| 3 | Cada petición se cierra con su propio commit. | `git log -15` | no se puede comprobar con lo que hay | Las peticiones del chat no quedan en el repo. Sin un identificador de petición en el mensaje no hay nada con qué cruzar los commits. | borrarla |
| 4 | El mensaje de commit sigue la forma `tipo(scope): descripción` con un tipo de la lista feat/fix/refactor/docs/test/chore. | `.claude/skills/commit/SKILL.md`; `git log -15 --format=%s \| grep -vE '^(feat\|fix\|refactor\|docs\|test\|chore)\([^)]+\): '` | no se cumple | `aee9a24 docs: las instrucciones apuntan a los repos del cohorte…`: no tiene scope. Es 1 de 15. | bajarla |
| 5 | Un commit que toca rutas, controladores, validadores o transformers de una capability incluye en ese mismo commit el README de la capability. | `git log -15 --name-status`. La regla entra en `160fbc7`; desde entonces solo `cbe9617` toca controladores. | se cumple | `cbe9617` modifica los 3 controladores de tasks y también `docs/capabilities/tasks/README.md`. | bajarla |
| 6 | Ese mismo commit incluye el diff regenerado de `.adonisjs/` para que el OpenAPI y los tipos queden al día. | Copia de `backend/` fuera del repo, `node ace test --files=__ninguno__` (corre los hooks de codegen) y `diff -r` contra el `.adonisjs/` commiteado | se cumple | `diff -r` sin diferencias: lo commiteado coincide con lo que genera el código actual. | bajarla |
| 7 | La unidad de trabajo termina con un único PR, abierto con `gh pr create` y con una descripción completa. | `gh pr list --repo sylviahr81/… --state all` (0 PRs); `gh pr list --repo LIDR-academy-temp/… --state merged` (0 PRs) | no se cumple | Ninguno de los 15 commits llegó a `s5/start`/`s4/end` por un PR: el upstream no tiene ningún PR mergeado. | bajarla |
| 8 | Antes de dar la unidad por cerrada, el subagente `adversarial-reviewer` revisa ese PR, y es lo último que se hace. | Lo mismo que en la fila 7: no hay PR sobre el que buscar comentarios de revisión | no se puede comprobar con lo que hay | El subagente devuelve su resultado al chat y no lo guarda en ningún sitio. Haría falta que publicara su informe como comentario del PR. | bajarla |
| 9 | Al abrir el PR, la respuesta en el chat es solo la URL. | Nada en el repo: la regla solo afecta al chat | no se puede comprobar con lo que hay | El chat no se guarda. No hay ningún artefacto que revisar. | borrarla |
| 10 | El subagente revisor es de solo lectura y no puede arreglar lo que encuentra. | `.claude/agents/adversarial-reviewer.md`, frontmatter `tools:` | se cumple | `tools: Read, Grep, Glob`: no tiene `Bash`, `Edit` ni `Write`. | dejarla |
| 11 | `backend/database/schema.ts` no se edita a mano: se regenera desde las migraciones. | `git log --oneline b955a72^..HEAD -- backend/database` | se cumple | Ningún commit del rango toca `backend/database/`. | bajarla |
| 12 | Los modelos no declaran columnas: solo relaciones, mixins y lógica sobre la clase generada. | `grep -rn "@column\|declare " backend/app/models` | se cumple | Solo aparecen `declare currentAccessToken?` (`user.ts:9`) y `declare assignee: BelongsTo` (`task.ts:29`), que no son columnas. | dejarla |
| 13 | Las rutas apuntan a controladores con `controllers.X` del registro generado, no con lazy imports. | `backend/start/routes.ts`; `grep -n "import(" backend/start/routes.ts` | se cumple | Los 9 handlers usan `[controllers.X, '…']` y no hay ningún `import(`. | dejarla |
| 14 | Toda respuesta de controlador sale por `serialize()` y a través de un transformer, nunca un objeto crudo. | `grep -n "return\|serialize" backend/app/controllers/*.ts` | no se cumple | `backend/app/controllers/access_tokens_controller.ts:25`: `destroy` devuelve `{ message: 'Logged out successfully' }` sin `serialize()`. | dejarla |
| 15 | El código importa con los subpaths `#…` en lugar de rutas relativas. | `grep -rnE "from '\.{1,2}/" backend/{app,start,config,providers,tests,database}`; mapa `imports` de `backend/package.json` | no se cumple | `backend/tests/bootstrap.ts:10` importa `'../.adonisjs/client/registry/schema.d.ts'`, porque `#generated/*` solo cubre `.adonisjs/server`. | bajarla |
| 16 | Los validadores se construyen con `vine.create(...)`, no con `vine.compile`. | `grep -rn "vine\.\(compile\|create\)" backend/app/validators` | se cumple | Los 7 validadores usan `vine.create` (`task.ts` y `user.ts`). | dejarla |
| 17 | Las variables de entorno nuevas se añaden con `node ace env:add`, que las mantiene alineadas en `.env`, `.env.example` y `start/env.ts`. | `git log --oneline b955a72^..HEAD -- backend/start/env.ts backend/.env.example`; comparación de claves a mano | no se puede comprobar con lo que hay | El rango no añade ninguna variable y el comando no deja rastro. Hoy `TZ` está en `.env.example` pero no en el schema de `start/env.ts`. | bajarla |
| 18 | Los tests que escriben en la BD se aíslan con `testUtils.db()`. | `grep -n "testUtils" backend/tests/functional/**/*.spec.ts` | se cumple | Los 5 specs, incluido `tasks/assignee.spec.ts` (de `4427afc`), hacen `group.each.setup(() => testUtils.db().withGlobalTransaction())`. | bajarla |
| 19 | En el frontend, toda llamada a la API pasa por `src/lib/api.ts`. | `grep -rn "fetch(" frontend/src \| grep -v src/lib/api.ts` | se cumple | No hay ningún `fetch(` fuera de `src/lib/api.ts`. | bajarla |
| 20 | Los componentes de `src/components/ui/` se traen con shadcn y no se editan a mano. | `git diff --stat b955a72^ HEAD -- frontend` | se cumple | El rango no toca nada de `frontend/`. Cuando se edite, no habrá forma de distinguir una edición a mano de un `shadcn add`. | dejarla |
| 21 | El código del frontend respeta el estilo Prettier del repo (`semi: false`, `singleQuote: true`). | `cd frontend && npx prettier --check .`; hook `PostToolUse` en `.claude/settings.json` | se cumple | «All matched files use Prettier code style!» y el hook ya lo ejecuta en cada edición. | dejarla |
| 22 | El alias `@/*` se declara en `tsconfig.app.json` sin `baseUrl` y también en `vite.config.ts`. | `grep -n "baseUrl\|@/\*" frontend/tsconfig.app.json`; `grep -n "'@'" frontend/vite.config.ts` | se cumple | `tsconfig.app.json:13` tiene `"@/*": ["./src/*"]` sin `baseUrl`, y `vite.config.ts:11` tiene `'@': path.resolve(…)`. | dejarla |

## Fuera de tabla: lo que `CLAUDE.md` afirma y el árbol contradice

Esto no son reglas, son descripciones. Las anoto porque quien lea `CLAUDE.md` va a actuar sobre ellas.

- **«La capability `tasks` no tiene ni un test»** es falso desde `4427afc`, que añadió `backend/tests/functional/tasks/assignee.spec.ts`.
- **La tabla «Rutas actuales»** lista 4 rutas. `backend/start/routes.ts` registra además las 5 de `/api/v1/tasks` y las 3 de OpenAPI (`/api`, `/api.json`, `/api.yaml`, de `ea5db1f`).
- **Estado del árbol:** `.vs/` aparece sin versionar (`git status`) y no está en ningún `.gitignore`. Un `git add -A` la metería en el repo.
- **Controles ejecutados para comprobar el árbol, todos en verde:** `npm run lint` y `npx tsc --noEmit` en `backend/`, y `npx oxlint` en `frontend/`, todos con exit 0. No se ejecutaron `npm test` ni `npm run build` en el repo porque escriben en `tmp/db.sqlite3` y `dist/`.


## Parte B

1. **La regla sobre la que te equivocaste.** Sobre lo que más me equivoqué fue en la cantidad de reglas porque yo sólo leí las 5 reglas del CLAUDE.md y no las 22 que leyó el agente en total. Por eso me equivoqué en la cantidad de reglas que se cumplen, no se cumplen o no se pueden comprobar. 

2. **La regla que no se puede comprobar con lo que hay**: Específicamente, me equivoqué en las de los commits porque pensé que se cumplían pero en esta rama no se pueden comprobar, todos los commits están en `sN/*`, sin merge commits. Falta protección de rama o exigir merge commits.

3. **La regla que borrarías, y por qué.** La número 10, "El subagente revisor es de solo lectura y no puede arreglar lo que encuentra". El frontmatter tools: Read, Grep, Glob ya le quita la capacidad de editar. Escribirlo también en el CLAUDE.md es repetir la configuración. Esta es de las que se cumplen solas porque la herramienta ya lo impide.