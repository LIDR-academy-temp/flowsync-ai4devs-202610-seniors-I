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

**Modelo:** Sonet 5
**Herramienta:** Claude Code

```
/init
```

**Qué salió:** Creo el fichero CLAUDE.md


## Prompt 2

**Modelo:** Sonet 5
**Herramienta:** Claude Code

```
Necesito que claude sea capaz de conectares a Jira via MCP. Al proyecto al que se va a conectar es https://iduetxe.atlassian.net/jira/software/projects/FLOW. Necesito comprobar que te conectas y eres capaz de listar las tareas pendientes (en TODO). Necesito además que sea capaz de editar las tareas y mover su estado para ponerlas en progreso. 
```

**Qué salió:** Tuve que configurar mi conector de Claude porque estaba apuntando al jira del trabajo y luego intentó moverme la tarea, cosa que le dije que no. 

## Prompt 3

**Modelo:** Sonet 5
**Herramienta:** Claude Code

```
Ahora, basándote en la conexión con Jira, vamos a crear el skill /priority-ticket que se conectará a Jira, cogerá la tarea pasada como argumento, y si no se pasa ninguna, cogerá la tarea con más prioridad que esté en la columna de TODO y la moverá a IN_PROGRESS y me la asignará a mi. Esta Skill, una vez seleccionada la tarea se leerá el ticket y creará un plan de trabajo. No escribirá niguna linea de código, solo creará un plan en la carpeta .claude/tmp/plans/FLOW-XXX-NombreTarea.md para que luego lo pueda revisar. Durante la planificación deberá plantear y preguntar todas aquellas dudas de negocio que le surjan. La skill, se quedará esperando a la aprobación del plan. Una vez aprobado procederá a la implementación. 

```

**Qué salió:** Me hizo varias preguntas para casos limite (como si el ticket se lo paso como argumento que hacer con él y si lo muevo a IN_PROGRESS), que si ignora las epicas y que donde formula las dudas de negocio que encuentre. Su contestación fue:
```
La skill /priority-ticket está creada en .claude/skills/priority-ticket/SKILL.md, junto con el directorio .claude/tmp/plans/ y los permisos MCP necesarios en settings.local.json.

Resumen del flujo implementado:

1. Selección del ticket: con argumento (/priority-ticket FLOW-2) usa ese; sin argumento, busca en TODO con ORDER BY priority DESC, Rank ASC excluyendo Epics. Si el ticket pasado como argumento no está en TODO o es un Epic, pregunta antes de continuar.
2. Transición + asignación: mueve el ticket a "En progreso" y te lo asigna, resolviendo tu accountId en cada ejecución vía atlassianUserInfo.
3. Planificación: lee el ticket y el código relevante, pregunta dudas de negocio con AskUserQuestion si las hay, y escribe el plan en .claude/tmp/plans/FLOW-XXX-NombreTarea.md — sin tocar código de producto.
4. Aprobación: usa ExitPlanMode para pedir tu visto bueno explícito antes de pasar a implementar.
5. Implementación: solo arranca tras la aprobación.

Nota: el documento especifica usar siempre el conector Atlassian_MCP (no Atlassian), porque es el único autorizado contra iduetxe.atlassian.net.
```


## Prompt 4

**Modelo:** Sonet 5
**Herramienta:** Claude Code

```
Vamos a crear el siguiente SKILL. Para añadirte más contecto, estamos creando el HARNES del proyecto para que luego tengas el flujo de desarrollo más definido y que será el que hay que seguir. 
La siguente SKILL es `/commit`. Quiero que hagas un commit, indicando el id del ticket con este formato FLOW-XXXX :: Descripción del cambio. La descripción que sea breve para que sea fácil de leer
```

**Qué salió:** Me preguntó varias cosas
```
· ¿Cómo debe obtener la skill /commit el ticket FLOW-XXXX a usar en el mensaje? → Detectarlo del nombre de la rama (Recomendado)
· ¿Cómo se debe generar la descripción breve del cambio en el mensaje de commit? → Generada automáticamente del diff (Recomendado)
· ¿Qué debe hacer /commit con el staging de archivos antes de commitear? → Mostrar git status y pedir confirmación (Recomendado)
· La rama actual se llama 's1/start' (sin patrón FLOW-XXXX). ¿Qué debe hacer /commit cuando no puede detectar el ticket de la rama? → Preguntar el ticket al usuario (Recomendado)
· ¿La skill /commit debe también hacer push tras el commit, o solo comittear localmente? → Commit + preguntar si hacer push
```
Y al final tambien me pregunto por añadirlo al CLAUDE.md la convención del commit para que esté presente siempre, que le dije que si. 


## Prompt 5

**Modelo:** Sonet 5
**Herramienta:** Claude Code

```
Ahora vamos a crear un subagente adversarial-reviewer que revisa un pull request intentando romperlo, no aprobarlo, y sin editar nada. Trata de encontrar fallos de seguridad, posibles problemas de ejecucion NullPointers y cosas así y sugerir mejoras, tanto de diseño como de eficiencia. 
```

**Qué salió:** No preguntp nada. 
```
Subagente adversarial-reviewer creado en .claude/agents/adversarial-reviewer.md.

Puntos clave:
- Tools: solo Read, Grep, Glob, Bash (restringido por instrucciones a inspección: git diff/log/show, gh pr view/diff) y codegraph_explore — sin Edit/Write/NotebookEdit, así que no puede tocar código aunque se le pida.
- Postura: explícitamente adversarial — busca activamente romper el PR, no aprobarlo; checklist concreta de seguridad (injection, XSS, secretos, auth), errores de ejecución (null/undefined, promesas sin manejar, race conditions), diseño (capas del repo, duplicación) y eficiencia (N+1, overfetching).
- Salida: usa ReportFindings, igual que /code-review, con un failure_scenario concreto por hallazgo — nada de hallazgos vagos ni "LGTM".

Se invoca con el tool Agent pasando subagent_type: "adversarial-reviewer". ¿Quieres que lo pruebe ahora contra el diff actual de la rama o contra algún PR concreto?
```


## Prompt 5

**Modelo:** Sonet 5
**Herramienta:** Claude Code

```
Ahora necesito que haya **Un hook que formatea el frontend** cada vez que el agente edita un archivo. El frontend no trae formateador: instala Prettier en `frontend/` y dispáralo sobre `frontend/src/**`.
```

**Qué salió:** 
Ha solicitado instalar Prettier via npm, ha modificado el hook y el settings.json y lo ha probado con un fichero.
```
El hook está configurado correctamente (pipe-test y validación JSON pasaron), pero no se disparó en vivo porque .claude/settings.json es un archivo nuevo creado durante esta sesión — el watcher de configuración solo observa archivos de settings que ya existían al arrancar la sesión.

Resumen de lo hecho:
1. Instalado prettier como devDependency en frontend/package.json.
2. Creado .claude/settings.json (de proyecto, compartido vía git) con un hook PostToolUse sobre Edit|Write|NotebookEdit que:
  - Extrae el file_path del evento.
  - Solo actúa si la ruta cae bajo $CLAUDE_PROJECT_DIR/frontend/src/.
  - Ejecuta frontend/node_modules/.bin/prettier --write sobre ese archivo.
  - Ignora silenciosamente cualquier otra ruta (backend, frontend fuera de src/, resto del repo).
3. Verificado el JSON con jq -e (sintaxis y forma correctas) y probado el comando exacto contra los tres casos (backend, frontend fuera de src, frontend/src) con el payload stdin real — se comporta como se espera.

Para que quede activo en esta sesión, abre el menú /hooks una vez (recarga la configuración) — o simplemente reinicia Claude Code. A partir de ahí, cada Edit/Write sobre frontend/src/** se formateará automáticamente con Prettier.
```



## Prompt 6

**Modelo:** Sonet 5
**Herramienta:** Claude Code

```
Lo último del HARNES, unir todo en el CLAUDE.md **Las reglas de proceso**, al final del `CLAUDE.md`: Se hace una rama nueva antes de tocar código o al ejecutar priority-ticket usando el ID del ticket con la conveción que ya habíamos dicho; al cerrar, `/commit` y el pull request con `gh pr create` En la PR se describe que se ha cambiado y por que.; después, el subagente revisor sobre el pull request; y en el chat, solo la URL del pull request.
```

**Qué salió:** 
Ha modificado CLAUDE y la skill de priority-ticket
```Harness completo. Resumen de lo añadido:

CLAUDE.md — nueva sección "Reglas de proceso" al final, que amarra todo el ciclo:
1. Rama nueva (feature/FLOW-XXX-slug) antes de tocar código, creada automáticamente por /priority-ticket.
2. Cierre del cambio con /commit (FLOW-XXXX :: Descripción).
3. PR con gh pr create, describiendo qué cambió y por qué, enlazando el ticket.
4. Revisión del PR con el subagente adversarial-reviewer (solo lectura); sus hallazgos se resumen y el usuario decide si corregir antes de cerrar.
5. En el chat, al cerrar, solo la URL del PR.

.claude/skills/priority-ticket/SKILL.md — actualizada para crear la rama feature/FLOW-XXX-slug como nuevo paso 3 (antes de mover el ticket a En progreso), y el último paso de implementación ahora remite explícitamente a estas reglas de proceso para cerrar el ciclo.

El harness queda así: /priority-ticket → rama → plan → aprobación → implementación → /commit → gh pr create → adversarial-reviewer → URL del PR en chat.
```

## 45 minutos 
Hasta aqui he llegado en los 45 minutos (un pelín más) 
Ahora entiendo que hago el ticket para ver como ha ido el harness no?

Salimos y volvemos a entrar en claude para que pille todos los hooks y cambios. 

## Prompt 7 - Implementacion del ticket

**Modelo:** Sonet 5
**Herramienta:** Claude Code

```
/priority-ticket
```

**Qué salió:** 

```
/priority-ticket

Invoking the priority-ticket skill to select and plan the next Jira ticket.

● Skill(priority-ticket)
Successfully loaded skill

Empiezo resolviendo el sitio de Atlassian y mi identidad de usuario.

  Called Atlassian MCP 2 times

cloudId e identidad resueltos. No se pasó argumento, así que busco el ticket de mayor prioridad en TODO.

  Called Atlassian MCP

No hay resultados con ese nombre de estado exacto. Voy a comprobar los estados reales del proyecto FLOW antes de concluir que no hay tickets pendientes.

  Called Atlassian MCP

El estado del issue coincide exactamente ("Tareas por hacer") — el problema era que la primera JQL filtraba por issuetype != Epic y resultó que FLOW-2 debería haber salido. Déjame revisar por qué no apareció.

  Called Atlassian MCP

Confirmado: solo había un problema transitorio (probablemente de indexación), FLOW-2 es el único ticket válido en TODO. Lo selecciono como ticket objetivo.

  Called Atlassian MCP

Ticket seleccionado: FLOW-2 — "Implementar login en el frontend", tipo Historia, prioridad Media. Es una historia (no Epic), sin comentarios, sin asignar, en "Tareas por hacer". Ahora exploro el código relevante antes de crear la rama, para entender el contexto técnico y detectar posibles dudas de negocio.

  Read 2 files, listed 1 directory, ran 1 shell command

Noto que hay cambios locales ya modificados en frontend/package.json, frontend/src/App.tsx, frontend/package-lock.json, backend/package-lock.json y prompts.md, sin commitear, en la rama s1/start. Antes de crear una rama nueva necesito entender qué es ese trabajo en curso para no perderlo.

  Ran 3 shell commands

Son cambios de formato (prettier) y lockfiles sin consecuencia semántica — probablemente de ejercicios previos de la sesión mentor, no trabajo de feature pendiente. No bloquean nada, los dejaré intactos y seguirán en s1/start; crearé la rama feature a partir del estado actual de esa rama tal cual.

Sigo con la exploración técnica necesaria para el plan: backend de auth, y lo que exige saber sobre shadcn/ui.

  Read 5 files

Vi el error del cat de controladores (código 127 es raro, reintentaré con paths correctos) y necesito ver el login/logout response shape exacto. También necesito ver cómo está estructurado access_tokens_controller.ts.

  Searched for 1 pattern

Parece que hay una herramienta rtk interceptando find/cat con salida resumida rara. Uso Read directamente en los ficheros.

  Read 3 files

Buen hallazgo: el signup también devuelve { user, token } — esto significa que tras un signup exitoso ya tenemos sesión iniciada, lo que afecta la decisión de UX (¿redirige a perfil directamente o pide login?). Veamos el error shape que devuelve VineJS/Adonis para errores de validación (email duplicado, credenciales inválidas), que es clave para el criterio de aceptación de "mensaje claro".

  Read 1 file, ran 1 shell command

No hay tests que fijen el shape exacto de error. En AdonisJS/VineJS por defecto: errores de validación devuelven HTTP 422 con { errors: [{ field, message, rule }] }; verifyCredentials fallido lanza una excepción de Adonis Auth que típicamente resulta en 400/401 con { errors: [{ message }] }. Esto lo puedo verificar arrancando el backend rápido, pero no es estrictamente necesario para el plan — lo documentaré como algo a confirmar en implementación (manejo defensivo del shape de error).

Ahora reviso si shadcn/ui ya tiene algo configurado (CLAUDE.md dice que no existe src/components/ui/ todavía) y el tsconfig/vite.config para alias de path.

  Read 2 files

Hay una herramienta rtk (de mi configuración global) interceptando cat de forma rara y devolviendo errores falsos. Uso Read directamente, que es más fiable.

  Listed 1 directory

No estoy en el directorio correcto — probablemente el cwd se perdió. Verifico el cwd real.

  Ran 1 shell command

Ah, el cd backend de antes persistió. Uso rutas absolutas de ahora en adelante.

  Searched for 1 pattern, read 4 files

Confirmado: no hay path alias (@/*), no hay Tailwind, ni router, ni cliente HTTP, ni shadcn configurado. Esto es un scaffold vacío de verdad — la tarea requiere montar toda la infraestructura base (Tailwind + shadcn/ui init + router + alias de path) antes de construir las pantallas.

Tengo suficiente contexto técnico. Antes de escribir el plan, hay varias decisiones de producto/UX no especificadas en el ticket que no puedo inferir razonablemente — las planteo al usuario.

● User answered Claude's questions:
· El signup (POST /api/v1/auth/signup) ya devuelve { user, token } — es decir, registra Y autentica de una vez, igual que login. ¿Qué debe pasar tras un registro exitoso? → Auto-login y redirigir a perfil
· ¿Dónde y cómo debe persistirse el token de sesión en el navegador? → localStorage (Recomendado)
· ¿Qué pasa si un usuario no autenticado intenta acceder directamente a la ruta de perfil (p. ej. /profile)? El ticket pide una "vista protegida" pero no especifica el comportamiento de guard. → Redirigir a login (Recomendado)

Decisiones confirmadas. Falta una pregunta técnica sobre el enrutador — react-router no está instalado, es una decisión razonable de librería pero vale la pena confirmar ya que añade una dependencia nueva.

● User answered Claude's questions:
· El frontend no tiene ningún router instalado. Para navegar entre /login, /signup y /profile, ¿qué enfoque prefieres? → react-router (Recomendado)

Con todas las decisiones confirmadas, procedo a crear la rama de trabajo antes de escribir el plan.

  Ran 2 shell commands

No existe rama previa. Los cambios locales sin commitear son modificaciones menores de formato que se preservarán al cambiar de rama (git lleva los cambios del working tree consigo). Creo la rama feature desde el estado actual.

  Ran 1 shell command

Ahora muevo el ticket a "En progreso" y me lo asigno.

  Called Atlassian MCP

El nombre correcto es "En curso". Reintento.

  Called Atlassian MCP 2 times

FLOW-2 está ahora En curso, asignado a Iñaki Dominguez. Ahora escribo el plan de implementación.

  Ran 1 shell command

● Write(~/kuorum/LIDR/flowsync-ai4devs/.claude/tmp/plans/FLOW-2-LoginFrontend.md)
Wrote 132 lines to ../.claude/tmp/plans/FLOW-2-LoginFrontend.md
 FLOW-2 — Implementar login en el frontend

 **Ticket**: [FLOW-2](https://iduetxe.atlassian.net/browse/FLOW-2)
 **Resumen**: Implementar login en el frontend
 **Tipo**: Historia
 **Prioridad**: Medium
 **Rama**: `feature/FLOW-2-login-frontend`

# Contexto / problema a resolver
… +122 lines

Plan escrito. Resumen antes de pedir aprobación:

FLOW-2 — Implementar login en el frontend (En curso, asignado a ti)

- Infraestructura base: Tailwind + shadcn/ui init + alias @/* + react-router-dom.
- Cliente HTTP (src/lib/api.ts) contra /api/v1/auth/* y /api/v1/account/*, con normalización de errores de VineJS/Adonis.
- AuthContext con token en localStorage.
- Rutas /login, /signup, /profile (protegida con redirect a /login si no hay sesión).
- Pantallas Login/Signup/Profile con componentes shadcn, enlazadas entre sí.
- Decisiones confirmadas: signup hace auto-login, token en localStorage, guard redirige a login.

Plan completo en .claude/tmp/plans/FLOW-2-LoginFrontend.md.
Error: You are not in plan mode. To enter plan mode, call the EnterPlanMode tool first. If your plan was already approved, continue with implementation.

No estoy en Plan Mode, así que pido aprobación directamente en el chat.

¿Apruebas el plan tal como está en .claude/tmp/plans/FLOW-2-LoginFrontend.md, o quieres que ajuste algo antes de empezar la implementación?

✻ Cooked for 2m 31s

❯ Si, Continua con la implementación

Empiezo con la infraestructura base del frontend: dependencias, Tailwind, alias de path y shadcn/ui init.

  Read 1 file, ran 1 shell command

Ahora instalo Tailwind CSS v4 (vía plugin Vite, el método recomendado actual) y configuro el alias de path requerido por shadcn/ui.
```
Implementa y toca ficheros ... y va probando que todo es lo que espera. Para hacer más pruebas se instala: npx playwright 
Una vez pasados los test, hace la PR y lanza  adversarial-reviewer. El adversarial reviewer ha encontrado cosas y las ha corregido y ha hecho commit/push. 