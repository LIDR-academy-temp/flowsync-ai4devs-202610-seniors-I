---
name: commit
description: Crea un commit convencional (tipo(scope): descripción) a partir de los cambios preparados con git add. Úsala al cerrar una tarea.
allowed-tools: Bash(git status:*), Bash(git diff:*), Bash(git log:*), Bash(git commit:*)
---

Crea un commit convencional a partir de los cambios ya preparados (staged).

1. Mira `git diff --cached`. Si no hay nada preparado, dilo y para: no hagas `git add` por tu cuenta.
2. Elige el tipo: feat, fix, docs, style, refactor, test o chore.
3. El scope es la parte del repo afectada: `frontend`, `backend`, `harness`...
4. Descripción en español, en minúscula, sin punto final y de 72 caracteres como máximo, siguiendo el estilo de `git log --oneline`. Ejemplo: `feat(frontend): añade pantalla de login`.
5. Si el cambio lo necesita, añade un cuerpo breve que explique el porqué.
6. Ejecuta `git commit`. Nunca uses `--amend`, `--no-verify` ni `git push`.
