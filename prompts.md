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

**Modelo:** Haiku 5.5
**Herramienta:** Claude Code

```
Lee La tarea y dime que se tiene que realizar en cada parte
```

**Qué salió:** funcionó a la primera. Leí el README de la lección, resumí las partes (entorno, Parte A, Parte B, entrega) y no toqué nada.

---

## Prompt 2

**Modelo:** Haiku 5.5
**Herramienta:** Claude Code

```
Crea la matriz de trazabilidad, inciales: agnaedig. Realiza la matriz de trazabilidad siendo un agente adversarial, ya está configurado en tus agentes. Hazlo siguiendo el lineamiento A.1 No lvides guardar los prompts
```

**Qué salió:** leyó spec y código y escribió la matriz y las tres líneas, pero antes de que existiera ningún test. No invocó al agente adversarial.

---

## Prompt 3

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
De las filas que quedaron en No cubierto, escribe los tests que faltan: uno por scenario, siguiendo el estilo de los que ya existen en el proyecto, y sin tocar nada fuera de la carpeta de tests.
```

**Qué salió:** escribió los 3 tests. Hubo que usar Node 24 y aplicar migraciones. Un test falló por un error de redacción suyo (`.query` en vez de `.qs`).

---

## Prompt 4

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
No, no aflojes el test para que pase, hazo mediante el agente adversarial.
```

**Qué salió:** rechacé su edición directa. `adversarial-reviewer` no estaba registrado en la sesión y se usó un agente genérico con sus instrucciones. Confirmó el error de redacción y que el rojo restante es un defecto real de la app.
