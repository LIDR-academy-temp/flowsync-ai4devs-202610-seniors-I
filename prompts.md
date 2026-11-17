# Prompts

Todos los prompts que lancé en el ejercicio, en orden y tal cual. También van los comandos de git que lancé yo a mano con `!` para comprobar la evidencia.

---

## Prompt 1

**Hora:** 13:22  
**Modelo:** Opus 5.5 (claude-opus-5-5)  
**Herramienta:** Claude Code

```
Hola claude, antes de empezar, he leido la parte de reglas del proceso y mi apuesta es que se van a cumplir las 5 reglas, creo que aunque esten escritas de forma bastante narrativa indican lo que se espera y creo que seras capaz de tenerlas en cuenta. No hagas nada todavia, solo apuntalo luego lo pondremos arriva del arichivo de la auditoria
```

**Qué salió:** Apuntó mi apuesta, pero la entendió como si fuera sobre lo que iba a hacer él a partir de ahora, no sobre el historial.

## Prompt 2

**Hora:** 13:25  
**Modelo:** Opus 5.5 (claude-opus-5-5)  
**Herramienta:** Claude Code

```
Vamos a auditar las reglas del proceso del CLAUDE.md, pero no sobre lo que vayas a hacer tu a partir de ahora, si no contra lo que ya ha pasado: Es sbore los ultimos 15 commits del repositorio y el estado actual. Esto es una adutiria asi que aun no cambies ningun archivo ni hagas comits ni crees ninguna rama. Quiero que lo primero que hagas sea listarme las reglas que hay y me digas cuales tienen mas de una cosa junta
```

**Qué salió:** Listó las 5 reglas y las partió en 13 obligaciones; avisó de cuáles no dejan rastro en git.

## Prompt 3

**Hora:** 13:31  
**Modelo:** Opus 5.5 (claude-opus-5-5)  
**Herramienta:** Claude Code

```
Vale, la rama de auditoria-ab la he creado yo para el ejercicio. Quiero que revieses los 15 comits frente a las obligaciones y las apuntes en docs/auditoria/ab.md, al principio quiero que añadas la apuesta tal cual te la dije de que se estaban cumpliendo todos los puntos. la tabla quiero que tenga una fila por oglicacion y las siguientes columnas, "Que se pide", "Que se miro", "veredicto"(se cumple, no se cumple, nose puede comprobar con lo que hay) y la evidencia en una linea y que harias co nella (dejarla, borrarla, hacerla que sea un hook que se jecute solo). solo cambia el el archivo que te he dicho
```

**Qué salió:** Escribió la tabla: 1 se cumple, 5 no se cumplen y 7 no se pueden comprobar. Un «se cumple» era deducido y para el nombre de rama miró mis ramas del ejercicio.

## Prompt 4

**Hora:** 13:35  
**Modelo:** Opus 5.5 (claude-opus-5-5)  
**Herramienta:** Claude Code

```
dame los comandos de git para revisarlo
```

**Qué salió:** Me dio una lista de comandos de solo lectura para comprobarlo yo.

## Prompt 5 (comando a mano)

**Hora:** 13:35  
**Herramienta:** Claude Code, modo bash (`!`)

```
! git log -15 --format='%h %ad %an | %s' --date=short
```

**Qué salió:** Lo lancé yo para ver el orden de los commits.

## Prompt 6 (comando a mano)

**Hora:** 13:35  
**Herramienta:** Claude Code, modo bash (`!`)

```
! git show --stat 4e03d1f
```

**Qué salió:** Comprobé que 4e03d1f solo toca el transformer, sin README.

## Prompt 7 (comando a mano)

**Hora:** 13:35  
**Herramienta:** Claude Code, modo bash (`!`)

```
! git log --oneline -- docs/capabilities/tasks/README.md
```

**Qué salió:** Comprobé que el README de tasks nace en 7662fb1, después de 4e03d1f.

## Prompt 8 (comando a mano)

**Hora:** 13:36  
**Herramienta:** Claude Code, modo bash (`!`)

```
! git cat-file -t 5cb8726
```

**Qué salió:** Comprobé que 5cb8726, el hash que cita 4e03d1f, no existe: la historia se reescribió.

## Prompt 9

**Hora:** 13:39  
**Modelo:** Opus 5.5 (claude-opus-5-5)  
**Herramienta:** Claude Code

```
Vale, si, haz los 2 cambios y añade lo que has reproducido como evidencia. la 3b pasala a que se cumple con el cbe9617 y el que pones como se cumple sin comprobarlo pasalo a no se puede comprobar. Lo del nombre de la rama no lo mires en mis ramas, cambia solo el archivo
```

**Qué salió:** Corrigió las filas: 3b a «se cumple» por cbe9617 (4e03d1f es anterior a la regla y al README), 3a a «no se puede comprobar» y 1c sin mirar mis ramas.

## Prompt 10

**Hora:** 13:43  
**Modelo:** Opus 5.5 (claude-opus-5-5)  
**Herramienta:** Claude Code

```
Una cosa, lo de los PRs, si la historia se ha reescrito y este repo es una copia el curso, los Prs pudeieron hacerse en el repo origial antes de copiarlo. Eso seria que no se puede comprobar o que no se cumple? analizalo antes de cambiar nada
```

**Qué salió:** Me dio la razón: los PRs pudieron estar en el repo original. Propuso pasar 4a, 4b y 4c a «no se puede comprobar». Quedaría 1 / 0 / 12.

## Prompt 11

**Hora:** 13:43  
**Modelo:** Opus 5.5 (claude-opus-5-5)  
**Herramienta:** Claude Code

```
vale, si, aplica los cambios en el archivo
```

**Qué salió:** Aplicó el cambio y reescribió la conclusión: este historial es una copia reescrita y no sirve para auditar el proceso.

## Prompt 12

**Hora:** 13:46  
**Modelo:** Opus 5.5 (claude-opus-5-5)  
**Herramienta:** Claude Code

```
la ultima columna dejala en una palabra (delajrla, borrarla o bajarla), no añadas esplicaciones, en el que se miro pon el comando utilizado nada de historial de gi. Si no hay nada que mirar pon que no deja rastro. cambia solo eso
```

**Qué salió:** Dejó la última columna en una palabra y puso el comando concreto en «Qué se miró».

## Prompt 13

**Hora:** 13:55  
**Modelo:** Opus 5.5 (claude-opus-5-5)  
**Herramienta:** Claude Code

```
añade al final de docs/auditoria/ab.md esto tal cual:

## Parte B

1. Aposte a que se cumplian las 5 y solo hemos podido comprobar 1, la 3b. El resto no dejan rastro. Me apoyaba en que el agente las iba a seguir.

2. la 1d, no hacer comint en main ni en las sN. La historia se reescribio por lo que no se puede saber en que rama se hizo cada comit. Habria que meter un hook que no dejase hacer un comit en esas ramas.

3. La 4d la booraria porque ya lo dice la 4c y nunca se va a poder comprobar
```

**Qué salió:** Añadió la parte B.
