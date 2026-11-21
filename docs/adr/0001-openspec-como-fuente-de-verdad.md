# 1. OpenSpec, con delta-specs, como fuente de verdad viva del comportamiento

## Contexto

FlowSync describe su comportamiento en [`openspec/`](../../openspec/), con el esquema `spec-driven` ([`openspec/config.yaml`](../../openspec/config.yaml), sin contexto ni reglas propias configuradas). Hoy contiene:

- **Specs vivas**, una por capability, en `openspec/specs/<capability>/spec.md`. Cada requisito se escribe con `SHALL` y se acompaña de escenarios `WHEN`/`THEN`:
  - [`auth`](../../openspec/specs/auth/spec.md): 19 requisitos y 45 escenarios.
  - [`tasks`](../../openspec/specs/tasks/spec.md): 32 requisitos y 124 escenarios, de API y de interfaz.
- **Changes archivados** en [`openspec/changes/archive/`](../../openspec/changes/archive/). Cada uno tiene `proposal.md` (por qué), `design.md` (cómo), `tasks.md` (pasos) y una **delta-spec** por capability afectada, con secciones `ADDED`, `MODIFIED` o `REMOVED Requirements`:

  | Change | Delta sobre `tasks` | Delta sobre `auth` |
  |---|---|---|
  | `2026-08-13-add-task-list` | 14 ADDED | 1 ADDED, 3 MODIFIED |
  | `2026-08-13-add-task-status-filter` | 7 ADDED, 4 MODIFIED | — |
  | `2026-08-13-add-task-due-date` | 11 ADDED, 1 MODIFIED | — |

**Cómo se relacionan.** Al archivar un change, su delta se funde en la spec viva: los `ADDED` se añaden y los `MODIFIED` sustituyen el requisito entero. Los 32 requisitos de `tasks` son exactamente la suma de los `ADDED` de los tres changes (14 + 7 + 11). Un mismo requisito puede reescribirse varias veces: «Una sola vista de tareas, sin señales de presencia» nace en el primer change y se modifica en los otros dos. La spec viva es, por tanto, el resultado acumulado; los changes archivados son su historia y conservan el porqué de cada regla.

No todo ha entrado por esa vía. La spec de `auth` se escribió directamente como spec viva para documentar el código que ya existía (commit `724d23c`), sin change que la origine. Los changes posteriores ya la modifican mediante deltas.

Lo que ha pasado al usar el proceso, según la historia de git:

- **El filtro por estado (FS-142) se implementó sin tocar `openspec/`.** Durante un tiempo el código filtraba y la spec lo contradecía en dos sitios. Se arregló a posteriori documentándolo como change propio (`209df12`, `add-task-status-filter`) sin cambiar código.
- **El código se ha separado de la spec en sentido contrario.** `9873d5d` corrigió que las tareas expusieran el email del responsable, algo que la spec ya prohibía. `8c15707` cambió el validador del filtro para aceptar cualquier texto, y desde entonces `?status=<inventado>` responde `200` con lista vacía donde la spec exige `422`. Esa desviación sigue abierta.
- **Archivar no ha exigido terminar.** `add-task-list` se archivó con 4 tareas sin marcar y `add-task-due-date` con 5. Las nueve son verificaciones manuales.

Mientras tanto aparecen artefactos que tienden a repetir las reglas con sus propias palabras: el documento OpenAPI que sirve el backend, el [README de la capability](../capabilities/tasks/README.md), los tests, el backlog de `docs/backlog/`. Hace falta decidir cuál manda.

## Decisión

**La spec viva de `openspec/specs/` es la única fuente de verdad del comportamiento de FlowSync, y solo cambia a través de delta-specs.**

1. **Todo cambio de comportamiento entra como un change de OpenSpec,** con propuesta, diseño, tareas y delta-spec, y se funde en la spec viva al archivarlo. Hasta que se archiva, la delta es una propuesta; desde entonces, es contrato.
2. **No se edita la spec viva a mano.** La única excepción es la spec base de una capability que aún no tiene ninguna, como pasó con `auth`.
3. **Si el código contradice la spec, el defecto está en el código,** salvo que se decida cambiar el comportamiento. En ese caso se abre un change que lo diga; el código no se queda tal cual con la esperanza de que alguien actualice la spec.
4. **Los demás artefactos enlazan la spec en lugar de copiar sus reglas.** El README, el documento OpenAPI y las descripciones de PR describen el *cómo* y el *dónde*; el *qué* lo remiten a la spec. El OpenAPI describe lo que el código hace hoy; si difiere de la spec, se señala como desviación.
5. **Los criterios de aceptación de las historias de `docs/backlog/` sirven de entrada para redactar un change.** Una vez archivado, manda la spec.

## Estado

Reemplazada por el [ADR 0002](0002-tests-como-fuente-de-verdad-ejecutable.md) (noviembre de 2027).

Aceptada, 20 de noviembre de 2026. Formaliza la práctica que el proyecto ya sigue desde los changes del 13 de agosto de 2026.

## Consecuencias

### Lo que ganamos

- **Un solo sitio para preguntar qué debe hacer el sistema.** Las discusiones sobre comportamiento se resuelven leyendo un requisito, no comparando el código con el README o el backlog.
- **Escenarios verificables.** Cada `WHEN`/`THEN` puede convertirse en un test o en un caso de revisión. Así se detectaron las desviaciones de `9873d5d` y de `8c15707`: había un texto concreto contra el que comparar.
- **El porqué no se pierde.** La spec viva dice qué se hace, y el change archivado dice por qué y qué alternativas se descartaron, incluso cuando el requisito ya se ha reescrito.
- **La documentación derivada no se desincroniza por duplicación,** porque no duplica: enlaza.

### Lo que nos cuesta

- **Nada obliga a cumplirla.** Ni el CI ni los tests impiden que el código se aleje de la spec. Ha pasado tres veces en tres meses, en ambos sentidos: código sin spec en FS-142, código contra la spec en `8c15707`, y una fuga que la spec ya prohibía en `9873d5d`. Sin tests que traduzcan los escenarios, «fuente de verdad» es una convención, no una garantía. Hoy solo un requisito de `tasks` (lo que muestra del responsable) tiene test automático, frente a 124 escenarios.
- **Hay que mantener la disciplina en cada cambio, también en los pequeños.** Un ajuste de validador de una línea exige, en rigor, un change con cuatro ficheros. La tentación de saltárselo es justo lo que produjo `8c15707`.
- **«Archivado» no significa «verificado».** El proceso permite archivar con tareas abiertas, y la spec viva ya contiene requisitos cuyas comprobaciones manuales nunca se marcaron. Quien lea la spec no tiene forma de saberlo sin abrir el change archivado.
- **Los `MODIFIED` reescriben el requisito entero.** Cada modificación copia el bloque completo, lo que hace las deltas largas y las vuelve conflictivas si dos changes en paralelo tocan el mismo requisito. «Una sola vista de tareas…» ya va por su tercera versión.
- **Hay partes que las deltas no alcanzan.** El `## Purpose` de una spec no se puede cambiar con un `MODIFIED`. En `tasks` sigue diciendo «todas las tareas del espacio», aunque la vista por defecto deja fuera las hechas (lo admite el propio `209df12`). Arreglarlo exige salirse del proceso.
- **La spec pesa.** La de `tasks` ronda las 750 líneas y mezcla API e interfaz. Leerla para un cambio pequeño cuesta, y los enlaces a requisitos concretos se rompen en cuanto se renombra un título, así que los artefactos derivados solo pueden enlazar el fichero entero.
- **Dos vías de entrada.** Las specs base escritas a mano, como `auth`, no tienen propuesta ni diseño archivados: su porqué no está en ninguna parte del repositorio.
- **Dependencia de herramienta.** El flujo descansa en la CLI de OpenSpec y en las skills `openspec-*` de `.claude/skills/`. Si cambia el formato de las deltas o el comportamiento del archivado, cambia nuestro proceso.
