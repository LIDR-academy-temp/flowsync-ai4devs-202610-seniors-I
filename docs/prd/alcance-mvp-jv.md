# Alcance del MVP — FlowSync

> Leyenda: **[H]** hecho de la ficha de producto · **[A]** verificado en el repositorio · **[S]** supuesto, pendiente de validar.

## 1. El terreno que ya existe

FlowSync parte de una base que solo cubre la gestión de cuentas: alta, inicio y cierre de sesión, y consulta del perfil propio, con sesión persistente y pantallas protegidas [A]. El modelo de datos actual guarda únicamente usuarios (nombre, email, contraseña) y sus credenciales de sesión, en SQLite [A]. La documentación sitúa el producto en la gestión de tareas compartidas para equipos remotos, pero esa parte no está construida: no existen tareas, estados, responsables ni equipos [A]. El MVP se construye sobre la identidad de usuario que ya existe, sin volver a especificarla.

## 2. El interrogatorio

Cinco preguntas en una sola ronda, respondidas con la ficha de hechos del producto:

1. **Qué duele y cuándo.** La ronda de "¿en qué estás?" se come la mitad de una daily de 15 minutos, y el chat está lleno de interrupciones. Episodio: dos personas tocaron el mismo módulo la misma semana y se perdieron dos días. La parte de bloqueos de la daily sigue existiendo [H].
2. **Quién obtiene el valor.** Los compañeros entre sí, no un lead. Equipos remotos de 3 a 10 personas, con roles planos y un único espacio compartido [H].
3. **Qué es "tiempo real".** Ver los cambios de estado de las tareas sin refrescar. Es un resumen que espera a que lo mires, no un aviso. Nada de presencia, chat ni notificaciones push [H].
4. **De dónde sale el estado.** Lo escribe a mano quien hace la tarea, en dos clics. La lista es también su cola de trabajo. Que la información se quede vieja es el riesgo #1 [H].
5. **Frontera con Jira.** FlowSync sustituye al gestor de tareas, no convive con él. Una tarea tiene título, responsable, estado y fecha de vencimiento. Renuncia a sprints, estimaciones, épicas, backlog e informes [H].

Supuestos que declaró la IA en los puntos que la ficha no cubría:

- **S1.** Hay tres estados fijos y no configurables: Pendiente, En curso y Hecha.
- **S2.** Una tarea puede no tener responsable; así es como se ve "qué está libre".
- **S3.** Solo el título es obligatorio.
- **S5.** Todo usuario registrado forma parte del espacio único.
- Hay un único espacio, sin entidad "equipo". Los equipos separados o las personas en varios equipos quedan fuera del MVP [H].

## 3. El alcance

### Problema
En un equipo remoto nadie ve el estado del equipo sin interrumpir a alguien. El coste es la ronda de sincronización y el trabajo duplicado [H].

### Usuarios
Equipos remotos pequeños (3-10 personas) con roles planos. El valor es para los compañeros entre sí [H]. Caso de estudio: un equipo SaaS de 6 personas en 3 husos horarios, que hoy usa un gestor de tareas pesado [H].

### Propuesta de valor
Una única lista compartida donde se hace el trabajo. Cada persona la usa como su cola de trabajo y, de paso, informa al resto. Crear una tarea o cambiarle el estado lleva segundos, sin configuración [H].

**Hipótesis que el MVP debe validar:**
- **H1:** la gente mantiene el estado al día sin que la obliguen, porque cuesta dos clics y la lista es su cola de trabajo.
- **H2:** ver el estado del equipo de un vistazo sustituye la ronda de "¿en qué estás?".
- **H3:** saber quién está en qué y qué está libre evita trabajo duplicado.

**Éxito:** tras una semana de uso real, el equipo cancela la ronda de "¿en qué estás?" y nadie pide que vuelva [H].

### Alcance: 6 funcionalidades

Los identificadores se mantienen de la propuesta inicial; F5 y F8 se recortaron. F1 se amplió respecto a la propuesta inicial para incluir la edición básica (título y fecha), sin cambiar el recuento.

| # | Funcionalidad | Valida |
|---|---|---|
| F1 | Crear y editar los datos básicos de una tarea: título (único campo obligatorio) y fecha de vencimiento opcional. El responsable también es opcional y se gestiona con F4 [H][S3]. | H1 |
| F2 | Una lista compartida única con todas las tareas, que muestra título, responsable, estado y vencimiento [H]. | H2, H3 |
| F3 | Cambiar el estado desde la propia lista, en dos clics [H][S1]. | H1 |
| F4 | Asignar o reasignar el responsable, incluido tomar una tarea libre para uno mismo [H][S2][S5]. | H3 |
| F6 | Filtrar la lista por estado [H]. | H1, H3 |
| F7 | Ver los cambios de otras personas sin refrescar, mientras la lista está abierta [H]. | H2, H3 |

### NO-alcance

| Excluido | Qué hipótesis no ayuda a validar |
|---|---|
| **F5.** Resaltar las tareas vencidas | No es indispensable para H1, H2 ni H3. Coste asumido: los retrasos no se identifican de inmediato. |
| **F8.** Resaltar lo que cambió desde la última visita | Primero se valida si basta con ver el estado actual para sustituir la ronda (H2). Coste asumido: no se ve exactamente qué cambió. |
| Notificaciones push (navegador, móvil, email) | Ninguna, y van contra H2: la señal es un resumen que espera, no un aviso que interrumpe [H]. |
| Integración con Slack | Ninguna. Devuelve el estado al canal del que intentamos sacarlo, y H1 depende de que FlowSync sea el único sitio [H]. |
| Cualquier rol o permiso | Ninguna. Los roles son planos y no hay un lead al que servir [H]. |
| Analítica y reportes | Ninguna. El valor es entre compañeros y no hay reporte hacia arriba [H]. |
| Comentarios en tareas | Ninguna. Convierten la tarea en conversación; los bloqueos siguen en la daily [H]. |
| Presencia o actividad de personas | Ninguna. El estado es de la tarea, no de la persona; se rechaza a propósito por ser vigilancia [H]. |
| Chat, videollamada y edición simultánea | Ninguna. No forman parte de la definición de "tiempo real" [H]. |
| Estado deducido de Git, CI o calendario | No mide H1, que es si la gente escribe el estado a mano. Además es otro producto, con integraciones de terceros [H]. |
| Importar o sincronizar con otro gestor | Va contra H1: obliga a actualizar dos veces [H]. |
| Sprints, estimaciones, épicas y backlog priorizado | Ninguna. Son renuncias explícitas, y quien las necesite no es nuestro usuario [H]. |
| Varios equipos o espacios | Ninguna. El MVP es un único espacio [H]. |
| Bloqueos y dependencias entre tareas | Ninguna. Siguen tratándose en la daily [H]. |
| Borrar o archivar tareas | No es indispensable para H1, H2 ni H3: el estado "Hecha" y el filtro por estado (F6) apartan de la vista las tareas completadas. Riesgo asumido: una tarea creada por error no puede eliminarse, y marcarla como "Hecha" distorsiona la información del equipo. |
| Descripción, etiquetas, prioridad y subtareas | Ninguna. Están fuera de los cuatro campos mínimos [H]. |
| Filtros por responsable o por vencidas, y búsqueda | Ninguna que no cubra ya F6 con 10 personas como máximo [S]. |
| Editar el perfil o gestionar usuarios | Ninguna. El perfil actual basta para identificar al responsable [A][S]. |

## Parte B — Decisiones de alcance

**1. Los dos números:** 8 funcionalidades propuestas por la IA; 6 funcionalidades conservadas después de mi recorte. F1 se amplió para incluir la edición básica de la tarea (título y fecha), y aun así el recuento sigue siendo 8 y 6.

**2. Tres exclusiones:** F5 (resaltado de tareas vencidas), porque no es indispensable para validar H1, H2 ni H3, aunque limita la identificación inmediata de retrasos; F8 (resaltado de cambios recientes), porque inicialmente validaremos si visualizar el estado actual es suficiente para sustituir la ronda de sincronización (H2), aun cuando no permita identificar exactamente qué cambió; y borrar o archivar tareas, porque no es indispensable para validar H1, H2 ni H3, ya que el estado "Hecha" y el filtro por estado permiten apartar las tareas completadas de la vista, aunque una tarea creada por error no podrá eliminarse y marcarla como "Hecha" distorsionaría la información del equipo.

**3. Exclusión con mayor incertidumbre:** F8. La ficha establece que el usuario debe identificar qué cambió mientras estuvo ausente, pero mi recorte supone que visualizar el estado actual será suficiente. Reconsideraría incluir F8 si durante la primera semana el equipo continúa necesitando preguntas de sincronización porque no puede identificar los cambios recientes.
