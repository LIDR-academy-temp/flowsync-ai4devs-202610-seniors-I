# Trazabilidad: «Lo que cada tarea muestra de su responsable»

## Estimación previa (escrita antes de abrir nada)

Scenarios que creía cubiertos antes de mirar: **5** (a ojo).

> Dicho así: "creo que habrá unos 3 scenarios cubiertos".

## Matriz

Scenarios que tiene el requisito: **3**
Scenarios cubiertos (al final): **0**

| Scenario                                                                                       | Test que lo cubre                                                                                                                                       | Estado      | Qué faltó para decidir |
| ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ---------------------- |
| Una tarea cuyo responsable es "Ada Lovelace" trae su nombre y sus iniciales                    | ninguno (no existe `tests/functional/tasks/`; `initials.spec.ts` mira al usuario por el login, no a una tarea)                                          | No cubierto |                        |
| Ninguna tarea trae el email ni otro dato de acceso del responsable                             | ninguno                                                                                                                                                 | No cubierto |                        |
| Si el responsable se registró sin nombre, su nombre llega nulo y sus iniciales siguen llegando | ninguno (`initials.spec.ts`, "sin nombre, las iniciales salen del email", cubre las iniciales del usuario por el login, no el nombre nulo ni una tarea) | No cubierto |                        |

## Parte B

1. **Scenarios que creía cubiertos antes de mirar y cuántos lo estaban:** creía **5**; estaban **0 de 3**.

2. **El scenario del que no supe si era un hueco de test o de spec:** el scenario 2, «La tarea no filtra datos de cuenta». La spec dice "ningún otro dato de acceso" y no define qué es un dato de acceso, así que no supe si el hueco era de test (la regla está escrita y nadie la comprobó) o de spec (lo que yo entendía por "dato de acceso" no está escrito). Además, el código cumple la regla en la tarea suelta y no en la lista, que sí trae el email.

3. **Algo que el scenario no decidía y se tuvo que decidir al escribir el test:** qué cuenta como "dato de acceso". El test da por prohibidos `email`, `password`, `rememberMeToken` y `token`, y deja pasar `createdAt` y `updatedAt`. Es una interpretación que el scenario no fija, y con otra el test cambiaría de resultado, porque la lista también devuelve esas dos fechas. (Los tests los escribió un agente; esta decisión es suya y yo la he revisado.)
