# Matriz de trazabilidad

Requisito: **Lo que cada tarea muestra de su responsable** (`openspec/specs/tasks/spec.md`).

El sistema debe acompañar cada tarea del nombre y las iniciales de su responsable, lo justo para identificarlo en la lista, y no debe exponer junto a la tarea ningún otro dato de esa cuenta, en particular su email.

Cobertura: `cubierto` o `no cubierto`. `node ace test --files=assignee`: 2 correctas y 1 fallida. Los tres scenarios tienen prueba.

| Scenario                           | Prueba                                                                                                                                         | Cobertura | Observación                                        |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | --------- | -------------------------------------------------- |
| Responsable identificable          | Tasks / responsable › «el responsable se identifica por su nombre y sus iniciales» (`backend/tests/functional/tasks/assignee.spec.ts`)         | cubierto  |                                                    |
| La tarea no filtra datos de cuenta | Tasks / responsable › «la tarea no filtra el email ni otros datos de acceso» (`backend/tests/functional/tasks/assignee.spec.ts`)               | cubierto  | Incluye el email.                                  |
| Responsable sin nombre             | Tasks / responsable › «un responsable sin nombre llega con el nombre nulo y con iniciales» (`backend/tests/functional/tasks/assignee.spec.ts`) | No lo sé  | En la definicion de los requisitos existe un vacio |

1. Creía cubiertos los 3 scenarios  y no estaba cubierto ninguno.
2. En «Responsable sin nombre» la spec dice que las iniciales llegan, pero no cuáles: el `SE` del test lo puse yo, no está escrito.
3. El scenario 3 no dice qué hacer si el nombre viene vacío y no nulo, y el test decidió mandar `null, este scenario es inconsistente`.
