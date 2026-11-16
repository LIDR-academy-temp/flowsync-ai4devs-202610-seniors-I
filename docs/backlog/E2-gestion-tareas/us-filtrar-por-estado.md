# Filtrar la lista por estado

**Identificador:** FS-142

## Historia

Como miembro del equipo, quiero filtrar la lista por estado para centrarme en lo pendiente.

## Criterios de aceptación

**CA-01. Sin filtro se ve todo**

- **DADO** la lista sin ningún filtro puesto
- **CUANDO** la abro
- **ENTONCES** veo todas las tareas del equipo

**CA-02. Filtrar por un estado**

- **DADO** la lista con tareas en distintos estados
- **CUANDO** filtro por *En curso*
- **ENTONCES** solo veo las tareas que están *En curso*

**CA-03. Filtrar por varios estados a la vez**

- **DADO** la lista con tareas en distintos estados
- **CUANDO** elijo *Por hacer* y *En curso* a la vez
- **ENTONCES** veo todo lo pendiente y no veo las tareas *Hechas*

**CA-04. Quitar el filtro**

- **DADO** un filtro puesto
- **CUANDO** lo quito
- **ENTONCES** vuelvo a ver todas las tareas

**CA-05. Un filtro sin resultados se explica**

- **DADO** que no hay ninguna tarea en el estado que he elegido
- **CUANDO** filtro por ese estado
- **ENTONCES** veo un mensaje claro de que no hay tareas en ese estado, no una lista vacía sin explicación

**CA-06. Las tareas entran y salen del filtro sin recargar**

- **DADO** un filtro puesto
- **CUANDO** yo u otra persona cambia el estado de una tarea
- **ENTONCES** la tarea entra en el filtro o sale de él sin que yo recargue

**CA-07. El filtro no cambia el orden**

- **DADO** un filtro puesto
- **CUANDO** miro la lista
- **ENTONCES** las tareas siguen ordenadas por el cambio más reciente, y las vencidas siguen destacadas y suben como en el resto de la lista

**CA-08. Mi filtro es solo mío**

- **DADO** que otra persona tiene la lista abierta
- **CUANDO** pongo o quito un filtro
- **ENTONCES** lo que ve esa persona no cambia

**CA-09. Se ve qué filtro está puesto**

- **DADO** un filtro puesto
- **CUANDO** miro la lista
- **ENTONCES** se ve claramente por qué estados estoy filtrando

**CA-10. Crear una tarea que el filtro no muestra**

- **DADO** un filtro solo por *Hecha*
- **CUANDO** creo una tarea nueva
- **ENTONCES** la tarea se crea y me avisa de que no aparece porque el filtro la oculta

**CA-11. La lista arranca sin filtro**

- **DADO** que dejé un filtro puesto
- **CUANDO** vuelvo a abrir la lista
- **ENTONCES** arranca sin filtro y veo todas las tareas
