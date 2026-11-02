# FLOW-2: plan con harness vs. sin harness

Nov 1, 2026 · @Dani

Comparación de los dos planes para implementar el login en el frontend de FlowSync. Lado izquierdo: plan hecho con harness (CLAUDE.md, skills, Jira, fork). Lado derecho: plan hecho sin harness.

## Resumen

| Casilla | Con harness | Sin harness |
| --- | --- | --- |
| 1. Archivos que propone tocar | **26 + src/assets/\*** (17 nuevos, 8 modificados, 1 eliminado + el glob de assets). Nada fuera de frontend/. | **24 + assets sin uso** (14 nuevos, 9 modificados, 1 eliminado + assets sin nombrar). Además toca el entorno de backend/ (npm install, migración, restaurar tmp/.gitkeep), sin diff de código. |
| 2. Convenciones del proyecto | Respeta las 8 que nombra (ver detalle). No se ve ninguna incumplida en el plan. | Ninguna escrita en ninguna parte. Esa es la respuesta. |
| 3. Intervenciones tuyas | No consta en el plan: **rellenar tú**. | No consta en el plan: **rellenar tú**. |
| 4. Arreglos a mano antes de enseñarlo | Pocos y cosméticos: título y favicon de la plantilla de Vite. | Toda la parte de entrega (rama, commit, PR, Jira) más un posible fallo de lint y contratos sin confirmar. |

## 1. Archivos que propone tocar

|  | Con harness | Sin harness |
| --- | --- | --- |
| Nuevos | 17: components.json, src/lib/utils.ts, src/components/ui/{button, card, input, label, alert}.tsx (5), lib/api.ts, lib/api-errors.ts, auth/auth-context.ts, auth/AuthProvider.tsx, auth/use-auth.ts, auth/ProtectedRoute.tsx, auth/GuestRoute.tsx, pages/LoginPage.tsx, pages/SignupPage.tsx, pages/ProfilePage.tsx | 14: components.json, src/lib/utils.ts, src/components/ui/\* (los mismos 5), lib/api.ts, lib/auth.tsx, components/AuthForm.tsx, components/ProtectedRoute.tsx, pages/LoginPage.tsx, pages/SignupPage.tsx, pages/ProfilePage.tsx |
| Modificados | 8: package.json, package-lock.json, vite.config.ts, tsconfig.json, tsconfig.app.json, src/index.css, src/main.tsx, src/App.tsx | 9: los mismos 8 + index.html (título «FlowSync») |
| Eliminados | 1 + glob: src/App.css y src/assets/\* | 1 + glob: src/App.css y «assets de demo sin uso», sin decir cuáles |
| **Total** | **26 + src/assets/\*** | **24 + assets sin nombrar** |
| Fuera de frontend/ | Nada. Verifica con git diff --stat que backend/ y README.md quedan intactos. | Sin cambios de código en backend/, pero el paso 1 hace npm install, git restore backend/tmp/.gitkeep, node ace migration:run y crea db.sqlite3. No hay paso que compruebe que el diff no toca backend/. |

La diferencia de archivos viene de cómo reparte la sesión: el plan con harness separa contexto, provider y hook en tres archivos y añade GuestRoute; el plan sin harness lo junta en lib/auth.tsx, añade un AuthForm compartido y cambia index.html.

## 2. Convenciones del proyecto

| Con harness | Sin harness |
| --- | --- |
| ✅ CLAUDE.md: después de adversarial-reviewer, responder solo con la URL de la PR (paso 7). | No había ninguna convención escrita en ninguna parte, así que no hay nada que respetar o incumplir. |
| ✅ Regla only-export-components de oxlint: separa auth-context.ts, AuthProvider.tsx y use-auth.ts por ella. |  |
| ✅ Skill /commit con disable-model-invocation: true: no se la salta; si el harness no le deja lanzarla, te pide que la ejecutes tú. |  |
| ✅ Nombre de rama feat/FLOW-2-frontend-login, desde s1/start. |  |
| ✅ PR al fork DevMontilla con base s1/start, forzando --repo porque gh apunta a upstream por defecto. |  |
| ✅ Jira: mover FLOW-2 a «En curso» solo tras la aprobación, consultando las transiciones; si no existe, no elige otra. |  |
| ✅ El backend no se modifica (lo comprueba con git diff). |  |
| ✅ Interfaz en español. |  |
| Incumplidas: ninguna visible en el plan. |  |

## 3. Cuántas veces tuviste que intervenir

|  | Con harness | Sin harness |
| --- | --- | --- |
| Corregir | *1 - Redefinir que la busqueda en Jira sea por el campo traducido al ingles* | *0* |
| Aclarar | *3* | *0* |
| Repetir el encargo | *0* | *0* |
| Pararlo en seco | *0* | *0* |
| **Total** | 4 | 0 |
| Lo que sí deja ver el plan | Tres «decisiones ya tomadas contigo»: campo «Confirmar contraseña», logout fuera, PR al fork con base s1/start. Indican que preguntó o que se lo dijiste; no dicen si fue corrección. | Ninguna decisión atribuida a ti: el campo de confirmación, logout fuera y fullName sin campo los decide solo. |

## 4. Qué tendrías que arreglar a mano antes de enseñarlo

| Con harness | Sin harness |
| --- | --- |
| Cambiar el \<title> de index.html, que sigue siendo el de la plantilla de Vite (no está en la lista de archivos). | Crear la rama, hacer el commit con /commit, abrir la PR al fork con --repo y --base s1/start (si no, gh la manda a upstream) y mover FLOW-2 en Jira: el plan termina en la verificación. |
| Cambiar el favicon public/vite.svg, que no se toca (solo borra src/assets). | Separar lib/auth.tsx: exporta AuthProvider y useAuth juntos, y la regla only-export-components de oxlint del repo lo marcará en npm run lint. |
| Ejecutar /commit tú si el harness no deja que lo lance (el plan ya lo avisa). | Confirmar el status de credenciales inválidas y la regla del email duplicado: el plan los deja «sin confirmar» y depende del curl del paso 1. En el código son 400 y 422 database.unique. |
| Revisar el formato de la fecha de alta en el perfil (no dice cómo se muestra). | Añadir la ruta inversa: con sesión, /login y /signup no redirigen a /profile (no hay GuestRoute). |
|  | Añadir un comodín \* → /profile: solo redirige /. |
|  | Decidir qué «assets de demo sin uso» se borran: no los nombra. |
|  | Añadir cancelación (AbortController) al GET del perfil: sin ella, StrictMode hace la petición dos veces en desarrollo. |
|  | Revisar que el diff no arrastra nada de backend/ (db.sqlite3, tmp/): el plan no lo comprueba. |
|  | Unificar el tono: «Probá de nuevo» va con voseo; el resto del equipo puede esperar otro registro. |

# Parte B: las 3 líneas

1. Hasta que pieza llegaste, y cual te costo mas de lo que esperabas.

Pude completar todas las piezas de la implementacion del harness dentro del tiempo propuesto. Fue mi primera vez configurando skills y agentes y me ayude con la asistencia de Claude y usando los mismos enunciados como prompts fue realmente ágil.

2. La primera diferencia que viste entre las dos salidas, y en que te fijaste para verla.

La primera diferencia fue que la primer salida no pudo resolver la busqueda inicial de la tarea del tablero porque la skill estaba configurada para español y el entorno de Jira estaba en ingles y detuvo el proceso al iniciar por lo que tuve que corregir y detallarle que podia estar en ingles por lo que deberia buscar usando las equivalentes traducciones al ingles (luego actualize la skill para que no vuelva a pasar). En cambio la salida sin harness decidió por si sola al ver que en el tablero habia una sola tarea, incluso sin haber estado asignada a mi.

3. Algo que dejaste escrito en el harness y que el agente no cumplió igualmente. 

No encontré puntos donde el agente incumpliera lo establecido, al contrario, por seguirlo tan estrictamente tuve que corregir la instruccion para que la skill /priority-ticket pudiera resolver correctamente el pedido.
