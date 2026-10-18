---
name: commit
description: Crea un commit convencional a partir de los cambios staged, deduciendo tipo y scope.
---

Cuando el usuario invoque `/commit`, sigue estos pasos:

## 1. Comprobar que hay cambios staged

Ejecuta `git diff --staged`. Si no hay nada staged, responde "No hay cambios preparados (staged). Usa `git add` antes de /commit." y para.

## 2. Deducir tipo y scope

A partir del diff staged:

- **Tipo**: uno de `feat`, `fix`, `chore`, `docs`, `refactor`, `test`.
- **Scope**: `backend`, `frontend` o `harness` según los archivos tocados. Si hay archivos de más de un scope, usa el predominante o el más relevante.

## 3. Redactar el mensaje

Formato Conventional Commits:

```
tipo(scope): descripción en imperativo
```

- Todo en minúsculas.
- Sin punto final.
- Máximo 72 caracteres.

## 4. Confirmar antes de commitear

Muestra el mensaje propuesto y espera el ok explícito del usuario. No commitees sin aprobación.

## 5. Crear el commit

Ejecuta `git commit -m "mensaje"` con el mensaje aprobado.

**Nunca** hagas `git add`. **Nunca** hagas `git push`.
