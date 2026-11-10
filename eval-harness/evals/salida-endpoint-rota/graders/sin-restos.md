---
type: regex
target: { source: file, path: backend/app/controllers/tasks_controller.ts }
pattern: "console\\.log|TODO|as any"
match: not_contains
arm: both
---
