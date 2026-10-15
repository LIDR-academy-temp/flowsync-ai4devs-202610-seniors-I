# Comparación: con harness vs sin harness

Ticket: Implementar login en el frontend (SCRUM-5)
Modelo: Opus 5.5 (mismo en ambas copias)
Herramienta: Claude Code

| Casilla | Con harness | Sin harness |
|---|---|---|
| 1. Archivos que propone tocar (cuántos) | ~26, todos en frontend/: 15 nuevos (7 generados por shadcn), 7 modificados, 4 eliminados. Backend: 0 | 0: no llegó a planear |
| 2. Convenciones respetadas / no respetadas | Respetó: usar shadcn/ui; no tocar el backend y usarlo como contrato; leyó el validador y descubrió lo que el ticket no dice (passwordConfirmation obligatorio, fullName nullable pero requerido, password de 8 a 32 caracteres); siguió las Reglas de proceso del CLAUDE.md (rama feat/login-frontend, /commit, PR contra el fork, adversarial-reviewer con comentario en el PR); verificación con build y lint. No respetó o se desvió: añadió alcance que el ticket no pide (logout, GuestOnly) aunque lo declara en "Dudas"; no hay tests (el frontend no tiene configurados) | No había ninguna escrita en ninguna parte; no aplica |
| 3. Intervenciones mías | 2: aprobar el plan y responder "No" a empezar la implementación (parada prevista) | 0 (más una sesión descartada por error mío al pegar comandos ls dentro de claude) |
| 4. Qué arreglaría a mano | Devolver el ticket a "Tareas por hacer" para dejarlo igual antes de la corrida sin harness (lo movió al aprobar el plan, como pedía la skill). Corregir la afirmación de que .claude/, CLAUDE.md y .mcp.json estaban sin commitear (ya estaban en 10dea19; solo prompts.md lo estaba). Decidir si el logout y GuestOnly entran en este ticket | Nada: no produjo plan. Para avanzar habría que darle acceso a Jira o pegarle el ticket |

## Notas durante las corridas

- Con harness: aprobé el plan y el agente pasó el ticket a "En curso" en Jira sin preguntarme nada más, como decía el SKILL.md. El único aviso de que aprobar movía el ticket estaba al final del plan, en "Dudas del ticket"; el diálogo de aprobación no lo mencionaba. Después preguntó si empezaba la implementación y respondí "No". Devolví el ticket a mano a "Tareas por hacer" antes de la corrida sin harness.
- Con harness: el plan dice que hay cambios sin commitear en harness-DR (.claude/, CLAUDE.md, .mcp.json, Prettier); git log mostraba el commit del harness (10dea19). Solo prompts.md estaba sin commitear.
- Con harness: el plan cita el README.md del ejercicio ("el plan se compara y no se aplica"). El README está en las dos copias, así que no es una ventaja del harness.
- Sin harness: la copia no tenía ningún CLAUDE.md, ni de usuario (~/.claude/CLAUDE.md) ni de proyecto.
- Sin harness: /mcp mostraba solo conectores de mi cuenta de claude.ai (Claude Docs, Google Drive; Google Calendar sin autenticar). Ninguno de Jira activo.
- Sin harness: no pudo traer el ticket, respetó el "detente" y me propuso autenticar el conector Atlassian Rovo de mi cuenta. No lo hice: habría sido darle Jira por fuera del harness.
- Auto-memory activado en ambas copias.
- Al montar las reglas de proceso (pieza 7), el agente detectó 3 conflictos antes de aplicarlas: /commit bloqueado para el modelo, la regla "solo URL" chocaba con los hallazgos del revisor, y gh pr create podía apuntar al repo del curso.
- Reloj: me pasé de los 45 min; pausé para crear la cuenta de Jira y el ticket.

## Parte B

1. Hasta qué pieza llegué y cuál me costó más: Llegué a la 8. La que más me costó fue la 2 (MCP de Jira): no tenía cuenta, tuve que crearla, crear el ticket y reiniciar la sesión para que cargaran las herramientas.
2. La primera diferencia que vi y dónde estaba mirando: En la respuesta del chat al lanzar el encargo: con harness trajo el ticket y armó un plan; sin harness ni siquiera pudo leer el ticket y se detuvo. Al abrir el plan con harness vi que había ido al validador del backend y encontró que signup exige passwordConfirmation, algo que el ticket no dice: justo el hueco que la copia pelada nunca llegó a explorar.
3. Algo que dejé escrito en el harness y el agente no cumplió: Al principio creí que movió el ticket sin aprobación, pero al revisar la sesión vi que cumplió la skill /priority-ticket tal como la escribí: lo movió justo después de que aprobara el plan, y mi "No" respondía a otra pregunta, si empezaba la implementación. El fallo estaba en el harness, no en el agente: la skill ata el cambio en Jira a la aprobación del plan y no pide confirmarlo por separado, así que aprobé el plan sin darme cuenta de que también movía el ticket. El aviso solo estaba al final del plan. Lo que sí falló en el agente fue un dato del plan: dijo que .claude/, CLAUDE.md y .mcp.json estaban sin commitear cuando ya estaban en 10dea19.
