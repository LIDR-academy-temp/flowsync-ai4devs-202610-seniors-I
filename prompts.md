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

**Modelo:** Opus 5.5 Medium
**Herramienta:** Claude Code

```
Hola Claude, devuelveme qué capabilities hay ya construidas y cómo es el modelo de datos actual.
```

**Qué salió:**  Me devolvio las capabilities y modelo

## Prompt 2

**Modelo:** Opus 5.5 Medium
**Herramienta:** Claude Code

```
- Herramienta: Claude Code (VS Code, WSL) | Modelo: <Sonnet 5.5>
- Nota: borrador inicial descartado tras consulta externa (mezclaba tramos 2 y 3, no obligaba a preguntar primero).

Parto de esta idea: «Quiero que FlowSync sea una herramienta para que los equipos remotos sepan en qué está trabajando cada uno sin tener que hacer reuniones de sincronización. Algo tipo tareas compartidas pero más en tiempo real y menos rollo que Jira.»

Antes de proponer nada, hazme las cinco preguntas que más reducirían la incertidumbre sobre el problema, los usuarios y el alcance. Una sola ronda. No bajes al modelo de datos ni a los endpoints. Si algo no te lo respondo, decide tú y márcalo como supuesto.
```

**Qué salió:**  Devolvio 5 preguntas

## Prompt 3

**Modelo:** Opus 5.5 Medium
**Herramienta:** Claude Code

```
Estas son las respuestas del producto, ya decididas. Si algo no lo cubren, decide tú y márcalo como supuesto. 
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
- Fuera del MVP: notificaciones push, integración con Slack, roles/permisos avanzados, analítica/reporting, comentarios en tareas.
```

**Qué salió:**  Contradicciones y Huecos llenos

## Prompt 4

**Modelo:** Opus 5.5 Medium
**Herramienta:** Claude Code

```
Con lo anterior, propón el alcance en cinco bloques: problema, usuarios, propuesta de valor, alcance y NO-alcance. Sé agresiva recortando y justifica cada exclusión con la hipótesis del producto que no ayuda a validar. Nada de tablas, endpoints ni arquitectura. Numera lo que metes dentro del alcance.
```

**Qué salió:**  Contradicciones y Huecos llenos

## Prompt 5

**Modelo:** Opus 5.5 Medium
**Herramienta:** Claude Code

```
- Realice 2 propuestas previas, que no se lanzaron como propmt que estuve revisando y ajustando.

Hago este recorte sobre tu propuesta:
1. Quito el ítem 7 (refresco en vivo). Quien trabaja concentrado no está mirando la lista, así que el refresco aporta poco y el ítem 8 ya cubre "llego y veo qué se movió". Asumo que H3 solo se valida si el equipo mira la lista antes de empezar algo.
2. Etiquetas/módulo: quedan fuera. En mi equipo trabajamos por secciones (FRONT, BACK) y casi no coincidimos en lo mismo. Asumo que el solapamiento por módulo no es el problema de este equipo; H3 solo cubre solapamiento de tareas.
3. Fecha de vencimiento: sale, apartándome de la ficha. Las fechas cambian por ajustes menores y quedarían viejas, lo que debilita H2. Asumo que el producto no distingue lo atrasado.

Escribe cada exclusión con la hipótesis que deja de validar y lo que asumo al quitarla.

Escribe el resultado en docs/prd/alcance-mvp-mtpc.md con el tramo 1 (lo que ya existe, 3-5 líneas, sin tablas ni endpoints), el tramo 2 (las cinco preguntas y los supuestos) y el alcance en cinco bloques. Sin tablas, endpoints ni arquitectura. Revisa que ninguna sección siga prometiendo algo que mi recorte quita (vencidas, refresco en vivo) y señálame cualquier incoherencia entre mi recorte y el resto del documento.
```

**Qué salió:**  Documento redactado

## Prompt 6

**Modelo:** Opus 5.5 Medium
**Herramienta:** Claude Code

```
Añade al alcance una protección para "Me la quedo": si la tarea ya tiene responsable en el momento de pulsar, se avisa a quien pulsa y puede confirmar la reasignación. La persona que la tenía no recibe ningún aviso activo; ve el cambio resaltado en su lista la próxima vez que la abra (ítem 7). Escríbelo como parte del ítem 4 asociado a H3, y añade como supuesto que no hay notificación push al dueño anterior. Actualiza el documento y señálame cualquier incoherencia que esto introduzca. Sin tablas, endpoints ni arquitectura.
```

**Qué salió:**  Ajuste realizado

## Prompt 6

**Modelo:** Opus 5.5 Medium
**Herramienta:** Claude Code

```
- Se valido un intento previo y se corrigio por ambigüedades

Haz estos cambios sobre el documento:
1. "Me la quedo" no puede reasignar una tarea En curso; solo una Pendiente. Si ya tiene responsable, quien pulsa ve quién la tiene y confirma o la deja.
2. La misma confirmación se aplica a cualquier asignación o reasignación de una tarea Pendiente con responsable. Una tarea En curso solo se libera si su responsable o alguien la pasa antes a Pendiente. Escríbelo como supuesto.
3. Cambia la palabra "aviso" por "confirmación" donde se refiera a esto.
4. Recupera el supuesto: el MVP no detecta el solapamiento del episodio, solo lo hace visible; el episodio queda cubierto en parte.
5. Reescribe la entrada de la fecha: sin fecha, una tarea En curso antigua parece reciente, que es el estado viejo que H2 marca como riesgo #1. Preséntalo como tensión asumida, no como decisión limpia.
6. Agrupa en una sola línea, con un porqué común, estas exclusiones: tareas recurrentes, adjuntos, importar, subtareas, kanban, editar perfil y recuperar contraseña. Deja desarrolladas las demás.
Sin tablas, endpoints ni arquitectura. Señálame cualquier incoherencia que esto introduzca.
```

**Qué salió:**  Ajuste realizado

## Prompt 7

**Modelo:** Opus 5.5 Medium
**Herramienta:** Claude Code

```
Quita toda la protección de "Me la quedo" y de la reasignación. El ítem 4 vuelve a ser: "Me la quedo" en un clic, y asignar o reasignar cualquier tarea a cualquier persona, sin confirmación ni limitación por estado. Elimina S12 y S13 y las menciones a confirmación. Añade un supuesto: el producto no impide que dos personas cojan la misma tarea a la vez ni que alguien se la quite a quien la tiene En curso; H3 solo se cumple si el equipo habla antes, y ese riesgo queda asumido. Las Hechas se tratan como cualquier otra tarea. Saca "recuperar contraseña" del grupo de exclusiones agrupadas y déjala como exclusión propia, con el riesgo de adopción como lo que se asume. Renumera los supuestos y revisa que ninguna sección siga prometiendo algo que esto quita. Sin tablas, endpoints ni arquitectura. Señálame cualquier incoherencia que introduzca.
```

**Qué salió:**  Ajuste realizado

## Prompt 8

**Modelo:** Opus 5.5 Medium
**Herramienta:** Claude Code

```
La exclusión de la que menos seguro estoy: proteger “Me la quedo” y la reasignación. Intenté cerrar el hueco de trabajo duplicado (H3) con una confirmación al coger una tarea que ya tiene dueño. Cada regla abría otro hueco: limitarlo a Pendientes dejaba la vía de pasar una En curso a Pendiente sin confirmación, y cerrar esa vía exigía restringir quién cambia estados, lo que rompe los roles planos que la ficha fija. Se contradecían lo que valida H3 (que nadie pise el trabajo de otro) y lo barato de H2 (cada regla encarece actualizar). Me quedé con lo barato y asumo que H3 solo se cumple si el equipo habla antes. No supe decidir esta con seguridad. Entraría si, en la semana de uso, dos personas acaban haciendo la misma tarea y el equipo lo atribuye al producto y no a falta de comunicación.
```

**Qué salió:**  Documentación final