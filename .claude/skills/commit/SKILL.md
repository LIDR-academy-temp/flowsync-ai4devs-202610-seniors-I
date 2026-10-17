---
name: commit
description: Revisa los cambios preparados (git diff --staged), propone un mensaje de commit convencional (tipo(scope): descripción) acorde al idioma de los commits previos, y crea el commit. Usar cuando el usuario invoque /commit o pida "haz el commit" / "commitea esto".
---

# commit

Crea un commit a partir de lo que ya está preparado (staged), con un mensaje convencional. No prepara nada por su cuenta y no hace push.

## Pasos

1. **Revisar lo preparado**: ejecuta `git diff --staged` (y `git status` para contexto).
   - Si no hay nada preparado (`git diff --staged` vacío), dilo explícitamente y detente ahí. No ejecutes `git add` de ningún archivo, ni preparado ni sin preparar: el usuario decide qué entra al commit, no esta skill.
2. **Detectar el idioma y el estilo**: ejecuta `git log --oneline -15` y mira los mensajes previos para decidir si el commit va en español o en inglés, siguiendo el idioma que predomine ahí, no una preferencia por defecto.
3. **Proponer el mensaje**: un commit convencional con el formato `tipo(scope): descripción`:
   - `tipo` describe la naturaleza del cambio (`feat`, `fix`, `docs`, `chore`, `refactor`, `test`, etc., según lo que de verdad reflejen los cambios preparados).
   - `scope` es opcional y nombra la parte del proyecto afectada (p. ej. `backend`, `frontend`) si el cambio no es transversal.
   - `descripción` es breve, en el idioma detectado en el paso 2, y describe el cambio preparado, no el historial de cómo se llegó a él.
   - Muestra el mensaje propuesto antes de usarlo.
4. **Crear el commit** con ese mensaje exacto, sobre lo que ya está preparado.

## Restricciones

- **No hacer `git push`.**
- **No preparar (`git add`) nada por cuenta propia**, ni siquiera si parece evidente que falta algo.
- **No hacer nada más que lo descrito**: no modificar archivos, no crear ramas, no hacer `--amend`, no reescribir commits anteriores.
