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


---

## Prompt 1

**Modelo:** Opus 5.5 Medium
**Herramienta:** Claude Code

```
Vas a hacer una AUDITORÍA, no un arreglo. Restricciones duras:
- No modifiques, crees ni borres ningún archivo salvo docs/auditoria/cmelon.md, y en ese solo puedes AÑADIR debajo de lo que ya hay (no toques nada de lo que ya está escrito en el archivo).
- No hagas commits, no uses /commit, no crees ramas, no ejecutes gh pr create ni el subagente adversarial-reviewer. Las reglas de proceso de CLAUDE.md NO se aplican a esta tarea: son el objeto de la auditoría.

Tarea:
1. Lee la sección "## Reglas de proceso" de CLAUDE.md. Si una viñeta contiene más de una exigencia, sepárala en filas distintas.
2. Contrasta cada regla con los últimos 15 commits del repositorio y el estado actual del árbol. Usa solo comandos de lectura (por ejemplo git log -15 --stat --format=fuller, git log --graph --all --oneline -40, git branch -a, git show <sha>, git status, ls). Si una regla depende de algo que no deja rastro en git (una sesión de chat, el uso de una skill, un PR en GitHub), no lo deduzcas: márcala como no comprobable y di qué faltaría.
3. Escribe en docs/auditoria/cmelon.md, bajo un encabezado "## Tabla", una tabla markdown con una fila por regla y exactamente estas columnas:
   | Qué pide la regla (1 frase) | Qué se miró (comando o archivo exacto) | Veredicto | Evidencia (1 línea: sha/archivo donde se rompe, o qué falta para comprobarla) | Acción (dejarla / borrarla / bajarla) |
   Veredicto solo puede ser: "se cumple", "no se cumple" o "no se puede comprobar con lo que hay". Un "se cumple" sin evidencia concreta es "no se puede comprobar".
4. No escribas las conclusiones de la Parte B: esas las escribo yo.
5. Al terminar, en el chat solo dime cuántas filas escribiste y lista los comandos que ejecutaste.
```

**Qué salió:** 
Funcionó a la primera, me devolvió la siguiente respuesta: 
Escribí **15 filas** en la tabla, bajo `## Tabla` en [docs/auditoria/cmelon.md](docs/auditoria/cmelon.md), añadidas debajo de lo que ya había. Las 5 viñetas de "Reglas de proceso" se separan en 15 exigencias. No modifiqué ningún otro archivo, no hice commits y no creé ramas.

Comandos que ejecuté, todos de solo lectura salvo el `cat >>` que añadió la tabla:

1. `cat docs/auditoria/cmelon.md`
2. `git status`
3. `git branch -a`
4. `git log --graph --all --oneline -40`
5. `git log -15 --stat --format=fuller`
6. `sed -n '/## Reglas de proceso/,$p' CLAUDE.md`
7. `git rev-parse --short <rama>` para `main`, `s5/start`, `s4/start`, `auditoria-cmelon`, `origin/main`, `upstream/main` y `upstream/s5/start`
8. `git log -15 --merges --oneline`
9. `git branch -a --contains <sha>` para `4427afc`, `0e56705`, `4e03d1f`, `ea5db1f`, `cbe9617`, `afc4b74` y `aee9a24`
10. `ls .claude .claude/skills`, `ls .claude/skills/commit` y `cat .claude/skills/commit/SKILL.md`
11. `ls docs docs/capabilities`
12. `git show --stat --format='%h %s' 4e03d1f`
13. `git log -15 --format='%h %s' -- backend/start/routes.ts backend/app/controllers backend/app/validators backend/app/transformers backend/.adonisjs docs/capabilities`
14. `grep -n -i "transformer" backend/.adonisjs/client/registry/schema.d.ts`
15. `git show 7662fb1:docs/capabilities/tasks/README.md` (filtrado con `grep`)
16. `git show 4e03d1f^:docs/capabilities/tasks/README.md`
17. `git reflog -n 30 --date=iso`
18. `cat >> docs/auditoria/cmelon.md <<'EOF' … EOF`
19. `tail -n 3 docs/auditoria/cmelon.md` y `git status --short`

En la fila de "solo desde `main` o `sN/*`", la columna "Qué se miró" pone `git rev-parse --short auditoria-cmelon s5/start` como un único comando. En realidad lo ejecuté rama por rama, como en el punto 7, y el resultado es el mismo.