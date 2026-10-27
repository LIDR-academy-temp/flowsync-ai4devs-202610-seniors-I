# Tickets de FS-118 — Fecha de vencimiento y tareas vencidas

Historia y criterios: [us-fechas-vencimiento.md](us-fechas-vencimiento.md). Traza y preguntas abiertas: [fs-118-fecha-vencimiento.md](../../prd/fs-118-fecha-vencimiento.md).

Reglas de esta descomposición:

- **Un ticket es lo que una persona termina en una sesión** (media jornada como máximo).
- **El ticket hereda criterios, no los crea.** «Hereda» lista los CA-nn de la historia que el ticket tiene que hacer cumplir en su capa. Su Definition of Done dice *cómo* se entrega, no *qué* hace.
- **El ticket nombra la capa, no la diseña.** Cómo se guarda la fecha, cómo se llama la ruta, qué devuelve al fallar o dónde se calcula cada cosa lo decide quien lo implementa, dentro de lo que piden los criterios heredados.
- No hay tickets de tipo **Bug**: la historia es nueva y no hay nada que corregir.

## Resumen

| Ticket | Título | Tipo | Bloqueado por |
|---|---|---|---|
| FS-118.1 | Guardar la fecha de vencimiento de una tarea | Migración/DB | HU-E2-01 |
| FS-118.2 | La fecha de vencimiento en el modelo y en la respuesta de la tarea | Modelo/Dominio | FS-118.1 |
| FS-118.3 | Aceptar y validar la fecha al crear una tarea | Endpoint/API | FS-118.2, HU-E2-01 |
| FS-118.4 | Poner, cambiar y quitar la fecha al editar una tarea | Endpoint/API | FS-118.3 |
| FS-118.5 | Regla de tarea vencida | Modelo/Dominio | — |
| FS-118.6 | Poner la fecha al crear una tarea | Frontend | FS-118.3, HU-E2-01 |
| FS-118.7 | Poner, cambiar y quitar la fecha al editar una tarea | Frontend | FS-118.4, FS-118.6 |
| FS-118.8 | Marca de vencida en la lista | Frontend | FS-118.2, FS-118.5, lista del equipo (E3) |
| FS-118.9 | La marca se pone al día al cambiar de día | Frontend | FS-118.8 |
| FS-118.10 | Pruebas de husos horarios | Test | FS-118.4, FS-118.7, FS-118.9, PA-13 |
| FS-118.11 | Pruebas con dos personas cambiando la fecha | Test | FS-118.4, FS-118.7, FS-118.8 |

Orden posible: FS-118.5 puede empezar ya, en paralelo con la cadena de backend (FS-118.1 → .2 → .3 → .4).

## Definition of Done por tipo

Cada ticket cumple la DoD de su tipo y, si la tiene, la parte «Además» de su ficha.

### Migración/DB

- [ ] La migración se aplica y se revierte (`node ace migration:run` / `migration:rollback`) sobre una BD que ya tiene tareas, sin perder ninguna.
- [ ] `database/schema.ts` lo ha regenerado la migración, no se ha editado a mano, y el diff va en el mismo commit.
- [ ] Reglas de generación nuevas, si hacen falta, en `database/schema_rules.ts`.
- [ ] `npm run lint` y `npm run typecheck` pasan en `backend/`.

### Modelo/Dominio

- [ ] La lógica vive en la capa que nombra el ticket, sin depender de la interfaz ni de la red.
- [ ] Tests unitarios que cubren cada criterio heredado, con la fecha actual y el huso horario fijados por el propio test, no por la máquina donde corre.
- [ ] En el backend: el modelo no declara columnas (extiende la clase generada) y lo que sale hacia fuera pasa por un transformer de `app/transformers/`.
- [ ] Lint, typecheck y formato pasan en el proyecto que toca (`backend/`: `lint`, `typecheck`, `format`; `frontend/`: `build`, `lint`, Prettier).

### Endpoint/API

- [ ] Tests functional (Japa, `tests/functional/`) que cubren cada criterio heredado, con al menos un caso aceptado y uno rechazado por criterio de validación.
- [ ] Los tests aíslan la BD con los hooks de `testUtils.db()`: no dejan datos en `tmp/db.sqlite3` ni dependen del orden en que corren.
- [ ] Validación en `app/validators/` con builders de campo compartidos entre crear y editar, no reglas repetidas.
- [ ] La respuesta sale por `serialize()` con un transformer; nunca el modelo crudo.
- [ ] Los errores de validación salen en el formato de VineJS que `frontend/src/lib/api.ts` ya traduce a `fieldErrors`, sin un formato propio.
- [ ] La ruta va dentro del grupo protegido por `middleware.auth()`.
- [ ] Imports por subpath (`#validators/*`, `#transformers/*`…), no rutas relativas.
- [ ] Si cambian rutas o controladores, `.adonisjs/` regenerado y commiteado.
- [ ] `npm test`, `npm run lint` y `npm run typecheck` pasan en `backend/`.

### Frontend

- [ ] Toda llamada nueva a la API está en `src/lib/api.ts`; los componentes reciben `ApiError` y muestran su `message` y sus `fieldErrors`, no textos propios del error de red o de validación.
- [ ] Componentes de shadcn/ui traídos con `npx shadcn@latest add`, sin editarlos a mano; los colores salen de los tokens de `src/index.css`.
- [ ] Todo texto visible está en castellano.
- [ ] Cada criterio heredado se ha comprobado en el navegador contra el backend real, incluido el recorrido solo con teclado.
- [ ] Tests automáticos de los criterios heredados (RNF-11). Ver la dependencia común de frontend más abajo.
- [ ] `npm run build` y `npm run lint` pasan en `frontend/`, y Prettier se ha aplicado.

### Test

- [ ] El título de cada test nombra el CA-nn que verifica.
- [ ] Deterministas: la fecha actual y el huso horario los fija el test.
- [ ] Aislados: no dependen de la BD de desarrollo ni del orden de ejecución.
- [ ] Cada test se ha visto fallar al romper a propósito lo que verifica, antes de verlo pasar.
- [ ] Corren con el comando de tests del proyecto (`npm test` en `backend/`, o el que exista en `frontend/`), sin pasos manuales.

## Dependencia común de frontend

`frontend/` **no tiene runner de tests**. Sin él, la casilla de tests automáticos de la DoD de Frontend no se puede cumplir en FS-118.5 (si la regla vive en el frontend) y FS-118.6 a FS-118.11. Instalarlo es trabajo transversal del proyecto, no de esta historia, así que no lleva número FS-118.x, pero **bloquea cerrar esos tickets**.

## Tickets

### FS-118.1 · Guardar la fecha de vencimiento de una tarea

- **Tipo:** Migración/DB
- **Capa:** migración sobre la tabla de tareas y `database/schema.ts` regenerado.
- **Hereda:** CA-01, CA-02, CA-25, CA-28.
- **Dependencias:** HU-E2-01 (crea la tabla de tareas).
- **DoD:** la de Migración/DB.

### FS-118.2 · La fecha de vencimiento en el modelo y en la respuesta de la tarea

- **Tipo:** Modelo/Dominio
- **Capa:** modelo de tarea (backend) y su transformer.
- **Hereda:** CA-13, CA-25, CA-28.
- **Dependencias:** FS-118.1.
- **DoD:** la de Modelo/Dominio. Además:
  - [ ] Un test que lee una tarea con el proceso en un huso distinto de UTC y obtiene el mismo día que se guardó (CA-25).

### FS-118.3 · Aceptar y validar la fecha al crear una tarea

- **Tipo:** Endpoint/API
- **Capa:** validador y endpoint de creación de tareas.
- **Hereda:** CA-01, CA-02, CA-03, CA-04, CA-05, CA-06, CA-28.
- **Dependencias:** FS-118.2; HU-E2-01 (endpoint de creación).
- **Afectado por:** pregunta abierta 2 de la traza (rango de fechas). No bloquea: mientras no se decida, no se limita el rango.
- **DoD:** la de Endpoint/API.

### FS-118.4 · Poner, cambiar y quitar la fecha al editar una tarea

- **Tipo:** Endpoint/API
- **Capa:** endpoint de edición de tareas, con la validación de fecha de FS-118.3.
- **Hereda:** CA-04, CA-05, CA-06, CA-09, CA-10, CA-12, CA-14, CA-15, CA-16, CA-17, CA-28, CA-30.
- **Dependencias:** FS-118.3 (validación de fecha compartida). Si HU-E2-08 o HU-E2-09 llegan antes, este ticket amplía su endpoint de edición; si no, lo crea, limitado a la fecha.
- **Afectado por:** PA-3.3 (pregunta abierta 3 de la traza). No bloquea CA-30, que solo habla de dos cambios de fecha.
- **DoD:** la de Endpoint/API. Además:
  - [ ] Test de que cualquier persona autenticada puede editar la fecha de una tarea que no creó ni tiene asignada (CA-10).

### FS-118.5 · Regla de tarea vencida

- **Tipo:** Modelo/Dominio
- **Capa:** dominio: la regla que, dada una tarea y el día de hoy de quien mira, dice si está vencida.
- **Hereda:** CA-02, CA-03, CA-11, CA-12, CA-17, CA-18, CA-19, CA-20, CA-21, CA-26.
- **Dependencias:** ninguna dentro de la historia. Si vive en el frontend, la dependencia común de frontend para sus tests.
- **DoD:** la de Modelo/Dominio.

### FS-118.6 · Poner la fecha al crear una tarea

- **Tipo:** Frontend
- **Capa:** formulario de creación de tareas y `src/lib/api.ts`.
- **Hereda:** CA-01, CA-02, CA-03, CA-04, CA-05, CA-06, CA-07, CA-08, CA-27, CA-32, CA-33.
- **Dependencias:** FS-118.3; HU-E2-01 (formulario de creación); dependencia común de frontend.
- **DoD:** la de Frontend. Además:
  - [ ] El campo de fecha queda como pieza reutilizable para FS-118.7, no metido dentro del formulario de creación.

### FS-118.7 · Poner, cambiar y quitar la fecha al editar una tarea

- **Tipo:** Frontend
- **Capa:** edición de tarea y `src/lib/api.ts`.
- **Hereda:** CA-04, CA-05, CA-06, CA-07, CA-08, CA-09, CA-10, CA-11, CA-12, CA-13, CA-14, CA-15, CA-17, CA-25, CA-27, CA-28, CA-31, CA-32, CA-33.
- **Dependencias:** FS-118.4; FS-118.6 (campo de fecha); dependencia común de frontend. Si HU-E2-08 o HU-E2-09 llegan antes, este ticket amplía su edición; si no, la crea, limitada a la fecha.
- **DoD:** la de Frontend.

### FS-118.8 · Marca de vencida en la lista

- **Tipo:** Frontend
- **Capa:** lista del equipo.
- **Hereda:** CA-02, CA-03, CA-11, CA-12, CA-16, CA-17, CA-18, CA-19, CA-20, CA-21, CA-23, CA-26, CA-27, CA-29.
- **Dependencias:**
  - FS-118.2 (la lista recibe la fecha) y FS-118.5 (la regla).
  - Lista del equipo (RF-19, E3).
  - Cambios ajenos en ≤10 s (RF-26, E3), para CA-29.
  - HU-E2-04 a HU-E2-07 (cambio de estado), para CA-20 y CA-21.
  - Dependencia común de frontend.
- **Afectado por:** pregunta abierta 1 de la traza (¿se ve la fecha en la lista?). No bloquea: mientras no se decida, la lista solo muestra la marca.
- **DoD:** la de Frontend.

### FS-118.9 · La marca se pone al día al cambiar de día

- **Tipo:** Frontend
- **Capa:** lista del equipo.
- **Hereda:** CA-22, CA-24.
- **Dependencias:** FS-118.8; dependencia común de frontend.
- **DoD:** la de Frontend. Además:
  - [ ] Comprobado con la pestaña visible y con la pestaña oculta a medianoche.

### FS-118.10 · Pruebas de husos horarios

- **Tipo:** Test
- **Capa:** pruebas de extremo a extremo (backend y lista).
- **Hereda:** CA-22, CA-25, CA-26.
- **Dependencias:** FS-118.4, FS-118.7 y FS-118.9; dependencia común de frontend. **Bloqueado por PA-13**: hasta que se decida con qué husos se prueba, no se puede cerrar.
- **DoD:** la de Test.

### FS-118.11 · Pruebas con dos personas cambiando la fecha

- **Tipo:** Test
- **Capa:** pruebas de extremo a extremo con dos sesiones a la vez.
- **Hereda:** CA-29, CA-30, CA-31.
- **Dependencias:** FS-118.4, FS-118.7 y FS-118.8; dependencia común de frontend.
- **DoD:** la de Test.

## Cobertura de criterios

Cada CA de la historia lo hereda al menos un ticket.

| CA | Tickets |
|---|---|
| CA-01 | .1, .3, .6 |
| CA-02 | .1, .3, .5, .6, .8 |
| CA-03 | .3, .5, .6, .8 |
| CA-04 | .3, .4, .6, .7 |
| CA-05 | .3, .4, .6, .7 |
| CA-06 | .3, .4, .6, .7 |
| CA-07 | .6, .7 |
| CA-08 | .6, .7 |
| CA-09 | .4, .7 |
| CA-10 | .4, .7 |
| CA-11 | .5, .7, .8 |
| CA-12 | .4, .5, .7, .8 |
| CA-13 | .2, .7 |
| CA-14 | .4, .7 |
| CA-15 | .4, .7 |
| CA-16 | .4, .8 |
| CA-17 | .4, .5, .7, .8 |
| CA-18 | .5, .8 |
| CA-19 | .5, .8 |
| CA-20 | .5, .8 |
| CA-21 | .5, .8 |
| CA-22 | .9, .10 |
| CA-23 | .8 |
| CA-24 | .9 |
| CA-25 | .1, .2, .7, .10 |
| CA-26 | .5, .8, .10 |
| CA-27 | .6, .7, .8 |
| CA-28 | .1, .2, .3, .4, .7 |
| CA-29 | .8, .11 |
| CA-30 | .4, .11 |
| CA-31 | .7, .11 |
| CA-32 | .6, .7 |
| CA-33 | .6, .7 |
