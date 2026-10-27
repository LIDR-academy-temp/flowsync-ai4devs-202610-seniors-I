# FlowSync — Alcance del MVP

Alcance consensuado el 2026-10-27. Es la base del PRD. Recoge solo producto: modelo de datos, estados en código, endpoints y diseño técnico se deciden en la spec de implementación.

> **Caso de estudio, no cliente real.** El equipo de referencia es inventado. Los criterios de éxito son hipótesis que no se pueden medir con usuarios reales.

## 1. Problema

En un equipo remoto pequeño, nadie ve en qué está el resto sin interrumpir a alguien, ya sea por Slack o en la ronda de "¿en qué estás?" de la daily, que se come la mitad de sus 15 minutos.

Cuando nadie pregunta, el coste es trabajo duplicado. Episodio de referencia: dos personas tocaron el mismo módulo la misma semana porque una empezó sin que la otra lo supiera, y se perdieron dos días.

Lo que el MVP quiere eliminar es la ronda de "¿en qué estás?". La daily no desaparece: la parte de bloqueos sigue y este MVP no la resuelve.

## 2. Usuarios

- Compañeros de un equipo remoto de 3 a 10 personas, todos con el mismo rol: todo el mundo ve y edita lo mismo.
- Ganan dos personas: quien iba a empezar algo que otra persona ya tenía, y quien deja de preguntar o de ser interrumpido para contar cómo va.
- No es para managers ni para reportar hacia arriba.
- **Equipo de referencia (caso de estudio):** 6 personas de un producto SaaS, en 3 husos horarios, que hoy usan un gestor de tareas pesado y hacen una daily de 15 minutos por videollamada.

## 3. Propuesta de valor

Una lista de tareas del equipo en la que cada persona marca lo que tiene **en curso** en dos clics. Así cualquiera ve de un vistazo quién está con qué antes de empezar algo, sin preguntar ni esperar a la daily.

Se sostiene porque quien escribe el estado gana algo en el momento: esa lista es su cola de trabajo y deja de recibir interrupciones. FlowSync es donde se hace el trabajo, no donde se informa de él: sustituye al gestor de tareas, no convive con él.

Decisiones que habilita:

1. No empezar algo que otra persona ya tiene en curso.
2. Elegir lo siguiente entre mis tareas pendientes, o reasignándome una tarea pendiente de otra persona.

**Criterio de éxito:** tras una semana de uso, el equipo cancela la ronda de "¿en qué estás?" y nadie pide que vuelva.

## 4. Alcance (dentro)

1. **Un único espacio compartido.** Cualquier persona registrada ve todas las tareas. Se aprovecha la auth que ya existe.
2. **Crear una tarea** con título (obligatorio), responsable (obligatorio; por defecto, quien la crea) y fecha de vencimiento (opcional).
3. **Una sola lista del equipo** que muestra título, responsable, estado y si la tarea está vencida.
4. **Tres estados fijos y no configurables:** pendiente, en curso y hecho. Cualquier persona puede cambiar el estado de cualquier tarea.
5. **Editar título, responsable y fecha.** Así se cubre reasignar una tarea y corregir errores.
6. **Filtro por estado.**
7. **Tareas vencidas marcadas.** Una tarea sin fecha nunca está vencida. La fecha es un día, sin hora.
8. **Cambios visibles sin recargar.** Lo que cambia otra persona aparece en la lista en 10 segundos como máximo.
9. **Tests** de todo lo anterior.

## 5. NO-alcance (fuera)

| Exclusión | Por qué |
|---|---|
| Estado "bloqueado" | Resuelve la otra mitad de la daily, que hemos declarado no resuelta. Ponerlo promete algo que el MVP no cumple. |
| Sincronización en tiempo real (E3) | Para no empezar lo que otra persona tiene en curso bastan 10 segundos. Las colisiones del problema se miden en horas o días, no en segundos. |
| "Cambió hace…" y ordenar por fecha de cambio | No está en el criterio de éxito: filtrar por "en curso" ya responde a "¿en qué está cada uno?". Se recupera si se confirma el riesgo de información desactualizada. |
| Borrar tareas | "Hecho" ya sirve para cerrarlas. Borrar exige confirmación o deshacer y nadie lo ha pedido. Una tarea creada por error se marca como hecha. |
| Vista "mis tareas" y filtro por responsable | Con 3 a 10 personas, la lista del equipo se lee de un vistazo y el filtro por estado basta. Si la lista deja de leerse de un vistazo, es el primer añadido. |
| Descripción, comentarios, adjuntos, subtareas, etiquetas, prioridad | Cada campo es un paso hacia la complejidad de configuración que se quiere evitar. Para saber quién está con qué no hacen falta. |
| Tablero kanban o reordenar arrastrando | Es otra vista del mismo dato. La lista filtrada responde la misma pregunta con menos trabajo. |
| Búsqueda | Con el volumen de tareas de un equipo de 3 a 10 personas, se encuentra todo leyendo la lista. |
| Varios equipos, espacios o personas en más de un equipo; invitaciones | Hay un único equipo de referencia. Se asume que una instalación es un equipo y que el registro abierto ya sirve para entrar. Vale para el caso de estudio, no para producción. |
| Roles y permisos | Roles planos por decisión: todo el mundo ve y edita lo mismo. |
| Presencia o actividad ("quién está conectado", indicadores de actividad) | Es vigilancia. Se rechaza a propósito: el estado es de la tarea, no de la persona. |
| Notificaciones (push, email) y resumen diario | La señal tiene que esperar, no interrumpir. El "resumen" es abrir la lista. |
| Historial o feed de actividad | El problema es el estado actual, no la auditoría de cómo se llegó a él. |
| Estado derivado de Git, PRs, CI o calendario | Es otro producto, con integraciones y OAuth de terceros. El estado lo escribe la persona que hace la tarea. |
| Importar de otro gestor o convivir con él | FlowSync sustituye al gestor. Convivir obliga a actualizar en dos sitios, y así es como muere esta categoría. |
| Sprints, estimaciones, épicas, backlog priorizado, informes | Un equipo que necesite eso no es nuestro usuario. |
| Hora y zona horaria en el vencimiento | La fecha es un día. Que con 3 husos horarios "vencida" varíe un día se acepta frente al coste de gestionar zonas horarias. |
| Chat, videollamada, edición simultánea del mismo contenido | "Tiempo real" significa ver cambios de estado sin preguntar, no colaborar en directo. |
| Recuperar contraseña y editar perfil | Hacen falta envío de emails y pantallas que no ayudan a ver el estado del equipo. La auth actual basta. |
| App móvil | El caso de uso es "abro la lista al empezar el día o al volver de una reunión", en el mismo puesto donde se trabaja. |
