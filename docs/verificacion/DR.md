Escenarios en el requisito: 3 · Cubiertos: 0

| Escenario | Test que lo cubre | Estado | Qué faltó para decidir |
|---|---|---|---|
| Al obtener una tarea de "Ada Lovelace", su `assignee` trae ese nombre y sus iniciales | `Auth \| registro` › `registrarse devuelve la cuenta y un token que ya sirve` | No lo sé | Revisa las iniciales del usuario, no el `assignee` de la tarea |
| Al obtener una tarea, suelta o en la lista, su `assignee` no trae email ni datos de acceso | — | No cubierto | — |
| Si el responsable se registró sin nombre, el `assignee` trae nombre nulo y sigue trayendo iniciales | `Auth \| iniciales` › `sin nombre, las iniciales salen del email` | No lo sé | Revisa las iniciales del usuario, no el `assignee` de la tarea; tampoco mira el nombre nulo |


## Parte B

1. Antes de mirar creía cubiertos 2 de 3; estaban cubiertos 0.
2. Escenario 2: la spec dice "datos de cuenta" pero solo nombra el email; no supe si createdAt/updatedAt en el assignee son una fuga que falta probar o algo que la spec no prohíbe.
3. En el escenario 3 el test solo exige que las iniciales sean un texto no vacío; el escenario no dice cuáles deben ser, así que unas iniciales incorrectas también pasarían.
