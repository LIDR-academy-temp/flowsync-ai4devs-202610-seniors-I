

---

## Prompt 1

**Modelo:**  Claude Sonnet 5
**Herramienta:** Github copilot

```
Tienes el requerimiento "Lo que cada tarea muestra de su responsable"

Tambien todos los test del backend.

Comprueba cuales test cubren los scenarios descritos en la spec.

Muestrame una tabla con el resultado de la siguiente manera:

'Scenario' 'Test que lo cubre' 'Estado'  'Que falta'
```

**Qué salió:** Revisé los 3 scenarios del requisito y los 4 specs de backend existentes (todos de `auth`, ninguno de `tasks`), confirmé 0/3 scenarios cubiertos y detecté de paso un bug real (`TaskTransformer` filtra el email del responsable en `index`/`store`), sin tocar código.

---

## Prompt 2


**Modelo:**  Claude Sonnet 5
**Herramienta:** Github copilot

```
Dame la tabla de salida anterior en markdown para que se vea como tabla ahí.

Según lo que hallaste, crea con el mismo formato test adecuados para cubrir los 3 scenarios. 

Explicame los test que has creado, que hacen, y por que razón.

Después muestrame que sigue faltando y vuelve a generar la tabla en markdown

```

**Qué salió:** El agente escribió `assignee.spec.ts` con los 3 tests, y corrió los test según lo esperado, uno falló por el `TaskTransformer`, intentó crear un PR; pero lo detuve ahí.

