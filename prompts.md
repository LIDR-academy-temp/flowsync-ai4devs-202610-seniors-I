# Prompts — práctica spec viva (módulo 3 FlowSync)

Herramienta en todos los prompts: **Claude Code** (confirmado). Modelo según el entorno de la sesión: **Claude Opus 4.8** (`claude-opus-4-8`); se puede confirmar el modelo actual de la sesión, pero no verificar turno a turno que no cambiara. Por eso cada prompt lo marca con "— ver nota".

---

## Prompt 1

**Modelo:** Claude Opus 4.8 (`claude-opus-4-8`) — ver nota
**Herramienta:** Claude Code

```
Claude vamos a empezar con el ejercicio del modulo 3 de FlowSync.

Primero quiero que revises como funciona actualmente todo lo relacionado con las cuentas y el acceso de usuarios.

Revisa tanto el backend como el frontend, quiero saber como funciona el registro, inicio de sesion, manejo de sesiones, perfil de usuario y proteccion de rutas.

Usa un subagente Explore para revisar el codigo y explicame que cosas ya funcionan y si encuentras alguna inconsistencia.

Por ahora no modifiques ningun archivo ni generes la spec. Primero quiero revisar lo que encontraste y saber en que archivos te basaste.

Si algo no esta claro o no se puede comprobar en el codigo, dimelo en lugar de suponerlo.
```

**Qué salió:** lanzó dos subagentes Explore (backend y frontend) y devolvió el informe con rutas de archivo e inconsistencias, sin tocar nada.

---

## Prompt 2

**Modelo:** Claude Opus 4.8 (`claude-opus-4-8`) — ver nota
**Herramienta:** Claude Code

```
Ya revise lo que encontraste. Antes de hacer la spec quiero que me confirmes dos cosas que quedaron pendientes.

Primero revisa si realmente funciona la validacion para que no se puedan registrar dos cuentas con el mismo correo.

Segundo confirma los codigos HTTP que devuelve el backend cuando hay errores de registro, login o cuando alguien intenta entrar sin estar autenticado.

Revisa el codigo y si hace falta haz pruebas sin modificar archivos. Dime que pudiste confirmar y que sigue sin estar claro.

Todavia no generes la spec ni corrijas los problemas que encontraste.
```

**Qué salió:** confirmó la regla de correo único (registrada por el provider de Lucid) y los códigos 422/400/401 leyendo las clases de excepción del framework.

---

## Prompt 3

**Modelo:** Claude Opus 4.8 (`claude-opus-4-8`) — ver nota
**Herramienta:** Claude Code

```
Bien, con esto ya tenemos mas claro como funciona el modulo de cuentas y acceso.

Ahora quiero que me ayudes a crear la spec viva de lo que ya existe en FlowSync, usando todo lo que revisamos del backend y frontend.

Guardala en docs/spec-viva/fc.md

Quiero que este en español y que explique lo que realmente hace el sistema, no lo que deberia hacer en un futuro.

Usa el formato de OpenSpec con Purpose, Requirements y Scenario. Cada requisito debe tener SHALL y sus escenarios WHEN y THEN.

Incluye registro, login, logout, sesiones, perfil y proteccion de rutas.

No pongas nombres de archivos ni clases dentro de los requisitos, quiero que se entienda el comportamiento desde el punto de vista del usuario y de la API.

No uses ADDED, MODIFIED ni REMOVED porque no estamos proponiendo cambios.

Al final agrega las tres listas que pide el ejercicio:
1. Cuantos requisitos generaste y cuantos he comprobado realmente revisando el codigo.
2. Las inconsistencias que encontramos y donde aparecen.
3. Los comportamientos que no sabemos si son errores o decisiones del sistema, explicando ambas posibilidades.

No marques como comprobado por mi algo que solo revisaste tu. Si no tienes ese dato dejalo pendiente.

No modifiques el codigo ni corrijas los problemas encontrados. Tampoco hagas commit todavia.

Primero genera el archivo y muestrame como quedo para revisarlo.
```

**Qué salió:** generó `docs/spec-viva/fc.md` con 8 requisitos en formato OpenSpec y las tres listas, dejando pendiente la comprobación personal.

---

## Prompt 4

**Modelo:** Claude Opus 4.8 (`claude-opus-4-8`) — ver nota
**Herramienta:** Claude Code

```
Claude ya revise la spec que generaste y quiero hacer una revision antes de darla por buena.

Primero confirma que todos los requisitos tengan el formato correcto que pide el ejercicio, con SHALL, Scenario, WHEN y THEN.

Tambien revisa si hay escenarios repetidos y eliminalos si es necesario.

No quiero que agregues funcionalidades ni cosas que no encontramos en el codigo.

En la parte de las tres listas deja claro que generaste 8 requisitos, pero que yo todavia no he comprobado personalmente esos 8 contra el codigo.

Las inconsistencias y comportamientos que no sabemos si son errores o decisiones quiero conservarlos porque son parte importante del ejercicio.

Corrige solamente el documento docs/spec-viva/fc.md y despues dime que requisitos me recomiendas comprobar personalmente y en que archivos debo revisar cada uno.

No modifiques codigo ni hagas commit todavia.
```

**Qué salió:** confirmó el formato, eliminó dos escenarios repetidos, aclaró la lista 1 y recomendó qué requisitos comprobar y en qué archivos.

---

## Prompt 5

**Modelo:** Claude Opus 4.8 (`claude-opus-4-8`) — ver nota
**Herramienta:** Claude Code

```
Claude vamos a actualizar la primera lista del ejercicio.

Ya revise personalmente estos tres archivos:
- backend/app/validators/user.ts
- backend/app/controllers/new_account_controller.ts
- backend/app/models/user.ts

Pude comprobar las reglas del correo, la longitud de la contraseña, su confirmacion, la creacion del usuario y del token, y que el modelo utiliza withAuthFinder(hash).

Esto corresponde al requisito 1, pero no revise todos sus escenarios ni hice pruebas de ejecucion.

Actualiza docs/spec-viva/fc.md con estos datos:
- 8 requisitos generados.
- 0 requisitos verificados completamente por mi.
- 1 requisito revisado parcialmente, el de registro.
- Los otros 7 siguen pendientes.

Deja claro que Claude hizo la exploracion general y que mi comprobacion fue una lectura directa de esos tres archivos.

No cambies los requisitos ni las listas de inconsistencias y dudas.
No modifiques codigo y no hagas commit todavia.

Al terminar dime que actualizaste.
```

**Qué salió:** actualizó solo la lista 1 (requisito 1 como "Parcial", el resto pendiente), sin tocar requisitos ni las otras listas.

---

## Prompt 6

**Modelo:** Claude Opus 4.8 (`claude-opus-4-8`) — ver nota
**Herramienta:** Claude Code

```
Ahora quiero preparar el archivo prompts.md para entregar el ejercicio.

Necesito guardar los prompts que te envie durante esta sesion, en el orden original y exactamente como los escribi, incluyendo errores de escritura y saltos de linea.

Usa el historial real de nuestra sesion. No inventes prompts, no los resumas y no corrijas su redaccion.

En cada uno indica la herramienta Claude Code y el modelo utilizado, pero solo si lo puedes confirmar.

Si algun prompt no se puede recuperar exactamente, señalalo como pendiente en vez de reconstruirlo.

Guarda el resultado en prompts.md y muestrame cuantos prompts pudiste recuperar completos.

No modifiques ningun otro archivo ni hagas commit.
```

**Qué salió:** creó `prompts.md` con los 6 prompts recuperados y la nota de los turnos no incluidos.

---

## Nota sobre el historial (pendiente de confirmación)

Durante la sesión llegaron dos turnos cuyo contenido pegado era un **eco de la salida anterior de Claude** (buffer de la terminal), no prompts escritos por el usuario. No se incluyen como prompts ni se reconstruyen. Si en realidad eran prompts intencionados, habría que recuperarlos del historial de la terminal y añadirlos.
