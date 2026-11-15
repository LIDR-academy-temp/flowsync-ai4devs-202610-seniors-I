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
Debes realizar una auditoría de los últimos 15 commits del repositorio y el estado actual del árbol. Debes dejar por
escrito el resultado en `docs/auditoria/<tus-iniciales>.md`, no en el chat. El formato debe ser una fila por regla con
estas 5 casillas:
  1. Qué pide la regla. Una frase, con tus palabras. Si necesitas tres, es que ahí hay dos reglas metidas en una.
  2. Qué se miró para comprobarlo. El comando concreto, o el archivo. Sin esta casilla la fila no se escribe: es lo único que separa una auditoría de una opinión.
  3. Veredicto, y solo hay tres: se cumple, no se cumple, o no se puede comprobar con lo que hay. Este tercero no es rendirse, es un dato: significa que esa regla no deja rastro en ninguna parte. Un se cumple sin evidencia detrás es en realidad este, mal etiquetado.
  4. La evidencia, en una línea. Si el veredicto es no se cumple, el sitio donde se rompió. Si es no se puede comprobar, qué falta para poder comprobarla.
  5. Qué harías con ella. Una palabra: dejarla, borrarla o bajarla a algo que se ejecute solo.
Esto es una auditoria, no un arreglo, no puedes cambiar ningún archivo.
```

**Qué salió:**
```
La auditoría está en docs/auditoria/SH.md, commiteada en la rama auditoria-SH (1bea381). No he tocado ningún otro archivo del repo.

Cubre 22 reglas: 12 se cumplen, 4 no se cumplen y 6 no se pueden comprobar con lo que hay. Al final del documento hay una nota aparte con lo que CLAUDE.md afirma y el árbol contradice. Por ejemplo, dice que tasks no tiene tests y sí los tiene.

Para ver si .adonisjs/ estaba al día lo regeneré en una copia temporal de backend/, fuera del repo, y sale idéntico a lo commiteado. No ejecuté npm test ni npm run build en el repo porque escriben ficheros.

Todavía no he abierto el PR. Según las reglas del repo va una sola vez, al cerrar la unidad de trabajo. Si la auditoría ya está terminada, lo abro junto con la revisión del subagente adversarial-reviewer.
```