# Prompts

## Nota sobre el uso de ayuda

He utilizado ChatGPT como apoyo para entender el ejercicio y redactar los prompts enviados a Claude Code. Es mi primera experiencia con un harness. He ejecutado los pasos con orientación y he comprobado manualmente que ambas versiones muestran el formulario y el mensaje de credenciales incorrectas. Todavía no comprendo todo el código generado.

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


---

## Prompt 1

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Prepara un harness mínimo para este ejercicio.

Primero lee README.md, frontend/package.json y el código existente para identificar las convenciones reales del proyecto. Comprueba también si ya existe una búsqueda de tareas por título y comunícalo.

Configura dos piezas:
1. Un CLAUDE.md en la raíz con instrucciones breves basadas en las convenciones del proyecto. Incluye que el backend se puede consultar, pero no modificar.
2. Una comprobación automática posterior a las ediciones que ejecute el linter existente del frontend. Si no existe o no puedes configurarla, explica el impedimento sin inventar comandos.

No implementes ninguna funcionalidad todavía ni modifiques la carpeta hermana flowsync-sin-harness.

Al terminar, explica qué archivos has creado, qué hace cada pieza y cómo has comprobado que funciona.
```

**Qué salió:** Creó CLAUDE.md y un hook de lint. Resolvió una incompatibilidad de oxlint entre Windows y WSL sin cambiar package.json ni el lockfile. Las pruebas manuales pasaron; falta verificar el disparo automático del hook.


## Prompt 2

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Comprueba que el hook del harness se dispara automáticamente en esta sesión al editar un archivo del frontend. Haz una prueba temporal y reversible, verifica que Claude recibe el resultado del linter y elimina después el archivo de prueba. No implementes funcionalidades ni modifiques el backend o la carpeta hermana. Confirma también que CLAUDE.md y .claude/settings.json están dentro de la raíz de este repositorio, no en su carpeta padre.
```

**Qué salió:** El hook se disparó automáticamente al crear un archivo con un error de React Hooks. Claude recibió el error, eliminó el archivo de prueba y el lint terminó sin problemas.


## Prompt 3 — Con harness

**Modelo:** Opus 5.5
**Herramienta:** Claude Code
**Carpeta:** flowsync-ai4devs-202610-seniors-I

```
Implementa esta tarea en FlowSync:

Título: Iniciar sesión en FlowSync

Como usuaria, quiero iniciar sesión con mi email y contraseña para acceder a FlowSync.

Criterios de aceptación:
- Puedo introducir mi email y contraseña y enviar el formulario.
- Mientras se procesa la solicitud, se muestra un indicador y se evitan envíos duplicados.
- Si las credenciales son incorrectas, aparece un mensaje claro y puedo reintentarlo.
- Si el acceso es correcto, se muestra una confirmación de sesión iniciada.
```

**Qué salió:** Implementó el formulario de login y la confirmación de acceso. Según el agente, build y lint pasan, no añadió dependencias y no modificó el backend. No realizó una prueba contra el backend real, por lo que la integración queda pendiente de validar. 
Al probarlo desde Windows, el frontend no arrancó por una dependencia nativa de Rolldown. Ejecuté npm ci --include=optional y después pude comprobar el formulario y el mensaje de credenciales incorrectas. El acceso con una cuenta válida sigue pendiente.

## Prompt 4 — Sin harness

**Modelo:** Opus 5.5
**Herramienta:** Claude Code
**Carpeta:** flowsync-sin-harness

```
Implementa esta tarea en FlowSync:

Título: Iniciar sesión en FlowSync

Como usuaria, quiero iniciar sesión con mi email y contraseña para acceder a FlowSync.

Criterios de aceptación:
- Puedo introducir mi email y contraseña y enviar el formulario.
- Mientras se procesa la solicitud, se muestra un indicador y se evitan envíos duplicados.
- Si las credenciales son incorrectas, aparece un mensaje claro y puedo reintentarlo.
- Si el acceso es correcto, se muestra una confirmación de sesión iniciada.
```

**Qué salió:** Implementó el formulario y la confirmación de sesión. Según el agente, TypeScript pasa, pero el build y el servidor de desarrollo quedaron bloqueados por una dependencia nativa de Windows incompatible con WSL. No probó el login en el navegador. Dejó estilos antiguos de la plantilla.
Comprobación manual en Windows: el formulario arranca y muestra el mensaje de credenciales incorrectas. El acceso con una cuenta válida sigue pendiente.