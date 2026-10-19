---
name: commit
description: Crea un commit convencional (tipo(scope): descripción) a partir de los cambios ya preparados (staged). Úsala cuando el usuario escriba /commit.
disable-model-invocation: true
allowed-tools: Bash(git status:*), Bash(git diff:*), Bash(git log:*), Bash(git commit:*)
---

# commit

Crea **un** commit a partir de lo que ya está en el área de preparación (staged). Invocar esta skill es la petición explícita de commitear; no hagas push ni nada más.

## Contexto

- Estado: !`git status --short`
- Cambios preparados: !`git diff --staged`
- Estilo reciente: !`git log --oneline -8`

## Pasos

1. Si no hay nada preparado, dilo y para. **No ejecutes `git add`** por tu cuenta ni commitees cambios sin preparar; si hay cambios sin preparar, menciónalo en una línea y deja que el usuario decida.
2. Lee el diff preparado y decide el mensaje:
   - Formato: `tipo(scope): descripción`.
   - `tipo`: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci` o `chore`.
   - `scope`: el área tocada, en minúscula y corto (`frontend`, `backend`, `auth`, `harness`...). Omite el paréntesis si los cambios cruzan áreas sin una dominante.
   - `descripción`: imperativo o infinitivo, minúscula inicial, sin punto final, idealmente ≤ 72 caracteres en la primera línea, en el idioma de los commits recientes del repo.
   - Añade cuerpo (línea en blanco y 1–3 líneas) solo si el *porqué* no es evidente por el diff.
   - Cambio incompatible: `!` tras el scope y un pie `BREAKING CHANGE: ...`.
3. Si el diff mezcla cambios que no forman una sola unidad lógica, avisa de que convendría separarlos, pero commitea lo preparado tal cual.
4. Commitea con `git commit -m` (varios `-m` para cuerpo y pie), terminando con este pie:

   ```
   Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>
   ```

5. Si un hook de pre-commit falla, arregla la causa y crea un commit **nuevo**; nunca uses `--no-verify` ni `--amend`.
6. Responde con el hash corto y el mensaje de la primera línea. Nada más.
