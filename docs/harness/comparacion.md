# Comparación: con harness vs sin harness

## 1. Archivos tocados

| | Creados | Modificados | Borrados | **Total** |
|---|---:|---:|---:|---:|
| `flowsync-ai4devs` | 22 | 4 (+2 en fix post-review) | 2 | **26** |
| `flowsync-sin-harness` | 14 | 10 | 4 | **28** |


| | Solo en `ai4devs` | Solo en `sin-harness` |
|---|---|---|
| **Mismo archivo, path distinto por naming** (5) | `ProtectedRoute.tsx`, `AuthContext.tsx`, `LoginPage.tsx`, `ProfilePage.tsx`, `SignupPage.tsx` | `routes/protected-route.tsx`, `context/auth-context.tsx`, `pages/login-page.tsx`, `pages/profile-page.tsx`, `pages/signup-page.tsx` |
| **Exclusivo real** | — | `frontend/index.html`, `frontend/tsconfig.json`, `components/ui/form.tsx`, `lib/auth-storage.ts` |

*(Se omiten de esta comparación `CLAUDE.md` y `backend/package-lock.json` — no son parte del alcance funcional del ticket en ninguno de los dos lados.)*

Destacados:

- **ai4devs**: el fix post-review tocó solo 2 archivos (`AuthContext.tsx`, `lib/api.ts`) — el propio subagente encontró y corrigió bugs antes de cerrar.
- **sin-harness**: toca 4 archivos que ai4devs ni roza: `frontend/index.html` y `tsconfig.json` (ai4devs no necesitó tocarlos), un `auth-storage.ts` separado del contexto (en ai4devs esa lógica vive dentro de `AuthContext.tsx`), y un componente `form.tsx` de shadcn de más.

**Conclusión:** la diferencia de archivos no es de alcance (los dos resuelven login + signup + perfil + guard con el mismo set funcional de pantallas y endpoints) sino de **disciplina de scope y estructura**. `sin-harness` toca 2 archivos de configuración de proyecto (`index.html`, `tsconfig.json`) que no eran necesarios para el ticket, y fragmenta la lógica de auth en un archivo extra (`auth-storage.ts`) que en el otro lado queda contenida en un único sitio. Son señales de que, sin las reglas de proceso del harness marcando "esto es lo que toca el ticket, nada más", el agente tiende a tocar más superficie de la estrictamente necesaria y a trocear el código de forma menos predecible.

## 2. Convenciones

| Convención | Fuente | ai4devs | sin-harness |
|---|---|---|---|
| No tocar `backend/` | Escrita (`CLAUDE.md`) | ✅ Respetada | ✅ Respetada |
| No editar `database/schema.ts` a mano | Escrita | ✅ Respetada | ✅ Respetada |
| shadcn/ui copiado, no instalado | Escrita | ✅ Respetada | ✅ Respetada (añade además `form.tsx`) |
| Naming de páginas/contexto | **No escrita en ningún lado** | `PascalCase`: `LoginPage.tsx`, `AuthContext.tsx` | `kebab-case`: `login-page.tsx`, `auth-context.tsx` |
| Carpeta de contexto auth | No escrita | `src/contexts/` (plural) | `src/context/` (singular) |
| Ubicación del guard de rutas | No escrita | `src/components/ProtectedRoute.tsx` | `src/routes/protected-route.tsx` |
| Rama nueva por ticket | **Creada por el harness en runtime** | ✅ Seguida | ❌ No existe, no se practicó |
| Commit `FLOW-XXXX :: ...` | Creada por el harness | ✅ Seguida (2/2) | ❌ No existe |
| PR + revisión adversarial antes de cerrar | Creada por el harness | ✅ Seguida | ❌ No existe |

**Lectura:** en lo que ya estaba escrito, 0 diferencias. En lo no escrito (naming frontend), cada lado improvisó algo consistente pero distinto. Las reglas de *proceso* solo existen en ai4devs porque el harness las definió y las siguió.

## 3. Intervenciones del usuario

| | Nº | Detalle |
|---|---:|---|
| `flowsync-ai4devs` | Muchas | durante el proceso de creación del Harness, me interrumpió mucho
| `flowsync-ai4devs` | ~5 | Se paró para solicitar permisos para instalar librerías y plugins
| `flowsync-sin-harness` | 0 | Ha hecho todo del tirón bien y en tiempo. Debería revisarse el código en condiciones porque ha hecho lo que ha querido, aunque al final lo ha hecho bien. 

## 4. Qué tocaría arreglar a mano antes de enseñarlo

| | ai4devs | sin-harness |
|---|---|---|
| **Confianza en el código** | Durante la sesión se verificó con Playwright contra el flujo real (login/signup/perfil) antes de cerrar — da confianza de que lo construido funciona de verdad, no solo "parece correcto" | **Sin validar**. Nadie ha comprobado que el flujo funcione end-to-end; hay que revisarlo entero a mano antes de confiar en él |
| **Naming y tipado** | Sigue una convención propia consistente (`PascalCase` en páginas/contexto, `src/contexts/`) | Mezcla estilos (`kebab-case`) inconsistente con el resto — habría que renombrar para alinearlo con la convención que el equipo use realmente |
| **Tests automatizados** | ❌ No se crearon (ningún `.test.`/`.spec.` en el repo) | ❌ Tampoco |

**Conclusión:** ninguno de los dos entrega tests automatizados — es un hueco de los dos lados, no una ventaja del harness, y habría que definírselo explícitamente (pedir que `/priority-ticket` o las reglas de proceso incluyan "escribir tests" como paso obligatorio, no dar por hecho que el agente los añade solo). La diferencia real de confianza viene de otro lado: `ai4devs` sí pasó por una verificación funcional (Playwright en sesión) y por el `adversarial-reviewer` antes de cerrar, mientras que `sin-harness` no pasó por ninguna validación — es el que más revisión manual necesita antes de enseñarlo. Además, `sin-harness` tendría que corregirse en naming/tipado para alinearse con la convención que sí mantiene `ai4devs` de forma consistente.

---

### 🅱️ Parte B: las tres líneas

1. **Hasta qué pieza llegaste, y cuál te costó más de lo que esperabas.** Terminé todas las tareas de la creación del harness. Las primeras (las skills `/priority-ticket` y `/commit`) me llevaron más tiempo del esperado porque no son exactamente mi flujo habitual de trabajo: me costó salir de mi propio modelo mental y tuve que pensarlas con más calma, lo que hizo que se me fuera el tiempo. A partir de ahí aceleré bastante, resumiendo mucho los prompts de creación del resto de piezas del harness.

2. **La primera diferencia que viste entre las dos salidas, y en qué te fijaste para verla.** Me fijé en cómo iba procesando cada una, no en el código en sí (no soy desarrollador de Node/JS/TypeScript, así que a nivel de fichero no me fijé mucho). Sobre todo noté que la corrida sin harness tomaba muchas decisiones por su cuenta sin apenas preguntar nada, mientras que la corrida con harness se veía más estructurada y guiada en su propio razonamiento, y además ya había pasado por una revisión que corrigió cosas antes de darla por cerrada.

3. **Algo que dejaste escrito en el harness y que el agente no cumplió igualmente.** No he identificado ningún caso así: todo lo que dejé escrito (rama por ticket, commit con formato, PR con revisión adversarial, hook de formateo) se cumplió. 
