# Alcance del MVP de FlowSync (mtpc)

> Idea de partida: «Quiero que FlowSync sea una herramienta para que los equipos remotos sepan en qué está trabajando cada uno sin tener que hacer reuniones de sincronización. Algo tipo tareas compartidas pero más en tiempo real y menos rollo que Jira.»

---

## Tramo 1 · El terreno que ya existe

FlowSync solo tiene construida la gestión de cuentas: registro con nombre opcional, email único y contraseña; login con token; consulta del perfil propio y logout. En el frontend hay pantallas de login, registro y perfil, con rutas protegidas. El modelo de datos tiene únicamente usuarios y sus tokens de acceso, sin ninguna relación más. No existe nada del dominio de tareas: ni tareas, ni estados, ni asignaciones, ni equipos. El MVP se apoya en las cuentas existentes y no las vuelve a especificar.

---

## Tramo 2 · El interrogatorio

### Las cinco preguntas

1. **¿Qué tipo de equipo y de qué tamaño?** ¿Una persona puede estar en más de un equipo?
2. **¿Qué pregunta concreta tiene que responder la herramienta?** "¿En qué está X ahora?", "¿qué ha avanzado cada uno?" o "¿quién está bloqueado?".
3. **¿Qué es "en tiempo real"?** ¿Que el cambio se vea al instante, que el estado esté fresco cuando miras o que te avise algo?
4. **¿De dónde sale la información sobre en qué trabaja cada uno?** ¿La declara cada persona, se deriva de las tareas o viene de integraciones? ¿Cuánto esfuerzo aceptamos que le cueste a cada uno?
5. **¿Cuál es el alcance mínimo para dar la idea por validada, y qué queda fuera explícitamente?**

Las respuestas son la ficha de producto, que se pegó entera y ya venía decidida.

### Supuestos declarados por la IA al leer la ficha

- **S1. Solo el título es obligatorio.** La ficha pide "sin campos obligatorios" y a la vez "título, responsable, estado y fecha". Si el responsable fuera obligatorio, ninguna tarea estaría libre. **Una tarea sin responsable es una tarea libre.**
- **S2. "Lo que se ha movido" se calcula desde tu última visita.** Ese dato solo lo ve cada uno y nunca se enseña a otros, porque el producto rechaza medir la actividad de las personas.
- **S3. Tres estados fijos que no se pueden configurar: *Pendiente*, *En curso* y *Hecha*.** No hay estado *Bloqueada*, porque los bloqueos quedan fuera.
- **S4. Cada tarea tiene un solo responsable.** Cualquiera puede reasignar cualquier tarea, porque los roles son planos.
- **S5. Cualquier cuenta registrada entra en el espacio compartido.** No hay invitaciones. Es suficiente para un caso de estudio, no para producción.
- **S6. Por defecto la lista oculta las tareas *Hechas*.**
- **S7. El éxito se mide preguntando al equipo a la semana**, sin instrumentar el producto.
- **S8. Solo web de escritorio.**

### Supuestos añadidos con el recorte de producto

- **S9. H3 solo se valida si el equipo mira la lista antes de empezar algo.** Sin refresco en vivo, la lista enseña lo que había al abrirla.
- **S10. El solapamiento por módulo no es el problema de este equipo.** El equipo trabaja por secciones (FRONT, BACK) y casi no coincide. H3 solo cubre el solapamiento sobre una misma tarea.
- **S11. El producto no distingue lo atrasado ni lo estancado.** No hay fecha de vencimiento. Es una tensión asumida con H2: ver la entrada de la fecha en el NO-alcance.
- **S12. El MVP no detecta el solapamiento del episodio, solo lo hace visible.** En el episodio, dos personas tocaron el mismo módulo, no la misma tarea. Si cada uno crea su propia tarea sobre lo mismo, el producto no lo impide: lo evita quien lee la lista. El episodio que motiva el producto queda cubierto solo en parte (ver también S10).
- **S13. El producto no impide que dos personas cojan la misma tarea a la vez, ni que alguien se la quite a quien la tiene *En curso*.** H3 solo se cumple si el equipo habla antes, y ese riesgo queda asumido.

---

## Tramo 3 · El alcance

### 1. Problema

En un equipo remoto pequeño nadie ve en qué está cada uno sin interrumpir a alguien. Hoy se paga en la ronda de "¿en qué estás?", que se come la mitad de una daily de 15 minutos, y en preguntas sueltas por chat. Se paga también en trabajo duplicado: dos personas empiezan lo mismo sin saberlo. El gestor de tareas actual no lo resuelve porque actualizarlo cuesta tanto que el estado se queda viejo, y la pregunta vuelve a hacerse en voz alta.

**Lo que no es el problema:** los bloqueos. Esa parte de la daily sigue y este MVP no la toca.

### 2. Usuarios

- **Quién:** equipos remotos de 3 a 10 pares, en varios husos horarios, sin un lead que consuma reportes.
- **Caso de estudio:** un equipo de producto SaaS de 6 personas, en 3 husos horarios, que usa un gestor pesado y una daily por videollamada.
- **Dos momentos de uso:**
  - **El que va a empezar algo.** Quiere saber qué está cogido y qué está libre.
  - **El que llega por la mañana o vuelve de una reunión.** Quiere ver qué se ha movido sin preguntar.
- **Quién no es nuestro usuario:** un equipo que necesite sprints, estimaciones, épicas, backlog priorizado o informes.

### 3. Propuesta de valor

**El estado del equipo se ve de un vistazo al abrir la lista, y se mantiene fresco porque actualizarlo cuesta dos clics sobre la misma lista que cada uno usa como cola de trabajo.** Quien escribe el estado lo cobra en el momento: elige qué coge y deja de recibir interrupciones. Quien lo lee responde "¿quién está en qué?" y "¿qué está libre?" sin preguntar. La señal es un resumen que espera a que mires, no un aviso que interrumpe, y el estado es de la tarea, nunca de la persona.

**Hipótesis que el MVP valida:**

- **H1.** Ver el estado de las tareas del equipo de un vistazo basta para cancelar la ronda de "¿en qué estás?".
- **H2 (riesgo #1).** La gente mantiene el estado fresco sin que la obliguen, si actualizarlo cuesta dos clics y la lista es su cola de trabajo.
- **H3.** Mirar qué está cogido y qué está libre antes de empezar evita duplicar una misma tarea.
- **H4.** Ver qué ha cambiado desde tu última visita sustituye a preguntar, sin necesidad de avisos.

**Criterio de éxito a una semana de uso real:** el equipo cancela la ronda de "¿en qué estás?" y nadie pide que vuelva.

### 4. Alcance

1. **Crear una tarea escribiendo solo el título.** El responsable es opcional y el estado arranca en *Pendiente*. *(H2)*
2. **Una lista única con las tareas de todo el equipo.** Cada tarea muestra título, responsable (o "libre" si no lo tiene) y estado. *(H1, H3)*
3. **Cambiar el estado desde la lista en dos clics como máximo.** *(H2)*
4. **"Me la quedo" en un clic, y asignar o reasignar cualquier tarea a cualquier persona.** No hay confirmación ni limitación por estado, y las *Hechas* se tratan como cualquier otra tarea (S13). *(H3)*
5. **Editar el título de cualquier tarea.** *(H2)*
6. **Filtrar la lista por estado.** Por defecto se ocultan las *Hechas*. *(H1)*
7. **Las tareas que han cambiado desde tu última visita aparecen resaltadas al abrir la lista.** *(H4)*

### 5. NO-alcance

Cada exclusión indica qué hipótesis deja de validar (o por qué no hace falta para validarla) y qué se asume al quitarla.

**Recortes de producto sobre la propuesta de la IA**

- **Refresco en vivo de la lista.**
  - *Qué deja de validar:* "ver los cambios sin refrescar". H1 y H4 se validan igualmente al abrir la lista.
  - *Qué se asume:* quien trabaja concentrado no está mirando la lista, y el resaltado de cambios (ítem 7) cubre el caso de "llego y veo qué se movió". H3 solo funciona si se mira la lista antes de empezar (S9).
- **Etiquetas, módulo o área.**
  - *Qué deja de validar:* el solapamiento por zona de código. H3 queda limitada a tareas compartidas.
  - *Qué se asume:* el equipo trabaja por secciones y casi no coincide, así que el solapamiento por módulo no es su problema (S10).
- **Fecha de vencimiento y marca de "vencida". Es una tensión asumida, no una decisión limpia.**
  - *Por qué sale:* las fechas cambian por ajustes menores y se quedarían viejas, así que añadirían un dato más que mantener fresco.
  - *Qué cuesta:* sin fecha, una tarea *En curso* abandonada hace dos semanas tiene el mismo aspecto que una de ayer. Ese es justo el estado viejo que H2 marca como riesgo #1, y el producto no tiene forma de enseñarlo.
  - *Qué se asume:* el equipo detecta lo estancado leyendo la lista (S11). Si el estado viejo aparece en la primera semana, esta es la primera exclusión a revisar.

**Fuera por decisión de producto previa**

- **Notificaciones push y recordatorios.**
  - *Qué deja de validar:* H4 apuesta por el resumen que espera. Con avisos no se sabría qué informó al equipo.
  - *Qué se asume:* basta con mirar la lista.
- **Integración con Slack.**
  - *Qué deja de validar:* probaría "FlowSync dentro de Slack", no H2.
  - *Qué se asume:* el equipo abre FlowSync por iniciativa propia.
- **Estado derivado de Git/PRs, CI o calendario.**
  - *Qué deja de validar:* H2 pregunta si la persona lo actualiza ella misma, y derivarlo es otro producto.
  - *Qué se asume:* teclear el estado en segundos es aceptable.
- **Roles y permisos.**
  - *Qué deja de validar:* ninguna hipótesis los necesita, y añaden configuración.
  - *Qué se asume:* entre pares, todos editan todo sin conflicto.
- **Analítica e informes.**
  - *Qué deja de validar:* el valor lo cobran los pares, no alguien de arriba.
  - *Qué se asume:* el éxito se mide preguntando al equipo (S7).
- **Comentarios en tareas.**
  - *Qué deja de validar:* se valida el estado, no la conversación.
  - *Qué se asume:* hablar de una tarea sigue haciéndose en el chat.
- **Sprints, estimaciones, épicas y backlog priorizado.**
  - *Qué deja de validar:* son el "rollo" que estropea H2.
  - *Qué se asume:* un equipo que los necesite no es nuestro usuario.
- **Presencia e indicadores de actividad.**
  - *Qué deja de validar:* el estado es de la tarea, y medir a la persona es vigilancia.
  - *Qué se asume:* nadie necesita saber quién está conectado.
- **Varios equipos o personas en varios espacios.**
  - *Qué deja de validar:* el caso de estudio es un solo equipo.
  - *Qué se asume:* hay un único espacio compartido (S5).
- **Chat, videollamada o edición simultánea.**
  - *Qué deja de validar:* "tiempo real" significa frescura del estado, no colaboración.
  - *Qué se asume:* esas herramientas siguen fuera de FlowSync.

**Recortes de la IA aceptados**

- **Descripción larga.**
  - *Qué deja de validar:* el título basta para H1 y H3, y un campo largo encarece crear la tarea (H2).
  - *Qué se asume:* el detalle vive en otro sitio.
- **Estado *Bloqueada*.**
  - *Qué deja de validar:* abriría la parte de bloqueos, que no se valida.
  - *Qué se asume:* los bloqueos siguen en la daily.
- **Estados configurables.**
  - *Qué deja de validar:* configurar es justo el "rollo" (H2).
  - *Qué se asume:* tres estados fijos bastan (S3).
- **Borrar tareas.**
  - *Qué deja de validar:* ninguna hipótesis lo necesita, y abre "¿quién borró mi tarea?" sin permisos.
  - *Qué se asume:* una tarea creada por error se marca *Hecha* o se renombra.
- **Historial de cambios por tarea.**
  - *Qué deja de validar:* H4 pregunta "qué se movió desde que miré", no "quién cambió qué". Lo segundo es auditoría y roza la vigilancia.
  - *Qué se asume:* el resaltado basta.
- **Prioridad u ordenación manual.**
  - *Qué deja de validar:* sería un backlog priorizado encubierto.
  - *Qué se asume:* cada uno elige qué coge.
- **Búsqueda.**
  - *Qué deja de validar:* con 3 a 10 personas y las *Hechas* ocultas, la lista se escanea a ojo.
  - *Qué se asume:* el volumen es bajo.
- **Filtro "mis tareas" o por persona.**
  - *Qué deja de validar:* el filtro que valida H1 es por estado.
  - *Qué se asume:* el responsable visible en cada fila basta.
- **Resumen por email.**
  - *Qué deja de validar:* con otro canal no se sabría si H4 se validó dentro de la lista.
  - *Qué se asume:* el resumen solo existe en la lista.
- **Invitaciones y gestión del espacio.**
  - *Qué deja de validar:* no tocan ninguna hipótesis.
  - *Qué se asume:* quien se registra entra (S5).
- **Móvil.**
  - *Qué deja de validar:* los dos momentos de uso ocurren en el escritorio.
  - *Qué se asume:* solo web de escritorio (S8).
- **Recuperar la contraseña.**
  - *Qué deja de validar:* ninguna de H1 a H4 directamente.
  - *Qué se asume:* un riesgo de adopción. Quien olvide la contraseña durante la semana de prueba se queda fuera, deja de actualizar sus tareas y el estado se queda viejo por abandono, no por fricción. Se asume que en un caso de estudio de 6 personas se resuelve a mano.
- **Tareas recurrentes, adjuntos, importar desde el gestor actual, subtareas, tablero kanban y editar el perfil.** Ninguna cambia ni la decisión de qué coger ni la frescura del estado, así que no validan ninguna de H1 a H4. Son estructura de planificación, comodidades de cuenta o formas distintas de enseñar lo mismo. *Qué se asume:* tareas planas y puntuales, una sola vista, el caso de estudio arranca de cero y basta el perfil que ya existe.

---

## Parte B · Las tres líneas

3. **La exclusión de la que menos seguro estoy: proteger "Me la quedo" y la reasignación.** Intenté cerrar el hueco de trabajo duplicado (H3) con una confirmación al coger una tarea que ya tiene dueño. Cada regla abría otro hueco: limitarlo a Pendientes dejaba la vía de pasar una En curso a Pendiente sin confirmación, y cerrar esa vía exigía restringir quién cambia estados, lo que rompe los roles planos que la ficha fija. Se contradecían lo que valida H3 (que nadie pise el trabajo de otro) y lo barato de H2 (cada regla encarece actualizar). Me quedé con lo barato y asumo que H3 solo se cumple si el equipo habla antes. No supe decidir esta con seguridad. Entraría si, en la semana de uso, dos personas acaban haciendo la misma tarea y el equipo lo atribuye al producto y no a falta de comunicación.
