---
name: commit
description: Crea un commit con formato Conventional Commits (tipo(scope): descripción) a partir de los cambios preparados (staged). Úsala cuando el usuario invoque /commit.
model: haiku
disable-model-invocation: true
allowed-tools: Bash(git status:*), Bash(git diff:*), Bash(git log:*), Bash(git commit:*)
---

# /commit

Crea un único commit convencional con **solo** los cambios que ya están en el stage.

## Pasos

### 1. Revisar lo preparado

```bash
git diff --cached --stat
git diff --cached
git log --oneline -10
```

- Si `git diff --cached` está vacío, di al usuario que no hay cambios preparados y que use
  `git add` primero. **Termina** sin hacer commit.
- **No** ejecutes `git add` ni incluyas cambios que no estén en el stage.
- Usa `git log` para copiar el estilo del repo (idioma, scopes habituales).

### 2. Redactar el mensaje

Formato:

```
tipo(scope): descripción

[cuerpo opcional]
```

**tipo** (uno solo, el que mejor describa el cambio principal):

| tipo       | cuándo                                              |
| ---------- | --------------------------------------------------- |
| `feat`     | funcionalidad nueva                                 |
| `fix`      | corrección de un bug                                |
| `docs`     | solo documentación                                  |
| `style`    | formato, sin cambio de lógica                       |
| `refactor` | reestructura sin cambiar comportamiento             |
| `perf`     | mejora de rendimiento                               |
| `test`     | añadir o corregir tests                             |
| `build`    | dependencias, empaquetado                           |
| `ci`       | pipelines de CI                                     |
| `chore`    | mantenimiento que no encaja en lo anterior          |

**scope**: la zona afectada, en minúsculas. En este monorepo normalmente `backend`, `frontend`,
o un módulo concreto (`auth`, `profile`, `skills`…). Si el cambio toca muchas zonas sin una
dominante, omite el scope: `tipo: descripción`.

**descripción**:
- En español, en presente/imperativo, minúscula inicial, sin punto final.
- Máximo ~72 caracteres en la primera línea.
- Explica el *qué* de forma concreta (no "cambios varios").

**cuerpo** (opcional): solo si el *porqué* no es evidente o hay varios cambios relevantes;
viñetas cortas, separado por una línea en blanco.

Si el cambio rompe compatibilidad, añade `!` tras el scope (`feat(api)!: ...`) y una línea
`BREAKING CHANGE: ...` en el cuerpo.

### 3. Crear el commit

Usa un heredoc para preservar el formato:

```bash
git commit -m "$(cat <<'EOF'
tipo(scope): descripción

cuerpo opcional
EOF
)"
```

- No uses `--no-verify` ni `--amend`.
- Si un hook falla, muestra el error al usuario y no reintentes saltándolo.

### 4. Confirmar

Muestra el hash corto y el mensaje (`git log -1 --oneline`). No hagas `push`.
