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

**Use el siguiente modelo para todos los prompts**

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

## Prompt 1

```
Quiero entender este proyecto antes de trabajar en él. No conozco AdonisJS ni la estructura de carpetas. Es solo una exploración: lee el código, pero NO modifiques ni crees ningún archivo, y no ejecutes nada que cambie el proyecto.

1. TECH STACK
Recuérdame el stack completo, separado en backend y frontend: lenguaje, framework, versiones principales, librerías clave (base de datos y ORM, validación, autenticación, estilos, manejo de estado, enrutado, cliente HTTP) y herramientas de desarrollo (Makefile, puertos, variables de entorno). Cada dato debe salir del código (por ejemplo, de los archivos de dependencias o configuración), no de suposiciones.

2. ESTRUCTURA DEL PROYECTO
Explícame de forma resumida las carpetas y archivos más importantes, primero a nivel raíz y luego dentro del backend y del frontend. Para cada carpeta, una línea sobre qué contiene y para qué sirve. No listes todo: solo lo relevante. Incluye también dónde vive la configuración y dónde están las migraciones y los tests, si existen.

3. CUENTAS Y ACCESO: FEATURES Y ENDPOINTS
Concéntrate solo en registro, inicio de sesión, sesión y perfil. Quiero ver:
- Tabla de endpoints: método, URL, si requiere sesión o no, y qué hace en una línea.
- Features desarrolladas, tanto en backend como en frontend, descritas en lenguaje simple.
- El recorrido completo de al menos un flujo (por ejemplo, el inicio de sesión): qué pantalla lo inicia, qué petición se envía, qué ruta del backend la recibe, qué valida, qué responde y qué hace el frontend con esa respuesta.

4. ARCHIVOS .TS PRINCIPALES
Dame la lista de los archivos TypeScript clave de este vertical, con la ruta relativa y una línea sobre qué hace cada uno, agrupados así:
- Backend: rutas, controladores, modelo de usuario, validadores, middlewares.
- Frontend: pantallas de acceso, estado de sesión, protección de rutas.

5. GLOSARIO ADONISJS
Explica en dos o tres líneas cada concepto de AdonisJS que aparezca en este proyecto y que yo necesite para leer el código (por ejemplo: rutas, controladores, middlewares, validadores, modelos y el comando "node ace"), relacionándolo siempre con el archivo concreto donde lo veo.

Formato: respuesta en el chat, en castellano, con títulos y tablas donde ayuden. Sé conciso y no inventes: si algo no existe o no lo encuentras, dilo explícitamente.
```

## Prompt 2

```
Quiero que escribas la spec viva del comportamiento ACTUAL del vertical de "cuentas y acceso" de este proyecto: registro, inicio de sesión, sesión y perfil. El código ya está escrito y funciona. No propones nada ni cambias nada: lees lo que hay y describes lo que hace hoy.

ALCANCE
- Solo cuentas y acceso, en sus dos capas, enteras:
  - Backend: rutas, controladores, modelo de usuario, validadores y middlewares relacionados con registro, login, sesión y perfil.
  - Frontend: pantallas de acceso, estado de sesión y protección de rutas.
- Nada que no sea cuentas y acceso (tareas, proyectos, etc.), aunque te tientes a seguir. Si dudas de si algo entra, déjalo fuera.

DÓNDE
- Escribe todo en un único archivo nuevo: docs/spec-viva/<tus-iniciales>.md (la carpeta no existe, créala con el archivo).
- No inicialices OpenSpec ni ejecutes ningún comando de openspec. Solo lees código y escribes ese archivo de texto.

FORMATO (obligatorio, no negociable)
- Primero, un "## Purpose" de una o dos frases: para qué existe esta capability.
- Debajo, "## Requirements", y colgando de él cada "### Requirement:" donde el sistema SHALL hacer algo.
- Bajo cada requisito, al menos un "#### Scenario:" (cuatro almohadillas) con exactamente dos viñetas: "- **WHEN**" y "- **THEN**". No existe GIVEN: la precondición va dentro del WHEN.
- Todo en castellano, salvo SHALL, WHEN y THEN.

REGLAS DURAS
1. Prohibido usar ADDED, MODIFIED o REMOVED, ni como secciones ni como etiquetas. Esto es la verdad actual del sistema, no un delta.
2. Solo comportamiento observable desde fuera.
   - API: describe la petición (método, URL, cuerpo) y la respuesta (código de estado, cuerpo).
   - Pantalla: describe lo que una persona ve y puede hacer.
   - Prohibido nombrar clases, archivos, carpetas, funciones, variables o rutas del código fuente.
3. No toques el código. Ni para arreglar lo que encuentres. Si algo parece un bug o una incoherencia, describe igualmente lo que hace hoy, tal cual, sin corregirlo ni suavizarlo.

CRITERIOS
- Describe lo que el código hace de verdad, no lo que "debería" hacer. No rellenes con suposiciones: si no estás seguro de un comportamiento, no lo inventes.
- Un requisito por comportamiento observable; incluye los casos de error (datos inválidos, credenciales incorrectas, sesión ausente o caducada, etc.), no solo el camino feliz.

AL TERMINAR
- Dime en el chat (no en el archivo) cuántos requisitos escribiste, el número exacto.
- Dime también, en el chat, qué comportamientos te dejaron dudas o te parecieron inconsistentes entre sí. Es material en bruto: no lo pongas en la spec ni lo resuelvas.
- No escribas ninguna lista de bugs ni conclusiones sobre el código dentro del archivo: solo Purpose y Requirements.
```
