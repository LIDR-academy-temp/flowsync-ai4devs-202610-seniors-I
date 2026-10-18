---
name: commit
description: Crea un commit convencional (`tipo(scope): descripción`) a partir de los cambios ya preparados en el staging area. Úsala cuando el usuario escriba /commit, pida commitear lo preparado, o cuando las reglas de proceso de CLAUDE.md indiquen cerrar un trabajo con /commit.
allowed-tools: Bash(git status:*), Bash(git diff:*), Bash(git log:*), Bash(git commit:*), Bash(git branch:*), Bash(git rev-parse:*)
---

# /commit

Hace **un** commit con lo que ya está en el staging area. Nada más.

## 1. Mirar qué hay preparado

```bash
git branch --show-current
git status --short
git diff --cached --stat
git diff --cached
```

- Si `git diff --cached` está vacío, di que no hay cambios preparados y **termina**. No ejecutes `git add` por tu cuenta: qué entra en el commit lo decide quien preparó los cambios.
- Los cambios sin preparar se quedan fuera del commit. Si los hay, menciónalos en una línea al final, sin tocarlos.
- Si la rama actual es `main`, avisa y termina sin commitear.
- Si entre lo preparado hay algo que parece un secreto (`.env`, claves, tokens `oat_...`), para y avísalo antes de commitear.

## 2. Elegir tipo y scope

**Tipo**, según lo que hace el cambio, no según los archivos que toca:

| Tipo | Cuándo |
|---|---|
| `feat` | Funcionalidad nueva visible para el usuario o la API |
| `fix` | Corrige un comportamiento incorrecto |
| `refactor` | Cambia el código sin cambiar el comportamiento |
| `style` | Solo formato, sin cambio de lógica |
| `test` | Añade o corrige tests |
| `docs` | Solo documentación |
| `build` | Dependencias, `package.json`, configuración de Vite, TypeScript o lint |
| `ci` | Pipelines de integración continua |
| `perf` | Mejora de rendimiento |
| `chore` | Mantenimiento que no encaja en lo anterior, incluido el harness en `.claude/` |
| `revert` | Revierte un commit anterior |

Si lo preparado mezcla varios tipos, usa el del cambio principal y menciona el resto en el cuerpo. Si son cambios independientes que deberían ir en commits separados, dilo y propón cómo dividirlos, pero no reorganices el staging.

**Scope**, según dónde está el cambio:

- `frontend` si todo está en `frontend/`.
- `backend` si todo está en `backend/`.
- `harness` si todo está en `.claude/`, `CLAUDE.md` o `AGENTS.md`.
- Un scope más fino si todo cae en una sola pieza clara, por ejemplo `auth` o `ui`.
- Sin scope si el cambio cruza varias zonas sin una dominante: `tipo: descripción`.

Si la rama sigue el patrón `feat/flow-<n>-...`, añade `Refs: FLOW-<n>` como pie del mensaje.

## 3. Redactar el mensaje

Estilo de este repo:

- Descripción **en español**, en minúscula, en presente o imperativo, **sin punto final**.
- Línea de asunto de 72 caracteres como máximo, contando tipo y scope.
- Dice qué cambia y para qué, no lista archivos.
- Cuerpo opcional, separado por una línea en blanco, solo si el porqué no se deduce del asunto. Viñetas cortas.
- Cambio incompatible: `!` tras el scope (`feat(backend)!: ...`) y pie `BREAKING CHANGE: ...`.
- Al final, la línea `Co-Authored-By` de atribución que indique Claude Code en la sesión.

Ejemplos del historial del repo:

```
fix(backend): repo utilizable tras clone en limpio
docs(s1): enunciado del ejercicio y plantilla de prompts en la rama de partida
```

## 4. Commitear

Pasa el mensaje con un heredoc para conservar los saltos de línea:

```bash
git commit -F - <<'MSG'
feat(frontend): pantallas de login y registro con shadcn/ui

- guarda el token oat_ en localStorage y protege /profile
- traduce los errores 400 y 422 del backend a mensajes claros

Refs: FLOW-1

Co-Authored-By: ...
MSG
```

Reglas:

- Nunca `--no-verify`, `--amend` ni `--no-gpg-sign`.
- Si un hook falla, muestra el error, corrige la causa si está dentro de lo preparado, vuelve a preparar solo esos archivos y crea el commit de nuevo. No lo saltes.
- No hagas `git push`.

## 5. Informar

Muestra el hash corto y el asunto con `git log -1 --format='%h %s'`. Si quedaron cambios sin preparar, menciónalos en una línea.
