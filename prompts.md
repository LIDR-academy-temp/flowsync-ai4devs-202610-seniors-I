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

**Modelo:** Opus 5.5 (claude-opus-5-5)
**Herramienta:** Claude Code

```
Vamos a crear la especificacion de los que actualmente hace esta aplicacion en sus dos capas (frontend y backend) para el modulo de cuentas y acceso (registro, inicio de sesion, sesion y perfil). Para ello primero haz un "explore" del codigo relativo a esas funciones tanto en backend como en front y utiliza el siguiente formato para documentar la especificacion en un fichero en la ruta /docs/spec-viva/pvr.md: 

## Purpose: una o dos frases que expliquen para qué existe esta capability.

## Requirements: sección que contiene los requisitos, cada uno encabezado por ### Requirement: y redactado con SHALL para indicar lo que debe hacer el sistema.

#### Scenario:: al menos uno por requisito, con dos viñetas: **WHEN***. Incluye las precondiciones dentro de WHEN, sin utilizar GIVEN.

Idioma: español, excepto las palabras clave de la RFC.

 Ademas, debes de respetar las siguientes reglas: 

No utilices ADDED, MODIFIED ni REMOVED. Son secciones propias de una especificación de cambios (delta). En este ejercicio nos centramos en documentar el comportamiento actual del sistema.

Describe solo comportamientos observables desde fuera. No incluyas nombres de clases, archivos ni rutas del código. En la API, describe peticiones y respuestas; en el frontend, lo que el usuario ve y puede hacer.

No modifiques el código. Aunque encuentres errores o inconsistencias, déjalos tal como están. Esos hallazgos forman parte del análisis de la parte B.
```

**Qué salió:** lanzó un subagente Explore sobre las dos capas y escribió `docs/spec-viva/pvr.md`: 16 requisitos y 44 escenarios WHEN/THEN, primero los de la API y luego los de la web. Las rarezas que encontró (logout sin `data`, tokens que no caducan, email sensible a mayúsculas, iniciales «AE» sacadas del email, cualquier 400 traducido como credenciales) se describen como comportamiento actual y el código no se tocó.

## Prompt 2

**Modelo:** Opus 5.5 (claude-opus-5-5)
**Herramienta:** Claude Code

```
Deja el pr
```

**Qué salió:** paró la revisión adversarial que estaba en marcha sobre el PR y dejó el PR como estaba.

## Prompt 3

**Modelo:** Opus 5.5 (claude-opus-5-5)
**Herramienta:** Claude Code

```
Cierra el PR y borra la rama remota
```

**Qué salió:** cerró el PR #1 del fork y borró `spec-viva-pvr` en `origin`. La rama local sigue con el commit de la spec.

## Prompt 4

**Modelo:** Opus 5.5 (claude-opus-5-5)
**Herramienta:** Claude Code

```
Ahora vamos a revisar requisito a requisito buscando incoherencias entre los requisitos que hemos documentado y el codigo de dicha funcionalidad.
```

**Qué salió:** comparó los 16 requisitos con el código de las dos capas y comprobó en local cómo trata VineJS el email y el nombre. Encontró 3 afirmaciones de la spec que no son exactas («Cerrando sesión…» no llega a verse, el email con espacios se rechaza en vez de guardarse, y el escenario de longitud del login es confuso) y 5 comportamientos sin documentar. El resto coincide con el código.

## Prompt 5

**Modelo:** Opus 5.5 (claude-opus-5-5)
**Herramienta:** Claude Code

```
Lo que quiero ahora es que al final de la spec me pongas 3 listas en las que vamos a detallar lo siguiente: 

1. Requisitos generados y comprobados. Indica cuántos requisitos escribió el agente y cuántos verificaste tú consultando el código. Escribe ambos números, sin redondearlos ni justificarlos. Comprobar significa revisar el código para confirmar el comportamiento, no limitarse a leer un requisito que parece correcto.

2. Incoherencias detectadas. Anota cada inconsistencia en una línea e indica dónde aparece. No necesitas buscarlas expresamente: pueden surgir al intentar describir como regla general un comportamiento que no se cumple en todas las partes del sistema.

3. Comportamientos que no supiste clasificar como bug o contrato. Incluye al menos un caso en el que hayas encontrado un comportamiento y no tengas claro si es un error o si el sistema está diseñado para funcionar así. Explica brevemente las dos posibilidades y por qué el código no permite saber cuál es la correcta.
```

**Qué salió:** añadió al final de la spec una sección «Revisión» con tres listas: 16 requisitos escritos y 12 comprobados contra el código, 14 incoherencias en una línea cada una indicando dónde aparecen, y 3 casos dudosos entre bug y contrato (email que distingue mayúsculas, tokens sin caducidad y logout sin `data`). Al contar vio que antes había dicho 18 requisitos cuando son 16, y lo corrigió en este fichero.

