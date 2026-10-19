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

**Modelo:** Opus 5.5 · xHigh
**Herramienta:** Claude Code 2.1.301 — copia con harness (pieza 1: archivo de instrucciones)

```
/init
```

**Qué salió:** funcionó a la primera. Generó un `CLAUDE.md` con los comandos, la arquitectura del backend y el contrato de la API, incluidas las reglas del validador de signup que el ticket no menciona (`fullName` obligatorio, `passwordConfirmation`, contraseña de 8 a 32 caracteres). Lo dejé tal cual, como pide el enunciado. Lo lancé el 16/10, antes de poner el reloj.


## Prompt 2

**Modelo:** Opus 5.5
**Herramienta:** Claude Code 2.1.302 — copia con harness, misma sesión que el Prompt 1 (preparación)

```
que fa curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3333   # → 200?
```

**Qué salió:** me explicó cada opción del comando y lo ejecutó: `200`, el backend estaba levantado.

## Prompt 3

**Modelo:** Opus 5.5
**Herramienta:** Claude Code 2.1.302 — copia con harness, misma sesión (preparación)

```
que fa git status --short
```

**Qué salió:** me explicó los códigos de dos letras y lo ejecutó: solo `frontend/package-lock.json` modificado y `CLAUDE.md` sin seguimiento.

## Prompt 4

**Modelo:** Opus 5.5
**Herramienta:** Claude Code 2.1.302 — copia con harness, misma sesión (preparación)

```
que fa gh repo set-default albertmasoliver/flowsync-ai4devs-202610-seniors-I
```

**Qué salió:** me explicó para qué sirve y comprobó que ya estaba configurado así. Me avisó de que el `upstream` apunta a `LIDR-academy-temp` y no al `LIDR-academy` del README.

## Prompt 5

**Modelo:** Opus 5.5
**Herramienta:** Claude Code 2.1.302 — copia con harness, misma sesión (encargo del montaje)

```
has de resoldre tot l'exercici i emplenar comparacion.md i prompts.md
```

**Qué salió:** leyó mi guía de resolución y los prompts que tenía preparados para las piezas 2 a 8, y quiso lanzarlos tal cual en sesiones separadas de Claude Code (`claude -p`). El clasificador del modo auto le bloqueó lanzar otros agentes con permisos («Create Unsafe Agents»), así que esos prompts preparados nunca se enviaron.

## Prompt 6

**Modelo:** Opus 5.5
**Herramienta:** Claude Code 2.1.302 — copia con harness, misma sesión (montaje del harness, piezas 2 a 8)

```
ajuda'm a fer el harness
```

**Qué salió:** lo envié mientras trabajaba en el Prompt 5. Montó las piezas 2 a 8 él mismo, en la misma sesión, siguiendo las especificaciones de mi guía en lugar de mis prompts: `.mcp.json` con `claude mcp add`, las skills `/priority-ticket` y `/commit`, el subagente `adversarial-reviewer`, Prettier y el hook en `frontend/`, las *Workflow rules* al final del `CLAUDE.md` y `AGENTS.md` como enlace. Comprobó el hook con un archivo de prueba dentro y fuera de `frontend/src`, y comprobó que el `git status` coincidía con el esperado. Hizo el commit del harness (`chore(harness): monta el harness del ejercicio`). No tuve que corregir nada.

## Prompt 7

**Modelo:** Opus 5.5 · High (no xHigh como en la copia con harness: lo vi después, en el registro de la sesión)
**Herramienta:** Claude Code 2.1.303 — copia **sin** harness (el encargo, escrito a mano)

```
Trae el ticket de mayor prioridad asignado a mí en «Por hacer», resume sus criterios de aceptación y entra en plan mode para proponer cómo implementarlo.
```

**Qué salió:** no pudo leer el ticket. Primero buscó un `CLAUDE.md` o un `.mcp.json` (no había ninguno) y leyó `prompts.md` y el `README.md` buscando pistas sobre el gestor de tickets. Después vio que el MCP de Atlassian no estaba autorizado en esa sesión y me pidió abrir un enlace para autorizarlo.

## Prompt 8

**Modelo:** Opus 5.5 · High
**Herramienta:** Claude Code 2.1.303 — copia **sin** harness (intervención)

```
ok
```

**Qué salió:** lo envié después de autorizar Jira en el navegador, y antes de enviarlo pasé la sesión a plan mode con Shift+Tab. Trajo FLOW-6, me enseñó los criterios numerados, lanzó dos subagentes Explore (uno para el frontend y otro para el contrato del backend) y presentó el plan unos 3 minutos después. Lo aprobé por error en lugar de rechazarlo. No aplicó nada, porque había leído en el `README.md` que el plan no se aplica, y tampoco movió el ticket.

## Prompt 9

**Modelo:** Opus 5.5 · xHigh
**Herramienta:** Claude Code 2.1.303 — copia **con** harness (el encargo, con la skill). Abrí la sesión desde `frontend/`, pero aun así cargó el `CLAUDE.md`, las skills, el subagente y el MCP del proyecto.

```
/priority-ticket
```

**Qué salió:** leyó FLOW-6 con el MCP del proyecto sin pedirme nada y entró en plan mode por sí mismo. Antes de proponer leyó las rutas, los validadores, los transformers y los controladores del backend. Intentó comprobar los errores con `curl`, pero el backend no estaba levantado. Presentó el plan unos 2 minutos después de lanzarlo, con rama nueva, cobertura de cada criterio por su número y cierre con `/commit`, PR y revisor. No me enseñó los criterios antes de planificar, como pide el paso 2 de la skill. Rechacé el plan, como pide el ejercicio.
