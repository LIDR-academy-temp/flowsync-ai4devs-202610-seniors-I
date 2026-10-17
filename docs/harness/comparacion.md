# Comparación con y sin harness

Encargo: «Implementar login en el frontend» (SCRUM-5). Plan mode, sin aplicar.
Lanzado 13:58 en ambas. Mismo modelo: Sonnet 5.

| | Con harness | Sin harness |
|---|---|---|
| Archivos que propone tocar | ~19 (4 componentes ui) | ~20 (5 componentes ui, .env.example, borra App.css) |
| Convenciones respetadas / no | No toca backend; cita lint, format y build; señala 6 decisiones abiertas. No verificó el error en vivo (Node del sandbox). | No toca backend; cita lint y build, no format. Leyó el error en node_modules (422 / 400). No había nada escrito. |
| Intervenciones | 1: 13:58 asigné SCRUM-5 a mi usuario en Jira (estaba sin asignar) | 1: la misma, el ticket era el mismo |
| Qué arreglaría a mano | (en blanco: no lo revisé a tiempo) | (en blanco: no lo revisé a tiempo) |

Diferencia de fondo: con harness añade fullName y un campo de confirmación en el signup; sin harness no añade campos y envía passwordConfirmation = password en silencio.

Limitación del montaje: la copia pelada también llegó a mi Jira y trajo SCRUM-5, así que el