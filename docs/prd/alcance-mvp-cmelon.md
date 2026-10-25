# Alcance MVP FlowSync — cmelon.

**1. El terreno que ya existe (3-5 líneas).**

FlowSync ahora mismo tiene resuelta la gestión de cuentas (registro, login, ficha de usuario y logout) y nada más. Todavía no existe ningún concepto de tareas, equipos ni proyectos.  
La creación de usuarios ya existe (son los responsables de las tareas). No hay roles ni permisos: todos los usuarios son iguales.


**2. El interrogatorio, con las respuestas ya decididas.** 


####  5 Preguntas  
1. **¿Qué se pierde hoy sin la daily y cómo os enteráis ahora de lo que hace cada uno?** Por ejemplo: bloqueos que tardan en salir, trabajo duplicado, o un responsable que no sabe si se llega a la fecha. ¿Usáis Slack, hilos asíncronos, un Jira que nadie actualiza?

2. **¿Quién va a consultar FlowSync y para qué decisión?** ¿El propio equipo, para coordinarse entre iguales, o un lead o manager que necesita visibilidad sin preguntar? ¿Cómo es un equipo típico: cuántas personas, cuántas zonas horarias, todos en un solo equipo o en varios?

3. **¿Qué tiene que poder saberse de un vistazo sobre otra persona?** ¿Solo en qué está ahora mismo, o también lo que terminó, lo siguiente que va a hacer y si está bloqueada? ¿Y hasta qué punto es "en tiempo real" o basta con que esté al día una vez al día?

4. **¿Qué conseguiría que la gente lo actualice de verdad?** El estado lo escribe cada persona a mano, y por eso Jira acaba desactualizado. ¿Cuánto esfuerzo al día se puede pedir? ¿Hay algo que deba reflejarse solo, o tiene que ser siempre manual y mínimo?

5. **¿Qué tiene que quedar explícitamente fuera para que siga siendo "menos rollo que Jira"?** ¿Estimaciones, sprints, flujos configurables, comentarios, integraciones? ¿Y qué resultado concreto tras unas semanas de uso diría que el MVP ha funcionado, por ejemplo eliminar la daily?


#### Luego de pegarle las respuestas, la IA responde con los supuestos:

Doy por buenas tus respuestas. Lo que sigue es lo que he decidido yo donde no había respuesta. Cada punto es un supuesto que puedes corregir.

## Supuestos

**Tarea**
- **S1.** Solo el título es obligatorio. Responsable, fecha de vencimiento y estado (que empieza en el inicial) son opcionales. Así encaja "sin campos obligatorios" con los cuatro campos que pediste.
- **S2.** Hay tres estados fijos y no configurables: *pendiente → en curso → hecha*. No existe el estado "bloqueada", porque los bloqueos quedan fuera de este MVP.
- **S3.** Cada tarea tiene como mucho un responsable, que debe ser un usuario registrado. No hay responsables múltiples.
- **S4.** "Está libre" significa pendiente y sin responsable. "Coger" una tarea es asignármela y pasarla a en curso, y es la acción de los dos clics.
- **S5.** No hay descripción, etiquetas, prioridad ni subtareas: solo los cuatro campos.
- **S6.** La fecha de vencimiento es un día, sin hora. Una tarea está vencida si su fecha es anterior a hoy según la zona horaria de quien mira la lista y no está hecha.

**Permisos y espacio**
- **S7.** Cualquier usuario autenticado puede crear, editar, reasignar, cambiar de estado o borrar cualquier tarea, como consecuencia de los roles planos.
- **S8.** El registro es abierto: quien se da de alta entra directamente en el espacio único. No hay invitaciones ni control de acceso. Vale para un caso de estudio, no para un uso real.
- **S9.** El borrado es definitivo, sin papelera ni archivo. Las tareas hechas siguen en la lista y se ocultan con el filtro.

**Tiempo real y "qué se ha movido"**
- **S10.** Tiempo real significa que, con la lista abierta, los cambios de otros aparecen en segundos sin recargar. No hace falta que sea instantáneo.
- **S11.** El "resumen que espera" se cubre ordenando la lista por última modificación y mostrando "actualizada hace X". No hay historial de cambios, feed de actividad ni marcador de "desde tu última visita".
- **S12.** Si dos personas cambian la misma tarea casi a la vez, gana el último cambio. Como los demás lo ven en segundos, la colisión se detecta enseguida, pero no se impide.

**Consumo de la lista**
- **S13.** Por defecto la lista muestra las tareas no hechas, y se filtra por estado. No hay filtro por responsable, búsqueda ni otras vistas como un tablero o "mis tareas".
- **S14.** Con como mucho 10 personas y del orden de cientos de tareas, no hace falta paginar.

**Producto y validación**
- **S15.** Es una aplicación web en castellano pensada para escritorio. En móvil debe poder usarse, pero no está optimizada.
- **S16.** La cuenta se queda como está hoy: registro, login, perfil y logout, sin editar el perfil ni recuperar la contraseña.
- **S17.** El criterio de éxito (cancelar la ronda de "¿en qué estás?" y que nadie pida que vuelva) se comprueba hablando con el equipo, no con métricas dentro del producto, porque la analítica está fuera.

## Tensiones que dejo marcadas
- **"Sin campos obligatorios" frente a "título, responsable, estado y fecha":** lo resuelvo con S1. Si el responsable tuviera que ser obligatorio, desaparecería la idea de tarea libre de S4.
- **El dolor principal es el trabajo duplicado, pero S12 no lo impide; solo lo hace visible pronto.** Bloquear que alguien coja una tarea que ya tiene responsable sería otra decisión de producto, y no la he tomado.
- **"Veo qué se ha movido" puede pedir más que S11.** Si hiciera falta saber qué ha cambiado desde mi última visita, habría que añadir historial. Es el supuesto con más riesgo de quedarse corto.


## Decisión mía personal sobre lo entregado por la IA
Mis correcciones: S13 rechazado; se agrega el filtro ‘mis tareas’ porque la lista es la cola de trabajo de quien la actualiza. 
S7 se acota: en el MVP solo se crea, se coge y se cambia el estado; editar y borrar quedan fuera.
El resto, aceptados.


**3. El alcance en cinco bloques.** 

## Problema
En un equipo remoto pequeño nadie ve en qué está cada uno sin interrumpir a alguien. La respuesta llega de dos formas, y las dos cuestan caro: la ronda de "¿en qué estás?" de la daily, que se come la mitad de sus 15 minutos, y las preguntas sueltas por chat, que rompen la concentración de quien las recibe.

Cuando esa información falta o llega tarde, se duplica trabajo. En el caso de estudio, dos personas tocaron el mismo módulo la misma semana porque ninguna sabía lo que hacía la otra, y se perdieron dos días.

El gestor de tareas que ya usan no lo evita. Actualizarlo es tan pesado que siempre va por detrás de la realidad, así que nadie se fía de él para decidir.

## Usuarios
Equipos remotos de 3 a 10 personas, repartidas entre varios husos horarios, en los que todos son iguales: nadie reporta hacia arriba, todos ven y actualizan lo mismo.

El valor se lo llevan los propios compañeros, no un jefe:
- **Quien va a empezar algo** necesita saber si otra persona ya lo está tocando y qué queda libre.
- **Quien está trabajando** quiere su cola de tareas a mano y dejar de recibir interrupciones preguntándole cómo va.

El primer usuario de referencia es un equipo de producto SaaS de 6 personas en 3 husos horarios. Es un caso de estudio, no un cliente.

Un equipo que necesite sprints, estimaciones o informes no es nuestro usuario.

## Propuesta de valor
Una sola lista compartida donde el estado del equipo se ve de un vistazo, siempre al día y sin preguntar a nadie.

- **Actualizarla cuesta dos clics.** No hay campos obligatorios aparte del título ni nada que configurar.
- **Quien la actualiza se beneficia en el momento.** La lista es su propia cola de trabajo y, además, le ahorra interrupciones. Por eso se mantiene viva sin obligar a nadie.
- **Los cambios aparecen solos, sin recargar.** Al llegar por la mañana o al volver de una reunión, se ve qué se ha movido y qué está libre antes de coger algo.

Sustituye al gestor de tareas, no convive con él. Lo que se busca es que el equipo cancele la ronda de "¿en qué estás?" y nadie pida recuperarla.

## Alcance
Una única vertical que se pueda usar de principio a fin:

- **Cuenta:** registrarse, entrar y salir. Ya está construido y se usa tal cual.
- **Un espacio común:** quien se registra ve la lista de tareas de todos.
- **Crear tareas:** solo el título es obligatorio. Responsable y fecha de vencimiento son opcionales.
- **Coger una tarea libre en dos clics:** queda asignada a ti y pasa a "en curso".
- **Cambiar el estado en dos clics** entre pendiente, en curso y hecha.
- **Vencidas a la vista:** las tareas no hechas cuya fecha ya ha pasado se distinguen de un vistazo.
- **Dos filtros combinables:**
  - *Por estado:* por defecto se ocultan las hechas.
  - *Mis tareas:* solo lo que tengo asignado, para usar la lista como cola personal.
- **Al día sin recargar:** con la lista abierta, los cambios de otros aparecen en segundos.
- **Qué se ha movido:** la lista se ordena por último cambio y cada tarea muestra "actualizada hace X".

## NO-alcance
Cada exclusión responde a la misma pregunta: ¿hace falta para cancelar la ronda de "¿en qué estás?"? Si la respuesta es no, queda fuera.

- **Bloqueos, incluido un estado "bloqueada".** Esa parte de la daily sigue existiendo y este MVP no intenta resolverla. Un estado que nadie sabe cómo gestionar solo añade ruido.
- **Historial, feed de actividad y "desde tu última visita".** Ordenar por último cambio responde a "qué se ha movido" sin crear otro sitio que consultar. Si en la primera semana se queda corto, será lo primero que entre.
- **Impedir que dos personas cojan la misma tarea.** Con cambios que llegan en segundos, la colisión se ve enseguida. Bloquearla obliga a decidir reglas de propiedad que todavía no sabemos si hacen falta.
- **Notificaciones push, email e integración con Slack.** La señal debe esperar a que la mires, no interrumpir. Un aviso reproduce justo el problema que queremos quitar.
- **Indicadores de presencia ("quién está conectado").** El estado es de la tarea, no de la persona. Esto se rechaza a propósito porque sería vigilancia.
- **Integraciones con Git, PRs, CI o calendario, e importar desde otro gestor.** Es otro producto, con dependencias externas. Además, convivir con otra herramienta lleva a actualizar dos veces, y así muere esta categoría.
- **Varios equipos, varios espacios e invitaciones.** El usuario objetivo es un único equipo pequeño. Con un solo espacio el valor ya se puede validar.
- **Roles y permisos.** Los compañeros son iguales. Cualquier jerarquía añade fricción a la acción de dos clics sin aportar al objetivo.
- **Descripción, etiquetas, prioridad y subtareas.** Para saber quién está en qué bastan título, responsable, estado y fecha. Cada campo extra encarece actualizar y acelera que la lista se quede vieja, que es el riesgo número uno.
- **Comentarios.** Convierten la lista en un canal de conversación y la conversación ya tiene su sitio.
- **Sprints, estimaciones, épicas, backlog priorizado e informes.** Son justo el "rollo" del que huimos. A quien los necesite, este producto no le sirve.
- **Analítica y métricas de uso.** El éxito se valida hablando con el equipo tras una semana, no midiendo dentro del producto.
- **Búsqueda, tablero kanban y otras vistas.** Con como mucho 10 personas y una lista filtrable por estado y por "mis tareas", otra vista sería duplicar la misma información.
- **Editar el perfil y recuperar la contraseña.** No afectan al objetivo y la cuenta ya funciona para lo que se necesita.
- **Papelera o archivo.** Borrar es poco frecuente y el coste de equivocarse es bajo: la tarea se vuelve a crear en segundos.
- **Experiencia optimizada para móvil.** El trabajo y la decisión de qué coger ocurren delante del ordenador. Debe poder usarse en móvil, nada más.
- **Editar tareas:** cualquiera puede cambiar el título, el responsable o la fecha de cualquier tarea, y también borrarla. Para validar que el estado se mantiene al día basta con crear y cambiar el estado en dos clics


### 🅱️ Parte B: las tres líneas

1. **Los dos números.** 

La IA propuso 10 ítems dentro del alcance, luego de mi recorte quedaron 9

2. **Tres cosas que dejaste fuera, y por qué cada una.**

- **Editar tareas:** cualquiera puede cambiar el título, el responsable o la fecha de cualquier tarea, y también borrarla.
Inicialmente no la incluiría porque actualizar el estado se hace con 2 clicks (para validar que el estado se mantiene al día basta con crear y cambiar el estado).

- **Notificaciones push, email e integración con Slack.** La señal debe esperar a que la mires, no interrumpir. Un aviso reproduce justo el problema que queremos quitar.
No buscamos con esta aplicación molestar la concentración del equipo en las tareas, sino, solamente dinamizar las dailys para evitar perder el tiempo en la ronda de en que esta cada uno de los integrantes del equipo.

- **Indicadores de presencia ("quién está conectado").** El estado es de la tarea, no de la persona. Esto se rechaza a propósito porque sería vigilancia.
No buscamos vigilar la conectividad del equipo, sino tener a un click la respuesta a la pregunta en que está el equipo.


3. **La exclusión de la que menos seguro estás**

- **Impedir que dos personas cojan la misma tarea.** 
Es importante que una tarea la tome una sola persona y que no se preste a confusión la asignación de tarea a más de una, ya que tendría el riesgo de que 2 personas trabajaran sobre la misma tarea y por lo tanto podría implicar días perdidos de trabajo.
Entraría si en la primera semana dos personas cogen la misma tarea aunque se vea en segundos.
