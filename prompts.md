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

**Modelo:** Claude Opus 5.5
**Herramienta:** Claude Code 2.1.316

```
Estamos realizando el ejercicio del Módulo 4 de AI4Devs.

Herramienta: Claude Code 2.1.316.
Modelo: Claude Opus 5.5.
Rama: trazabilidad-pamf.
Predicción inicial del alumno: 2 de 3 scenarios cubiertos.

Trabaja EXCLUSIVAMENTE sobre el requisito «Lo que cada tarea muestra de su responsable» de openspec/specs/tasks/spec.md (líneas 97-114).

Realiza únicamente esta primera fase:
1. Lee los tres scenarios del requisito.
2. Inspecciona los tests existentes de backend/tests/functional/.
3. Comprueba la cobertura real leyendo las aserciones, no solamente los nombres.
4. Crea docs/verificacion/pamf.md con una matriz de cuatro columnas: Scenario, Test exacto, Estado (Cubierto / No cubierto / No lo sé), Qué faltó para decidir. Indica encima: Scenarios en el requisito: 3 · Cubiertos: [resultado verificado].
5. Crea prompts.md en la raíz y registra literalmente este prompt, con herramienta y modelo. Los siguientes prompts deberán añadirse sin alterar los anteriores.

Restricciones:
- No modifiques código productivo.
- No analices otros requisitos de la capability.
- No escribas tests nuevos todavía.
- No inventes cobertura ni conclusiones.
- Conserva la predicción inicial de 2 scenarios como dato previo a la auditoría.

Al terminar, presenta las evidencias y los archivos modificados. Detente para revisar los resultados antes de continuar.
```

**Qué salió:** auditoría hecha. Resultado verificado: 0 de 3 cubiertos, frente a los 2 de 3 de la predicción.

## Prompt 2

**Modelo:** Claude Opus 5.5
**Herramienta:** Claude Code 2.1.316

```
Continuamos el ejercicio del Módulo 4 de AI4Devs.

Partimos de la auditoría documentada en docs/verificacion/pamf.md, que identificó 3 scenarios sin cobertura.

Trabaja exclusivamente sobre el requisito «Lo que cada tarea muestra de su responsable» de openspec/specs/tasks/spec.md (líneas 97-114).

Realiza las siguientes tareas:

1. Corrige el formato de la matriz existente:
   - Deja vacía la columna «Test exacto» cuando no exista un test.
   - Utiliza la columna «Qué faltó para decidir» únicamente para el estado «No lo sé».
   - Conserva las evidencias existentes y la predicción inicial de 2 de 3.

2. Crea los tests funcionales que faltan en backend/tests/functional/tasks/, uno por cada scenario:
   - Responsable identificable: verificar nombre e iniciales dentro del assignee de una tarea.
   - La tarea no filtra datos de cuenta: comprobar que assignee no expone email ni otros datos de acceso, tanto en una tarea individual como dentro de la lista.
   - Responsable sin nombre: verificar que fullName llega nulo y que las iniciales siguen presentes.

3. Sigue las convenciones y el estilo de los tests existentes en backend/tests/functional/auth/.

4. Ejecuta los tests creados y registra sus resultados reales.

5. Actualiza docs/verificacion/pamf.md con los nombres exactos de los tests nuevos y su resultado, distinguiendo la cobertura que existía antes de esta intervención de los tests que acabas de crear.

6. Añade este segundo prompt LITERALMENTE a prompts.md, sin modificar el primero. Herramienta: Claude Code 2.1.316. Modelo: Claude Opus 5.5.

RESTRICCIONES:
- No modifiques código de producción.
- No modifiques la spec.
- No cambies los tests para conseguir que pasen artificialmente.
- Si algún test falla, déjalo fallando y documenta el motivo.
- No amplíes el alcance a otros requisitos.
- No hagas commit ni push.

Al finalizar, muestra los archivos modificados, el nombre exacto de cada test y sus resultados. Detente para que revisemos la ejecución antes de continuar.
```

**Qué salió:** 3 tests creados; 2 pasan y 1 falla porque la lista filtra el email del responsable (fallo real de producción, documentado y sin corregir).

## Prompt 3

**Modelo:** Claude Opus 5.5
**Herramienta:** Claude Code 2.1.316

```
Continuamos el ejercicio del Módulo 4 de AI4Devs.

La auditoría y los tres tests ya están realizados. Ahora vamos a completar la documentación final.

1. Actualiza docs/verificacion/pamf.md incorporando, justo debajo de la matriz, una sección "Parte B — Reflexiones" con exactamente estas tres líneas:

- Predicción: Estimé 2 de 3 scenarios cubiertos, pero la auditoría inicial demostró que ninguno tenía tests específicos (0 de 3); los existentes verificaban autenticación, no responsables de tareas.
- Duda: En el scenario de privacidad, la expresión "otros datos de acceso" no concreta todos los campos prohibidos, lo que genera incertidumbre entre falta de cobertura y falta de precisión en la spec.
- Decisión: Verificamos email, contraseña y token, tanto en la consulta individual como en la lista; así descubrimos que el listado exponía indebidamente el email del responsable.

2. Conserva la matriz, las evidencias y los resultados reales de los tests, incluyendo el test fallido.

3. Añade este tercer prompt literalmente a prompts.md, sin alterar los anteriores.
   Herramienta: Claude Code 2.1.316.
   Modelo: Claude Opus 5.5.

RESTRICCIONES:
- No modificar tests existentes.
- No modificar código de producción.
- No modificar la spec.
- No corregir el test fallido.
- No hacer commit ni push.
- No ampliar el documento con reflexiones adicionales.

Al finalizar, muestra los archivos modificados y confirma que los tres entregables están preparados:
docs/verificacion/pamf.md
backend/tests/functional/tasks/
prompts.md
```
