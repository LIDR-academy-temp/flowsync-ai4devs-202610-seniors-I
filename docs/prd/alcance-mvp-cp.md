# FlowSync — Alcance del MVP

> Enunciado de partida: "Quiero que FlowSync sea una herramienta para que los equipos remotos sepan en qué está trabajando cada uno sin tener que hacer reuniones de sincronización. Algo tipo tareas compartidas pero más en tiempo real y menos rollo que Jira."

## Problema

En un equipo remoto pequeño, nadie sabe en qué está trabajando cada compañero sin preguntárselo. Para enterarse hay que dedicar la ronda de "¿en qué estás?" de la daily, que se come la mitad de sus 15 minutos, o interrumpir a alguien por chat. Cuando nadie pregunta, el desconocimiento sale caro: dos personas empiezan el mismo trabajo sin saberlo y se pierden días (en el caso de estudio, dos personas tocaron el mismo módulo la misma semana y se perdieron dos días). Y quien busca qué hacer a continuación no sabe qué está libre y qué ya ha cogido otro.

## Usuarios

**A quién va dirigido:** a los miembros de un equipo remoto pequeño (de 3 a 10 personas), con roles planos y repartido en varios husos horarios. Cada persona tiene dos papeles a la vez: registra su propio trabajo y consulta el de los demás para decidir qué hacer. El caso de estudio es un equipo de 6 personas de producto SaaS, en 3 husos horarios, que hoy usa un gestor de tareas pesado y una daily de 15 minutos por videollamada.

**A quién ignora esta definición:**

- **Miembros que no son desarrolladores** dentro del mismo equipo (diseño, producto). Pueden usarlo, pero los casos de uso se pensaron desde el desarrollo.
- **Quien está bloqueado.** La parte de bloqueos de la daily sigue existiendo y este producto no le ayuda.
- **Quien no actualiza.** El producto supone que cada persona mantiene sus tareas al día. Para quien no lo hace no aporta nada, y además degrada la información del resto.
- **Quien trabaja en más de un equipo.** No tiene sitio en un espacio único.
- **Quien llega nuevo al equipo.** Ve el estado actual, pero no el contexto ni la historia de por qué las cosas están así.

**Quién NO es el usuario:**

- Un responsable o manager que quiere visibilidad hacia arriba o informes.
- Equipos que necesitan sprints, estimaciones, épicas o un backlog priorizado.
- Organizaciones con varios equipos, o equipos de más de 10 personas.
- Equipos que quieren seguir con su gestor de tareas actual y usar FlowSync en paralelo.

## Propuesta de valor

Para un equipo remoto pequeño, FlowSync es la lista de trabajo compartida donde cada persona ve de un vistazo qué está cogido y por quién, y qué está libre, sin preguntar ni esperar a la daily. Actualizarla cuesta dos clics, y quien la actualiza también gana: la usa como su propia cola de trabajo y deja de recibir interrupciones de "¿cómo va?".

FlowSync es donde se hace el trabajo, no donde se cuenta: sustituye al gestor de tareas en lugar de convivir con él.

**Criterio de éxito:** tras una semana de uso real, el equipo cancela la ronda de "¿en qué estás?" de la daily y nadie pide que vuelva. Si la siguen haciendo igual, no funcionó. La daily no desaparece entera: la parte de bloqueos se mantiene.

**Riesgo principal:** que la información se quede vieja. Si eso pasa, el producto pierde el sentido. La mitigación es que actualizar cueste dos clics, no obligar a nadie.

## Alcance (MoSCoW)

La categoría Won't have está en la sección [NO-alcance](#no-alcance).

### Must have (sin esto no hay MVP)

1. **Registro, inicio y cierre de sesión.** Ya existen en el repositorio y se reutilizan tal cual: sin identidad no hay responsable de las tareas.
2. **Crear una tarea indicando solo el título.** Es el punto de entrada y lo que hace que FlowSync sustituya al gestor de tareas en vez de convivir con él.
3. **Lista compartida con todas las tareas**, que muestra para cada una el título, el responsable (o "Sin asignar") y el estado, ordenada por la última actualización. Responde a "¿quién está en qué?", y el orden cubre el caso de "vuelvo y veo qué se ha movido".
4. **Cambiar el estado entre Pendiente, En curso y Hecha en un máximo de dos clics.** Es lo que mitiga el riesgo principal: si actualizar cuesta más, no se actualiza.
5. **Coger o soltar una tarea uno mismo.** Permite decir "esto ya lo estoy tocando yo", que es exactamente lo que habría evitado el episodio de los dos días perdidos.

### Should have (importante, pero el MVP sobrevive sin ello)

1. **Ver los cambios sin refrescar la página**, mediante una consulta periódica. El caso principal ("llego por la mañana y veo qué se ha movido") se cumple solo con abrir la lista. La actualización en vivo solo marca la diferencia cuando dos personas cogen la misma tarea con minutos de diferencia, y el riesgo principal es que nadie actualice, no que el cambio tarde en llegar. Es lo primero que se añade si en el uso real aparecen colisiones.
2. **Filtrar la lista por estado.** Con un equipo de 3 a 10 personas y la lista ordenada por la última actualización, el estado del equipo se ve igual sin filtro.
3. **Asignar una tarea a otra persona.** El estado lo teclea quien hace la tarea; repartir trabajo a otros es un comportamiento más cercano a un lead y ningún caso de uso lo pide. Sin él no hace falta un selector de usuarios.
4. **Mostrar cuándo se actualizó cada tarea por última vez** ("hace 2 h"). Sirve para detectar información vieja, pero el orden de la lista ya responde a qué se ha movido.
5. **Fecha de vencimiento opcional y marca de tarea vencida.** Responde a "¿qué va tarde?", no a "¿quién está en qué?". Recortarla no impide cancelar la ronda de la daily.
6. **Editar el título de una tarea.** Corregir una errata tiene valor, pero no cambia ninguna decisión del equipo. Mientras no esté, se marca la tarea como Hecha y se crea otra.

### Could have (agradable si sobra tiempo)

1. **Filtro "mis tareas".** Ayuda a usar la lista como cola de trabajo personal, aunque eso ya se ve buscando el propio nombre.
2. **Resaltar lo que cambió desde tu última visita.** Encaja con equipos en varios husos horarios, pero exige guardar por usuario cuándo entró por última vez, y el orden por última actualización ya cubre lo esencial.
3. **Estados vacíos y textos de ayuda la primera vez que se usa.** Mejoran la adopción, pero no cambian el funcionamiento.

## NO-alcance

Won't have: fuera del MVP, y a propósito.

- **Notificaciones push e integración con Slack.** La señal tiene que esperar a que la consultes, no interrumpirte.
- **Indicadores de presencia o de actividad** (quién está conectado, quién está escribiendo). El estado es de la tarea, no de la persona; lo otro es vigilancia.
- **Roles y permisos avanzados.** Los roles son planos: todos ven y editan lo mismo.
- **Analítica, informes y reporting.** No hay nadie aguas arriba que vaya a consumirlos.
- **Comentarios en las tareas, chat, videollamada y edición simultánea.** No forman parte de "tiempo real" tal como se ha definido.
- **Sprints, estimaciones, épicas y backlog priorizado.** Un equipo que los necesite no es el usuario.
- **Campos extra en la tarea** (descripción, etiquetas, subtareas, adjuntos, prioridad). Cada campo añade fricción y va contra los dos clics.
- **Estados o flujos configurables.** Es justo el "rollo" de Jira que se quiere evitar.
- **Varios equipos o espacios, e invitaciones o restricción de acceso.** Hay un solo espacio compartido (ver supuestos).
- **Integraciones para derivar el estado** (Git o PRs, CI, calendario) **e importar tareas desde otras herramientas.** Sería otro producto, con integraciones y OAuth de terceros; además, FlowSync crea las tareas, no las lee de otro sitio.
- **Borrar tareas.** Así no se pierde información por un error y se conserva el rastro de lo que se movió. Lo que ya no aplica se marca como Hecha.
- **Gestión de bloqueos.** La parte de bloqueos de la daily se mantiene y este MVP no la resuelve.
- **Conexiones persistentes** (WebSockets o SSE). Una consulta periódica cubre la frescura que se necesita sin añadir infraestructura.

## Supuestos

- **S1. Frescura sin infraestructura nueva.** Cuando se implemente la actualización en vivo (Should 1), será una consulta periódica cada 15–30 segundos mientras la lista está abierta, y al volver a la pestaña.
- **S2. Solo el título es obligatorio.** El título no puede estar vacío y tiene una longitud máxima razonable. El estado empieza en Pendiente. El responsable es opcional y, si se pone, es un usuario registrado. La fecha de vencimiento (Should 5) es opcional, es solo un día sin hora, y una tarea está vencida cuando su fecha es anterior a hoy en el día local de quien la mira.
- **S3. Tres estados fijos, sin configuración:** Pendiente, En curso y Hecha. Una tarea está libre si no tiene responsable y no está hecha.
- **S4. Todos pueden hacer todo, salvo borrar.** Cualquier usuario con sesión crea tareas, cambia su estado y las coge o suelta. Si dos personas editan la misma tarea, gana la última que guarda.
- **S5. Un único espacio compartido.** Todo usuario registrado entra en él, reutilizando el registro existente y sin invitaciones. El registro queda abierto a quien tenga la URL, cosa aceptable porque es un caso de estudio. Varios equipos separados, o gente en más de uno, quedan fuera del MVP.

## Parte B

### 1. Alcance antes y después del recorte

- Primer corte: 7
- Último corte: 5

### 2. Lo que quedó fuera al ser más estrictos

1. **Ver los cambios sin refrescar la página** (pasa a Should). El caso principal, "llego por la mañana o vuelvo de una reunión y veo qué se ha movido", se cumple solo con abrir la lista, porque se carga con datos frescos. La actualización en vivo solo marca la diferencia cuando dos personas cogen la misma tarea con minutos de diferencia y una tenía la lista abierta desde antes; con 3 husos horarios, esa ventana de solapamiento es pequeña. Además, el riesgo número 1 es que la información esté vieja porque nadie la actualiza, no que tarde en llegar, y eso no lo arregla la consulta periódica. Si en el uso real aparecen colisiones, es lo primero que se añade, y es barato.
2. **Asignar una tarea a otra persona** (pasa a Should; en el Must queda solo coger o soltar una tarea uno mismo). El estado lo teclea la persona que hace la tarea. Asignar trabajo a otro es reparto de trabajo, un comportamiento más cercano a un lead, y ningún caso de uso lo pide. "Cogerla yo" es exactamente lo que habría evitado el episodio de los dos días perdidos, y con una sola acción no hace falta un selector de usuarios, lo que mantiene los dos clics.
3. **Mostrar cuándo se actualizó cada tarea** ("hace 2 h") (pasa a Should; se mantiene el orden por última actualización). El orden ya responde a "¿qué se ha movido?", porque lo reciente queda arriba. La hora sirve para detectar información vieja, que es útil para medir el riesgo número 1, pero no para decidir qué coger.

### 3. El recorte que genera más inseguridad

**Opinión del usuario:** la que genera más incomodidad es la de ver los cambios sin refrescar la página, porque va contra su definición de "tiempo real". Aun así, los argumentos le parecen sólidos para el escenario real de este equipo.

**Opinión de la IA:** coincide en que es la más insegura, y por un motivo adicional que debilita su propio argumento. La propuesta de valor dice que cada persona usa la lista como su cola de trabajo y la mira para decidir qué coge. Eso significa que la lista se abre por la mañana y se queda abierta durante horas. Sin actualización en vivo, la decisión de qué coger se toma sobre una foto de esa mañana, y la colisión de los dos días perdidos puede repetirse justo en las horas de solapamiento entre husos, cuando más gente está trabajando a la vez. El argumento de "basta con abrir la lista" cubre bien la llegada por la mañana, pero no el uso continuado que la propia propuesta de valor describe.

Hay una salida que no exige devolverla al Must: que el servidor rechace coger una tarea que ya tiene responsable y avise de quién la tiene. Eso evita la colisión aunque la lista esté desactualizada, cuesta mucho menos que la actualización en vivo y no va contra ningún supuesto.
