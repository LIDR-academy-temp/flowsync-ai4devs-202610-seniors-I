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

**Modelo:** Opus 5.5 Medium
**Herramienta:** Claude Code

```
Escribe la spec de lo que el sistema hace hoy y déjala en el archivo `docs/spec-viva/evpd.md`.
- Revisa las capas fronted y backend: lo que pasa por la API y lo que se ve en pantalla.
- Solo revisa la vertical de cuentas y acceso.
- Utiliza RFC-2119 para describir los requisitos.

FORMATO DEL DOCUMENTO:
- Arriba, un `## Purpose` de una o dos frases: para qué existe esta capability.
- Debajo, `## Requirements`, y colgando de él `### Requirement`, en los que el sistema tiene que (SHALL) hacer algo.
- Bajo cada requisito (`### Requirement`), al menos un `#### Scenario`: de cuatro almohadillas, con dos viñetas: `- **WHEN**` y `- **THEN**`. No hay casilla para el GIVEN: la precondición se mete dentro del WHEN.
- En castellano, salvo las mayúsculas de la RFC.

REGLAS DURAS:
- Nada de ADDED, MODIFIED ni REMOVED. Eso es el vocabulario de un delta, y esto no es un delta: es la verdad actual del sistema. Si tu archivo tiene una de esas secciones, has escrito otra cosa.
- Solo comportamiento observable desde fuera. Ni un nombre de clase, ni un nombre de archivo, ni una ruta de código. En la API, observable es la petición y la respuesta. En la pantalla, observable es lo que una persona ve y puede hacer.
- No toques el código.

RESTRICCIONES:
- No devulvas el contenido en el chat, solo la confirmación de haberlo escrito en el fichero.
- No revises ninguna otra vertical.
- El formato no es negociable.
```

**Qué salió:** (opcional, una línea) funcionó a la primera, a partir de aquí comienza la revisión.


## Prompt 2

**Modelo:** Opus 5.5 Medium
**Herramienta:** Claude Code

```
¿Cómo declara AdonisJs las rutas y cómo llama al controlador web?
```

**Qué salió:** (opcional, una línea) explicación correcta.

## Prompt 3

**Modelo:** Opus 5.5 Medium
**Herramienta:** Claude Code

```
¿Cómo se define el formato de respuesta del Controlador backend/app/controllers/new_account_controller.ts?
```

**Qué salió:** (opcional, una línea) explicación correcta.

## Prompt 4

**Modelo:** Opus 5.5 Medium
**Herramienta:** Claude Code

```
al crear una cuenta, si el fullName es una cadena vacía, ¿por qué se devolvería null?
```

**Qué salió:** (opcional, una línea) explicación correcta.

## Prompt 5

**Modelo:** Opus 5.5 Medium
**Herramienta:** Claude Code

```
¿dónde se comprueba en el código la validación de "Email ya registrado" al crear una cuenta?
```

**Qué salió:** (opcional, una línea) explicación correcta.

## Prompt 6

**Modelo:** Opus 5.5 Medium
**Herramienta:** Claude Code

```
¿dónde veo la respuesta en caso de error con el email?
```

**Qué salió:** (opcional, una línea) explicación correcta.

## Prompt 7

**Modelo:** Opus 5.5 Medium
**Herramienta:** Claude Code

```
cómo se envía el token de autenticación en una petición? 
```

**Qué salió:** (opcional, una línea) explicación correcta.
