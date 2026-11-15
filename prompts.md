# Prompts

Registro semi-automático (hooks `UserPromptSubmit` y `Stop`): cada prompt lanzado, con su modelo, su herramienta y un resumen de la salida.
sesion_actual: Auditoria Reglas del proceso
**Sesiones**:
  - nombre: Auditoria Reglas del proceso
    prompts: 1-16
---

## Prompt 1

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Haremos una auditoría. No modifiques codigo. Lee el readme.md y ayúdame con la tarea. Tengo todo montado. Ya validé que puedas correr git. Leí Claude.md. Antes de proceder con la consulta del histórico, necesito evaluar la parte indicada de Agents y intuir cuales se cumplen o no. Pon la hora local en cada respuesta[HH:mm:ss] Muéstrame las reglas enumeradas y aguarda instrucciones. No emitas juiciso sólo muestrame las reglas tal cual están escritas
```

**Qué salió:** Leyó el `README.md` y el [AGENTS.md](AGENTS.md) y me muestra las reglas (yo ya las había leido pero me quise asegurar de que estuviese en el foco del contexto)

---

## Prompt 2

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Apunta para la auditoria sobre el cumplimiento : 1) creo que se cumple parcialmente,  se solicita explicitamente una rama posiblemente se genere, adicionalmente si es por fuera. 2)  creo que se cumple en cada commit por estar en una skill y usarse por la herramienta 3) parcialmente, no hay hooks que lo fuercen y la condición es muy amplia salvo que se pida expliciatamente, 4) no se cumple, no hay hooks que lo fuercen 5) no se cumple, el retorno del agente es casi que obligatorio en la herramienta
```

**Qué salió:** Guarda mis datos en [docs/auditoria/salv.md](docs/auditoria/salv.md), en una sección "Apuesta" que va antes de la tabla.

---

## Prompt 3

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Contrastemos esas reglas contra los últimos 15 commits del repositorio y el estado actual del árbol. Muestrame la salida en el formato solicitado, no guardes nada aún, no toques codigo ni intentes arreglar nada
```

**Qué salió:** Da la tabla de la auditoría

---

## Prompt 4

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Dime cuantos de los commits estudiados son los afectados por cada regla, cual es su costo de evaluación, y en consecuencias en caso de que se rompan.
```

**Qué salió:** Me indica cuántos commits afecta cada regla, en particular algunas no son visibles en el commit y una tiene 1 commit afectado.

---

## Prompt 5

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
por ser de consecuencia alta y barata la 3 se queda y por lo visto se aplicó bien. evalua un plan para modificar el puerto 3333 a 4444. no hagas cambios
```

**Qué salió:** Anota la decisión y me da un super plan pero me adiverte que no toca rutas

---

## Prompt 6

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
las rutas se tocarían si se cambia el puerto. ¿el plan no aplica la regla 3?
```

**Qué salió:** Me explica que no se tocan las rutas y explica el concepto de que la ruta es considerada como /api/v1/tasks y es distinto de url o path de consumo. Cambiar el puerto no dispara la regla.

---

## Prompt 7

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
bien, planea para cambiar la ruta tasks a "task"
```

**Qué salió:** Plan para cambiar la ruta de la API de `/api/v1/tasks` a `/api/v1/task`. También dejó en evidencia el alcance no espcificado correctamente del requisito. Indicó que podía abarcar ruta de consumo en frontend pero eso no dispararía la regla de ajuste de docs

---

## Prompt 8

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
bien queda validada la regla tres entonces. vamos con el resto. 1 y 4 tiene alta consecuencia se agregarian a los hooks, un control antes del commit para 1 y  otro para 4 que pase el adversarial
```

**Qué salió:** Anoto la decisión: la regla 3 queda validada, y las reglas 1 y 4 bajan a controles que se ejecutan solos. Debajo, el diseño con detalles de los hooks y sugerencias

---

## Prompt 9

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
recuerdame la 2 y la 5. Agrega que debe especificarse unidad de trabajo en el hook y el agente
```

**Qué salió:** mostró las reglas 2 y 5, tal cual están escritas y una tabla con los datos con el formato e información de costos y consecuencias de no evaluar que le pedí.

---

## Prompt 10

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
bien opino que descartaría la regla 2 ya que es como decirle a la herramienta usa el skill commit para hacer commit.  Tambien modificaría la 5 manteniendo parte de la regla en cuanto al formato
```

**Qué salió:** Anotó las dos decisiones. Advirtió un detalle de la regla 2 y propuso como partir la regla 5

---

## Prompt 11

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Si son dos reglas distintas. Por un lado la del formato del PR que debe conservarse y reforzarse con hook. La del formato de salida y justificación no es relevante por ser trivial y fuerza a mirar el PR por lo que la eliminaría. Abrela en una linea extra de las reglas
```

**Qué salió:**  Abrió la regla 5 en dos filas: **5a** (formato del PR) y **5b** (formato de la respuesta en el chat)

---

## Prompt 12

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
bien escribe el documento y procedamos con el PR
```

**Qué salió:** Pidió autorización para ejecutar todo con pr incluido. Lo cancelé ya que faltaba el adversarial

---

## Prompt 13

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
escribe el documento
```

**Qué salió:** Escribe el documento de auditoría

---

## Prompt 14

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
ejuecuta el revisor adversarial. reevalua los resultados contra el readme.
```

**Qué salió:** Lanzó el `adversarial-reviewer` sobre [docs/auditoria/salv.md](docs/auditoria/salv.md). 

---

## Prompt 15

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
(terminó el aversarial reviewer)

```

**Qué salió:** El `adversarial-reviewer` terminó. Contrastó cada hallazgo con el README y con los datos de git. Me pidió que abriera un historial puntual (ya lo había hecho yo en otro prompt, incluso leí los distintos commits pero no son pruebas feacientes, es tan confiable el log como el agente, opté por forzar el cambio con el cambio de ruta y su plan)

---

## Prompt 16

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
abrí el historial pero no pude comprobar lo que indica. Intentamos contrastar la regla 3 como opción. Acepto las propuestas aplícalas
```

**Qué salió:** Aplicó los cuatro cambios. Indicó que faltaba hacer el prompts.md. Sigo manualmente con el PR con tiempo justo.
