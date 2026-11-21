# Arquitectura de FlowSync

Diagrama de contenedores (nivel 2 de C4) de FlowSync tal como está hoy en el código. Una persona usa una SPA de React que corre en su navegador. La SPA guarda el token de sesión en `localStorage` y habla con una única API REST de AdonisJS bajo `/api/v1`. La API valida la entrada con VineJS, aplica la autenticación por access token y responde con transformers envueltos en `{ data }`. Persiste en un fichero SQLite a través de Lucid. Solo aparece lo que se ha podido comprobar leyendo `backend/start/routes.ts`, `backend/app/`, `backend/config/`, `backend/database/migrations/` y `frontend/src/`. No hay más contenedores: ni colas, ni caché, ni servicios externos, ni despliegue definido.

```mermaid
C4Container
  title FlowSync: diagrama de contenedores

  Person(user, "Miembro del equipo", "Se registra, inicia sesión y gestiona la lista de tareas compartida")

  System_Boundary(flowsync, "FlowSync") {
    Container(spa, "Frontend SPA", "React 19, Vite 8, react-router, Tailwind v4", "Pantallas /login, /register, /tasks, /tasks/:id y /profile. Todas las llamadas a la API pasan por src/lib/api.ts. Guarda el token en localStorage bajo flowsync.token")
    Container(api, "API REST", "AdonisJS 7, Node.js, VineJS 4, Auth 10", "Rutas /api/v1 hacia controladores: NewAccount, AccessTokens, Profile, Tasks, TaskStatuses y TaskDueDates. Valida con app/validators y responde con app/transformers envueltos en { data }. Puerto 3333 según .env.example")
    ContainerDb(db, "Base de datos", "SQLite (better-sqlite3), fichero tmp/db.sqlite3", "Tablas users, auth_access_tokens y tasks. Esquema creado por migraciones, con database/schema.ts generado a partir de ellas")
  }

  Rel(user, spa, "Usa", "Navegador")
  Rel(spa, api, "auth/signup, auth/login, account/profile, account/logout, tasks (listar, crear, ver, cambiar estado y fecha)", "JSON/HTTP, Authorization: Bearer")
  Rel(api, db, "Lee y escribe usuarios, tokens y tareas", "Lucid ORM 22")

  UpdateLayoutConfig($c4ShapeInRow="3", $c4BoundaryInRow="1")
```
