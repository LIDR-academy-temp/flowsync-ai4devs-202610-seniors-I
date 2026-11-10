# Arquitectura de FlowSync

Diagrama de contenedores C4 del monorepo tal como está en el código: el navegador del usuario, la SPA React (`frontend/`), la API AdonisJS (`backend/`) y el fichero SQLite al que Lucid apunta. Las etiquetas citan solo piezas leídas en rutas, controladores, modelos, transformers, `lib/api.ts` y la config de base de datos. Está en `flowchart` porque el preview de Mermaid de este entorno no renderiza el dialecto `C4Container`.

```mermaid
flowchart TB
  user["Miembro del equipo<br/>Persona — usa la app desde el navegador"]

  subgraph flowsync["FlowSync"]
    direction TB
    spa["SPA React<br/>React 19, Vite 8, react-router<br/>Páginas login/register/tasks/task/profile<br/>AuthProvider + localStorage<br/>Cliente HTTP en lib/api.ts"]
    api["API AdonisJS<br/>AdonisJS 7, Lucid 22<br/>Rutas /api/v1 auth, account, tasks<br/>Modelos User y Task<br/>Transformers + serialize data"]
    db[("SQLite<br/>better-sqlite3<br/>tmp/db.sqlite3<br/>users, tasks, auth_access_tokens")]
  end

  user -->|Usa| spa
  spa -->|"JSON + Bearer vía VITE_API_URL"| api
  api -->|"Lee y escribe con Lucid"| db
```
