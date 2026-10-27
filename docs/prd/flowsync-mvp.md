# FlowSync — PRD del MVP

Fecha: 2026-10-27. Fuente: [alcance-mvp.md](alcance-mvp.md), el alcance consensuado. Si este PRD y el alcance discrepan, manda el alcance.

Este documento describe producto: qué necesita la persona usuaria, qué debe hacer FlowSync y cómo se sabe que lo hace. Cómo se construye se decide en la spec de implementación.

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
9. Pruebas automáticas de todo lo anterior.

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
- **RF-2.** El registro se rechaza, con un mensaje en castellano junto al dato que falla, si el email no es válido, si ya está registrado, si la contraseña tiene menos de 8 o más de 32 caracteres, o si las dos contraseñas no coinciden.
- **RF-3.** Una persona registrada puede iniciar sesión con email y contraseña. Si el email o la contraseña no son correctos, el mensaje no revela cuál de los dos ha fallado ni si ese email tiene cuenta.
- **RF-4.** **[SUPUESTO]** Tras registrarse o iniciar sesión, la persona llega directamente a la lista del equipo.
- **RF-5.** La sesión se mantiene al recargar la página o cerrar y reabrir el navegador, hasta que la persona cierra sesión.
- **RF-6.** Una persona puede cerrar sesión. Después, no puede ver ni modificar tareas sin volver a iniciar sesión.
- **RF-7.** Sin sesión iniciada no se puede ver ni modificar ninguna tarea; cualquier intento lleva a la pantalla de inicio de sesión.
- **RF-8.** Toda persona registrada pertenece al único espacio del equipo y tiene los mismos permisos que las demás.

### E2 · Gestión de tareas

- **RF-9.** Una persona puede crear una tarea indicando título, responsable y, opcionalmente, fecha de vencimiento.
- **RF-10.** El título es obligatorio: un título vacío o formado solo por espacios no se acepta y se avisa junto al título. **[SUPUESTO]** El título tiene como máximo 200 caracteres; si se pasa, se avisa y no se guarda.
- **RF-11.** Al crear una tarea, el responsable viene preseleccionado con quien la crea y puede cambiarse por cualquier otra persona registrada; para elegirlo se ofrecen todas las personas registradas. No se puede crear una tarea sin responsable.
- **RF-12.** La fecha de vencimiento es un día, sin hora. Se puede dejar vacía. Una fecha que no existe (p. ej. 30 de febrero) no se acepta y se avisa. **[SUPUESTO]** Se admiten fechas pasadas; la tarea aparece vencida desde que se guarda (RF-23).
- **RF-13.** **[SUPUESTO]** Toda tarea nueva se crea en estado *pendiente*.
- **RF-14.** Cualquier persona puede editar el título, el responsable y la fecha de cualquier tarea, incluida una que no creó ni tiene asignada. Al editar se aplican las reglas de RF-10 y RF-12, el responsable sigue siendo obligatorio y la fecha se puede quitar.
- **RF-15.** Cualquier persona puede cambiar el estado de cualquier tarea a cualquiera de los otros dos estados. **[SUPUESTO]** No hay transiciones prohibidas: de *hecho* se puede volver a *pendiente* o *en curso*.
- **RF-16.** Desde la lista, una persona puede marcar una tarea como *en curso* con dos clics como máximo, sin salir de la lista. Se cuenta cada clic, también el que despliega opciones.
- **RF-17.** No existe forma de borrar una tarea.
- **RF-18.** Quien crea o modifica una tarea ve el resultado en el tiempo de RNF-3, y el cambio no se pierde: sigue ahí al volver a abrir FlowSync.

### E3 · Actividad del equipo

- **RF-19.** Hay una única lista con todas las tareas del espacio. De cada tarea se ve el título, el responsable, el estado y, si aplica, la marca de vencida.
- **RF-20.** **[SUPUESTO]** El responsable se muestra por su nombre o, si no tiene nombre, por su email. Por tanto, el email de quien no tiene nombre es visible para todo el equipo; con roles planos se acepta.
- **RF-21.** **[SUPUESTO]** La lista se ordena por fecha de creación, la más reciente arriba. El orden no cambia cuando alguien modifica una tarea.
- **RF-22.** La lista se puede filtrar por un estado (*pendiente*, *en curso* o *hecho*) o mostrar todos. **[SUPUESTO]** Por defecto se muestran todos.
- **RF-23.** Una tarea está vencida si tiene fecha y esa fecha es anterior a hoy. **[SUPUESTO]** Una tarea en estado *hecho* nunca se marca como vencida, y una tarea que vence hoy no está vencida.
- **RF-24.** Una tarea sin fecha nunca está vencida.
- **RF-25.** **[SUPUESTO]** "Hoy" es el día que es para quien mira la lista, en su propio huso horario. Por eso, con husos horarios distintos, la marca de vencida de una misma tarea puede diferir como mucho en un día entre dos personas, como acepta el alcance.
- **RF-26.** Lo que cambie otra persona (tarea nueva, edición o cambio de estado) aparece en la lista de los demás en 10 segundos como máximo, sin que tengan que hacer nada.
- **RF-27.** Al aparecer cambios de otras personas, la lista mantiene el filtro activo. Además:
  - Una tarea que, por un cambio ajeno, deja de cumplir el filtro activo desaparece de la lista filtrada, y una que pasa a cumplirlo aparece.
  - Si quien mira está editando una tarea y otra persona la cambia, no pierde lo que estaba escribiendo. Al guardar se aplica RNF-2 y la lista muestra el resultado.
- **RF-28.** La lista no muestra quién está conectado, cuándo se conectó alguien por última vez ni quién hizo cada cambio o cuándo.
- **RF-29.** Si la sesión se cierra con la lista abierta (por ejemplo, porque la persona cerró sesión en otra pestaña), vuelve a la pantalla de inicio de sesión con un mensaje que lo explica, en el mismo plazo que RF-26. No sigue viendo una lista que parece al día y no lo está.
- **RF-30.** **[SUPUESTO]** Si la lista no puede ponerse al día (la persona se queda sin conexión o FlowSync no está disponible), lo indica de forma visible en 20 s como máximo, sin ocultar las tareas que ya muestra. El aviso desaparece cuando vuelve a ponerse al día.

## 7. Requisitos no funcionales

- **RNF-1. Frescura.** Con la lista visible en primer plano y conexión, todo cambio ajeno aparece en ≤10 s (RF-26). **[SUPUESTO]** Con la pestaña oculta no hay plazo, pero al volver a verla la lista se pone al día en ≤10 s; lo mismo al recuperar la conexión. *Se comprueba* con dos personas conectadas a la vez, cronometrando cada tipo de cambio (tarea nueva, edición, cambio de estado).
- **RNF-2. Concurrencia.** **[SUPUESTO]** Si dos personas modifican la misma tarea casi a la vez, prevalece el último cambio guardado, y ambas ven ese resultado en 10 s como máximo. No se pierde ninguna tarea creada. *Se comprueba* con dos personas que guardan a la vez cambios sobre la misma tarea.
- **RNF-3. Rendimiento percibido.** **[SUPUESTO]** Crear, editar o cambiar de estado una tarea se refleja para quien lo hace en menos de 1 s, y la lista se abre en menos de 2 s con hasta 500 tareas, en una conexión de oficina o doméstica habitual. *Se comprueba* con 500 tareas creadas.
- **RNF-4. Sin paginación.** **[SUPUESTO]** Con el volumen de un equipo de 3 a 10 personas, la lista muestra todas las tareas en una sola vista, sin paginar.
- **RNF-5. Sin interrupciones.** Los cambios de otras personas no generan notificaciones, sonidos, emails, avisos emergentes ni contadores de "novedades": aparecen en la lista y nada más. Los mensajes de error y de estado de RF-2, RF-29 y RF-30 no cuentan como interrupciones.
- **RNF-6. Privacidad.** Nadie puede ver la actividad de otra persona: si está conectada, cuándo entró por última vez ni quién cambió qué. El estado es de la tarea, no de la persona. Lo único que se guarda de cada persona es lo necesario para mantener su sesión abierta, y no se usa para nada más. *Se comprueba* revisando todo lo que FlowSync permite ver a una persona del equipo.
- **RNF-7. Seguridad.** Sin sesión iniciada no se puede ver ninguna tarea ni la lista de personas del equipo. Nadie, tampoco quien administra FlowSync, puede leer la contraseña de otra persona. Excepción aceptada: al registrarse se avisa si el email ya tiene cuenta (RF-2). *Se comprueba* intentando ver tareas y personas sin sesión.
- **RNF-8. Idioma.** **[SUPUESTO]** Toda la interfaz y los mensajes de error están en castellano.
- **RNF-9. Plataforma.** **[SUPUESTO]** Navegador de escritorio, en las dos últimas versiones de Chrome, Firefox y Safari. No se garantiza el uso en móvil.
- **RNF-10. Accesibilidad.** **[SUPUESTO]** Todas las acciones (crear, editar, cambiar estado, filtrar) se pueden hacer solo con teclado. Los estados y la marca de vencida no se distinguen únicamente por color. *Se comprueba* recorriendo esos flujos solo con teclado.
- **RNF-11. Pruebas.** Cada requisito funcional (RF-1 a RF-30) tiene al menos una prueba automática que lo verifica, incluidos los que se ven en pantalla (p. ej. RF-16, RF-27, RF-29).

## 8. Restricciones

- **Tecnología fijada:** AdonisJS 7 en el servidor y React 19 en la interfaz. No se cambia de stack para el MVP.
- **Hoy no hay pruebas automáticas de lo que se ve en pantalla.** RNF-11 obliga a incorporarlas; cómo, se decide en la spec de implementación.
- **El registro y el inicio de sesión ya existen** (registro, inicio y cierre de sesión) y se reutilizan tal cual. E1 no los rehace: como mucho los conecta con la lista del equipo.
- **Una instalación es un equipo.** No hay varios equipos ni invitaciones; el registro abierto es la forma de entrar. Vale para el caso de estudio, no para producción.
- **No se exige tiempo real.** El requisito es ver los cambios en ≤10 s (RF-26), no al instante.
- **Sin conexión con otras herramientas** (repositorios de código, calendario, inicio de sesión con cuentas de terceros, envío de emails).
- **Fechas sin hora ni zona horaria.**
- **Caso de estudio.** No hay usuarios reales con los que medir; ver §9.

## 9. Métricas de éxito

**Criterio principal (del alcance):** tras una semana de uso, el equipo cancela la ronda de "¿en qué estás?" de la daily y nadie pide que vuelva.

Como es un caso de estudio, todas las métricas son hipótesis; no se pueden medir con usuarios reales. Si se llegaran a medir, sería por observación de la daily y una pregunta en la retro, no por telemetría: el producto no registra actividad de personas (RNF-6).

| # | Métrica | Umbral | Cómo se comprueba |
|---|---|---|---|
| M1 | Ronda de "¿en qué estás?" cancelada | Cancelada al acabar la semana 1; **[SUPUESTO]** sin peticiones de recuperarla en la semana 2 | Decisión del equipo en la retro |
| M2 | Estado fiable | **No se puede medir.** La única forma prevista de contrastarlo es la ronda de la daily, y M1 pide eliminarla en la primera semana. En esa semana hay 5 dailies, no las 10 que exige el umbral, y en cuanto M1 se cumple ya no hay ronda con la que contrastar. | — |
| M3 | Sin trabajo duplicado | **[SUPUESTO]** 0 episodios en la semana de dos personas empezando lo mismo sin saberlo | Pregunta en la retro |
| M4 | Uso diario | **[SUPUESTO]** Cada persona cambia el estado de al menos una tarea cada día laborable | Pregunta en la retro (sin telemetría por persona) |
| M5 | Sustitución del gestor anterior | **[SUPUESTO]** Ninguna tarea se crea ni actualiza en el gestor anterior a partir del día 3 | Revisión del gestor anterior |

**Señal de alarma:** el riesgo de información desactualizada no tiene detector, porque M2 era la señal y no se puede medir. El alcance prevé recuperar "Cambió hace…" si ese riesgo se confirma (alcance §5), pero el MVP no tiene forma de confirmarlo. Si la lista deja de leerse de un vistazo, lo primero que se añade es el filtro por responsable.

**Criterio de terminado del MVP** (sí verificable en el caso de estudio):

1. RF-1 a RF-30 cubiertos por pruebas automáticas que pasan (RNF-11).
2. Demostración con dos personas conectadas a la vez: la segunda crea una tarea, la reasigna y la marca *en curso*, y la primera ve cada cambio en ≤10 s sin recargar (RF-26).
3. Marcar una tarea como *en curso* desde la lista con dos clics como máximo (RF-16).

## 10. Puntos abiertos

Hallazgos de la revisión adversarial del 2026-10-27 que este documento no decide. Mientras no se decidan, mandan las secciones 1 a 9. La fecha de vencimiento y el filtro por estado siguen dentro del alcance: un punto que los cuestiona puede cambiar cómo se comportan, no sacarlos.

### Decisiones de producto

- **PA-1. El incentivo para mantener el estado al día.**
  - Argumento: §3 se sostiene en que la lista es la cola de trabajo de cada persona. Pero "mis tareas" y el filtro por responsable están fuera, así que esa cola sale mezclada con la del resto. Además, un *en curso* de hoy no se distingue de uno abandonado hace días, porque "cambió hace…" también está fuera. Si nadie actualiza, la lista miente y la ronda sigue, sin que falle ningún requisito.
  - Para decidir: si se reabre una de esas exclusiones del alcance, o si se acepta el riesgo y §3 se marca como [SUPUESTO] crítico.
- **PA-2. Sustituir al gestor sin importar nada.**
  - Argumento: el equipo pasa de un gestor pesado a tareas que solo tienen título, sin importación. Nada dice cómo entra el trabajo existente el primer día. Si se queda en el gestor anterior, se actualiza en dos sitios, que es lo que el alcance señala como la muerte de esta categoría.
  - Para decidir: qué trabajo tiene que estar en FlowSync el primer día y quién lo carga, y si la sustitución se marca como [SUPUESTO].
- **PA-3. Qué significa "en curso".**
  - Argumento: hay tres huecos por los que la señal puede mentir:
    1. Cualquiera puede marcar *en curso* una tarea de otra persona sin reasignarla (RF-15), y entonces la lista atribuye el trabajo a quien no lo hace.
    2. No hay límite de tareas *en curso* por persona.
    3. RNF-2 no dice si en un conflicto gana el último cambio de cada dato o la tarea entera. En el segundo caso, corregir un título puede deshacer un cambio de estado de otra persona.
  - Para decidir: una regla para cada uno de los tres casos.
- **PA-4. Qué se ve primero al abrir la lista.**
  - Argumento: el filtro arranca en "todos" (RF-22), el orden es por creación (RF-21) y las tareas *hecho* no se borran. Con el uso, la lista crece y una tarea antigua que alguien acaba de empezar queda al final, así que J4 ("de un vistazo") se degrada. El filtro por estado sigue dentro del alcance; lo abierto es su valor por defecto y el orden.
  - Para decidir: con qué filtro arranca la lista y si las *hecho* van al final.
- **PA-5. Requisitos que el alcance no pide.**
  - Argumento: el PRD añade cosas que, juntas, pueden costar más que el núcleo:
    - Pruebas automáticas de lo que se ve en pantalla (RNF-11).
    - Conservar lo que se está escribiendo mientras llegan cambios (RF-27).
    - Qué pasa con la sesión cerrada o sin conexión (RF-29, RF-30).
    - Pestaña oculta y reconexión (RNF-1).
    - Tres navegadores en dos versiones (RNF-9).
    - Uso solo con teclado (RNF-10).
    - Rendimiento con 500 tareas (RNF-3).
  - Para decidir: estimar en la spec de implementación cuánto cuestan frente al núcleo, y elegir cuáles se quedan y cuáles se declaran ampliación del alcance.
- **PA-6. Métricas que no distinguen el éxito del fracaso.**
  - Argumento:
    - M1 es una decisión que el equipo cuenta en la retro, y el equipo es inventado. Aunque fuera real, la ronda podría cancelarse por otras razones.
    - M3 (0 episodios en una semana) es lo esperable también sin FlowSync, porque no se sabe cada cuánto pasaba el episodio de referencia.
    - M4 depende de la memoria de cada persona, porque RNF-6 deja fuera la telemetría.
    - Falta la métrica objetiva más barata: cronometrar la daily antes y después. El alcance ya da la línea base: la ronda ocupa la mitad de 15 minutos.
  - Para decidir: qué métricas se mantienen y si se añade la duración de la daily.
- **PA-7. Cualquiera que se registre ve al equipo.**
  - Argumento: RF-11 ofrece todas las personas registradas para elegir responsable, y RF-20 muestra el email de quien no tiene nombre. Con el registro abierto, cualquiera que se registre ve a todo el equipo y algunos emails.
  - Para decidir: si se acepta como consecuencia del registro abierto y se declara.
- **PA-8. Reasignarse una tarea no tiene límite de pasos.**
  - Argumento: J2 exige reasignar (RF-14) y además cambiar el estado. RF-16 solo acota lo segundo.
  - Para decidir: si reasignarse tiene un máximo de clics y cuál.
- **PA-9. "Dos clics" no tiene equivalente con teclado.**
  - Argumento: RF-16 acota los clics, pero RNF-10 pide poder hacerlo todo solo con teclado y no pone límite de pulsaciones.
  - Para decidir: el máximo de pulsaciones equivalente.

### Subsanables durante la construcción

- **PA-10. RNF-3 no se puede probar tal como está.**
  - Argumento: "conexión de oficina o doméstica habitual" no fija condiciones medibles.
  - Para decidir: fijar en la spec las condiciones de red de la medición.
- **PA-11. RNF-6 dice algo que el propio PRD contradice.**
  - Argumento: "lo único que se guarda de cada persona es lo necesario para mantener su sesión" choca con RF-1 y RF-20, que guardan y muestran el nombre y el email. Además, "no se usa para nada más" no se puede comprobar mirando la interfaz, que es lo que dice su *Se comprueba*.
  - Para decidir: reformular qué se guarda de cada persona y cómo se verifica.
- **PA-12. §8 dice "tal cual", pero RF-4 y RF-29 piden cambios.**
  - Argumento: §8 reutiliza el registro y el inicio de sesión sin cambios. Sin embargo, RF-4 (llegar a la lista al entrar) y RF-29 (volver al inicio de sesión cuando la sesión se cierra) pueden exigir comportamiento nuevo.
  - Para decidir: comprobar qué hace ya el inicio de sesión actual y ajustar §8 o los RF.
- **PA-13. "Hoy" depende del huso horario.**
  - Argumento: RF-25 toma el huso de quien mira, mientras §4 deja fuera la zona horaria del vencimiento. La fecha de vencimiento sigue dentro del alcance; lo abierto es cómo se prueba.
  - Para decidir: si se acepta tal cual y con qué husos se prueba.
