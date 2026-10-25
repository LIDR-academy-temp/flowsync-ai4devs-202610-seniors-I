# FlowSync — Alcance del MVP

> «Quiero que FlowSync sea una herramienta para que los equipos remotos sepan en qué está trabajando cada uno sin tener que hacer reuniones de sincronización. Algo tipo tareas compartidas pero más en tiempo real y menos rollo que Jira.»

Fuentes: el código del repo (rama `alcance-ga`) y la ficha de hechos del producto. Todo lo que no sale de la ficha está marcado como **[SUPUESTO]**.

---

## 1. Punto de partida: qué hay construido

### Capabilities existentes

Lo único terminado es **identidad y sesión**. No existe todavía nada del dominio del producto (tareas, estados, lista compartida).

| Capability | Backend | Frontend |
|---|---|---|
| Registro de cuenta (nombre opcional, email único, contraseña con confirmación) | `POST /api/v1/auth/signup` | `/register` |
| Login con access token opaco | `POST /api/v1/auth/login` | `/login` (token en `localStorage`) |
| Ver el perfil propio | `GET /api/v1/account/profile` | `/profile` |
| Logout (revoca el token) | `POST /api/v1/account/logout` | botón en perfil |

Infraestructura ya resuelta y reutilizable: guard `api` por defecto, middleware de auth por grupo de rutas, validación VineJS con errores traducidos a castellano en el cliente, serializer `{ data }` + transformers, rutas protegidas/solo-públicas en React, cliente HTTP único (`frontend/src/lib/api.ts`). No hay tests escritos (solo `tests/bootstrap.ts`).

### Modelo de datos actual

Dos tablas, ninguna de dominio:

- **`users`** — `id`, `full_name` (nullable), `email` (único, ≤254), `password` (hash, nunca se serializa), `created_at`, `updated_at`. El modelo añade el getter `initials`.
- **`auth_access_tokens`** — tokens de acceso por usuario (`tokenable_id` → `users.id`, borrado en cascada), con `hash`, `abilities`, `last_used_at`, `expires_at`.

### Resumen

FlowSync hoy es un esqueleto de autenticación: una persona puede crear cuenta, entrar, ver su perfil y salir. No hay entidad tarea, ni equipo, ni espacio compartido, ni ningún mecanismo de actualización en vivo. **Todo el valor del producto está por construir**; lo existente aporta la identidad necesaria para saber *quién* es responsable de *qué*, y nada más.

---

## 2. Las cinco preguntas que más reducen la incertidumbre

Respondidas con la ficha de hechos. Donde la ficha no llega, la decisión es mía y va marcada.

### P1. ¿Qué decisión concreta cambia el producto? (problema)

No empezar algo que otra persona ya está tocando, y elegir lo siguiente sabiendo qué está libre. Si la única respuesta fuera "sentirse informado", el tiempo real no valdría lo que cuesta.

El episodio que lo ancla: dos personas tocaron el mismo módulo la misma semana porque una empezó sin que la otra lo supiera. **Dos días perdidos.** El dolor de fondo es la ronda de "¿en qué estás?" de la daily y el goteo de preguntas por Slack/chat: nadie ve el estado del equipo sin interrumpir a alguien.

### P2. ¿Quién cobra el valor, y por qué quien hace la tarea se molestaría en actualizarla? (usuarios)

Los **pares**, no un lead. No hay reporte hacia arriba; a un manager le daría igual. Duele a los dos devs que descubren tarde que iban a lo mismo, y al que interrumpe para preguntar.

Quien escribe el estado cobra en el momento: la lista es **su propia cola de trabajo**, la mira para decidir qué coge, y deja de recibir interrupciones. Actualizar cuesta **dos clics sobre una lista ya abierta**, sin campos obligatorios, sin sprint ni estimación. Si el beneficio fuera solo para los demás, no lo escribiría.

Perfil: equipos remotos pequeños (3–10), roles planos. Primer usuario de referencia (caso de estudio, no cliente): equipo de 6 personas de producto SaaS, en 3 husos horarios, con un gestor de tareas pesado y una daily de 15 min por videollamada.

### P3. ¿Qué significa "tiempo real" y qué no? (alcance)

Ver los cambios de estado de las tareas **sin refrescar ni preguntar**. Es **frescura de la tarea, no presencia de la persona**.

- NO es chat, ni videollamada, ni edición simultánea del mismo documento.
- NO hay "quién está conectado" ni indicadores de actividad: eso es vigilancia y se rechaza a propósito.
- La señal es un **resumen que espera, no un aviso que interrumpe**: "llego por la mañana o vuelvo de una reunión y veo qué se ha movido". Sin notificaciones push.

### P4. ¿Convive con el gestor de tareas actual o lo sustituye? (alcance)

**Lo sustituye.** FlowSync es donde se hace el trabajo, no donde se cuenta. Crea las tareas, no las lee de otro sitio: convivir exigiría doble actualización, que es como muere esta categoría. El estado lo teclea la persona que hace la tarea; derivarlo de Git/PRs, CI o calendario es otro producto (integraciones, OAuth de terceros).

Consecuencia: renuncia explícita a sprints, estimaciones, épicas, backlog priorizado e informes. Un equipo que necesite eso no es nuestro usuario. "Menos rollo que Jira" = crear una tarea y cambiarle el estado en segundos, sin flujos de configuración ni campos obligatorios.

### P5. ¿Cómo sabremos que funcionó, y qué lo puede matar? (problema / validación)

- **Éxito para el usuario:** dejar de hacer la ronda de "¿en qué estás?" porque el estado del equipo se ve de un vistazo.
- **Criterio a una semana de uso real:** el equipo cancela esa ronda y nadie pide que vuelva. Si la siguen haciendo igual, no funcionó.
- **Honestidad sobre el resultado:** la daily NO desaparece. Desaparece la ronda de estado (~la mitad de los 15 min). La parte de bloqueos sigue y este MVP no la resuelve.
- **Riesgo #1:** que la información se quede vieja. Si pasa, el producto pierde el sentido. La mitigación es que actualizar cueste dos clics, no obligar a nadie.

---

## 3. Alcance del MVP

Principio rector (de la ficha): **una vertical fina y usable de punta a punta, no el andamiaje de un producto. Una capability terminada antes que tres a medias.** Cada cosa que no sirva directamente a "ver de un vistazo quién está en qué y qué está libre, sin preguntar" queda fuera.

### 3.1 Problema

En un equipo remoto pequeño nadie ve en qué está cada uno sin interrumpir a alguien. Se paga de dos formas:

1. **Interrupciones y ceremonia:** la ronda de "¿en qué estás?" se come la mitad de una daily de 15 min, y el resto del día se repite por chat.
2. **Trabajo duplicado:** dos personas empiezan lo mismo sin saberlo. Caso real: mismo módulo, misma semana, dos días perdidos.

Los gestores de tareas existentes no lo resuelven porque actualizarlos cuesta demasiado (campos, flujos, sprints), así que el estado se queda viejo y la gente vuelve a preguntar.

### 3.2 Usuarios

- **Usuario objetivo:** miembro de un equipo remoto de 3–10 personas que hace el trabajo y lo actualiza él mismo. Todos los roles son iguales: todos ven y editan todo.
- **Caso de referencia:** equipo de 6 de producto SaaS, 3 husos horarios, gestor pesado + daily de 15 min. Es caso de estudio, no cliente.
- **No es usuario:** el manager que quiere reportes, ni el equipo que necesita sprints, estimaciones o épicas.
- **[SUPUESTO] Un espacio = una instalación.** Como no hay entidad "equipo", cualquier cuenta registrada entra al único espacio compartido y ve todas las tareas. Se acepta porque el MVP se despliega para un equipo; no sirve para alojar a varios equipos en la misma instancia.

### 3.3 Propuesta de valor

> **Abre FlowSync y sabes, sin preguntar a nadie, quién está en qué y qué está libre. Cambiar el estado de lo tuyo cuesta dos clics.**

- Para quien consulta: evita empezar algo que otro ya está tocando y elige lo siguiente sabiendo qué está libre.
- Para quien actualiza: la lista es su cola de trabajo, y cada actualización le ahorra una interrupción.
- Frente a Jira: sin configuración, sin campos obligatorios, sin sprint ni estimación.

### 3.4 Alcance (lo que SÍ se construye)

Una única capability de producto: **la lista compartida de tareas del equipo, viva.** Se apoya en el login/registro que ya existe.

1. **Crear una tarea en segundos.** Datos de una tarea: título, responsable, estado y fecha de vencimiento.
   - **[SUPUESTO]** Solo el título es obligatorio; el resto es opcional. La ficha pide "sin campos obligatorios" y a la vez cuatro datos; resuelvo que el título es el mínimo imprescindible para que exista algo que ver.
   - **[SUPUESTO]** Una tarea sin responsable es una tarea **libre**. Es la forma más simple de responder a "qué está libre" sin un concepto adicional.
2. **Cambiar el estado o el responsable en dos clics** desde la propia lista, sin abrir un formulario. Incluye "cogerla yo" sobre una tarea libre.
   - **[SUPUESTO]** Tres estados fijos, no configurables: **Pendiente → En curso → Hecha.** Es el mínimo que distingue "libre/por hacer", "alguien está en ello" y "terminado". Configurar estados es exactamente el "rollo" que se quiere evitar.
3. **Editar una tarea**: título, responsable y fecha de vencimiento. Cualquiera puede, porque los roles son planos.
   - Las fechas de creación y de última actualización las pone el sistema y **no se pueden editar**. Si se pudieran tocar, dejarían de servir para saber cuándo se movió algo de verdad.
   - **[SUPUESTO]** No se borran tareas en el MVP. Con roles planos, cualquiera podría eliminar el trabajo de otro sin forma de recuperarlo. Una tarea que ya no aplica se marca como **Hecha**; una creada por error se corrige editándola. Ver NO-alcance.
4. **Lista de tareas filtrable por estado**, para centrarse en lo pendiente. Es la única vista del producto.
5. **Frescura simple:** la lista abierta se pone al día sola cada pocos segundos, sin que la persona tenga que recargar ni preguntar.
   - **[SUPUESTO]** Basta con un retraso de unos segundos. La señal es un resumen que espera ("vuelvo y veo qué se ha movido"), no una alerta al instante. La sincronización instantánea queda fuera hasta que se demuestre que el retraso molesta.

**Criterio de terminado:** el equipo de referencia puede trabajar una semana solo con esta lista, sin otro gestor, y es la que mira en lugar de hacer la ronda de "¿en qué estás?".

### 3.5 NO-alcance (y por qué)

| Fuera del MVP | Por qué |
|---|---|
| **Notificaciones push** (y emails, digests) | La señal es un resumen que espera, no un aviso que interrumpe. Una push reintroduce la interrupción que el producto quiere eliminar. |
| **Integración con Slack** | Es justo el canal del "¿en qué estás?". FlowSync tiene que ser el sitio donde se mira, no otro emisor de mensajes en el chat. |
| **Roles y permisos avanzados** | Equipo de pares, 3–10 personas, todos ven y editan lo mismo. Los permisos solo protegen jerarquías que este usuario no tiene. |
| **Analítica / reporting** | Nadie lo va a leer: no hay reporte hacia arriba y al manager le da igual. Además, empuja al producto hacia "donde se cuenta el trabajo" en lugar de "donde se hace". |
| **Comentarios en tareas** | Convierten la tarea en un hilo de conversación (chat por otra vía) y añaden un sitio más que mantener al día. El MVP responde "quién está en qué", no "qué opina cada uno". |
| **Presencia / "quién está conectado" / indicadores de actividad** | El estado es de la tarea, no de la persona. Es vigilancia y se rechaza a propósito. |
| **Chat, videollamada, edición simultánea** | No es lo que significa "tiempo real" aquí: es frescura del estado, no colaboración síncrona. |
| **Varios equipos, entidad "equipo", personas en más de un equipo** | Un único espacio compartido basta para el usuario objetivo. Multi-equipo es andamiaje (pertenencias, selección de espacio, aislamiento) que no prueba la hipótesis. Queda como supuesto (ver 3.2). |
| **Invitaciones y gestión de miembros** — **[SUPUESTO]** | Con un espacio único, registrarse ya es unirse. Invitar solo tiene sentido cuando hay varios espacios. |
| **Estado derivado de Git/PRs, CI o calendario** | Es otro producto: integraciones y OAuth de terceros. El estado lo teclea quien hace la tarea, en segundos. |
| **Importar o sincronizar con otro gestor (Jira, etc.)** | FlowSync sustituye, no convive. La doble actualización es como muere esta categoría. |
| **Sprints, estimaciones, épicas, backlog priorizado, informes** | Renuncia explícita. Un equipo que necesite eso no es nuestro usuario. |
| **Gestión de bloqueos** | La parte de bloqueos de la daily sigue existiendo y este MVP no la resuelve. Prometerlo sería vender de más. |
| **Descripción, subtareas, etiquetas, adjuntos, prioridad** — **[SUPUESTO]** | Cada campo extra es un motivo más para no actualizar. Título + responsable + estado + fecha bastan para saber quién está en qué. |
| **Estados configurables / flujos de trabajo** — **[SUPUESTO]** | Es la configuración que define el "rollo" de Jira. Tres estados fijos. |
| **Vista kanban, drag & drop, ordenación manual** — **[SUPUESTO]** | Una lista filtrable por estado responde la pregunta. Un tablero es una segunda vista que mantener sin cambiar ninguna decisión. |
| **Filtro por responsable ("mis tareas") y búsqueda** — **[SUPUESTO]** | Con 3–10 personas la lista completa se lee de un vistazo, y verla entera es precisamente lo que evita pisarse. Solo se filtra por estado (ficha). Primer candidato a entrar si la lista crece. |
| **Vista enriquecida "de un vistazo"** (fecha de última actualización, orden por lo más reciente, resaltado de vencidas) | Recortada a propósito: la lista filtrable por estado ya responde "quién está en qué y qué está libre". La fecha de vencimiento se guarda, pero no tiene tratamiento visual propio en el MVP. |
| **"Desde tu última visita" / historial de cambios por tarea** — **[SUPUESTO]** | Un diff por usuario es otra capability completa. La lista puesta al día basta para ver qué se ha movido. |
| **Borrar tareas** (también papelera o archivo) — **[SUPUESTO]** | Borrar sin papelera es peligroso con roles planos: cualquiera podría eliminar el trabajo de otro sin vuelta atrás. Una papelera o un archivo recuperable es otra capability. Mientras tanto, lo que ya no aplica se marca como Hecha. |
| **Sincronización instantánea** — **[SUPUESTO]** | Empezamos simple: la lista se pone al día sola con unos segundos de retraso. El caso de uso es "vuelvo y veo qué se ha movido", que no necesita inmediatez. Se reconsidera solo si el retraso provoca que dos personas se pisen. |
| **Recuperar contraseña, editar perfil, avatar** — **[SUPUESTO]** | No afectan a la hipótesis; para una instalación de un equipo, un reset manual es aceptable durante la validación. |
| **App móvil / modo offline** — **[SUPUESTO]** | El momento de uso es "llego al ordenador y miro la lista". Web basta para validar. |

---

## Riesgos y supuestos a validar

1. **Riesgo #1 — información vieja.** Si a la semana las tareas no reflejan la realidad, el producto no sirve. Señal a vigilar: el equipo vuelve a preguntar "¿en qué estás?" o repone la ronda en la daily.
2. **Criterio de cierre:** a una semana de uso real, la ronda de estado está cancelada y nadie pide que vuelva.
3. Supuestos marcados arriba a revisar con el equipo de referencia: solo título obligatorio, "libre" = sin responsable, tres estados fijos, espacio único por instalación sin invitaciones, sin borrado de tareas, y frescura con unos segundos de retraso como suficiente para el "resumen que espera".


## Parte B. Las tres líneas


1. La IA propuso agregar 6 puntos dentro del alcance, tras mi recorte quedo en 5 

2.
	- Ver la lista del equipo de un vistazo no me parece relevante
 	- editar borrar una tarea el supuesto de Borrado definitivo, sin papelera ni historial, es peligroso
  	- Frescura sin refrescar empecemos con algo simple


3.  Frescura simple:  no seria mejor manejarlo con notificaciones ? No supe decidir, se quedo 
	
	Editar una tarea la parte de la fecha, no se deben editar fechas de creacion o actualizacion (la Ia lo aprobo)
