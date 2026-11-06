# Verificación: «Lo que cada tarea muestra de su responsable»

Requisito de `openspec/specs/tasks/spec.md`.

**Scenarios del requisito:** 3
**Cubiertos:** 0

## Matriz de trazabilidad

| Scenario                                                                                                                            | Prueba que lo cubre | Estado      | Si «No lo sé», qué faltó |
| ----------------------------------------------------------------------------------------------------------------------------------- | ------------------- | ----------- | ------------------------ |
| Responsable identificable: una tarea cuyo responsable es "Ada Lovelace" trae en `assignee` ese nombre y sus iniciales.              | —                   | No cubierto | —                        |
| La tarea no filtra datos de cuenta: el `assignee` de cualquier tarea, suelta o en la lista, no incluye el email ni datos de acceso. | —                   | No cubierto | —                        |
| Responsable sin nombre: si el responsable se registró sin nombre, su nombre llega nulo y sus iniciales siguen llegando.             | —                   | No cubierto | —                        |

Antes de escribir tests no había ninguno en `backend/tests/functional/tasks/` ni en ningún otro sitio de la suite que tocara `assignee`. El que más se parece, `Auth | iniciales › sin nombre, las iniciales salen del email` (`backend/tests/functional/auth/initials.spec.ts`), comprueba las iniciales en la respuesta del login, no en el responsable de una tarea, así que no cubre el tercer scenario.

Tests escritos para las tres filas, en `backend/tests/functional/tasks/assignee.spec.ts`, grupo `Tasks | responsable` (sin ejecutar todavía):

- `el responsable llega con su nombre y sus iniciales`
- `el responsable de una tarea no expone su email ni datos de acceso`
- `un responsable sin nombre llega con el nombre nulo y con iniciales`

## Las tres líneas

1. Scenarios del requisito: 3, Cubiertos: 0
2. El scenario "el responsable de una tarea no expone su email ni datos de acceso" no anticipó que las respuestas de escritura, PATCH y POST, también devuelven la tarea y la información del responsable, exponiendo el email entre otras cosas. El problema es que faltan scenarios en el requisito para cubrir estas operaciones y mantener cierta la cláusula «NO SHALL exponer junto a la tarea ningún otro dato». El test de verificación confirma que el scenario no se cumple, la prueba adversarial encuentra más áreas descubiertas por ausencia de scenarios en el requisito.
3. En el análisis del scenario "La tarea no filtra datos de cuenta" se observa un caso pecular: el requisito dice «NO SHALL exponer junto a la tarea ningún otro dato de esa cuenta», pero el scenario ajusta con "su `assignee` no incluye el email de esa cuenta ni ningún otro dato de acceso". El texto del requisito prohíbe la fuga de información de fechas de creación y actualización aunque el scenario lo acote a sólo datos de acceso. Dejar el test acotado sólo a "datos de acceso" permitiría que el scenario salga en verde, mientras estamos incumpliendo el texto del requisito. El inconveniente es que el scenario es insuficiente, habría que ampliarlo o añadir otro para cubrir al 100% el texto del requisito. Luego, crear los tests necesarios para verificarlos.
