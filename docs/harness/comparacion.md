# Comparación con y sin harness

Mismo encargo (ticket FLOW-4, «Implementar login en el frontend») y misma configuración de modelo (Sonnet 5.5 por defecto, Opus en plan mode). Plan sin aplicar. Solo la copia con harness llegó a plan, así que fue la única que usó Opus.

| | Con harness | Sin harness |
|---|---|---|
| **1. Archivos que propone tocar** | ~23 nombrados: 6 de config (`vite.config.ts`, 2 `tsconfig`, `components.json`, `.oxlintrc.json`, `package.json`), 6 de shadcn (`utils.ts` + 5 componentes ui), `index.css`, 8 de código (`api.ts`, `auth.ts`, `ProtectedRoute`, 3 páginas, `App.tsx`, `main.tsx`), `CLAUDE.md` y `prompts.md`. Además borra `App.css` y assets, y añade tests de `api.ts` sin nombrarlos. | En blanco: no llegó a plan. Se bloqueó al no encontrar el ticket (sin MCP de Jira) y preguntó cómo seguir. |
| **2. Convenciones respetadas / no** | Respetó: «comprueba el validador, no solo el ticket» (leyó `user.ts` y detectó `passwordConfirmation`, `fullName` nullable, 8-32 caracteres y la forma de los errores 400/422/401); rama nueva antes de tocar código (`feat/flow-4-...`). No evaluable aún: `/commit`, PR, revisor, «solo la URL». | Ninguna escrita en ningún sitio, así que no había convenciones que respetar ni incumplir. |
| **3. Intervenciones mías** | 1: pararlo tras el plan, sin aplicarlo (no es el objetivo del ejercicio). No contesté a su pregunta final sobre tests. | 1: pararlo al ver que no podía ver el ticket (sin MCP de Jira) y no rescatarlo. No contesté a su pregunta (autenticar OAuth o pegar el ticket). |
| **4. Qué arreglaría a mano** | Recortar lo que sale del ticket (logout, Vitest, editar `CLAUDE.md` y `prompts.md`) y decidir yo dónde guardar el token (propone `localStorage`). | Nada del plan, porque no hay plan. Lo que falta es darle acceso al ticket (Jira conectado o el texto pegado) para que pueda llegar a plan. |


## Parte B: tres líneas

1. **Hasta qué pieza llegué y cuál me costó más.** Llegué a las 8. La que más costó fue la 2 (MCP de Atlassian): se añade y se autentica en una sesión de Claude Code y las sesiones ya abiertas no lo ven, así que hubo que repartir el trabajo entre sesiones. El rato también se fue en el SSH del fork (la clave por defecto era de otra cuenta de GitHub), pero eso fue del entorno, no de una pieza.
2. **Primera diferencia.** Con harness el agente pudo acceder al ticket (por el MCP de Jira) y llegó a un plan. Sin harness no tenía esa información y habría que pasársela entera desde cero. Lo vi en la salida de la terminal, sin abrir ningún archivo: en un lado apareció el plan y en el otro la pregunta de cómo conseguir el ticket.
3. **Algo escrito que el agente no cumplió.** No vi ningún incumplimiento, pero tampoco puedo afirmar que lo cumpliera todo: me paré en el plan, así que solo se ejercitó una parte. Sí se cumplió: la skill (leyó el ticket, resumió y entró en plan mode sin implementar), «comprueba el validador, no solo el ticket» y «rama nueva antes de tocar código». Sin comprobar, porque no llegué a ejercitarlas: el hook de Prettier (el agente no editó ningún archivo), `/commit`, el PR con `gh pr create`, el revisor y «en el chat, solo la URL». Esas dos últimas son las que más sospecho que se caerían, pero es una hipótesis, no un dato.
