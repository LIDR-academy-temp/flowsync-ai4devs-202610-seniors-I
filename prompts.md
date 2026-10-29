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

Borra el ejemplo de abajo cuando escribas el primero.

---

## Prompt 1

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Necesito entender cómo funciona hoy todo lo de cuentas y acceso en este proyecto: registro, login, logout, sesión y perfil. Por favor no toques ningún archivo, solo lee y cuéntame lo que encuentres.

En el backend mira las rutas, los controladores, el modelo de usuario, los validadores y los middlewares que tengan que ver con eso. En el frontend mira las pantallas de login y registro, cómo se guarda y se maneja la sesión, y cómo se bloquea el acceso a las rutas cuando el usuario no ha iniciado sesión.

Lo que quiero es un resumen de cómo se comporta el sistema visto desde afuera.

De la API: qué peticiones acepta, qué datos pide, qué valida, qué responde cuando todo sale bien y qué responde cuando falla algo (códigos y mensajes).

Del frontend: qué ve el usuario, qué puede hacer, qué mensajes le aparecen y a dónde lo manda en cada caso.

En cada cosa que me cuentes, dime en qué archivo la viste, para poder comprobarlo yo después.

Si notas algo raro o algo que no cuadra entre el backend y el frontend, ponlo en una sección aparte, pero no lo arregles.

No te metas con tareas, proyectos ni nada más. Solo cuentas y acceso.
```

**Qué salió:** 

```Resultado: hizo el resumen de backend y frontend, y agrego un listado de Cosas raras o que no cuadran.```

## Prompt 2

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Listo, con lo que acabas de revisar escribe la spec de cómo funciona hoy el módulo de cuentas y acceso: registro, login, logout, sesión y perfil. Tanto la API como lo que ve el usuario en el front. Guárdala en docs/spec-viva/DR.md y no toques nada más.

El formato tiene que ser este. Empieza con "## Purpose" y una o dos frases de para qué existe el módulo. Después "## Requirements", y cada requisito va con "### Requirement:" y tiene que usar SHALL. Cada requisito lleva como mínimo un "#### Scenario:" con dos viñetas, **WHEN** y **THEN**. Las precondiciones van dentro del WHEN, no uses GIVEN. Todo en español, menos SHALL, WHEN y THEN.

Ten en cuenta esto:

No uses ADDED, MODIFIED ni REMOVED. No estoy proponiendo cambios, solo documentando lo que ya existe.

Escribe solo lo que se ve desde afuera. En la API, peticiones y respuestas (códigos, campos, mensajes). En el front, lo que el usuario ve y puede hacer. No pongas nombres de archivos, clases, funciones ni rutas del código dentro de la spec.

Documenta lo que hace hoy aunque parezca un error. Por ejemplo, que los tokens no caducan o que el email distingue mayúsculas. No lo arregles al redactar.No metas tareas, proyectos ni nada que no sea cuentas y acceso.
Debajo de cada requisito pon la línea "> Estado: pendiente de verificar", que esa la voy marcando yo.
Las listas de la parte B no las hagas, esas las escribo yo.
Cuando termines, dime aquí en el chat (no en el archivo) cuántos requisitos escribiste y en qué archivo y línea del código puedo revisar cada uno.
```

**Qué salió:** 

```Escribí 22 requisitos en flowsync-ai4devs-202610-seniors-I/docs/spec-viva/DR.md. No toqué ningún otro archivo. Comprobé que en la spec no aparecen GIVEN, ADDED,
  MODIFIED, REMOVED ni nombres de archivos del código, y que cada requisito tiene su
  línea "> Estado: pendiente de verificar". Tampoco incluí las listas de la parte B```
  
  
## Prompt 3 — Verificación del logout
**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```grep -rn "message" backend/app/controllers/```

**Qué salió:** 
```El agente ejecutó el comando y confirmó que el logout responde { message } sin el envoltorio data. También indicó que los demás mensajes de error vienen de las librerías (en inglés).  ```
