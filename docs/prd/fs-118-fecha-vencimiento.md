# FS-118 — Fecha de vencimiento y tareas vencidas

Fecha: 2026-10-27. Fuente: [flowsync-mvp.md](flowsync-mvp.md) y [alcance-mvp.md](alcance-mvp.md); listado en [historias-e2.md](historias-e2.md).

## Historia

> Como persona del equipo, quiero poner, cambiar o quitar la fecha de vencimiento de una tarea y ver en la lista cuáles se han pasado de plazo, para saber de un vistazo qué está vencido sin preguntar a nadie.

Por decisión del equipo, consolida en una sola historia tres que estaban separadas: HU-E2-03 (poner la fecha al crear), HU-E2-10 (cambiarla) y HU-E2-11 (quitarla). Incluye también la parte de E3 que toca a la fecha: la marca de vencida y ver los cambios de fecha de otras personas.

- **Cubre:**
  - E2: RF-9 (fecha opcional), RF-12, RF-14 (fecha) y RF-18.
  - E3: RF-19 (marca de vencida), RF-21, RF-23, RF-24, RF-25, RF-26 y RF-27, aplicados a la fecha.
  - No funcionales: RNF-1, RNF-2, RNF-3, RNF-5, RNF-8 y RNF-10, en lo que toca a la fecha.
  - RF-15 solo por CA-20 y CA-21.
  - Sirve a J4.
- **Depende de:**
  - HU-E2-01 (crear una tarea).
  - La lista del equipo (RF-19).
  - HU-E2-04 a HU-E2-07 (cambiar el estado), para CA-20 y CA-21.
- **Puntos abiertos del PRD que la afectan:** PA-3.3 y PA-13.

## Criterios de aceptación

Viven en [us-fechas-vencimiento.md](../backlog/E2-gestion-tareas/us-fechas-vencimiento.md). Los CA-nn que se citan aquí remiten a ese fichero.

## Preguntas abiertas

No son criterios; hay que decidirlas antes de cerrar la historia.

1. **¿Se ve la fecha en la lista?**
   - RF-19 y alcance §4.3 dicen que la lista muestra título, responsable, estado y la marca de vencida, pero no la fecha.
   - Sin ella, se sabe *que* una tarea está vencida, pero no desde cuándo, ni cuándo vence una que aún no lo está. La fecha solo se ve al editar (CA-13).
   - No se propone como criterio porque ampliaría lo que el alcance dice que muestra la lista.
2. **¿Hay un rango de fechas admitido?** Por ejemplo, rechazar el año 1900 o el 3000.
   - RF-12 admite fechas pasadas sin límite, así que un rango lo restringiría.
   - No se propone como criterio hasta que se decida.
3. **PA-3.3 (RNF-2).** Si los conflictos se resuelven por tarea entera, cambiar el título de una tarea a la vez que otra persona le cambia la fecha puede deshacer la fecha. CA-30 solo cubre dos cambios de fecha.
4. **PA-13.** Con qué husos horarios se prueban CA-22, CA-25 y CA-26.
   - Entre husos muy extremos (UTC-12 y UTC+14), «hoy» puede diferir más de un día, más de lo que RF-25 da por aceptado.
   - El equipo de referencia está en tres husos, que no se han especificado.

## Fuera de esta historia

No se proponen como criterios:

- **Hora o zona horaria en el vencimiento.** El alcance §5 la excluye.
- **Notificar el vencimiento.** El alcance §5 excluye las notificaciones.
- **Marca de «vence hoy» o «vence pronto».** El alcance §4.7 solo pide marcar las tareas vencidas.
- **Ordenar o filtrar por fecha.** El alcance solo pide filtrar por estado (§4.6), y el orden es por fecha de creación (RF-21).
