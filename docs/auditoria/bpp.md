# Auditoría de las reglas de proceso (bpp)

Reglas de `CLAUDE.md` → «Reglas de proceso», contrastadas contra los últimos 15 commits de `s5/start` (`b955a72..aee9a24`) y el árbol en `aee9a24`. Sin modificar ningún archivo.

## Apuesta (antes de mirar)

R1 sí · R2 sí · R3 sí · R4 ni idea · R5 sí

## Tabla

| # | Qué pide la regla | Qué se miró | Veredicto | Evidencia | Qué haría |
|---|---|---|---|---|---|
| R1 | Trabajar en una rama por unidad de trabajo; nunca commitear en `main` ni en `sN/*` | `git log s5/start -15 --merges`; `git branch -a --contains 4e03d1f` | No se puede comprobar | Ningún merge en los 15: los commits están en línea directa sobre `s4/end`/`s5/start`. Un fast-forward o un rebase desde una rama de trabajo no deja rastro, así que no se distingue de commitear directo | Bajarla (protección de rama en `main` y `sN/*`) |
| R2 | Un commit por petición, hecho con la skill `/commit` | `git log s5/start -15 --format=%s` contra `^(feat\|fix\|docs\|test\|chore\|refactor)(\(...\))?: ` | No se puede comprobar | 15/15 siguen Conventional Commits, pero ni «una petición» ni «usó `/commit`» dejan rastro en el historial | Bajarla (hook `commit-msg` para el formato) |
| R3 | Si se tocan rutas, controladores, validadores o transformers, el mismo commit lleva el contrato (`.adonisjs/`) y el README de la capability | `git show --stat` de los commits posteriores a `160fbc7` (la regla) que tocan esas carpetas | Se cumple | `cbe9617` toca 3 controladores y trae `docs/capabilities/tasks/README.md`; `.adonisjs/` no cambia porque solo cambian decoradores OpenAPI. Es el único caso posterior a la regla | Bajarla (comprobación en CI del contrato) |
| R4 | Al terminar la unidad: un solo `gh pr create` con descripción completa y, al final, el `adversarial-reviewer` | Historial de git; `gh pr list` del repo del curso | No se puede comprobar | El paso del revisor no deja rastro en el repo ni en el PR: su informe se queda en el chat | Dejarla, haciendo que el informe se publique en el PR |
| R5 | Al abrir el PR, responder en el chat solo con su URL | Nada que mirar: vive en una sesión que no se guarda | No se puede comprobar | No hay ningún artefacto donde quede la respuesta del agente | Borrarla |

## Las tres líneas

1. **Me equivoqué con R1.** Habría jurado que se cumplía, porque todo el trabajo va en ramas `feat/*` y `*-bpp`. Pero en el historial no hay ni un merge: con fast-forward, una rama de trabajo y un commit directo en `s5/start` dejan exactamente la misma huella.
2. **R4 no se puede comprobar con lo que hay.** El revisor adversarial existe (`8f9e715` lo modifica), pero su informe muere en el chat. Dejaría rastro si el informe se publicara como comentario del PR, como hace un revisor que corre en CI.
3. **Borraría R5.** Pertenece al grupo de las que no se pueden cumplir de forma verificable y a nadie le ha importado: ninguna revisión, ningún test y ningún PR delatan si el agente respondió con la URL o con un resumen.
