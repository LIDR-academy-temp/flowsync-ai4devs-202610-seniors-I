# Alcance del MVP de FlowSync

> Versión aprobada (v3) · 2026-10-25 · Ejercicio Módulo 2 AI4Devs (Spec-Driven Development)

Idea de partida: «Quiero que FlowSync sea una herramienta para que los equipos remotos sepan en qué está trabajando cada uno sin tener que hacer reuniones de sincronización. Algo tipo tareas compartidas pero más en tiempo real y menos rollo que Jira.»

---

## Tramo 1 · El terreno que ya existe

FlowSync solo tiene construida la capa de identidad: registro de cuenta (nombre opcional, email y contraseña), inicio de sesión, consulta del perfil propio y cierre de sesión, en backend y frontend. El modelo de datos contiene una única entidad de negocio, el usuario, más sus credenciales de acceso. No existe nada del núcleo del producto: ni tareas, ni responsable, ni estado, ni fecha de vencimiento, ni vista del equipo, ni actualización en tiempo real. El resto es infraestructura (validación, middleware, componentes de UI) y no hay tests. *No verificado en ejecución: conclusiones obtenidas leyendo el código, sin arrancar la aplicación.*

## Tramo 2 · El interrogatorio (una ronda, respuestas de la ficha de hechos)

1. **¿Qué episodio concreto ha costado tiempo y qué reunión desaparece de verdad?** → Dos personas tocaron el mismo módulo la misma semana sin saberlo: dos días perdidos. Desaparece solo la ronda de «¿en qué estás?» (la mitad de la daily); la parte de bloqueos sigue.
2. **¿Quién es el primer usuario y quién cobra el valor?** → Equipos remotos de 3–10 personas con roles planos. Caso de estudio: equipo SaaS de 6 personas en 3 husos horarios. El valor lo cobran los pares, no un lead.
3. **¿Qué significa «más en tiempo real»?** → Ver cambios de estado de las tareas sin refrescar ni preguntar. Frescura, no presencia; resumen que espera, no aviso que interrumpe.
4. **¿Sustituye o convive con el gestor actual, y de dónde sale el estado?** → Sustituye. El estado lo teclea a mano quien hace la tarea, en segundos. Riesgo #1: que la información se quede vieja.
5. **¿Qué significa éxito y a qué se renuncia?** → Que en una semana de uso real el equipo cancele la ronda de «¿en qué estás?» y nadie pida que vuelva. Renuncia a sprints, estimaciones, épicas, backlog priorizado e informes.

---

## Tramo 3 · El alcance

### 1. Problema

- En un equipo remoto pequeño nadie conoce el estado de los demás sin interrumpir: la ronda diaria de «¿en qué estás?» ocupa la mitad de la daily de 15 minutos y se suma a las preguntas sueltas por chat.
- El coste es de decisión, no solo de tiempo: dos personas tocaron el mismo módulo la misma semana sin saberlo y se perdieron dos días.
- **Fuera del problema:** la parte de bloqueos de la daily sigue existiendo y este MVP no la resuelve.

### 2. Usuarios

- **Quién lo usa:** equipos remotos de 3–10 personas, roles planos (todos ven y editan lo mismo), en un único espacio compartido.
- **Caso de estudio** (no es un cliente real): equipo SaaS de 6 personas en 3 husos horarios, con un gestor de tareas pesado y una daily de 15 minutos por videollamada.
- **Quién recibe el valor:** los propios compañeros, no un lead.
  - Quien va a empezar algo sabe si otra persona ya lo está tocando, o lo asume si está libre.
  - Quien iba a preguntar «¿cómo va?» ya no necesita interrumpir.
  - Quien actualiza gana en el momento: la lista es su cola de trabajo y deja de recibir interrupciones.

### 3. Propuesta de valor

- **El estado del equipo se ve de un vistazo y está al día, sin preguntar a nadie.** Es donde se hace el trabajo, no un informe paralelo.
- Crear una tarea, cambiarle el estado o asumirla cuesta segundos: sin campos obligatorios, sin flujos que configurar, sin sprints ni estimaciones.
- Frescura, no presencia: el estado es de la tarea, no de la persona. La señal es un resumen que espera, no un aviso que interrumpe.
- Única fuente de verdad: FlowSync sustituye al gestor actual, no convive con él.
- **Hipótesis a validar:** si actualizar cuesta dos clics y el estado se ve sin refrescar, el equipo cancela la ronda de «¿en qué estás?» en una semana y nadie pide que vuelva.
- **Riesgo #1:** que la información se quede vieja.

### 4. Alcance del MVP

Ya existe y se reutiliza tal cual (no cuenta como alcance nuevo): crear cuenta, iniciar sesión, ver el perfil y cerrar sesión.

1. **Lista compartida de tareas del equipo.** Una sola vista donde todos ven todas las tareas con título, responsable, estado y fecha de vencimiento.
2. **Crear y gestionar una tarea de forma sencilla.** Al crearla solo el título es imprescindible. El responsable y la fecha de vencimiento se pueden poner al crearla o cambiar después desde la propia tarea. Una tarea sin responsable está libre y cualquiera puede asumirla poniéndose como responsable.
3. **Cambiar el estado de una tarea en uno o dos clics** desde la propia lista. Estados pocos y fijos, no configurables.
4. **Ver qué tareas están vencidas.** La lista muestra la fecha de vencimiento y distingue a simple vista las que han pasado de plazo.
5. **Filtrar la lista por estado** para centrarse en lo pendiente.
6. **Ver los cambios sin refrescar.** Lo que modifican otros aparece en la lista abierta sin recargar y sin avisos que interrumpan.
7. **Ver qué tareas han cambiado de estado desde la última visita.** Al volver a la lista, aparecen marcadas las tareas cuyo estado cambió desde la última vez que la persona miró.

### 5. NO-alcance

Todo lo que sigue queda fuera porque no ayuda a validar la hipótesis (ver el estado sin preguntar, con actualizaciones de dos clics, hasta cancelar la ronda), o porque la pone en peligro al encarecer la actualización o reintroducir interrupciones.

| Excluido | Relación con la hipótesis |
|---|---|
| **Notificaciones push** *(ficha)* | Reintroducen la interrupción que se quiere eliminar. La señal elegida es un resumen que espera. |
| **Integración con Slack** *(ficha)* | Lleva el estado al chat, donde hoy nace el «¿en qué estás?». Crea una segunda fuente de verdad. |
| **Roles y permisos avanzados** *(ficha)* | El usuario es un equipo pequeño y plano. Los permisos añaden pasos sin ayudar a ver el estado. |
| **Analítica e informes** *(ficha)* | El valor lo cobran los pares, no un manager. Medir el pasado no evita empezar algo que otro ya está tocando. |
| **Comentarios en tareas** *(ficha)* | Convierten la tarea en conversación. Para saber quién está en qué y qué está libre bastan responsable y estado. |
| Recordatorios, planificación y gestión compleja de plazos | Basta con ver qué se ha pasado de plazo. Gestionar plazos es planificación, no sincronización. |
| Historial completo de actividad | La pregunta es «¿qué ha cambiado de estado?», no «¿qué pasó exactamente?». Es auditoría y no ayuda a decidir qué coger. |
| Atajo o botón especial de autoasignación | Asumir una tarea libre ya es posible cambiando el responsable. Un atajo no cambia lo que hay que validar. |
| Sprints, estimaciones, épicas y backlog priorizado | Encarecen cada actualización; si actualizar es caro, la información se queda vieja (riesgo #1). |
| Quién está conectado o indicadores de actividad | Es vigilancia, rechazada a propósito. La hipótesis va sobre el estado de las tareas, no la presencia de las personas. |
| Chat, videollamada y edición simultánea | Son formas de sincronizar hablando. La hipótesis es que basta con ver. |
| Derivar el estado de Git, PRs, CI o calendario | Es otro producto, con integraciones de terceros. Para validar basta el estado tecleado a mano. |
| Importar o sincronizar con otro gestor de tareas | Obliga a actualizar dos sitios, que es lo que deja la información vieja. |
| Varios equipos o personas en más de un equipo | El caso de estudio es un solo equipo. Se anota como supuesto; no se construye. |
| Gestión de bloqueos | Esa parte de la daily sigue y el MVP declara que no la resuelve. |

### Supuestos del MVP

- **Un único espacio compartido**, sin entidad «equipo». Cualquier cuenta registrada puede ser responsable de una tarea.
- El caso de estudio es ilustrativo, no un cliente real: nada de este documento está validado con usuarios.
- El estado lo actualiza a mano quien hace la tarea; nada obliga a hacerlo. La única mitigación del riesgo #1 es que cueste dos clics.
- Los estados son un conjunto corto y fijo; sus nombres están pendientes de decidir.

### Cuestiones abiertas (para los criterios de aceptación)

- La funcionalidad 7 no marca cambios de responsable ni tareas nuevas: si alguien asume una tarea libre mientras estoy fuera, no se señala.
- Qué cuenta como «visita» para dar por vistos los cambios.
- Si corregir el título forma parte de la gestión sencilla de la funcionalidad 2.
- Qué ve el usuario si dos personas asumen a la vez la misma tarea libre (el episodio de los dos días perdidos).

---

## Parte B · Las tres líneas

1. **Números:** el agente propuso **8** funcionalidades; tras los recortes quedan **7** bloques funcionales. La reducción de 8 a 7 es una **agrupación**, no una eliminación: asignar o cambiar el responsable (y la edición de la fecha) pasó a formar parte de «crear y gestionar una tarea». Lo que sí se recortó de verdad fue el atajo de autoasignación, el historial completo y la gestión avanzada de plazos, y la señal de «cambios desde la última visita» quedó limitada a cambios de estado. En la v2 llegué a eliminar la reasignación de responsable; la restauré en la v3 al ver que contradecía la propia hipótesis («elegir lo siguiente sabiendo qué está libre»).

2. **Tres exclusiones y la hipótesis que no ayudan a validar:**
   - *Notificaciones push:* la hipótesis es que un resumen que espera elimina interrupciones; un aviso push es una interrupción, así que trabajaría en contra de lo que queremos demostrar.
   - *Comentarios en tareas:* la hipótesis es que basta con ver responsable y estado para no tener que preguntar; los comentarios reabren la conversación dentro de la herramienta y no cambian la decisión de qué coger.
   - *Historial completo de actividad:* la decisión que cambia es «qué está libre y qué está en marcha ahora»; saber exactamente quién cambió qué y cuándo es auditoría y no acerca la cancelación de la ronda.

3. **La exclusión de la que menos seguro estoy:** limitar la señal de «cambios desde la última visita» a cambios de estado, dejando fuera cambios de responsable y tareas nuevas. Se contradicen lo barato frente a lo que valida: queremos una señal mínima y sin historial, pero la decisión clave es «elegir lo siguiente sabiendo qué está libre», y que alguien asuma una tarea mientras estoy fuera es justo un cambio de disponibilidad que no se marca. La reconsideraría si, durante la semana de uso real con un equipo, se repitieran casos de dos personas asumiendo la misma tarea o siguieran las preguntas de «¿quién ha cogido X?» pese a usar la lista. Hoy no tenemos esa evidencia: el producto no está validado.
