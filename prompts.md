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
Vamos a definir el alcance de un MVP para este proyecto. Es una tarea de producto, no de código: no crees ramas, no modifiques ficheros, no hagas commits ni abras PRs, aunque CLAUDE.md lo indique para tareas de código.

Antes de especificar nada, necesito saber sobre qué terreno construimos. Lee el backend y el frontend y devuélveme:
1. Qué capabilities hay ya construidas de punta a punta, es decir, qué puede hacer hoy un usuario.
2. Cómo es el modelo de datos actual: qué entidades existen y cómo se relacionan.
3. Qué conceptos no existen todavía.

Respóndeme en lenguaje de producto, en un máximo de 10 líneas. No propongas nada todavía.
```

**Qué salió:** funcionó a la primera.

## Prompt 2

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Este es el encargo que llega, tal cual:

«Quiero que FlowSync sea una herramienta para que los equipos remotos sepan en qué está trabajando cada uno sin tener que hacer reuniones de sincronización. Algo tipo tareas compartidas pero más en tiempo real y menos rollo que Jira.»

Antes de proponer ningún alcance, hazme las cinco preguntas que más reducirían la incertidumbre sobre el problema, los usuarios y el alcance. Reglas:
- Exactamente cinco, ordenadas de más a menos impacto. Para cada una, añade una línea con qué decisión de alcance depende de la respuesta.
- Una sola ronda: después de mis respuestas no habrá más preguntas.
- Nada de modelo de datos, endpoints, arquitectura ni tecnología. Estamos en el nivel de producto.
- No propongas alcance todavía.
```

**Qué salió:** funcionó a la primera.

## Prompt 3

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Estas son las respuestas del producto, ya decididas. Úsalas tal cual, sin reinterpretarlas:

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

Y esto ya está decidido que queda fuera:

- Fuera del MVP: notificaciones push, integración con Slack, roles/permisos avanzados, analítica/reporting, comentarios en tareas.

Si alguna de tus preguntas no queda cubierta por estas respuestas, no vuelvas a preguntarme: decide tú, márcalo como SUPUESTO y lista todos los supuestos al final. De momento solo quiero dos cosas: qué punto responde cada una de tus cinco preguntas y la lista de supuestos que has tenido que tomar. Todavía no propongas alcance.
```

**Qué salió:** funcionó a la primera; declaró 13 supuestos.

## Prompt 4

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Sobre tus supuestos: acepto que se reutilizan las cuentas existentes, que cualquiera puede editar cualquier tarea, que todo el que tiene cuenta entra en el espacio único y que una tarea tiene un solo responsable. Corrijo estos: no habrá estado "bloqueado", porque la ficha dice que los bloqueos no los resuelve este MVP; no habrá historial de actividad por persona, porque el estado es de la tarea y no de la persona; y los estados no serán configurables, porque configurar es el "rollo" que queremos evitar. Tenlo en cuenta en lo que te pida a continuación. Responde solo "entendido".
```

**Qué salió:** funcionó a la primera.

## Prompt 5

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Con todo lo anterior, propón el alcance del MVP como documento de producto, con exactamente cinco bloques: Problema, Usuarios, Propuesta de valor, Alcance y NO-alcance.

Condiciones:
- Sé agresivo recortando: una vertical fina y usable de punta a punta, no el andamiaje de un producto.
- Formula en una frase la hipótesis central del producto y nombra el riesgo principal.
- Numera los elementos del Alcance (A1, A2…) y los del NO-alcance (N1, N2…).
- Cada elemento del NO-alcance lleva su porqué con esta forma: "no ayuda a validar que…". "No da tiempo" o "es complejo" no valen.
- Prohibido: tablas de base de datos, endpoints, arquitectura, tecnologías, casos de uso, requisitos numerados tipo RF-01 e historias de usuario. Si algo solo se puede decir así, súbelo de nivel o déjalo fuera.
- Tiene que caber en una pantalla larga.
No escribas ningún fichero todavía.
```

**Qué salió:** propuso 7 elementos de alcance (A1–A7) y 12 de NO-alcance (N1–N12).

## Prompt 6

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Escribe tu propuesta tal cual en docs/prd/alcance-mvp-<tus-iniciales>.md, con tres tramos en este orden: 1) El terreno que ya existe, con el resumen de tu primera respuesta; 2) El interrogatorio: tus cinco preguntas, la respuesta decidida a cada una en una o dos líneas, y los supuestos; 3) El alcance en cinco bloques, con la numeración A1… y N1…. Deja al final una sección "Las tres líneas" vacía. No toques ningún otro fichero y no hagas commit.
```

**Qué salió:** no funcionó a la primera: el agente no podía saber qué eran «tus iniciales» y preguntó. En el selector elegí «Las escribo yo» sin teclear nada, y volvió a preguntar (prompt 7).

## Prompt 7

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
2
```

**Qué salió:** eligió la opción 2 que había ofrecido («cl», las iniciales del agente) y escribió el fichero.

## Prompt 8

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
He editado docs/prd/alcance-mvp-<tus-iniciales>.md: ahora contiene mi recorte final. Léelo y, a partir de aquí, tu papel es atacarlo, no mejorarlo:
1. Busca incoherencias: algo que el documento pida y a la vez prohíba, o algo que prometa y que el propio alcance no permita cumplir.
2. Señala cualquier frase que haya bajado a implementación: datos, endpoints, arquitectura o tecnología.
3. Para cada elemento del NO-alcance, dime si su porqué está formulado como una hipótesis que no ayuda a validar. Si no lo está, explica por qué.
4. Dime qué exclusión te parece más discutible y qué dos cosas se contradicen en ella.
No modifiques el fichero: solo quiero la lista de problemas.
```

**Qué salió:** el fichero no se había editado (era idéntico al borrador del agente), y el agente lo avisó. Aun así atacó el borrador: 8 incoherencias, 5 frases de implementación, 4 porqués mal formulados (N6, N10, N11, N12) y N9 como la exclusión más discutible.

## Prompt 9

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Resol exercici i entrega
```

**Qué salió:** el agente hizo el recorte (7 → 4) aplicando su propio ataque, escribió las tres líneas, rellenó este fichero y abrió el PR. Recorte y tres líneas no son míos: los redactó el agente.
