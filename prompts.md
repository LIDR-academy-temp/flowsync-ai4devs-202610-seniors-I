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

## Prompt 1 — La spec de cuentas y acceso

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
No uses skills ni plugins; responde directamente. No modifiques ningún archivo de código.

Escribe la spec viva de lo que el sistema hace HOY en el vertical de cuentas y acceso: registro, inicio de sesión, sesión y perfil. Las dos capas: lo que pasa por la API (petición y respuesta) y lo que una persona ve y puede hacer en pantalla (pantallas de acceso, estado de sesión, protección de rutas). Nada de tareas ni de ninguna otra parte del sistema.

Lee el código antes de escribir: rutas, controladores, modelo de usuario, validadores y middlewares en el backend; pantallas, estado de sesión y protección de rutas en el frontend.

Escríbela en docs/spec-viva/eh.md con este formato exacto:
- Arriba un "## Purpose" de una o dos frases.
- Debajo "## Requirements", y bajo él cada "### Requirement: <nombre>" en el que el sistema SHALL hacer algo.
- Bajo cada requisito, al menos un "#### Scenario: <nombre>" con dos viñetas: "- **WHEN** ..." y "- **THEN** ...". La precondición va dentro del WHEN; no hay GIVEN.
- En castellano, salvo SHALL / MUST.

Reglas duras:
1. Nada de ADDED, MODIFIED ni REMOVED: es la verdad actual, no un delta.
2. Solo comportamiento observable desde fuera. Ni un nombre de clase, de archivo ni de ruta de código dentro de la spec.
3. Describe lo que el código hace, no lo que debería hacer. Si algo te parece un bug, escríbelo tal cual se comporta y márcalo con "> [DUDA] ¿bug o contrato?: <las dos lecturas>" debajo del requisito.

Cuando termines, en el chat (no en el archivo):
- Cuántos requisitos escribiste, numerados.
- Para cada uno, en una línea, dónde lo viste en el código (archivo y función), para que yo pueda comprobarlo.
```

**Qué salió:** escribió la spec en el archivo (13 requisitos, 42 escenarios, 8 marcas [DUDA]) y dio una referencia al código para cada requisito. En el chat dijo primero "14 requisitos" y en la misma respuesta se corrigió a 13: la ruta comodín no era un requisito aparte.

**Comprobación:** la comprobación requisito a requisito contra el código la hicieron dos revisores en una sesión paralela de Claude Code (Opus 5.5), uno para la API y otro para la pantalla. Antes, yo había leído el vertical por mi cuenta.
