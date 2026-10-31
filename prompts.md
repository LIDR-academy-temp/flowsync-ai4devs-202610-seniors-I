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

**Modelo:** Opus 5.5 Medium
**Herramienta:** Claude Code

```
Necesito entender el comportamiento ACTUAL del módulo de cuentas y acceso de FlowSync (registro, inicio de sesión, sesión y perfil) para luego escribir su
especificación. En este paso NO escribas ni modifiques ningún archivo: solo explora y reporta en el chat.

Analiza las dos capas:
- Backend: rutas, controladores, modelo de usuario, validadores y middlewares.
- Frontend: pantallas de acceso, estado de sesión y protección de rutas.

No amplíes el alcance a tareas ni a otras funcionalidades.

Entrégame:
1. Lista numerada de comportamientos observables candidatos a requisito, separados en API y Frontend. Para cada uno: una línea describiendo el
   comportamiento (qué petición/acción y qué resultado) y la evidencia (archivo y líneas).
2. Incoherencias: comportamientos que no se cumplen igual en todas partes(entre backend y frontend, o entre endpoints/pantallas), con su ubicación.
3. Comportamientos dudosos: casos en que no puedas determinar si son un bug o una decisión de diseño. Explica las dos interpretaciones posibles y por qué
   el código no permite decidir.

No supongas: si algo no se puede confirmar leyendo el código, ponlo en el punto 3 en lugar del punto 1.
```

**Qué salió:** 
Funcionó a la primera, el resultado lo copie en el archivo docs/notas-exploracion.md



## Prompt 2

**Modelo:** Opus 5.5 Medium
**Herramienta:** Claude Code

```
Ajustes sobre tu lista: quita el punto 3 de API (el hash no es observable).
Reformula el punto 5 de Frontend como "la sesión se mantiene al recargar"
sin mencionar el almacenamiento, y el 15 como "el formulario se puede enviar
con campos vacíos y los errores los informa el servidor". No incluyas nada
relacionado con cookies ni CORS. Para la API puedes indicar método y ruta
HTTP de cada petición, porque forman parte del contrato externo.
```

**Qué salió:** 
No funcionó como esperaba. Mi intención era que este prompt escribiera la spec,
pero envié solo el párrafo de ajustes sin el resto de las instrucciones (formato,
restricciones y archivo de destino). El agente hizo exactamente lo que decía el
texto: reescribió la lista con los ajustes, pero no generó el archivo.
Lo corregí en el prompt 3, enviando las instrucciones completas.


## Prompt 3

**Modelo:** Opus 5.5 Medium
**Herramienta:** Claude Code

```
Con tu lista ajustada (la última versión, con los ajustes ya aplicados),
escribe la especificación del módulo de cuentas y acceso en
docs/spec-viva/cmelon.md.

Usa solo los comportamientos del apartado 1 de esa lista. No agregues
requisitos nuevos ni conviertas en requisitos los comportamientos dudosos.

Formato obligatorio (una sola capability "Cuentas y acceso"):
- ## Purpose: una o dos frases sobre para qué existe esta capability.
- ## Requirements: cada requisito encabezado por ### Requirement: y redactado
  con SHALL.
- #### Scenario: al menos uno por requisito, con dos viñetas:
  - **WHEN** <precondiciones y acción> (sin usar GIVEN)
  - **THEN** <resultado observable>
- Idioma: español, salvo las palabras clave RFC (SHALL, MUST, etc.).

Restricciones:
- No uses ADDED, MODIFIED ni REMOVED: esto no es un delta.
- Solo comportamiento observable desde fuera: en la API, peticiones y
  respuestas (puedes indicar método y ruta HTTP, porque son contrato
  externo); en el frontend, lo que el usuario ve y puede hacer. No incluyas
  nombres de clases ni archivos del código.
- No incluyas nada relacionado con cookies ni CORS.
- No modifiques el código.

Cuando termines, dime en el chat cuántos requisitos escribiste. No hagas nada
más.
```

**Qué salió:** 
30 requisitos: 14 de API y 16 de Frontend.




