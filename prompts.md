# Prompts

Aquí van **todos los prompts que lanzaste** para hacer el ejercicio, en el orden en que los
lanzaste, con el modelo y la herramienta de cada uno.

Esto no es papeleo. Lo que se revisa es **cómo pediste las cosas**, no solo lo que salió: un
resultado flojo con un prompt bueno y un resultado flojo con un prompt vago necesitan feedback
distinto, y sin este archivo no se distinguen.

---

## Prompt 1

**Modelo:** Gemini 4 Argon
**Herramienta:** Antigravity CLI (agy)

```
revisa el proyecto y dime que funcionalidades (capabilities) existen y como es el modelo de datos actual.
```

**Qué salió:**

````
El proyecto FlowSync es actualmente una base de arranque (starter kit en la rama base de la aplicación de gestión de tareas en equipo) estructurada como un monorepo con dos paquetes independientes: Backend (AdonisJS 7 + Lucid 22 + SQLite + VineJS 4) y Frontend (React 19 + Vite 8 + Tailwind v4 + shadcn/ui).

Actualmente, solo existe el módulo de Autenticación y Perfil de Usuario; todavía no se han creado entidades ni pantallas para tareas, proyectos o equipos.
──────
## 1. Funcionalidades Actuales (Capabilities)

### A. Backend (http://localhost:3333)

Todas las rutas de negocio están agrupadas bajo /api/v1 en routes.ts y envuelven sus respuestas en { data: ... } mediante el serializer inyectado en el HttpContext (excepto logout y el healthcheck raíz GET /):

 Funcionalidad               | Endpoint                    | Controlador / Acción           |   Auth    | Comportamiento y Reglas
-----------------------------|-----------------------------|--------------------------------|-----------|-------------------------------------------------------
 Registro de cuenta (Signup) | POST /api/v1/auth/signup    | NewAccountController.store     |    No     | Valida con signupValidator (fullName nullable, email único máx. 254 chars, password 8–32 chars y passwordConfirmation idéntico). Crea el usuario, emite un token opaco (oat_...) y devuelve { data: { user, token } }.
 Inicio de sesión (Login)    | POST /api/v1/auth/login     | AccessTokensController.store   |    No     | Valida formato con loginValidator, verifica credenciales con User.verifyCredentials(), genera un nuevo token de acceso y devuelve { data: { user, token } }.
 Consulta de perfil          | GET /api/v1/account/profile | ProfileController.show         |    Sí     | Requiere el guard api. Devuelve el usuario autenticado transformado por UserTransformer dentro de { data: User }.
 Cierre de sesión (Logout)   | POST /api/v1/account/logout | AccessTokensController.destroy |    Sí     | Revoca en base de datos el token actual (currentAccessToken) y responde { message: 'Logged out successfully' }.

### B. Frontend (http://localhost:5173)

• Gestión de sesión (AuthProvider): Persiste el Bearer token en localStorage bajo la clave flowsync.token y rehidrata la sesión al arrancar consultando GET /api/v1/account/profile.
• Cliente HTTP y traducción de errores (api.ts): Centraliza las 4 llamadas (signup, login, getProfile, logout), desenvuelve { data } y traduce los errores de validación de VineJS (422), credenciales (400) y sesión expirada (401) a instancias de ApiError en español con errores desglosados por campo (fieldErrors).
• Rutas y Pantallas (AppRoutes):
    • Rutas públicas (PublicOnlyRoute): /login (LoginPage) y /register (RegisterPage). Si ya hay sesión activa, redirigen a /profile.
    • Rutas protegidas (ProtectedRoute): /profile (ProfilePage), que muestra avatar con iniciales, nombre completo, email, fecha de alta ("Miembro desde") y botón para cerrar sesión.
    • Catch-all (*): Redirige a /profile.

──────
## 2. Modelo de Datos Actual
La base de datos es SQLite (backend/tmp/db.sqlite3). En AdonisJS 7 + Lucid 22, las migraciones generan automáticamente schema.ts, del cual extienden los modelos.
Actualmente existen 2 tablas en la base de datos y 1 modelo de dominio:
  📊 Diagram (unsupported type)
  ──────────────────────────────
  erDiagram
      users ||--o{ auth_access_tokens : "tokenable_id (CASCADE)"
      users {
          int id PK "AUTOINCREMENT, NOT NULL"
          string full_name "NULLABLE"
          string email "VARCHAR(254), NOT NULL, UNIQUE"
          string password "NOT NULL (hashed)"
          timestamp created_at "NOT NULL"
          timestamp updated_at "NULLABLE"
      }
      auth_access_tokens {
          int id PK "AUTOINCREMENT"
          int tokenable_id FK "UNSIGNED, NOT NULL -> users.id"
          string type "NOT NULL"
          string name "NULLABLE"
          string hash "NOT NULL"
          text abilities "NOT NULL"
          timestamp created_at "NULLABLE"
          timestamp updated_at "NULLABLE"
          timestamp last_used_at "NULLABLE"
          timestamp expires_at "NULLABLE"
      }

### Detalle de Entidades y Serialización

1. Tabla users (1761885935168_create_users_table.ts → UserSchema → Modelo User)
    • Columnas: id, fullName (string | null), email (string, único), password (string, oculto en serialización con serializeAs: null y hasheado automáticamente mediante el mixin withAuthFinder(hash)), createdAt (DateTime), updatedAt (DateTime | null).
    • Propiedad calculada (Getter): initials — calcula 2 letras en mayúsculas a partir de fullName (o de email si no tiene nombre).
    • Contrato de salida API (UserTransformer / tipo User en frontend): expone exactamente { id, fullName, email, createdAt, updatedAt, initials }.
2. Tabla auth_access_tokens (1768620764696_create_access_tokens_table.ts → AuthAccessTokenSchema)
    • Gestionada por DbAccessTokensProvider.forModel(User) en User.accessTokens.
    • Clave foránea tokenable_id apuntando a users.id con borrado en cascada (ON DELETE CASCADE).
````

---

## Prompt 2

**Modelo:** Gemini 4 Argon
**Herramienta:** Antigravity CLI (agy)

```
resumelo en 3-5 lineas.
```

**Qué salió:**

```
FlowSync cuenta actualmente solo con el módulo base de autenticación y perfil de usuario (sin entidades de tareas ni equipos aún), dividido en un backend AdonisJS 7 (routes.ts) y un frontend React 19 (app-routes.tsx).
Sus 4 funcionalidades son: registro (POST /api/v1/auth/signup), login (POST /api/v1/auth/login), consulta de perfil (GET /api/v1/account/profile) y logout (POST /api/v1/account/logout), con vistas de /login, /register y /profile.
El modelo de datos en SQLite (schema.ts) tiene únicamente 2 tablas: users (id, full_name, email único, password hasheado, timestamps y getter initials) y auth_access_tokens (tokens Bearer opacos asociados a users.id con borrado en cascada).
```

---

## Prompt 3

**Modelo:** Gemini 4 Argon
**Herramienta:** Antigravity CLI (agy)

```
Me piden solucionar el siguiente problema:  "Quiero que FlowSync sea una herramienta para que los equipos remotos sepan en qué está trabajando cada uno sin tener que hacer reuniones de sincronización. Algo tipo tareas compartidas pero más en tiempo real y menos rollo que Jira.". Antes de proponer soluciones, idea 5 preguntas que más reducirían la inceridumbre sobre el problema, los usuarios y el alcance. Debes hacerlo en una sóla ronda y tienes prohibido bajar al modelo de datos o a los endpoints.
```

**Qué salió:**

```
Para acotar el problema, entender cómo trabajan los usuarios y fijar el alcance de esta primera versión sin caer en la complejidad de Jira, estas son las 5 preguntas clave:

1. Foco en la persona (standup asíncrono) vs. Foco en el trabajo (tablero compartido): Cuando alguien entra a FlowSync para no hacer una reunión, ¿qué necesita responder de un vistazo: "¿en qué está enfocado cada compañero ahora mismo y si tiene algún bloqueo?" (centrado en las personas y su día) o "¿qué tareas del equipo están pendientes, en curso y terminadas?" (un listado/tablero común del que la gente va tomando trabajo)?
2. Estructura de equipo y visibilidad: ¿Todos los usuarios que entran en FlowSync forman parte de un único equipo compartido donde todos ven y editan todo por igual, o necesitan agruparse en distintos equipos/espacios privados o tener roles diferenciados (ej. líder vs. miembro)?
3. Ciclo de vida y caducidad de las tareas ("menos rollo que Jira"): ¿Cuál es el recorrido mínimo de una tarea (por ejemplo, solo Pendiente → En curso → Hecho, ¿o hace falta un estado de Bloqueado?) y qué pasa con el límite de tareas "En curso" por persona o con las tareas terminadas al pasar los días?
4. Expectativa real de "en tiempo real": Cuando hablas de que sea "más en tiempo real", ¿significa que si un compañero cambia de tarea o se bloquea yo debo verlo cambiar al instante en mi pantalla en vivo (sin recargar la página), o te refieres a que el estado esté siempre vivo durante el día en lugar de ser una foto fija de una reunión matutina?
5. Frontera del alcance para la primera entrega (qué dejamos fuera): Para mantener la herramienta ultraligera, ¿confirmamos que en esta primera versión quedan fuera estimaciones, fechas límite, subtareas, etiquetas, hilos de comentarios y notificaciones externas, o hay alguno de esos elementos que sea indispensable desde el día uno?
```

---

## Prompt 4

**Modelo:** Gemini 4 Argon
**Herramienta:** Antigravity CLI (agy)

````
Toma el texto del siguiente párrafo como la respuesta a tus preguntas. si algo de lo que preguntaste no te lo aclara, decidelo tu y marcalo como "[Supuesto]". Redacta la propuesta en 5 bloques:  [Problema], [Usuarios], [Propuesta de valor], [Alcance], [NO-alcance]. Debes ser agresiva recortando y justificando cada exclusión del NO-alcance. sigue sin incluír tablas de BD ni endpoints.

Párrafo:
```
- Qué duele hoy: la daily de sincronización y el "¿en qué estás?" constante por Slack/chat. Nadie ve el estado del equipo sin interrumpir a alguien.
- Quién cobra el valor: los pares, no un lead. No hay reporte hacia arriba y a un manager le daría igual. Duele a los dos devs que descubren tarde que iban a lo mismo, y al que interrumpe a otro para preguntar.
- Episodio concreto: dos personas del equipo tocaron el mismo módulo la misma semana porque una empezó sin que la otra lo supiera. Dos días perdidos.
- Qué reunión desaparece (respuesta honesta, no la vendas de más): la daily NO desaparece entera. Desaparece la ronda de "¿en qué estás?", que hoy se come la mitad de los 15 minutos. La parte de bloqueos sigue, y este MVP no la resuelve.
- Usuarios / equipo: equipos remotos pequeños, 3–10 personas. Roles planos: en el MVP todos ven y editan lo mismo, sin jerarquía de permisos.
- Primer usuario concreto: equipo de 6 personas de producto SaaS, en 3 husos horarios, que hoy usa un gestor de tareas pesado y una daily de 15 minutos por videollamada. Es un CASO DE ESTUDIO, no un cliente real.
- Fronteras: un espacio único compartido, sin entidad "equipo". Varios equipos separados, o gente en más de uno, queda FUERA del MVP: se anota como supuesto en el PRD, no se construye.
- "Tiempo real" = ver los cambios de estado de las tareas sin refrescar ni preguntar. NO es chat, NO es videollamada, NO es colaboración simultánea sobre el mismo documento.
- Es frescura, no presencia: el estado es de la TAREA, no de la persona. Nada de "quién está conectado ahora" ni indicadores de actividad; eso es vigilancia y lo rechazamos a propósito.
- Forma de la señal: resumen que espera, no aviso que interrumpe. El caso es "llego por la mañana o vuelvo de una reunión y veo qué se ha movido". Sin notificaciones push.
- Qué decisión cambia: no empezar algo que otra persona ya está tocando, y elegir lo siguiente sabiendo qué está libre. Si la única respuesta fuera "sentirse informado", el tiempo real no valdría lo que cuesta.
- De dónde sale el estado: lo teclea la persona que hace la tarea, en segundos. Derivarlo de señales externas (Git/PRs, CI, calendario) está FUERA del MVP: es otro producto, con integraciones y OAuth de terceros.
- Por qué se sostiene: no porque sea más agradable, sino porque son dos clics sobre una lista ya abierta, sin campos obligatorios, sin decidir sprint ni estimación. Y quien lo escribe cobra en el momento: esa misma lista es su cola de trabajo, la mira para decidir qué coge, y de paso deja de recibir interrupciones preguntándole cómo va. Si el beneficio fuera solo para los demás, no lo escribiría.
- Si la información se queda vieja: el producto pierde el sentido, y lo asumo. Es el riesgo #1 a validar, no un detalle. La mitigación es que actualizar cueste dos clics, no obligar a nadie.
- Es donde se hace el trabajo, no donde se cuenta: sustituye al gestor de tareas, no convive con él. FlowSync crea las tareas, no lee las de otro sitio. Convivir exigiría doble actualización, que es como muere esta categoría.
- Renuncia explícita a sprints, estimaciones, épicas, backlog priorizado e informes. Un equipo que necesite eso no es nuestro usuario.
- "Menos rollo que Jira" = crear una tarea y cambiarle el estado en segundos, sin flujos de configuración ni campos obligatorios. Lo mínimo para saber quién está en qué.
- Qué necesita una tarea en el MVP: título, responsable, estado y fecha de vencimiento. La fecha, para ver de un vistazo qué se ha pasado de plazo.
- Cómo se consume la lista: filtrando por estado, para centrarse en lo pendiente.
- Éxito para el usuario: dejar de hacer la ronda de "¿en qué estás?" de la daily porque el estado del equipo se ve de un vistazo.
- Criterio a una semana de uso real: que el equipo cancele esa ronda y nadie pida que vuelva. Si la siguen haciendo igual, no funcionó.
- Cuánto construir: una vertical fina y usable de punta a punta, no el andamiaje amplio de un producto. Prefiero una capability terminada a tres a medias.
```

Y lo que ya está decidido que queda **fuera** del MVP, por si la IA empuja funcionalidades:

```
- Fuera del MVP: notificaciones push, integración con Slack, roles/permisos avanzados, analítica/reporting, comentarios en tareas.
```
````

**Qué salió:**

```
### [Problema]
En equipos remotos pequeños, nadie sabe en qué está trabajando el resto sin interrumpir por chat ("¿en qué estás?") o esperar a la reunión diaria de sincronización (daily), donde la ronda de actualización de estado consume la mitad de los 15 minutos. Esta falta de visibilidad asíncrona provoca dos costes directos entre pares: interrupciones constantes que rompen el foco y trabajo duplicado o colisiones (como dos desarrolladores tocando el mismo módulo la misma semana sin saberlo, perdiendo días de trabajo). Los gestores tradicionales tipo Jira fracasan en resolver esto porque imponen tanta fricción de campos y configuración que la información deja de actualizarse y pierde frescura.
──────
### [Usuarios]
• Perfil de equipo: Equipos remotos pequeños de producto o ingeniería (de 3 a 10 personas; caso de estudio base: 6 personas distribuidas en 3 husos horarios).
• Quién captura el valor: Los pares individuales (desarrolladores/makers) que necesitan saber qué está libre para elegir su siguiente tarea sin pisar el trabajo de otro y sin sufrir interrupciones por chat. No está orientado a managers ni a generar reportes hacia arriba.
• Modelo de relación y permisos: Estructura 100 % plana. [Supuesto] Toda persona registrada en la instancia pertenece a un único espacio de trabajo compartido y tiene exactamente los mismos permisos para ver, crear y modificar cualquier tarea.
──────
### [Propuesta de valor]

FlowSync sustituye al gestor de tareas pesado por una lista de trabajo compartida, ultraligera y actualizada en vivo (sin refrescar la página), donde crear una tarea o cambiar su estado cuesta dos clics y cero campos burocráticos.
• Quien ejecuta la tarea la mantiene al día por interés propio: esa misma lista es su cola de trabajo personal y actualizarla le ahorra responder mensajes de seguimiento.
• Quien empieza su jornada o sale de una reunión ve de un vistazo qué está tocando cada compañero, qué está libre y qué ha vencido, permitiendo eliminar por completo la ronda de "¿en qué estás?" de la daily (dejando la reunión únicamente para resolver bloqueos).
• Criterio de éxito (a 1 semana): Que el equipo cancele la ronda de estado de la daily y nadie pida que vuelva.
──────
### [Alcance]
Una única vertical funcional terminada de punta a punta sobre un espacio compartido único:
1. Gestión ultraligera de tareas: Creación y edición rápida de tareas con solo 4 atributos: título, estado, responsable y fecha de vencimiento. [Supuesto] Solo el título es obligatorio al crear la tarea (el estado nace por defecto en Pendiente, y tanto el responsable como la fecha de vencimiento son opcionales para no frenar la captura rápida en dos segundos).
2. Ciclo de vida cerrado de 3 estados (sin bloqueos): [Supuesto] El flujo se cierra estrictamente en tres estados: Pendiente, En curso y Completada, cambiables con un clic directo desde la lista, y sin límite artificial (WIP limit) de tareas En curso por persona para no introducir burocracia de reglas.
3. Señal visual de vencimiento: Indicador visual directo en la lista cuando la fecha de vencimiento de una tarea no completada ya ha pasado.
4. Consumo filtrado y limpieza cognitiva: Filtro rápido por estado para centrarse en lo pendiente o en lo que está en curso. [Supuesto] Las tareas Completadas no se archivan ni se borran automáticamente con el paso de los días; simplemente quedan ocultas al filtrar por trabajo activo y siguen accesibles al filtrar por completadas.
5. Frescura en tiempo real (sin refrescar): Cualquier creación o cambio de estado/asignación realizado por un miembro se refleja automáticamente en la pantalla abierta del resto del equipo sin necesidad de recargar el navegador.
──────
### [NO-alcance]

Recorte agresivo para proteger la regla de "actualizar en dos clics" y evitar que FlowSync muera por fricción o doble mantenimiento:

• Entidad "Equipo", múltiples espacios de trabajo y roles/permisos avanzados: Fuera. Para un equipo plano de 3–10 personas, gestionar organizaciones, invitaciones por equipo o jerarquías de permisos es andamiaje administrativo que retrasa validar si la lista compartida elimina la ronda de la daily.
• Estado de "Bloqueado" y gestión de impedimentos: Fuera. La parte de bloqueos de la daily requiere conversación humana y este MVP renuncia explícitamente a resolverla; añadir un flujo de bloqueos pediría explicar causas y abriría la puerta a hilos de discusión.
• Presencia de usuario ("quién está conectado", avatares activos o typing indicators): Fuera por principio de producto. FlowSync da visibilidad sobre el estado de la tarea, no vigilancia sobre la persona.
• Notificaciones push, alertas sonoras e integración con Slack/chat: Fuera. El producto busca eliminar interrupciones, no cambiarlas de canal; la señal debe ser un resumen silencioso que espera a que el usuario mire su cola de trabajo.
• Comentarios en tareas, descripciones ricas, subtareas, etiquetas y adjuntos: [Supuesto] Fuera. Si una tarea requiere debate o documentación extensa, deja de ser una señal rápida de coordinación; meter hilos de comentarios convierte la lista en otro Jira lento de mantener.
• Sprints, estimaciones (puntos/horas), épicas, prioridades y backlog ordenado: Fuera. Obligar a estimar o clasificar antes de empezar a trabajar destruye el hábito de actualización en dos segundos, que es el riesgo #1 del producto.
• Sincronización con herramientas externas (Jira, Linear, GitHub PRs, CI, calendario): Fuera. FlowSync no convive con otro gestor (la doble actualización mata la adopción) y derivar estados de Git/OAuth es otro producto distinto y mucho más costoso.
• Analítica, métricas de velocidad, historial de actividad e informes: Fuera. El valor lo cobran los pares en el día a día para no pisarse el trabajo, no un manager auditando rendimiento.
```
