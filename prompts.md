# Prompts

Aquí van **todos los prompts que lanzaste** para hacer el ejercicio, en el orden en que los
lanzaste, con el modelo y la herramienta de cada uno.

Esto no es papeleo. Lo que se revisa es **cómo pediste las cosas**, no solo lo que salió: un
resultado flojo con un prompt bueno y un resultado flojo con un prompt vago necesitan feedback
distinto, y sin este archivo no se distinguen.

## Cómo rellenarlo

- Un apartado `## Prompt N` por cada prompt.
- **Pega el prompt tal cual lo lanzaste**, dentro del bloque de código, aunque ocupe diez líneas
  y aunque tenga faltas. No lo reescribas para que quede bien: el que arreglaste mentalmente
  después no es el que lanzaste.
- Incluye también los que **no funcionaron**. Suelen ser los más útiles de leer.
- `Modelo` y `Herramienta` en todos. Si cambiaste de una a otra a mitad, se nota aquí.


---

## Prompt 1

**Modelo:** Opus 5.5 Medium
**Herramienta:** Claude Code

```
Puedes analizar el proyecto Flowsync y explicar qué capabilities ya están construidas y cómo es el modelo de datos actual.
No propongas nada nuevo ni toques archivos.
```

**Qué salió:** 

````
FlowSync ahora mismo tiene resuelta la gestión de cuentas (registro, login, perfil y logout) y nada más. Todavía no existe ningún concepto de tareas, equipos ni proyectos.

## Qué funciona hoy

### Backend (AdonisJS 7, todo bajo `/api/v1`)

| Funcionalidad | Endpoint | Qué hace |
|---|---|---|
| Registro | `POST /auth/signup` | Valida los datos, crea el usuario, emite un token y devuelve `{ user, token }`. Es decir, deja la sesión iniciada al registrarse. |
| Login | `POST /auth/login` | Comprueba email y contraseña (con hash), emite un token y devuelve `{ user, token }`. |
| Perfil | `GET /account/profile` (requiere sesión) | Devuelve el usuario dueño del token. |
| Logout | `POST /account/logout` (requiere sesión) | Borra solo el token actual; las demás sesiones del usuario siguen vivas. |

Detalles que conviene saber:
- **Tipo de autenticación:** tokens opacos guardados en base de datos (guard `api`). El guard de sesión `web` está configurado pero nadie lo usa.
- **Los tokens no caducan:** `DbAccessTokensProvider.forModel(User)` se crea sin `expiresIn`, así que `expires_at` queda vacío ([user.ts:8](backend/app/models/user.ts#L8)).
- **Validación** en [validators/user.ts](backend/app/validators/user.ts):
  - email válido, de 254 caracteres como mucho y único en `users`;
  - contraseña de 8 a 32 caracteres, con confirmación que debe coincidir (`sameAs`);
  - `fullName` admite `null`.
  - En el login la contraseña no tiene más reglas que ser un texto.
- **Formato de respuesta:** todo sale envuelto en `{ data }` mediante `serialize()` y `UserTransformer`, que expone `id, fullName, email, createdAt, updatedAt, initials`. El logout es la excepción: devuelve `{ message }` sin envoltorio.
- **Iniciales:** `initials` es un campo calculado. Toma la primera letra de las dos primeras palabras del nombre; si no hay nombre, usa la parte del email antes y después de la `@`; si solo hay una palabra, coge sus dos primeras letras.
- **Ruta de prueba:** existe `GET /` que devuelve `{ hello: 'world' }`.
- **Tests:** no hay ninguno, solo [bootstrap.ts](backend/tests/bootstrap.ts).

### Frontend (React 19)
- **Pantallas:** `/login` y `/register` (solo accesibles sin sesión) y `/profile` (protegida). Cualquier otra ruta redirige a `/profile`.
- **Sesión:** el token se guarda en `localStorage` (`flowsync.token`) y se comprueba contra `/account/profile` al cargar la app.
  - Si el servidor responde 401, se borra el token.
  - Si el backend está caído, el token se conserva para que baste con recargar cuando vuelva.
- **Cliente HTTP:** todo pasa por [api.ts](frontend/src/lib/api.ts), que traduce al castellano los errores de VineJS y de autenticación, con un mensaje por cada campo del formulario.
- **Perfil:** muestra las iniciales, el nombre (o "Sin nombre"), el email, la fecha de alta y el botón de cerrar sesión. No se puede editar nada.

## Modelo de datos actual

Solo hay dos migraciones y dos tablas, en SQLite (`tmp/db.sqlite3`):

```
users                              auth_access_tokens
─────────────────────────          ───────────────────────────────
id           PK increments         id            PK increments
full_name    string NULL           tokenable_id  FK → users.id (ON DELETE CASCADE)
email        string(254) UNIQUE    type          string
password     string (hash)         name          string NULL
created_at   timestamp             hash          string
updated_at   timestamp NULL        abilities     text
                                   created_at / updated_at
                                   last_used_at  NULL
                                   expires_at    NULL
```

- **Relación:** un usuario tiene muchos tokens. No está declarada como relación de Lucid en el modelo; la gestiona internamente el `DbAccessTokensProvider`.
- **Clases generadas:** [schema.ts](backend/database/schema.ts) contiene las clases `UserSchema` y `AuthAccessTokenSchema`. `password` lleva `serializeAs: null`, así que nunca se envía en las respuestas.
- **Modelo `User`:** [user.ts](backend/app/models/user.ts) solo añade el mixin `withAuthFinder(hash)`, el proveedor de tokens y el getter `initials`.
- **Modelos y reglas:** no existe un modelo Lucid para los tokens, y [schema_rules.ts](backend/database/schema_rules.ts) está vacío.
- **Sin roles:** no hay roles, permisos ni pertenencia a ningún tipo de agrupación. Cualquier usuario autenticado ve únicamente su propio perfil.

No he modificado ningún archivo.
````

## Prompt 2

**Modelo:** Opus 5.5 Medium
**Herramienta:** Claude Code

```
Quiero que FlowSync sea una herramienta para que los equipos remotos sepan en qué está trabajando cada uno sin tener que hacer reuniones de sincronización. Algo tipo tareas compartidas pero más en tiempo real y menos rollo que Jira.
Cuáles son las 5 preguntas que más reducirían la incertidumbre sobre el problema, los usuarios y el alcance.

* Restricciones
- Solo las preguntas: no propongas nada de alcance todavía
- Exactamente cinco preguntas (sobre problema, usuarios y alcance),
- Una sola ronda,
- Prohibido bajar a modelo de datos o endpoints.

```

**Qué salió:** 

```

1. **¿Qué se pierde hoy sin la daily y cómo os enteráis ahora de lo que hace cada uno?** Por ejemplo: bloqueos que tardan en salir, trabajo duplicado, o un responsable que no sabe si se llega a la fecha. ¿Usáis Slack, hilos asíncronos, un Jira que nadie actualiza?

2. **¿Quién va a consultar FlowSync y para qué decisión?** ¿El propio equipo, para coordinarse entre iguales, o un lead o manager que necesita visibilidad sin preguntar? ¿Cómo es un equipo típico: cuántas personas, cuántas zonas horarias, todos en un solo equipo o en varios?

3. **¿Qué tiene que poder saberse de un vistazo sobre otra persona?** ¿Solo en qué está ahora mismo, o también lo que terminó, lo siguiente que va a hacer y si está bloqueada? ¿Y hasta qué punto es "en tiempo real" o basta con que esté al día una vez al día?

4. **¿Qué conseguiría que la gente lo actualice de verdad?** El estado lo escribe cada persona a mano, y por eso Jira acaba desactualizado. ¿Cuánto esfuerzo al día se puede pedir? ¿Hay algo que deba reflejarse solo, o tiene que ser siempre manual y mínimo?

5. **¿Qué tiene que quedar explícitamente fuera para que siga siendo "menos rollo que Jira"?** ¿Estimaciones, sprints, flujos configurables, comentarios, integraciones? ¿Y qué resultado concreto tras unas semanas de uso diría que el MVP ha funcionado, por ejemplo eliminar la daily?
```
**Notas mías:**
 Si bien respetó las 5 preguntas, en cada una de ellas hace varias preguntas, es decir, respecto las formas pero no el fondo de lo que le pedí.



## Prompt 3

**Modelo:** Opus 5.5 Medium
**Herramienta:** Claude Code

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
- Si algo no te respondí, decidelo tú y márcalo explícitamente como supuesto.
- Fuera del MVP: notificaciones push, integración con Slack, roles/permisos avanzados, analítica/reporting, comentarios en tareas.


Todavía no propongas el alcance; lista los supuestos que tomaste.
```

**Qué salió:** 

```

Doy por buenas tus respuestas. Lo que sigue es lo que he decidido yo donde no había respuesta. Cada punto es un supuesto que puedes corregir.

## Supuestos

**Tarea**
- **S1.** Solo el título es obligatorio. Responsable, fecha de vencimiento y estado (que empieza en el inicial) son opcionales. Así encaja "sin campos obligatorios" con los cuatro campos que pediste.
- **S2.** Hay tres estados fijos y no configurables: *pendiente → en curso → hecha*. No existe el estado "bloqueada", porque los bloqueos quedan fuera de este MVP.
- **S3.** Cada tarea tiene como mucho un responsable, que debe ser un usuario registrado. No hay responsables múltiples.
- **S4.** "Está libre" significa pendiente y sin responsable. "Coger" una tarea es asignármela y pasarla a en curso, y es la acción de los dos clics.
- **S5.** No hay descripción, etiquetas, prioridad ni subtareas: solo los cuatro campos.
- **S6.** La fecha de vencimiento es un día, sin hora. Una tarea está vencida si su fecha es anterior a hoy según la zona horaria de quien mira la lista y no está hecha.

**Permisos y espacio**
- **S7.** Cualquier usuario autenticado puede crear, editar, reasignar, cambiar de estado o borrar cualquier tarea, como consecuencia de los roles planos.
- **S8.** El registro es abierto: quien se da de alta entra directamente en el espacio único. No hay invitaciones ni control de acceso. Vale para un caso de estudio, no para un uso real.
- **S9.** El borrado es definitivo, sin papelera ni archivo. Las tareas hechas siguen en la lista y se ocultan con el filtro.

**Tiempo real y "qué se ha movido"**
- **S10.** Tiempo real significa que, con la lista abierta, los cambios de otros aparecen en segundos sin recargar. No hace falta que sea instantáneo.
- **S11.** El "resumen que espera" se cubre ordenando la lista por última modificación y mostrando "actualizada hace X". No hay historial de cambios, feed de actividad ni marcador de "desde tu última visita".
- **S12.** Si dos personas cambian la misma tarea casi a la vez, gana el último cambio. Como los demás lo ven en segundos, la colisión se detecta enseguida, pero no se impide.

**Consumo de la lista**
- **S13.** Por defecto la lista muestra las tareas no hechas, y se filtra por estado. No hay filtro por responsable, búsqueda ni otras vistas como un tablero o "mis tareas".
- **S14.** Con como mucho 10 personas y del orden de cientos de tareas, no hace falta paginar.

**Producto y validación**
- **S15.** Es una aplicación web en castellano pensada para escritorio. En móvil debe poder usarse, pero no está optimizada.
- **S16.** La cuenta se queda como está hoy: registro, login, perfil y logout, sin editar el perfil ni recuperar la contraseña.
- **S17.** El criterio de éxito (cancelar la ronda de "¿en qué estás?" y que nadie pida que vuelva) se comprueba hablando con el equipo, no con métricas dentro del producto, porque la analítica está fuera.

## Tensiones que dejo marcadas
- **"Sin campos obligatorios" frente a "título, responsable, estado y fecha":** lo resuelvo con S1. Si el responsable tuviera que ser obligatorio, desaparecería la idea de tarea libre de S4.
- **El dolor principal es el trabajo duplicado, pero S12 no lo impide; solo lo hace visible pronto.** Bloquear que alguien coja una tarea que ya tiene responsable sería otra decisión de producto, y no la he tomado.
- **"Veo qué se ha movido" puede pedir más que S11.** Si hiciera falta saber qué ha cambiado desde mi última visita, habría que añadir historial. Es el supuesto con más riesgo de quedarse corto.

```


## Prompt 4

**Modelo:** Opus 5.5 Medium
**Herramienta:** Claude Code

```
El S13 no me parece bien, debería tener un filtro por mis tareas, el resto de supuestos, aceptados.
Propon cinco bloques del MVP: problema, usuarios, propuesta de valor, alcance y NO-alcance.
Trata de ser agresiva recortando y justificando cada exclusión para que el MVP sea un producto que pueda utilizarse y cumplir con el objetivo.
No incluir tablas, endpoints, arquitectura, ningun requisito técnico ni numerados.
```

**Qué salió:** 
```

## Problema
En un equipo remoto pequeño nadie ve en qué está cada uno sin interrumpir a alguien. La respuesta llega de dos formas, y las dos cuestan caro: la ronda de "¿en qué estás?" de la daily, que se come la mitad de sus 15 minutos, y las preguntas sueltas por chat, que rompen la concentración de quien las recibe.

Cuando esa información falta o llega tarde, se duplica trabajo. En el caso de estudio, dos personas tocaron el mismo módulo la misma semana porque ninguna sabía lo que hacía la otra, y se perdieron dos días.

El gestor de tareas que ya usan no lo evita. Actualizarlo es tan pesado que siempre va por detrás de la realidad, así que nadie se fía de él para decidir.

## Usuarios
Equipos remotos de 3 a 10 personas, repartidas entre varios husos horarios, en los que todos son iguales: nadie reporta hacia arriba, todos ven y editan lo mismo.

El valor se lo llevan los propios compañeros, no un jefe:
- **Quien va a empezar algo** necesita saber si otra persona ya lo está tocando y qué queda libre.
- **Quien está trabajando** quiere su cola de tareas a mano y dejar de recibir interrupciones preguntándole cómo va.

El primer usuario de referencia es un equipo de producto SaaS de 6 personas en 3 husos horarios. Es un caso de estudio, no un cliente.

Un equipo que necesite sprints, estimaciones o informes no es nuestro usuario.

## Propuesta de valor
Una sola lista compartida donde el estado del equipo se ve de un vistazo, siempre al día y sin preguntar a nadie.

- **Actualizarla cuesta dos clics.** No hay campos obligatorios aparte del título ni nada que configurar.
- **Quien la actualiza se beneficia en el momento.** La lista es su propia cola de trabajo y, además, le ahorra interrupciones. Por eso se mantiene viva sin obligar a nadie.
- **Los cambios aparecen solos, sin recargar.** Al llegar por la mañana o al volver de una reunión, se ve qué se ha movido y qué está libre antes de coger algo.

Sustituye al gestor de tareas, no convive con él. Lo que se busca es que el equipo cancele la ronda de "¿en qué estás?" y nadie pida recuperarla.

## Alcance
Una única vertical que se pueda usar de principio a fin:

- **Cuenta:** registrarse, entrar y salir. Ya está construido y se usa tal cual.
- **Un espacio común:** quien se registra ve la lista de tareas de todos.
- **Crear tareas:** solo el título es obligatorio. Responsable y fecha de vencimiento son opcionales.
- **Coger una tarea libre en dos clics:** queda asignada a ti y pasa a "en curso".
- **Cambiar el estado en dos clics** entre pendiente, en curso y hecha.
- **Editar tareas:** cualquiera puede cambiar el título, el responsable o la fecha de cualquier tarea, y también borrarla.
- **Vencidas a la vista:** las tareas no hechas cuya fecha ya ha pasado se distinguen de un vistazo.
- **Dos filtros combinables:**
  - *Por estado:* por defecto se ocultan las hechas.
  - *Mis tareas:* solo lo que tengo asignado, para usar la lista como cola personal.
- **Al día sin recargar:** con la lista abierta, los cambios de otros aparecen en segundos.
- **Qué se ha movido:** la lista se ordena por último cambio y cada tarea muestra "actualizada hace X".

## NO-alcance
Cada exclusión responde a la misma pregunta: ¿hace falta para cancelar la ronda de "¿en qué estás?"? Si la respuesta es no, queda fuera.

- **Bloqueos, incluido un estado "bloqueada".** Esa parte de la daily sigue existiendo y este MVP no intenta resolverla. Un estado que nadie sabe cómo gestionar solo añade ruido.
- **Historial, feed de actividad y "desde tu última visita".** Ordenar por último cambio responde a "qué se ha movido" sin crear otro sitio que consultar. Si en la primera semana se queda corto, será lo primero que entre.
- **Impedir que dos personas cojan la misma tarea.** Con cambios que llegan en segundos, la colisión se ve enseguida. Bloquearla obliga a decidir reglas de propiedad que todavía no sabemos si hacen falta.
- **Notificaciones push, email e integración con Slack.** La señal debe esperar a que la mires, no interrumpir. Un aviso reproduce justo el problema que queremos quitar.
- **Indicadores de presencia ("quién está conectado").** El estado es de la tarea, no de la persona. Esto se rechaza a propósito porque sería vigilancia.
- **Integraciones con Git, PRs, CI o calendario, e importar desde otro gestor.** Es otro producto, con dependencias externas. Además, convivir con otra herramienta lleva a actualizar dos veces, y así muere esta categoría.
- **Varios equipos, varios espacios e invitaciones.** El usuario objetivo es un único equipo pequeño. Con un solo espacio el valor ya se puede validar.
- **Roles y permisos.** Los compañeros son iguales. Cualquier jerarquía añade fricción a la acción de dos clics sin aportar al objetivo.
- **Descripción, etiquetas, prioridad y subtareas.** Para saber quién está en qué bastan título, responsable, estado y fecha. Cada campo extra encarece actualizar y acelera que la lista se quede vieja, que es el riesgo número uno.
- **Comentarios.** Convierten la lista en un canal de conversación y la conversación ya tiene su sitio.
- **Sprints, estimaciones, épicas, backlog priorizado e informes.** Son justo el "rollo" del que huimos. A quien los necesite, este producto no le sirve.
- **Analítica y métricas de uso.** El éxito se valida hablando con el equipo tras una semana, no midiendo dentro del producto.
- **Búsqueda, tablero kanban y otras vistas.** Con como mucho 10 personas y una lista filtrable por estado y por "mis tareas", otra vista sería duplicar la misma información.
- **Editar el perfil y recuperar la contraseña.** No afectan al objetivo y la cuenta ya funciona para lo que se necesita.
- **Papelera o archivo.** Borrar es poco frecuente y el coste de equivocarse es bajo: la tarea se vuelve a crear en segundos.
- **Experiencia optimizada para móvil.** El trabajo y la decisión de qué coger ocurren delante del ordenador. Debe poder usarse en móvil, nada más.

```