# 2. Los tests de integración son la fuente de verdad ejecutable

## Contexto

Durante un tiempo la fuente de verdad viva del comportamiento fue OpenSpec ([ADR 0001](0001-openspec-como-fuente-de-verdad.md)): specs en `openspec/specs/`, cambios por delta y archivo en `openspec/changes/archive/`. Ese modelo obligaba a mantener texto y código alineados a mano. Con el tiempo, las specs dejaron de actualizarse al ritmo del producto: el ciclo proposal → delta → archive pesaba más que el valor que aportaba, y la verdad «oficial» en Markdown se desfasaba respecto a lo que realmente corría.

Mientras tanto, el backend ya concentra el comportamiento comprobable en tests de integración Japa bajo `backend/tests/functional/` (auth, tasks, etc.): hablan con la API real, la misma SQLite y los mismos contratos que el cliente. Son la única descripción del sistema que falla en CI si mienten.

## Decisión

Dejamos de mantener las specs de OpenSpec como fuente de verdad viva. La **fuente de verdad ejecutable** del comportamiento de FlowSync pasan a ser los **tests de integración**.

Un comportamiento «es» del producto si hay un test que lo fija y pasa. Los cambios de contrato se introducen o corrigen en esos tests; el código se ajusta hasta ponerlos en verde. `openspec/` queda como archivo histórico (incluido el de changes ya archivados), no como documento a actualizar en cada feature. Este ADR reemplaza al [ADR 0001](0001-openspec-como-fuente-de-verdad.md).

## Estado

Aceptada. Reemplaza al ADR 0001.

## Consecuencias

**A favor.** La verdad se verifica sola: un test rojo señala divergencia sin ritual de archive. CI protege regresiones sin depender de que alguien syncronice Markdown. El ciclo de cambio se acorta (test + código, sin delta OpenSpec). Lo que no tiene test deja de pretender autoridad.

**A costa.** Perdemos el relato en castellano por requisitos y scenarios: los tests hablan de asserts y rutas, no de intención de producto legible para quien no abre el código. El historial de *por qué* se decidió algo (proposals, designs, deltas `MODIFIED`) deja de crecer; lo ya archivado en `openspec/changes/archive/` no se mantiene fresco. Cubrir UI, ausencia de endpoints y reglas negativas («no existe X») exige más tests o queda sin ancla ejecutable. Sin disciplina, la suite se vuelve la única spec y también un lastre: tests frágiles o incompletos definen mal el producto. OpenAPI y docs quedan otra vez como anotaciones a reconciliar a mano con la suite, no con una spec viva intermedia.
