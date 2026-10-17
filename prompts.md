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

**Modelo:** Sonnet 5 xHigh
**Herramienta:** Claude Code

```
Contexto: estoy en un ejercicio de un curso (AI4Devs, módulo "harness"). Voy a comparar el mismo encargo en dos copias del proyecto: una con harness (esta carpeta) y otra pelada (flowsync-sin-harness, que NO se toca nunca). Tú me ayudas solo con la copia con harness.

Estado actual:
- Fork propio clonado; remotos: origin = mi fork (MTristanIngeaa), upstream = LIDR-academy-temp/flowsync-ai4devs-202610-seniors-I.
- Rama actual: s1/start.
- Backend AdonisJS 7 (backend/) y frontend React 19 + Vite (frontend/) ya levantan en :3333 y :5173 con Node 24.

Reglas del ejercicio:
- El backend NO se modifica; solo se lee.
- Vamos a montar al menos dos piezas de harness de familias distintas:
  1) Una que oriente ANTES: un CLAUDE.md en la raíz con las convenciones reales del proyecto y lo prohibido.
  2) Una que compruebe DESPUÉS: un hook (por ejemplo PostToolUse tras editar: formato/linter/tests) o un subagente revisor.
- Antes de escribir nada, explora el repo (estructura, package.json de ambos lados, linters, tests, convenciones reales de código) y propón el contenido; no inventes convenciones que el código no sigue.
- Entregables finales (y nada más en el PR): docs/harness/comparacion.md y prompts.md (ya existe en la raíz con plantilla).

Primera tarea: explora el proyecto y dime (1) qué convenciones reales detectas, (2) qué comandos de lint/format/test existen y funcionan, y (3) qué propones para el CLAUDE.md y para la pieza de comprobación. No crees ni edites archivos todavía; espera mi visto bueno.
```

**Qué salió:** Pregunto el alcance del hardness, me dio 3 opciones y una cuarta Other.

---

## Prompt 2

**Modelo:** Sonnet 5 xHigh
**Herramienta:** Claude Code

```
Solo CLAUDE.md + hook de Prettier para frontend/src. Si sobra tiempo, el subagente adversarial-reviewer como tercera pieza. Ignora Jira MCP, skills y symlink por ahora. Antes de crear nada, muéstrame el contenido propuesto.
```

**Qué salió:** Me mostro el resultado esperado de ambos archivos, preguntando si procede.

---

## Prompt 3

**Modelo:** Sonnet 5 xHigh
**Herramienta:** Claude Code

```
Aprobado con tres cambios:
1) En "Proceso" del CLAUDE.md: quita gh pr create y "solo la URL del PR". Deja: rama nueva antes de tocar código; commits convencionales; NO hacer git push ni abrir PR (lo hago yo); al terminar, resumir en una línea qué archivos se tocaron.
2) Prueba el hook tú mismo una vez (edita un archivo de frontend/src, confirma que Prettier lo reformatea y revierte la prueba) antes de darlo por montado.
3) Todo lo demás como lo propusiste (CLAUDE.md, frontend/.prettierrc.json + devDependency de Prettier, .claude/settings.json + script del hook). No montes Jira, skills ni symlink.
Al terminar dime cuánto tardó cada pieza y qué te dio problemas, porque lo necesito para la comparación.
```

**Qué salió:** Me mostro el resultado esperado de ambos archivos, preguntando si procede.

---

## Prompt 4

**Modelo:** Sonnet 5 xHigh
**Herramienta:** Claude Code

```
Dime la ruta absoluta de tu directorio de trabajo y la rama actual. Luego dime qué reglas de proyecto tienes cargadas, sin abrir ni buscar archivos.
```

**Qué salió:** Directorio, rama actual y las reglas cargadas en CLAUDE.md.

---

## Prompt 5

**Modelo:** Sonnet 5 xHigh
**Herramienta:** Claude Code

```
Añade un comentario de una línea al inicio de frontend/src/App.tsx y dime si después de editar el archivo se reformateó. No hagas nada más.
```

**Qué salió:** Confirmación de realización.

---

## Prompt 6

**Modelo:** Sonnet 5 xHigh
**Herramienta:** Claude Code

```
Descarta ese cambio con git checkout -- frontend/src/App.tsx y muéstrame git status --short.
```

**Qué salió:** Operación realizada y confirmados.

---

## Prompt 7

**Modelo:** Sonnet 5 xHigh
**Herramienta:** Claude Code

```
Usa el MCP de Atlassian para listar los sitios accesibles y los proyectos visibles. Solo lista, no crees ni modifiques nada.
```

**Qué salió:** Me confirmo que es la conexion correcta.

---

## Prompt 8

**Modelo:** Sonnet 5 xHigh
**Herramienta:** Claude Code

```
Crea la rama harness-mtpc desde la actual y cámbiate a ella. No hagas nada más.
```

**Qué salió:** Rama creada y estoy en ella.

---

## Prompt 9

**Modelo:** Sonnet 5 xHigh
**Herramienta:** Claude Code

```
Mueve CLAUDE.md a D:\mtris\Documents\Cursos\LIDR Power Skills\CLAUDE.anterior.md (fuera del repo). No hagas nada más.
```

**Qué salió:** Rama creada y estoy en ella.

---

## Prompt 10

**Modelo:** Sonnet 5 xHigh
**Herramienta:** Claude Code

```
/init
```

**Qué salió:** Nuevo CLAUDE.md crado de acuerdo al md y no a la informacion en la pagina.

**Qué salió:** Rama creada y estoy en ella.

---

## Prompt 11

**Modelo:** Sonnet 5 xHigh
**Herramienta:** Claude Code

```
/init desde 0
```

**Qué salió:** Rama creada y estoy en ella.

---

## Prompt 12

**Modelo:** Sonnet 5 xHigh
**Herramienta:** Claude Code

```
Crea una skill de proyecto llamada priority-ticket en .claude/skills/priority-ticket/SKILL.md. Al invocarla debe:
1. Usar el MCP de Atlassian para traer el ticket de mayor prioridad asignado a mí en el estado «Por hacer».
2. Resumir sus criterios de aceptación.
3. Entrar en plan mode y proponer cómo implementarlo.
4. Cuando yo apruebe el plan, mover el ticket a «En curso».
Antes de escribirla, usa el MCP para comprobar cómo se llaman realmente los estados de mi proyecto y úsalos tal cual. No crees ni modifiques tickets. No hagas nada más.
```

**Qué salió:** Skill creada.

---

## Prompt 13

**Modelo:** Sonnet 5 xHigh
**Herramienta:** Claude Code

```
Crea una skill de proyecto llamada commit en .claude/skills/commit/SKILL.md. Al invocarla debe:
1. Revisar los cambios preparados (git diff --staged). Si no hay nada preparado, decirlo y detenerse; no preparar nada por su cuenta.
2. Proponer un mensaje de commit convencional con el formato tipo(scope): descripción, en español o inglés según el idioma de los commits previos (compruébalo con git log).
3. Crear el commit con ese mensaje.
No hacer git push. No hagas nada más.
```

**Qué salió:** skill creada.

---

## Prompt 14

**Modelo:** Sonnet 5 xHigh
**Herramienta:** Claude Code

```
Crea un subagente de proyecto llamado adversarial-reviewer en .claude/agents/adversarial-reviewer.md. Su trabajo es revisar un pull request intentando romperlo, no aprobarlo. Debe:
1. Recibir un número o URL de pull request y leer su diff (con gh pr diff y gh pr view).
2. Buscar activamente fallos: casos límite, validaciones que falten, manejo de errores, contrato con el backend que no coincida con el real (léelo, no lo asumas), convenciones del repo que se incumplan.
3. Devolver una lista de problemas ordenada por gravedad, cada uno con archivo y línea, y qué prueba lo demostraría.
Solo puede leer: no debe tener herramientas de edición ni de escritura, y no debe comentar en el PR ni aprobarlo. No hagas nada más.
```

**Qué salió:** Subagente creado.

---

## Prompt 15

**Modelo:** Sonnet 5 xHigh
**Herramienta:** Claude Code

```
Añade al final de CLAUDE.md una sección "## Process" con estas reglas, sin tocar nada de lo anterior:
- Crear una rama nueva antes de tocar código.
- Al cerrar el trabajo, usar /commit y abrir el pull request con gh pr create.
- Después, lanzar el subagente adversarial-reviewer sobre el pull request.
- En el chat, al terminar, responder solo con la URL del pull request.
```

**Qué salió:** seccion añadida.

---

## Prompt 16

**Modelo:** Sonnet 5 xHigh
**Herramienta:** Claude Code

```
Añade al final de CLAUDE.md una sección "## Process" con estas reglas, sin tocar nada de lo anterior:
- Crear una rama nueva antes de tocar código.
- Al cerrar el trabajo, usar /commit y abrir el pull request con gh pr create.
- Después, lanzar el subagente adversarial-reviewer sobre el pull request.
- En el chat, al terminar, responder solo con la URL del pull request.
```

**Qué salió:** seccion añadida.

---

## Prompt 17

**Modelo:** Sonnet 5 xHigh
**Herramienta:** Claude Code

```
/priority-ticket
```

**Qué salió:** No procedio, ya que no tenia el Jira asignado.

---


## Prompt 18

**Modelo:** Sonnet 5 xHigh
**Herramienta:** Claude Code

```
/priority-ticket
```

**Qué salió:** Plan diseñado, esperando aprobacion o rechazo.

---