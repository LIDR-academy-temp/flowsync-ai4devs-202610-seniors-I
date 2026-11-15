
# Parte A
1. Que piden las reglas
 1. crear una rama antes de empezar si ya no estás en una rama.
 2. Utilizar el skill /commit pero solo por petición.
 3. Cuando hacen ciertos cambios se actualiza la documemntación pero sin generar un documento nuevo.
 4. crear un PR y pasa el revisor adversarial.
 5. Cuando se abra el PR envío sola la URL.

 2. Que se miró: lo miro el agente según el prompt 1. Pudo mirar varios archivos `backend/app/controllers/tasks_controller.ts`, `task_statuses_controller.ts`, `task_due_dates_controller.ts`, `backend/app/openapi/schemas.ts`, `backend/config/openapi.ts`, `docs/capabilities/tasks/README.md`
 3. Veredicto: excepto 3, dice que no sepuede comprobar, viendolo en perspectiva de agente tiene sentido, como sabes si alguien pidio los skills? si no es un pipeline o hay un prompt guardado difícil.
 4. En los archivos mostrados en la tabla, el agente lo pudo ver bien. En los no se puede comprobar, parecia algo que se le deja al usuario, por tanto no se puede asegurar sin una pipeline que lo invoque.
 5. borraría las 2 primeras, la otras dos las organizaría y pondría en un pipeline. Lo de la rama, lo miraría bien en el PR.

 # Parte B

 1. 1 si, 2 si, 3 a medias, 4 no  y  5 no (estás solo si alguien se acordo). Dije 1 y 2 se cumplian, pero no lo puede comprobar, y tiene lógica, dije 4 y 5, pero no se puede comprobar sin un pipeline.
 2. Ya lo dije, el PR y adversarial en un pipeline.
 3. 1 y 2, como lo compruebas, dejaría el skill por si alguien lo quiere utilizar.
 
