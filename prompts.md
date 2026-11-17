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

**Modelo:** GPT-6
**Herramienta:** Codex

```
Ayúdame a repasar el módulo 4 de AI4Devs y a preparar mi entrega paso a paso. Ya leí las lecciones y asistí a la sesión en vivo. La guía está en `modulo-4/GUIA-DE-ESTUDIO.md` y el clon está en `modulo-4/flowsync`, en la rama `trazabilidad-af`. Primero comprueba el entorno y ayúdame a registrar mi estimación de cuántos escenarios ya están cubiertos antes de abrir la spec o los tests. Después guíame durante el intento de 45 minutos, revisa conmigo la matriz y los tests, y muéstrame el PR antes de enviarlo.
```

**Qué salió:** Se verificó el entorno y se registró la estimación de Alfonso antes de consultar la spec o ejecutar la suite.

## Prompt 2

**Modelo:** GPT-6
**Herramienta:** Codex

```
Pondría «No cubierto» en los tres. Solo encontré tests de autenticación y perfil, ninguno consulta una tarea y comprueba `assignee`. ¿Revisamos la matriz antes de escribir los tests?
```

**Qué salió:** Se confirmó la cobertura inicial de cero escenarios y se registraron los tres huecos en la matriz.

## Prompt 3

**Modelo:** GPT-6
**Herramienta:** Codex

```
Sí, ayúdame a escribir y correr los tres tests que faltan. Para el responsable sin nombre, comprobaría que las iniciales existan, porque ese escenario no fija su valor exacto.
```

**Qué salió:** Se añadieron tres pruebas. Pasaron las de nombre e iniciales y la de responsable sin nombre. La de privacidad detectó campos adicionales en el detalle y el listado.
