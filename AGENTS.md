# AGENTS.md

Instrucciones para agentes de IA que trabajen en este repositorio.

## Estructura del proyecto

Este proyecto es un **monorepo** con dos aplicaciones independientes:

| Carpeta     | Stack                      | Rol                         |
| ----------- | -------------------------- | --------------------------- |
| `backend/`  | AdonisJS 7 (TypeScript)    | API REST                    |
| `frontend/` | React 19 + Vite (TypeScript) | Aplicación web (SPA)      |

- **Backend**: API construida con AdonisJS 7. No renderiza vistas; expone endpoints que consume el frontend.
- **Frontend**: SPA construida con React 19 y empaquetada con Vite.

## Gotchas

- **Autenticación por access tokens** (`@adonisjs/auth`): se usa el guard de access tokens (`DbAccessTokensProvider` en `backend/app/models/user.ts`), no sesiones ni cookies. El cliente envía `Authorization: Bearer <token>`.
- **El perfil se sirve mediante un transformer**: la respuesta del perfil pasa por `backend/app/transformers/user_transformer.ts`. No devuelvas el modelo `User` directamente desde el controlador; añade o modifica campos en el transformer.
- **No introduzcas dependencias nuevas sin justificarlas en el PR**: cualquier paquete nuevo (en `backend/` o en `frontend/`) debe ir acompañado en la descripción del PR de por qué es necesario y por qué no basta con lo que ya hay.

## Proceso de trabajo

Sigue estos pasos en orden en cualquier tarea que modifique código:

1. **Rama nueva antes de tocar código.** Crea una rama a partir de `main` actualizado (`git switch -c <tipo>/<descripcion-corta>`, p. ej. `feat/editar-perfil` o `feat/FLOW-12-editar-perfil` si hay ticket). No trabajes nunca directamente sobre `main`.
2. **Commit con `/commit`.** Al cerrar la tarea, prepara los cambios con `git add` e invoca la skill `/commit`. No escribas el commit a mano.
3. **PR con `gh pr create`.** Sube la rama (`git push -u origin <rama>`) y abre la PR contra `main` con `gh pr create`. En la descripción incluye el resumen de los cambios, cómo probarlos, el ticket de Jira si lo hay y la justificación de cualquier dependencia nueva.
4. **Revisión adversarial sobre la PR.** Lanza el subagente `adversarial-reviewer` pasándole el número de la PR recién creada. Publica su informe completo en la propia PR con `gh pr comment <número> --body-file <archivo>`. El subagente nunca aprueba ni edita; tú tampoco apruebes ni hagas merge.
5. **Respuesta en el chat: solo la URL de la PR.** Tu mensaje final al usuario debe contener únicamente la URL de la PR, sin resúmenes ni explicaciones (los detalles ya están en la descripción y en el comentario de la revisión).
