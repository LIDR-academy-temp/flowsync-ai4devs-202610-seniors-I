# Alcance del MVP — FlowSync

Autor: Alfonso Fernández (af) · Ejercicio del módulo 2 · Documento de producto: ni tablas, ni endpoints, ni arquitectura.

## Tramo 1 · El terreno que ya existe

- FlowSync ya permite registro, inicio y cierre de sesión y consulta del perfil de usuario.
- El modelo actual contiene usuarios (User) y sus tokens de acceso (AuthAccessToken).
- El frontend ya incluye las pantallas de registro, login y perfil, con acceso protegido y recuperación de la sesión.
- No existen todavía tareas, listas, estados de trabajo ni actualización en tiempo real: el MVP se construye sobre las cuentas y el acceso existentes.

## Tramo 2 · El interrogatorio y las respuestas decididas

Revisión posterior al intento: el 27 de octubre de 2026 se recuperaron las cinco preguntas originales del registro de Claude. Se reproducen a continuación; las respuestas se sintetizan de la ficha de hechos que se envió completa en el Prompt 3. El texto íntegro de esa ficha se conserva también debajo, para distinguir los hechos del curso de los supuestos del recorte.

**1. (Beneficiario y decisión) ¿Quién paga de verdad el coste de mantener esto al día, y qué decisión concreta cambia el día que FlowSync exista?**

Respuesta decidida: La persona que hace la tarea actualiza su estado. El valor lo reciben los pares: evitar duplicar trabajo y elegir lo siguiente con información actualizada; no se trata de supervisar personas.

**2. (Usuarios y forma del equipo) ¿Qué tamaño y forma tiene el equipo, y quién se encarga de poner el estado?**

Respuesta decidida: Equipos de 3–10 personas, roles planos y acceso compartido. El caso de estudio inicial es un equipo SaaS de seis personas en tres husos horarios, no un cliente real.

**3. (Qué desaparece y qué no) Si mañana FlowSync funciona, ¿qué parte concreta de tu día se acorta, y qué parte sobrevive intacta?**

Respuesta decidida: Desaparece la ronda de «¿en qué estás?» de la daily. La reunión completa no desaparece y la conversación de bloqueos sigue fuera del MVP.

**4. (Qué significa "tiempo real") ¿Qué señal quieres ver aparecer, y cómo la consumes: te avisa o la ves al llegar?**

Respuesta decidida: Cambios de estado de tareas sin refrescar ni preguntar; una señal consultable al llegar, sin push ni presencia de personas. La ficha no fija un límite numérico de latencia: queda abierto, no se inventa.

**5. (Fronteras) ¿Qué queda fuera, sin discusión?**

Respuesta decidida: Un único espacio, sin entidad equipo ni permisos avanzados. El estado se introduce a mano; no se deriva de Git, CI ni calendario. Push, Slack, reporting y comentarios están fuera.

<details>
<summary>Ficha de hechos completa enviada durante el ejercicio (Prompt 3)</summary>

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

**Exclusiones de partida de la lección:** notificaciones push, integración con Slack, roles/permisos avanzados, analítica/reporting y comentarios en tareas. Esa línea adicional no se pegó en el Prompt 3 original; se declara aquí como omisión del intento, no como mensaje enviado.

</details>

## Tramo 3 · El alcance en cinco bloques

## 1. Problema

En equipos remotos pequeños el estado del trabajo vive en la cabeza de la gente y en el chat. Nadie sabe en qué está trabajando cada quien sin interrumpir a alguien: la daily de 15 minutos se come la mitad en la ronda de "¿en qué estás?", y el caso caro es que dos personas tocan el mismo módulo la misma semana sin saberlo y pierden dos días.

## 2. Usuarios

Equipos remotos pequeños, de 3 a 10 personas, con roles planos: todo el mundo ve y edita lo mismo, sin jerarquía de permisos. No hay manager: el valor se lo llevan los pares. Caso de estudio de arranque: un equipo de 6 personas de producto SaaS repartido en 3 husos horarios, hoy con un gestor de tareas pesado y una daily de 15 minutos por videollamada. No es un cliente real.

## 3. Propuesta de valor

Una lista compartida de tareas que se actualiza sola y refleja en segundos quién está en qué, para que nadie tenga que preguntar. Cambia dos decisiones concretas: **no empezar** algo que otra persona ya está tocando, y **elegir** lo siguiente sabiendo qué está libre. Y quien escribe el estado cobra en el acto: esa misma lista es su cola de trabajo, sin campos obligatorios ni decisiones de sprint.

## 4. Alcance del MVP

- **I1 · Un espacio único compartido.** Todo el que entra ve y edita las mismas tareas. Sin equipos, sin permisos.
- **I2 · Una tarea con título, responsable, estado y fecha de vencimiento (opcional).** El responsable no se rellena: se deriva de quién crea la tarea, y lo cambia quien la reclama.
- **I3 · Crear una tarea en segundos.** Solo el título y, si quieres, la fecha. Sin campos obligatorios más allá del título.
- **I4 · Tres estados**: por hacer, en curso, hecho. Cambiar de estado son dos clics.
- **I5 · Reclamar una tarea cambia el responsable.** Quien la coge pasa a ser quien la tiene, y eso es justo lo que hace visible el choque antes de que ocurra.
- **I6 · Una lista filtrable por estado y por responsable**, para centrarse en lo pendiente y para consultar el responsable actual. La vista "mis tareas" muestra solo las tareas cuyo reclamante actual soy yo; una tarea creada por mí aún no reclamada queda fuera de esa vista.
- **I7 · Actualización automática sin recargar**: la lista muestra los cambios de estado y de responsable de los demás mientras la tienes abierta.
- **I8 · Una señal que espera, no que interrumpe**: al volver, consultas el estado actual de la lista. No se promete un historial ni un resumen de diferencias desde la última visita; si ese resumen fuera imprescindible para coordinarse, habría que reconsiderar E13. Sin push, sin chat, sin videollamada.
- **I9 · La fecha de vencimiento a la vista**, para ver de un vistazo qué está fuera de plazo.

**Cómo se mide:** en una semana de uso real, el equipo cancela la ronda de "¿en qué estás?" y nadie pide que vuelva. Si la siguen haciendo igual, no funcionó.

**Riesgo asumido nº1:** que la información se quede vieja, y entonces el producto pierde el sentido. La mitigación no es vigilar, es que actualizar cueste dos clics y no obligue a nadie.

## 5. NO-alcance

Cada exclusión lleva el porqué en forma de **qué hipótesis del producto deja sin validar**.

1. **E1 · Notificaciones push y avisos que interrumpen** — la señal es "llegué y consulto el estado actual", no "algo exige mi atención ahora". No toca ninguna de las dos decisiones que queremos cambiar; añade permisos, canal y presión.
2. **E2 · Integración con Slack** — es otro producto con OAuth. El dolor (preguntar por chat) se quita sin ella.
3. **E3 · Roles y permisos avanzados** — los roles son planos por definición; un equipo que necesite jerarquía no es nuestro usuario.
4. **E4 · Analítica y reporting** — no hay reporte hacia arriba: el valor es entre pares. Ningún informe cambia lo que alguien hace hoy.
5. **E5 · Comentarios en tareas** — la conversación sigue en el chat; los comentarios resucitan el rollo que queremos quitar.
6. **E6 · Estado "bloqueado" y resolución de bloqueos** — decisión ya tomada: la parte de bloqueos de la daily sigue y este MVP no la resuelve.
7. **E7 · Sprints, estimaciones, épicas, backlog priorizado e informes** — renuncia explícita, y además son justo lo que impide que actualizar cueste dos clics.
8. **E8 · Derivar el estado desde Git/PRs, CI o calendario** — el estado lo teclea la persona en segundos; derivarlo es otro producto, con integraciones y OAuth de terceros.
9. **E9 · Importación inicial y sincronización con otro gestor** — se excluyen ambas por ahora. Se supone que una carga inicial manual basta para probar el valor; la sincronización permanente además exigiría coordinar dos fuentes. Una importación única no equivale a convivencia y se reconsidera según la parte B.
10. **E10 · Entidad "equipo", espacios separados, gente en varios espacios** — fuera del MVP; se anota como supuesto, no se construye.
11. **E11 · Chat, videollamada o colaboración simultánea sobre un documento** — no es el producto.
12. **E12 · Indicadores de presencia ("quién está conectado ahora")** — el estado es de la tarea, no de la persona; la presencia es vigilancia y se rechaza a propósito.
13. **E13 · Historial completo de cambios** — suponemos que consultar el estado actual basta para decidir qué trabajo coger. Se reconsiderará si el equipo necesita conocer cambios entre visitas para coordinarse; un resumen de diferencias tampoco está incluido por defecto.
14. **E14 · Reasignar una tarea a otra persona** — solo se puede reclamar para uno mismo. El caso de uso es "elijo la tarea en la que voy a trabajar"; cederla a un tercero no aporta a ninguna de las dos decisiones que queremos cambiar.

## Supuestos

- No hay invitaciones: quien se registra entra en el único espacio compartido. Un espacio = una instancia.
- La fecha de vencimiento es opcional: no todo trabajo tiene plazo.
- [SUPUESTO] "Mis tareas" = tareas cuyo reclamante actual soy yo. Si la creé y nadie la ha reclamado, no aparece en esa vista, aunque inicialmente figure como responsable. Si otra persona la reclama después, deja de aparecer en mi vista. Es una decisión del autor distinta de filtrar solo por responsable; su hipótesis y reversión se declaran debajo.
- Reclamar una tarea ya reclamada por alguien se permite, pero la lista muestra al responsable actual: es una señal de cortesía, no un bloqueo.
- La lista arranca vacía y se llena a mano. No hay importación (coherente con E9): el primer día el equipo migra sus tareas una por una, y el coste es real.
- El mecanismo de actualización automática se decidirá al implementar; aquí se fija el comportamiento de producto, no su arquitectura.

## Decisiones de recorte (autor)

- **El responsable no es un campo que se rellena.** Se deriva de quien crea la tarea, y lo cambia quien la reclama (I2, I5). Con esto desaparece la contradicción entre "sin campos obligatorios" y "tarea con responsable", y desaparece la necesidad de un selector de persona al crear.
- **El filtro por responsable entra en el alcance** (I6). Sin él, la lista común no es la cola de trabajo que promete la propuesta de valor.
- **No hay asignación ni reasignación a terceros** (E14). Solo reclamar para uno mismo.

---

# Parte B — las tres líneas

## 1. Los dos números

**8 → 9: un elemento neto más, no un recorte neto.**

Recuento corregido después del intento contra las listas originales: la primera propuesta enumera ocho elementos; la final conserva esos ocho, concreta el responsable y amplía el filtro existente, y añade «reclamar tarea» como noveno elemento. No se retiró ningún elemento completo de la lista inicial. La asignación a terceros se excluyó como variante, pero nunca fue un décimo elemento numerado de aquella propuesta. El 10 → 9 anterior era un error de conteo del borrador de IA aceptado en el intento.

## 2. Tres exclusiones que mantuve y defendí, y por qué

Estas tres exclusiones ya venían fuera en la ficha; las ratifiqué, no son tres elementos retirados de la propuesta inicial de ocho. El recorte nuevo del autor fue excluir asignaciones a terceros (E14).

- **Notificaciones push** — no validan la hipótesis de que la señal "espere y baste". Un aviso que interrumpe no es lo que estamos vendiendo: lo que estamos vendiendo es que abras la lista y consultes el estado actual. Añade permisos, canal y presión, y nada de eso dice si el problema real (preguntar por chat) está resuelto.
- **Comentarios en tareas** — no validan que desaparezca la ronda de "¿en qué estás?". Si los comentarios entran, la conversación vuelve dentro de la herramienta y el producto se convierte en otro chat que hay que mirar: es el rollo que la ficha manda quitar.
- **Sprints, estimaciones y backlog priorizado** — no validan que actualizar cueste dos clics. Las estimaciones son exactamente el campo obligatorio que el producto renuncia a; si el MVP los metiera, "sin campos obligatorios" dejaría de ser cierto, y con él la razón por la que el estado se mantiene al día.

## 3. La exclusión de la que menos seguro estoy

**E9 · No importar tareas de otro gestor.** Es la que menos puedo defender, porque se contradice con algo que la propia ficha afirma en dos sitios: que FlowSync *sustituye* al gestor de tareas, no que convive con él, y que el equipo de referencia hoy usa "un gestor de tareas pesado". Si sustituimos sin importar nada, el primer día la lista está vacía: nadie ve el valor hasta que suelte su gestor y migre a mano, tarea por tarea. Lo que se contradice es **"sustituye al gestor" contra "el primer día no hay nada que mostrar"**, y lo barato contra lo que valida: la exclusión es barata de construir, pero es la que puede hacer que la hipótesis central (que el equipo cancele la ronda en una semana) no llegue a comprobarse nunca, porque el equipo se queda en el gestor viejo.

**Hipótesis para mantenerla fuera:** un equipo puede trasladar manualmente una lista de tamaño real y llegar a probar la coordinación en la primera semana.

**Entraría si:** en una prueba con el equipo observamos que la carga manual es el impedimento principal para empezar a usar FlowSync. No bastaría con que no se elimine la ronda de estado: antes habría que comprobar que la causa fue la migración inicial. Se reconsideraría una importación mínima de una sola vez y en un sentido, sin sincronización permanente. Si el equipo carga sus tareas a mano y prueba el producto, la importación seguiría fuera. No hay resultados de esa prueba todavía.

## Desviaciones y supuestos frente a la ficha — revisión posterior

Las siguientes hipótesis y condiciones de reversión se explicitan después del intento. No son validaciones realizadas ni decisiones que se atribuyan retroactivamente al tiempo del ejercicio.

- **Responsable derivado y reclamación (I2/I5/E14):** la ficha pide responsable pero no define cómo se elige. Hipótesis: cada persona puede coger su trabajo sin asignaciones a terceros. Volveríamos a evaluar un selector si el equipo necesita repartir trabajo antes de que alguien lo reclame y la reclamación no permite coordinarlo.
- **Filtro por responsable y vista solo de reclamadas (I6):** ampliación y decisión explícitas del autor. Hipótesis: separar el trabajo reclamado facilita elegir la siguiente tarea. Reconsideraríamos la vista si los usuarios pierden tareas recién creadas o no comprenden la diferencia entre responsable y reclamante.
- **Vencimiento opcional y tres estados (I2/I4):** concreciones que la ficha no detalla por completo. Hipótesis: basta esta información para la coordinación básica. Se revisan si existen tareas necesarias que no puedan representarse o si la falta de fecha impide decidir qué atender. No se añade un estado de bloqueos sin reconsiderar el no-alcance.
- **Espacio sin invitaciones:** supuesto adicional, no una exigencia de la ficha. Hipótesis: el caso de estudio usa una instancia destinada al grupo previsto. Se revisaría antes de abrir registros a personas ajenas al equipo; «roles planos» no determina por sí solo quién puede entrar.
- **Consultar estado actual en vez de un resumen de cambios entre visitas (I8/E13):** interpretación reducida de «ver qué se ha movido». Hipótesis: el estado actual es suficiente. Reconsideraríamos un resumen si las pruebas muestran que el equipo no puede detectar lo relevante al regresar.
- **Carga manual inicial (E9):** supuesto adicional y exclusión incierta; su hipótesis y condición de reconsideración se detallan en la parte B.

**Procedencia de la revisión:** los tres tramos se completaron y corrigieron después del intento, con asistencia de Codex. Se recuperaron datos de la sesión original y se separaron hechos, decisiones del autor y supuestos; no se afirma haber satisfecho todo dentro de los 45 minutos.
