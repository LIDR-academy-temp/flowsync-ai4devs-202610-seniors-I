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
Mira openspec/specs/tasks/spec.md, solo el requisito "Lo que cada tarea muestra de  
  su responsable". Sácame la lista de sus escenarios, uno por línea y numerados. Por  
  ahora solo ese requisito, nada del resto, y no cambies ningún archivo.  
```

**Qué salió:** 

```Escenarios del requisito "Lo que cada tarea muestra de su responsable"
  (openspec/specs/tasks/spec.md:97):

  1. Responsable identificable
  2. La tarea no filtra datos de cuenta
  3. Responsable sin nombre

  No he cambiado ningún archivo.```
  
  
## Prompt 2

**Modelo:** Opus 5.5
**Herramienta:** Claude Code
 
```
Ahora vamos escenario por escenario. Para cada uno, busca en backend/tests/ si hay algún test que lo cubra y dime en qué archivo está, cómo se llama exactamente y qué afirma. Copialos expect/assert tal cual, no resumas. Si hay varios candidatos, ponlos todos; si no hay ninguno, dímelo también.
Lo que me importa es si el test comprueba de verdad lo que pide el escenario, o solo una parte, o algo que se le parece. Que se llame parecido no basta.
Al final ponle a cada escenario Cubierto, No cubierto o No lo sé, con una frase de por qué. Prefiero un No lo sé honesto a un Cubierto dudoso. No cambies nada todavía.
```

**Qué salió:** 

```
ningún test de backend/tests/ cubre este requisito. Solo hay 4
  ficheros, todos de auth
  (tests/functional/auth/{initials,login,session,signup}.spec.ts). Busqué task y
  assignee en todo backend/tests/ y no sale nada: ningún test llama a un endpoint de
  tareas ni lee un assignee.
 ```

 ## Prompt 3

**Modelo:** Opus 5.5
**Herramienta:** Claude Code
 
``` 
Ahora actua con escepticismo y quiero que revises los escenarios que marcaste como  
  Cubierto, pero intentando encontrar fallos. Para cada uno, piensa si el test podría 
  salir en verde aunque el escenario no se estuviera cumpliendo.                      
                                                                                      
  Si encuentras algo, dime qué es, por qué crees que es un problema y qué estado le   
  pondrías. No modifiques ningún archivo.           
```

**Qué salió:** 

```
No marqué ningún escenario como Cubierto, así que no hay ninguno que revisar. Los tres quedaron en No cubierto.

  Hice la prueba que pides al revés, sobre los tests "parecidos" que encontré, y
  confirma ese veredicto: todos saldrían en verde aunque el escenario no se cumpliera,
  porque ninguno hace una petición a una ruta de tareas.

  - Escenario 1: si el assignee de una tarea llegara sin nombre, sin iniciales o sin
    aparecer, signup.spec.ts:18 e initials.spec.ts:25 seguirían pasando, porque solo
    leen data.user de signup o login.
  - Escenario 2: es el caso más claro. Según el código, el email del responsable ya
    sale al listar, crear y cambiar el estado (task_transformer.ts:9 →
    UserTransformer), y aun así ningún test de auth fallaría por eso.
    signup.spec.ts:55 solo busca la contraseña, y session.spec.ts:21 exige que el
    email esté en el perfil.
  - Escenario 3: si un assignee sin nombre llegara sin iniciales, o si sus iniciales
    se calcularan en el cliente a partir del email, signup.spec.ts:43 e
    initials.spec.ts:25 seguirían en verde.

  Dos cosas en las que podría estar equivocándome, con el mismo escepticismo aplicado
  a mí:

  1. Que no haya tests en otro sitio. Busqué solo en backend/tests/, que es lo que
     pediste. El frontend no tiene runner de tests y no miré otras ramas. Me parece
     poco probable que el veredicto cambie, pero no lo he descartado del todo.
  2. Que el email salga de verdad en la lista. Lo deduje leyendo los transformers y
     los controladores, sin ejecutar nada. Para confirmarlo habría que hacer GET 
     /api/v1/tasks con sesión y mirar el assignee. Si quieres, lo hago a mano contra
     el servidor de desarrollo. También puedo escribir un test que lo compruebe, pero
     eso ya sería tocar archivos.``` 

 ## Prompt 4
 
 **Modelo:** Opus 5.5
**Herramienta:** Claude Code
 
```
Con lo que llevamos, crea el archivo docs/verificacion/DR.md con la matriz. Arriba pon una línea con "Escenarios en el requisito: N · Cubiertos: M", con los números 
que salieron. Debajo, una tabla con cuatro columnas: el escenario resumido en una línea, el nombre exacto del test que lo cubre (o vacío si no hay), el estado (Cubierto, No 
cubierto o No lo sé) y, solo si es No lo sé, en media línea qué faltó para decidir.Una fila por escenario y nada más en el archivo por ahora.  ``` 

**Qué salió:** 

Se genero la matriz:

| Coincidencia | Qué verifica | ¿Cubre algún escenario? |
|---|---|---|
| `session.spec.ts:31` | El perfil incluye las iniciales y el correo electrónico. | No: verifica el perfil de la propia cuenta, no el propietario de una tarea. Además, valida que el correo electrónico esté presente, lo cual es contrario al escenario 2. |
| `signup.spec.ts:31` | La cuenta creada durante el registro tiene las iniciales `AL`. | No: verifica la respuesta del proceso de registro, no una tarea. |
| `initials.spec.ts:21,33` | Cuando no hay nombre, las iniciales se obtienen del correo electrónico (`AE`). | Es el caso más cercano al escenario 3, pero únicamente verifica la respuesta del inicio de sesión (`data.user.initials`), nunca una tarea. |


 ## Prompt 5
 
 **Modelo:** Opus 5.5
**Herramienta:** Claude Code
 
```  
En docs/verificacion/DR.md pasa los escenarios 1 y 3 a No lo sé: pon los tests de auth parecidos y anota que revisan las iniciales del usuario, no el assignee de la tarea.

Luego escribe un test por escenario en backend/tests/functional/tasks/, con el estilo de auth/ (mira signup.spec.ts e initials.spec.ts). Que compruebe lo que dice el escenario, no lo que hace el código. En el 2 cubre la tarea sola y la lista. Solo toca backend/tests/.

Ejecútalos y, si alguno falla, no lo arregles: dime cuál y por qué. Al final cuéntame qué decidiste tú porque el escenario no lo aclaraba.
```  

**Qué salió:** 

``` He escrito los 3 tests y los he ejecutado: 2 pasan y 1 falla. El que falla es el
  escenario 2: una tarea en la lista envía el email de su responsable. No lo he
  arreglado.

  Matriz: los escenarios 1 y 3 ya están en "No lo sé" en docs/verificacion/DR.md. La
  columna del test lleva el nombre exacto de cada test de auth parecido, y la nota
  dice que revisan las iniciales del usuario, no el assignee de la tarea. No he
  actualizado la matriz con estos resultados porque no lo pediste.

  Tests: los tres están en backend/tests/functional/tasks/assignee.spec.ts, con el
  estilo de auth/. Fuera de backend/tests/ solo he tocado la matriz, y la ejecución no
  cambió ningún otro archivo.``` 

 ## Prompt 6
 
 **Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Ejecuta los tests con (cd backend && npm test).
Si alguno de los tests nuevos falla, NO lo arregles ni cambies el
código ni ajustes el test. Solo dime cuál falla, el mensaje de
error, y si crees que el problema está en el código, en el test o
en que la spec no define bien el comportamiento.```

**Qué salió:**

 ```
 Resultado: 22 pasan y 1 falla, y el que falla es uno de los nuevos. No he tocado ni
  el código ni el test.

  El que falla: Tasks | responsable / el responsable no trae el email ni datos de 
  acceso, ni suelta ni en la lista
  (backend/tests/functional/tasks/assignee.spec.ts:71)

  Mensaje de error:
  AssertionError: assignee en la lista trae la clave email: expected { id: 4, …(5) }
  to not have nested property 'email'

  La tarea pedida suelta pasa la comprobación; lo que falla es la misma tarea dentro
  de GET /api/v1/tasks. El { id: 4, …(5) } son 6 campos: id, fullName, email,
  createdAt, updatedAt e initials.

  Dónde creo que está el problema: en el código.
  - La spec no deja duda. El escenario dice "suelta o dentro de la lista" y "no
    incluye el email", y el requisito dice "en particular su email".
  - El test comprueba lo que dice el escenario. Pide la lista real, busca la tarea por
    su id y mira si el responsable trae la clave email. No hay ningún valor elegido
    por mí que haga fallar esta comprobación.
  - El fallo está en backend/app/transformers/task_transformer.ts. Construye el
    assignee con UserTransformer, que incluye el email, en vez de con
    TaskAssigneeTransformer, que sí usa la tarea pedida suelta. El comentario de
    TaskAssigneeTransformer dice que no se debe reutilizar UserTransformer justo por
    esto.```



