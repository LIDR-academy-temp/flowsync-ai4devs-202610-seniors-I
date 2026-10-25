# Alcance del MVP de FlowSync

## A · El alcance

### 1. El terreno que ya existe

El proyecto es solo un punto de partida: hay registro, login, perfil y logout, de punta a punta (backend y frontend), y las páginas privadas exigen sesión. Los únicos datos son usuarios y sus sesiones. No hay tareas, equipos ni proyectos, ni tests.

### 2. El interrogatorio

#### Preguntas

1. ¿Qué dolor concreto resolvemos y cómo sabremos, tras una semana de uso real, que lo hemos resuelto?
2. ¿Quién sufre el problema y quién se lleva el valor? ¿Y quién es el primer usuario sobre el que se valida?
3. ¿Qué decisión debe poder tomar alguien al mirar FlowSync, y en qué forma le llega la información?
4. ¿Por qué la persona que hace la tarea mantendría el estado al día, y qué pasa si no lo hace?
5. ¿Qué lugar ocupa FlowSync respecto al gestor de tareas actual, y qué queda fuera del MVP de forma explícita?

#### Respuestas

**1. Dolor y criterio de éxito.**

- Duele la ronda de «¿en qué estás?» de la daily y las mismas preguntas constantes por Slack o chat. Nadie ve el estado del equipo sin interrumpir a alguien.
- Episodio real: dos personas tocaron el mismo módulo la misma semana sin saberlo, y se perdieron dos días.
- Lo que desaparece es solo esa ronda, que hoy ocupa la mitad de los 15 minutos. La daily no desaparece entera: la parte de bloqueos sigue, y este MVP no la resuelve.
- Criterio a una semana: el equipo cancela esa ronda y nadie pide que vuelva. Si la siguen haciendo igual, no ha funcionado.

**2. Usuarios.**

- Son equipos remotos pequeños, de 3 a 10 personas, con roles planos: todos ven y editan lo mismo.
- El valor lo cobran los compañeros, no un lead ni un manager. No hay reporte hacia arriba.
- Les duele a los dos devs que descubren tarde que iban a lo mismo, y al que tiene que interrumpir para preguntar.
- Primer usuario: un equipo de 6 personas de un producto SaaS, en 3 husos horarios, con un gestor de tareas pesado y una daily de 15 minutos por videollamada. Es un caso de estudio, no un cliente real.

**3. Decisión y forma de la señal.**

- La decisión que cambia: no empezar algo que otra persona ya está tocando, y elegir lo siguiente sabiendo qué está libre. Si el único beneficio fuera «sentirse informado», el tiempo real no compensaría.
- «Tiempo real» significa ver los cambios de estado de las tareas sin refrescar ni preguntar. No es chat, ni videollamada, ni edición simultánea.
- Interesa lo actualizada que está la tarea, no si la persona está conectada: nada de «quién está conectado» ni indicadores de actividad.
- La información espera a que la mires, no te interrumpe: «llego por la mañana o vuelvo de una reunión y veo qué se ha movido». Sin notificaciones push.
- La lista se consulta filtrando por estado. Cada tarea muestra su fecha de vencimiento, para ver de un vistazo qué se ha pasado de plazo.
- Supuesto por validar: que una tarea esté «libre» significa que no tiene responsable o que nadie ha empezado a trabajar en ella. La ficha habla de «qué está libre», pero no lo define.

**4. Por qué se mantiene al día.**

- El estado lo escribe a mano la persona que hace la tarea, en segundos: dos clics sobre una lista que ya tiene abierta, sin campos obligatorios ni sprints ni estimaciones.
- Quien lo escribe gana algo en el momento: esa lista es su cola de trabajo, la usa para decidir qué coge y deja de recibir interrupciones.
- Si la información se queda vieja, el producto pierde el sentido. Es el riesgo número uno a validar. La mitigación es que actualizar cueste poco, no obligar a nadie.

**5. Lugar y fronteras.**

- FlowSync es donde se hace el trabajo, no donde se cuenta. Sustituye al gestor de tareas, no convive con él: crea sus propias tareas y no lee las de otra herramienta.
- Una tarea tiene título, responsable, estado y fecha de vencimiento.
- Fuera del MVP:
  - varios equipos o gente en más de un equipo (hay un solo espacio compartido, sin entidad «equipo»);
  - integraciones con Git, PRs, CI o calendario;
  - sprints, estimaciones, épicas, backlog priorizado e informes;
  - jerarquía de permisos;
  - la parte de bloqueos de la daily.
- Supuesto por validar: el MVP usa un conjunto pequeño y fijo de estados que el equipo no puede configurar, por ejemplo pendiente, en curso y hecha. La ficha pide filtrar por estado y prohíbe los flujos de configuración, pero no dice cuáles son los estados.

#### Resumen

- **Problema:** en equipos remotos pequeños, saber quién está en qué exige interrumpir a alguien o dedicar media daily a preguntarlo. Por eso hay trabajo duplicado, como los dos días perdidos en el mismo módulo.
- **Usuarios:** compañeros de igual rango en equipos de 3 a 10 personas, sin jerarquía. El caso de estudio es un equipo SaaS de 6 personas en 3 husos horarios.
- **Resultado esperado:** cada persona ve el estado actualizado de las tareas del equipo cuando lo mira, sin preguntar. Así evita empezar algo que ya está cogido y elige lo siguiente sabiendo qué está libre. El éxito es que en una semana el equipo cancele la ronda de «¿en qué estás?» y nadie la eche de menos.
- **Límites:** una sola funcionalidad, fina pero completa de punta a punta. Sustituye al gestor actual y deja fuera todo lo listado en la pregunta 5. El riesgo principal es que el estado se quede viejo, y depende de que actualizar sea casi gratis.

#### Supuestos introducidos

1. Una tarea está «libre» si no tiene responsable o si nadie ha empezado a trabajar en ella.
2. Los estados son pocos, fijos y no configurables por el equipo (por ejemplo pendiente, en curso y hecha).

### 3. El alcance en cinco bloques

#### 1. Problema

En equipos remotos pequeños nadie ve el estado del equipo sin interrumpir a alguien. Hoy eso tiene dos costes:

- La mitad de los 15 minutos de la daily se va en la ronda de «¿en qué estás?», además de las preguntas constantes por Slack o chat.
- Hay trabajo duplicado. En el caso conocido, dos personas tocaron el mismo módulo la misma semana sin saberlo y se perdieron dos días.

#### 2. Usuarios

- **Para quién:** equipos remotos de 3 a 10 personas, repartidos en varios husos horarios y con roles planos.
- **Quién recibe el valor:** los propios compañeros, no un lead ni un manager.
  - Quien va a empezar algo evita pisar el trabajo de otro.
  - Quien está trabajando deja de recibir interrupciones, y la lista le sirve como cola de trabajo.
- **Cuándo lo usan:** al llegar por la mañana, al volver de una reunión o al decidir qué tarea coger después.
- **Caso de estudio, no cliente real:** un equipo SaaS de 6 personas en 3 husos horarios, con un gestor de tareas pesado y una daily por videollamada. Sirve para validar, no es un compromiso con un cliente.

#### 3. Propuesta de valor

- **Decisión que mejora:** no empezar algo que otra persona ya está tocando, y elegir lo siguiente sabiendo qué está libre.
- **Comportamiento que cambia:** se consulta la lista en lugar de preguntar a alguien.
- **Resultado observable:** en una semana de uso real, el equipo cancela la ronda de «¿en qué estás?» y nadie pide que vuelva.
- **Lo que no prometemos:** la daily sigue existiendo, igual que la parte de bloqueos.

#### 4. Alcance

Una sola vertical completa: la lista compartida de tareas, con su estado al día.

1. **Entrar con cuenta propia.** El responsable de una tarea tiene que ser una persona identificable. Ya existe en el proyecto.
2. **Un único espacio con una sola lista visible para todos.** Es la base de «ver el estado del equipo sin preguntar», y la ficha fija un único espacio con roles planos.
   - Supuesto por validar: quien se registra entra directamente en ese espacio, sin invitaciones.
3. **Crear una tarea en segundos.** Una tarea tiene título, responsable, estado y fecha de vencimiento. FlowSync sustituye al gestor actual, así que las tareas tienen que nacer aquí.
   - Supuesto por validar: solo el título es obligatorio. El estado empieza como «pendiente», y el responsable y la fecha se pueden dejar en blanco. Así se respeta «sin campos obligatorios» sin crear tareas vacías.
4. **Cambiar el estado y asignarse una tarea en dos clics desde la lista.** Esto mitiga directamente el riesgo número uno: si actualizar cuesta más, la información se queda vieja. Asignarse es además la señal de «esto ya lo cojo yo».
5. **Filtrar por estado.** La ficha lo pide para centrarse en lo pendiente y ver qué está libre.
6. **Ver los cambios de otros sin refrescar.** Es la definición de «tiempo real» de la ficha. Sin esto, la lista abierta miente y se vuelve a preguntar.

#### 5. NO-alcance

**Renuncias ya decididas en la ficha**

- **Varios equipos, o personas en más de un equipo:** fuera de la frontera del MVP. Solo se anota como supuesto en el PRD.
- **Sprints, estimaciones, épicas, backlog priorizado e informes:** un equipo que los necesite no es nuestro usuario.
- **Jerarquía de permisos:** los roles son planos y todos ven y editan lo mismo.
- **Derivar el estado de Git, PRs, CI o calendario:** es otro producto, con integraciones y OAuth de terceros.
- **Indicadores de quién está conectado o de actividad:** sería vigilancia y se rechaza a propósito. El estado es de la tarea, no de la persona.
- **Notificaciones push o avisos que interrumpen:** la información espera a que la mires, no interrumpe.
- **Chat, videollamada y edición simultánea:** no forman parte de este «tiempo real».
- **Importar o sincronizar con otro gestor de tareas:** FlowSync sustituye, no convive. Convivir obliga a actualizar dos veces, que es lo que mata esta categoría.
- **Resolver los bloqueos de la daily:** esa parte de la reunión se queda, y este MVP no la resuelve.

**Exclusiones adicionales que propongo**

- **Borrar tareas:** una tarea terminada pasa a «hecha» y ya está. No aporta nada a la decisión de qué coger.
  - Supuesto por validar: se puede vivir una semana sin borrar.
- **Descripción, comentarios, adjuntos, subtareas, etiquetas y prioridad:** son lo habitual en otros gestores, pero no ayudan a saber quién está en qué. Además meten campos y hacen más lento actualizar.
- **Estados que el equipo pueda configurar:** serían flujos de configuración, que la ficha rechaza.
  - Supuesto por validar: los estados son fijos, por ejemplo pendiente, en curso y hecha.
- **Historial completo de cambios de cada tarea:** para decidir qué coger basta con el estado actual. El historial es coste sin aprendizaje extra.
- **Recordatorios de vencimiento por email:** son avisos que interrumpen, al otro lado de la línea de la ficha.
- **Búsqueda, ordenación configurable y vistas alternativas (tablero, calendario):** con 3 a 10 personas, una lista con filtro por estado basta para validar.
- **Invitaciones, gestión de perfil y recuperación de contraseña:** con un único espacio no hacen falta para validar el valor. La recuperación de contraseña depende además del envío de emails.
- **App móvil nativa y modo sin conexión:** cuestan mucho y no enseñan nada nuevo sobre el riesgo principal.
- **Medir el éxito dentro del producto:** el criterio de una semana se observa en el equipo, no con informes, que además están descartados.

**Recortadas por mí de la propuesta de la IA** (el porqué, en la parte B)

- **Editar título, responsable y fecha como funcionalidad general:** se mantiene asignarse y cambiar el estado.
- **Destacar visualmente las tareas vencidas:** se mantiene visible la fecha de vencimiento.
- **Mostrar la última actualización de cada tarea.**

**Supuestos por validar**

1. Quien se registra entra directamente en el espacio único, sin invitaciones.
2. Solo el título es obligatorio. El estado empieza como «pendiente», y el responsable y la fecha son opcionales.
3. Una tarea está «libre» si no tiene responsable o si nadie ha empezado a trabajar en ella (viene del interrogatorio).
4. Los estados son fijos y no configurables.
5. Se puede vivir una semana sin borrar tareas.

## B · Las tres líneas

**1. Los dos números.**

9 → 6

**2. Tres cosas que dejé fuera, y por qué cada una.**

- **Editar título, responsable y fecha como funcionalidad general.** Mantengo asignarse una tarea y cambiar su estado. La edición completa no es imprescindible para validar si consultar y actualizar la lista sustituye la ronda de «¿en qué estás?». Asumo que durante la prueba se toleran errores al crear tareas.
- **Destacar visualmente las tareas vencidas.** Mantengo visible la fecha de vencimiento. El resaltado ayuda a detectar retrasos, pero no valida directamente la hipótesis central: evitar solapamientos y elegir qué tarea coger sin interrumpir a otros.
- **Mostrar la última actualización de cada tarea.** Una marca temporal no valida que el estado sea correcto ni que actualizarlo resulte suficientemente fácil para sostener el hábito. Puede señalar antigüedad, pero no resuelve el riesgo de información desactualizada.

**3. La exclusión de la que menos seguro estoy.**

Destacar las tareas vencidas. La ficha pide reconocer de un vistazo qué se ha pasado de plazo, mientras que mi recorte conserva la fecha y deja esa interpretación al usuario. Estoy quitando algo probablemente barato porque aporta poco a la hipótesis principal, pero podría estar debilitando un requisito explícito.

Lo incluiría si, al probar la lista, las personas tuvieran que revisar las fechas una por una o no detectaran las tareas vencidas. En ese caso, el resaltado sería necesario para cumplir «de un vistazo».
