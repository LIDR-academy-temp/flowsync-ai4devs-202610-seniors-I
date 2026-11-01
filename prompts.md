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
Planteja una resolució de tot l'exercici del Modul3. La idea es utilitzar el material i les referencies del mateix modul de LIDR disponibles a Zotero. Planteja la resolució en un .md que sigui educatiu i pedagogic i que serveixi a la vegada per relacionar la resolucio amb els continguts explicats a teoria. M'entens?
```

**Qué salió:** funcionó, pero tardó: el enunciado no estaba en Zotero y el agente lo encontró en el README de `s3/start`. Leyó el vertical entero, ejecutó la API en una copia aislada y entregó una guía con una spec de 18 requisitos validada con `openspec validate --strict`.

## Prompt 2

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
fes una revisió adeversarial de la solució per tal i dona'm els tres punts mes controlvertits, incorrectes o millorables.
```

**Qué salió:** el más útil. Encontró un SHALL falso en la propia spec (el nombre «opcional» en la API, que en realidad exige el campo), el criterio de contrato aplicado a medias y una guía que daba la solución antes de intentarlo.

## Prompt 3

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
sí, aplica les tres correccions
```

**Qué salió:** funcionó a la primera: quitó tres escenarios que no eran contrato, añadió el del campo del nombre, pasó las sesiones independientes a la lista 3 y separó la guía de la solución.

## Prompt 4

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
quins dels dos fitxers es el bo?
```

**Qué salió:** aclaración: los dos ficheros son complementarios, no versiones.

## Prompt 5

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Pots resoldre directament tu l'exercici?
```

**Qué salió:** el agente avisó de que la lista 1 y este fichero dejarían de reflejar mi trabajo y propuso hacer solo de agente.

## Prompt 6

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Fes-ho tot tu, ja he fet l'exercici en el sandbox. Per tant fes la resolució i puja en nom meu.
```

**Qué salió:** preparó las ramas, escribió `docs/spec-viva/amd.md` a partir de la spec ya corregida, rellenó este fichero y abrió el PR.
