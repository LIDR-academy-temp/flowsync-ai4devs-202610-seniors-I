# FlowSync: alcance del MVP

## 1. El terreno que ya existe

- **Qué puede hacer hoy un usuario:** solo gestionar su cuenta. Puede registrarse con email, contraseña y nombre opcional, iniciar sesión, cerrarla y ver su perfil (iniciales, nombre, email y fecha de alta). La sesión sobrevive a una recarga. Todo funciona de principio a fin, pero no hay ninguna pantalla más allá del perfil.
- **Modelo de datos:** solo existen **usuarios**, cada uno con sus sesiones abiertas. No hay ninguna otra entidad ni relación.
- **Qué no existe todavía:** todo lo propio de FlowSync: tareas, tableros, equipos, invitaciones, roles, asignación, estados, fechas, prioridades, comentarios, notificaciones o actividad. Tampoco se puede editar el perfil, recuperar la contraseña ni verificar el email.

## 2. El interrogatorio

**1. ¿Quién tiene el dolor principal y en qué momento?**
*De esto depende:* si el centro del MVP es una vista global del equipo o la actualización individual de cada persona, y si hacen falta roles distintos.
**Respuesta:** los pares, no un lead. Duele a los dos devs que descubren tarde que iban a lo mismo (dos días perdidos en el mismo módulo) y al que interrumpe a otro para preguntar. La decisión que cambia es no empezar lo que otro ya toca y elegir lo siguiente sabiendo qué está libre.

**2. ¿Qué significa en la práctica «en qué está trabajando»?**
*De esto depende:* si construimos gestión de tareas o un tablón de estado más ligero.
**Respuesta:** es una tarea con título, responsable, estado y fecha de vencimiento, cuyo estado teclea quien la hace en dos clics. Desaparece solo la ronda de «¿en qué estás?» de la daily: los bloqueos siguen y este MVP no los resuelve.

**3. ¿Qué es «tiempo real» para ellos?**
*De esto depende:* si las actualizaciones en vivo y la presencia entran en el MVP.
**Respuesta:** es ver los cambios de estado de las tareas sin refrescar ni preguntar. Es frescura de la tarea, no presencia de la persona. Es un resumen que espera y no un aviso que interrumpe, así que no hay notificaciones push.

**4. ¿Cómo son los equipos?**
*De esto depende:* si el MVP se limita a un único equipo o necesita espacios de trabajo e invitaciones.
**Respuesta:** son equipos remotos de 3 a 10 personas en un espacio único compartido, sin entidad «equipo» y con roles planos. Varios equipos, o gente en más de uno, queda fuera.

**5. ¿Qué usan hoy para esto y qué tiene que pasar para que cambien?**
*De esto depende:* si entran integraciones, qué umbral de «menos rollo» hay que cumplir y con qué métrica se valida.
**Respuesta:** hoy usan un gestor de tareas pesado y una daily de 15 minutos. FlowSync lo sustituye, no convive con él. El éxito se mide así: a la semana de uso real, el equipo cancela la ronda de «¿en qué estás?» y nadie pide que vuelva.

### Supuestos

1. **SUPUESTO — Estados:** son tres fijos y no configurables: *Pendiente*, *En curso* y *Hecha*. No existe «Bloqueada», porque el MVP no resuelve los bloqueos. *(Confirmado en la revisión.)*
2. **SUPUESTO — Tarea «libre»:** una tarea está libre si está *Pendiente* y no tiene responsable.
3. **SUPUESTO — Campos obligatorios:** solo el título; sin él la tarea no existe. Responsable y fecha son opcionales, y la tarea nace en *Pendiente*. Así se resuelve la tensión de la ficha entre «sin campos obligatorios» y «una tarea tiene título, responsable, estado y fecha».
4. **SUPUESTO — Un solo responsable** por tarea. *(Aceptado.)*
5. **SUPUESTO — Vencida:** una tarea vence un día concreto. Si ese día ya pasó y no está *Hecha*, está vencida.
6. **SUPUESTO — «Qué se ha movido»:** cada tarea muestra hace cuánto cambió. No hay historial de cambios ni de actividad por persona, porque el estado es de la tarea y no de la persona. *(Confirmado en la revisión.)*
7. **SUPUESTO — Solape por zona:** el MVP evita que dos personas cojan la misma tarea. Que dos tareas distintas toquen el mismo módulo solo se ve si el título lo dice; no se detecta.
8. **SUPUESTO — Entrada al espacio:** se reutilizan las cuentas existentes y todo el que tiene cuenta entra en el espacio único, sin invitaciones. *(Aceptado.)* Riesgo aceptado: el registro sigue abierto, así que cualquiera que llegue a la instancia entra y puede editarlo todo. El caso de estudio lo asume porque la instancia solo la conoce el equipo; cerrar el registro llega con N7.
9. **SUPUESTO — Todos editan todo:** cualquiera puede crear, editar, reasignar o borrar cualquier tarea. El borrado es definitivo. *(Aceptado.)*
10. **SUPUESTO — Sin importación:** las tareas se crean a mano al empezar.
11. **SUPUESTO — Medición:** el criterio de la semana se comprueba hablando con el equipo, no con métricas dentro del producto.
12. **SUPUESTO — Plataforma:** web de escritorio, con la interfaz en castellano.

## 3. El alcance

### Problema

En un equipo remoto pequeño nadie ve el estado del equipo sin interrumpir a alguien. La ronda de «¿en qué estás?» se come la mitad de una daily de 15 minutos, y el resto del día la misma pregunta llega por chat. El coste real no es la reunión, sino la falta de coordinación: hace poco, dos personas tocaron el mismo módulo la misma semana porque una empezó sin que la otra lo supiera, y se perdieron dos días.

### Usuarios

Los pares de equipos remotos de 3 a 10 personas, en un único espacio compartido y con roles planos: todos ven y editan lo mismo. El valor lo cobran quien está a punto de empezar algo y quien deja de ser interrumpido. No hay un lead que consuma informes.
Primer usuario (caso de estudio): un equipo de producto SaaS de 6 personas, repartidas en 3 husos horarios, con un gestor de tareas pesado y una daily por videollamada.
No es nuestro usuario un equipo que necesite sprints, estimaciones, épicas, backlog priorizado o informes.

### Propuesta de valor

El equipo tiene una sola lista compartida que dice quién está en qué y está al día sin preguntar a nadie. Actualizarla cuesta dos clics a quien hace la tarea, y esa persona cobra en el momento: la lista es su cola de trabajo y deja de recibir el «¿en qué estás?». FlowSync sustituye al gestor de tareas, no convive con él. La daily no desaparece: desaparece su ronda de «¿en qué estás?».

**Hipótesis central:** si el estado de cada tarea se ve sin preguntar y actualizarlo cuesta dos clics, el equipo deja de hacer la ronda de «¿en qué estás?» y nadie coge una tarea que otro ya tiene.

**Riesgo principal:** que el estado se quede viejo porque nadie lo actualiza. Entonces la lista miente y el producto pierde el sentido. La mitigación es abaratar la actualización, no obligar a nadie.

**Éxito:** tras una semana de uso real, el equipo cancela la ronda de «¿en qué estás?» y nadie pide que vuelva.

### Alcance

- **A1. Crear y corregir tareas en segundos.** Solo el título es obligatorio; responsable y fecha de vencimiento son opcionales. Cualquiera puede cambiar el título, el responsable o la fecha de cualquier tarea, o borrarla.
- **A2. Cambiar el estado en dos clics desde la propia lista.** Tres estados fijos: *Pendiente*, *En curso* y *Hecha*. «Me la quedo» asigna una tarea libre y la pasa a *En curso* en un solo gesto. Si otra persona la cogió un instante antes, se ve y no se pisa.
- **A3. La lista del equipo de un vistazo.** Cada tarea muestra título, responsable, estado, fecha de vencimiento (destacando las vencidas) y hace cuánto cambió. Se filtra por estado y, por defecto, oculta lo hecho.
- **A4. Frescura sin refrescar.** Los cambios de los demás aparecen en la lista abierta sin recargar ni preguntar.

### NO-alcance

- **N1. Estado «Bloqueada» y gestión de bloqueos:** no ayuda a validar que ver quién está en qué sustituye la ronda de «¿en qué estás?». Los bloqueos siguen en la daily a propósito.
- **N2. Estados, campos o flujos configurables:** no ayuda a validar que dos clics bastan para mantener el estado al día; configurar es justo el coste que la hipótesis quiere eliminar.
- **N3. Presencia, «quién está conectado» e historial de actividad por persona:** no ayuda a validar que el estado de la tarea basta para coordinarse. Además mide personas, no trabajo, y lo rechazamos como vigilancia.
- **N4. Notificaciones push, por email o por Slack:** no ayuda a validar que un resumen que espera sustituye a la pregunta; un aviso que interrumpe reintroduce el problema.
- **N5. Estado derivado de Git, PRs, CI o calendario:** no ayuda a validar que la persona teclea su estado si le cuesta dos clics, que es lo que está en juego.
- **N6. Importación desde otro gestor:** no ayuda a validar que el estado se mantiene al día con el uso diario; solo cambia con cuántas tareas se empieza.
- **N7. Varios equipos, invitaciones, roles y permisos:** no ayuda a validar que un equipo se coordina sin preguntar; separar espacios o permisos reparte la visibilidad que la hipótesis necesita completa.
- **N8. Sprints, estimaciones, épicas, prioridades, backlog e informes:** no ayuda a validar que título, responsable y estado bastan para saber quién está en qué. Quien lo necesita no es nuestro usuario.
- **N9. Descripción, comentarios y adjuntos en la tarea:** no ayuda a validar que el estado visible basta para no pisarse; el contexto de la tarea se sigue hablando donde se habla hoy.
- **N10. Vista «mis tareas»:** no ayuda a validar que la lista compartida es a la vez la cola personal; con una vista propia, cada uno miraría lo suyo y dejaría de ver qué está ocupado.
- **N11. Historial de cambios y «novedades desde tu última visita»:** no ayuda a validar que el estado actual, junto con hace cuánto cambió, basta para decidir qué coger.
- **N12. Búsqueda, filtro por responsable y ordenaciones:** no ayuda a validar que el estado del equipo se lee de un vistazo; si 3 a 10 personas necesitan buscar, la hipótesis ya ha fallado.
- **N13. App móvil y modo sin conexión:** no ayuda a validar que la lista sustituye la ronda; la ronda que se quiere eliminar ocurre en una videollamada, delante de un ordenador.
- **N14. Edición de perfil y recuperación de contraseña:** no ayuda a validar que el estado de las tareas basta para coordinarse. Si alguien pierde el acceso durante la semana de prueba, se resuelve a mano y se anota como fricción.

## Las tres líneas

1. **Los dos números: 7 → 4.**
2. **Tres cosas que dejé fuera:** el **estado «Bloqueada»**, porque no ayuda a validar que ver quién está en qué sustituye la ronda, y prometer bloqueos sería vender una daily entera que no se elimina. La **descripción de la tarea**, porque no ayuda a validar que el estado visible basta para no pisarse. La **vista «mis tareas»**, porque no ayuda a validar que la lista compartida sirve a la vez de cola personal.
3. **La exclusión de la que menos seguro estoy: «novedades desde tu última visita» (N11).** Se contradicen el «tiempo real» que se pide y el «resumen que espera» del caso de uso. A4, lo más caro del alcance, solo sirve a quien tiene la lista abierta. Quien llega por la mañana desde otro huso horario, que es el caso que describe la ficha, solo tiene el «hace cuánto» de cada tarea, y A3 le oculta lo que pasó a *Hecha*. Entraría si en la primera semana la gente de otros husos sigue preguntando «¿qué ha pasado?» al empezar el día.

**La IA tenía razón**, al atacar el borrador, en cinco incoherencias. Corregí tres: dos personas podían coger la misma tarea a la vez sin enterarse, que era el episodio que el producto quiere evitar (ahora lo cubre A2); la propuesta de valor prometía acabar con el «¿cómo va?», que *En curso* no responde; y el problema afirmaba un hecho que no está en la ficha. Una cuarta no la resolví, solo la hice visible: «todo el que tiene cuenta entra» sin invitaciones deja el espacio abierto a cualquiera (supuesto 8, riesgo aceptado). La quinta: la hipótesis prometía evitar trabajo en la misma zona, y el alcance solo evita coger la misma tarea: lo bajé a lo que el alcance cumple y lo anoté como supuesto 7.