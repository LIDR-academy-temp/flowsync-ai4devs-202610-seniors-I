# Comparación: FLOW-1 con harness y sin harness

Encargo: el ticket «Implementar login en el frontend», con el mismo modelo (Opus 5.5) y la misma herramienta (Claude Code en VS Code).

> **El encargo no fue idéntico.** En la copia con harness lo lancé con `/priority-ticket`, que trae el ticket de Jira, resume criterios y entra en plan mode. En la pelada pegué el texto del ticket sin la instrucción de la skill. Por eso la pelada no hizo plan y pasó directamente a implementar. Esa diferencia mide en parte el prompt, no solo el andamiaje.

## Parte A: las cuatro casillas

| | Con harness | Sin harness |
|---|---|---|
| **1. Archivos que toca** | Plan: 7 modificados, 13 nuevos y 4 borrados. Diff final: 28 archivos sin contar `package-lock.json` (17 nuevos, 7 modificados, 4 borrados). | No hubo plan. Diff final: 27 archivos sin contar `package-lock.json` (15 nuevos, 8 modificados, 4 borrados). |
| **2. Convenciones** | Respetó la rama nueva antes de tocar código, no tocar `backend/` y el contrato de la API de `CLAUDE.md`. El hook de Prettier formateó cada archivo. Esperó la aprobación antes de cada commit y abrió el PR con `gh pr create`. No respetó: «en el chat, solo la URL del PR». | Ninguna escrita en el proyecto. Pero no era una copia del todo pelada: mi `~/.claude/CLAUDE.md` global también aplica ahí, y por eso no commiteó sin aprobación. Imitó el estilo de la plantilla (sin punto y coma) sin tener formateador. Trabajó sin rama nueva. |
| **3. Intervenciones** | 2 aclaraciones: los campos del registro y qué hacer con el harness sin commitear. 5 veces repetí «sigue» porque la respuesta se cortó. Además, las aprobaciones del plan y de los commits. | 0 después del prompt inicial. Tomó sola todas las decisiones. |
| **4. Arreglos a mano** | Lo que encontró el revisor: `maxLength={32}` corta la contraseña en silencio, el logout falla sin avisar, `fetch` no tiene timeout y `CLAUDE.md` sigue diciendo que el frontend es la plantilla de Vite. El ticket queda en «En curso», porque el tablero no tiene «En revisión». | El mismo `maxLength` en el registro (nadie lo revisó), sin commit ni rama, y borrados preparados a medias. Escribió a mano las variables del tema de shadcn y cambió `cn` por `clsx` + `tailwind-merge`. El registro lleva campos que el ticket no pide. |

## Tres diferencias

1. **El hueco entre ticket y backend.** Con harness, el agente detectó que el backend exige `passwordConfirmation` y `fullName`, y me preguntó antes de planificar (elegí solo email y contraseña). Sin harness, lo resolvió solo y añadió «Repite la contraseña» y «Nombre (opcional)», campos que el ticket no pide.
2. **Plan antes que código.** Con harness, la skill llevó el trabajo a plan mode y no se escribió código hasta que aprobé el plan. Sin harness, implementó directamente, y al final avisó de que no había entrado en plan mode.
3. **Revisión.** Con harness, el `adversarial-reviewer` encontró 11 problemas sobre el PR, entre ellos el `maxLength` que corta contraseñas. La copia sin harness tiene el mismo bug y nada lo detectó.

## Parte B: las tres líneas

1. **Hasta dónde llegué:** monté las 8 piezas. La que más me costó fue la 2, el MCP de Jira: la sesión arrancaba en `~` y no leía `.mcp.json`, y la autenticación OAuth la tuve que hacer yo con `/mcp` (prompts 4 a 6).
2. **La primera diferencia que vi:** el formulario de registro. Con harness me apareció la pregunta sobre qué campos llevaba. En la pelada lo vi en el mensaje final, que listaba los campos que había añadido sin preguntar.
3. **Lo que escribí en el harness y no se cumplió:** «En el chat, solo la URL del pull request». El agente siguió añadiendo explicaciones después de la URL. Además, el `adversarial-reviewer` está definido como de solo lectura y aun así hizo `git checkout --detach` para leer el código (volvió a la rama, pero movió HEAD).

**Sin terminar:** los hallazgos del revisor siguen sin corregir, FLOW-1 no pasó a «En revisión» y el código de la copia con harness está en el PR #1 de mi fork, sin mergear.
