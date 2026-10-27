# FlowSync — Historias de usuario de E2 «Gestión de tareas»

Fecha: 2026-10-27. Fuente: [flowsync-mvp.md](flowsync-mvp.md) §5 y RF-9 a RF-18, validado contra [alcance-mvp.md](alcance-mvp.md). Si discrepan, manda el alcance.

Solo el listado: los criterios de aceptación se escriben después. El rol es siempre **persona del equipo**, porque el MVP tiene un único rol (PRD §2). La columna *Cubre* indica de qué requisitos y jobs sale cada historia.

## Dentro del MVP

| # | Historia | Cubre |
|---|---|---|
| HU-E2-01 | Como persona del equipo, quiero crear una tarea escribiendo solo su título para dejar registrado trabajo nuevo en la lista del equipo sin rellenar nada más. | RF-9, RF-10, RF-11 (responsable por defecto), RF-13 |
| HU-E2-02 | Como persona del equipo, quiero elegir a otra persona registrada como responsable al crear una tarea para que quede claro desde el principio a quién le toca. | RF-11 |
| HU-E2-03 | Como persona del equipo, quiero poner una fecha de vencimiento (un día, sin hora) al crear una tarea para que el equipo sepa para cuándo tiene que estar hecha. | RF-12 |
| HU-E2-04 | Como persona del equipo, quiero marcar una tarea como *en curso* desde la lista en dos clics como máximo para que el resto sepa que la he empezado sin que tengan que preguntarme. | RF-15, RF-16 · J1, J3 |
| HU-E2-05 | Como persona del equipo, quiero marcar como *hecho* una tarea, también una creada por error, para que deje de aparecer como trabajo pendiente o en curso. | RF-15, RF-17 · J3 |
| HU-E2-06 | Como persona del equipo, quiero devolver una tarea a *pendiente* desde *en curso* o *hecho* para que la lista refleje que nadie la está haciendo o que hay que retomarla. | RF-15 |
| HU-E2-07 | Como persona del equipo, quiero reasignarme una tarea pendiente de otra persona para quedármela como siguiente trabajo sin preguntar a nadie. | RF-14 · J2 |
| HU-E2-08 | Como persona del equipo, quiero cambiar el responsable de cualquier tarea por otra persona registrada para repartir el trabajo cuando cambian los planes. | RF-14 |
| HU-E2-09 | Como persona del equipo, quiero corregir el título de cualquier tarea para que describa bien el trabajo aunque no la haya creado yo. | RF-14, RF-10 |
| HU-E2-10 | Como persona del equipo, quiero cambiar o quitar la fecha de vencimiento de cualquier tarea para que la marca de vencida refleje el plazo real. | RF-14, RF-12 |

Notas:

- **RF-17 y RF-18 no son historias propias.** RF-17 (no se puede borrar) es una restricción que cubre HU-E2-05; RF-18 (el cambio se ve y no se pierde) es transversal y entrará como criterio en todas las historias.
- HU-E2-07 y HU-E2-08 tocan el mismo dato (responsable) pero sirven a jobs distintos: J2 (quedarme trabajo) frente a repartirlo. Se separan para poder priorizarlas y probarlas por separado; si al escribir criterios resultan idénticas, se fusionan.
- La lista, el filtro, la marca de vencida y ver los cambios ajenos en ≤10 s son E3, no E2.

## Fuera de alcance MVP

Historias que aparecen de forma natural al descomponer E2 y que el alcance excluye. Se listan para que no se cuelen.

| # | Historia | Por qué queda fuera |
|---|---|---|
| X-01 | Como persona del equipo, quiero borrar una tarea creada por error para que no ensucie la lista. | **Fuera de alcance MVP.** Alcance §5 «Borrar tareas»; RF-17. Se cubre con HU-E2-05. |
| X-02 | Como persona del equipo, quiero marcar una tarea como *bloqueada* para avisar de que no puedo avanzar. | **Fuera de alcance MVP.** Alcance §5 «Estado "bloqueado"»; los tres estados son fijos. |
| X-03 | Como persona del equipo, quiero añadir descripción, etiquetas, prioridad, subtareas, comentarios o adjuntos a una tarea para dar más contexto. | **Fuera de alcance MVP.** Alcance §5. |
| X-04 | Como persona del equipo, quiero poner hora y zona horaria al vencimiento para fijar plazos exactos entre husos. | **Fuera de alcance MVP.** Alcance §5 «Hora y zona horaria en el vencimiento». |
| X-05 | Como persona del equipo, quiero que se avise al nuevo responsable cuando le asigno una tarea para que se entere sin mirar la lista. | **Fuera de alcance MVP.** Alcance §5 «Notificaciones»; RNF-5. |
| X-06 | Como persona del equipo, quiero ver quién cambió el estado de una tarea y cuándo para saber cómo se llegó a él. | **Fuera de alcance MVP.** Alcance §5 «Historial o feed de actividad»; RF-28, RNF-6. |
| X-07 | Como persona del equipo, quiero cambiar el estado arrastrando la tarea entre columnas para moverla más rápido. | **Fuera de alcance MVP.** Alcance §5 «Tablero kanban o reordenar arrastrando». |
| X-08 | Como persona del equipo, quiero importar mis tareas del gestor anterior para no crearlas a mano. | **Fuera de alcance MVP.** Alcance §5 «Importar de otro gestor». Ver PA-2. |
| X-09 | Como persona del equipo, quiero que marcar una tarea ajena como *en curso* me la reasigne a la vez para que la lista no atribuya el trabajo a quien no lo hace. | **Fuera de alcance MVP mientras no se decida PA-3.** RF-15 permite cambiar el estado sin reasignar. |
| X-10 | Como persona del equipo, quiero que haya un límite de tareas *en curso* por persona para que la señal no pierda valor. | **Fuera de alcance MVP mientras no se decida PA-3.** Nada en el alcance lo pide. |

PA-8 (máximo de clics para reasignarse) y PA-9 (equivalente en teclado de los dos clics) afectan a los criterios de HU-E2-04 y HU-E2-07, no al listado: se resuelven al escribir los criterios.
