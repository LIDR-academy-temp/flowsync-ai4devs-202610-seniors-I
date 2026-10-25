# Alcance del MVP de FlowSync (emf)

> **Leyenda:** ✅ **Confirmado**: decisión tomada por mí (ficha de hechos o respuesta explícita). 🟡 **Propuesta sin revisar**: lo propuso la IA y todavía no lo he validado.

## 1. El terreno que ya existe

- Solo hay autenticación: registro, login, perfil y logout. No existe nada de tareas.
- Modelo de datos actual: usuarios (email, nombre, contraseña) y sus tokens de sesión. Sin equipos ni tareas.
- Backend AdonisJS 7 + SQLite; frontend React 19 con tres pantallas (registro, login, perfil) y rutas protegidas.
- Harness: `CLAUDE.md`/`AGENTS.md`, skills `commit` y `priority-ticket`, subagente `adversarial-reviewer`, hook de Prettier en el frontend y MCP de Atlassian (Jira).

## 2. El interrogatorio

**P1. ¿Qué duele hoy, en qué momento concreto, y qué reunión desaparece?**
✅ La daily de sincronización y el "¿en qué estás?" constante por chat: nadie ve el estado del equipo sin interrumpir. Episodio: dos personas tocaron el mismo módulo la misma semana sin saberlo, dos días perdidos. La daily **no** desaparece entera: desaparece la ronda de "¿en qué estás?" (la mitad de los 15 minutos). Los bloqueos siguen y este MVP no los resuelve.

**P2. ¿Quién la usa y quién cobra el valor?**
✅ Equipos remotos de 3–10 personas, roles planos. El valor es para los pares, no para un lead; no hay reporte hacia arriba. El estado lo escribe quien hace la tarea, y lo cobra en el momento porque la lista es su cola de trabajo. Caso de estudio: equipo SaaS de 6 personas en 3 husos horarios. La prueba se hace con un único equipo conocido y con sus cuentas preparadas previamente.

**P3. ¿Qué significa "más en tiempo real"?**
✅ Ver los cambios de estado de las tareas sin refrescar ni preguntar. No es chat, ni videollamada, ni edición simultánea. Es frescura de la tarea, no presencia de la persona: nada de "quién está conectado". La señal es un resumen que espera, no un aviso. Decisión que cambia: no empezar algo que otro ya toca y elegir lo siguiente sabiendo qué está libre.

**P4. ¿Qué significa "menos rollo que Jira" y cómo convive con lo actual?**
✅ Crear una tarea y cambiarle el estado en segundos, sin configuración ni campos obligatorios de más. Sustituye al gestor de tareas, no convive con él. El estado lo teclea la persona; nada de derivarlo de Git, CI o calendario. Renuncia a sprints, estimaciones, épicas, backlog priorizado e informes.

**P5. ¿Qué es éxito, cuál es el riesgo y qué queda fuera?**
✅ Éxito: a una semana de uso real, el equipo cancela la ronda de "¿en qué estás?" y nadie pide que vuelva. Riesgo #1: que la información se quede vieja; la mitigación es que actualizar cueste dos clics. Construir una vertical fina y terminada, no andamiaje amplio. Fuera: notificaciones push, Slack, roles/permisos avanzados, analítica/reporting, comentarios.

**Huecos que la ficha no cubría, ya decididos por mí:**
- ✅ Estados: Pendiente, En curso, Testing, Bloqueado y Hecha. *Bloqueado* solo marca la tarea; no se gestiona la causa ni se resuelve el bloqueo desde la herramienta.
- ✅ Solo el título es obligatorio y la tarea nace en *Pendiente*. Puede estar sin responsable mientras siga en *Pendiente*; para pasar a otro estado necesita responsable y lo conserva.
- ✅ Un único responsable por tarea.
- ✅ Se ve el estado actual y el responsable de cada tarea, más un resumen sencillo de los cambios recientes desde que dejé de mirar, sin historial completo de ediciones.
- ✅ Se puede editar, cambiar de estado y borrar. El borrado pide confirmación, para quitar tareas creadas por error o duplicadas.
- ✅ La fecha de vencimiento es un día, sin hora; "vencida" es solo una marca visual, sin avisos.
- ✅ Filtro solo por estado.

## 3. El alcance

### Problema
En un equipo remoto nadie ve en qué está cada uno sin interrumpirle. Eso cuesta media daily en la ronda de "¿en qué estás?", interrupciones constantes por chat y, en el peor caso, trabajo duplicado.

### Usuarios
Pares de equipos remotos pequeños (3–10 personas) con roles planos, que escriben y leen el estado ellos mismos. Primer usuario: un equipo SaaS de 6 personas en 3 husos horarios (caso de estudio).

### Propuesta de valor
Una lista compartida donde cambiar el estado cuesta dos clics y el resto lo ve sin refrescar ni preguntar. Quien la actualiza cobra al momento: es su cola de trabajo y deja de recibir interrupciones. Sustituye al gestor de tareas.

### Alcance (lo que entra)
1. ✅ Entrar con la cuenta del equipo (login y logout, ya construidos).
2. ✅ Lista compartida con título, responsable, estado y fecha de cada tarea, con marca visual de vencida.
3. ✅ Crear una tarea con solo el título; nace en *Pendiente* y sin responsable.
4. ✅ Editar título, responsable y fecha.
5. ✅ Cambiar de estado en dos clics, con la regla del responsable para salir de *Pendiente*.
6. ✅ Borrar una tarea con confirmación previa.
7. ✅ Filtrar por estado.
8. ✅ Ver los cambios de los demás sin refrescar.
9. ✅ Resumen sencillo de lo que se ha movido desde la última vez que miré.
   - 🟡 Qué entra en el resumen: creaciones, cambios de estado, cambios de responsable y borrados, solo el último cambio de cada tarea.
   - 🟡 "Última vez que miré" se cuenta por persona y no se enseña a nadie más (para que no sea un indicador de presencia).

> ⏳ **Recorte propio: pendiente.** Todavía no he recortado la lista de la IA.

### NO-alcance (lo que queda fuera, y por qué)

**Confirmado por mí (lista de fuera del MVP); el porqué lo redactó la IA y está 🟡 sin revisar:**
- ✅ **Notificaciones push.** 🟡 La señal es un resumen que espera; un aviso reintroduce la interrupción que se quiere quitar.
- ✅ **Integración con Slack.** 🟡 FlowSync es donde se hace el trabajo; otro canal empuja a la doble actualización.
- ✅ **Roles y permisos avanzados.** 🟡 Los roles son planos; una jerarquía no ayuda a validar si desaparece la ronda de "¿en qué estás?".
- ✅ **Analítica e informes.** 🟡 El valor es para los pares; no hay reporte hacia arriba y un informe no cambia qué tarea coger.
- ✅ **Comentarios en tareas.** 🟡 Convierten la tarea en chat ("tiempo real" no es chat) y abren la gestión de bloqueos.

**Confirmado por la ficha de hechos o por mis respuestas:**
- ✅ **Gestionar bloqueos (causa, dependencias).** *Bloqueado* es solo una marca; esa parte de la daily sigue.
- ✅ **Presencia e indicadores de actividad.** El estado es de la tarea, no de la persona; lo otro es vigilancia.
- ✅ **Historial completo de ediciones.** Basta con un resumen sencillo de cambios recientes.
- ✅ **Varios equipos o espacios, gente en más de uno.** Un único espacio compartido; se anota como supuesto.
- ✅ **Estado derivado de Git, CI o calendario.** Lo teclea la persona; integrarlo es otro producto, con OAuth de terceros.
- ✅ **Importar o sincronizar con otro gestor.** FlowSync lo sustituye; convivir exige doble actualización.
- ✅ **Sprints, estimaciones, épicas, backlog priorizado.** Renuncia explícita; un equipo que lo necesite no es nuestro usuario.
- ✅ **Varios responsables por tarea.** Uno solo.
- ✅ **Filtrar por responsable y buscar.** Solo filtro por estado.
- ✅ **Edición simultánea del mismo documento.** "Tiempo real" es ver cambios de estado, no colaborar a la vez.

**Propuesto por la IA, sin revisar:**
- 🟡 **Recordatorios de vencimiento.** Son avisos que interrumpen; la marca visual basta.
- 🟡 **Prioridades y etiquetas.** Alargan la creación más allá de unos segundos.
- 🟡 **Descripción larga, subtareas, adjuntos, checklists.** No ayudan a saber quién está en qué.
- 🟡 **Estados configurables o vista kanban.** Configurar flujos es el rollo que se rechaza; una sola vista basta para validar.
- 🟡 **Papelera o deshacer un borrado.** La confirmación previa cubre el error típico; se revisa si en la prueba se borra algo por accidente.
- 🟡 **Invitaciones y registro abierto.** Las cuentas se preparan antes de la prueba; el registro existe en el código pero no forma parte del recorrido.

### Supuestos
- ✅ Un único espacio compartido; cada instalación es de un solo equipo.
- ✅ La prueba se hace con un equipo conocido y cuentas creadas de antemano.

### Tensiones señaladas por la IA (🟡 sin revisar)
- Responsable obligatorio para salir de *Pendiente* frente a "sin campos obligatorios": es un clic extra justo al empezar una tarea, y puede hacer que el estado se quede viejo (riesgo #1).
- *Bloqueado* puede generar la expectativa de que la herramienta ayuda con los bloqueos, que el MVP no resuelve.
- Si el borrado no aparece en el resumen de cambios, la tarea en curso de otra persona puede desaparecer sin que nadie lo note.

---

## Parte B: las tres líneas

1. **Los dos números:** 9 propuestos → 9 mantenidos. No he realizado un recorte adicional de la lista propuesta por la IA.

2. **Tres cosas que dejo fuera:** varios responsables por tarea, filtro por responsable e historial completo de ediciones. He confirmado estas exclusiones, pero no llegué a justificar por escrito qué hipótesis no ayuda a validar cada una. Esa reflexión queda pendiente.

3. **La exclusión de la que menos segura estoy:** no llegué a identificarla ni a concretar qué tendría que pasar para incluirla. Queda pendiente.


