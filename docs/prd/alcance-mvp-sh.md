# Alcance del MVP de FlowSync

Punto de partida: «Quiero que FlowSync sea una herramienta para que los equipos remotos sepan en qué está trabajando cada uno sin tener que hacer reuniones de sincronización. Algo tipo tareas compartidas pero más en tiempo real y menos rollo que Jira.»

---

## 1. El terreno que ya existe

FlowSync hoy es solo el esqueleto de cuentas: registro con email y contraseña, inicio y cierre de sesión con token, y una pantalla de perfil con nombre, iniciales, email y fecha de alta. No existe nada del dominio de producto: ni tareas, ni estados, ni responsables, ni fechas, ni espacio compartido. La única entidad de negocio es el usuario; el resto es soporte técnico de la sesión. Todos los usuarios ven y hacen lo mismo: no hay roles, equipos ni permisos. El frontend tiene tres pantallas (login, registro y perfil) y cualquier otra ruta lleva al perfil. Nada de esto se vuelve a especificar aquí: se reutiliza tal cual.

---

## 2. El interrogatorio

Una sola ronda. Las respuestas salen de la ficha de hechos del producto; lo que la ficha no cubre va como supuesto.

**¿Qué duele hoy y qué desaparece si esto funciona?** La ronda de "¿en qué estás?" de la daily y la misma pregunta constante por chat. Episodio real: dos personas tocaron el mismo módulo la misma semana sin saberlo, dos días perdidos. Desaparece solo esa ronda, que se come la mitad de los 15 minutos. La parte de bloqueos de la daily sigue y este MVP no la resuelve.

**¿Quién cobra el valor y cómo es el equipo?** Los pares, no un lead. Sin reporte hacia arriba. Equipos remotos de 3 a 10 personas, roles planos, un único espacio compartido sin entidad "equipo". Caso de estudio: 6 personas de producto SaaS en 3 husos horarios.

**¿Qué significa "tiempo real" y qué decisión cambia?** Ver los cambios de estado de las tareas sin refrescar ni preguntar. No es chat, ni videollamada, ni edición simultánea. Es frescura de la tarea, no presencia de la persona. La señal es un resumen que espera, no un aviso que interrumpe. La decisión que cambia: no empezar algo que otro ya toca, y elegir lo siguiente sabiendo qué está libre.

**¿De dónde sale el estado y por qué lo mantendría nadie al día?** Lo teclea quien hace la tarea, en dos clics sobre una lista ya abierta, sin campos obligatorios. Se sostiene porque esa lista es su propia cola de trabajo. Derivarlo de Git, CI o calendario queda fuera. Si la información se queda vieja el producto pierde el sentido: es el riesgo número uno a validar.

**¿Sustituye al gestor de tareas, qué lleva una tarea y qué dice que funcionó?** Sustituye, no convive. Una tarea lleva título, responsable, estado y fecha de vencimiento. La lista se consume filtrando por estado. Sin sprints, estimaciones, épicas, backlog ni informes. Éxito: a la semana de uso real el equipo cancela la ronda de "¿en qué estás?" y nadie pide que vuelva.

**Supuestos declarados (la ficha no los cubre):**

- Los estados son un conjunto fijo y mínimo, sin configuración por equipo: pendiente, en curso, hecha.
- El responsable es un único usuario registrado, y puede quedar vacío porque no hay campos obligatorios.
- "Ver qué se ha movido" se resuelve con la propia lista actualizada, no con un historial.
- Quien se registra ya está dentro del único espacio compartido: no hay invitaciones.
- Una tarea vencida solo se destaca visualmente; no dispara ningún recordatorio ni acción.

---

## 3. El alcance en cinco bloques

### Problema

Un equipo remoto pequeño no sabe en qué está cada uno sin interrumpir a alguien. Hoy lo resuelve con una ronda de "¿en qué estás?" en la daily y con preguntas por chat, y aun así se solapa: dos personas pueden empezar lo mismo sin saberlo. El coste es tiempo de reunión que no aporta y trabajo duplicado que se descubre tarde.

### Usuarios

Los miembros de un equipo remoto de 3 a 10 personas, como pares. Todos tienen el mismo rol: crean, cambian y miran lo mismo. No hay un manager que consuma informes ni un lead que reparta trabajo. El primer caso de estudio es un equipo de 6 personas de producto SaaS en 3 husos horarios, que hoy usa un gestor pesado y una daily de 15 minutos por videollamada.

### Propuesta de valor

Una única lista compartida de tareas donde cambiar el estado cuesta dos clics y donde cualquiera ve, sin preguntar ni refrescar, quién está en qué y qué está libre. Se sostiene porque esa lista es la cola de trabajo de quien la actualiza: la mira para decidir qué coge, y a cambio deja de recibir interrupciones. Sustituye al gestor de tareas en vez de convivir con él.

**Hipótesis que el MVP tiene que validar**

- H1: un equipo mantiene fresco el estado de sus tareas si actualizar cuesta dos clics y la lista es su propia cola de trabajo.
- H2: ver ese estado de un vistazo basta para cancelar la ronda de "¿en qué estás?" de la daily.

Todo lo que entra sirve a H1 o a H2. Todo lo que no sirve a ninguna de las dos, queda fuera.

### Alcance

Una vertical fina de punta a punta: crear, actualizar y mirar. Siete capacidades, de las nueve que propuso la IA; las dos recortadas están en la Parte B.

1. **Entrar con la cuenta que ya existe.** Registro y login actuales, sin cambios. Quien entra ya está en el único espacio compartido.
2. **Crear una tarea solo con el título.** Un campo, enter, y aparece en la lista. Nada más es obligatorio.
3. **Cambiar el estado desde la lista en un clic.** Tres estados fijos: pendiente, en curso, hecha. Sin pantalla de detalle para hacerlo.
4. **Asignar o cambiar el responsable** eligiendo a una persona del equipo, o dejar la tarea sin nadie para que se vea que está libre.
5. **Poner una fecha de vencimiento opcional**, y que lo vencido se distinga a simple vista en la lista.
6. **Una sola lista compartida, filtrable por estado**, con el filtro de "pendiente y en curso" como vista por defecto para centrarse en lo que está vivo.
7. **La lista se actualiza sola** cuando otra persona cambia algo, sin recargar la página.

### NO-alcance

Cada exclusión lleva al lado la hipótesis que no ayuda a validar. Lo que ya decidió el producto va primero.

**Decidido por el producto**

- **Notificaciones push, email o avisos.** La señal es un resumen que espera, no un aviso que interrumpe. Un aviso valida que la gente responde a interrupciones, que es justo lo que queremos quitar. No sirve a H1 ni a H2.
- **Integración con Slack.** Convertiría la lista en otra fuente de ruido en el chat que ya duele. No valida nada que la lista no valide sola.
- **Roles y permisos.** Roles planos por decisión. Un permiso solo aporta cuando alguien puede hacer algo que otro no, y en el MVP nadie puede.
- **Analítica e informes.** No hay nadie arriba que los lea. Un informe valida que un manager quiere visibilidad, y ese no es el usuario.
- **Comentarios en tareas.** Convierten la tarea en un hilo de conversación, que es chat. El estado se teclea, no se discute. No ayuda a H1 y compite con H2 al meter texto que leer.

**Recortado por el alcance**

- **Entidad equipo, varios espacios o invitaciones.** Un único espacio compartido. Un segundo espacio valida que FlowSync escala a varios equipos, no que un equipo lo mantiene vivo. Se anota como supuesto.
- **Presencia o "quién está conectado".** El estado es de la tarea, no de la persona. Es vigilancia y se rechaza a propósito. Validaría que la gente tolera ser observada, no que mantiene las tareas frescas.
- **Historial de cambios o auditoría.** Para saber quién está en qué basta el estado actual. Un historial valida que alguien quiere revisar el pasado, y nadie lo pidió.
- **Estados configurables o flujos personalizados.** Configurar es exactamente el "rollo de Jira". Tres estados fijos bastan para distinguir libre, ocupado y terminado. Configurar no mejora H1: la empeora.
- **Estado "bloqueada".** La parte de bloqueos de la daily sigue existiendo por decisión del producto, y este MVP no la resuelve. Meter un estado para ello promete algo que el alcance no cumple.
- **Descripción larga, adjuntos, etiquetas, prioridad.** Cada campo opcional es un sitio donde pensar antes de escribir. H1 depende de que no haya nada que pensar. Título, responsable, estado y fecha, y nada más.
- **Sprints, estimaciones, épicas, backlog priorizado.** Renuncia explícita. Un equipo que los necesite no es el usuario. Validarían una hipótesis de planificación que el producto no tiene.
- **Subtareas y dependencias.** Introducen jerarquía y, con ella, pantallas de detalle. Una lista plana es lo que se mira de un vistazo. No sirven a H2.
- **Derivar el estado de Git, CI o calendario.** Es otro producto, con OAuth de terceros. Además invalida H1 directamente: la hipótesis es que la persona lo teclea.
- **Importar tareas de otro gestor.** FlowSync sustituye, no convive. Importar valida que la gente quiere migrar, no que quiere mantener. El caso de estudio empieza con la lista vacía.
- **Borrar tareas.** "Hecha" ya saca la tarea de lo pendiente. Borrar añade confirmaciones y la posibilidad de perder trabajo de otro, y no acerca a ninguna hipótesis.
- **Varios responsables por tarea.** Dos nombres en una tarea no dicen quién está en qué. Reproduce la ambigüedad que motiva el producto.
- **Búsqueda de texto y ordenación avanzada.** Con 3 a 10 personas y un filtro por estado, la lista cabe en una pantalla. Buscar valida que la lista es larga, y si es larga H2 ya falló.
- **Editar perfil, avatar, recuperar contraseña.** La cuenta ya funciona para entrar. Nada de esto toca la frescura del estado.
- **App móvil o modo offline.** El caso de uso es "abro la lista al volver". Un navegador en el portátil lo cubre. Validarían alcance de plataforma, no las hipótesis.

**Supuestos abiertos:** varios equipos o personas en más de un equipo; estados fijos; una sola persona responsable; lo vencido solo se destaca.

---

## Parte B:

**1. Los dos números.** La IA propuso meter dentro del alcance: 9. Quedaron dentro después del recorte: 7.

**2. Tres cosas que dejé fuera, y qué hipótesis del producto no ayuda a validar cada una.**

- **Lo que ha cambiado desde tu última visita queda marcado** en la propia lista, para el caso de "llego por la mañana y veo qué se ha movido".  No ayuda a validar H1, porque la frescura la mide el estado que se teclea, no el aviso. Lo que podría tocar es H2 en el caso asíncrono, y por eso es la que va en la línea 3.
- **Editar el título** de una tarea ya creada. Sirve por comodidad, pero ayuda a validar a ninguna de las hipótesis.
- **Entidad equipo, varios espacios o invitaciones.** Un único espacio compartido. No ayuda a validar ni H1 ni H2. H1 pregunta si un equipo mantiene fresco el estado; H2, si verlo de un vistazo basta para cancelar la ronda. Las dos se responden con un solo equipo usando una sola lista, y el caso de estudio es exactamente eso: 6 personas.

**3. La exclusión de la que menos seguro estoy, qué dos cosas se contradecían, y qué tendría que pasar para que entrara.**

La exclusión de la que menos segura estoy es **Lo que ha cambiado desde tu última visita queda marcado**. Chocaban dos cosas: la ficha pide una señal que es “un resumen que espera” para el caso de “llego por la mañana y veo qué se ha movido”, y lo que yo veía es que una lista siempre actualizada ya cubre “quién está en qué” sin guardar nada más. Lo barato gana en el MVP, pero puede que no valide H2 en el caso asíncrono: con 3 husos horarios, los cambios de la noche solo se ven si se recuerda la lista de ayer. Tendría que entrar si, en la primera semana del caso de estudio, el equipo mantiene las tareas frescas (H1 se cumple) pero por la mañana se seguiría preguntando en el chat qué cambió, o repasa la lista entera para enterarse. Si pasa eso, la causa no es el estado, es la ausencia de resumen, y entraría en su forma mínima: marcar las tareas que cambiaron desde que esa persona vio la lista por última vez, sin historial.

