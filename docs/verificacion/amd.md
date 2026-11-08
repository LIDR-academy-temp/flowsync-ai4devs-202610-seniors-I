# Verificación · «Lo que cada tarea muestra de su responsable»

Scenarios en el requisito: 3 · Cubiertos: 0

| Scenario | Test que lo cubre | Estado | Qué faltó |
|---|---|---|---|
| Al obtener una tarea de "Ada Lovelace", su `assignee` trae nombre e iniciales | — | No cubierto | — |
| Al obtener cualquier tarea, suelta o en la lista, su `assignee` no trae email ni datos de acceso | — | No cubierto | — |
| Si el responsable no tiene nombre, `assignee` trae nombre nulo e iniciales | — | No cubierto | — |

1. Antes de mirar creía que había 2 de 3 cubiertos; estaban 0 de 3.
2. Scenario 2: el requisito prohíbe «ningún otro dato de esa cuenta» y el `design.md` archivado decidió exponer el `id` del responsable; ningún scenario lo concreta, y no supe si es un test que falta o una spec que contradice su propio diseño.
3. Scenario 3: solo dice que las iniciales «siguen llegando»; primero lo comprobé como texto no vacío, la revisión adversarial mostró que eso pasaría aunque llegara el email entero, y acabé exigiendo dos mayúsculas sin `@`, una forma que fija la spec de auth y no este scenario.
