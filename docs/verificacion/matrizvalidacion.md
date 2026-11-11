# Matriz de trazabilidad — tasks

Fuente: `openspec/specs/tasks/spec.md` frente a `backend/tests/`.

**Cobertura: 3 / 124 scenarios cubiertos** (121 NO cubiertos).

Única suite de tasks: `backend/tests/functional/tasks/assignee.spec.ts` (3 tests). Los de `backend/tests/functional/auth/` no cubren scenarios de tasks.

| # | Scenario | Prueba que lo cubre | Estado |
|---|---|---|---|
| 1 | Alta con el título como único dato | — | NO cubierto |
| 2 | La tarea nace a nombre de quien la crea | — | NO cubierto |
| 3 | La tarea nace pendiente | — | NO cubierto |
| 4 | No se admite fijar responsable ni estado al crear | — | NO cubierto |
| 5 | Título ausente o vacío | — | NO cubierto |
| 6 | Título de solo espacios | — | NO cubierto |
| 7 | Espacios en los extremos | — | NO cubierto |
| 8 | Título en el límite | — | NO cubierto |
| 9 | Título que se pasa de largo | — | NO cubierto |
| 10 | Sin filtro no es «todas» | — | NO cubierto |
| 11 | El contenido no depende de quién mira | — | NO cubierto |
| 12 | Las tareas ajenas también salen | — | NO cubierto |
| 13 | Orden de la lista | — | NO cubierto |
| 14 | La lista llega entera | — | NO cubierto |
| 15 | Pedir la lista no cambia nada | — | NO cubierto |
| 16 | Responsable identificable | `assignee.spec.ts` → `el responsable se identifica por su nombre y sus iniciales` | cubierto |
| 17 | La tarea no filtra datos de cuenta | `assignee.spec.ts` → `la tarea no filtra el email ni otros datos de acceso` | cubierto |
| 18 | Responsable sin nombre *(API)* | `assignee.spec.ts` → `un responsable sin nombre llega con el nombre nulo y con iniciales` | cubierto |
| 19 | Un estado que no existe | — | NO cubierto |
| 20 | El catálogo de estados no se toca | — | NO cubierto |
| 21 | Cambio de estado correcto | — | NO cubierto |
| 22 | Cambiar una tarea de otra persona | — | NO cubierto |
| 23 | Vuelta atrás desde hecho | — | NO cubierto |
| 24 | Cambiar el estado no toca nada más | — | NO cubierto |
| 25 | Tarea inexistente *(PATCH status)* | — | NO cubierto |
| 26 | Listar sin haber entrado | — | NO cubierto |
| 27 | Escribir sin haber entrado | — | NO cubierto |
| 28 | Ver la lista no pide nada más que la sesión | — | NO cubierto |
| 29 | Lista con tareas | — | NO cubierto |
| 30 | Lo hecho no ocupa sitio | — | NO cubierto |
| 31 | Saber en qué anda cada uno | — | NO cubierto |
| 32 | Responsable sin nombre *(UI)* | — | NO cubierto |
| 33 | Llegar a la lista sin sesión | — | NO cubierto |
| 34 | Todavía no hay nada | — | NO cubierto |
| 35 | La primera tarea llena el espacio | — | NO cubierto |
| 36 | Vacío que no es un espacio vacío | — | NO cubierto |
| 37 | Apuntar algo en un gesto | — | NO cubierto |
| 38 | El formulario no pide nada más | — | NO cubierto |
| 39 | El campo queda listo para la siguiente | — | NO cubierto |
| 40 | Intento sin escribir nada | — | NO cubierto |
| 41 | Solo espacios | — | NO cubierto |
| 42 | Título demasiado largo | — | NO cubierto |
| 43 | Cambio sin salir de la lista | — | NO cubierto |
| 44 | Los únicos destinos posibles | — | NO cubierto |
| 45 | También en las tareas de otros | — | NO cubierto |
| 46 | El cambio no cuela *(estado)* | — | NO cubierto |
| 47 | No hay lista personal | — | NO cubierto |
| 48 | El estado es la única dimensión | — | NO cubierto |
| 49 | El filtro es una lente mía | — | NO cubierto |
| 50 | Sin señales de presencia | — | NO cubierto |
| 51 | La lista no adelanta el vencimiento | — | NO cubierto |
| 52 | La pantalla de una tarea no reúne tareas | — | NO cubierto |
| 53 | Una tarea nace sin fecha | — | NO cubierto |
| 54 | La creación no acepta fecha ni aunque se envíe | — | NO cubierto |
| 55 | La fecha es un día, no un instante | — | NO cubierto |
| 56 | Sin fecha se dice explícitamente | — | NO cubierto |
| 57 | Poner una fecha a una tarea que no tenía | — | NO cubierto |
| 58 | Cambiar la fecha por otra | — | NO cubierto |
| 59 | Quitar la fecha | — | NO cubierto |
| 60 | Una fecha ya pasada se acepta | — | NO cubierto |
| 61 | Una fecha que no existe se rechaza | — | NO cubierto |
| 62 | Fijar la fecha de una tarea ajena | — | NO cubierto |
| 63 | Tocar la fecha no toca nada más | — | NO cubierto |
| 64 | Tarea inexistente *(PUT due-date)* | — | NO cubierto |
| 65 | Fecha del día anterior | — | NO cubierto |
| 66 | Vencer hoy todavía no es estar vencida | — | NO cubierto |
| 67 | Fecha futura | — | NO cubierto |
| 68 | Sin fecha no se vence nunca | — | NO cubierto |
| 69 | Darla por hecha la deja de vencer | — | NO cubierto |
| 70 | Una tarea hecha con la fecha pasada | — | NO cubierto |
| 71 | Aplazar resuelve el vencimiento | — | NO cubierto |
| 72 | Dos husos, dos lecturas, ambas correctas | — | NO cubierto |
| 73 | Una tarea vence sola al pasar la medianoche | — | NO cubierto |
| 74 | Falta el día de referencia | — | NO cubierto |
| 75 | Día de referencia que no vale | — | NO cubierto |
| 76 | Tarea existente | — | NO cubierto |
| 77 | Tarea que no existe | — | NO cubierto |
| 78 | Consultar una tarea ajena | — | NO cubierto |
| 79 | Consultar sin haber entrado | — | NO cubierto |
| 80 | Mirar una tarea no la cambia | — | NO cubierto |
| 81 | La lista calla sobre el vencimiento | — | NO cubierto |
| 82 | La lista no pide día de referencia | — | NO cubierto |
| 83 | Abrir una tarea desde la lista | — | NO cubierto |
| 84 | Volver a la lista | — | NO cubierto |
| 85 | Abrir una tarea sin sesión | — | NO cubierto |
| 86 | Abrir una tarea que no existe | — | NO cubierto |
| 87 | Indicar una fecha | — | NO cubierto |
| 88 | El cambio ya está guardado | — | NO cubierto |
| 89 | Quitar la fecha en un gesto | — | NO cubierto |
| 90 | La fecha de una tarea de otra persona | — | NO cubierto |
| 91 | El cambio no cuela *(fecha)* | — | NO cubierto |
| 92 | Fecha imposible o incompleta | — | NO cubierto |
| 93 | El aviso no es un callejón sin salida | — | NO cubierto |
| 94 | Una tarea vencida se anuncia | — | NO cubierto |
| 95 | La señal no es solo un color | — | NO cubierto |
| 96 | Vencer hoy no se anuncia | — | NO cubierto |
| 97 | Una tarea hecha no se anuncia vencida | — | NO cubierto |
| 98 | Una tarea sin fecha en la lista | — | NO cubierto |
| 99 | Una tarea sin fecha abierta | — | NO cubierto |
| 100 | Filtrar por un estado concreto | — | NO cubierto |
| 101 | Lo hecho sigue siendo consultable | — | NO cubierto |
| 102 | Un solo estado por petición | — | NO cubierto |
| 103 | Acotar no cambia nada | — | NO cubierto |
| 104 | Acotar sin haber entrado | — | NO cubierto |
| 105 | Nadie tiene nada en curso | — | NO cubierto |
| 106 | El espacio entero está vacío | — | NO cubierto |
| 107 | Estado inventado | — | NO cubierto |
| 108 | El error no se confunde con la ausencia | — | NO cubierto |
| 109 | El estado inventado no pasa a existir | — | NO cubierto |
| 110 | Las opciones disponibles | — | NO cubierto |
| 111 | Elegir un estado sustituye al anterior | — | NO cubierto |
| 112 | Quitar el filtro devuelve a la vista por defecto | — | NO cubierto |
| 113 | Sin ratón | — | NO cubierto |
| 114 | Un estado que no es ninguno de los tres | — | NO cubierto |
| 115 | La vista acotada se comparte | — | NO cubierto |
| 116 | Atrás deshace el filtro | — | NO cubierto |
| 117 | El filtro no se guarda | — | NO cubierto |
| 118 | Se ha pedido un estado que no existe | — | NO cubierto |
| 119 | Filtro válido sin resultados | — | NO cubierto |
| 120 | No queda nada abierto, pero sí hay tareas hechas | — | NO cubierto |
| 121 | El vacío del filtro no se lee como vacío del espacio | — | NO cubierto |
| 122 | Marcar como hecho saca la tarea de la vista por defecto | — | NO cubierto |
| 123 | La tarea sigue estando | — | NO cubierto |
| 124 | Crear con un filtro puesto | — | NO cubierto |

Nota: los 3 tests de `assignee.spec.ts` usan `POST /api/v1/tasks` como setup, pero no asertan los scenarios de creación; solo el requisito «Lo que cada tarea muestra de su responsable».
