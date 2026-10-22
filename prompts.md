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

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Antes de especificar nada, explora el repositorio y dime qué hay ya construido. Necesito dos cosas: (1) qué capabilities funcionan hoy, es decir, qué puede hacer un usuario de punta a punta; y (2) cómo es el modelo de datos actual, con entidades y relaciones en lenguaje de producto, sin código. Máximo 15 líneas. No propongas nada nuevo todavía.
```

**Mi Resumen:** 
```
Hoy FlowSync solo tiene autenticación: registro, login, perfil y logout. La única entidad de negocio es el usuario, con sus tokens de sesión. No existe nada de tareas, proyectos ni equipos. El MVP se construye sobre los usuarios que ya existen y no vuelve a especificar el acceso.
```


## Prompt 2

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Vamos a definir el alcance del MVP de FlowSync a partir de este párrafo:  Quiero que FlowSync sea una herramienta para que los equipos remotos sepan en qué está trabajando cada uno sin tener que hacer reuniones de sincronización. Algo tipo  tareas compartidas pero más en tiempo real y menos rollo que Jira. Antes de proponer algo, hazme las cinco preguntas que más reducirían la incertidumbre sobre el problema, los usuarios y el alcance. Una sola ronda, solo cinco preguntas. No bajes a modelo de datos, endpoints ni arquitectura, y no propongas alcance todavía.        
```

**Qué salió:**
```
Estas son las cinco preguntas que más incertidumbre quitarían:

  1. ¿Quién es el usuario y qué tamaño tiene el equipo? ¿Hablamos de un equipo de 3 a
     10 personas con un responsable, o de varios equipos dentro de una empresa? ¿Quién
     da de alta el equipo e invita a los demás? ¿Cada persona pertenece a un solo
     equipo o a varios?
  2. ¿Qué reunión queremos eliminar exactamente y qué decisión se tomaba en ella?
     Puede ser la daily ("qué hago hoy y qué me bloquea"), la de reparto de trabajo
     ("quién coge qué") o la de seguimiento del responsable ("cómo vamos"). Según cuál
     sea, el núcleo cambia: el estado de cada persona, el reparto de tareas o una
     vista de avance.
  3. ¿Qué significa "en tiempo real"? ¿Que los cambios aparezcan en pantalla al
     instante sin recargar? ¿Que alguien reciba un aviso cuando le afecta algo? ¿O
     basta con que la información esté siempre al día porque actualizarla cuesta poco?
     Y, en cualquier caso, ¿qué hace la gente cuando ve un cambio?
  4. ¿Qué es lo "menos rollo que Jira" que no estáis dispuestos a aceptar? Necesito
     saber el límite de simplicidad, por ejemplo: sin configuración inicial, sin
     flujos personalizados, estados fijos (por hacer, en curso, hecho), sin
     estimaciones ni sprints, o que actualizar mi estado lleve menos de 10 segundos.
     ¿Qué cosas de Jira echaríais de menos si desaparecieran?
  5. ¿Cómo sabremos que el MVP funciona y en qué plazo? Por ejemplo: que el equipo
     deje de hacer la daily durante 2 semanas, o que el X % de los miembros actualice
     su estado cada día. ¿Hay un equipo piloto real con quien probarlo? ¿Cuánto tiempo
     hay para construirlo?
```

## Prompt 3

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Estas son las respuestas del producto, ya decididas:

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

Y lo que ya está decidido que queda fuera del MVP, por si empujas funcionalidades:

- Fuera del MVP: notificaciones push, integración con Slack, roles/permisos avanzados, analítica/reporting, comentarios en tareas.

Si alguna de tus preguntas no queda cubierta, decide tú y márcalo explícitamente como supuesto. Al final, lista todos los supuestos que declaraste.
```

**Qué salió:** 
```
Las cinco preguntas, respondidas con la ficha. Lo que la ficha no cubre lo he
  decidido yo y va marcado como [SUPUESTO].

  1. Usuario y tamaño del equipo
  Equipos remotos pequeños, de 3 a 10 personas. Todos tienen los mismos permisos, sin
  responsable ni jerarquía. Hay un único espacio compartido y no existe la entidad
  "equipo". El caso de referencia es un equipo de producto SaaS de 6 personas
  repartidas en 3 husos horarios; es un caso de estudio, no un cliente real.
  - [SUPUESTO S1] Quien se registra entra directamente en el espacio compartido. No
    hay invitaciones ni alta de equipo.
  - [SUPUESTO S2] En el MVP hay una sola instalación por equipo. Quedan fuera del MVP
    varios equipos separados o una persona en más de un equipo (ya está decidido en la
    ficha).

  2. Qué reunión desaparece y qué decisión se toma
  Desaparece la ronda de "¿en qué estás?" de la daily, que ocupa la mitad de sus 15
  minutos. También deberían desaparecer las preguntas por chat. La parte de bloqueos
  de la daily se mantiene y este MVP no la resuelve.
  Las decisiones que cambia el producto son dos: no empezar algo que otra persona ya
  está tocando, y elegir lo siguiente sabiendo qué está libre. El problema que ancla
  todo es el de dos personas que tocaron el mismo módulo y perdieron dos días.

  3. Qué significa "tiempo real"
  Ver los cambios de estado de las tareas sin recargar la página y sin preguntar a
  nadie. Se trata de que la información esté fresca, no de mostrar quién está
  conectado. El estado pertenece a la tarea, no a la persona. Funciona como un resumen
  que espera a que lo mires, no como un aviso que interrumpe. No incluye
  notificaciones push, chat ni edición simultánea.
  - [SUPUESTO S3] "Ver qué se ha movido" se resuelve así: la lista se actualiza sola,
    cada tarea muestra cuándo cambió por última vez, y se puede ordenar por cambio más
    reciente. No guardaremos el "no leído desde tu última visita" de cada persona.

  4. El límite de "menos rollo que Jira"
  Crear una tarea o cambiarle el estado debe costar dos clics sobre una lista ya
  abierta, sin configuración y sin campos obligatorios. Una tarea tiene título,
  responsable, estado y fecha de vencimiento. La lista se filtra por estado y muestra
  de un vistazo lo que se ha pasado de plazo. FlowSync sustituye al gestor de tareas:
  no se integra con él ni lee tareas de otro sitio.
  Renuncias explícitas: sprints, estimaciones, épicas, backlog priorizado e informes.
  Fuera del MVP: notificaciones push, Slack, roles y permisos avanzados, analítica,
  comentarios, y derivar el estado de Git, CI o el calendario.
  - [SUPUESTO S4] Hay tres estados fijos que no se pueden configurar: Por hacer, En 
    curso y Hecha.
  - [SUPUESTO S5] Solo el título es obligatorio. El responsable y la fecha son
    opcionales. Una tarea sin responsable significa que está libre para cogerla.
  - [SUPUESTO S6] Cualquier persona puede crear, editar, reasignar y borrar cualquier
    tarea, ya que los roles son planos.
  - [SUPUESTO S7] La fecha de vencimiento es un día, sin hora. Una tarea se considera
    vencida cuando ese día ya ha pasado en la hora local de quien la mira y la tarea
    no está Hecha.

  5. Criterio de éxito y plazo
  Tras una semana de uso real, el equipo cancela la ronda de "¿en qué estás?" y nadie
  pide que vuelva. El riesgo principal a validar es que la información se quede
  desactualizada; se mitiga haciendo que actualizar cueste muy poco, no obligando a
  nadie. El alcance es una vertical fina y usable de punta a punta.
  - [SUPUESTO S8] No hay fecha límite de entrega. El alcance lo marca la vertical
    fina, no el calendario.
  - [SUPUESTO S9] Como el primer usuario es un caso de estudio, el criterio de una
    semana queda como hipótesis de validación que deberá probar un equipo real. El MVP
    no lo puede demostrar por sí solo.

  Supuestos declarados
  - S1: el registro da acceso directo al espacio único, sin invitaciones.
  - S2: un solo espacio por instalación; nada de varios equipos.
  - S3: "qué se ha movido" se ve con actualización en vivo, la hora del último cambio
    y orden por recencia, sin "no leído" por persona.
  - S4: tres estados fijos: Por hacer, En curso y Hecha.
  - S5: solo el título es obligatorio; una tarea sin responsable está libre.
  - S6: cualquiera puede crear, editar, reasignar y borrar cualquier tarea.
  - S7: la fecha de vencimiento no lleva hora; una tarea vencida es la que no está
    Hecha y cuya fecha ya pasó en la hora local de quien la mira.
  - S8: sin fecha límite de entrega.
  - S9: el criterio de una semana es una hipótesis que habrá que validar con un equipo
    real.
```

## Prompt 4

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Con todo esto, escribe el documento en docs/prd/alcance-mvp-dr.md con tres tramos:

1. "El terreno que ya existe": deja un espacio, lo escribo yo.
2. "Interrogatorio": tus cinco preguntas con sus respuestas resumidas y los supuestos que declaraste.
3. "Alcance del MVP", en cinco bloques: problema, usuarios, propuesta de valor, alcance y NO-alcance.

Sé agresivo recortando: una vertical fina y usable de punta a punta, respetando lo que ya existe en el proyecto. Numera los elementos del alcance. En el NO-alcance, justifica cada exclusión diciendo qué hipótesis del producto no ayuda a validar. Es un documento de producto: nada de tablas de base de datos, endpoints, arquitectura, casos de uso ni requisitos numerados.
```

**Qué salió:** 
```
He escrito el documento en docs/prd/alcance-mvp-dr.md con los tres tramos. El
  primero, "El terreno que ya existe", está vacío para que lo redactes tú.

  Cómo queda el alcance:
  - Base: se apoya en lo que ya funciona (registro, inicio y cierre de sesión) y añade
    una sola vertical: la lista de tareas compartida que se actualiza sola.
  - Alcance: son 9 elementos numerados. Lo principal: la lista pasa a ser la pantalla
    de inicio en lugar del perfil, crear una tarea solo pide el título, el estado se
    cambia con dos clics y cualquiera puede coger o asignar una tarea.
  - Hipótesis: formulé tres en la propuesta de valor (visibilidad, frescura y
    coordinación). Cada exclusión del NO-alcance se justifica con la hipótesis que no
    ayuda a validar.

  Dos cambios respecto a lo que hablamos antes:
  - Borrar tareas: lo he dejado fuera para recortar más. Por eso el supuesto S6 dice
    ahora "crear, editar y reasignar", sin "borrar". Una tarea terminada se marca como
    Hecha y desaparece con el filtro.
  - Supuestos: el resumen de supuestos va en una tabla de texto (número y supuesto),
    no en una tabla de base de datos. Si prefieres evitar cualquier tabla, la paso a
    lista.
```

## Prompt 5

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Revisa docs/prd/alcance-mvp-dr.md después de mi recorte. No lo corrijas ni propongas funcionalidades nuevas. Solo señala incoherencias: algo que el documento pida y a la vez prohíba, o algo que prometa y su propio alcance impida cumplir. Lista cada una con el fragmento exacto.
```

**Qué salió Ejecución 1:** 
```
He revisado. Encuentro cinco incoherencias. No he tocado el fichero.
1. Una persona ajena puede descartar la tarea de otra, pero no cambiarle el estado
  - Línea 101 (alcance 8): «Cualquiera puede quitar de la lista una tarea que no debía
    existir»
  - Línea 63 (S6): «Cualquiera […] descarta una creada por error»
  - Choca con:
    - Línea 96 (alcance 3): «su responsable la pasa entre Por hacer, En curso y Hecha»
    - Línea 110: «el estado lo teclea quien hace la tarea, no un tercero»
  - El documento prohíbe a una persona ajena tocar el estado de una tarea, pero le
    permite hacerla desaparecer, aunque esté En curso y tenga responsable.

  2. "Todos editan lo mismo" frente a "solo el responsable cambia el estado"
  - Línea 17: «roles planos: todos ven y editan lo mismo, sin jerarquía»
  - Línea 78: «todas con los mismos permisos»
  - Choca con:
    - Línea 96: solo «su responsable» cambia el estado.
    - Línea 97: «Quien la tiene puede soltarla»
    - Línea 111: editar está excluido para todos.
  - Además, la regla de que solo el responsable puede tocar su tarea es un permiso por
    tarea, y la línea 118 excluye «Roles y permisos avanzados».

  3. Una tarea abandonada no se puede liberar
  - Lo que se promete:
    - Línea 88 (H3): «si se ve qué está cogido y qué está libre»
    - Línea 49: «El riesgo principal es que la información se quede vieja»
  - Lo que lo impide:
    - Línea 97: solo «Quien la tiene puede soltarla»
    - Línea 96: solo el responsable cambia el estado.
    - Línea 110: asignar a otra persona está excluido.
  - Si el responsable de una tarea En curso la deja sin tocar, nadie más puede
    corregirla. La tarea aparece cogida para siempre, que es justo la información
    vieja que el documento señala como riesgo principal.

  4. Los descartes no se ven como movimiento
  - Lo que se promete:
    - Línea 30: «veo qué se ha movido»
    - Línea 32 (S3): «"Ver qué se ha movido" se resuelve con […] la lista se actualiza
      sola, cada tarea muestra cuándo cambió por última vez»
  - Lo que lo impide:
    - Línea 98 (alcance 5) solo enumera «tareas nuevas, cambios de estado o de
      responsable».
    - El alcance 8 quita la tarea de la lista.
  - Una tarea descartada desaparece sin dejar rastro. Quien vuelve de una reunión no
    puede saber que se ha movido, ni distinguir entre "ya no existe" y "no la
    encuentro".

  5. La ventana de "desde el día anterior" no cubre el caso que promete
  - Línea 100 (alcance 7): «lo que pasó a Hecha desde el día anterior […]; lo
    terminado antes solo aparece con el filtro»
  - Choca con:
    - Línea 30: «llego por la mañana o vuelvo de una reunión y veo qué se ha movido»
    - Línea 78: un equipo «en 3 husos horarios»
  - "El día anterior" no dice según el huso horario de quién. Antes eso lo resolvía S7
    con la hora local de cada persona, pero S7 está tachado (líneas 43 y 64).
  - Además, quien vuelve tras un fin de semana no ve los cierres del viernes.
  
  Menor: S5 y S6 siguen con dos versiones
  - Las líneas 41 y 42 siguen afirmando en el texto «el responsable y la fecha son
    opcionales» y «Cualquier persona puede crear, editar y reasignar cualquier tarea».
    Solo las matiza una nota que remite a la lista.
  - Mientras, la línea 148 da por corregido el problema de los «supuestos con dos
    versiones (S5, S6, S7)». S7 sí está tachado; S5 y S6 no.
```

**Qué salió Ejecución 2:** 
```
Las tres incoherencias graves de la ronda anterior quedan resueltas, y S5 y S6 ya no tienen dos versiones. No
  encuentro ninguna incoherencia nueva introducida por los cambios.

  Siguen abiertas las dos que dejas pendientes a propósito en la línea 149, y queda un
  roce menor:

  1. Los descartes no se ven como movimiento (pendiente declarado)
  - La línea 30 promete «veo qué se ha movido».
  - La línea 98 (alcance 5) solo enumera «tareas nuevas, cambios de estado o de
    responsable».
  - La línea 101 (alcance 8) dice «Cualquiera puede quitar de la lista una tarea». Esa
    tarea desaparece sin que el alcance 5 ni el 6 lo reflejen.

  2. La ventana de "desde el día anterior" (pendiente declarado)
  - La línea 100 (alcance 7) dice «lo que pasó a Hecha desde el día anterior».
  - El equipo está «repartido en 3 husos horarios» (línea 78) y S7, que fijaba la hora
    local de cada persona, está tachado (líneas 43 y 64). No se dice el día de quién.
  - Además, quien vuelve tras un fin de semana no ve lo cerrado el viernes, que es
    justo el caso de «llego por la mañana» (línea 30).

  3. Menor: quién escribe el estado
  - La línea 38 lo da como algo absoluto: «El estado lo escribe a mano la persona que
    hace la tarea».
  - La línea 96 lo relativiza: «Lo normal es que lo haga quien hace la tarea, pero
    como los roles son planos cualquiera puede hacerlo».
  - No se prohíben entre sí, pero la línea 38 promete algo que el alcance no
    garantiza. La línea 148 da por corregida justo esta tensión («"el estado lo teclea
    quien hace la tarea" mientras cualquiera podía cambiarlo»); la línea 149 explica
    por qué volvió, pero la línea 148 no se ha actualizado.

```
