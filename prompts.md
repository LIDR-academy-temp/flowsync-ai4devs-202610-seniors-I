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
Lee el README del ejercicio y las instrucciones del repositorio.

Voy a documentar el comportamiento actual de cuentas y acceso de FlowSync: registro, inicio de sesión, sesión y perfil, tanto en backend como en frontend.

Explora el código y explícame de forma sencilla:
- Qué recorridos existen.
- Qué hace el backend y qué hace el frontend en cada recorrido.
- Qué archivos debo consultar para comprobarlo.
- Qué aspectos no puedes confirmar solo leyendo el código.

No confundas funcionalidades del backlog con comportamiento implementado. No modifiques ningún archivo, no corrijas errores ni inicialices OpenSpec.

Limita la explicación a lo necesario para preparar la spec del ejercicio.
```

**Qué salió:** (opcional, una línea) funcionó a la primera / tuve que insistir / me inventó una ruta que no existe.


## Prompt 2

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Basándote en el código que has explorado y siguiendo el README del ejercicio, crea docs/spec-viva/emf.md.

Documenta únicamente el comportamiento actual de cuentas y acceso: registro, inicio de sesión, sesión y perfil, tanto en backend como en frontend. No añadas funcionalidades del backlog que todavía no estén implementadas.

Utiliza este formato:
- ## Purpose: una o dos frases sobre la finalidad de esta capability.
- ## Requirements
- ### Requirement: [nombre], con una regla redactada usando SHALL.
- Al menos un #### Scenario: por requisito, con dos viñetas:
  - **WHEN** [precondiciones y acción]
  - **THEN** [resultado observable]

Escribe en español, conservando las palabras clave. Incluye las precondiciones dentro de WHEN, sin GIVEN.

Describe solo comportamientos observables: peticiones y respuestas de la API y lo que el usuario ve o puede hacer. No incluyas nombres de clases, archivos ni rutas de código en el cuerpo de la spec. No uses ADDED, MODIFIED ni REMOVED.

No inventes comportamientos. Si algo no está confirmado, déjalo señalado como pendiente.

Debajo de la spec, prepara las tres listas del README:
1. Cuántos requisitos has generado y cuántos he comprobado yo abriendo el código. Cuenta los generados y deja mi cifra pendiente hasta que te la indique.
2. Incoherencias detectadas, una por línea, indicando dónde se observan.
3. Comportamientos que podrían ser un bug o una decisión de diseño, explicando las dos interpretaciones. Señala tus candidatos como pendientes de mi revisión.

No modifiques código ni configuración, no corrijas errores ni inicialices OpenSpec. Solo crea o modifica docs/spec-viva/emf.md.

Al terminar, dime cuántos requisitos has escrito. Después los comprobaré abriendo el código.
```

## Prompt 3

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Vamos a comprobar la spec un requisito cada vez.

Muéstrame el primer requisito y sus escenarios. Indícame los archivos y líneas exactas que debo abrir y explícame de forma sencilla qué debo mirar para confirmar cada comportamiento.

Si el requisito incluye backend y frontend, señala la evidencia de ambas capas.

No modifiques archivos. No lo cuentes como comprobado por mí hasta que yo te confirme que he abierto y revisado el código. Si solo compruebo una parte, quedará como parcial.

Espera mi respuesta antes de pasar al siguiente requisito.
```


## Prompt 4

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
He revisado las rutas, el validador, el controlador de registro, el transformador, el serializador, la configuración de autenticación, el middleware y la migración de usuarios.

La lectura respalda el registro con datos válidos, la creación de usuario y token, la respuesta envuelta en data y la aceptación de fullName: null.

Mantengo pendiente qué ocurre al omitir fullName y el estado HTTP exacto. Por esa duda sobre la palabra «opcional», registra el requisito 1 como parcialmente comprobado, no como completamente comprobado.

Muéstrame el requisito 2 y la evidencia que debo revisar, sin modificar archivos.
```

## Prompt 5

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```text
He revisado el validador de registro, el controlador, la migración y el manejador de excepciones.

He comprobado las reglas de validación y que la validación ocurre antes de crear la cuenta. El manejador de excepciones delega en super.handle; no define explícitamente el estado HTTP ni el cuerpo de los errores.

Registra el requisito 2 como parcialmente comprobado. Quedan pendientes:
- El estado HTTP exacto.
- La estructura de errors y los nombres de regla devueltos.
- El tratamiento de mayúsculas y espacios en el email.

Mantén el requisito 1 también como parcialmente comprobado.

Muéstrame el requisito 3 y los archivos que debo abrir para contrastarlo. Espera mi revisión antes de contarlo como comprobado. No modifiques archivos todavía.
```

**Qué salió:** Claude mantuvo los requisitos 1 y 2 como parcialmente comprobados en la conversación y mostró el requisito 3 y sus referencias de código. No modificó archivos.

## Prompt 6

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```text
Tiempo: han terminado los 45 minutos. Detén el análisis. No leas más código, no ejecutes pruebas ni amplíes o perfecciones la spec.

Conserva el borrador tal como está, incluidas las partes pendientes. Actualiza únicamente las tres listas finales para reflejar el estado alcanzado:

1. Requisitos generados por el agente: 16.
   Requisitos completamente comprobados por mí abriendo el código: 0.

Deja constancia aparte de que los requisitos 1 y 2 están parcialmente comprobados y de que inicié la revisión del requisito 3 sin completarla. Los requisitos 4–16 no se han revisado personalmente.

2. No presentes las 12 incoherencias propuestas por ti como hallazgos confirmados por mí. Consérvalas identificadas como candidatos pendientes de revisión. He identificado una ambigüedad entre «nombre opcional» y admitir fullName:null; sigue pendiente comprobar qué ocurre al omitir la clave.

3. Recoge esta duda apoyada en el controlador que he leído:
En el inicio de sesión se solicita crear un token y no aparece una revocación explícita de tokens anteriores en ese método. Podría ser una decisión para permitir varias sesiones o un control de revocación omitido. No he terminado de revisar el proveedor de tokens ni puedo determinar la intención. No afirmes que he demostrado la validez simultánea de dos tokens.

No me atribuyas otros hallazgos o comprobaciones. Conserva los demás candidatos como pendientes de mi revisión.

No modifiques código ni configuración. No hagas commit, push ni PR. Indícame únicamente qué has actualizado en las listas.
```