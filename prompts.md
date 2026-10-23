# Prompts

Aquí van **todos los prompts que lanzaste** para hacer el ejercicio, en el orden en que los
lanzaste, con el modelo y la herramienta de cada uno.

Esto no es papeleo. Lo que se revisa es **cómo pediste las cosas**, no solo lo que salió: un
resultado flojo con un prompt bueno y un resultado flojo con un prompt vago necesitan feedback
distinto, y sin este archivo no se distinguen.

## Cómo rellenarlo

- Un apartado `## Prompt N` por cada prompt.
- **Pega el prompt tal cual lo lanzaste**, dentro del bloque de código, aunque ocupe diez líneas
  y aunque tenga faltas. No lo reescribas para que quede bien: el que arreglaste mentalmente
  después no es el que lanzaste.
- Incluye también los que **no funcionaron**. Suelen ser los más útiles de leer.
- `Modelo` y `Herramienta` en todos. Si cambiaste de una a otra a mitad, se nota aquí.

---

## Prompt 1

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Lee el proyecto y dime qué capabilities hay ya construidas
```

**Qué salió:** funcionó a la primera: solo hay auth (registro, login, sesión persistente, perfil, logout) y el modelo de datos es usuarios + tokens de acceso; nada de tareas.

## Prompt 2

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Quiero que FlowSync sea una herramienta para que los equipos remotos sepan en qué está trabajando cada uno sin tener que hacer reuniones de sincronización. Algo tipo tareas compartidas pero más en tiempo real y menos rollo que Jira.
```

**Qué salió:** salieron 5 preguntas en una sola ronda, sin bajar a modelo de datos ni endpoints, pero no gracias a mi prompt: era solo el párrafo vago, sin pedir que preguntara antes de proponer, sin acotar a una ronda ni prohibir el modelo de datos. La IA lo hizo bien porque había leído el `README.md`, que marca ese paso.

<details>
<summary>Respuesta del agente</summary>

Antes de proponer nada: ese párrafo describe sensaciones («más en tiempo real», «menos rollo que Jira»), no requisitos. Hoy FlowSync solo tiene autenticación (registro, login, perfil y logout) y aún no existe nada de tareas. Así que el alcance se puede definir desde cero, pero tiene que encajar con eso.

Estas son las cinco preguntas que más reducen la incertidumbre. Es una sola ronda y no entro en modelo de datos ni en endpoints:

1. ¿Qué duele hoy, en concreto, y a quién? ¿Es la daily, el «¿en qué estás?» por chat o descubrir tarde que dos personas hacían lo mismo? ¿Quién saca el valor: los compañeros entre sí o un lead que quiere visibilidad?
2. ¿Qué decisión cambia si el estado del equipo está siempre al día? Si la respuesta es solo «sentirse informado», el tiempo real no compensa lo que cuesta. ¿Qué deja de hacer o empieza a hacer alguien al ver la información?
3. ¿Qué significa «tiempo real» y qué no? ¿Es ver cambios de estado sin refrescar? ¿Incluye chat, presencia («quién está conectado») o avisos que interrumpen? ¿O es un resumen que se consulta al llegar?
4. ¿De dónde sale el estado y por qué se va a mantener al día? ¿Lo escribe la persona a mano o sale de Git, CI o el calendario? ¿Qué gana quien lo escribe? ¿Sustituye al gestor de tareas actual o convive con él?
5. ¿Quién es el primer usuario y cómo sabremos que ha funcionado? ¿Qué tamaño tiene el equipo, cómo se reparte (uno o varios equipos, husos horarios) y qué roles hay? ¿Qué señal, a una semana de uso, diría que funcionó y cuál que no?

Pásame las respuestas de una vez. Si alguna no queda cubierta, la decido yo y la marco como supuesto. Con eso propongo el alcance en cinco bloques (problema, usuarios, propuesta de valor, alcance y no-alcance), recortando mucho y justificando cada exclusión.

</details>

## Prompt 3

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
1. quiero q sepan en todo momento que tareas tienen que hacer, que no tengan que seleccionar una tarea sino que la primera que este libre se les asigne 
2. quiero que mis trabajadores sepan con que tareas tratan y que tareas tratan otros compañeros y no nos tengamos que preguntar con que estan
3. si ese tipo de informacion, quien esta haciendo que, chat personal, si estan o no conectados 
4. el estado de la tarea tiene q salir pq la tarea esta asignada a alguien asi podemos saber quien esta con la tarea 
5. el tamaño del equipo es pequeño y no se reparten cada uno trabaja individual con su propia tarea
```

**Qué salió:** no siguió la consigna: respondí las 5 preguntas con mis propias respuestas en vez de pegar la ficha de hechos. La IA no propuso alcance y me señaló que contradecían la ficha (asignación automática, visión de jefe, chat y presencia, estado derivado de la asignación, sin criterio de éxito) y que chocaban entre sí. Me ofreció A (pegar la ficha) o B (seguir con mis respuestas).

## Prompt 4

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
la opcion A
```

**Qué salió:** la IA escribió el borrador de `docs/prd/alcance-mvp-crt.md` con los tres tramos, proponiendo 9 cosas dentro del alcance. Ojo: no llegué a pegar la ficha; la IA la tomó del `README.md` por su cuenta. Mis respuestas del prompt 3 (asignación automática, chat, quién está conectado) acabaron en el NO-alcance.

## Prompt 5

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Mira el readme.md y dime si esta completa la tarea o me falta algo
```

**Qué salió:** la IA comparó el README con lo hecho: los tres tramos estaban, pero faltaban mi recorte, la parte B, prompts sin registrar en `prompts.md`, y el commit y el PR.

## Prompt 6

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
añade a prompts.md los prompts que faltan
```

**Qué salió:** la IA recuperó los prompts 3 y 4 literales del historial de la sesión anterior, sin reconstruirlos, y me señaló que el «Qué salió» del prompt 2 era generoso.

## Prompt 7

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
cambia el qué salió del prompt 2
```

**Qué salió:** funcionó a la primera.

## Prompt 8

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
ahora que me falta por hacer?
```

**Qué salió:** la IA listó lo pendiente: recortar el alcance, escribir la parte B y entregar.

## Prompt 9

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
ayúdame a decidir qué recortar del alcance
```

**Qué salió:** la IA no decidió por mí: separó lo imprescindible (1, 2, 4, 5), los candidatos a recortar (3, 6, 7) y la tensión entre el 8 y el 9, con argumentos a favor y en contra de cada uno.

## Prompt 10

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
quito el 3, el 6 y el 8
```

**Qué salió:** la IA aplicó el recorte (9 → 6) y arregló lo que se contradecía con él, como la propuesta de valor, que prometía cambios en vivo. Los porqués los redactó ella porque yo no los di, y me avisó de que quitar el 6 y el 8 va contra la ficha.

## Prompt 11

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
ayúdame con la parte B
```

**Qué salió:** la IA no la escribió: me hizo preguntas guía para cada línea y me pidió las respuestas con mis palabras.

## Prompt 12

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
la del 8 es la que menos seguro estoy
```

**Qué salió:** la IA me pidió las dos mitades que faltaban: qué se contradice y qué tendría que pasar para que entrara.

## Prompt 13

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
vale el del documento
```

**Qué salió:** la IA escribió la línea 2 con los porqués del NO-alcance, que aprobé sin reescribirlos.

## Prompt 14

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
¿tiempo real sin refrescar contra ver lo movido al llegar?
```

**Qué salió:** dudé y adopté la contradicción que había sugerido la IA. Me la explicó en llano y me ofreció señales posibles para que el 8 entrara.

## Prompt 15

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
que dos personas cojan la misma tarea con minutos de diferencia
```

**Qué salió:** elegí una de las señales que propuso la IA. Con eso escribió la línea 3 y cambió la nota de la parte B, que decía «La IA no las rellena», para que reflejara que la redacción es suya.

## Prompt 16

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
añade los prompts de esta sesión a prompts.md
```

**Qué salió:** la IA añadió estos prompts, literales, sacados del historial de la sesión.

## Prompt 17

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
haz el commit, el push y abre el PR
```

**Qué salió:** la IA hizo el commit, el push y abrió el PR contra `s2/start` del repo del curso. Después pasó el revisor adversarial, que encontró que el documento se contradecía: decía que los cambios en vivo no aportaban nada a H3, y en la parte B que sin ellos se podía romper H3. También vio que 7 exclusiones no nombraban ninguna hipótesis.

## Prompt 18

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
admitir el riesgo en la exclusión, y ajusta lo demás
```

**Qué salió:** elegí admitir el riesgo para H3 en vez de volver a meter el 8. La IA lo dejó escrito, ligó cada exclusión a una hipótesis, concretó el punto 6, añadió «soltar una tarea» al punto 3, marcó como riesgo que cualquier cuenta registrada lo vea todo y aclaró la autoría de la parte B.

## Prompt 19

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
¿ya está todo completo?
```

**Qué salió:** la IA comprobó la entrega contra el README: el PR tiene solo los dos ficheros y está todo subido. Lo único abierto era confirmar «soltar una tarea», que había añadido ella durante la revisión.

## Prompt 20

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
déjalo, mantén soltar una tarea
```

**Qué salió:** confirmé el cambio que había añadido la IA; el alcance no se tocó.
