# Alcance MVP — FlowSync (eh)

## 1. El terreno que ya existe

- Hoy FlowSync es solo un esqueleto de autenticación, completo y pulido: crear cuenta, iniciar sesión, ver el perfil y cerrar sesión. La sesión sobrevive a recargar la página y los errores llegan en castellano bajo cada campo.
- Modelo de datos: solo existen la persona usuaria y sus sesiones activas. No hay ninguna entidad de negocio (ni tareas, ni proyectos, ni equipos).
- No hay nada a medias. Tampoco hay edición de perfil, recuperación de contraseña ni tests escritos.
- Consecuencia para el alcance: todo lo que sea tarea parte de cero, y la cuenta de usuario ya está resuelta, así que no se vuelve a especificar.

## 2. El interrogatorio

Las cinco preguntas que hizo la IA, en una sola ronda:

1. ¿Qué pregunta concreta de la reunión de sync debe contestar FlowSync? → **"¿En qué estás?" y "quién lleva qué".** Los bloqueos quedan fuera.
2. ¿Quién es el equipo y cómo se forma? → **Un único espacio compartido, de 3 a 10 personas, sin entidad "equipo".** Varios equipos es un supuesto, no se construye.
3. ¿Qué significa "tiempo real"? → **Ver los cambios de estado de las tareas sin refrescar ni preguntar.** No es chat, ni presencia, ni colaboración simultánea.
4. ¿Quién actualiza y con cuánto esfuerzo? → **La persona que hace la tarea, en dos clics y sin campos obligatorios.** Sin subtareas, sprints ni estimaciones.
5. ¿Cuál es el criterio de éxito? → **Que a la semana de uso real el equipo cancele la ronda de "¿en qué estás?" y nadie pida que vuelva.** No hay piloto real: el primer usuario es un caso de estudio.

La IA declaró 16 supuestos al recibir la ficha. Estos son los que importan:

- **Qué se ha movido (supuesto 9)** se resuelve ordenando por "última vez tocada", sin vista de "desde tu última visita". Es el hueco más grande: la ficha promete un resumen que espera, y esto es solo un sustituto.
- **Borrado (supuesto 6):** cualquiera borra cualquier tarea, sin deshacer. Choca con que la lista sea la fuente de verdad.
- **Pertenencia (supuesto 1):** todo el que se registra entra en el único espacio, sin invitación. Aceptable para el caso de estudio, no para un equipo real.
- **Aceptados sin cambios:** estados fijos (Por hacer / En curso / Hecha), un responsable o ninguno (ninguno = libre), cualquiera edita y reasigna, solo los cuatro campos, fecha opcional y sin hora, si dos personas editan a la vez, prevalece el último cambio, la lista como pantalla principal.

## 3. El alcance

### Problema
Un equipo remoto pequeño no sabe en qué está cada persona sin interrumpir a alguien. Media daily se va en la ronda de "¿en qué estás?", y el resto del día son preguntas sueltas por chat. El coste no es solo tiempo: dos personas empezaron el mismo módulo la misma semana sin saberlo y perdieron dos días. El gestor de tareas que usan no lo evita, porque actualizarlo cuesta tanto que nadie lo mantiene al día.

### Usuarios
Los pares de un equipo remoto de 3 a 10 personas, repartidas en varios husos horarios. No hay un lead que consuma reportes ni jerarquía de permisos. Quien escribe el estado es quien lo consume: la lista es su propia cola de trabajo. Caso de estudio: un equipo de 6 personas de un SaaS, en 3 husos horarios.

### Propuesta de valor
Una sola lista compartida donde, al abrirla, ves de un vistazo quién está en qué, qué está libre y qué tareas han cambiado de estado o de responsable recientemente. Crear una tarea o cambiarle el estado cuesta dos clics, sin más campo obligatorio que el título. Muestra el estado de la tarea, nunca la presencia de la persona. Se mira al llegar por la mañana o al volver de una reunión, y cambia dos decisiones: no empezar lo que otra persona ya tiene, y elegir lo siguiente sabiendo qué está libre.

### Alcance (7)
1. Una lista compartida única, que es la pantalla a la que se llega al entrar.
2. Crear una tarea con solo el título.
3. Cambiar el estado (Por hacer / En curso / Hecha) desde la propia lista, sin abrir nada.
4. Coger una tarea libre, reasignarla o soltarla.
5. Filtrar por estado, para quedarse con lo pendiente.
6. Frescura visible: cada tarea muestra quién cambió por última vez su estado o su responsable, y cuándo. La lista se ordena por ese movimiento (corregir un título no cuenta). Los datos están al día al abrir la lista o al volver a ella.
7. Corregir el título de una tarea.

### NO-alcance (17)
- **Cambios en vivo sin refrescar.** Contradice la ficha y el encargo, que definen "tiempo real" como ver los cambios sin refrescar. Lo saco porque H3 se apoya en el caso "llego por la mañana y miro", un resumen que espera, y eso se cubre con datos frescos al abrir. El precio lo paga H2: entre una recarga y otra, dos personas pueden coger la misma tarea sin enterarse. Ver la línea 3.
- **Fecha de vencimiento y "pasada de plazo".** Va contra la ficha, que la pedía. Pero "vencida" no responde a "¿quién está en qué?" ni evita trabajo duplicado: mide plazos, y eso es lo de un gestor clásico.
- **Borrar tareas.** Sin deshacer, y en un espacio donde todos editan todo, un borrado por error destruye justo la información de la que vive el producto. Lo terminado se marca "Hecha".
- **Vista "qué ha cambiado desde tu última visita".** No es para un lead: es justo lo que quiere el par que vuelve. Queda fuera para probar si H3 se cumple solo con el orden por movimiento reciente. Es una apuesta: con 3 husos horarios, su ausencia puede hacer fallar H3 por sí sola, y entonces sería lo primero en entrar.
- **Historial de cambios por tarea.** Para decidir qué coger solo importa el estado de ahora.
- **Equipos, espacios o invitaciones.** Solo importan cuando hay más de un equipo, y aún no hay ni uno validado.
- **Roles y permisos.** Son pares, y una jerarquía no cambia si la lista se mantiene fresca.
- **Notificaciones push y avisos.** Contradicen "resumen que espera, no aviso que interrumpe".
- **Indicadores de presencia o actividad.** El estado es de la tarea; medir a las personas es vigilancia y envenena la confianza.
- **Integraciones (Slack, Git, CI, calendario).** Derivar el estado de fuera es otro producto. Aquí se valida si la persona lo teclea por sí misma.
- **Comentarios.** Convierten la lista en un canal de conversación, cuando una línea de estado basta para no interrumpir.
- **Descripción, etiquetas, prioridad, adjuntos.** Cada campo de más es fricción al actualizar, y la fricción es el riesgo número 1.
- **Sprints, estimaciones, épicas, backlog priorizado.** Un equipo que los necesita no es nuestro usuario.
- **Analítica e informes.** Son para un lead que no existe.
- **Gestión de bloqueos.** Es la mitad de la daily que este MVP no elimina, y mezclarla ensuciaría la medición de H3.
- **Importar tareas de otro gestor.** Supuesto: el equipo arranca tecleando solo sus tareas abiertas, que son pocas, y deja el gestor anterior ese mismo día. Así H1 se mide sin doble actualización.
- **Búsqueda, paginación, edición de perfil y recuperación de contraseña.** No tocan ninguna hipótesis.

Hipótesis que valida: **H1**, si actualizar cuesta dos clics, la lista se mantiene fresca (es el riesgo #1). **H2**, ver quién está en qué y qué está libre evita el trabajo duplicado. **H3**, en una semana el equipo cancela la ronda de "¿en qué estás?" y nadie pide que vuelva.

---

## Parte B — las tres líneas

1. **La IA propuso 9 cosas dentro; después de mi recorte quedaron 7.**

2. **Tres cosas que dejé fuera:**
   - *Cambios en vivo sin refrescar.* No hace falta para H3: el caso "llego y miro" se cubre con datos frescos al abrir. Para H2 solo aporta en la ventana entre una recarga y otra (ver la línea 3).
   - *Fecha de vencimiento.* No valida H2 ni H3. "Vencida" mide plazos, no quién está en qué. La ficha la pedía, y la saco igual.
   - *Borrar tareas.* No valida nada y pone en riesgo H1: si una tarea puede desaparecer sin rastro, la lista deja de ser una fuente de verdad.

3. **La exclusión de la que menos segura estoy: los cambios en vivo.** Se contradicen el encargo, que pide literalmente "más en tiempo real", y el caso de uso de la ficha, "resumen que espera", que se cubre con datos frescos al abrir. Lo barato contra lo que se promete, y además el recorte deja H2 expuesta: con la lista abierta, dos personas pueden coger la misma tarea entre recargas, que es justo el episodio de los dos días perdidos. Entraría si en la semana de prueba pasa una sola vez.

> 📌 **La IA se contradijo, y me lo señaló un revisor.** Prometía "qué se ha movido", pero excluía el historial y la vista de "desde tu última visita", esta última con el argumento de que era "para un lead que no existe". La ficha dice lo contrario: la quiere el par que vuelve. La mantuve fuera, pero con el porqué corregido. Además, mostrar "quién y cuándo" sin "qué cambió" es una frescura a medias, y es un riesgo que queda anotado.
>
> 📌 **El revisor adversarial me corrigió cuatro cosas, y tenía razón.** (1) Mi exclusión del tiempo real no admitía que contradice la ficha, y se apoyaba en el coste, que es una excusa de calendario. (2) Decía que no afectaba a H2, cuando reabre la ventana del episodio de los dos días perdidos. (3) La propuesta de valor prometía "qué se ha movido" y el alcance solo entregaba "quién y cuándo". (4) Mi porqué para excluir "desde tu última visita" era circular. Lo corregí dentro del reloj, sin cambiar el recorte: siguen siendo 9 → 7.
