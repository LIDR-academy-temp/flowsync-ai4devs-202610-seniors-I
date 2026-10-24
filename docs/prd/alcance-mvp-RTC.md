# FlowSync — Alcance del MVP

> Partimos de esta frase: *«Quiero que FlowSync sea una herramienta para que los equipos remotos sepan en qué está trabajando cada uno sin tener que hacer reuniones de sincronización. Algo tipo tareas compartidas pero más en tiempo real y menos rollo que Jira.»*

## 1. Lo que ya existe

- **Backend** (AdonisJS 7 + SQLite): solo hay autenticación. Registro, login, perfil y logout bajo `/api/v1`, con tokens opacos. El único modelo de dominio es `User` (`full_name`, `email`, `password`); también existe la tabla de access tokens.
- **Frontend** (React 19 + Vite + Tailwind/shadcn): pantallas de login, registro y perfil, rutas protegidas y un cliente `lib/api.ts` que mete el token en cada llamada y traduce los errores.
- **No hay nada del producto**: ni tareas, ni estados, ni responsables, ni tiempo real (no está instalado SSE/WebSocket/Transmit). Tampoco hay concepto de equipo.
- **No hay tests**: ni `tests/unit` ni `tests/functional` en el backend, y el frontend no tiene runner. Todo el producto está por construir sobre una base de auth que ya funciona.

## 2. Interrogatorio

**P1 · ¿Qué significa «tiempo real»?**
Ver los cambios de estado de las tareas sin refrescar la página ni preguntar a nadie. No es chat, ni videollamada, ni edición simultánea del mismo documento. Lo que se busca es que la información esté **fresca**, no saber quién está **presente**: el estado pertenece a la *tarea*, no a la persona. Se descartan a propósito «quién está conectado» y los indicadores de actividad, porque eso es vigilancia. La señal tiene que ser un resumen que espera, no un aviso que interrumpe: «llego por la mañana o vuelvo de una reunión y veo qué se ha movido».

**P2 · ¿Cuál es la pieza central del producto?**
Una lista de tareas compartida. Cada tarea tiene **título, responsable, estado y fecha de vencimiento**; la fecha sirve para ver de un vistazo qué va tarde. La lista se filtra por estado para centrarse en lo pendiente. El estado lo escribe a mano quien hace la tarea, en segundos (no se saca de Git, CI ni del calendario). FlowSync **sustituye** al gestor de tareas, no convive con él: si convivieran, habría que actualizar las cosas dos veces, y así es como muere esta categoría de herramientas.

**P3 · ¿Cómo se organizan los equipos?**
Hay **un único espacio compartido, sin entidad «equipo»**. Todos ven y editan lo mismo, con roles planos. Tener varios equipos separados o gente en más de un equipo queda fuera: se deja anotado como supuesto, no se construye.

**P4 · ¿Quién es el usuario y quién se beneficia?**
Equipos remotos pequeños, de 3 a 10 personas. El valor lo reciben **los compañeros, no un lead**: no hay reportes hacia arriba. Primer usuario de referencia (caso de estudio, no un cliente real): un equipo de 6 personas de un SaaS, repartido en 3 husos horarios, con un gestor de tareas pesado y una daily de 15 minutos por videollamada. Episodio concreto: dos personas tocaron el mismo módulo la misma semana sin saberlo y se perdieron dos días.

**P5 · ¿Cómo sabremos que funciona?**
Desaparece la ronda de «¿en qué estás?» de la daily, que hoy ocupa la mitad de sus 15 minutos. La parte de bloqueos se queda y este MVP no la resuelve. **Criterio a una semana de uso real:** el equipo cancela esa ronda y nadie pide que vuelva. Si la siguen haciendo igual, no ha funcionado.

## 3. El alcance

### Problema

En un equipo remoto nadie ve el estado del trabajo sin interrumpir a alguien. Para saberlo se paga con la mitad de la daily y con un goteo de «¿en qué estás?» por chat. Cuando eso falla, dos personas empiezan lo mismo sin saberlo y el equipo pierde días.

### Usuarios

Personas de equipos remotos pequeños (3–10) con roles planos y repartidos en varios husos horarios. Las que más lo notan: los dos devs que descubren tarde que iban a lo mismo, y quien tiene que interrumpir a otro para preguntar. No es un producto para managers. Un equipo que necesite sprints, estimaciones o informes no es nuestro usuario.

### Propuesta de valor

**Saber de un vistazo quién está en qué y qué está libre, sin preguntar y sin reunión.** Actualizar una tarea cuesta dos clics sobre una lista que ya tienes abierta, sin campos obligatorios ni configuración. Quien la actualiza también sale ganando en ese momento: esa lista es su cola de trabajo, y además deja de recibir preguntas sobre cómo va. Esto es lo que significa «menos rollo que Jira».

### Alcance (lo que entra)

La vertical más fina que se puede usar de principio a fin: *crear una tarea → asignarla → moverla de estado → que los demás lo vean sin recargar.*

| # | Capacidad | Por qué entra |
|---|---|---|
| A1 | **Registro y login** (ya existen) | Hace falta saber quién es el responsable de cada tarea. Ya está hecho, así que cuesta cero. |
| A2 | **Crear tarea** con título obligatorio; responsable y fecha de vencimiento opcionales | Si el usuario no puede crear tareas aquí, FlowSync no sustituye al gestor actual. Solo el título es obligatorio para que crear cueste segundos. |
| A3 | **Estados fijos: Por hacer · En curso · Hecho** (no configurables) | Con tres estados basta para responder «¿quién está en qué y qué está libre?». Un flujo configurable es justo el «rollo» que queremos evitar. |
| A4 | **Cambiar estado y responsable en ≤ 2 clics desde la lista**; editar título y fecha | Es lo que mitiga el riesgo nº 1 (información vieja). Si actualizar cuesta, nadie lo hace y el producto pierde el sentido. |
| A5 | **Lista única compartida** con título, responsable, estado y vencimiento (vencidas resaltadas) | Es la pantalla que sustituye a la ronda de la daily. Con 3–10 personas se lee de un vistazo quién está en qué, qué está libre y qué va tarde. |
| A6 | **Actualización en vivo de la lista** (los cambios de otros aparecen sin recargar, en segundos) | Es el «tiempo real» tal como se definió en P1: frescura del estado de la tarea. La técnica (SSE con Transmit o polling corto) se decide en el diseño técnico; el criterio es que el usuario no tenga que hacer nada. |

**Supuesto anotado:** hay un solo espacio y cada usuario registrado ve todas las tareas. Si alguna vez hay varios equipos por instancia, habrá que añadir el concepto de equipo y control de acceso; queda fuera de este MVP.

**Riesgo nº 1 a validar:** que las tareas no se actualicen y la lista se quede vieja. Lo aceptamos: no se obliga a nadie, solo se baja al mínimo el coste de actualizar (A4).

### No alcance (lo que no entra)

Ya decidido de antemano:

| Fuera | Por qué |
|---|---|
| Notificaciones push | La señal tiene que ser un resumen que espera, no un aviso que interrumpe. Un push recupera justo la interrupción que queremos quitar. |
| Integración con Slack | FlowSync sustituye la conversación de «¿en qué estás?», no la lleva a Slack. Además añade OAuth y dependencias de terceros. |
| Roles / permisos avanzados | Los roles son planos: todos ven y editan lo mismo. Con 3–10 compañeros, los permisos solo añaden fricción. |
| Analítica / reporting | El valor es para los compañeros, no para un manager. No hay reportes hacia arriba. |
| Comentarios en tareas | Convierten la herramienta en un hilo de conversación. Lo que se busca es estado, no discusión, y los bloqueos ya se quedan en la daily. |

Recortes añadidos en este documento:

| Fuera | Por qué |
|---|---|
| Varios equipos / espacios, o usuarios en más de un equipo | Ya decidido en P3: un único espacio. Queda anotado como supuesto. |
| Presencia («quién está conectado», «escribiendo…», última conexión) | Es vigilancia y se rechaza a propósito. El estado es de la tarea, no de la persona. |
| Estado derivado de Git/PRs, CI o calendario | Es otro producto, con integraciones y OAuth de terceros. El estado lo escribe la persona. |
| Importar o sincronizar con Jira u otros gestores | FlowSync sustituye, no convive. Sincronizar obliga a actualizar dos veces. |
| Sprints, estimaciones, épicas, backlog priorizado | Renuncia explícita. Un equipo que necesite eso no es nuestro usuario. |
| Estados o flujos configurables | Tres estados fijos responden la pregunta. Configurarlos es el «rollo de Jira». |
| Descripción larga, etiquetas, prioridad, subtareas, adjuntos | No ayudan a saber «quién está en qué». Cada campo más hace que crear y actualizar cueste más. |
| Borrar o archivar tareas | Para el MVP basta con poder editar y pasar a «Hecho» (y filtrar). Es el primer candidato después del MVP si los errores al crear tareas ensucian la lista. |
| Push en vivo (SSE / WebSocket / Transmit) | Recortado: con polling se ve igual «qué se ha movido» sin recargar. Instalar y mantener un canal de push cuesta más de lo que aporta a esta escala. |
| Marca «actualizada hace X» en cada tarea | Recortado: no hace falta para la decisión «¿esto lo está tocando alguien?», que ya resuelven el estado y el responsable. |
| Filtro por estado | Recortado aunque se pidió: con 3–10 personas la lista entera se lee de un vistazo. Es el primer candidato a volver si la lista crece. |
| Historial de cambios, feed de actividad o «novedades desde tu última visita» | Un feed es una segunda pantalla que mantener. La lista refrescada ya enseña el estado actual. |
| Búsqueda, otros filtros, ordenación personalizada | Con 3–10 personas la lista se puede leer de un vistazo. |
| Recuperar contraseña, editar perfil, avatares | No influyen en el criterio de éxito. Para un caso de estudio, la auth actual basta. |
| App móvil, modo offline, internacionalización | Un web en castellano basta para validar con un equipo. |

**Regla de recorte:** antes que tres capacidades a medias, una terminada. Ya se han recortado el push en vivo (sustituido por polling), la marca «hace X» y el filtro por estado. Lo que queda (A1–A6) es el mínimo: **no se recorta nada más**, porque sin ello no hay producto.



## PARTE B 


Originalmente se havia propuesto incluir en el alcance:

| A5 | **Lista única compartida** con título, responsable, estado, vencimiento (vencidas resaltadas) y «actualizada hace X» | Es la pantalla que sustituye a la ronda de la daily. El «hace X» y el resaltado de vencidas convierten la lista en el resumen de «qué se ha movido» sin necesidad de avisos. |
| A6 | **Filtro por estado** | Es como el usuario dijo que consume la lista: centrarse en lo pendiente y ver qué está libre. |

- 1. El documento original contenia 7 en el alcance y 14 fuera. El acual contiene 6 y 15. El recorte es pequeño, pero creo que las 6 tareas actuales de las cuales 1 ya existe en el proyecto son lo minimo para cumplir requisitos. El resultado de CLAUDE ya fue agresivo con el <<fuera de alcance>> por que asi se indico en el prompt

- 2. El motivo de eliminacion/modificacion de estas tareas fue el siguiente:
* Se ha eliminado del alcance A6 --> No era imprecindible para el mvp era una comodidad. 
* A5 se ha reducido quitando la marca de <<actualizada hace X>>. -->  Mostrar en el tablero la última actualizacion es un extra que esta bien pero la informacion que nos queremos centrar es el estado de las tareas.

Es el que pense durante la lectura del alcance, haun asi el documento original contenia una propuesta de exclusion echa por CLAUDE de estas tareas, el documento tambien proponia la modificacion de la actual A6 y especificava que se haria por polling corto, no la modifique por que me parecio una decision mas tecnica que no corresponde a este documento.  



- 3. El cambio de lo que estoy menos seguro es de la modificacion de A4, ya que cuando un cliente vuelve de una reunion podria ver un estado desactualizado y no saber-lo, si el refresco de A6 se decide hacer con intervalos mas o menos largos seria necesario que esta entrara. 
