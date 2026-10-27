# Tickets de FS-118 — Fecha de vencimiento y tareas vencidas

Historia y criterios: [us-fechas-vencimiento.md](us-fechas-vencimiento.md). Traza y preguntas abiertas: [fs-118-fecha-vencimiento.md](../../prd/fs-118-fecha-vencimiento.md).

Reglas de esta descomposición:

- **Un ticket es lo que una persona termina en una sesión** (media jornada como máximo).
- **El ticket hereda criterios, no los crea.** «Hereda» lista los CA-nn de la historia que el ticket hace cumplir en su capa. Cuando un CA tiene una parte que se guarda y otra que se ve en la lista, se indica cuál hereda: *(guardar)* o *(marca)*. La Definition of Done dice *cómo* se entrega, no *qué* hace.
- **El ticket nombra la capa, no la diseña.** Cómo se guarda la fecha, cómo se llama la ruta, qué devuelve al fallar, dónde se calcula la marca o cómo se refresca la lista lo decide quien lo implementa, dentro de lo que piden los criterios heredados.
- No hay tickets de tipo **Bug**: la historia es nueva y no hay nada que corregir.

## Resumen

| Ticket | Título | Tipo | Bloqueado por (FS-118) | Bloqueado por (fuera) |
|---|---|---|---|---|
| FS-118.1 | Guardar la fecha de vencimiento de una tarea | Migración/DB | — | HU-E2-01 |
| FS-118.2 | La fecha de vencimiento en el modelo y en la respuesta de la tarea | Modelo/Dominio | .1 | — |
| FS-118.3 | Aceptar y validar la fecha al crear una tarea | Endpoint/API | .2 | HU-E2-01 |
| FS-118.4 | Aceptar y validar la fecha al editar una tarea | Endpoint/API | .3 | HU-E2-08, HU-E2-09 |
| FS-118.5 | Regla de tarea vencida | Modelo/Dominio | — | HU-E2-01; runner de frontend si vive allí |
| FS-118.6 | Campo de fecha | Frontend | — | runner de frontend |
| FS-118.7 | Avisos de fecha no válida y de cambio no guardado | Frontend | .3, .6 | runner de frontend |
| FS-118.8 | Marca de vencida en la lista | Frontend | .2, .5 | lista del equipo (RF-19); runner de frontend |
| FS-118.9 | La marca se pone al día al cambiar de día | Frontend | .8 | runner de frontend |
| FS-118.10 | Poner la fecha al crear una tarea | Frontend | .3, .6, .7, .8 | HU-E2-01; runner de frontend |
| FS-118.11 | Ver la fecha al editar y no perder lo escrito | Frontend | .4, .6 | HU-E2-08, HU-E2-09; RF-26/RF-27 (E3); runner de frontend |
| FS-118.12 | Cambiar y quitar la fecha al editar | Frontend | .4, .7, .8, .11 | runner de frontend |
| FS-118.13 | La fecha y la marca frente a los otros cambios de la tarea | Test | .4, .8, .12 | HU-E2-04 a HU-E2-09; runner de frontend |
| FS-118.14 | Pruebas de husos horarios | Test | .4, .9, .11 | PA-13; e2e |
| FS-118.15 | Pruebas con dos personas cambiando la fecha | Test | .4, .8, .12 | RF-26/RF-27 (E3); e2e |

## Bloqueos de fuera de la historia

| Bloqueo | Qué es | Bloquea |
|---|---|---|
| HU-E2-01 | Crear una tarea: trae la tarea, su estado y su creación. | .1, .3, .5, .10 |
| HU-E2-08, HU-E2-09 | Editar el responsable y el título: traen la edición de una tarea. | .4, .11, .13 |
| HU-E2-04 a HU-E2-07 | Cambiar el estado de una tarea. | .13 |
| Lista del equipo (RF-19, E3) | La lista donde se ve la marca. | .8 |
| Cambios ajenos (RF-26, RF-27, E3) | Ver en ≤10 s lo que cambian otras personas y no perder lo que se escribe. | .11, .15 |
| **Runner de tests de frontend** | `frontend/` no tiene ninguno. **Aún no hay ticket**: es trabajo transversal del proyecto y hay que crearlo antes de poder cerrar los tickets que bloquea. | .5 si vive en el frontend, .6 a .13 |
| **Pruebas e2e con navegador** | Automatización con dos sesiones a la vez. El backend solo declara las suites `unit` y `functional`. **Aún no hay ticket**, igual que el anterior. | .14, .15 |
| PA-13 | Con qué husos horarios se prueba. | .14 |

## Definition of Done por tipo

Cada ticket cumple la DoD de su tipo.

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
- [ ] Probado que una petición sin autenticar se rechaza.
- [ ] Los tests aíslan la BD con los hooks de `testUtils.db()`: no dejan datos en `tmp/db.sqlite3` ni dependen del orden en que corren.
- [ ] Validación en `app/validators/` con builders de campo compartidos entre crear y editar, no reglas repetidas.
- [ ] La respuesta sale por `serialize()` con un transformer; nunca el modelo crudo.
- [ ] Los errores de validación salen en el formato de VineJS, sin un formato propio.
- [ ] Imports por subpath (`#validators/*`, `#transformers/*`…), no rutas relativas.
- [ ] Si cambian rutas o controladores, `.adonisjs/` regenerado y commiteado.
- [ ] `npm test`, `npm run lint` y `npm run typecheck` pasan en `backend/`.

### Frontend

- [ ] Toda llamada nueva a la API está en `src/lib/api.ts`, y sus errores llegan a los componentes como `ApiError`.
- [ ] Componentes de shadcn/ui traídos con `npx shadcn@latest add`, sin editarlos a mano; los colores salen de los tokens de `src/index.css`.
- [ ] Todo texto visible está en castellano.
- [ ] Cada criterio heredado se ha comprobado en el navegador contra el backend real.
- [ ] Tests automáticos de los criterios heredados (RNF-11), con la fecha actual y el huso horario fijados por el test.
- [ ] `npm run build` y `npm run lint` pasan en `frontend/`, y Prettier se ha aplicado.

### Test

- [ ] El título de cada test nombra el CA-nn que verifica.
- [ ] Deterministas: la fecha actual y el huso horario los fija el test.
- [ ] Aislados: no dependen de la BD de desarrollo ni del orden de ejecución.
- [ ] Cada test se ha visto fallar al romper a propósito lo que verifica, antes de verlo pasar.
- [ ] Corren con el comando de tests de su proyecto, sin pasos manuales.

## Tickets

### FS-118.1 · Guardar la fecha de vencimiento de una tarea

- **Tipo:** Migración/DB
- **Capa:** migración sobre la tabla de tareas y `database/schema.ts` regenerado.
- **Hereda:** ninguno directamente. Hace posibles CA-01, CA-09 y CA-28, que verifican FS-118.3 y FS-118.4.
- **Dependencias:** HU-E2-01 (crea la tabla de tareas).

### FS-118.2 · La fecha de vencimiento en el modelo y en la respuesta de la tarea

- **Tipo:** Modelo/Dominio
- **Capa:** modelo de tarea (backend) y su transformer.
- **Hereda:** CA-13, CA-25.
- **Dependencias:** FS-118.1.

### FS-118.3 · Aceptar y validar la fecha al crear una tarea

- **Tipo:** Endpoint/API
- **Capa:** validador y endpoint de creación de tareas.
- **Hereda:** CA-01, CA-02 *(guardar)*, CA-03 *(guardar)*, CA-04, CA-05, CA-06, CA-25, CA-28.
- **Dependencias:** FS-118.2; HU-E2-01 (endpoint de creación).
- **Afectado por:** pregunta abierta 2 de la traza (rango de fechas). No bloquea: mientras no se decida, no se limita el rango.

### FS-118.4 · Aceptar y validar la fecha al editar una tarea

- **Tipo:** Endpoint/API
- **Capa:** validador y endpoint de edición de tareas.
- **Hereda:** CA-04, CA-05, CA-06, CA-09, CA-10, CA-11 *(guardar)*, CA-12 *(guardar)*, CA-14, CA-16, CA-17 *(guardar)*, CA-25, CA-28, CA-30.
- **Dependencias:** FS-118.3 (validación de fecha compartida); HU-E2-08 y HU-E2-09 (edición de tareas).
- **Afectado por:** PA-3.3 (pregunta abierta 3 de la traza). No bloquea CA-30, que solo habla de dos cambios de fecha.

### FS-118.5 · Regla de tarea vencida

- **Tipo:** Modelo/Dominio
- **Capa:** dominio: la regla que decide si una tarea está vencida.
- **Hereda:** CA-02 *(marca)*, CA-03 *(marca)*, CA-11 *(marca)*, CA-12 *(marca)*, CA-17 *(marca)*, CA-18, CA-19, CA-20, CA-21, CA-26.
- **Dependencias:** HU-E2-01 (la tarea y su estado). Si vive en el frontend, el runner de tests de frontend.

### FS-118.6 · Campo de fecha

- **Tipo:** Frontend
- **Capa:** campo de fecha de los formularios de tarea.
- **Hereda:** CA-32, CA-33.
- **Dependencias:** runner de tests de frontend.

### FS-118.7 · Avisos de fecha no válida y de cambio no guardado

- **Tipo:** Frontend
- **Capa:** traducción de errores en `src/lib/api.ts` y su presentación en el campo de fecha. Hoy `api.ts` solo traduce los errores de la autenticación: un error de fecha cae en un aviso genérico, y el de red no dice que el cambio no se ha guardado.
- **Hereda:** CA-04, CA-05, CA-06, CA-08.
- **Dependencias:** FS-118.3 (errores de fecha del backend); FS-118.6; runner de tests de frontend.

### FS-118.8 · Marca de vencida en la lista

- **Tipo:** Frontend
- **Capa:** lista del equipo.
- **Hereda:** CA-02 *(marca)*, CA-03 *(marca)*, CA-11 *(marca)*, CA-12 *(marca)*, CA-16, CA-17 *(marca)*, CA-18, CA-19, CA-23, CA-26.
- **Dependencias:** FS-118.2 y FS-118.5; lista del equipo (RF-19, E3); runner de tests de frontend.
- **Afectado por:** pregunta abierta 1 de la traza (¿se ve la fecha en la lista?). No bloquea: mientras no se decida, la lista solo muestra la marca.

### FS-118.9 · La marca se pone al día al cambiar de día

- **Tipo:** Frontend
- **Capa:** lista del equipo.
- **Hereda:** CA-22, CA-24.
- **Dependencias:** FS-118.8; runner de tests de frontend.

### FS-118.10 · Poner la fecha al crear una tarea

- **Tipo:** Frontend
- **Capa:** formulario de creación de tareas y `src/lib/api.ts`.
- **Hereda:** CA-01, CA-02 *(guardar)*, CA-03 *(guardar)*, CA-07, CA-08, CA-27, CA-28, CA-33.
- **Dependencias:** FS-118.3, FS-118.6, FS-118.7 y FS-118.8 (CA-27 pide ver el resultado en la lista); HU-E2-01 (formulario de creación); runner de tests de frontend.

### FS-118.11 · Ver la fecha al editar y no perder lo escrito

- **Tipo:** Frontend
- **Capa:** edición de tarea.
- **Hereda:** CA-07, CA-13, CA-25, CA-31, CA-32.
- **Dependencias:** FS-118.4 y FS-118.6; HU-E2-08 y HU-E2-09 (edición de tarea en la interfaz); RF-26 y RF-27 (E3), para CA-31; runner de tests de frontend.

### FS-118.12 · Cambiar y quitar la fecha al editar

- **Tipo:** Frontend
- **Capa:** edición de tarea y `src/lib/api.ts`.
- **Hereda:** CA-08, CA-09, CA-10, CA-11 *(guardar)*, CA-12 *(guardar)*, CA-14, CA-17 *(guardar)*, CA-27, CA-28, CA-33.
- **Dependencias:** FS-118.4, FS-118.7, FS-118.8 (CA-27) y FS-118.11; runner de tests de frontend.

### FS-118.13 · La fecha y la marca frente a los otros cambios de la tarea

- **Tipo:** Test
- **Capa:** pruebas de backend y de lista que cruzan la fecha con el título, el responsable y el estado.
- **Hereda:** CA-15, CA-20, CA-21.
- **Dependencias:** FS-118.4, FS-118.8 y FS-118.12; HU-E2-04 a HU-E2-09; runner de tests de frontend.

### FS-118.14 · Pruebas de husos horarios

- **Tipo:** Test
- **Capa:** pruebas de extremo a extremo (backend y lista).
- **Hereda:** CA-22, CA-25, CA-26.
- **Dependencias:** FS-118.4, FS-118.9 y FS-118.11; pruebas e2e con navegador. **Bloqueado por PA-13**: hasta que se decida con qué husos se prueba, no se puede cerrar.

### FS-118.15 · Pruebas con dos personas cambiando la fecha

- **Tipo:** Test
- **Capa:** pruebas de extremo a extremo con dos sesiones a la vez.
- **Hereda:** CA-29, CA-30, CA-31.
- **Dependencias:** FS-118.4, FS-118.8 y FS-118.12; RF-26 y RF-27 (E3); pruebas e2e con navegador.

## Cobertura de criterios

Cada CA de la historia lo hereda al menos un ticket.

| CA | Tickets |
|---|---|
| CA-01 | .3, .10 |
| CA-02 | .3, .5, .8, .10 |
| CA-03 | .3, .5, .8, .10 |
| CA-04 | .3, .4, .7 |
| CA-05 | .3, .4, .7 |
| CA-06 | .3, .4, .7 |
| CA-07 | .10, .11 |
| CA-08 | .7, .10, .12 |
| CA-09 | .4, .12 |
| CA-10 | .4, .12 |
| CA-11 | .4, .5, .8, .12 |
| CA-12 | .4, .5, .8, .12 |
| CA-13 | .2, .11 |
| CA-14 | .4, .12 |
| CA-15 | .13 |
| CA-16 | .4, .8 |
| CA-17 | .4, .5, .8, .12 |
| CA-18 | .5, .8 |
| CA-19 | .5, .8 |
| CA-20 | .5, .13 |
| CA-21 | .5, .13 |
| CA-22 | .9, .14 |
| CA-23 | .8 |
| CA-24 | .9 |
| CA-25 | .2, .3, .4, .11, .14 |
| CA-26 | .5, .8, .14 |
| CA-27 | .10, .12 |
| CA-28 | .3, .4, .10, .12 |
| CA-29 | .15 |
| CA-30 | .4, .15 |
| CA-31 | .11, .15 |
| CA-32 | .6, .11 |
| CA-33 | .6, .10, .12 |
