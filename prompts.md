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

**Modelo:** Opus 1M xHigh
**Herramienta:** Claude Code

```
Leete el reademe. Vamos a abordar el apartado 2. Para ello vas a crear un agente que vamos a ir usando para ir revisando cada Requirement. Ese agente se ejecutará de forma independiente y recibirá el fichero de spec y el requirement que se quiere probar. Comprobará si el requirement y sus scenearios están cubeirtos por los test. Los test están ubicados en "backend/tests/functional". Este agente no edita código, solo comprueba si los test cubres los scenarios definidos.
```

**Qué salió:** creó el subagente `requirement-coverage` (read-only) a la primera.

---

## Prompt 2

**Modelo:** Opus 1M xHigh
**Herramienta:** Claude Code

```
Quiero que te leas las specs desde openspec/specs tanto la de auth como la de task y me saques la matriz del Apartado A usando el agente que acabamos de crear. Escribe la matriz en el fichero docs/verificacion/IDU.md
```

**Qué salió:** avisó de que la Parte A es solo el requirement «Lo que cada tarea muestra de su responsable» (no ambas specs enteras); tras confirmar el alcance, lanzó el agente y escribió la matriz: 3 scenarios, 0 cubiertos.

---

## Prompt 3

**Modelo:** Opus 1M xHigh
**Herramienta:** Claude Code

```
Vamos a implementar los test. Para ello vamos escribir los 3 tests que faltan en backend/tests/functional/tasks/ (estilo auth/) y ejecutarlos
```

**Qué salió:** escribió los 3 tests en `tasks/assignee.spec.ts` y los ejecutó: 2 verdes, 1 rojo. El rojo (scenario 2) destapa que `GET /api/v1/tasks` expone el email del responsable; no tocó el código y lo dejó en rojo, como pide el enunciado.
