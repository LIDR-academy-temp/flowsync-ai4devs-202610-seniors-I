# Alcance del MVP de FlowSync

## 1. El terreno que ya existe

FlowSync hoy es solo un esqueleto de autenticación: alta de cuenta, login, perfil y logout, con API por tokens y una interfaz en castellano de tres pantallas. El modelo de datos son los usuarios y sus tokens de acceso. No existe nada del producto: ni tareas, ni estados, ni responsables, ni fechas, ni espacio compartido. Lo único reutilizable es el usuario, que sirve como responsable de una tarea.

## 2. El interrogatorio

Una ronda de cinco preguntas (dolor, quién cobra el valor, qué desaparece, "tiempo real" y "menos rollo que Jira", fronteras y éxito), respondidas con la ficha de hechos del ejercicio. Supuestos que declaró la IA: acceso abierto al único espacio; estados fijos y pequeños; responsable único y reasignable; edición plana para todos; "qué se movió" sin historial; vencida solo como señal visual; cuentas existentes reutilizadas.

## 3. El alcance

**Problema.** En equipos remotos pequeños nadie ve en qué está cada uno sin interrumpir a alguien. La daily gasta la mitad del tiempo en la ronda de "¿en qué estás?", y dos personas pueden acabar tocando lo mismo sin saberlo.

**Usuarios.** Equipos remotos de 3 a 10 personas, con roles planos. Caso de estudio (no cliente real): equipo de producto SaaS de 6 personas en 3 husos horarios.

**Propuesta de valor.** Una lista de tareas compartida donde el estado se actualiza en dos clics y todo el equipo lo ve sin refrescar. Sustituye a la ronda de "¿en qué estás?" y evita empezar lo que otro ya está tocando. Riesgo nº 1 a validar: que la información no se quede vieja.

**Alcance (8).**

1. Cuenta con registro y login (ya existe).
2. Un único espacio compartido para todos.
3. Crear tarea con título, responsable, estado y fecha.
4. Cambiar el estado en dos clics.
5. Reasignar el responsable.
6. Editar título y fecha.
7. Filtrar la lista por estado.
8. La lista se actualiza sola, sin refrescar.

**NO-alcance (16).**

1. Notificaciones push: no valida que ver la lista baste, y contradice "resumen que espera".
2. Integración con Slack: no valida el valor central y añade una segunda vía de actualización.
3. Roles y permisos: no valida nada con equipos de 3 a 10 personas.
4. Analítica e informes: no tiene lector, porque no hay reporte hacia arriba.
5. Comentarios en tareas: convierte la herramienta en chat, y la hipótesis es estado, no conversación.
6. Estado derivado de Git, CI o calendario: valida otro producto, con OAuth de terceros.
7. Varios equipos o pertenencia múltiple: el caso de estudio es un solo equipo.
8. Presencia ("quién está conectado"): es vigilancia y se rechaza a propósito.
9. Historial de actividad: duplica el "qué se movió" y obliga a diseñar un registro.
10. Sprints, estimaciones, épicas y prioridad: sus usuarios no son los nuestros.
11. Etiquetas, adjuntos y descripciones largas: campos extra que rompen "sin campos obligatorios".
12. Búsqueda: con 3 a 10 personas y filtro por estado, la lista cabe en pantalla.
13. Edición de perfil y recuperar contraseña: no tocan la hipótesis de frescura del estado.
14. Borrar tarea: no ayuda a validar que dos clics sustituyen la ronda de "¿en qué estás?". Una tarea equivocada se puede cerrar con un estado.
15. Marca de "cambió desde tu última visita": ver ABAJO, es la exclusión incómoda.
16. Marca visual de tarea vencida: la fecha sigue visible, pero señalar vencidas valida gestión de plazos, no saber quién está en qué.

---

## Las tres líneas

1. **Los dos números.** La IA propuso **11** cosas dentro del alcance. Tras mi recorte quedaron **8**.

2. **Tres cosas que dejé fuera y por qué.**
   - _Borrar tarea:_ No lo incluyo porque no ayuda a validar que ver en qué trabaja cada compañero sustituye a la ronda de "¿en qué estás?"; una tarea equivocada se puede reutilizar cambiando su estado o su título. Entraría si, tras una semana de uso, la lista se llena de tareas obsoletas que molestan al equipo.
   - _Marca de tarea vencida:_ No la incluyo porque es una capa visual que no hace falta para validar en qué está cada compañero; la fecha sí se queda y se puede leer sin marca. Entraría si, tras una semana, el equipo usa la fecha y sigue sin ver de un vistazo qué se ha pasado de plazo.
   - _Marca de "cambió desde tu última visita"_: ver línea 3.

3. **La exclusión de la que menos seguro estoy: "cambió desde tu última visita".** quizás seria interesante saber que ha cambiado desde la ultima vez que se ve el estado de las tareas pero para eso deberia de haber un historico y puede que sea demasiado para un mvp. Solo se ve el estado actual, no qué cambió. Entraría si, tras una semana de uso, el equipo sigue preguntando "¿qué ha cambiado?" porque la lista actual no se lo responde.

> **Incoherencia detectada.** La ficha de hechos define la señal como "llego por la mañana o vuelvo de una reunión y veo qué se ha movido", pero al sacar la marca de última visita el alcance solo permite ver el estado actual, no qué cambió. La propuesta de valor no lo promete (habla de ver el estado "sin refrescar"), así que el documento es coherente consigo mismo, pero no cubre el caso de uso que motivó la señal. Para que cuadre hay que asumir que ese caso queda fuera del MVP o volver a meter la marca.

> **Segunda incoherencia.** El alcance incluye la fecha de la tarea, y la ficha de hechos la justifica "para ver de un vistazo qué se ha pasado de plazo". Al excluir la marca de tarea vencida, la fecha queda como un dato informativo sin función propia. Para que cuadre hay que sacar la fecha del alcance o volver a meter la marca de vencida.
