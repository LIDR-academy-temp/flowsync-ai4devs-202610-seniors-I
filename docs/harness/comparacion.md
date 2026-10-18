# Comparación con y sin harness — FLOW-1

Modelo: Sonnet 5.5 · Herramienta: Claude Code · Ajuste común a ambas copias antes de empezar: prettier sobre database/schema.ts

| Casilla | Sin harness (B) | Con harness (A) |
|---|---|---|
| Archivos tocados (n.º y cuáles) | 4 routes.ts, validators/user.ts, profile_controller.ts y el test nuevo | 4 routes.ts, validators/user.ts, profile_controller.ts y el test nuevo |
| Convenciones respetadas | ruta en el grupo account con autenticación, validador en validators/user.ts con nombre …Validator, validateUsing, frontend sin tocar. | ruta en el grupo account con autenticación, validador en validators/user.ts con nombre …Validator, validateUsing, transformer, importaciones con #, frontend sin tocar, resumen final con archivos |
| Convenciones no respetadas | no identifico | no identifico |
| Intervenciones (cuántas y de qué tipo) | 0 se lanzó en automode | 0 se lanzó en automode |
| Qué arreglaría a mano antes de enseñarlo | mejorar la forma de la respuesta | mejorar la forma de la respuesta |

## Parte B
1. **Piezas montadas y la que más costó:** CLAUDE.md y el hook PostToolUse, me apoyé con Claude para completar este paso, y algunos ida y vuelta ya que Notepad formateaba el markdown.
2. **Primera diferencia y dónde estaba mirando:** Ejecuté ambas ventanas al mismo tiempo, una a la par de la otra, la documentación generada por el proyecto con el harness ya de entrada genera mayor confianza, por ejemplo listar los archivos tocados, y las decisiones en los huecos del encargo.
3. **Algo escrito en el harness que el agente no cumplió:** no identifico.

### Ejercicio con el reloj
En los 45 minutos alcancé a ejecutar los dos barridos en desde Claude en los proyectos con y sin arnés. Hora del lanzamiento 15:13 p.m., Hora de cierre a las 15:52.