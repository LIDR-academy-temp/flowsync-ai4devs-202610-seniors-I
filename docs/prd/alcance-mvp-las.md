## FlowSync - Alcance MVP

## 1. El terreno que ya existe

- Capabilities: Cuentas de usuario (registro, inicio de sesión, cerrar sesión, ver tu perfil, login por token)
- Modelo de datos: Usuario (nombre, email, contraseña, tokens de sesión)

El desarrollo del CORE del producto de FlowSync está todo por hacer. La puerta de entrada, que es la gestión de usuarios y de sus sesiones, está desarrollada e implementada, pero no existe ninguna capacidad relacionada con tareas (creación, gestión...).


## 2. El interrogatorio

Una sola ronda, cinco preguntas. Las respuestas son la ficha de hechos del producto, pegada entera.

1. **Qué duele y con qué episodio.** La ronda de "¿en qué estás?" de la daily (la mitad de sus 15 minutos) y las interrupciones por chat. Episodio: dos personas tocaron el mismo módulo la misma semana sin saberlo y perdieron dos días. La parte de bloqueos de la daily sigue y este MVP no la resuelve.

2. **Para quién.** Para los compañeros, no para un lead: no hay reporte hacia arriba. Equipos remotos de 3 a 10 personas con roles planos. Caso de estudio: 6 personas de un producto SaaS, en 3 usos horarios.

3. **Qué es "tiempo real".** Ver los cambios de estado de las tareas sin refrescar. No es chat, ni presencia, ni coedición. Es un resumen que espera, no un aviso que interrumpe. La decisión que cambia es no empezar lo que otro ya toca y elegir lo siguiente sabiendo qué está libre.

4. **De dónde sale el estado y por qué se mantiene.** Lo escribe a mano quien hace la tarea, con dos clics. Se mantiene porque la lista es también su propia cola de trabajo. FlowSync sustituye al gestor de tareas, no convive con él. Si el estado se queda viejo, el producto pierde el sentido: es el riesgo #1.

5. **Qué es "menos rollo" y cómo sabemos que funcionó.** Una tarea lleva título, responsable, estado y vencimiento, y la lista se filtra por estado. Renunciamos a sprints, estimaciones, épicas, backlog priorizado e informes. Éxito a una semana: el equipo cancela la ronda de "¿en qué estás?" y nadie pide que vuelva.


## 3. El alcance

### Problema

En un equipo remoto, saber en qué está cada uno exige preguntar, ya sea en la daily o con un mensaje que interrumpe. Cuando nadie pregunta, dos personas acaban haciendo lo mismo.

### Usuarios

Compañeros de un equipo remoto de 3 a 10 personas, todos con los mismos permisos. Cada uno escribe el estado de lo suyo y lee el de los demás. No hay lead.

### Propuesta de valor

Una lista compartida que es a la vez tu cola de trabajo y el estado del equipo. Actualizarla cuesta dos clics, y quien la mira sabe qué está libre sin preguntar.

### Alcance

1. Crear una tarea escribiendo solo el título. Nace en Por hacer y sin responsable, aunque se puede asignar al crearla.
2. Asignar la tarea a mano: ponerse como responsable o poner a otra persona del espacio, con un clic. La asignación nunca es automática.
3. Cambiar el estado en dos clics entre tres estados fijos:
    - Por hacer: nadie la ha empezado.
    - En curso: alguien la está haciendo.
    - Hecha: terminada.
4. Tablero único del espacio, agrupado por estado en tres columnas o bloques. Cada tarea muestra título, responsable y última modificación en relativo ("hace 2 h").

Se apoya en el registro y el login que ya existen; no se vuelven a especificar.

### No-Alcance

Las exclusiones se justifican contra las tres hipótesis que valida el MVP:

- H1. Si el estado del equipo se ve de un vistazo, la ronda de "¿en qué estás?" sobra.
- H2. La gente mantiene el estado al día porque cuesta dos clics y le sirve a ella misma.
- H3. Ver quién está en qué evita el trabajo duplicado.

Recortado de la primera propuesta:

- Fecha de vencimiento y tareas vencidas marcadas. Responden a "¿llegamos a tiempo?", que es control de plazos, no coordinación entre pares, y no ayudan a validar H1, H2 ni H3. Además, competirían con la última modificación, que es la señal del riesgo #1. Entraría si un equipo real dice que sin fechas no puede dejar su gestor actual, porque sin esa sustitución no hay producto.
- Ver cambios sin refrescar. H1 se valida con el estado visible al abrir el tablero; lo que se mueve mientras miras no cambia la decisión de qué coger. Antes de pagar tiempo real hay que comprobar que el equipo usa el producto. La promesa del MVP es frescura visible al abrir, no tiempo real.
- "Qué se ha movido desde tu última visita". La última modificación en relativo ya da la frescura que necesita H1. Marcar los cambios para cada persona solo vale la pena si el uso real muestra que mirar los tiempos no basta.
- Editar el título y borrar tareas. No validan ninguna hipótesis por sí mismos: lo que hay que aprender es si el tablero se mantiene vivo solo con crear, asignar y mover. Si los errores y la columna Hecha creciendo lo ensucian hasta que el equipo deja de fiarse, eso es una señal contra H2 y entra.
- Filtrar por estado. La agrupación por estado ya deja ver lo pendiente de un vistazo.
- Asignación automática al pasar a En curso. Mover una tarea no implica hacerla: dos personas pueden estar repartiéndose las siguientes y una mover la de la otra. Asignar en automático daría lecturas falsas de quién está en qué, que es justo lo que H3 necesita que sea fiable.
- Arrastrar y soltar entre columnas. El gesto que se valida es cambiar el estado en dos clics; arrastrar es pulido que no cambia ninguna hipótesis.

Fuera por decisión de producto:

- Notificaciones push o por email, recordatorios a quien tiene tareas viejas. Interrumpen, que es lo que el producto quiere eliminar. Además, maquillarían H2: si el estado se mantiene porque lo pide un aviso, no sabemos si se sostiene solo.
- Integración con Slack. Vuelve a abrir el canal de interrupciones y no valida nada nuevo.
- Presencia, "quién está conectado" e indicadores de actividad. Es vigilancia y se rechaza a propósito: el estado es de la tarea, no de la persona.
- Derivar el estado de Git, PRs, CI o calendario. Es otro producto, con integraciones y OAuth de terceros. Además, esquivaría H2 en vez de validarla.
- Comentarios, chat, coedición, videollamada. Convierten la lista en una conversación; "tiempo real" excluye expresamente todo esto.
- Sprints, estimaciones, épicas, backlog priorizado, prioridades, etiquetas. Son el "rollo de Jira": campos que hay que decidir al crear la tarea, contra los dos clics de H2. Un equipo que los necesite no es nuestro usuario.
- Estados configurables y flujos. Configurar es el rollo que el producto quiere quitar; tres estados fijos bastan para saber quién está en qué.
- Marcar una tarea como bloqueada. La parte de bloqueos de la daily sigue y el MVP no la resuelve; meterla validaría otra promesa.
- Descripción larga, adjuntos, subtareas, dependencias. Engordan cada tarea y alejan el gesto de dos clics; ninguna ayuda a validar H3.
- Analítica, informes, dashboards. No hay quien los lea: el valor es de los pares.
- Roles y permisos. Los roles son planos por decisión: con 3 a 10 pares que se conocen, los permisos no cambian ninguna hipótesis.
- Varios equipos o gente en más de uno. El caso de estudio es un solo equipo. Supuesto: una instalación por equipo, y todo el que se registra entra en el espacio.
- Invitaciones por email y onboarding de equipo. Con la URL compartida y el registro que ya existe basta para el caso de estudio.
- Importar tareas de otro gestor. FlowSync sustituye al gestor, no convive con él. Importar invita a convivir, que es la doble actualización con la que muere esta categoría.
- Historial completo de cambios por tarea. La última modificación basta para ver la frescura; auditar es otra necesidad.
- Búsqueda, ordenación manual, app móvil, modo sin conexión. Con 3 a 10 personas el tablero cabe en una pantalla, y el caso "llego y miro la lista" no los pide.

## 4. Las 3 líneas

| Pregunta | Respuesta |
|----------|-----------|
| ¿Cuántas cosas propuso la IA meter dentro del alcance vs cuántas quedaron después de recortar? | Propuesta de la IA: 9 funcionalidades. Propuestas tras el recorte: **4 (5 menos que las iniciales)**. |
| 3 cosas que dejaste fuera y porqué cada una |<ol><li>Fecha de vencimiento de las tareas: Usando la IA como socia de pensamiento, me ha remarcado que el hecho de usar fechas de vencimiento y marcar las tareas vencidas va más enfocado a "Si llegamos a tiempo" y no tanto a "En qué estamos trabajando" que es el scope del MVP.</li><li>Edición de título y borrado de tareas: Puede parecer algo crítico para el MVP, pero a mi modo de ver lo principal es ganar visibilidad y ver qué uso hace el equipo del tablero. Editar o borrar tareas es un nice-to-have a mi modo de ver que puede quedar fuera del scope inicial.</li><li>Ver cambios sin refrescar: Me parece añadir una complejidad innecesaria para un primer MVP. Refrescar una pantalla no cuesta nada, con lo que me parece una funcionalidad nice-to-have.</li></ol> |
| Exclusión de la que menos seguro estás | Filtro por estados: Lo he quitado a cambio de meter en el alcance una no-capability como es la agrupación de tareas por estado en filas o columnas, y eso es precisamente lo que me hace dudar. Creo que está bien excluída del MVP, y que a la larga habría que añadir otras opciones de filtrado (como por ejemplo, tareas asignadas a mi), pero me parece que no deberían estar en el MVP. |

♥︎ ♥︎ Muchas gracias por el feedback ♥︎ ♥︎