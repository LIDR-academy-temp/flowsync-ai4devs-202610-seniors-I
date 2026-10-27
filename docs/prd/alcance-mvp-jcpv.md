# Alcance del MVP de FlowSync

## 1. El terreno que ya existe

FlowSync hoy solo tiene cuentas: registro, login, ver el perfil propio y cerrar sesión, con sus tres pantallas (registro, login, perfil). La única entidad de dominio es el usuario (nombre opcional, email único, contraseña), más los tokens de sesión ligados a él. No existen tareas, estados, responsables ni nada de tiempo real: todo lo del dominio está por construir, sobre el usuario como única entidad. El registro y el login se reutilizan tal cual y no se vuelven a especificar.

## 2. El interrogatorio

Una sola ronda de cinco preguntas, sin bajar al modelo de datos ni a los endpoints (tal cual las formuló la IA):

1. **El dolor y un caso real.** ¿Qué problema concreto tiene hoy el equipo por no saber en qué está cada uno? ¿Me cuentas un episodio reciente en el que eso costara tiempo o trabajo? ¿Cómo sabremos que FlowSync funciona, qué deja de pasar?
2. **Quién lo usa.** ¿De qué tamaño es el equipo y cómo trabaja (remoto, husos horarios, qué herramientas usa hoy)? ¿Hay roles o permisos distintos, o todos ven y editan lo mismo? ¿Quién sería el primer usuario concreto?
3. **Fronteras del espacio.** ¿Es un único espacio compartido por un equipo, o desde el principio hay varios equipos separados, o personas que están en más de uno?
4. **Qué significa "tiempo real".** ¿Es ver los cambios de estado de las tareas sin refrescar, o incluye presencia ("quién está conectado"), chat o edición simultánea? ¿Y de dónde sale el estado: lo escribe la persona a mano o se deduce de señales externas como Git, la integración continua o el calendario?
5. **Relación con Jira y qué queda fuera.** ¿FlowSync sustituye al gestor de tareas actual o convive con él e importa de él? ¿Qué renuncias explícitas asumimos (sprints, estimaciones, épicas, backlog, informes…)? ¿Qué es lo mínimo que necesita una tarea para que "menos rollo que Jira" sea verdad?

### Respuestas (ficha de hechos, pegada entera)

- Qué duele hoy: la daily de sincronización y el "¿en qué estás?" constante por Slack/chat. Nadie ve el estado del equipo sin interrumpir a alguien.
- Quién cobra el valor: los pares, no un lead. No hay reporte hacia arriba y a un manager le daría igual. Duele a los dos devs que descubren tarde que iban a lo mismo, y al que interrumpe a otro para preguntar.
- Episodio concreto: dos personas del equipo tocaron el mismo módulo la misma semana porque una empezó sin que la otra lo supiera. Dos días perdidos.
- Qué reunión desaparece (respuesta honesta, no la vendas de más): la daily NO desaparece entera. Desaparece la ronda de "¿en qué estás?", que hoy se come la mitad de los 15 minutos. La parte de bloqueos sigue, y este MVP no la resuelve.
- Usuarios / equipo: equipos remotos pequeños, 3–10 personas. Roles planos: en el MVP todos ven y editan lo mismo, sin jerarquía de permisos.
- Primer usuario concreto: equipo de 6 personas de producto SaaS, en 3 husos horarios, que hoy usa un gestor de tareas pesado y una daily de 15 minutos por videollamada. Es un CASO DE ESTUDIO, no un cliente real.
- Fronteras: un espacio único compartido, sin entidad "equipo". Varios equipos separados, o gente en más de uno, queda FUERA del MVP: se anota como supuesto en el PRD, no se construye.
- "Tiempo real" = ver los cambios de estado de las tareas sin refrescar ni preguntar. NO es chat, NO es videollamada, NO es colaboración simultánea sobre el mismo documento.
- Es frescura, no presencia: el estado es de la TAREA, no de la persona. Nada de "quién está conectado ahora" ni indicadores de actividad; eso es vigilancia y lo rechazamos a propósito.
- Forma de la señal: resumen que espera, no aviso que interrumpe. El caso es "llego por la mañana o vuelvo de una reunión y veo qué se ha movido". Sin notificaciones push.
- Qué decisión cambia: no empezar algo que otra persona ya está tocando, y elegir lo siguiente sabiendo qué está libre. Si la única respuesta fuera "sentirse informado", el tiempo real no valdría lo que cuesta.
- De dónde sale el estado: lo teclea la persona que hace la tarea, en segundos. Derivarlo de señales externas (Git/PRs, CI, calendario) está FUERA del MVP: es otro producto, con integraciones y OAuth de terceros.
- Por qué se sostiene: no porque sea más agradable, sino porque son dos clics sobre una lista ya abierta, sin campos obligatorios, sin decidir sprint ni estimación. Y quien lo escribe cobra en el momento: esa misma lista es su cola de trabajo, la mira para decidir qué coge, y de paso deja de recibir interrupciones preguntándole cómo va. Si el beneficio fuera solo para los demás, no lo escribiría.
- Si la información se queda vieja: el producto pierde el sentido, y lo asumo. Es el riesgo #1 a validar, no un detalle. La mitigación es que actualizar cueste dos clics, no obligar a nadie.
- Es donde se hace el trabajo, no donde se cuenta: sustituye al gestor de tareas, no convive con él. FlowSync crea las tareas, no lee las de otro sitio. Convivir exigiría doble actualización, que es como muere esta categoría.
- Renuncia explícita a sprints, estimaciones, épicas, backlog priorizado e informes. Un equipo que necesite eso no es nuestro usuario.
- "Menos rollo que Jira" = crear una tarea y cambiarle el estado en segundos, sin flujos de configuración ni campos obligatorios. Lo mínimo para saber quién está en qué.
- Qué necesita una tarea en el MVP: título, responsable, estado y fecha de vencimiento. La fecha, para ver de un vistazo qué se ha pasado de plazo.
- Cómo se consume la lista: filtrando por estado, para centrarse en lo pendiente.
- Éxito para el usuario: dejar de hacer la ronda de "¿en qué estás?" de la daily porque el estado del equipo se ve de un vistazo.
- Criterio a una semana de uso real: que el equipo cancele esa ronda y nadie pida que vuelva. Si la siguen haciendo igual, no funcionó.
- Cuánto construir: una vertical fina y usable de punta a punta, no el andamiaje amplio de un producto. Prefiero una capability terminada a tres a medias.

Ya decidido que queda fuera: notificaciones push, integración con Slack, roles/permisos avanzados, analítica/reporting, comentarios en tareas.

## 3. El alcance

### Problema

En un equipo remoto, saber en qué está cada persona exige interrumpir a alguien: la ronda de "¿en qué estás?" de la daily, que ocupa la mitad de sus 15 minutos, y las preguntas constantes por chat. Como el estado de los demás no se ve, se duplica trabajo: dos personas tocaron el mismo módulo la misma semana sin saberlo y se perdieron dos días. La parte de bloqueos de la daily no forma parte del problema que ataca este MVP.

### Usuarios

- **Quién es:** equipos remotos pequeños, de 3 a 10 personas, con roles planos. Todos ven y editan lo mismo.
- **Primer usuario (caso de estudio):** un equipo de producto SaaS de 6 personas repartidas en 3 husos horarios. Hoy usa un gestor de tareas pesado y hace una daily de 15 minutos por videollamada.
- **A quién beneficia:** a los compañeros, no a un manager. Ganan quien está a punto de empezar algo que otro ya está haciendo, quien tiene que interrumpir para preguntar, y quien deja de ser interrumpido.
- **Quién no es nuestro usuario:** un equipo que necesite sprints, estimaciones, informes o jerarquía de permisos.

### Propuesta de valor

Al llegar por la mañana o volver de una reunión, ves qué se ha movido y qué está libre sin preguntar a nadie. Así no empiezas algo que ya tiene otra persona y eliges lo siguiente con información. Actualizar tu estado cuesta dos clics sobre la misma lista que ya usas como cola de trabajo, así que quien escribe el estado también sale ganando en ese momento.

**Hipótesis que hay que validar (riesgo #1):** si actualizar cuesta dos clics, el estado se mantiene fresco sin obligar a nadie. Si se queda viejo, el producto pierde el sentido.

### Alcance

El registro y el login ya existen y se reutilizan tal cual: quien se registra entra en el único espacio compartido.

Lo nuevo que entra son 4 capacidades:

1. Crear una tarea escribiendo solo el título. El responsable es opcional.
2. Responsable: asignar o reasignar una tarea, tomar una tarea libre o soltarla. Una tarea sin responsable cuenta como libre.
3. Estado fijo de tres valores (pendiente, en curso, hecho), que se cambia con un clic. No es configurable.
4. Una única lista compartida del equipo, filtrable por estado. Está ordenada por la última actualización y muestra hace cuánto cambió cada tarea, que es como se responde a "qué se ha movido".

### No-alcance

Cada exclusión se justifica por la hipótesis que no ayuda a validar o por la decisión de producto con la que choca.

**Ya decidido que queda fuera:**

- **Notificaciones push.** La señal es un resumen que espera a que lo mires, no un aviso. Además, un push mediría si la gente reacciona a avisos, y lo que hay que validar es si consulta la lista por su cuenta.
- **Integración con Slack.** FlowSync es donde se hace el trabajo, no donde se cuenta. Llevar el estado a Slack crearía un segundo sitio que mirar, justo la convivencia que mata esta categoría.
- **Roles y permisos avanzados.** El usuario tiene roles planos. Los permisos solo validan algo en equipos con jerarquía, que no son nuestro usuario.
- **Analítica y reporting.** No hay nadie arriba a quien informar. Los informes sirven a un manager, no a los compañeros, que son quienes ganan con el producto.
- **Comentarios en tareas.** Convierten la tarea en una conversación, y el MVP valida el estado, no la discusión. La conversación ya tiene su sitio fuera de FlowSync.
- **Sprints, estimaciones, épicas y backlog priorizado.** Es la renuncia explícita a "menos rollo que Jira". Cada uno de ellos añade una decisión antes de poder actualizar.
- **Derivar el estado de Git, CI o el calendario.** Es otro producto, con integraciones y OAuth de terceros. Además, si el estado se calcula solo, ya no se pone a prueba la hipótesis de que escribirlo cuesta dos clics.
- **Varios equipos o espacios, o personas en más de uno.** Para validar con un solo equipo basta un solo espacio. Queda anotado como supuesto.
- **Presencia e indicadores de actividad.** Es vigilancia y se rechaza a propósito: el estado es de la tarea, no de la persona.
- **Chat, videollamada y edición simultánea.** No es lo que significa "tiempo real" en FlowSync.

**Recortados de la propuesta de la IA:**

- **Fecha de vencimiento.** Solo sirve para ver quién va con retraso, y el problema es saber quién está en qué.
- **Lista que se actualiza sin refrescar.** Su complejidad es mucho más alta que dar dos clics para refrescar a mano, ver los cambios en vivo no ayuda a validar el riesgo #1 (que el estado se mantenga fresco si actualizarlo cuesta dos clics); eso se valida igual refrescando a mano. Se aparta a propósito de la definición de "tiempo real" de la ficha.

**Recortes adicionales:**

- **Estado "bloqueado".** Los bloqueos siguen en la daily por decisión. Un cuarto estado añade una decisión a cada actualización y desplaza la validación hacia un problema que este MVP no ataca.
- **Aviso de colisión ("otra persona ya está en esto").** Para evitar el episodio de los dos devs basta con ver que la tarea está en curso y de quién es. Si la visibilidad no basta, el aviso tampoco salvaría el producto.
- **"Qué cambió desde mi última visita", recordado por persona.** El orden por última actualización con "hace X" responde a lo mismo sin tener que recordar cuándo vino cada uno. Solo merece la pena si eso resulta insuficiente.
- **Descripción, etiquetas, prioridad, subtareas y adjuntos.** Son campos que se sienten obligatorios aunque no lo sean. Además, la prioridad es un backlog priorizado encubierto.
- **Historial de cambios de una tarea.** Es reporting disfrazado. Para saber qué se ha movido basta con el último cambio.
- **Filtro por responsable o "mis tareas".** El filtro por estado más el nombre visible bastan para validar la hipótesis. Es candidato a entrar si la lista de 6 personas se hace larga.
- **Borrar tareas y editar el título.** Al marcar una tarea como "hecho" y filtrar por estado, desaparece de la vista. Editar no valida nada sobre la frescura del estado. Es el recorte más discutible: si la gente se equivoca a menudo al escribir, ensucia la lista.
- **Invitaciones y gestión de miembros.** Con un único espacio, quien se registra entra. Las invitaciones solo tienen sentido con varios espacios.
- **Recuperar la contraseña y editar el perfil.** No tocan la hipótesis. Con 6 personas, un fallo de acceso se resuelve a mano.
- **App móvil, modo offline y otros idiomas.** No validan nada que la web no valide ya.

### Supuestos declarados

- Solo el título es obligatorio.
- Los tres estados son fijos.
- Quien se registra entra en el espacio.
- Hay un único espacio compartido, sin entidad "equipo". Varios equipos separados, o personas en más de uno, quedan fuera del MVP.
- El éxito a una semana se mide observando al equipo del caso de estudio: cancelar la ronda de "¿en qué estás?" y que nadie pida que vuelva.

---

## Las tres líneas

1. **Los dos números:** la IA propuso 6 cosas dentro; tras mi recorte quedaron 4.
2. **Tres cosas que dejé fuera, y por qué:** la capacidad 4 de la propuesta de la IA, "la fecha de vencimiento", ya que solo sirve para ver quien va con retraso y el problema es saber quién está en qué; la capacidad 6 de la propuesta, "lista sin refrescar" ya que su complejidad es mucho más alta que dar dos clics para refrescar a mano, ver los cambios en vivo no ayuda a validar el riesgo #1 eso se valida igual refrescando a mano.
3. **La exclusión de la que menos seguro estoy:** Comentarios en el ticket, ya que esta funcionalidad aporta a saber quién está en qué, principalmente con retos o tareas de alta complejidad. Para que entrara se debería confirmar el interés del equipo en poder dejar información relevante dentro de FLOWSYNC. Puede existir una contradicción entre solo saber quien tiene una tarea, y saber también el nivel o porcentaje de avance aportando evidencia en comentarios. 
