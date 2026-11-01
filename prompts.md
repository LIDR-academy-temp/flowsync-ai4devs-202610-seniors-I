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

**Modelo:** Opus 5.5 Medium
**Herramienta:** Claude Code

```
Abre el backend y ejecuta node ace migration:run y dime cuando termine el proceso y explicame que hace este comando
```

**Qué salió:** el comando no terminaba y tuve que interrumpir la sesión.

## Prompt 2

**Modelo:** Opus 5.5 Medium
**Herramienta:** Claude Code

```
Que demora tanto tiempo?
```

## Prompt 3

**Modelo:** Opus 5.5 Medium
**Herramienta:** Claude Code

```
/btw los pedidos realizados estan tomando varios minutos. Podes responderme rapidamente que procesos demoran tanto o si es un tema de recursos de mi maquina o velocidad de conexion o que esta sucediendo_
```

**Qué salió:** lo envié con una errata al final y lo relancé corregido.

## Prompt 4

**Modelo:** Opus 5.5 Medium
**Herramienta:** Claude Code

```
/btw los pedidos realizados estan tomando varios minutos. Podes responderme rapidamente que procesos demoran tanto o si es un tema de recursos de mi maquina o velocidad de conexion o que esta sucediendo?
```

**Qué salió:** diagnosticó falta de memoria en la máquina y sincronización de iCloud, sin problema de conexión.

## Prompt 5

**Modelo:** Opus 5.5 Medium
**Herramienta:** Claude Code

```
Reinicie la computadora pero el comando node ace migration:run sigue sin responder
```

## Prompt 6

**Modelo:** Opus 5.5 Medium
**Herramienta:** Claude Code

```
dani@MacBook-Air-de-Daniel backend % node ace migration:run
^C
dani@MacBook-Air-de-Daniel backend % 
  [Restored 31 Oct 2026 at 10:22:12 PM]
Last login: Sat Oct 31 22:22:09 on console
/bin/date: option requires an argument -- r
usage: date [-jnRu] [-I[date|hours|minutes|seconds|ns]] [-f input_fmt]
            [ -z output_zone ] [-r filename|seconds] [-v[+|-]val[y|m|w|d|H|M|S]]
            [[[[mm]dd]HH]MM[[cc]yy][.SS] | new_date] [+output_fmt]
Restored session: 
dani@MacBook-Air-de-Daniel backend % node ace migration:run
[ info ] Upgrading migrations version from "1" to "2"
❯ migrated database/migrations/1761885935168_create_users_table
❯ migrated database/migrations/1768620764696_create_access_tokens_table

Migrated in 22 s
dani@MacBook-Air-de-Daniel backend % npm run dev

> backend@0.0.0 dev
> node ace serve --hmr

[ error ] Cannot find package "@adonisjs/assembler"

The "@adonisjs/assembler" package is a development dependency and therefore you should use the serve command during development only.

If you are running your application in production, then use "node bin/server.js" command to start the HTTP server
```

## Prompt 7

**Modelo:** Opus 5.5 Medium
**Herramienta:** Claude Code

```
/init
```

**Qué salió:** lo lancé en la copia del proyecto en `~/Desktop`.

## Prompt 8

**Modelo:** Opus 5.5 Medium
**Herramienta:** Claude Code

```
/init
```

**Qué salió:** lo relancé en la copia del proyecto en `~/dev`.

## Prompt 9

**Modelo:** Opus 5.5 Medium
**Herramienta:** Claude Code

```
claude mcp add --transport http atlassian https://mcp.atlassian.com/v2/mcp
```

**Qué salió:** el servidor quedó en scope local y pendiente de autenticación.

## Prompt 10

**Modelo:** Opus 5.5 Medium
**Herramienta:** Claude Code

```
claude mcp remove atlassian -s local && claude mcp add --transport http --scope project atlassian https://mcp.atlassian.com/v2/mcp
```

## Prompt 11

**Modelo:** Opus 5.5 Medium
**Herramienta:** Claude Code

```
Crea estas skills:
```

**Qué salió:** se envió incompleto y lo relancé entero.

## Prompt 12

**Modelo:** Opus 5.5 Medium
**Herramienta:** Claude Code

```
Crea estas skills: Una skill /priority-ticket: trae el ticket de mayor prioridad asignado a ti en «Por hacer», resume sus criterios de aceptación, entra en plan mode y propone cómo implementarlo; al aprobar el plan, lo mueve a «En curso». Una skill /commit: un commit convencional (tipo(scope): descripción) a partir de los cambios preparados.
```

## Prompt 13

**Modelo:** Opus 5.5 Medium
**Herramienta:** Claude Code

```
Crea un subagente adversarial-reviewer: revisa un pull request intentando romperlo, no aprobarlo, y sin editar nada.
```

## Prompt 14

**Modelo:** Opus 5.5 Medium
**Herramienta:** Claude Code

```
Crea un hook que formatea el frontend cada vez que el agente edita un archivo. El frontend no trae formateador: instala Prettier en frontend/ y dispáralo sobre frontend/src/**.
```

## Prompt 15

**Modelo:** Opus 5.5 Medium
**Herramienta:** Claude Code

```
Actualiza las reglas de proceso, al final del CLAUDE.md: rama nueva antes de tocar código; al cerrar, /commit y el pull request con gh pr create; después, el subagente revisor sobre el pull request; y en el chat, solo la URL del pull request. Ademas AGENTS.md como enlace a CLAUDE.md, para que lo lean también otras herramientas: ln -s CLAUDE.md AGENTS.md.
```

## Prompt 16

**Modelo:** Opus 5.5 Medium
**Herramienta:** Claude Code

```
/priority-ticket trae el ticket de mayor prioridad asignado a mi, resumi los criterios de aceptacion. Luego cambia a modo plan y arma un plan para implementarlo
```

**Qué salió:** la búsqueda devolvió 0 resultados y la skill se detuvo.

## Prompt 17

**Modelo:** Opus 5.5 Medium
**Herramienta:** Claude Code

```
Trae el ticket de mayor prioridad asignado a mi, resumi los criterios de aceptacion. Luego cambia a modo plan y arma un plan para implementarlo
```

**Qué salió:** lo lancé en `flowsync-sin-harness`, el proyecto sin harness.

## Prompt 18

**Modelo:** Opus 5.5 Medium
**Herramienta:** Claude Code

```
La configuracion de Jira puede estar en ingles, busca su equivalencia en ingles
```

**Qué salió:** «To Do» tampoco dio resultados; el motivo real era que FLOW-2 no tenía responsable. Se asignó y se armó el plan.

## Prompt 19

**Modelo:** Opus 5.5 Medium
**Herramienta:** Claude Code

```
Guarda el plan pero no lo ejecutes
```

**Qué salió:** lo escribí al rechazar el plan; quedó guardado sin ejecutarse.

## Prompt 20

**Modelo:** Opus 5.5 Medium
**Herramienta:** Claude Code

```
Tenes acceso a los prompts que ejecutamos para configurar el harness del proyecto? Si tenes acceso, modifica el archivo prompts.md usando el Prompt 1 de ejemplo y completa el archivo con todos los prompts utilizados
```
