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
En el archivo CLAUDE.md hay una sección llamada "Reglas de proceso" que incluye las reglas que deberían seguirse a la hora de trabajar en este repositorio. Contrasta estas reglas con los últimos 15 commits del proyecto para determinar si se cumplen, si no se cumplen o si no hay evidencias suficientes para saber si se han cumplido. En el archivo `docs/auditoria/las.md` hay una sección "La tabla" en la que tienes que escribir una tabla que incluya lo siguiente: 1. Qué pide la regla (incluye por ahora la regla tal cuál está  escrita en CLAUDE.md, ya que tengo que rellenarlo yo a mano y así sabré 100% qué regla se está validando en cada línea); 2. Qué miraste para comprobarlo (el comando concreto o el archivo; esto es lo que separa una auditoría de una opinión, así que hay que especificar; si no se puede comprobar, indicar porqué); 3. Veredicto (tiene que tener uno de los siguientes valores: "Se cumple", "No se cumple", "No se puede comprobar con lo que hay"); 4. La evidencia (Si se cumple, una sola línea; Si no se cumple, el sitio dónde se rompió; Si no se puede comprobar, qué falta para poder comprobarla); 5: Qué harías con ella (Solo uno de estos valores: dejarla, borrarla, bajarla a algo que se ejecute solo). -- Esto es una auditoría, por lo tanto no modifiques ningún archivo fuera de docs/auditoria/las.md
```
