# Alcance del MVP — FlowSync

## 1. El terreno que ya existe

**Mi resumen:**
- **Capabilities:** Backend en puerto 3333 con login. Frontend en puerto 5173 con gestión de sesión persistente, cliente HTTP y errores (`api.ts`) que centraliza las 4 llamadas (registro, login, perfil y logout), devuelve `{ data }` y traduce errores; rutas públicas de acceso y ruta protegida de perfil.
- **Modelo:** SQLite. En AdonisJS 7 + Lucid 22, las migraciones generan el esquema del cual extienden los modelos. Existen 2 entidades de persistencia (usuarios y tokens de acceso) y 1 modelo de dominio (`User`).

**Resumen devuelto por el agente:**
FlowSync cuenta actualmente solo con el módulo base de autenticación y perfil de usuario (sin entidades de tareas ni equipos aún), dividido en un backend AdonisJS 7 y un frontend React 19. Sus 4 funcionalidades son: registro, login, consulta de perfil y logout, con vistas de acceso, registro y perfil. El modelo de datos en SQLite contempla únicamente al usuario (identificador, nombre completo, email único, contraseña hasheada, fechas y cálculo de iniciales) y sus tokens de acceso asociados con borrado en cascada.

---

## 2. El interrogatorio

1. **Foco en la persona (standup asíncrono) vs. Foco en el trabajo (tablero compartido):** Cuando alguien entra a FlowSync para no hacer una reunión, ¿qué necesita responder de un vistazo: "¿en qué está enfocado cada compañero ahora mismo y si tiene algún bloqueo?" (centrado en las personas y su día) o "¿qué tareas del equipo están pendientes, en curso y terminadas?" (un listado/tablero común del que la gente va tomando trabajo)?
2. **Estructura de equipo y visibilidad:** ¿Todos los usuarios que entran en FlowSync forman parte de un único equipo compartido donde todos ven y editan todo por igual, o necesitan agruparse en distintos equipos/espacios privados o tener roles diferenciados (ej. líder vs. miembro)?
3. **Ciclo de vida y caducidad de las tareas ("menos rollo que Jira"):** ¿Cuál es el recorrido mínimo de una tarea (por ejemplo, solo Pendiente → En curso → Hecho, ¿o hace falta un estado de Bloqueado?) y qué pasa con el límite de tareas "En curso" por persona o con las tareas terminadas al pasar los días?
4. **Expectativa real de "en tiempo real":** Cuando hablas de que sea "más en tiempo real", ¿significa que si un compañero cambia de tarea o se bloquea yo debo verlo cambiar al instante en mi pantalla en vivo (sin recargar la página), o te refieres a que el estado esté siempre vivo durante el día en lugar de ser una foto fija de una reunión matutina?
5. **Frontera del alcance para la primera entrega (qué dejamos fuera):** Para mantener la herramienta ultraligera, ¿confirmamos que en esta primera versión quedan fuera estimaciones, fechas límite, subtareas, etiquetas, hilos de comentarios y notificaciones externas, o hay alguno de esos elementos que sea indispensable desde el día uno?

---

## 3. El alcance en cinco bloques

### [Problema]
En equipos remotos pequeños, nadie sabe en qué está trabajando el resto sin interrumpir por chat ("¿en qué estás?") o esperar a la reunión diaria de sincronización (daily), donde la ronda de actualización de estado consume la mitad de los 15 minutos. Esta falta de visibilidad asíncrona provoca dos costes directos entre pares: interrupciones constantes que rompen el foco y trabajo duplicado o colisiones (como dos desarrolladores tocando el mismo módulo la misma semana sin saberlo, perdiendo días de trabajo). Los gestores tradicionales tipo Jira fracasan en resolver esto porque imponen tanta fricción de campos y configuración que la información deja de actualizarse y pierde frescura.

### [Usuarios]
- **Perfil de equipo:** Equipos remotos pequeños de producto o ingeniería (de 3 a 10 personas; caso de estudio base: 6 personas distribuidas en 3 husos horarios).
- **Quién captura el valor:** Los pares individuales (desarrolladores/makers) que necesitan saber qué está libre para elegir su siguiente tarea sin pisar el trabajo de otro y sin sufrir interrupciones por chat. No está orientado a managers ni a generar reportes hacia arriba.
- **Modelo de relación y permisos:** Estructura 100 % plana. `[Supuesto]` Toda persona registrada en la instancia pertenece a un único espacio de trabajo compartido y tiene exactamente los mismos permisos para ver, crear y modificar cualquier tarea.

### [Propuesta de valor]
FlowSync sustituye al gestor de tareas pesado por una lista de trabajo compartida y ultraligera, donde crear una tarea o cambiar su estado cuesta dos clics y cero campos burocráticos.
- Quien ejecuta la tarea la mantiene al día por interés propio: esa misma lista es su cola de trabajo personal y actualizarla le ahorra responder mensajes de seguimiento.
- Quien empieza su jornada o sale de una reunión ve de un vistazo qué está tocando cada compañero, qué está libre y qué ha vencido, permitiendo eliminar por completo la ronda de "¿en qué estás?" de la daily (dejando la reunión únicamente para resolver bloqueos).
- **Criterio de éxito (a 1 semana):** Que el equipo cancele la ronda de estado de la daily y nadie pida que vuelva.

### [Alcance]
Una única vertical funcional terminada de punta a punta sobre un espacio compartido único:
1. **Gestión ultraligera de tareas:** Creación y edición rápida de tareas con solo 4 atributos: título, estado, responsable y fecha de vencimiento. `[Supuesto]` Solo el título es obligatorio al crear la tarea (el estado nace por defecto en Pendiente, y tanto el responsable como la fecha de vencimiento son opcionales para no frenar la captura rápida en dos segundos).
2. **Ciclo de vida cerrado de 3 estados (sin bloqueos):** `[Supuesto]` El flujo se cierra estrictamente en tres estados: Pendiente, En curso y Completada, cambiables con un clic directo desde la lista, y sin límite artificial (WIP limit) de tareas En curso por persona para no introducir burocracia de reglas.
3. **Señal visual de vencimiento:** Indicador visual directo en la lista cuando la fecha de vencimiento de una tarea no completada ya ha pasado (se mantiene dentro del alcance porque, aparte de saber qué hacen los demás para no pisarse, el objetivo es abordar los pendientes y las tareas vencidas son las más urgentes, por lo que es conveniente que destaquen).
4. **Consumo filtrado y limpieza cognitiva:** Filtro rápido por estado para centrarse en lo pendiente o en lo que está en curso. `[Supuesto]` Las tareas Completadas no se archivan ni se borran automáticamente con el paso de los días; simplemente quedan ocultas al filtrar por trabajo activo y siguen accesibles al filtrar por completadas.

### [NO-alcance]
Recorte para proteger la regla de "actualizar en dos clics" y evitar que FlowSync muera por fricción o doble mantenimiento:

- **Frescura en tiempo real sin refrescar el navegador (recortado por mí sobre la propuesta de la IA):** Fuera. Claramente la frescura en tiempo real no iría nunca en un MVP e inclusive para este proyecto no se necesita, porque el interesado en saber el estado actual del resto va y refresca en el momento de requerirlo.
- **Entidad "Equipo", múltiples espacios de trabajo y roles/permisos avanzados:** Fuera. Para un equipo plano de 3–10 personas, gestionar organizaciones, invitaciones por equipo o jerarquías de permisos es andamiaje administrativo que retrasa validar si la lista compartida elimina la ronda de la daily.
- **Estado de "Bloqueado" y gestión de impedimentos:** Fuera. La parte de bloqueos de la daily requiere conversación humana y este MVP renuncia explícitamente a resolverla; añadir un flujo de bloqueos pediría explicar causas y abriría la puerta a hilos de discusión.
- **Presencia de usuario ("quién está conectado", avatares activos o typing indicators):** Fuera por principio de producto. FlowSync da visibilidad sobre el estado de la tarea, no vigilancia sobre la persona.
- **Notificaciones push, alertas sonoras e integración con Slack/chat:** Fuera. El producto busca eliminar interrupciones, no cambiarlas de canal; la señal debe ser un resumen silencioso que espera a que el usuario mire su cola de trabajo.
- **Comentarios en tareas, descripciones ricas, subtareas, etiquetas y adjuntos:** `[Supuesto]` Fuera. Si una tarea requiere debate o documentación extensa, deja de ser una señal rápida de coordinación; meter hilos de comentarios convierte la lista en otro Jira lento de mantener.
- **Sprints, estimaciones (puntos/horas), épicas, prioridades y backlog ordenado:** Fuera. Obligar a estimar o clasificar antes de empezar a trabajar destruye el hábito de actualización en dos segundos, que es el riesgo #1 del producto.
- **Sincronización con herramientas externas (Jira, Linear, GitHub PRs, CI, calendario):** Fuera. FlowSync no convive con otro gestor (la doble actualización mata la adopción) y derivar estados de Git/OAuth es otro producto distinto y mucho más costoso.
- **Analítica, métricas de velocidad, historial de actividad e informes:** Fuera. El valor lo cobran los pares en el día a día para no pisarse el trabajo, no un manager auditando rendimiento.

---

## Parte B — Las tres líneas

1. **Los dos números:** La IA propuso **5** cosas dentro del alcance; después de mi recorte quedaron **4**.
2. **Lo que dejé fuera en mi recorte y por qué:**
   - **Frescura en tiempo real (sin refrescar):** Quité únicamente este punto de los 5 que propuso la IA porque claramente la frescura en tiempo real no iría nunca en un MVP e inclusive para este proyecto no se necesita, ya que el interesado en saber el estado actual del resto va y refresca en el momento de requerirlo. Los otros 4 puntos los mantuve (incluyendo las fechas de vencimiento y su señal visual, porque aparte de saber qué hacen los demás para no pisarse, el objetivo es abordar los pendientes y las vencidas son las más urgentes, por lo que conviene que destaquen). *(El resto de las exclusiones ya habían quedado en el NO-alcance en la primera propuesta de la IA).*
3. **La exclusión de la que menos seguro estoy:**
   - **La exclusión del estado "bloqueado":** Lo dudo bastante porque justamente se quiere acotar la daily para revisar los bloqueos y, si nadie los pudo marcar, terminará perdiéndose tiempo buscándolos (eso tendría que pasar para que decidan agregar ese estado).
   - **La sincronización con herramientas externas (Jira):** Ya vimos en el primer ejercicio que esta app se conectará con Jira dado que es ahí donde maneja los tickets; programar una plataforma de tickets propia no tiene sentido, menos si el objetivo es un MVP.
