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

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Pots llegir el document de Zotero "Ejercicio FlowSync: mide qué está probado de  verdad 🔴 — 70 min"
```

**Qué salió:** funcionó: encontró el enunciado en Zotero, lo abrió y resumió el primer tramo (cómo funciona el módulo y el entorno).

## Prompt 2

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Quines referencies de teoria te? Les pots llegir totes?
```

**Qué salió:** listó las referencias del apartado «Si vas justo de tiempo» y leyó las lecciones de verificación, revisión adversarial y recursos. MADR y Mermaid no estaban en Zotero, y no hacían falta para esta tarea.

## Prompt 3

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
[Image #1] pots llegir-les totes?
```

**Qué salió:** con una captura del índice del módulo, leyó las dos lecciones que faltaban (déficit documental y los cuatro artefactos).

## Prompt 4

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Fes-me un resum de 200 paraules de que preten resoldre l'exercici?
```

**Qué salió:** funcionó a la primera.

## Prompt 5

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
fes un resum de l'spec del requisit
```

**Qué salió:** tuvo que traer las ramas nuevas del curso porque el clon no tenía `s4/start`. Leyó el requisito de la rama y avisó de que tiene 3 scenarios y no 4 como el ejemplo de la lección.

## Prompt 6

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
fes el checkout de s4/start i crea la meva rama
```

**Qué salió:** funcionó; creó `s4/start` desde `upstream` y la rama `trazabilidad-amd`.

## Prompt 7

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Revisa que el que es demana al README coincideix amb el que demana l'exercici
```

**Qué salió:** coinciden en lo sustancial. El PDF de la lección había perdido `prompts.md` de la lista de entrega y tenía URLs de repositorio incoherentes.

## Prompt 8

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Fes una proposta de resolució de l'exercici i explica'm-ho detalladament en un .md que posteriorment no pujarem a git
```

**Qué salió:** hizo la matriz, escribió y ejecutó los tests en una copia aislada del repo (22 en verde, 1 en rojo) y encontró la causa: la lista serializa al responsable con el transformer de usuario, que incluye el email.

## Prompt 9

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Fes una revisio adversarial de la resolucio i analitza els punts que creus que no son correctes o millorables.
```

**Qué salió:** el más útil. Lo lanzó a un subagente con contexto limpio y de solo lectura. Encontró diez puntos, ninguno crítico: un «No lo sé» puesto para cumplir el checklist, la aserción del scenario 3 demasiado débil, la contradicción entre la spec y el `design.md` sobre el `id`, y que las líneas de la parte B venían ya escritas.

## Prompt 10

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
la solucio ha d'estar dins de la carpeta Modul4
```

**Qué salió:** movió la guía fuera del repositorio.

## Prompt 11

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
L'exercici esta ben resolt llavors?
```

**Qué salió:** la parte técnica sí, pero el ejercicio no estaba entregado ni la parte B escrita.

## Prompt 12

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Resol l'exercici. I fes l'entrega, evidentment no posis Claude com a usuari de PR (haig de ser jo) ni dades privades i/o compromeses.
```

**Qué salió:** antes de escribir la parte B me preguntó cuántos scenarios creía cubiertos antes de mirar, en vez de inventárselo. Escribió la matriz, los tests y este archivo, y abrió el pull request.
