# Prompts

Registro semi-automático (hooks `UserPromptSubmit` y `Stop`): cada prompt lanzado, con su modelo, su herramienta y un resumen de la salida.
sesion_actual: Sesion 2
**Sesiones**:
  - nombre: Sesion 2
    prompts: 1-38
  - nombre: Correcciones tras el feedback del TA
    prompts: 39-61
---

## Prompt 1

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Quiero que indicas qué capabilities existen en el proyecto y cómo es el modelo de datos actual.
```

**Qué salió:** Revisado el repo: solo hay capabilities de gestion de usuarios (registro, login, perfil, logout) y dos tablas, users y auth_access_tokens todo sobre un SQLitle usando token. Todavía no hay especificaciones puntuales.

---

## Prompt 2

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Quiero definir un alcance para el proyecto actual  acorde a la tarea indicada en el Readme. "Quiero que FlowSync sea una herramienta para que los equipos remotos sepan en qué está trabajando cada uno sin tener que hacer reuniones de sincronización. Algo tipo tareas compartidas pero más en tiempo real y menos rollo que Jira."
```

**Qué salió:** Me lanza las preguntas sin que se lo pida. Cambio de modo auto a manual.

---

## Prompt 3

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Yo debo seguir el plan del ejercicio, no tu. Hazme 5 preguntas para reducir tu incertidumbre sobre el problema, los usuarios y el alcance. Retorna todas la preguntas juntas y no consideres el modelo detrás ni los endpoints. El objetivo es poder definir un alcance para un producto mínimo viable
```

**Qué salió:** 5 preguntas categorizadas como se esperaba

---

## Prompt 4

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

````
<pasted_content id="e24d">
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
</pasted_content id="e24d">
````

**Qué salió:** indica que solucionó las preguntas pero le falta info que llenó con supuestos

---

## Prompt 5

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
- Fuera del MVP: notificaciones push, integración con Slack, roles/permisos avanzados, analítica/reporting, comentarios en tareas.
```

**Qué salió:** indica que algunas dudas se zanjaron. Descartó cosas pon Slack y comentarios.Me tira supuestos: Los estados son fijos y no se configuran. - Solo el título es obligatorio, y una tarea sin responsable cuenta como libre. - No hay una vista de "cambios desde tu última visita". - Todos los usuarios registrados comparten el único espacio.

---

## Prompt 6

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
que cosas crees tu que hay que meter dentro del alcance. enumeralas sin detallar mucho
```

**Qué salió:**  lista de 10 cosas

---

## Prompt 7

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
reformula el requerimiento como un problema de usuario, sin mencionar detalles técnicos y vuelve a plantear el alcance. Para cada uno de los alcances definidos (GIVEN/WHEN/THEN) identifica si son un MUST un SHOULD, COULD HAVE o WON'T HAVE. También para alcances fuera de scope que no corresponden
```

**Qué salió:** ## El problema, contado desde una perspectiva del usuario

---

## Prompt 8

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Lo que yo entendí del MVP es que quieren una visión en vivo de los tickets con énfasis en los pendientes y asignados. El objetivo es tener la info especificada de tickets  por título, responsable, estado y fecha de vencimiento para evitar una daily ineficiente. Busca Daily de Scrum para entenderlo
```

**Qué salió:** se mareó más. Agregó supuestos de requisitos y agregó nuevos alcances

---

## Prompt 9

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
la fecha es un requisito para ententer la tarea.  Crear la tarea en segundos en un should pero no es requisito para una versión mínima. No se requiere  una sincronización automática instantanea
```

**Qué salió:** Aplico lo indocado. Indica incoherencias

---

## Prompt 10

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
debe de poder actualizarse en segundos (dos clicks) pero sin hacerse por notificaciones en tiempo real
```

**Qué salió:** Corrige el caso puntual

---

## Prompt 11

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
modifica la creación para que no tenga obligatoriedad de fecha de vencimiento.
```

**Qué salió:** Ajusta el alcance de forma acorde. 

---

## Prompt 12

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
/context
```

**Qué salió:** muestra el contexto 12% (local)

---

## Prompt 13

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
la asignación de tarea debe impactar en los datos no en la vista que requiere refrescarse.  queda por fuera de esta espcificación
```

**Qué salió:** Ajusta acorde a lo indicado

---

## Prompt 14

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
que valores aportan cada uno de los cambios que indicas?
```

**Qué salió:** Interpreta como "qué valor aporta cada punto del alcance".Muestra cada valor aportado. (Noto que algunos de los valores aportados sólo mejorar el producto pero no son esenciales) 

---

## Prompt 15

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
El producto mínimo viable debe de contar con la disponibilidad de las personas. La facilidad de uso es un should pero no un must. Lo importante aquí es ver todas las tareas asignadas, y que las tareas no sean tomadas por varios usuarios a la vez. El resto son cosas deseables en should
```

**Qué salió:** Aplica los cambios. Pide aclaración sobre qué significa "disponibilidad de las personas"

---

## Prompt 16

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
quiero decir buena voluntad. El MVP debe servir para tener lo mínimo indispensable para cumplir la tarea.
```

**Qué salió:** reduce a 3 los catalogados como MUST, indica un supuesto errado

---

## Prompt 17

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
corrige el supuesto de que las personas mantienen sus tareas de forma voluntaria. La decisión aplica por requerirse el producto mínimo.
```

**Qué salió:** actualiza indicando que se excluyen porque el MVP se limita a lo mínimo, no por una postura de producto.(noto que está pobre y desatinada la justificación)

---

## Prompt 18

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
La justificación es que la consulta de qué valor aporta cada una reportó un beneficio, no una necesidad.
```

**Qué salió:** ajusta según criterio de necesidad frente a beneficio.

---

## Prompt 19

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
la lista debe mostrar los pendientes y en curso.
```

**Qué salió:** Se corrige el criterio de estados de la lista pero agrega un item 4 de terminar el ticket sobre la lista.

---

## Prompt 20

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
no, lo que te pedí es que la lista muestre especificamente pendientes y en curso. la 4 no va
```

**Qué salió:** Corrigio un item extra me muestra que le falta que hacer con el flujo del listado con lo que está en MUST.

---

## Prompt 21

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Tienes razón el cambio de estado debe ser posible al completar la tarea. pon el item 4 en MUST ya que es parte del flujo de tickets normal, sin el no tendría sentido la gestion
```

**Qué salió:** Ajusta la tarea de cambio de estados pasandola de SHOULD a MUST

---

## Prompt 22

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
genera el documento con los 5 bloques, lo revisaré
```

**Qué salió:** creó el documento docs/prd/alcance-mvp-salv.md agregando pedazos de 3 tramos que no explicitaba el readme. Pensó que la parte A debía aparecer en el alcance (interrogatorio también).La Parte B quedo vacía (Se revisa y continúa).

---

## Prompt 23

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Elimina el archivo y pon en el sólo los 5 bloques con Problema y contexto; Usuario, roles y que problema resuelve, como se resuelve hoy; que valor aporta; cual es el alcance y el no-alcance
```

**Qué salió:** Ajustó docs/prd/alcance-mvp-salv.md con solo los cinco bloques pedidos; se quitó el resto

---

## Prompt 24

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
cambia el must 1 por ver tareas por estado, por defecto pendientes y en curso.
```

**Qué salió:** cambió el filtro a estado con un default de pendientes y en curso.

---

## Prompt 25

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
cambia en el no alcance los casos que entran en "notificaciones push, integración con Slack, roles/permisos avanzados, analítica/reporting, comentarios en tareas." Añade entre paréntesis (regla pre-establecida en Readme)
```

**Qué salió:** Las cinco exclusiones que fija el README ya llevan la marca "(regla pre-establecida en Readme)" en el no-alcance de docs/prd/alcance-mvp-salv.md. Se han mantenido sus justificaciones. No hay nada commiteado.

---

## Prompt 26

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Pasa lo que es could a no-alcance indicando que excede lo esperado en un producto minimo viable.  Pasa los should como respuesta a la linea 2 de que quedó fuera  los motivos principales es que no están bien fundadas las necesidades, su valor es dudoso y no es necesario como para un MVP.
```

**Qué salió:** El alcance queda en 4 MUST. Los dos COULD pasan al no-alcance (ahora 17 exclusiones) y los cuatro SHOULD aparecen como línea 2 de una nueva sección Parte B. Las líneas 1 y 3 de la Parte B siguen sin escribir y no hay nada commiteado.

---

## Prompt 27

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
para la ultima linea indicar que la que más duda genera es la de corregir una tarea. Esta mayormente porque errar en una descripción es muy natural lo mismo que cambiar la fecha.  Se debería añadir en la proxima versión.
```

**Qué salió:** La línea 3 de la Parte B ya está escrita: la exclusión más dudosa es "corregir una tarea", con propuesta de añadirla en la próxima versión. Falta la línea 1, con los dos números, y no hay nada commiteado.

---

## Prompt 28

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
para la línea 1 indica que la herramienta propuso 10 y quedaron 4
```

**Qué salió:** ajusta y propone hacer un PR.

---

## Prompt 29

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
verifica los criterios de aceptacion/evaluacion del documento de alcance
```

**Qué salió:** Revisa el documento de alcance contra los criterios del README: cumple cinco y falla dos. Faltan los tramos de terreno e interrogatorio, y la línea 3 no dice qué tendría que pasar para que la exclusión entrara. Además hay una incoherencia: una tarea tomada no se puede soltar. No he cambiado nada.

---

## Prompt 30

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
mueve el caso de borrar tarea a los casos descartados en la pregunta 2
```

**Qué salió:** "Borrar una tarea" pasa del no-alcance (que queda en 16 exclusiones) a la línea 2 de la Parte B, que ahora lista cinco descartes. No hay nada commiteado.

---

## Prompt 31

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
de las 5 cosas de la parte b deja cambiar el estado, crear tarea y marcar vencidas.
```

**Qué salió:** La línea 2 de la Parte B queda con tres descartes: cambiar el estado en dos clics, crear en segundos y marcar las vencidas. "Corregir" y "borrar" vuelven al no-alcance, que suma 18 exclusiones. No hay nada commiteado.

---

## Prompt 32

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
cambia la descripion de B.2 para comenzar con: Estos tres puntos quedaron fuera por estar orientados más a usabilidad que al propio planteamiento y  que no tienen un aporte real para el MVP:
```

**Qué salió:** La línea 2 de la Parte B se modifica

---

## Prompt 33

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Agrega un estado anulado además de los pendientes y en curso.  Justifica fuera del alcance Borrar tarea marcarla como anulada. Vuelve a analizar el resultado del archivo pero considera que la parte A del readme refiere a tareas por hacer. Nada dice de agregarlas al alcance
```

**Qué salió:** se agrega el estado "anulada", y borrar una tarea se justifica ahora con anularla como alternativa. Con tu lectura de la Parte A el documento cumple el formato; quedan abiertas la condición de entrada en la línea 3 y la tarea tomada que no se puede soltar. 

---

## Prompt 34

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Cambia el texto B3. en vez de debería añadirse en la proxima versión pon "Si no se adaptan con  el uso de la anulación se deberia agregar"
```

**Qué salió:** La línea 3 de la Parte B incluye la condición de entrada: si el equipo no se adapta a usar la anulación, se agrega "corregir una tarea". Sigue abierto lo de la tarea tomada que no se puede soltar, y no hay nada commiteado.

---

## Prompt 35

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
el cambio de estado está mal definido. Es posible cambiar una tarea de un estado a otro.
```

**Qué salió:** Corté la ejecución

---

## Prompt 36

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Aajusta el cambio de estado. Es posible cambiar una tarea de un estado a otro., Si una tarea está asignada puede ser devuelta al estado pendiente quitando la asignación
```

**Qué salió:** ajusta acorde a lo solicitado

---

## Prompt 37

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
al actualizar la pagina se ven los cambios, no es necesario destacarlos en un MVP
```

**Qué salió:** actualiza el item solicitado pergunta si hace el PR

---

## Prompt 38

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Todavía no, quiero revisarlo antes
```

**Qué salió:** mantien el archivo para edicion manual.

---

# Correcciones tras el feedback del TA

## Prompt 39

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
revisa el  readme y el output que se generó para la sesion 2
```

**Qué salió:** Revisó el README de la sesión 2 contra lo que entregaste (docs/prd/alcance-mvp-salv.md y prompt.md en la rama alcance-salv). Hay dos huecos de entrega y varias incoherencias de contenido. No cambió nada.

---

## Prompt 40

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
los arreglos a hacer son 

<pasted_content id="628e">
REVISIÓN DETALLADA: Ejercicio FlowSync — recorte del MVP (S2)
Hola Sergio. Se nota que pensaste de verdad el recorte: cuatro MUST con criterios de aceptación claros, un NO-alcance largo y razonado, y una línea 3 en la Parte B con una tensión real: «Chocan dos cosas: lo mínimo para validar el MVP frente a lo habitual que es equivocarse.» Y tu registro de prompts es de los más honestos que se pueden ver: 38 prompts, con los que no funcionaron y con notas críticas como «noto que está pobre y desatinada la justificación». Corregir a la IA con criterio es la habilidad que busca el ejercicio, y la tienes.

Lo que falta es de orden, no de fondo. Los tramos 1 y 2 no están en el documento, y tus prompts reales están en prompt.md mientras prompts.md sigue como plantilla. Abajo te explico cómo moverlo todo paso a paso.

📊 Niveles por criterio
#	Criterio	Nivel	Justificación y evidencia
1	Estructura de los tres tramos	❌	Están los 5 bloques, pero faltan el tramo 1 (terreno) y el tramo 2 (interrogatorio). El documento arranca en «## 1. Problema y contexto».
2	Calidad del NO-alcance	⚠️	18 exclusiones frente a 4 MUST, todas con porqué, sin «no da tiempo». Muchas se justifican por necesidad, no por hipótesis: «La inmediatez es un beneficio, no una necesidad.»
3	Parte B, línea 1 (números)	✅	«La herramienta propuso 10; quedaron 4.» Cuadra con tu prompt 6 (lista de 10) y con los 4 MUST del documento.
4	Parte B, líneas 2 y 3	⚠️	La línea 3 es muy buena: «Chocan dos cosas: lo mínimo para validar el MVP frente a lo habitual que es equivocarse.» En la línea 2, «Crear una tarea en segundos» ya está dentro del alcance, así que no es una exclusión real.
5	Nivel de producto y tamaño	✅	Sin tablas, endpoints ni arquitectura; 63 líneas, cabe en una pantalla larga. El formato GWT baja un escalón hacia la especificación (ver observaciones).
6	Coherencia (ficha, terreno, supuestos)	⚠️	Desviaciones de la ficha declaradas (tiempo real, dos clics), pero el riesgo #1 queda «sin mitigar en el MVP» y no hay supuestos declarados.
7	prompts.md: fidelidad y completitud	⚠️	El contenido real está en prompt.md (singular); prompts.md sigue siendo la plantilla: «Este es el ejemplo. Bórralo.»
8	prompts.md: calidad del encargo	⚠️	Buen arranque (prompt 3: 5 preguntas, sin modelo ni endpoints), pero la ficha va en dos mensajes y el recorte se hace con correcciones sueltas.
9	Criterio propio y proceso	✅	Corriges a la IA con criterio: «noto que está pobre y desatinada la justificación». Pides una auditoría contra el README (prompt 29) y aplicas los arreglos.
NIVEL GENERAL: ⭐⭐⭐ Bueno — tienes lo difícil resuelto (el recorte, el criterio propio y un log de prompts completo); te falta pulir dos cosas: añadir los tramos 1 y 2 y pasar tus prompts al archivo prompts.md.

🌟 Lo que ya funciona
Tomar una tarea en exclusiva. «Dada una tarea que ya tiene responsable, cuando otra persona intenta tomarla, entonces no puede, y ve quién la tiene.» Resuelve la colisión aunque la lista esté vieja, que es justo lo que importa sin actualización en vivo.
Honestidad sobre el riesgo #1. Dices que la información vieja «queda sin mitigar en el MVP y se observa durante la semana de uso». Eso es mejor que fingir que está resuelto.
Línea 3 de la Parte B. Eliges «corregir una tarea», nombras las dos cosas que chocan y das una condición de entrada concreta: si el equipo no se adapta a anular y recrear.
Marcaste las exclusiones heredadas con «(regla pre-establecida en Readme)». Así se ve cuáles son decisiones tuyas y cuáles no.
Tu auditoría del prompt 29 detectó que faltaban los tramos y que una tarea tomada no se podía soltar. Lo segundo lo arreglaste en el prompt 36; la señal ya la tenías.
🛠️ Tus próximos 3 pasos (por impacto)
Añade el tramo 1 y el tramo 2 al principio del documento. Es el cambio que más pesa y lo tienes casi hecho en tu log. No hace falta que el documento crezca mucho: unas 15-20 líneas.

Tramo 1 (3-5 líneas), a partir de tu prompt 1: «Hoy FlowSync solo gestiona cuentas: registro, login, perfil y logout. El único dato de producto es el usuario; no hay tareas, equipos ni espacios.»
Tramo 2: las 5 preguntas del prompt 3, cada una con su respuesta resumida de la ficha, y la lista de supuestos que la IA decidió (los del prompt 5: estados fijos, solo título obligatorio, sin «no leído», espacio único).
Con esto el criterio 1 pasa a Cumple. Además, al declarar los supuestos resuelves el criterio 6. Por ejemplo, para el detalle de MUST 4: «Pasar a en curso una tarea libre equivale a tomarla.»

Mueve tus prompts a prompts.md. Tu contenido ya está en el formato pedido, con modelo y herramienta en cada bloque; solo está en el archivo con otro nombre. Tranquilo, es un minuto:

Copia el contenido de prompt.md sobre prompts.md, sustituyendo todo (así desaparece el «Bórralo»).
Borra prompt.md.
Si lo haces desde terminal: git mv -f prompt.md prompts.md, y luego commit y push a tu rama. El PR se actualiza solo.
Con esto el criterio 7 pasa a Cumple. El criterio 8 sigue en Parcial por la ficha en dos mensajes, pero eso queda para el próximo ejercicio: pega la ficha entera de una vez.

Reescribe las exclusiones clave como hipótesis y cambia un elemento de la línea 2. Ejemplo para la primera exclusión: «Ver cambios sin refrescar: no ayuda a validar que la gente mantiene la lista al día, porque la información se queda vieja cuando nadie actualiza, no cuando tarda en llegar. "Llego y miro" se cumple abriendo la lista.» Si nombras 2-3 hipótesis al inicio del NO-alcance (H1, H2, H3), cada exclusión puede apuntar a una. Para la línea 2, «Crear una tarea en segundos» ya está dentro del alcance; sustitúyela por algo que sí sacaste. Ejemplo con «Destacar lo que se ha movido»: «No ayuda a validar H1: al refrescar ya se ve quién está en qué; destacarlo solo añade comodidad.» Con esto subes el criterio 2 a Cumple y la línea 2 del criterio 4 queda resuelta.

🔍 Detalle por criterio (solo los que tienen hallazgos)
Criterio 1. El README pide los tres tramos en orden. En el prompt 33 interpretas que la «parte A» se refiere a tareas por hacer y que no hace falta añadirla; la lectura es comprensible, pero el ejercicio pide dos tramos más antes del alcance. Tu auditoría del prompt 29 lo había visto bien. Fix: paso 1.

Criterio 2. Todas las exclusiones tienen porqué y ninguna recurre a «no da tiempo». Las heredadas de la ficha (push, Slack, roles) están bien argumentadas. Las que son tuyas (live, corregir, destacar) se apoyan en «no hace falta para ver tareas y tomarlas». Es un criterio válido, pero conviene decir qué hipótesis queda sin validar. Fix: paso 3.

Criterio 4. En «Ver marcadas las tareas vencidas» sí hay un recorte real y bien dicho: «La fecha de vencimiento ya se ve en la lista; marcarlas no cambia ninguna decisión del equipo». Lo mismo conviene para los otros dos. Fix: paso 3.

Criterio 6. No hay supuestos declarados porque falta el tramo 2; al añadirlo se resuelve. Un detalle menor: MUST 4 permite pasar una tarea libre a «en curso» sin responsable, y un supuesto lo cubriría. Otro: la ficha dice que la mitigación del riesgo #1 es que actualizar cueste dos clics, y tú lo sacaste del alcance. Es válido y está declarado; si lo que quieres validar es que la gente actualiza, el coste de actualizar es la variable a proteger, y quizá merezca una línea en el MUST 4: «el cambio de estado se hace desde la propia lista». Fix: paso 1.

Criterio 7. Tus prompts son verbatim (con faltas como «ententer» e «indocado»), con modelo y herramienta en cada uno, y con los que fallaron (prompts 19, 20 y 35). Solo cambia el nombre del archivo. Fix: paso 2.

Criterio 8. La ficha se pega en el prompt 4 y la línea de «Fuera del MVP» llega en el prompt 5. El README pide pegarla entera de una vez. Los prompts de recorte (7, 14, 18, 26, 31) funcionan, pero un solo prompt inicial con «recorta agresivo y justifica cada exclusión por la hipótesis que no ayuda a validar» te habría ahorrado las vueltas de los prompts 15 a 21.

🧭 Observaciones
Archivo de prompts con otro nombre. prompt.md contiene el log real. prompts.md sigue siendo la plantilla. Lo tratamos como «los prompts están, pero mal nombrados».
Formato GWT. Tus criterios Dado/cuando/entonces son claros, pero se acercan a una especificación de comportamiento. Para un documento de alcance, una frase por capacidad suele bastar.
Desviaciones de la ficha, declaradas. Actualización en vivo y límite de dos clics quedan fuera. Están declaradas, y la de «en vivo» está bien defendida porque «llego y miro» se cubre al abrir la lista.
Descripción del PR. El texto está difícil de seguir. Con dos líneas («qué entrego» y «qué dejé pendiente») bastaría.
🚀 Para cerrar
Te llevas de este ejercicio algo que no se enseña fácil: recortar con criterio, decir en voz alta lo que queda sin resolver y corregir a la IA cuando se queda corta. El siguiente paso es corto porque casi todo está hecho. Los tramos salen de tus prompts 1, 3 y 5, y mover prompt.md es cuestión de un commit. Cuando lo tengas, la entrega va a reflejar el nivel que ya muestra tu proceso.
</pasted_content id="628e">
```

**Qué salió:** Renombra prompt.md a prompts.md y reescribe el alcance: tramos 1 y 2, supuestos, H1–H3 en el NO-alcance y la línea 2 de la Parte B. El staging se frena antes del commit.

---

## Prompt 41

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
dame la lista detallada de los errores detectados y sus status
```

**Qué salió:** En alcance-salv, prompt.md ya está renombrado a prompts.md y el alcance tiene los tramos 1 y 2, las hipótesis H1–H3 y la línea 2 corregida. No hay commit ni push porque frenaste el staging.

---

## Prompt 42

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Todavía no, quiero revisar el diff antes.
```

**Qué salió:** De acuerdo, no toco nada. Los cambios están en el árbol de trabajo de `alcance-salv` y puedes verlos con: ```bash git diff -- docs/prd/alcance-mvp-salv.md ``` ```bash git diff --cached --stat ``` El primer comando muestra el alcance reescrito, que todavía no está preparado para commit. El segundo confirma el cambio de nombre de `prompt.md` a `prompts.md`, que ya sí lo está. Cuando termines de revisarlo, dime si hago el commit o qué quieres cambiar.

---

## Prompt 43

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
necesito cambiar tambien la parte B linea 2 no?
```

**Qué salió:** Ya está cambiada en el archivo. Lo único que falta es tu revisión y el commit. Así quedó la línea 2 en `docs/prd/alcance-mvp-salv.md`: - **Cambiar el estado en dos clics como máximo.** Se mantiene, pero ahora se justifica con la hipótesis H3 en lugar de «usabilidad». - **Destacar lo que se ha movido desde la última visita.** Sustituye a «Crear una tarea en segundos», que ya estaba dentro del alcance. Se justifica con H1, siguiendo el ejemplo del TA. - **Ver marcadas las tareas vencidas.** Queda igual, porque el TA lo dio por bueno. También quité la frase de introducción «orientados más a us…

---

## Prompt 44

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
explica porqué no es correcta la calidad del no alcance en la aseveración: 18 exclusiones frente a 4 MUST, todas con porqué, sin «no da tiempo». Muchas se justifican por necesidad, no por hipótesis: «La inmediatez es un beneficio, no una necesidad.»
```

**Qué salió:** No es que el NO-alcance esté mal: el TA le pone ⚠️, no ❌. La cantidad y el hecho de que cada exclusión tenga su porqué están bien. Lo que falla es **la forma del argumento**: justificas contra el alcance que ya decidiste, no contra lo que el MVP tiene que demostrar. ### Por qué «necesidad» no basta 1. **Es circular.** «No hace falta para ver tareas y tomarlas sin pisarse» mide la exclusión con el alcance que tú mismo fijaste. Lo único que dice es «no está en el alcance porque no está en el alcance». No explica por qué el alcance es ese. 2. **No se sostiene ante un desacuerdo.** «Beneficio f…

---

## Prompt 45

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
como se puede cambiar por una frase completa? mira todo el parrafo en su conjunto contando que aún no está definido h1  a h3
```

**Qué salió:** Como en la sección 4 todavía no existen H1–H3, el criterio de corte tiene que nombrar las tres apuestas en palabras, sin etiquetas. Las etiquetas aparecen después, en el NO-alcance. **Párrafo actual (sección 4):** > El criterio de corte es **necesidad frente a beneficio**. Solo entra lo imprescindible para ver el trabajo abierto, tomarlo sin pisarse y cerrarlo. Hay un único espacio compartido, y todo el que se registra pertenece a él. Los estados son fijos: pendiente, en curso, terminada y anulada. **Propuesta:** > El criterio de corte es **qué hace falta para validar las tres apuestas del …

---

## Prompt 46

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
que otra palabra mejor que apuestas puedes usar?
```

**Qué salió:** Te recomiendo **hipótesis**. Es la palabra que usan el README («qué hipótesis del producto no ayuda a validar») y el TA, y encaja con las etiquetas H1–H3, porque la H ya es de hipótesis. Con «apuestas», las etiquetas no se explican solas. Alternativas, por si prefieres otro matiz: - **Supuestos a validar.** Es claro, pero choca con la lista de «Supuestos» del tramo 2, que significa otra cosa: huecos decididos sin validar. - **Premisas.** Suena más formal y menos a algo que puede fallar. - **Preguntas que debe responder el MVP.** Es muy explícito, pero más largo. Encaja si después redactas c…

---

## Prompt 47

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
está bien, haz los cambios
```

**Qué salió:** El criterio de corte de la sección 4 ahora nombra las tres hipótesis, y la introducción de la sección 5 las numera como H1–H3. Todo está en alcance-salv sin commit; solo el cambio de nombre a prompts.md está preparado.

---

## Prompt 48

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
hay un detalles que creo: en un producto mínimo viable las tareas que se pueden hacer de otra forma no son requeridas. Dime si es una hipotesis valida, puedes buscar en internet
```

**Qué salió:** Sí es válida, pero como **criterio de recorte**, no como **hipótesis**. Es una práctica conocida: los MVP de tipo *concierge* y *Wizard of Oz* no construyen lo que se puede resolver a mano o de otra forma mientras se valida lo principal ([Mind the Product](https://mindtheproduct.com/wizard-of-oz-vs-concierge-testing-behind-the-curtain-or-behind-the-desk/), [Learning Loop](https://learningloop.io/blog/concierge-vs-wizard-of-oz)). **Por qué no es una hipótesis:** en el sentido del README, una hipótesis es una afirmación sobre el usuario o el producto que el MVP puede confirmar o refutar, como…

---

## Prompt 49

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
me preocupa el criterio debil de ver cambios sin refrescar. Hay una de las frases del producto solicitado que se contradiga con ello?
```

**Qué salió:** Sí. Dos frases de la ficha chocan directamente con excluir «ver cambios sin refrescar», y una tercera del párrafo original lo refuerza. **Frases que contradicen la exclusión:** 1. **La definición de tiempo real:** *«"Tiempo real" = ver los cambios de estado de las tareas sin refrescar ni preguntar.»* Es la contradicción más fuerte: el producto define el concepto exactamente con lo que tú excluyes. Encaja con lo que el README marca como lo más grave: *que el documento pida algo que él mismo prohíbe*. 2. **Por qué se sostiene:** *«son dos clics sobre una **lista ya abierta**»*. Esta es más su…

---

## Prompt 50

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
dime en estos detalles que ponemos hay información sobre el como se implementa?
```

**Qué salió:** Casi no hay. El documento no tiene tablas, endpoints, tecnologías ni mecanismos como websockets o polling. Solo tres puntos se acercan, y uno de ellos sobra. **Sobra (es cómo se implementa):** - **Tramo 1:** *«con sesión por token»* y *«(más sus tokens de acceso)»* describen el mecanismo de autenticación, no una capacidad. Basta con: «Hoy FlowSync solo gestiona cuentas: registro, login, perfil y logout. El único dato de producto es el usuario; no hay tareas, equipos ni espacios». **En el límite, pero aceptable (es diseño de producto, no implementación):** - **MUST 4**, *«desde la lista, sin…

---

## Prompt 51

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
debemos ajustar todo eso. cambia lo del token,  y lo del refresco por actualización de información en vivo por cada cambio
```

**Qué salió:** El tramo 1 ya no menciona tokens, y la exclusión en vivo se llama «Actualización de la información en vivo por cada cambio». Sigue sin commit en alcance-salv. Esta exclusión todavía contradice la definición de tiempo real de la ficha.

---

## Prompt 52

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
ajusta a tu criterio estos datos para que se asemejen al readme y mantengan la independencia de implementación
```

**Qué salió:** El MUST 1 ahora incluye ver los cambios sin refrescar, como define la ficha, y del NO-alcance solo quedan fuera los avisos de cada cambio. Nada menciona cómo se implementa. Sigue sin commit en alcance-salv.

---

## Prompt 53

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
pero la exclusión de no alcance se debe dar por oposición a una premisa o hipótesis. No es lo mismo que decir que no ayudan a validar
```

**Qué salió:** La exclusión de avisos en vivo ahora se justifica por oposición a la premisa «resumen que espera, no aviso que interrumpe». Las demás exclusiones siguen con «no ayuda a validar», que es la forma que pide el README. Sigue sin commit en alcance-salv.

---

## Prompt 54

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Sí: en el NO-alcance, donde una exclusión contradiga una premisa de la ficha, ponla en forma de oposición; el resto déjalo con «no ayuda a validar».
```

**Qué salió:** Once exclusiones del NO-alcance ahora se justifican por oposición, citando la premisa de la ficha. Comentarios, destacar lo que se ha movido, corregir y borrar siguen con «no ayuda a validar», y la introducción explica las dos formas. Sigue sin commit en alcance-salv.

---

## Prompt 55

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Todavía no, quiero revisar el diff antes.
```

**Qué salió:** De acuerdo, no hago commit. Puedes ver todos los cambios con: ```bash git diff -- docs/prd/alcance-mvp-salv.md ``` El cambio de nombre a `prompts.md` ya está preparado para commit y lo ves con `git diff --cached --stat`. Avísame cuando termines o si quieres ajustar algo.

---

## Prompt 56

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
dame la letra del readme que refiere a la parte B linea 2
```

**Qué salió:** Es la línea 181 de [README.md](README.md:181): > 2. **Tres cosas que dejaste fuera, y por qué cada una.** El porqué tiene una forma concreta: **qué hipótesis del producto no ayuda a validar**. *"No da tiempo"* no vale, porque no es una decisión de producto: es una excusa de calendario, y mañana deja de ser cierta. En la sección «Cómo saber que la has hecho bien», la línea 195 añade un control sobre las tres líneas: > - **Las tres líneas están escritas y son concretas.** Si la tercera dice *"ninguna, lo tengo todo claro"*, vuelve a mirar: es la respuesta de quien aceptó la primera propuesta.

---

## Prompt 57

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
el hecho es que algunas propuestas aportan a la usabilidad pero no a las hipotesis.  Haz una autoevaluación
```

**Qué salió:** Tu idea es válida y cumple el README si la dices completa: «mejora la usabilidad, pero no ayuda a validar ninguna hipótesis» es justo la forma que se pide. Revisando lo que hice, cometió tres errores con tu línea 2. ### Autoevaluación | # | Qué hice | Problema | |---|---|---| | 1 | Quité tu encuadre de «usabilidad» y lo reescribí con mis argumentos | Tu intuición era correcta. Solo le faltaba nombrar la hipótesis («…y no ayudan a validar ninguna hipótesis»). Debió completarla, no sustituirla, porque el recorte se evalúa como tuyo. | | 2 | Mantuve «Cambiar el estado en dos clics» y escribió …

---

## Prompt 58

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
si aplicala
```

**Qué salió:** La línea 2 de la Parte B ahora dice que las tres exclusiones mejoran la usabilidad sin validar ninguna hipótesis: tareas vencidas, destacar lo que se ha movido y borrar una tarea. Las tres están entre las 10 que propuso la IA. Sigue sin commit en alcance-salv.

---

## Prompt 59

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Todavía no, quiero revisar el diff antes.
```

**Qué salió:** De acuerdo, no hago commit. Cuando termines de revisar el diff, avísame si hago el commit o qué quieres ajustar.

---

## Prompt 60

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
haz una review especialmente en los puntos marcados por el corrector
```

**Qué salió:** La entrega ya cumple casi todo lo que marcó el corrector. Quedan una incoherencia que el corrector detectaría y dos ajustes recomendables. ### Estado por criterio del corrector | # | Criterio | Antes | Ahora | Evidencia | |---|---|---|---|---| | 1 | Tres tramos | ❌ | ✅ | Tramo 1 (línea 3), Tramo 2 con 5 preguntas y supuestos (líneas 7–23), y luego los 5 bloques. | | 2 | Calidad del NO-alcance | ⚠️ | ✅ | 18 exclusiones frente a 4 MUST. Cada una se justifica por oposición a una premisa citada o por la hipótesis que no ayuda a validar. | | 3 | Parte B, línea 1 | ✅ | ⚠️ | Ver el hallazgo 2. | |…

---

## Prompt 61

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Aplica todos los arreglos.
```

**Qué salió:** Añade las tareas vencidas al NO-alcance, una nota en la Parte B sobre la actualización en vivo, el encabezado del tramo 3, un supuesto sobre devolver tareas ajenas y estos prompts a prompts.md.
