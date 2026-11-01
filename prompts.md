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

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Guarda cada entrada mía en el archivo prompts.md; fíjate en que ## Prompt 1 ya está relleno con un prompt de ejemplo. Haz lo mismo con Prompt 2, etc. Guarda cada entrada, sean comandos o prompts. Solo en esta sesión. No rellenes el campo "Qué salió:". Empieza con este y sobrescribe el ejemplo
```

**Qué salió:**

## Prompt 2

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Explora el código del vertical de **cuentas y acceso** (registro, login, sesión, logout y perfil) y reúne evidencia para escribir después una spec de su comportamiento actual. No escribas la spec todavía: detente al entregar la exploración.

**Qué revisar, en las dos capas**

- Registro y login: entradas, validaciones, resultados y errores.
- Sesión: dónde guarda el token el frontend, cómo se restaura al recargar y qué pasa si caduca o deja de ser válido.
- Logout: cómo se activa, qué elimina y adónde lleva.
- Perfil: consulta y modificación, si existen, con sus restricciones.
- Protección: qué hacen los guards y middlewares de autenticación sin token o con un token inválido, aunque protejan otros verticales. No analices lo que hacen esas rutas.
- Validaciones entre capas: para email, contraseña y nombre, compara las reglas y los mensajes del frontend y del backend, y cómo se muestran los errores del servidor.

**Reglas**

- Solo lectura: no modifiques nada ni ejecutes comandos que alteren el proyecto. No propongas mejoras ni correcciones.
- Describe lo que hay hoy, aunque parezca un error. Si no puedes distinguir entre contrato y comportamiento accidental, dilo.
- Distingue lo que leíste en el código de lo que infieres o habría que comprobar ejecutando. Nada de lo que entregues cuenta como comprobado por mí.

**Entrega en el chat**

1. Un mapa breve de los flujos y de cómo conectan frontend y backend.
2. Un inventario agrupado en registro, login, sesión, logout y perfil, con IDs estables (R-01, R-02…) que no cambies en respuestas posteriores. Prioriza el comportamiento relevante para un contrato y agrupa los detalles triviales; no más de 30 entradas. Para cada una:
   - **Condición:** qué lo activa y con qué precondiciones.
   - **Resultado observable:** en la API, método, endpoint, código de estado, forma del cuerpo y texto literal de los errores; en pantalla, mensajes exactos, redirecciones y lo que se ve o se bloquea.
   - **Evidencia:** archivo:línea en las capas que intervengan.
   - **Certeza:** leído en el código / inferido / pendiente de ejecutar. Si no sabes un dato, no lo inventes.
   Marca aparte los detalles internos (por ejemplo, el almacenamiento del token): sirven para auditar, pero no todos serán requisitos.
3. **Pistas para mi revisión**: ambigüedades, anomalías, discrepancias entre capas y dudas sobre contrato frente a accidente, vinculadas a sus IDs.
4. **Cobertura**: qué revisaste y qué quedó pendiente.
```

**Qué salió:**

## Prompt 3

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

````
Escribe la spec del comportamiento actual de **cuentas y acceso** (registro, login, sesión, logout y perfil) a partir del inventario de la exploración. Guárdala en `docs/spec-viva/at.md` (crea la carpeta).

**Qué incluir**

- Solo estos IDs: R-01 a R-13, R-15 a R-20, R-22, R-23 y R-25.
- Fuera: R-14 (caducidad de tokens: no sé si es contrato), R-21 (ausencia de funcionalidad), R-24 (depende del entorno) y R-26 a R-29 (detalles internos).
- Dentro de cada ID, escribe solo lo que marcaste como leído en el código. Lo inferido o pendiente de ejecutar no va como requisito: déjalo fuera y nómbralo en el chat. En concreto, no pongas códigos de estado de éxito que el código no fija (R-01, R-07, R-16).
- Frontend y backend, solo de este vertical. La protección de otras rutas sí entra; lo que hacen esas rutas, no.
- Lo que hace hoy, aunque parezca un error. No inventes escenarios, garantías ni intenciones.
- Si no puedes decidir si algo es contrato o accidente, no lo escribas como requisito: menciónalo en el chat.
- Puedes fusionar varios IDs en un mismo requisito cuando describan una sola regla.

**Formato obligatorio**, en castellano salvo las palabras clave:

```
## Purpose
Una o dos frases sobre para qué existe esta capability.

## Requirements

### Requirement: <título>
El sistema SHALL <comportamiento>.

#### Scenario: <título>
- **WHEN** <acción, con sus precondiciones>
- **THEN** <resultado observable>
```

Sin GIVEN (la precondición va en el WHEN) y sin secciones ADDED, MODIFIED ni REMOVED: esto no es un delta. El archivo solo contiene Purpose y Requirements; la Parte B la escribo yo.

**Solo comportamiento observable**

- Sin nombres de clases, funciones, componentes, archivos, claves de almacenamiento ni librerías. Los endpoints HTTP sí son observables: método, ruta, entradas, código de estado, forma de la respuesta y errores.
- En pantalla: acciones disponibles, mensajes, redirecciones y restricciones.
- Mensajes literales, en su idioma original.

Escribe solo ese archivo: nada de código, configuración, commits ni `openspec init`.

**Entrega en el chat**

1. El total de Requirements y Scenarios escritos.
2. Qué IDs cubre cada requisito.
3. Los IDs o partes de IDs que dejaste fuera, con el motivo.
4. Las dudas que debo comprobar yo. Son pistas, no comprobaciones.
````

**Qué salió:**
