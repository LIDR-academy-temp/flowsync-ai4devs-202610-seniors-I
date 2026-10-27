# FS-118 — Fecha de vencimiento y tareas vencidas

Fecha: 2026-10-27. Fuente: [flowsync-mvp.md](flowsync-mvp.md) y [alcance-mvp.md](alcance-mvp.md); listado en [historias-e2.md](historias-e2.md).

## Historia

> Como persona del equipo, quiero poner, cambiar o quitar la fecha de vencimiento de una tarea y ver en la lista cuáles se han pasado de plazo, para saber de un vistazo qué está vencido sin preguntar a nadie.

Consolida en una sola historia tres que estaban separadas: HU-E2-03 (poner la fecha al crear), HU-E2-10 (cambiarla) y HU-E2-11 (quitarla). Incluye además la marca de vencida, que el PRD sitúa en E3.

- **Cubre:** RF-9 (fecha opcional), RF-12, RF-14 (fecha), RF-18, RF-19 (marca de vencida), RF-23, RF-24, RF-25 y RF-26 aplicado a la fecha. También RNF-2, RNF-5, RNF-8 y RNF-10 en lo que toca a la fecha. Sirve a J4.
- **Depende de:** HU-E2-01 (crear una tarea) y de la lista del equipo (RF-19).

## Cómo leer el origen de cada criterio

| Marca | Significa |
|---|---|
| `PRD` | Lo dice un requisito del PRD. Entre paréntesis, cuál. |
| `PRD [SUPUESTO]` | Lo dice el PRD, pero allí ya va marcado como supuesto. |
| **`PROPUESTO`** | **No está escrito en el PRD; lo propongo yo y queda para tu revisión.** Se indica si se deduce de un requisito o si es una decisión nueva. |

En todos los criterios, «hoy» es el día que es para quien mira la lista, en su huso horario (RF-25). Salvo que se diga otra cosa, las tareas de los ejemplos están en *pendiente* o *en curso*.

## Criterios de aceptación

### Poner la fecha al crear

**CA-01 · Crear con fecha futura** — `PRD` (RF-9, RF-12)
- **DADO** que estoy creando una tarea con título y responsable
- **CUANDO** le pongo como fecha de vencimiento un día posterior a hoy y la guardo
- **ENTONCES** la tarea queda guardada con ese día, sin hora, y en la lista aparece sin la marca de vencida.

**CA-02 · Crear sin fecha** — `PRD` (RF-12, RF-24)
- **DADO** que estoy creando una tarea
- **CUANDO** la guardo sin fecha de vencimiento
- **ENTONCES** se guarda sin fecha y nunca aparece como vencida, pase el tiempo que pase.

**CA-03 · Crear con fecha pasada** — `PRD [SUPUESTO]` (RF-12)
- **DADO** que estoy creando una tarea
- **CUANDO** le pongo una fecha anterior a hoy y la guardo
- **ENTONCES** se acepta y la tarea aparece como vencida desde ese momento.

**CA-04 · Fecha que no existe** — `PRD` (RF-12)
- **DADO** que estoy creando o editando una tarea
- **CUANDO** indico una fecha que no existe en el calendario, por ejemplo el 30 de febrero, y la intento guardar
- **ENTONCES** no se guarda y veo un aviso en castellano junto a la fecha que explica que no es válida.

**CA-05 · Años bisiestos** — **`PROPUESTO`** (se deduce de RF-12)
- **DADO** que estoy creando o editando una tarea
- **CUANDO** indico el 29 de febrero
- **ENTONCES** se acepta si ese año es bisiesto (por ejemplo, 2028) y se rechaza con el aviso de CA-04 si no lo es (por ejemplo, 2027).

**CA-06 · Fecha incompleta o que no es una fecha** — **`PROPUESTO`** (se deduce de RF-12)
- **DADO** que estoy creando o editando una tarea
- **CUANDO** dejo la fecha a medias (por ejemplo, día y mes sin año) o escribo algo que no es una fecha, y la intento guardar
- **ENTONCES** no se guarda y veo el aviso de CA-04. Nunca se guarda como «sin fecha» sin que yo la haya quitado.

**CA-07 · Fechas fuera de un rango razonable** — **`PROPUESTO`** (decisión nueva)
- **DADO** que estoy creando o editando una tarea
- **CUANDO** indico una fecha absurda, por ejemplo del año 1900 o del 3000
- **ENTONCES** no se guarda y veo un aviso junto a la fecha.
- *Para decidir:* los límites. Propuesta: desde el año 2000 hasta 10 años a partir de hoy.

**CA-08 · Un error en la fecha no hace perder lo demás** — **`PROPUESTO`** (decisión nueva)
- **DADO** que he escrito título, responsable y una fecha no válida
- **CUANDO** intento guardar
- **ENTONCES** veo el aviso de la fecha y conservo todo lo que había escrito, también la fecha errónea, para corregirla.
- Si además el título falla (RF-10), veo los dos avisos a la vez, cada uno junto a su dato.

### Cambiar la fecha

**CA-09 · Cambiar la fecha de cualquier tarea** — `PRD` (RF-14)
- **DADO** una tarea con fecha de vencimiento, aunque no la haya creado yo ni la tenga asignada
- **CUANDO** cambio su fecha por otro día válido y guardo
- **ENTONCES** la tarea queda con la nueva fecha.

**CA-10 · Aplazar una tarea vencida** — `PRD` (RF-14, RF-23)
- **DADO** una tarea marcada como vencida
- **CUANDO** cambio su fecha a hoy o a un día posterior y guardo
- **ENTONCES** deja de aparecer como vencida.

**CA-11 · Adelantar una fecha al pasado** — `PRD [SUPUESTO]` (RF-12, RF-23)
- **DADO** una tarea con fecha futura
- **CUANDO** cambio su fecha a un día anterior a hoy y guardo
- **ENTONCES** pasa a aparecer como vencida.

**CA-12 · Cambio de fecha rechazado** — `PRD` (RF-14, RF-12)
- **DADO** una tarea con fecha válida
- **CUANDO** la cambio por una fecha no válida (CA-04 a CA-07) e intento guardar
- **ENTONCES** no se guarda, veo el aviso y la tarea conserva la fecha que tenía.

**CA-13 · Editar otro dato no toca la fecha** — **`PROPUESTO`** (se deduce de RF-14)
- **DADO** una tarea con fecha de vencimiento
- **CUANDO** cambio solo su título o su responsable y guardo
- **ENTONCES** la fecha sigue siendo la misma.

**CA-14 · Ver la fecha actual al editar** — **`PROPUESTO`** (se deduce de RF-14)
- **DADO** una tarea con fecha de vencimiento
- **CUANDO** abro su edición
- **ENTONCES** veo la fecha que tiene ahora, para poder cambiarla o quitarla sabiendo qué hay.

### Quitar la fecha

**CA-15 · Quitar la fecha** — `PRD` (RF-14, RF-24)
- **DADO** una tarea con fecha de vencimiento, esté vencida o no
- **CUANDO** quito su fecha y guardo
- **ENTONCES** la tarea queda sin fecha y no aparece como vencida.

**CA-16 · Quitar no es lo mismo que dejar a medias** — **`PROPUESTO`** (se deduce de RF-14)
- **DADO** una tarea con fecha de vencimiento
- **CUANDO** borro solo parte de la fecha (por ejemplo, el día) e intento guardar
- **ENTONCES** se trata como fecha incompleta (CA-06), no como quitarla. Para quitarla hay que vaciarla del todo.

### Marca de vencida

**CA-17 · Tarea vencida** — `PRD` (RF-19, RF-23)
- **DADO** una tarea *pendiente* o *en curso* cuya fecha es anterior a hoy
- **CUANDO** miro la lista del equipo
- **ENTONCES** la tarea aparece marcada como vencida.

**CA-18 · Vence hoy** — `PRD [SUPUESTO]` (RF-23)
- **DADO** una tarea *pendiente* o *en curso* cuya fecha es hoy
- **CUANDO** miro la lista
- **ENTONCES** no aparece como vencida.

**CA-19 · Las tareas hechas nunca están vencidas** — `PRD [SUPUESTO]` (RF-23)
- **DADO** una tarea en *hecho* cuya fecha es anterior a hoy
- **CUANDO** miro la lista
- **ENTONCES** no aparece como vencida.

**CA-20 · Reabrir una tarea hecha con fecha pasada** — **`PROPUESTO`** (se deduce de RF-23 y RF-15)
- **DADO** una tarea en *hecho* con fecha anterior a hoy, que por tanto no aparece como vencida
- **CUANDO** alguien la devuelve a *pendiente* o *en curso*
- **ENTONCES** vuelve a aparecer como vencida.

**CA-21 · Marcar como hecha quita la marca** — `PRD [SUPUESTO]` (RF-23)
- **DADO** una tarea marcada como vencida
- **CUANDO** alguien la marca como *hecho*
- **ENTONCES** deja de aparecer como vencida.

**CA-22 · Cambio de día con la lista abierta** — **`PROPUESTO`** (decisión nueva)
- **DADO** que tengo la lista abierta y una tarea *pendiente* vence hoy
- **CUANDO** pasa la medianoche en mi huso horario
- **ENTONCES** la tarea pasa a aparecer como vencida sin que recargue, en el mismo plazo que los cambios de otras personas (10 s).
- *Por qué:* RF-26 solo cubre los cambios de otras personas. Sin este criterio, quien deja la lista abierta de un día para otro ve una marca desactualizada.

**CA-23 · La marca no depende solo del color** — `PRD` (RNF-10)
- **DADO** una tarea vencida en la lista
- **CUANDO** la miro sin distinguir colores, o con un lector de pantalla
- **ENTONCES** sé que está vencida por un texto o símbolo, no solo por el color.

**CA-24 · Pasar a vencida no interrumpe** — **`PROPUESTO`** (se deduce de RNF-5)
- **DADO** una tarea que acaba de pasar a estar vencida, por el paso del tiempo o por un cambio de fecha
- **CUANDO** ocurre
- **ENTONCES** no hay notificación, sonido, email, aviso emergente ni contador. Solo cambia la marca en la lista.

### Husos horarios

**CA-25 · El día guardado es el mismo para todos** — **`PROPUESTO`** (se deduce de RF-12 y de §8, «fechas sin hora ni zona horaria»)
- **DADO** que una persona de un huso horario pone como fecha el 15 de marzo
- **CUANDO** otra persona de un huso horario distinto abre esa tarea
- **ENTONCES** ve el 15 de marzo, nunca el 14 ni el 16.

**CA-26 · La marca puede diferir un día entre husos** — `PRD [SUPUESTO]` (RF-25)
- **DADO** una tarea *pendiente* con fecha 15 de marzo, y dos personas en husos horarios distintos
- **CUANDO** para una ya es 16 de marzo y para la otra todavía es 15
- **ENTONCES** la primera la ve vencida y la segunda no. Esa diferencia nunca supera un día.

### Cambios de otras personas y persistencia

**CA-27 · Ver el cambio de fecha de otra persona** — `PRD` (RF-26)
- **DADO** que tengo la lista abierta
- **CUANDO** otra persona pone, cambia o quita la fecha de una tarea de modo que cambie si está vencida o no
- **ENTONCES** la marca de vencida se actualiza en mi lista en 10 segundos como máximo, sin recargar.

**CA-28 · Dos personas cambian la fecha a la vez** — `PRD [SUPUESTO]` (RNF-2)
- **DADO** que dos personas cambian la fecha de la misma tarea casi a la vez
- **CUANDO** ambas guardan
- **ENTONCES** queda la fecha del último cambio guardado, y las dos ven ese resultado en 10 segundos como máximo.

**CA-29 · La fecha persiste** — `PRD` (RF-18)
- **DADO** que he puesto, cambiado o quitado la fecha de una tarea
- **CUANDO** cierro FlowSync y lo vuelvo a abrir
- **ENTONCES** la tarea tiene la fecha (o la ausencia de fecha) que guardé.

### Forma de presentar la fecha

**CA-30 · Formato español** — **`PROPUESTO`** (se deduce de RNF-8)
- **DADO** una tarea con fecha
- **CUANDO** veo o edito la fecha
- **ENTONCES** se presenta en orden día, mes y año, de forma que 03/04 se entienda siempre como 3 de abril.

**CA-31 · Todo con teclado** — `PRD` (RNF-10)
- **DADO** que solo uso el teclado
- **CUANDO** pongo, cambio o quito la fecha de una tarea
- **ENTONCES** lo puedo hacer entero sin ratón.

## Preguntas abiertas

No son criterios; necesitan tu decisión antes de cerrar la historia.

1. **¿Se ve la fecha en la lista?**
   - RF-19 y alcance §4.3 dicen que la lista muestra título, responsable, estado y la marca de vencida, pero no la fecha.
   - Sin la fecha, se sabe *que* una tarea está vencida, pero no desde cuándo, ni cuándo vence una que aún no lo está. La fecha solo se ve al editar (CA-14).
   - No lo he propuesto como criterio porque ampliaría lo que muestra la lista según el alcance.
2. **Rango de fechas admitido (CA-07):** ¿hay límites, y cuáles?
3. **PA-3.3 (RNF-2):** si el conflicto se resuelve por tarea entera, cambiar el título de una tarea a la vez que otra persona le cambia la fecha puede deshacer la fecha. CA-28 solo cubre dos cambios de fecha.

## Fuera de esta historia

No se proponen como criterios:

- **Hora o zona horaria en el vencimiento.** El alcance §5 la excluye.
- **Notificar el vencimiento.** El alcance §5 excluye las notificaciones.
- **Marca de «vence hoy» o «vence pronto».** El alcance §4.7 solo pide marcar las tareas vencidas.
- **Ordenar o filtrar por fecha.** El alcance solo pide filtrar por estado (§4.6), y el orden es por fecha de creación (RF-21).
