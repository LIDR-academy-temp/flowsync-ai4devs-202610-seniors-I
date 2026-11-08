# Parte A

### Matriz de trazabilidad

**Requisito:** Lo que cada tarea muestra de su responsable

**Escenarios del requisito:** 3  
**Escenarios cubiertos:** 2

| Nº | Criterio (scenario) | Prueba que lo cubre | Estado |
| --- | --- | --- | --- |
| 1 | Responsable identificable: al obtener una tarea asignada a Ada Lovelace, `assignee` incluye su nombre e iniciales. | `Tasks \| responsable / una tarea muestra el nombre y las iniciales de su responsable` | cubierto |
| 2 | La tarea no filtra datos de cuenta: el `assignee` de una tarea individual o de una lista no expone email ni datos de acceso. | `Tasks \| responsable / el responsable no filtra datos de cuenta ni en una tarea ni en la lista` | NO cubierto: la respuesta de lista expone datos no permitidos. |
| 3 | Responsable sin nombre: cuando la cuenta responsable no tiene nombre, `assignee.name` llega nulo y las iniciales siguen presentes. | `Tasks \| responsable / un responsable sin nombre conserva sus iniciales` | cubierto |

# Parte B

Tests  22 passed, 1 failed (23)

**Cuántos scenarios creías cubiertos antes de mirar, y cuántos lo estaban?**
A// Ninguno estaba cubierto 

**El scenario en el que no supiste si faltaba un test o faltaba la regla en la spec.**
A// Hay 2 reglas que al realizarle los test fallan con la implementacion actual. 

**Algo que el scenario no determinaba y tuviste que decidir al escribir el test.**
