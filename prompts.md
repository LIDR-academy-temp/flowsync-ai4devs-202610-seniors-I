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

**Modelo:** Composer
**Herramienta:** Cursor

```
revisa el make setup y reseulve el error de suejecucio
```

**Qué salió:** entorno previo al ejercicio (sesión aparte); no es la auditoría.

---

## Prompt 2

**Modelo:** Composer
**Herramienta:** Cursor

```
Contrasta las reglas de proceso contra los últimos 15 commits del repositorio y el estado actual del árbol, y deja el resultado escrito en docs/auditoria/cag.md, no en el chat.
Sigue este formato:
La tabla

Con un agente, contrasta esas reglas contra los últimos 15 commits del repositorio y el estado actual del árbol, y deja el resultado escrito en docs/auditoria/<tus-iniciales>.md, no en el chat.

El formato lo fija esta lección, y no es negociable: una fila por regla, con estas cinco casillas.





Qué pide la regla. Una frase, con tus palabras. Si necesitas tres, es que ahí hay dos reglas metidas en una.



Qué se miró para comprobarlo. El comando concreto, o el archivo. Sin esta casilla la fila no se escribe: es lo único que separa una auditoría de una opinión.



Veredicto, y solo hay tres: se cumple, no se cumple, o no se puede comprobar con lo que hay. Este tercero no es rendirse, es un dato: significa que esa regla no deja rastro en ninguna parte. Un se cumple sin evidencia detrás es en realidad este, mal etiquetado.



La evidencia, en una línea. Si el veredicto es no se cumple, el sitio donde se rompió. Si es no se puede comprobar, qué falta para poder comprobarla.



Qué harías con ella. Una palabra: dejarla, borrarla o bajarla a algo que se ejecute solo.

Este es un ejercicio de auditoría no debes tocar ningun archivo, solo se debe documentar en el formato esperado los hallazgos
```

**Qué salió:** funcionó a la primera; escribió `docs/auditoria/cag.md` con tabla y parte B, sin tocar el resto del árbol.

---
