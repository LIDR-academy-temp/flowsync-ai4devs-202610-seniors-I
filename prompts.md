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
puedes darme un ejemplo de como lo puedo hacer ando un poco perdido
```

**Qué salió:** el agente me dio un prompt de ejemplo para generar la spec; el Prompt 2 está basado en él.

---

## Prompt 2

**Modelo:** Opus 5.5
**Herramienta:** Claude Code (otra sesión)

```
Quiero escribir la spec viva del vertical de cuentas y acceso de FlowSync
(registro, inicio de sesión, sesión y perfil), describiendo lo que el
sistema hace HOY. No propongas cambios ni toques código.

Alcance: las dos capas.
- Backend: rutas de auth, controladores, modelo de usuario, validadores y middlewares.
- Frontend: pantallas de acceso, estado de sesión y protección de rutas.
  Nada de tareas ni de otras partes del sistema.

Escríbela en docs/spec-viva/crt.md con este formato exacto:
- "## Purpose" con 1-2 frases.
- "## Requirements" y debajo "### Requirement: <nombre>" donde el sistema SHALL hacer algo.
- Bajo cada requisito, al menos un "#### Scenario:" con dos viñetas:
  "- WHEN ..." y "- THEN ...". La precondición va dentro del WHEN.
- En castellano, salvo SHALL/MUST.

Reglas:
1. Nada de secciones ADDED/MODIFIED/REMOVED.
2. Solo comportamiento observable: en la API, petición y respuesta (códigos
   HTTP, campos); en pantalla, lo que la persona ve y puede hacer. Ni nombres
   de clases, ni de archivos, ni rutas de código dentro de la spec.
3. No modifiques ningún archivo salvo el de la spec.

Cuando termines, dame en el chat (no en el archivo) una tabla con cada
requisito y el archivo:línea donde lo viste, para poder comprobarlo yo.
Y señala aparte cualquier cosa que te haya parecido incoherente o dudosa
entre backend y frontend.
```

**Qué salió:** escribió la spec (16 requisitos), pero además hizo commit, abrió un PR contra `s3/start` de mi fork y lanzó una revisión adversarial sin que se lo pidiera. Tras la revisión corrigió la spec y volvió a subirla.

---

## Prompt 3

**Modelo:** Opus 5.5
**Herramienta:** Claude Code (otra sesión)

```
dame ya la tabla mientras termina la revisión
```

**Qué salió:** me dio la tabla requisito → archivo:línea y 9 incoherencias o dudas entre backend y frontend.

---

## Prompt 4

**Modelo:** Opus 5.5
**Herramienta:** Claude Code (otra sesión)

```
avísame cuando termine la revisión
```

**Qué salió:** al terminar la revisión adversarial, contrastó sus hallazgos con el código, corrigió la spec con los ciertos y descartó uno falso (nombre vacío → 422).

---

## Prompt 5

**Modelo:** Opus 5.5
**Herramienta:** Claude Code (otra sesión)

```
mergea el PR
```

**Qué salió:** no llegó a ejecutarse. No lo mergeé: el PR iba contra mi fork y no contra el repo del curso.

---

## Prompt 6

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
si, empieza por el punto 1
```

**Qué salió:** rellenó este `prompts.md` con los prompts anteriores, copiados literales.

---

## Prompt 7

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
ayúdame a comprobar el de autenticación por token
```

**Qué salió:** lo comprobamos leyendo el código y probando la API con curl (sin token, token inventado, token válido, logout y token revocado). Cuadra, pero la tabla de evidencias de la otra sesión situaba la falta de caducidad en el archivo equivocado, y "los tokens no caducan" resultó ser un valor por defecto, no una decisión.

---

## Prompt 8

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
comprueba ahora el de protección de rutas
```

**Qué salió:** comprobado leyendo el código, no en el navegador. Los cuatro escenarios cuadran; salieron la vuelta siempre a `/profile` y el token que sigue guardado con el backend caído.

---

## Prompt 9

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
pasemos a escribir la parte B
```

**Qué salió:** escribió las tres listas con lo comprobado en los prompts 7 y 8; dejó fuera las incoherencias de la otra sesión que no comprobé.

---

## Prompt 10

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
el 1
```

**Qué salió:** añadió los prompts 6 a 10 a este archivo.

---

## Prompt 11

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
si, haz el commit y el push
```

**Qué salió:** commit de la spec con la parte B y de este archivo, y push a mi fork.

---

## Prompt 12

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
si, abre el PR y cierra el #1
```

**Qué salió:** abrió el PR de entrega contra el repo del curso y cerró el PR #1 de mi fork.

---

## Prompt 13

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
puedes hacer una revision de la tarea por si me falta algo
```

**Qué salió:** revisó la entrega contra el README: cumple lo obligatorio y propuso cinco mejoras (afirmación del email sin probar, choque entre spec y lista 3, una incoherencia mal clasificada, dudas sobre `prompts.md` y la redacción del Purpose).

---

## Prompt 14

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
puedes revisar las cosas a mejorar
```

**Qué salió:** probó en ejecución lo del email con distinta capitalización (se confirma, y además el login con otra capitalización da 400), lo añadió a la lista 3 y movió la nota sobre la tabla de evidencias del agente de la lista 2 a la lista 1.

---

## Prompt 15

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
si, haz el commit y el push
```

**Qué salió:** commit de las mejoras de la parte B y de estos prompts, y push al PR de entrega.
