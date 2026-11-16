# FlowSync: alcance del MVP

BPP · 15 de noviembre de 2026 · Borrador

## 1. El terreno que ya existe

FlowSync tiene hoy una sola capability: **la cuenta de usuario**. Incluye registro, inicio de sesión, ver el perfil propio y cerrar sesión. El modelo de datos se reduce a los usuarios y sus credenciales de acceso. El frontend ya tiene las pantallas de registro, inicio de sesión y perfil protegido. No existen tareas, equipos ni espacios, así que todo lo que define este documento es nuevo y se apoya en las cuentas que ya existen.

## 2. El interrogatorio, con las respuestas decididas

1. **¿Qué reunión desaparece y qué se rompe hoy?** La ronda de «¿en qué estás?», que ocupa la mitad de una daily de 15 minutos, y las preguntas constantes por chat. Episodio real: dos personas tocaron el mismo módulo la misma semana y se perdieron dos días. La parte de bloqueos de la daily sigue y este MVP no la resuelve.
2. **¿Quién es el usuario y cómo es su equipo?** Equipos remotos de 3 a 10 personas, con roles planos. El valor lo cobran los pares, no un lead. Caso de estudio (no es un cliente real): un equipo SaaS de 6 personas en 3 husos horarios. Hay un único espacio compartido, sin entidad «equipo».
3. **¿Qué se tiene que saber en cinco segundos y qué decisión cambia?** Qué se ha movido desde la última vez que miré, sin refrescar ni preguntar. Con eso decido no empezar algo que otra persona ya está tocando y qué coger después. Es frescura de la tarea, no presencia de la persona. Funciona como un resumen que espera, no como un aviso que interrumpe.
4. **¿Cuánto esfuerzo se acepta para mantener el estado al día y qué sobra de Jira?** Dos clics sobre una lista ya abierta, sin sprints, estimaciones ni flujos que configurar. Lo teclea quien hace la tarea, que también cobra: la lista es su cola de trabajo. FlowSync sustituye al gestor de tareas, no convive con él.
5. **¿Cuál es la versión más pequeña y cómo se sabe que funciona?** Una vertical fina terminada de punta a punta. Funciona si el equipo deja de hacer la ronda de «¿en qué estás?» en una semana y nadie pide que vuelva.

## 3. El alcance

### Problema

En un equipo remoto pequeño nadie ve quién está con qué sin interrumpir a alguien. Por eso se duplica trabajo y la mitad de la daily se va en ponerse al día.

### Usuarios

Pares de un equipo remoto de 3 a 10 personas, sin jerarquía. Todos ven y editan lo mismo.

### Propuesta de valor

FlowSync es la lista de trabajo del equipo: donde se hace el trabajo, no donde se cuenta. Cambiar el estado de tu tarea cuesta dos clics y el resto lo ve sin preguntar.

El MVP existe para validar tres hipótesis:

- **H1.** Si el estado de cada tarea se ve fresco y de un vistazo, el equipo deja de hacer la ronda de «¿en qué estás?».
- **H2.** La gente mantiene el estado al día si cuesta dos clics y la lista es su propia cola de trabajo (riesgo #1).
- **H3.** Ver lo que otra persona tiene en curso evita empezar trabajo duplicado.

### Alcance

1. **Crear una tarea en segundos.** Solo el título es obligatorio. El responsable y la fecha de vencimiento son opcionales.
2. **Asignar, reasignar o soltar una tarea.** Puedo coger una tarea libre, dársela a otra persona o dejarla sin responsable.
3. **Cambiar el estado en dos clics** desde la lista: *Por hacer*, *En curso* o *Hecha*.
4. **Ver qué está libre y qué tiene cada persona en curso.** Una tarea sin responsable y sin terminar está libre: es lo siguiente que se puede coger sin pisar a nadie. Lo que otra persona tiene *En curso* no se toca.
5. **Distinguir de un vistazo** las tareas que se han pasado de fecha.
6. **Filtrar la lista por estado.**
7. **Ver los cambios de los demás sin refrescar.** La lista se ordena por el cambio más reciente.
8. **Editar y borrar** tareas.

### NO-alcance

Cada exclusión lleva al lado qué hipótesis no ayuda a validar.

- **Notificaciones push.** H1 se valida con un resumen que espera. Un aviso que interrumpe vuelve a meter la interrupción que el producto quiere quitar.
- **Integración con Slack.** Ninguna hipótesis la necesita, y devuelve el estado al canal del que queremos sacar el «¿en qué estás?». Además, dos sitios donde actualizar es como muere esta categoría.
- **Derivar el estado de Git, PRs, CI o calendario.** H2 pregunta si teclear el estado cuesta lo bastante poco. Derivarlo escondería el riesgo en vez de medirlo, y es otro producto, con integraciones y OAuth de terceros.
- **Roles y permisos.** Es un equipo de pares sin jerarquía. Ninguna hipótesis trata de control, y cada permiso añade fricción en contra de H2.
- **Varios equipos o espacios.** El caso es un solo equipo y ninguna hipótesis depende de separar equipos. Se anota como supuesto (S3).
- **Presencia, «quién está conectado» e indicadores de actividad.** El estado es de la tarea, no de la persona. Es vigilancia y erosiona la confianza que H2 necesita.
- **Comentarios en tareas.** Convierten la lista en una conversación. H1 necesita una señal de estado, no un hilo de discusión.
- **Analítica e informes.** No hay reporte hacia arriba y nadie del caso cobra ese valor.
- **Sprints, estimaciones, épicas y backlog priorizado.** Son el «rollo» que el producto quita. Un equipo que los necesite no es nuestro usuario.
- **Resolver bloqueos**, la otra mitad de la daily. Mezclarlo impediría saber si la ronda cayó gracias a la lista (H1).
- **Estados configurables o más de tres.** Configurar flujos es justo lo que sobra de Jira, y tres estados bastan para H3.
- **Varios responsables por tarea o trabajo en pareja.** Un responsable como máximo es lo que hace legible «quién está con qué» (H1).
- **Vista de «novedades desde tu última visita».** El orden por cambio reciente ya cubre el caso de la mañana (S4). Entra si la demo muestra que no basta.
- **Chat, videollamada y edición simultánea.** «Tiempo real» aquí significa estado fresco, no colaboración en directo.

### Supuestos y decisiones

- **S1. Tres estados visibles:** *Por hacer*, *En curso* y *Hecha*. *En curso* es la señal que evita la colisión.
- **S2. Cada tarea tiene un responsable o ninguno.** Sin responsable quiere decir libre.
- **S3. Cualquiera que se registre entra en el espacio compartido y lo ve todo.** Vale para el caso de estudio, pero no para un despliegue público.
- **S4.** El caso «vuelvo y veo qué se ha movido» se cubre ordenando la lista por el cambio más reciente.
- **S5. El criterio de una semana no se puede medir con un caso de estudio.** Lo sustituye una demo del recorrido completo: llego por la mañana, veo qué se movió, cojo lo siguiente sin preguntar y otra persona lo ve al momento.

**Decisión revertida:** se probó exigir siempre un responsable y se descartó. Chocaba con dos puntos de la ficha: «sin campos obligatorios» y «elegir lo siguiente sabiendo qué está libre». Además, obligaba a asignar tareas que nadie había aceptado. Está en la [parte B](parte-b-bpp.md).

### Riesgos

1. **Que la información se quede vieja** (riesgo #1). Mitigación: ningún cambio de estado pide más de dos clics. Es un criterio de diseño para cada pantalla.
2. **Trabajo que empieza sin tarea.** La colisión del episodio se repite si alguien empieza sin tener una tarea en curso a su nombre. Es una norma del equipo y una condición de adopción, no una función.
3. **Asignar una tarea a otra persona sin hablarlo.** Como todos editan todo, puede volver el «¿esto me lo has puesto a mí?». Mitigación: quien la recibe la suelta con la misma facilidad.
4. **El tiempo real es la pieza más cara** y con 3 husos horarios rinde sobre todo en las horas de solape. Si hay que recortar, se baja a una lista actualizada al abrirla, y las hipótesis siguen siendo comprobables.

### Métricas de éxito

- **Para el usuario:** la ronda de «¿en qué estás?» desaparece de la daily porque el estado se ve de un vistazo.
- **Con uso real:** en una semana el equipo cancela esa ronda y nadie pide que vuelva. Si la siguen haciendo igual, no funcionó.
- **En este ejercicio:** la demo del recorrido de S5.

---

## Parte B

Las tres líneas están en [parte-b-bpp.md](parte-b-bpp.md).
