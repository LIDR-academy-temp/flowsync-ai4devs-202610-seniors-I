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
Vamos a trabajar el ejercicio del Módulo 4. Yo rellenaré manualmente
docs/verificacion/emf.md; no lo modifiques.

Alcance: únicamente el requisito «Lo que cada tarea muestra de su responsable»
de openspec/specs/tasks/spec.md. No analices toda la capability ni confundas
sus scenarios con otros del mismo nombre en requisitos diferentes.

1. Comprueba la rama y el estado de Git sin modificarlos.
Lee las instrucciones aplicables y el README del ejercicio.
Para este trabajo no hagas commit, push ni abras un PR.

2. Si todavía no hemos ejecutado la suite inicial en esta sesión,
ejecútala desde backend/ con npm test. Informa del resultado.
Si falla, explica el fallo y detente sin corregir archivos.

3. Lee el requisito y sus scenarios. Para cada uno:
- Muéstrame el texto literal.
- Explica en español sencillo qué situación plantea y qué resultado exige.
- Busca pruebas existentes que puedan cubrirlo.
- Abre y lee sus aserciones; no deduzcas cobertura por el nombre del test.
- Si encuentras una prueba adecuada, indica su nombre exacto, archivo,
  líneas y qué aserción comprueba el comportamiento.
- Explica si la evidencia permite marcar Cubierto, No cubierto o No lo sé.
  Si hay cobertura parcial o dudas, explica qué falta, sin forzar una conclusión.

No inventes nombres de tests, resultados ni reglas que la spec no establece.
Distingue las pruebas leídas de las realmente ejecutadas.

No modifiques ningún archivo, no escribas tests todavía y no arregles
el código de la aplicación. Tampoco completes mi reflexión personal.

Trabaja scenario por scenario: presenta el análisis del primero
y espera a que yo lo revise antes de continuar con el siguiente.
```

**Qué salió:** (opcional, una línea) funcionó a la primera / tuve que insistir / me inventó una ruta que no existe.

## Prompt 2

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Cambio la instrucción anterior: ahora quiero que actualices tú
docs/verificacion/emf.md. Yo revisaré el resultado.

Mantén el alcance: únicamente el requisito «Lo que cada tarea muestra
de su responsable» de openspec/specs/tasks/spec.md.

Sigue este orden:

1. Lee el requisito completo y cuenta sus scenarios.
Escribe al principio del archivo:
- Total de scenarios del requisito: [número real].
- Scenarios cubiertos: pendiente de completar al finalizar la revisión.

2. Completa la matriz con una fila por scenario y estas cuatro columnas:
- Scenario: qué se espera y en qué situación, en una línea.
- Prueba que lo cubre: nombre exacto tal como aparece en la suite.
- Estado: Cubierto / No cubierto / No lo sé.
- Si «No lo sé», qué falta para decidir.

Reutiliza la evidencia que ya hayas comprobado y continúa revisando
los scenarios pendientes. Ya no necesitas detenerte después de cada uno.

Abre los tests y comprueba sus aserciones antes de marcar Cubierto.
Si no encuentras una prueba adecuada, deja vacía la columna de prueba.
No inventes evidencia ni fuerces un estado de incertidumbre.

3. Al terminar la revisión de todos los scenarios, sustituye
«pendiente de completar» por el número de filas marcadas Cubierto.
Cuenta scenarios cubiertos, no cantidad de tests ni tests que pasan.

Conserva cualquier estimación inicial o reflexión que yo haya escrito.
Deja pendientes las tres líneas de reflexión que todavía estén vacías.

Modifica únicamente docs/verificacion/emf.md.
No escribas tests todavía, no arregles código ni cambies la spec.
No hagas commit, push ni abras un PR.

Al terminar, resume qué has actualizado y qué dudas quedan.
```

**Qué salió:** (opcional, una línea) funcionó a la primera / tuve que insistir / me inventó una ruta que no existe.


## Prompt 3

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Lee mi matriz en docs/verificacion/emf.md y el requisito correspondiente
en openspec/specs/tasks/spec.md.

Escribe un test por cada scenario marcado «No cubierto», siguiendo
el estilo de los tests existentes de autenticación.
Guárdalos en backend/tests/functional/tasks/.

Si la spec deja algo ambiguo, explícame la duda antes de decidir
qué debe comprobar el test.

Ejecuta los nuevos tests. Si fallan, no arregles el código de la aplicación
ni cambies los tests para que pasen: conserva el resultado y explícamelo.

Modifica únicamente archivos dentro de backend/tests/.
No hagas commit ni abras un PR.

Al terminar, explícame qué comprueba cada test, qué decisiones has tomado
al escribirlo y cuál ha sido el resultado.
```

**Qué salió:** (opcional, una línea) funcionó a la primera / tuve que insistir / me inventó una ruta que no existe.