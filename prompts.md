
# Prompts

Aquí van todos los prompts que lancé durante el ejercicio, en el orden en que los fui usando, junto con el modelo y la herramienta.

## Prompt 1

**Modelo:** Opus 4.8  
**Herramienta:** Claude Code

```text
Acceso de usuario y dashboard inicial

Como usuario de FlowSync quiero poder iniciar sesión y, una vez dentro, acceder a un dashboard inicial donde pueda identificar mi cuenta y gestionar opciones básicas de usuario.

Criterios de aceptación:

El usuario debe poder iniciar sesión con correo y contraseña.

Después de iniciar sesión debe acceder a un dashboard inicial.

El dashboard debe tener una navegación principal visible.

Debe mostrarse el nombre del usuario en una zona visible.

Al acceder a las opciones del usuario debe poder ver al menos perfil, configuración y cerrar sesión.

Al cerrar sesión debe regresar a la pantalla de acceso.
```

**Qué salió:**  
La corrida con harness sí empezó a trabajar en el frontend, modificó varios archivos, hizo pruebas y llegó a ejecutar revisiones antes de terminar.

## Prompt 2

**Modelo:** Opus 4.8  
**Herramienta:** Claude Code

```text
Usa el revisor que configuré para revisar los cambios que acabas de hacer.
```

**Qué salió:**  
El revisor encontró varios puntos por corregir y el agente hizo ajustes después de esa revisión.

## Prompt 3

**Modelo:** Opus 4.8  
**Herramienta:** Claude Code

```text
Acceso de usuario y dashboard inicial

Como usuario de FlowSync quiero poder iniciar sesión y, una vez dentro, acceder a un dashboard inicial donde pueda identificar mi cuenta y gestionar opciones básicas de usuario.

Criterios de aceptación:

El usuario debe poder iniciar sesión con correo y contraseña.

Después de iniciar sesión debe acceder a un dashboard inicial.

El dashboard debe tener una navegación principal visible.

Debe mostrarse el nombre del usuario en una zona visible.

Al acceder a las opciones del usuario debe poder ver al menos perfil, configuración y cerrar sesión.

Al cerrar sesión debe regresar a la pantalla de acceso.
```

**Qué salió:**  
La corrida sin harness revisó el proyecto y entró en modo de planificación. Me pidió decidir cómo resolver el tema de la cuenta de usuario y, como no debía rescatar esa copia, no respondí. Cuando terminó el tiempo no había modificado archivos.