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

**Modelo:** Sonnet Medium
**Herramienta:** Claude Code

```
/init Todo el contenido debe estar en español. Crea un fichero en `docs/frontend-architecture.md` con la arquitectura del frontend propuesta, siguiendo buenas prácticas del framework utilizado, estructura de carpeta clean, etc. Referencia el fichero en CLAUDE.md explicando que se lea el fichero cuando sea necesario entender la arquitectura. Añade un Agente de Claude que se llame `adversarial-reviewer`, cuyo objetivo sea refutar el trabajo del otro, no confirmarlo. Crea el fichero `docs/frontend-conventions.md` con las convenciones del frontend. Si no detectas convenciones, propón alguna. Añade un fichero `docs/frontend-test.md` con detalles dobre cómo implementar los tests del frontend, siguiendo buenas prácticas. Debe haber una sección de Gotchas donde ponga que `No introducir dependencias nuevas sin justificarlas en el PR.` y alguna que propongas. Se deben utilizar componentes `shadcn/ui`. Se debe crear un hook para ejecutar comandos necesarios para validar que el trabajo no rompe lint, ni tests, ni build cada vez que se edita. 
```

**Qué salió:** funcionó a la primera.

## Prompt 2

**Modelo:** Sonnet Medium
**Herramienta:** Claude Code

```
implementa la tarea https://winmo.atlassian.net/browse/FLOW-2 
```

**Qué salió:** el login funcionaba pero no almacenaba el token en el localStorage.
1
## Prompt 3

**Modelo:** Sonnet Medium
**Herramienta:** Claude Code

```
al hacer el login, el tocken que se almacena en el localStorage tiene como valor undefined y no funciona la recarga
```

**Qué salió:** funcionó a la primera.
