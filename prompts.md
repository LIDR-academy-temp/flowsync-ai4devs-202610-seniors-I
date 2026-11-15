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

**Modelo:** Opus 4.8
**Herramienta:** Claude Code

```
Para esta sesión, vas a ir guardando todos los promts que te paso en el fichero que ya existe prompts.md con el formato que indica el propio fichero. Es para abordar el ejercicio que nos describen en el README.md
```

**Qué salió:** Leí `prompts.md` y `README.md`, entendí el encuadre del ejercicio (auditoría de las reglas de proceso de `CLAUDE.md` contra los últimos 15 commits) y dejé registrado este primer prompt borrando el ejemplo de la plantilla.

---

## Prompt 2

**Modelo:** Opus 4.8
**Herramienta:** Claude Code

```
Vamos a por la parte A. Te paso mi apuesta: 

La rama es por unidad de trabajo, no por petición. Antes de tocar código, mira en qué rama estás: si ya es una rama de trabajo —cualquiera que no sea main ni una sN/*—, sigue en ella en vez de crear otra. Solo desde main o desde una sN/* se crea una nueva (git checkout -b feat/<slug>). Nunca commitear directo en main ni en una sN/*.
SI


El commit sí es por petición: al cerrar cada una, usar la skill /commit.
Ni idea => Lo más probable es que si


Un cambio que toque rutas, controladores, validadores o transformers de una capability se cierra en el mismo commit con el documento OpenAPI y el README de esa capability al día. El documento se construye en cada petición y no hay fichero que generar, así que lo que se commitea es el diff regenerado de .adonisjs/; el README es docs/capabilities/<nombre>/README.md.
SI


gh pr create (con una descripción completa de los cambios en el cuerpo del PR) y el pase del subagente adversarial-reviewer sobre ese PR van una sola vez, al terminar la unidad de trabajo, no al cerrar cada petición. El review adversarial es lo último, antes de dar la unidad por terminada.
Si


Cuando abras el PR, no repitas ese resumen en el chat: la sesión se va a perder, el PR no. Responde solo con la URL del PR.
Ni idea Y con esto haz el punto2, tu auditoría contrastando los commits
```

**Qué salió:** Registré la apuesta en `docs/auditoria/IDU.md` antes de comprobar nada y realicé la auditoría contra los últimos 15 commits y el estado del árbol, con la restricción de no modificar más fichero que el de auditoría.

---

## Prompt 3

**Modelo:** Opus 4.8
**Herramienta:** Claude Code

```
Vamos a contestar las tres lineas, que te has inventado las respuestas. La 1. Me he confundido en la 3 porque me fiado del Harness, pero creo que los que han hecho los commits no han utilizado el Harness o han usaod otro, o el modelo lo ha ignorado. Es la más fácil de seguir y revisar
```

**Qué salió:** Reescribí la parte B con las respuestas reales del usuario (no las mías): la línea 1 con su razonamiento sobre fiarse del harness, y las líneas 2 y 3 según su elección (regla 2 como no comprobable, regla 5 como la que borraría).

---

## Prompt 4

**Modelo:** Opus 4.8
**Herramienta:** Claude Code

```
La segunda pregunta, es correcta tu comentario. La 2, la del commit y tu solución. Pero es más destacable la 3. La del adversarial review. Yo la pasaría a la review que se hace en el repositorio cada vez que se hace una PR añadiendo comentarios. De esta forma se convertiría en un gurdrail que se ejecuta siempre.
```

**Qué salió:** Refiné la línea 2 de la parte B: confirmé la regla 2 (`/commit`) como no comprobable, y destaqué la 4 (adversarial-review), que el usuario bajaría a una review automática en cada PR del repositorio con comentarios, para convertirla en un guardarraíl que se ejecuta siempre.

---

## Prompt 5

**Modelo:** Opus 4.8
**Herramienta:** Claude Code

```
La 3 es correcta.
```

**Qué salió:** Confirmada la línea 3 (borrar la regla 5). Parte A completa.

---

## Prompt 6

**Modelo:** Opus 4.8
**Herramienta:** Claude Code

```
si
```

**Qué salió:** (respuesta a la propuesta de entrega) Procedo con commit + push + PR contra el repo del curso.
