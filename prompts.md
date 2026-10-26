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

## Prompt 1 — El terreno que ya existe

**Modelo:** Fable 5.1
**Herramienta:** Claude Code

```
No uses skills ni plugins; responde directamente.

Antes de especificar nada nuevo, necesito entender el terreno que ya existe en este proyecto.

Lee el código de backend/ y frontend/ y devuélveme:
1. Qué capabilities hay ya construidas y funcionando de punta a punta (lo que un usuario puede hacer hoy).
2. Cómo es el modelo de datos actual: entidades y relaciones, en lenguaje de producto.
3. Qué hay a medias o solo esbozado.

Reglas:
- No propongas nada ni sugieras mejoras.
- Nada de endpoints ni nombres de columnas: descríbelo como lo entendería alguien de producto.
- Máximo 10 líneas en total.
```

**Qué salió:** funcionó a la primera (43 s). Respetó el formato de producto, sin endpoints.

---

## Prompt 2 — El interrogatorio

**Modelo:** Fable 5.1
**Herramienta:** Claude Code

```
Este es el encargo que me llega, tal cual:

«Quiero que FlowSync sea una herramienta para que los equipos remotos sepan en qué está trabajando cada uno sin tener que hacer reuniones de sincronización. Algo tipo tareas compartidas pero más en tiempo real y menos rollo que Jira.»

No propongas nada todavía. Pregunta antes de proponer.

Hazme las CINCO preguntas que más reducirían la incertidumbre sobre el problema, los usuarios y el alcance del MVP.

Reglas:
- Una sola ronda: exactamente cinco preguntas, numeradas, y espera mis respuestas.
- Prohibido bajar al modelo de datos, a endpoints, a arquitectura o a tecnología.
- Ten en cuenta el terreno que acabas de leer (solo existe la autenticación).
```

**Qué salió:** cinco preguntas en una ronda, sin bajar a datos ni tecnología. La 3 ya avisa de que el tiempo real "multiplica el coste".

---

## Prompt 3 — Las respuestas (ficha de hechos)

**Modelo:** Fable 5.1
**Herramienta:** Claude Code

```
Estas son las respuestas del producto, ya decididas. Cubren tus cinco preguntas y algo más:

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

Si algo que necesitas no está cubierto aquí, decide tú y márcalo como SUPUESTO.

Todavía no propongas el alcance. Ahora devuélveme solo la lista de supuestos que estás declarando, cada uno en una línea.
```

**Qué salió:** 16 supuestos numerados. El 9 ("qué se ha movido" resuelto con "última vez tocada") es el hueco más grande.

---

## Prompt 4 — El alcance en cinco bloques

**Modelo:** Fable 5.1
**Herramienta:** Claude Code

```
Acepto tus 16 supuestos por ahora.

Propón el alcance del MVP en cinco bloques, en este orden: Problema · Usuarios · Propuesta de valor · Alcance · NO-alcance.

Reglas:
- Sé agresiva recortando: una vertical fina usable de punta a punta, no un producto amplio.
- En Alcance, numera cada cosa que entra (1, 2, 3…) para poder contarlas.
- En NO-alcance, justifica cada exclusión en una línea: qué hipótesis del producto NO ayuda a validar.
- Es un documento de producto: prohibido tablas de base de datos, endpoints, arquitectura, diagramas, casos de uso o requisitos numerados tipo RF-01.
- Que quepa en una pantalla larga.
- No lo escribas en ningún archivo, devuélvelo en el chat.
```

**Qué salió:** 9 ítems dentro y 14 exclusiones justificadas, sin tablas ni endpoints. Pero la exclusión de "desde tu última visita" se justifica con "es para un lead que no existe", cuando la ficha dice que la quiere el par que llega por la mañana.

**Recorte:** contrasté la propuesta con dos revisores (`ce-scope-guardian-reviewer` y `ce-product-lens-reviewer`) en una sesión paralela de Claude Code con Opus 5.5. Después pasé el documento final por `ce-adversarial-document-reviewer`, y corregí 6 hallazgos de texto dentro del reloj. La decisión final del recorte es mía.
