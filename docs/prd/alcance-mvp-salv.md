# Alcance del MVP de FlowSync

## Tramo 1. El terreno que ya existe

Hoy FlowSync solo gestiona cuentas: registro, login, perfil y logout. El único dato de producto es el usuario; no hay tareas, equipos ni espacios. El alcance parte de esa base: reutiliza el alta que ya existe y no vuelve a especificarla.

## Tramo 2. El interrogatorio

Cinco preguntas en una sola ronda, sin bajar al modelo de datos ni a los endpoints. Las respuestas salen de la ficha de hechos del ejercicio.

1. **El problema.** ¿Qué situación concreta se quiere eliminar? → La ronda de "¿en qué estás?" de la daily (la mitad de sus 15 minutos) y las interrupciones por chat. La parte de bloqueos sigue. Episodio: dos personas tocaron el mismo módulo la misma semana; dos días perdidos.
2. **Los usuarios.** ¿Quién gana: los pares o un manager? → Los pares. Equipos remotos de 3 a 10 personas, roles planos. Caso de estudio: equipo SaaS de 6 personas en 3 husos horarios.
3. **"Más en tiempo real".** ¿Qué se ve sin preguntar y qué decisión cambia? → El estado de las tareas, no la presencia de las personas. Es un resumen que espera, no un aviso. Decisión: no empezar lo que otro ya toca y elegir lo siguiente sabiendo qué está libre.
4. **"Menos rollo que Jira".** ¿Qué necesita una tarea y a qué se renuncia? → Título, responsable, estado y fecha de vencimiento, creada y actualizada en segundos. Sustituye al gestor actual, no convive con él. Se renuncia a sprints, estimaciones, épicas, backlog priorizado e informes.
5. **Éxito y fronteras.** ¿Qué pasa tras una semana y qué queda fuera? → El equipo cancela la ronda de estado y nadie pide que vuelva. Fuera: push, Slack, roles avanzados, analítica, comentarios, integraciones con Git/CI/calendario y varios equipos.

**Supuestos** (huecos que la ficha no cubre, decididos por la IA o por mí):

- Los estados son fijos y no se configuran: pendiente, en curso, terminada y anulada.
- Solo el título es obligatorio. Una tarea sin responsable cuenta como libre; la fecha de vencimiento es opcional.
- Pasar a en curso una tarea libre equivale a tomarla: queda asignada a quien la mueve.
- Con roles planos, cualquiera puede devolver a pendiente la tarea de otra persona; se confía en el equipo.
- No hay vista de "cambios desde tu última visita": la lista al abrirla hace de resumen.
- Todo el que se registra con el alta existente pertenece al único espacio compartido, sin invitaciones ni equipos.

## Tramo 3. El alcance en cinco bloques

### 1. Problema y contexto

En un equipo remoto pequeño nadie sabe en qué está cada compañero sin interrumpirle o esperar a la daily. El resultado son preguntas constantes por chat, media daily dedicada a repasar el estado de cada uno y, a veces, dos personas haciendo lo mismo sin saberlo. Episodio real: dos personas tocaron el mismo módulo la misma semana porque una empezó sin que la otra lo supiera, y se perdieron dos días.

### 2. Usuarios y roles: qué problema se les resuelve y cómo lo resuelven hoy

- **Quiénes son:** los miembros de un equipo remoto de 3 a 10 personas, repartidos en varios husos horarios. El primer caso de estudio es un equipo de producto SaaS de 6 personas en 3 husos horarios.
- **Roles:** planos. Todos ven y editan lo mismo, sin jerarquía de permisos. No es un producto para managers ni para reportar hacia arriba.
- **Qué problema se les resuelve:** saber qué está pendiente y quién lleva qué sin preguntar, y no empezar algo que otra persona ya está haciendo.
- **Cómo lo resuelven hoy:** con un gestor de tareas pesado que nadie consulta para esto, una daily de 15 minutos por videollamada cuya mitad se va en la ronda de "¿en qué estás?", y preguntas sueltas por Slack o chat.

### 3. Valor que aporta

- Ver de un vistazo el trabajo abierto del equipo (qué está pendiente, qué está en curso, quién lo lleva y para cuándo) sin interrumpir a nadie.
- Tomar una tarea con la garantía de que nadie más la tiene, lo que evita el trabajo duplicado.
- Eliminar la ronda de "¿en qué estás?" de la daily. La parte de bloqueos se mantiene.
- **Criterio de éxito:** tras una semana de uso real, el equipo cancela esa ronda y nadie pide que vuelva.

### 4. Alcance

El criterio de corte es **qué hace falta para validar las tres hipótesis del MVP**: que el estado del equipo se vea de un vistazo sin preguntar a nadie, que nadie empiece algo que otra persona ya está tocando, y que la gente mantenga la lista al día porque es su propia cola de trabajo y actualizarla cuesta poco. Solo entra lo imprescindible para comprobarlas: ver el trabajo abierto, tomarlo sin pisarse y cerrarlo. Hay un único espacio compartido, y todo el que se registra pertenece a él. Los estados son fijos: pendiente, en curso, terminada y anulada.

**MUST**
1. **Ver las tareas por estado.** *Dado* que abro FlowSync, *cuando* miro la lista, *entonces* veo por defecto las tareas pendientes y en curso del equipo, con su título, responsable, estado y fecha de vencimiento. *Mientras* la tengo abierta, *cuando* otra persona cambia una tarea, *entonces* veo el cambio sin refrescar ni preguntar a nadie. *Cuando* elijo otro estado, *entonces* veo las tareas que están en ese estado.
2. **Crear una tarea con solo el título.** *Dado* que hay trabajo nuevo, *cuando* creo una tarea, *entonces* aparece en la lista como pendiente. La fecha de vencimiento es opcional.
3. **Tomar una tarea en exclusiva.** *Dada* una tarea libre, *cuando* la tomo, *entonces* queda asignada a mí y pasa a en curso. *Dada* una tarea que ya tiene responsable, *cuando* otra persona intenta tomarla, *entonces* no puede, y ve quién la tiene.
4. **Cambiar el estado de una tarea desde la propia lista.** *Dada* una tarea en cualquier estado, *cuando* la paso a otro estado desde la lista, sin abrir otra pantalla, *entonces* el cambio queda guardado. *Dada* una tarea asignada, *cuando* la devuelvo a pendiente, *entonces* pierde su responsable y queda libre para que otra persona la tome. *Dada* una tarea, *cuando* la marco como terminada o anulada, *entonces* deja de aparecer en la vista por defecto.

### 5. No-alcance

Cada exclusión se justifica de una de dos formas: porque se opone a una premisa ya decidida del producto, o porque no ayuda a validar ninguna de las hipótesis del alcance. Las hipótesis se numeran así:

- **H1.** Si el estado del equipo se ve de un vistazo, el equipo deja de hacer la ronda de "¿en qué estás?".
- **H2.** Si tomar una tarea es exclusivo y visible, nadie empieza algo que otra persona ya está tocando.
- **H3.** La gente mantiene la lista al día porque es su propia cola de trabajo y actualizarla cuesta poco.

Exclusiones:

- **Avisos de cada cambio en el momento en que ocurre**, dentro de la aplicación. Se oponen a una premisa del producto: la señal es un resumen que espera ("llego o vuelvo de una reunión y miro qué se ha movido"), no un aviso que interrumpe. Un aviso por cada cambio reintroduce la interrupción que el producto quiere quitar, y por eso además va contra H1. Ver los cambios ya está cubierto, porque la lista se mantiene al día sola (MUST 1).
- **Mecanismos para obligar a actualizar** (recordatorios, actualizaciones obligatorias, avisos por inactividad). Se oponen a una premisa del producto: «la mitigación es que actualizar cueste dos clics, no obligar a nadie». Además invalidan H3: si la lista se mantiene porque se obliga, no sabremos si se mantiene porque sirve. Por eso el riesgo principal, que la información se quede vieja, se observa durante la semana de uso en lugar de taparlo.
- **Notificaciones push** (regla pre-establecida en Readme). Se oponen a una premisa del producto: «resumen que espera, no aviso que interrumpe. Sin notificaciones push».
- **Integración con Slack** (regla pre-establecida en Readme). Se opone a una premisa del producto: FlowSync «es donde se hace el trabajo, no donde se cuenta». Llevar el estado a otra herramienta lo convierte en un sitio donde se cuenta.
- **Importar o sincronizar con otro gestor de tareas.** Se opone a una premisa del producto: «sustituye al gestor de tareas, no convive con él. FlowSync crea las tareas, no lee las de otro sitio». Convivir obliga a actualizar dos sitios, que es como muere esta categoría de producto.
- **Deducir el estado de Git, CI o el calendario.** Se opone a una premisa del producto: el estado «lo teclea la persona que hace la tarea»; derivarlo de señales externas «es otro producto».
- **Presencia** ("quién está conectado", indicadores de actividad). Se opone a una premisa del producto: «es frescura, no presencia: el estado es de la tarea, no de la persona». La presencia sería vigilancia.
- **Comentarios en las tareas** (regla pre-establecida en Readme). No ayudan a validar ninguna hipótesis: llevan a conversar sobre la tarea y a hablar de bloqueos, y nada de eso dice quién está en qué ni qué está libre.
- **Gestionar bloqueos.** Se opone a una premisa del producto: «la parte de bloqueos sigue, y este MVP no la resuelve». Solo desaparece la ronda de estado de la daily.
- **Chat, videollamada o edición simultánea.** Se oponen a una premisa del producto: «"tiempo real"… NO es chat, NO es videollamada, NO es colaboración simultánea sobre el mismo documento».
- **Roles y permisos avanzados** (regla pre-establecida en Readme). Se oponen a una premisa del producto: «roles planos: en el MVP todos ven y editan lo mismo, sin jerarquía de permisos».
- **Varios equipos, o personas en más de uno.** Se opone a una premisa del producto: «un espacio único compartido, sin entidad "equipo"»; los equipos separados quedan como supuesto, no se construyen.
- **Analítica y reporting** (regla pre-establecida en Readme). Se oponen a una premisa del producto: el valor lo cobran «los pares, no un lead. No hay reporte hacia arriba».
- **Sprints, estimaciones, épicas y backlog priorizado.** Se oponen a una premisa del producto: «renuncia explícita a sprints, estimaciones, épicas, backlog priorizado e informes. Un equipo que necesite eso no es nuestro usuario».
- **Estados o flujos configurables.** Se oponen a una premisa del producto: «menos rollo que Jira» es crear y actualizar tareas «sin flujos de configuración».
- **Destacar lo que se ha movido desde la última visita.** No ayuda a validar H1: al abrir la lista ya se ve quién está en qué; destacarlo solo añade comodidad.
- **Marcar las tareas vencidas.** No ayuda a validar ninguna hipótesis: la fecha ya se ve en la lista, y marcarla no cambia quién está en qué ni qué está libre.
- **Corregir una tarea** (título, responsable, fecha). No ayuda a validar H1 ni H2: la lista se puede leer y las tareas se pueden tomar igual, aunque un título tenga una errata.
- **Borrar una tarea.** No ayuda a validar ninguna hipótesis: marcarla como anulada la saca de la vista por defecto y deja constancia de que existió.

## Parte B

1. **Los dos números.** La herramienta propuso 10; quedaron 4.

2. **Lo que quedó fuera y por qué.** Tres propuestas que mejoran la usabilidad pero no ayudan a validar ninguna hipótesis del MVP:
   - **Ver marcadas las tareas vencidas.** La fecha ya se ve en la lista; marcarlas es comodidad visual y no cambia quién está en qué ni qué está libre (H1, H2).
   - **Destacar lo que se ha movido desde la última visita.** La lista ya se mantiene al día; destacar los cambios ahorra buscarlos, pero no aporta evidencia a H1.
   - **Borrar una tarea.** Mantiene la lista limpia, pero anularla cumple lo mismo para H1 y H2: sale de la vista por defecto.

3. **La exclusión de la que menos seguro estoy: corregir una tarea.** Equivocarse al escribir el título o tener que cambiar la fecha es muy natural, así que en el uso real aparecerá pronto. Chocan dos cosas: lo mínimo para validar el MVP frente a lo habitual que es equivocarse. Si el equipo no se adapta a usar la anulación (anular la tarea errónea y crear una nueva), se debería agregar.

**Nota tras la revisión:** la actualización en vivo (punto 8 de los 10) estaba fuera y se integró en el MUST 1. Excluirla contradecía la definición de "tiempo real" de la ficha ("ver los cambios… sin refrescar ni preguntar").
