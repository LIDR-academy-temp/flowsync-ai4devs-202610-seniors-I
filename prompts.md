# Prompts

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

Borra el ejemplo de abajo cuando escribas el primero.

---

## Prompt 0

**Modelo:** DeepSeek v4.1 flash free
**Herramienta:** Open Code

```
Este es el ejemplo. Bórralo.

El prompt va aquí dentro, entero y con sus saltos de línea,
para que se sepa dónde empieza y dónde acaba.
```

**Qué salió:** (opcional, una línea) funcionó a la primera / tuve que insistir / me inventó una ruta que no existe.

---

## Prompt 1

**Modelo:** DeepSeek v4.1 flash free
**Herramienta:** Open Code

```
Actúa como analista de producto técnico. Tu única tarea es leer el vertical de cuentas y acceso de FlowSync y escribir la spec viva del comportamiento que YA existe hoy. No vas a implementar, corregir, refactorizar ni proponer cambios.

## Objetivo
Crear `docs/spec-viva/ICBE.md` con la verdad actual de la capability "cuentas y acceso", en formato OpenSpec, cubriendo las dos capas: API (petición/respuesta) y pantalla (lo que la persona ve y puede hacer).

## Fuentes que debes leer
Backend:
- backend/start/routes.ts
- backend/start/kernel.ts
- backend/app/controllers/new_account_controller.ts
- backend/app/controllers/access_tokens_controller.ts
- backend/app/controllers/profile_controller.ts
- backend/app/models/user.ts
- backend/app/validators/user.ts
- backend/app/transformers/user_transformer.ts
- backend/app/middleware/auth_middleware.ts
- backend/app/middleware/silent_auth_middleware.ts
- backend/database/migrations/1761885935168_create_users_table.ts
- backend/database/migrations/1768620764696_create_access_tokens_table.ts

Frontend:
- frontend/src/lib/api.ts
- frontend/src/lib/types.ts
- frontend/src/auth/auth-context.ts
- frontend/src/auth/auth-provider.tsx
- frontend/src/auth/use-auth.ts
- frontend/src/auth/use-auth-form.ts
- frontend/src/routes/app-routes.tsx
- frontend/src/routes/protected-route.tsx
- frontend/src/routes/public-only-route.tsx
- frontend/src/pages/login-page.tsx
- frontend/src/pages/register-page.tsx
- frontend/src/pages/profile-page.tsx
- frontend/src/components/auth-layout.tsx
- frontend/src/components/field-error.tsx

Solo si una de esas fuentes te remite directamente a otro archivo imprescindible, léelo y dilo. No explores otras capabilities.

## Alcance
Incluye únicamente: registro, inicio de sesión, cierre de sesión, sesión (persistencia y rehidratación), perfil y protección de rutas. Nada de tareas, equipos, listas ni otras partes del sistema.

## Reglas duras
1. No modifiques ningún archivo que no sea `docs/spec-viva/ICBE.md`. No ejecutes la app, tests, migraciones, instaladores ni `openspec init`. Solo lectura de código y escritura de ese archivo. Puedes usar `git status`/`git diff` en modo lectura.
2. Solo comportamiento observable desde fuera:
   - API: método, ruta, cuerpo, respuesta, códigos y errores visibles.
   - UI: lo que una persona ve y puede hacer.
   - Prohibido en la spec: nombres de archivos, clases, funciones, variables, rutas internas de código o cualquier detalle de implementación.
3. No uses `ADDED`, `MODIFIED` ni `REMOVED`. Esto no es un delta.
4. No inventes comportamiento. Si el código no lo confirma, no lo escribas: anótalo aparte para la Parte B.
5. Escribe en castellano, salvo `SHALL`, `WHEN`, `THEN` y las mayúsculas de la RFC.

## Formato exacto
- `## Purpose` con una o dos frases.
- `## Requirements`.
- Cada requisito con `### Requirement: <frase con SHALL>`.
- Debajo de cada requisito, al menos un `#### Scenario: <nombre>`.
- Cada escenario con exactamente estas dos viñetas:
  - `- **WHEN** ...`
  - `- **THEN** ...`
- La precondición va dentro del `WHEN`. No uses `GIVEN`.
- Cubre las dos capas: requisitos de API y requisitos de pantalla/sesión. No mezcles capas en un mismo requisito si no comparten el mismo contrato.
- No incluyas todavía la Parte B (las tres listas).

## Proceso
1. Lee todas las fuentes.
2. Haz un inventario interno de comportamientos observables; no lo pegues en el archivo.
3. Redacta la spec.
4. Autoevalúala contra las reglas duras y corrige lo que incumpla.

## Criterio de parada
Timebox de 45 minutos: una pasada completa y honesta, sin pulir de más. Si el reloj se acaba, entrega lo que haya. Si algo queda dudoso, no lo rellenes con seguridad fingida: déjalo fuera de la spec y repórtalo en el chat.

## Salida esperada
1. Escribe `docs/spec-viva/ICBE.md`.
2. En el chat, responde solo con:
   - número de requisitos escritos,
   - archivos leídos,
   - lista breve de dudas "¿bug o contrato?" que dejaste fuera,
   - confirmación de que `git status` solo muestra el archivo nuevo. 
```

**Qué salió:** funcionó a la primera


## Prompt 2

**Modelo:** DeepSeek v4.1 flash free
**Herramienta:** Open Code

```
ok
```

**Qué salió:** tuve que insistir, me pidión confirmacion para crear el archivo de la spec-viva


## Prompt 3

**Modelo:** DeepSeek v4.1 flash free
**Herramienta:** Open Code

```
write it
```

**Qué salió:** funcionó a la primera

