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

**Modelo:** Haiku 5.5 xMedium
**Herramienta:** Claude Code

```
Hola Claude, que instrucciones ves?
```

**Qué salió:** Claude del Repo, Contexto de Usuario y sesion, e instrucciones del sistema

## Prompt 2

**Modelo:** Haiku 5.5 xMedium
**Herramienta:** Claude Code

```
Lee el código del vertical de cuentas y acceso de FlowSync y escribe la spec viva de lo que hace hoy, no de lo que debería hacer. Solo ese vertical, aunque te ofrezcas a seguir.

Cubre las dos capas. Backend: registro, inicio de sesión, cierre de sesión y consulta del perfil propio, con sus validaciones, el formato de las respuestas y la protección de las rutas autenticadas. Frontend: pantallas de acceso (login y registro), estado de sesión y protección de pantallas.

Formato: "## Purpose" de una o dos frases; "## Requirements" con "### Requirement:" en los que el sistema SHALL hacer algo; bajo cada requisito, al menos un "#### Scenario:" con dos viñetas, "- **WHEN**" (la precondición va dentro, no hay GIVEN) y "- **THEN**". En castellano, salvo SHALL.

Reglas: solo comportamiento observable desde fuera. En la API puedes nombrar la petición (método y URL) y la respuesta; en pantalla, lo que la persona ve y puede hacer. Ni nombres de archivo, clase o carpeta, y nada de ADDED, MODIFIED o REMOVED. Escribe lo que el código hace, aunque te parezca un fallo: no lo corrijas ni lo suavices.

No toques código, no lances comandos que cambien algo, no crees ramas, no commitees ni abras PR, e ignora las reglas de proceso del CLAUDE.md sobre ramas feat/ y PR. Escribe solo en docs/spec-viva/mtpc.md, y no escribas una "Parte B" ni listas de incoherencias dentro del archivo. Cuando termines, dime cuántos requisitos escribiste.
```

**Qué salió:** 2 autorizaciones de lectura, 1 creacion y permitir escribir mtpc.md, solicito nuevamente escribir mtpc.md y confirmacion de lo realizado.
