# FlowSync — PRD del MVP

Fecha: 2026-10-27. Fuente: [alcance-mvp.md](alcance-mvp.md), el alcance consensuado. Si este PRD y el alcance discrepan, manda el alcance.

Este documento describe producto: qué debe hacer el sistema y cómo se sabe que lo hace. Modelo de datos, endpoints, arquitectura y mecanismos concretos se deciden en la spec de implementación.

> **Caso de estudio, no cliente real.** El equipo de referencia es inventado y no hay datos de mercado. Lo que no viene del alcance y se ha tenido que decidir aquí va marcado como **[SUPUESTO]**.

## 1. Problema y contexto

En un equipo remoto pequeño, nadie ve en qué está el resto sin interrumpir a alguien. Hoy se pregunta de dos maneras:

- Por Slack, interrumpiendo a quien se pregunta.
- En la ronda de "¿en qué estás?" de la daily, que se come la mitad de sus 15 minutos.

Cuando nadie pregunta, el coste es trabajo duplicado. Episodio de referencia: dos personas tocaron el mismo módulo la misma semana porque una empezó sin que la otra lo supiera, y se perdieron dos días.

El equipo de referencia usa hoy un gestor de tareas pesado y aun así hace la ronda. **[SUPUESTO]** El gestor no responde a la pregunta porque su configuración hace caro mantener el estado al día, así que nadie se fía de él y se pregunta en voz alta.

**Lo que el MVP quiere eliminar es la ronda de "¿en qué estás?".** La daily no desaparece: la parte de bloqueos sigue y este MVP no la resuelve.

## 2. Usuarios y jobs-to-be-done

**Usuario único:** persona de un equipo remoto de 3 a 10 personas. Todas tienen el mismo rol: todo el mundo ve y edita lo mismo. No hay managers como usuario objetivo ni reporte hacia arriba.

**Equipo de referencia (caso de estudio):** 6 personas de un producto SaaS, repartidas en 3 husos horarios, con una daily de 15 minutos por videollamada y un gestor de tareas pesado.

Jobs-to-be-done:

| # | Cuando… | quiero… | para… | Lo cubren |
|---|---|---|---|---|
| J1 | voy a empezar algo | ver si otra persona ya lo tiene en curso | no duplicar trabajo | RF-19, RF-22, RF-26 |
| J2 | termino una tarea | elegir la siguiente entre mis pendientes, o quedarme una pendiente de otra persona | seguir sin preguntar a nadie qué hago | RF-14, RF-19, RF-22 (filtro *pendiente* y leer la lista; sin vista "mis tareas", ver §4) |
| J3 | empiezo o termino algo | dejarlo reflejado en dos clics | que el resto lo sepa sin que me interrumpan | RF-15, RF-16 |
| J4 | abro la lista al empezar el día o al volver de una reunión | ver de un vistazo quién está con qué y qué está vencido | no tener que preguntar ni esperar a la daily | RF-19, RF-23, RF-26 |

Ganan dos personas: quien iba a empezar algo que otra persona ya tenía (J1, J2) y quien deja de preguntar o de ser interrumpido para contar cómo va (J3, J4).

## 3. Propuesta de valor

Una lista de tareas del equipo en la que cada persona marca lo que tiene **en curso** en dos clics. Así cualquiera ve de un vistazo quién está con qué antes de empezar algo, sin preguntar ni esperar a la daily.

Se sostiene porque quien escribe el estado gana algo en el momento: esa lista es su cola de trabajo y deja de recibir interrupciones. **FlowSync es donde se hace el trabajo, no donde se informa de él**: sustituye al gestor de tareas, no convive con él.

Decisiones que habilita:

1. No empezar algo que otra persona ya tiene en curso.
2. Elegir lo siguiente entre mis tareas pendientes, o reasignándome una tarea pendiente de otra persona.

## 4. Alcance / Fuera de alcance

### Dentro

1. Un único espacio compartido: cualquier persona registrada ve todas las tareas. Se reutiliza la autenticación que ya existe.
2. Crear una tarea con título (obligatorio), responsable (obligatorio; por defecto, quien la crea) y fecha de vencimiento (opcional).
3. Una sola lista del equipo que muestra título, responsable, estado y si la tarea está vencida.
4. Tres estados fijos y no configurables: **pendiente**, **en curso** y **hecho**. Cualquier persona puede cambiar el estado de cualquier tarea.
5. Editar título, responsable y fecha, lo que cubre reasignar y corregir errores.
6. Filtro por estado.
7. Tareas vencidas marcadas. La fecha es un día, sin hora.
8. Los cambios de otras personas aparecen en la lista en 10 segundos como máximo, sin recargar.
9. Tests automáticos de todo lo anterior.

### Fuera

Resumen; el porqué de cada exclusión está en [alcance-mvp.md §5](alcance-mvp.md#5-no-alcance-fuera).

- Estado "bloqueado".
- Sincronización en tiempo real (por debajo de los 10 s), chat, videollamada y edición simultánea del mismo contenido.
- "Cambió hace…" y ordenar por fecha de cambio.
- Borrar tareas. Una tarea creada por error se marca como hecha.
- Vista "mis tareas", filtro por responsable y búsqueda.
- Descripción, comentarios, adjuntos, subtareas, etiquetas y prioridad.
- Tablero kanban y reordenar arrastrando.
- Varios equipos o espacios, invitaciones, roles y permisos.
- Presencia ("quién está conectado"), indicadores de actividad de personas, historial y feed de actividad.
- Notificaciones (push, email) y resumen diario.
- Estado derivado de Git, PRs, CI o calendario; importar de otro gestor o convivir con él.
- Sprints, estimaciones, épicas como forma de agrupar tareas dentro del producto, backlog priorizado e informes.
- Hora y zona horaria en el vencimiento.
- Recuperar contraseña y editar perfil.
- App móvil.

## 5. Épicas del MVP

- **E1 «Cuentas y acceso»** — registro, inicio y cierre de sesión y acceso al espacio único, sobre la autenticación que ya existe.
- **E2 «Gestión de tareas»** — crear tareas, editar título, responsable y fecha, y cambiar su estado.
- **E3 «Actividad del equipo»** — la lista del equipo: qué muestra, filtro por estado, marca de vencida y cambios de otras personas visibles en ≤10 s.

Nota sobre E3: el alcance excluye la "Sincronización en tiempo real (E3)". Esa exclusión se mantiene: E3 cubre ver los cambios en ≤10 s, que el alcance sí incluye (§4, punto 8), no el tiempo real. E3 tampoco incluye feed, historial de actividad ni presencia, que siguen fuera (§4).

## 6. Requisitos funcionales

Cada requisito indica su épica. "Persona" es siempre una persona registrada con sesión iniciada salvo que se diga lo contrario.

### E1 · Cuentas y acceso

- **RF-1.** Cualquiera puede registrarse con email, contraseña y confirmación de contraseña; el nombre es opcional. El registro está abierto: no hace falta invitación.
- **RF-2.** El registro se rechaza, con un mensaje en castellano junto al campo afectado, si el email no es válido, si ya está registrado, si la contraseña tiene menos de 8 o más de 32 caracteres, o si la confirmación no coincide.
- **RF-3.** Una persona registrada puede iniciar sesión con email y contraseña. Con credenciales incorrectas se muestra un error que no revela si el email existe (comportamiento de la auth actual).
- **RF-4.** **[SUPUESTO]** Tras registrarse o iniciar sesión, la persona llega directamente a la lista del equipo.
- **RF-5.** La sesión se mantiene al recargar la página o cerrar y reabrir el navegador, hasta que la persona cierra sesión.
- **RF-6.** Una persona puede cerrar sesión. Después, no puede ver ni modificar tareas sin volver a iniciar sesión.
- **RF-7.** Sin sesión iniciada no se puede ver ni modificar ninguna tarea; cualquier intento lleva a la pantalla de inicio de sesión.
- **RF-8.** Toda persona registrada pertenece al único espacio del equipo y tiene los mismos permisos que las demás.

### E2 · Gestión de tareas

- **RF-9.** Una persona puede crear una tarea indicando título, responsable y, opcionalmente, fecha de vencimiento.
- **RF-10.** El título es obligatorio: un título vacío o formado solo por espacios se rechaza con un mensaje junto al campo. **[SUPUESTO]** El título admite hasta 200 caracteres; uno de 201 o más se rechaza con un mensaje junto al campo.
- **RF-11.** Al crear una tarea, el responsable viene preseleccionado con quien la crea y puede cambiarse por cualquier otra persona registrada; para elegirlo se ofrecen todas las personas registradas. No se puede crear una tarea sin responsable.
- **RF-12.** La fecha de vencimiento es un día del calendario, sin hora. Se puede dejar vacía. Una fecha que no existe (p. ej. 30 de febrero) se rechaza con un mensaje junto al campo. **[SUPUESTO]** Se admiten fechas pasadas; la tarea aparece vencida desde que se guarda (RF-23).
- **RF-13.** **[SUPUESTO]** Toda tarea nueva se crea en estado *pendiente*.
- **RF-14.** Cualquier persona puede editar el título, el responsable y la fecha de cualquier tarea, incluida una que no creó ni tiene asignada. Al editar se aplican las reglas de RF-10 y RF-12, el responsable sigue siendo obligatorio y la fecha se puede quitar.
- **RF-15.** Cualquier persona puede cambiar el estado de cualquier tarea a cualquiera de los otros dos estados. **[SUPUESTO]** No hay transiciones prohibidas: de *hecho* se puede volver a *pendiente* o *en curso*.
- **RF-16.** Desde la lista, una persona puede marcar una tarea como *en curso* con dos clics como máximo, sin salir de la lista. Cuenta como clic cada pulsación de puntero, incluida la que abre un desplegable.
- **RF-17.** No existe forma de borrar una tarea.
- **RF-18.** Toda creación o modificación confirmada es visible para quien la hizo en el tiempo de RNF-3 y persiste: sigue ahí al recargar la página.

### E3 · Actividad del equipo

- **RF-19.** Hay una única lista con todas las tareas del espacio. Cada fila muestra título, responsable, estado y, si aplica, la marca de vencida.
- **RF-20.** **[SUPUESTO]** El responsable se muestra por su nombre o, si no tiene nombre, por su email. Por tanto, el email de quien no tiene nombre es visible para todo el equipo; con roles planos se acepta.
- **RF-21.** **[SUPUESTO]** La lista se ordena por fecha de creación, la más reciente arriba. El orden no cambia cuando alguien modifica una tarea.
- **RF-22.** La lista se puede filtrar por un estado (*pendiente*, *en curso* o *hecho*) o mostrar todos. **[SUPUESTO]** Por defecto se muestran todos.
- **RF-23.** Una tarea está vencida si tiene fecha y esa fecha es anterior a hoy. **[SUPUESTO]** Una tarea en estado *hecho* nunca se marca como vencida, y una tarea que vence hoy no está vencida.
- **RF-24.** Una tarea sin fecha nunca está vencida.
- **RF-25.** **[SUPUESTO]** "Hoy" es la fecha del calendario en el dispositivo de quien mira la lista. Por eso, con husos horarios distintos, la marca de vencida de una misma tarea puede diferir como mucho en un día entre dos personas, como acepta el alcance.
- **RF-26.** Lo que cambie otra persona (tarea nueva, edición o cambio de estado) aparece en la lista de los demás en 10 segundos como máximo, sin recargar la página ni hacer nada.
- **RF-27.** Al aparecer cambios de otras personas, la lista mantiene el filtro activo. Además:
  - Una tarea que, por un cambio ajeno, deja de cumplir el filtro activo desaparece de la lista filtrada, y una que pasa a cumplirlo aparece.
  - Si quien mira está editando una tarea, el formulario no se sustituye ni se vacía por un cambio ajeno sobre esa misma tarea. Al guardar se aplica RNF-2, y la fila muestra el resultado guardado.
- **RF-28.** La lista no muestra quién está conectado, cuándo se conectó alguien por última vez ni quién hizo cada cambio o cuándo.
- **RF-29.** Si la sesión deja de ser válida con la lista abierta (por ejemplo, porque se cerró sesión en otra pestaña), la persona vuelve a la pantalla de inicio de sesión con un mensaje que lo explica, en el mismo plazo que RF-26. La lista no sigue mostrándose como si estuviera al día.
- **RF-30.** **[SUPUESTO]** Si la lista no puede ponerse al día (sin conexión o el servidor no responde), lo indica de forma visible en 20 s como máximo, sin ocultar las tareas que ya muestra. El aviso desaparece cuando vuelve a ponerse al día.

## 7. Requisitos no funcionales

- **RNF-1. Frescura.** Con la lista visible en primer plano y conexión, todo cambio ajeno aparece en ≤10 s (RF-26). **[SUPUESTO]** Con la pestaña oculta no hay plazo, pero al volver a verla la lista se pone al día en ≤10 s; lo mismo al recuperar la conexión. *Se comprueba* con dos sesiones de cuentas distintas, cronometrando cada tipo de cambio (alta, edición, cambio de estado).
- **RNF-2. Concurrencia.** **[SUPUESTO]** Si dos personas modifican la misma tarea casi a la vez, prevalece el último cambio guardado, y ambas ven ese resultado en 10 s como máximo. No se pierde ninguna tarea creada. *Se comprueba* guardando dos ediciones de la misma tarea desde dos sesiones.
- **RNF-3. Rendimiento percibido.** **[SUPUESTO]** Crear, editar o cambiar de estado una tarea se refleja para quien lo hace en menos de 1 s, y la lista carga en menos de 2 s con hasta 500 tareas, con una latencia de red al servidor inferior a 100 ms. *Se comprueba* midiendo con 500 tareas cargadas.
- **RNF-4. Sin paginación.** **[SUPUESTO]** Con el volumen de un equipo de 3 a 10 personas, la lista muestra todas las tareas en una sola vista, sin paginar.
- **RNF-5. Sin interrupciones.** Los cambios de otras personas no generan notificaciones, sonidos, emails, avisos emergentes ni contadores de "novedades": aparecen en la lista y nada más. Los mensajes de error y de estado de RF-2, RF-29 y RF-30 no cuentan como interrupciones.
- **RNF-6. Privacidad.** El producto no muestra ni expone a otras personas actividad de nadie (presencia, conexiones, quién cambió qué), ni en la interfaz ni en las respuestas del servidor. El estado es de la tarea, no de la persona. Excepción conocida: la auth actual guarda internamente el último uso de cada sesión; no se expone ni se usa para nada del producto. *Se comprueba* revisando la interfaz y las respuestas del servidor.
- **RNF-7. Seguridad.** Ninguna tarea ni el listado de personas es accesible sin sesión iniciada. Las contraseñas no se guardan ni se muestran en claro. Excepción aceptada: el registro revela si un email ya está registrado (RF-2), como hace la auth actual. *Se comprueba* pidiendo tareas y personas sin sesión.
- **RNF-8. Idioma.** **[SUPUESTO]** (el frontend actual ya está en castellano) Toda la interfaz y los mensajes de error están en castellano.
- **RNF-9. Plataforma.** **[SUPUESTO]** Navegador de escritorio, en las dos últimas versiones de Chrome, Firefox y Safari. No se garantiza el uso en móvil.
- **RNF-10. Accesibilidad.** **[SUPUESTO]** Todas las acciones (crear, editar, cambiar estado, filtrar) se pueden hacer solo con teclado. Los estados y la marca de vencida no se distinguen únicamente por color. *Se comprueba* recorriendo esos flujos solo con teclado.
- **RNF-11. Tests.** Cada requisito funcional (RF-1 a RF-30) tiene al menos un test automático que lo cubre, incluidos los de interfaz (p. ej. RF-16, RF-27, RF-29), y la suite pasa sin depender del orden de ejecución ni del estado dejado por runs anteriores. RF-25 se prueba fijando la fecha del reloj.

## 8. Restricciones

- **Stack fijado:** backend AdonisJS 7 y frontend React 19. No se cambia de stack para el MVP.
- **Sin runner de tests en el frontend.** RNF-11 obliga a añadir uno para cubrir los RF de interfaz; cuál se elige se decide en la spec de implementación.
- **La autenticación ya existe** (registro, inicio y cierre de sesión, perfil) y se reutiliza tal cual. E1 no rehace auth: como mucho la conecta con la lista del equipo.
- **Una instalación es un equipo.** No hay multi-tenant ni invitaciones; el registro abierto es la forma de entrar. Vale para el caso de estudio, no para producción.
- **Sin infraestructura de tiempo real exigida.** El requisito es ver cambios en ≤10 s (RF-26), no al instante. El mecanismo se decide en la spec de implementación.
- **Sin integraciones de terceros** (Git, CI, calendario, OAuth, envío de emails).
- **Fechas sin hora ni zona horaria.**
- **Caso de estudio.** No hay usuarios reales con los que medir; ver §9.

## 9. Métricas de éxito

**Criterio principal (del alcance):** tras una semana de uso, el equipo cancela la ronda de "¿en qué estás?" de la daily y nadie pide que vuelva.

Como es un caso de estudio, todas las métricas son hipótesis; no se pueden medir con usuarios reales. Si se llegaran a medir, sería por observación de la daily y una pregunta en la retro, no por telemetría: el producto no registra actividad de personas (RNF-6).

| # | Métrica | Umbral | Cómo se comprueba |
|---|---|---|---|
| M1 | Ronda de "¿en qué estás?" cancelada | Cancelada al acabar la semana 1; **[SUPUESTO]** sin peticiones de recuperarla en la semana 2 | Decisión del equipo en la retro |
| M2 | Estado fiable | **[SUPUESTO]** En ≥9 de cada 10 dailies observadas, lo que cada persona tiene *en curso* en FlowSync coincide con lo que dice estar haciendo | Contraste en la daily, mientras exista la ronda |
| M3 | Sin trabajo duplicado | **[SUPUESTO]** 0 episodios en la semana de dos personas empezando lo mismo sin saberlo | Pregunta en la retro |
| M4 | Uso diario | **[SUPUESTO]** Cada persona cambia el estado de al menos una tarea cada día laborable | Pregunta en la retro (sin telemetría por persona) |
| M5 | Sustitución del gestor anterior | **[SUPUESTO]** Ninguna tarea se crea ni actualiza en el gestor anterior a partir del día 3 | Revisión del gestor anterior |

**Señal de alarma:** si M2 falla, se confirma el riesgo de información desactualizada y lo primero que se recupera es "Cambió hace…" (ver alcance §5). Si la lista deja de leerse de un vistazo, lo primero que se añade es el filtro por responsable.

**Criterio de terminado del MVP** (sí verificable en el caso de estudio):

1. RF-1 a RF-30 cubiertos por tests automáticos que pasan (RNF-11).
2. Demostración con dos sesiones abiertas a la vez, con cuentas distintas: la segunda crea una tarea, la reasigna y la marca *en curso*, y la primera ve cada cambio en ≤10 s sin recargar (RF-26).
3. Marcar una tarea como *en curso* desde la lista con dos clics como máximo (RF-16).
