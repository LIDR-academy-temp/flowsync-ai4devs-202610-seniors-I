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

## Prompt 1

**Modelo:** Haiku 5.5 xMedium
**Herramienta:** Claude Code

```
Comprueba que puedes leer el historial de git de este repositorio. Para ello, ejecuta git log -15 --oneline y muéstrame el comando exacto y su salida. Después resume en una línea cada uno de esos 15 commits.

Esto es una auditoría, no un arreglo: no modifiques ningún archivo, no crees ramas, no hagas commits y no ejecutes nada que cambie el árbol de trabajo. Solo lectura.
```
**Borrador**
Sonnet 5.5 Medium
Hola Claude, realizaremos una serie de procesos durante esta sesion, primeramente, realiza una revision de que tengas acceso al historial, despues, resume los ultimos 15 commits realizados, no modifiques ningun archivo, esto es una auditoria, no un arreglo.

**Qué salió:** Si tiene acceso, desplego los 15 commits junto con un pequeño resumen.

## Prompt 2

**Modelo:** Haiku 5.5 xMedium
**Herramienta:** Claude Code

```
Ejecuta git log -15 --format='%h %an%n%B---' y git branch -a, y muéstrame los comandos exactos y su salida. Con eso, y abriendo con git show --stat los commits que toquen rutas, controladores, validadores o transformers, contrasta estas 7 reglas del CLAUDE.md contra los últimos 15 commits y el estado actual del árbol:

1. Seguir en la rama de trabajo si ya existe; solo se crea feat/<slug> desde main o una sN/*.
2. Nunca commitear directo en main ni en una sN/*.
3. Commit por petición, con la skill /commit.
4. Un cambio en rutas, controladores, validadores o transformers se cierra en el mismo commit con el diff de .adonisjs/ y el README de la capability al día.
5. gh pr create con descripción completa, una sola vez, al terminar la unidad de trabajo.
6. Pase del subagente adversarial-reviewer sobre el PR, al final.
7. Al abrir el PR, responder en el chat solo con la URL.

Haz una tabla con una fila por regla y cinco columnas: qué pide la regla (una frase), qué se miró (el comando literal), veredicto (se cumple / no se cumple / no se puede comprobar), evidencia (una línea, con hash cuando lo haya) y qué harías (una palabra: dejarla, borrarla o bajarla a algo que se ejecute solo). Divide la tabla en dos bloques: reglas que dejan rastro en el historial y reglas que no.

No marques "se cumple" si no tienes evidencia: en ese caso pon "no se puede comprobar" y di en la evidencia qué faltaría para comprobarla.

Es una auditoría, no un arreglo. Solo lectura sobre el repositorio, salvo añadir la tabla al final de docs/auditoria/mtpc.md, debajo de mi apuesta, sin modificar ni borrar ninguna línea existente. No crees ramas, no hagas commits y no modifiques ningún otro archivo.
```
**Borrador**
Sonnet 5.5 Medium
Realiza ahora git log --format='%h %an %s' -15, y con esta nueva información, realiza una tabla donde se cree una fila por regla, con las siguientes 5 casillas (qué pide, qué se miró con el comando exacto, veredicto, evidencia, qué harías).

No marques "se cumple" sin no se tiene evidencia, en su caso colocar "no se puede comprobar", todo en modo lectura y pasar sobre mi apuesta en el /docs/auditoria/mtpc.md

Separa reglas que se comprueben del historial (ejemplo: /commit o commits en main) y las que no dejaron o dejaran rastro (ejemplo: el pase del adversarial-reviewer, o que solo se respondan en el chat)

**Qué salió:** Si tiene acceso, desplego los 15 commits junto con un pequeño resumen.
