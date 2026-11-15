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

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Lee CLAUDE.md, sección "Reglas de proceso". 
Encontrarás 5 reglas de proceso.

Ahora examina los últimos 15 commits de este repositorio 
(usa `git log --oneline -15`) y, para CADA REGLA, 
comprueba si se está cumpliendo.

Documenta el resultado en docs/auditoria/emf.md con esta tabla:

| Regla | Qué se miró | Veredicto | Evidencia | Acción |
|-------|-----------|-----------|-----------|--------|

Donde:
- Regla: qué pide la regla (una frase)
- Qué se miró: comando o archivo exacto
- Veredicto: "se cumple" / "no se cumple" / "no se puede comprobar"
- Evidencia: dónde ves el cumplimiento o incumplimiento
- Acción: "dejarla" / "borrarla" / "bajarla a algo que se ejecute"

NO MODIFIQUES NINGÚN ARCHIVO. Solo crea la tabla en docs/auditoria/emf.md
```

**Qué salió:** Funciona, ha creado todo como se lo había pedido y el resultado en el formato que esperaba.
