# Arquitectura de FlowSync

Diagrama de contenedores C4 del monorepo tal como está en el código: el navegador del usuario, la SPA React (`frontend/`), la API AdonisJS (`backend/`) y el fichero SQLite al que Lucid apunta. Las etiquetas citan solo piezas leídas en rutas, controladores, modelos, transformers, `lib/api.ts` y la config de base de datos.

Para verlo en local: extensión **Mermaid Chart** (`mermaidchart.vscode-mermaid-chart`). Con el fichero abierto, paleta de comandos → `Mermaid Chart: Preview` (o clic derecho → preview). El preview Markdown integrado de Cursor no siempre renderiza el dialecto `C4Container`.

```mermaid
C4Container
title Contenedores FlowSync

Person(user, "Miembro del equipo", "Usa la app desde el navegador")

System_Boundary(flowsync, "FlowSync") {
  Container(spa, "SPA React", "React 19, Vite 8, react-router", "Paginas login/register/tasks/task/profile; AuthProvider con token en localStorage; unico cliente HTTP en lib/api.ts")
  Container(api, "API AdonisJS", "AdonisJS 7, Lucid 22", "Rutas /api/v1 de auth, account y tasks; controladores, modelos User y Task, transformers y serialize con envoltorio data")
  ContainerDb(db, "SQLite", "better-sqlite3", "Fichero tmp/db.sqlite3 con tablas users, tasks y auth_access_tokens")
}

Rel(user, spa, "Usa")
Rel(spa, api, "JSON con Bearer", "HTTP fetch via VITE_API_URL")
Rel(api, db, "Lee y escribe", "Lucid ORM")
```
