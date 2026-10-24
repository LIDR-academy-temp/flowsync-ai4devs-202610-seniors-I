# Alcance del MVP — FlowSync

Autor: Alfonso Fernández (af) · Ejercicio del módulo 2 · Documento de producto: ni tablas, ni endpoints, ni arquitectura.

## Tramo 1 · El terreno que ya existe

- FlowSync ya permite registro, inicio y cierre de sesión y consulta del perfil de usuario.
- El modelo actual contiene usuarios (User) y sus tokens de acceso (AuthAccessToken).
- El frontend ya incluye las pantallas de registro, login y perfil, con acceso protegido y recuperación de la sesión.
- No existen todavía tareas, listas, estados de trabajo ni actualización en tiempo real: el MVP se construye sobre las cuentas y el acceso existentes.

## Tramo 2 · El interrogatorio y las respuestas decididas

Síntesis añadida después del intento a partir del registro de prompts y de la ficha de hechos utilizada como respuesta. Las cinco preguntas originales no quedaron transcritas en `prompts.md`; las siguientes organizan sus temas y las respuestas disponibles, sin presentarse como una cita literal de aquella conversación.

1. **¿Qué problema concreto queremos resolver y qué parte de la coordinación cambia?** La falta de visibilidad provoca interrupciones por chat y trabajo duplicado. Queremos eliminar la ronda de «¿en qué estás?» de la daily, no toda la reunión: la conversación de bloqueos continúa. La información debe ayudar a no empezar trabajo que otro ya está tocando y a elegir lo siguiente sabiendo qué está libre.
2. **¿Quién recibe el valor y cuál es el primer contexto de uso?** Los pares de equipos remotos de 3–10 personas, con roles planos. El caso de estudio inicial es un equipo SaaS de seis personas en tres husos horarios; no es un cliente real ni una herramienta de reporte a un manager.
3. **¿Qué significa «tiempo real» y de dónde sale la información?** Ver cambios de estado de las tareas sin refrescar ni preguntar. La persona que hace el trabajo actualiza el estado en segundos. Se consulta una señal que espera; no se incorporan presencia de personas, push, chat ni información derivada de Git, CI o calendarios. Que el estado se quede viejo es el principal riesgo a validar.
4. **¿Qué significa «menos rollo que Jira» y cuál es el mínimo útil?** Crear tareas y cambiar su estado en segundos, sin configurar flujos, sprints ni estimaciones. Las tareas tienen título, responsable, estado y fecha de vencimiento; la lista se consulta por estado. FlowSync sustituye al gestor actual, en lugar de exigir mantener dos herramientas. Se prefiere una vertical fina y usable de punta a punta.
5. **¿Cuáles son las fronteras del MVP y cómo sabremos si aporta valor?** Un único espacio compartido, sin entidad equipo ni permisos avanzados. Quedan fuera push, Slack, analítica/reporting y comentarios, además de las demás fronteras de la ficha. El éxito se comprueba tras una semana de uso real: el equipo elimina la ronda de estado y nadie pide recuperarla. Las decisiones adicionales y los supuestos del recorte se explicitan debajo.

## Tramo 3 · El alcance en cinco bloques

## 1. Problema

En equipos remotos pequeños el estado del trabajo vive en la cabeza de la gente y en el chat. Nadie sabe en qué está trabajando cada quien sin interrumpir a alguien: la daily de 15 minutos se come la mitad en la ronda de "¿en qué estás?", y el caso caro es que dos personas tocan el mismo módulo la misma semana sin saberlo y pierden dos días.

## 2. Usuarios

Equipos remotos pequeños, de 3 a 10 personas, con roles planos: todo el mundo ve y edita lo mismo, sin jerarquía de permisos. No hay manager: el valor se lo llevan los pares. Caso de estudio de arranque: un equipo de 6 personas de producto SaaS repartido en 3 husos horarios, hoy con un gestor de tareas pesado y una daily de 15 minutos por videollamada. No es un cliente real.

## 3. Propuesta de valor

Una lista compartida de tareas que se actualiza sola y refleja en segundos quién está en qué, para que nadie tenga que preguntar. Cambia dos decisiones concretas: **empezar** algo que otra persona ya está tocando, y **elegir** lo siguiente sabiendo qué está libre. Y quien escribe el estado cobra en el acto: esa misma lista es su cola de trabajo, sin campos obligatorios ni decisiones de sprint.

## 4. Alcance del MVP

- **I1 · Un espacio único compartido.** Todo el que entra ve y edita las mismas tareas. Sin equipos, sin permisos.
- **I2 · Una tarea con título, responsable, estado y fecha de vencimiento (opcional).** El responsable no se rellena: se deriva de quién crea la tarea, y lo cambia quien la reclama.
- **I3 · Crear una tarea en segundos.** Solo el título y, si quieres, la fecha. Sin campos obligatorios más allá del título.
- **I4 · Tres estados**: por hacer, en curso, hecho. Cambiar de estado son dos clics.
- **I5 · Reclamar una tarea cambia el responsable.** Quien la coge pasa a ser quien la tiene, y eso es justo lo que hace visible el choque antes de que ocurra.
- **I6 · Una lista filtrable por estado y por responsable**, para centrarse en lo pendiente y para tener "mis tareas" (las tareas que he reclamado).
- **I7 · Actualización automática sin recargar**: la lista muestra los cambios de estado y de responsable de los demás mientras la tienes abierta.
- **I8 · Una señal que espera, no que interrumpe**: al volver, ves qué se ha movido. Sin push, sin chat, sin videollamada.
- **I9 · La fecha de vencimiento a la vista**, para ver de un vistazo qué está fuera de plazo.

**Cómo se mide:** en una semana de uso real, el equipo cancela la ronda de "¿en qué estás?" y nadie pide que vuelva. Si la siguen haciendo igual, no funcionó.

**Riesgo asumido nº1:** que la información se quede vieja, y entonces el producto pierde el sentido. La mitigación no es vigilar, es que actualizar cueste dos clics y no obligue a nadie.

## 5. NO-alcance

Cada exclusión lleva el porqué en forma de **qué hipótesis del producto deja sin validar**.

1. **E1 · Notificaciones push y avisos que interrumpen** — la señal es "llegué y veo qué se ha movido", no "algo exige mi atención ahora". No toca ninguna de las dos decisiones que queremos cambiar; añade permisos, canal y presión.
2. **E2 · Integración con Slack** — es otro producto con OAuth. El dolor (preguntar por chat) se quita sin ella.
3. **E3 · Roles y permisos avanzados** — los roles son planos por definición; un equipo que necesite jerarquía no es nuestro usuario.
4. **E4 · Analítica y reporting** — no hay reporte hacia arriba: el valor es entre pares. Ningún informe cambia lo que alguien hace hoy.
5. **E5 · Comentarios en tareas** — la conversación sigue en el chat; los comentarios resucitan el rollo que queremos quitar.
6. **E6 · Estado "bloqueado" y resolución de bloqueos** — decisión ya tomada: la parte de bloqueos de la daily sigue y este MVP no la resuelve.
7. **E7 · Sprints, estimaciones, épicas, backlog priorizado e informes** — renuncia explícita, y además son justo lo que impide que actualizar cueste dos clics.
8. **E8 · Derivar el estado desde Git/PRs, CI o calendario** — el estado lo teclea la persona en segundos; derivarlo es otro producto, con integraciones y OAuth de terceros.
9. **E9 · Importar o sincronizar tareas de otro gestor** — FlowSync sustituye, no convive: convivir exige doble actualización, que es como muere esta categoría.
10. **E10 · Entidad "equipo", espacios separados, gente en varios espacios** — fuera del MVP; se anota como supuesto, no se construye.
11. **E11 · Chat, videollamada o colaboración simultánea sobre un documento** — no es el producto.
12. **E12 · Indicadores de presencia ("quién está conectado ahora")** — el estado es de la tarea, no de la persona; la presencia es vigilancia y se rechaza a propósito.
13. **E13 · Historial completo de cambios (audit log)** — con un resumen de "qué se ha movido" basta; un timeline es otro producto.
14. **E14 · Reasignar una tarea a otra persona** — solo se puede reclamar para uno mismo. El caso de uso es "elijo la tarea en la que voy a trabajar"; cederla a un tercero no aporta a ninguna de las dos decisiones que queremos cambiar.

## Supuestos

- No hay invitaciones: quien se registra entra en el único espacio compartido. Un espacio = una instancia.
- La fecha de vencimiento es opcional: no todo trabajo tiene plazo.
- "Mis tareas" = las tareas que he reclamado, y nada más. Una tarea se queda con quien la reclama: si la creaste tú y nadie la ha reclamado, no sale en tu lista (aunque figuraras como responsable hasta que alguien la reclame). Si la reclamaste tú, se queda contigo y sale en tu lista aunque la hubiera creado otra persona que no pudo completarla.
- Reclamar una tarea ya reclamada por alguien se permite, pero la lista muestra al responsable actual: es una señal de cortesía, no un bloqueo.
- La lista arranca vacía y se llena a mano. No hay importación (coherente con E9): el primer día el equipo migra sus tareas una por una, y el coste es real.
- La actualización automática (polling o socket) es una decisión de implementación, no de producto, y no condiciona el alcance.

## Decisiones de recorte (autor)

- **El responsable no es un campo que se rellena.** Se deriva de quien crea la tarea, y lo cambia quien la reclama (I2, I5). Con esto desaparece la contradicción entre "sin campos obligatorios" y "tarea con responsable", y desaparece la necesidad de un selector de persona al crear.
- **El filtro por responsable entra en el alcance** (I6). Sin él, la lista común no es la cola de trabajo que promete la propuesta de valor.
- **No hay asignación ni reasignación a terceros** (E14). Solo reclamar para uno mismo.

---

# Parte B — las tres líneas

## 1. Los dos números

La IA propuso meter **10** cosas dentro del alcance; después de mi recorte quedan **9**.

*(Recuento: 8 elementos en la primera propuesta de la IA, más "reclamar" y el filtro por responsable, que aparecieron al resolver el modelo del responsable. El décimo —elegir a quién se le asigna la tarea— cayó: el responsable se deriva, no se rellena.)*

## 2. Tres cosas que dejé fuera, y por qué

- **Notificaciones push** — no validan la hipótesis de que la señal "espere y baste". Un aviso que interrumpe no es lo que estamos vendiendo: lo que estamos vendiendo es que abras la lista y sepas qué se movió. Añade permisos, canal y presión, y nada de eso dice si el problema real (preguntar por chat) está resuelto.
- **Comentarios en tareas** — no validan que desaparezca la ronda de "¿en qué estás?". Si los comentarios entran, la conversación vuelve dentro de la herramienta y el producto se convierte en otro chat que hay que mirar: es el rollo que la ficha manda quitar.
- **Sprints, estimaciones y backlog priorizado** — no validan que actualizar cueste dos clics. Las estimaciones son exactamente el campo obligatorio que el producto renuncia a; si el MVP los metiera, "sin campos obligatorios" dejaría de ser cierto, y con él la razón por la que el estado se mantiene al día.

## 3. La exclusión de la que menos seguro estoy

**E9 · No importar tareas de otro gestor.** Es la que menos puedo defender, porque se contradice con algo que la propia ficha afirma en dos sitios: que FlowSync *sustituye* al gestor de tareas, no que convive con él, y que el equipo de referencia hoy usa "un gestor de tareas pesado". Si sustituimos sin importar nada, el primer día la lista está vacía: nadie ve el valor hasta que suelte su gestor y migre a mano, tarea por tarea. Lo que se contradice es **"sustituye al gestor" contra "el primer día no hay nada que mostrar"**, y lo barato contra lo que valida: la exclusión es barata de construir, pero es la que puede hacer que la hipótesis central (que el equipo cancele la ronda en una semana) no llegue a comprobarse nunca, porque el equipo se queda en el gestor viejo.

Para que entrara: que se demuestre que un equipo migra a mano una lista de tamaño real y aun así cancela la ronda de "¿en qué estás?" en la primera semana. Si eso se cumple, la importación es redundante. Si no se cumple, o si la lista vacía resulta ser la barrera número uno, entra **una importación mínima en un solo sentido** (leer del gestor, sin sincronizar de vuelta): no sería convivir, sería el día uno del sustituto.

