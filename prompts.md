# Prompts

Todos los prompts que lancé en el ejercicio, en orden y tal cual (registrados automáticamente con un hook `UserPromptSubmit`). He quitado un "hola claude" inicial de prueba y el informe del subagente revisor, que el hook registró pero no es un prompt mío.

---

## Prompt 1

**Hora:** 16:44  
**Modelo:** Opus 5.5 (claude-opus-5-5)  
**Herramienta:** Claude Code

```
antes de empezar, quiero que revises todo el proyecto y me resumas en pocas lineas en que consiste, que funcionalidades ya tenemos implementadas y cual es el modelo de datos y añade un extra si hay alguna cosa a tener encuenta o que te llame especialmente la atencion
```

**Qué salió:** Resumen del proyecto (solo auth, tablas users y tokens) más hallazgos técnicos que no van al documento de producto.

## Prompt 2

**Hora:** 16:48  
**Modelo:** Opus 5.5 (claude-opus-5-5)  
**Herramienta:** Claude Code

```
crea un docs/prd/alcance-mvp-ab.md y bajo el formato de "## Terreno" escribe debajo un resumen de 3 a 5 lineas de producto, no hace falta que sea tecnico: que existe y que falta. no pongas los hallazgos tecnicos
```

**Qué salió:** Creó el .md con el Terreno en 4 líneas, aunque hablaba de "todavía no hay equipo".

## Prompt 3

**Hora:** 16:49  
**Modelo:** Opus 5.5 (claude-opus-5-5)  
**Herramienta:** Claude Code

```
escribelo de una forma neutra, no asumas que hay un equipo ni espacio de trabajo compartido
```

**Qué salió:** Reescribió el Terreno en neutro, sin equipos ni espacio compartido.

## Prompt 4

**Hora:** 16:50  
**Modelo:** Opus 5.5 (claude-opus-5-5)  
**Herramienta:** Claude Code

```
no hagas commit, solo haremos un unico commit al final cuando yo te diga
```

**Qué salió:** Confirmó que no hace commit.

## Prompt 5

**Hora:** 16:52  
**Modelo:** Opus 5.5 (claude-opus-5-5)  
**Herramienta:** Claude Code

```
vale, pues ahora vamos a definir un mvp a partir de esa idea
```

**Qué salió:** Se envió incompleto por error; lo repetí entero en el siguiente.

## Prompt 6

**Hora:** 16:56  
**Modelo:** Opus 5.5 (claude-opus-5-5)  
**Herramienta:** Claude Code

```
vale, pues ahora vamos a definir un mvp a partir de esa idea. Quiero que el proyecto sea una herramienta para que equipos de trabajo que se encuentran en remoto sepan en que esta trabajando cada uno sin necesidad de hacer reuniones para estar sincronizados. Tiene que ser algo que funcione a tiempo real y no tanto como Jira. Antes de empezar o proponerme nada quiero que me hagas 5 preguntas para que quede claro el plan y saber en mejor en que vamos a trabajar. Preguntas de producto y no tanto de arquitectura
```

**Qué salió:** Hizo las 5 preguntas, todas de producto y sin arquitectura.

## Prompt 7

**Hora:** 16:58  
**Modelo:** Opus 5.5 (claude-opus-5-5)  
**Herramienta:** Claude Code

```


<pasted_content id="b958">
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

- Fuera del MVP: notificaciones push, integración con Slack, roles/permisos avanzados, analítica/reporting, comentarios en tareas.

Lo que no quede cubierto, decídelo tú y márcalo explícitamente como
SUPUESTO. Añade al documento, bajo "## Interrogatorio", las 5 preguntas
resumidas y los supuestos. No propongas el alcance todavía.
</pasted_content id="b958">

```

**Qué salió:** Añadió el Interrogatorio con 8 supuestos y me señaló la incoherencia de los campos obligatorios.

## Prompt 8

**Hora:** 17:00  
**Modelo:** Opus 5.5 (claude-opus-5-5)  
**Herramienta:** Claude Code

```
vale que solo sea obligatorio el titulo
```

**Qué salió:** Pasó el supuesto a DECIDIDO: solo el título es obligatorio.

## Prompt 9

**Hora:** 17:04  
**Modelo:** Opus 5.5 (claude-opus-5-5)  
**Herramienta:** Claude Code

```
vale, pon en docs/prd/alcance-mvp-ab.md el alcance del MVP en cinco bloques: Problema, Usuarios, Propuesta de valor, Alcance y NO-alcance. Tienes que tener encuenta que esto es un MVP entonces en esta parte tenemos que recortar el alcance pero dar un producto que sea usable. Justificame que no va a entrar en el alcance y el motiv. En este documento seguimos sin incluir nada de arquitectura
```

**Qué salió:** Propuso los 5 bloques con H1-H3: 9 puntos de alcance y 17 exclusiones justificadas.

## Prompt 10

**Hora:** 17:09  
**Modelo:** Opus 5.5 (claude-opus-5-5)  
**Herramienta:** Claude Code

```
Matengo [6]: es facil tener una fecha de cuanto se realiza un cambio sobre algo y ademas es util y se siente necesario. Mantengo [8] es un requisito necesario saber que tareas estan vencidas. Mantengo [9] se mantiene pero recortamos la parte de borrar, permitimos editar pero no borrar
```

**Qué salió:** Aplicó el recorte (editar sí, borrar no) y me corrigió que "es fácil" no es una razón de producto.

## Prompt 11

**Hora:** 17:12  
**Modelo:** Opus 5.5 (claude-opus-5-5)  
**Herramienta:** Claude Code

```
Vamos a usar el subagent adversarial-reviewer para comprobar docs/prd/alcance-mvp-ab.md y detectar que se ha podido colar, si queda algo por justificar o cosas que se contradigan entre ellas. dame el resultado no cambies nada
```

**Qué salió:** El revisor encontró incoherencias reales (filtro vs H3, "qué se ha movido", métricas); no me dio tiempo a corregirlas.

## Prompt 12

**Hora:** 17:16  
**Modelo:** Opus 5.5 (claude-opus-5-5)  
**Herramienta:** Claude Code

```
Añade al final de 

<pasted_content id="b958">
docs/prd/alcance-mvp-ab.md este texto literal, sin cambiar nada:

## Parte B

1. **Los dos números:** la IA propuso 9 cosas dentro del alcance; tras mi recorte quedan 9 (una recortada: "corregir o borrar" se queda en solo editar).

2. **Tres cosas que dejé fuera:**
   - **Borrar tareas:** no ayuda a validar H1–H3, y con roles planos cualquiera podría borrar el trabajo de otro sin rastro.
   - **Integraciones (Git, Slack, calendario):** H1 es comprobar si la gente teclea el estado; derivarlo de fuera esquiva el riesgo en vez de validarlo.
   - **Bloqueos:** este MVP no resuelve la parte de bloqueos de la daily; meterla a medias no deja saber qué parte de la daily desapareció gracias a qué (H2).

3. **La decisión de la que menos seguro estoy:** mantener "ver tareas vencidas". La pide el producto, pero no valida ninguna de las tres hipótesis. Se contradecían lo que me pedían y lo que veía.

**Cuando la IA tenía razón:**
- La ficha pedía "sin campos obligatorios" y a la vez cuatro campos; decidí que solo el título sea obligatorio.
- Justifiqué el 6 y el 8 con "es fácil" y "se siente necesario", que no son razones de producto.
- El revisor detectó que el NO-alcance excluye búsqueda y ordenación "porque no hacen falta para H3", pero el único filtro es por estado y H3 necesita ver qué está libre y quién tiene qué. El documento se contradice; no me dio tiempo a corregirlo.
</pasted_content id="b958">

```

**Qué salió:** Añadió la Parte B literal.
