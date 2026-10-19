# AGENTS.md

## Reglas de proceso

- Antes de tocar código en una tarea, crea y cambia a una rama nueva que describa el trabajo. Conserva intactos los cambios preexistentes del usuario.
- Al cerrar una tarea, crea el commit convencional con `/commit` y abre un pull request con `gh pr create`, usando el resumen del cambio y sus verificaciones.
- Después de crear el pull request, delega una revisión adversarial al subagente `adversarial-reviewer` sobre ese pull request. El revisor solo inspecciona; no edita archivos.
- En el chat, responde únicamente con la URL del pull request.
