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

**Modelo:** no consta con certeza. Al inicio de la sesión el entorno indicó Opus 5.5; después se cambió el modelo con `/model` (a `claude-haiku-4-5-20251001` y luego a `claude-haiku-5-5`). Confirmar antes de entregar.
**Herramienta:** Claude Code (extensión de VS Code)

```
este repo es un ejercicio, el Readme.md contiene las instrucciones.  Ve guardando cada prompt tal cual lo lanzas, desde el primero, en prompts.md
De acuerdo a la parte A del ejercicio, marqué con un Si las reglas de proceso que creo que ya se cumplen, contrasta esas reglas contra los últimos 15 commits del repositorio y el estado actual del árbol, y deja el resultado escrito en docs/auditoria/agnaedig.md de este repo, no en el chat.
```

**Qué salió:** en modo plan, sin poder escribir. Antes de planear hubo que preguntar dónde estaban las marcas «Sí» (estaban en AGENTS.md, symlink a CLAUDE.md, no en CLAUDE.md como supuse). Un comando de lectura fue bloqueado por el clasificador de modo automático y después rechazado por el usuario.

---

## Respuestas a las preguntas del agente (no son prompts, pero cambiaron el rumbo)

**Modelo:** igual que el Prompt 1.
**Herramienta:** Claude Code (cuadro de preguntas `AskUserQuestion`)

Pregunta 1, «¿cuáles apuestas se cumplen?»: respuesta literal:

```
Está en el archivo AGENTS.md
```

Pregunta 2, «¿marcaste como Sí la regla 5 y salgo del modo plan?»: respuesta literal:

```
La marqué Si, continúa en modo plan
```

---

## Prompt 2

**Modelo:** igual que el Prompt 1.
**Herramienta:** Claude Code (extensión de VS Code)

```
solo escribe el archiv de auditoria en el directorio docs
```

**Qué salió:** el agente quiso escribir también `prompts.md`; el usuario lo corrigió en el siguiente prompt.

---

## Prompt 3

**Modelo:** igual que el Prompt 1.
**Herramienta:** Claude Code (extensión de VS Code)

```
también incluye prompts.md
```

**Qué salió:** se escriben los dos archivos (`docs/auditoria/agnaedig.md` y `prompts.md`).
