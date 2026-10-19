# Comparación: con harness y sin harness

- **Ticket:** FLOW-6 «Implementar login en el frontend»
- **Modelo / esfuerzo:** Opus 5.5 en las dos corridas, pero **no con el mismo esfuerzo**: xHigh con harness y High sin harness. Lo vi después, en los registros de las sesiones.
- **Herramienta:** Claude Code 2.1.303 en las dos corridas (el harness lo monté con la 2.1.302)
- **Piezas montadas:** de la 1 a la 8 (la 1, `/init`, hecha el 16/10 antes de poner el reloj; de la 2 a la 8, montadas por el agente en la misma sesión, ver Prompt 6)
- **Jira en la copia pelada:** sí, por el MCP global de usuario (no forma parte del harness), pero en esa sesión no estaba autorizado
- **Se compara:** el plan de cada copia. Ninguno se aplicó, ninguna copia cambió código y el ticket sigue en «Por hacer».

| | Con harness | Sin harness |
|---|---|---|
| 1. Archivos que propone tocar (contados) | 29: 15 nuevos, 9 modificados y 5 borrados. Backend: 0. El plan trae la lista de archivos. | 28: 14 nuevos, 10 modificados y 4 borrados. Backend: 0. El plan no trae lista; los conté a partir de los pasos. |
| 2. Convenciones respetadas (✅) y no respetadas (❌) | ✅ backend de solo lectura · ✅ contrato completo (`fullName`, `passwordConfirmation`, 8–32, `{ data }`, Bearer, 400/401/422) · ✅ llama a `localhost:3333` sin proxy, como dice el `CLAUDE.md` · ✅ `import type` y campos de clase por `erasableSyntaxOnly` · ✅ comillas simples y sin `;`, con Prettier también sobre el código que genera shadcn · ✅ rama nueva antes de tocar código · ✅ cierre con `/commit`, `gh pr create` y `adversarial-reviewer` · ✅ cada criterio cubierto por su número · ✅ entró en plan mode por sí mismo · ❌ no enseñó los criterios numerados antes de planificar (paso 2 de la skill) | No había ninguna convención escrita. ✅ backend sin tocar · ✅ contrato completo, sacado con dos subagentes Explore · ✅ `import type` · ✅ comillas simples y sin `;`, deducidas del código · ❌ `baseUrl: '.'` en el tsconfig, que TypeScript 6 marca como obsoleto · ❌ ni rama, ni commit, ni PR, ni revisión · ❌ criterios listados al principio, pero no cubiertos uno a uno |
| 3. Intervenciones | 0. Solo rechacé el plan al final, como pide el ejercicio. | 2: autorizar Jira en el navegador y contestar «ok», y pasar a plan mode a mano (Shift+Tab) antes de enviarlo. Además, aprobé el plan por error; no lo aplicó porque había leído en el `README.md` que el plan no se aplica. |
| 4. Qué arreglaría a mano | Poco: confirmar con producto el registro sin campo de nombre (`fullName: null` siempre) y decidir qué hacer con el aviso de oxlint `only-export-components` en los componentes de shadcn, que el plan no trata. | Quitar el `baseUrl`, porque con TypeScript 6.0.3 `tsc -b` fallaría. Añadir los pasos de rama, commit, PR y revisión. Relacionar cada criterio con sus archivos. Confirmar con producto el campo de nombre opcional. |

**Notas.** Las dos sesiones leyeron el `README.md`, que es el enunciado del ejercicio, así que las dos sabían que era un experimento. La pelada tardó unos 5 minutos en presentar el plan, casi 2 de ellos esperando la autorización de Jira; la del harness, unos 2. La del harness intentó comprobar los errores contra el backend con `curl`, pero no estaba levantado.

## Parte B

1. **Hasta qué pieza llegué y cuál me costó más:** Llegué hasta la pieza 8. Las piezas en sí no me costaron: las montó el agente en una sola sesión, siguiendo la especificación de mi guía (Prompt 6). El rato se me fue antes, en cómo hacerlo: quise que el agente lanzara mis prompts preparados en sesiones separadas y el clasificador del modo auto lo bloqueó («Create Unsafe Agents»), así que tuve que cambiar de enfoque.
2. **Primera diferencia que vi y dónde estaba mirando:** La copia pelada no pudo leer el ticket: Jira no estaba autorizado en esa sesión y me pidió abrir un enlace para autorizarlo. La del harness leyó FLOW-6 directamente con el MCP del proyecto. Lo vi en la primera respuesta de la terminal de la copia pelada, antes de que hubiera ningún plan.
3. **Algo escrito en el harness que el agente no cumplió:** En `.claude/skills/priority-ticket/SKILL.md`, paso 2, había escrito «Muestra la clave, el título y los criterios de aceptación en una lista numerada», antes de entrar en plan mode. El agente con harness se lo saltó: buscó el ticket y entró directamente en plan mode, y los criterios solo aparecen al final del plan, en la sección de cobertura. La copia pelada, sin skill, sí los enseñó numerados antes de planificar.

## Conclusión

Con el mismo modelo y el mismo ticket, las dos copias llegaron al **mismo conocimiento técnico**. Los dos planes descubrieron lo que el ticket no decía: el `fullName` obligatorio, la `passwordConfirmation`, la contraseña de 8 a 32 caracteres, la respuesta dentro de `{ data }` y los errores 400, 401 y 422. La copia pelada lo sacó leyendo el backend con dos subagentes. En este encargo, el harness no aportó nada que el modelo no pudiera descubrir por su cuenta.

La diferencia estuvo en **cómo trabaja el agente**:

- **Proceso:** solo el plan con harness incluía crear una rama, hacer `/commit`, abrir el PR y pasar el revisor, y relacionaba cada criterio con sus archivos.
- **Autonomía:** cero intervenciones frente a dos, y 2 minutos hasta el plan frente a 5.
- **Encaje con el proyecto:** respetó las indicaciones del `CLAUDE.md` (llamar al backend sin proxy y las restricciones del tsconfig) y previó pasar Prettier también por el código que genera shadcn.

El plan sin harness tenía un error que rompería el build (el `baseUrl`), pero no se puede afirmar que lo evitara el harness.

**Dos lecciones más:**

- **Un harness no garantiza nada.** Hace más probable que se cumpla lo que está escrito, pero el agente se saltó el paso 2 de su propia skill.
- **Las conexiones también forman parte del harness.** La copia pelada se atascó porque Jira no estaba autorizado, no porque le faltara capacidad.

**Con prudencia:** solo hay una corrida por copia, el esfuerzo no fue el mismo (High frente a xHigh) y las dos sesiones leyeron el enunciado. Aun así, el resultado apoya la tesis del módulo. Con el mismo modelo, el harness no hace al agente más listo. Lo hace más previsible, más alineado con las convenciones del equipo y menos dependiente de mí.
