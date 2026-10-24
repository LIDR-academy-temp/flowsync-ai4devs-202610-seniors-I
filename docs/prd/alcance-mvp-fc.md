# FlowSync — Alcance del MVP

> PRD de producto. Qué se construye y para quién, no cómo. Sin modelo de datos, sin endpoints, sin arquitectura.

## Tramo 1 — El terreno que ya existe

Hoy el repo solo tiene el andamiaje de **identidad**: registro, login, logout y ver el perfil propio. La única entidad de dominio es `User` (más la tabla técnica de tokens); no existe ningún concepto de tarea, equipo ni tablero. El frontend son tres pantallas (login, registro, perfil) con guardas de ruta. No hay tests. Todo lo relativo a "tareas en equipo" está por construir: el MVP se apoya en la autenticación existente y añade sobre ella la vertical de tareas.

## Tramo 2 — El interrogatorio (respuestas ya decididas)

1. **Problema real** → El dolor es la ronda de "¿en qué estás?" (daily + pings de Slack), que ocupa ≈ la mitad de los 15 min, y el trabajo duplicado por no saber qué toca otro. Los bloqueos y el resto de la daily siguen fuera.
2. **Quién cobra el valor** → Los compañeros entre sí (horizontal), no un manager. La persona que hoy pregunta o arriesga pisar el trabajo de otro.
3. **Comportamiento** → Estado tecleado a mano por quien hace la tarea, en ~2 clics. Nada inferido de Git/PR/CI/calendario. FlowSync es donde se crea el trabajo, no una capa sobre otro gestor.
4. **Qué es "tiempo real"** → Frescura del estado de la tarea, visible sin refrescar ni preguntar. No es chat, videollamada, edición simultánea ni presencia de personas. Consumo *pull*, sin notificaciones que interrumpan.
5. **Frontera del MVP** → Un único espacio compartido (sin entidad "equipo", sin multi-equipo). Vertical fina de punta a punta. Una tarea necesita título, responsable, estado y fecha de vencimiento; la lista se filtra por estado.

**Supuestos declarados** (lo que la ficha no fijaba):
- **A1** — Estados pocos y fijos, tipo *Por hacer / En curso / Hecho*, sin configurar.
- **A2** — Roles planos: cualquier miembro crea tareas y cambia estado.
- **A3** — Un solo responsable por tarea; puede quedar *sin asignar* = libre para tomar.
- **A4** — "Sin refrescar" basta con frescura del orden de segundos, no sub-segundo estricto.
- **A5** — Se reutiliza la auth existente; "espacio único" = todos los usuarios registrados comparten el mismo tablero.
- **A6** — La **fecha de vencimiento es obligatoria** (parte del mínimo de la tarea), igual que título, responsable y estado.

## Tramo 3 — El alcance en cinco bloques

### Problema
En equipos remotos pequeños nadie ve en qué trabajan los demás sin interrumpir. De ahí la ronda de "¿en qué estás?" y el trabajo duplicado (dos personas sobre el mismo módulo = días perdidos). El estado vive en la cabeza de cada uno y solo se extrae preguntando.

### Usuarios
Equipo remoto pequeño (3–10 personas), roles planos, varios husos. Valor horizontal entre compañeros, no de supervisión. Caso de estudio: equipo SaaS de 6 personas en 3 husos, hoy con gestor pesado + daily diaria.

### Propuesta de valor
Un único tablero compartido donde el trabajo se crea y su estado se mantiene a mano en dos clics, visible de un vistazo y actualizado en vivo sin refrescar ni preguntar. Entras al empezar el día o al salir de una reunión y ves qué cambió, quién tiene qué y qué está libre.

### Alcance — 5 capacidades
- **C1 — Crear tarea rápida.** Título, responsable, estado y fecha de vencimiento (los cuatro requeridos). El responsable puede quedar sin asignar (tarea libre), y cualquiera puede tomarla. Sin configuración ni campos extra.
- **C2 — Tablero compartido único.** Todas las tareas de un vistazo: quién tiene qué y qué está libre.
- **C3 — Cambiar estado en dos clics.** La acción que debe costar casi nada para que se mantenga al día.
- **C4 — Filtrar por estado.** Para centrarse en lo pendiente.
- **C5 — Actualización en vivo (frescura).** Los cambios de otros aparecen solos, sin refrescar. Es el riesgo nº1 que el MVP existe para validar.

### NO-alcance
Cada exclusión con qué hipótesis **no** ayuda a validar. Hipótesis: **H1** el estado de un vistazo sustituye la ronda; **H2** la gente mantiene el estado fresco a mano porque cuesta ~2 clics; **H3** ver qué está libre evita el trabajo duplicado.

- **Reasignación completa de responsable (pasar una tarea de persona a persona).** Basta "libre / tomada". — No valida H1 ni H3: para no pisarse basta saber qué está libre, no mover trabajo entre personas.
- **Editar una tarea ya creada (título/fecha).** Útil, no esencial. — No valida H1 ni H2: el vistazo y la frescura se prueban con crear + cambiar estado.
- **Eliminar una tarea.** Ruido, no validación. — No valida H1: una tarea de más no impide ver el estado de un vistazo.
- **Notificaciones push.** El modelo es pull; interrumpir contradice el objetivo. — No aporta a H1/H2.
- **Integración con Slack.** Devuelve el estado al chat; FlowSync debe ser donde se ve. — No valida H1 (el tablero sustituye la ronda, no otro canal).
- **Roles / permisos avanzados.** Roles planos; config contra "menos rollo que Jira". — No valida H1 ni H3.
- **Analítica y reporting.** Valor de manager, no de compañeros. — No valida H1 (hipótesis horizontal).
- **Comentarios en tareas.** Es discusión, no estado. — No valida H1 (que el estado baste para no preguntar).
- **Sprints, estimaciones, épicas, backlog priorizado.** Planificación pesada; fricción opuesta a crear/cambiar en segundos. — No valida H2 ni H1.
- **Inferencia automática de estado (Git/PR/CI/calendario).** El MVP prueba que se mantiene a mano. — Anula H2: esconde el riesgo nº1 en vez de validarlo.
- **Presencia / quién está conectado.** Frescura es de la tarea, no de la persona. — No valida H1 ("quién está online" ≠ "en qué trabaja").
- **Multi-equipo / espacios / pertenencia múltiple.** Un espacio basta para 3–10. — No aporta a ninguna hipótesis; solo añade alcance.
- **Chat / videollamada / edición simultánea.** Fuera de la definición de "tiempo real". — No valida H1.
- **Prioridades, etiquetas, subtareas, dependencias, adjuntos, fecha de inicio/recurrencia.** Campos que añaden fricción. — Van contra H2; no validan frescura ni vistazo.
- **Histórico / auditoría de cambios.** Para el vistazo basta el estado actual. — No valida H1 (es analítica retrospectiva).

---

## Parte B — Las tres líneas

1. **Los dos números.** La IA propuso **6** capacidades dentro del alcance; tras mi recorte quedaron **5**.

2. **Tres exclusiones y la hipótesis que no validan:**
   - *Reasignación completa de responsable (pasar una tarea de persona a persona)* — no valida **H3**: para evitar el trabajo duplicado basta con saber qué está "libre / tomada", no con transferir trabajo entre personas.
   - *Editar / eliminar tareas ya creadas* — no valida **H1**: el estado de un vistazo que sustituye la ronda se demuestra creando y cambiando de estado; corregir o borrar una tarea es mantenimiento del dato, no parte de la hipótesis.
   - *Notificaciones push* — no valida **H2** (ni H1): el modelo es *pull* ("entro y veo qué cambió"); empujar avisos que interrumpen contradice justo el comportamiento que el MVP quiere validar.

3. **La exclusión de la que menos seguro estoy:** *editar / eliminar una tarea ya creada*. La contradicción es entre **lo barato y obviamente útil** y **lo que de verdad valida la hipótesis**: corregir un título mal escrito o borrar una tarea duplicada cuesta casi nada y cualquiera lo daría por supuesto, pero ninguna de las dos cosas demuestra que el equipo deje la ronda de "¿en qué estás?" —eso se prueba creando tareas y cambiándoles el estado de un vistazo—. Me incomoda cortarla porque roza la credibilidad del producto: un tablero donde no puedes arreglar un error se siente roto, aunque la hipótesis no lo necesite. Entraría en cuanto el MVP sobreviva a la semana de prueba y aparezca fricción real por tareas mal creadas o duplicadas; en ese momento deja de ser alcance de más y pasa a ser mantenimiento del dato, que es otra conversación.
