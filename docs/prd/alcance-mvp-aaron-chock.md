# Alcance MVP — FlowSync: Tareas Compartidas en Tiempo Real

---

## 1. El terreno que ya existe


FlowSync tiene auth funcional: signup, login, perfiles de usuario, y acceso por token. Backend AdonisJS 7 + Lucid 22 con modelo User, middlewares protegidos, validación VineJS. Frontend React 19 + Vite con rutas protegidas, contexto de auth en localStorage, API client centralizado, Tailwind v4 + shadcn/ui. La estructura de migraciones→schema generado→modelo→validators→controller→transformer→serializer está lista. **No hay tareas aún.** El modelo de datos es de solo usuarios, sin entidad task.

---

## 2. Interrogatorio: 5 preguntas clave

La IA preguntó y obtuve respuestas claras (ficha de hechos en README, líneas 132–161):

**P1. ¿Qué estados debe ciclar una tarea?**  
R: `pending` → `in_progress` → `done`. Tres estados simples, sin workflow configurable.

**P2. ¿Las tareas completadas quedan visibles o se archivan?**  
R: Quedan visibles, filtrables por estado. No hay soft delete automático.

**P3. ¿Es la fecha de vencimiento requerida u opcional?**  
R: Obligatoria. Es la única forma de ver qué se pasó de plazo de un vistazo.

**P4. ¿Quién puede editar las tareas de quién?**  
R: Roles planos. Todos ven y editan todo, sin restricción por responsable.

**P5. ¿De dónde sale el estado: manual, derivado de Git/CI, o integrado?**  
R: Manual. Lo escribe la persona en 2 clics. Sin derivación de señales externas (ese es otro producto).

---

## 3. Alcance en 5 bloques

### Problema
Dailys de 15 minutos donde media ronda es "¿en qué estás?". Dos devs descubren tarde que iban al mismo módulo (2 días perdidos). Interrupciones Slack constantes. **Causa raíz:** nadie ve el estado sin interrumpir.

### Usuarios
Equipos remotos pequeños (3–10 personas), roles planos. Caso de estudio: 6 devs de SaaS en 3 husos horarios. No hay reportes hacia arriba; los que cobran valor son los pares.

### Propuesta de valor
Una lista compartida donde cada uno escriba en 2 clics qué está haciendo y en qué estado. Visible sin refrescar ni preguntar: llego por la mañana, veo qué se movió. La daily pierde la ronda de estado porque ya está en la app. Decides qué coger después sabiendo qué está libre. **No es Jira:** crear tarea + cambiar estado sin campos obligatorios ni flujos de workflow.

### Alcance (qué entra)
- **Modelo Task:** título, responsable (User), estado (pending/in_progress/done), fecha vencimiento, descripción opcional, createdAt/updatedAt.
- **Backend:** migración, modelo, 2 validadores (create, update), controller (crear, listar, actualizar estado/fecha/descripción), transformer, 3 rutas protegidas.
- **Frontend:** página de tareas con pestañas de filtro por estado, lista de tareas, tarjeta con selector de estado inline, modal crear tarea, API client methods (getTasks, createTask, updateTask).
- **Estado real:** polling 30s. Optimistic updates en create/update. Sin socket.io, sin notificaciones push.
- **Edición permitida:** todos pueden cambiar estado + fecha + descripción de cualquier tarea. Crear solo asignada a self (MVP).
- **Scope:** un espacio único compartido, sin entidad "equipo". 

### NO-alcance (qué sale)
- **Integraciones externas:** Git, PRs, CI, calendario (son otro producto, exigen OAuth).
- **Roles y permisos avanzados:** MVP es roles planos, todo el mundo edita todo. Restricciones por responsable salen después.
- **Soft delete:** no hay papelera. Done = hecho, visible pero faded, sin eliminar.
- **Notificaciones:** ni push, ni email, ni Slack. Resumen que consultas, no aviso que interrumpe.
- **Múltiples equipos o usuarios con múltiples equipos:** un espacio único compartido. Varios equipos quedan fuera.
- **Sprints, estimaciones, épicas, backlog priorizado, reporting:** no hay. "Menos rollo que Jira" = crear + cambiar estado, nada más.
- **Comentarios, adjuntos, repetición de tareas, búsqueda:** vertical fina usable, no andamiaje.
- **Validación por integraciones:** no sincroniza estado con Git/PRs/CI. Manual, 2 clics.

---

## Parte B: Las tres líneas

**1. Números de recorte:**
- Items que la IA propuso entrar: **14**
- Items que quedaron dentro después de mi recorte: **8**

**2. Tres exclusiones y su porqué:**

- **Soft delete / papelera**: ¿Qué hipótesis valida? Ninguna. Las tareas Done quedan visibles (faded) como prueba de historial. Si cometemos un error con una tarea, el costo es reeditar una línea. Si el problema fuera "me arrepiento de tareas antiguas", lo validaríamos con métricas después de week 1.

- **Seleccionar múltiples usuarios en crear tarea**: ¿Qué hipótesis valida? Que un solo responsable es suficiente. MVP asigna a self; si el problema real es "no sé a quién asignar esto", lo sabremos en la sesión de feedback.

- **Notificaciones push / Slack**: ¿Qué hipótesis valida? Que "ver los cambios sin refrescar" es suficiente señal. Si la gente de 3 husos horarios deja pasar las updates porque no les llega aviso, lo veremos. Por ahora polling 30s es el trade-off.

**3. La exclusión de la que menos seguro estoy:**

**Derivar estado de Git/CI** (Pull Requests abiertos = "in_progress", PR merged = "done"). 

¿Por qué dudé? Porque eliminaría el roce de los 2 clics: estaría automático. Sentiría más "real-time". Y "qué estás haciendo" alineado con "qué código corre" es una validación fuerte.

¿Por qué la dejé fuera? La ficha dice claro: es otro producto con OAuth de terceros. Doble verdad de fuente (tarea + PR status) es deuda técnica al día 1. Y si resulta que la gente abre tareas pero nunca hace PR, nos enteramos en week 1. Mientras, MVP = manual = controlado.

**Lo que tendría que pasar para entrar:** que en la sesión de feedback alguien diga "me puse a actualizar estado a mano y olvidé", o "el issue y la tarea no casaban". Si pasa, el MVP probó que manual no se sostiene.

---
