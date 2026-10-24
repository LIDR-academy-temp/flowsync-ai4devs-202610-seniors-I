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

**Modelo:** Haiku 5.5
**Herramienta:** Claude Code

```
Quiero que FlowSync sea una herramienta para que los equipos remotos sepan en qué está trabajando cada uno sin tener que hacer reuniones de sincronización. Algo tipo tareas compartidas pero más en tiempo real y menos rollo que Jira.
```

**Qué salió:** propuse un alcance de primera versión (equipos, tareas mínimas, vista por persona en tiempo real) sin tocar código, y pregunté si lo quería como especificación o implementado.

---

## Prompt 2

**Modelo:** Haiku 5.5
**Herramienta:** Claude Code

```
dame un resumen de lo ya construido en este repo (capabilities y modelo de datos actual) para no especificar lo que ya existe
```

**Qué salió:** funcionó a la primera. Leí rutas, migraciones y frontend del código: solo hay autenticación y no hay tablas de tareas ni equipos.

---

## Prompt 3

**Modelo:** Haiku 5.5
**Herramienta:** Claude Code

```
antes de continuar, ve guardando todos mis prompts de acuerdo a las instrucciones de prompts.md. El modelo que utilizaré es Haiku 5.5 Herramienta Claude Code
```

**Qué salió:** el archivo había cambiado desde que lo leí y tenía el ejemplo de plantilla (Opus 1M xHigh) en lugar del Prompt 1 anterior. Lo sustituí por los prompts reales.

---

## Prompt 4

**Modelo:** Haiku 5.5
**Herramienta:** Claude Code

```
pregunta antes de proponer: las cinco preguntas que más reducirían la incertidumbre sobre el problema, los usuarios y el alcance. Acota a una sola ronda, no bajes al modelo de datos o a los endpoints
```

**Qué salió:** pedí las cinco preguntas en una sola ronda, sin proponer nada todavía. Las respuestas llegaron en el prompt siguiente.

---

## Prompt 5

**Modelo:** Haiku 5.5
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
```

**Qué salió:** respuestas completas a las cinco preguntas. Con ellas, la propuesta anterior cambia: no hay entidad "equipo" y el alcance se reduce a una lista compartida de tareas.

---

## Prompt 6

**Modelo:** Haiku 5.5
**Herramienta:** Claude Code

```
El alcance en 5 bloques: problema, usuarios, propuesta de valor, alcance y NO-alcance.
```

**Qué salió:** entregué los cinco bloques en el chat (problema, usuarios, propuesta de valor, alcance y NO-alcance), con el NO-alcance sin justificar cada recorte.

---

## Prompt 7

**Modelo:** Haiku 5.5
**Herramienta:** Claude Code

```
Se más agresiva en exclusiones, justificando cada recorte
```

**Qué salió:** reescribí el NO-alcance con un recorte por línea y justificación. Entró en el chat, como la versión anterior.

---

## Prompt 8

**Modelo:** Haiku 5.5
**Herramienta:** Claude Code

```
Recorta más:
Fuera de alcance: 
- Roles de usuario,cada usuario registra su trabajo y cambia de etapa. 
- Notificaciones por email. Si existe interés de saber el estatus, se consulta la herramienta, no saturar de mensajes
- Definición y edición de perfil de usuario. Sólo se requiere saber el estatus de trabajo sin más detalles
```

**Qué salió:** incorporé los tres recortes (roles, email y perfil) al NO-alcance, con su justificación. Entró en el chat.

---

## Prompt 9

**Modelo:** Haiku 5.5
**Herramienta:** Claude Code

```
guarda este mvp en docs/prd/alcance-mvp-agnaedig.md
```

**Qué salió:** (pendiente de completar)
