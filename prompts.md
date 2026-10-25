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

**Modelo:** Opus 5.5 Medium
**Herramienta:** Claude Code

```
Creame un documento de alcance de mvp para el proyecto y guardalo en `docs/prd/alcance-mvp-ga.md`

**Descripcion del proyecto:**

> «Quiero que FlowSync sea una herramienta para que los equipos remotos sepan en qué está trabajando cada uno sin tener que hacer reuniones de sincronización. Algo tipo tareas compartidas pero más en tiempo real y menos rollo que Jira.»

## Formato

1. Qué capabilities hay ya construidas y cómo es el modelo de datos actual, y escribe el resumen.
2. Las cinco preguntas que más reducirían la incertidumbre sobre el problema, los usuarios y el alcance. No puedes bajar a los modelos de datos y los endpoints
   - No inventes ninguna respuesta, usa laficha de hechos, son las respuestas del producto ya decididas, si hay alguna preguna que la ficha no cubra, tu lo decides y lo marcas como supuesto.

**ficha de echos:**

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

**Esto se ha decidido que quede fuera:**

- Fuera del MVP: notificaciones push, integración con Slack, roles/permisos avanzados, analítica/reporting, comentarios en tareas.

3. El alcance debe estar en 5 bloques:
   - Problema
   - usuarios
   - propuesta de valor
   - alcance
   - NO-alcance

   debe ser una propuesta agresiva, recortando donde sea necesario y justificando clada exclusion
```

**Qué salió:** 

Salio el archivo generado en `docs/prd/alcance-mvp-ga.md` en formato md



## Prompt 2

**Modelo:** Opus 5.5 Medium
**Herramienta:** Claude Code

vamos a recortad Ver la lista del equipo de un vistazo no me parece relevante
editar borrar una tarea el supuesto de Borrado definitivo, sin papelera ni historial, es peligroso
Frescura sin refrescar empecemos con algo simple

**Qué salió:** 

```
He hecho los tres cambios en docs/prd/alcance-mvp-ga.md:

- Vista "de un vistazo": la he quitado del alcance. Ya no hay fecha de última actualización, ni orden por lo más reciente, ni resaltado de tareas vencidas. Queda una sola vista: la lista filtrable por estado. La fecha de vencimiento sigue siendo uno de los datos de la tarea, pero sin nada visual propio. Lo he pasado a NO-alcance con su justificación y he quitado "qué se ha pasado de plazo" de la propuesta de valor.
- Borrado: ahora solo se pueden editar tareas, no borrarlas. Como cualquiera puede editar todo, borrar dejaría a cualquiera eliminar el trabajo de otro sin poder recuperarlo. Lo que ya no aplica se marca como Hecha, y lo que se creó por error se corrige editándolo. El borrado, la papelera y el archivo van a NO-alcance, marcados como [SUPUESTO]. Si prefieres un "archivar" que se pueda deshacer, es un cambio pequeño.
- Frescura: la lista abierta se pone al día sola cada pocos segundos, sin recargar. La sincronización instantánea va a NO-alcance y solo se reconsidera si ese retraso hace que dos personas acaben en lo mismo.

También he actualizado la lista de supuestos a validar del final.

El documento ya está en git add, pero no he hecho commit porque cancelaste ese paso. Cuando me digas, hago el commit, abro el PR y paso el adversarial-reviewer sobre él.
```

## Prompt 3

**Modelo:** Opus 5.5 Medium
**Herramienta:** Claude Code

 Frescura simple:  no seria mejor manejarlo con notificaciones ?

**Qué salió:** 
 Yo no lo cambiaría. Las notificaciones van en contra de dos decisiones que ya están tomadas:

1. La ficha lo descarta: "Forma de la señal: resumen que espera, no aviso que interrumpe. […] Sin notificaciones push." Además, las notificaciones push están en la lista de cosas que decidisteis dejar fuera del MVP.
2. Volverían a traer el problema. Lo que duele hoy es que te interrumpan con "¿en qué estás?". Un aviso cada vez que alguien cambia el estado de una tarea es otra interrupción, solo que automática. En un equipo de 6 personas en 3 husos horarios serían docenas al día, y la gente acabaría silenciándolas.

Además, la frescura simple y las notificaciones no hacen lo mismo:

- Frescura: cuando miras la lista, lo que ves es lo actual. Esto sí ayuda a decidir: no empiezas algo que ya ha cogido otra persona.
- Notificación: te avisa aunque no estés mirando. La ficha dice que eso solo da la sensación de estar informado, y que así el tiempo real no compensa lo que cuesta.

El único caso en que las notificaciones tendrían sentido es si dos personas cogen la misma tarea a la vez. Eso se resuelve mejor mostrando "ya la tiene X" en el momento de cogerla, sin avisar a todo el equipo. Si quieres, lo añado al alcance como mejora de "cogerla yo".

Si aun así prefieres notificaciones, sería cambiar la ficha, no solo el alcance. Dime y lo reescribo, pero lo marcaría como contradicción con la ficha.

## Prompt 4
**Modelo:** Opus 5.5 Medium
**Herramienta:** Claude Code


Editar una tarea la parte de la fecha, no se deben editar fechas de creacion o actualizacion

**Qué salió:**

Hecho. En "Editar una tarea" ahora pone claro que la fecha que se puede editar es la de vencimiento. Las fechas de creación y de última actualización las pone el sistema y no se pueden editar. Si se pudieran cambiar, ya no servirían para saber cuándo se movió algo de verdad.

El documento sigue sin commit. Cuando me digas, hago el commit, abro el PR y paso el adversarial-reviewer.
