## Prompt 1

**Modelo:** Opus 5.5 xHigh
**Herramienta:** Claude Code

```
- Antes de tocar código, mira en qué rama estás.
  - La rama es por unidad de trabajo, no por petición.
  - Si ya estás en una rama de trabajo (cualquiera que no sea main ni sN/*), sigue en ella y no crees otra.
  - Nunca commitear directo en main ni en una sN/*.
  - Un commit por petición: al cerrar cada petición, usa la skill /commit.
  - Un cambio que toque rutas, controladores, validadores o transformers de una capability va en el mismo commit que:
    - el documento OpenAPI al día, que se commitea como el diff regenerado de .adonisjs/
    - el README de la capability al día, en docs/capabilities/<nombre>/README.md
  - Crea el PR con gh pr create, con una descripción completa de los cambios en el cuerpo.
  - El PR se abre una sola vez, al terminar la unidad de trabajo, no al cerrar cada petición.
  - Después de crear el PR, pasa el subagente adversarial-reviewer una sola vez sobre ese PR.
  - El review adversarial es lo último antes de dar la unidad por terminada.
  - Al abrir el PR, no repitas el resumen en el chat: responde solo con la URL del PR (la sesión se pierde, el PR no).
```

**Qué salió:** (opcional, una línea) funcionó a la primera / tuve que insistir / me inventó una ruta que no existe.

Entendido, acc. Estamos en auditoria-acc, que ya es una rama de trabajo, así que sigo en ella y no creo otra.

Antes de arrancar quiero aclarar una cosa del README. Tus instrucciones dicen docs/capabilities/acc/README.md, pero la regla del CLAUDE.md es docs/capabilities/<nombre>/README.md, donde <nombre> es la capability que se toca. Ahora mismo solo existe docs/capabilities/tasks/. Me da la impresión de que "acc" (tus iniciales) se coló en el hueco de <nombre>. Mientras no me digas lo contrario, voy a actualizar el README de la capability que toque de verdad, por ejemplo docs/capabilities/tasks/README.md, y no voy a crear una carpeta acc/. Si lo de acc/ va en serio, dímelo.

Resumen de cómo voy a trabajar en esta unidad:

Un commit por petición, siempre con /commit.
Si toco rutas, controladores, validadores o transformers, ese mismo commit lleva el diff regenerado de .adonisjs/ y el README de la capability al día.
Al terminar la unidad: un único gh pr create con una descripción completa. Después, una sola pasada del adversarial-reviewer sobre ese PR, como último paso.
En el chat solo te pasaré la URL del PR.

## Prompt 2

**Modelo:** Opus 5.5 xHigh
**Herramienta:** Claude Code

En este momento estes seguro de que tengas acceso 
al historial de git logs, despues, 
resume los ultimos 15 commits ejecutados
no modifiques ningun archivo, 
esto es una auditoria, no un arreglo.

**Qué salió:** (opcional, una línea) funcionó a la primera / tuve que insistir / me inventó una ruta que no existe.

Listo los 15 commits junto con una pequea descripcion.

