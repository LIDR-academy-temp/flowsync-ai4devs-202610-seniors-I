# Prompts

Aquí van **todos los prompts que lanzaste** para hacer el ejercicio, en el orden en que los
lanzaste, con el modelo y la herramienta de cada uno.

---

## Prompt 1

**Modelo:** Sonnet 5.5 (subagente lanzado desde la sesión principal)
**Herramienta:** Claude Code

```
Escribe la spec viva del vertical de cuentas y acceso de FlowSync (registro, inicio de sesión, sesión y perfil), describiendo lo que el sistema hace HOY, en sus dos capas: API (backend/) y pantallas (frontend/).

Repo: /Users/nuria/Desktop/code/nuriaromerodev/curso-LIDR/flowsync-ai4devs-202610-seniors-I (rama spec-viva-nr, ya creada; no cambies de rama).

Resultado esperado: un único archivo nuevo, docs/spec-viva/nr.md.

Formato obligatorio:
- `## Purpose` de una o dos frases.
- `## Requirements` y debajo `### Requirement: <nombre>`, cada uno redactado con "El sistema SHALL ...".
- Bajo cada requisito, al menos un `#### Scenario: <nombre>` con exactamente dos viñetas: `- **WHEN** ...` (la precondición va dentro del WHEN, no hay GIVEN) y `- **THEN** ...`.
- En castellano, salvo SHALL / SHALL NOT / MUST.

Criterios de éxito:
- Solo comportamiento observable desde fuera: en la API, petición (método, ruta pública, cuerpo) y respuesta (código de estado, forma del JSON, mensajes); en pantalla, lo que una persona ve y puede hacer. Ni un nombre de clase, archivo, función, middleware o ruta de código.
- Cada requisito sale de leer el código real (rutas, controladores, modelo de usuario, validadores, middlewares, transformers; en el frontend, pantallas de acceso, estado de sesión, guards de rutas y el cliente de API). No inventes nada que no hayas visto en el código.
- Solo cuentas y acceso. Nada de tareas ni de otras partes del sistema.

Restricciones:
- No toques ningún archivo salvo crear docs/spec-viva/nr.md. No arregles nada aunque veas un bug.
- Nada de secciones ADDED, MODIFIED ni REMOVED: no es un delta.
- No instales ni inicialices OpenSpec. No hagas commit.
- No mires la rama s3/end.
- No escribas la parte B (las tres listas): la hace la alumna. En su lugar, al final del archivo añade una sección `## Notas del agente (borrar antes de entregar)` con: (1) número total de requisitos escritos; (2) para cada requisito, el archivo y línea donde lo viste, para que ella pueda comprobarlo; (3) las incoherencias que notaste al escribirla, una línea cada una con dónde se ve; (4) los comportamientos en los que no puedas decidir si son bug o contrato, con las dos lecturas que se contradicen. Esta sección es la única donde se permiten rutas de archivo.

Si algo es ambiguo, no lo decidas tú: márcalo en las notas del punto (4).

Devuélveme en tu respuesta final solo: la ruta del archivo, el número de requisitos y el número de escenarios.
```

**Qué salió:** funcionó a la primera: 21 requisitos y 52 escenarios con el formato pedido. No levantó el servidor, así que el 422 de validación lo dedujo leyendo código. Las notas del agente (dónde vio cada requisito, incoherencias y dudas) las usé de mapa para la parte B y las borré de la entrega.

---

## Prompt 2

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
Traete los cambios del repositorio del que he creado el fork que hay ramas nuevas, necesito hacer 2 tareas primero la de la rama s3/start y la de s4/start. 
Primero vamos con la s3 que es si no recuerdo mal la de openspec. Primero debes revisar el readme para decirme paso a paso lo que hay que hacer de una forma no tecnica y luego necesito que lances un agente para que realice los cambios que piden en el repo para realizar el ejercicio
```

**Qué salió:** trajo las ramas, me explicó el README, creó la rama `spec-viva-nr` y lanzó el agente del Prompt 1, que escribió el prompt por mí. El enunciado dice que los prompts los escribe la alumna.

---

## Prompt 3

**Modelo:** Sonnet 5.5
**Herramienta:** Claude Code

```
vale, elimina de la spec-viva la parte de notas del agente. Escribe la parte B y pasame lo que has escrito como si fureas yo para que lo revise
```

**Qué salió:** borró las notas y escribió la parte B. De los 21 requisitos, 6 se comprobaron abriendo el código del backend (lo hizo el asistente, no yo); el resto no se comprobó. Las incoherencias sin comprobar van marcadas como tales.
