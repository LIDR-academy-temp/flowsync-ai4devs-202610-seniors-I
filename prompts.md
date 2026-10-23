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

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code (subagente Explore, delegado desde la sesión principal)

```
Read-only. In /Users/nuria/Desktop/code/nuriaromerodev/curso-LIDR/flowsync-ai4devs-202610-seniors-I, map what is ALREADY BUILT, to write a 3-5 line product-level summary. Inspect backend/database/migrations, backend/app/models, backend/start/routes.ts, backend/app/controllers, and frontend/src (pages, routes, components, lib/api.ts). Report concisely (max ~25 lines): (1) capabilities that exist end-to-end (e.g. signup/login/profile/logout), (2) the current data model in plain words (entities and key fields only), (3) what is NOT there yet (tasks, teams, statuses, etc.), (4) frontend screens that exist. Do not modify anything. Be factual: cite file paths.
```

**Qué salió:** funcionó a la primera. Nota: este prompt lo redactó el agente principal a partir de mi petición ("vamos con el paso 1"), no lo escribí yo literalmente.

## Prompt 2

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
Quiero definir el alcance de un MVP a partir de este párrafo vago:

«Quiero que FlowSync sea una herramienta para que los equipos remotos sepan en qué está trabajando cada uno sin tener que hacer reuniones de sincronización. Algo tipo tareas compartidas pero más en tiempo real y menos rollo que Jira.»

Contexto del código: hoy solo existe autenticación (alta, login, perfil, logout) y la tabla de usuarios. No hay tareas ni nada del producto.

Antes de proponerme nada, pregúntame. Hazme las CINCO preguntas que más reducirían la incertidumbre sobre el problema, los usuarios y el alcance. Una sola ronda: no abras otra después. No bajes al modelo de datos ni a endpoints. Numera las preguntas y no propongas alcance todavía.
```

**Qué salió:** funcionó a la primera: cinco preguntas numeradas (dolor, quién cobra el valor, qué desaparece, tiempo real / menos rollo que Jira, fronteras y éxito), sin proponer alcance ni bajar a datos.

1. Dolor: ¿qué pasa hoy exactamente cuando un equipo remoto no sabe en qué trabaja cada uno? ¿Hay un episodio concreto que lo ilustre?
2. Quién cobra el valor: ¿quién se beneficia más, quien actualiza la información, quien la consulta o un responsable de equipo? ¿Por qué la actualizaría quien trabaja?
3. Qué desaparece: ¿qué reunión o interrupción debería dejar de ocurrir, de forma entera o solo en parte?
4. "Tiempo real" y "menos rollo que Jira": ¿qué decisión concreta cambia ver los cambios sin refrescar? ¿Qué es lo mínimo que debe tener una tarea?
5. Fronteras y éxito: ¿qué tamaño de equipo y qué primer usuario? ¿Qué queda fuera de forma explícita y cómo sabrías, tras una semana de uso, que funcionó?

## Prompt 3

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
Estas son mis respuestas, ya decididas:

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

Fuera del MVP: notificaciones push, integración con Slack, roles/permisos avanzados, analítica/reporting, comentarios en tareas.

Si algo que preguntaste no está cubierto, decide tú y márcalo como supuesto. Al terminar, lista los supuestos que has hecho. Todavía no propongas el alcance.
```

**Qué salió:** siete supuestos declarados (acceso abierto, estados fijos, responsable único, edición plana, "qué se movió" sin historial, vencida solo visual, reutilizar auth). Señaló además una tensión entre "sin refrescar" y "resumen que espera".

## Prompt 4

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
Ahora propón el alcance del MVP en cinco bloques: problema, usuarios, propuesta de valor, alcance y NO-alcance.

Sé agresivo recortando. Para cada exclusión del NO-alcance, justifica por qué queda fuera: qué hipótesis del producto no ayudaría a validar. "No da tiempo" no es una justificación válida.

Es un documento de producto: nada de tablas de base de datos, endpoints ni arquitectura. Si algo suena a implementación, súbelo de nivel o quítalo. Que quepa en una pantalla larga.
```

**Qué salió:** los cinco bloques, sin tablas ni endpoints. Propuso **11** cosas dentro del alcance y 13 exclusiones justificadas.

## Prompt 5

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
quita la 7, la 10 y la 11
```

**Qué salió:** recorte a **8** dentro del alcance (salieron borrar tarea, marca de "cambió desde tu última visita" y marca de vencida). Al escribir el documento la IA detectó una incoherencia: la propuesta de valor promete ver "qué se ha movido" y el alcance recortado ya no lo permite.
