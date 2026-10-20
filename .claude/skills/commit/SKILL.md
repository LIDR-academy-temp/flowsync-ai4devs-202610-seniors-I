---
name: commit
description: Crea un commit convencional (tipo(scope): descripción) a partir de los cambios preparados (staged) del proyecto. Usar cuando el usuario escriba /commit.
allowed-tools: Bash(git status:*), Bash(git diff:*), Bash(git log:*), Bash(git commit:*)
---

# /commit

Crea un commit siguiendo [Conventional Commits](https://www.conventionalcommits.org/) **solo con los cambios staged**.

## Reglas

- Usa únicamente lo que ya está en el área de preparación. **No ejecutes `git add`**, `git reset`, `git stash` ni modifiques archivos.
- No hagas `git push`, no uses `--amend` y no uses `--no-verify`.
- Si no hay cambios staged, informa al usuario y termina sin hacer commit.

## Pasos

1. Revisa el estado y los cambios preparados:
   ```bash
   git status --short
   git diff --cached --stat
   git diff --cached
   ```
2. Consulta el estilo reciente del repo con `git log --oneline -10` para mantener idioma y forma de los mensajes (este repo usa descripciones en español, p. ej. `docs(s1): ...`).
3. Elige el **tipo** según la naturaleza del cambio:
   - `feat`: nueva funcionalidad
   - `fix`: corrección de bug
   - `docs`: solo documentación
   - `style`: formato, sin cambio de lógica
   - `refactor`: reestructuración sin cambiar comportamiento
   - `perf`: mejora de rendimiento
   - `test`: tests
   - `build`: dependencias o sistema de build
   - `ci`: integración continua
   - `chore`: mantenimiento, configuración
4. Elige el **scope** según el área afectada (p. ej. `frontend`, `auth`, `ui`, `api`, `skills`, `s1`). Si los cambios abarcan áreas sin relación, omite el scope o sugiere al usuario dividir el commit.
5. Redacta el mensaje:
   - Primera línea: `tipo(scope): descripción`, en imperativo/presente, minúscula inicial, sin punto final, ≤ 72 caracteres.
   - Cuerpo opcional (separado por una línea en blanco) explicando el *porqué* cuando el cambio no sea obvio.
   - Si hay un cambio incompatible, añade `!` tras el scope (`feat(api)!: ...`) y un pie `BREAKING CHANGE: ...`.
   - Si la rama o los cambios hacen referencia a un ticket de Jira (p. ej. `FS-12`), añádelo como pie: `Refs: FS-12`.
   - Termina el mensaje con la línea de atribución:
     ```
     Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
     ```
6. Crea el commit con un heredoc para preservar el formato:
   ```bash
   git commit -m "$(cat <<'EOF'
   tipo(scope): descripción

   Cuerpo opcional.

   Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
   EOF
   )"
   ```
7. Muestra el resultado con `git log -1 --stat`. Si un hook de pre-commit falla, informa del error y no reintentes saltándolo; corrige solo si el usuario lo pide.
