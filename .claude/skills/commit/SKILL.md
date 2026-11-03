---
name: commit
description: Genera un commit convencional a partir de los cambios staged. Usar al cerrar una tarea.
---
# Commit convencional
1. Ejecuta `git diff --staged` y resume el cambio.
2. Redacta un mensaje `tipo(scope): descripción` (feat/fix/refactor/docs/test/chore).
3. Muestra el resumen del diff y el mensaje propuesto, y espera a que el usuario los apruebe. No commitees sin esa aprobación.
4. Con la aprobación, commitea con ese mensaje (o con el que el usuario haya corregido).
