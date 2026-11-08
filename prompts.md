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

`````
Guarda cada entrada mía en el archivo prompts.md; fíjate en que ## Prompt 1 ya está relleno con un prompt de ejemplo. Haz lo mismo con Prompt 2, etc. Guarda cada entrada, sean comandos o prompts, tal cual la escribo, sin corregir nada. Pon **Modelo:** Opus 5.5 y **Herramienta:** Claude Code. Si mi entrada lleva ``` dentro, usa ```` como delimitador. Solo en esta sesión. Al terminar tu respuesta a cada entrada, rellena su "Qué salió:" con una línea corta y objetiva: qué produjiste o qué archivos tocaste, y si funcionó a la primera, falló o se quedó a medias. No te pongas nota ni valores la calidad. Si mi siguiente entrada corrige o repite la anterior, añade a ese "Qué salió:" anterior "tuve que insistir: <motivo>". Empieza con este y sobrescribe el ejemplo
`````

**Qué salió:** Sobrescrito el ejemplo de `prompts.md` con este prompt como Prompt 1; funcionó a la primera.

## Prompt 2

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Construye la matriz de trazabilidad del requisito «Lo que cada tarea muestra de su responsable» de `openspec/specs/tasks/spec.md` y guárdala en `docs/verificacion/at.md` (crea la carpeta). Solo ese requisito, no la capability entera aunque quepa. No escribas tests todavía: detente al entregar la matriz.

Qué revisar

- El requisito y sus scenarios, tal cual están en la spec. Cuenta los scenarios antes de buscar ningún test.
- Toda la suite existente (`backend/tests/` y cualquier otro test del proyecto) en busca de pruebas que puedan cubrir cada scenario.
- Para cada candidato, abre el test y lee lo que afirma de verdad. Un nombre parecido no cuenta como cobertura. Si el test comprueba solo una parte del scenario, u otra cosa parecida, no es "Cubierto".

Reglas

- Solo lectura del código y de los tests: el único archivo que creas es `docs/verificacion/at.md`. No modifiques nada más ni propongas arreglos.
- No ejecutes nada que altere el proyecto. Si para decidir una casilla haría falta ejecutar algo, márcala "No lo sé" y dilo.
- "No lo sé" es un estado válido: úsalo cuando no encuentres dónde se comprueba o cuando lo que encuentres se parezca pero no diga exactamente lo mismo. No lo conviertas en "Cubierto" ni en "No cubierto" por cerrar la fila.
- Si un scenario no se puede comprobar sin decidir algo que la spec no dice (un valor, un límite, qué pasa si el dato viene vacío), anótalo; no lo resuelvas tú.

Formato del archivo (no negociable)

1. Arriba, dos números: `Scenarios en el requisito: N · Cubiertos: M`.
2. Una tabla con una fila por scenario y cuatro columnas:
   - Scenario, en una línea: qué se espera y en qué situación. Si no cabe, es que estás juntando dos.
   - Test que lo cubre, con el nombre exacto que aparece en la suite y su archivo:línea. Vacía si no hay ninguno.
   - Estado: Cubierto · No cubierto · No lo sé.
   - Qué faltó para decidirlo: media línea, solo si es "No lo sé".
3. Debajo, deja vacío un apartado `## Las tres líneas` con los tres puntos numerados sin rellenar: esa parte es mía.

Entrega en el chat

- La ruta del archivo y los dos números.
- Para cada fila que no sea "No cubierto", la línea concreta del test que te hizo decidir (archivo:línea y la afirmación).
- Lo que hayas anotado como decisiones que la spec no toma.
```

**Qué salió:** Creado `docs/verificacion/at.md` con 3 scenarios, 0 cubiertos (los tres "No cubierto": ningún test toca tareas); funcionó a la primera.

## Prompt 3

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Escribe los tests que faltan para las tres filas "No cubierto" de `docs/verificacion/at.md`: uno por scenario, en `backend/tests/functional/tasks/` (crea la carpeta), siguiendo el estilo de los que ya hay en `backend/tests/functional/auth/` (estructura, helpers, cómo se crean usuarios y cómo se autentica). Después, ejecútalos.

Reglas

- No toques nada fuera de `backend/tests/`. No arregles el código de la aplicación ni la spec.
- Cada test comprueba lo que dice su scenario, no lo que hace hoy el código. No mires la implementación para decidir qué afirmar; míralo solo para saber qué rutas llamar y cómo crear los datos.
- Si un test sale en rojo, se queda en rojo: no lo aflojes, no lo saltes ni lo marques como pendiente para que pase. Dime por qué falla, con la afirmación concreta y el valor recibido.
- Donde el scenario no decida un valor, un límite o un caso (iniciales esperadas, qué campos puede llevar `assignee`, qué rutas cuentan como "tarea suelta", nombre vacío…), elige la lectura más literal de la spec, déjala escrita en un comentario `// Decisión: …` encima de la afirmación y no la escondas en el test.
- Ejecuta desde Git Bash con Node 24: `eval "$(fnm env --shell bash)"; fnm use 24; cd backend && npm test`. Si la ejecución modifica archivos de `backend/.adonisjs/`, revierte con `git checkout -- backend/.adonisjs`.
- No toques `docs/verificacion/at.md`: la matriz la actualizo yo.

Entrega en el chat

1. Los tests creados: archivo, nombre exacto de cada test y el scenario que cubre.
2. El resultado de la ejecución: cuáles en verde y cuáles en rojo, y para cada rojo, la afirmación que falla, lo esperado y lo recibido.
3. La lista de decisiones `// Decisión:` que tomaste y de dónde salió cada una (de esta spec, de otra spec o tuya).
```

**Qué salió:** Creado `backend/tests/functional/tasks/assignee.spec.ts` con 3 tests y ejecutada la suite: 22 verdes, 1 rojo (el `assignee` de `POST /tasks` trae el email); `.adonisjs/` sin cambios.
