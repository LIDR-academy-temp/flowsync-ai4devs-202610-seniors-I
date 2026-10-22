# FlowSync — Alcance del MVP

> Punto de partida: «Quiero que FlowSync sea una herramienta para que los equipos remotos sepan en qué está trabajando cada uno sin tener que hacer reuniones de sincronización. Algo tipo tareas compartidas pero más en tiempo real y menos rollo que Jira.»

---

## 1. El terreno que ya existe

Hoy FlowSync solo tiene autenticación: registro, inicio de sesión, perfil y cierre de sesión. La única entidad de negocio es el usuario, con sus tokens de sesión. No existe nada de tareas, proyectos ni equipos: la parte de gestión de tareas está sin empezar. El MVP se construye sobre los usuarios que ya existen y no vuelve a especificar el acceso.

---

## 2. Interrogatorio

### P1. ¿Quién es el usuario y cómo es el equipo?

Equipos remotos pequeños, de 3 a 10 personas, con roles planos: todos ven y editan lo mismo, sin jerarquía. Hay un único espacio compartido y no existe la entidad "equipo". El caso de referencia es un equipo de producto SaaS de 6 personas en 3 husos horarios, que hoy usa un gestor de tareas pesado y una daily de 15 minutos por videollamada. Es un caso de estudio, no un cliente real.

- **[S1]** Registrarse da acceso directo al espacio compartido. No hay invitaciones ni alta de equipo.
- **[S2]** Cada instalación sirve a un solo equipo. Varios equipos, o personas en más de uno, quedan fuera.

### P2. ¿Qué reunión queremos eliminar y qué decisión se tomaba en ella?

No desaparece la daily entera. Desaparece la ronda de "¿en qué estás?", que se come la mitad de los 15 minutos, y también las interrupciones por chat para preguntar lo mismo. La parte de bloqueos sigue, y este MVP no la resuelve.

Las decisiones que cambian son dos: **no empezar algo que otra persona ya está tocando** y **elegir lo siguiente sabiendo qué está libre**. El episodio que ancla el problema: dos personas tocaron el mismo módulo la misma semana sin saberlo y perdieron dos días.

### P3. ¿Qué significa "en tiempo real"?

Ver los cambios de estado de las tareas sin refrescar y sin preguntar a nadie. Se trata de que la información esté fresca, no de mostrar quién está conectado: el estado pertenece a la tarea, no a la persona. No hay indicadores de conexión ni de actividad, porque eso es vigilancia y se rechaza a propósito. La señal es un resumen que espera a que lo mires, no un aviso que interrumpe: «llego por la mañana o vuelvo de una reunión y veo qué se ha movido». No incluye chat, videollamada ni edición simultánea.

- **[S3]** "Ver qué se ha movido" se resuelve con tres cosas: la lista se actualiza sola, cada tarea muestra cuándo cambió por última vez, y la lista se ordena por el cambio más reciente. No se guarda el "no leído desde tu última visita" de cada persona.

### P4. ¿Dónde está el límite de "menos rollo que Jira"?

Crear una tarea o cambiarle el estado debe llevar segundos: dos clics sobre una lista ya abierta, sin flujos de configuración y sin campos obligatorios ni sprints. Una tarea tiene título, responsable, estado y fecha de vencimiento. La lista se consume filtrando por estado, y la fecha sirve para ver de un vistazo qué se ha pasado de plazo. *(Respuesta de la ficha; la fecha quedó fuera en el recorte, ver NO-alcance.)*

FlowSync sustituye al gestor de tareas: crea sus propias tareas y no lee las de otro sitio. Se renuncia explícitamente a sprints, estimaciones, épicas, backlog priorizado e informes; un equipo que necesite eso no es nuestro usuario. El estado lo escribe a mano la persona que hace la tarea y no se deduce de Git, CI ni el calendario.

- **[S4]** Hay tres estados fijos que no se pueden configurar: *Por hacer*, *En curso* y *Hecha*.
- **[S5]** ~~Solo el título es obligatorio; el responsable y la fecha son opcionales. Una tarea sin responsable significa que está libre para cogerla.~~ *Sustituido tras el recorte: ver S5 en la lista de supuestos.*
- **[S6]** ~~Cualquier persona puede crear, editar y reasignar cualquier tarea.~~ *Sustituido tras el recorte: ver S6 en la lista de supuestos.*
- **[S7]** ~~La fecha de vencimiento es un día, sin hora. Una tarea está vencida cuando ese día ya ha pasado en la hora local de quien la mira y la tarea no está *Hecha*.~~ *Ya no aplica: la fecha quedó fuera en el recorte.*

### P5. ¿Cómo sabremos que funciona y en qué plazo?

Para el usuario, el éxito es dejar de hacer la ronda de "¿en qué estás?" porque el estado del equipo se ve de un vistazo. El criterio, tras una semana de uso real: el equipo cancela esa ronda y nadie pide que vuelva. Si la siguen haciendo igual, no ha funcionado.

El riesgo principal es que la información se quede vieja, porque entonces el producto pierde el sentido. La mitigación es que actualizar cueste dos clics, no obligar a nadie.

Se construye una vertical fina y usable de punta a punta: mejor una capability terminada que tres a medias.

- **[S8]** No hay fecha límite de entrega. El alcance lo marca la vertical fina, no el calendario.
- **[S9]** Como el primer usuario es un caso de estudio, el criterio de una semana es una hipótesis que tendrá que probar un equipo real. El MVP no lo demuestra por sí solo.

### Supuestos declarados

- **S1.** Registrarse da acceso directo al espacio compartido, sin invitaciones.
- **S2.** Un solo equipo por instalación.
- **S3.** "Qué se ha movido" = lista que se actualiza sola + hora del último cambio + orden por recencia. Sin "no leído" por persona.
- **S4.** Tres estados fijos: Por hacer, En curso, Hecha.
- **S5.** Una tarea tiene título, responsable y estado. Solo el título es obligatorio; sin responsable = libre. *(Tras el recorte: sin fecha de vencimiento.)*
- **S6.** Roles planos: cualquiera crea tareas, cambia el estado de cualquier tarea, coge una tarea libre, suelta cualquier tarea y descarta una creada por error. Pasar a *En curso* una tarea libre es cogerla. *(Tras el recorte: no se edita el título ni se asigna a otra persona.)*
- **S7.** ~~Fecha de vencimiento sin hora; vencida si pasó en la hora local de quien mira y la tarea no está Hecha.~~ *Ya no aplica: la fecha quedó fuera en el recorte.*
- **S8.** Sin fecha límite; manda el alcance.
- **S9.** El criterio de una semana queda pendiente de validar con un equipo real.

---

## 3. Alcance del MVP

### Problema

En un equipo remoto pequeño nadie ve en qué está cada uno sin interrumpir a alguien. La forma de enterarse es preguntar: en la ronda de "¿en qué estás?" de la daily, que se come la mitad de la reunión, o por chat a lo largo del día. Cuando esa información no llega a tiempo, dos personas empiezan lo mismo sin saberlo y pierden días de trabajo. Los gestores de tareas existentes no lo resuelven porque actualizarlos cuesta demasiado, la información se queda vieja y la gente vuelve a preguntar.

### Usuarios

Las personas de un equipo remoto de 3 a 10 miembros, todas con los mismos permisos. El valor no va a un responsable ni a un manager: lo reciben los pares. Por un lado, quien descubre tarde que otra persona iba a lo mismo. Por otro, quien interrumpe para preguntar y quien recibe esa interrupción. El caso de referencia es un equipo de producto SaaS de 6 personas repartidas en 3 husos horarios.

### Propuesta de valor

Una lista de tareas compartida, que es a la vez la cola de trabajo de cada persona, donde se ve de un vistazo y sin recargar qué está en curso, quién lo tiene y qué está libre. Actualizarla cuesta dos clics, y quien lo hace se beneficia en el momento: usa esa misma lista para decidir qué coge y deja de recibir preguntas sobre cómo va.

El MVP existe para validar tres hipótesis:

- **H1, visibilidad:** si el estado del equipo se ve de un vistazo, el equipo deja de hacer la ronda de "¿en qué estás?".
- **H2, frescura:** si actualizar cuesta dos clics y la lista es la propia cola de trabajo, la gente la mantiene al día sin que nadie la obligue.
- **H3, coordinación:** si se ve qué está cogido y qué está libre, nadie empieza algo que otra persona ya está tocando.

### Alcance

Partimos de lo que ya funciona (registro, inicio de sesión y cierre de sesión) y añadimos una única vertical: **la lista de tareas compartida y viva**.

1. **La lista de tareas es la pantalla principal.** Al iniciar sesión, la persona aterriza en la lista de tareas del espacio compartido, no en su perfil. Todas las personas registradas ven la misma lista (S1, S2).
2. **Crear una tarea en segundos.** Desde la propia lista, escribiendo solo el título. Toda tarea nueva empieza en *Por hacer* y sin responsable, es decir, libre (S5).
3. **Cambiar el estado con dos clics.** Desde la lista, sin abrir la tarea, se pasa entre *Por hacer*, *En curso* y *Hecha* (S4). Lo normal es que lo haga quien hace la tarea, pero como los roles son planos cualquiera puede hacerlo. Pasar a *En curso* una tarea libre es cogerla: nunca hay una tarea en curso sin responsable (S6).
4. **Coger o soltar una tarea.** Una tarea sin responsable aparece como libre, y cualquiera puede asignársela a sí misma con un gesto. Cualquiera puede soltarla, también una que su responsable abandonó: vuelve a *Por hacer* y queda libre otra vez (S6).
5. **La lista se actualiza sola.** Los cambios que hacen otras personas (tareas nuevas, cambios de estado o de responsable) aparecen sin recargar ni avisar.
6. **Ver qué se ha movido.** Cada tarea muestra cuándo cambió por última vez, y la lista se ordena por defecto con el cambio más reciente arriba (S3).
7. **Filtrar por estado.** Por defecto la lista muestra lo que no está *Hecho* y lo que pasó a *Hecha* desde el día anterior, para que el cierre de una tarea también se vea como movimiento; lo terminado antes solo aparece con el filtro. Con el filtro se puede ver lo pendiente, lo que está en curso o lo terminado.
8. **Descartar una tarea creada por error.** Cualquiera puede quitar de la lista una tarea que no debía existir, para que *Hecha* signifique siempre "terminada" y la lista diga la verdad (S6).

### NO-alcance

Cada exclusión se justifica por la hipótesis que **no** ayuda a validar (H1 visibilidad, H2 frescura, H3 coordinación).

**Recorte propio** (estaba dentro de la propuesta de la IA y lo saqué):

- **Fecha de vencimiento y tareas vencidas a la vista.** Contradice a propósito la ficha, que pedía la fecha (ver parte B, punto 3). No ayudan a ninguna hipótesis. H1 trata de saber quién está en qué, no de controlar plazos; marcar lo vencido es una señal de planificación, el primer paso hacia el backlog y los informes a los que el producto renuncia. Además añade un campo más a cada tarea, que va contra H2.
- **Asignar una tarea a otra persona.** No ayuda a validar H3, que se cumple si cada cual coge lo suyo y se ve. Repartir trabajo a otros es lo que hace un lead, y el valor va a los pares. Si una tarea queda abandonada, basta con soltarla (alcance 4) para que otra persona la coja.
- **Editar el título de una tarea.** No ayuda a ninguna hipótesis: H2 mide si la gente actualiza el *estado*, no el contenido. Si una tarea se crea mal, se descarta y se crea otra (alcance 8).

**Propuesto por la IA:**


- **Notificaciones push y avisos.** No ayudan a ninguna hipótesis. La señal está pensada como un resumen que espera a que lo mires; un aviso que interrumpe pondría a prueba otro producto e introduciría el ruido que queremos quitar.
- **Integración con Slack.** No ayuda a ninguna hipótesis. Además, saca el estado fuera de la lista y vuelve a la doble actualización, que es justo lo que pone en riesgo H2.
- **Roles y permisos avanzados.** No ayudan a ninguna hipótesis: el valor va a los pares y los roles son planos. Unos permisos solo añadirían fricción a H2.
- **Analítica, informes y reporting.** No ayudan a ninguna hipótesis: no hay reporte hacia arriba y a ningún manager le interesa. El éxito se mide en la daily, no en un panel.
- **Comentarios en tareas.** No ayudan a ninguna hipótesis. Abren la conversación sobre bloqueos, que este MVP no resuelve, y convierten la lista en un chat.
- **Varios equipos, espacios o pertenencia múltiple.** No ayudan a ninguna hipótesis: las tres se validan con un solo equipo (S2).
- **Invitaciones y alta de equipo.** No ayudan a ninguna hipótesis. Con el registro abierto a un espacio único es suficiente para el piloto (S1).
- **Presencia, "quién está conectado" e indicadores de actividad.** No ayudan a ninguna hipótesis, porque el estado es de la tarea y no de la persona. Además se rechazan a propósito por ser vigilancia.
- **Estado deducido de Git, PRs, CI o calendario.** Evitaría validar H2, que es justo comprobar si la gente actualiza a mano cuando cuesta dos clics. Además es otro producto, con integraciones de terceros.
- **Importar o sincronizar con otro gestor de tareas.** Rompe H2 por la doble actualización. FlowSync sustituye al gestor de tareas, no convive con él.
- **Sprints, estimaciones, épicas y backlog priorizado.** No ayudan a ninguna hipótesis y van contra H2, porque añaden decisiones a cada actualización. Un equipo que los necesite no es nuestro usuario.
- **Estados configurables o flujos de trabajo personalizados.** No ayudan a ninguna hipótesis. Tres estados fijos bastan para saber quién está en qué (S4).
- **Descripción, etiquetas, prioridad, adjuntos y subtareas.** No ayudan a ninguna hipótesis. Basta el mínimo para saber quién está en qué: título, responsable y estado.
- **"No leído desde tu última visita" por persona.** H1 ya se valida con la hora del último cambio y el orden por recencia (S3). Esto añadiría un estado por persona sin aportar evidencia nueva.
- **Resolver bloqueos.** La parte de bloqueos de la daily sigue existiendo y queda fuera de este MVP a propósito: no forma parte de ninguna de las tres hipótesis.
- **Edición de perfil, recuperación de contraseña y gestión de cuenta.** No ayudan a ninguna hipótesis. Lo que ya existe en el proyecto basta para identificar a cada persona en la lista.

---

## Parte B

**1. Los dos números.** La IA propuso 9 elementos dentro del alcance; después de mi recorte quedaron 7. Tras la revisión de incoherencias quedaron 8, al meter "Descartar una tarea creada por error".

**2. Tres cosas que dejé fuera, y por qué.**
- **Fecha de vencimiento y vencidas a la vista:** no ayuda a validar ninguna de las tres hipótesis. H1 es saber quién está en qué, no si algo va tarde; controlar plazos acerca el producto al gestor pesado que quiere sustituir.
- **Asignar tareas a otra persona:** no ayuda a validar H3, que se valida con que cada cual coja lo suyo a la vista de todos. Asignar a otros es repartir trabajo, el rol de un lead, y el valor es para los pares.
- **Editar el título:** no ayuda a validar H2, que mide si se actualiza el estado. Corregir contenido no aporta evidencia sobre si la lista se mantiene fresca.

**3. La exclusión de la que menos seguro estoy: la fecha de vencimiento.** Se contradicen dos cosas: la ficha la pide explícitamente como parte de lo que necesita una tarea, pero no encuentro qué hipótesis ayuda a validar. Entraría si en el piloto la ronda de "¿en qué estás?" no desaparece porque la pregunta real resulta ser "¿esto para cuándo está?".

**📌 Incoherencias que me señaló la IA, y tenía razón.**
- *Antes del recorte:* el NO-alcance de la IA excluía "Borrar tareas" diciendo que lo terminado "desaparece con el filtro", pero el alcance no ocultaba nada por defecto. Además, la IA sacó "borrar" y cambió el supuesto S6 por su cuenta, y metió los supuestos en una tabla, que pasé a lista.
- *Después de mi recorte* le pedí que agujereara el documento y encontró cinco incoherencias que introduje yo: supuestos con dos versiones (S5, S6, S7); "el estado lo teclea quien hace la tarea" mientras cualquiera podía cambiarlo, con tareas *En curso* sin responsable; ocultar lo *Hecho* borraba de la vista justo el movimiento más frecuente; no había forma de soltar una tarea cogida; y mi salida para las tareas mal creadas (marcarlas *Hechas*) llenaba *Hecha* de cosas no hechas. Lo corregí con los alcances 3, 4, 7 y 8. La lección: recortar una pieza obliga a revisar todo lo que dependía de ella.
- *Tercera revisión:* encontró cinco más. Corregí las tres graves, que tenían la misma raíz: al decir que solo el responsable cambiaba el estado, metí un permiso por tarea que contradecía los roles planos y dejaba tareas abandonadas cogidas para siempre (el riesgo #1 del producto). Volví a roles planos y cualquiera puede soltar una tarea. También taché las versiones viejas de S5 y S6. Dejo dos pendientes a propósito, para no entrar en otra ronda: los descartes no se ven como movimiento, y "desde el día anterior" no dice en qué huso horario ni cubre la vuelta de un fin de semana.
