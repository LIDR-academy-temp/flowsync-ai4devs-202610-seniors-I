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
**Herramienta:** Claude Code

```
lee el README y dime que es lo que tengo que hacer por pasaso, listame la lista de tareas que tengo que hacer con este ejercicios y las iremos haciendo de uno a uno
```

**Qué salió:** funcionó a la primera: lista de 11 tareas (preparación, Parte A, Parte B, entrega) y comprobación del entorno.

## Prompt 2

**Modelo:** Claude Opus 5.5
**Herramienta:** Claude Code

```
si, empecemos con la tarea 1
```

**Qué salió:** funcionó a la primera: `npm test` 20/20 en verde, backend responde `{"hello":"world"}` y frontend 200.

## Prompt 3

**Modelo:** Claude Opus 5.5
**Herramienta:** Claude Code

```
ya tengo mi número, pasemos a la tarea 3, mi numero es 5
```

**Qué salió:** creó este `prompts.md` con los tres primeros prompts.

## Prompt 4

**Modelo:** Claude Opus 5.5
**Herramienta:** Claude Code

```
reloj en marcha, vamos con la tarea 4
```

**Qué salió:** creó `docs/verificacion/crt.md` con el total de scenarios (3) y la matriz vacía con una fila por scenario.

## Prompt 5

**Modelo:** Claude Opus 5.5
**Herramienta:** Claude Code

```
si, vamos con la tarea 5
```

**Qué salió:** buscó en la suite y leyó los tests de auth: no hay ningún test de `tasks`; los tres scenarios quedan "No cubierto" (dos con tests parecidos en auth que afirman sobre la cuenta, no sobre el `assignee`). De paso vio que la lista usa `UserTransformer` (con email) y la tarea suelta `TaskAssigneeTransformer` (sin email).

## Prompt 6

**Modelo:** Claude Opus 5.5
**Herramienta:** Claude Code

```
si, vamos con la tarea 6
```

**Qué salió:** escribió `backend/tests/functional/tasks/assignee.spec.ts` (3 tests). La primera ejecución falló entera por entorno (faltaba la tabla `tasks`: migraciones pendientes); tras `node ace migration:run`, 2 verdes y 1 rojo: la lista expone el `email` del responsable.

## Prompt 7

**Modelo:** Claude Opus 5.5
**Herramienta:** Claude Code

```
si, vamos con la tarea 8
```

**Qué salió:** rellenó el número de cubiertos (0 de 3) y redactó las tres líneas de la Parte B a partir de lo encontrado en las tareas 5 y 6.

## Prompt 8

**Modelo:** Claude Opus 5.5
**Herramienta:** Claude Code

```
si, vamos con la tarea 9
```

**Qué salió:** commit de `docs/verificacion`, `backend/tests` y `prompts.md` con la skill `/commit`, y push a la rama del fork.

## Prompt 9

**Modelo:** Claude Opus 5.5
**Herramienta:** Claude Code

```
si, vamos con la tarea 10
```

**Qué salió:** identificó el repo del curso (`LIDR-academy-temp/...`, padre del fork; el del README no existe) y la base `s4/start`. El `gh pr create` lo bloqueó el modo auto de Claude Code por ser una acción pública; el PR lo abrí yo a mano con el cuerpo que preparó.

## Prompt 10

**Modelo:** Claude Opus 5.5
**Herramienta:** Claude Code

```
ya abrí el PR, vamos con la tarea 11
```

**Qué salió:** no encontró el PR de `trazabilidad-crt` en el repo del curso; lanzó igualmente el subagente `adversarial-reviewer` (read-only) sobre el diff de la rama contra `s4/start`.

## Prompt 11

**Modelo:** Claude Opus 5.5
**Herramienta:** Claude Code

```
este es el PR
```

**Qué salió:** no funcionó: el mensaje llegó sin URL y el PR seguía sin aparecer en el repo del curso.

## Prompt 12

**Modelo:** Claude Opus 5.5
**Herramienta:** Claude Code

```
si, añade los hallazgos a crt.md y haz commit y push
```

**Qué salió:** añadió a `crt.md` la sección de la revisión adversarial (sin tocar los tests) y commiteó y empujó junto con los prompts 9–12.
