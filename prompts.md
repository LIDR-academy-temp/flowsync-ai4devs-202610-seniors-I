# Prompts

Registro semi-automático (hooks `UserPromptSubmit` y `Stop`): cada prompt lanzado, con su modelo, su herramienta y un resumen de la salida.
**Sesiones**:
  - nombre: Building harness
    prompts: 1-16
  - nombre: Without harness
    prompts: 17-19
  - nombre: With harness
    prompts: 20-48
---

## Prompt 1

**Modelo:** Opus 5.5
**Herramienta:** Claude Code en nueva session

```
registra los comandos que se ejecuten de aquí en mas en el formato de ejemplo en prompts.md
```

**Qué salió:** Generó un hook para registro de prompts. (esto no estaba en la preparacion pero era requerido por el enunciado y me era util para comparativa)

---

## Prompt 2

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
/init
```

**Qué salió:** Ejecutó un agente con Haiku 5.5 de mapeo, buscó arnés anterior sin encontrarlo. Procesó el readme.md, creó claude.md.

---

## Prompt 3

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
/priority-ticket
```

**Qué salió:** Me consulta sobre el readme pese a tener el conector ya configurado. Pide montar los pasos 2 y 3 y me recuerda hacer la tarea de Jira que ya ingresé por ticket.

---

## Prompt 4

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
monta el mcp con Jira para el proyecto FLOW
```

**Qué salió:** Conectó el mcp mediante .mcp.json nuevo e inspeccionó los tickets y sus estados, me pide reiniciar la sesión y volver a hacer signing in con OAuth. (omito) Me pregunta cuál ticket debo tomar.

---

## Prompt 5

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Quédate con FLOW-5: asígnamelo y marca FLOW-6 como duplicado
```

**Qué salió:** Usé la interfaz de usuario y agregó una marca de duplicado que no quería al comando ofrecido. Lo movió a listo (lo devolveré a por hacer manualmente más tarde si se requiere). Me advierte sobre el contenido del ticket que difiere del encargo del readme (Hay un limite de Jira de 255 carateres en descripcion de ticket, la info se puso en comentarios y se creó un campo extra para el resultado esperado).

---

## Prompt 6

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
crea la skill /priority-ticket
```

**Qué salió:** Lo crea y describe el ticket creado y su uso permitiendo usar una clave. El skill lo resume, propone un plan y mueve el ticket de forma automática. Vuelve a insistir con reinicio de sesión (omito).

---

## Prompt 7

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
/priority-ticket
```

**Qué salió:** Trae el ticket e indica varios detalles sin especificar, entra en plan mode automático y revisa el código. Propone el plan. Reevalúa en función del código del backend. Propone instalar y poner setup nuevo de shadcn/ui con instalación de Tailwind v4. Consulta si pedir nombre en registro. (Noto que me apresuré -> vuelvo a la tarea de setear el arnés.) Detengo modo plan.

---

## Prompt 8

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
crea la skill commit para un commit convencional (`tipo(scope): descripción`) a partir de los cambios preparados.
```

**Qué salió:** Lo crea (con el plan en mente).

---

## Prompt 9

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
/context
```

**Qué salió:** 150kb (15%) comando corre local

---

## Prompt 10

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
crea un subagente `adversarial-reviewer` que revisa un pull request intentando romperlo, no aprobarlo, y sin editar nada que use el modelo asignado de revision por defecto
```

**Qué salió:** Creó el subagente, omitió chequear si existía un modelo asignado a la revision.

---

## Prompt 11

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
revisa que el subagente configurado para revisión validación usa Sonet como modelo{
```

**Qué salió:** No tiene nada. Propone cambio de reviewer. Omito.

---

## Prompt 12

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
crea hook que formatea el frontend cada vez que el agente edita un archivo. Si el frontend no trae formateador: instala Prettier en `frontend/` y dispáralo sobre `frontend/src/`
```

**Qué salió:** Propone el plan que acepto e instala Prettier. Pide permisos y crea el hook PostToolUse. Incluye cambio de modelo a Sonnet que incluyo. Verifica el hook.

---

## Prompt 13

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
haz que el hook funcione tanto para windows como para ubuntu
```

**Qué salió:** Adaptó el hook, le indico que omita el testeo y me tira los pasos a seguir.

---

## Prompt 14

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
agrega a las reglas de proceso al final del `CLAUDE.md`: rama nueva antes de tocar código; al cerrar, `/commit` y el pull request con `gh pr create`; después, el subagente revisor sobre el pull request; y en el chat, solo la URL del pull request.
```

**Qué salió:** Añadió cosas que no le pedí, ejemplo de nombre de la rama, descripción, un extra sobre el hook.

---

## Prompt 15

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
pon en agents.md el contenido de claude.md y en este último una referencia @Agents.md como es usual
```

**Qué salió:** Hizo lo que le pedí (el enlace simbólico no es tan funcional en Windows). ln->@Agents.md

---

## Prompt 16

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
cambia el registro de comandos a prompt_track.md. Debe poner además del cambio el resumen de cada salida, mueve el hook a posttooluse de ser necesario
```

**Qué salió:** Cambió el hook como se solicitó.

---

## Prompt 17

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
trae el ticket pendiente de mayor prioridad en Jira  FLOW
```

**Qué salió:** Sin arnés no leyó por defecto los comentarios ni los criterios de aceptación del ticket en la descripción.

---

## Prompt 18

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
resume sus criterios
```

**Qué salió:** Leyó los criterios; no evaluó si había información que faltaba.

---

## Prompt 19

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
entra en plan mode para implementarlo
```

**Qué salió:** Devuelve el plan como esperado. Lo grabo en un archivo plan sin arnés para su evaluación.

---

## Prompt 20

**Modelo:** Opus 5.5
**Herramienta:** Claude Code en nueva sesion

```
/priority-ticket
```

**Qué salió:** carga el ticket analiza y consulta sobre resultado esperado del login exitoso (página luego del login), consulta sobre el token bearer (se omite). Muestra el plan y lo guardo en archivo plan con arnés.txt

---

## Prompt 21

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
@"C:\Users\slopez\OneDrive\Codigo\LIDR\S1\Encargo\plan sin arnés.txt"
compara con este plan sin arnes
```

**Qué salió:** muestra los dos planes y una comparativa

---

## Prompt 22

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
pasemos a la comparacion
```

**Qué salió:** Creó docs/harness/comparacion.md con las cuatro casillas para ambos lados y la parte B. indica rellenar las intervenciones del lado sin harness y las líneas 1 y 2 de la parte B, y revisar el borrador de la línea 3. (se procesa en simuláneo en la sesión sin arnés)

---

## Prompt 23

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
vuelve a proceder leyendo el archivo existente
```

**Qué salió:** Releí comparacion.md con tus cambios y corregí el recuento de la casilla 3 del lado con harness. Siguen pendientes las líneas 1 y 2 de la parte B, que te tocan a ti. No hice commit.

---

## Prompt 24

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
dime, los planes contemplan convenciones de seguridad como controlar pedir passwords por https en producción?
```

**Qué salió:** (resumen IA) No. Ninguno de los dos planes tiene en cuenta HTTPS ni el despliegue a producción: los dos se limitan al entorno de desarrollo (proxy de Vite hacia `http://localhost:3333`). Tampoco el harness: `CLAUDE.md`/`AGENTS.md` no tienen ninguna regla de seguridad, así que el agente no tenía nada que cumplir en ese aspecto. **Lo que ninguno cubre** - **HTTPS en producción:** no se exige servir el front ni la API por HTTPS, ni hay HSTS ni redirección de HTTP a HTTPS. El sin arnés deja la base URL configurable (`VITE_API_URL`), pero no obliga a que sea `https://`. - **Token en `localStorage`:** lo usan…

---

## Prompt 25

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
no añadas nada aún trabajamos en los puntos del archivo de comparación y eso es un debe de ambos a incluir donde corresponda. Dime, cumplen con los criterios de buenas prácticas de código?
```

**Qué salió:** Evaluó las buenas prácticas de los dos planes: estructura correcta, pero sin tests, sin tipos compartidos y sin accesibilidad. Me preguntó dónde ubicar las carencias y elegí la casilla 4 en ambos lados.

---

## Prompt 26

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
dime se mantiene un criterio general de diseño? que hay del uso de oxlint?
```

**Qué salió:** Explicó que el criterio de diseño es la receta habitual de shadcn y no algo del proyecto. Revisó .oxlintrc.json y se corrigió: la regla es un aviso, no un error. Detectó que los componentes de shadcn también generan avisos.

---

## Prompt 27

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
bien modifica la comparativa con esa informacion
```

**Qué salió:** Modificó la comparativa y matizó oxlint en la casilla 2, pero puso las carencias comunes en una fila 4 bis en vez de en cada columna, como habíamos acordado. Me preguntó si dejarla así.

---

## Prompt 28

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Copia las carencias comunes dentro de la casilla 4 de cada columna, como acordamos.
```

**Qué salió:** Copió las carencias comunes en la casilla 4 de cada columna y eliminó la fila 4 bis. Advirtió que la casilla quedó demasiado larga.

---

## Prompt 29

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
muestrame esa parte
```

**Qué salió:** Mostró la casilla 4 desglosada: ocupaba más que el resto de la tabla.

---

## Prompt 30

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
resume lo que tienes de esas casillas. Generaliza las buenas practicas que no se aplicaron en los estándares que no se cumplieron y te llevaron a las conclusiones que sacaste
```

**Qué salió:** Agrupó las carencias por estándar (OWASP, WCAG, DRY, 12-Factor…) y llegó a la conclusión de que el harness solo mejora lo que está escrito. No tocó el archivo y preguntó si sustituir la casilla.

---

## Prompt 31

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
trata de poner en 4 lo que tienes en las conclusiones que refieran a lo que resta por hacer antes de poder mostrarlo
```

**Qué salió:** Lo interpretó como una lista de tareas por estándar y no la aplicó por estar en plan mode. Reconoció que antes había editado estando en ese modo.

---

## Prompt 32

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
me refiero a que tomes para rellenar la casilla 4 las conclusiones: el harness solo mejoró el plan donde había algo escrito. El contrato del backend, el proceso y Jira estaban en CLAUDE.md o en la skill, y ahí el plan con harness gana. Seguridad, tests, accesibilidad, DRY y diseño no estaban escritos en ningún sitio, y en esos puntos los dos planes fallan igual. Cuando la regla existía pero solo como dato («el lint es oxlint») y no como instrucción («abre la configuración y cumple las reglas»), tampoco se cumplió. Para mejorar el harness no basta con añadir información: hay que escribir estos estándares como reglas que se puedan verificar.
```

**Qué salió:** Entendió que quería la conclusión en la casilla 4 y propuso un texto para cada columna. Pidió confirmación por el plan mode.

---

## Prompt 33

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
casi. yo indicaría que el nombre es obligatorio en la interfaz
```

**Qué salió:** Sustituyó la casilla 4 con mi ajuste del nombre obligatorio y lo aplicó también al lado con harness, sin que se lo pidiera.

---

## Prompt 34

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
procede con el cambio y muestrame como quedó la parte 4
```

**Qué salió:** Mostró la casilla 4; el cambio ya estaba hecho.

---

## Prompt 35

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
saca la primer frase de las casillas 4.
```

**Qué salió:** Hizo bien lo que le pedí.

---

## Prompt 36

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
empezemos con la parte b. Hasta que punto llegué y que me costó mas. Leemelo
```

**Qué salió:** Indicó que la línea 1 estaba vacía y me ofreció evidencias de prompts_manual.txt para redactarla, sin escribirla por mí.

---

## Prompt 37

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Completé todo pero lo que más me llevo tiempo fue comprender el encargo y montar el arnés. Me tenté en probar lo que estaba montando y me apresuré.
```

**Qué salió:** Redactó la línea 1 con mis palabras, pero añadió detalles que rescató de la sesión. Volvió a editar estando en plan mode.

---

## Prompt 38

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
También me costó bajar a tierra las comparativas realizadas por la IA de ambos planes y agregar mi conocimiento extra sugerencias
```

**Qué salió:** Propuso el texto ampliado sin aplicarlo, por el plan mode.

---

## Prompt 39

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
deja el siguiente texto "Completé lo solicitado (más un hook extra de registro de prompts). Lo que más tiempo me llevó fue comprender el encargo, hice el de la web, y luego el del readme. Al montar el arnés en esta segunda instancia me tenté en probar lo que estaba montando (ver prompts.md). También me costó bajar a tierra las comparaciones que hizo la IA de los dos planes y añadir mi propio conocimiento y sugerencia.
```

**Qué salió:** Dejó mi texto literal en la línea 1.

---

## Prompt 40

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
para la segunda respuesta: La primera diferencia la noté en el formato del output de los planes.  Los enfoques eran distintos y el caso sin arnés me indicaba tooling y un enfoque más amplio y distintas verificaciones.
```

**Qué salió:** Dejó mi texto en la línea 2 y pasó a la línea 3.

---

## Prompt 41

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
debe decir: "El arnés no me pidió usar el conector con Jira ya que no estaba autenticado, seguramente usó el conector de attlassian al igual que sin arnés.  " verifica si el plan consideró los hooks y la instalación de Prettier
```

**Qué salió:** Escribió mi texto en la línea 3 y verificó que ninguno de los planes tuvo en cuenta Prettier ni el hook. Encontró que lo que genera la CLI de shadcn quedaría sin formatear.

---

## Prompt 42

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Atlassian va corregido.  La mejora de formato debe estar incluida en la frase que indica el mantenimiento del diseño. Al final, el plan considera contenidos de hooks? quiero añadir los controles que no se tuvieron en cuenta. Explica lo que había de los commits y PRs
```

**Qué salió:** Corrigió «Atlassian», integró el formato en la frase de diseño y explicó lo que había de commits y PRs. Encontró huecos en el harness: /commit no lo puede lanzar el agente, falta el push y la clave FLOW-N no coincide en mayúsculas.

---

## Prompt 43

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
agrega a la última parte que no se ponderó el uso del hook de prettier en el plan
```

**Qué salió:** Empezó a añadirlo a la línea 3; detuve la edición para completar la frase.

---

## Prompt 44

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
agrega también: ni las reglas del proceso.
```

**Qué salió:** Añadió las dos frases al final de la línea 3.

---

## Prompt 45

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
persiste todo y muestrame el resultado
```

**Qué salió:** Mostró la comparación completa. Aclaró que guardado no es commiteado y detectó un prompt_track.md extraviado en frontend/.

---

## Prompt 46

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
quiero que humaniza las convenciones. que es {data
```

**Qué salió:** Explicó qué es { data } con un ejemplo y reescribió la casilla 2 en lenguaje llano.

---

## Prompt 47

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
<system-reminder>
## The user forked this session from another session

The user forked this session at this point to ask something on the side; continue from here on whatever they ask. Nothing you say here is reported automatically to `local_cec30ee1-0c0f-41b9-8c3f-73e557897261`, the original session this conversation was forked from. You can message it with `SendMessage` (`to`: that session id) if you need something only it knows, or when the user asks you to pass something on. Link a session whenever you mention one, so the user can open it with a click: [its title](#local_<id>), using the `local_…` id a tool result, note or this prompt gave you, never one you made up.
</system-reminder>

que es tuyau?
```

**Qué salió:** En una sesión bifurcada, explicó qué es Tuyau: un cliente HTTP tipado que se genera a partir de las rutas del backend.

---

## Prompt 48

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
cambia el final. donde dice "El arnés no me pidió usar el conector "  por "El agente no me pidió usar el conector"
```

**Qué salió:** Cambió la frase

