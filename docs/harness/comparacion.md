# Módulo 1 — comparación con y sin harness

Ejecución asistida por Codex para Alfonso, 2026-10-23. Base común `ab09fba`, mismo código de producto. Claude Code, alias `sonnet`, esfuerzo medium; mensajes de ambas corridas reportan `MiniMax-M3.1-Flash` (resultado final con harness: `MiniMax-M3.1-Flash-Preview[1m]`). No se implementó el login.

## Corrida con Jira real

Mismo encargo: seleccionar el ticket prioritario de FLOW asignado al usuario actual en To Do y planificarlo. Con harness: `/priority-ticket`; sin harness: su cuerpo literal. Límite de 300 s por lado. Ticket real: **FLOW-1 — Implementar login en el frontend**, asignado a Alfonso y mantenido en To Do.

| Observación | Sin harness | Con harness |
|---|---|---|
| Archivos que propone tocar | No entregó plan ni lista antes del límite. No equivale a proponer cero cambios. | 27: 15 nuevos, 8 modificados, 4 eliminados; omite package-lock.json pese a cambiar dependencias. |
| Convenciones | Sin instrucciones propias; conserva README común. No podemos evaluar convenciones de un plan que no terminó. | Mantiene backend intacto, usa TS/shadcn, lee validadores y api_provider; contempla passwordConfirmation, Bearer y envoltorio data. |
| Intervenciones | 0 aclaraciones; parada automática a los 300,03 s. Buscó alternativas en registros locales sin MCP. | 0; terminó en 80,25 s. Consultó Jira por MCP y exploró el repo. Intentó guardar plan, pero Write no estaba disponible. |
| Qué arreglar antes de compartir | Configurar el acceso al ticket y repetir; no reconstruir un plan inexistente. | Incluir lockfile; no atribuir al criterio 3 la persistencia tras recarga (es una decisión añadida); confirmar HTTP/errores, aún no probados en vivo. |

## Tres líneas

1. Montamos instrucciones, enlace AGENTS, MCP Atlassian, skills priority-ticket/commit, revisor y hook Prettier. La fricción real fue conectar/autenticar Jira y recuperar un ticket truncado, conservando el texto anterior.
2. La primera diferencia verificable está en las herramientas: con harness consulta usuario, recursos y JQL, selecciona FLOW-1 y entrega el plan; sin harness busca alternativas en registros locales y agota el tiempo.
3. La regla escrita «Enumerar cada archivo propuesto» no se cumple íntegra: el plan cambia dependencias pero no enumera frontend/package-lock.json, así que el total de 27 queda incompleto.

## Control y límites

La primera corrida, con ticket local entregado a ambos, terminó en 48,95/56,96 s; ambas encontraron passwordConfirmation y omitieron data. La segunda añade acceso real a Jira solo en el lado con harness: mide el conjunto instrucciones+herramientas, no aísla su efecto individual ni prueba superioridad universal. Se compartió configuración de usuario para autenticación; sin harness intentó leer historial local, un factor no controlado. Hubo una sola corrida por condición. Hook y revisor están configurados pero no se ejercitaron en estos planes. Las salidas originales y scripts quedan locales; prompts.md contiene prompts exactos y el plan entregado. Observaciones de una ejecución asistida, sin atribuirlas a trabajo manual de Alfonso.
