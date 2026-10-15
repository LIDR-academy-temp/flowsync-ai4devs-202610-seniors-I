---
name: commit
description: Redacta un mensaje en formato Conventional Commits a partir de los cambios en stage, lo muestra al usuario y hace el commit solo cuando el usuario lo confirma. No añade archivos al stage, no modifica archivos y no hace push.
---

# commit

## Reglas

- Trabaja solo con lo que ya está en stage. No ejecutes `git add`, `git rm`, `git stash`, `git restore` ni nada que cambie el stage o el árbol de trabajo.
- No modifiques ningún archivo.
- No hagas `git push`, `git commit --amend` ni uses `--no-verify`.

## 1. Revisar los cambios en stage

1. Ejecuta `git diff --staged --stat` y `git diff --staged`.
2. **Si no hay nada en stage**, dile al usuario que no hay cambios en stage para commitear y **detente**. No añadas archivos por tu cuenta, aunque `git status` muestre cambios sin stage.
3. Ignora los cambios que no están en stage: no forman parte del commit.

## 2. Redactar el mensaje

Formato: `tipo(scope): descripción`

- **tipo**: elige el que mejor describa el cambio:
  - `feat`: funcionalidad nueva.
  - `fix`: corrección de un error.
  - `refactor`: cambio de código que no añade funcionalidad ni corrige errores.
  - `docs`: solo documentación.
  - `test`: tests nuevos o modificados.
  - `chore`: mantenimiento, dependencias, configuración o tooling.
  - `style`: formato, espacios o punto y coma, sin cambio de lógica.
- **scope**: la parte del proyecto afectada, según las rutas del diff: `frontend` para `frontend/`, `backend` para `backend/`. Si el cambio está fuera de las dos apps (por ejemplo `docs/`, `.claude/` o archivos de la raíz), usa un scope que lo describa (`docs`, `claude`, `repo`…) u omítelo. Si el stage mezcla cambios de `frontend/` y `backend/` que no tienen relación entre sí, avisa al usuario y sugiérele separarlos en varios commits, pero no cambies el stage tú.
- **descripción**: en minúscula, en imperativo ("añade", "corrige", "elimina"), sin punto final y con menos de 72 caracteres en toda la primera línea. Escríbela en el mismo idioma que los commits recientes del repo (`git log --oneline -10`).

## 3. Cuerpo (opcional)

Añade un cuerpo solo si el cambio lo justifica: un cambio no trivial, una decisión que no se deduce del diff o un efecto secundario relevante. Déjalo separado del título por una línea en blanco, explica **por qué** se hace el cambio (no repitas qué cambió) y mantenlo breve, con líneas de 72 caracteres como máximo.

## 4. Confirmar y commitear

1. Muestra al usuario el mensaje propuesto completo, en un bloque de código, junto con la lista de archivos que entran en el commit.
2. Pregunta si lo confirma. Espera su respuesta y no hagas el commit antes.
   - Si pide cambios en el mensaje, ajústalo y vuelve a mostrarlo.
   - Si no lo confirma, detente sin commitear.
3. Cuando lo confirme, haz el commit pasando el mensaje por heredoc para conservar el formato exacto:

   ```bash
   git commit -F - <<'EOF'
   tipo(scope): descripción

   Cuerpo opcional.
   EOF
   ```

4. Muestra el resultado con `git log --oneline -1`. Si un hook de pre-commit falla, muestra el error al usuario y detente. No lo saltes ni intentes arreglarlo modificando archivos.
