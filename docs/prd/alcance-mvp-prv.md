# Alcance del MVP de FlowSync

> Punto de partida: «Quiero que FlowSync sea una herramienta para que los equipos remotos sepan en qué está trabajando cada uno sin tener que hacer reuniones de sincronización. Algo tipo tareas compartidas pero más en tiempo real y menos rollo que Jira.»

## 1. Lo que ya existe

Hoy FlowSync solo resuelve la identidad: una persona puede registrarse (nombre, email, contraseña), iniciar sesión, ver su perfil y cerrar sesión. El modelo de datos tiene únicamente usuarios y sus tokens de acceso: no existen tareas, ni equipos o espacios, ni estados, ni ningún concepto compartido entre personas. El frontend tiene tres pantallas (registro, login y perfil) con rutas protegidas. El MVP parte, por tanto, de usuarios autenticados y de nada más: todo lo colaborativo está por construir.

## 2. Las preguntas, con las respuestas ya decididas

1. **¿Qué duele hoy y a quién?**
   Duelen la ronda de «¿en qué estás?» de la daily y la misma pregunta repetida por chat: nadie ve el estado del equipo sin interrumpir a alguien. El valor lo ganan los compañeros entre sí, no un lead: no hay reporte hacia arriba. Episodio de referencia: dos personas tocaron el mismo módulo la misma semana sin saberlo y se perdieron dos días. Respuesta honesta sobre la reunión: la daily no desaparece. Desaparece la ronda de estado, que hoy ocupa la mitad de sus 15 minutos. La parte de bloqueos sigue y este MVP no la resuelve.

2. **¿Qué significa «tiempo real»?**
   Significa ver los cambios de estado de las tareas sin refrescar ni preguntar. No es chat, ni videollamada, ni edición simultánea. Es frescura, no presencia: el estado pertenece a la tarea, no a la persona, y se rechaza a propósito saber quién está conectado o mostrar indicadores de actividad. La señal es un resumen que espera, no un aviso que interrumpe: «llego por la mañana y veo qué se ha movido». No hay notificaciones push. La decisión que cambia es concreta: no empezar algo que otra persona ya está tocando, y elegir lo siguiente sabiendo qué está libre.

3. **¿Para qué equipo y con qué límites?**
   Equipos remotos pequeños, de 3 a 10 personas, con roles planos: todos ven y editan lo mismo. El caso de estudio (no es un cliente real) es un equipo de producto SaaS de 6 personas repartidas en 3 husos horarios, con un gestor de tareas pesado y una daily de 15 minutos por videollamada. Hay un único espacio compartido y no existe la entidad «equipo». Varios equipos separados, o una persona en más de uno, se quedan fuera y se anotan como supuesto.

4. **¿Sustituye al gestor de tareas actual o convive con él?**
   Lo sustituye. FlowSync es donde se hace el trabajo, no donde se cuenta: crea sus propias tareas y no lee las de otra herramienta, porque convivir obligaría a actualizar dos sitios. El estado lo escribe a mano, en segundos, quien hace la tarea. Derivarlo de Git, CI o el calendario queda fuera. Una tarea lleva título, responsable, estado y fecha de vencimiento, sin flujos de configuración ni campos obligatorios de más. La lista se consume filtrando por estado. Se descartan a propósito sprints, estimaciones, épicas, backlog priorizado e informes: un equipo que los necesite no es nuestro usuario.

5. **¿Cómo sabremos que ha funcionado?**
   Tras una semana de uso real, el equipo cancela la ronda de «¿en qué estás?» y nadie pide que vuelva. Si la siguen haciendo igual, no ha funcionado. El riesgo número 1 es que la información se quede vieja, y si pasa el producto pierde el sentido. La mitigación es que actualizar cueste dos clics sobre una lista que la persona ya tiene abierta porque es su propia cola de trabajo, no obligar a nadie. Se construye una vertical fina y usable de punta a punta: mejor una capacidad terminada que tres a medias.

**Ya decidido fuera del MVP:** notificaciones push, integración con Slack, roles y permisos avanzados, analítica e informes, y comentarios en tareas. Cada una se justificará en el bloque de NO-alcance.

### Supuestos (lo que la ficha no cubre, decidido aquí)

- **S1. Estados fijos y pocos:** *pendiente*, *en curso* y *hecha*, sin configurar. Configurarlos sería justo el «rollo de Jira».
- **S2. Un único responsable por tarea, opcional.** Una tarea sin responsable es una tarea «libre», que es lo que hace falta ver para elegir lo siguiente. La ficha pide «responsable» pero no dice si es obligatorio. Hacerlo opcional choca con «saber quién está en qué», pero sin ello no hay forma de señalar lo que está libre.
- **S3. «Ver qué se ha movido» se resuelve con el estado actual de la lista** al abrirla: quién está en qué y qué está libre. No se marcan los cambios desde la última visita, ni hay historial o registro de actividad aparte.
- **S4. Un solo espacio** al que pertenecen todos los usuarios registrados. No hay invitaciones ni miembros (ver pregunta 3).
- **S5. Las tareas no se borran en el MVP**, solo se marcan como *hechas*. Pendiente de confirmar en el recorte.

## 3. El alcance

### Problema

En un equipo remoto pequeño nadie ve en qué está cada uno sin interrumpir a alguien. El coste es doble. Por un lado, la ronda de «¿en qué estás?» se come la mitad de la daily y se repite a lo largo del día por chat. Por otro, se descubre tarde que dos personas iban a lo mismo: en el caso de estudio fueron dos días perdidos en el mismo módulo.

### Usuarios

Los miembros de un equipo remoto de 3 a 10 personas, todos con el mismo papel: ven y editan lo mismo. Ganan valor entre ellos, no hacia un lead. Caso de estudio: un equipo de producto SaaS de 6 personas en 3 husos horarios, hoy con un gestor de tareas pesado y una daily de 15 minutos por videollamada. Un equipo que necesite sprints, estimaciones o informes no es nuestro usuario.

### Propuesta de valor

Una única lista de tareas compartida que es a la vez la cola de trabajo de cada persona y el estado del equipo. Cambiar el estado de una tarea cuesta dos clics, y el resto lo ve sin refrescar y sin preguntar. Quien la actualiza gana en el momento, porque es la lista que mira para decidir qué coge y porque deja de recibir interrupciones. Quien la consulta sabe qué está cogido y qué está libre antes de empezar.

**Hipótesis que el MVP tiene que validar:**

- **H1.** Si el estado del equipo se ve de un vistazo, el equipo cancela la ronda de «¿en qué estás?» y nadie pide que vuelva.
- **H2.** Si actualizar cuesta dos clics sobre la propia cola de trabajo, la información no se queda vieja (riesgo número 1).
- **H3.** Si se ve qué está cogido y qué está libre, nadie empieza algo que ya está tocando otra persona.

### Alcance

1. **Una lista compartida de tareas** en un único espacio al que pertenecen todos los usuarios registrados (S4). *Valida H1.*
2. **Crear una tarea en segundos.** Solo el título es obligatorio; responsable y fecha de vencimiento son opcionales. Se pueden editar después. Responsable y fecha se ven en cada fila de la lista. *Valida H2.*
3. **Cambiar el estado en dos clics desde la propia lista**, sin abrir la tarea. Hay tres estados fijos: pendiente, en curso y hecha (S1). *Valida H2.*
4. **Asignar o cambiar el responsable, incluido «me la quedo yo».** Una tarea sin responsable se ve como libre (S2). *Valida H3.*
5. **Ver los cambios de los demás sin refrescar** mientras la lista está abierta. *Valida H1 y H3.*
6. **Filtrar por estado** para centrarse en lo pendiente. *Valida H2, porque es lo que hace que la lista sirva como cola de trabajo.*

> Decisión: el resumen de lo ocurrido desde la última visita queda fuera (ver NO-alcance). El caso «llego por la mañana» se cubre abriendo la lista, que ya muestra el estado actual.

### NO-alcance

**Ya decidido:**

- **Notificaciones push.** La señal es un resumen que espera, no un aviso que interrumpe. Un push reproduce justo la interrupción que se quiere eliminar.
- **Integración con Slack.** Se quiere sacar el estado del chat, no meterlo dentro. Además, abre el mismo frente de integraciones y OAuth que se rechaza para Git y CI.
- **Roles y permisos avanzados.** Los roles son planos por decisión de producto. No ayuda a validar ninguna hipótesis y añade justo la configuración que es el «rollo de Jira».
- **Analítica e informes.** Nadie cobra ese valor: no hay reporte hacia arriba y al manager le da igual. Medir a las personas, además, roza la vigilancia que se rechaza.
- **Comentarios en tareas.** Convierten la lista en conversación y la acercan al chat. El estado se comunica cambiándolo, no explicándolo, y los bloqueos que se discutirían ahí siguen en la daily.

**Propuesto en este recorte:**

- **Presencia, «quién está conectado» e indicadores de actividad.** El estado es de la tarea, no de la persona. Es vigilancia, rechazada a propósito.
- **Estado derivado de Git, PRs, CI o el calendario.** Es otro producto, con integraciones de terceros. H2 se valida precisamente con el estado escrito a mano.
- **Importar tareas del gestor actual o sincronizarse con él.** FlowSync sustituye, no convive. Sincronizar significaría actualizar dos sitios, que es como muere esta categoría. Importar facilita el arranque, pero no valida ninguna hipótesis: el equipo puede empezar con lo que tiene en curso esta semana.
- **Varios espacios, equipos, invitaciones o personas en más de un equipo.** Hay un único espacio por decisión de producto. El caso de estudio es un solo equipo, así que no hace falta para validar nada.
- **Estados configurables o un estado «bloqueada».** Configurar estados es el «rollo de Jira». Un estado de bloqueo promete resolver los bloqueos, y la ficha dice expresamente que este MVP no los resuelve.
- **Sprints, estimaciones, épicas, backlog priorizado, prioridades y etiquetas.** Hay renuncia explícita. Cada campo de más encarece la actualización y pone en peligro H2.
- **Descripción larga, subtareas, dependencias y adjuntos.** La tarea es lo mínimo para saber quién está en qué. El detalle vive donde se hace el trabajo (el código, el documento) y aquí envejecería.
- **Borrar tareas (S5).** Con marcar como *hecha* basta para que la lista refleje la realidad. Borrar abre la puerta a deshacer, papelera y confirmaciones, sin validar nada.
- **Resumen de lo ocurrido desde mi última visita.** Las decisiones que cambian (no empezar lo que ya está cogido y elegir lo que está libre) dependen del estado actual, no de cómo se llegó a él. Ese estado se ve al abrir la lista y se mantiene al día sin refrescar. Saber qué ha cambiado sirve sobre todo para «sentirse informado», que según la ficha no vale lo que cuesta. Entraría si, con el uso, alguien sigue preguntando «¿qué ha pasado mientras no estaba?».
- **Historial de cambios o registro de actividad por tarea.** Se acerca a la auditoría y no cambia ninguna decisión: lo que importa es quién está en qué ahora.
- **Destacar o aislar las tareas vencidas.** No es redundante con el filtro por estado, porque «vencida» no es un estado: una tarea pendiente o en curso puede estarlo. Sale porque no valida ninguna hipótesis: el plazo no ayuda a ver quién está en qué ni a evitar el trabajo duplicado. La fecha sigue en cada fila, así que quien la necesite la lee. Entraría si el equipo usa la fecha y se le pasan plazos que no ve leyendo la lista.
- **Filtros por responsable o fecha, búsqueda, agrupar por persona y ordenación configurable.** La ficha pide solo filtrar por estado. Con 3 a 10 personas, la lista cabe en una pantalla y el responsable ya se ve en cada fila.
- **Recordatorios de vencimiento y resumen diario por email.** Vuelven a ser un aviso que interrumpe y sale del producto. Si la gente no abre la lista, H2 ya ha fallado, y un email no lo arregla, lo esconde.
- **Edición simultánea, chat y videollamada.** «Tiempo real» se ha definido como frescura del estado, nada de esto.
- **App móvil y modo sin conexión.** El caso es «llego por la mañana o vuelvo de una reunión», delante del ordenador. Ninguna hipótesis depende del móvil.

## 4. Las tres líneas

1. **Los dos números:** la IA propuso 8 dentro del alcance; tras mi recorte quedan 6.

2. **Lo que dejé fuera y por qué:**
   - **Resumen de lo ocurrido desde mi última visita.** No ayuda a validar H3 ni H1. La decisión que cambia, no empezar lo que ya está cogido y elegir lo libre, depende del estado actual, que ya se ve al abrir la lista y se mantiene sin refrescar. Saber qué ha cambiado solo sirve para «sentirse informado».
   - **Destacar las tareas vencidas.** No ayuda a validar ninguna de las tres hipótesis. El plazo no dice quién está en qué, no evita el trabajo duplicado y no abarata mantener la lista al día.

3. **La exclusión de la que menos seguro estoy: destacar las tareas vencidas.** Se contradicen dos cosas:
   - **Mi argumento contra la realidad.** La recorté por redundante con el filtro por estado, y no lo es: «vencida» no es un estado, así que una tarea pendiente o en curso puede estar vencida y el filtro no la muestra. El recorte se sostiene por otro motivo (no valida ninguna hipótesis), no por el que yo di.
   - **El recorte contra la ficha.** La ficha incluye la fecha de vencimiento precisamente «para ver de un vistazo qué se ha pasado de plazo». Si dejo la fecha pero quito esa vista, la fecha se queda en el MVP sin cumplir su razón de ser. Lo coherente sería quitar ambas o mantener ambas.
   - **Qué tendría que pasar para que entrara:** que el equipo use la fecha y se le pasen plazos que no ve leyendo la lista, o que se confirme que la fecha es imprescindible en la tarea. En ese caso, su vista va con ella.
