# Prompts

Aquí van **todos los prompts que lanzaste** para hacer el ejercicio, en el orden en que los
lanzaste, con el modelo y la herramienta de cada uno.

Esto no es papeleo. Lo que se revisa es **cómo pediste las cosas**, no solo lo que salió: un
resultado flojo con un prompt bueno y un resultado flojo con un prompt vago necesitan feedback
distinto, y sin este archivo no se distinguen.

---

## Prompt 1

**Modelo:** Opus 4.8
**Herramienta:** Claude Code

```
Antes de proponer cualquier cambio para FlowSync, inspecciona el repositorio actual.

Quiero que identifiques únicamente:

1. Qué capacidades funcionales ya están implementadas y utilizables.
2. Qué entidades o conceptos principales existen actualmente en el modelo de datos y cómo se relacionan a nivel funcional.
3. Qué partes relevantes del producto ya están construidas para no volver a especificarlas como trabajo nuevo.

No propongas features nuevas.
No diseñes arquitectura.
No sugieras endpoints.
No escribas todavía un PRD.
No modifiques ningún archivo.

Devuélveme primero un resumen de 3 a 5 líneas del terreno existente y, debajo, evidencia breve de qué archivos o partes del código usaste para llegar a esa conclusión.

Si algo no puede confirmarse desde el repositorio, indícalo explícitamente en vez de asumirlo.
```

**Qué salió:** funcionó a la primera; resumen del terreno + evidencia por archivos.

## Prompt 2

**Modelo:** Opus 4.8
**Herramienta:** Claude Code

```
Quiero que FlowSync sea una herramienta para que los equipos remotos sepan en qué está trabajando cada uno sin tener que hacer reuniones de sincronización. Algo tipo tareas compartidas pero más en tiempo real y menos rollo que Jira.' Antes de proponer cualquier alcance, hazme UNA sola ronda con exactamente las 5 preguntas que más reduzcan la incertidumbre sobre el problema real que queremos resolver, quién obtiene el valor, el comportamiento del usuario, qué significa 'tiempo real' y dónde debe estar la frontera del MVP. No propongas todavía funcionalidades ni soluciones. No escribas todavía el PRD. No diseñes modelo de datos. No propongas endpoints ni arquitectura. No hagas más de una ronda. Limítate a las 5 preguntas más importantes, numeradas del 1 al 5
```

**Qué salió:** 5 preguntas en una sola ronda, sin bajar a datos ni endpoints.

## Prompt 3

**Modelo:** Opus 4.8
**Herramienta:** Claude Code

```
te respondo con los hechos que ya tengo definidos para el producto:

- Hoy el problema es la daily de sincronización y el "¿en qué estás?" constante por Slack/chat. El equipo no puede ver el estado de los demás sin interrumpir.
- El valor principal es para los compañeros entre sí, no para un manager. El problema aparece cuando dos personas trabajan sobre lo mismo sin saberlo o cuando alguien tiene que interrumpir para preguntar.
- Un caso concreto: dos personas tocaron el mismo módulo la misma semana sin saberlo y se perdieron dos días de trabajo.
- La daily no desaparece completa. Lo que quiero eliminar es la ronda de "¿en qué estás?", que ocupa aproximadamente la mitad de los 15 minutos. Los bloqueos siguen fuera de este MVP.
- El usuario objetivo son equipos remotos pequeños, de 3 a 10 personas, con roles planos. Todos ven y editan lo mismo.
- Como caso de estudio, pensemos en un equipo SaaS de 6 personas en 3 husos horarios que hoy usa un gestor de tareas pesado y una daily diaria.
- Para el MVP quiero un solo espacio compartido. No quiero múltiples equipos ni personas participando en varios equipos.
- Cuando digo "tiempo real", me refiero a ver cambios de estado de tareas sin refrescar ni tener que preguntar. No me refiero a chat, videollamada ni colaboración simultánea.
- Me importa la frescura del estado de la tarea, no la presencia de la persona. No quiero indicadores de quién está conectado o activo.
- No quiero notificaciones que interrumpan. La idea es entrar y ver qué cambió cuando vuelvo de una reunión o empiezo el día.
- La decisión que quiero mejorar es evitar empezar algo que otra persona ya está trabajando y poder elegir qué tomar después sabiendo qué está libre.
- El estado lo actualiza manualmente quien hace la tarea. No quiero inferirlo desde Git, PRs, CI o calendario en este MVP.
- La actualización debe ser muy rápida, idealmente dos clics, porque si cuesta demasiado la gente no lo va a mantener al día.
- El riesgo principal que quiero validar es justamente que la información no se quede vieja.
- FlowSync debe ser donde se hace el trabajo, no una capa encima de otro gestor. Las tareas se crean en FlowSync.
- No quiero sprints, estimaciones, épicas, backlog priorizado ni reportes.
- Para mí "menos rollo que Jira" significa crear una tarea y cambiar su estado en segundos, sin configuraciones ni campos obligatorios innecesarios.
- Cada tarea en el MVP necesita: título, responsable, estado y fecha de vencimiento.
- La lista debe poder filtrarse por estado.
- El éxito sería que el equipo deje de hacer la ronda de "¿en qué estás?" porque el estado se ve de un vistazo.
- A una semana de uso, consideraría que funcionó si esa ronda se cancela y nadie pide recuperarla.
- Quiero una vertical fina y usable de punta a punta, no muchas funcionalidades a medias.

Además, ya tengo claro que quedan fuera del MVP:

- notificaciones push
- integración con Slack
- roles o permisos avanzados
- analítica y reporting
- comentarios en tareas

Con esto, resume cómo quedan respondidas tus cinco preguntas.

Si alguna de tus preguntas no queda cubierta por estos hechos, decide una opción razonable y márcala explícitamente como supuesto al final.
```

**Qué salió:** cerró las 5 preguntas y declaró supuestos A1–A6.

## Prompt 4

**Modelo:** Opus 4.8
**Herramienta:** Claude Code

```
Todo esta bien salvo A6, para mi la fecha si esparte del minimo de la tarea. El resto de los supuestos me parecen bien para seguir, con eslo cerramos
```

**Qué salió:** corrigió A6 (fecha de vencimiento obligatoria) y confirmó el resto.

## Prompt 5

**Modelo:** Opus 4.8
**Herramienta:** Claude Code

```
Perfecto. Antes de redactar el PRD final, quiero que me propongas el alcance del MVP en estos 5 bloques:

1. Problema
2. Usuarios
3. Propuesta de valor
4. Alcance
5. NO-alcance

Sé agresivo recortando.

En el alcance deja solo lo mínimo necesario para validar que un equipo remoto pequeño puede dejar de hacer la ronda de “¿en qué estás?” porque el estado del trabajo se ve de un vistazo y se mantiene suficientemente fresco.

En el NO-alcance:
- enumera claramente todo lo que dejarías fuera,
- justifica cada exclusión,
- y explica qué hipótesis del producto NO ayuda a validar cada cosa excluida.

No incluyas tablas de base de datos.
No incluyas endpoints.
No incluyas arquitectura.
No conviertas esto todavía en una especificación técnica.

Antes de cerrar, dime exactamente cuántas capacidades propones dentro del alcance.

Todavía no modifiques ningún archivo. Quiero revisar y recortar tu propuesta primero.
```

**Qué salió:** propuso 6 capacidades (sobre-propuso a propósito, para que yo recortara).

## Prompt 6

**Modelo:** Opus 4.8
**Herramienta:** Claude Code

```
Recorto tu propuesta de 6 capacidades a 5.

Quito C4 como capacidad independiente de “(Re)asignar responsable”.

Para este MVP no necesito poder pasar libremente una tarea de una persona a otra. Me basta con que una tarea pueda estar sin responsable y que alguien pueda tomarla. El responsable sigue siendo parte de la tarea, pero no quiero convertir la reasignación completa en una capacidad adicional del MVP.

Mantengo:

- C1 — Crear tarea rápida
- C2 — Tablero compartido único
- C3 — Cambiar estado en dos clics
- C5 — Filtrar por estado
- C6 — Actualización en vivo

Tampoco subo al alcance editar una tarea ya creada ni eliminar una tarea. Son útiles, pero no ayudan a validar la hipótesis principal de que el equipo puede dejar de hacer la ronda de “¿en qué estás?” porque el estado del trabajo se ve de un vistazo y se mantiene fresco.

Resultado final de mi recorte:
- La IA propuso 6 capacidades.
- Después de mi recorte quedan 5.

Con este recorte, vuelve a presentar los 5 bloques finales:
Problema · Usuarios · Propuesta de valor · Alcance · NO-alcance.

Mantén la justificación de cada exclusión y no añadas tablas, endpoints ni arquitectura.

Todavía no escribas archivos.
```

**Qué salió:** respetó el recorte a 5 y movió C4 al NO-alcance.

## Prompt 7

**Modelo:** Opus 4.8
**Herramienta:** Claude Code

```
Ya quedó cerrado el alcance en 5 capacidades y estoy de acuerdo con el recorte. Ahora redacta el PRD final en docs/prd/alcance-mvp-fc.md con todo lo que definimos en esta conversación. Incluye los tres tramos y la Parte B, manténlo corto, sin arquitectura ni endpoints, y no hagas commit todavía; primero enséñame cómo quedó
```

**Qué salió:** revisó la consigna del README y escribió el PRD (tres tramos + Parte B) sin commitear.

## Prompt 8

**Modelo:** Opus 4.8
**Herramienta:** Claude Code

```
Está bien, pero en la Parte B, punto 2, corrige las tres exclusiones a reasignación completa, editar/eliminar tareas y notificaciones push, explicando qué hipótesis no valida cada una. Y completa bien el texto del punto 3. Muéstrame solo el contenido final del archivo, sin commit todavía.
```

**Qué salió:** ajustó la Parte B tal cual pedí.

## Prompt 9

**Modelo:** Opus 4.8
**Herramienta:** Claude Code

```
Haz solo una limpieza final de forma, sin cambiar decisiones ni alcance: quita el duplicado de C1, renumera C1–C5, asegura el punto 5 del Tramo 2 y corrige typos o cortes. Luego muéstrame solo las líneas cambiadas, todavía sin commit.
```

**Qué salió:** renumeró C1–C5, limpió un typo; sin tocar decisiones.

## Prompt 10

**Modelo:** Opus 4.8
**Herramienta:** Claude Code

```
Ya quedó bien. Haz el commit de este cambio, sin hacer PR todavía. Muéstrame qué archivos entraron al commit y el mensaje que usaste.
```

**Qué salió:** commiteó solo el PRD (dejó fuera el schema.ts autogenerado) y mostró archivos + mensaje.

## Prompt 11

**Modelo:** Opus 4.8
**Herramienta:** Claude Code

```
Ahora vamos con `prompts.md`.

Revisa primero la consigna del ejercicio y dime exactamente:
- qué debe contener `prompts.md`,
- qué formato pide,
- y cuáles de los prompts que realmente usamos en esta tarea deberían ir ahí.

No modifiques ningún archivo todavía. Primero enséñame esa propuesta para revisarla.
```

**Qué salió:** propuso el contenido/formato y qué prompts incluir, sin escribir el archivo.

## Prompt 12

**Modelo:** Opus 4.8
**Herramienta:** Claude Code

```
Quiero seguir la consigna al pie de la letra y meter todos los prompts que usé durante este ejercicio, aunque alguno haya sido más operativo. Entonces mete los 9 que ya identificaste, el que usé para hacer el commit y este de prompts.md. Si ves algún otro mío de esta misma sesión que sí haya sido parte de este ejercicio, inclúyelo también. Eso sí: sácalos del historial tal cual los escribí. No me corrijas faltas, no los mejores y no los reconstruyas. En cada bloque pon modelo, herramienta, prompt literal y 'qué salió' si aplica. Llena prompts.md y enséñamelo completo antes de hacer commit.
```

**Qué salió:** llenó este `prompts.md` con los 12 prompts verbatim.
