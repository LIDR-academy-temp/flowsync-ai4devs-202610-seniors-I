# Prompts — Módulo 5

## Prompt 1

**Modelo:** Claude Opus 5.5
**Herramienta:** Claude Code

````text

cat > prompts.md <<'EOF'
# Prompts — Módulo 5

## Prompt 1

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```text
Actúa como auditor de las reglas de proceso del proyecto FlowSync.

Objetivo:
Auditar las reglas de la sección "Reglas de proceso" de CLAUDE.md, contrastándolas con los últimos 15 commits de la rama actual y el estado del repositorio.

Instrucciones:
1. Identifica todas las reglas de proceso.
2. Consulta los últimos 15 commits y sus cambios relevantes.
3. Contrasta cada regla con evidencias verificables.
4. No supongas que una regla se cumple solo porque esté escrita.
5. Si no existen evidencias suficientes, indícalo expresamente.
6. No modifiques ningún archivo, no ejecutes commits, no crees ramas y no corrijas los problemas encontrados.

Devuélveme una tabla con cinco columnas:
- Qué pide la regla.
- Qué comando o archivo consultaste.
- Veredicto: se cumple / no se cumple / no se puede comprobar con lo que hay.
- Evidencia concreta.
- Recomendación: dejarla / borrarla / bajarla a un mecanismo automático.

No inventes evidencias. Identifica los commits o archivos que justifiquen tus conclusiones.

Trabaja exclusivamente en modo lectura.

````

**Qué salió:** Auditoría realizada en modo lectura; se detectaron limitaciones de evidencia.
