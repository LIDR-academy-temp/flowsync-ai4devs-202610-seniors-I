---
name: commit
description: Crea un commit de git con el formato "FLOW-XXXX :: Descripción breve", detectando el ticket de la rama actual y generando la descripción a partir del diff. Úsala cuando el usuario escriba /commit o pida "haz un commit", "commitea esto".
---

# commit

Crea un commit siguiendo la convención de este proyecto:

```
FLOW-XXXX :: Descripción breve del cambio
```

- `FLOW-XXXX` es la clave del ticket de Jira al que pertenece el cambio.
- La descripción va en una sola línea, breve, en modo imperativo, y describe el "qué" del
  cambio (no el "por qué" ni detalles de implementación).

## Argumento

El usuario puede invocar `/commit` (sin argumento) o `/commit FLOW-123` indicando explícitamente
el ticket a usar.

## Flujo

### 1. Determinar el ticket

1. Si se pasó un ticket como argumento (ej. `/commit FLOW-123`), úsalo directamente — valida que
   el formato sea `FLOW-\d+`.
2. Si no hay argumento, obtén la rama actual (`git branch --show-current`) y busca un patrón
   `FLOW-\d+` en el nombre (ej. `feature/FLOW-2-login-frontend` → `FLOW-2`).
3. Si no se encuentra ningún ticket ni por argumento ni por rama, pregunta al usuario con
   `AskUserQuestion` qué ticket usar. Si tienes acceso al conector `Atlassian MCP` (ver
   configuración de Jira usada por la skill `priority-ticket`), puedes ofrecer como sugerencias
   los tickets en estado "En progreso" asignados al usuario actual (`atlassianUserInfo` +
   `searchJiraIssuesUsingJql` con `assignee = currentUser() AND status = "En progreso"`), con una
   opción adicional para escribir otro manualmente. No inventes un ticket si no hay forma de
   confirmarlo.

### 2. Revisar el estado de git

1. Ejecuta en paralelo: `git status`, `git diff` (unstaged) y `git diff --staged` (staged).
2. Si ya hay cambios **staged**, respeta exactamente ese conjunto de archivos — no añadas ni
   quites nada del staging.
3. Si **no hay nada staged**, muestra al usuario el `git status` con los archivos modificados /
   nuevos, propone qué archivos añadir (excluyendo por defecto cosas como `.env`, credenciales,
   archivos de build o binarios grandes que no deberían versionarse) y pide confirmación explícita
   antes de hacer `git add` de esos archivos concretos. Nunca uses `git add -A` ni `git add .`.
4. Si tras esto no queda nada staged, informa al usuario y detente sin commitear.

### 3. Redactar la descripción

1. Analiza el diff staged final para entender la naturaleza del cambio (nueva funcionalidad,
   fix, refactor, docs, test, etc.).
2. Redacta una descripción breve (una línea, idealmente bajo ~60-70 caracteres) que resuma el
   "qué" del cambio. Sigue el estilo de los commits recientes del repo (`git log --oneline -10`)
   para mantener coherencia de tono.
3. Compón el mensaje final: `FLOW-XXXX :: Descripción breve del cambio`.

### 4. Confirmar y commitear

1. Muestra al usuario el mensaje de commit propuesto y los archivos que se van a incluir.
2. Crea el commit con ese mensaje exacto, usando un HEREDOC para evitar problemas de escapado,
   y firmando igual que el resto de commits de esta sesión:
   ```bash
   git commit -m "$(cat <<'EOF'
   FLOW-XXXX :: Descripción breve del cambio

   Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
   EOF
   )"
   ```
3. Ejecuta `git status` tras el commit para confirmar que se ha creado correctamente.
4. Si el commit falla por un hook de pre-commit, arregla el problema señalado, vuelve a hacer
   `git add` de los archivos corregidos y crea un **nuevo** commit (nunca `--amend` del intento
   fallido, que no llegó a existir).

### 5. Preguntar por el push

1. Tras un commit exitoso, pregunta explícitamente al usuario (con `AskUserQuestion`) si quiere
   hacer `git push` de la rama actual ahora mismo.
2. Si confirma, hazlo. Si la rama no tiene upstream configurado, usa `git push -u origin
   <rama-actual>`. Si no confirma, no hagas push — el commit se queda solo en local.
3. Nunca fuerces el push (`--force`) salvo petición explícita del usuario en ese momento concreto.

## Reglas que esta skill respeta siempre

- Nunca usa `git add -A` / `git add .`.
- Nunca usa `--no-verify`, `--no-gpg-sign` ni salta hooks.
- Nunca hace `--amend` de un commit ya existente salvo petición explícita.
- Nunca hace push sin confirmación explícita del usuario en esa misma ejecución.
- Solo crea un commit nuevo tras confirmación del mensaje y de los archivos a incluir.
