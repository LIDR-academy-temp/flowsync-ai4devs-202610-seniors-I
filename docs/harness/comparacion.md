# Comparación: con harness vs. sin harness

Ticket: FLOW-2 «Implementar login en el frontend» · Modelo: Sonnet 4.5 · Herramienta: Claude Code 2.0.27 (terminal) · Solo plan mode, sin aplicar el plan.

Notas de contexto: la copia de carpetas la hice antes de poner el reloj. Antes de la corrida final probé `/priority-ticket` una vez y se puso a implementar (ver Parte B, línea 3); deshice esos cambios con git. Las dos copias comparten la configuración de usuario sincronizada desde claude.ai (`~/.claude/skills/synced`, `~/.claude/plugins/synced`); ninguna tenía MCP de usuario.

## Parte A

| Casilla | Con harness | Sin harness |
|---|---|---|
| 1. Archivos que propone tocar | 12 entradas en su lista: 10 a crear (8 en `frontend/src`, `components.json` y la carpeta `components/ui/*`) y 2 a modificar (`App.tsx`, `main.tsx`). El plan dice "14". | 0. No llegó a proponer ningún plan. |
| 2. Convenciones respetadas / no | Respeta: shadcn/ui (lo pide el ticket), rutas `/api/v1`, token `oat_`, y las reglas del validador real (`passwordConfirmation`, contraseña de 8 a 32, `fullName` opcional), que coinciden con `backend/app/validators/user.ts`. No respeta: ninguna de mis 4 reglas de proceso (rama nueva, `/commit`, PR, revisor) aparece en el plan. | Ninguna escrita en ninguna parte. No llegó a leer el ticket: pidió instalar el MCP de Jira. |
| 3. Veces que intervine | Corrida final: 8. En la prueba previa: 1 (lo paré con Esc cuando empezó a implementar). | [0] (no respondí a su pedido del MCP). |
| 4. Qué arreglaría a mano | Quitar dependencias que nadie pidió (axios, aunque menciona fetch como alternativa); añadir al plan la rama, el commit y el PR. | Todo: no hay plan que revisar. |

## Parte B

1. **Llegué a la pieza 8 (todas).** La que más me costó fue la **6, el hook de Prettier**: necesitó tres intentos. El primero inventó un formato de `settings.json`, usaba una variable `$FILE_PATH` que no existe y silenciaba los errores con `|| true`; el segundo corrigió la ruta pero no la estructura. También las skills y el subagente se crearon sin la cabecera (frontmatter) que Claude Code necesita, y hubo que pedírsela dos veces.
2. **La primera diferencia** fue que la copia sin harness **no pudo ni empezar**: me pidió instalar el MCP de Jira para leer el ticket, mientras la otra ya había encontrado FLOW-2 y estaba explorando el backend. Lo vi en la terminal, en la primera respuesta de cada una. Después, abriendo el plan, vi que la copia con harness había sacado del validador campos que el ticket no menciona.
3. **Mi `SKILL.md` de `/priority-ticket` decía en negrita "DO NOT write any code before the user approves the plan" y "Enter plan mode"**, y en la prueba previa el agente igualmente instaló React Router y shadcn/ui y tocó `vite.config.ts`, `tsconfig.app.json` e `index.css`. Tuve que pararlo con Esc. Para la corrida final forcé plan mode con Shift+Tab: la herramienta sí lo garantiza, el texto no. Además, en el plan final no aparece ninguna de las reglas de proceso que dejé al final de `CLAUDE.md`.
