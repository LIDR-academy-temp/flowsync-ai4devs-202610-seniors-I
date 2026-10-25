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
Quiero que guardes cada entrada mía en el archivo prompts.md; fíjate en que ## Prompt 1 ya está relleno con un prompt de ejemplo. Haz lo mismo con Prompt 2, etc. Guarda cada entrada, sean comandos o prompts. Solo en esta sesión. No rellenes el campo "Qué salió:". Empieza con este y sobrescribe el ejemplo
```

**Qué salió:**

## Prompt 2

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Revisa el proyecto. Averigua qué está hecho y ya funciona, y cuál es el modelo de datos que usa el proyecto. Muestra un resumen breve.
```

**Qué salió:**

## Prompt 3

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

````
Actúa como product manager y ayúdame a definir el alcance del MVP de FlowSync.

Antes de proponer una solución, realiza una única ronda de exactamente cinco preguntas: las que más reducirían la incertidumbre sobre el problema, los usuarios y el alcance. Céntrate en decisiones de producto. No bajes al modelo de datos, los endpoints ni la arquitectura técnica.

Las respuestas del producto ya están decididas y aparecen en la ficha de hechos incluida abajo. Para resolver el interrogatorio en una sola respuesta:

1. Formula primero las cinco preguntas, sin proponer todavía funcionalidades ni soluciones.
2. Responde después cada pregunta utilizando exclusivamente la información de la ficha. No inventes respuestas ni me pidas que repita información que ya está incluida.
3. Si alguna pregunta no queda cubierta por la ficha, toma una decisión razonable y márcala explícitamente como «Supuesto por validar». Ningún supuesto puede contradecir los hechos ni ampliar las fronteras del MVP.
4. No abras nuevas rondas de preguntas ni solicites confirmación para continuar.
5. Después del interrogatorio, resume brevemente tu comprensión del problema, los usuarios, el resultado esperado y los límites del MVP. No propongas todavía la solución ni redactes el PRD.
6. Termina con una lista explícita de todos los supuestos que hayas introducido. Si no has añadido ninguno, indícalo.

La ficha es la fuente de verdad. Respeta sus renuncias, distingue hechos de supuestos y conserva el carácter de caso de estudio del primer usuario.

Ficha de hechos del producto:

```yaml
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
````

**Qué salió:**

## Prompt 4

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
A partir de la ficha de hechos de FlowSync y del interrogatorio anterior, propón el alcance del MVP en exactamente cinco bloques:

Problema: qué situación concreta queremos resolver y qué consecuencias tiene hoy.

Usuarios: para quién es, quién recibe el valor y en qué contexto lo usa. Distingue el caso de estudio de un cliente real.

Propuesta de valor: qué decisión o comportamiento mejora y qué resultado observable esperamos. No exageres: no desaparece toda la daily, solo la ronda de «¿en qué estás?».

Alcance: el mínimo necesario para una vertical fina, usable de punta a punta. Sé agresiva recortando: incluye únicamente lo imprescindible para validar el valor y el riesgo de que la información se quede vieja. Justifica por qué cada capacidad incluida es necesaria.

NO-alcance: enumera explícitamente lo que queda fuera y justifica cada exclusión por su relación con el problema, el coste, las dependencias o el aprendizaje que aporta. Distingue las renuncias ya decididas en la ficha de las exclusiones adicionales que propones.

Reglas:

Respeta la ficha como fuente de verdad y no amplíes sus fronteras.

No añadas funcionalidades por ser habituales en otros gestores de tareas.

No bajes al modelo de datos, los endpoints ni la arquitectura técnica.

Marca cualquier decisión no cubierta por la ficha como «Supuesto por validar».

Mantén la propuesta breve, concreta y fácil de revisar.
```

**Qué salió:**
