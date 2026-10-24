# Alcance del MVP de FlowSync (IAZ)

> Punto de partida: «Quiero que FlowSync sea una herramienta para que los equipos remotos sepan en qué está trabajando cada uno sin tener que hacer reuniones de sincronización. Algo tipo tareas compartidas pero más en tiempo real y menos rollo que Jira.»

## 1. El terreno que ya existe

FlowSync hoy solo tiene **cuentas de usuario**: registro, inicio de sesión, cierre de sesión y una pantalla de perfil protegida. El modelo de datos se reduce a **usuarios** (nombre opcional, email, contraseña) y sus **tokens de acceso**. No existe nada de tareas, estados, equipos ni espacios, ni ningún mecanismo de actualización en vivo. Lo que definamos se apoya en esas cuentas (quien hace la tarea es un usuario registrado) y no vuelve a especificar el acceso.

## 2. El interrogatorio, con las respuestas ya decididas

Una sola ronda, cinco preguntas, sin bajar a datos ni endpoints. Las respuestas salen de la ficha de hechos del producto, pegada entera.

1. **¿Qué duele hoy, y a quién?** La ronda de "¿en qué estás?" de la daily y la pregunta constante por chat. Duele a los pares, no a un lead: a los dos que descubren tarde que iban a lo mismo (dos días perdidos tocando el mismo módulo) y al que interrumpe para preguntar.
2. **¿Para quién es exactamente?** Equipos remotos de 3 a 10 personas, roles planos, un único espacio compartido. Caso de estudio: 6 personas de producto SaaS en 3 husos horarios, con un gestor de tareas pesado y una daily de 15 minutos.
3. **¿Qué significa "tiempo real" y qué decisión cambia?** Ver los cambios de estado de las tareas sin refrescar ni preguntar. Es frescura de la tarea, no presencia de la persona. La señal es un resumen que espera, no un aviso que interrumpe. La decisión que cambia: no empezar algo que otro ya toca y elegir lo siguiente sabiendo qué está libre.
4. **¿De dónde sale el estado y por qué se mantendría al día?** Lo teclea quien hace la tarea, en dos clics sobre una lista ya abierta, sin campos obligatorios. Se sostiene porque esa lista es su propia cola de trabajo y le ahorra interrupciones. Si se queda vieja, el producto pierde el sentido: es el riesgo #1.
5. **¿Cómo sabremos que funciona?** A una semana de uso real, el equipo cancela la ronda de "¿en qué estás?" y nadie pide que vuelva. La daily no desaparece: los bloqueos siguen y este MVP no los resuelve.

**Supuestos declarados** (lo que la ficha no cubría y decidió el agente):

- Los estados son tres y fijos: *Pendiente*, *En curso*, *Hecha*. Sin flujo configurable.
- El responsable y la fecha de vencimiento son opcionales al crear; solo el título es obligatorio, para que crear siga costando segundos.
- Todo usuario registrado pertenece al único espacio compartido. Varios equipos, o gente en más de uno, queda fuera.
- "Sin refrescar" se cumple mientras la lista está abierta; al volver de una reunión basta con abrirla para ver el estado actual.

## 3. El alcance

**Problema.** En un equipo remoto pequeño nadie ve en qué está cada uno sin interrumpir a alguien. Se paga en media daily dedicada a "¿en qué estás?", en interrupciones por chat y en trabajo duplicado que se descubre tarde.

**Usuarios.** Los miembros de un equipo remoto de 3 a 10 personas, todos iguales: los mismos que hacen las tareas son los que consultan el estado. No hay manager ni reporte hacia arriba.

**Propuesta de valor.** Una lista de tareas compartida donde cambiar el estado cuesta dos clics, los cambios de los demás aparecen solos y, al volver, un resumen enseña qué se ha movido sin tener que preguntar ni releerlo todo. Quien la actualiza cobra en el momento, porque es su cola de trabajo y deja de recibir preguntas; quien la mira sabe qué está libre sin preguntar.

**Alcance** (una vertical fina, de punta a punta):

1. Una lista única de tareas, compartida por todo el espacio.
2. Crear una tarea en segundos: título, y opcionalmente responsable y fecha de vencimiento.
3. Cambiar el estado de una tarea en dos clics desde la propia lista.
4. Asignar o reasignar el responsable, incluido "me la quedo yo".
5. Ver de un vistazo qué tareas se han pasado de su fecha.
6. Filtrar la lista por estado, para centrarse en lo pendiente.
7. Ver los cambios de los demás sin refrescar mientras la lista está abierta.
8. Un resumen de "qué se ha movido desde tu última visita": al llegar por la mañana o volver de una reunión, ver de un golpe qué tareas han cambiado de estado o de responsable, sin recorrer la lista entera.

**NO-alcance** (cada exclusión, con la hipótesis que no ayuda a validar):

- **Editar el título y borrar tareas.** No validan ninguna hipótesis: una tarea mal titulada o abandonada se cierra pasándola a *Hecha*. Si el uso real demuestra que la lista se ensucia, entra.
- **Filtro "mis tareas" y otros filtros u orden.** La hipótesis es ver el estado del equipo, no la cola individual; el filtro por estado basta para centrarse en lo pendiente.
- **Notificaciones push, emails y recordatorios de vencimiento.** Contradicen "resumen que espera, no aviso que interrumpe"; validarían si la gente responde a avisos, no si mira la lista.
- **Integración con Slack.** Es convivir con otra herramienta; la hipótesis es que FlowSync sustituye el canal de "¿en qué estás?", no que lo alimenta.
- **Presencia: quién está conectado, indicadores de actividad.** El estado es de la tarea, no de la persona. Es vigilancia y se rechaza a propósito.
- **Derivar el estado de Git, PRs, CI o calendario.** La hipótesis es que teclear el estado cuesta tan poco que se hace; derivarlo esquiva justo eso, y es otro producto con OAuth de terceros.
- **Importar o sincronizar con otro gestor de tareas.** Convivir exige doble actualización, que es como muere la categoría; FlowSync crea las tareas.
- **Varios equipos o espacios, gente en más de uno.** Con un espacio único ya se valida si el equipo deja de preguntar; lo demás es escalar algo no validado.
- **Roles y permisos.** Roles planos por diseño; la jerarquía no ayuda a validar nada entre pares.
- **Comentarios en tareas.** Abren una conversación, y la conversación ya tiene su sitio; no ayudan a saber quién está en qué.
- **Bloqueos y dependencias entre tareas.** La parte de bloqueos de la daily sigue existiendo y este MVP no la resuelve: es otra hipótesis.
- **Sprints, estimaciones, épicas, backlog priorizado, informes y analítica.** Es el "rollo de Jira" del que se huye; un equipo que lo necesite no es nuestro usuario.
- **Campos personalizados, etiquetas, subtareas y adjuntos.** Cada campo más sube el coste de actualizar, que es el riesgo #1.

## Las tres líneas

1. **Los dos números.** La IA propuso 10 cosas dentro del alcance; tras el recorte quedan 8.
2. **Tres cosas que dejé fuera, y por qué.**
   - *Editar y borrar tareas*: no valida ninguna hipótesis del producto; pasar a *Hecha* cubre el caso mientras no se demuestre que la lista se ensucia.
   - *Filtro "mis tareas"*: la hipótesis es ver el estado del equipo sin preguntar, no gestionar la cola individual.
   - *Notificaciones push*: validarían si la gente reacciona a un aviso, y la hipótesis es la contraria: que un resumen que espera basta para no tener que preguntar.
3. **La exclusión de la que menos seguro estoy.** Editar y borrar tareas. Se contradicen lo barato (cerrar pasando a *Hecha*) y el riesgo #1: si la lista se llena de tareas mal tituladas o muertas, deja de ser fiable y el resumen enseña ruido. Entraría si en la primera semana aparecen tareas duplicadas o abandonadas que nadie puede quitar.

**Decisión que cambié tras la primera propuesta.** La IA dejaba fuera el resumen de "qué se ha movido" por no validar el riesgo #1. Lo metí: si el producto se centra en rapidez, al volver de una reunión el resumen responde "¿qué ha cambiado?" en un vistazo, y la ficha pide justo esa forma de señal ("resumen que espera"). El filtro por estado se queda porque lo fija la ficha de hechos.

**Incoherencia que señaló la IA.** La ficha define "tiempo real" como ver cambios sin refrescar, pero el caso de uso es "llego por la mañana o vuelvo de una reunión". En ese momento cualquier carga de la página ya muestra el estado actual, y ahora además el resumen cubre ese momento: la actualización en vivo (punto 7) solo aporta si la lista se queda abierta durante el día. Se mantiene porque la ficha dice que la lista es la cola de trabajo y está "ya abierta", pero es la pieza más cara y la que menos se apoya en el episodio concreto.
