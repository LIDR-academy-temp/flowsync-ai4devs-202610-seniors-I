# Fecha de vencimiento y tareas vencidas

**Identificador:** FS-118

## Historia

Como persona del equipo, quiero poner, cambiar o quitar la fecha de vencimiento de una tarea y ver en la lista cuáles se han pasado de plazo, para saber de un vistazo qué está vencido sin preguntar a nadie.

## Origen de cada criterio

| Marca | Significa |
|---|---|
| `PRD` | Lo dice un requisito del PRD ([flowsync-mvp.md](../../prd/flowsync-mvp.md)). Entre paréntesis, cuál. |
| `PRD [SUPUESTO]` | Lo dice el PRD, pero allí ya va marcado como supuesto. |
| **`PROPUESTO`** | **No está escrito en el PRD. Se ha propuesto en la redacción de los criterios y está pendiente de revisión.** |

Convenciones:

- «Hoy» es el día que es para quien mira la lista, en su propio huso horario.
- Salvo que se diga otra cosa, las tareas de los ejemplos están en *pendiente* o *en curso*.
- La lista no muestra la fecha, solo la marca de vencida. Por eso, los criterios que dicen que una tarea «tiene» una fecha se comprueban abriendo su edición (CA-13).

Trazabilidad, dependencias y preguntas abiertas: [fs-118-fecha-vencimiento.md](../../prd/fs-118-fecha-vencimiento.md).

## Criterios de aceptación

### Poner la fecha al crear

**CA-01 · Crear con fecha** — `PRD` (RF-9, RF-12)
- **DADO** que estoy creando una tarea con título y responsable
- **CUANDO** le pongo una fecha de vencimiento válida y la guardo
- **ENTONCES** la tarea tiene esa fecha.

**CA-02 · Crear sin fecha** — `PRD` (RF-12, RF-24)
- **DADO** que estoy creando una tarea
- **CUANDO** la guardo sin fecha de vencimiento
- **ENTONCES** queda sin fecha y no aparece como vencida, tampoco en días posteriores.

**CA-03 · Crear con fecha pasada** — `PRD [SUPUESTO]` (RF-12)
- **DADO** que estoy creando una tarea
- **CUANDO** le pongo una fecha anterior a hoy y la guardo
- **ENTONCES** se acepta y la tarea aparece como vencida desde ese momento.

### Fechas no válidas y errores al guardar

Se aplican igual al crear que al editar.

**CA-04 · Fecha que no existe** — `PRD` (RF-12)
- **DADO** que estoy creando o editando una tarea
- **CUANDO** indico una fecha que no existe en el calendario, por ejemplo el 30 de febrero, y la intento guardar
- **ENTONCES** no se guarda y veo un aviso que explica que la fecha no es válida.
- Que el aviso esté en castellano lo pide RNF-8 `[SUPUESTO]`. Que aparezca junto a la fecha es **`PROPUESTO`**, por analogía con RF-10 y RF-2.

**CA-05 · Años bisiestos** — **`PROPUESTO`** (se deduce de RF-12)
- **DADO** que estoy creando o editando una tarea
- **CUANDO** indico el 29 de febrero
- **ENTONCES** se acepta si ese año es bisiesto (por ejemplo, 2028) y se rechaza como en CA-04 si no lo es (por ejemplo, 2027).

**CA-06 · Fecha incompleta no equivale a quitarla** — **`PROPUESTO`** (decisión nueva)
- **DADO** que estoy creando o editando una tarea
- **CUANDO** la fecha indicada está incompleta o no se reconoce como fecha, e intento guardar
- **ENTONCES** no se guarda y veo el aviso de CA-04.
- La tarea nunca queda «sin fecha» por una fecha incompleta. Quitar la fecha es siempre una acción explícita (CA-17).

**CA-07 · Un error en la fecha no hace perder lo escrito** — **`PROPUESTO`** (decisión nueva)
- **DADO** que he rellenado una tarea y la fecha no es válida
- **CUANDO** intento guardar y se rechaza
- **ENTONCES** conservo todo lo que había escrito, incluida la fecha errónea, para corregirla.

**CA-08 · No se puede guardar** — **`PROPUESTO`** (decisión nueva)
- **DADO** que he puesto, cambiado o quitado una fecha
- **CUANDO** intento guardar y no hay conexión o FlowSync no está disponible
- **ENTONCES** veo un aviso en castellano de que no se ha guardado, la lista no muestra el cambio como hecho y conservo lo que había escrito para reintentarlo.

### Poner, cambiar o quitar la fecha al editar

**CA-09 · Poner fecha a una tarea que no tenía** — `PRD` (RF-14)
- **DADO** una tarea sin fecha de vencimiento
- **CUANDO** la edito, le pongo una fecha válida y guardo
- **ENTONCES** la tarea tiene esa fecha.

**CA-10 · Cambiar la fecha de cualquier tarea** — `PRD` (RF-14)
- **DADO** una tarea con fecha de vencimiento, aunque no la haya creado yo ni la tenga asignada
- **CUANDO** cambio su fecha por otro día válido y guardo
- **ENTONCES** la tarea tiene la nueva fecha.

**CA-11 · Aplazar una tarea vencida** — `PRD` (RF-14, RF-23)
- **DADO** una tarea marcada como vencida
- **CUANDO** cambio su fecha a hoy o a un día posterior y guardo
- **ENTONCES** deja de aparecer como vencida.

**CA-12 · Adelantar una fecha al pasado** — `PRD [SUPUESTO]` (RF-12, RF-23)
- **DADO** una tarea con fecha posterior a hoy
- **CUANDO** cambio su fecha a un día anterior a hoy y guardo
- **ENTONCES** pasa a aparecer como vencida.

**CA-13 · Ver la fecha actual al editar** — **`PROPUESTO`** (se deduce de RF-14)
- **DADO** una tarea, con fecha o sin ella
- **CUANDO** abro su edición
- **ENTONCES** veo la fecha que tiene ahora, o que no tiene ninguna.

**CA-14 · Cambio rechazado** — `PRD` (RF-14, RF-12)
- **DADO** una tarea con una fecha válida
- **CUANDO** la cambio por una fecha no válida e intento guardar
- **ENTONCES** no se guarda y la tarea conserva la fecha que tenía.

**CA-15 · Editar otro dato no toca la fecha** — **`PROPUESTO`** (se deduce de RF-14)
- **DADO** una tarea con fecha de vencimiento
- **CUANDO** cambio solo su título, su responsable o su estado y guardo
- **ENTONCES** la fecha sigue siendo la misma.

**CA-16 · Cambiar la fecha no mueve la tarea** — `PRD [SUPUESTO]` (RF-21)
- **DADO** una tarea en una posición de la lista
- **CUANDO** alguien pone, cambia o quita su fecha
- **ENTONCES** la tarea sigue en la misma posición.

**CA-17 · Quitar la fecha** — `PRD` (RF-14, RF-24)
- **DADO** una tarea con fecha de vencimiento, esté vencida o no
- **CUANDO** quito su fecha y guardo
- **ENTONCES** la tarea queda sin fecha y no aparece como vencida.

### Marca de vencida

**CA-18 · Tarea vencida** — `PRD` (RF-19, RF-23)
- **DADO** una tarea *pendiente* o *en curso* con fecha anterior a hoy
- **CUANDO** miro la lista del equipo
- **ENTONCES** la tarea aparece marcada como vencida.

**CA-19 · Vence hoy** — `PRD [SUPUESTO]` (RF-23)
- **DADO** una tarea *pendiente* o *en curso* cuya fecha es hoy
- **CUANDO** miro la lista
- **ENTONCES** no aparece como vencida.

**CA-20 · Las tareas hechas nunca están vencidas** — `PRD [SUPUESTO]` (RF-23)
- **DADO** una tarea con fecha anterior a hoy
- **CUANDO** está en *hecho*, ya sea porque alguien la acaba de marcar así o porque se le pone o cambia la fecha estando en ese estado
- **ENTONCES** no aparece como vencida.

**CA-21 · Reabrir una tarea hecha con fecha pasada** — **`PROPUESTO`** (se deduce de RF-23 y RF-15)
- **DADO** una tarea en *hecho* con fecha anterior a hoy
- **CUANDO** alguien la devuelve a *pendiente* o *en curso*
- **ENTONCES** vuelve a aparecer como vencida.

**CA-22 · Cambio de día con la lista abierta** — **`PROPUESTO`** (decisión nueva)
- **DADO** que tengo la lista visible y una tarea *pendiente* vence hoy
- **CUANDO** pasa la medianoche en mi huso horario
- **ENTONCES** la tarea aparece como vencida en 10 segundos como máximo, sin recargar.
- Si la pestaña está oculta a medianoche, se pone al día en 10 segundos como máximo al volver a ella, como en RNF-1.
- *Por qué:* RF-26 solo cubre los cambios de otras personas. Sin este criterio, quien deja la lista abierta de un día para otro ve una marca desactualizada.

**CA-23 · La marca no depende solo del color** — `PRD [SUPUESTO]` (RNF-10)
- **DADO** una tarea vencida en la lista
- **CUANDO** la miro sin distinguir colores
- **ENTONCES** sé que está vencida por un texto o un símbolo, no solo por el color.

**CA-24 · Vencer por el paso del tiempo no interrumpe** — **`PROPUESTO`** (extiende RNF-5, que solo habla de cambios de otras personas)
- **DADO** una tarea que pasa a estar vencida porque ha cambiado el día
- **CUANDO** ocurre
- **ENTONCES** no hay notificación, sonido, email, aviso emergente ni contador. Solo cambia la marca en la lista.

### Husos horarios

**CA-25 · El día guardado es el mismo para todos** — **`PROPUESTO`** (se deduce de RF-12 y de PRD §8, «fechas sin hora ni zona horaria»)
- **DADO** que una persona de un huso horario pone como fecha el 15 de marzo
- **CUANDO** otra persona de un huso horario distinto abre la edición de esa tarea
- **ENTONCES** ve el 15 de marzo, nunca el 14 ni el 16.

**CA-26 · La marca puede diferir entre husos** — `PRD [SUPUESTO]` (RF-25)
- **DADO** una tarea *pendiente* con fecha 15 de marzo, y dos personas en husos horarios distintos
- **CUANDO** para una ya es 16 de marzo y para la otra todavía es 15
- **ENTONCES** la primera la ve vencida y la segunda no.
- Los husos con que se prueba están por decidir (PA-13). Propuesta: los tres del equipo de referencia.

### Ver el cambio, persistencia y cambios de otras personas

**CA-27 · Veo mi cambio al momento** — `PRD` (RF-18) y `PRD [SUPUESTO]` (RNF-3)
- **DADO** que pongo, cambio o quito la fecha de una tarea
- **CUANDO** guardo
- **ENTONCES** en menos de 1 segundo la lista refleja el resultado, incluida la marca de vencida si cambia.

**CA-28 · La fecha persiste** — `PRD` (RF-18)
- **DADO** que he puesto, cambiado o quitado la fecha de una tarea
- **CUANDO** cierro FlowSync y lo vuelvo a abrir
- **ENTONCES** la tarea tiene la fecha que guardé, o sigue sin ella.

**CA-29 · Ver el cambio de fecha de otra persona** — `PRD` (RF-26, RNF-5)
- **DADO** que tengo la lista visible
- **CUANDO** otra persona pone, cambia o quita la fecha de una tarea, y con ello cambia si está vencida o no
- **ENTONCES** la marca de vencida se actualiza en mi lista en 10 segundos como máximo, sin recargar y sin avisos, sonidos ni contadores.

**CA-30 · Dos personas cambian la fecha a la vez** — `PRD [SUPUESTO]` (RNF-2)
- **DADO** que dos personas cambian la fecha de la misma tarea casi a la vez
- **CUANDO** ambas guardan
- **ENTONCES** queda la fecha del último cambio guardado, y las dos ven ese resultado en 10 segundos como máximo.

**CA-31 · Otra persona cambia la fecha mientras la edito** — `PRD` (RF-27)
- **DADO** que estoy editando la fecha de una tarea
- **CUANDO** otra persona cambia esa tarea antes de que yo guarde
- **ENTONCES** no pierdo lo que estaba escribiendo. Al guardar se aplica CA-30.

### Forma de presentar y usar la fecha

**CA-32 · Formato español** — **`PROPUESTO`** (se deduce de RNF-8)
- **DADO** una tarea con fecha
- **CUANDO** veo o edito la fecha
- **ENTONCES** se presenta en orden día, mes y año, de forma que 03/04 se entienda siempre como 3 de abril.

**CA-33 · Todo con teclado** — `PRD [SUPUESTO]` (RNF-10)
- **DADO** que solo uso el teclado
- **CUANDO** pongo, cambio o quito la fecha de una tarea
- **ENTONCES** lo puedo hacer entero sin ratón.
