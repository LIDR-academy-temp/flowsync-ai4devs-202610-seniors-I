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

## Prompt 1— listar reglas

**Modelo:** Opus 5.5
**Herramienta:** Claude Code
**Hora:** 17:50

```
Lee la sección de reglas de proceso de CLAUDE.md (las que dicen qué hacer
antes de tocar código, cuándo se commitea y qué va al cerrar el trabajo).
Enuméralas como lista numerada, una frase por regla. Si una regla pide dos
cosas, sepárala en dos. No ejecutes nada más ni modifiques ningún archivo.
```

**Qué salió:** (Lista correcta respecto a CLAUDE.md, 5 viñetas → 10 reglas, no falta ninguna)
```
  1. Antes de tocar código, mira en qué rama estás.
  2. Si estás en una rama de trabajo (cualquiera que no sea main ni una sN/*), sigue
     en ella en vez de crear otra.
  3. Solo se crea una rama nueva (git checkout -b feat/<slug>) si estás en main o en
     una sN/*.
  4. Nunca se commitea directamente en main ni en una sN/*.
  5. Al cerrar cada petición se hace un commit con la skill /commit.
  6. Si el cambio toca rutas, controladores, validadores o transformers de una
     capability, el mismo commit debe llevar el diff regenerado de .adonisjs/, que es
     lo que mantiene al día el documento OpenAPI.
  7. En ese mismo commit, el README de la capability
     (docs/capabilities/<nombre>/README.md) también tiene que quedar al día.
  8. Al terminar la unidad de trabajo, y solo una vez, se abre el PR con gh pr create
     y una descripción completa de los cambios en el cuerpo.
  9. Después, y también solo una vez al terminar la unidad de trabajo, el subagente
     adversarial-reviewer revisa ese PR. Es el último paso antes de dar la unidad por
     terminada.
  10. Cuando abras el PR, responde en el chat solo con su URL, sin repetir el resumen.
```

## Prompt 2

**Modelo:** Opus 5.5
**Herramienta:** Claude Code
**Hora:** 17:57

```
Ahora audita esas 10 reglas contra los últimos 15 commits (git log -15,
y git show de los que necesites) y el estado actual del árbol.

Restricción estricta: NO modifiques ningún archivo salvo
docs/auditoria/dr.md. No arregles nada de lo que encuentres. En ese
archivo, NO toques la sección "Mi apuesta": escribe la tabla debajo del
encabezado "## Tabla".

Tabla en markdown, una fila por regla, 5 columnas:
1. Qué pide la regla (una frase)
2. Qué se miró (comando git exacto o archivo concreto)
3. Veredicto: "se cumple" | "no se cumple" | "no se puede comprobar con lo que hay"
4. Evidencia en una línea (hash del commit donde se rompe, o qué falta para comprobarla)
5. Acción: dejarla | borrarla | bajarla

Prohibido "se cumple" sin un comando o archivo que lo respalde: si no hay
rastro, el veredicto es "no se puede comprobar con lo que hay".
```

**Qué salió:** 
```
Escribió la tabla. 1 se cumple (regla 7), 9 no se pueden comprobar.
Usó "bajarla" con un significado distinto al de la lección (como "pasar a
recomendación"). Para las reglas 8 y 9 dijo que no podía por falta de gh.
```

## Prompt 3 — verificar cbe9617

**Modelo:** Opus 5.5
**Herramienta:** Claude Code
**Hora:** 18:10

```
!git show --stat cbe9617
```

**Qué salió:** 
```
Las primeras veces lo escribí sin `!`, así que el agente lo tomó
como petición y me devolvió resúmenes interpretados, no la salida de git. En uno
de ellos reconoció que había puesto mal la cifra del README (+19/−2 en vez de
+18/−1). Al final lo lancé como `!git show --stat cbe9617` y vi la salida directa.
También lo comprobé en una terminal aparte con
`git --no-pager show --numstat --format= cbe9617 -- docs/capabilities/tasks/README.md`:
el README es +18/−1.
```
