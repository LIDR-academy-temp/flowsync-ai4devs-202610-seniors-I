---
name: commit
description: Crea un commit convencional (tipo(scope): descripción) a partir de los cambios preparados (staged)
disable-model-invocation: true
allowed-tools: Bash(git status:*), Bash(git diff:*), Bash(git log:*), Bash(git commit:*)
---

Crea un commit con los cambios que ya están preparados en el índice. Sigue estos pasos en orden.

1. Revisa el estado con `git status --short` y `git diff --staged`.
   - Si no hay nada preparado, para y avisa al usuario. **No** hagas `git add` por tu cuenta: qué entra en el commit lo decide el usuario.
   - Si hay cambios sin preparar, menciónalos pero no los incluyas.

2. Mira el estilo del historial con `git log --format=%s -10` y úsalo como referencia.

3. Redacta el mensaje con el formato `tipo(scope): descripción`:
   - `tipo`: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, `style`, `perf`, `build`, `ci` o `harness`.
   - `scope`: el área que tocan los cambios (p. ej. `frontend`, `backend`, `auth`). Omítelo si los cambios abarcan varias áreas sin un hilo común.
   - `descripción`: en español, en imperativo o minúscula, sin punto final, de 72 caracteres como máximo.
   - Cuerpo opcional, separado por una línea en blanco, solo si el porqué no se deduce del diff.

4. Crea el commit solo con lo preparado. Si hay cuerpo, usa un HEREDOC para pasar el mensaje.
   - No uses `--no-verify`, `--amend` ni hagas push.

5. Al terminar, muestra el hash y el asunto del commit creado.

Termina el mensaje del commit con esta línea de atribución:

```
Co-Authored-By: Claude Haiku 5.5 <noreply@anthropic.com>
```
