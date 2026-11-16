# Fecha de vencimiento y tareas vencidas

**Identificador:** FS-118

## Historia

Como miembro del equipo, quiero poner, cambiar o quitar la fecha de vencimiento de una tarea y ver destacadas las que se han pasado de plazo, para que el equipo sepa cuándo tiene que estar cada una y detecte los retrasos de un vistazo.

## Criterios de aceptación

Se entiende por «vencida» una tarea con fecha de vencimiento ya pasada que todavía no está *Hecha*.

### Camino feliz

**CA-01. Crear una tarea sin fecha**

- **DADO** que soy miembro del equipo
- **CUANDO** creo una tarea escribiendo solo su título
- **ENTONCES** la tarea se crea sin fecha de vencimiento y sin pedirme ningún dato más

**CA-02. Poner una fecha**

- **DADO** una tarea sin fecha de vencimiento
- **CUANDO** le pongo una fecha de hoy o posterior
- **ENTONCES** todo el equipo ve esa fecha en la tarea

**CA-03. Cambiar la fecha**

- **DADO** una tarea con fecha de vencimiento
- **CUANDO** la cambio por otra de hoy o posterior
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

**CA-09. Una tarea hecha no aparece como vencida**

- **DADO** una tarea *Hecha* cuya fecha de vencimiento ya ha pasado
- **CUANDO** miro la lista
- **ENTONCES** no aparece destacada como vencida

**CA-10. Reabrir una tarea con la fecha pasada vuelve a marcarla**

- **DADO** una tarea *Hecha* cuya fecha de vencimiento ya ha pasado
- **CUANDO** alguien la devuelve a *Por hacer* o *En curso*
- **ENTONCES** vuelve a aparecer destacada como vencida

**CA-11. El día del vencimiento todavía no está vencida**

- **DADO** una tarea sin terminar que vence hoy
- **CUANDO** miro la lista durante el día de hoy
- **ENTONCES** no aparece como vencida, y pasa a estarlo cuando termina ese día en mi huso horario

**CA-12. La fecha es un día, sin hora**

- **DADO** que pongo una fecha de vencimiento a una tarea
- **CUANDO** elijo la fecha
- **ENTONCES** solo elijo el día, sin hora

**CA-13. Se marca al pasar la medianoche sin recargar**

- **DADO** que tengo la lista abierta y una tarea sin terminar vence hoy
- **CUANDO** termina el día en mi huso horario
- **ENTONCES** la tarea pasa a mostrarse vencida sin que yo recargue

**CA-14. Vencer cuenta como un cambio**

- **DADO** una tarea sin terminar que acaba de vencer por el paso del tiempo
- **CUANDO** miro la lista
- **ENTONCES** la tarea sube a lo más reciente de la lista, para que se vea rápido qué ha vencido

**CA-15. Las tareas libres también vencen**

- **DADO** una tarea sin responsable, sin terminar y con la fecha ya pasada
- **CUANDO** miro la lista
- **ENTONCES** aparece destacada como vencida igual que las demás

**CA-16. «Vencida» no es un estado**

- **DADO** una tarea vencida en *Por hacer*
- **CUANDO** filtro la lista por *Por hacer*
- **ENTONCES** la tarea aparece en ese filtro y sigue destacada como vencida, y no hay un cuarto estado «Vencida»

### Bordes y errores

**CA-17. No se puede poner una fecha que ya ha pasado**

- **DADO** una tarea con o sin fecha
- **CUANDO** intento ponerle una fecha anterior a hoy
- **ENTONCES** veo un aviso claro de que la fecha no puede estar en el pasado, y la tarea conserva la fecha que tenía

**CA-18. Mover la fecha al futuro quita el destacado**

- **DADO** una tarea vencida
- **CUANDO** cambio su fecha por una fecha futura
- **ENTONCES** deja de aparecer como vencida

**CA-19. Quitar la fecha quita el destacado**

- **DADO** una tarea vencida
- **CUANDO** le quito la fecha
- **ENTONCES** deja de aparecer como vencida

**CA-20. Una fecha imposible no se guarda**

- **DADO** una tarea con o sin fecha
- **CUANDO** intento poner una fecha que no existe, como el 31 de febrero
- **ENTONCES** veo un aviso claro y la tarea conserva la fecha que tenía

**CA-21. Dos cambios a la vez: gana el último**

- **DADO** que dos personas cambian la fecha de la misma tarea casi a la vez
- **CUANDO** se guardan los dos cambios
- **ENTONCES** la tarea se queda con la fecha del último cambio y las dos personas ven esa misma fecha

**CA-22. El destacado no depende solo del color**

- **DADO** una tarea vencida
- **CUANDO** alguien que no distingue colores mira la lista
- **ENTONCES** sigue sabiendo que está vencida, porque el destacado no se apoya solo en el color

**CA-23. Una fecha que ya venció no bloquea otros cambios**

- **DADO** una tarea cuya fecha de vencimiento ya ha pasado
- **CUANDO** cambio su título, su estado o su responsable sin tocar la fecha
- **ENTONCES** el cambio se guarda y la tarea conserva su fecha
