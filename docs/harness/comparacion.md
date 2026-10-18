# FlowSync — Comparación con y sin harness

**Encargo:** FLOW-5, «Implementar login en el frontend». **Modelo:** Claude Opus 5.5 en ambos casos. Los dos consultaron Jira mediante MCP Atlassian; uno ejecutó `/priority-ticket` y el otro recibió la instrucción equivalente manualmente. **Solo se generaron planes: no se implementó código.**

## Parte A — Cuatro criterios

| Criterio | CON harness | SIN harness |
|---|---|---|
| **1. Archivos propuestos** | **23 identificables:** 9 modificados, 13 nuevos y 1 eliminado, más `src/assets/*`. Incluye `package-lock.json` e `index.html`. | **21 identificables:** 7 modificados, 13 nuevos y 1 eliminado, más `src/assets/*`. Omite mencionar esos dos archivos y cambia algunos nombres de componentes. |
| **2. Convenciones** | Respeta el contrato del backend, shadcn/ui y el flujo documentado en `CLAUDE.md`: rama, `/commit`, PR y revisión adversarial. **Desajuste:** plantea partir de `main`, como indica su regla, aunque el ejercicio se preparó desde `s1/start`. | No tiene reglas de harness. Aun así, inspecciona los validadores, respeta el contrato de la API y mantiene el backend intacto. No prevé el flujo de Git/PR, pero tampoco recibió esa convención. |
| **3. Intervenciones humanas** | **1 incidencia:** la consulta de `/priority-ticket` no encontró FLOW-5 por el estado JQL traducido. Hubo que diagnosticarla, corregir la consulta y repetir la ejecución. | **0 correcciones** tras el encargo inicial: consultó Jira y elaboró el plan al primer intento. |
| **4. Ajustes antes de revisión** | Revisar rama de partida, instalación redundante de `@types/node` y riesgo XSS del token en `localStorage`. | Valorar el campo «Nombre» añadido, el proxy de Vite, la omisión de `package-lock.json` en la lista y la decisión de no añadir tests. |

**Diferencias técnicas:** ambos descubrieron `passwordConfirmation`, `fullName`, los errores 400/422 y las respuestas `{ data }`. Con harness se propone **API directa** y enviar `fullName: null`; sin harness, **proxy de Vite** y campo «Nombre» opcional. Los recuentos son mínimos porque `src/assets/*` no enumera sus archivos.

## Parte B — Tres reflexiones

1. **Alcance y tiempo:** completé **8/8 piezas**. La **3 (`/priority-ticket`)** fue la más costosa por la incidencia con Jira; el tiempo fue aproximado, no cronometrado.
2. **Primera diferencia:** en el apartado de infraestructura/API, el plan **con** harness utiliza `localhost:3333` directamente; el plan **sin** harness configura un **proxy de Vite**.
3. **Instrucción no satisfecha inicialmente:** `/priority-ticket` debía recuperar el ticket prioritario, pero no encontró FLOW-5 en el primer intento. **No fue desobediencia del agente, sino un error en nuestra JQL**: el propio harness necesitó corrección.

**Conclusión:** el harness aportó principalmente **consistencia y trazabilidad del proceso**. Ambos planes mostraron buen análisis técnico; no puede juzgarse la calidad del código porque ninguno se ejecutó.
