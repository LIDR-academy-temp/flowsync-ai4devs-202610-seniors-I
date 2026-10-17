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



##Sin Harness

## Prompt 1

**Modelo:** Auto (Composer) **Herramienta:** Cursor

```
Alta de cuenta desde la página de inicio

Quien llega a FlowSync por primera vez ve una página de demostración y no puede registrarse. Hace falta que, desde esa misma página, pueda crear su cuenta y saber si lo ha conseguido.

Criterios de aceptación:
- Desde la página de inicio se puede crear una cuenta sin salir del sitio.
- Si faltan datos o no cuadran, la persona entiende qué tiene que corregir.
- Si el alta funciona, queda claro que la cuenta ya existe.
- Si el correo ya está usado, el fallo se entiende sin lenguaje de servidor.
```

**Qué salió:** funcionó a la primera. El alta quedó en la página de inicio y se comprobó en el navegador.

## Prompt 2

**Modelo:** Auto (Composer) **Herramienta:** Cursor

```
Dame un diagrama de arquitectura en C4
```

**Qué salió:** el diagrama de contenedores en Mermaid no quedó bien y hubo que corregirlo.

## Prompt 3

**Modelo:** Auto (Composer) **Herramienta:** Cursor

```
Corrige el diagrama
```

**Qué salió:** tuve que insistir. El segundo diagrama deja la web, la API y SQLite con los enlaces HTTPS, JSON y SQL.

## Prompt 4

**Modelo:** Auto (Composer) **Herramienta:** Cursor

```
Valida si el token quedo a la vista?
```

**Qué salió:** funcionó a la primera. El token no se muestra: la API lo devuelve y la página solo enseña el correo.

##Con Harness

## Prompt 1

**Modelo:** Auto (Composer)
**Herramienta:** Cursor

```
Quien llega a FlowSync por primera vez ve una página de demostración y no puede registrarse. Hace falta que, desde esa misma página, pueda crear su cuenta y saber si lo ha conseguido.

Criterios de aceptación:
- Desde la página de inicio se puede crear una cuenta sin salir del sitio.
- Si faltan datos o no cuadran, la persona entiende qué tiene que corregir.
- Si el alta funciona, queda claro que la cuenta ya existe.
- Si el correo ya está usado, el fallo se entiende sin lenguaje de servidor.
```

**Qué salió:** funcionó a la primera: el alta quedó en la página de inicio, con los avisos en español y sin mostrar el token.

## Prompt 2

**Modelo:** Auto (Composer)
**Herramienta:** Cursor

```
Mejora la experiencia de usuario con UX
```

**Qué salió:** tuve que insistir en el propio resultado: las reglas se veían al escribir, pero el foco no volvía al correo repetido porque el campo seguía desactivado, y el máximo de 32 caracteres se marcaba en rojo con la contraseña vacía.