# Prompts

Aquí van **todos los prompts que lanzaste** para hacer el ejercicio, en el orden en que los
lanzaste, con el modelo y la herramienta de cada uno.

Esto no es papeleo. Lo que se revisa es **cómo pediste las cosas**, no solo lo que salió: un
resultado flojo con un prompt bueno y un resultado flojo con un prompt vago necesitan feedback
distinto, y sin este archivo no se distinguen.

---

## Prompt 1

**Modelo:** Claude Opus 5.5 (`claude-opus-5-5`)
**Herramienta:** Claude Code (extensión de VS Code)

El prompt se lanzó como una captura de pantalla con el párrafo de abajo, acompañada del texto «Toma este párrafo como tu prompt.». La transcripción de la imagen es literal:

```
Toma este párrafo como tu prompt.

[imagen]
Vamos a documentar como spec de OpenSpec la capability que YA existe en este proyecto: la de cuentas y acceso (registro, inicio de sesión, sesión y perfil). Esto es ingeniería inversa: leer el código y escribir lo que hace HOY, no proponer nada nuevo ni cambiar una línea.
1. Explora el vertical de autenticación COMPLETO, en las dos capas. En backend/: sus controladores, el modelo de usuario, sus validadores, sus rutas y sus middlewares. En frontend/: las pantallas de acceso, el estado de sesión y la protección de rutas. Ignora todo lo que no sea autenticación.
2. Escribe openspec/specs/auth/spec.md con el formato exacto de una spec VIVA de OpenSpec: un ## Purpose de una o dos frases, y debajo ## Requirements, con ### Requirement: en los que el sistema SHALL hacer algo, y bajo cada uno al menos un #### Scenario: de cuatro almohadillas con sus dos viñetas - **WHEN** y - **THEN**. En castellano, salvo las mayúsculas RFC-2119.
3. NO uses secciones ADDED, MODIFIED ni REMOVED: eso es de un delta, y esto no es un delta, es la verdad actual del sistema.
4. Describe solo comportamiento observable desde fuera. Nada de nombres de clase ni de rutas de archivo. Para el backend, observable = la petición y la respuesta HTTP. Para el frontend, observable = lo que una persona ve y puede hacer en pantalla.
5. Al terminar, dime qué comportamiento del código NO has podido expresar como requisito, y por qué.
```

**Qué salió:** funcionó a la primera. Salió una spec de 14 requisitos y 42 escenarios que pasa `openspec validate --strict`, junto con la lista de lo que no cabía como requisito. Para confirmar códigos y cuerpos, el agente lanzó peticiones reales contra el servidor de desarrollo, además de leer el código.

## Prompt 2

**Modelo:** Claude Opus 5.5 (`claude-opus-5-5`)
**Herramienta:** Claude Code (extensión de VS Code)

```
Guarda en memoria solo para este proyecto:
El Gitflow una vez yo apruebe no aplica en este proyecto. Aquí, siempre un subagente al finalizar la tarea creará el PR y ejecutará el adversarial reviewer y me dará los hallazgos.
Procede con esta tarea con el PR y la revisión adversarial.
```

**Qué salió:** se abrió el PR de la spec en el fork y el revisor adversarial la contrastó contra el código. No encontró afirmaciones falsas, solo huecos: emails con mayúsculas en el registro, casos límite de las iniciales y textos vacíos tratados como `null`. La spec se entrega sin retocar tras esa revisión.

## Prompt 3

**Modelo:** Claude Opus 5.5 (`claude-opus-5-5`)
**Herramienta:** Claude Code (extensión de VS Code)

```
Realiza gitflow completo, sincroniza fork y abre PR en Upstream tal como se indica en el Readme de la rama s3 del repo, donde estamos actualmente. Sube los entregables con 3 hallazgos encontrados para cumplir con la parte B.
```

**Qué salió:** las tres listas de la parte B, con tres hallazgos en la segunda y tres en la tercera, este `prompts.md` y el PR contra el repo del curso.
