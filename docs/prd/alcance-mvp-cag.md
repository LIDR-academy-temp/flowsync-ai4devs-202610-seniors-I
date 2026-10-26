Actualmente solo esta construido el comportamiento de la identidad de los usuarios y mecanismo de inicio de sesión, con esto se pueden dar de alta los usuarios e iniciar sesión.

## Problema

En un equipo remoto nadie ve en qué está el resto sin interrumpir. La daily de 15 minutos se come la mitad en la ronda de "¿en qué estás?", y entre medias se repite la misma pregunta por el chat. El daño concreto es pisarse: dos personas tocaron el mismo módulo la misma semana porque una empezó sin saber que la otra ya estaba en ello, y se perdieron dos días.

La daily no desaparece. Sigue la parte de bloqueos. Este producto retira solo la ronda de estado.

## Usuarios

Pares de un equipo remoto pequeño, de 3 a 10 personas. Todos ven y editan lo mismo. Quien cobra el valor es quien va a empezar algo y quien deja de recibir la pregunta de cómo va. A un manager le da igual: no hay reporte hacia arriba.

El caso de estudio es un equipo de 6 personas de producto SaaS, en 3 husos horarios, que hoy usa un gestor de tareas pesado y una daily por videollamada. Es un caso de estudio, no un cliente.

## Propuesta de valor

Una lista compartida que es, a la vez, la cola de quien trabaja y la vista de quien llega. Quien hace la tarea deja el estado en dos clics, sobre esa lista ya abierta, y en ese momento deja de recibir interrupciones. Quien llega por la mañana, o vuelve de una reunión, mira la misma lista y decide: no empieza lo que otro ya tiene cogido, y coge lo que está libre. También ve qué se ha pasado de plazo.

El estado lo escribe la persona que hace la tarea. Si la lista se queda vieja, el producto pierde el sentido. Se sostiene porque actualizar es barato y quien actualiza cobra en el acto: esa lista es la que mira para elegir lo siguiente.

El éxito es que el equipo deje de hacer la ronda de "¿en qué estás?". A la semana de uso, la cancela y nadie pide que vuelva.

## Alcance

Una sola lista compartida, en un único espacio. Quien entra ve y puede cambiar las mismas tareas que el resto.

Una tarea lleva siempre título, responsable, estado y fecha de vencimiento. Los cuatro van con ella desde que existe: sin responsable no se sabe quién está en qué, y sin fecha no se ve qué se ha pasado de plazo. El estado dice si está libre, en curso o hecha. Esos tres estados son los mismos para todo el mundo. Una fecha ya pasada se reconoce al mirar la lista; no es un estado más.

Desde la lista se cambia el estado y el responsable en dos clics, y se corrige la fecha. La lista se filtra por estado para quedarse con lo pendiente. Mientras está abierta, muestra el estado vigente de cada tarea, sin tener que recargar ni preguntar a nadie.

## NO-alcance

Queda fuera cancelar la daily y resolver los bloqueos. Lo que duele y se retira es la ronda de estado, la mitad de esos 15 minutos. Los bloqueos siguen en la reunión. Atenderlos sería otro problema.

Queda fuera la entidad equipo, más de un espacio y que una persona esté en varios. El caso es un solo grupo de 3 a 10 personas en un espacio compartido. Separar espacios no cambia la decisión de qué está libre.

Queda fuera cualquier permiso distinto de ver y editar lo mismo. No hay lead ni manager usando el producto. Una jerarquía no cobra el valor.

Queda fuera la presencia: quién está conectado, la última vez que alguien entró, indicadores de actividad de la persona. El estado es de la tarea. Señalar a la persona es vigilancia y no evita que dos empiecen lo mismo.

Queda fuera el chat, la videollamada y escribir a la vez sobre el mismo texto. Aquí "tiempo real" es ver el estado vigente de la tarea al mirar la lista, no hablar ni coeditar.

Quedan fuera las notificaciones push y cualquier aviso que interrumpa. La señal espera a que la persona abra la lista: llega por la mañana o vuelve de una reunión y mira. Un aviso reproduce la interrupción que el producto quiere quitar.

Queda fuera integrar Slack. El producto sustituye la pregunta por el chat. Engancharse al chat no hace visible el estado de la tarea.

Queda fuera un historial de cambios o un parte de "qué se movió". La decisión usa el estado actual: quién lo tiene, qué está libre, qué venció. Un registro de lo ocurrido es un informe, y los informes están fuera.

Queda fuera tomar el estado de Git, de pull requests, de la integración continua o del calendario. El estado lo escribe quien hace la tarea, en segundos. Leer señales de otro sitio es otro producto.

Queda fuera convivir con otro gestor de tareas e importar las suyas. FlowSync es donde se crea la tarea y donde se elige la siguiente. Mantener dos sitios obliga a actualizar dos veces, y entonces nadie actualiza.

Quedan fuera sprints, estimaciones, épicas y un backlog ordenado por prioridad. Cada uno pide una decisión antes de poder decir "estoy en esto". Un equipo que necesite eso no es el usuario.

Quedan fuera la analítica y los informes. No cambian qué se coge ahora. El éxito se ve si desaparece la ronda de estado, no en un reporte.

Quedan fuera los comentarios. La tarea no es una conversación. El caso es saber quién está en qué, no discutirla.

Queda fuera la descripción larga. El título basta para reconocer el trabajo. Un texto largo enfría el alta y no dice si alguien ya lo ha cogido.

Quedan fuera las subtareas. Partir el trabajo en piezas menores es la jerarquía de las épicas, y las épicas están fuera.

Quedan fuera los adjuntos. No cambian quién está en la tarea ni si está libre.

Quedan fuera las etiquetas. Clasificar de otra forma no hace falta para filtrar por estado ni para ver qué venció.

Queda fuera la prioridad. Ordenar por importancia es un backlog priorizado, y ese backlog está fuera.

Queda fuera más de un responsable. "Quién está en qué" es una persona. Dos responsables dejan otra vez la duda de si el trabajo ya está cogido.

Queda fuera configurar flujos, tipos de tarea o campos obligatorios distintos de los cuatro. Menos rollo que Jira es crear la tarea y cambiarle el estado en segundos, con los mismos estados para todos. Título, responsable, estado y fecha no son configuración: son la tarea.

Queda fuera recordar el vencimiento con un aviso. La fecha pasada se ve al abrir la lista. Un recordatorio es una notificación, y las notificaciones están fuera.

## Supuestos

Estos puntos no venían cerrados en la ficha. Quedan así para poder recortar:

- Cualquier cuenta del sistema comparte el mismo espacio. No hay invitación ni alta de equipo.
- Los estados son tres, fijos y no configurables: libre, en curso y hecha. "Libre" es lo que se puede coger. "En curso" es lo que alguien ya está tocando. "Hecha" sale del filtro de lo pendiente. Una fecha pasada no es un estado: es la fecha de vencimiento ya superada.
- "Sin refrescar" significa que la lista abierta muestra el estado actual cuando alguien lo cambia. No hay una segunda vista de actividad.

## Parte B

1. 7 propuestas, 7 dentro.
2. Excluidas:    
Quien entra ve y puede cambiar las mismas tareas que el resto, es ambigua y contradice el estado de las tareas.  
  
Desde la lista se cambia el estado y el responsable en dos clics, la tarea se toma por una persona no se define como se cambia el responsable y quien lapuede hacer.  
  
Sin tener que recargar ni preguntar a nadie, no se aclara como se actuliza el estado de las tareas.  

3. **Exclusión de la que menos seguro estás**:  
Desde la lista se cambia el estado y el responsable en dos clics: se debe aclarar cuando y quien puede cambiar de responsable.  
  






