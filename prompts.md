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

<!-- TODO: faltan los prompts con los que se montó el harness (piezas 1-8). No están en esta sesión:
pégalos tal cual se lanzaron, en su orden. -->

## Copia con harness

## Prompt 1

**Modelo:** Opus 5.5
**Herramienta:** Claude Code (plan mode activado con `/plan`)

```
/priority-ticket genera un plan para implementar el feature descripto en el ticket
```

**Qué salió:** no encontró tickets en «Por hacer» exacto (FLOW-1 estaba en «Tareas por hacer») y preguntó si usarlo; después preguntó el alcance y el router.

## Prompt 2

**Modelo:** Opus 5.5
**Herramienta:** Claude Code (respuesta libre a una pregunta del agente: «¿Cómo se navega entre pantallas?»)

```
revisa en los readme del frontend y backend como esta diseñado el proyecto y guiate por esas definiciones
```

**Qué salió:** leyó el README raíz y metió shadcn/ui + Tailwind en el plan, además de react-router. Aprobé el plan y lo implementó hasta el PR #1.

## Prompt 3

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
donde creaste el plan?
```

**Qué salió:** el plan estaba en `~/.claude/plans/`, fuera del repo.

## Prompt 4

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
copialo en  docs/harness/
```

## Prompt 5

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
hacelo pero antes completa el promps.md segun las reglas definidas y hace la comparacion contra el plan docs/sin-harness/crea-un-plan-para-lively-swing.md
```

**Qué salió:** el plan sin harness estaba en la otra copia (`flowsync-ai4devs-202610-seniors-I-sin-harness/docs/sin-harness/`), no en este repo.

## Copia sin harness

## Prompt 1

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
/init
```

**Qué salió:** avisó de que esta es la copia sin harness y que el README dice que no se toca; respondí «Write it here anyway» y generó `CLAUDE.md`.

## Prompt 2

**Modelo:** Opus 5.5
**Herramienta:** Claude Code (plan mode activado con `/plan`)

```
crea un plan para implementar el ticket de jira
```

**Qué salió:** encontró solo FLOW-1 («Enlace de navegación entre login y registro», en «En curso») y preguntó el alcance; elegí «FLOW-1 + lo mínimo» (los enlaces más las pantallas de login y registro básicas con routing). Aprobé el plan, que quedó en `~/.claude/plans/crea-un-plan-para-lively-swing.md`.

## Prompt 3

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
donde creaste el plam?
```

**Qué salió:** el plan estaba en `~/.claude/plans/`, fuera del repo.

## Prompt 4

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
copialo en  docs/sin-harness/
```
