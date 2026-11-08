# Matriz de trazabilidad · «Lo que cada tarea muestra de su responsable»

Requisito de `openspec/specs/tasks/spec.md` (líneas 97–114).

`Scenarios en el requisito: 3 · Cubiertos: 0`

| Scenario                                                                                                                                 | Test que lo cubre | Estado      | Qué faltó para decidirlo |
| ---------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ----------- | ------------------------ |
| Responsable identificable: al obtener una tarea de "Ada Lovelace", su `assignee` trae ese nombre y sus iniciales                         |                   | No cubierto |                          |
| La tarea no filtra datos de cuenta: al obtener cualquier tarea, suelta o en la lista, su `assignee` no trae email ni otro dato de acceso |                   | No cubierto |                          |
| Responsable sin nombre: si el responsable se registró sin nombre, su nombre llega nulo y sus iniciales siguen llegando                   |                   | No cubierto |                          |

## Las tres líneas

1. Creía cubiertos 0 de 3 antes de mirar; lo estaban 0.
2. Responsable sin nombre: no supe si es un hueco de test o de spec, porque el scenario pide iniciales "sin recurrir a su email" y la spec de auth las deriva del email cuando no hay nombre, así que mi test solo comprueba que llegan, no de dónde salen, y lo que falta puede ser una regla que ninguna de las dos specs decide.
3. Decidí que `assignee` trae exactamente `fullName` e `initials` y nada más, ni siquiera el `id`: la spec dice "ningún otro dato de esa cuenta" pero el scenario solo nombra el email y "datos de acceso", así que si mañana quitan el email el test seguirá en rojo por el `id`.
