# FlowSync — Prompts utilizados

**Ejercicio:** Harness Engineering · **Herramienta:** Claude Code · **Modelo:** Opus 5.5

## Construcción del harness

### 1. Inicializar el contexto del proyecto

```text
/init
```

**Resultado:** Generado `CLAUDE.md` con el contexto inicial del repositorio; se conservó sin modificar hasta añadir las reglas de proceso.

### 2. Crear `/priority-ticket`

```text
Lee las instrucciones del ejercicio en README.md y crea una skill de proyecto llamada `/priority-ticket`, ubicada en `.claude/skills/priority-ticket/SKILL.md`. La skill debe consultar Jira mediante el MCP Atlassian, localizar el ticket de mayor prioridad asignado al usuario actual y en estado «Por hacer», recuperar su descripción y criterios de aceptación, entrar en Plan Mode y proponer su implementación. Solo después de que el usuario apruebe expresamente el plan debe mover el ticket a «En curso». No ejecutes todavía la skill, no modifiques tickets de Jira ni implementes ninguna funcionalidad del frontend. Limítate a crear la skill y mostrarme el resultado.
```

**Resultado:** Creada la skill `/priority-ticket`. La referencia inicial al estado «Por hacer» tuvo que corregirse posteriormente.

### 3. Corregir el estado de Jira (primer intento)

```text
Revisa la skill /priority-ticket, ubicada en .claude/skills/priority-ticket/SKILL.md. He detectado que la consulta JQL busca los tickets en estado "Por hacer", pero en nuestro proyecto Jira FLOW el estado real se llama "Tareas por hacer". Corrige únicamente esa condición de la consulta JQL para que busque por el nombre correcto del estado. No modifiques el resto de la skill, no la ejecutes y no realices ningún cambio en Jira. Al finalizar, explica brevemente qué has corregido.
```

**Resultado:** Actualizada la consulta JQL para usar «Tareas por hacer», pero la búsqueda siguió sin localizar el ticket.

### 4. Actualizar referencia de estado

```text
Sí, actualiza también esa referencia pendiente a «Tareas por hacer». No modifiques nada más.
```

**Resultado:** Actualizada la referencia pendiente al estado en la skill; el problema de búsqueda continuó.

### 5. Actualizar descripción de la skill

```text
Sí, cambia también el description a «Tareas por hacer»
```

**Resultado:** Actualizada la descripción de la skill; el filtro de estado todavía no recuperaba FLOW-5.

### 6. Crear `/commit`

```text
Quiero crear una skill de proyecto llamada `/commit`, ubicada en `.claude/skills/commit/SKILL.md`, para automatizar la creación de commits siguiendo la convención Conventional Commits.

La skill debe analizar los cambios que ya están preparados en el área de staging mediante `git diff --cached`, proponer un mensaje de commit coherente con esos cambios y realizar el commit solo con los archivos preparados. No debe incluir cambios que no estén en staging ni realizar un push.

Por ahora crea únicamente la skill y explícame su funcionamiento. No la ejecutes ni realices ningún commit.
```

**Resultado:** Creada la skill `/commit` para realizar Conventional Commits a partir de los cambios preparados en staging; no se ejecutó.

### 7. Crear `adversarial-reviewer`

```text
Quiero que crees un subagente de proyecto llamado `adversarial-reviewer` para revisar Pull Requests de forma adversarial.

Su función será buscar problemas, defectos, errores de lógica, riesgos y casos límite que puedan romper la implementación. Debe revisar el código y los cambios con espíritu crítico, justificar sus hallazgos y proponer recomendaciones concretas.

El subagente debe trabajar en modo de solo lectura: no puede modificar archivos ni corregir directamente el código. Por ahora, limítate a crearlo y explícame cómo funcionará; no ejecutes ninguna revisión.
```

**Resultado:** Creado el subagente `adversarial-reviewer` para revisar PR de forma crítica y sin modificar archivos; no se ejecutó.

### 8. Configurar hook de Prettier

```text
Quiero que configures un hook de proyecto en Claude Code utilizando el evento PostToolUse, de manera que ejecute automáticamente Prettier después de que el agente cree o modifique archivos dentro de frontend/src/**. Antes de configurarlo, comprueba si Prettier está instalado en frontend/. Si no lo está, instálalo en ese proyecto. El hook debe actuar exclusivamente sobre los archivos afectados dentro de frontend/src/**, sin formatear ni modificar archivos del backend u otras áreas del repositorio. No modifiques el código funcional de la aplicación ni ejecutes la implementación del ticket de Jira. Al finalizar, explícame brevemente qué has configurado y cómo funciona.
```

**Resultado:** Instalado Prettier en el frontend y configurado el hook `PostToolUse` para los archivos editados bajo `frontend/src/**`.

### 9. Añadir reglas de proceso a `CLAUDE.md`

```text
Quiero que añadas al final del archivo `CLAUDE.md` unas reglas de proceso que definan el flujo de trabajo que debe seguir Claude Code al desarrollar una funcionalidad.

Actualmente tenemos configuradas varias capacidades, como la skill `/commit`, el subagente `adversarial-reviewer` y el hook de Prettier. El objetivo es que estas capacidades trabajen de manera coordinada.

Las reglas deben establecer el siguiente procedimiento:

1. Crear una nueva rama de Git antes de modificar el código.
2. Una vez finalizada la implementación, utilizar la skill `/commit` para confirmar los cambios.
3. Crear un Pull Request utilizando `gh pr create`.
4. Ejecutar el subagente `adversarial-reviewer` para realizar una revisión adversarial del Pull Request.
5. Al finalizar el proceso, responder en el chat únicamente con la URL del Pull Request.

Añade estas instrucciones exclusivamente al final de `CLAUDE.md`, conservando íntegramente el contenido generado inicialmente mediante `/init`.

Por ahora, limítate a definir las reglas. No ejecutes el procedimiento, no crees ramas, commits ni Pull Requests, y no modifiques otros archivos.

Al finalizar, explícame brevemente qué reglas has añadido.
```

**Resultado:** Añadidas las reglas al final de `CLAUDE.md`, conservando el contenido inicial. El flujo completo no se ejecutó.

### 10. Crear enlace simbólico `AGENTS.md`

```text
Ahora crea el enlace simbólico `AGENTS.md` que apunte a `CLAUDE.md`, tal como indica el README del ejercicio. No dupliques el contenido del archivo.

Comprueba que el enlace se ha creado correctamente.
```

**Resultado:** Creado y comprobado `AGENTS.md` como enlace simbólico a `CLAUDE.md`, sin duplicar su contenido.

## Ejecución CON harness

### 11. Ejecutar `/priority-ticket` (primer intento)

```text
/priority-ticket
```

**Resultado:** La búsqueda en Jira no encontró FLOW-5 por el filtro de estado; no se modificaron el ticket ni el código.

### 12. Diagnosticar la búsqueda de Jira

```text
La skill `/priority-ticket` no encuentra el ticket FLOW-5, aunque en Jira está asignado a mi usuario y figura como una tarea pendiente.

Investiga el problema consultando Jira mediante el MCP Atlassian. Comprueba los valores reales del estado y realiza consultas JQL de solo lectura para identificar por qué no aparece el ticket. No cambies todavía la skill, no modifiques ninguna tarea de Jira ni implementes código. Explícame la causa y la corrección necesaria.
```

**Resultado:** Identificado que Jira reconoce el estado `To Do` y su categoría `To Do`, no la etiqueta traducida usada en la consulta.

### 13. Corregir la consulta JQL

```text
Corrige la consulta JQL de la skill `/priority-ticket` para que filtre por la categoría de estado de Jira `To Do` en lugar del texto traducido `Tareas por hacer`.

Conserva la búsqueda de tickets asignados al usuario actual y la ordenación por prioridad descendente y fecha de creación ascendente. Modifica únicamente lo necesario en la skill. No la ejecutes, no cambies tickets de Jira ni implementes código. Al finalizar, muéstrame la consulta JQL definitiva.
```

**Resultado:** Corregida la JQL a `assignee = currentUser() AND statusCategory = "To Do" ORDER BY priority DESC, created ASC`.

### 14. Ejecutar `/priority-ticket` (segundo intento)

```text
/priority-ticket
```

**Resultado:** Recuperado FLOW-5 y generado el plan CON harness. No se aprobó el plan, ni se implementó código, ni se cambió el estado del ticket.

## Ejecución SIN harness

### 15. Ejecutar el encargo SIN harness

```text
Consulta en Jira, mediante el MCP Atlassian, el ticket de mayor prioridad asignado a mi usuario que se encuentre pendiente (categoría de estado «To Do»).

Recupera su descripción y criterios de aceptación y preséntame un resumen.

Después, entra en Plan Mode, analiza el repositorio y propón un plan de implementación para cumplir los criterios de aceptación del ticket.

No modifiques ningún archivo, no cambies el estado del ticket en Jira y no implementes el plan sin mi aprobación.
```

**Resultado:** Recuperado FLOW-5 mediante Atlassian y generado el plan SIN harness, sin intervenciones adicionales ni implementación.
