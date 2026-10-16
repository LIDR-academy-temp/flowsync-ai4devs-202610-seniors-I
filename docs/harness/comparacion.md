# Comparación con y sin harness

Tarea: implementar el inicio de sesión en FlowSync.
Herramienta y modelo: Claude Code, Opus 5.5.
Se envió el mismo prompt en dos sesiones nuevas sobre dos copias del proyecto.

| Aspecto | Con harness | Sin harness |
|---|---|---|
| Instrucciones | CLAUDE.md con convenciones y backend de solo lectura | Sin instrucciones adicionales del ejercicio |
| Comprobación automática | Hook posterior a ediciones que ejecuta oxlint | Sin hook añadido |
| Archivos de funcionalidad declarados | 6: auth.ts, LoginForm.tsx, App.tsx, App.css, index.css e index.html | 4: auth.ts, LoginForm.tsx, LoginForm.css y App.tsx |
| Organización | API y formulario separados; actualizó estilos de App.css | API y formulario separados; CSS propio del formulario y estilos antiguos conservados |
| Verificación del agente | Declaró build y lint correctos | Declaró TypeScript correcto; build bloqueado por dependencia nativa de Windows/WSL |
| Prueba manual | Formulario visible y mensaje de credenciales incorrectas | Formulario visible y mensaje de credenciales incorrectas |
| Pendiente | Acceso correcto, indicador durante la petición y bloqueo de envíos duplicados | Las mismas comprobaciones |
| Correcciones de código por mi parte | Ninguna | Ninguna |

Los nombres de los archivos anteriores son relativos a frontend/: auth.ts está en src/api/ y LoginForm.tsx y LoginForm.css en src/components/. Los recuentos proceden de los resúmenes de los agentes, pendientes de contrastar con Git.

Intervenciones: un prompt de configuración y otro de comprobación del harness; un prompt de implementación por sesión, sin mensajes posteriores para corregir la funcionalidad. En la versión con harness tuve que ejecutar manualmente npm ci --include=optional desde Windows para poder arrancar el frontend.

Convenciones: ambas sesiones separaron API y formulario. La sesión con harness declaró haber respetado el backend de solo lectura. No se ha completado una revisión del diff para confirmar todas las reglas o identificar incumplimientos.

Conclusión: ambas versiones mostraron el formulario y el mensaje de credenciales incorrectas. No hay evidencia suficiente para afirmar que una implementación sea mejor. Las diferencias de dependencias entre Windows y WSL limitan la comparación de los resultados de build.

## Tres observaciones

1. Piezas y esfuerzo inesperado: CLAUDE.md y un hook de oxlint; la incompatibilidad de dependencias entre Windows y WSL requirió trabajo adicional.
2. Primera diferencia concreta observada al comparar las respuestas: con harness se declararon build y lint correctos; sin harness solo TypeScript, con build bloqueado. Después, la versión con harness también falló al arrancar en Windows.
3. Instrucción del harness no seguida: no he identificado un incumplimiento confirmado; el hook sí detectó automáticamente el error deliberado de React Hooks en la prueba.