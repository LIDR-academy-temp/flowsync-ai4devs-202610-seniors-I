# Épica: Gestión de tareas. Historias de usuario

Cuelga de [alcance-mvp-bpp.md](alcance-mvp-bpp.md). Todavía no lleva criterios de aceptación.

Hay un único rol, **miembro del equipo**, porque los roles son planos y todos ven y editan lo mismo. Cada historia indica el punto del alcance del PRD que cubre.

## Dentro del alcance MVP

- **HU-01.** Como miembro del equipo, quiero ver en una lista todas las tareas del espacio compartido, con su título, responsable, estado y fecha, para saber quién está con qué sin preguntar. *(Alcance 4)*
- **HU-02.** Como miembro del equipo, quiero crear una tarea escribiendo solo su título para apuntar trabajo en segundos, sin rellenar campos. *(Alcance 1)*
- **FS-118.** Como miembro del equipo, quiero poner, cambiar o quitar la fecha de vencimiento de una tarea y ver destacadas las que se han pasado de plazo, para que el equipo sepa cuándo tiene que estar cada una y detecte los retrasos de un vistazo. *(Alcance 1 y 5. Reúne las antiguas HU-03 y HU-09. Sus criterios están al final.)*
- **HU-04.** Como miembro del equipo, quiero asignarme una tarea libre para que el resto sepa que es mía y nadie más la empiece. *(Alcance 2)*
- **HU-05.** Como miembro del equipo, quiero asignar o reasignar una tarea a otra persona para repartir el trabajo sin avisar por chat. *(Alcance 2)*
- **HU-06.** Como miembro del equipo, quiero dejar una tarea sin responsable para devolverla a lo libre cuando no la voy a hacer. *(Alcance 2)*
- **HU-07.** Como miembro del equipo, quiero cambiar el estado de una tarea desde la lista en dos clics para mantenerla al día sin esfuerzo. *(Alcance 3)*
- **HU-08.** Como miembro del equipo, quiero distinguir de un vistazo las tareas libres, es decir, sin responsable y sin terminar, para elegir lo siguiente sin pisar a nadie. *(Alcance 4)*
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

## FS-118: criterios de aceptación

Los criterios marcados con **[Propuesto]** no salen literalmente del PRD. Los he añadido yo y necesitan tu revisión. Los que no llevan marca se derivan directamente del alcance.

Se entiende por «vencida» una tarea con fecha de vencimiento ya pasada que todavía no está *Hecha*.

### Camino feliz

**CA-01. Crear una tarea sin fecha**

- **DADO** que soy miembro del equipo
- **CUANDO** creo una tarea escribiendo solo su título
- **ENTONCES** la tarea se crea sin fecha de vencimiento y sin pedirme ningún dato más

**CA-02. Poner una fecha**

- **DADO** una tarea sin fecha de vencimiento
- **CUANDO** le pongo una fecha
- **ENTONCES** todo el equipo ve esa fecha en la tarea

**CA-03. Cambiar la fecha**

- **DADO** una tarea con fecha de vencimiento
- **CUANDO** la cambio por otra
- **ENTONCES** todo el equipo ve la fecha nueva y la anterior deja de mostrarse

**CA-04. Quitar la fecha**

- **DADO** una tarea con fecha de vencimiento
- **CUANDO** le quito la fecha
- **ENTONCES** la tarea queda sin fecha de vencimiento

**CA-05. Cualquiera puede gestionar la fecha**

- **DADO** una tarea de la que no soy responsable, o que no tiene responsable
- **CUANDO** pongo, cambio o quito su fecha
- **ENTONCES** el cambio se guarda igual que si fuera mía

**CA-06. Ver destacada una tarea vencida**

- **DADO** una tarea sin terminar cuya fecha de vencimiento ya ha pasado
- **CUANDO** miro la lista
- **ENTONCES** la tarea aparece destacada como vencida y se distingue de las demás de un vistazo

**CA-07. Una tarea sin fecha nunca vence**

- **DADO** una tarea sin fecha de vencimiento
- **CUANDO** miro la lista, pase el tiempo que pase
- **ENTONCES** la tarea nunca aparece como vencida

**CA-08. El resto ve el cambio sin recargar**

- **DADO** que otra persona tiene la lista abierta
- **CUANDO** pongo, cambio o quito la fecha de una tarea
- **ENTONCES** esa persona ve la fecha y el destacado de vencida actualizados sin recargar, y la tarea sube a lo más reciente de la lista

### Cuándo vence una tarea

**CA-09. [Propuesto] Una tarea hecha no aparece como vencida**

- **DADO** una tarea *Hecha* cuya fecha de vencimiento ya ha pasado
- **CUANDO** miro la lista
- **ENTONCES** no aparece destacada como vencida

**CA-10. [Propuesto] Reabrir una tarea con la fecha pasada vuelve a marcarla**

- **DADO** una tarea *Hecha* cuya fecha de vencimiento ya ha pasado
- **CUANDO** alguien la devuelve a *Por hacer* o *En curso*
- **ENTONCES** vuelve a aparecer destacada como vencida

**CA-11. [Propuesto] El día del vencimiento todavía no está vencida**

- **DADO** una tarea sin terminar que vence hoy
- **CUANDO** miro la lista durante el día de hoy
- **ENTONCES** no aparece como vencida, y pasa a estarlo cuando termina ese día en mi huso horario

**CA-12. [Propuesto] La fecha es un día, sin hora**

- **DADO** que pongo una fecha de vencimiento a una tarea
- **CUANDO** elijo la fecha
- **ENTONCES** solo elijo el día, sin hora

**CA-13. [Propuesto] Se marca al pasar la medianoche sin recargar**

- **DADO** que tengo la lista abierta y una tarea sin terminar vence hoy
- **CUANDO** termina el día en mi huso horario
- **ENTONCES** la tarea pasa a mostrarse vencida sin que yo recargue

**CA-14. [Propuesto] Vencer no cuenta como un cambio**

- **DADO** una tarea que acaba de vencer por el paso del tiempo
- **CUANDO** miro la lista
- **ENTONCES** la tarea no sube a lo más reciente, porque nadie la ha cambiado

**CA-15. [Propuesto] Las tareas libres también vencen**

- **DADO** una tarea sin responsable, sin terminar y con la fecha ya pasada
- **CUANDO** miro la lista
- **ENTONCES** aparece destacada como vencida igual que las demás

**CA-16. [Propuesto] «Vencida» no es un estado**

- **DADO** una tarea vencida en *Por hacer*
- **CUANDO** filtro la lista por *Por hacer*
- **ENTONCES** la tarea aparece en ese filtro y sigue destacada como vencida, y no hay un cuarto estado «Vencida»

### Bordes y errores

**CA-17. [Propuesto] Se puede poner una fecha que ya ha pasado**

- **DADO** que apunto una tarea que ya va con retraso
- **CUANDO** le pongo una fecha anterior a hoy
- **ENTONCES** la fecha se guarda y la tarea aparece vencida al momento

**CA-18. [Propuesto] Mover la fecha al futuro quita el destacado**

- **DADO** una tarea vencida
- **CUANDO** cambio su fecha por una fecha futura
- **ENTONCES** deja de aparecer como vencida

**CA-19. [Propuesto] Quitar la fecha quita el destacado**

- **DADO** una tarea vencida
- **CUANDO** le quito la fecha
- **ENTONCES** deja de aparecer como vencida

**CA-20. [Propuesto] Una fecha imposible no se guarda**

- **DADO** una tarea con o sin fecha
- **CUANDO** intento poner una fecha que no existe, como el 31 de febrero
- **ENTONCES** veo un aviso claro y la tarea conserva la fecha que tenía

**CA-21. [Propuesto] Dos cambios a la vez: gana el último**

- **DADO** que dos personas cambian la fecha de la misma tarea casi a la vez
- **CUANDO** se guardan los dos cambios
- **ENTONCES** la tarea se queda con la fecha del último cambio y las dos personas ven esa misma fecha

**CA-22. [Propuesto] El destacado no depende solo del color**

- **DADO** una tarea vencida
- **CUANDO** alguien que no distingue colores mira la lista
- **ENTONCES** sigue sabiendo que está vencida, porque el destacado no se apoya solo en el color
