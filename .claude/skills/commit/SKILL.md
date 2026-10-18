---
name: commit
description: "Genera un mensaje de commit convencional (`tipo(scope): descripción`) en español a partir de los cambios preparados (staged) con git, lo propone al usuario y ejecuta `git commit` solo cuando lo aprueba. Úsala siempre que el usuario quiera hacer commit, pida \"commitea esto\", \"haz el commit\", \"escríbeme el mensaje de commit\", \"qué mensaje le pongo\", \"guarda estos cambios en git\" o invoque /commit, aunque no mencione Conventional Commits ni la palabra \"staged\"."
---

# commit

Convierte los cambios preparados (staged) en un commit convencional en español, con el formato `tipo(scope): descripción`. El objetivo es un historial que se lea bien y que herramientas como changelogs o versionado semántico puedan interpretar, así que el mensaje debe describir con precisión lo que realmente cambió, no lo que el usuario cree que cambió.

## Flujo

1. **Revisa qué hay preparado.** Ejecuta `git diff --cached --stat` y `git diff --cached`. Trabaja solo sobre lo preparado: eso es lo que entrará en el commit. Si el diff es muy grande, apóyate en `--stat` y lee los archivos más relevantes en lugar de todo.

2. **Si no hay nada preparado, detente.** Dilo claramente y muestra `git status --short` para que el usuario vea qué cambios sin preparar existen. No ejecutes `git add` ni ofrezcas preparar todo: decidir qué entra en un commit es del usuario, y preparar de más mezcla cambios que quizá quería separar.

3. **Elige el tipo** según el efecto del cambio:
   - `feat`: nueva funcionalidad visible para quien usa el código
   - `fix`: corrige un error
   - `docs`: solo documentación
   - `style`: formato, espacios, punto y coma; sin cambio de lógica
   - `refactor`: reestructura sin cambiar comportamiento ni corregir errores
   - `perf`: mejora de rendimiento
   - `test`: agrega o ajusta pruebas
   - `build`: sistema de build o dependencias
   - `ci`: configuración de integración continua
   - `chore`: mantenimiento que no encaja en lo anterior
   - `revert`: revierte un commit anterior

   Si el diff mezcla varios tipos, usa el que mejor describa el cambio principal. Si de verdad son cambios independientes (por ejemplo un fix y una feature sin relación), menciónalo y sugiere separarlos en dos commits, pero respeta lo que el usuario decida.

4. **Elige el scope** a partir de las rutas tocadas: el módulo, paquete o área común (por ejemplo `src/auth/*` → `auth`, `packages/api/*` → `api`). Usa minúsculas y una sola palabra corta. Si los cambios abarcan varias áreas sin un denominador común claro, omite el scope (`tipo: descripción`); un scope forzado confunde más que ayuda.

5. **Redacta la descripción** en español:
   - Verbo en presente, tercera persona: "agrega", "corrige", "elimina", "actualiza"
   - Minúscula al inicio, sin punto final
   - Línea completa (`tipo(scope): descripción`) de 72 caracteres o menos
   - Concreta: qué cambia, no "varios cambios" ni "actualizaciones"

6. **Añade cuerpo solo si aporta.** Para cambios triviales (un typo, renombrar una variable, subir una versión) basta la línea de asunto. Si el cambio es no trivial, agrega una línea en blanco y un cuerpo breve que explique el *porqué* y cualquier efecto no evidente en el diff. Ajusta las líneas del cuerpo a unos 72 caracteres.

7. **Cambios incompatibles.** Si el diff rompe compatibilidad (elimina o renombra una API pública, cambia un formato de datos, cambia el comportamiento por defecto), agrega `!` tras el tipo/scope y un pie `BREAKING CHANGE: <explicación>`.

8. **Propón y espera aprobación.** Muestra el mensaje completo en un bloque de código junto con la lista de archivos que entrarán. Pregunta si lo confirma o quiere ajustes. No ejecutes el commit hasta tener un sí explícito.

9. **Haz el commit.** Con la aprobación, ejecuta `git commit` pasando el mensaje exacto (usa `-F` con un archivo temporal o varios `-m` para conservar las líneas en blanco). Después muestra el resultado (`git log -1 --oneline`). Si un hook de pre-commit falla, muestra el error y no intentes saltarlo con `--no-verify`.

## Ejemplos

**Cambio simple:**
```
fix(auth): corrige la expiración del token al renovar la sesión
```

**Con cuerpo:**
```
feat(api): agrega paginación al listado de pedidos

El endpoint devolvía todos los pedidos en una sola respuesta y se
volvía lento con cuentas grandes. Ahora acepta `page` y `limit`,
con 50 resultados por defecto.
```

**Sin scope (cambios en varias áreas):**
```
chore: actualiza dependencias de desarrollo
```

**Cambio incompatible:**
```
refactor(config)!: renombra `apiUrl` a `baseUrl` en la configuración

BREAKING CHANGE: las configuraciones existentes deben usar `baseUrl`;
`apiUrl` ya no se reconoce.
```