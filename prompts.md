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

**Modelo:** Sonet 3.5 xMedium
**Herramienta:** Claude Code

```
Vas a hacer una AUDITORÍA, no un arreglo. No modifiques, crees ni borres ningún archivo, salvo crear docs/auditoria/db.md con el resultado. No hagas commits ni cambies de rama.

Material: la sección "Reglas de proceso" de CLAUDE.md, contrastada contra los últimos 15 commits del repositorio y el estado actual del árbol. Usá git (log, show --stat, branch, etc.) para mirar el historial.

En docs/auditoria/db.md escribí una tabla con una fila por regla y estas 5 columnas:
1. Qué pide la regla (una frase).
2. Qué se miró para comprobarlo (el comando exacto o el archivo).
3. Veredicto, solo uno de estos tres: "se cumple", "no se cumple", "no se puede comprobar con lo que hay".
4. Evidencia en una línea: si no se cumple, el commit o el sitio donde se rompió; si no se puede comprobar, qué falta para poder comprobarla.
5. Qué harías con ella, una palabra: dejarla, borrarla o bajarla (a algo que se ejecute solo).

Reglas para vos: un "se cumple" sin evidencia concreta es en realidad "no se puede comprobar". Si una regla tiene dos pedidos distintos adentro, avisame. La tabla tiene que entrar en una pantalla.

Al final, en el chat, dame un comando de git que yo pueda correr en mi terminal para comprobar con mis propios ojos la fila que te parezca más llamativa.
```

**Qué salió:** Ninguna de las 5 reglas de proceso se pudo marcar "se cumple" ni "no se cumple". Las 5 quedaron en "no se puede comprobar", porque git no guarda la rama donde se hizo cada commit, si se usó /commit, si pasó el revisor adversarial ni lo que se respondió en el chat. Propongo bajar las reglas 1 a 4 a algo que se ejecute solo y dejar la 5. Tres reglas esconden dos pedidos cada una: la 1, la 3 y la 4. Eso está avisado en el documento.

La fila más llamativa es la 1. Los commits de trabajo (4e03d1f y los demás) están contenidos en s5/start y upstream/s4/end, que son ramas sN/*. Eso sugiere commits directos en una rama de partida, pero un fast-forward lo explicaría igual. Para verlo vos mismo:

git branch -a --contains 4e03d1f

---

## Prompt 2

**Modelo:** Sonet 3.5 xMedium
**Herramienta:** Claude Code

Revisá de nuevo la regla 3 (cambio en rutas/controladores/validadores/transformers → mismo commit con el diff de .adonisjs/ y docs/capabilities/<nombre>/README.md). Esa regla sí deja rastro: los archivos que cambia cada commit.
Para cada uno de los últimos 15 commits que toque esos archivos, mirá con git show --stat si en el mismo commit cambian también .adonisjs/ y el README de la capability.
Tené en cuenta desde cuándo existe la regla (git log -- CLAUDE.md): un commit anterior a la regla no la puede incumplir.
Actualizá solo la fila de esa regla en docs/auditoria/db.md, con el comando y los commits concretos como evidencia. No toques nada más.