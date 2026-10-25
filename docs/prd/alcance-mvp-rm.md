# PRD — FlowSync MVP

## 1. Problema

Los equipos remotos pierden tiempo en la ronda de "¿en qué estás?" de la daily y en interrupciones constantes por chat para saber qué está haciendo cada uno. El dolor es entre pares, no hacia un manager: gente que empieza a tocar lo mismo que otra persona sin saberlo, y gente que interrumpe a otro para preguntar cómo va.

**Episodio concreto que lo motiva:** dos personas del equipo tocaron el mismo módulo la misma semana porque una empezó sin que la otra lo supiera. Dos días perdidos.

**Qué reunión desaparece (honesto):** la daily **no** desaparece entera. Desaparece la ronda de "¿en qué estás?" (la mitad de los 15 minutos). La parte de bloqueos sigue existiendo y este MVP no la resuelve.

## 2. Usuario objetivo

Equipos remotos pequeños, 3–10 personas. Caso de estudio guía: equipo de 6 personas de producto SaaS, en 3 husos horarios, que hoy usa un gestor de tareas pesado y una daily de 15 minutos por videollamada (caso de estudio, no cliente real).

Dentro del equipo hay **dos niveles de acceso**, no permisos planos:

- **Equipo de desarrolladores:** puede crear y editar tareas (título, responsable, estado, fecha), incluida la autoasignación de tareas libres.
- **Resto de personas con acceso** (p. ej. high management): solo puede **ver** la lista, sin editar nada — así no "juguetean" con las tareas de quienes ejecutan el trabajo.

Un equipo que necesite sprints, estimaciones, épicas, backlog priorizado o informes **no es nuestro usuario**.

## 3. Historia central (el loop que tiene que funcionar de punta a punta)

1. Un desarrollador crea una tarea: título, responsable (opcional), estado, fecha de vencimiento. Dos clics, sin campos obligatorios de más.
2. Si la tarea no tiene responsable, cualquier desarrollador puede **cogerla** (autoasignarse) cuando ve que está libre — modelo backlog, no asignación forzosa.
3. Mientras trabaja, cambia el estado de su tarea (dos clics).
4. Cualquier persona con acceso abre la lista, filtra por estado, y ve sin preguntar: qué está libre, qué está cogido, qué se pasó de fecha.
5. Decisión que cambia: no empezar algo que otro ya está tocando, y elegir lo siguiente sabiendo qué está disponible.
6. Los cambios se reflejan para los demás sin recargar la página ni recibir una notificación — es frescura al mirar, no un aviso que interrumpe.

**"Tiempo real" significa:** ver cambios de estado sin refrescar ni preguntar. No es chat, no es videollamada, no es edición simultánea del mismo documento. Es frescura de la **tarea**, no presencia de la **persona** — nada de "quién está conectado ahora", eso es vigilancia y se rechaza a propósito.

## 4. Dentro del MVP

- Lista única y compartida de tareas (un solo espacio, sin entidad "equipo").
- Alta y edición de tareas por el equipo de desarrolladores: título, responsable (opcional, backlog), estado, fecha de vencimiento.
- Autoasignación: cualquier desarrollador puede coger una tarea libre.
- Cambio de estado y de responsable en segundos, sin flujo de configuración.
- Filtro por estado.
- Indicador visual de tarea vencida (fecha pasada y no completada).
- Permisos de dos niveles: desarrolladores editan, el resto solo visualiza.
- Actualización de la lista sin recarga manual mientras la pantalla está abierta. Sin notificaciones push.
- **Sin borrado de tareas:** una vez creada, una tarea persiste; solo se edita (p. ej. se marca como "Hecho"), nunca se elimina desde la aplicación.

## 5. Fuera del MVP

- Notificaciones push
- Integración con Slack
- Roles/permisos avanzados (gestión configurable de roles, permisos granulares por tarea — el modelo fijo de dos niveles de este MVP no cuenta como "avanzado")
- Analítica/reporting
- Comentarios en tareas
- Múltiples equipos/espacios, o personas en más de un equipo
- Indicadores de presencia/actividad ("quién está conectado ahora")
- Estado derivado de señales externas (Git/PRs, CI, calendario)
- Sprints, estimaciones, épicas, backlog priorizado, informes
- Convivencia con otro gestor de tareas (FlowSync sustituye, no sincroniza)
- Resolución de bloqueos (sigue viviendo en la daily)

## 6. Por qué se sostiene (no solo "se debería usar")

Son dos clics sobre una lista ya abierta, sin campos obligatorios, sin decidir sprint ni estimación. Quien lo escribe cobra en el momento: esa misma lista es su cola de trabajo, la mira para decidir qué coge, y de paso deja de recibir interrupciones preguntándole cómo va. Si el beneficio fuera solo para los demás, no lo escribiría.

## 7. Métrica de éxito

**A una semana de uso real:** el equipo cancela la ronda de "¿en qué estás?" de la daily y nadie pide que vuelva. Si la siguen haciendo igual, el MVP no funcionó, sin importar cuántas tareas se hayan creado.

## 8. Riesgo #1

Que la información se quede vieja porque nadie actualiza su tarea. Si pasa, el producto pierde el sentido — se asume como el riesgo principal a validar, no como un detalle. La única mitigación en el MVP es la fricción mínima (dos clics), no obligatoriedad ni recordatorios.

## 9. Supuestos abiertos (no respondidos explícitamente, a validar)

- **Historial/auditoría:** no hay timeline de "quién cambió qué y cuándo", solo se ve el estado actual. Riesgo anotado: en ciertos casos podría importar saber quién cambió el estado — se deja fuera a propósito por ahora, pero queda como candidata a revisar si el piloto lo pide.
- **Estados de una tarea:** set fijo y mínimo, tipo *Por hacer / En progreso / Hecho* (sin "bloqueada" como estado de producto).
- **Fecha de vencimiento:** solo fecha (día), sin hora.
- **Acceso/onboarding:** cualquier persona autenticada pertenece al único espacio compartido; sin invitación diferenciada en el MVP.
- **Cómo se determina quién es "del equipo de desarrolladores":** atributo simple y fijo del usuario, sin interfaz de gestión de roles.

## 10. Cuánto construir

Una vertical fina y usable de punta a punta (todo el loop central funcionando), no el andamiaje amplio de un producto. Mejor una capability terminada que tres a medias.


El alcance

1. EL terreno: Ha escrito que capacidad tiene al ser copilot y cual segun el repo, creo que lo ha hecho bien. Muestra que hay un backend y un frontend, los diferentes agentes, la parte de manerjo de la base de datos y el workflow a seguir.
2. El interrogatorio: se hicieron las preguntas segun lo planteado y se creo el MVP
3. El alcance: Se recortaron dos supuestos.


Las tres líneas:

1. 6 propuso y lo límite a 3.
2. Quité tres, las otras me parecieron lógicas: 
- Lo primero es que haya responsable por tarea, pienso que no permite la libertad de coger ticket libre durante el sprint. 
- La otra fue el borrado de tareas, pienso que eso no se debe permitir desde la aplicación, solo debe ser de visualización. 
- Editar tareas solo los desarrolladores, que no lleguen de highmanagement lo vean y empiecen a juguetear.
3. Hay una exclusión que dejé y según el caso puede que valga, que la AI dice que sin flujo de configuración, según el caso, podría ser importante saber quien cambió el estado de la tarea.