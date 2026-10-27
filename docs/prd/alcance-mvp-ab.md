# Alcance MVP — FlowSync

## Terreno

Hoy FlowSync solo cubre el acceso: una persona puede crear su cuenta, iniciar sesión, ver su perfil y cerrar sesión.
De cada usuario solo se guarda su nombre y su email; no hay ninguna relación entre usuarios.
No existe todavía ninguna funcionalidad de gestión de tareas: no se pueden crear, asignar, cambiar de estado ni consultar.
Todo lo que vaya más allá de la cuenta de usuario está por construir.

## Interrogatorio

**1. Qué duele y a quién.**
La ronda de "¿en qué estás?" de la daily y las preguntas sueltas por chat: nadie ve el estado del equipo sin interrumpir a alguien. El valor lo cobran los pares, no un lead; no hay reporte hacia arriba. Episodio: dos personas tocaron el mismo módulo la misma semana sin saberlo, dos días perdidos.

**2. Para quién.**
Equipos remotos pequeños (3–10 personas), con roles planos: todos ven y editan lo mismo. Caso de estudio: un equipo de producto SaaS de 6 personas en 3 husos horarios, con un gestor de tareas pesado y una daily de 15 minutos. Un único espacio compartido; varios equipos o gente en más de uno queda fuera.

**3. Qué es "tiempo real" y "menos que Jira".**
Ver los cambios de estado de las tareas sin refrescar ni preguntar. No es chat, ni videollamada, ni edición simultánea, ni presencia: el estado es de la tarea, no de la persona. La señal es un resumen que espera, no un aviso que interrumpe. "Menos que Jira" es crear una tarea y cambiarle el estado en segundos, sin configuración, sprints, estimaciones, épicas, backlog priorizado ni informes.

**4. De dónde sale la información y por qué se mantiene.**
La teclea quien hace la tarea, en dos clics. FlowSync sustituye al gestor de tareas, no convive con él ni lee de otras herramientas. Se sostiene porque la lista es la propia cola de trabajo de quien la actualiza, y le ahorra interrupciones. Que la información se quede vieja es el riesgo #1 a validar.

**5. Cómo sabremos que funciona y cuánto construir.**
Éxito: a la semana de uso real el equipo cancela la ronda de "¿en qué estás?" y nadie pide que vuelva (la parte de bloqueos de la daily sigue). La decisión que cambia es no empezar lo que otro ya toca y elegir lo siguiente sabiendo qué está libre. Se construye una vertical fina terminada de punta a punta. Fuera ya decidido: notificaciones push, integración con Slack, roles/permisos avanzados, analítica/reporting y comentarios en tareas.

### Supuestos

- **DECIDIDO — Solo el título es obligatorio.** La ficha pedía a la vez "sin campos obligatorios" y que una tarea tenga título, responsable, estado y fecha. Se resuelve así: el título es lo único que hay que escribir; el estado toma uno por defecto, y responsable y fecha son opcionales.
- **SUPUESTO — Una tarea puede no tener responsable**, y eso es lo que significa "libre". Sin esto no se puede "elegir lo siguiente sabiendo qué está libre".
- **SUPUESTO — Pocos estados y fijos** (por hacer, en curso, hecha), no configurables por el equipo. Configurarlos es justo el rollo que se quiere evitar.
- **SUPUESTO — Cualquiera puede crear, asignar (también a otro) y cambiar el estado de cualquier tarea**, coherente con los roles planos.
- **SUPUESTO — Todo usuario registrado entra en el único espacio compartido**, sin invitaciones. Vale para el caso de estudio; para un uso real abierto no.
- **SUPUESTO — "Ver qué se ha movido" se cubre con la lista al día y con saber cuándo cambió cada tarea por última vez.** No hay historial de cambios ni resumen "desde tu última visita".
- **SUPUESTO — La fecha de vencimiento es un día, no una hora**, para no depender de husos horarios; una tarea no hecha con la fecha pasada se ve como vencida.
- **SUPUESTO — Uso en navegador de escritorio**; sin app móvil.

## Alcance del MVP

### Problema

En un equipo remoto nadie ve en qué está cada uno sin interrumpir a alguien. Eso se paga dos veces: con la ronda de "¿en qué estás?" que se come media daily y con las preguntas sueltas por chat, y con trabajo duplicado que se descubre tarde (dos personas en el mismo módulo, dos días perdidos). Los gestores de tareas existentes no lo resuelven porque actualizarlos cuesta demasiado y la información se queda vieja.

### Usuarios

Los miembros de equipos remotos pequeños (3–10 personas), todos con el mismo papel: ven y editan lo mismo. Lo usan los pares entre sí; no hay un lead que consuma informes. Caso de estudio: un equipo de producto SaaS de 6 personas en 3 husos horarios, con un gestor de tareas pesado y una daily de 15 minutos.

### Propuesta de valor

Una única lista de tareas, que es a la vez la cola de trabajo de cada uno y el estado del equipo. Actualizarla cuesta dos clics, y lo que cambia otro aparece solo, sin refrescar ni preguntar. Al llegar por la mañana se ve qué se ha movido, qué está cogido y qué está libre, y la ronda de "¿en qué estás?" deja de hacer falta.

Hipótesis que el MVP tiene que validar:
- **H1:** si actualizar cuesta dos clics y la lista es la propia cola de trabajo, la gente la mantiene al día sin que nadie la obligue (riesgo #1).
- **H2:** con esa lista a la vista, el equipo deja de hacer la ronda de "¿en qué estás?" y nadie pide que vuelva.
- **H3:** ver qué está cogido y qué está libre evita empezar algo que otro ya está tocando.

### Alcance

1. **Una lista compartida con todas las tareas**, la misma para todos los usuarios registrados.
2. **Crear una tarea escribiendo solo el título.** Responsable y fecha de vencimiento se pueden poner al crearla o después.
3. **Cogerse una tarea, asignársela a otro o dejarla libre.** Una tarea sin responsable está libre.
4. **Cambiar el estado en dos clics**, entre tres estados fijos: por hacer, en curso, hecha.
5. **Ver los cambios de los demás sin refrescar** mientras la lista está abierta.
6. **Saber cuándo cambió cada tarea por última vez**, para ver de un vistazo qué se ha movido desde ayer.
7. **Filtrar la lista por estado**, para centrarse en lo pendiente.
8. **Ver qué tareas están vencidas** (fecha pasada y sin hacer).
9. **Editar una tarea:** cambiarle el título o la fecha de vencimiento.

El acceso (crear cuenta, entrar, salir) ya existe y se reutiliza tal cual.

### NO-alcance

Cada exclusión dice qué hipótesis no ayuda a validar, o cuál contradice.

- **Notificaciones push, por email o resumen diario por correo.** La señal tiene que esperar, no interrumpir. Un aviso no valida H1 ni H2, y puede tapar si la lista sola basta.
- **Integración con Slack, Git, CI o calendario.** H1 consiste justo en comprobar si la gente teclea el estado. Derivarlo de fuera esquiva el riesgo #1 en vez de validarlo, y es otro producto con integraciones de terceros.
- **Quién está conectado, indicadores de actividad o "última vez visto".** El estado es de la tarea, no de la persona. Esto es vigilancia, y la rechazamos a propósito.
- **Comentarios en tareas.** Convierten la lista en una conversación. No ayudan a saber quién está en qué, y abren el chat que no queremos replicar.
- **Marcar bloqueos o un estado "bloqueada".** La parte de bloqueos de la daily sigue existiendo y este MVP no la resuelve. Meterla a medias enturbia H2, porque ya no se sabría qué parte de la daily desapareció gracias a qué.
- **Historial de cambios o resumen "desde tu última visita".** La fecha del último cambio basta para probar H2. Si con eso no se entiende qué se ha movido, es el primer candidato a entrar.
- **Varios equipos o espacios, e invitaciones.** El caso de estudio es un solo equipo. Separar espacios no valida ninguna hipótesis y queda anotado como supuesto.
- **Roles y permisos.** Los roles son planos; una jerarquía no añade nada a H1–H3.
- **Sprints, estimaciones, épicas, prioridades y backlog ordenado.** Es exactamente el "rollo" que hace que la gente deje de actualizar, así que va contra H1. Un equipo que lo necesite no es nuestro usuario.
- **Estados personalizables por el equipo.** Configurar flujos es fricción antes de empezar. Tres estados fijos bastan para saber quién está en qué.
- **Descripción larga, etiquetas, subtareas o adjuntos.** Cada campo extra encarece crear y actualizar, que es lo que H1 pone a prueba.
- **Más de un responsable por tarea.** "Quién está en qué" necesita una respuesta; con varios responsables, H3 deja de ser clara.
- **Vista de tablero (kanban), búsqueda u ordenación avanzada.** Con 3–10 personas, una lista filtrada por estado basta para validar H2 y H3. Son otra forma de ver lo mismo.
- **Analítica, informes o dashboards.** Nadie consume reporte hacia arriba, y el valor lo cobran los pares.
- **Importar tareas de otro gestor.** FlowSync sustituye al gestor, pero para validar basta con empezar con el trabajo nuevo. Importar no prueba ninguna hipótesis.
- **App móvil.** El trabajo se hace y se consulta en el escritorio. La versión móvil no cambia ninguna de las tres hipótesis.
- **Edición simultánea del mismo contenido.** "Tiempo real" es ver cambios de estado, no colaborar a la vez sobre un texto.
- **Borrar tareas.** No ayuda a validar H1–H3. Con roles planos, cualquiera podría hacer desaparecer el trabajo de otro sin dejar rastro, y eso va contra la confianza en la lista que necesita H2. Una tarea creada por error se corrige editándola o se marca como hecha.

## Parte B

1. **Los dos números:** la IA propuso 9 cosas dentro del alcance; tras mi recorte quedan 9 (una recortada: "corregir o borrar" se queda en solo editar).

2. **Tres cosas que dejé fuera:**
   - **Borrar tareas:** no ayuda a validar H1–H3, y con roles planos cualquiera podría borrar el trabajo de otro sin rastro.
   - **Integraciones (Git, Slack, calendario):** H1 es comprobar si la gente teclea el estado; derivarlo de fuera esquiva el riesgo en vez de validarlo.
   - **Bloqueos:** este MVP no resuelve la parte de bloqueos de la daily; meterla a medias no deja saber qué parte de la daily desapareció gracias a qué (H2).

3. **La decisión de la que menos seguro estoy:** mantener "ver tareas vencidas". La pide el producto, pero no valida ninguna de las tres hipótesis. Se contradecían lo que me pedían y lo que veía.

**Cuando la IA tenía razón:**
- La ficha pedía "sin campos obligatorios" y a la vez cuatro campos; decidí que solo el título sea obligatorio.
- Justifiqué el 6 y el 8 con "es fácil" y "se siente necesario", que no son razones de producto.
- El revisor detectó que el NO-alcance excluye búsqueda y ordenación "porque no hacen falta para H3", pero el único filtro es por estado y H3 necesita ver qué está libre y quién tiene qué. El documento se contradice; no me dio tiempo a corregirlo.
