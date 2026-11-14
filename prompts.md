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

**Modelo:**  Opus 5.5
**Herramienta:** Claude Code

```
 I check the proces rules on the AGENTS.md,  and I divided it in this list. Compare it and tell me if I miss any. Don't modify anithing just tell if Imiss something.
  List of rules:
  - Antes de empezar mira en que branch estas
  - Crea nueva branch si estas en main o en una rama s[N]/*
  - No commits en main or s[N]/*
  - Commits con skill /commit
  - 1 commit por peticion
  - Cambio copleto (rutas,validaciones...) en 1 commit
  - Usa gh pr create para crear PR
  - PR con descripcion completa
  - Despues de crear PR ejecuta adversarial review 1 vez
  - No Repitas el summary en el terminal
```

**Qué salió:** (opcional, una línea) funcionó a la primera / tuve que insistir / me inventó una ruta que no existe.
 Una table con los siguientes items:
 - Antes de tocar código, mira en qué rama estás.
  - La rama es por unidad de trabajo, no por petición.
  - Si ya estás en una rama de trabajo (cualquiera que no sea main ni sN/*), sigue en ella y no crees otra.
  - Nunca commitear directo en main ni en una sN/*.
  - Un commit por petición: al cerrar cada petición, usa la skill /commit.
  - Un cambio que toque rutas, controladores, validadores o transformers de una capability va en el mismo commit que:
    - el documento OpenAPI al día, que se commitea como el diff regenerado de .adonisjs/
    - el README de la capability al día, en docs/capabilities/<nombre>/README.md
  - Crea el PR con gh pr create, con una descripción completa de los cambios en el cuerpo.
  - El PR se abre una sola vez, al terminar la unidad de trabajo, no al cerrar cada petición.
  - Después de crear el PR, pasa el subagente adversarial-reviewer una sola vez sobre ese PR.
  - El review adversarial es lo último antes de dar la unidad por terminada.
  - Al abrir el PR, no repitas el resumen en el chat: responde solo con la URL del PR (la sesión se pierde, el PR no).


## Prompt 2

**Modelo:**  Opus 5.5
**Herramienta:** Claude Code
```
 I reviewed the "Reglas de proceso" in AGENT.md. Audti if this rules has been followed in the last 15 commits.  Write the result in docs/auditoria/RTC.md not in the chat.
  Format of the result
  1 table.
  On the first column Rule --> each rule, here there  are the rules to evaluate, i want this rules :
  - Antes de tocar código, mira en qué rama estás.
  - La rama es por unidad de trabajo, no por petición.
  - Si ya estás en una rama de trabajo (cualquiera que no sea main ni sN/*), sigue en ella y no crees otra.
  - Nunca commitear directo en main ni en una sN/*.
  - Un commit por petición: al cerrar cada petición, usa la skill /commit.
  - Un cambio que toque rutas, controladores, validadores o transformers de una capability va en el mismo commit que:
    - el documento OpenAPI al día, que se commitea como el diff regenerado de .adonisjs/
    - el README de la capability al día, en docs/capabilities/<nombre>/README.md
  - Crea el PR con gh pr create, con una descripción completa de los cambios en el cuerpo.
  - El PR se abre una sola vez, al terminar la unidad de trabajo, no al cerrar cada petición.
  - Después de crear el PR, pasa el subagente adversarial-reviewer una sola vez sobre ese PR.
  - El review adversarial es lo último antes de dar la unidad por terminada.
  - Al abrir el PR, no repitas el resumen en el chat: responde solo con la URL del PR (la sesión se pierde, el PR no).
    Second column  Checks-->what you check to evaluate if the rule has been folloed, command or file checked. This column has to contain always a value
    Third column Veredict --> Followed, not followed, or can't be checked ( se cumple, no se cumple, o no se puede comprobar )
    Fourth column  Evidence --> Where this rule has been followed or wheris missing to be able to check it.
    Fifth column  What to do --> What to do with the rule One word Leave it, remove it or move it. ( Dejarla, borrarla, o bajarla)

  Write the table on spanish

```
**Qué salió:** 
Creo el archivo con la tabla

## Prompt 2

**Modelo:**  Opus 5.5
**Herramienta:** Claude Code
```
Checkin the file docs/auditoria/RTC.md write at the bottom of the file a list with the rules taht can't be checked and in a short senetnce what should change to be able
  to check it in future changes , can be something to execute, write the rule different or assume that this rule never will be able to be audit and we need to trust.
  Format:
  * Rule --> what sohuld change to ble able to check it

```
**Qué salió:** 
Relleno la segunda pregunta de la parte B.

