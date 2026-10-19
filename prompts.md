# Prompts

Aquí van los prompts que lancé en la **prueba cronometrada** (el mismo ticket en la copia
con harness y en la copia sin harness), en el orden en que los lancé, tal cual, con el
modelo y la herramienta de cada uno.

No incluyo los prompts con los que monté el harness: fueron una conversación larga de
preguntas y confirmaciones fuera de cronómetro (ver Parte B de `docs/harness/comparacion.md`).

---

## Prompt 1 (con harness)

**Modelo:** Opus 5.5, effort Medium
**Herramienta:** Claude Code (VS Code)

```
lanza /priority-ticket
```

**Qué salió:** trajo KAN-4 de Jira, resumió sus 5 criterios, entró solo en plan mode y propuso el plan. Me pidió aprobarlo; lo rechacé (no se aplica en el ejercicio), así que KAN-4 no se movió.

## Prompt 2 (sin harness)

**Modelo:** Opus 5.5
**Herramienta:** Claude Code (VS Code)

```
que esfuerzo usas?
```

**Qué salió:** esfuerzo bajo.

## Prompt 3 (sin harness)

**Modelo:** Opus 5.5
**Herramienta:** Claude Code (VS Code)

```
/model
```

**Qué salió:** mantuvo Opus 5.5 (default).

## Prompt 4 (sin harness)

**Modelo:** Opus 5.5
**Herramienta:** Claude Code (VS Code)

```
/effort medium
```

**Qué salió:** esfuerzo medio, guardado como default para sesiones nuevas.

## Prompt 5 (sin harness)

**Modelo:** Opus 5.5, effort Medium
**Herramienta:** Claude Code (VS Code)

```
qué mcp server tienes conectado?
```

**Qué salió:** solo conectores de claude.ai; nada de Jira.

## Prompt 6 (sin harness)

**Modelo:** Opus 5.5, effort Medium
**Herramienta:** Claude Code (VS Code)

```
lanza /priority-ticket?
```

**Qué salió:** no puedo lanzar /priority-ticket porque no hay ningún skill ni comando con ese nombre.

## Prompt 7 (sin harness)

**Modelo:** Opus 5.5, effort Medium
**Herramienta:** Claude Code (VS Code)

```
Trae el ticket de mayor prioridad asignado a mí en «Por hacer» en Jira, resume
  sus criterios de aceptación, entra en plan mode y propón cómo implementarlo.
  Al aprobar el plan, muévelo a «En curso».
```

**Qué salió:** no puede, no tiene acceso a Jira. Ofreció conectar el MCP, usar la API REST o que le pegara el ticket.

## Prompt 8 (sin harness)

**Modelo:** Opus 5.5, effort Medium
**Herramienta:** Claude Code (VS Code)

```
Descripción

Implementar la autenticación en el frontend, consumiendo el backend de auth ya existente (POST /api/v1/auth/signup, POST /api/v1/auth/login). Usar shadcn/ui para los componentes.

Criterios de aceptación

Pantalla de registro (email+password) que llama a POST /api/v1/auth/signup.

Pantalla de login (email+password) que llama a POST /api/v1/auth/login y guarda el token recibido.

Tras login exitoso: redirige a una vista protegida (p. ej. perfil) que consuma GET /api/v1/account/profile.

Credenciales inválidas en login, o email ya registrado en signup, muestran un mensaje claro — no un error genérico ni de consola.

Enlace de navegación entre login y registro.
```

**Qué salió:** entró en plan mode y propuso el plan (guardado en plan_sinHarness.md). No lo aprobé.