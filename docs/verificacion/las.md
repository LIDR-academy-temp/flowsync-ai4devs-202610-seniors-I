# Verificación · «Lo que cada tarea muestra de su responsable»

- **Scenarios del requisito:** 3
- **Cubiertos:** 1 (los otros 2, «No lo sé»)

| Scenario | Test que lo cubre | Estado | Qué te faltó |
|---|---|---|---|
| Al obtener una tarea cuyo responsable es "Ada Lovelace", su `assignee` trae ese nombre y sus iniciales | Tasks &#124; responsable › «el responsable llega con su nombre y sus iniciales» | No lo sé | Con dos cuentas de igual nombre no «bastan para saber quién la lleva»; ningún test lo puede afirmar |
| Al obtener cualquier tarea, suelta o en la lista, su `assignee` no incluye el email ni otros datos de acceso | Tasks &#124; responsable sin datos de acceso › «POST /tasks…», «GET /tasks…», «GET /tasks/:id…», «PATCH /tasks/:id/status…», «PUT /tasks/:id/due-date…» (`… solo expone el id, el nombre y las iniciales del responsable`) | Cubierto | Nada; en rojo `POST /tasks`, `GET /tasks` y `PATCH /tasks/:id/status` |
| Si el responsable se registró sin nombre, su `fullName` llega nulo y sus iniciales siguen llegando | Tasks &#124; responsable › «un responsable sin nombre llega con el nombre nulo y sus iniciales» | No lo sé | La spec no fija el valor; hoy salen del email (`AE` para `anonima@example.com`) |

## Las tres líneas

| Escenarios que creías cubiertos | Escenarios realmente cubiertos |
|---------------------------------|--------------------------------|
| 50%                             | 33% (1 de 3)                   |

### Scenario en el que no supiste si faltaba un test o la regla en la spec

Responsable sin nombre: es un hueco de spec, porque no especifica si permite o prohíbe que las iniciales de un usuario sin nombre se extraigan de su email, y el test pasa sin mirar de dónde salen.


### Algo que el escenario no determinaba y tuviste que decidir al escribir el test

- Datos de acceso: el escenario no concretaba qué se consideraban datos de acceso, y a la hora de escribir el test decidí especificar que los datos de acceso eran todos aquellos datos que NO fueran `id`, `fullName` o `initials`, para ser lo más estricto posible a la hora de mostrar los datos relacionados con las tareas.
