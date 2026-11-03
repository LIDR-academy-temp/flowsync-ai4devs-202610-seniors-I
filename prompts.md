# Prompts

Todos los prompts que lancé en el ejercicio, en orden y tal cual (registrados automáticamente con un hook `UserPromptSubmit`). He quitado una notificación interna de Claude Code (un proceso en segundo plano que terminó) que el hook registró pero no es un prompt mío.

---

## Prompt 1

**Hora:** 13:35  
**Modelo:** Opus 5.5 (claude-opus-5-5)  
**Herramienta:** Claude Code

```
Antes de escribir nada, dame un mapa sobre el vertical de cuentas y acceso, tanto en el backend como en el frontend, todo, rutas, que se valida, vistas, donde se guarda las sesiones, guards a las rutas. Aun no cambiamos codigo, quiero un mapa para saber con que trabajar
```

**Qué salió:** Mapa del vertical en back y front (rutas, validaciones, middlewares, pantallas, sesión) y una lista de 10 huecos sin comprobar.

## Prompt 2

**Hora:** 13:42  
**Modelo:** Opus 5.5 (claude-opus-5-5)  
**Herramienta:** Claude Code

```
Antes de empezar nada, en base a este mapa, escribeme en docs/spec-viva/ab.md la spec poniendo todo lo que el sistema hace a dia de hoy en cuentas y acceso, backend y front. El formato es el siguiente: ## Purpose (1-2 frases), ## Requirements, ### Requirement: con SHALL, y al menos un #### Scenario: con - **WHEN** y - **THEN**. En castellano. Solo comportamiento observable: petición y respuesta en la API, y lo que ve y hace la persona en pantalla. Nada de nombres de clase, archivo, ruta de código ni almacenamiento interno. Nada de ADDED/MODIFIED/REMOVED. Tienes que describir lo que el sistema hace hoy. Al terminar dime cuántos requisitos has puesto
```

**Qué salió:** Escribió la spec con 20 requisitos (12 de API, 8 de web). Avisó de que lo del email en mayúsculas no lo había comprobado.

## Prompt 3

**Hora:** 13:42  
**Modelo:** Opus 5.5 (claude-opus-5-5)  
**Herramienta:** Claude Code

```
no crees nuevas ramas ni cambies codigo
```

**Qué salió:** Confirmó que no creó ramas ni tocó código; solo el fichero nuevo, sin commit. Se me había olvidado en el prompt anterior.

## Prompt 4

**Hora:** 13:46  
**Modelo:** Opus 5.5 (claude-opus-5-5)  
**Herramienta:** Claude Code

```
mira si puedes probar contra el servidor que esta levantado el problema que comentas de que el email distingue mayusculas y minusculas. cuando tengas el resultado me lo dices y si has detectado algo raro en las peticiones y/o en las respuestas
```

**Qué salió:** No pudo: el backend no estaba levantado. No lo arrancó por no cambiar ficheros generados y me pidió permiso.

## Prompt 5

**Hora:** 13:47  
**Modelo:** Opus 5.5 (claude-opus-5-5)  
**Herramienta:** Claude Code

```
si, puedes arrancarlo tu en segundo plano y haz la prueba, comprueba que el levantarlo no cambie ningun archivo
```

**Qué salió:** Probó contra el servidor: el email distingue mayúsculas (se pueden crear dos cuentas). Comprobó también 400, 401, logout e iniciales, y listó 8 cosas raras en las respuestas. git status limpio.

## Prompt 6

**Hora:** 13:51  
**Modelo:** Opus 5.5 (claude-opus-5-5)  
**Herramienta:** Claude Code

```
enseñane las lineas de codigo que cumplen los requisitos, pantallas, redirecciones y avisos. No añadas aun las cosas raras a la spec. Abreme el navegador para que lo pueda comprobar
```

**Qué salió:** Me enseñó las líneas de redirecciones, sesión recordada y avisos, y me abrió FlowSync en Chrome. Lo probé yo: redirecciones, recarga, perfil y cerrar sesión.

## Prompt 7

**Hora:** 13:58  
**Modelo:** Opus 5.5 (claude-opus-5-5)  
**Herramienta:** Claude Code

```
he hecho login, he cambiado a mano el token y me aparece el mensaje de que el token ha caudcado peo los tokens se supone que no caducan. asi que deberia ser un token invalido o revocado
```

**Qué salió:** Confirmó que el aviso de «sesión caducada» sale ante cualquier 401 aunque los tokens no caduquen. Propuso arreglarlo; no lo hice.

## Prompt 8

**Hora:** 14:04  
**Modelo:** Opus 5.5 (claude-opus-5-5)  
**Herramienta:** Claude Code

```
no lo apuntes, lo dejaremos para otra sesion. para el servidor y añade unicamente el texto en docs/spec-viva/ab.md: 

## Parte B

1. Requisitos: el agente escribió 20 y yo he comprobado 13. Los de la API los probamos con peticiones contra el servidor y los de pantalla los probé yo en el navegador. Me faltaron las validaciones, las pantallas de login y registro y los mensajes de error de los formularios.

2. Incoherencias:
- El logout devuelve un message suelto, el resto de respuestas van dentro de data.
- En el registro la contraseña tiene que tener entre 8 y 32 caracteres, pero en el login acepta una de 1000 sin decir nada.
- La misma cuenta devuelve el createdAt con milisegundos en el registro y sin ellos en el login y el perfil.

3. Bug o contrato:
- El email distingue mayúsculas: si me registro con minúsculas y entro con mayúsculas no me deja, y puedo crear otra cuenta con el mismo email cambiando mayúsculas. Puede ser un bug porque alguien se puede quedar fuera o duplicar la cuenta, o puede ser que se quiera guardar el email tal cual se escribe.
- Cambié el token a mano en el navegador y me salió "Tu sesión ha caducado", pero los tokens no caducan. No sé si es un texto genérico puesto a propósito para el usuario o si es un error porque realmente el token es inválido, no caducado. Que los tokens no caducan tampoco lo pude comprobar porque habría que esperar.
```

**Qué salió:** Paró los servidores y añadió la parte B al final de la spec.
