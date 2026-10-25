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

<!--
Prompts del ejercicio del Módulo 2, copiados literalmente del historial de la sesión de Claude Code.
Modelo identificado por la propia sesión: Claude Opus 5.5 (claude-opus-5-5).
Nivel de esfuerzo / variante de contexto: No verificado.
⚠️ Solo se registran los prompts de esta sesión. Si lanzaste alguno en otra sesión o herramienta, añádelo a mano.
-->

## Prompt 1

**Modelo:** Claude Opus 5.5 (`claude-opus-5-5`) · Esfuerzo/variante: No verificado
**Herramienta:** Claude Code

```
Antes de comenzar el ejercicio del Módulo 2 de
AI4Devs, realiza únicamente una comprobación
de contexto, sin modificar archivos ni datos.

1. Comprueba que estás trabajando en el
   repositorio FlowSync y en la rama alcance-pam.

2. Identifica las instrucciones del proyecto
   en CLAUDE.md y AGENTS.md y confirma qué
   skills, subagentes y hooks hay disponibles.

3. Comprueba mediante el MCP de Atlassian,
   exclusivamente en modo lectura, que puedes
   acceder al proyecto Jira FLOW. No crees,
   modifiques, muevas ni cierres tickets.

4. Resume los resultados e indica cualquier
   problema detectado.

No implementes funcionalidades, no ejecutes
planes, no modifiques el repositorio y no
inicies todavía el ejercicio SDD.
```

**Qué salió:** comprobación correcta; detectó que el hook de Prettier falla en silencio por falta de `jq` y que `alcance-pam` no tiene upstream.

## Prompt 2

**Modelo:** Claude Opus 5.5 (`claude-opus-5-5`) · Esfuerzo/variante: No verificado
**Herramienta:** Claude Code

```
Estamos iniciando el ejercicio de Spec-Driven
Development del Módulo 2 sobre FlowSync.

Antes de definir el MVP, necesito comprender
qué existe realmente en el repositorio.

Analiza exclusivamente el código actual
y responde:

1. ¿Qué capacidades funcionales están ya
   implementadas y cuáles son solo
   infraestructura o scaffolding?

2. ¿Qué entidades y relaciones existen
   actualmente en el modelo de datos?

3. ¿Qué partes de la idea de FlowSync están
   ya construidas y cuáles todavía no?

Entrega primero un resumen de 3 a 5 líneas,
apto para incorporarlo al documento de alcance.
A continuación, indica brevemente los archivos
que respaldan tus conclusiones.

No propongas funcionalidades nuevas, no diseñes
arquitectura ni endpoints, no modifiques
archivos, no utilices Jira y no implementes nada.

Si algo no está verificado, indícalo expresamente.
```

**Qué salió:** resumen del terreno (solo existe la capa de identidad; ninguna tarea), con archivos de respaldo y lo no verificado.

## Prompt 3

**Modelo:** Claude Opus 5.5 (`claude-opus-5-5`) · Esfuerzo/variante: No verificado
**Herramienta:** Claude Code

```
Estamos iniciando el ejercicio de Spec-Driven
Development del Módulo 2 sobre FlowSync.

Antes de definir el MVP, necesito comprender
qué existe realmente en el repositorio.

Analiza exclusivamente el código actual
y responde:

1. ¿Qué capacidades funcionales están ya
   implementadas y cuáles son solo
   infraestructura o scaffolding?

2. ¿Qué entidades y relaciones existen
   actualmente en el modelo de datos?

3. ¿Qué partes de la idea de FlowSync están
   ya construidas y cuáles todavía no?

Entrega primero un resumen de 3 a 5 líneas,
apto para incorporarlo al documento de alcance.
A continuación, indica brevemente los archivos
que respaldan tus conclusiones.

No propongas funcionalidades nuevas, no diseñes
arquitectura ni endpoints, no modifiques
archivos, no utilices Jira y no implementes nada.

Si algo no está verificado, indícalo expresamente.
```

**Qué salió:** prompt repetido (idéntico al 2); el agente comprobó que el repo no había cambiado y devolvió las mismas conclusiones.

## Prompt 4

**Modelo:** Claude Opus 5.5 (`claude-opus-5-5`) · Esfuerzo/variante: No verificado
**Herramienta:** Claude Code

```
Estamos definiendo el MVP de FlowSync
mediante Spec-Driven Development.

La idea inicial del producto es:

«Quiero que FlowSync sea una herramienta
para que los equipos remotos sepan en qué
está trabajando cada uno sin tener que hacer
reuniones de sincronización. Algo tipo tareas
compartidas pero más en tiempo real y menos
rollo que Jira».

Antes de proponer funcionalidades o redactar
el alcance, actúa como un Product Manager
crítico.

Formula exactamente LAS CINCO PREGUNTAS
que más incertidumbre reduzcan sobre:

- El problema real que queremos resolver.
- Los usuarios y sus necesidades.
- Los límites y prioridades del MVP.

Condiciones:
- Haz una sola ronda de cinco preguntas.
- No respondas tú mismo a las preguntas.
- No propongas funcionalidades todavía.
- No entres en arquitectura, entidades,
  base de datos ni endpoints.
- No modifiques archivos ni utilices Jira.

Devuélveme únicamente las cinco preguntas
numeradas, ordenadas por importancia.
Espera mis respuestas antes de continuar.
```

**Qué salió:** cinco preguntas en una sola ronda, sin bajar a modelo de datos ni endpoints.

## Prompt 5

**Modelo:** Claude Opus 5.5 (`claude-opus-5-5`) · Esfuerzo/variante: No verificado
**Herramienta:** Claude Code

```
Estas son las respuestas a las cinco preguntas que acabas de formular sobre FlowSync. Utiliza la siguiente ficha de hechos como fuente de verdad del producto.

**FICHA DE HECHOS:**

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

**EXCLUSIONES YA DECIDIDAS:**

- Fuera del MVP: notificaciones push, integración con Slack, roles/permisos avanzados, analítica/reporting, comentarios en tareas.

**INSTRUCCIÓN FINAL:**

Relaciona esta ficha con las cinco preguntas que me hiciste y resume brevemente las respuestas.

No inventes requisitos adicionales, no hagas más preguntas y no modifiques archivos. Espera mi siguiente indicación antes de elaborar el PRD.
```

**Qué salió:** respuestas mapeadas a las cinco preguntas, sin requisitos añadidos.

## Prompt 6

**Modelo:** Claude Opus 5.5 (`claude-opus-5-5`) · Esfuerzo/variante: No verificado
**Herramienta:** Claude Code

```
Con el análisis del repositorio, las cinco preguntas y la ficha de hechos que acabamos de revisar, prepara una **primera propuesta del PRD del MVP de FlowSync**.

Organízala en exactamente cinco bloques:

1. **Problema:** qué problema concreto queremos resolver.
2. **Usuarios:** quién utilizará el producto y quién recibe el valor.
3. **Propuesta de valor:** qué beneficio diferencial ofrece FlowSync.
4. **Alcance del MVP:** qué funcionalidades propones incluir en la primera versión. Enumera cada funcionalidad para que podamos contarlas y evaluarlas individualmente.
5. **NO-alcance:** qué funcionalidades quedan expresamente excluidas y por qué no contribuyen a la hipótesis principal del MVP.

Condiciones:

- Basa la propuesta únicamente en la información del ejercicio.
- Respeta las exclusiones explícitas de la ficha de hechos.
- Prioriza un MVP pequeño, usable de principio a fin.
- No confundas una funcionalidad del producto con una decisión técnica.
- No incluyas arquitectura, entidades de base de datos, endpoints ni detalles de implementación.
- No modifiques archivos ni utilices Jira todavía.

Esta es solo tu **propuesta inicial**. No la consideres aprobada: yo la revisaré y decidiré qué funcionalidades mantener y cuáles eliminar.

Al final, indica cuántas funcionalidades has propuesto incluir en el alcance del MVP y espera mi revisión.
```

**Qué salió:** propuesta inicial con 8 funcionalidades en el alcance y NO-alcance justificado.

## Prompt 7

**Modelo:** Claude Opus 5.5 (`claude-opus-5-5`) · Esfuerzo/variante: No verificado
**Herramienta:** Claude Code

```
He revisado críticamente tu propuesta de 8 funcionalidades para FlowSync.

Quiero aplicar estos recortes:

1. Elimina como funcionalidad independiente la reasignación posterior de responsables y la opción de autoasignarse tareas libres. La asignación inicial del responsable se mantiene dentro de la creación de tareas.
2. Simplifica la fecha de vencimiento: mostrar la fecha y distinguir las tareas vencidas, sin añadir gestión avanzada de plazos.
3. Simplifica «qué se ha movido desde la última visita»: debe permitir identificar las tareas que cambiaron, sin incorporar un historial completo de actividad.

No elimines la actualización de estados en tiempo real, el filtro por estado ni la información de cambios desde la última visita, porque forman parte de la hipótesis de producto recogida en la ficha.

Reformula los cinco bloques del PRD incorporando estas decisiones. En el apartado de NO-alcance, justifica las exclusiones vinculándolas al problema que queremos resolver.

Indica al final:
- Número de funcionalidades propuestas inicialmente.
- Número de funcionalidades que permanecen tras el recorte.
- Qué hemos eliminado o simplificado realmente.

No añadas funcionalidades, arquitectura, base de datos ni endpoints. No modifiques archivos todavía: quiero revisar la versión final antes de guardarla.
```

**Qué salió:** v2 con 7 funcionalidades; el agente señaló que quitar la reasignación chocaba con «elegir lo siguiente sabiendo qué está libre».

## Prompt 8

**Modelo:** Claude Opus 5.5 (`claude-opus-5-5`) · Esfuerzo/variante: No verificado
**Herramienta:** Claude Code

```
He revisado la segunda versión del PRD y quiero corregir dos restricciones que pueden comprometer la hipótesis principal del MVP.

**Decisiones de producto:**

1. Debe ser posible asignar o cambiar el responsable de una tarea después de crearla. Si una tarea está libre, alguien debe poder asumirla. No necesitamos un flujo independiente ni un botón especial de autoasignación: basta con la gestión sencilla del responsable dentro de la tarea.

2. La fecha de vencimiento debe poder introducirse y corregirse. Seguimos excluyendo recordatorios, planificación avanzada y gestión compleja de plazos.

3. La información de cambios desde la última visita debe centrarse en qué tareas han cambiado de estado, sin construir un historial completo de actividad.

4. Mantén los siete bloques funcionales actuales, integrando la asignación y modificación sencilla del responsable dentro de la gestión básica de tareas. No aumentes el número de funcionalidades independientes.

5. Conserva las exclusiones de la ficha del profesor y justifícalas en relación con la hipótesis del producto.

**Importante:** en el balance del recorte, distingue claramente entre capacidades realmente excluidas y capacidades que simplemente hemos agrupado o simplificado. No presentes una agrupación como si hubiéramos eliminado una funcionalidad.

Devuélveme los cinco bloques del PRD revisados, el balance actualizado y las tensiones pendientes.

No modifiques archivos todavía. No añadas arquitectura, base de datos, endpoints ni funcionalidades ajenas al ejercicio.
```

**Qué salió:** v3 aprobada: 7 bloques, balance separando agrupado / simplificado / excluido, y tensiones pendientes.

## Prompt 9

**Modelo:** Claude Opus 5.5 (`claude-opus-5-5`) · Esfuerzo/variante: No verificado
**Herramienta:** Claude Code

```
Apruebo la versión 3 del PRD de FlowSync. No quiero realizar más rondas de refinamiento.

Vamos a cerrar el ejercicio del Módulo 2 de AI4Devs.

**1. Crear el documento definitivo**

Guarda la versión aprobada en:

`docs/prd/alcance-mvp-pam.md`

Conserva los cinco bloques:
1. Problema
2. Usuarios
3. Propuesta de valor
4. Alcance
5. NO-alcance

Mantén las siete funcionalidades agrupadas y las exclusiones justificadas, sin introducir funcionalidades nuevas.

Incorpora brevemente los supuestos relevantes del MVP, especialmente que solo existe un espacio compartido.

**2. Completar la Parte B obligatoria**

Añade al final del documento una sección con exactamente tres reflexiones:

1. Cuántas funcionalidades propuso inicialmente el agente y cuántos bloques funcionales permanecen después de los recortes, aclarando que parte de la reducción corresponde a una agrupación.
2. Tres funcionalidades expresamente excluidas y por qué no aportan valor suficiente a la hipótesis del MVP.
3. La exclusión más difícil de decidir y qué evidencia obtenida con usuarios reales justificaría reconsiderarla.

Basa las reflexiones en las decisiones y los argumentos ya discutidos. No inventes resultados de usuarios ni afirmes que hemos validado el producto.

**3. Revisar prompts.md**

Conserva el contenido existente y registra los prompts que realmente hemos enviado durante este ejercicio, identificando Claude Code y el modelo utilizado.

Copia los prompts literalmente cuando estén disponibles en el historial. No los reconstruyas ni los inventes. Si alguno no puede recuperarse con exactitud o desconoces el modelo, señala qué información debemos completar manualmente.

Incluye también este prompt de cierre.

**4. Restricciones**

- Trabaja exclusivamente en la rama `alcance-pam`.
- No crees otra rama.
- No modifiques archivos distintos de `docs/prd/alcance-mvp-pam.md` y `prompts.md`.
- No utilices Jira.
- No ejecutes implementaciones ni pruebas funcionales.
- No hagas commit ni push todavía.
- No abras todavía el Pull Request.

Al finalizar, muestra un resumen breve de los archivos creados o modificados y de cualquier dato pendiente de completar.
```

**Qué salió:** creado `docs/prd/alcance-mvp-pam.md` y registrados los prompts en este archivo.

## Prompt 10

**Modelo:** Claude Opus 5.5 (`claude-opus-5-5`) · Esfuerzo/variante: No verificado
**Herramienta:** Claude Code

```
He creado el PRD y añadido los prompts a prompts.md, todo en la rama alcance-pam. Solo he tocado esos dos archivos y no hay commit ni push. Tampoco he usado Jira ni ejecutado nada.

Archivos

┌─────────────────────────────┬─────────────┬─────────────────────────────────────────────────┐
│           Archivo           │   Estado    │                    Contenido                    │
├─────────────────────────────┼─────────────┼─────────────────────────────────────────────────┤
│ docs/prd/alcance-mvp-pam.md │ nuevo (108  │ El PRD v3 aprobado, más el supuesto del espacio │
│                             │ líneas)     │  único, las cuestiones abiertas y la Parte B    │
├─────────────────────────────┼─────────────┼─────────────────────────────────────────────────┤
│                             │             │ Conserva la plantilla original y añade los 9    │
│ prompts.md                  │ modificado  │ prompts de esta sesión, copiados literalmente   │
│                             │             │ del historial y marcados como Claude Code con   │
│                             │             │ el modelo Claude Opus 5.5 (claude-opus-5-5)     │
└─────────────────────────────┴─────────────┴─────────────────────────────────────────────────┘

Lo que he añadido sin que lo pidieras: el README del ejercicio exige tres tramos en el documento, así que antes de los cinco bloques he puesto el Tramo 1 (lo que ya existe en el repo) y el Tramo 2 (las cinco preguntas con sus respuestas resumidas). El Tramo 1 está escrito sin nombres de tablas ni endpoints, porque el README prohíbe incluirlos en el documento.

En la Parte B he elegido estas opciones; cámbialas si no las ves tuyas:
- Las tres exclusiones: notificaciones push, comentarios en tareas e historial completo de actividad.
- La exclusión más dudosa: limitar las marcas de «cambios desde la última visita» a los cambios de estado. Así no se ve si alguien ha asumido una tarea libre mientras estabas fuera.
- La corrección de la v2: en la reflexión 1 dejo escrito que se quitó la reasignación de responsable y luego se recuperó. El README pide anotar las incoherencias señaladas por el agente.

Pendiente de completar a mano en prompts.md

1. Nivel de esfuerzo o variante del modelo (por ejemplo «xHigh» o «1M»). Desde la sesión no puedo saberlo; está marcado con ⚠️ en los 9 prompts.
2. Ejemplo de la plantilla: sigue ahí porque pediste conservar el contenido, pero la plantilla dice que hay que borrarlo. Además su título ## Prompt 1 coincide con el de tu primer prompt. Te recomiendo borrarlo.
3. Prompts de otras sesiones: solo he registrado los de esta. Si lanzaste alguno en otra sesión o con otra herramienta, añádelo.

Las líneas «Qué salió» de cada prompt las he escrito yo. Revísalas, son opcionales.

Cuando lo apruebes, el siguiente paso según el README es git add docs/prd prompts.md, el commit y el push. La rama todavía no existe en tu fork.
```

**Qué salió:** era el resumen anterior del agente pegado de vuelta, sin instrucción nueva; el agente no modificó nada y preguntó cómo seguir.

## Prompt 11

**Modelo:** Claude Opus 5.5 (`claude-opus-5-5`) · Esfuerzo/variante: No verificado
**Herramienta:** Claude Code

```
Vamos a cerrar definitivamente el ejercicio.

Realiza únicamente estos ajustes en `prompts.md`:

1. Elimina el prompt de ejemplo incluido en la plantilla original, que no corresponde a un prompt ejecutado.
2. Conserva los nueve prompts reales, su contenido literal y su orden cronológico.
3. Mantén el modelo identificado como `claude-opus-5-5` solo si está verificado. Los datos de esfuerzo o variante que no puedas comprobar deben quedar como «No verificado», sin inventarlos.
4. Comprueba que la numeración no esté duplicada.

No modifiques el PRD ni añadas funcionalidades.

Después, ejecuta `git status --short` y `git diff --check` y confirma que solo están afectados `docs/prd/alcance-mvp-pam.md` y `prompts.md`.

No hagas commit ni push.
```

**Qué salió:** ejemplo eliminado, esfuerzo/variante marcado como «No verificado», numeración 1–9 sin duplicados y comprobaciones limpias.

## Prompt 12

**Modelo:** Claude Opus 5.5 (`claude-opus-5-5`) · Esfuerzo/variante: No verificado
**Herramienta:** Claude Code

```
Último ajuste antes de entregar el ejercicio.

Actualiza únicamente `prompts.md`:

- Registra como Prompt 10 y Prompt 11 los dos últimos prompts reales que faltan de esta conversación, copiándolos literalmente del historial y respetando su orden cronológico.
- Registra también esta misma instrucción como Prompt 12, para dejar completo el historial de trabajo.
- Mantén el modelo verificado y marca como «No verificado» cualquier dato de configuración que no puedas comprobar.
- No reconstruyas ni inventes textos que no encuentres en el historial.
- Conserva intactos los nueve prompts anteriores.

No modifiques el PRD. No crees más archivos.

Al terminar, comprueba `git status --short` y `git diff --check`.

No hagas commit, push ni Pull Request. Confirma brevemente el resultado.
```

**Qué salió:** registrados los prompts 10, 11 y 12.
