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

**Modelo:** Claude Opus 5.5 (`claude-opus-5-5`)
**Herramienta:** Claude Code

```
vas a trabajar solo sobre el requisito «Lo que cada tarea muestra de su responsable» que está en openspec/specs/tasks/spec.md, el spec tiene otros requisitos y quedan por fuera del alcance del ejercicio, el objetivo es construir una matriz de trazabilidad: revisar, scenario a scenario, si cada uno tiene un test que lo cubre, y escribir los que falten. La matriz de trazabilidad y las tres líneas van juntas en docs/verificacion/jcpv.md
```

**Qué salió:** matriz (0 de 3 cubiertos), tres tests nuevos en `backend/tests/functional/tasks/` (uno en rojo: la lista expone el email del responsable) y las tres líneas, con la primera cifra pendiente de rellenar a mano.

## Prompt 2

**Modelo:** Claude Opus 5.5 (`claude-opus-5-5`)
**Herramienta:** Claude Code

```
vi la información generada, identifiqué cambios para la matriz de trazabilidad, 

La matriz de trazabilidad
La matriz mapea, scenario a scenario, si el requisito está cubierto por los tests. El formato lo fija esta lección y no es negociable: una fila por scenario y cuatro columnas. Encima, dos números: cuántos scenarios tiene el requisito y cuántos resultaron cubiertos — el primero se anota al empezar, el segundo al terminar.

El scenario, en una línea. Qué se espera y en qué situación. Si no cabe en una línea, es que estás juntando dos.

Qué test lo cubre, con el nombre exacto que aparece en la suite. Sin el nombre concreto, la columna va vacía: "seguro que algo lo cubre" no es una fila.

Cubierto · No cubierto · No lo sé. Los tres estados son válidos, y el tercero no es un fallo: es el resultado más informativo de los tres.

Si pusiste "no lo sé", qué te faltó para decidirlo. Media línea. Suele ser una de dos: no encontraste dónde se comprueba, o encontraste algo que se le parece y no dice exactamente lo mismo.

Así queda la tabla. Los dos números van encima — el primero antes de empezar, el segundo al terminar:
```

**Qué salió:** la matriz ajustada al formato: los dos números justo encima de la tabla, las casillas de prueba y de «no lo sé» vacías en vez de «—», y el test de login «parecido» sacado de la casilla de prueba a una nota debajo. El estado (0 de 3, todo «No cubierto») no cambia.

## Prompt 3

**Modelo:** Claude Opus 5.5 (`claude-opus-5-5`)
**Herramienta:** Claude Code

```
ya completé la información faltante en jcpv.md, y con esto deberíamos poder continuar con el pull request, pero dado que hiciste cambios en el código, necesito validar primero que el pull request se apegue a las siguientes condiciones: 

Un pull request desde tu fork, con tres cosas dentro y ni una más:

Tu archivo de docs/verificacion/, con la matriz y las tres líneas.

Los tests que hayas escrito, tal como quedaron: en verde, en rojo o a medias.

prompts.md, en la raíz del proyecto.
```

**Qué salió:** validación del PR #135: desde el fork, con solo los tres archivos pedidos (`docs/verificacion/jcpv.md`, `backend/tests/functional/tasks/assignee.spec.ts` y `prompts.md`) y sin cambios en el código de la aplicación. Tests ejecutados de nuevo: 2 en verde y 1 en rojo. Avisos sobre la línea 1 (dos números, sin explicar), la línea 2 y dos erratas, y los cambios locales todavía sin commitear.

## Prompt 4

**Modelo:** Claude Opus 5.5 (`claude-opus-5-5`)
**Herramienta:** Claude Code

```
actualicé el punto 1 y 2 de la sección B, esta bien que añadas el prompt 3, y esta como cuarto; luego continuamos con commit
```

**Qué salió:** prompts 3 y 4 añadidos a `prompts.md`, y commit de los cambios de `jcpv.md` y `prompts.md` subido al PR #135, que sigue en draft.
