# Alcance MVP FlowSync (Damian Buonamico)

# Parte A

## 1. El terreno que ya existe
Hoy FlowSync solo resuelve cuentas: una persona puede registrarse, entrar, ver su perfil y salir. El único concepto del sistema es la persona con cuenta (email, nombre opcional, fecha de alta). No hay tareas, ni relación entre personas, ni nada compartido: todo el valor del producto está por construir. Lo que definamos debe apoyarse en estas cuentas existentes, no volver a especificarlas.

## 2. Tramo dos interrogatorio

Resultado: 

Problema

  Los equipos remotos pequeños pierden tiempo en interrupciones constantes ("¿en qué estás?" por Slack) y en la ronda de sincronización de la daily, que consume la mitad de los 15 minutos.
  El dolor real: dos personas empiezan a trabajar en lo mismo sin saberlo porque nadie ve el estado del equipo sin interrumpir a alguien. Dos días perdidos.

  Usuarios

  Equipos remotos de 3–10 personas, roles planos, que hoy usan un gestor de tareas pesado. El valor lo cobran los pares entre ellos, no un manager reportando hacia arriba. Caso de estudio:
  equipo de 6 personas de producto SaaS en 3 husos horarios, daily de 15 minutos por videollamada.

  Propuesta de valor

  Ver de un vistazo en qué está cada uno y qué está libre, sin preguntar a nadie y sin refrescar. La lista compartida es tu cola de trabajo: la miras para elegir qué coger y, de paso, actualizas tu estado en dos clics. Cambias la decisión de "empiezo esto" a "empiezo esto sabiendo que nadie más lo está tocando". La daily pierde la ronda de "¿en qué estás?", no desaparece entera.

  Alcance

  1. Crear una tarea nueva (título, responsable, estado inicial, fecha de vencimiento)
  2. Ver la lista compartida de todas las tareas del equipo
  3. Cambiar el estado de cualquier tarea en dos clics, sin formularios ni campos obligatorios
  4. Filtrar la lista por estado para centrarse en lo pendiente
  5. Ver los cambios de estado en tiempo real sin refrescar la página
  6. Ver de un vistazo las tareas pasadas de plazo

  NO-alcance

  Editar título, responsable o fecha después de crear la tarea → No valida si la gente adopta el flujo de crear tareas rápidas. Si el MVP funciona, crearán una nueva en lugar de editar la
  vieja.

  Borrar tareas → Ensuciaría la señal del riesgo #1 (información vieja). Necesitamos ver si las tareas se quedan obsoletas; borrarlas ocultaría el problema en lugar de validarlo.

  Comentarios en tareas → Ya decidido fuera del MVP, y además reintroduce las interrupciones que queremos evitar. El estado de la tarea debe bastar.

  Asignar una tarea a múltiples responsables → No valida "quién está en qué". Si dos personas trabajan juntas, esa coordinación sigue siendo conversación humana, no datos.

  Reordenar o priorizar tareas manualmente → Renuncia explícita a backlog priorizado. Si necesitan decidir el orden, este no es su producto.

  Búsqueda de tareas → Con 3-10 personas y vertical fina, la lista cabe en una pantalla. Si necesitan buscar, el MVP tiene demasiadas tareas o falló.

  Estados personalizados del flujo → "Menos rollo que Jira" = sin configuración. Estados fijos (pendiente, en curso, hecho) validan si el concepto funciona antes de dejar personalizarlo.

  Marcar tareas como bloqueadas → La ficha dice que "la parte de bloqueos sigue" en la daily; este MVP no la resuelve y no pretende hacerlo.

  Historial de cambios de una tarea → No valida la hipótesis de adopción. Si funciona, saber quién cambió qué será útil, pero primero validar que lo usan.

  Adjuntos, enlaces o descripción larga en tareas → No ayuda a responder "¿en qué estás?". Eso es documentación; esto es sincronización de estado.

  Invitar miembros al equipo desde la aplicación → Con 6 personas en el caso de estudio, el setup inicial puede ser manual (dar de alta las cuentas a mano). Validar la retención importa más
   que la incorporación.

  Vista de calendario → No valida si actualizan el estado. La fecha de vencimiento en la lista es suficiente para ver plazos pasados.

  Vista agrupada por responsable → Filtrar por estado basta para ver qué está libre. Agrupar por persona es reporting, y renunciamos a informes.

  Subtareas o jerarquías → Complejidad que no valida adopción. Si una tarea necesita subtareas, probablemente no es del tamaño adecuado para este flujo de dos clics.

  Etiquetas o categorías → No valida la hipótesis. Si necesitan categorizar, la lista simple no les sirve de cola de trabajo y el producto no es para ellos.

  Notificaciones push o de ningún tipo → Ya decidido fuera. "Resumen que espera, no aviso que interrumpe": llegas por la mañana y ves qué se movió, punto.

  Integración con Git, Slack, PRs, CI o calendarios → Ya decidido fuera. Derivar el estado de señales externas es otro producto con OAuth y permisos de terceros.

  Múltiples equipos o espacios → Ya decidido fuera. Un espacio único compartido; si necesitan separar equipos, queda para después del MVP.

  Roles, permisos o jerarquías → Ya decidido fuera. Roles planos: todos ven y editan todo.

  Estimaciones de tiempo o esfuerzo → Renuncia explícita. Un equipo que necesite eso no es nuestro usuario.

  Analítica o reporting → Ya decidido fuera. No es una herramienta de gestión; es una herramienta de coordinación entre pares.



  ---
  SUPUESTOS

  - Estados fijos del flujo: asumo tres estados iniciales (Pendiente, En curso, Hecho) sin configuración. Si el equipo necesita "Revisión" o "Bloqueado", queda para validar después.
  - Una tarea, un responsable: asumo que cada tarea tiene exactamente un responsable asignado. Tareas sin asignar o con múltiples responsables quedan fuera.
  - Todas las tareas son visibles para todos: sin filtros por responsable en el MVP, cualquiera ve todas las tareas del espacio único. Si alguien necesita privacidad, este no es su
  producto.
  - El tiempo real se implementa con polling o WebSockets: la ficha no especifica la tecnología, asumo que "ver cambios sin refrescar" implica actualización automática cada pocos segundos o
   conexión persistente.
  - Las cuentas ya existen: el código actual tiene registro y login. Asumo que el MVP no necesita flujo de invitación; las 6 personas del caso de estudio se registran manualmente.

---

Observaciones (Damian): La IA habló de supuestos sobre implementación: (polling o WEbSocket), lo quito porque no es parte del PRD.

---

## Tramo 3:  El alcance en cinco bloques. Problema · usuarios · propuesta de valor · alcance · NO-alcance. Que la IA lo proponga siendo agresiva recortando, y que justifique cada exclusión. Después recórtalo tú otra vez, porque va a proponer de más: ese recorte es tuyo, y es lo que se revisa.


  Los equipos remotos pequeños pierden tiempo en interrupciones constantes ("¿en qué estás?" por Slack) y en la ronda de sincronización de la daily, que consume la mitad de los 15 minutos.
  El dolor real: dos personas empiezan a trabajar en lo mismo sin saberlo porque nadie ve el estado del equipo sin interrumpir a alguien. Dos días perdidos.

  Usuarios

  Equipos remotos de 3–10 personas, roles planos, que hoy usan un gestor de tareas pesado. El valor lo cobran los pares entre ellos, no un manager reportando hacia arriba. Caso de estudio:
  equipo de 6 personas de producto SaaS en 3 husos horarios, daily de 15 minutos por videollamada.

  Propuesta de valor

  Ver de un vistazo en qué está cada uno y qué está libre, sin preguntar a nadie. La lista compartida es tu cola de trabajo: la miras para elegir qué coger y, de paso, actualizas tu estado
  en dos clics. Cambias la decisión de "empiezo esto" a "empiezo esto sabiendo que nadie más lo está tocando". La daily pierde la ronda de "¿en qué estás?", no desaparece entera.

  Alcance

  1. Crear una tarea nueva (título, responsable, estado inicial)
  2. Ver la lista compartida de todas las tareas del equipo
  3. Cambiar el estado de cualquier tarea en dos clics, sin formularios

  NO-alcance

  Actualización en tiempo real sin refrescar → Costoso de implementar y no crítico para validar la hipótesis. Refrescar con F5 cuando llegas por la mañana o vuelves de reunión basta para el
   caso de uso ("resumen que espera, no aviso que interrumpe"). Si el MVP funciona con refresh manual, añadir actualización automática es mejora incremental, no validación.

  Fecha de vencimiento en las tareas → No ayuda a validar "quién está en qué" ni a cancelar la ronda de sincronización. Es gestión de plazos, no coordinación de estado actual.

  Ver tareas pasadas de plazo → No ayuda a validar "no pisarse" ni a cancelar la ronda de sincronización. Es gestión de plazos, no coordinación.

  Filtrar la lista por estado → Con 3-10 personas y vertical fina (3 capacidades), la lista entera cabe en una pantalla. Si necesitan filtrar, hay demasiadas tareas o el MVP falló en ser
  simple.

  Editar título, responsable o estado después de crear la tarea → No valida si la gente adopta el flujo de crear tareas rápidas. Si el MVP funciona, crearán una nueva en lugar de editar la
  vieja. El único cambio permitido es el estado (capability #3).

  Borrar tareas → Ensuciaría la señal del riesgo #1 (información vieja). Necesitamos ver si las tareas se quedan obsoletas; borrarlas ocultaría el problema en lugar de validarlo.

  Comentarios en tareas → Ya decidido fuera del MVP, y además reintroduce las interrupciones que queremos evitar. El estado de la tarea debe bastar para responder "¿en qué estás?".

  Asignar una tarea a múltiples responsables → No valida "quién está en qué". Una tarea, un responsable. Si dos personas trabajan juntas, esa coordinación sigue siendo conversación humana,
  no datos.

  Reordenar o priorizar tareas manualmente → Renuncia explícita a backlog priorizado. Si necesitan decidir el orden, este no es su producto.

  Búsqueda de tareas → Con 3-10 personas y lista simple, la búsqueda no valida adopción. Si necesitan buscar, el volumen indica que el producto no es para ellos.

  Estados personalizados del flujo → "Menos rollo que Jira" = sin configuración. Estados fijos (Pendiente, En curso, Hecho) validan si el concepto funciona antes de dejar personalizarlo.

  Marcar tareas como bloqueadas → La ficha dice que "la parte de bloqueos sigue" en la daily; este MVP no la resuelve y no pretende hacerlo.

  Historial de cambios de una tarea → No valida la hipótesis de adopción. Si funciona, saber quién cambió qué será útil, pero primero validar que lo usan.

  Adjuntos, enlaces o descripción larga en tareas → No ayuda a responder "¿en qué estás?". Eso es documentación; esto es sincronización de estado.

  Invitar miembros al equipo desde la aplicación → Con 6 personas en el caso de estudio, el setup inicial puede ser manual (dar de alta las cuentas a mano). Validar la retención importa más
   que la incorporación.

  Vista de calendario → No valida si actualizan el estado. Sin fecha de vencimiento en el alcance, un calendario no tiene sentido.

  Vista agrupada por responsable → No valida adopción. La lista simple muestra quién está en qué; agrupar es reporting, y renunciamos a informes.

  Subtareas o jerarquías → Complejidad que no valida adopción. Si una tarea necesita subtareas, probablemente no es del tamaño adecuado para este flujo de dos clics.

  Etiquetas o categorías → No valida la hipótesis. Si necesitan categorizar, la lista simple no les sirve de cola de trabajo y el producto no es para ellos.

  Notificaciones push o de ningún tipo → Ya decidido fuera. "Resumen que espera, no aviso que interrumpe": llegas por la mañana y ves qué se movió, punto.

  Integración con Git, Slack, PRs, CI o calendarios → Ya decidido fuera. Derivar el estado de señales externas es otro producto con OAuth y permisos de terceros.

  Múltiples equipos o espacios → Ya decidido fuera. Un espacio único compartido; si necesitan separar equipos, queda para después del MVP.

  Roles, permisos o jerarquías → Ya decidido fuera. Roles planos: todos ven y editan todo.

  Estimaciones de tiempo o esfuerzo → Renuncia explícita. Un equipo que necesite eso no es nuestro usuario.

  Analítica o reporting → Ya decidido fuera. No es una herramienta de gestión; es una herramienta de coordinación entre pares.

  ---
  Supuestos

  - Estados fijos del flujo: tres estados iniciales (Pendiente, En curso, Hecho) sin configuración. Si el equipo necesita "Revisión" o "Bloqueado", queda para validar después.
  - Una tarea, un responsable: cada tarea tiene exactamente un responsable asignado. Tareas sin asignar o con múltiples responsables quedan fuera.
  - Todas las tareas son visibles para todos: sin filtros por responsable, cualquiera ve todas las tareas del espacio único. Si alguien necesita privacidad, este no es su producto.
  - Las cuentas ya existen: el código actual tiene registro y login. El MVP no necesita flujo de invitación; las 6 personas del caso de estudio se registran manualmente.



# Parte B:

Los dos números. Cuántas cosas propuso la IA meter dentro del alcance, y cuántas quedaron dentro después de tu recorte. Tal cual salieron, sin redondear ni explicar.

La IA propuso 6 cosas dentro del alcance 
  1. Crear una tarea nueva (título, responsable, estado inicial, fecha de vencimiento)
  2. Ver la lista compartida de todas las tareas del equipo
  3. Cambiar el estado de cualquier tarea en dos clics, sin formularios ni campos obligatorios
  4. Filtrar la lista por estado para centrarse en lo pendiente
  5. Ver los cambios de estado en tiempo real sin refrescar la página
  6. Ver de un vistazo las tareas pasadas de plazo

Deje 4 adentro y  quite otras tres.

1) crear la tarea nueva (aunque es la que tengo duda)
2) ver la lista compartida de tareas
3) cambiar el estado.
4) tomar una tarea libre

Tres cosas que dejaste fuera, y por qué cada una. El porqué tiene una forma concreta: qué hipótesis del producto no ayuda a validar. "No da tiempo" no vale, porque no es una decisión de producto: es una excusa de calendario, y mañana deja de ser cierta.

Con la hipotesis de (A) la gente mantiene el estado al día con dos clics, y (B) ver ese estado evita pisarse y permite cancelar la ronda de “¿en qué estás?”. Decido priorizar features y descatar otras:

Queda fuera del alcance del MVP. 

1) Tiempo real sin refrescar. No me parece critico y puede ser costoso. Me basta con algo mas simple, refrescar con F5 cuando necesito saber en que están.

2) Tareas pasadas de plazo. No ayuda a no pisarse o a cancelar la ronda, parece mas algo de management.

3) Filtrar por estado. Con equipos pequeños, no hace falta filtrar, porque no espero tener demasiada informacion.

4) La fecha de Vencimiento sale del alcance porque No ayuda a validar "quién está en qué" ni a cancelar la ronda de sincronización. Es gestión de plazos, no coordinación de estado actual.

La exclusión de la que menos seguro estás, y qué tendría que pasar para que entrara. Lo que interesa es qué dos cosas se contradecían: lo que te pedían contra lo que veías, lo barato contra lo que valida, lo que enamora contra lo que se puede sostener.

  1. Crear una tarea nueva (título, responsable, estado inicial, fecha de vencimiento). 

  Creo que necesito que esta app no genere overhead de gestion para crear cada tarea, la idea es que sea eficiente, puede tomar la info  directamente del sistema actual de gestion (Jira y Git por ejemplo), para que las personas no tengan que actualizar en dos lugares distintos.









