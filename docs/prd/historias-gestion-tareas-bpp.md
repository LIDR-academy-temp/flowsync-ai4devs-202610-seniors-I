# Épica: Gestión de tareas. Historias de usuario

Cuelga de [alcance-mvp-bpp.md](alcance-mvp-bpp.md). Todavía no lleva criterios de aceptación.

Hay un único rol, **miembro del equipo**, porque los roles son planos y todos ven y editan lo mismo. Cada historia indica el punto del alcance del PRD que cubre.

## Dentro del alcance MVP

- **HU-01.** Como miembro del equipo, quiero ver en una lista todas las tareas del espacio compartido, con su título, responsable, estado y fecha, para saber quién está con qué sin preguntar. *(Alcance 4)*
- **HU-02.** Como miembro del equipo, quiero crear una tarea escribiendo solo su título para apuntar trabajo en segundos, sin rellenar campos. *(Alcance 1)*
- **HU-03.** Como miembro del equipo, quiero poner, cambiar o quitar la fecha de vencimiento de una tarea para que el equipo sepa cuándo tiene que estar. *(Alcance 1)*
- **HU-04.** Como miembro del equipo, quiero asignarme una tarea libre para que el resto sepa que es mía y nadie más la empiece. *(Alcance 2)*
- **HU-05.** Como miembro del equipo, quiero asignar o reasignar una tarea a otra persona para repartir el trabajo sin avisar por chat. *(Alcance 2)*
- **HU-06.** Como miembro del equipo, quiero dejar una tarea sin responsable para devolverla a lo libre cuando no la voy a hacer. *(Alcance 2)*
- **HU-07.** Como miembro del equipo, quiero cambiar el estado de una tarea desde la lista en dos clics para mantenerla al día sin esfuerzo. *(Alcance 3)*
- **HU-08.** Como miembro del equipo, quiero distinguir de un vistazo las tareas libres, es decir, sin responsable y sin terminar, para elegir lo siguiente sin pisar a nadie. *(Alcance 4)*
- **HU-09.** Como miembro del equipo, quiero ver destacadas las tareas que se han pasado de fecha para detectar retrasos sin revisar las fechas una por una. *(Alcance 5)*
- **HU-10.** Como miembro del equipo, quiero filtrar la lista por estado para centrarme en lo pendiente. *(Alcance 6)*
- **HU-11.** Como miembro del equipo, quiero que la lista muestre primero lo último que ha cambiado para ver qué se ha movido cuando vuelvo. *(Alcance 7)*
- **HU-12.** Como miembro del equipo, quiero ver los cambios de los demás sin recargar la página para no coger una tarea que otra persona acaba de tomar. *(Alcance 7)*
- **HU-13.** Como miembro del equipo, quiero editar el título de una tarea para corregir errores o aclarar de qué va. *(Alcance 8)*
- **HU-14.** Como miembro del equipo, quiero borrar una tarea para quitar de la lista lo que se creó por error o ya no aplica. *(Alcance 8)*

«Ver qué tiene cada persona en curso» (alcance 4) no tiene historia propia: lo cubren HU-01, que muestra el responsable y el estado, y HU-10, que permite filtrar por *En curso*.

## Fuera del alcance MVP

Son historias que salen de forma natural al descomponer la épica. Se dejan aquí marcadas para que no se cuelen.

- **Como miembro del equipo, quiero comentar en una tarea** para discutirla en su sitio. **Fuera del alcance MVP:** NO-alcance, comentarios en tareas.
- **Como miembro del equipo, quiero recibir un aviso cuando me asignan una tarea** para enterarme al momento. **Fuera del alcance MVP:** NO-alcance, notificaciones push. La señal es un resumen que espera.
- **Como miembro del equipo, quiero asignar una tarea a varias personas** para reflejar el trabajo en pareja. **Fuera del alcance MVP:** NO-alcance, varios responsables.
- **Como miembro del equipo, quiero ver las novedades desde mi última visita** para no repasar la lista entera. **Fuera del alcance MVP:** NO-alcance. Entra si la demo de S5 muestra que el orden por cambio reciente (HU-11) no basta.
- **Como miembro del equipo, quiero ver quién está conectado ahora** para saber a quién preguntar. **Fuera del alcance MVP:** NO-alcance, presencia. Se rechaza a propósito.
- **Como miembro del equipo, quiero crear mis propios estados** para adaptar el flujo al equipo. **Fuera del alcance MVP:** NO-alcance, estados configurables.
- **Como miembro del equipo, quiero ordenar las tareas a mano por prioridad** para marcar qué va primero. **Fuera del alcance MVP:** NO-alcance, backlog priorizado.
- **Como miembro del equipo, quiero separar las tareas por equipo** para no mezclar trabajo ajeno. **Fuera del alcance MVP:** NO-alcance, varios equipos o espacios (S3).
