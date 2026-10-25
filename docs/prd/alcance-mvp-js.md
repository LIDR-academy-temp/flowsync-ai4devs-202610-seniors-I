# Parte A

### 1- El terreno que ya existe (3-5 líneas).
Por ahora el proyecto solo tiene autenticación. Todavía no hay nada de gestión de tareas:

- Capacidades: registro (POST /auth/signup), login con token opaco tipo Bearer (POST /auth/login), ver el perfil (GET /account/profile) y logout (POST /account/logout).
- Frontend: tres pantallas (login-page, register-page y profile-page), con rutas protegidas y públicas, y el token guardado en localStorage.
- Modelo de datos: dos tablas.
  - users: id, email, fullName (opcional), password (con hash y nunca incluido en las respuestas), createdAt y updatedAt.
  - auth_access_tokens: id, tokenableId (referencia a users), type, name, hash, abilities, lastUsedAt, expiresAt y timestamps.
- Lo que falta: no hay tablas, rutas ni pantallas para tareas, equipos o proyectos.

### 2- El interrogatorio, con las respuestas ya decididas.
Supuestos (puntos que la ficha no cubre y que ha decidido la IA)

- S1. Estados: solo tres, fijos y no configurables: Pendiente, En curso y Hecha. Es lo mínimo para distinguir lo libre, lo ocupado y lo terminado.
- S2. Pertenencia al espacio: quien se registra entra directamente en el espacio compartido. No hay invitaciones. Es aceptable para el caso de estudio (6 personas), pero no para un despliegue real.
- S3. Responsable al empezar: si alguien pasa a En curso una tarea sin responsable, pasa a ser el responsable. Así lo que está ocupado nunca queda sin dueño, que es lo que habría evitado el episodio de los dos días.
- S4. Tareas vencidas: una tarea está vencida si su fecha ya pasó y no está Hecha. Las tareas sin fecha nunca vencen.
- S5. Qué se ha movido: son las tareas cuyo estado o responsable cambió desde la última vez que la persona abrió la lista, destacadas en la propia lista. No hay una pantalla aparte.
- S6. Borrar tareas: queda fuera. Una tarea que ya no aplica se marca como Hecha, así la lista no pierde historia.
- S7. Cada tarea muestra cuándo se actualizó por última vez. Hace visible la información vieja, que es el riesgo número 1, sin obligar a nadie a actualizar.
- S8. Uso en escritorio. El uso desde el móvil no está en el MVP.

### 3- El alcance en cinco bloques.

Alcance del MVP de FlowSync

1. Problema

En un equipo remoto pequeño, nadie ve en qué está cada uno sin interrumpir a alguien. Esto tiene dos costes medibles:
- Tiempo: la ronda de «¿en qué estás?» ocupa la mitad de una daily de 15 minutos.
- Trabajo duplicado: dos personas tocan el mismo módulo sin saberlo. En el caso de estudio se perdieron dos días.

La causa no es que falte una reunión. Es que el estado del trabajo solo existe en la cabeza de cada uno.

2. Usuarios

- Quién: equipos remotos de 3 a 10 personas, todos iguales, sin jerarquía.
- Quién se beneficia: los compañeros, en dos papeles que cambian a diario:
  - quien va a empezar algo y necesita saber si está libre;
  - quien estaba a punto de interrumpir a otro para preguntar «¿cómo va?».
- Caso de referencia: un equipo de producto SaaS de 6 personas, repartido en 3 husos horarios, con un gestor de tareas pesado y una daily por videollamada. Es un caso de estudio, no un cliente.
- No es usuario: un manager que quiere informes, ni un equipo que necesita sprints o estimaciones.

3. Propuesta de valor

Ver quién está en qué y qué está libre, sin preguntar ni refrescar, a cambio de dos clics.

Se sostiene porque quien escribe el estado recibe algo en el mismo momento: la lista compartida es también su cola de trabajo, la mira para decidir qué coge y, de paso, deja de recibir interrupciones.

4. Alcance

Una sola capacidad, terminada de punta a punta: la lista de tareas compartida del equip

1. Crear una tarea escribiendo solo el título. El responsable
2. Cambiar el estado en dos clics desde la propia lista. Hay tres estados fijos: Pendiente, En curso y Hecha. (supuesto)
3. Una tarea en curso siempre tiene dueño. Si alguien la pasa a En curso y no tenía res a serlo. Esta regla es la que habría evitado los dos días perdidos. (supuesto)
4. Ver de un vistazo el responsable, el estado.
5. Ver los cambios sin refrescar: si otra persona mueve una tarea, la lista abierta se actualiza sola.

Condición para darlo por hecho: el equipo del caso de estudio puede, durante una semana, saltarse la ronda de «¿en qué estás?» mirando solo esta lista.

5. NO-alcance

Cada exclusión con su justificación:

| Fuera | Por qué |
|---|---|
| **Resaltar «qué se movió desde mi última visita»** | Si la lista está siempre al día, abrirla por la mañana ya responde la pregunta. Resaltar los cambios supone llevar la cuenta de lo que vio cada persona, y eso es una segunda capacidad. Se añadirá solo si la semana de prueba demuestra que hace falta. |
| **Borrar tareas** | Lo que ya no aplica se marca como *Hecha*. Borrar abre preguntas (¿quién puede?, ¿se puede deshacer?) que no ayudan a ninguna de las dos decisiones. |
| **Descripción, comentarios, etiquetas, prioridad** | Cada campo extra es fricción al escribir, y el riesgo número 1 es que el estado quede viejo. El título basta para saber quién está en qué. |
| **Sprints, estimaciones, épicas, backlog priorizado, informes** | Es justo lo que hace a Jira pesado. Un equipo que lo necesite no es nuestro usuario. |
| **Varios equipos o espacios, invitaciones** | Hay un único espacio y quien se registra entra en él *(supuesto)*. Separar equipos solo vale algo con varios clientes, y el MVP valida con uno. |
| **Roles y permisos** | En equipos de 3 a 10 personas sin jerarquía, todos editan todo. Los permisos protegen de un problema que este usuario no tiene. |
| **Presencia o «quién está conectado»** | Rechazado a propósito: es vigilancia. El estado es de la tarea, no de la persona. |
| **Notificaciones push o por email** | La señal tiene que esperar a que la mires, no interrumpir. Avisar sería volver a crear la interrupción que queremos quitar. |
| **Chat, comentarios en hilo, edición simultánea** | No es lo que significa «tiempo real» aquí. Ya existe Slack. |
| **Obtener el estado de Git, PRs, CI o el calendario** | Es otro producto, con integraciones y OAuth de terceros. El estado lo escribe la persona, en segundos. |
| **Importar desde otro gestor o sincronizar con él** | Convivir obliga a actualizar dos sitios, y así muere esta categoría de producto. FlowSync sustituye al gestor, no lo lee. |
| **Gestionar bloqueos** | La parte de bloqueos de la daily se mantiene. Prometer quitarla sería vender de más. |
| **Móvil** | El caso es «llego a mi puesto o vuelvo de una reunión»: escritorio. *(supuesto)* |
| **Vencimiento de una tarea** | De momento solo importa el estado de la misma y en que esta trabajando cada usuario, si una tarea ya vencio no es primordial |
| **Filtrar por estado para centrarse en lo pendiente.** | Con saber en que esta cada uno ya vale, las tareas con estado Pendiente ya genera este filtro

Riesgo número 1 a validar: que el estado quede viejo. No se mitiga con avisos ni obligaciones, sino con que actualizar cueste dos clics.

# Parte B

### 1. Los dos números. Cuántas cosas propuso la IA meter dentro del alcance, y cuántas quedaron dentro después de tu recorte. Tal cual salieron, sin redondear ni explicar.
Propuso 8, luego recorto a 6 y yo recorte a 5.

### 2. Tres cosas que dejaste fuera, y por qué cada una. El porqué tiene una forma concreta: qué hipótesis del producto no ayuda a validar. "No da tiempo" no vale, porque no es una decisión de producto: es una excusa de calendario, y mañana deja de ser cierta.
| **Vencimiento de una tarea** | De momento solo importa el estado de la misma y en que esta trabajando cada usuario, si una tarea ya vencio no es primordial |
| **Filtrar por estado para centrarse en lo pendiente.** | Con saber en que esta cada uno ya vale, las tareas con estado Pendiente ya genera este filtro

### 3. La exclusión de la que menos seguro estás, y qué tendría que pasar para que entrara. Lo que interesa es qué dos cosas se contradecían: lo que te pedían contra lo que veías, lo barato contra lo que valida, lo que enamora contra lo que se puede sostener.
El vencimiento de una tarea, ya que podria inferir en el estado de las tareas y si el vecimiento supone un bloqueo de la tarea.
