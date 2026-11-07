### 🅰️ Parte A: la matriz y los tests que faltan, con reloj

**Matriz de trazabilidad**

Requisito: «Lo que cada tarea muestra de su responsable» (`openspec/specs/tasks/spec.md`, línea 97).

- Scenarios del requisito: **3**
- Cubiertos: 0

| Scenario | Test que lo cubre | Estado | Si «No lo sé», qué faltó |
|---|---|---|---|
| Responsable identificable: al obtener una tarea de "Ada Lovelace", `assignee` trae su nombre y sus iniciales | `Tasks \| responsable` → `el responsable llega con su nombre y sus iniciales` — ✔ | No cubierto | |
| La tarea no filtra datos de cuenta: ni suelta ni en la lista, `assignee` incluye el email ni ningún dato de acceso | `Tasks \| responsable` → `el responsable no trae el email ni ningún otro dato de la cuenta` — ✖ en la lista `assignee` trae `email` (`TaskTransformer` usa `UserTransformer`) | No cubierto | |
| Responsable sin nombre: con una cuenta registrada sin nombre, el nombre llega nulo y las iniciales siguen llegando | `Tasks \| responsable` → `un responsable sin nombre llega con nombre nulo y con iniciales` — ✖ en la lista `assignee` trae `email` (`TaskTransformer` usa `UserTransformer`) | No cubierto | |

Notas de la revisión:

- `backend/tests/functional/tasks/` existe pero está vacío, y ningún fichero de `backend/tests/` menciona tareas ni `assignee`. El frontend no tiene runner de tests. Ningún test de la suite pide una tarea, así que no hay nada que afirme sobre `assignee`.
- Hay tests con nombres parecidos que **no cuentan**:
  - `Auth | iniciales` → `un nombre de dos palabras da la inicial de cada una` y `sin nombre, las iniciales salen del email` comprueban `data.user.initials` en la respuesta de `POST /api/v1/auth/login`, no el `assignee` de una tarea.
  - `Auth | signup` → `una cuenta puede quedarse sin nombre` comprueba que `fullName` es nulo en la respuesta del registro, no en una tarea.
  - Ninguno de los dos pasa por `TaskAssigneeTransformer`, que es quien decide qué sale de la cuenta junto a la tarea.
- La implementación existe y parece correcta (`app/transformers/task_assignee_transformer.ts` hace `pick(['id', 'fullName', 'initials'])`), pero ningún test la ejercita. Si alguien la cambia por `UserTransformer`, que sí lleva el email, no fallaría nada.


### 🅱️ Parte B: las tres líneas
**Cuántos scenarios creías cubiertos antes de mirar, y cuántos lo estaban.**
Cubiertos antes de mirar: 1 de 3
Cuántos lo estaban: 0 de 3 

**El scenario del que no supiste si era un hueco de test o un hueco de spec**
El escenario 3 parecería que es un hueco de spec porque hay una contradicción entre specs: auth dice que en ese caso las iniciales salen del email ("AE"), y tareas dice que la interfaz debe representarlo "sin recurrir a su email". 


**Algo que el scenario no decidía por ti y tuviste que decidir al escribir el test.**
Lo que el scenario no decidía y se tomó como un supuesto al escribir el test es lo que cuenta como “ningún otro dato de la cuenta”. 
El test fija que assignee solo puede tener id, fullName e initials. 
El `id` de la cuenta se admite junto al nombre y las iniciales, como referencia para el cliente. La spec dice «ningún otro dato» sin aclarar si el identificador cuenta como tal.
Cualquier campo nuevo que se agregue mañana haría fallar el test.

