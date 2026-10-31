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

**Modelo:** Sonnet 4.5
**Herramienta:** Claude Code

```
Quiero escribir la spec viva del vertical de cuentas y acceso de este proyecto: lo que el sistema hace HOY, no lo que debería hacer. Empezá solo por el backend.

Leé las rutas, controladores, modelo de usuario, validadores y middlewares relacionados con registro, inicio de sesión, sesión (token y logout) y perfil. Ignorá todo lo demás (tareas, equipo, etc.).

Escribí el resultado en docs/spec-viva/db.md (la carpeta no existe, creala) con este formato exacto:

## Purpose
Una o dos frases: para qué existe esta capability.

## Requirements

### Requirement: <nombre>
El sistema SHALL ...

#### Scenario: <nombre>
- **WHEN** <precondición y acción, juntas>
- **THEN** <resultado observable>

Reglas obligatorias:
1. Nada de secciones ADDED, MODIFIED ni REMOVED: es la verdad actual, no un cambio.
2. Solo comportamiento observable desde fuera: la petición HTTP (método, URL, datos enviados) y la respuesta (código de estado, datos devueltos). Ningún nombre de clase, archivo ni función dentro de la spec.
3. No modifiques ningún archivo de código. Solo creás docs/spec-viva/db.md.
4. En castellano, salvo SHALL / SHALL NOT.
5. Si algo no se puede saber leyendo el código, no lo inventes ni lo pongas como requisito: avisame en el chat.

Al terminar, en el chat (no en el archivo), dame una tabla con cada requisito y el archivo y línea de código donde lo viste.


Prompt #2

Ahora seguí con el frontend del mismo vertical (pantallas de registro, inicio de sesión y perfil, estado de sesión y protección de rutas). Agregá los requisitos al final de docs/spec-viva/db.md, con el mismo formato.

Mismas reglas que antes, más estas:
1. En pantalla, observable es lo que una persona ve y puede hacer: textos, botones, mensajes de error, a qué dirección del navegador la lleva la app. Nada de nombres de componentes, archivos, hooks ni de dónde se guarda el token por dentro.
2. Describí también qué pasa al recargar la página, al entrar a una dirección protegida sin sesión, al entrar al login ya teniendo sesión, y cuando el servidor no responde.
3. No toques código.

Al terminar, igual que antes: en el chat, una tabla con cada requisito nuevo y el archivo y línea donde lo viste.
