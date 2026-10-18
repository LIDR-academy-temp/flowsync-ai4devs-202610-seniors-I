# Comparación: el mismo ticket con harness y sin él

Ticket: FLOW-1 «Implementar login en el frontend». Modelo: Opus 5.5, Claude Code, en las dos copias.
Se compararon los dos planes; ninguno se aplicó.

| Casilla | Con harness (`flowsync-ai4devs-202610-seniors-I`) | Sin harness (`flowsync-sin-harness`) |
|---|---|---|
| **1. Archivos que propone tocar** | **30**: 8 modificados, 17 nuevos, 5 borrados. Lista cada archivo por nombre. Backend: 0. | **~25, no contable con exactitud**: 7 modificados, nuevos con comodines (`src/components/ui/*`, `tests *.test.tsx`), 2+ borrados («assets de la demo»). Backend: 0. |
| **2. Convenciones del proyecto** | **Respetó**: backend solo lectura; rama nueva desde `harness-sh` antes de tocar código; avisa de los cambios sueltos del working tree antes de ramificar; cierre con build + lint + `format:check`, `/commit`, `gh pr create --repo --base --head`, subagente `adversarial-reviewer`, solo la URL del PR en el chat; `import type` y hooks fuera de archivos de componente (`react/only-export-components`); leyó `validators/user.ts` y sacó `passwordConfirmation`, `fullName: null`, 8–32 caracteres y los formatos 422/400/401. **No respetó**: nada escrito en CLAUDE.md pide un `docs/plans/FLOW-1.md` ni borrar los assets del starter; las dos cosas son añadidos fuera del ticket. | **No había ninguna convención escrita** (sin CLAUDE.md, sin skills, sin hook) y esa es la respuesta. Aun así, por su cuenta: backend sin cambios, `import type` y sin enums, textos en español, y también leyó el validador y encontró el mismo hueco (`passwordConfirmation`, `fullName: null`, 8–32). **Sin reglas de proceso, no hay**: ni rama, ni commit convencional, ni PR, ni revisión, ni formateador. Añade por su cuenta react-hook-form, zod, Vitest y Testing Library, que el proyecto no tiene. |
| **3. Veces que intervine** | Se hicieron dos preguntas relacionadas a los requerimientos que faltaban, página a donde se direcciona luego del registro.| Se hizo la misma consulta sobre la página a direccionar luego del registro y se hicieron preguntas para incluir botón de logout, tests y zod. |
| **4. Qué arreglaría a mano antes de enseñarlo** | Quitar el `docs/plans/FLOW-1.md` y el borrado de assets (fuera del alcance del ticket). Revisar que el PR vaya contra `harness-sh` del fork y no contra el curso. | Quitar cuatro dependencias y la capa de tests que nadie pidió, o decidir si se quieren. Escribir a mano todo el proceso: rama, commit, PR, revisión. Quitar la línea «copiar el plan a docs/plan-FLOW-1.md». |

**Dato que no esperaba**: el README anticipa que el hueco del validador (lo que el ticket no dice) es donde se separan las copias. Aquí las dos fueron iguales. Lo que separó los planes no fue el conocimiento del backend sino el proceso y el alcance: con harness, rama/commit/PR/revisión y lista exacta de archivos; sin harness, nada de eso y más librerías de la cuenta.

## Parte B: las tres líneas

1. **Hasta qué pieza llegué, y cuál costó más de lo esperado.**
Pude completar todas las piezas pero creo que la más difícil fue crear la rama y set up el git.

2. **La primera diferencia que vi entre las dos salidas, y en qué me fijé para verla.**
Lo que más me llamó la atención fueron las preguntas que se hicieron en el proyecto sin harness para las extras (tests, zod); el paso 1 «Rama» y el 11 «Cierre» que solo existen con harness; la lista de archivos exacta frente a comodines.

3. **Algo que dejé escrito en el harness y que el agente no cumplió igualmente.**
En el CLAUDE.md se pide tocar solo lo del ticket y el plan añade docs/plans y borra assets.
