# 1. Las delta-specs de OpenSpec son la fuente de verdad viva

## Contexto

FlowSync lleva el comportamiento del producto en `openspec/`, con esquema `spec-driven` (`openspec/config.yaml`). Hoy hay dos capabilities vivas en `openspec/specs/`:

- `auth` — registro, sesión y acceso a la cuenta
- `tasks` — lista compartida, estados, vencimiento y filtro por estado

Esas specs no se escriben de golpe: se construyen por **changes**. Cada change vive bajo `openspec/changes/`, con `proposal.md`, `design.md`, `tasks.md` y deltas en `specs/<capability>/spec.md` que marcan requisitos como `ADDED` o `MODIFIED`. Al cerrarlo, el change se archiva en `openspec/changes/archive/<fecha>-<slug>/` y sus deltas se consolidan en `openspec/specs/`.

En el archivo hay tres changes ya aplicados:

- `2026-08-13-add-task-list` — introduce la capability `tasks` y modifica destinos de `auth`
- `2026-08-13-add-task-due-date` — añade vencimiento y detalle de tarea sobre `tasks`
- `2026-08-13-add-task-status-filter` — documenta el filtro por estado y corrige requisitos vivos que el código ya había dejado obsoletos

El código (API, OpenAPI, tests, UI) implementa o anota ese comportamiento, pero no lo define: si divergimos, la pregunta «qué debe hacer el producto» se responde mirando la spec viva, no el último commit de implementación.

## Decisión

Usamos las **delta-specs de OpenSpec** —y, tras archivar, las specs consolidadas en `openspec/specs/`— como **fuente de verdad viva** del comportamiento de FlowSync.

Cualquier cambio de producto se propone como change con deltas `ADDED`/`MODIFIED` (y, cuando toque, eliminaciones) sobre las capabilities afectadas. El archivo bajo `openspec/changes/archive/` conserva el historial de por qué y cómo se llegó al estado actual; la spec viva es lo que vale hoy. Código, OpenAPI y tests se alinean a esa spec, no al revés.

## Estado

Aceptada.

## Consecuencias

**A favor.** El comportamiento queda versionado junto al código, en castellano y por scenarios comprobables. Los changes archivados explican el origen de cada requisito (p. ej. cuándo la lista dejó de ser «todas»). Varias personas —humanas o agentes— pueden contrastar implementación, tests y OpenAPI contra el mismo texto. Las capacidades (`auth`, `tasks`) acotan el alcance de cada conversación.

**A costa.** Mantener la verdad en OpenSpec obliga a un ciclo extra: proposal → delta → apply → archive; no basta con mergear código. Si el código se adelanta a la spec (como ocurrió con el filtro por estado), hay deuda explícita hasta escribir el change. Las specs vivas son largas y densas: contrastar cobertura de tests u OpenAPI es trabajo manual o de herramientas propias. Los deltas mal archivados o requisitos `MODIFIED` a medias dejan la spec viva incorrecta sin que el compilador avise. Y lo que la spec no dice —decisiones de implementación, atajos de tests omitidos, detalles de UX no scenarioizados— sigue sin fuente de verdad automática: hay que resistir la tentación de tratar el código o el OpenAPI como sustituto.
