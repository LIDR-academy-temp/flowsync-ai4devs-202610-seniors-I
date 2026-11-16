# Prompts

Prompts del ejercicio de alcance (S2), en el orden en que los lancé y copiados tal cual.
Todos en la misma sesión, con el mismo modelo y la misma herramienta.

---

## Prompt 1

**Modelo:** Opus 5.5
**Herramienta:** Claude Code (extensión de VS Code)

```
Antes que nada, léete el repo y devuélveme el estado real del proyecto: qué capabilities ya existen (auth...) y un diagrama rápido del modelo de datos actual (entidades y relaciones, en Mermaid). No propongas cambios todavía; solo quiero el mapa de lo que hay.
```

**Qué salió:** funcionó a la primera. Devolvió que la única capability es auth/cuenta y un diagrama Mermaid con `users` 1:N `auth_access_tokens`. Lo leyó sobre mi rama `harness-bpp`, donde el frontend todavía era la plantilla de Vite.

## Prompt 2

**Modelo:** Opus 5.5
**Herramienta:** Claude Code (extensión de VS Code)

```
Actúa como product partner escéptico. Aquí tienes una idea difusa para FlowSync:
«Quiero que FlowSync sea una herramienta para que los equipos remotos sepan en qué está trabajando cada uno sin tener que hacer reuniones de sincronización. Algo tipo tareas compartidas pero más en tiempo real y menos rollo que Jira.» Antes de proponer nada, hazme las 5 preguntas que más reducirían la incertidumbre sobre el problema, los usuarios y el alcance. No asumas: pregunta. Ten en cuenta el estado del repo que acabas de mapear (auth: las tareas aún no existen). Una sola ronda: con mis respuestas, continúa sin abrir otra tanda de preguntas. Quédate a nivel de producto: nada de modelo de datos, esquema, estados internos, endpoints ni latencias, eso se decide más adelante.
```

**Qué salió:** hizo exactamente 5 preguntas en una ronda, sin bajar a datos ni endpoints. Una de ellas salió del repo: hoy no existe la noción de equipo.

## Prompt 3

**Modelo:** Opus 5.5
**Herramienta:** Claude Code (extensión de VS Code)

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
```

**Qué salió:** propuso una vertical de 8 puntos, su NO-alcance y 5 supuestos (S1–S5). Además me discutió que la colisión del episodio la evita una norma del equipo, no la herramienta.

## Prompt 4

**Modelo:** Opus 5.5
**Herramienta:** Claude Code (extensión de VS Code)

```
Siempre debe haber un responsable para una tarea.
```

**Qué salió:** aplicó el cambio y señaló dos incoherencias con la ficha: «sin campos obligatorios» y «elegir lo que está libre». Las resolvió con el responsable precargado con quien crea la tarea y con el supuesto S6.

## Prompt 5

**Modelo:** Opus 5.5
**Herramienta:** Claude Code (extensión de VS Code)

```
Actualiza el PRD en el repo con estas definiciones.
```

**Qué salió:** en mi rama no había ningún PRD que actualizar. Lo creó en `docs/prd/alcance-mvp-bpp.md` con el formato del enunciado de la S2, pero sobre una rama que partía de mi rama del harness, no de `s2/start`.

## Prompt 6

**Modelo:** Opus 5.5
**Herramienta:** Claude Code (extensión de VS Code)

```
Haz el cambio de rama para crear el PR  en el upstream solo con el alcance de este módulo como se pide. Incluye en el archivo de prompts.md los prompts de esta sesión para este módulo y este PR. Realiza primero los commits anteriores al repo propio (el fork no el upstream).
```

**Qué salió:** primero commiteó en el fork el cambio pendiente del harness. Después rehízo la rama `alcance-bpp` desde `upstream/s2/start`, solo con el alcance y este archivo, y corrigió el tramo 1, porque en `s2/start` el frontend ya tiene login, registro y perfil. Abrió el PR y lanzó el `adversarial-reviewer`, que encontró la parte B vacía y la incoherencia del responsable obligatorio.

## Prompt 7

**Modelo:** Opus 5.5
**Herramienta:** Claude Code (extensión de VS Code)

```
Cambia nuevamente el criterio de tener siempre un responsable, y permite que una tarea quede sin responsable y actualiza el PRD.
Escribe las tres lineas que pide en la parte B en un archivo y agrégalo a los entregables. 
1. No recorté ninguna propuesta, todas me parecieron justas y necesarias.
2. Ninguna.
3. Apunta que excluí que no hubiera responsable, pero lo cambié nuevamente gracias a la recomendación del adversarial-reviewer.

Prepara el PR con los entregables finales parte A y B, y muéstrame antes de abrirlo en el Upstream para confirmarlo.
```

**Qué salió:** volvió a hacer opcional el responsable en el alcance (vuelve la tarea «libre») y escribió la parte B en `docs/prd/parte-b-bpp.md`. Me enseñó el diff antes de subir nada.

## Prompt 8

**Modelo:** Opus 5.5
**Herramienta:** Claude Code (extensión de VS Code)

```
Lee @docs/prd/alcance-mvp-bpp.md .
Descompón la épica de Gestión de tareas en historias de usuario.
Cada historia en formato "Como <rol>, quiero <acción> para <beneficio>".
Aplica INVEST: pequeñas, testables. NO escribas criterios todavía, solo el listado.
Valida cada historia contra el alcance del PRD: si alguna se sale del MVP, márcala explícitamente como "fuera del alcance MVP" en vez de colarla.
Actualiza también la rama local.
```

**Qué salió:** 14 historias dentro del alcance, cada una con el punto del PRD que cubre, y 8 marcadas como fuera del alcance MVP. Están en `docs/prd/historias-gestion-tareas-bpp.md`.

## Prompt 9

**Modelo:** Opus 5.5
**Herramienta:** Claude Code (extensión de VS Code)

```
De las historias que acabas de listar, coge la de la fecha de vencimiento y las tareas vencidas. Si te salieron separadas (poner o quitar la fecha por un lado, ver si se ha pasado de plazo por otro), consolídalas en UNA sola historia antes de seguir: para nosotros es una única historia y se llama FS-118. Escribe sus criterior de aceptación en formato Given/When/Then, redactados en español (DADO / CUANDO / ENTONCES).
Reglas MUY importantes:
- Un criterio de historia es una REGLA DE NEGOCIO observable: qué es verdad para el usuario. NO uses endpoints, status codes ni nombres de campo internos (nada de "PATCH / tasks/:id", "422", "isOverdue"). Ese detalle técnico es de la fase de implementación, no de aquí.
- Incluye el camino feliz y los edge cases / errores que se me puedan olvidar.
- Marca los criterior que propongas tú para mi revisión.
```

**Qué salió:** fusionó HU-03 y HU-09 en FS-118 y escribió 22 criterios: 8 derivados del PRD y 14 marcados como [Propuesto] para revisar.

## Prompt 10

**Modelo:** Opus 5.5
**Herramienta:** Claude Code (extensión de VS Code)

```
Sí
```

**Qué salió:** hizo el commit en local de FS-118 con sus criterios, sin push.

## Prompt 11

**Modelo:** Opus 5.5
**Herramienta:** Claude Code (extensión de VS Code)

```
Sincroniza el fork y el PR del upstream.
```

**Qué salió:** subió los commits al fork; el PR #161 los recogió y actualizó su descripción con el archivo de historias.

## Prompt 12

**Modelo:** Opus 5.5
**Herramienta:** Claude Code (extensión de VS Code)

```
Una tarea vencida sube en la lista, la idea es poder ver rápidamente qué venció (también cuenta como un cambio en una tarea)
Prohibe las fechas pasadas para que no se pueda apuntar una tarea que ya va con retraso.
Adicional: Guarda en docs/backlog/E2-gestion-tareas/  SOLO las dos historias que acabamos de enriquecer con criterior de aceptación, un archivo markdown por historia. Las demás historias del listado no se guardan todavía. La de fechas de vencimiento va en us-fechas-vencimiento.md. Cada archivo: el título de la historia. su identificador, su formulación "Como <rol>, quiero <acción> para <beneficio>" y sus criterior de aceptación en Given/When/Then, en español (DADO / CUANDO/ ENTONCES), tal como los hemos aprobado y con mis ediciones incluidas. Sin endpoints, status codes ni nombres de campo internos. Los identificadores los fijo yo, no los inventes: la historia de fechas de vencimiento es FS-118 y la de filtrar por estado es FS-142.
```

**Qué salió:** cambió CA-14 (vencer cuenta como un cambio y la tarea sube) y CA-17 (se prohíben las fechas pasadas), y guardó FS-118 en `us-fechas-vencimiento.md`. Avisó de que FS-142 no tenía criterios enriquecidos y propuso un borrador antes de guardarla.

## Prompt 13

**Modelo:** Opus 5.5
**Herramienta:** Claude Code (extensión de VS Code)

```
Procede. Y realiza el commit, push al fork y actualiza el PR en upstream.
```

**Qué salió:** guardó FS-142 en `us-filtrar-por-estado.md` con los 11 criterios del borrador, añadió CA-23 a FS-118, hizo commit, lo subió al fork y actualizó el PR #161.
