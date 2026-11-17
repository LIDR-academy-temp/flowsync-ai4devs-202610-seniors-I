# Prompts

Aquí van **todos los prompts que lanzaste** para hacer el ejercicio, en el orden
en que los lanzaste, con el modelo y la herramienta de cada uno.

Esto no es papeleo. Lo que se revisa es **cómo pediste las cosas**, no solo lo
que salió: un resultado flojo con un prompt bueno y un resultado flojo con un
prompt vago necesitan feedback distinto, y sin este archivo no se distinguen.

## Cómo rellenarlo

- Un apartado `## Prompt N` por cada prompt.
- **Pega el prompt tal cual lo lanzaste**, dentro del bloque de código, aunque
  ocupe diez líneas y aunque tenga faltas. No lo reescribas para que quede bien:
  el que arreglaste mentalmente después no es el que lanzaste.
- Incluye también los que **no funcionaron**. Suelen ser los más útiles de leer.
- `Modelo` y `Herramienta` en todos. Si cambiaste de una a otra a mitad, se nota
  aquí.

---

## Prompt 1

**Modelo:** gpt-5.6-sol
**Herramienta:** Codex

```
ahora ayudamea. estudiar el modulo 5 por favor
```

**Qué salió:** Estudiar el módulo 5: preparó la guía de estudio y dejó el
entorno montado (fork, clon y rama de partida).

## Prompt 2

**Modelo:** gpt-5.6-sol
**Herramienta:** Codex

```
espera despues continuamos con eso, ahora haz el fork y clona el repositorio para hacer la tarea
```

**Qué salió:** Hizo el fork, clonó el repositorio en `modulo-5/flowsync` y lo
dejó en la rama de partida. Aprovechó para quitar el ejemplo de este mismo
fichero.

## Prompt 3

**Modelo:** MiniMax-M3.1-Flash-Preview[1m]
**Herramienta:** Claude Code

```
revisa el repo, y empieza a guardar todo los prompts en el archivo de prompts.md dime si puedes ver el hisotorial de commits y que tanto el frontend y backend este funcionando correctamente
```

**Qué salió:** Revisó el repo de punta a punta: leyó el historial de commits,
pasó la suite del backend (23 tests en verde), compiló y linteó el frontend, y
probó la API a pelo con `curl` (registro, login, perfil, tareas, estados,
vencimientos, filtros). Después se metió en el navegador con Playwright y
recorrió el flujo real de la interfaz: login, lista, alta de tarea, filtro por
estado y ficha de la tarea con su aviso de vencida. Dos hallazgos: un filtro
con estado inventado que devuelve `200` en vez del `422` que pide la spec, y
las pistas de pila que se filtran en el 404 cuando el servidor corre en
desarrollo.

## Prompt 4

**Modelo:** MiniMax-M3.1-Flash-Preview[1m]
**Herramienta:** Claude Code

```
muestrame los ultimso 15 commits
```

**Qué salió:** Los últimos 15 con fecha, autor y ficheros tocados. Se vio que
el orden de las fechas no es el orden del grafo: tres commits del 28 de agosto
son anteriores en la historia a los del 20.

## Prompt 5

**Modelo:** MiniMax-M3.1-Flash-Preview[1m]
**Herramienta:** Claude Code

```
Lee las reglas de proceso de `CLAUDE.md` y contrástalas contra los últimos 15 commits de
este repositorio y el estado actual del árbol. Para cada regla, una fila: qué dice, qué
evidencia has mirado, y si se ha cumplido, no se ha cumplido, o no se puede comprobar
desde el historial. Usa solo lo que puedas verificar con comandos de git y leyendo
archivos: si una regla no deja rastro comprobable, dilo en vez de suponer. No cambies
ningún archivo: esto es una auditoría, no un arreglo.
```

**Qué salió:** La tabla de las siete filas con su veredicto y su evidencia, y las
tres líneas. Lo de «no cambies ningún archivo» se cumplió: la comprobación del
`.adonisjs/` se hizo en una copia aparte, en `/tmp`, y el árbol quedó intacto.

## Prompt 6

**Modelo:** gpt-5.6-sol
**Herramienta:** Codex

```
agfrega este doc al material del curso:

file:///Users/alfonso/Library/Containers/net.whatsapp.WhatsApp/Data/tmp/documents/BA60692F-F7CB-4B1C-98E9-4E3EAFAB61A9/PROMPTS-ALUMNO-s5.pdf
```

**Qué salió:** Metió el PDF de los prompts del alumno en el material del curso.

## Prompt 7

**Modelo:** MiniMax-M3.1-Flash-Preview[1m]
**Herramienta:** Claude Code

```
Hoy el contrato de la API de este proyecto solo existe mientras el servidor corre: se
construye en cada petición y se sirve por HTTP, y no hay ningún fichero en el
repositorio. Haz dos cosas. Primero, añade un comando del proyecto que genere ese
documento y lo escriba en un fichero versionado dentro de `docs/`. Segundo, añade una
comprobación que regenere el documento en una ubicación temporal, lo compare con el
versionado, y termine con código de salida distinto de cero explicando la diferencia si
no coinciden. Llama `openapi:generate` al comando que genera y `openapi:check` a la
comprobación, expón los dos como scripts del proyecto con esos mismos nombres, y escribe
el documento en `docs/api/openapi.json`. La comprobación solo compara, no arregla: no
toques las rutas ni dejes que reescriba el fichero versionado.
```

**Qué salió:** Los dos comandos, el documento versionado y el `if` de que la
comprobación no reescribe nada. Se encontró por el camino que los comandos de
aplicación de Ace no cargan con la versión instalada de `jsonschema`, y que el
router solo enseña sus rutas cuando alguien hace `commit()` — sin eso el documento
salía vacío.

## Prompt 8

**Modelo:** MiniMax-M3.1-Flash-Preview[1m]
**Herramienta:** Claude Code

```
(cd backend && npm run openapi:check)
```

**Qué salió:** Un comando, no un encargo: el `openapi:check` salió en verde,
`EXIT CODE: 0`. Se registra porque es lo que se lanzó, y porque en la lista de
prompts también caben los que no son encargos.

## Prompt 9

**Modelo:** MiniMax-M3.1-Flash-Preview[1m]
**Herramienta:** Claude Code

```
Crea un trabajo de integración continua en `.github/workflows/` que ejecute esa
comprobación sobre cada cambio propuesto y sobre cada push a la rama principal. Que
instale las dependencias del backend y corra el script. Dale al trabajo únicamente los
permisos que necesite y nada más, y pon un tiempo máximo de ejecución. Explícame en dos
líneas qué hará y qué no.
```

**Qué salió:** El trabajo que comprueba el contrato en cada pull request y en cada
push a `main`, con `contents: read` y nada más, y un corte a los diez minutos. Se
encontró por el camino que el comando valida las variables de entorno al arrancar:
sin un `.env` con `APP_KEY`, el trabajo se quedaba antes de comprobar nada.

## Prompt 10

**Modelo:** MiniMax-M3.1-Flash-Preview[1m]
**Herramienta:** Claude Code

```
Crea otro trabajo de integración continua en `.github/workflows/` que lance un revisor
de código sobre cada cambio propuesto, usando la acción oficial de Claude Code para
GitHub Actions. Que reciba su credencial desde un secreto del repositorio, y que
publique los hallazgos como comentarios en el cambio propuesto en vez de dejarlos solo
en el registro de ejecución. Dale herramientas de lectura sobre el repositorio (Read,
Grep y Glob en su lista de herramientas permitidas): sin ellas no puede abrir ni el
archivo de calibración ni un solo archivo del cambio, y cada intento denegado le cuesta
un turno. Dile además que no redirija salida a ficheros, que lea la salida directa. Que
use un modelo económico (--model sonnet --effort medium), acote el trabajo a 40 turnos
(--max-turns 40) y el reloj a 10 minutos (timeout-minutes: 10), con esos valores
exactos. Debajo del archivo, escríbeme en `docs/ci-revisor.md` qué pasos manuales quedan
pendientes para que esto funcione de verdad, y en qué se va el dinero: qué modelo usa el
revisor, por qué ese y cómo cambiarlo. Para el precio, enlaza la página oficial en vez
de citar cifras: cambian, y una cifra escrita aquí envejece sin que nadie se entere.
Sobre la credencial, documenta dos caminos y pon primero el de suscripción: el token que
se genera en local con `claude setup-token`, y solo después la clave de API de la
consola. Di de cada uno qué entrada de la acción usa y con qué nombre se guarda el
secreto, porque no son intercambiables, y avisa de que cruzarlos falla en la primera
llamada sin explicar por qué. Incluye también qué ocurre con los cambios propuestos
desde un fork en un repositorio público.
```

**Qué salió:** El trabajo y el documento. Salieron con dos correcciones que hizo
falta hacer después: `--allowedTools` no restringe herramientas —es la lista de
auto-aprobación—, y sin secreto el trabajo fallaba en rojo en lugar de saltarse.

## Prompt 11

**Modelo:** MiniMax-M3.1-Flash-Preview[1m]
**Herramienta:** Claude Code

```
ejecuta el adeveraria-review en local para ver fallo antes de commitear
```

**Qué salió:** El revisor adversarial sobre el cambio sin commitear, con hallazgos
priorizados. Dos eran falsos positivos —el `id` del responsable, que el test de
integración exige, y el plan «Ultra», que sí existe— y uno pilló a una afirmación
equivocada del documento: en los pull requests desde fork el trabajo **falla**, no se
salta.

## Prompt 12

**Modelo:** MiniMax-M3.1-Flash-Preview[1m]
**Herramienta:** Claude Code

```
ok ahora hayq ue subir el trabajo al repo.

git add docs/auditoria prompts.md
git commit -m "auditoria: reglas de proceso + prompts"
git push -u origin auditoria-<tus-iniciales>
```

**Qué salió:** El commit con los dos ficheros de la entrega y el push a
`auditoria-af`. `docs/auditoria/` no existía, así que antes de stagedarlo se
escribió el fichero de la auditoría con la tabla y las tres líneas.

## Prompt 13

**Modelo:** MiniMax-M3.1-Flash-Preview[1m]
**Herramienta:** Claude Code

```
no, mejor crea la rama y volvamos a hacer el ejercicio, hayq ue registrart los prompts eso es loq ue hayq ue subir
```

**Qué salió:** La funcionalidad de OpenAPI y los workflows de CI se movieron a su
propia rama, `feat/openapi-versionado`, y aquí se completó el registro de prompts
que faltaba.

## Prompt 14

**Modelo:** gpt-5.6-sol
**Herramienta:** Codex

```
genera la guia de estudio por favor con base en todos los recursos que tenemso tambien agrega los recursos adicionales [https://training.lidr.co/posts/ai4devs-202610-seniors-%F0%9F%93%9A-recursos-%F0%9F%9F%A2-108868040](https://training.lidr.co/posts/ai4devs-202610-seniors-%F0%9F%93%9A-recursos-%F0%9F%9F%A2-108868040)

crea la guia de estudio
```

**Qué salió:** La guía de estudio del módulo con los recursos del curso.

## Prompt 15

**Modelo:** MiniMax-M3.1-Flash-Preview[1m]
**Herramienta:** Claude Code

```
ok mandalo asi
```

**Qué salió:** Abrió el pull request con los dos ficheros de la entrega y pasó el
revisor adversarial sobre él. El revisor encontró errores de verdad en la tabla
—«no hay ninguna otra ref» era falso, y el recuento de mensajesconventional
estaba mal— y se corrigieron.

## Prompt 16

**Modelo:** gpt-5.6-sol
**Herramienta:** Codex

```
ayudame a guardar todos los contenidos del modulo en mi repositorio, asi como lo hemos hecho en lo otro modulos
```

**Qué salió:** Guardó el material del módulo en el repositorio, como se hizo en
los módulos anteriores.

---

> **Una nota sobre el registro.** Entre los prompts 12 y 13 hay un mensaje más en
> el transcript: es el cuerpo de la skill `/commit`, que lanzó el propio repositorio
> al cerrar la petición 12. No se registra aquí porque no es un encargo: es la
> definición de una skill que el agente invocó. Todos los demás mensajes de las
> dos sesiones están, con sus faltas y su texto tal cual.
