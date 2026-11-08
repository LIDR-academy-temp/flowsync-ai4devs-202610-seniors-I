
PROMPT 1
--------

**Modelo:** GPT-5.6-Terra high
**Herramienta:** Claude Code

CONTEXTO 
Los tests que escribas van en backend/tests/functional/tasks/, 
siguiendo el estilo de los que ya hay en backend/tests/functional/auth/. 
No toques nada fuera de backend/tests/.

PROMTP 2 
---------

**Modelo:** GPT-5.6-Terra high
**Herramienta:** Claude Code

Vamos a enfocarnos en el feature tasks /Users/josemiguel-home/Documents/flowsync-ai4devs-202610-seniors-I/openspec/specs/tasks 

Los test irian aqui /Users/josemiguel-home/Documents/flowsync-ai4devs-202610-seniors-I/backend/tests. Aun no hagas nada. 


PROMPT 3
---------

**Modelo:** GPT-5.6-Terra high
**Herramienta:** Claude Code

Vamos ahora a crear la matriz de trazabilidad. 


CONTEXTO 

Trazabilidad: 
Para poder verificar es necesario SEGUIR EL CAMINO DESDE lo que se PIDIO hasta lo que se implemento y comprobar que cada parte esta cubierta. 
Cada criterio tiene su prueba y cada prueba apunta al codigo que lo cumple. Sin esa cadena, "verificar
es una opcion. Con ella, es Auditable 


TASK 

Matriz de trazabilidad: 
La matriz mapea, escenario a escenario si el requisito esta cubierto por los tests. El formato lo fija esta leccion y no es negociable: una fila por escenario y cuatro columnas. Encima dos, numeros: cuantos escenarios tiene el requisito y cuantos resultaron cubiertos. 

Lee los scenarios de la spec viva de esta feature y los tests existentes.

Especificamente "Requirement: Lo que cada tarea muestra de su responsable"

Genera una tabla de trazabilidad: cada criterio de aceptación → qué prueba lo cubre → cubierto / NO cubierto.

Crealo con estas columnas Criterio  (scenario) - Prueba que lo cubre - Estado (cubierto / NO cubierto)

Esta matriz escribela en /Users/josemiguel-home/Documents/flowsync-ai4devs-202610-seniors-I/docs/verification/jmar.md , rellenando ahi 


PROMPT 4 
--------

**Modelo:** GPT-5.6-Terra high
**Herramienta:** Claude Code

Ok ahora vamos a crearle los tests a esos criterios y requerimientos . 

Ten como referencia los tests de auth en /Users/josemiguel-home/Documents/flowsync-ai4devs-202610-seniors-I/backend/tests/functional/auth 

y ahora crea los de task para ese requerimiento en /Users/josemiguel-home/Documents/flowsync-ai4devs-202610-seniors-I/backend/tests/functional/tasks
