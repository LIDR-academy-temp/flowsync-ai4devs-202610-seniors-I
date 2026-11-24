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

**Modelo:** Claude Opus 5.5
**Herramienta:** Claude Code (extensión de VS Code)

```
Hoy el contrato de la API de este proyecto solo existe mientras el servidor corre: se construye en cada petición y se sirve por HTTP, y no hay ningún fichero en el repositorio. Haz dos cosas. Primero, añade un comando del proyecto que genere ese documento y lo escriba en un fichero versionado dentro de docs/. Segundo, añade una comprobación que regenere el documento en una ubicación temporal, lo compare con el versionado, y termine con código de salida distinto de cero explicando la diferencia si no coinciden. Llama openapi:generate al comando que genera y openapi:check a la comprobación, expón los dos como scripts del proyecto con esos mismos nombres, y escribe el documento en docs/api/openapi.json. La comprobación solo compara, no arregla: no toques las rutas ni dejes que reescriba el fichero versionado.
```

**Qué salió:** funcionó, pero los comandos en `backend/commands/` tumbaban todo `node ace` (bug de `jsonschema` con Node 24); el agente los movió a `app/commands/` con un `ListLoader`.

## Prompt 2

**Modelo:** Claude Opus 5.5
**Herramienta:** Claude Code (extensión de VS Code)

```
(cd backend && npm run openapi:check)
```

**Qué salió:** exit 0, contrato al día.

## Prompt 3

**Modelo:** Claude Opus 5.5
**Herramienta:** Claude Code (extensión de VS Code)

```
(cd backend && npm run openapi:check)
```

**Qué salió:** exit 0; el cambio que estaba haciendo en `routes.ts` aún no estaba guardado.

## Prompt 4

**Modelo:** Claude Opus 5.5
**Herramienta:** Claude Code (extensión de VS Code)

```
(cd backend && npm run openapi:check)
```

**Qué salió:** exit 1 con la diferencia exacta tras renombrar `profile` → `perfil` en `routes.ts`.

## Prompt 5

**Modelo:** Claude Opus 5.5
**Herramienta:** Claude Code (extensión de VS Code)

```
descartalo
```

**Qué salió:** descartó el cambio de `routes.ts`; el check volvió a exit 0.

## Prompt 6

**Modelo:** Claude Opus 5.5
**Herramienta:** Claude Code (extensión de VS Code)

```
(cd backend && npm run openapi:check)
```

**Qué salió:** exit 0.

## Prompt 7

**Modelo:** Claude Opus 5.5
**Herramienta:** Claude Code (extensión de VS Code)

```
Crea un trabajo de integración continua en .github/workflows/ que ejecute esa comprobación sobre cada cambio propuesto y sobre cada push a la rama principal. Que instale las dependencias del backend y corra el script. Dale al trabajo únicamente los permisos que necesite y nada más, y pon un tiempo máximo de ejecución. Explícame en dos líneas qué hará y qué no.
```

**Qué salió:** a la primera; lo probó en un clon limpio antes de commitear.

## Prompt 8

**Modelo:** Claude Opus 5.5
**Herramienta:** Claude Code (extensión de VS Code)

```
Abre el PR y pasa el adversarial reviewer
```

**Qué salió:** PR abierto en el fork; el revisor señaló que `CLAUDE.md` seguía diciendo que no hay fichero de contrato.

## Prompt 9

**Modelo:** Claude Opus 5.5
**Herramienta:** Claude Code (extensión de VS Code)

```
gcm "ci(ai): update endpoint naming from profile to perfil"
```

**Qué salió:** no funcionó: el modo automático bloqueó el commit por considerarlo no deseado.

## Prompt 10

**Modelo:** Claude Opus 5.5
**Herramienta:** Claude Code (extensión de VS Code)

```
Hazlo tú, te autorizo
```

**Qué salió:** commit hecho en local; el check falló con la diferencia esperada.

## Prompt 11

**Modelo:** Claude Opus 5.5
**Herramienta:** Claude Code (extensión de VS Code)

```
Subelo
```

**Qué salió:** el CI de `openapi:check` falló en GitHub con la diferencia exacta: el fallo a propósito, visto en rojo.

## Prompt 12

**Modelo:** Claude Opus 5.5
**Herramienta:** Claude Code (extensión de VS Code)

```
Revierte el último commit que provocó el error y deja el repositorio en el estado anterior al commit
```

**Qué salió:** `git revert` y push; el CI volvió a verde.

## Prompt 13

**Modelo:** Claude Opus 5.5
**Herramienta:** Claude Code (extensión de VS Code)

```
Crea otro trabajo de integración continua en .github/workflows/ que lance un revisor de código sobre cada cambio propuesto, usando la acción oficial de Claude Code para GitHub Actions. Que reciba su credencial desde un secreto del repositorio, y que publique los hallazgos como comentarios en el cambio propuesto en vez de dejarlos solo en el registro de ejecución. Dale herramientas de lectura sobre el repositorio (Read, Grep y Glob en su lista de herramientas permitidas): sin ellas no puede abrir ni el archivo de calibración ni un solo archivo del cambio, y cada intento denegado le cuesta un turno. Dile además que no redirija salida a ficheros, que lea la salida directa. Que use un modelo económico (--model sonnet --effort medium), acote el trabajo a 40 turnos (--max-turns 40) y el reloj a 10 minutos (timeout-minutes: 10), con esos valores exactos. Debajo del archivo, escríbeme en docs/ci-revisor.md qué pasos manuales quedan pendientes para que esto funcione de verdad, y en qué se va el dinero: qué modelo usa el revisor, por qué ese y cómo cambiarlo. Para el precio, enlaza la página oficial en vez de citar cifras: cambian, y una cifra escrita aquí envejece sin que nadie se entere. Sobre la credencial, documenta dos caminos y pon primero el de suscripción: el token que se genera en local con claude setup-token, y solo después la clave de API de la consola. Di de cada uno qué entrada de la acción usa y con qué nombre se guarda el secreto, porque no son intercambiables, y avisa de que cruzarlos falla en la primera llamada sin explicar por qué. Incluye también qué ocurre con los cambios propuestos desde un fork en un repositorio público.
```

**Qué salió:** workflow y doc a la primera; el archivo de calibración se llamó `REVIEW.md` sin que yo lo pidiera.

## Prompt 14

**Modelo:** Claude Opus 5.5
**Herramienta:** Claude Code (extensión de VS Code)

```
Ejecuta ahora, en local, el mismo encargo que le hemos dado a ese revisor automático: pasa el subagente adversarial-reviewer sobre la capability de tareas, contrastando contra los escenarios de openspec/specs/tasks/spec.md. No arregles nada: hoy solo queremos ver el informe que habría aparecido en el cambio propuesto.
```

**Qué salió:** dos críticos reales confirmados en el código: una tarea `done` con fecha pasada sale vencida, y un estado inventado da lista vacía en vez de 422.

## Prompt 15

**Modelo:** Claude Opus 5.5
**Herramienta:** Claude Code (extensión de VS Code)

```
Escribe un archivo de instrucciones solo para revisiones, en la raíz del repositorio, que calibre a ese revisor para este proyecto. Cuatro cosas: define qué cuenta como hallazgo grave aquí y qué no pasa de sugerencia; pon un tope al número de sugerencias menores por revisión y di que el resto se resuma contadas; lista dónde no debe reportar, incluyendo cualquier cosa que otra comprobación del repositorio ya vigile; y exige que para afirmar que algo se comporta de una manera cite el archivo y la línea donde lo ha visto, en vez de deducirlo del nombre. Que quepa en una pantalla: un archivo largo diluye las reglas que importan.
```

**Qué salió:** `REVIEW.md` de 28 líneas; avisó de que lint y tipos no corren en CI aunque el archivo los excluya.

## Prompt 16

**Modelo:** Claude Opus 5.5
**Herramienta:** Claude Code (extensión de VS Code)

```
Ya está todo el trabajo de hoy en esta rama. Abre el PR con gh pr create y escribe una descripción que cuente la historia completa: qué se verificó, qué se arregló, qué documentación se generó y qué regla nueva lleva el harness. No abras más de uno.
```

**Qué salió:** no funcionó a la primera: el push quedó bloqueado por el modo automático y la rama ya tenía un PR abierto, así que propuso actualizarlo en vez de abrir otro.

## Prompt 17

**Modelo:** Claude Opus 5.5
**Herramienta:** Claude Code (extensión de VS Code)

```
Hazlo
```

**Qué salió:** push y descripción del PR actualizada.

## Prompt 18

**Modelo:** Claude Opus 5.5
**Herramienta:** Claude Code (extensión de VS Code)

```
Revisa el error del revisor de Claude en GH Actions y corrígelo
```

**Qué salió:** el fallo no era de código: faltaba el secreto `CLAUDE_CODE_OAUTH_TOKEN` en el repo.

## Prompt 19

**Modelo:** Claude Opus 5.5
**Herramienta:** Claude Code (extensión de VS Code)

```
Y ejecuta el push nuevamente cuando termines
```

**Qué salió:** no había nada que subir; propuso relanzar el job en vez de un push vacío.

## Prompt 20

**Modelo:** Claude Opus 5.5
**Herramienta:** Claude Code (extensión de VS Code)

```
Cómo obtengo este token?
```

**Qué salió:** pasos con `claude setup-token` y `gh secret set`.

## Prompt 21

**Modelo:** Claude Opus 5.5
**Herramienta:** Claude Code (extensión de VS Code)

```
Listo
```

**Qué salió:** job relanzado en verde; el revisor publicó un resumen y una sugerencia en línea en el PR, siguiendo `REVIEW.md`.
