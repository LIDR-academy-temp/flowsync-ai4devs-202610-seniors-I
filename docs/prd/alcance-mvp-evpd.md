# FlowSync — Alcance del MVP

> Visión de partida: que un equipo remoto sepa en qué está cada uno sin reuniones de sincronización. Tareas compartidas, más en tiempo real y con menos rollo que Jira.

---

## 1. El terreno que ya existe

### Capabilities construidas

Hoy FlowSync es **solo una cuenta de usuario con sesión**. No hay nada del dominio (tareas, estados, equipo).

| Capability | Backend | Frontend |
|---|---|---|
| Registro | `POST /api/v1/auth/signup` (nombre admite `null` pero la clave debe ir en el payload, email único, contraseña 8–32 + confirmación) | `/register` |
| Login | `POST /api/v1/auth/login` → access token opaco | `/login`; token en `localStorage` (`flowsync.token`) |
| Ver perfil propio | `GET /api/v1/account/profile` (protegida) | `/profile`, y rehidratación de sesión al arrancar |
| Logout | `POST /api/v1/account/logout` (revoca el token) | botón en perfil |

Piezas transversales ya resueltas y reutilizables:

- **Auth por access token** (guard `api` por defecto) y guards de ruta en el frontend (`ProtectedRoute`, `PublicOnlyRoute`).
- **Envoltorio de respuesta** `{ data }` vía `serialize()` + transformers, y traducción de errores de validación/auth a mensajes en castellano por campo (`lib/api.ts`).
- **Validación** con VineJS, con builders de campo compartidos.
- **UI base**: Tailwind v4 + shadcn/ui (`alert`, `button`, `card`, `input`, `label`).

Lo que **no** existe: ninguna entidad de trabajo, ningún mecanismo de actualización sin refrescar, ningún listado de usuarios, y ningún test (no hay `tests/unit` ni `tests/functional`; el frontend no tiene runner).

### Modelo de datos actual

Dos tablas, ambas de autenticación:

```
users
  id            PK
  full_name     nullable
  email         único, not null
  password      hash, not null
  created_at / updated_at

auth_access_tokens
  id            PK
  tokenable_id  FK → users.id (ON DELETE CASCADE)
  type, name, hash, abilities
  created_at / updated_at / last_used_at / expires_at
```

El modelo `User` añade un getter `initials` (útil para pintar al responsable de una tarea en una lista densa). No hay entidad "equipo" ni "espacio": todo usuario registrado es igual a cualquier otro, lo que encaja con el espacio único y los roles planos del MVP.

---

## 2. El interrogatorio

Las cinco preguntas que más incertidumbre quitan, en una sola ronda. Debajo de cada una, la respuesta que da la ficha de hechos.

**1. ¿Qué duele hoy, en concreto, y qué decisión cambia si se resuelve?**
Duele la ronda de "¿en qué estás?" (media daily) y las interrupciones por chat; el episodio real son dos personas que tocaron el mismo módulo la misma semana: dos días perdidos. La decisión que cambia: *no empezar lo que otro ya está tocando y elegir lo siguiente sabiendo qué está libre*.

**2. ¿Quién cobra el valor y quién paga el coste de mantener el estado al día?**
Los pares, no un lead. Paga quien hace la tarea (lo teclea él), y cobra en el momento: la lista es su cola de trabajo y deja de recibir interrupciones. Si el beneficio fuera solo para los demás, no lo escribiría.

**3. ¿Qué significa "tiempo real" y qué forma tiene la señal?**
Ver los cambios de estado de las tareas sin refrescar ni preguntar. Frescura de la tarea, no presencia de la persona. Un resumen que espera ("vuelvo y veo qué se ha movido"), no un aviso que interrumpe.

**4. ¿FlowSync convive con el gestor de tareas actual o lo sustituye?**
Lo sustituye. Crea sus propias tareas y no lee de otro sitio; convivir obliga a doble actualización y así muere esta categoría. Renuncia explícita a sprints, estimaciones, épicas, backlog priorizado e informes.

**5. ¿Cómo sabremos en una semana si ha funcionado?**
El equipo cancela la ronda de "¿en qué estás?" de la daily y nadie pide que vuelva. Riesgo #1 a validar: que la información se quede vieja.

---

## 3. El alcance en cinco bloques

### Problema

En un equipo remoto pequeño nadie ve el estado del trabajo sin interrumpir a alguien. El coste se paga dos veces: en sincronización (la mitad de una daily de 15 minutos se va en "¿en qué estás?", más los pings por chat) y en trabajo duplicado cuando dos personas empiezan lo mismo sin saberlo. Los gestores pesados no lo arreglan porque actualizarlos cuesta más de lo que devuelve, así que el estado está desfasado y se vuelve a preguntar.

Lo que este MVP **no** resuelve, dicho claro: la parte de bloqueos de la daily sigue existiendo.

### Usuarios

- **Equipos remotos de 3–10 personas**, roles planos: todos ven y editan lo mismo.
- **Caso de estudio** (no cliente real): equipo de producto SaaS de 6 personas en 3 husos horarios, con un gestor de tareas pesado y una daily de 15 minutos por videollamada.
- Dos momentos de uso:
  - **El que va a coger algo**: mira qué está libre y qué ya está cogido antes de empezar.
  - **El que vuelve** (por la mañana o tras una reunión): mira qué se ha movido desde la última vez.
- **No es usuario**: un manager que quiera reportes, ni un equipo que necesite sprints, estimaciones o épicas.

### Propuesta de valor

> Sabe quién está en qué y qué queda libre de un vistazo, sin preguntar y sin reunión. Actualizarlo son dos clics sobre la lista que ya usas para decidir qué coges.

Lo que la diferencia de un gestor pesado no es tener más, sino tener lo justo: crear una tarea o cambiarle el estado lleva segundos, sin más campo obligatorio que el título y sin configuración, y los cambios de los demás aparecen solos.

### Alcance (una única vertical, terminada de punta a punta)

**Capability: el tablero compartido de tareas, vivo.**

1. **Un espacio único compartido.** Cualquier usuario autenticado ve todas las tareas. Se reutiliza el registro/login que ya existe.
2. **Crear una tarea en segundos.** Solo el título es obligatorio. Responsable, estado y fecha de vencimiento son opcionales, con valores por defecto sensatos.
3. **Una tarea tiene título, responsable, estado y fecha de vencimiento.** Nada más editable por el usuario; el sistema solo guarda quién y cuándo la cambió por última vez.
4. **Cambiar estado y responsable en dos clics desde la propia lista**, sin abrir un formulario. "Cogerla yo" es un clic.
5. **Editar y borrar** una tarea (cualquier miembro, roles planos), para corregir errores.
6. **Ver de un vistazo quién está en qué y qué está libre**: cada fila muestra responsable (o "libre"), estado, vencimiento resaltado si se ha pasado, y cuándo y quién la cambió por última vez.
7. **Filtrar por estado** para centrarse en lo pendiente.
8. **Cambios sin refrescar**: lo que otro cambia aparece en tu lista abierta sin recargar ni preguntar.
9. **"Qué se ha movido"**: al volver, las tareas cambiadas desde tu última visita se ven marcadas. Un resumen que espera, no un aviso.

Criterio de terminado: el caso de estudio puede sustituir la ronda de "¿en qué estás?" con esta pantalla durante una semana.

### NO-alcance

Recorte agresivo. Cada exclusión con su porqué:

| Fuera | Por qué |
|---|---|
| Notificaciones push / email | La señal es un resumen que espera, no un aviso que interrumpe. Notificar recrea la interrupción que queremos quitar. |
| Integración con Slack | Es otro canal más que mantener y otro sitio donde preguntar. El valor está en no tener que ir a Slack. |
| Roles y permisos avanzados | Equipos de 3–10 con roles planos: la jerarquía no resuelve ningún dolor de la ficha y añade configuración. |
| Analítica / reporting / informes | Nadie cobra un reporte hacia arriba; al manager le da igual. Renuncia explícita. |
| Comentarios en tareas | Convierten la tarea en conversación y FlowSync en chat. Lo que se discute, se discute donde ya se hace. |
| Presencia ("quién está conectado", actividad) | Es vigilancia y se rechaza a propósito. El estado es de la tarea, no de la persona. |
| Varios equipos / espacios, o gente en más de uno | La frontera es un único espacio compartido. Multiequipo es otra capa (pertenencia, invitaciones, aislamiento). Queda como supuesto. |
| Derivar el estado de Git/PRs, CI o calendario | Es otro producto, con integraciones y OAuth de terceros. El estado lo teclea quien hace la tarea. |
| Importar/sincronizar con el gestor actual | FlowSync sustituye, no convive. Sincronizar obliga a doble actualización. |
| Sprints, estimaciones, épicas, backlog priorizado | Renuncia explícita. Un equipo que lo necesite no es nuestro usuario. |
| Estados o campos configurables | "Menos rollo que Jira" es precisamente no tener flujos de configuración. |
| Descripción larga, adjuntos, etiquetas, subtareas | No cambian la decisión "¿lo cojo o ya está cogido?". Cada campo extra encarece actualizar, que es el riesgo #1. |
| Bloqueos y dependencias | La parte de bloqueos de la daily sigue; este MVP no la resuelve y no lo finge. |
| Colaboración simultánea sobre un mismo documento | "Tiempo real" es frescura del estado, no co-edición. |
| Historial / auditoría de cambios | Basta con "último cambio, quién y cuándo". El histórico completo es infraestructura para reporting, que está fuera. |
| Búsqueda de texto, ordenaciones avanzadas, vistas guardadas | Con 3–10 personas la lista cabe en una pantalla; el filtro por estado basta. |
| Invitaciones y gestión de miembros | Con espacio único, registrarse ya es entrar. |
| Recuperación de contraseña, edición de perfil | No tocan el dolor. Se gestiona a mano en el caso de estudio. |
| App móvil nativa, modo offline | El uso es "llego y miro" desde el puesto de trabajo. Web responsive es suficiente. |

---

## Supuestos (decididos por mí, no cubiertos por la ficha)

1. **Estados fijos y únicos: `Por hacer` · `En curso` · `Hecho`.** Tres bastan para "quién está en qué"; no son configurables.
2. **Solo el título es obligatorio.** Es una desviación consciente del "sin campos obligatorios" literal: una tarea sin título no se puede reconocer en la lista. Por defecto, la tarea nace en `Por hacer`, sin responsable y sin fecha.
   - **"Libre" = `Por hacer` y sin responsable.** Es lo único que se ofrece para coger.
   - **Pasar a `En curso` una tarea sin responsable te la asigna a ti.** Así ninguna tarea `En curso` se queda sin dueño, que es justo el caso que hay que evitar ("no empezar lo que otro ya está tocando"). No hace falta rellenar nada.
   - **Una tarea `Hecho` sin responsable se muestra sin dueño**, no como "libre".
3. **Fecha de vencimiento es un día, sin hora.** Se considera vencida cuando la fecha ya ha pasado en la zona horaria de quien mira y la tarea no está `Hecho`. Con 3 husos horarios, una tarea puede verse vencida antes para unos que para otros; se acepta.
4. **Responsable: como mucho una persona** por tarea, elegida entre los usuarios registrados.
5. **Registro abierto = miembro del espacio.** Al no haber entidad "equipo", cualquiera que se registre ve y edita todo. Aceptable para un caso de estudio; inaceptable para un cliente real, y es lo primero que cambia cuando se salga del caso de estudio.
6. **Cualquier miembro puede editar y borrar cualquier tarea**, sin papelera ni deshacer (coherente con roles planos).
7. **"Sin refrescar" tolera unos segundos de retraso.** Frescura de segundos, no de milisegundos: lo que importa es no tener que preguntar ni recargar. Basta con que la lista abierta se actualice sola cada pocos segundos; el mecanismo concreto se decide en diseño. Es la pieza nueva más cara del MVP, porque hoy no hay nada parecido, y si encarece la vertical se recorta antes que el resto.
8. **"Qué se ha movido" se calcula por persona y por navegador.** "Última visita" significa la última vez que tuviste la lista abierta en ese navegador.
   - No se sincroniza entre dispositivos y se pierde si borras los datos del navegador. Se acepta porque el caso de uso es "vuelvo a mi puesto y miro".
   - Si el caso de estudio usa varios dispositivos, es lo primero que habría que mover a servidor.
   - Al no haber historial, la marca dice que una tarea cambió, no cuántas veces ni de qué a qué. Una tarea que cambió y volvió a su estado original sigue saliendo marcada, porque se compara la fecha del último cambio, no el contenido.
9. **La lista por defecto muestra lo no terminado** (`Por hacer` + `En curso`); `Hecho` se ve con el filtro.
10. **Dos personas cambian la misma tarea a la vez: gana el último cambio.** Esto es concurrencia sobre un registro, no co-edición. Con equipos pequeños y cambios de dos clics, la colisión es rara y el coste de resolverla bien no compensa en el MVP.
11. **Idioma de la interfaz: castellano**, en línea con lo ya construido.
12. **Riesgo #1 (información vieja) se mide, no se fuerza**: en la semana de prueba se observa si la lista refleja lo que la gente dice en la daily. No hay recordatorios ni obligación de actualizar.
