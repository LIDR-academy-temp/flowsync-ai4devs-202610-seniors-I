
## Prompt 1

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Este es el ejemplo. Bórralo.
Quiero que explores como funciona la parte de registro de usuarios y acceso en flowsync. Esto incluye la autorizacion y autenticacion de los usuarios en cada endpoint.
```

**Qué salió:** el agente me explico todos los endpoints y como funcionaba el registro, tokens, validacion, autorizacion.

---

## Prompt 2

**Modelo:** Opus 5.5
**Herramienta:** Claude Code (otra sesión)

```
Crear la spec viva de lo que ya existe en FlowSync, usando todo lo que revisamos del backend y frontend.

Guardala en docs/spec-viva/aaron-chock.md
Lo haces en español y que comentes lo que hace el sistema, no lo que deberia hacer en tu criterio.

Usa el formato de OpenSpec con Purpose, Requirements y Scenario. Cada requisito debe tener SHALL y sus escenarios WHEN y THEN.

Reglas:
1. Nada de secciones ADDED/MODIFIED/REMOVED.
2. Solo comportamiento observable: en la API, petición y respuesta (códigos
   HTTP, campos); en pantalla, lo que la persona ve y puede hacer. Ni nombres
   de clases, ni de archivos, ni rutas de código dentro de la spec.
3. No modifiques ningún archivo salvo el de la spec.

Cuando termines, dame en el chat (no en el archivo) una tabla con cada
requisito y el archivo:línea donde lo viste, para poder comprobarlo yo.
Y señala aparte cualquier cosa que te haya parecido incoherente o dudosa
entre backend y frontend.
```

**Qué salió:** confirmó el formato, sobrescribio ocho escenarios, aclaró la lista 1 y recomendó qué requisitos comprobar y en qué archivos.

---

## Prompt 3

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
dame ya la tabla mientras termina la revisión
```

**Qué salió:** me dio la tabla requisito → archivo:línea y 9 incoherencias o dudas entre backend y frontend.

---

## Prompt 4

**Modelo:** Opus 5.5
**Herramienta:** Claude Code (otra sesión)

```
comprueba caducidad de tokens
```

**Qué salió:** al terminar la revisión hizo cambios en el archivo dentro del folder spec-viva corrigiendo sus errores.

---

## Prompt 5

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
comprueba con la autenticación por token
```

**Qué salió:** lo comprobamos leyendo el código y probando el validador que exige que la clave fullName este presente. Cambio de nuevo el archivo de spec.

---

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
/commit
```

**Qué salió:** commit de archivos, y push a mi fork.

---

## Prompt 6

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
abre el PR 
```

**Qué salió:** abrió el PR de entrega.

---

