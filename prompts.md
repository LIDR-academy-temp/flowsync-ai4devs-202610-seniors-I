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

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Creame un documento de alcance de mvp para my proyecto en este
  repositorio. Tienes que escrivir-lo en "docs/prd/alcance-mvp-RTC.md.
  Descripcion del proyecto
  «Quiero que FlowSync sea una herramienta para que los equipos remotos sepan en qué está
  trabajando cada uno sin tener que hacer reuniones de sincronización. Algo tipo tareas
  compartidas pero más en tiempo real y menos rollo que Jira.»

  Des este proyecto ya esta decidio que queda fuera
  - Fuera del MVP: notificaciones push, integración con Slack, roles/permisos avanzados,
  analítica/reporting, comentarios en tareas.

  Formato del documento:
  - El terreno que ya existe: - Lo que ya existe en este proyecto investiga que esta echo
  y que no resumelo en 3-5 lineas
  - Interrogatorio: Las cinco preguntas con sus cinco respuestas que reducirian la
  incertidumbre del proyecto. Antes de escrivir esto preguntame no inventes las
  respuestas.
  - El Alcance:
    - Problema
    - Usuarios
    - Propuesta de valor
    - Alcance: Que va entrar en el proyecto, justifica
    - No alcance: Que no va entrar en el proyecto, justifica, es un mvp se agresivo recortando
```

**Qué salió:** Empezo a analizar el repo y a escribir el documento, paro para hacer-me las preguntas. Me las hizo con un formato multirespuesta, le propuse de hablar las preguntas para pegar el siguiente prompt. 

## Prompt 2

**Modelo:** Opus 5.5
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
  - Qué decisión cambia: no empezar algo que otra persona ya está tocando, y elegir lo siguiente sabiendo qué está libfuera "sentirse informado", eltiempo real no valdría lo que cuesta.
  - De dónde sale el estado: lo tla tarea, en segundos.Derivarlo de señales externas (Git/PRs, CI, calendario) está FUERA del MVP: es otro
  producto, con integraciones y O
  - Por qué se sostiene: no porque sea más agradable, sino porque son dos clics sobre una
  lista ya abierta, sin campos obrint ni estimación. Y quien loescribe cobra en el momento: esa misma lista es su cola de trabajo, la mira para decidir
  qué coge, y de paso deja de rectándole cómo va. Si elbeneficio fuera solo para los demás, no lo escribiría.
  - Si la información se queda vi sentido, y lo asumo. Es elriesgo #1 a validar, no un detalle. La mitigación es que actualizar cueste dos clics, no
  obligar a nadie.
  - Es donde se hace el trabajo, no donde se cuenta: sustituye al gestor de tareas, no
  convive con él. FlowSync crea ltro sitio. Convivir exigiríadoble actualización, que es como muere esta categoría.
  - Renuncia explícita a sprints,klog priorizado e informes. Unequipo que necesite eso no es nuestro usuario.
  - "Menos rollo que Jira" = crea estado en segundos, sin flujos de configuración ni campos obligatorios. Lo mínimo para saber quién está en qué.      - Qué necesita una tarea en el estado y fecha de vencimiento.La fecha, para ver de un vistazo qué se ha pasado de plazo.                           - Cómo se consume la lista: filntrarse en lo pendiente.
  - Éxito para el usuario: dejar de hacer la ronda de "¿en qué estás?" de la daily porquel estado del equipo se ve de u
  - Criterio a una semana de uso real: que el equipo cancele esa ronda y nadie pida que vuelva. Si la siguen haciendo i
  - Cuánto construir: una vertical fina y usable de punta a punta, no el andamiaje amplio de un producto. Prefiero una caa medias.
  Esta son las respuestas a tus preguntas

``` 
**Qué salió:** Escribio el documento de alcance, intento pushear y hacer commit. tuve que cortar-lo. 

## Prompt 3

**Modelo:** Opus 5.5
**Herramienta:** Claude Code
```
 no subas nada, no commitees nada
``` 
**Qué salió:** Paro y no commiteo ni pusheo nada 

## Prompt 4

**Modelo:** Opus 5.5
**Herramienta:** Claude Code
```
 Vamos a reducir el alcance, como has propuesto modifica A5 y A6 para excluir
``` 
**Qué salió:** Modofico el alcance de A5 y excluyo A6. 
