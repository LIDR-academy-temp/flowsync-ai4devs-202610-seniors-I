# Trazabilidad: Lo que cada tarea muestra de su responsable

**Scenarios del requisito:** 3
**Cubiertos:** 2 (eran 0 antes de escribir los tests de A.2; el de la segunda fila tiene test, pero está en rojo)

| Scenario | Prueba que lo cubre | Estado | Si "No lo sé", qué faltó |
|---|---|---|---|
|Al obtener una tarea cuyo responsable se llama "Ada Lovelace", su `assignee` trae ese nombre y sus iniciales.| `el responsable se identifica por su nombre y sus iniciales` | Cubierto |  |
|Al obtener cualquier tarea, suelta o en la lista, su `assignee` no incluye el email ni ningún otro dato de acceso.| `la tarea no filtra el email ni los datos de acceso de su responsable` (en rojo: `GET /api/v1/tasks` devuelve el email) | No cubierto |  |
|Si el responsable se registró sin nombre, su nombre llega nulo y sus iniciales siguen llegando.| `un responsable sin nombre llega con el nombre nulo y sus iniciales` | Cubierto |  |

## Las tres líneas

1. Creía 3 cubiertos; lo estaban 0.
2. Hueco de test o de spec: «Responsable sin nombre»; creía que las iniciales se sacaban del nombre y que sin él estarían vacías, y el scenario dice que siguen llegando, pero no de dónde salen.
3. Qué cuenta como dato de acceso: el scenario no lo define, y en el test quedó como `email`, la dirección de correo, `password` y `token`; `id`, `createdAt` y `updatedAt` quedaron sin comprobar. Lo decidió el agente al escribir el test y lo acepté.
