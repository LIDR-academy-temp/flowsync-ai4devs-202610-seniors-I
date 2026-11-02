---
name: commit
description: Crea un commit convencional (tipo(scope): descripción) a partir de los cambios preparados en el stage de git.
disable-model-invocation: true
allowed-tools: Bash(git status:*), Bash(git diff:*), Bash(git log:*), Bash(git commit:*)
---

# /commit

## Contexto

Estado:

!`git status --short`

Resumen de los cambios preparados:

!`git diff --cached --stat`

Cambios preparados:

!`git diff --cached`

Commits recientes:

!`git log --oneline -10`

## Reglas

1. Usa solo lo que ya está preparado. No ejecutes `git add` ni incluyas otros cambios. Si no hay nada preparado, dilo y para.
2. Escribe el mensaje con el formato `tipo(scope): descripción`:
   - **tipo**: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci` o `chore`.
   - **scope**: la zona afectada, en minúsculas, como `frontend`, `backend`, `auth` o `harness`. Omítelo, junto con los paréntesis, si el cambio no tiene una zona clara.
   - **descripción**: en español, en minúsculas, sin punto final y de 72 caracteres como máximo la primera línea entera. Explica qué cambia, a partir del diff real.
3. Añade un cuerpo solo si el porqué no se deduce de la primera línea.
4. Si los cambios preparados mezclan propósitos que no caben en un solo commit, dilo y para, para que el usuario decida cómo separarlos.
5. Crea el commit con `git commit`. No uses `--amend` ni `--no-verify`, y no hagas push.
6. Si un hook rechaza el commit, informa del error sin saltártelo.

Al terminar, muestra el hash y la primera línea del mensaje.
