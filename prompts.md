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

**Modelo:** Opus 5.5 (claude-opus-5-5)
**Herramienta:** Claude Code

```
I want you to be able to connect to jira and read tickets
```

## Prompt 2

**Modelo:** Opus 5.5 (claude-opus-5-5)
**Herramienta:** Claude Code

```
Attlasian is not an option
```

## Prompt 3

**Modelo:** Opus 5.5 (claude-opus-5-5)
**Herramienta:** Claude Code

```
/init
```

## Prompt 4

**Modelo:** Opus 5.5 (claude-opus-5-5)
**Herramienta:** Claude Code

```
/skill-creator:skill-creator priority-ticket
```

## Prompt 5

**Modelo:** Opus 5.5 (claude-opus-5-5)
**Herramienta:** Claude Code

```
/skill-creator:skill-creator commit
```

## Prompt 6

**Modelo:** Opus 5.5 (claude-opus-5-5)
**Herramienta:** Claude Code (`/agents`)

```
create a adversarial-reviewer que revisa un pull request intentando romperlo, no aprobarlo, y sin editar nada
```

## Prompt 7

**Modelo:** Opus 5.5 (claude-opus-5-5)
**Herramienta:** Claude Code

```
claude mcp add --transport http atlassian https://mcp.atlassian.com/v2/mcp
```

## Prompt 8

**Modelo:** Opus 5.5 (claude-opus-5-5)
**Herramienta:** Claude Code

```
/priority-ticket
```

## Prompt 9

**Modelo:** Opus 5.5 (claude-opus-5-5)
**Herramienta:** Claude Code

```
2
```

## Prompt 10

**Modelo:** Opus 5.5 (claude-opus-5-5)
**Herramienta:** Claude Code

```
/priority-ticket
```

**Qué salió:** lo relancé 6 veces seguidas, con `/mcp` entre medias para autenticar Atlassian.

