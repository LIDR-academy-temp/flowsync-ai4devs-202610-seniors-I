# Prompts

Aquí van **todos los prompts que lanzaste** para hacer el ejercicio, en el orden en que los
lanzaste, con el modelo y la herramienta de cada uno.

Esto no es papeleo. Lo que se revisa es **cómo pediste las cosas**, no solo lo que salió: un
resultado flojo con un prompt bueno y un resultado flojo con un prompt vago necesitan feedback
distinto, y sin este archivo no se distinguen.

---

## Prompt 1

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
no, cambia a la rama s4 y vamos con el ejercicio de la S4, primero explicame de forma concisa y con pocos tecnicismos que se debe de hacer en la tarea, si quieres con bullets points o de la forma mas clara posible
```

**Qué salió:** explicó la tarea en bullets y propuso apuntar mi cifra antes de mirar nada.

---

## Prompt 2

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
creo que habra unos 20 tests en backend apuntalo y miramos juntas
```

**Qué salió:** lo apuntó como "tests"; yo me refería a scenarios.

---

## Prompt 3

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
has puesto tests pero es verdad que me referia a escenarios cubiertos
```

**Qué salió:** corrigió el archivo: 20 scenarios cubiertos, a ojo.

---

## Prompt 4

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
con escenarios a que se refiere? casos de uso o funcionalidades?
```

**Qué salió:** me explicó con un ejemplo que un scenario es un caso concreto de una regla.

---

## Prompt 5

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
sí, cuéntalos
```

**Qué salió:** el requisito tiene 3 scenarios.

---

## Prompt 6

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
sí, empecemos por el primero
```

**Qué salió:** no hay ningún test de tareas; el más parecido mira al usuario, no a una tarea.

---

## Prompt 7

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
sí, pasemos al scenario 2
```

**Qué salió:** ningún test lo comprueba; de entrada creyó que el código lo incumplía.

---

## Prompt 8

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
sí, pasemos al scenario 3
```

**Qué salió:** hay un test parecido de iniciales, pero no pasa por una tarea.

---

## Prompt 9

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
no cubierto
```

**Qué salió:** escribió la matriz: 0 de 3 cubiertos.

---

## Prompt 10

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
lanza el agente
```

**Qué salió:** el agente escribió 3 tests: 2 verdes y 1 rojo (el scenario 2, porque la lista trae el email). Corrigió una lectura previa: la tarea suelta sí cumple y la lista no.

---

## Prompt 11

**Modelo:** Sonnet 5.5 (subagente)
**Herramienta:** Claude Code

Lo escribió el asistente tras mi "lanza el agente", no yo. Va tal cual se lanzó.

```
Escribe los tests que faltan para el requisito «Lo que cada tarea muestra de su responsable» de openspec/specs/tasks/spec.md (líneas ~97-120).

Repo: /Users/nuria/Desktop/code/nuriaromerodev/curso-LIDR/flowsync-ai4devs-202610-seniors-I, rama trazabilidad-nr (ya creada; no cambies de rama). Los comandos de test se ejecutan desde backend/.

Resultado esperado: un único archivo de tests nuevo en backend/tests/functional/tasks/ con exactamente un test por scenario (3 en total):
1. Responsable identificable: la tarea cuyo responsable se llama "Ada Lovelace" trae en `assignee` el nombre y las iniciales.
2. La tarea no filtra datos de cuenta: obtener una tarea (suelta Y dentro de la lista) no trae en `assignee` el email ni ningún otro dato de acceso.
3. Responsable sin nombre: si el responsable se registró sin nombre, `assignee.fullName` llega nulo y las iniciales siguen llegando.

Criterios de éxito:
- Sigue el estilo de backend/tests/functional/auth/ (Japa, test.group, testUtils.db().withGlobalTransaction(), client, assert, títulos en castellano, comentario de cabecera que cite el requisito). Lee varios de esos tests antes de escribir.
- Ejecútalos con `npm test` o `node ace test functional --files=<nombre>` desde backend/ y pega en tu respuesta el resultado real (verde/rojo por test).

Restricciones:
- No toques nada fuera de backend/tests/. Ni código de la aplicación, ni el spec, ni la matriz.
- Si un test sale rojo, se queda rojo. No arregles el código y no aflojes el test para que pase. Entrégalo rojo e indica por qué falla.
- Los datos que el scenario no fija (título de la tarea, estado, cómo crear la tarea y su usuario, cómo autenticar la petición, qué campos concretos cuentan como "datos de acceso" en el scenario 2) los decides tú. Es OBLIGATORIO que me devuelvas una lista de cada decisión de este tipo: qué valor o criterio elegiste y por qué, porque la alumna la necesita para la parte B.
- No hagas commit.
- No arranques servidores de desarrollo.
- Si algo es ambiguo, no lo decidas en silencio: anótalo en esa lista.

Respuesta final: ruta del archivo, resultado de cada test (verde/rojo con el mensaje de fallo), y la lista de decisiones tomadas.
```

**Qué salió:** 2 verdes y 1 rojo, más una lista de decisiones que el scenario no fijaba.

---

## Prompt 12

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
pásame un borrador de la parte B
```

**Qué salió:** borrador de las tres líneas; avisó de qué partes no eran mías.

---

## Prompt 13

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
guarda la parte B en el archivo
```

**Qué salió:** la guardó en docs/verificacion/nr.md.

---
