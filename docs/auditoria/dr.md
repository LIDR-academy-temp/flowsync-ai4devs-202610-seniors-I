# Auditoría de reglas de proceso — DR

## Mi apuesta (escrita a las 17:50, antes de comprobar nada)

- Leer el plan antes de tocar código: sí
- Un commit por cambio lógico: ni idea
- Pasar los tests antes de cerrar: no

> Nota: estas tres líneas son los ejemplos de la plantilla que usé; no las
> sustituí por las reglas reales de CLAUDE.md. En la práctica, no hice una
> apuesta sobre las 10 reglas antes de lanzar el agente.

## Tabla

| # | Qué pide la regla | Qué se miró | Veredicto | Evidencia | Acción |
|---|---|---|---|---|---|
| 1 | Antes de tocar código, mirar en qué rama estás. | `git log -15 --format='%h %an \| %s'`; `git reflog --date=iso` | no se puede comprobar con lo que hay | Mirar la rama no deja rastro en git; el reflog solo guarda checkouts locales, y los 15 commits vienen de upstream (autores LIDR/Earvin), no de este clon. | dejarla |
| 2 | Si ya estás en una rama de trabajo (no `main` ni `sN/*`), seguir en ella. | `git branch -a --contains <hash>` para cada uno de los 15 | no se puede comprobar con lo que hay | Historia lineal sin merges (`git log -15 --merges` vacío): no se ve en qué rama se hizo cada commit, solo que hoy están en `s5/start` y `upstream/s4/end`. | dejarla |
| 3 | Crear rama nueva (`feat/<slug>`) solo desde `main` o `sN/*`. | `git branch -a --contains <hash>`; `git log -15 --merges --oneline` | no se puede comprobar con lo que hay | Ninguna rama `feat/*` en `git branch -a`; con historia lineal, una rama hecha y luego avanzada por fast-forward no deja rastro. | dejarla |
| 4 | No commitear directo en `main` ni en `sN/*`. | `git branch -a --contains <hash>`; `git log -15 --merges --oneline` | no se puede comprobar con lo que hay | Los 15 commits están en `s5/start`/`upstream/s4/end` sin merge que los traiga; saber si se commitearon ahí mismo o llegaron por fast-forward exige el reflog del autor en upstream. | dejarla |
| 5 | Al cerrar cada petición, commitear con la skill `/commit`. | `.claude/skills/commit/SKILL.md`; `git log -15 --format='%h %(trailers:key=Co-Authored-By,valueonly)'` | no se puede comprobar con lo que hay | La skill no deja marca: solo pide `tipo(scope): …`, que también sale escribiendo a mano. `aee9a24` ni siquiera lleva scope. | bajarla |
| 6 | Si tocas rutas/controladores/validadores/transformers, el mismo commit lleva el diff regenerado de `.adonisjs/` (el documento OpenAPI). | `git log -15 --name-only`; `git show cbe9617 --stat`; `grep -rn openapi backend/.adonisjs/server/routes.d.ts` | no se puede comprobar con lo que hay | `cbe9617` (único commit afectado después de `160fbc7`) toca 3 controladores y no trae diff de `.adonisjs/`. Confirmar que no tocaba exige regenerar, y eso modifica el árbol. Además `.adonisjs/` solo guarda los nombres de las rutas, no los decoradores: no refleja el documento OpenAPI. (verificado a mano: cbe9617 no toca backend/.adonisjs/). | borrarla | 
| 7 | En ese mismo commit, el README `docs/capabilities/<nombre>/README.md` queda al día. | `git show cbe9617 --stat`; `git show 160fbc7 -- CLAUDE.md` | se cumple | `cbe9617` incluye `docs/capabilities/tasks/README.md` (+18/−1) junto a los controladores. `4e03d1f` (transformer sin README) y `ea5db1f` (rutas sin README) son anteriores a la regla (`160fbc7`). (Verificado a mano con git show --numstat; el agente había puesto +19/−2.)| dejarla |
| 8 | Al terminar la unidad de trabajo, abrir una sola vez el PR con `gh pr create` y una descripción completa. | `gh pr list --state all` (falla: `gh: instrucción no encontrada`); `git log -15 --merges --oneline` | no se puede comprobar con lo que hay | `gh` no está instalado y no hay commits de merge de PR en los 15; haría falta consultar la API de GitHub de `upstream`. | dejarla |
| 9 | Pasar `adversarial-reviewer` sobre ese PR una sola vez, como último paso. | `git show 8f9e715 --stat` (`.claude/agents/adversarial-reviewer.md`); `git log -15` | no se puede comprobar con lo que hay | El agente existe, pero sus pasadas no quedan en git; faltan los comentarios del PR (depende de la regla 8, tampoco verificable). | dejarla |
| 10 | Al abrir el PR, responder en el chat solo con la URL. | `git log -15` | no se puede comprobar con lo que hay | Lo que se dice en el chat no queda en el repo; haría falta la transcripción de la sesión. | borrarla |

## Parte B

1. **Donde me equivoqué:** daba por hecho que las reglas se cumplían, y que lo
   que escribía el agente en la tabla estaba bien. Resultó que 9 de 10 reglas
   no se pueden comprobar con lo que hay, y en la única que "se cumple" (regla 7)
   el agente puso mal el dato: escribió +19/−2 en el README y al verificarlo yo
   con `git show --numstat cbe9617` era +18/−1. No sabía si se cumplían antes de
   mirar: lo daba por hecho.

2. **No comprobable:** la regla 5 (cerrar cada petición con `/commit`). Git no
   guarda qué herramienta escribió el commit, así que no deja rastro. Para que
   lo dejara, habría que comprobar lo que la skill produce y no si se usó: un
   hook `commit-msg` que rechace los mensajes sin formato `tipo(scope): …`.

3. **La borraría:** la regla 10 (responder en el chat solo con la URL del PR).
   Ocurre en una conversación que no queda en ningún sitio, no se puede comprobar
   ni automatizar, y si se incumple no se rompe nada: el PR existe igual.
   Grupo: no se sabe nunca si se cumple y a nadie le importa.
