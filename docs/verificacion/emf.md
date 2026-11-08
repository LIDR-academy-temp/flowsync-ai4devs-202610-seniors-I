# Verificación: lo que cada tarea muestra de su responsable

- Total de scenarios del requisito: 3
- Scenarios cubiertos: 2

## Matriz de trazabilidad

| Scenario: qué se espera y en qué situación | Prueba que lo cubre: nombre exacto | Estado: Cubierto / No cubierto / No lo sé | Si «No lo sé», qué falta para decidir |
| --- | --- | --- | --- |
| Responsable identificable: al obtener una tarea de «Ada Lovelace», su `assignee` trae ese nombre y sus iniciales. | `el responsable se identifica por su nombre y sus iniciales` | Cubierto | |
| La tarea no filtra datos de cuenta: al obtener una tarea, suelta o en la lista, su `assignee` no incluye email ni datos de acceso. | `el responsable no expone su email ni datos de acceso` | No lo sé | El test comprueba email, password y el valor del correo, pero la spec no enumera qué otros datos de acceso deben excluirse. |
| Responsable sin nombre: si el responsable se registró sin nombre, su `assignee` trae nombre nulo y sigue trayendo iniciales. | `un responsable sin nombre llega con nombre nulo y con iniciales` | Cubierto | |

## Reflexión

1. No registré una estimación antes de revisar los tests. Antes de añadir los nuevos, ninguno de los 3 scenarios estaba cubierto.
2. Dudé si era un hueco de test o de spec en «La tarea no filtra datos de cuenta», porque faltaba una prueba, pero «ningún otro dato de acceso» tampoco concretaba todos los campos que debían excluirse.
3. Al escribir los tests tuve que decidir comprobar tanto la tarea individual como el listado, porque los scenarios 1 y 3 no especificaban por qué vía obtenerla.