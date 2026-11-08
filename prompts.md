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

**Modelo:**  Sonnet 5.5 medium
**Herramienta:** Claude Code

```
Trabajamos SOLO sobre el requisito «Lo que cada tarea muestra de su responsable» de openspec/specs/tasks/spec.md (sus 3 scenarios). No cubras otros requisitos ni la capability entera. En este paso no modifiques código ni tests.

Quiero una matriz de trazabilidad: para cada scenario, buscá en backend/tests/ qué test lo comprueba. Abrí cada test candidato y leé lo que afirma de verdad (sus assert/expect); no te fíes del nombre. Si un test se parece pero no comprueba exactamente lo que dice el scenario, marcalo "No lo sé" y explicá la diferencia.

Escribí el resultado en docs/verificacion/db.md con este formato:
- Arriba: "Scenarios del requisito: N" y "Cubiertos: M".
- Una tabla, una fila por scenario, con 4 columnas: Scenario (una línea: situación y resultado esperado) | Test que lo cubre (nombre exacto como aparece en la suite, con su archivo, o vacío) | Estado (Cubierto / No cubierto / No lo sé) | Qué faltó para decidir (solo si es No lo sé, media línea).

Al terminar, mostrame para cada fila la línea exacta del test que justifica el estado.
```

**Qué salió:** Funciono de una, encontro que no hay tests para los 3 escenarios.

## Prompt 2

Ahora escribí los tests que faltan para ese mismo requisito, uno por scenario (los 3), en backend/tests/functional/tasks/assignee.spec.ts.

Reglas:
- Seguí el estilo de backend/tests/functional/auth/ (mismo runner, misma forma de crear usuarios, transacción global por test, nombres de test en castellano que digan el scenario).
- Cada test tiene que obtener la tarea por la API de verdad, como lo haría la app, y afirmar sobre su `assignee`.
- El scenario "no filtra datos de cuenta" dice "suelta o dentro de la lista": comprobá las dos formas de obtener la tarea.
- No toques nada fuera de backend/tests/. No modifiques código de la app.
- Ejecutá los tests. Si alguno sale en rojo, NO lo arregles ni aflojes la aserción para que pase: dejalo rojo y explicame en dos líneas qué falló y por qué.

Al final, decime qué valores concretos elegiste vos (nombres, emails, campos que comprobaste) que el scenario no fijaba.

Resultado: Genero los tests y los ejecuto. Dos pasan y uno esta en rojo. la lista expone el email del responsable

