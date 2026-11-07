## Matriz de trazabilidad

Requisito: «Lo que cada tarea muestra de su responsable»
Scenarios del requisito: 3
Cubiertos por la suite que existía antes de mis tests: 0
Tras mis tests: 2 en verde, 1 en rojo (suite: 22 pasan, 1 falla)

| Scenario | Prueba que lo cubre | Estado | Qué me faltó (si "No lo sé") |
|---|---|---|---|
| 1. Responsable identificable: la tarea trae "Ada Lovelace" e iniciales | `Tasks | responsable / una tarea trae el nombre y las iniciales de su responsable` | Cubierto (leído: afirma nombre e iniciales "AL", solo en el detalle de la tarea) | |
| 2. La tarea no filtra datos de cuenta, suelta o en lista | `Tasks | responsable / ni la lista ni la tarea suelta exponen el email ni otros datos de la cuenta` | No cubierto: el test sale en rojo en la lista (curl: trae email, createdAt, updatedAt); el detalle cumple (curl); la creación incumple y no tiene test | |
| 3. Responsable sin nombre: nombre nulo e iniciales, sin email | `Tasks | responsable / un responsable sin nombre llega con nombre nulo y con iniciales, sin email` | Cubierto, con salvedad: afirma iniciales "SE", valor que no pude confirmar de dónde sale | |

## Parte B

1. Creía cubiertos: 10. Estaban cubiertos: 0 (de 3 scenarios).
2. Hueco de test: el scenario dice "cualquier tarea, suelta o dentro de la lista" y la regla está escrita, pero nadie la comprobaba. Con curl vi que la lista y la creación de tarea exponen el email del responsable y el detalle no. Dudo en el scenario 3: la spec no dice de dónde salen las iniciales sin nombre, y mi test fija "SE"; no sé si es contrato o casualidad del código.
3. El scenario no decidía qué claves puede traer el assignee. Mi test rechaza cualquier clave fuera de id, fullName e initials y permite id, aunque la spec solo prohíbe el email y los datos de acceso. Un cambio legítimo del assignee rompería el test.