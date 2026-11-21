# 2. Los tests de integración como única fuente de verdad ejecutable

## Contexto

El [ADR 0001](0001-openspec-como-fuente-de-verdad.md) hizo de la spec viva de `openspec/specs/` la única fuente de verdad del comportamiento, con cambios solo a través de delta-specs. En el mismo ADR ya se anotaba su coste principal: **nada obligaba a cumplirla.** Ni el CI ni los tests impedían que el código se alejara de la spec, y al aprobarlo ya había pasado tres veces: el filtro por estado implementado sin spec (FS-142), el validador que acepta cualquier estado (`8c15707`) y la fuga del email del responsable (`9873d5d`).

Ese coste no se ha resuelto. Mantener la spec al día dependía de la disciplina de cada cambio, y en la práctica las specs han dejado de mantenerse al ritmo del código. Hoy una spec que no se actualiza ya no describe el sistema: describe lo que se quería en algún momento, y quien la lee no sabe qué partes siguen siendo ciertas.

Los tests de integración tienen justo la propiedad que le faltaba a la spec: **fallan cuando el comportamiento cambia.** La suite `functional` del backend (Japa, en `backend/tests/functional/`) ejercita la API real por HTTP, con rutas y payloads tipados por el registro de Tuyau. Los escenarios `WHEN`/`THEN` de la spec se traducen de forma natural a tests. [`tests/functional/tasks/assignee.spec.ts`](../../backend/tests/functional/tasks/assignee.spec.ts) ya lo hacía: cubre los tres escenarios de un requisito y lo cita en su cabecera.

Al tomar esta decisión, el punto de partida es pobre:

- **La cobertura es mínima.** De los requisitos de `tasks`, solo uno (lo que muestra cada tarea de su responsable) tiene test. El resto de los escenarios solo existe en la spec.
- **No hay CI.** El repositorio no tiene ningún flujo que ejecute los tests en cada cambio.
- **Los tests comparten la base de datos del servidor de desarrollo,** `tmp/db.sqlite3`. Solo se aíslan si cada fichero envuelve sus tests en una transacción global.
- **El frontend no tiene runner de tests,** y buena parte de la spec de `tasks` son requisitos de interfaz.

## Decisión

**Los tests de integración del backend pasan a ser la única fuente de verdad ejecutable del comportamiento de FlowSync. Las specs de OpenSpec dejan de mantenerse.**

1. **Un comportamiento está garantizado si, y solo si, lo cubre un test de la suite `functional`.** Lo que no tiene test no forma parte del contrato, diga lo que diga cualquier documento.
2. **Todo cambio de comportamiento llega con los tests que lo expresan,** en el mismo PR. El título de cada test describe la regla en castellano, como lo hacía el escenario, y los tests se agrupan por capability en `tests/functional/<capability>/`.
3. **Los tests se ejecutan en CI en cada PR y un fallo bloquea el merge.** Sin esto, los tests serían tan voluntarios como lo fue la spec. Montar ese CI es parte de esta decisión, no una mejora posterior.
4. **Cada test aísla su estado** con transacción global o truncado, o bien la suite pasa a una base de datos propia. Una fuente de verdad que depende de qué haya dejado el último run no lo es.
5. **`openspec/` se congela, no se borra.** `specs/` y `changes/archive/` se quedan como archivo histórico: los changes archivados siguen siendo el mejor registro del porqué de cada regla. Se marcan claramente como no mantenidos y no se abren changes nuevos.
6. **Los escenarios de la spec congelada que no tengan test no están garantizados.** Convertirlos en tests es trabajo de backlog, priorizado por riesgo, empezando por las desviaciones ya conocidas.
7. **El porqué pasa a vivir en el PR y, si la decisión lo merece, en un ADR.** El test dice qué; no se le pide que explique por qué.
8. **El comportamiento de interfaz queda fuera del alcance de esta decisión.** No tiene fuente de verdad ejecutable mientras el frontend no tenga runner de tests.

## Estado

Aceptada, noviembre de 2027. Reemplaza al [ADR 0001](0001-openspec-como-fuente-de-verdad.md).

## Consecuencias

### Lo que ganamos

- **La verdad se comprueba sola.** Un cambio que rompe una regla cubierta falla en CI antes del merge, sin depender de que alguien compare el código con un documento. Un caso como `8c15707` habría fallado con un test de «estado inventado → 422».
- **Un solo artefacto que se mantiene junto al código.** El test y el código cambian en el mismo PR. Desaparece la tarea aparte de "actualizar la spec" que nadie hacía.
- **Desaparecen los costes del proceso de deltas:** no hay `MODIFIED` que reescriban requisitos enteros, ni un `## Purpose` intocable, ni dudas sobre si un change archivado se llegó a verificar.

### Lo que nos cuesta

- **Partimos casi de cero.** Hasta que los escenarios se conviertan en tests, la mayor parte del comportamiento no está garantizado por nada: la spec ya no manda y el test todavía no existe. Durante esa transición hay menos red que antes, no más.
- **Un test equivocado convierte un bug en verdad.** Si alguien escribe un test que fija el comportamiento actual de `?status=<inventado>` (200 con lista vacía), el defecto pasa a ser contrato. La spec al menos expresaba una intención independiente del código; el test se escribe mirando el código.
- **Se pierde el lenguaje de producto.** Los requisitos `SHALL` los podía leer y discutir alguien que no programa. Los tests no, y la conversación sobre qué debe hacer el sistema pierde su documento de referencia.
- **El porqué se dispersa.** Repartido entre descripciones de PR, mensajes de commit y algún ADR, es más difícil de encontrar que en un change archivado junto a su delta.
- **Hay reglas difíciles de expresar como test.** Los requisitos negativos y globales («no existe ninguna operación para crear un estado», «no hay vista de mis tareas», «el estado es la única dimensión de filtro») tenían texto en la spec. Como test son frágiles o directamente no se escriben.
- **La interfaz se queda sin fuente de verdad.** Los requisitos de pantalla, accesibilidad por teclado y mensajes de la spec congelada no tienen sustituto ejecutable hasta que haya runner de frontend.
- **Hay infraestructura que montar y mantener:** un CI que hoy no existe, aislamiento de base de datos y una suite que ejecutar en cada PR, con su tiempo y sus fallos intermitentes.
- **Hay documentación que redirigir.** El [README de la capability de tareas](../capabilities/tasks/README.md) remite las reglas a la spec. Tiene que pasar a remitir a los tests, y la spec congelada necesita un aviso visible para que nadie la tome por vigente.
- **La herramienta se queda obsoleta.** La CLI de OpenSpec y las skills `openspec-*` de `.claude/skills/` dejan de tener uso. Hay que retirarlas para que nadie abra un change por inercia.
