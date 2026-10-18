---
name: commit
description: Crea un commit convencional (tipo(scope): descripción) a partir de los cambios preparados (staged). Úsala cuando el usuario pida commitear o al cerrar una tarea.
allowed-tools: Bash(git status:*), Bash(git diff:*), Bash(git log:*), Bash(git commit:*)
---

# /commit

1. Mira qué hay preparado: `git diff --cached --stat` y `git diff --cached`. **Solo se commitea lo preparado**: no hagas `git add` por tu cuenta. Si no hay nada preparado, dilo y para.
2. Revisa `git log --oneline -10` para seguir el estilo del repo.
3. Redacta el mensaje en formato Conventional Commits:
   ```
   tipo(scope): descripción
   ```
   - `tipo`: `feat`, `fix`, `refactor`, `test`, `docs`, `style`, `chore`, `build`, `ci` o `perf`.
   - `scope`: la parte del monorepo o módulo afectado (`frontend`, `backend`, `auth`, `harness`…). Si el cambio cruza varios, el más representativo, o se omite.
   - `descripción`: en español, imperativo o presente, minúscula inicial, sin punto final, máx. ~72 caracteres en total.
   - Cuerpo opcional (tras una línea en blanco) solo si el porqué no es evidente. Si hay un ticket de Jira asociado (`KAN-N`), añádelo en el pie: `Refs: KAN-N`.
4. Si lo preparado mezcla cambios sin relación, avisa y propón separarlos en vez de forzar un mensaje genérico.
5. Ejecuta `git commit` con el mensaje (vía heredoc para respetar los saltos de línea). No uses `--no-verify` ni `--amend`. Si un hook falla, informa del error y no lo esquives.
6. Muestra el hash y el mensaje resultante.
