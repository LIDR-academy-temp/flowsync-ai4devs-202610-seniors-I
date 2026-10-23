# Alcance del MVP de FlowSync

> La IA propuso el alcance; el recorte final y la parte B son del autor.

## 1. El terreno que ya existe

FlowSync solo tiene construida la cuenta de usuario: registro, inicio de sesión, sesión que se mantiene al volver, ver el propio perfil y cerrar sesión. Lo único que el sistema conoce hoy son personas con su email y su sesión. No existe ningún concepto de tarea, equipo ni estado. Todo lo de abajo se construye encima de esas cuentas, sin rehacerlas.

## 2. El interrogatorio, con las respuestas ya decididas

1. **¿Qué duele hoy y a quién?** La ronda de «¿en qué estás?» de la daily y las interrupciones por chat. Duele a los compañeros, no a un lead: a dos personas que descubren tarde que iban a lo mismo (dos días perdidos tocando el mismo módulo) y a quien interrumpe para preguntar.
2. **¿Qué decisión cambia?** No empezar algo que otra persona ya está tocando, y elegir lo siguiente sabiendo qué está libre. La daily no desaparece entera: desaparece la ronda de estado, y los bloqueos siguen fuera.
3. **¿Qué es «tiempo real»?** Ver los cambios de estado de las tareas sin refrescar ni preguntar. Es frescura de la tarea, no presencia de la persona. No hay chat, ni indicador de quién está conectado, ni avisos que interrumpen: es un resumen que espera a que vuelvas.
4. **¿De dónde sale el estado y por qué se mantiene al día?** Lo escribe quien hace la tarea, en dos clics y sin campos obligatorios. Quien lo escribe sale ganando en el momento: la lista es su cola de trabajo y deja de recibir interrupciones. FlowSync sustituye al gestor de tareas actual, no convive con él.
5. **¿Quién es el primer usuario y cómo se mide el éxito?** Un equipo remoto de 6 personas de producto SaaS, en 3 husos horarios, con roles planos (es un caso de estudio). Funciona si a la semana el equipo cancela la ronda de «¿en qué estás?» y nadie pide que vuelva.

**Supuestos que decide la IA (la ficha no los cubre):**

- Hay tres estados fijos: *Pendiente*, *En curso* y *Hecha*. No hay estado *Bloqueada*, porque los bloqueos quedan fuera.
- Solo el título es obligatorio. Una tarea sin responsable está libre.
- Cualquier cuenta registrada entra en el espacio único. No hay invitaciones ni más de un equipo. **Riesgo asumido:** cualquiera que se registre ve y edita todas las tareas. Vale para un caso de estudio con un equipo, pero no para abrirlo al público.

## 3. El alcance

### Problema

En un equipo remoto pequeño nadie ve en qué está cada uno sin interrumpir a alguien. Por eso la mitad de la daily se va en «¿en qué estás?», y dos personas pueden empezar lo mismo sin enterarse.

### Usuarios

Cada miembro de un equipo remoto de 3 a 10 personas, todos con el mismo rol, que hace su propio trabajo y elige lo siguiente que coge. No hay lead ni manager como usuario.

### Propuesta de valor

Tu cola de trabajo y la del equipo están en la misma lista. Actualizarla cuesta dos clics, y al volver ves qué han movido los demás. Ya no hay que preguntar en qué está nadie para saber qué está libre.

### Alcance (la IA propuso 9 cosas; tras el recorte quedan 6)

1. **Espacio único compartido.** Todas las personas con cuenta ven la misma lista de tareas.
2. **Crear una tarea** con solo el título como campo obligatorio.
3. **Asignar un responsable**, que incluye cogerse una tarea libre con un clic y soltarla para que vuelva a estar libre.
4. **Cambiar el estado desde la propia lista**, sin abrir la tarea, entre los tres estados fijos.
5. **Filtrar la lista por estado.**
6. **«Qué se ha movido desde tu última visita».** Al abrir la lista, cada persona ve resaltado lo que ha cambiado (tareas nuevas, cambios de estado y de responsable) desde la última vez que la miró, sea cual sea el dispositivo.

### NO-alcance

Las tres hipótesis que el MVP tiene que validar:

- **H1:** si actualizar cuesta dos clics, el estado se mantiene al día (es el riesgo número 1).
- **H2:** con el estado visible, la ronda de «¿en qué estás?» desaparece.
- **H3:** ver qué está cogido evita que dos personas empiecen lo mismo.

Cada exclusión dice cuál de ellas no ayuda a validar.

**Recortado por el autor de la propuesta de la IA:**

- **Editar el título de una tarea y borrarla.** No ayuda a validar H1, H2 ni H3: lo que se prueba es si el *estado* se mantiene al día, no si el título es correcto. Una tarea mal escrita o muerta se pasa a *Hecha*. Asumo que la lista acumula tareas muertas en *Hecha*; el filtro por estado las saca de la vista.
- **Fecha de vencimiento y tareas vencidas.** Ninguna de las tres hipótesis depende del plazo: se valida quién está en qué y qué está libre, no si llega a tiempo. Va contra la ficha, que pide la fecha, y queda anotado como decisión consciente.
- **Cambios en vivo, sin refrescar.** Con el equipo en tres husos horarios, el caso real es llegar y ver qué se ha movido, y eso lo cubre el punto 6. Para H2 no añade nada que no dé el resumen al volver. **Para H3 sí hay un riesgo, y lo acepto a propósito:** si dos personas tienen la lista abierta a la vez, una puede coger una tarea que la otra ya cogió hace minutos sin verlo. Con tres husos horarios espero que pase poco, y es la señal que vigilo (ver parte B, línea 3). El «en vivo» es lo más caro de construir. Va contra la definición literal de «tiempo real» de la ficha.

**Excluido desde la propuesta de la IA:**

- **Asignación automática de la siguiente tarea libre.** Quita la decisión que H3 quiere informar: si el sistema elige, nadie mira qué está cogido. Además, oculta si la gente actualiza por voluntad propia, que es H1.
- **Presencia («quién está conectado») e indicadores de actividad.** El estado es de la tarea, no de la persona. Esto es vigilancia, y la presión de sentirse observado contamina la medida de H1.
- **Chat personal o por tarea.** Vuelve a meter la interrupción que el producto quita. Si el chat existe, la pregunta «¿en qué estás?» se mueve allí y H2 no se puede medir.
- **Comentarios en tareas.** Convierten la tarea en conversación y suben el coste de actualizar. No informan sobre H1, H2 ni H3.
- **Notificaciones push, email o recordatorios.** La señal es un resumen que espera, no un aviso. Además, recordar que hay que actualizar sería obligar, y H1 tiene que probarse sin esa muleta.
- **Integración con Slack.** Saca la señal fuera de la lista. FlowSync tiene que ser el sitio donde se mira, si no H2 no se puede atribuir.
- **Estado derivado de Git, PRs, CI o calendario.** Es otro producto, con integraciones y OAuth de terceros. Si el estado se rellena solo, H1 (que la persona lo mantiene) deja de ponerse a prueba.
- **Importar o sincronizar con Jira u otro gestor.** El producto sustituye al gestor actual. Convivir con otro obliga a actualizar dos veces, y así muere H1.
- **Estado *Bloqueada* y gestión de bloqueos.** La parte de bloqueos de la daily sigue fuera del MVP. Meterla mezcla la medida de H2 con otro problema.
- **Estados o flujos configurables.** Configurar es justo el «rollo de Jira». Tres estados fijos bastan para H1, H2 y H3.
- **Sprints, estimaciones, épicas, backlog priorizado, prioridad y etiquetas.** Son planificación, no visibilidad: ninguna de las tres hipótesis depende de ellos, y cada campo de más sube el coste de actualizar, que es justo lo que H1 necesita bajo. Un equipo que los necesita no es nuestro usuario.
- **Subtareas y dependencias.** H3 se valida a nivel de tarea («¿quién tiene esto?»), no de subtarea. Más estructura que mantener sube el coste de actualizar, en contra de H1.
- **Analítica, informes e historial de actividad completo.** No ayudan a validar H1, H2 ni H3: no hay reporte hacia arriba y nadie del usuario objetivo cobra ese valor. El resumen del punto 6 solo muestra lo cambiado desde la última visita de cada persona, no un histórico.
- **Roles y permisos.** Los roles son planos y todos editan lo mismo. H1, H2 y H3 se prueban entre pares; una jerarquía solo añade fricción para actualizar, en contra de H1.
- **Varios equipos o espacios, e invitaciones.** El MVP tiene un espacio único. H1, H2 y H3 se validan con un solo equipo de 3 a 10 personas; separar equipos es crecer, no validar.
- **Edición simultánea, adjuntos y descripciones ricas.** «Tiempo real» no significa colaborar a la vez sobre un documento. Ninguna hipótesis necesita más que título, responsable y estado, y cada campo de más sube el coste de actualizar (H1).
- **App móvil nativa.** El caso de uso es llegar por la mañana y mirar la lista. H1, H2 y H3 se validan igual en una web; una app no añade nada a ninguna.

## Parte B: las tres líneas

> Las decisiones son del autor: qué recortar, qué exclusión le genera más duda y qué señal la haría entrar. La IA las pasó a limpio y redactó los porqués de la línea 2, que el autor revisó y aprobó. La contradicción de la línea 3 la sugirió la IA y el autor la adoptó; la señal que haría entrar el 8 la eligió el autor entre las que propuso la IA.

1. **Los dos números:** propuestas de la IA dentro del alcance: 9 · dentro tras mi recorte: 6
2. **Tres cosas que dejé fuera, y por qué:**
   - **Editar y borrar:** no ayuda a validar H1, H2 ni H3. Lo que se prueba es si el estado se mantiene al día, no si el título está bien escrito.
   - **Fecha de vencimiento:** ninguna hipótesis depende del plazo. Se valida quién está en qué y qué está libre, no si llega a tiempo.
   - **Cambios en vivo:** con tres husos horarios, el caso real es llegar y ver qué se ha movido, y eso ya lo cubre el resumen. No añade nada a H2; para H3 acepto el riesgo de que dos personas cojan lo mismo con minutos de diferencia.
3. **La exclusión de la que menos seguro estoy, y qué tendría que pasar para que entrara:** los cambios en vivo. Se contradicen lo que pide la ficha (tiempo real es ver los cambios sin refrescar) y el uso real (con tres husos horarios, lo normal es llegar y ver qué se ha movido). Al quitarlo, el producto pierde lo que el párrafo original más pedía. Entraría si en la semana de prueba dos personas cogen la misma tarea con minutos de diferencia porque una tenía la lista abierta sin refrescar: eso rompe H3, justo lo que el producto quiere evitar.
