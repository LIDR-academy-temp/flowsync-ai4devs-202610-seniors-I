# Prompts

Registro de los nueve prompts originales del ejercicio, ordenados por lanzamiento. Herramienta y modelo según el registro del intento. Los bloques literales se conservan sin corregir su redacción. Las notas «Qué salió» describen el resultado de aquel momento, no necesariamente el estado actual.

**Revisión posterior — 27 de octubre de 2026:** se retiró la plantilla, se ordenaron los bloques y se recuperaron las preguntas y respuestas del registro local de Claude. El recuento histórico 10 → 9 del borrador se corrige en el alcance a **8 → 9**, contrastado con las listas originales; no se inventaron recortes para mejorar el resultado.

---

## Prompt 1

**Modelo:** MiniMax-M3.1-Flash-Preview[1m] **Herramienta:** Claude Code

```
Hola Claude, quiero que me ayudes a analizar este repo que me digas qué capabilities ya tenemos desarrolladas, Y 
aprendas el modelo de datos. Crea un resumen breve de no más de cinco líneas.
```

**Qué salió:** Funcionó. Hizo un resumen de cinco líneas con las capacidades
existentes (solo auth) y el modelo de datos (User + AuthAccessToken).

1. Solo hay auth, nada de tareas. Backend AdonisJS 7 con POST
   /api/v1/auth/signup, POST /api/v1/auth/login, GET\
   /api/v1/account/profile, POST /api/v1/account/logout, con access tokens
   opacos (DbAccessTokensProvider) y guard\
   middleware.auth().
2. Modelo de datos: dos tablas y ninguna más. User (id, email, password,
   fullName, timestamps) y AuthAccessToken (tokenable, abilities, hash,
   expiración). database/schema.ts es autogenerado por Lucid desde migraciones;
   los\
   modelos extienden la clase generada y no declaran columnas.
3. Convención API ya fijada: todo pasa por ctx.serialize() (envuelve en { data
   }), con transformers en\
   app/transformers/ y validación VineJS 4 (vine.create) en app/validators/.
4. Frontend React 19 + Vite ya tiene el andamiaje de sesión: auth-context +
   token en localStorage (flowsync.token), rehidratación contra
   /account/profile, guards protected-route / public-only-route, y tres\
   páginas (login, register, profile). Toda llamada al backend pasa por
   src/lib/api.ts.
5. Lo que no existe todavía: ni entidad Task, ni listas, ni estados, ni nada de
   tiempo real o presencia. Terreno base limpio: la vertical del MVP se monta
   entera encima de la auth que ya está.

---

## Prompt 2

**Modelo:** MiniMax-M3.1-Flash-Preview[1m] **Herramienta:** Claude Code

```
Ahora hazme un interrogatorio, hazme cinco preguntas. con las que no podemos saber y nos ayudarían a reducir la incertidumbre sobre el problema, los usuarios y el alcance acota a una sola ronda y no bajes modelo de datos ni a endpoints dejalo en una sola ronda
```

**Qué salió:** Cinco preguntas en una sola ronda, sobre problema, usuarios,
alcance, tiempo real y fronteras. Sin bajar a modelo de datos ni endpoints.

**Preguntas originales recuperadas del registro de la sesión (27 de octubre):**

1. (Beneficiario y decisión) ¿Quién paga de verdad el coste de mantener esto al día, y qué decisión concreta cambia el día que FlowSync exista?

2. (Usuarios y forma del equipo) ¿Qué tamaño y forma tiene el equipo, y quién se encarga de poner el estado?

3. (Qué desaparece y qué no) Si mañana FlowSync funciona, ¿qué parte concreta de tu día se acorta, y qué parte sobrevive intacta?

4. (Qué significa "tiempo real") ¿Qué señal quieres ver aparecer, y cómo la consumes: te avisa o la ves al llegar?

5. (Fronteras) ¿Qué queda fuera, sin discusión?

---

## Prompt 3

**Modelo:** MiniMax-M3.1-Flash-Preview[1m] **Herramienta:** Claude Code

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

**Qué salió:** Propuesta de alcance en cinco bloques (problema, usuarios,
propuesta de valor, alcance, NO-alcance) con 8 elementos dentro y 13
exclusiones justificadas, 4 supuestos y 2 incoherencias detectadas.
Documento en `docs/prd/alcance-mvp-af.md`. Pendiente: el recorte del autor y
las tres líneas de la parte B.

---

## Prompt 4

**Modelo:** MiniMax-M3.1-Flash-Preview[1m] **Herramienta:** Claude Code

```
OK, ahora vamos a hacer un recorte del MVP, por favor propone cinco Bloques de problema, usuarios, propuesta de valor, alcance y no alcance para yo revisarlos y modificarlos para establecer el recorte.
```

**Qué salió:** Los cinco bloques otra vez, en el chat y con los elementos
numerados (I1-I8 dentro, E1-E13 fuera) para poder marcarlos y recortarlos.

---

## Prompt 5

**Modelo:** MiniMax-M3.1-Flash-Preview[1m] **Herramienta:** Claude Code

```
1 El responsable se saca del usuario que está creando, la tarea. No contamos con una asignación en este sistema, cada usuario elige la tarea que en la que va a trabajar.
```

**Qué salió:** La IA detectó que el cambio rompía dos cosas del alcance (el
campo obligatorio frente a "crear en segundos", y "mi cola de trabajo" frente
a "todos ven lo mismo") y preguntó dos preguntas de cierre antes de tocar el
documento:

> 1. Si el responsable no es un campo que se rellena, ¿qué pasa cuando otra
>    persona coge la tarea de alguien?
> 2. Con el responsable derivado, ¿el filtro por responsable entra en el
>    alcance?

Respuesta del autor: reclamar cambia el responsable; sí, el filtro por
responsable entra. Aplicado al documento: 9 elementos dentro (I1-I9), 14
exclusiones (E1-E14), 6 supuestos y 3 decisiones de recorte. Las dos
incoherencias detectadas quedan resueltas.

**Respuestas recuperadas del selector de preguntas de Claude:**

- «Si el responsable no es un campo que se rellena, ¿qué pasa cuando otra persona coge la tarea de alguien?» → «Reclamar cambia el responsable».
- «Con el responsable derivado, ¿el filtro por responsable entra en el alcance?» → «Sí: filtrar por estado y por responsable».

Estas respuestas se dieron mediante el selector de Claude, no como un prompt de texto adicional.

---

## Prompt 6

**Modelo:** MiniMax-M3.1-Flash-Preview[1m] **Herramienta:** Claude Code

```
No, esos son todos los recortes.
```

**Qué salió:** El alcance queda cerrado: 9 elementos dentro, 14 exclusiones,
6 supuestos, 3 decisiones de recorte. Sigue pendiente redactar la parte B
(los dos números, las tres exclusiones defendidas y la de la que menos
seguro está el autor).

---

## Prompt 7

**Modelo:** MiniMax-M3.1-Flash-Preview[1m] **Herramienta:** Claude Code

```
si escribelo asi
```

**Qué salió:** Borrador de la parte B aceptado tal cual por el autor y escrito
en el mismo archivo, debajo del alcance: los dos números (10 propuestos, 9
dentro), las tres exclusiones defendidas (push, comentarios, sprints y
estimaciones) y la de la que menos seguro está (E9, no importar tareas de otro
gestor), con la contradicción apuntada y la condición para que entrara.

---

## Prompt 8

**Modelo:** MiniMax-M3.1-Flash-Preview[1m] **Herramienta:** Claude Code

```
Espera, estoy notando un problema. - "Mis tareas" = las que he creado más las que he reclamado.
Esto hay que cambiarlo, mis tareas son las que tengo asignadas O sea, las que he reclamado. Porque puede que la tarea no haya sido reclamada o que haya sido creada por alguien más que no pudo completarla. Entonces tú la reclamaste y se te queda a ti como usuario.
```

**Qué salió:** Corregido el supuesto de "mis tareas": son las tareas de las que
soy responsable (las que he reclamado más las que he creado mientras nadie las
haya reclamado). Actualizado también I6. La IA fijó la precisión: si se define "mis tareas" como "las que he reclamado" en sentido estricto, una tarea creada por mí y no reclamada por nadie quedaría fuera, y eso contradice que el responsable se derive de quien crea.

---

## Prompt 9

**Modelo:** MiniMax-M3.1-Flash-Preview[1m] **Herramienta:** Claude Code

```
si cambialo a solo las reclamadas.
```

**Qué salió:** Aplicado el sentido estricto: "mis tareas" = solo las tareas
reclamadas. Consecuencia asumida y anotada en el supuesto: una tarea creada
por ti que nadie ha reclamado no sale en tu lista, aunque figuraras como
responsable hasta que alguien la reclame.


## Revisión posterior con Codex — 27 de octubre de 2026

**Modelo:** no registrado en este documento. **Herramienta:** Codex desktop.

Solicitud literal de la revisión:

```
Guarda también esta página con los materiales del módulo 2 y revisa nuestra entrega con ese checklist para corregir lo que falta y actualizar el Pull Request.
```

Fuente del checklist: https://clase.serbanmarius.work/r/s2

Se recuperaron las preguntas originales y las respuestas del selector, se incluyó la ficha completa en el alcance, se corrigió el recuento a 8 → 9 y se declararon hipótesis y condiciones de reversión de las desviaciones. No se modificaron los nueve prompts originales ni se simularon resultados de usuarios.
