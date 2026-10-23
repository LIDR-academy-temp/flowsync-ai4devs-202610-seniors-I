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

Borra el ejemplo de abajo cuando escribas el primero.

---

## Prompt 1

**Modelo:** Claude Opus 5.5 300k Medium
**Herramienta:** Cursor

```
Estoy tratando de ejecutar "make start" en el directorio donde me encuentro, pero hay un error. PUedes tratar de ejecutarlo, diagnosticar y corregir?
```

**Qué salió:** make start ya arranca. El fallo estaba en el frontend: Vite no encontraba @tailwindcss/vite.

## Prompt 2

**Modelo:** Claude Opus 5.5 300k Medium
**Herramienta:** Cursor

```
En modo ask (sin tocar archivos):
El objetivo es escribir el documento docs/@docs/alcance-mvp-cp.md  partiendo del siguiente enunciado:

"Quiero que FlowSync sea una herramienta para que los equipos remotos sepan en qué está trabajando cada uno sin tener que hacer reuniones de sincronización. Algo tipo tareas compartidas pero más en tiempo real y menos rollo que Jira."

Lo primero que necesito es que hagas una inspección del repositorio en la rama actual (s2/start) y que identifiques las capabilities ya construidas y el modelo de datos actual. Observarás que hay frontend y backend. Lo necesito en un formato resumido y breve, pero completo. No quiero que inventes funcionalidad, ni tampoco que diagnostiques sobre falencias o brechas existentes. Es una inspección sin juicio.
```

**Qué salió:** Retornó la tabla de capabilities del backend y frontend. Detectó correctamente stack tecnológico, endpoints y contratos, rutas y modelo de datos de las dos tablas: users y auth_access_tokens. Para cada tabla su respectivo schema y relaciones. Identificó pantallas, restricciones de acceso y resumió cada hallazgo.

## Prompt 3

**Modelo:** Claude Opus 5.5 300k Medium
**Herramienta:** Cursor

```
En modo ask (sin tocar archivos):
Bien, ahora, necesito que generes  las cinco preguntas que más reducirían la incertidumbre sobre el problema cuyo enunciado compartí anteriormente. No quiero que incluyas aspectos del modelo de datos o endpoints. Se conciso, pero razona bien tus preguntas y prioriza.
```

**Qué salió:** Retornó las cinco preguntas empezando por el siguiente párrafo: Las ordeno por cuánto cambia el producto según la respuesta. Las dos primeras definen qué se construye, las dos siguientes cómo se construye y la última sirve para comprobar si funciona.

## Prompt 4

**Modelo:** Claude Opus 5.5 300k Medium
**Herramienta:** Cursor

```
En modo ask (sin tocar archivos):
Te expondré las respuestas a continuación:

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

Y lo que ya está decidido que queda fuera del MVP:
- Fuera del MVP: notificaciones push, integración con Slack, roles/permisos avanzados, analítica/reporting, comentarios en tareas.
```

**Qué salió:** Con estas respuestas ya se puede escribir docs/alcance-mvp-cp.md. Antes conviene cerrar cuatro puntos donde las respuestas se tensan entre sí o dejan una decisión abierta, porque cada uno cambia lo que se construye.

## Prompt 5

**Modelo:** Claude Opus 5.5 300k Medium
**Herramienta:** Cursor

```
En modo ask (sin tocar archivos):
Gracias por tus preguntas. Necesito que decidas los caminos más simples pero seguros para cada una de tus consultas. Anótalos como supuestos en tu memoria.
```

**Qué salió:** Retornó los caminos que tomo para cada punto, como supuestos numerados S1 a S5. Siguen activos en esta conversación, pero en modo Ask no puedo guardarlos en ningún fichero ni en un almacén de memoria. Cuando pases a modo Agent, los escribo en la sección de supuestos de docs/alcance-mvp-cp.md para que no se pierdan con la sesión.

## Prompt 6

**Modelo:** Claude Opus 5.5 300k Medium
**Herramienta:** Cursor

```
En modo ask (sin tocar archivos):
Bien, ahora sí, vamos a ir aterrizando el alcance. Necesito:
- Problema: Reformúlalo como un problema de usuario, sin mencionar ninguna solución técnica.
- Usuarios: ¿Para quién va dirigida esta solución? ¿Qué tipo de usuario estoy ignorando en esta definición? y ¿Quién NO es el usuario?
- propuesta de valor
- Alcance: De este alcance, ¿qué debería ser no-alcance para un primer MVP entregable? Justifica cada recorte. Utiliza MoSCoW: Must have (sin esto no hay MVP), Should have (importante, pero el MVP sobrevive sin ello), Could have (agradable si sobra tiempo) y Won't have (fuera, y a propósito)
- NO-alcance: Deja aquí el Won't have de MoSCoW. Sólo lo necesito dentro de la sección "NO-alcance".

Vamos a revisarlo antes de escribirlo al archivo final.
```

**Qué salió:** Llevó a cabo la tarea con diligencia. A mi parecer hizo bien el ejercicio, e incluso abajo justificó dos recortes por ir contra lo que se había indicado. Estos se pasaron a la lista de Should en lugar de Must.

## Prompt 7

**Modelo:** Claude Opus 5.5 300k Medium
**Herramienta:** Cursor

```
Bien, escribe en el documento siguiendo el formato que se ha indicado.
```

**Qué salió:** Llevó a cabo la tarea con diligencia. A mi parecer hizo bien el ejercicio, e incluso abajo justificó dos recortes por ir contra lo que se había indicado. Estos se pasaron a la lista de Should en lugar de Must.

## Prompt 8

**Modelo:** Claude Opus 5.5 300k Medium
**Herramienta:** Cursor

```
En modo ask (sin tocar archivos): Si tuvieras que ser más estricto aún, ¿qué dejarías por fuera del MUST?
```

**Qué salió:** Me gustó el criterio que utilizó para aplicar la siguiente ronda de recortes y en cada uno expuso argumentos apegados a la definición de realidad que se le pintó, aún cuando son características que, en mi criterio inicial, tenían sentido dejar vigentes en el MVP. Esto fue lo que indicó antes de exponer los recortes: Siendo más estricto, sacaría tres cosas del Must. En los tres casos la pregunta es la misma: ¿se puede validar la hipótesis principal sin esto? Esa hipótesis es que el equipo mantiene la lista al día y, gracias a eso, cancela la ronda de "¿en qué estás?".

## Prompt 9

**Modelo:** Claude Opus 5.5 300k Medium
**Herramienta:** Cursor

```
En modo agente: Bien, vamos adelante con la escritura en docs/@docs/alcance-mvp-cp.md  siguiendo el formato que te he indicado previamente.
```

**Qué salió:** Llevó a cabo la escritura del documento en docs/alcance-mvp-cp.md con las secciones que se pidieron: Problema, Usuarios, Propuesta de valor, Alcance con MoSCoW y NO-alcance, donde está todo el Won't have. Además se añadieron dos cosas que no pedí: criterio de éxito y riesgo prijncipal, dentro de Propuesta de valor, sacados de las respuestas, y uan sección final de Supuestos, con S1 a S5. Estas son las decisiones que se acordaron y no se pierden con la sesión. Se ajustaron los S1 y S4 para que encajen con el Must estricto.

## Prompt 10

**Modelo:** Claude Opus 5.5 300k Medium
**Herramienta:** Cursor

```
Ahora necesito, al final del mismo documento, lo siguiente:
Sección: Parte B
1- Dos números: Cuántas cosas propuso la IA meter dentro del alcance inicial (antes de los recortes), y cuántas quedaron dentro después del recorte. Tal cual salieron, sin redondear ni explicar, sólo los números.

2- Las tres cosas que dejamos fuera cuando nos volvimos más estrictos y sus respectivas justificaciones. Tal como las revisamos anteriormente.

3- De las tres cosas que dejamos fuera, ¿cuál te sientes más inseguro? Yo opino que la que genera más incomodidad es la de ver los cambios sin refrescar la página, por al misma razón: va contra mi definición de "tiempo real", pero los argumentos utilizados me parecen sólidos ante el escenario real de este equipo de tramo.
```

**Qué salió:** Escribió la nueva sección pero no añadió etiquetas en los números de la parte B.1. Estas las puse luego yo a mano en el archivo por temor a que le cambiara algo más.
