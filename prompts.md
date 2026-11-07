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

**Modelo:** Opus 5.5 Medium
**Herramienta:** Claude Code

```
Lee el requisito "Lo que cada tarea muestra de su responsable" en
openspec/specs/tasks/spec.md. Solo ese requisito, no la capability entera.

Construye la matriz de trazabilidad en docs/verificacion/cmelon.md:
- Arriba: número de scenarios del requisito (el de cubiertos lo dejamos para el final).
- Una fila por scenario: scenario en una línea | test que lo cubre (nombre exacto
  en la suite) | Cubierto / No cubierto / No lo sé | si es "No lo sé", qué faltó.

Para marcar "Cubierto" abre el test y comprueba qué afirma realmente; un nombre
parecido no cuenta. Si dudas, marca "No lo sé" y explica por qué.
No escribas tests todavía ni toques nada fuera de docs/verificacion/.
```

**Qué salió:** 
Funcionó, completo la matriz de trazabilidad con los 3 escenarios y los puso inicialmente como no cubiertos porque todavía no hay test implementados.


## Prompt 2

**Modelo:** Opus 5.5 Medium
**Herramienta:** Claude Code

```
Para el requisito "Lo que cada tarea muestra de su responsable" en
openspec/specs/tasks/spec.md. Solo ese requisito, no la capability entera.

Mira la matriz en docs/verificacion/cmelon.md y escribe tests solo para los
scenarios marcados "No cubierto": uno por scenario, en
backend/tests/functional/tasks/, siguiendo el estilo de los tests de
backend/tests/functional/auth/.

Reglas:
- No toques nada fuera de backend/tests/.
- Ejecuta los tests al terminar.
- Si alguno falla, NO arregles el código de la app ni aflojes el test: déjalo
  en rojo y dime qué falla y por qué crees que falla.

Si al escribir un test te encuentras un caso que la spec no define (no dice
qué debe pasar), escribe el test con la suposición más razonable, márcala con un comentario // SUPUESTO: en el test, avísame y señala si
crees que es un hueco de test (la regla está y nadie la comprueba) o un hueco
de spec (la regla no está escrita en ninguna parte).

Al final, lista las decisiones que tuviste que tomar porque el scenario no las
fijaba (valores concretos, límites, qué pasa con datos vacíos, etc.).
```

**Qué salió:** 
Me generó los text en la carpeta backend/tests/functional/tasks/.
El agente corrió node ace migration:run porque faltaba la tabla ( solo tocó la base local). Lo hizo sin que se lo pidiera.



## Prompt 3

**Modelo:** Opus 5.5 Medium
**Herramienta:** Claude Code

```
Actualiza la matriz en docs/verificacion/cmelon.md con el resultado de los tests
de backend/tests/functional/tasks/assignee.spec.ts:
- No cambies la columna Estado: describe la cobertura que había antes (No cubierto).
- En "Test que lo cubre" pon el nombre exacto del test nuevo y su resultado (✔ / ✖ y por qué falla, en media línea).
- Arriba, completa "Cubiertos: 0" (antes de esta tarea ningún test lo comprobaba).
No toques nada más del archivo.
```

**Qué salió:** 
Actualizó la Matriz luego de la ejecución de los test.