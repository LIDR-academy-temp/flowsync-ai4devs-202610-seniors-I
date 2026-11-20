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

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Registra en prompts.md los prompts que voy utilizado durante esta sesión, incluyendo el modelo, la herramienta y los intentos fallidos. Conserva los textos originales sin modificarlos.
```

**Qué salió:** funcionó a la primera.

## Prompt 2

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
run `primer-prompt.md`
```

Contenido literal de `primer-prompt.md` ejecutado:

```
Rol: Senior Software Engineer con experiencia en arquitectura de software y análisis de productos.

Contexto:
Estoy trabajando en FlowSync, una aplicación existente sobre la cual vamos a definir el alcance de un MVP.

El objetivo es elaborar un documento de producto (PRD), no una evaluación de arquitectura ni una auditoría técnica.

Misión:
Analiza el repositorio actual de FlowSync para comprender las capacidades existentes y evitar proponer funcionalidades que ya están implementadas.

Investiga los siguientes aspectos:

1. Identifica el problema de negocio que FlowSync busca resolver, según la documentación existente.
2. Identifica las funcionalidades de negocio actualmente implementadas, agrupándolas por categorías.
3. Identifica funcionalidades iniciadas pero todavía incompletas, cuando exista evidencia en el repositorio.
4. Describe a alto nivel el modelo de datos actual, indicando qué información administra el sistema y qué tecnología de almacenamiento utiliza.

Entregable:
Presenta un resumen ejecutivo de entre 3 y 5 líneas, adecuado para incluirse directamente en un Product Requirements Document (PRD).

Restricciones:
- Utiliza la documentación y el código existente como fuentes de información.
- Distingue lo documentado de lo verificado en el código.
- No inventes funcionalidades ni asumas que algo está implementado únicamente porque aparece en la documentación.
- No propongas nuevas funcionalidades.
- No evalúes seguridad, calidad del código ni cobertura de pruebas.
- No profundices en tablas, endpoints ni arquitectura técnica.
- No modifiques archivos de implementación.
- No realices commits ni push.
- Registra este prompt literalmente en prompts.md, indicando la herramienta y el modelo utilizado.
```

**Qué salió:** funcionó a la primera; devolvió el resumen ejecutivo del terreno existente.

## Prompt 3

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
execute `segundo-prompt.md`
```

Contenido literal de `segundo-prompt.md` ejecutado:

```
Rol: Product Manager con experiencia en descubrimiento de productos digitales y definición de MVP.

Contexto:
Estamos definiendo el alcance del MVP de FlowSync. Ya realizamos un análisis inicial de las capacidades existentes del repositorio.

Misión:
Antes de proponer cualquier solución o funcionalidad, formula exactamente cinco preguntas estratégicas que permitan reducir la incertidumbre sobre:

- El problema de negocio que queremos resolver.
- Los usuarios y sus necesidades.
- El alcance y las limitaciones del MVP.

Restricciones:
- Realiza una única ronda de cinco preguntas.
- Prioriza las preguntas que más influyan en las decisiones de producto.
- No propongas funcionalidades todavía.
- No profundices en modelos de datos, endpoints ni arquitectura técnica.
- No respondas las preguntas ni establezcas supuestos todavía. Espera a que te proporcione la ficha de hechos del producto.
```

**Qué salió:** funcionó a la primera; devolvió cinco preguntas en una sola ronda, sin proponer funcionalidades.

## Prompt 4

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

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

**Qué salió:** la ficha de hechos pegada entera, de una vez; respondió a las cinco preguntas y el agente marcó como supuestos los huecos que no cubría.

## Prompt 5

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Fuera del MVP:
- Notificaciones push.
- Integración con Slack.
- Roles y permisos avanzados.
- Analítica y reportes.
- Comentarios en tareas.
```

**Qué salió:** el agente justificó cada exclusión con la ficha de hechos y la consolidó con el resto de exclusiones que ya fijaba la ficha.

## Prompt 6

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
execute `quinto-prompt.md`
```

Contenido literal de `quinto-prompt.md` ejecutado:

```
Rol: Product Manager con experiencia en definición y priorización de MVP.

Contexto:
Ya completamos el análisis inicial de FlowSync y las cinco preguntas estratégicas. También proporcioné la ficha oficial de hechos del producto.

Objetivo:
Propón el alcance del MVP de FlowSync utilizando exclusivamente la información proporcionada y los hallazgos del análisis previo.

Organiza tu propuesta en cinco bloques:

1. Problema que buscamos resolver.
2. Usuarios objetivo.
3. Propuesta de valor.
4. Alcance: funcionalidades mínimas necesarias para validar el producto.
5. NO-alcance: funcionalidades excluidas y justificación de cada exclusión.

Criterios:
- Sé especialmente estricto al seleccionar funcionalidades.
- Prioriza una experiencia mínima, funcional y completa de principio a fin.
- Justifica cada exclusión indicando qué hipótesis del producto no ayuda a validar.
- Respeta las exclusiones explícitas de la ficha.
- Diferencia los hechos confirmados de los supuestos.
- No introduzcas nuevas funcionalidades sin justificación.
- No incluyas arquitectura, endpoints, tablas ni detalles de implementación.

Importante:
- Esta es tu propuesta inicial, no la decisión definitiva.
- Presenta las funcionalidades incluidas como elementos individuales para que pueda contarlas y evaluar cuáles eliminar.
- No generes todavía el documento definitivo del PRD.
- No modifiques código ni realices commits o push.
```

**Qué salió:** propuesta inicial en cinco bloques, con las funcionalidades numeradas una a una y cada exclusión ligada a la hipótesis que no valida.

## Prompt 7

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
execute `parte-b-prompt.md`
```

Contenido literal de `parte-b-prompt.md` ejecutado:

```
## Parte B — Decisiones de alcance

**1. Los dos números:** 
8 funcionalidades propuestas por la IA; 
6 funcionalidades conservadas después de mi recorte.

**2. Tres exclusiones:** 
- F5 (resaltado de tareas vencidas), porque la fecha sigue visible y resaltarla no es necesario para validar H1, H2 ni H3; 
- F8 (resaltado de cambios desde la última visita), porque inicialmente validaremos si consultar el estado actual es suficiente para sustituir la ronda de sincronización (H2); y notificaciones push, porque no validan directamente las hipótesis del producto y contradicen el objetivo de reducir las interrupciones.

**3. Exclusión con mayor incertidumbre:** 
- F8. Existe una tensión entre mantener el MVP sencillo y permitir que los usuarios identifiquen fácilmente qué cambió mientras estaban ausentes. Reconsideraría incluir esta funcionalidad si, durante la primera semana de uso, el equipo continúa necesitando preguntas de sincronización porque visualizar el estado actual no resulta suficiente.
```

**Qué salió:** el agente generó `docs/prd/alcance-mvp-jv.md` con los tres tramos, el alcance recortado a 6 funcionalidades y la Parte B tal cual, y señaló incoherencias entre el recorte y la ficha.

## Prompt 8

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
## Parte B — Decisiones de alcance

**1. Los dos números:** 8 funcionalidades propuestas por la IA; 6 funcionalidades conservadas después de mi recorte.

**2. Tres exclusiones:** F5 (resaltado de tareas vencidas), porque no es indispensable para validar H1, H2 ni H3, aunque limita la identificación inmediata de retrasos; F8 (resaltado de cambios recientes), porque inicialmente validaremos si visualizar el estado actual es suficiente para sustituir la ronda de sincronización (H2), aun cuando no permita identificar exactamente qué cambió; y edición de título o fecha de tareas, porque no valida directamente las tres hipótesis, aunque su ausencia podría afectar la adopción del producto.

**3. Exclusión con mayor incertidumbre:** F8. La ficha establece que el usuario debe identificar qué cambió mientras estuvo ausente, pero mi recorte supone que visualizar el estado actual será suficiente. Reconsideraría incluir F8 si durante la primera semana el equipo continúa necesitando preguntas de sincronización porque no puede identificar los cambios recientes.
```

**Qué salió:** el agente sustituyó la Parte B del documento por esta versión y alineó con ella las filas de F5, F8 y la edición de tareas en el NO-alcance.

## Prompt 9

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Revisa el PRD de FlowSync para corregir la incoherencia identificada.

Decisiones:
1. Mantener las 6 funcionalidades del MVP (F1, F2, F3, F4, F6 y F7).
2. Ajustar F1 para permitir crear y editar los datos básicos de una tarea, incluyendo título y fecha de vencimiento opcional.
3. Eliminar del NO-alcance la exclusión de edición de título y fecha.
4. Sustituir la tercera exclusión de la Parte B por borrar o archivar tareas, justificando que no es indispensable para validar H1, H2 ni H3, ya que el estado "Hecha" y el filtro por estado permiten apartar las tareas completadas de la vista.
5. Mantener F5 y F8 excluidas, junto con sus limitaciones y riesgos previamente documentados.
6. Conservar los números 8 funcionalidades propuestas y 6 conservadas.

Antes de modificar el documento, comprueba que estos cambios no generen nuevas contradicciones con la ficha oficial del producto.

Actualiza únicamente docs/prd/alcance-mvp-jv.md y registra este prompt literalmente en prompts.md con el modelo y la herramienta.

No modifiques código, no hagas commit ni push y no abras el Pull Request todavía.
```

**Qué salió:** el agente comprobó los cambios contra la ficha (sin contradicciones nuevas), amplió F1 a crear y editar, quitó la exclusión de edición y sustituyó la tercera exclusión de la Parte B por borrar o archivar tareas.

## Prompt 10

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Realiza una última revisión de consistencia del PRD.

1. En la exclusión de borrar o archivar tareas, reconoce el riesgo de que una tarea creada por error no pueda eliminarse y que marcarla como "Hecha" podría distorsionar la información del equipo.
2. Deja explícito que F1 se amplió para incluir edición básica, aunque el recuento continúa siendo 8 funcionalidades originalmente propuestas y 6 capacidades conservadas.
3. Verifica que la Parte B y el NO-alcance sean consistentes con estas decisiones.
4. No amplíes el alcance ni agregues nuevas funcionalidades.
5. Mantén el documento breve y registra este prompt literalmente en prompts.md.

No hagas commit, push ni abras el Pull Request.
```

**Qué salió:** el agente añadió el riesgo de no poder borrar tareas al NO-alcance y a la Parte B, dejó escrita la ampliación de F1 junto al alcance y en la línea 1 de la Parte B, y comprobó que las dos secciones son consistentes.
