# Prompts

Aquí van **todos los prompts que lanzaste** para hacer el ejercicio, en el orden en que los
lanzaste, con el modelo y la herramienta de cada uno.

Esto no es papeleo. Lo que se revisa es **cómo pediste las cosas**, no solo lo que salió: un
resultado flojo con un prompt bueno y un resultado flojo con un prompt vago necesitan feedback
distinto, y sin este archivo no se distinguen.

## Cómo rellenarlo

- Un apartado `## Prompt N` por cada prompt.
- **Pega el prompt tal cual lo lanzaste**, dentro del bloque de código, aunque ocupe diez líneas
  y aunque tenga faltas. No lo reescribas para que quede bien: el que arreglaste mentalmente
  después no es el que lanzaste.
- Incluye también los que **no funcionaron**. Suelen ser los más útiles de leer.
- `Modelo` y `Herramienta` en todos. Si cambiaste de una a otra a mitad, se nota aquí.

Borra el ejemplo de abajo cuando escribas el primero.

---

## Prompt 1

**Modelo:** Opus 5.5 1M xHigh
**Herramienta:** Claude Code

```
 Revisa el código y explícame sencillo qué hay ya hecho en el repositorio. Las funcionalidades creadas, el harness, si hay modelo de datos, los mcp que tenemos configurados, backend y frontend. Resúmelo en 3–5 líneas y no modifiques nada
```

**Qué salió:** Funcionalidades solo la autentificación: registro, inicio sesión, ver perfil y cerrar sesión (sin tareas, nicreadas, ni asignadas, ni cambio estado). Datos: hay 2 tablas, donde user guarda email, nombre y contraseña, y auth_access_tokens guarda sesiones de login (sin equipo y sin tarea). Backend: AdonisJS 7 con SQLite, tres controladores y un único modelo (User). Frontend: React 19 con Tailwind y shadcn, tres pantallas (registro, login y perfil) y rutas que solo dejan entrar a quien ha iniciado sesión. Harness: CLAUDE.md y AGENTS.md son el mismo texto. Hay dos skills (commit y priority-ticket, que trae tu ticket de Jira más prioritario), el subagente adversarial-reviewer y un hook que formatea con Prettier cada archivo del frontend que edito. MCP: solo Atlassian (Jira y Confluence), configurado en .mcp.json



## Prompt 2

**Modelo:** Opus 5.5 1M xHigh
**Herramienta:** Claude Code

```
 Quiero que FlowSync sea una herramienta para que los equipos remotos sepan en qué está trabajando cada uno sin tener que hacer reuniones de sincronización. Algo tipo tareas compartidas pero más en tiempo real y menos rollo que Jira.

Antes de proponerme el MVP, hazme las 5 preguntas que más ayudarían a aclarar el problema, los usuarios y el alcance.

Hazlas todas juntas, en una sola ronda. No entres en el modelo de datos, endpoints ni arquitectura.

De momento solo quiero las preguntas. No modifiques archivos ni hagas cambios en Jira. Espera mi siguiente mensaje, donde te pegaré la ficha de hechos del ejercicio con las respuestas ya decididas.
```

**Qué salió:** 1. ¿Qué duele hoy, y en qué momento concreto? ¿Qué se pierde ahora mismo: tiempo en reuniones, interrupciones por chat o trabajo duplicado porque nadie sabía qué hacía el otro? ¿Me cuentas un episodio real reciente? Y si FlowSync funciona, ¿qué reunión o qué parte de ella desaparece de verdad?
2. ¿Quién usa la herramienta y quién se beneficia? ¿De cuántas personas son los equipos, qué roles tienen y en cuántos husos horarios trabajan? ¿El valor es para los compañeros, para coordinarse entre ellos, o para un responsable que quiere visibilidad? ¿Quién escribe el estado y quién lo lee?
3. ¿Qué significa «más en tiempo real»? ¿Ver los cambios de las tareas sin refrescar la página? ¿Ver quién está conectado? ¿Avisos que interrumpen o un resumen que se consulta cuando uno quiere? ¿Y qué decisión tomaría alguien distinta gracias a esa información fresca?
4. ¿Qué significa «menos rollo que Jira» y qué relación tiene con las herramientas actuales? ¿Qué sobra hoy: campos obligatorios, flujos configurables, sprints, estimaciones, informes? ¿FlowSync sustituye al gestor de tareas actual o convive con él? ¿El estado lo escribe la persona a mano o se saca de otras fuentes, como Git, el calendario o Slack?
5. ¿Qué se considera éxito y hasta dónde llega el MVP? ¿Qué tendría que pasar después de una o dos semanas de uso real para decir que ha funcionado? ¿Cuál es el riesgo principal que el MVP tiene que validar? ¿Qué funcionalidades quedan fuera seguro?


## Prompt 3

**Modelo:** Opus 5.5 1M xHigh
**Herramienta:** Claude Code

```
- Qué duele hoy: la daily de sincronización y el "¿en qué estás?" constante por Slack/chat. Nadie ve el estado del equipo sin interrumpir a alguien.
- Quién cobra el valor: los pares, no un lead. No hay reporte hacia arriba y a un manager le daría igual. Duele a los dos devs que descubren tarde que iban a lo mismo, y al que interrumpe a otro para preguntar.
- Episodio concreto: dos personas del equipo tocaron el mismo módulo la misma semana porque una empezó sin que la otra lo supiera. Dos días perdidos.
- Qué reunión desaparece (respuesta honesta, no la vendas de más): la daily NO desaparece entera. Desaparece la ronda de "¿en qué estás?", que hoy se come la mitad de los 15 minutos. La parte de bloqueos sigue, y este MVP no la resuelve.
- Usuarios / equipo: equipos remotos pequeños, 3–10 personas. Roles planos: en el MVP todos ven y editan lo mismo, sin jerarquía de permisos.
- Primer usuario concreto: equipo de 6 personas de producto SaaS, en 3 husos horarios, que hoy usa un gestor de tareas pesado y una daily de 15 minutos por videollamada. Es un CASO DE ESTUDIO, no un cliente real.
- Fronteras: un espacio único compartido, sin entidad "equipo". Varios equipos separados, o gente en más de uno, queda FUERA del MVP: se anota como supuesto en el PRD, no se construye.
- "Tiempo real" = ver los cambios de estado de las tareas sin refrescar ni preguntar. NO es chat, NO es videollamada, NO es colaboración simultánea sobre el mismo documento.
- Es frescura, no presencia: el estado es de la TAREA, no de la persona. Nada de "quién está conectado ahora" ni indicadores de actividad; eso es vigilancia y lo rechazamos a propósito.
- Forma de la señal: resumen que espera, no aviso que interrumpe. El caso es "llego por la mañana o vuelvo de una reunión y veo qué se ha movido". Sin notificaciones push.
- Qué decisión cambia: no empezar algo que otra persona ya está tocando, y elegir lo siguiente sabiendo qué está libre. Si la única respuesta fuera "sentirse informado", el tiempo real no valdría lo que cuesta.
- De dónde sale el estado: lo teclea la persona que hace la tarea, en segundos. Derivarlo de señales externas (Git/PRs, CI, calendario) está FUERA del MVP: es otro producto, con integraciones y OAuth de terceros.
- Por qué se sostiene: no porque sea más agradable, sino porque son dos clics sobre una lista ya abierta, sin campos obligatorios, sin decidir sprint ni estimación. Y quien lo escribe cobra en el momento: esa misma lista es su cola de trabajo, la mira para decidir qué coge, y de paso deja de recibir interrupciones preguntándole cómo va. Si el beneficio fuera solo para los demás, no lo escribiría.
- Si la información se queda vieja: el producto pierde el sentido, y lo asumo. Es el riesgo #1 a validar, no un detalle. La mitigación es que actualizar cueste dos clics, no obligar a nadie.
- Es donde se hace el trabajo, no donde se cuenta: sustituye al gestor de tareas, no convive con él. FlowSync crea las tareas, no lee las de otro sitio. Convivir exigiría doble actualización, que es como muere esta categoría.
- Renuncia explícita a sprints, estimaciones, épicas, backlog priorizado e informes. Un equipo que necesite eso no es nuestro usuario.
- "Menos rollo que Jira" = crear una tarea y cambiarle el estado en segundos, sin flujos de configuración ni campos obligatorios. Lo mínimo para saber quién está en qué.
- Qué necesita una tarea en el MVP: título, responsable, estado y fecha de vencimiento. La fecha, para ver de un vistazo qué se ha pasado de plazo.
- Cómo se consume la lista: filtrando por estado, para centrarse en lo pendiente.
- Éxito para el usuario: dejar de hacer la ronda de "¿en qué estás?" de la daily porque el estado del equipo se ve de un vistazo.
- Criterio a una semana de uso real: que el equipo cancele esa ronda y nadie pida que vuelva. Si la siguen haciendo igual, no funcionó.
- Cuánto construir: una vertical fina y usable de punta a punta, no el andamiaje amplio de un producto. Prefiero una capability terminada a tres a medias.
Si alguna pregunta no queda contestada, decide la opción y yo reviso, pero dime cuales son en las que has decidido por tu cuenta. No hagas otra ronda de preguntas. No modifques archivos o Jira
```

**Qué salió:** 
No todo ha sido contestado, sigue teniendo dudas.

1. Estados de una tarea. Son tres y fijos: Pendiente, En curso y Hecha, sin poder configurarlos. Si fueran configurables, volveríamos al "rollo de Jira" que la ficha rechaza.
2. Campos obligatorios. Aquí la ficha choca consigo misma: dice "sin campos obligatorios" y a la vez "título, responsable, estado y fecha". Decido que solo el título es obligatorio. El estado empieza en Pendiente. El responsable y la fecha son opcionales. Una tarea sin responsable cuenta como "libre", y eso responde a "elegir lo siguiente sabiendo qué está libre".
3. Un solo responsable por tarea. Nada de varios responsables ni de "observadores".
4. "Ver qué se ha movido" al volver. La ficha lo pide, pero una lista que solo muestra el estado vez y quién lo hizo, sin historial completo ni muro de actividad. Es el supuesto del que menos seguro estoy. Sin él, el caso de "llego por la mañana y veo qué se ha movido" no se cumple. Si va más allá, se convierte en un registro de actividad que roza la vigilancia que la ficha rechaza.
5. Quién entra en el espacio. Aprovecho el registro que ya existe: quien se registra entra en el único espacio compartido y ve todo. No hay invitaciones. Asumo que cada instalación de FlowSync es de un solo equipo.
6. Editar y borrar. Cualquiera puede editar y borrar cualquier tarea, sin papelera ni archivo, por coherencia con los roles planos.
7. Fecha de vencimiento. Es un día, sin hora. "Vencida" es solo una marca visual en la lista, sin avisos, para que encaje con "un resumen que espera, no un aviso que interrumpe" y para no lidiar con los tres husos horarios.
8. Filtro. Solo por estado, como dice la ficha. Filtrar por responsable ("mis tareas") queda fuera de momento.


## Prompt 4

**Modelo:** Opus 5.5 1M xHigh
**Herramienta:** Claude Code

```
 1. Estados: Pendiente, En curso, Testing, Bloqueado y Hecha. Bloqueado solo indica que la tarea está bloqueada; no vamos a gestionar la causa ni resolver los bloqueos desde la herramienta.
 2. El título es obligatorio y la tarea empieza en Pendiente. Puede estar sin responsable mientras siga en Pendiente. Para pasar a cualquier otro estado debe tener un responsable asignado y conservarlo.
 3. Un único responsable por tarea.
    4.Necesito ver el estado actual y el responsable de cada tarea, y también un resumen de cambios recientes para entender qué ha cambiado desde que dejé de mirar. Quiero algo sencillo, sin un historial completo de cada edición.
    5.La prueba se realiza con un único equipo conocido y con sus cuentas preparadas previamente
 6. Conservamos editar tareas, cambiar su estado y borrarlas. Quiero poder eliminar una tarea creada por error o duplicada para que no confunda al equipo. Antes de borrar debe pedir confirmación.
 7. Acepto propuesta
 8. Acepto propuesta
    Se me ha olvidado especificarte en la lista anterior:
    Fuera del MVP: notificaciones push, integración con Slack, roles/permisos avanzados, analítica/reporting, comentarios en tareas.
    De momento muéstramelo aquí, sin modificar archivos ni Jira.
```

**Qué salió:** He aplicado tus respuestas y la lista de exclusiones. Esta es la propuesta en los cinco bloques. No he modificado archivos ni Jira.

---

1. Problema

En un equipo remoto, nadie ve en qué está cada persona sin interrumpirla. La consecuencia es la ronda de "¿en qué estás?" de la daily, que se come la mitad de los 15 minutos, y las preguntas constantes por chat. El caso más caro es el trabajo duplicado: dos personas tocaron el mismo módulo la misma semana sin saberlo y se perdieron dos días.

2. Usuarios

- Equipos remotos pequeños, de 3 a 10 personas, con roles planos: todos ven y editan lo mismo.
- El valor es para los compañeros, no para un responsable: no hay reporte hacia arriba.
- Primer usuario (caso de estudio): un equipo de 6 personas de producto SaaS, en 3 husos horarios, que hoy usa un gestor de tareas pesado.
- La prueba se hace con ese único equipo, con las cuentas ya creadas.

3. Propuesta de valor

Una lista compartida de tareas donde cambiar el estado cuesta dos clics y el resto del equipo lo ve sin refrescar ni preguntar. Quien la actualiza cobra en el momento, porque esa lista es su cola de trabajo y deja de recibir interrupciones. Sirve para decidir dos cosas: no empezar algo que otra persona ya está tocando y elegir lo siguiente sabiendo qué está libre. Sustituye al gestor de tareas, no convive con él.

4. Alcance (lo que entra)

1. Entrar con la cuenta del equipo. Ya está construido: login y logout.
2. Una lista compartida con todas las tareas, que muestra título, responsable, estado y fecha de vencimiento, con una marca visual en las vencidas.
3. Crear una tarea con solo el título obligatorio. Empieza en Pendiente y sin responsable.
4. Editar una tarea: título, responsable y fecha.
5. Cambiar el estado en dos clics entre Pendiente, En curso, Testing, Bloqueado y Hecha. Para salir de Pendiente la tarea necesita un responsable, y lo conserva mientras no vuelva a Pendiente.
6. Borrar una tarea, previa confirmación, para quitar las creadas por error o duplicadas.
7. Filtrar la lista por estado.
8. Ver los cambios de los demás sin refrescar la página.
9. Ver un resumen de lo que se ha movido desde la última vez que miraste: tareas creadas, cambios de estado, cambios de responsable y tareas borradas. Solo el último cambio de cada tarea, sin historial completo.

5. NO-alcance (lo que queda fuera, y por qué)

┌──────────────────────────────────────┬─────────────────────────────────────────────────────────┐
│                Fuera                 │                         Por qué                         │
├──────────────────────────────────────┼─────────────────────────────────────────────────────────┤
│ Notificaciones push, emails y        │ La señal es un resumen que espera, no un aviso que      │
│ recordatorios de vencimiento         │ interrumpe. Un aviso reintroduce la interrupción que    │
│                                      │ queremos quitar.                                        │
├──────────────────────────────────────┼─────────────────────────────────────────────────────────┤
│ Integración con Slack                │ FlowSync es donde se hace el trabajo. Un segundo canal  │
│                                      │ reparte la atención y empuja a la doble actualización.  │
├──────────────────────────────────────┼─────────────────────────────────────────────────────────┤
│ Roles y permisos avanzados           │ Los roles son planos. Una jerarquía no ayuda a validar  │
│                                      │ si el equipo deja de preguntar "¿en qué estás?".        │
├──────────────────────────────────────┼─────────────────────────────────────────────────────────┤
│                                      │ El valor es para los compañeros. No hay a quién         │
│ Analítica e informes                 │ reportar, y un informe no cambia la decisión de qué     │
│                                      │ coger.                                                  │
├──────────────────────────────────────┼─────────────────────────────────────────────────────────┤
│ Comentarios en tareas                │ Convierten la tarea en un chat, y "tiempo real" no es   │
│                                      │ chat. Además, abren la gestión de bloqueos.             │
├──────────────────────────────────────┼─────────────────────────────────────────────────────────┤
│ Gestionar bloqueos: causa, quién     │ Bloqueado es solo una marca. La parte de bloqueos de la │
│ bloquea, dependencias                │  daily sigue existiendo, y este MVP no la resuelve a    │
│                                      │ propósito.                                              │
├──────────────────────────────────────┼─────────────────────────────────────────────────────────┤
│ Presencia: quién está conectado,     │ El estado es de la tarea, no de la persona. Lo otro es  │
│ indicadores de actividad             │ vigilancia.                                             │
├──────────────────────────────────────┼─────────────────────────────────────────────────────────┤
│ Historial completo de cambios o      │ Para saber qué se ha movido basta con el último cambio. │
│ auditoría                            │  Un historial completo es otro producto.                │
├──────────────────────────────────────┼─────────────────────────────────────────────────────────┤
│ Varios equipos o espacios,           │ Hay un único espacio compartido, y la prueba se hace    │
│ invitaciones, gente en más de un     │ con un equipo conocido. Se anota como supuesto.         │
│ equipo                               │                                                         │
├──────────────────────────────────────┼─────────────────────────────────────────────────────────┤
│ Que el estado se saque de Git, de la │ El estado lo escribe la persona. Integrar fuentes       │
│  integración continua o del          │ externas, con sus autorizaciones, es otro producto.     │
│ calendario                           │                                                         │
├──────────────────────────────────────┼─────────────────────────────────────────────────────────┤
│ Importar o sincronizar con otro      │ FlowSync sustituye al gestor actual. Convivir con él es │
│ gestor de tareas                     │  como muere esta categoría.                             │
├──────────────────────────────────────┼─────────────────────────────────────────────────────────┤
│ Sprints, estimaciones, épicas,       │ Es la renuncia explícita de "menos rollo que Jira". Un  │
│ backlog priorizado, prioridades,     │ equipo que lo necesite no es nuestro usuario.           │
│ etiquetas                            │                                                         │
├──────────────────────────────────────┼─────────────────────────────────────────────────────────┤
│ Descripción larga, subtareas,        │ Alargan la creación de una tarea más allá de unos       │
│ adjuntos, checklists                 │ segundos y no ayudan a saber quién está en qué.         │
├──────────────────────────────────────┼─────────────────────────────────────────────────────────┤
│ Estados configurables, o tablero     │ Configurar flujos es el rollo que se rechaza. Una sola  │
│ kanban además de la lista            │ vista basta para validar.                               │
├──────────────────────────────────────┼─────────────────────────────────────────────────────────┤
│ Varios responsables por tarea        │ Diluye la respuesta a "¿quién está con esto?".          │
├──────────────────────────────────────┼─────────────────────────────────────────────────────────┤
│ Filtrar por responsable y buscar     │ Con 3–10 personas, filtrar por estado basta para        │
│                                      │ centrarse en lo pendiente.                              │
├──────────────────────────────────────┼─────────────────────────────────────────────────────────┤
│ Edición simultánea de la misma tarea │ "Tiempo real" es ver cambios de estado, no colaborar a  │
│                                      │ la vez sobre un documento.                              │
├──────────────────────────────────────┼─────────────────────────────────────────────────────────┤
│ Papelera o deshacer un borrado       │ La confirmación previa cubre el error típico. Se revisa │
│                                      │  si en la prueba se borra algo por accidente.           │
├──────────────────────────────────────┼─────────────────────────────────────────────────────────┤
│                                      │ Las cuentas se preparan antes de la prueba. El registro │
│ Abrir el registro a cualquiera       │  existe en el código, pero no forma parte del           │
│                                      │ recorrido.                                              │
└──────────────────────────────────────┴─────────────────────────────────────────────────────────┘

---

Supuestos (míos o tuyos, para dejarlos escritos):
- Hay un único espacio compartido y cada instalación es de un solo equipo.
- La fecha de vencimiento es un día, sin hora.
- "Desde la última vez que miraste" se cuenta por persona, y esa marca no se enseña a nadie más. Así no se convierte en un indicador de presencia.

Tensiones que he visto en tus decisiones:
- "Sin campos obligatorios" frente a "responsable obligatorio fuera de Pendiente". Es una obligación condicionada, pero sigue siendo un clic extra justo en el momento de empezar una tarea, que es lo que más importa que sea barato. Si en la prueba la gente deja tareas en Pendiente para no asignarlas, el riesgo número 1 (que el estado se quede viejo) aparece por aquí.
- El estado Bloqueado. La ficha dice que este MVP no resuelve los bloqueos. La marca es coherente siempre que nadie espere que la herramienta haga algo con ella. Si genera esa expectativa, contradice la promesa honesta de que la daily solo pierde la ronda de "¿en qué estás?".
- Borrar tareas y el resumen de cambios. Si borrar no aparece en el resumen, la tarea en curso de otra persona puede desaparecer sin que nadie se entere. Por eso lo he metido en el punto 9 del alcance.

Para la parte B: la IA propone 9 elementos dentro del alcance. El segundo número depende de tu recorte.


## Prompt 4

**Modelo:** Opus 5.5 1M xHigh
**Herramienta:** Claude Code

```
Crea docs/prd/alcance-mvp-emf.md. Si la carpeta no existe, créala.

Guarda lo que hemos trabajado siguiendo el orden del README:
1. Lo que ya existe, resumido en 3–5 líneas.
2. Las cinco preguntas y sus respuestas.
3. Problema, usuarios, propuesta de valor, alcance y NO-alcance.

Distingue las decisiones que he confirmado de las propuestas que todavía no he revisado. Recuerda que decidí incluir el borrado con confirmación.

Deja la parte B preparada, pero marca como pendiente lo que todavía no haya decidido. No inventes un recorte, números finales ni una reflexión personal mía.

Solo crea ese documento. No modifiques código ni Jira, y no hagas commit, push ni abras el PR todavía.
```

**Qué salió:** Creó el archivo de alcance con los tres tramos y dejó la parte B y las decisiones no revisadas marcadas como pendientes. No modificó código ni Jira.

