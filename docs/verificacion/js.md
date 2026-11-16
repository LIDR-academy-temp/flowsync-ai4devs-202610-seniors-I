# Matriz de trazabilidad — Requisito «Lo que cada tarea muestra de su responsable»

Fuente: `openspec/specs/tasks/spec.md` · Suite: `backend/tests/functional/`

**Scenarios del requisito: 3 · Cubiertos: 0**

| # | Scenario, en una línea | Prueba que lo cubre (nombre en la suite) | Estado | Si «no lo sé», qué faltó |
|---|---|---|---|---|
| 1 | Una tarea cuyo responsable se llama "Ada Lovelace" trae en su `assignee` el nombre y las iniciales, suficientes para saber quién la lleva | — Ninguna. La más parecida es `un nombre de dos palabras da la inicial de cada una` (`tests/functional/auth/initials.spec.ts`), pero afirman las iniciales en la **respuesta del login**, no en el `assignee` de una tarea | **No cubierto** | — |
| 2 | El `assignee` de cualquier tarea —suelta o en la lista— no incluye el email de la cuenta ni ningún otro dato de acceso | — Ninguna. Se parece `la contraseña nunca sale en la respuesta` (`tests/functional/auth/signup.spec.ts`), pero afirma sobre la respuesta del **registro**, no sobre tareas | **No cubierto** | — |
| 3 | Si la cuenta responsable se registró sin nombre, en la tarea el nombre llega nulo y las iniciales siguen llegando, sin recurrir al email | — Ninguna. Dos se le parecen: `sin nombre, las iniciales salen del email` (`initials.spec.ts`, respuesta del **login**) y `una cuenta puede quedarse sin nombre` (`signup.spec.ts`, respuesta del **registro**); ninguna mira el `assignee` de una tarea | **No cubierto** | — |

> La suite entera son 4 ficheros, todos en `tests/functional/auth/`; ningún test
> menciona tareas, `assignee` ni las rutas `/api/v1/tasks`. Por eso las tres filas
> quedaron en «No cubierto» sin necesidad de recurrir a «No lo sé»: se abrieron
> los cuatro ficheros y se leyó lo que afirman.
>
> El recuento refleja la suite tal como estaba antes de escribir los tests que
> faltaban (A.2, `backend/tests/functional/tasks/assignee.spec.ts`): quedaron dos
> en verde y uno en rojo — el del email, que cazó una fuga real: la lista
> serializa el `assignee` con `UserTransformer` (email y fechas de la cuenta
> incluidos) en vez del transformer recortado que sí usa la tarea suelta. Se
> entrega en rojo a propósito: quien verifica no arregla.

---

## Parte B · Las tres líneas

1. Creía cubiertos **2** de 3 antes de mirar; resultaron cubiertos **0**.
2. El scenario del que no supe si era hueco de test o de spec fue el del email en
   el `assignee` (nº 2). Era hueco de **test**, y lo que me confundió fue un
   comentario del código: `TaskAssigneeTransformer` dice que no se reutiliza
   `UserTransformer` porque «la lista no los usa» — pero la lista usa el otro
   transformer. Como la regla sí estaba escrita en la spec, lo que faltaba era la
   prueba, no la regla; sin ese comentario de por medio habría dudado menos.
3. Lo que el scenario no decidió por mí: **el valor de `today`**. Los scenarios
   no mencionan ningún día de referencia, pero la tarea suelta responde `422` sin
   él, así que elegí uno arbitrario (`'2026-11-16'`) para que el test midiera lo
   que quería medir y no la ausencia del parámetro. También decidí, sin que la
   spec lo dijera, qué significa «no incluye el email»: ausencia de la propiedad
   *y* ausencia del valor en el JSON serializado, y cubrir las dos vías (suelta y
   lista) en el mismo test.
