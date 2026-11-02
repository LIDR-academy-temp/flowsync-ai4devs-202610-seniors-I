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

**Qué salió:** lanzó un subagente Explore sobre las dos capas y escribió `docs/spec-viva/pvr.md`: 18 requisitos con escenarios WHEN/THEN, primero los de la API y luego los de la web. Las rarezas que encontró (logout sin `data`, tokens que no caducan, email sensible a mayúsculas, iniciales «AE» sacadas del email, cualquier 400 traducido como credenciales) se describen como comportamiento actual y el código no se tocó.

