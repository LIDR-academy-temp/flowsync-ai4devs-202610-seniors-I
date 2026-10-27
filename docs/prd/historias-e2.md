# FlowSync — Historias de usuario de E2 «Gestión de tareas»

Fecha: 2026-10-27. Fuente: [flowsync-mvp.md](flowsync-mvp.md) §5 y RF-9 a RF-18, validado contra [alcance-mvp.md](alcance-mvp.md). Si discrepan, manda el alcance.

Solo el listado: los criterios de aceptación se escriben después, y los umbrales y reglas de los RF (dos clics, longitud del título, fecha sin hora…) irán ahí, no en el texto de la historia. El rol es siempre **persona del equipo**, porque el MVP tiene un único rol (PRD §2). La columna *Cubre* indica de qué requisitos y jobs sale cada historia.

## Dentro del MVP

| # | Historia | Cubre |
|---|---|---|
| HU-E2-01 | Como persona del equipo, quiero crear una tarea con su título para dejar registrado trabajo nuevo en la lista del equipo. | RF-9, RF-10, RF-11 (responsable por defecto), RF-13 |
| HU-E2-02 | Como persona del equipo, quiero elegir a otra persona registrada como responsable al crear una tarea para que quede claro desde el principio a quién le toca. | RF-9, RF-11 |
| HU-E2-03 | Como persona del equipo, quiero poner una fecha de vencimiento al crear una tarea para que el equipo sepa para cuándo tiene que estar hecha. | RF-9, RF-12 |
| HU-E2-04 | Como persona del equipo, quiero marcar una tarea como *en curso* directamente desde la lista para que el resto sepa que la he empezado sin que tengan que preguntarme. | RF-15, RF-16 · J3 |
| HU-E2-05 | Como persona del equipo, quiero marcar una tarea como *hecho* para que figure como terminada y no se cuente como trabajo abierto. | RF-15 · J3 |
| HU-E2-06 | Como persona del equipo, quiero devolver a *pendiente* una tarea *en curso* para que la lista refleje que nadie la está haciendo. | RF-15 |
| HU-E2-07 | Como persona del equipo, quiero devolver a *pendiente* una tarea *hecho* para retomarla cuando no estaba terminada de verdad. | RF-15 **[SUPUESTO]** |
| HU-E2-08 | Como persona del equipo, quiero cambiar el responsable de cualquier tarea por cualquier persona registrada, incluida yo, para quedarme trabajo o repartirlo sin preguntar a nadie. | RF-14 · J2 |
| HU-E2-09 | Como persona del equipo, quiero corregir el título de cualquier tarea para que describa bien el trabajo aunque no la haya creado yo. | RF-14, RF-10 |
| HU-E2-10 | Como persona del equipo, quiero cambiar la fecha de vencimiento de cualquier tarea para que refleje el plazo real. | RF-14, RF-12 |
| HU-E2-11 | Como persona del equipo, quiero quitar la fecha de vencimiento de una tarea para que deje de tener un plazo que ya no aplica. | RF-14 |

### Notas

- **Dependencias.**
  - HU-E2-02 y HU-E2-03 son opciones de la creación y dependen de HU-E2-01; se separan para poder entregar y probar la creación mínima antes.
  - HU-E2-04 actúa «desde la lista», que es de E3 (RF-19). Lo mismo vale para que «el resto sepa» (RF-26).
  - La lista, el filtro, la marca de vencida y ver los cambios ajenos en ≤10 s son E3, no E2.
- **Transiciones de estado.** RF-15 permite pasar de cualquier estado a cualquiera de los otros dos. Volver desde *hecho* es un **[SUPUESTO]** de RF-15: lo cubren HU-E2-07 (a *pendiente*) y HU-E2-04 (a *en curso*, que incluye partir de *hecho*).
- **Tarea creada por error.** Como no se puede borrar (alcance §5), se cierra marcándola *hecho* con HU-E2-05. Sigue en la lista: *hecho* cambia el estado, no la saca de ella (RF-19, RF-22; ver PA-4).
- **Requisitos sin historia propia.**
  - **RF-17** (no existe forma de borrar) no lo cubre ninguna historia: es una ausencia. Se verifica con una prueba negativa propia, no como criterio de una historia.
  - **RF-18** (quien cambia ve el resultado en el tiempo de RNF-3 y el cambio persiste) es transversal. Entra como criterio común de HU-E2-01 a HU-E2-11.
- **Transversales a todas las historias:** RNF-10 (todo con teclado) y RNF-8 (castellano).

### Puntos abiertos del PRD que afectan a estas historias

No cambian el listado; se resuelven al escribir los criterios o al decidirlos en el PRD.

- **PA-3.3 (RNF-2):** si en un conflicto gana el último cambio de cada dato o la tarea entera. Afecta a HU-E2-04 a HU-E2-11.
- **PA-7:** al elegir responsable se ofrecen todas las personas registradas, con el email de quien no tiene nombre. Afecta a HU-E2-02 y HU-E2-08.
- **PA-8:** máximo de pasos para reasignarse una tarea. Afecta a HU-E2-08.
- **PA-9:** equivalente con teclado de los dos clics de RF-16. Afecta a HU-E2-04.

## Pendientes de decisión (PA-3)

No están excluidas por el alcance, pero tampoco las pide. Las abre PA-3 (PRD §10). Mientras no se decida, no entran en el MVP y mandan las secciones 1 a 9 del PRD, es decir, RF-15 tal como está.

| # | Historia | Situación |
|---|---|---|
| D-01 | Como persona del equipo, quiero que marcar como *en curso* una tarea ajena me la reasigne a la vez para que la lista no atribuya el trabajo a quien no lo hace. | PA-3.1. Hoy RF-15 permite cambiar el estado sin reasignar. |
| D-02 | Como persona del equipo, quiero que haya un límite de tareas *en curso* por persona para que la señal no pierda valor. | PA-3.2. Nada en el alcance lo pide. |

## Fuera de alcance MVP

Historias cercanas a E2 que el alcance excluye explícitamente. Se listan para que no se cuelen. Las exclusiones de alcance que son de E3 (búsqueda, «mis tareas», filtro por responsable) no se repiten aquí.

| # | Historia | Por qué queda fuera |
|---|---|---|
| X-01 | Como persona del equipo, quiero borrar una tarea creada por error para que no ensucie la lista. | **Fuera de alcance MVP.** Alcance §5 «Borrar tareas»: *hecho* ya sirve para cerrarlas, y borrar exige confirmación o deshacer. RF-17. |
| X-02 | Como persona del equipo, quiero marcar una tarea como *bloqueada* para avisar de que no puedo avanzar. | **Fuera de alcance MVP.** Alcance §5 «Estado "bloqueado"»: resuelve la otra mitad de la daily, que el MVP declara no resuelta. |
| X-03 | Como persona del equipo, quiero añadir descripción, etiquetas, prioridad, subtareas, comentarios o adjuntos a una tarea para dar más contexto. | **Fuera de alcance MVP.** Alcance §5 «Descripción, comentarios, adjuntos…»: cada campo acerca la complejidad de configuración que se quiere evitar. |
| X-04 | Como persona del equipo, quiero poner hora y zona horaria al vencimiento para fijar plazos exactos entre husos. | **Fuera de alcance MVP.** Alcance §5 «Hora y zona horaria en el vencimiento»: se acepta que «vencida» varíe un día entre husos. |
| X-05 | Como persona del equipo, quiero que se avise al nuevo responsable cuando le asigno una tarea para que se entere sin mirar la lista. | **Fuera de alcance MVP.** Alcance §5 «Notificaciones»: la señal tiene que esperar, no interrumpir. RNF-5. |
| X-06 | Como persona del equipo, quiero ver quién cambió el estado de una tarea y cuándo para saber cómo se llegó a él. | **Fuera de alcance MVP.** Alcance §5 «Historial o feed de actividad»: importa el estado actual, no la auditoría. RF-28, RNF-6. |
| X-07 | Como persona del equipo, quiero cambiar el estado arrastrando la tarea entre columnas para moverla más rápido. | **Fuera de alcance MVP.** Alcance §5 «Tablero kanban o reordenar arrastrando»: es otra vista del mismo dato. |
| X-08 | Como persona del equipo, quiero importar mis tareas del gestor anterior para no crearlas a mano. | **Fuera de alcance MVP.** Alcance §5 «Importar de otro gestor o convivir con él». Ver PA-2. |
