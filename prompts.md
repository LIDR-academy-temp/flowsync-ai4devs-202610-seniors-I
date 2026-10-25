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

**Modelo:** Opus 1M xHigh
**Herramienta:** Claude Code

```
Tenemos un proyecto ya desarrollado, que puedes observar en este repositorio. Tenemos que realizar una nueva funcionalidad que te describiré más adelante. Pero antes necsito que investigues lo que está ya construido, que funcionalidades hay ya en marcha y que modelo de datos ya está definido. Necsito que hagas un resumen y me lo escribas en docs/model.md. De esta forma siempre podremos usar este model.md como base de verdad. Indicaselo al CLAUDE.md para que lo lea antes de empezar. Este model.md nos guiará para saber que hay y no reinventar nada. 
```

**Qué salió:** Me hizo un resumen de lo que ya está hecho (basícamente el login y registro) que está bien, y sacó la estrucutra de BBDD y la arquitectura interna de ambos proyectos. 


---

## Prompt 2

**Modelo:** Opus 1M xHigh
**Herramienta:** Claude Code

```
Ahora vamos con la funcionalidad que queremos implementar. El product owner nos ha pedido lo siguiente: 

Quiero que FlowSync sea una herramienta para que los equipos remotos sepan en qué está trabajando cada uno sin tener que hacer reuniones de sincronización. Algo tipo tareas compartidas pero más en tiempo real y menos rollo que Jira

Es una tarea muy vaga y necesito redactar un MVP en md definido en docs/prd/alcance-mvp-IDU.md. Antes de escribir este fichero, necesito definir el alcance del MVP. Para definir este alcance debermos definir "Criterios de aceptación" y "Tareas que quedan fuera del alcance". Al ser una funcionalidad no quiero ver nada de código, solo quiero ver cirterios de aceptacion escrito en lenguaje humano explicando porque deben entrar en el MVP. Por ejemplo: Un usuario puede mover las tareas entre estados sin restricción => Esto permite que los usuarios puedan cambiar fácilmente el estado de las tareas sin restricciones permitiendose adatparse a cualquier situación. 

Por otro lado habrá que sacar tareas que no queremos abordar en el MVP, como podría ser: Cuando alguien cambia la tarea de estado se hace una notificación push => Esto no aporta flexibilidad al desarrollo si no que interrumpe a los usuarios mientra están haciendo otras tareas. 

Antes de escribir nada, quiero que me hagas un brain storm de todas las funcionalidades que deberían entrar en el MVP. 

Preguntame todas las dudas que te surjan. 


A continuación te dejo un listado de todas las decisiones que se han tomado durante la reunión que te permitirán sacar más ideas o deseachar tareas. 

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

Tareas que no queremos en el MVP

- Fuera del MVP: notificaciones push, integración con Slack, roles/permisos avanzados, analítica/reporting, comentarios en tareas.


```

**Qué salió:**  Me ha ido haciendo preguntas. De hecho, en la auditoría, yo he marcado que si quiero ver el historicco de cambios de estado en las tareas, cuando se hizo y quien. Es una contradicción mia que voy a mitigar para reducir el MVP. 


---

## Prompt 3

**Modelo:** Opus 1M xHigh
**Herramienta:** Claude Code

```
Vamos a tratar de reducir el MVP. Replanteate todas las funcionalidades y vamos a intentar recortarlas para simplificar el proceso sin reducir lo pedido. Por ejemplo, yo marque la auditoría, pero por simplicidad vamos a eliminarla ya que aporta ruido en una herramienta que quiere ser simple y fácil de usar. Reevalua todo creando un agente en un contexto limpio que solo lea el model.md y que te rebata tus opiniones para que las volvamos a evaluar. El objetivo es que sea una herramienta muy sencilla y fácil de usar. 
```

**Qué salió:** 
```
El MVP recortado quedó en 11 criterios

Lo que recorté (con el ahorro de complejidad real, no solo menos features):
- Historial/auditoría → fuera. Tu decisión. Su único valor ("¿sigue vivo?") lo cubre gratis el updated_at.
- Datos derivados, no modelados: "vencido" se calcula de la fecha, "hace X" sale del updated_at del ORM, "mis tareas" es filtro en cliente. Cero columnas y cero endpoints nuevos para estos tres.
- Filtros por estado → agrupación visual + resaltado de lo propio. Sin selectores que mantener.
- Borrado directo, sin papelera ni soft-delete.
- Reutilizo auth, fullName/initials y timestamps que ya existen.

El modelo nuevo se queda en una sola tabla: tasks { id, titulo, user_id (nullable), estado (default 'Por hacer'), created_at, updated_at }.

Dos decisiones que tomé sin ti (no respondiste a tiempo) — revísalas

1. Fecha de vencimiento → la MANTUVE. Me dijiste "reducir sin reducir lo pedido", y la fecha la pediste tú. El agente quería eliminarla; quitarla sí habría reducido lo pedido. La simplifiqué (opcional, "vencido" derivado).
2. Estados → bajé a 3, quité "Bloqueado". Este sí lo recorté: fue una decisión nuestra del refinamiento, no del PO — él dijo que los bloqueos siguen en la daily. Es el único recorte que el agente marcó como arriesgado y lo dejé anotado en §9/§11 como lo primero a re-añadir (una línea del enum) si el equipo lo echa de menos.
```


