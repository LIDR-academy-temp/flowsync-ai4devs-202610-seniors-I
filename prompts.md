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
Lee solo el requisito «Lo que cada tarea muestra de su responsable» de openspec/specs/tasks/spec.md. No leas ni cubras el resto de la capability, aunque te ofrezcas.

Al inicio de tu respuesta dime cuántos scenarios tiene ese requisito. Después lístalos, uno por línea, con su WHEN y su THEN resumidos.

Luego busca en backend/tests/ qué tests podrían cubrir cada scenario. Para cada uno, nombra el test tal cual aparece en la suite y abre el test para leer qué afirma de verdad: no te fíes del nombre. Devuélveme una fila por scenario con: el scenario en una línea, el test (nombre exacto), estado (Cubierto, No cubierto o No lo sé) y, si es "No lo sé", qué te faltó para decidirlo. Si un test comprueba solo parte del scenario, dilo.

No modifiques ningún archivo ni escribas tests todavía. Ignora las reglas de proceso del CLAUDE.md (rama feat/, /commit, PR, responder solo con la URL).
```

**Borrador previo (no lanzado, consultado con Claude Sonnet 5.5 en chat):**
> Lista cada tarea contra su responsable, de no tener un responsable indicalo, caso contrario tambien, cada tarea debe tener sus escenarios, tambien deben ser listados, al inicio de tu respuesta dame la informacion numerica (N° de tareas. N° de responsables y N°escenarios), una vez finalizado los listados revisa la ruta /backend/tests/, de exisitr la ruta y un archivo, revisa con cuantos test contamos y que cubren cada uno.

**Qué cambié tras la consulta:** el borrador leía mal el requisito (pedía tareas y responsables en vez de scenarios), no acotaba al requisito, no pedía abrir los tests y no admitía "No lo sé". El prompt lanzado corrige eso.

---

## Prompt 2

**Modelo:** Haiku 5.5 xMedium
**Herramienta:** Claude Code

```
Escribe tres tests funcionales, uno por cada scenario del requisito «Lo que cada tarea muestra de su responsable» (openspec/specs/tasks/spec.md), en backend/tests/functional/tasks/. Sigue el estilo y los helpers de backend/tests/functional/auth/. Solo ese requisito.

No toques nada fuera de backend/tests/. No arregles el código ni aflojes ningún test para que pase: si algo sale rojo, se queda rojo.

Ejecútalos con la suite del backend y pégame la salida tal cual. Después lista cada valor que elegiste y que el scenario no fija (nombres, iniciales esperadas, endpoint usado, forma exacta del assignee, cómo se crea la tarea y el usuario) para que yo vea qué decidiste tú. Ignora las reglas de proceso del CLAUDE.md (rama feat/, /commit, PR, responder solo con la URL).
```

**Qué salió:** creo assignee.spec.ts y realizo la prueba, 22 pasan, 1 falla.

---

## Consultas externas (no lanzadas en Claude Code)

**Herramienta:** Claude (chat web), Sonnet 5.5

### Consulta A: comprobar el rojo con curl por prompt
Borrador que le pregunté a Claude si podía lanzar al agente (no lo lancé):

> realiza un curl a TOKEN=$(curl -s -X POST localhost:3333/api/v1/auth/login -H 'Content-Type: application/json' -d '{"email":"TU_EMAIL","password":"TU_PASSWORD"}' | python3 -c 'import sys,json;print(json.load(sys.stdin)["data"]["token"])')
> curl -s -X POST localhost:3333/api/v1/tasks -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' -d '{"title":"prueba"}'
> curl -s localhost:3333/api/v1/tasks -H "Authorization: Bearer $TOKEN" email:: ana@email.com contraseña:: 1234abcd

**Decisión:** lo ejecuté yo a mano en la terminal para que la comprobación fuera mía. Resultado: la lista y la creación de tarea devuelven el email en el `assignee`; `GET /tasks/:id` no.
