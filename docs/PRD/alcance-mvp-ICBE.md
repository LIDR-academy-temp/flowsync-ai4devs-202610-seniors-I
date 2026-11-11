🅰️ Parte A: el alcance

# FlowSync — Alcance del MVP

> Alcance consensuado, cerrado el 09/11/2025. Es la base sobre la que se escribirá el PRD. Sustituye a cualquier versión previa discutida en conversación. Si algo no está aquí, no está acordado.

## Problema
- La daily de 15 min se gasta en la ronda “¿en qué estás?”.
- Dos desarrolladores pierden ~2 días/mes trabajando simultáneamente en el mismo módulo sin saberlo.
- No hay visibilidad real del estado de las tareas; la única forma de saberlo es preguntar o consultar el gestor externo.

## Usuarios
- Equipos de producto SaaS (≈6 personas) en 3 husos horarios.
- Roles planos, sin leads ni managers que necesiten reportes.
- Necesitan una herramienta rápida para ver qué está libre y qué está ocupado, sin chat ni videollamadas.

## Propuesta de valor
- Lista de tareas ultra‑ligera: crear o cambiar el estado en **dos clics**.
- Visibilidad instantánea del estado (pendiente, en progreso, bloqueada, terminada).
- Elimina la ronda de “¿en qué estás?” de la daily, reduciendo interrupciones y tiempo perdido.
- Sin configuración ni campos obligatorios más allá de los esenciales, lo que facilita la adopción inmediata.

## Alcance (MVP)

**Objetivo**  
Proveer una solución ligera para la gestión de tareas que permite crear y cambiar el estado de tareas con dos clics, ofreciendo visibilidad inmediata del estado.

**Entregibles**  
- Una herramienta ligera que permite crear y actualizar el estado de tareas con dos clics.  
- Visualización clara del estado actual de cada tarea (pendiente, en progreso, bloqueada, terminada) en una lista o tarjetas.  
- Interfaz protegida por autenticación para que solo los usuarios autorizados puedan modificar tareas.  
- Experiencia sencilla y accesible sin necesidad de configuración adicional.

**Criterios de éxito**  
- Creación y edición de estado en ≤2 clics.  
- Adopción inmediata por equipos SaaS sin configuración adicional.

## NO‑alcance (exclusiones)
- **Notificaciones push**: añadir envío de alerts implica colas, gestión de dispositivos y UI de notificación → fuera del foco “dos clics”.
- **Integración Slack**: OAuth, webhook y UI de mensajes añaden complejidad y desvían el objetivo principal.
- **Roles/permisos avanzados**: el equipo es plano; permitir que solo algunos usuarios editen o vean tareas introduce lógica de autorización y pruebas de acceso innecesarias.
- **Analítica/reporting**: generar métricas, dashboards o reportes requiere recopilar datos extra, endpoints de reporte y UI de visualización, lo que complica el MVP.
- **Comentarios en tareas**: campos de texto libre introducen validación, UI de rich‑text y lógica de conversación, rompiendo la simplicidad de “dos clics”.

🅱️ Parte B: las tres líneas
Debajo del alcance, en el mismo archivo, tres líneas anotadas. Esta parte no se puede fallar, y es la que hay que traer sí o sí.

1. Los dos números. Cuántas cosas propuso la IA meter dentro del alcance, y cuántas quedaron dentro después de tu recorte. Tal cual salieron, sin redondear ni explicar.

R// 7 y 6
Influyo que le pedí que fueran pocas

2. Tres cosas que dejaste fuera, y por qué cada una. El porqué tiene una forma concreta: qué hipótesis del producto no ayuda a validar. "No da tiempo" no vale, porque no es una decisión de producto: es una excusa de calendario, y mañana deja de ser cierta.

R// Latencia de respuesta ≤200 ms.  No era de producto ni realmente relevante para el mvp

3. La exclusión de la que menos seguro estás, y qué tendría que pasar para que entrara. Lo que interesa es qué dos cosas se contradecían: lo que te pedían contra lo que veías, lo barato contra lo que valida, lo que enamora contra lo que se puede sostener.

R// tendría que ser una metrica que el equipo ya tuviera clara con anterioridad o ser parte de un KPI activo
