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

---

## Prompt 1

**Modelo:** Opus 1M Medium
**Herramienta:** Claude ai

```
now I'm working on the second practice, and to verify that I have the tools installed in my laptop they ask me to check in WSL Ubunto the version of node and make.

If I ask for version of node in WSL return command not found, but if I check on git bash it is installed.

I suppose I need another instruction to install node in WSL, now I have to work on a second branch "s2" and the work will be done in WSL

```

**Qué salió:** verificación del entorno con las versiones de git, node, npm, make, gh, y claude.

---

## Prompt 2

**Modelo:** Opus 1M Medium
**Herramienta:** Claude ai

```
bien, hagamos lo siguiente, adjunto las versiones obtenidas en la última revisión realizada en WSL, y además verifica si me debo mover de ubicación o sigo en esta ubicación.
actualiza las instrucciones para obtener el fork, levantar la app, y claude code y mcp de Jira

```

**Qué salió:** instrucciones entre texto y comandos agrupadas en 3 secciones: 1. crear el fork; 2. levantar el app; 3. Claude code y MCP Jira.

---

## Prompt 3

**Modelo:** Opus 1M xHigh
**Herramienta:** Claude Code

```
/memory
```

**Qué salió:** Información de CLAUDE.md.

---

## Prompt 4

**Modelo:** Opus 1M xHigh
**Herramienta:** Claude Code

```
/mcp
```

**Qué salió:** confirmación de MCP Jira autenticado.

---

## Prompt 5

**Modelo:** Opus 1M xHigh
**Herramienta:** Claude Code

```
Resume las instrucciones de CLAUDE.md/AGENTS.md
```

**Qué salió:** Indicó que AGENTS.md es un enlace simbólico con CLAUDE.md, y mostró información del proyecto, ¿Qué es?, Comandos Clave, Reglas del backend, Reglas del frontend, y Reglas de proceso.

---

## Prompt 6

**Modelo:** Opus 1M xHigh
**Herramienta:** Claude Code

```
Con la información disponible del proyecto, escribe un resumen de qué capabilities hay ya construidas y cómo es el modelo de datos
```

**Qué salió:** Resumen del punto de partida, el detalle de Backend, validaciones, salidas, frontend y test, información del modelo de datos, y qué implica para el MVP.

---

## Prompt 7

**Modelo:** Opus 1M xHigh
**Herramienta:** Claude Code

```
hazme las cinco preguntas que más reducirían la incertidumbre sobre el problema, los usuarios y el alcance. Acota a una sola ronda, no bajes al modelo de datos ni los endpoints
```

**Qué salió:**  1. El dolor y un caso real. ¿Qué problema concreto tiene hoy el equipo por no saber en qué está cada uno? ¿Me cuentas un episodio reciente en el que eso costara tiempo o trabajo? ¿Cómo sabremos que FlowSync
     funciona, qué deja de pasar?
  2. Quién lo usa. ¿De qué tamaño es el equipo y cómo trabaja (remoto, husos horarios, qué herramientas usa hoy)? ¿Hay roles o permisos distintos, o todos ven y editan lo mismo? ¿Quién sería el primer usuario
     concreto?
  3. Fronteras del espacio. ¿Es un único espacio compartido por un equipo, o desde el principio hay varios equipos separados, o personas que están en más de uno?
  4. Qué significa "tiempo real". ¿Es ver los cambios de estado de las tareas sin refrescar, o incluye presencia ("quién está conectado"), chat o edición simultánea? ¿Y de dónde sale el estado: lo escribe la
     persona a mano o se deduce de señales externas como Git, la integración continua o el calendario?
  5. Relación con Jira y qué queda fuera. ¿FlowSync sustituye al gestor de tareas actual o convive con él e importa de él? ¿Qué renuncias explícitas asumimos (sprints, estimaciones, épicas, backlog,
     informes…)? ¿Qué es lo mínimo que necesita una tarea para que "menos rollo que Jira" sea verdad?

---
## Prompt 8

**Modelo:** Opus 1M xHigh
**Herramienta:** Claude Code

```
now I'm working on the second practice, and to verify that I have the tools installed in my laptop they ask me to check in WSL Ubunto the version of node and make.

If I ask for version of node in WSL return command not found, but if I check on git bash it is installed.

I suppose I need another instruction to install node in WSL, now I have to work on a second branch "s2" and the work will be done in WSL

```

**Qué salió:** verificación del entorno con las versiones de git, node, npm, make, gh, y claude.

---
## Prompt 9

**Modelo:** Opus 1M xHigh
**Herramienta:** Claude Code

```
Respuestas:                                                                                                                                                               - Qué duele hoy: la daily de sincronización y el "¿en qué estás?" constante por Slack/chat. Nadie ve el estado del equipo sin interrumpir a alguien.
  - Quién cobra el valor: los pares, no un lead. No hay reporte hacia arriba y a un manager le daría igual. Duele a los dos devs que descubren tarde que iban a lo mismo, y al que interrumpe a otro para          preguntar.
  - Episodio concreto: dos personas del equipo tocaron el mismo módulo la misma semana porque una empezó sin que la otra lo supiera. Dos días perdidos.
  - Qué reunión desaparece (respuesta honesta, no la vendas de más): la daily NO desaparece entera. Desaparece la ronda de "¿en qué estás?", que hoy se come la mitad de los 15 minutos. La parte de bloqueos
  sigue, y este MVP no la resuelve.
  - Usuarios / equipo: equipos remotos pequeños, 3–10 personas. Roles planos: en el MVP todos ven y editan lo mismo, sin jerarquía de permisos.
  - Primer usuario concreto: equipo de 6 personas de producto SaaS, en 3 husos horarios, que hoy usa un gestor de tareas pesado y una daily de 15 minutos por videollamada. Es un CASO DE ESTUDIO, no un cliente
  real.
  - Fronteras: un espacio único compartido, sin entidad "equipo". Varios equipos separados, o gente en más de uno, queda FUERA del MVP: se anota como supuesto en el PRD, no se construye.
  - "Tiempo real" = ver los cambios de estado de las tareas sin refrescar ni preguntar. NO es chat, NO es videollamada, NO es colaboración simultánea sobre el mismo documento.
  - Es frescura, no presencia: el estado es de la TAREA, no de la persona. Nada de "quién está conectado ahora" ni indicadores de actividad; eso es vigilancia y lo rechazamos a propósito.
  - Forma de la señal: resumen que espera, no aviso que interrumpe. El caso es "llego por la mañana o vuelvo de una reunión y veo qué se ha movido". Sin notificaciones push.
  - Qué decisión cambia: no empezar algo que otra persona ya está tocando, y elegir lo siguiente sabiendo qué está libre. Si la única respuesta fuera "sentirse informado", el tiempo real no valdría lo que
  cuesta.
  - De dónde sale el estado: lo teclea la persona que hace la tarea, en segundos. Derivarlo de señales externas (Git/PRs, CI, calendario) está FUERA del MVP: es otro producto, con integraciones y OAuth de
  terceros.
  - Por qué se sostiene: no porque sea más agradable, sino porque son dos clics sobre una lista ya abierta, sin campos obligatorios, sin decidir sprint ni estimación. Y quien lo escribe cobra en el momento:
  esa misma lista es su cola de trabajo, la mira para decidir qué coge, y de paso deja de recibir interrupciones preguntándole cómo va. Si el beneficio fuera solo para los demás, no lo escribiría.
  - Si la información se queda vieja: el producto pierde el sentido, y lo asumo. Es el riesgo #1 a validar, no un detalle. La mitigación es que actualizar cueste dos clics, no obligar a nadie.
  - Es donde se hace el trabajo, no donde se cuenta: sustituye al gestor de tareas, no convive con él. FlowSync crea las tareas, no lee las de otro sitio. Convivir exigiría doble actualización, que es como
  muere esta categoría.
  - Renuncia explícita a sprints, estimaciones, épicas, backlog priorizado e informes. Un equipo que necesite eso no es nuestro usuario.
  - "Menos rollo que Jira" = crear una tarea y cambiarle el estado en segundos, sin flujos de configuración ni campos obligatorios. Lo mínimo para saber quién está en qué.
  - Qué necesita una tarea en el MVP: título, responsable, estado y fecha de vencimiento. La fecha, para ver de un vistazo qué se ha pasado de plazo.
  - Cómo se consume la lista: filtrando por estado, para centrarse en lo pendiente.
  - Éxito para el usuario: dejar de hacer la ronda de "¿en qué estás?" de la daily porque el estado del equipo se ve de un vistazo.
  - Criterio a una semana de uso real: que el equipo cancele esa ronda y nadie pida que vuelva. Si la siguen haciendo igual, no funcionó.
  - Cuánto construir: una vertical fina y usable de punta a punta, no el andamiaje amplio de un producto. Prefiero una capability terminada a tres a medias.

```

**Qué salió:** Con la ficha quedan cubiertas las cinco preguntas, así que no abro otra ronda. Al cruzar las respuestas salen cinco huecos o tensiones que la ficha no resuelve. Te propongo cómo tratar cada uno, y quedan
  marcados como supuestos hasta que decidas:

  1. Campos obligatorios. La ficha dice que una tarea lleva título, responsable, estado y fecha, pero también "sin campos obligatorios". Supuesto: solo el título es obligatorio. Una tarea sin responsable es
     una tarea libre, y eso encaja con "elegir lo siguiente sabiendo qué está libre". La fecha es opcional.
  2. Qué estados hay. Como no puede haber flujos configurables, supuesto: un conjunto fijo y corto (pendiente / en curso / hecho), igual para todos.
  3. "Bloqueado". Los bloqueos siguen en la daily y la ficha dice que el MVP no los resuelve, pero un estado "bloqueado" costaría muy poco. Supuesto: queda fuera. Es una tensión que conviene decidir de forma
     explícita, no por omisión.
  4. "Sin refrescar" frente a "qué se ha movido desde que volví". Lo primero es una lista que se actualiza en vivo. Lo segundo exige recordar cuándo fue la última visita de cada persona. Supuesto: el MVP
     incluye la lista viva y ver qué cambió desde la última visita queda pendiente de decidir, porque es justo el caso de uso que la ficha describe.
  5. Evitar el episodio de los dos devs en el mismo módulo. Supuesto: basta con la visibilidad (veo que otra persona tiene la tarea en curso). No hay aviso activo ni detección de solapamiento.

  Otros dos supuestos menores:

  - Quien se registra entra directamente en el único espacio compartido; no hay invitaciones.
  - El criterio de éxito a una semana (que se cancele la ronda de "¿en qué estás?") se comprueba observando al equipo del caso de estudio, no con métricas dentro del producto.

  Cuando quieras, pídeme el alcance en los cinco bloques.

---
## Prompt 10

**Modelo:** Opus 1M xHigh
**Herramienta:** Claude Code

```
Fuera del MVP: notificaciones push, integración con Slack, roles/permisos avanzados, analítica/reporting, comentarios en tareas
```

**Qué salió:** Apuntado. Las cinco exclusiones encajan con la ficha. Así queda la lista de fuera del MVP consolidada, con el motivo de cada exclusión según lo que ya decidiste:  ┌───────────────────────────────────────────────────────────────┬──────────────────────────────────────────────────────────────────────────────────────────────────────────┐
  │                             Fuera                             │                                                 Por qué                                                  │
  ├───────────────────────────────────────────────────────────────┼──────────────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ Notificaciones push                                           │ La señal es un resumen que espera a que lo mires, no un aviso que interrumpe                             │
  ├───────────────────────────────────────────────────────────────┼──────────────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ Integración con Slack                                         │ FlowSync es donde se hace el trabajo, no un canal para contarlo; además no hay integraciones de terceros │
  ├───────────────────────────────────────────────────────────────┼──────────────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ Roles y permisos avanzados                                    │ Los roles son planos: todos ven y editan lo mismo                                                        │
  ├───────────────────────────────────────────────────────────────┼──────────────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ Analítica y reporting                                         │ No se informa hacia arriba y ya renunciaste a los informes                                               │
  ├───────────────────────────────────────────────────────────────┼──────────────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ Comentarios en tareas                                         │ Convertirían la tarea en una conversación; el tiempo real es el estado, no un chat                       │
  ├───────────────────────────────────────────────────────────────┼──────────────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ Sprints, estimaciones, épicas y backlog priorizado            │ Renuncia explícita: un equipo que los necesite no es nuestro usuario                                     │
  ├───────────────────────────────────────────────────────────────┼──────────────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ Derivar el estado de Git, CI o calendario                     │ Es otro producto, con OAuth de terceros                                                                  │
  ├───────────────────────────────────────────────────────────────┼──────────────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ Varios equipos o espacios                                     │ Hay un único espacio compartido; se deja como supuesto                                                   │
  ├───────────────────────────────────────────────────────────────┼──────────────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ Presencia ("quién está conectado") e indicadores de actividad │ Sería vigilancia; se rechaza a propósito                                                                 │
  ├───────────────────────────────────────────────────────────────┼──────────────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ Chat, videollamada y edición simultánea                       │ No es lo que significa "tiempo real" aquí                                                                │
  └───────────────────────────────────────────────────────────────┴──────────────────────────────────────────────────────────────────────────────────────────────────────────┘

  Hay una coherencia que conviene dejar escrita en el PRD: al quitar los comentarios y el estado "bloqueado" (supuesto 3), el MVP no tiene ningún sitio para hablar de bloqueos. Es coherente con que "la parte
  de bloqueos de la daily sigue", pero tiene que figurar como decisión y no como olvido.

---

## Prompt 11

**Modelo:** Opus 1M xHigh
**Herramienta:** Claude Code

```
Necesito que propongas el alcance en cinco bloques siendo agresiva recortando, los bloques son: Problemas, Usuarios, Propuesta de valor, Alcance, No-alcance. Justifica cada exclusión realizada
```

**Qué salió:**  Propuesta de alcance del MVP de FlowSync:  1. Problema,  2. Usuarios,  3. Propuesta de valor, 4. Alcance, 5. No-alcance, Ya decidido que queda fuera,   Recortes adicionales que propongo yo, Supuestos declarados, Lo siguiente es tu recorte. Cuando lo tengas, puedo escribir el documento en docs/prd/alcance-mvp-<iniciales>.md, en la rama alcance-<iniciales>.

---

## Prompt 12

**Modelo:** Opus 1M xHigh
**Herramienta:** Claude Code

```
Te paso mi recorte [mi recorte]. Crea la rama y el documento con las iniciales jcpv
```

**Qué salió:** v Bash(git checkout -b alcance-jcpv && mkdir -p docs/prd && git status --short), ● Write(docs/prd/alcance-mvp-jcpv.md), He creado la rama alcance-jcpv y escrito el documento en docs/prd/alcance-mvp-jcpv.md. Aún no he hecho commit, porque faltan cosas que solo puedes escribir tú. El documento sigue el formato de la lección:, Te queda por hacer:, Cuando tengas las dos líneas y los prompts, hago el commit y abro el PR..

---

## Prompt 13

**Modelo:** Opus 1M xHigh
**Herramienta:** Claude Code

```
Actualicé el documento de alcance para que no quede idéntico a la propuesta, y agregué información en las líneas 2 y 3 de la parte B. También agregué la información en prompts.md
```

**Qué salió:** ajustes recomendados por Claude para cubrir huecos y cumplir mejor con el objetivo del ejercicio.

---

## Prompt 14

**Modelo:** Opus 1M xHigh
**Herramienta:** Claude Code

```
a
```

**Qué salió:** cambios sugeridos en los documentos para una nueva revisión.

---
## Prompt 15

**Modelo:** Opus 1M xHigh
**Herramienta:** Claude Code

```
Agregué un nuevo supuesto, y actualicé prompts.md revisa si todo está ok para proceder con el commit
```

**Qué salió:** nuevas recomendaciones antes del commit por parte de Claude.

---

## Prompt 16

**Modelo:** Opus 1M xHigh
**Herramienta:** Claude Code

```
puntos trabajados revisa nuevamente
```

**Qué salió:** casi está.

---

## Prompt 17

**Modelo:** Opus 1M xHigh
**Herramienta:** Claude Code

```
puntos trabajados revisa nuevamente
```

**Qué salió:** casi está, últimas observaciones para mi evaluación.

---

## Prompt 18

**Modelo:** Opus 1M xHigh
**Herramienta:** Claude Code

```
cambios sugeridos aplicados, valida si todo está listo para commit
```

**Qué salió:** ya está bien, proceder con registro de prompt y luego solicitar commit al agente.

---

## Prompt 19

**Modelo:** Opus 1M xHigh
**Herramienta:** Claude Code

```
commit
```

**Qué salió:** commit de docs/prd y prompts.md

---