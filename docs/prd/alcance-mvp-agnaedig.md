# FlowSync — Alcance del MVP

## 1. Problema

Las dailies de 15 minutos se comen la mitad de su tiempo en la ronda de "¿en qué estás?", y el estado del equipo solo se conoce interrumpiendo por chat. Esto provoca trabajo duplicado: en un episodio real, dos personas tocaron el mismo módulo la misma semana sin saberlo y perdieron dos días. La daily sigue existiendo para bloqueos, que este MVP no resuelve.

## 2. Usuarios

- **Primario:** pares de equipos remotos pequeños (3 a 10 personas), sin jerarquía ni roles.
- **Caso de estudio:** equipo de 6 personas de producto SaaS en 3 husos horarios, que hoy usa un gestor de tareas pesado y una daily de 15 minutos por videollamada. No es un cliente real.
- **No es usuario:** quien necesite sprints, estimaciones, informes para dirección o permisos por rol.

## 3. Propuesta de valor

Ver en segundos en qué está trabajando cada persona, sin preguntar ni reunirse para saberlo. Registrar el trabajo propio y cambiar de etapa son dos clics. El estado pertenece a la tarea, no a la persona, y se ve actualizado sin refrescar la pantalla.

## 4. Alcance

- Un único espacio compartido por el equipo.
- Tarea con: título, responsable, etapa (`por hacer` / `en curso` / `hecho`) y fecha de vencimiento (solo fecha, sin hora).
- Crear una tarea y cambiar su etapa.
- Lista filtrable por etapa, con marca visual para las tareas vencidas.
- Cambios de etapa visibles en vivo, sin refrescar la pantalla.

**Por qué entra cada cosa:** responsable y fecha responden a "¿quién lo tiene?" y "¿qué se ha pasado de plazo?". Tres etapas bastan para pendiente, en marcha y listo. El tiempo real se limita a ver cambios de etapa, que es lo que evita la pregunta.

## 5. NO-alcance

- **Roles de usuario.** Cada persona registra su trabajo y cambia su etapa. Sin roles no hay ramas de permisos que construir ni probar.
- **Notificaciones por email.** Quien quiera saber el estado consulta la herramienta. Un correo por cambio satura la bandeja y contradice la forma de la señal.
- **Definir o editar el perfil de usuario.** Basta con saber en qué se trabaja. Nombre y email vienen del registro existente; nada más.
- **Editar título, responsable o fecha tras crear.** Una tarea equivocada se cierra y se crea otra. Editar exige un formulario completo y el objetivo es cambiar etapa en segundos.
- **Borrar tareas.** Se cierran como `hecho`. Borrar abre preguntas de autoría que el MVP no necesita.
- **Invitar personas por email.** Requiere tokens y flujos de aceptación. El caso de estudio se resuelve con cuentas creadas a mano. Riesgo asumido: onboarding manual.
- **Etapas personalizadas o prioridad.** Es la configuración que hace pesado a Jira.
- **Comentarios en tareas.** Son chat dentro de la tarea, justo lo que se quiere eliminar.
- **Historial de cambios y "quién cambió qué".** Es vigilancia y no ayuda a decidir qué empezar.
- **Presencia o "quién está conectado".** Misma razón: vigilancia.
- **Notificaciones push e in-app.** El caso es llegar y ver, no ser interrumpido.
- **Resumen diario por email.** Sería otra superficie de producto. El MVP necesita una sola pantalla.
- **Etiquetas, subtareas, adjuntos, dependencias.** Ninguno cambia la decisión de qué empezar.
- **Búsqueda de texto.** Con decenas de tareas, el filtro por etapa basta.
- **Archivo de tareas cerradas.** Las `hecho` se filtran por etapa.
- **Vencimiento con hora y zonas horarias.** Con 3 husos horarios, la hora abre una conversión que no aporta. Solo fecha.
- **Exportar o informes.** Los informes se renuncian por diseño.
- **Integraciones con Git, CI, calendario o Slack.** Son otro producto con OAuth de terceros. La etapa se cambia a mano.
- **Varios espacios, o personas en más de uno.** Supuesto a validar en el futuro; no se construye.
- **App móvil nativa.** El uso es de escritorio, al llegar o volver de una reunión.
- **Idioma distinto del castellano.** El caso de estudio es hispanohablante.

## Supuestos y riesgos

- **Supuesto principal a validar:** que la etapa se mantenga actualizada con dos clics sin obligar a nadie. Si se queda vieja, el producto pierde sentido. Es el riesgo #1.
- **Supuesto:** el espacio único basta para el caso de estudio. Si aparecen equipos que comparten personas, habrá que replantearlo.
- **Supuesto:** las cuentas se crean a mano por quien administra el despliegue.

## Respuestas del ejercicio

Los dos números. Cuántas cosas propuso la IA meter dentro del alcance, y cuántas quedaron dentro después de tu recorte. Tal cual salieron, sin redondear ni explicar.
5,5

Tres cosas que dejaste fuera, y por qué cada una. El porqué tiene una forma concreta: qué hipótesis del producto no ayuda a validar. "No da tiempo" no vale, porque no es una decisión de producto: es una excusa de calendario, y mañana deja de ser cierta.
- **Roles de usuario.** Cada persona registra su trabajo y cambia su etapa. Sin roles no hay ramas de permisos que construir ni probar.
- **Notificaciones por email.** Quien quiera saber el estado consulta la herramienta. Un correo por cambio satura la bandeja y contradice la forma de la señal.
- **Definir o editar el perfil de usuario.** Basta con saber en qué se trabaja. Nombre y email vienen del registro existente; nada más.

La exclusión de la que menos seguro estás, y qué tendría que pasar para que entrara. Lo que interesa es qué dos cosas se contradecían: lo que te pedían contra lo que veías, lo barato contra lo que valida, lo que enamora contra lo que se puede sostener.
**Definir o editar el perfil de usuario.** Ayudaría a saber más de la persona y cómo contactarlo, entraría si el requerimiento solicitara una forma rápida de contactar o saber quien es.