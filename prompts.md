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

**Modelo:** Opus 1M xHigh
**Herramienta:** Claude Code

```
Estamos en un proyecto nuevo sin documentar. Entra en modo "PLAN" y no edites ningún fichero de código. Necesitamos saber que está implementado y como. Puedes ver la definicion del MVP en /home/inaki.dominguez/kuorum/LIDR/flowsync-ai4devs-202610-seniors-I/docs/prd/alcance-mvp.md y el PRD /home/inaki.dominguez/kuorum/LIDR/flowsync-ai4devs-202610-seniors-I/docs/prd/flowsync-mvp.md. Todas las funcionalidades que encuentres escribelas en ./docs/current_specs.md El formato de las specs es el siguiente: **El formato lo fija esta lección, y no es negociable:**

- Arriba, un `## Purpose` de una o dos frases: para qué existe esta capability.
- Debajo, `## Requirements`, y colgando de él `### Requirement:` en los que el sistema **SHALL** hacer algo.
- Bajo cada requisito, al menos un `#### Scenario:` de cuatro almohadillas, con dos viñetas: `- **WHEN**` y `- **THEN**`. No hay casilla para el `GIVEN`: la precondición se mete dentro del `WHEN`.
- En castellano, salvo las mayúsculas de la RFC.

**Y tres reglas duras, que son las que separan este ejercicio de escribir documentación:**

1. **Nada de `ADDED`, `MODIFIED` ni `REMOVED`.** Eso es el vocabulario de un delta, y esto no es un delta: es la verdad actual del sistema. Si tu archivo tiene una de esas secciones, has escrito otra cosa.
2. **Solo comportamiento observable desde fuera.** Ni un nombre de clase, ni un nombre de archivo, ni una ruta de código. En la API, observable es la petición y la respuesta. En la pantalla, observable es lo que una persona ve y puede hacer.
3. **No toques el código.** Ni siquiera para arreglar lo que encuentres, y sobre todo para eso: lo que encuentres es material de la parte B.
```

**Qué salió:** funcionó a la primera; exploré backend y frontend en paralelo y confirmé que solo está implementada la capability de autenticación (lo que el PRD ya anticipaba), así que las specs cubren únicamente esa.

---

## Prompt 2

**Modelo:** Opus 1M xHigh
**Herramienta:** Claude Code

```
A cada "Scenario", ponle un numero para poder hacerle referencia en los siguientes apartados
```

**Qué salió:** funcionó a la primera; numeré los 22 escenarios de forma correlativa.

---

## Prompt 3

**Modelo:** Opus 1M xHigh
**Herramienta:** Claude Code

```
Muestrame en el código donde se comprueba el Scenario 14
```

**Qué salió:** funcionó a la primera; localizó la cadena de 3 piezas (api.ts 401 → rehidratación en auth-provider.tsx → redirección en protected-route.tsx) y señaló que no hay test automatizado que lo cubra.

---

## Prompt 4

**Modelo:** Opus 1M xHigh
**Herramienta:** Claude Code

```
Donde rechaza el backend el token. Que código hace que el token sea rechazado?
```

**Qué salió:** funcionó a la primera; aclaró que el rechazo es código de la librería @adonisjs/auth (no del repo), y trazó la cadena rutas → middleware → config del guard → authenticate() en node_modules (líneas 741/796/802) y verifyToken/.verify contra la BD.
