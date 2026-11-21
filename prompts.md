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

**Modelo:** Opus 5.5 High
**Herramienta:** Claude Code

```
Realiza una auditoría sobre el cumplimiento de las "Reglas de proceso" descritas en CLAUDE.md en los últimos 15 commits del repositorio y el estado actual del árbol. Deja el resutlado escrito en @docs/auditoria/evpd.md, debajo de la sección "# Parte A: la auditoría".

## Formato:
El resultado será una tabla, con una fila por regla, con estas cinco casillas:
- Qué pide la regla: Una frase, con tus palabras. Si necesitas tres, es que ahí hay dos reglas metidas en una, en ese caso, apúntalo en la casilla "Qué harías con ella".
- Qué se miró para comprobarlo: El comando concreto, o el archivo. Sin esta casilla la fila no se escribe: es lo único que separa una auditoría de una opinión.
- Veredicto: solo hay tres: "se cumple", "no se cumple", o "no se puede comprobar con lo que hay". "no se puede comprobar con lo que hay" significa que esa regla no deja rastro en ninguna parte. "se cumple" siempre lleva evidencia detrás.
- La evidencia: en una línea. Si el "Veredicto" es "no se cumple", el sitio donde se rompió. Si es no se puede comprobar, qué falta para poder comprobarla.
- Qué harías con ella: Una palabra: "dejarla", "borrarla" o "bajarla a algo que se ejecute solo". "bajarla a algo que se ejecute solo" significa añadir un comando o herramienta que valida la regla.

## Restricciones:
- el formato no es negociable
- no devuelvas el resultado en el chat
- no cambies ningún archivo, excepto donde vas a dejar el resultado: @docs/auditoria/evpd.md
```

**Qué salió:** (opcional, una línea) funcionó a la primera.

## Prompt 2

**Modelo:** Opus 5.5 High
**Herramienta:** Claude Code

```
en la regla: "Cerrar cada petición con un commit hecho con la skill `/commit`.", ¿qué se podría implementar para lo que añadiste en "Qué harías con ella" que fue "bajarla a algo que se ejecute solo"?

  - no mdifiques el código ni generes scripts.
  - solo lista las alternativas y las estrategias.
```

**Qué salió:** (opcional, una línea) funcionó a la primera.

## Prompt 3

**Modelo:** Opus 5.5 High
**Herramienta:** Claude Code

```
teniendo en cuenta los hallazgos de la regla "Si un commit toca rutas, controladores, validadores o transformers de una capability, ese mismo commit actualiza su OpenAPI (el diff de `.adonisjs/`) y su `docs/capabilities/<nombre>/README.md`.", diría que se cumple a partir de que se añadió la regla.

Pero, planteas "bajarla a algo que se ejecute solo", ¿cómo se puede bajar a algo que se ejecute solo?. No modifiques código.
```

**Qué salió:** (opcional, una línea) funcionó a la primera.
