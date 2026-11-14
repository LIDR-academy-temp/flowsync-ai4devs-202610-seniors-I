# Auditoría de reglas de proceso — Módulo 5

## Apuesta inicial (antes de consultar evidencias)

| Regla | Apuesta |
|---|---|
| Crear rama de trabajo antes de modificar código | Sí (con dudas) |
| Utilizar /commit al terminar cada petición | Sí |
| Mantener OpenAPI y README actualizados | Sí (con dudas) |
| Crear PR y ejecutar revisión adversarial | Ni idea |
| Devolver únicamente la URL de la PR | Sí |

## Auditoría

| Qué pide la regla | Qué se comprobó | Veredicto | Evidencia | Qué haría |
|---|---|---|---|---|
| Trabajar en rama propia | `git log -15`, `git branch -a`, hooks | No se puede comprobar con lo que hay | El historial no demuestra en qué rama se crearon los commits. | Bajarla |
| Un commit por petición mediante `/commit` | `git log -15`, `.claude/skills/commit/SKILL.md` | No se puede comprobar con lo que hay | Git no registra qué skill se utilizó ni qué petición originó cada commit. | Bajarla |
| Actualizar OpenAPI y README | `git diff --name-status cbe9617^ cbe9617` | No se puede comprobar con lo que hay | En el único caso aplicable observado aparecen controladores, OpenAPI y README; falta verificar la regeneración de `.adonisjs/`. | Bajarla |
| Crear PR y revisión adversarial | `gh pr list`, historial Git, definición del agente | No se puede comprobar con lo que hay | No se encontró evidencia suficiente de la ejecución del revisor en las PR relevantes. | Dejarla |
| Responder únicamente con la URL del PR | Historial y archivos del repositorio | No se puede comprobar con lo que hay | Las respuestas conversacionales no están registradas en Git. | Dejarla |

## Parte B — Tres conclusiones

1. **Regla sobre la que me equivoqué:** Aposté que OpenAPI y README se actualizaban correctamente. Encontré un commit favorable, pero no evidencia suficiente para demostrar el cumplimiento general de la regla.

2. **Regla que no se puede comprobar:** El uso de `/commit` al finalizar cada petición. Git registra commits, pero no qué skill se utilizó. Haría falta registrar las invocaciones y vincularlas a los commits.

3. **Regla que borraría:** La obligación de responder únicamente con la URL de la PR. Es una convención de formato que podría eliminarse si no aporta valor práctico al equipo.
