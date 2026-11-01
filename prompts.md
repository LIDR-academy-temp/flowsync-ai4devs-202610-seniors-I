

---

## Prompt 1

**Modelo:** Claude Sonnet 5, 200K
**Herramienta:** Github copilot

```
Por favor crea una agente que escriba las especificaciones (spec-define.md) de el proyecto que reside en el repositorio actual. Luego corre el agente para que cree las especificaciones como tal (spec.md)

La especificacion debe contener la descripcion de las dos capas ( frontend y backend), es decir  lo que pasa por la API, asi como lo que se veria en pantalla

El formato de la especificacion debe ser el siguiente

- Arriba, un `## Purpose` de una o dos frases: para qué existe esta capability.
- Debajo, `## Requirements`, y colgando de él `### Requirement:` en los que el sistema **SHALL** hacer algo.
- Bajo cada requisito, al menos un `#### Scenario:` de cuatro almohadillas, con dos viñetas: `- **WHEN**` y `- **THEN**`. No hay casilla para el `GIVEN`: la precondición se mete dentro del `WHEN`.
- En castellano, salvo las mayúsculas de la RFC.
```

**Qué salió:**  generó `docs/spec-viva/rm.md` con 6 requisitos y 17 escenarios, 6/6 verificados contra el código real (backend levantado + lectura del frontend), más la Parte B con 5 incoherencias y una duda bug-vs-contrato.

