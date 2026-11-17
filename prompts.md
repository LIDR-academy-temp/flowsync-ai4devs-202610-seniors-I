# Prompts

Aquí van **todos los prompts que lanzaste** para hacer el ejercicio, en el orden
en que los lanzaste, con el modelo y la herramienta de cada uno.

Esto no es papeleo. Lo que se revisa es **cómo pediste las cosas**, no solo lo
que salió: un resultado flojo con un prompt bueno y un resultado flojo con un
prompt vago necesitan feedback distinto, y sin este archivo no se distinguen.

## Cómo rellenarlo

- Un apartado `## Prompt N` por cada prompt.
- **Pega el prompt tal cual lo lanzaste**, dentro del bloque de código, aunque
  ocupe diez líneas y aunque tenga faltas. No lo reescribas para que quede bien:
  el que arreglaste mentalmente después no es el que lanzaste.
- Incluye también los que **no funcionaron**. Suelen ser los más útiles de leer.
- `Modelo` y `Herramienta` en todos. Si cambiaste de una a otra a mitad, se nota
  aquí.

Borra el ejemplo de abajo cuando escribas el primero.

---

## Prompt 1

**Modelo:** gpt-5.6-sol
**Herramienta:** Codex

```
ahora ayudamea. estudiar el modulo 5 por favor
```

**Qué salió:** Estudiar el módulo 5: preparó la guía de estudio y dejó el
entorno montado (fork, clon y rama de partida).

## Prompt 2

**Modelo:** gpt-5.6-sol
**Herramienta:** Codex

```
espera despues continuamos con eso, ahora haz el fork y clona el repositorio para hacer la tarea
```

**Qué salió:** Hizo el fork, clonó el repositorio en `modulo-5/flowsync` y lo
dejó en la rama de partida. Aprovechó para quitar el ejemplo de este mismo
fichero.

## Prompt 3

**Modelo:** MiniMax-M3.1-Flash-Preview[1m]
**Herramienta:** Claude Code

```
revisa el repo, y empieza a guardar todo los prompts en el archivo de prompts.md dime si puedes ver el hisotorial de commits y que tanto el frontend y backend este funcionando correctamente
```

**Qué salió:** Revisó el repo de punta a punta: leyó el historial de commits,
pasó la suite del backend (23 tests en verde), compiló y linteó el frontend, y
probó la API a pelo con `curl` (registro, login, perfil, tareas, estados,
vencimientos, filtros). Después se metió en el navegador con Playwright y
recorrió el flujo real de la interfaz: login, lista, alta de tarea, filtro por
estado y ficha de la tarea con su aviso de vencida. Dos hallazgos: un filtro
con estado inventado que devuelve `200` en vez del `422` que pide la spec, y
las pistas de pila que se filtran en el 404 cuando el servidor corre en
desarrollo.
