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
 Explore and get context about  the code implemented on this project, check backend and frontend. Focus on the
    Accounts and access (Cuentas y accesso) code.
  The server is runing on the localhost:5173 explore what you can do, you can perform actions if needed is all test data.
```

**Qué salió:**  Describio los diferentes endpoints en el backend, y describio que hacia el frontend. Saco una lista de problemas.

## Prompt 2

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
  Create a doument on docs/spec-viva/RTC.md. This is a spec about Accounts and access to the app, is only about the already implemented part. Follow this format:
  Puropose

  1 or 2 sentences about why this exist
  ## Requirements
  ### Requirement:
   Requirement with RFC-2119 (SHALL,MUST)
   For each requirement at least can be more if its needed 1 scenary
   #### Scenario:
   **WHEN**
   **THEN***
  Rules:
  - Has to be in spanish except for mays words
  - don't add any Delta specs vocavulary this is the actual implementation descriptin
  - Only the include what you can see from the usage of the app, don't include anything from the implementation
  - Don't fix anything, even if you find something wrong.
  - Don't create branches and don't commit or push anything
```

**Qué salió:**  Creo la spec con el formato buscado y con las normas establecidas.
