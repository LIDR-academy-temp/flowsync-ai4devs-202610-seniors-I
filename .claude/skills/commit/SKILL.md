---
name: commit
description: Crea un commit convencional a partir de los cambios que ya están preparados en Git.
argument-hint: [intención opcional del commit]
---

# Crear un commit con los cambios preparados

1. Revisa `git status` y los cambios preparados (`git diff --cached`). No prepares archivos que sigan sin preparar ni incluyas cambios ajenos. Si no hay nada preparado, explícalo y detente.
2. Resume los cambios preparados para elegir el tipo y el alcance del commit convencional. Usa el formato `tipo(alcance): descripción`, con una descripción breve y en modo imperativo. Algunos tipos habituales son `feat`, `fix`, `docs`, `refactor`, `test`, `build` y `chore`.
3. Comprueba que los cambios preparados no contengan secretos ni cambios claramente ajenos. Si encuentras alguno, detente e informa qué archivos están involucrados; no alteres el índice de Git de la persona usuaria.
4. Crea exactamente un commit con el mensaje propuesto. Si `$ARGUMENTS` indica una intención, úsala como orientación y asegúrate de que el mensaje describa fielmente los cambios preparados.
5. Informa el hash y el mensaje del commit. Esta skill no hace push ni crea pull requests.
