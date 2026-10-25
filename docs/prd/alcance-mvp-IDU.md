# PRD — MVP de FlowSync: estado compartido de tareas del equipo

> Alcance del MVP. Documento de producto, **sin código**: solo qué entra, qué no, y por qué.
> Base técnica del estado actual del repo: [`docs/model.md`](../model.md).
>
> Autor: IDU · Fecha: 2026-10-25 · **Rev. 2 — MVP recortado a la vertical más fina.**

---

## 1. El problema, en una frase

Los equipos remotos pequeños no saben en qué está trabajando cada uno sin interrumpir a
alguien o esperar a la daily. El MVP hace visible el estado de las tareas del equipo **de un
vistazo y sin preguntar**.

## 2. Qué desaparece (honestamente)

Desaparece la **ronda de "¿en qué estás?"** de la daily, que hoy se come la mitad de los 15
minutos. La daily **no** desaparece entera: la parte de bloqueos sigue, y este MVP **no** la
resuelve. Venderlo de otra forma sería mentir sobre el alcance.

## 3. Para quién

Equipos remotos pequeños (3–10 personas), roles planos: **todos ven y editan lo mismo**, sin
jerarquía de permisos. El valor lo cobran los pares, no un lead: no hay reporte hacia arriba.

## 4. La promesa central

- **Frescura, no presencia**: el estado es de la **tarea**, no de la persona.
- **Resumen que espera, no aviso que interrumpe**: se consulta cuando llegas o vuelves de una
  reunión; no te persigue.
- **Donde se hace el trabajo, no donde se cuenta**: FlowSync **crea** las tareas y es la cola
  de trabajo real. No convive con otro gestor ni lo sincroniza.
- **Simple hasta que duela quitar algo más**: prefiero una capability terminada de punta a
  punta a tres a medias. Cada campo y cada clic que se añade al acto de "mover mi tarea" es
  deuda contra el riesgo #1 (que la información envejezca).

## 5. Filosofía de recorte de esta revisión

El MVP se ha reducido a la **vertical más fina que aún cancela la ronda de la daily**. Regla
aplicada: lo que se puede **derivar** no se modela; lo que ya existe se **reutiliza**; lo que
huele a configuración o proceso se **elimina**. Datos derivados (no almacenados) y piezas
reutilizadas se listan en §8.

## 6. Decisiones de alcance (rev. 2)

| Tema | Decisión | Cambio respecto a rev. 1 |
|---|---|---|
| "Tiempo real" | **Auto-refresco (polling)**: la lista se actualiza sola. No WebSocket. | — |
| Estados de la tarea | **Por hacer / En curso / Hecho** (fijos). | **Recortado**: se quita "Bloqueado". |
| Responsable | **Usuario registrado**, nullable. Autoasignar / reasignar / quitar = el mismo acto. | Fusionado en un solo campo. |
| Fecha de vencimiento | **Se mantiene** (campo opcional). "Vencido" se **deriva**, no se almacena. | Mantenida (es lo pedido). |
| Rastro de cambios | **Eliminado** el historial/auditoría. La frescura se cubre con "última actualización". | **Eliminado** (ruido en una herramienta simple). |
| Consumo de la lista | **Agrupación visual por estado** + **resaltado de "mis tareas"** (cliente). | **Recortado**: sin selectores de filtro. |
| Espacio | **Único y compartido**. Sin entidad "equipo". | — |

> **Dos recortes a vigilar en campo** (ver §9): quitar "Bloqueado" es el único que toca la
> función comunicativa de la daily; re-añadirlo es un valor más en el enum. La fecha de
> vencimiento se mantiene por ser petición expresa, pero es la primera candidata a revisar si
> el formulario resulta pesado.

---

## 7. Criterios de aceptación del MVP

> Cada criterio incluye **por qué** entra. Si un criterio no se sostiene por su "porque", sobra.

### Gestión de tareas (el núcleo)

1. **Un usuario puede crear una tarea indicando solo un título.**
   Porque si crear exige rellenar un formulario, la gente no crea tareas y la lista miente. Un
   solo campo obligatorio es el mínimo de fricción; es la primera defensa contra el riesgo #1.

2. **Una tarea tiene título (obligatorio), responsable (opcional), estado y fecha de
   vencimiento (opcional).**
   Porque es lo mínimo para saber quién está en qué y qué se ha pasado de plazo, sin convertir
   la creación en un formulario pesado.

3. **Al crear una tarea sin estado, nace en "Por hacer".**
   Porque obligar a elegir estado al crear rompería el "en segundos"; un valor por defecto
   evita tareas sin estado, que es justo la ambigüedad que el producto mata.

4. **Un usuario puede mover una tarea entre estados sin restricción (Por hacer / En curso /
   Hecho).**
   Porque el valor está en reflejar la realidad rápido, no en imponer un proceso. "Sin
   restricción" no es una feature extra: es la ausencia de una máquina de estados tipo Jira que
   solo añadiría fricción donde no podemos permitírnosla.

5. **Un usuario puede editar el título de una tarea y borrarla.**
   Porque una errata no puede obligar a borrar y recrear, y las tareas creadas por error
   ensucian la lista si no se pueden eliminar. El borrado es directo, sin papelera ni archivado.

### Responsable y asignación

6. **Cualquiera puede asignarse una tarea, asignarla a otro o dejarla sin responsable, usando
   los usuarios registrados del espacio (mostrados por su nombre o iniciales).**
   Porque los roles son planos y el objetivo es coordinarse, no controlar. Asignar, reasignar y
   quitar dueño son el mismo acto. Una tarea sin responsable es la señal de "esto está libre
   para cogerlo". Reutiliza las cuentas e iniciales que ya existen, sin modelar nada de persona.

### Ver el estado del equipo (la razón de ser)

7. **La lista de tareas se actualiza sola, sin refrescar ni preguntar.**
   Porque el caso real es "llego por la mañana o vuelvo de una reunión y veo qué se ha movido":
   si hubiera que refrescar o preguntar, seguiríamos interrumpiendo, que es lo que se elimina.

8. **La lista se presenta agrupada por estado, y las tareas propias quedan resaltadas.**
   Porque con 3 estados y 3–10 personas la lista entera cabe en pantalla: agrupar da la lectura
   de "qué está en curso / qué está por hacer" sin selectores de filtro que mantener. Resaltar
   lo propio hace que quien actualiza **cobre en el momento** (ve su cola de un vistazo) sin
   esconder al resto del equipo, que es justo lo que se quiere ver.

9. **Cada tarea muestra su fecha de vencimiento y señala de forma visible cuando se ha pasado
   de plazo.**
   Porque ver "qué se ha pasado de plazo" de un vistazo es parte de saber qué necesita
   atención. "Vencido" se calcula de la fecha, no es un dato que se guarde.

10. **Cada tarea muestra cuándo se actualizó por última vez, en tiempo relativo ("hace X").**
    Porque es el antídoto directo del riesgo #1: ver "actualizado hace 3 días" delata la
    información rancia. Sale del `updated_at` que el ORM ya mantiene; no se modela nada nuevo.

### Fricción (el criterio que decide si el producto vive)

11. **Cambiar el estado de una tarea se hace en dos clics sobre la lista ya abierta, sin pasos
    intermedios ni campos obligatorios.**
    Porque la única defensa contra el riesgo #1 es que actualizar cueste casi nada; no
    obligamos a nadie, hacemos que sea trivial. Si actualizar costara más, el producto pierde
    su sentido.

---

## 8. Reutilizar y derivar en vez de construir

> El MVP se apoya en lo que ya existe (ver `docs/model.md`) y en datos que se calculan al vuelo.
> Esto es lo que hace el alcance pequeño de verdad, no solo en la lista de features.

**Se reutiliza (ya existe, coste cero):**
- Autenticación (signup/login/perfil, guard `api`). El responsable y "mis tareas" salen de la
  sesión actual; no se construye auth nueva.
- Identidad del responsable: `fullName` e `initials` del modelo `User` ya serializado.
- `created_at` / `updated_at` que Lucid mantiene con `autoUpdate`.

**Se deriva (no se almacena):**
- **"Vencido"** = la fecha de vencimiento es anterior a hoy. No es una columna.
- **"Última actualización / hace X"** = formatear `updated_at` en el cliente. No es un campo.
- **"Mis tareas"** = filtrar/resaltar en cliente sobre datos que ya llegan. No es un endpoint.

**Se elimina frente a la rev. 1:**
- El **historial de transiciones** (tabla de auditoría + escrituras + timeline): es ruido y
  ADN de Jira. Su único valor real ("¿esto sigue vivo?") lo cubre gratis el punto 10.
- El **estado "Bloqueado"**: un valor de enum que no transmite el matiz que la daily sí
  necesita; re-añadible en una línea si duele.
- Los **selectores de filtro**: sustituidos por agrupación visual + resaltado.
- Cualquier **papelera / soft-delete**: el borrado es directo.

---

## 9. Fuera del alcance del MVP

> Cada exclusión lleva **por qué** no entra. Varias son renuncias de diseño, no "para luego".

1. **Historial / auditoría de cambios.** Ruido en una herramienta que quiere ser simple;
   invita a mirar atrás en vez de a "¿en qué estás ahora?". Es el ADN de Jira.

2. **Estado "Bloqueado" y gestión de bloqueos.** Un estado no transmite el matiz ("¿bloqueado
   por qué/quién?") y acabaría generando el chat que se quiere evitar. Los bloqueos siguen en
   la daily; este MVP no promete resolverlos.

3. **Notificaciones push / avisos que interrumpen.** El producto es "resumen que espera", no
   "aviso que persigue".

4. **Integración con Slack.** Dependencia de terceros que no toca el núcleo de "ver el estado
   de un vistazo".

5. **Push instantáneo por WebSocket.** El caso ("llego y veo qué se ha movido") no necesita
   latencia cero; el polling lo cubre sin conexiones persistentes.

6. **Roles, permisos y jerarquía.** Equipos planos; resuelve un problema que estos usuarios no
   tienen y añade fricción de configuración.

7. **Analítica, reporting e informes.** El valor es entre pares, no hacia arriba. Medir acerca
   a la vigilancia que rechazamos.

8. **Comentarios en tareas.** Acercan al chat, y esto explícitamente **no es chat**.

9. **Entidad "equipo", multi-equipo o personas en varios equipos.** Espacio único compartido;
   se anota como **supuesto** (§10), no se construye.

10. **Derivar el estado de señales externas (Git/PRs, CI, calendario).** Es otro producto, con
    integraciones y OAuth. El estado lo teclea quien hace la tarea, en segundos.

11. **Presencia / "quién está conectado" / actividad de personas.** Es vigilancia, rechazada a
    propósito. La frescura es de la tarea, no de la persona.

12. **Convivir o sincronizar con otro gestor de tareas.** Exigiría doble actualización, que es
    como muere esta categoría. FlowSync crea las tareas, no las lee de otro sitio.

13. **Sprints, estimaciones, épicas, backlog priorizado y prioridades.** Renuncia explícita: un
    equipo que necesite eso no es nuestro usuario. Es el "rollo de Jira".

14. **Dependencias entre tareas, subtareas, etiquetas y adjuntos.** Andamiaje de un producto
    amplio; preferimos una capability terminada.

15. **Papelera / soft-delete / archivado.** El borrado es directo; mover a "Hecho" ya saca la
    tarea de la vista activa.

16. **Selectores de filtro por estado.** Sustituidos por agrupación visual: cero widgets, cero
    estado de UI que mantener.

---

## 10. Supuestos registrados

- **Un único espacio compartido**: todos los usuarios registrados comparten la misma lista.
  Multi-equipo queda fuera y se asume como evolución futura, no como deuda del MVP.
- **Autenticación reutilizada**: signup/login/perfil ya existen (ver `docs/model.md`).
- **Caso de estudio, no cliente real**: el equipo de 6 personas de producto SaaS en 3 husos es
  el usuario de referencia para validar, no un cliente firmado.

## 11. Cómo sabremos si funcionó

- **Éxito para el usuario**: dejar de hacer la ronda de "¿en qué estás?" porque el estado del
  equipo se ve de un vistazo.
- **Criterio a una semana de uso real**: que el equipo cancele esa ronda y **nadie pida que
  vuelva**. Si la siguen haciendo igual, no funcionó.
- **Riesgo #1 a validar**: que la información no envejezca. La mitigación es que actualizar
  cueste dos clics (criterio 11), no obligar a nadie.
- **Recorte a vigilar**: si el equipo echa de menos avisar de bloqueos sin volver al chat,
  "Bloqueado" es lo primero a re-añadir (un valor más en el enum, coste casi nulo).


# PARTE B

## Los dos números

La IA inicialmente propuso 15 funcionalidedes. Tras el primer recorte de la IA lo recorté a 11 funcionalidades. Yo recorté el histórico de cambios para trazabilidad. Que había añadido yo originariamente, pero que la IA me destacó como contradicción con lo que había pedido el PO. 

Tareas que haya eliminado yo. Ninguna. Creo que todas son necesarias e importantes. Matizaría que mover una tarea a "En curso" se autoasigna como responsable, pero no la eliminaría ya que aumenta la fluidez de mover la tarea y ver quien está trabajando en ella. 

## Tres cosas que dejaste fuera, y por qué cada una

Solo he eliminado el tracking de los estados porque no aporta valor al objetivo del MVP ni del producto. 

El resto de exclusiones que ha inferido la IA son correctas, y están bien excluidas. 

## La exclusión de la que menos seguro estás

Pues la ya comentada. El histórico de estados ayuda a ver cuando pasó algo y a recordar que le pasó a una tarea. Creo que tiene sentido, pero que igual para un MVP no aporta y puede que entrase en una situación posterior. 