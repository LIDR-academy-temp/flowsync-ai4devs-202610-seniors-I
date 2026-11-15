# Auditoría

## La auditoría

### Mi apuesta

| Regla de proceso | ¿Se cumple? (`Si` / `No` / `Ni idea`) |
|------------------|-------------|
| La rama es por unidad de trabajo, no por petición. Antes de tocar código, mira en qué rama estás: si ya es una rama de trabajo —cualquiera que no sea `main` ni una `sN/*`—, sigue en ella en vez de crear otra. Solo desde `main` o desde una `sN/*` se crea una nueva (`git checkout -b feat/<slug>`). Nunca commitear directo en `main` ni en una `sN/*`. | No |
| El commit sí es por petición: al cerrar cada una, usar la skill `/commit`. | Si |
| Un cambio que toque rutas, controladores, validadores o transformers de una capability se cierra en el mismo commit con el documento OpenAPI y el README de esa capability al día. El documento se construye en cada petición y no hay fichero que generar, así que lo que se commitea es el diff regenerado de `.adonisjs/`; el README es `docs/capabilities/<nombre>/README.md`. | Ni idea |
| `gh pr create` (con una descripción completa de los cambios en el cuerpo del PR) y el pase del subagente `adversarial-reviewer` sobre ese PR van **una sola vez, al terminar la unidad de trabajo**, no al cerrar cada petición. El review adversarial es lo último, antes de dar la unidad por terminada. | Si |
| Cuando abras el PR, no repitas ese resumen en el chat: la sesión se va a perder, el PR no. Responde solo con la URL del PR. | Ni idea |

### La tabla

Muestra: `git log -15` (`b955a72`…`aee9a24`); cada regla se mide desde el commit en que entró.

| Qué pide la regla | Qué miré para comprobarlo | Veredicto | Evidencia | Qué haría con ella |
|---|---|---|---|---|
| Nunca commitear directo en `main` ni en `sN/*` | `git branch -a --contains <sha>` para cada commit | No se cumple | `4e03d1f`, `ea5db1f`, `cbe9617` solo están en `s4/end` y `s5/start` | Bajarla a algo que se ejecute solo |
| Cada petición a un agente usa la skill `/commit` | `git log -15 --format='%h %s'` | No se cumple | `aee9a24` no lleva scope, y `/commit` lo exige | Bajarla a algo que se ejecute solo |
| El documento OpenAPI y el README con la capability van en el mismo commit | `git show --stat <sha>` de los 15 | Se cumple | `cbe9617` toca controladores de `tasks` y actualiza el OpenAPI y el README | Bajarla a algo que se ejecute solo |
| Al terminar la unidad de trabajo, se crea una PR y se lanza el revisor adversarial | `gh api …/commits/<sha>/pulls` | No se cumple | Ningún commit de `4427afc`…`cbe9617` tiene un PR | Bajarla a algo que se ejecute solo |
| No resumir la PR en el chat | No queda rastro en git ni en GitHub | No se puede comprobar con lo que hay | Faltan los transcripts de las sesiones | Borrarla |

**Comprobación manual para saber que he hecho bien el ejercicio**

He comprobado manualmente que el commit `aee9a24` no lleva el scope, con lo que efectivamente no salió de la skill `/commit`, que especifica que se tiene que redactar un mensaje `tipo (scope): descripción`, con lo que efectivamente falta el scope y, por lo tanto podemos determinar que la skill no se ha ejecutado para ese commit.

El comando para comprobarlo: `git log -1 --format=%s aee9a24`

## Las tres líneas

### La regla en la que (más) me equivoqué

Regla: `gh pr create` (con una descripción completa de los cambios en el cuerpo del PR) y el pase del subagente `adversarial-reviewer` sobre ese PR van **una sola vez, al terminar la unidad de trabajo**, no al cerrar cada petición. El review adversarial es lo último, antes de dar la unidad por terminada.

Me equivoqué pensando que todos los cambios tendrían una pull request asociada, y revisando las Pull Request no veo ninguna asociada a los últimos 15 commits. La otra regla en la que me he equivocado es en la regla 2, pero en ese caso la gran mayoría de commits tienen el mensaje correctamente formateado, con lo que me he equivocado mucho más en la regla 4.

### La regla que no se puede comprobar con lo que hay

Claramente la de no repetir el resumen de la Pull Request en el chat. Al no tener la transcripción de la sesión con el agente de IA es imposible determinar si se hace el resumen o no. Además, esta regla la había acertado en mi veredicto inicial (indicando "Ni idea", pero sabiendo ya que no se podía comprobar al no haber registro de las sesiones).

### La regla que borrarías y por qué

Borraría la regla número 5, ya que no se puede comprobar, no deja rastro y no tiene ninguna consecuencia sobre el producto final, y lo que protege ya lo cubre la regla 4.