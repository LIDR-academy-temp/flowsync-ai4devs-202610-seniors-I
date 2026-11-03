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

**Modelo:** Claude Opus 5.5
**Herramienta:** Claude Code (comando `/opsx:propose` de OpenSpec, lanzado desde un sandbox con el workspace añadido)

```
/opsx:propose creame una spec para el proyecto flowSync que cubra solo  solo cuentas y acceso: registro, login, sesión y perfil. Incluye las dos capas, API y pantallas.

Formato:
## Purpose
## Requirements
### Requirement: con SHALL
#### Scenario: con dos viñetas, - **WHEN** y - **THEN**
En castellano.
Reglas:
Sin ADDED, MODIFIED ni REMOVED.
Solo comportamiento observable: ni nombres de clases ni de archivos.
No toques el código. y a su vez siga las reglas y formato propuesto
```

**Qué salió:** spec de 32 requisitos y 43 escenarios más proposal, design y tasks; `openspec validate` avisa de que, sin ADDED, los requisitos no cuentan como delta.

## Prompt 2

**Modelo:** Claude Opus 5.5
**Herramienta:** Claude Code (comando `/opsx:explore` de OpenSpec)

```
/opsx:explore cubre  registro, login, sesión y perfil de las capas front y back?
```

**Qué salió:** confirmó cobertura de los cuatro temas en ambas capas y señaló huecos (formulario vacío, cargando en pantallas públicas, sesión en varias pestañas) y que ningún requisito estaba comprobado ejecutando.

## Prompt 3

**Modelo:** Claude Opus 5.5
**Herramienta:** Claude Code

```
agrega al archivo @C:\Users\zeroa\Workspace\flowsync-ai4devs-202610-seniors-I\prompts.md lC:\Users\zeroa\Workspace\flowsync-ai4devs-202610-seniors-I\prompts.md los promps segun pide en los comentarios
```

**Qué salió:** rellenó este archivo con los tres prompts.

## Prompt 4

**Modelo:** Claude Opus 5.5
**Herramienta:** Claude Code

```
los requisitos fueron pedidos o son propuestas?
```

**Qué salió:** aclaró que los 32 requisitos describen el comportamiento actual sacado del código, no pedidos uno a uno ni nuevos, y que los extras de explore eran propuestas.

## Prompt 5

**Modelo:** Claude Opus 5.5
**Herramienta:** Claude Code

```
en tonces no lo agreges. move la spec al directorio que pide el enunciado
```

**Qué salió:** movió la spec del sandbox a `docs/spec-viva/iaz.md` sin añadir los requisitos propuestos.

## Prompt 6

**Modelo:** Claude Opus 5.5
**Herramienta:** Claude Code

```
agrega las 2 listas faltantes y pone como TODO la que debo hacer yo. tmb agrega los promps
```

**Qué salió:** añadió la parte B con las listas 2 y 3 y el recuento de comprobados como TODO, y registró los prompts 4 a 6.

## Prompt 7

**Modelo:** Claude Opus 5.5
**Herramienta:** Claude Code

```
para finalizar subi solo lo que pide el enunciado a git
```

**Qué salió:** commit y push solo de `docs/spec-viva` y `prompts.md`, con el mensaje que indica el enunciado.
