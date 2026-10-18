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

## Prompt 1 (lanzado en A con harness y en B sin harness, mismo texto)

**Modelo:** Sonnet 5.5 (claude-sonnet-5-5), esfuerzo medio, en ambas sesiones
**Herramienta:** Claude Code, auto mode activado en ambas. Versión 2.1.296 en A y 2.1.302 en B (se actualizó entre una sesión y otra)

```
Implementa el siguiente ticket de Jira (FLOW-1).

Editar mi nombre en el perfil

Como usuario registrado quiero cambiar el nombre que aparece en mi perfil.

Resultado esperado.
Se puede cambiar el nombre que aparece en el perfil.

Criterios de aceptación:
* Con la sesión iniciada puedo enviar un nombre nuevo.
* Sin sesión iniciada no puedo cambiarlo.
* Un nombre vacío no se acepta y recibo un mensaje claro.
* Tras el cambio, al consultar mi perfil veo el nombre nuevo.
* Se acepta texto alfanumérico.
* Solo se aceptan letras, caracteres especiales como tildes, ñ, espacios y números, no se aceptan otros simbolos.
```

**Qué salió:** A y B terminaron en un solo turno, sin ninguna intervención.