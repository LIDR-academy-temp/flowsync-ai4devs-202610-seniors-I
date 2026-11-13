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

**Modelo:** Opus 5.5 1M xHigh
**Herramienta:** Claude Code

```
contrasta las reglas de proceso que se ubican en CLAUDE.md contra los últimos 15 commits del repositorio y el estado actual del árbol, y deja el resultado escrito en docs/auditoria/jcpv.md, no en el chat. Esto es una auditoría, no un arreglo no cambies ningún archivo. Necesito que la información quede con el siguiente formato: 1. Qué pide la regla: debe quedar en una frase, si necesitas tres, es que ahí hay dos reglas metidas en una.
2. Qué se miró para comprobarlo: el comando concreto, o el archivo. Sin esta casilla la fila no se escribe: es lo único que separa una auditoría de una opinión.
3. Veredicto: y solo hay tres: "se cumple", "no se cumple", o "no se puede comprobar con lo que hay". Este tercero no es rendirse, es un dato: significa que esa regla no deja rastro en ninguna parte. Un se cumple sin evidencia detrás es en realidad quedar mal etiquetado.
4. La evidencia: en una línea. Si el veredicto es "no se cumple", el sitio donde se rompió. Si es "no se puede comprobar", qué falta para poder comprobarla.
5. Qué harías con ella: Una palabra: dejarla, borrarla o bajarla a algo que se ejecute solo.
```

**Qué salió:** escritura de la auditoría en docs/auditoria/jcpv.md, y un resumen de los hallazgos registrados en la tabla.

---

## Prompt 2

**Modelo:** Opus 5.5 1M xHigh
**Herramienta:** Claude Code

```
He completado la información requerida por el ejercicio, y ahora debemos realizar un pull request desde mi fork, con dos cosas dentro y ni una más:
1. El archivo de auditoría, docs/auditoria/jcpv.md, con la tabla y las tres líneas.
2. prompts.md, en la raíz del proyecto.
Referencia de los comandos git: git add docs/auditoria prompts.md
git commit -m "auditoria: reglas de proceso + prompts"
git push -u origin auditoria-jcpv
```

**Qué salió:** commit y pull request de mi fork al repo.
